
import { Rinn, Class } from 'rinn';

//:/**
//: * 	Describes an object that can be drawn to a Canvas.
//: */

//!class Drawable

const Drawable = Class.extend
({
	className: 'Drawable',

	/**
	 * Image resource.
	 * @protected
	 * !readonly resource: Texture;
	 */
	resource: null,

	/**
	 * Logical width of the drawable.
	 * @protected
	 * !readonly width: number;
	 */
	width: 0,

	/**
	 * Logical height of the drawable.
	 * @protected
	 * !readonly height: number;
	 */
	height: 0,

	/**
	 * Frame source X-offset in physical units.
	 * @protected
	 * !readonly sx: number;
	 */
	sx: 0,

	/**
	 * Frame source Y-position in physical units.
	 * @protected
	 * !readonly sy: number;
	 */
	sy: 0,

	/**
	 * Frame source width in physical units.
	 * @protected
	 * !readonly swidth: number;
	 */
	swidth: 0,

	/**
	 * Frame source height in physical units.
	 * @protected
	 * !readonly sheight: number;
	 */
	sheight: 0,

	/**
	 * Initializes the instance.
	 * !constructor();
	 */
	__ctor: function (resource=null, width=null, height=null)
	{
		if (Rinn.isInstanceOf(resource, Drawable))
		{
			let drawable = resource;

			this.resource = drawable.resource;
			this.width = width ?? drawable.width;
			this.height = height ?? drawable.height;

			this.sx = drawable.sx;
			this.sy = drawable.sy;
			this.swidth = drawable.swidth;
			this.sheight = drawable.sheight;
		}
		else
		{
			this.resource = resource;

			this.sx = 0;
			this.sy = 0;

			if (this.resource)
			{
				this.width = width ?? resource.targetWidth;
				this.height = height ?? resource.targetHeight;

				this.swidth = resource.width;
				this.sheight = resource.height;
			}
			else
			{
				this.width = width;
				this.height = height;

				this.swidth = width;
				this.sheight = height;
			}
		}
	},

	/**
	 * Returns the actual independent drawable object.
	 * !getDrawable(): Drawable;
	 */
	getDrawable: function()
	{
		return this;
	},

	/**
	 * Returns the underlying Image object, can be used directly with Canvas.drawImage.
	 * @deprecated
	 * !getImage(): Texture;
	 * TODO remove in next major version
	 */
	getImage: function()
	{
		return this.resource;
	},

	/**
	 * Returns the underlying texture object.
	 * !getTexture(): Texture;
	 */
	getTexture: function()
	{
		return this.resource;
	},

	/**
	 * Resizes the logical dimensions of the drawable.
	 * !resize (width: number|boolean|null, height: number|boolean|null) : Drawable;
	 */
	resize: function (width, height)
	{
		width = width !== null ? (width !== true ? width : true) : this.width;
		height = height !== null ? (height !== true ? height : true)  : this.height;

		if (width === true)
			width = height*(this.width/this.height);
		else if (height === true)
			height = width*(this.height/this.width);

		this.width = width;
		this.height = height;

		return this;
	},

	/**
	 * Draws the drawable on the canvas.
	 * !draw (g: Canvas, x: number, y: number, width?: number|null, height?: number|null) : void;
	 */
	draw: function (g, x, y, width=null, height=null)
	{
		width = width ?? this.width;
		height = height ?? this.height;

		this.drawf(g, this.sx, this.sy, this.swidth, this.sheight, x, y, width, height);
	},

	/**
	 * Draws a section of the drawable on the canvas using full parameters.
	 * !drawf (g: Canvas, sx:number, sy:number, swidth:number, sheight:number, tx:number, ty:number, twidth:number, theight:number, fwidth?:number|null, fheight?:number|null) : void;
	 */
	drawf: function (g, sx, sy, swidth, sheight, tx, ty, twidth, theight, fwidth=null, fheight=null)
	{
		g.drawImage (this.resource,
			sx, sy, swidth, sheight,
			tx, ty, twidth, theight,
			null, null, fwidth ?? twidth, fheight ?? theight);
	},

	/**
	 * Renders the drawable for the specified element.
	 * !render (g: Canvas, elem: Element) : void;
	 */
	render: function (g, elem)
	{
		this.draw (g, elem.bounds.x1, elem.bounds.y1, elem.bounds.width(), elem.bounds.height());
	}
});


/**
 * Nine-Slice Drawable.
 */
const NineSlice = Drawable.extend
({
	className: 'DrawableNineSlice',

	ss: null,
	startingIndex: 0,

	__ctor: function (spritesheet, startingIndex)
	{
		this._super.Drawable.__ctor(spritesheet);

		if (spritesheet === null || !Class.instanceOf(spritesheet, 'Spritesheet'))
			throw new Error('NineSlice: spritesheet required');

		this.ss = spritesheet;
		this.startingIndex = startingIndex;
	},

	__dtor: function()
	{
		dispose(this.ss);
	},

	getTexture: function()
	{
		return this.ss.getTexture();
	},

	draw: function (g, x, y, width, height)
	{
		const k = this.startingIndex;

		let leftWidth = this.ss.getFrame(k+0).width;
		let rightWidth = this.ss.getFrame(k+2).width;
		let midWidth = this.ss.getFrame(k+1).width;

		let topHeight = this.ss.getFrame(k+0).height;
		let bottomHeight = this.ss.getFrame(k+6).height;
		let midHeight = this.ss.getFrame(k+3).height;

		let n = int((width - leftWidth - rightWidth) / midWidth);
		let m = int((height - topHeight - bottomHeight) / midHeight);

		let x1 = x;
		let y1 = y;

		// Corners
		this.ss.getFrame(k+0).draw(g, x1, y1);
		this.ss.getFrame(k+2).draw(g, x1 + leftWidth + n*midWidth, y1);
		this.ss.getFrame(k+6).draw(g, x1, y1 + topHeight + m*midHeight);
		this.ss.getFrame(k+8).draw(g, x1 + leftWidth + n*midWidth, y1 + topHeight + m*midHeight);

		// Top/Bottom
		for (let i = 0; i < n; i++) {
			this.ss.getFrame(k+1).draw(g, x1 + leftWidth + i*midWidth, y1);
			this.ss.getFrame(k+7).draw(g, x1 + leftWidth + i*midWidth, y1 + topHeight + m*midHeight);
		}

		// Left/Right
		for (let i = 0; i < m; i++) {
			this.ss.getFrame(k+3).draw(g, x1, y1 + topHeight + i*midHeight);
			this.ss.getFrame(k+5).draw(g, x1 + leftWidth + n*midWidth, y1 + topHeight + i*midHeight);
		}

		// Center
		for (let j = 0; j < m; j++)
		for (let i = 0; i < n; i++) {
			this.ss.getFrame(k+4).draw(g, x1 + leftWidth + i*midWidth, y1 + topHeight + j*midHeight);
		}
	}
});

Recycler.createPool(NineSlice, 512);


/**
 * Repeated drawable.
 */
const Repeated = Drawable.extend
({
	className: 'DrawableRepeated',

	drawable: null,

	__ctor: function (drawable)
	{
		this._super.Drawable.__ctor(drawable);
		this.drawable = drawable;
	},

	__dtor: function()
	{
		dispose(this.drawable);
	},

	drawf: function (g, sx, sy, swidth, sheight, tx, ty, twidth, theight, fwidth=null, fheight=null)
	{
		this.drawable.drawf(g, sx, sy, swidth, sheight, tx, ty, twidth, theight, this.width, this.height);
	}
});

Recycler.createPool(Repeated, 512);


/**
 * Clipped drawable.
 */
const Clipped = Drawable.extend
({
	className: 'DrawableClipped',

	drawable: null,

	__ctor: function (drawable)
	{
		this._super.Drawable.__ctor(drawable);
		this.drawable = drawable;
	},

	__dtor: function()
	{
		dispose(this.drawable);
	},

	draw: function (g, x, y, width=null, height=null)
	{
		let img = this.getTexture();
	
		width = width ?? this.width;
		height = height ?? this.height;

		this.drawable.drawf (g,
			this.drawable.sx, this.drawable.sy, width*img.rscale, height*img.rscale,
			x, y, width, height);
	}
});

Recycler.createPool(Clipped, 512);


/**
 * Centered drawable.
 */
const Centered = Drawable.extend
({
	className: 'DrawableCentered',

	drawable: null,
	offsX: 0,
	offsY: 0,

	__ctor: function (drawable, offsX, offsY)
	{
		this._super.Drawable.__ctor(drawable);

		this.drawable = drawable;
		this.offsX = offsX;
		this.offsY = offsY;
	},

	__dtor: function()
	{
		dispose(this.drawable);
	},

	draw: function (g, x, y, width=null, height=null)
	{
		width = width ?? this.width;
		height = height ?? this.height;

		this.drawable.draw(g, x+this.offsX+(width-this.width)*0.5, y+this.offsY+(height-this.height)*0.5, this.width, this.height);
	}
});

Recycler.createPool(Centered, 512);


/**
 * Static drawable.
 */
const Static = Drawable.extend
({
	className: 'DrawableStatic',

	drawable: null,
	offsX: 0,
	offsY: 0,

	__ctor: function (drawable, offsX, offsY)
	{
		this._super.Drawable.__ctor(drawable);

		this.drawable = drawable;
		this.offsX = offsX;
		this.offsY = offsY;
	},

	__dtor: function()
	{
		dispose(this.drawable);
	},

	draw: function (g, x, y, width=null, height=null)
	{
		this.drawable.draw(g, x+this.offsX, y+this.offsY, width, height);
	}
});

Recycler.createPool(Static, 512);


/**
 * Drawable group.
 */
const Group = Drawable.extend
({
	className: 'DrawableGroup',

	list: null,

	__ctor: function (list)
	{
		this._super.Drawable.__ctor();

		this.list = list;

		this.width = 0;
		this.height = 0;

		for (let i = 0; i < this.list.length; i++)
		{
			if (this.list[i].width > this.width) this.width = this.list[i].width;
			if (this.list[i].height > this.height) this.height = this.list[i].height;
		}

		this.swidth = this.width;
		this.sheight = this.height;
	},

	__dtor: function()
	{
		if (this.list !== null)
		{
			for (let i = 0; i < this.list.length; i++)
				dispose(this.list[i]);

			this.list = null;
		}
	},

	draw: function (g, x, y, width=null, height=null)
	{
		for (let i = 0; i < this.list.length; i++)
			this.list[i].draw(g, x, y, width, height);
	},

	render: function (g, elem)
	{
		for (let i = 0; i < this.list.length; i++)
			this.list[i].render(g, elem);
	}
});

Recycler.createPool(Group, 512);


/**
 * Draws the given drawable mirrored horizontally.
 */
const MirrorX = Drawable.extend
({
	className: 'DrawableMirrorX',

	drawable: null,

	__ctor: function (drawable)
	{
		this._super.Drawable.__ctor(drawable);
		this.drawable = drawable;
	},

	__dtor: function()
	{
		dispose(this.drawable);
	},

	drawf: function (g, sx, sy, swidth, sheight, tx, ty, twidth, theight, fwidth=null, fheight=null)
	{
		g.pushMatrix();
		g.translate(tx+twidth, ty);
		g.scale(-1, 1);
		this.drawable.drawf(g, sx, sy, swidth, sheight, 0, 0, twidth, theight, fwidth, fheight);
		g.popMatrix();
	}
});

Recycler.createPool(MirrorX, 512);


/**
 * Draws the given drawable mirrored vertically.
 */
const MirrorY = Drawable.extend
({
	className: 'DrawableMirrorY',

	drawable: null,

	__ctor: function (drawable)
	{
		this._super.Drawable.__ctor(drawable);
		this.drawable = drawable;
	},

	__dtor: function()
	{
		dispose(this.drawable);
	},

	drawf: function (g, sx, sy, swidth, sheight, tx, ty, twidth, theight, fwidth=null, fheight=null)
	{
		g.pushMatrix();
		g.translate(tx, ty+theight);
		g.scale(1, -1);
		this.drawable.drawf(g, sx, sy, swidth, sheight, 0, 0, twidth, theight, fwidth, fheight);
		g.popMatrix();
	}
});

Recycler.createPool(MirrorY, 512);


/**
 * Drawable made with a composition of tiles from a nine-slice spritesheet to create a rectangle.
 * !static nineSlice (spritesheet: object, startingIndex?:number|0) : Drawable;
 */
//violet: type fixup
//static nineSlice (spritesheet: Spritesheet, startingIndex?:number|0) : Drawable;
Drawable.nineSlice = function (spritesheet, startingIndex=0) { return NineSlice.Pool.alloc(spritesheet, startingIndex); }
/**
 * Drawable made with a composition of tiles from a nine-slice spritesheet to create a rectangle.
 * !nineSlice (startingIndex?:number|0) : Drawable;
 */
Drawable.prototype.nineSlice = function(startingIndex=0) { return NineSlice.Pool.alloc(this, startingIndex); }

/**
 * Drawable tiles to the target size.
 * !static repeated (drawable: Drawable) : Drawable;
 */
Drawable.repeated = function (drawable) { return Repeated.Pool.alloc(drawable); }
/**
 * Drawable tiles to the target size.
 * !repeated () : Drawable;
 */
Drawable.prototype.repeated = function () { return Repeated.Pool.alloc(this); }

/**
 * Drawable clipped to the target size.
 * !static clipped (drawable: Drawable) : Drawable;
 */
Drawable.clipped = function (drawable) { return Clipped.Pool.alloc(drawable); }
/**
 * Drawable clipped to the target size.
 * !clipped () : Drawable;
 */
Drawable.prototype.clipped = function () { return Clipped.Pool.alloc(this); }

/**
 * Drawable centered to the target rectangle.
 * !static centered (drawable: Drawable, offsX?: number, offsY?: number) : Drawable;
 */
Drawable.centered = function (drawable, offsX, offsY) { return Centered.Pool.alloc(drawable, offsX, offsY); }
/**
 * Drawable centered to the target rectangle.
 * !centered (offsX?: number, offsY?: number) : Drawable;
 */
Drawable.prototype.centered = function (offsX, offsY) { return Centered.Pool.alloc(this, offsX, offsY); }

/**
 * Drawable as-is without stretching it.
 * !static static (drawable: Drawable, offsX?: number, offsY?: number) : Drawable;
 */
Drawable.static = function (drawable, offsX, offsY) { return Static.Pool.alloc(drawable, offsX, offsY); }
/**
 * Drawable as-is without stretching it.
 * !static (offsX?: number, offsY?: number) : Drawable;
 */
Drawable.prototype.static = function (offsX, offsY) { return Static.Pool.alloc(this, offsX, offsY); }

/**
 * Creates a drawable group.
 * !static group (...args: Array<Drawable>) : Drawable;
 */
Drawable.group = function (...args) { return Group.Pool.alloc(args); }

/**
 * Drawable mirrored horizontally.
 * !static mirrorX (drawable: Drawable) : Drawable;
 */
Drawable.mirrorX = function (drawable) { return MirrorX.Pool.alloc(drawable); }
/**
 * Drawable mirrored horizontally.
 * !mirrorX () : Drawable;
 */
Drawable.prototype.mirrorX = function () { return MirrorX.Pool.alloc(this); }

/**
 * Drawable mirrored vertically.
 * !static mirrorY (drawable: Drawable) : Drawable;
 */
Drawable.mirrorY = function (drawable) { return MirrorY.Pool.alloc(drawable); }
/**
 * Drawable mirrored vertically.
 * !mirrorY () : Drawable;
 */
Drawable.prototype.mirrorY = function () { return MirrorY.Pool.alloc(this); }

//!/class

//!namespace Drawable
//!namespace Pool

	/**
	 * Allocates a drawable object.
	 * !function alloc () : Drawable;
	 */

Recycler.createPool(Drawable, 512);
export default Drawable;
