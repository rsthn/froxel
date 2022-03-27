/*
**	math/bounds2.js
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

import { Class } from 'rinn';
import Recycler from '../utils/recycler.js';
import Point2 from './point2.js';
import Rect from './rect.js';

//![import "../utils/recycler"]
//![import "./point2"]
//![import "./rect"]

//:/**
//: * 	Representation of a bounding box in 2D space. The component values are upscaled by a fixed number of bits to allow sub-pixel
//: * 	translations (internally), but the public values will always be integers.
//: */

//!class Bounds2

const Bounds2 = Class.extend
({
	className: 'Bounds2',

	/**
	 * 	Coordinates of the bounds (cx and cy are for the center). Note that this fields are read only and should be
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
	 * 	Upscaled coordinates.
	 */
	ucx: 0, ucy: 0,
	ux1: 0, uy1: 0,
	ux2: 0, uy2: 0,

	/**
	 * !constructor (bounds: Bounds2);
	 */
	/**
	 * !constructor (rect: Rect);
	 */
	/**
	 * !constructor (width: number, height: number);
	 */
	/**
	 * !constructor (x1: number, y1: number, x2: number, y2: number, upscaled:boolean=false);
	 */
	__ctor: function (x1=null, y1=null, x2=null, y2=null, upscaled=false)
	{
		if (x1 === null)
		{
			this.ux1 = this.uy1 = this.ux2 = this.uy2 = this.ucx = this.ucy = 0;
			return this.downscale();
		}

		if (y1 !== null && x2 === null)
			return this.set(0, 0, 0, 0).resize(x1, y1);

		return this.set(x1, y1, x2, y2, upscaled);
	},

	/**
	 * Populates the downscaled components.
	 */
	downscale: function ()
	{
		this.x1 = downscale(this.ux1);
		this.y1 = downscale(this.uy1);
		this.x2 = downscale(this.ux2);
		this.y2 = downscale(this.uy2);
		this.cx = downscale(this.ucx);
		this.cy = downscale(this.ucy);

		return this;
	},

	/**
	 * Truncates the components to remove fractional parts.
	 * !trunc() : Bounds2;
	 */
	trunc: function ()
	{
		this.ux1 = upscale(this.x1);
		this.uy1 = upscale(this.y1);
		this.ux2 = upscale(this.x2);
		this.uy2 = upscale(this.y2);
		this.ucx = upscale(this.cx);
		this.ucy = upscale(this.cy);

		return this;
	},

	/**
	 * Clones the bounds and returns a new object.
	 * !clone() : Bounds2;
	 */
	clone: function ()
	{
		return Bounds2.Pool.alloc(this.ux1, this.uy1, this.ux2, this.uy2, true);
	},

	/**
	 * Sets the components to zero.
	 * !zero() : Bounds2;
	 */
	zero: function ()
	{
		this.ux1 = 0; this.uy1 = 0;
		this.ux2 = 0; this.uy2 = 0;
		this.ucx = 0; this.ucy = 0;

		return this.downscale();
	},

	/**
	 * Resets the component values to `null` for subsequent use with `setAsUnion`.
	 * !reset() : Bounds2;
	 */
	reset: function ()
	{
		this.ux1 = null; this.uy1 = null;
		this.ux2 = null; this.uy2 = null;
		this.ucx = null; this.ucy = null;

		this.x1 = null; this.y1 = null;
		this.x2 = null; this.y2 = null;
		this.cx = null; this.cy = null;

		return this;
	},

	/**
	 * Translates the bounds by the given deltas.
	 * !translate (point: Point2) : Bounds2;
	 */
	/**
	 * Translates the bounds by the given deltas.
	 * !translate (vec: Vec2) : Bounds2;
	 */
	/**
	 * Translates the bounds by the given deltas.
	 * !translate (dx: number, dy: number, upscaled:boolean=false) : Bounds2;
	 */
	translate: function (dx, dy=null, upscaled=false)
	{
		if (dy === null)
		{
			if (Point2.isInstance(dx)) {
				dy = dx.uy;
				dx = dx.ux;
			} else { // Vec2
				dy = upscale(dx.y);
				dx = upscale(dx.x);
			}
		}
		else {
			if (!upscaled) {
				dx = upscale(dx);
				dy = upscale(dy);
			}
		}

		this.ux1 += dx; this.uy1 += dy;
		this.ux2 += dx; this.uy2 += dy;
		this.ucx += dx; this.ucy += dy;

		return this.downscale();
	},

	/*
	**	Sets the coordinates of the bounds.
	**
	**	Bounds2 set (Bounds2 b)
	**	Bounds2 set (Rect r)
	**	Bounds2 set (float x1, float y1, float x2, float y2, bool upscaled=false)
	*/
	set: function (x1, y1=null, x2=null, y2=null, upscaled=false)
	{
		if (y1 === null)
		{
			if (Bounds2.isInstance(x1)) {
				y2 = x1.uy2;
				x2 = x1.ux2;
				y1 = x1.uy1;
				x1 = x1.ux1;
			} else {
				y2 = upscale(x1.y2);
				x2 = upscale(x1.x2);
				y1 = upscale(x1.y1);
				x1 = upscale(x1.x1);
			}
		}
		else
		{
			if (!upscaled) {
				x1 = upscale(x1);
				y1 = upscale(y1);
				x2 = upscale(x2);
				y2 = upscale(y2);
			}
		}

		this.ux1 = x1;
		this.uy1 = y1;
		this.ux2 = x2;
		this.uy2 = y2;

		this.ucx = (x1 + x2) >> 1;
		this.ucy = (y1 + y2) >> 1;

		return this.downscale();
	},

	/*
	**	Adds the specified coordinates to the current ones.
	**
	**	Bounds2 add (Bounds2 b)
	**	Bounds2 add (Rect r)
	**	Bounds2 add (float x1, float y1, float x2, float y2, bool upscaled=false)
	*/
	add: function (x1, y1=null, x2=null, y2=null, upscaled=false)
	{
		if (y1 === null)
		{
			if (Bounds2.isInstance(x1)) {
				y2 = x1.uy2;
				x2 = x1.ux2;
				y1 = x1.uy1;
				x1 = x1.ux1;
			} else {
				y2 = upscale(x1.y2);
				x2 = upscale(x1.x2);
				y1 = upscale(x1.y1);
				x1 = upscale(x1.x1);
			}
		}
		else
		{
			if (!upscaled) {
				x1 = upscale(x1);
				y1 = upscale(y1);
				x2 = upscale(x2);
				y2 = upscale(y2);
			}
		}

		this.ux1 += x1;
		this.uy1 += y1;
		this.ux2 += x2;
		this.uy2 += y2;

		this.ucx += (x1 + x2) >> 1;
		this.ucy += (y1 + y2) >> 1;

		return this.downscale();
	},

	/*
	**	Returns true if the integer coordinates have the same values as the given argument.
	**
	**	bool equals (Bounds2 b)
	**	bool equals (Rect r)
	**	bool equals (float x1, float y1, float x2, float y2)
	*/
	equals: function (x1, y1=null, x2=null, y2=null)
	{
		if (y1 === null)
		{
			if (Bounds2.isInstance(x1)) {
				y2 = x1.y2;
				x2 = x1.x2;
				y1 = x1.y1;
				x1 = x1.x1;
			} else {
				y2 = int(x1.y2);
				x2 = int(x1.x2);
				y1 = int(x1.y1);
				x1 = int(x1.x1);
			}
		}
		else
		{
			x1 = int(x1);
			y1 = int(y1);
			x2 = int(x2);
			y2 = int(y2);
		}

		return x1 == this.x1 && x2 == this.x2 && y1 == this.y1 && y2 == this.y2;
	},

	/*
	**	Returns a bool indicating if the specified bounds are contained by the current bounds.
	**
	**	bool contains (Bounds2 b)
	**	bool contains (Rect r)
	**	bool contains (float x1, float y1, float x2, float y2)
	*/
	contains: function (x1, y1=null, x2=null, y2=null)
	{
		if (y1 === null)
		{
			if (Bounds2.isInstance(x1)) {
				y2 = x1.y2;
				x2 = x1.x2;
				y1 = x1.y1;
				x1 = x1.x1;
			} else {
				y2 = int(x1.y2);
				x2 = int(x1.x2);
				y1 = int(x1.y1);
				x1 = int(x1.x1);
			}
		}
		else
		{
			x1 = int(x1);
			y1 = int(y1);
			x2 = int(x2);
			y2 = int(y2);
		}

		return (x1 == Math.max(this.x1, x1)) && (y1 == Math.max(this.y1, y1)) && (x2 == Math.min(this.x2, x2)) && (y2 == Math.min(this.y2, y2));
	},

	/*
	**	Extends the coordinates to ensure the specified argument is contained.
	**
	**	Bounds2 setAsUnion (Bounds2 b)
	**	Bounds2 setAsUnion (Rect r)
	**	Bounds2 setAsUnion (Point2 p)
	**	Bounds2 setAsUnion (Vec2 v)
	**	Bounds2 setAsUnion (float x, float y)
	**	Bounds2 setAsUnion (float x1, float y1, float x2, float y2)
	*/
	setAsUnion: function (x1, y1=null, x2=null, y2=null)
	{
		if (y1 === null)
		{
			if (Bounds2.isInstance(x1))
			{
				this.setAsUnion(x1.ux1, x1.uy1, true);
				this.setAsUnion(x1.ux2, x1.uy2, true);
				return this;
			}
			else if (Rect.isInstance(x1))
			{
				this.setAsUnion(x1.x1, x1.y1);
				this.setAsUnion(x1.x2, x1.y2);
				return this;
			}
			else if (Point2.isInstance(x1))
			{
				y1 = x1.uy;
				x1 = x1.ux;
			}
			else // Vec2
			{
				y1 = upscale(x1.y);
				x1 = upscale(x1.x);
			}
		}
		else
		{
			if (y2 !== null)
			{
				this.setAsUnion(x1, y1);
				this.setAsUnion(x2, y2);
				return this;
			}
			else
			{
				if (x2 !== true)
				{
					x1 = upscale(x1);
					y1 = upscale(y1);
				}
			}
		}

		if (this.ux1 === null || x1 < this.ux1) this.ux1 = x1;
		if (this.uy1 === null || y1 < this.uy1) this.uy1 = y1;
		if (this.ux2 === null || x1 > this.ux2) this.ux2 = x1;
		if (this.uy2 === null || y1 > this.uy2) this.uy2 = y1;

		this.ucx = (this.ux1 + this.ux2) >> 1;
		this.ucy = (this.uy1 + this.uy2) >> 1;

		return this.downscale();
	},

	/*
	**	Returns a bool indicating if the integer components of the bounds intersect with the specified argument.
	**
	**	bool intersects (Bounds2 b)
	**	bool intersects (Rect r)
	**	bool intersects (float x1, float y1, float x2, float y2)
	*/
	intersects: function (x1, y1=null, x2=null, y2=null)
	{
		if (y1 === null)
		{
			if (Bounds2.isInstance(x1)) {
				y2 = x1.y2;
				x2 = x1.x2;
				y1 = x1.y1;
				x1 = x1.x1;
			} else {
				y2 = int(x1.y2);
				x2 = int(x1.x2);
				y1 = int(x1.y1);
				x1 = int(x1.x1);
			}
		}
		else
		{
			x1 = int(x1);
			y1 = int(y1);
			x2 = int(x2);
			y2 = int(y2);
		}

		let _x1 = Math.max(this.x1, x1);
		let _y1 = Math.max(this.y1, y1);
		let _x2 = Math.min(this.x2, x2);
		let _y2 = Math.min(this.y2, y2);

		return Math.max(0, _y2-_y1) * Math.max(0, _x2-_x1) > 0;
	},

	/*
	**	Sets the bounds to the intersection formed by the current bounds and the given argument.
	**
	**	Bounds2 setAsIntersection (Bounds2 b)
	**	Bounds2 setAsIntersection (Rect r)
	**	Bounds2 setAsIntersection (float x1, float y1, float x2, float y2)
	*/
	setAsIntersection: function (x1, y1=null, x2=null, y2=null)
	{
		if (y1 === null)
		{
			if (Bounds2.isInstance(x1)) {
				y2 = x1.y2;
				x2 = x1.x2;
				y1 = x1.y1;
				x1 = x1.x1;
			} else {
				y2 = int(x1.y2);
				x2 = int(x1.x2);
				y1 = int(x1.y1);
				x1 = int(x1.x1);
			}
		}
		else
		{
			x1 = int(x1);
			y1 = int(y1);
			x2 = int(x2);
			y2 = int(y2);
		}

		this.ux1 = upscale(Math.max(this.x1, x1));
		this.uy1 = upscale(Math.max(this.y1, y1));
		this.ux2 = upscale(Math.min(this.x2, x2));
		this.uy2 = upscale(Math.min(this.y2, y2));

		this.ucx = (this.ux1 + this.ux2) >> 1;
		this.ucy = (this.uy1 + this.uy2) >> 1;

		this.downscale();

		return Math.max(0, this.uy2-this.uy1) * Math.max(0, this.ux2-this.ux1) > 0;
	},

	/*
	**	Resizes the bounds to the given size using center or top-left as reference.	 
	**
	**	Bounds2 resize (float width, float height, bool topLeftRelative=false)
	*/
	resize: function (width, height, topLeftRelative=false)
	{
		width = width !== null ? upscale(width) : (this.ux2 - this.ux1);
		height = height !== null ? upscale(height) : (this.uy2 - this.uy1);

		if (topLeftRelative === true)
		{
			this.ux2 = this.ux1 + width;
			this.uy2 = this.uy1 + height;

			this.ucx = (this.ux1 + this.ux2) >> 1;
			this.ucy = (this.uy1 + this.uy2) >> 1;
		}
		else
		{
			width >>= 1; height >>= 1;

			this.ux1 = this.ucx - width; this.uy1 = this.ucy - height;
			this.ux2 = this.ucx + width; this.uy2 = this.ucy + height;
		}

		return this.downscale();
	},

	/*
	**	Resizes the bounds using the specified deltas (using the center or top-left corner as reference).
	**
	**	Bounds2 resizeBy (float dwidth, float dheight, bool topLeftRelative=false)
	*/
	resizeBy: function (dwidth, dheight, topLeftRelative=false)
	{
		dwidth = upscale(dwidth);
		dheight = upscale(dheight);

		if (topLeftRelative === true)
		{
			this.ux2 += dwidth;
			this.uy2 += dheight;

			this.ucx = (this.ux1 + this.ux2) >> 1;
			this.ucy = (this.uy1 + this.uy2) >> 1;
		}
		else
		{
			dwidth >>= 1; dheight >>= 1;

			this.ux1 -= dwidth; this.uy1 -= dheight;
			this.ux2 += dwidth; this.uy2 += dheight;
		}

		return this.downscale();
	},

	/**
	 * Returns the width of the bounds.
	 * !width(): number
	 */
	width: function ()
	{
		return this.x2 - this.x1;
	},

	/**
	 * Returns the height of the bounds.
	 * !height(): number
	 */
	height: function ()
	{
		return this.y2 - this.y1;
	},

	/**
	 * Returns true if the bounds are in forward position (x1 < x2 and y1 < y2).
	 * !isForward() : boolean;
	 */
	isForward: function ()
	{
		return this.ux1 <= this.ux2 && this.uy1 <= this.uy2;
	},

	/**
	 * Returns true if the specified point is within the bounds. The `tol` parameter is used to specify a tolerance value.
	 * !containsPoint (x: number, y: number, tol:number=0) : boolean;
	 */
	containsPoint: function (x, y, tol=0)
	{
		x = upscale(x);
		y = upscale(y);
		tol = upscale(tol);

		return (this.ux1-tol <= x && x <= this.ux2+tol) && (this.uy1-tol <= y && y <= this.uy2+tol);
	},

	/**
	 * Returns the area of the bounds. When strict is true, the area will be returned only if the bounds are forward.
	 * !area (strict:boolean=false) : number;
	 */
	area: function (strict=false)
	{
		return strict ? (this.isForward() ? (this.y2-this.y1)*(this.x2-this.x1) : 0) : ((this.y2-this.y1)*(this.x2-this.x1));
	},

	/**
	 * Returns the string representation of the rect coordinates.
	 * !toString() : string;
	 */
	toString: function ()
	{
		return '(' + this.x1 + ', ' + this.y1 + ', ' + this.x2 + ', ' + this.y2 + ')';
	},

	/**
	 * Flattens the contents of the bounds.
	 * !flatten() : \[number,number,number,number\];
	 */
	flatten: function ()
	{
		return [this.ux1, this.uy1, this.ux2, this.uy2];
	},

	/**
	 * Unflattens the given array into the bounds object.
	 * !unflatten (data: \[number,number,number,number\]) : Bounds2;
	 */
	unflatten: function (x)
	{
		this.ux1 = x[0];
		this.uy1 = x[1];
		this.ux2 = x[2];
		this.uy2 = x[3];

		this.ucx = (this.ux1 + this.ux2) >> 1;
		this.ucy = (this.uy1 + this.uy2) >> 1;

		return this.downscale();
	}
});

//!/class

//!namespace Rect
//!namespace Pool

	/**
	 * 	Allocates a new object of zero size.
	 * 	!function alloc() : Bounds2;
	 */

Recycler.createPool (Bounds2, 8192, 3072);
export default Bounds2;
