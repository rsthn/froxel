/*
**	math/rect.js
**
**	Copyright (c) 2016-2021, RedStar Technologies, All rights reserved.
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

import { Class } from '@rsthn/rin';
import Recycler from '../utils/recycler.js';

//![import "../utils/recycler"]
//![import "./vec2"]

//:/**
//: * 	Represents a 2D rectangle.
//: */

//!class Rect

const Rect = Class.extend
({
	className: 'Rect',

	/**
	 * 	Coordinates of the rectangle (cx and cy are for the center). Note that this fields are readonly they should be
	 * 	modified through methods only.
	 */

	/**
	 * 	!readonly cx: number;
	 */
	cx: 0,
	/**
	 * 	!readonly cy: number;
	 */
	cy: 0,
	/**
	 * 	!readonly x1: number;
	 */
	x1: 0,
	/**
	 * 	!readonly y1: number;
	 */
	y1: 0,
	/**
	 * 	!readonly x2: number;
	 */
	x2: 0,
	/**
	 * 	!readonly y2: number;
	 */
	y2: 0,

	/**
	 * 	Constructs a rectangle of zero size, centered at (0, 0).
	 * 	!constructor();
	 */
	/**
	 * 	Constructs a rectangle centered at (0, 0) with the specified size.
	 * 	!constructor (width: number, height: number);
	 */
	/**
	 * 	Constructs a rectangle with the specified coordinates.
	 * 	!constructor (x1: number, y1: number, x2: number, y2: number);
	 */
	__ctor: function (x1=null, y1=null, x2=null, y2=null)
	{
		if (x1 === null)
		{
			this.x1 = this.y1 = this.x2 = this.y2 = this.cx = this.cy = 0;
			return this;
		}

		if (x2 === null)
		{
			this.set (0, 0, 0, 0);
			this.resize (x1, y1);
			return this;
		}

		return this.set(x1, y1, x2, y2);
	},

	/*
	**	Destructor.
	*/
	__dtor: function ()
	{
	},

	/**
	 * 	Returns a clone of the rectangle.
	 * 	!clone() : Rect;
	 */
	clone: function ()
	{
		return Rect.Rool.alloc(this.x1, this.y1, this.x2, this.y2);
	},

	/**
	 * 	Sets all coordinates of the rectangle to zero.
	 * 	!zero() : Rect;
	 */
	zero: function ()
	{
		this.cx = 0; this.cy = 0;
		this.x1 = 0; this.y1 = 0;
		this.x2 = 0; this.y2 = 0;

		return this;
	},

	/**
	 * 	Sets all coordinates of the rectangle to `null` for subsequent use with `extendWithPoint`.
	 * 	!reset() : Rect;
	 */
	reset: function ()
	{
		this.cx = null; this.cy = null;
		this.x1 = null; this.y1 = null;
		this.x2 = null; this.y2 = null;

		return this;
	},

	/**
	 * 	Extends the rectangle to contain the specified vector coordinates.
	 * 	!extendWithPoint (v: Vec2) : Rect;
	 */
	/**
	 * 	Extends the rectangle to contain the specified point.
	 * 	!extendWithPoint (x: number, y: number) : Rect;
	 */
	extendWithPoint: function (x, y=null)
	{
		if (y === null)
		{
			const r = x;
			x = r.x;
			y = r.y;
		}

		if (this.x1 === null || x < this.x1) this.x1 = x;
		if (this.y1 === null || y < this.y1) this.y1 = y;
		if (this.x2 === null || x > this.x2) this.x2 = x;
		if (this.y2 === null || y > this.y2) this.y2 = y;

		this.cx = (this.x1 + this.x2) / 2;
		this.cy = (this.y1 + this.y2) / 2;

		return this;
	},

	/**
	 * 	Translates the rectangle by the given deltas.
	 * 	!translate (dx: number, dy: number) : Rect;
	 */
	translate: function (dx, dy)
	{
		this.x1 += dx; this.y1 += dy;
		this.x2 += dx; this.y2 += dy;
		this.cx += dx; this.cy += dy;

		return this;
	},

	/**
	 * 	Moves the center of the rectangle to the specified position.	 
	 * 	@param normalized - When `true` the arguments `x` and `y` are treated as normalized ranging from 0 to 1 (inclusive).
	 * 	!centerAt (x: number, y: number, normalized?: false) : Rect;
	 */
	centerAt: function (x, y, normalized=false)
	{
		if (normalized == true)
		{
			x = this.x1 + x*(this.x2 - this.x1);
			y = this.y1 + y*(this.y2 - this.y1);
		}

		return this.translate (x - this.cx, y - this.cy);
	},

	/**
	 * 	Copies the coordinates of the specified rectangle.
	 * 	!set (r: Rect) : Rect;
	 */
	/**
	 * 	Sets the coordinates of the rectangle.
	 * 	!set (x1: number, y1: number, x2: number, y2: number) : Rect;
	 */
	set: function (x1, y1=null, x2=null, y2=null)
	{
		if (y1 === null)
		{
			const r = x1;
			x1 = r.x1; y1 = r.y1;
			x2 = r.x2; y2 = r.y2;
		}

		this.cx = (x1 + x2) / 2;
		this.cy = (y1 + y2) / 2;

		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;

		return this;
	},

	/**
	 * 	Returns `true` if the given rectangle coordinates are equal.
	 * 	!equals (r: Rect) : boolean;
	 */
	/**
	 * 	Returns `true` if the coordinates are equal.
	 * 	!equals (x1: number, y1: number, x2: number, y2: number) : boolean;
	 */
	equals: function (x1, y1=null, x2=null, y2=null)
	{
		if (y1 === null)
		{
			const r = x1;
			x1 = r.x1; y1 = r.y1;
			x2 = r.x2; y2 = r.y2;
		}

		return x1 == this.x1 && x2 == this.x2 && y1 == this.y1 && y2 == this.y2;
	},

	/**
	 * 	Returns `true` if the specified rectangle is contained in the current one.
	 * 	!contains (r: Rect) : boolean;
	 */
	/**
	 * 	Returns `true` if the specified rectangle is contained in the current one.
	 * 	!contains (x1: number, y1: number, x2: number, y2: number) : boolean;
	 */
	contains: function (x1, y1=null, x2=null, y2=null)
	{
		if (y1 === null)
		{
			const r = x1;
			x1 = r.x1; y1 = r.y1;
			x2 = r.x2; y2 = r.y2;
		}

		return (x1 == Math.max(this.x1, x1)) && (y1 == Math.max(this.y1, y1)) && (x2 == Math.min(this.x2, x2)) && (y2 == Math.min(this.y2, y2));
	},

	/**
	 * 	Sets the coordinates of the rectangle to the union of it and the given one.
	 * 	!setAsUnion (r: Rect) : Rect;
	 */
	/**
	 * 	Sets the coordinates of the rectangle to the union of it and the given one.
	 * 	!setAsUnion (x1: number, y1: number, x2: number, y2: number) : Rect;
	 */
	setAsUnion: function (x1, y1=null, x2=null, y2=null)
	{
		if (y1 === null)
		{
			const r = x1;
			x1 = r.x1; y1 = r.y1;
			x2 = r.x2; y2 = r.y2;
		}

		this.x1 = Math.min(this.x1, x1);
		this.y1 = Math.min(this.y1, y1);
		this.x2 = Math.max(this.x2, x2);
		this.y2 = Math.max(this.y2, y2);

		return this;
	},

	/**
	 * 	Returns `true` if the rectangles intersect.
	 * 	!intersects (r: Rect) : boolean;
	 */
	/**
	 * 	Returns `true` if the rectangles intersect.
	 * 	!intersects (x1: number, y1: number, x2: number, y2: number) : boolean;
	 */
	intersects: function (x1, y1=null, x2=null, y2=null)
	{
		if (y1 === null)
		{
			const r = x1;
			x1 = r.x1; y1 = r.y1;
			x2 = r.x2; y2 = r.y2;
		}

		let _x1 = Math.max(this.x1, x1);
		let _y1 = Math.max(this.y1, y1);
		let _x2 = Math.min(this.x2, x2);
		let _y2 = Math.min(this.y2, y2);

		return Math.max(0, _y2-_y1) * Math.max(0, _x2-_x1) > 0;
	},

	/**
	 * 	Sets the coordinates of the rectangle to the intersection of it and the given one.
	 * 	@returns Boolean indicating if the intersection is non-empty.
	 * 	!setAsIntersection (r: Rect) : boolean;
	 */
	/**
	 * 	Sets the coordinates of the rectangle to the intersection of it and the given one.
	 * 	@returns Boolean indicating if the intersection is non-empty.
	 * 	!setAsIntersection (x1: number, y1: number, x2: number, y2: number) : boolean;
	 */
	setAsIntersection: function (x1, y1=null, x2=null, y2=null)
	{
		if (y1 === null)
		{
			const r = x1;
			x1 = r.x1; y1 = r.y1;
			x2 = r.x2; y2 = r.y2;
		}

		this.x1 = Math.max(this.x1, x1);
		this.y1 = Math.max(this.y1, y1);
		this.x2 = Math.min(this.x2, x2);
		this.y2 = Math.min(this.y2, y2);

		return Math.max(0, this.y2-this.y1) * Math.max(0, this.x2-this.x1) > 0;
	},

	/**
	 * 	Resizes the rectangle to the given size using its center or top-left corner as reference.
	 * 	@param normalized - When `true` the `w` and `h` will be treated as normalized ranging from 0 to 1 (inclusive).
	 * 	@param topLeftRelative - When `true` reference will be top-left corner, set to `false` to use the center.
	 * 	!resize (w: number, h: number, normalized?: boolean, topLeftRelative?: boolean) : Rect;
	 */
	resize: function (w, h, normalized=false, topLeftRelative=false)
	{
		if (normalized == true)
		{
			w *= (this.x2 - this.x1);
			h *= (this.y2 - this.y1);
		}

		if (topLeftRelative == true)
		{
			this.x2 = this.x1 + w;
			this.y2 = this.y1 + h;
		}
		else
		{
			w /= 2; h /= 2;

			this.x1 = this.cx - w; this.y1 = this.cy - h;
			this.x2 = this.cx + w; this.y2 = this.cy + h;
		}

		return this;
	},

	/**
	 * 	Resizes the rectangle using the specified deltas, relative to its center or top-left corner.
	 * 	@param topLeftRelative - When `true` reference will be top-left corner, set to `false` to use the center.
	 * 	!resizeBy (dw: number, dh: number, topLeftRelative?: boolean) : Rect;
	 */
	resizeBy: function (dw, dh, topLeftRelative=false)
	{
		if (topLeftRelative == true)
		{
			this.x2 += dw;
			this.y2 += dh;
		}
		else
		{
			dw /= 2; dh /= 2;

			this.x1 -= dw; this.y1 -= dh;
			this.x2 += dw; this.y2 += dh;
		}

		return this;
	},

	/**
	 * 	Returns the width of the rectangle.
	 * 	!width() : number;
	 */
	width: function ()
	{
		return this.x2 - this.x1;
	},

	/**
	 * 	Returns the height of the rectangle.	 
	 * 	!height() : number;
	 */
	height: function ()
	{
		return this.y2 - this.y1;
	},

	/**
	 * 	Returns the normalized center X-coordinate of the rectangle.
	 * 	!ncx() : number;
	 */
	ncx: function ()
	{
		return (this.cx - this.x1) / (this.x2 - this.x1);
	},

	/**
	 * 	Returns the normalized center Y-coordinate of the rectangle.
	 * 	!ncy() : number;
	 */
	ncy: function ()
	{
		return (this.cy - this.y1) / (this.y2 - this.y1);
	},

	/**
	 * 	Returns `true` if the rectangle is a right rectangle, that is: x1 < x2 and y1 < y2.
	 * 	!isRight() : boolean;
	 */
	isRight: function ()
	{
		return this.x1 <= this.x2 && this.y1 <= this.y2;
	},

	/**
	 * 	Returns `true` if the specified point is contained in the rectangle.
	 * 	@param tol - Used to specify a tolerance value (default is zero).
	 * 	!containsPoint (x: number, y: number, tol?: number) : boolean;
	 */
	containsPoint: function (x, y, tol=0)
	{
		return (this.x1-tol <= x && x <= this.x2+tol) && (this.y1-tol <= y && y <= this.y2+tol);
	},

	/**
	 * 	Returns the area of the rectangle.
	 * 	@param strict - Indicates if the area is returned only if the rectangle is a right rectangle. 	 
	 * 	!area (strict?: boolean) : number;
	 */
	area: function (strict)
	{
		return strict ? (this.isRight() ? (this.y2-this.y1)*(this.x2-this.x1) : 0) : ((this.y2-this.y1)*(this.x2-this.x1));
	},

	/**
	 * 	Sets the components of the rectangle to their rounded-down integer parts.
	 * 	!floor() : Rect;
	 */
	floor: function()
	{
		this.x1 = Math.floor(this.x1);
		this.y1 = Math.floor(this.y1);
		this.x2 = Math.floor(this.x2);
		this.y2 = Math.floor(this.y2);
		this.cx = Math.floor(this.cx);
		this.cy = Math.floor(this.cy);
		return this;
	},

	/**
	 * 	Sets the components of the rectangle to their rounded-up integer parts.
	 * 	!ceil() : Rect;
	 */
	ceil: function()
	{
		this.x1 = Math.ceil(this.x1);
		this.y1 = Math.ceil(this.y1);
		this.x2 = Math.ceil(this.x2);
		this.y2 = Math.ceil(this.y2);
		this.cx = Math.ceil(this.cx);
		this.cy = Math.ceil(this.cy);
		return this;
	},

	/**
	 * 	Returns the string representation of the rectangle.
	 * 	!toString() : string;
	 */
	toString: function ()
	{
		return "(" + this.x1.toFixed(2) + ", " + this.y1.toFixed(2) + ", " + this.x2.toFixed(2) + ", " + this.y2.toFixed(2) + ")";
	},

	/**
	 * 	Flattens the rectangle.
	 * 	!flatten() : Array<number>;
	 */
	flatten: function ()
	{
		return [this.x1, this.y1, this.x2, this.y2];
	},

	/**
	 * 	Unflattens the rectangle.
	 * 	!unflatten(input: Array<number>) : Rect;
	 */
	unflatten: function (o)
	{
		this.set (o[0], o[1], o[2], o[3]);
		return this;
	}
});

//!/class

//!namespace Rect
//!namespace Pool

	/**
	 * 	Allocates a new rectangle of zero size.
	 * 	!function alloc() : Rect;
	 */
	/**
	 * 	Allocates a new rectangle centered at (0, 0) with the specified size.
	 * 	!function alloc (width: number, height: number) : Rect;
	 */
	/**
	 * 	Allocates a new rectangle with the specified coordinates.
	 * 	!function alloc (x1: number, y1: number, x2: number, y2: number) : Rect;
	 */

Recycler.createPool (Rect, 4096, 2048);
export default Rect;
