/*
**	math/vec2.js
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
**	Representation of a vector in 2D space, that is, a float tuple with components x and y.
*/

const Vec2 = Class.extend
({
	className: 'Vec2',

	/*
	**	Coordinates of the vector.
	*/
	x: 0, y: 0,

	/*
	**	Initializes the instance.
	**
	**	Vec2 init (Vec2 v)
	**	Vec2 init (float x, float y)
	*/
	init: function (x=null, y=null)
	{
		return this.set(x, y);
	},

	/*
	**	Clones the vector and returns a new object.
	*/
	clone: function () /* Vec2 */
	{
		return Vec2.alloc().init(this);
	},

	/*
	**	Sets the components of the vector.
	**
	**	Vec2 set (Vec2 v)
	**	Vec2 set (float x, float y)
	*/
	set: function (x, y=null) /* Vec2 */
	{
		if (x === null) {
			x = 0;
			y = 0;
		}
		else if (y === null) {
			let v = x;
			x = v.x;
			y = v.y;
		}

		this.x = x;
		this.y = y;

		return this;
	},

	/*
	**	Sets the components of the vector to zero.
	*/
	zero: function()
	{
		return this.set(0, 0);
	},

	/*
	**	Returns true if the vector is zero.
	*/
	isZero: function()
	{
		return this.x == 0 && this.y == 0;
	},

	/*
	**	Returns true if the coordinates have the same components as the vector.
	**
	**	bool equals (Vec2 v)
	**	bool equals (float x, float y)
	*/
	equals: function (x, y=null)
	{
		if (y === null)
		{
			let v = x;
			x = v.x;
			y = v.y;
		}

		return this.x == x && this.y == y;
	},

	/*
	**	Negates the vector, that is changing the sign of each component in the vector.
	*/
	neg: function ()
	{
		this.x = -this.x; this.y = -this.y;
		return this;
	},

	/*
	**	Inverts the vector by changing each component to its reciprocal.
	*/
	inv: function ()
	{
		this.x = 1 / this.x; this.y = 1 / this.y;
		return this;
	},

	/*
	**	Changes the components of the vector to their absolute value.
	*/
	abs: function ()
	{
		this.x = this.x < 0 ? -this.x : this.x;
		this.y = this.y < 0 ? -this.y : this.y;
		return this;
	},

	/*
	**	Adds the given value to all components of the vector.
	**
	**	float translate (Vec2 v)
	**	float translate (float dx, float dy)
	*/
	translate: function (dx, dy=null)
	{
		if (dy === null)
		{
			let v = dx;
			dx = v.x;
			dy = v.y;
		}

		this.x += dx, this.y += dy;
		return this;
	},

	/*
	**	Adds given values to the components of the vector.
	**
	**	float add (Vec2 v)
	**	float add (float dx, float dy)
	*/
	add: function (dx, dy=null)
	{
		if (dy === null)
		{
			let v = dx;
			dx = v.x;
			dy = v.y;
		}

		this.x += dx, this.y += dy;
		return this;
	},

	/*
	**	Subtracts given values from the components of the vector.
	**
	**	float sub (Vec2 v)
	**	float sub (float dx, float dy)
	*/
	sub: function (dx, dy)
	{
		if (dy === null)
		{
			let v = dx;
			dx = v.x;
			dy = v.y;
		}

		this.x -= dx, this.y -= dy;
		return this;
	},

	/*
	**	Scales both components of the vector by the given factor.
	**
	**	float scale (Vec2 v)
	**	float scale (float k)
	**	float scale (float fx, float fy)
	*/
	scale: function (fx, fy=null)
	{
		if (fy === null)
		{
			if (Vec2.isInstance(fx)) {
				let v = fx;
				fx = v.x;
				fy = v.y;
			} else {
				fy = fx;
			}
		}

		this.x *= fx, this.y *= fy;
		return this;
	},

	/*
	**	Sets the components to their integer parts.
	*/
	floor: function ()
	{
		this.x = int(this.x);
		this.y = int(this.y);

		return this;
	},

	/*
	**	Sets the components to their fractional parts.
	*/
	fract: function ()
	{
		this.x = this.x - int(this.x);
		this.y = this.y - int(this.y);

		return this;
	},

	/*
	**	Returns the dot product of the vector and the provided values (x, y).
	**
	**	float dot (Vec2 v)
	**	float dot (float x, float y)
	*/
	dot: function (x, y=null)
	{
		if (y === null)
		{
			let v = x;
			x = v.x;
			y = v.y;
		}

		return this.x*x + this.y*y;
	},

	/*
	**	Returns the magnitude of the vector.
	*/
	magnitude: function ()
	{
		return Math.sqrt(this.x*this.x + this.y*this.y);
	},

	/*
	**	Normalizes the vector. That is achieved by dividing each component of the Vector by its
	**	magnitude in order to obtain a unit vector.
	*/
	normalize: function ()
	{
		return this.isZero() ? this : this.scale (1 / this.magnitude());
	},

	/*
	**	Sets the vector to its major-axis.
	*/
	majorAxis: function ()
	{
		if (Math.abs(this.x) > Math.abs(this.y)) this.y = 0; else this.x = 0;
		return this;
	},

	/*
	**	Sets the vector to its minor-axis.
	*/
	minorAxis: function ()
	{
		if (Math.abs(this.x) < Math.abs(this.y)) this.y = 0; else this.x = 0;
		return this;
	},

	/*
	**	Sets the vector to its sign-vector representation.
	*/
	sign: function ()
	{
		this.x = !this.x ? 0 : (this.x < 0 ? -1 : 1);
		this.y = !this.y ? 0 : (this.y < 0 ? -1 : 1);
		return this;
	},

	/*
	**	Returns the string representation of the vector.
	*/
	toString: function ()
	{
		return `(${this.x}, ${this.y})`;
	}
});

Recycler.attachTo (Vec2, 1024);
export default Vec2;
