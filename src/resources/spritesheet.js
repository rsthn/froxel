
import Drawable from '../flow/drawable.js';

/*
	If source is "image":
		config: {
			sheetWidth: int, frameWidth: int, frameHeight: int?, numFrames: int?
			--OR--
			numFrames: int, frameWidth: int, frameHeight: int?
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

	__ctor: function (spritesheet, frameIndex)
	{
		this._super.Drawable.__ctor(null, spritesheet.width, spritesheet.height);

		this.spritesheet = spritesheet;
		this.frameIndex = frameIndex;

		this.width = spritesheet.width;
		this.height = spritesheet.height;

		this.swidth = spritesheet.frameWidth;
		this.sheight = spritesheet.frameHeight;
	}
});

export default Drawable.extend
({
	className: 'Spritesheet',

	numCols: 0,
	numFrames: 0,

	frameCache: null,

	__ctor: function (r)
	{
		this._super.Drawable.__ctor();

		if ((r.type != 'image' && r.type != 'images'))
			throw new Error ('Resource is not a sprite sheet.');

		var r_scale, v_scale;

		if (r.type == 'image')
		{
			if (!r.config.sheetWidth && (!r.config.numFrames || !r.config.frameWidth))
				throw new Error (r.resName + ': required sheetWidth or numFrames+frameWidth');

			if (!r.config.sheetWidth)
				r.config.sheetWidth = r.width; //r.config.numFrames * r.config.frameWidth;

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

		if (r.type == 'image')
		{
			this.numCols = int(r.data.width / this.frameWidth);
			this.numRows = Math.ceil(r.data.height / this.frameHeight);

			this.numFrames = r.config.numFrames || (this.numCols * this.numRows);
		}
		else
		{
			this.numCols = this.numRows = 0;
			this.numFrames = r.data.length;
		}

		this.frameCache = { };

		this.r = r;
		this.r.wrapper = this;

		// Preload frameCache.
		for (let i = 0; i < this.numFrames; i++)
			this.getFrame(i);
	},

	getFrame: function (x, y=null)
	{
		let frameIndex = y !== null ? y*this.numCols+x : x;
		if (frameIndex < 0 || frameIndex >= this.numFrames)
			throw new Error ('frameIndex out of range');

		if (this.frameCache[frameIndex])
			return this.frameCache[frameIndex];

		let frameObject = new FrameDrawable (this, frameIndex);

		if (this.numCols != 0)
		{
			frameObject.sy = int(frameIndex / this.numCols) * this.frameHeight;
			frameObject.sx = (frameIndex % this.numCols) * this.frameWidth;
			frameObject.resource = this.r.data;
		}
		else
		{
			frameObject.resource = this.r.data[frameIndex].data;
		}

		return this.frameCache[frameIndex] = frameObject;
	},

	getTexture: function()
	{
		return this.getFrame(0).getTexture();
	},

	getDrawable: function()
	{
		return this.getFrame(0);
	}
});
