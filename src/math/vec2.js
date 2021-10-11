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

//!class Vec2

const Vec2 = Class.extend
({
	className: 'Vec2',

	/**
	 * 	Coordinates of the vector.
	 * 	!x: number;
	 * 	!y: number;
	 */
	x: 0, y: 0,

	/**
	 *	Constructs the vector from another Vec2.
	 * 	!constructor (value: Vec2);
	 */
	/**
	 *	Constructs the vector with the specified coordinates.
	 * 	!constructor (x?: number, y?: number);
	 */
	__ctor: function (x=null, y=null)
	{
		return this.set(x, y);
	},

	/**
	 * 	Clones the vector coordinates into a new Vec2 object.
	 * 	!clone() : Vec2;
	 */
	clone: function ()
	{
		return Vec2.Pool.alloc(this);
	},

	/**
	 *	Sets the coordinates of the vector from a Vec2 object.
	 *	!set (value: Vec2) : Vec2;
	 */
	/**
	 *	Sets the coordinates of the vector.
	 *	!set (x: number, y: number) : Vec2;
	 */
	set: function (x, y=null)
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

	/**
	 * 	Sets the X-coordinate of the vector.
	 * 	!setX (x: number) : Vec2;
	 */
	setX: function (x)
	{
		this.x = x;
		return this;
	},

	/**
	 * 	Sets the Y-coordinate of the vector.
	 * 	!setY (y: number) : Vec2;
	 */
	setY: function (y)
	{
		this.y = y;
		return this;
	},

	/**
	 * 	Sets the coordinates of the vector to zero.
	 * 	!zero() : Vec2;
	 */
	zero: function()
	{
		return this.set(0, 0);
	},

	/**
	 * 	Returns true if the vector coordinates are both zero.
	 * 	!isZero() : boolean;
	 */
	isZero: function()
	{
		return this.x == 0 && this.y == 0;
	},

	/**
	 *	Returns true if the coordinates of the vector have the same values as the given Vec2.
	 *	!equals (value: Vec2) : boolean;
	 */
	/**
	 *	Returns true if the coordinates of the vector have the same values as the given ones.
	 *	!equals (x: number, y: number) : boolean;
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

	/**
	 * 	Negates the vector, that is changing the sign of each component in the vector.
	 * 	!neg() : Vec2;
	 */
	neg: function ()
	{
		this.x = -this.x; this.y = -this.y;
		return this;
	},

	/**
	 * 	Inverts the vector by changing each component to its reciprocal.
	 * 	!inv() : Vec2;
	 */
	inv: function ()
	{
		this.x = 1 / this.x; this.y = 1 / this.y;
		return this;
	},

	/**
	 * 	Changes the components of the vector to their absolute value.
	 * 	!abs() : Vec2;
	 */
	abs: function ()
	{
		this.x = this.x < 0 ? -this.x : this.x;
		this.y = this.y < 0 ? -this.y : this.y;
		return this;
	},

	/**
	 *	Adds the coordinates of the given Vec2 to the vector.
	 *	!translate (value: Vec2) : Vec2;
	 */
	/**
	 *	Adds the given delta values to the vector.
	 *	!translate (dx: number, dy: number) : Vec2;
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

	/**
	 *	Adds the coordinates of the given Vec2 to the vector.
	 *	!add (value: Vec2) : Vec2;
	 */
	/**
	 *	Adds the given delta values to the vector.
	 *	!add (dx: number, dy: number) : Vec2;
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

	/**
	 *	Subtracts the coordinates of the given Vec2 from the vector.
	 *	!sub (value: Vec2) : Vec2;
	 */
	/**
	 *	Subtracts the given delta values from the vector.
	 *	!sub (dx: number, dy: number) : Vec2;
	 */
	sub: function (dx, dy=null)
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

	/**
	 * 	Scales each components of the vector by the respective component of the given one.
	 * 	!scale (k: number) : Vec2;
	 */
	/**
	 * 	Scales both components of the vector by the given factor.
	 * 	!scale (k: number) : Vec2;
	 */
	/**
	 * 	Scales each components of the vector by the given factors.
	 * 	!scale (fx: number, fy: number) : Vec2;
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

	/**
	 * 	Sets the components to their integer parts.
	 * 	!floor() : Vec2;
	 */
	floor: function ()
	{
		this.x = int(this.x);
		this.y = int(this.y);

		return this;
	},

	/**
	 * 	Sets the components to their fractional parts.
	 * 	!fract() : Vec2;
	 */
	fract: function ()
	{
		this.x = this.x - int(this.x);
		this.y = this.y - int(this.y);

		return this;
	},

	/**
	 * 	Returns the dot product of the vectors.
	 * 	!dot (value: Vec2) : number;
	 */
	/**
	 * 	Returns the dot product of the vector and the given values.
	 * 	!dot (x: number, y: number) : number;
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

	/**
	 * 	Returns the magnitude of the vector.
	 * 	!magnitude() : number;
	 */
	magnitude: function ()
	{
		return Math.sqrt(this.x*this.x + this.y*this.y);
	},

	/**
	 * 	Normalizes the vector by dividing each component by the vector magnitude to obtain a unit vector.
	 * 	!normalize() : Vec2;
	 */
	normalize: function ()
	{
		return this.isZero() ? this : this.scale (1 / this.magnitude());
	},

	/**
	 * 	Sets the vector to its major-axis, that is the component with the maximum absolute value.
	 * 	!majorAxis() : Vec2;
	 */
	majorAxis: function ()
	{
		if (Math.abs(this.x) > Math.abs(this.y)) this.y = 0; else this.x = 0;
		return this;
	},

	/**
	 * 	Sets the vector to its minor-axis, that is the component with the minimum absolute value.
	 * 	!minorAxis() : Vec2;
	 */
	minorAxis: function ()
	{
		if (Math.abs(this.x) < Math.abs(this.y)) this.y = 0; else this.x = 0;
		return this;
	},

	/**
	 * 	Sets the vector to its sign-vector representation.
	 * 	!sign() : Vec2;
	 */
	sign: function ()
	{
		this.x = !this.x ? 0 : (this.x < 0 ? -1 : 1);
		this.y = !this.y ? 0 : (this.y < 0 ? -1 : 1);
		return this;
	},

	/**
	 * 	Returns the string representation of the coordinates of the vector.
	 * 	toString() : string;
	 */
	toString: function ()
	{
		return `(${this.x}, ${this.y})`;
	}
});

//!/class

//!namespace Vec2
//!namespace Pool

/**
 *	Allocates a vector from another Vec2.
 * 	!function alloc (value: Vec2) : Vec2;
 */
/**
 *	Allocates a vector with the specified coordinates.
 * 	!function alloc (x?: number, y?: number) : Vec2;
 */

Recycler.createPool (Vec2, 4096, 2048);
export default Vec2;
