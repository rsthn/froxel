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

/**
**	Represents a 2D rectangle.
*/

const Rect = function ()
{
};

export default Rect;

Rect.prototype.className = 'Rect';

/**
**	Coordinates of the rectangle (cx and cy are for the center). Note that this fields are readonly they should be modified
**	through methods only.
*/
Rect.prototype.cx = 0;
Rect.prototype.cy = 0;
Rect.prototype.x1 = 0;
Rect.prototype.y1 = 0;
Rect.prototype.x2 = 0;
Rect.prototype.y2 = 0;

/**
**	Initializes the rect (takes 0, 2 or 4 parameters).
*/
Rect.prototype.__reinit = function (...args)
{
	switch (args.length)
	{
		case 0: this.Rect0.apply(this, args); break;
		case 2: this.Rect2.apply(this, args); break;
		case 4: this.Rect4.apply(this, args); break;
	}

	return this;
};

/**
**	Constructs a rectangle object. All values are set to zero.	 
*/
Rect.prototype.Rect0 = function ()
{
	this.x1 = this.y1 = this.x2 = this.y2 = this.cx = this.cy = 0;
};

/**
**	Constructs a rectangle object with the given coordinates.	 
*/
Rect.prototype.Rect4 = function (x1, y1, x2, y2)
{
	this.set (x1, y1, x2, y2);
};

/**
**	Constructs a rectangle object with the given size (centers at zero).	 
*/
Rect.prototype.Rect2 = function (w, h)
{
	this.set (0, 0, 0, 0);
	this.resize (w, h);
};

/**
**	Clones the rect and returns a new object.	 
*/
Rect.prototype.clone = function ()
{
	return Rect.alloc (this.x1, this.y1, this.x2, this.y2);
};

Rect.prototype.zero = function ()
{
	this.cx = 0; this.cy = 0;
	this.x1 = 0; this.y1 = 0;
	this.x2 = 0; this.y2 = 0;

	return this;
};

Rect.prototype.reset = function ()
{
	this.cx = null; this.cy = null;
	this.x1 = null; this.y1 = null;
	this.x2 = null; this.y2 = null;

	return this;
};

Rect.prototype.extendWithPoint2 = function (x, y)
{
	if (this.x1 === null || x < this.x1) this.x1 = x;
	if (this.y1 === null || y < this.y1) this.y1 = y;
	if (this.x2 === null || x > this.x2) this.x2 = x;
	if (this.y2 === null || y > this.y2) this.y2 = y;

	this.cx = (this.x1 + this.x2) / 2;
	this.cy = (this.y1 + this.y2) / 2;

	return this;
};

Rect.prototype.extendWithPoint1 = function (p)
{
	return this.extendWithPoint2(p.x, p.y);
};

Rect.prototype.extendWithPoint = function (...args)
{
	if (args.length == 2)
		return this.extendWithPoint2(args[0], args[1]);
	else
		return this.extendWithPoint1(args[0]);
};

/**
**	Translates the rectangle by the given deltas.	 
*/
Rect.prototype.translate = function (dx, dy)
{
	this.x1 += dx; this.y1 += dy;
	this.x2 += dx; this.y2 += dy;
	this.cx += dx; this.cy += dy;

	return this;
};

/**
**	Moves the center of the rectangle to the specified position.	 
*/
Rect.prototype.centerAt = function (x, y, normalized=false)
{
	if (normalized == true)
	{
		x = this.x1 + x*(this.x2 - this.x1);
		y = this.y1 + y*(this.y2 - this.y1);
	}

	return this.translate (x - this.cx, y - this.cy);
};

/**
**	Sets the coordinates of the rectangle.	 
*/
Rect.prototype.set = function (...args)
{
	switch (args.length)
	{
		case 1: return this.set1 (...args);
		case 4: return this.set4 (...args);
	}
};

/**
**	Sets the coordinates of the rectangle.	 
*/
Rect.prototype.set4 = function (x1, y1, x2, y2)
{
	this.cx = (x1 + x2) / 2;
	this.cy = (y1 + y2) / 2;

	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;

	return this;
};

/**
**	Copies the coordinates of a given rectangle.	 
*/
Rect.prototype.set1 = function (r)
{
	return this.set4 (r.x1, r.y1, r.x2, r.y2);
};

/**
**	Returns true if the specified rect is equal to the current rect.
*/
Rect.prototype.equals = function (...args)
{
	switch (args.length)
	{
		case 1: return this.equals1.apply(this, args);
		case 4: return this.equals4.apply(this, args);
	}
};

/**
**	Returns true if the specified rect is equal to the current rect.
*/
Rect.prototype.equals1 = function (r)
{
	return this.x1 == r.x1 && this.x2 == r.x2 && this.y1 == r.y1 && this.y2 == r.y2;
};

/**
**	Returns true if the specified rectangle is equal to the current rect.
*/
Rect.prototype.equals4 = function (x1, y1, x2, y2)
{
	return x1 == this.x1 && x2 == this.x2 && y1 == this.y1 && y2 == this.y2;
};

/**
**	Returns a bool indicating if the specified rectangle object is contained by the current rectangle.
*/
Rect.prototype.contains = function (...args)
{
	switch (args.length)
	{
		case 1: return this.contains1.apply(this, args);
		case 4: return this.contains4.apply(this, args);
	}
};

/**
**	Returns a bool indicating if the specified rectangle object is contained by the current rectangle.
*/
Rect.prototype.contains1 = function (b)
{
	return b.equals(Math.max(this.x1, b.x1), Math.max(this.y1, b.y1), Math.min(this.x2, b.x2), Math.min(this.y2, b.y2));
};

/**
**	Returns a bool indicating if the rectangle defined by the specified coordinates is contained by the current rectangle.
*/
Rect.prototype.contains4 = function (x1, y1, x2, y2)
{
	return (x1 == Math.max(this.x1, x1)) && (y1 == Math.max(this.y1, y1)) && (x2 == Math.min(this.x2, x2)) && (y2 == Math.min(this.y2, y2));
};

/**
**	Returns a bool indicating if the specified rectangle object is contained by the current rectangle.
*/
Rect.prototype.setAsUnion = function (...args)
{
	switch (args.length)
	{
		case 1: return this.setAsUnion1.apply(this, args);
		case 4: return this.setAsUnion4.apply(this, args);
	}
};

/**
**	Sets the rect to the union box formed by the current rect and the given one. The resulting bounding box will contain any
**	point from either rect.
*/
Rect.prototype.setAsUnion1 = function (b)
{
	return this.setAsUnion4 (b.x1, b.y1, b.x2, b.y2);
};

/**
**	Sets the rect to the union box formed by the current rect and the given one. The resulting bounding box will contain any
**	point from either rect.
*/
Rect.prototype.setAsUnion4 = function (x1, y1, x2, y2)
{
	this.x1 = Math.min(this.x1, x1);
	this.y1 = Math.min(this.y1, y1);
	this.x2 = Math.max(this.x2, x2);
	this.y2 = Math.max(this.y2, y2);

	return this;
};

/**
**	Returns a bool indicating if the rectangles intersect or not.
*/
Rect.prototype.intersects = function (...args)
{
	switch (args.length)
	{
		case 1: return this.intersects1.apply(this, args);
		case 4: return this.intersects4.apply(this, args);
	}
};

/**
**	Returns a bool indicating if the rectangles intersect or not.
*/
Rect.prototype.intersects1 = function (b)
{
	return this.intersects4 (b.x1, b.y1, b.x2, b.y2);
};

/**
**	Returns a bool indicating if the rectangles intersect or not.
*/
Rect.prototype.intersects4 = function (x1, y1, x2, y2)
{
	var _x1 = Math.max(this.x1, x1);
	var _y1 = Math.max(this.y1, y1);
	var _x2 = Math.min(this.x2, x2);
	var _y2 = Math.min(this.y2, y2);

	return Math.max(0, _y2-_y1) * Math.max(0, _x2-_x1) > 0;
};

/**
**	Sets the rect to the intersection box formed by the current rect and the given one. The resulting bounding box contains any point
**	that's contained simultaneously in both rects.
*/
Rect.prototype.setAsIntersection = function (...args)
{
	switch (args.length)
	{
		case 1: return this.setAsIntersection1.apply(this, args);
		case 4: return this.setAsIntersection4.apply(this, args);
	}
};

/**
**	Sets the rect to the intersection box formed by the current rect and the given one. The resulting bounding box contains any
**	point that's contained simultaneously in both rects.
*/
Rect.prototype.setAsIntersection1 = function (b)
{
	return this.setAsIntersection4 (b.x1, b.y1, b.x2, b.y2);
};

/**
**	Sets the rect to the intersection box formed by the current rect and the given one. The resulting bounding box contains any point
**	that's contained simultaneously in both rects.
*/
Rect.prototype.setAsIntersection4 = function (x1, y1, x2, y2)
{
	this.x1 = Math.max(this.x1, x1);
	this.y1 = Math.max(this.y1, y1);
	this.x2 = Math.min(this.x2, x2);
	this.y2 = Math.min(this.y2, y2);

	return Math.max(0, this.y2-this.y1) * Math.max(0, this.x2-this.x1) > 0;
};

/**
**	Resizes the rect to the given size using center or top-left as reference.	 
*/
Rect.prototype.resize = function (w, h, normalized=false, topLeftRelative=false)
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
};

/**
**	Resizes the rect using the specified deltas (relative to center or top-left).
*/
Rect.prototype.resizeBy = function (dw, dh, topLeftRelative=false)
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
};

/**
**	Returns the width of the rectangle.	 
*/
Rect.prototype.width = function ()
{
	return this.x2 - this.x1;
};

/**
**	Returns the height of the rectangle.	 
*/
Rect.prototype.height = function ()
{
	return this.y2 - this.y1;
};

/**
**	Returns the normalized center-X of the rect.
*/
Rect.prototype.ncx = function ()
{
	return (this.cx - this.x1) / (this.x2 - this.x1);
};

/**
**	Returns the normalized center-Y of the rect.
*/
Rect.prototype.ncy = function ()
{
	return (this.cy - this.y1) / (this.y2 - this.y1);
};

/**
**	Returns true if the rect is a right rectangle (x1 < x2 and y1 < y2).
*/
Rect.prototype.isRight = function ()
{
	return this.x1 <= this.x2 && this.y1 <= this.y2;
};

/**
**	Returns true if the specified point is within the rectangle. The tol parameter is used to specify a tolerance value in pixels.
*/
Rect.prototype.containsPoint = function (x, y, tol=0)
{
	return (this.x1-tol <= x && x <= this.x2+tol) && (this.y1-tol <= y && y <= this.y2+tol);
};

/**
**	Returns the area of the rectangle. Strict mode specifies if area is returned only if the rectangle is a right rectangle. 	 
*/
Rect.prototype.area = function (strict)
{
	return strict ? (this.isRight() ? (this.y2-this.y1)*(this.x2-this.x1) : 0) : ((this.y2-this.y1)*(this.x2-this.x1));
};

/**
**	Sets the components to their lower-integer parts.
*/
Rect.prototype.floor = function()
{
	this.x1 = Math.floor(this.x1);
	this.y1 = Math.floor(this.y1);
	this.x2 = Math.floor(this.x2);
	this.y2 = Math.floor(this.y2);
	this.cx = Math.floor(this.cx);
	this.cy = Math.floor(this.cy);
	return this;
};

/**
**	Sets the components to their upper-integer parts.
*/
Rect.prototype.ceil = function()
{
	this.x1 = Math.ceil(this.x1);
	this.y1 = Math.ceil(this.y1);
	this.x2 = Math.ceil(this.x2);
	this.y2 = Math.ceil(this.y2);
	this.cx = Math.ceil(this.cx);
	this.cy = Math.ceil(this.cy);
	return this;
};

/**
**	Returns the string representation of the rect coordinates.
*/
Rect.prototype.toString = function ()
{
	return "(Rect: " + this.x1.toFixed(2) + ", " + this.y1.toFixed(2) + ", " + this.x2.toFixed(2) + ", " + this.y2.toFixed(2) + ")";
};

Rect.prototype.flatten = function ()
{
	return [this.x1, this.y1, this.x2, this.y2];
};

Rect.prototype.unflatten = function (o)
{
	this.set (o[0], o[1], o[2], o[3]);
	return this;
};

/* ********************************************************** */
Recycler.attachTo (Rect);
