/*
**	math/point2.js
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

const BITS = 4;
const UPSCALE = x => (x * (1 << BITS))>>0;
const DOWNSCALE = x => ((1-(((x>>31)&1)<<1))*(x) >> BITS) * (1-(((x>>31)&1)<<1));
//const DOWNSCALE = x => (x>>BITS);

/*
**	Representation of a point in 2D space. The component values are upscaled by a fixed number of bits to allow
**	sub-pixel translations (internally), but the public values will always be integers.
*/

const Point2 = Class.extend
({
	className: 'Point2',

	/*
	**	Components of the point (upscaled and integer).
	*/
	ux: 0, uy: 0,
	x: 0, y: 0,

	/*
	**	Initializes the instance.
	**
	**	Point2 init (Point2 v)
	**	Point2 init (Vec2 v)
	**	Point2 init (float x, float y)
	*/
	init: function (x=null, y=null)
	{
		return this.set(x, y);
	},

	/*
	**	Populates the downscaled components.
	**
	**	Point2 downscale ()
	*/
	downscale: function ()
	{
		this.x = DOWNSCALE(this.ux);
		this.y = DOWNSCALE(this.uy);
		return this;
	},

	/*
	**	Clones the point and returns a new object.
	**
	**	Point2 clone ()
	*/
	clone: function ()
	{
		return Point2.alloc().init(this);
	},

	/*
	**	Sets the components of the point.
	**
	**	Point2 set (Point2 v)
	**	Point2 set (Vec2 v)
	**	Point2 set (float x, float y)
	*/
	set: function (x, y=null)
	{
		if (x === null) {
			x = 0;
			y = 0;
		}
		else if (y === null)
		{
			if (Point2.isInstance(x)) {
				y = x.uy;
				x = x.ux;
			} else { // Point2
				y = UPSCALE(x.y);
				x = UPSCALE(x.x);
			}
		}
		else {
			x = UPSCALE(x);
			y = UPSCALE(y);
		}

		this.ux = x;
		this.uy = y;

		return this.downscale(this);
	},

	/*
	**	Sets the X-component of the point.
	**
	**	Point2 setX (float x)
	*/
	setX: function (x)
	{
		this.ux = UPSCALE(x);
		return this.downscale(this);
	},

	/*
	**	Sets the Y-component of the point.
	**
	**	Point2 setY (float y)
	*/
	setY: function (y)
	{
		this.uy = UPSCALE(y);
		return this.downscale(this);
	},

	/*
	**	Sets the components of the point to zero.
	**
	**	Point2 zero ()
	*/
	zero: function()
	{
		return this.set(0, 0);
	},

	/*
	**	Returns true if the point is zero.
	**
	**	bool isZero ()
	*/
	isZero: function()
	{
		return this.x == 0 && this.y == 0;
	},

	/*
	**	Returns true if the integer coordinates have the same values as the given argument.
	**
	**	Point2 equals (Point2 v)
	**	Point2 equals (Vec2 v)
	**	Point2 equals (int x, int y)
	*/
	equals: function (x, y=null)
	{
		if (y === null)
		{
			if (Point2.isInstance(x)) {
				y = x.y;
				x = x.x;
			} else { // Point2
				y = int(x.y);
				x = int(x.x);
			}
		}
		else {
			x = int(x);
			y = int(y);
		}

		return this.x == x && this.y == y;
	},

	/*
	**	Adds given values to the components of the point.
	**
	**	float add (Vec2 v)
	**	float add (Point2 v)
	**	float add (float dx, float dy)
	*/
	add: function (dx, dy=null)
	{
		if (dy === null)
		{
			if (Point2.isInstance(dx)) {
				dy = dx.uy;
				dx = dx.ux;
			} else { // Point2
				dy = UPSCALE(dx.y);
				dx = UPSCALE(dx.x);
			}
		}
		else {
			dx = UPSCALE(dx);
			dy = UPSCALE(dy);
		}

		this.ux += dx, this.uy += dy;
		return this.downscale();
	},

	/*
	**	Subtracts given values from the components of the point.
	**
	**	float sub (Vec2 v)
	**	float sub (Point2 v)
	**	float sub (float dx, float dy)
	*/
	sub: function (dx, dy)
	{
		if (dy === null)
		{
			if (Point2.isInstance(dx)) {
				dy = dx.uy;
				dx = dx.ux;
			} else { // Point2
				dy = UPSCALE(dx.y);
				dx = UPSCALE(dx.x);
			}
		}
		else {
			dx = UPSCALE(dx);
			dy = UPSCALE(dy);
		}

		this.ux -= dx, this.uy -= dy;
		return this.downscale();
	},

	/*
	**	Returns the string representation of the integer components of the point.
	*/
	toString: function ()
	{
		return `(${this.x}, ${this.y})`;
	}
});

Recycler.attachTo (Point2, 1024);
export default Point2;
