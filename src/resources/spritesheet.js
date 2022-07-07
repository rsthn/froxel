
import Drawable from '../flow/drawable.js';

/*
	If source is "image":
		config: {
			sheetWidth: int, frameWidth: int, frameHeight: int?, numFrames: int?
			--OR--
			numFrames: int, frameWidth: int, frameHeight: int?
			--OR--
			coords: Array<[x,y,w,h]>
		}

	If source is "images":
		config: {
			frameWidth: int, frameHeight: int
		}
		
	NOTE: The sheetWidth, frameWidth and frameHeight should reflect the real image size. The system will automatically scale it if the source image is smaller/bigger.
*/

const FrameDrawable = Drawable.extend
({
	spritesheet: null,
	frameIndex: 0,

	__ctor: function (spritesheet, frameIndex, texture, sx, sy, sw, sh, width=null, height=null)
	{
		this._super.Drawable.__ctor(null, width ?? spritesheet.width, height ?? spritesheet.height);

		this.spritesheet = spritesheet;
		this.frameIndex = frameIndex;

		this.sx = sx;
		this.sy = sy;
		this.swidth = sw;
		this.sheight = sh;

		this.resource = texture;
	}
});

export default Drawable.extend
({
	className: 'Spritesheet',

	frameCache: null,
	numFrames: 0,

	frameWidth: 0,
	frameHeight: 0,

	__ctor: function (r)
	{
		this._super.Drawable.__ctor();

		if ((r.type != 'image' && r.type != 'images'))
			throw new Error ('Resource is not a sprite sheet.');

		let r_scale, v_scale;

		if (r.type == 'image')
		{
			if (!r.config.sheetWidth && (!r.config.numFrames || !r.config.frameWidth) && !r.config.coords)
				throw new Error (r.resName + ': required `sheetWidth` or `numFrames` with `frameWidth` or `coords` array.');

			if (!r.config.sheetWidth)
				r.config.sheetWidth = r.width;

			if (!r.config.frameHeight)
				r.config.frameHeight = r.data.height;

			r_scale = r.data.width / r.config.sheetWidth;
			v_scale = r.width / r.config.sheetWidth;
		}
		else // r.type == 'images'
		{
			if (!r.config) r.config = { };

			if (!r.config.frameWidth)
				r.config.frameWidth = r.data[0].width;

			if (!r.config.frameHeight)
				r.config.frameHeight = r.data[0].height;

			r_scale = r.data[0].data.width / r.config.frameWidth;
			v_scale = r.data[0].width / r.config.frameWidth;
		}

		// Physical frame dimensions.
		this.frameWidth = (r.config.frameWidth * r_scale);
		this.frameHeight = (r.config.frameHeight * r_scale);

		// Logical frame dimensions.
		this.width = r.config.frameWidth * v_scale;
		this.height = r.config.frameHeight * v_scale;

		// Load each frame into its own FrameDrawable.
		let numCols, numRows;

		if (r.type == 'image')
		{
			numCols = int(r.data.width / this.frameWidth);
			numRows = Math.ceil(r.data.height / this.frameHeight);

			if (r.config.coords)
				this.numFrames = r.config.coords.length;
			else
				this.numFrames = r.config.numFrames || (numCols * numRows);
		}
		else
		{
			numCols = numRows = 0;
			this.numFrames = r.data.length;
		}

		this.r = r;
		this.r.wrapper = this;

		// Prepare frameCache.
		this.frameCache = { };

		for (let i = 0; i < this.numFrames; i++)
		{
			let frameObject;

			if (this.r.config.coords)
			{
				frameObject = new FrameDrawable (this, i, this.r.data, 
					this.r.config.coords[i][0]*r_scale, this.r.config.coords[i][1]*r_scale, this.r.config.coords[i][2]*r_scale, this.r.config.coords[i][3]*r_scale,
					this.r.config.coords[i][2]*v_scale, this.r.config.coords[i][3]*v_scale);
			}
			else if (this.numCols != 0)
			{
				frameObject = new FrameDrawable (this, i, this.r.data, 
					(i % numCols) * this.frameWidth, int(i / numCols) * this.frameHeight, this.frameWidth, this.frameHeight);
			}
			else
			{
				frameObject = new FrameDrawable (this, i, this.r.data[i].data, 
					0, 0, this.frameWidth, this.frameHeight);
			}
	
			this.frameCache[i] = frameObject;
		}
	},

	/**
	 * Returns a frame from the spritesheet.
	 * @param frameIndex - The index of the frame to return.
	 * !getFrame (frameIndex: number) : Drawable;
	 */
	getFrame: function (frameIndex)
	{
		if (frameIndex < 0 || frameIndex >= this.numFrames)
			throw new Error ('frameIndex out of range');

		return this.frameCache[frameIndex];
	},

	/**
	 * Returns the texture related to the spritesheet.
	 * !getTexture() : Texture;
	 */
	getTexture: function()
	{
		return this.getFrame(0).getTexture();
	},

	/**
	 * Returns the default drawable of the spritesheet (first frame).
	 * !getDrawable() : Drawable;
	 */
	getDrawable: function()
	{
		return this.getFrame(0);
	}
});
