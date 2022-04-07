/*
**	flow/drawable.js
**
**	Copyright (c) 2013-2021, RedStar Technologies, All rights reserved.
**	https://rsthn.com/
**
**	THIS LIBRARY IS PROVIDED BY REDSTAR TECHNOLOGIES "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES,
**	INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A 
**	PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL REDSTAR TECHNOLOGIES BE LIABLE FOR ANY
**	DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT 
**	NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; 
**	OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, 
**	STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE
**	USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

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
	 * !readonly resource: HTMLImageElement|Canvas;
	 */
	resource: null,

	/**
	 * Width of the drawable.
	 * @protected
	 * !readonly width: number;
	 */
	width: 0,

	/**
	 * Height of the drawable.
	 * @protected
	 * !readonly height: number;
	 */
	height: 0,

	/**
	 * Frame X-position.
	 * @protected
	 * !readonly x: number;
	 */
	x: 0,

	/**
	 * Frame Y-position.
	 * @protected
	 * !readonly y: number;
	 */
	y: 0,

	/**
	 * Initializes the instance.
	 * !construct();
	 */
	__ctor: function (resource=null, width=null, height=null)
	{
		if (Rinn.isInstanceOf(resource, Drawable))
		{
			let drawable = resource;
			this.resource = drawable.resource;
			this.width = width ?? drawable.width;
			this.height = height ?? drawable.height;
		}
		else
		{
			this.resource = resource;
			this.width = resource ? (width ?? resource.targetWidth) : 0;
			this.height = resource ? (height ?? resource.targetHeight) : 0;
		}

		this.x = 0;
		this.y = 0;
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
	 * !getImage(): HTMLImageElement|Canvas;
	 */
	getImage: function()
	{
		return this.resource;
	},

	/**
	 * Draws the drawable on the given canvas.
	 * !draw (g: Canvas, x?: number, y?: number, width?: number, height?: number) : void;
	 */
	draw: function (g, x=0, y=0, width=null, height=null)
	{
		g.drawImage (this.resource,
				this.x, this.y, this.resource.width, this.resource.height,
				x, y, width ?? this.resource.targetWidth, height ?? this.resource.targetHeight,
				null, null, this.width, this.height);
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

	getImage: function()
	{
		return this.ss.getImage();
	},

	draw: function (g, x=0, y=0, width=null, height=null)
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

	draw: function (g, sx=0, sy=0, width=null, height=null)
	{
		let img = this.drawable.getImage();

		let h = height;
		let w = width;

		let ih = this.drawable.height;
		let iw = this.drawable.width;

		let rh = ih * img.rscale;
		let rw = iw * img.rscale;

		let x, y;

		for (y = 0; y+ih < h; y += ih)
		{
			for (x = 0; x+iw < w; x += iw)
			{
				g.drawImage (img,
						this.drawable.x, this.drawable.y, rw, rh,
						sx + x, sy + y, iw, ih);
			}

			if (x < w)
			{
				g.drawImage (img,
					this.drawable.x, this.drawable.y, (w-x)*img.rscale, rh,
					sx + x, sy + y, w-x, ih);
			}
		}

		if (y < h)
		{
			ih = h-y;
			rh = ih*img.rscale;

			for (x = 0; x+iw < w; x += iw)
			{
				g.drawImage (img,
						this.drawable.x, this.drawable.y, rw, rh,
						sx + x, sy + y, iw, ih);
			}

			if (x < w)
			{
				g.drawImage (img,
					this.drawable.x, this.drawable.y, (w-x)*img.rscale, rh,
					sx + x, sy + y, w-x, ih);
			}
		}
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

	draw: function (g, x=0, y=0, width=null, height=null)
	{
		let img = this.getImage();
	
		g.drawImage (img,
				this.drawable.x, this.drawable.y, width*img.rscale, height*img.rscale,
				x, y, width, height,
				null, null,
				this.width, this.height);
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

	draw: function (g, x=0, y=0, width=null, height=null)
	{
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

	draw: function (g, x=0, y=0, width=null, height=null)
	{
		this.drawable.draw(g, x+this.offsX, y+this.offsY, this.width, this.height);
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

	draw: function (g, x=0, y=0, width=null, height=null)
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
 * Drawable made with a composition of tiles from a nine-slice spritesheet to create a rectangle.
 * !static nineSlice (spritesheet: Spritesheet, startingIndex?:number=0) : Drawable;
 */
Drawable.nineSlice = function (spritesheet, startingIndex=0) { return NineSlice.Pool.alloc(spritesheet, startingIndex); }
/**
 * Drawable made with a composition of tiles from a nine-slice spritesheet to create a rectangle.
 * !nineSlice (startingIndex?:number=0) : Drawable;
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
 * !static group (...args) : Drawable;
 */
Drawable.group = function (...args) { return Group.Pool.alloc(args); }


//!/class

//!namespace Drawable
//!namespace Pool

	/**
	 * Allocates a drawable object.
	 * !function alloc () : Drawable;
	 */

Recycler.createPool(Drawable, 512);
export default Drawable;
