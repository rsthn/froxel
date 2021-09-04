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
		this.x = downscale(this.ux);
		this.y = downscale(this.uy);
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
	**	Point2 set (float x, float y, bool upscaled=false)
	*/
	set: function (x, y=null, upscaled=false)
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
				y = upscale(x.y);
				x = upscale(x.x);
			}
		}
		else {
			if (!upscaled) {
				x = upscale(x);
				y = upscale(y);
			}
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
		this.ux = upscale(x);
		return this.downscale(this);
	},

	/*
	**	Sets the Y-component of the point.
	**
	**	Point2 setY (float y)
	*/
	setY: function (y)
	{
		this.uy = upscale(y);
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
	**	float add (float dx, float dy, upscaled=false)
	*/
	add: function (dx, dy=null, upscaled=false)
	{
		if (dy === null)
		{
			if (Point2.isInstance(dx)) {
				dy = dx.uy;
				dx = dx.ux;
			} else { // Point2
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

		this.ux += dx, this.uy += dy;
		return this.downscale();
	},

	/*
	**	Subtracts given values from the components of the point.
	**
	**	float sub (Vec2 v)
	**	float sub (Point2 v)
	**	float sub (float dx, float dy, bool upscaled=false)
	*/
	sub: function (dx, dy, upscaled=false)
	{
		if (dy === null)
		{
			if (Point2.isInstance(dx)) {
				dy = dx.uy;
				dx = dx.ux;
			} else { // Point2
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

Recycler.attachTo (Point2, 2048, 1024);
export default Point2;
