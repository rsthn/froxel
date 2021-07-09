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

import Recycler from '../utils/recycler.js';
import { Class } from '@rsthn/rin';

/*
**	Represents a 2D rectangle.
*/

const Rect = Class.extend
({
	className: 'Rect',

	/*
	**	Coordinates of the rectangle (cx and cy are for the center). Note that this fields are readonly they should be modified
	**	through methods only.
	*/
	cx: 0, cy: 0,
	x1: 0, y1: 0,
	x2: 0, y2: 0,

	/*
	**	Initializes the rect (takes 0, 2 or 4 parameters).
	*/
	init: function (x1=null, y1=null, x2=null, y2=null)
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

	/*
	**	Clones the rect and returns a new object.	 
	*/
	clone: function ()
	{
		return Rect.alloc().init(this.x1, this.y1, this.x2, this.y2);
	},

	zero: function ()
	{
		this.cx = 0; this.cy = 0;
		this.x1 = 0; this.y1 = 0;
		this.x2 = 0; this.y2 = 0;

		return this;
	},

	reset: function ()
	{
		this.cx = null; this.cy = null;
		this.x1 = null; this.y1 = null;
		this.x2 = null; this.y2 = null;

		return this;
	},

	/*
	**	Extends the rectangle to contain the specified point.
	**	
	**	Rect extendWithPoint (Vec2 v)
	**	Rect extendWithPoint (float x, float y)
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

	/*
	**	Translates the rectangle by the given deltas.	 
	*/
	translate: function (dx, dy)
	{
		this.x1 += dx; this.y1 += dy;
		this.x2 += dx; this.y2 += dy;
		this.cx += dx; this.cy += dy;

		return this;
	},

	/*
	**	Moves the center of the rectangle to the specified position.	 
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

	/*
	**	Sets the coordinates of the rectangle.
	**
	**	Rect set (Rect r)
	**	Rect set (float x1, float y1, float x2, float y2)
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

	/*
	**	Returns true if the specified rect is equal to the current rect.
	**
	**	bool equals (Rect r)
	**	bool equals (float x1, float y1, float x2, float y2)
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

	/*
	**	Returns a bool indicating if the specified rectangle object is contained by the current rectangle.
	**
	**	bool contains (Rect r)
	**	bool contains (float x1, float y1, float x2, float y2)
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

	/*
	**	Returns a bool indicating if the specified rectangle object is contained by the current rectangle.
	**
	**	Rect setAsUnion (Rect r)
	**	Rect setAsUnion (float x1, float y1, float x2, float y2)
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

	/*
	**	Returns a bool indicating if the rectangles intersect or not.
	**
	**	bool intersects (Rect r)
	**	bool intersects (float x1, float y1, float x2, float y2)
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

	/*
	**	Sets the rect to the intersection box formed by the current rect and the given one. The resulting bounding box contains any point
	**	that's contained simultaneously in both rects.
	**
	**	bool setAsIntersection (Rect r)
	**	bool setAsIntersection (float x1, float y1, float x2, float y2)
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

	/*
	**	Resizes the rect to the given size using center or top-left as reference.	 
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

	/*
	**	Resizes the rect using the specified deltas (relative to center or top-left).
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

	/*
	**	Returns the width of the rectangle.	 
	*/
	width: function ()
	{
		return this.x2 - this.x1;
	},

	/*
	**	Returns the height of the rectangle.	 
	*/
	height: function ()
	{
		return this.y2 - this.y1;
	},

	/*
	**	Returns the normalized center-X of the rect.
	*/
	ncx: function ()
	{
		return (this.cx - this.x1) / (this.x2 - this.x1);
	},

	/*
	**	Returns the normalized center-Y of the rect.
	*/
	ncy: function ()
	{
		return (this.cy - this.y1) / (this.y2 - this.y1);
	},

	/*
	**	Returns true if the rect is a right rectangle (x1 < x2 and y1 < y2).
	*/
	isRight: function ()
	{
		return this.x1 <= this.x2 && this.y1 <= this.y2;
	},

	/*
	**	Returns true if the specified point is within the rectangle. The tol parameter is used to specify a tolerance value in pixels.
	*/
	containsPoint: function (x, y, tol=0)
	{
		return (this.x1-tol <= x && x <= this.x2+tol) && (this.y1-tol <= y && y <= this.y2+tol);
	},

	/*
	**	Returns the area of the rectangle. Strict mode specifies if area is returned only if the rectangle is a right rectangle. 	 
	*/
	area: function (strict)
	{
		return strict ? (this.isRight() ? (this.y2-this.y1)*(this.x2-this.x1) : 0) : ((this.y2-this.y1)*(this.x2-this.x1));
	},

	/*
	**	Sets the components to their lower-integer parts.
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

	/*
	**	Sets the components to their upper-integer parts.
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

	/*
	**	Returns the string representation of the rect coordinates.
	*/
	toString: function ()
	{
		return "(" + this.x1.toFixed(2) + ", " + this.y1.toFixed(2) + ", " + this.x2.toFixed(2) + ", " + this.y2.toFixed(2) + ")";
	},

	flatten: function ()
	{
		return [this.x1, this.y1, this.x2, this.y2];
	},

	unflatten: function (o)
	{
		this.set (o[0], o[1], o[2], o[3]);
		return this;
	}
});

Recycler.attachTo (Rect, 1024);
export default Rect;
