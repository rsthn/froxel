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

import { Class } from 'rinn';
import Recycler from '../utils/recycler.js';

//![import "../utils/recycler"]
//![import "./vec2"]

//:/**
//: * 	Representation of a point in 2D space. The coordinate values are upscaled by a fixed number of bits to allow
//: * 	sub-pixel translations (internally), but the public values will always be integers.
//: */

//!class Point2

const Point2 = Class.extend
({
	className: 'Point2',

	/**
	 * 	Upscaled coordinates of the point.
	 * 	!readonly ux: number;
	 * 	!readonly uy: number;
	 */
	ux: 0, uy: 0,

	/**
	 * 	Coordinates of the point.
	 * 	!readonly x: number;
	 * 	!readonly y: number;
	 */
	x: 0, y: 0,

	/**
	 *	Constructs the Point2 instance from another Point2.
	 * 	!constructor (value: Point2);
	 */
	/**
	 *	Constructs the Point2 instance from a Vec2.
	 * 	!constructor (value: Vec2);
	 */
	/**
	 *	Constructs the Point2 instance with the specified coordinates.
	 * 	!constructor (x?: number, y?: number);
	 */
	__ctor: function (x=null, y=null)
	{
		return this.set(x, y);
	},

	/**
	 *	Populates the downscaled coordinates.
	 */
	downscale: function ()
	{
		this.x = downscale(this.ux);
		this.y = downscale(this.uy);
		return this;
	},

	/**
	 * 	Clones the point coordinates into a new Point2 object.
	 * 	!clone() : Point2;
	 */
	clone: function ()
	{
		return Point2.Pool.alloc(this);
	},

	/**
	 *	Sets the coordinates of the point from another Point2.
	 *	!set (value: Point2) : Point2;
	 */
	/**
	 *	Sets the coordinates of the point from a Vec2 object.
	 *	!set (value: Vec2) : Point2;
	 */
	/**
	 *	Sets the coordinates of the point.
	 *	@param upscaled - When `true` the specified values are assumed to have already been upscaled.
	 *
	 *	!set (x: number, y: number, upscaled?: boolean) : Point2;
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

	/**
	 * 	Sets the X-coordinate of the point.
	 * 	!setX (x: number) : Point2;
	 */
	setX: function (x)
	{
		this.ux = upscale(x);
		return this.downscale(this);
	},

	/**
	 * 	Sets the Y-coordinate of the point.
	 * 	!setY (y: number) : Point2;
	 */
	setY: function (y)
	{
		this.uy = upscale(y);
		return this.downscale(this);
	},

	/**
	 * 	Sets the coordinates of the point to zero.
	 * 	!zero() : Point2;
	 */
	zero: function()
	{
		return this.set(0, 0);
	},

	/**
	 * 	Returns true if the point coordinates are both zero.
	 * 	!isZero() : boolean;
	 */
	isZero: function()
	{
		return this.x == 0 && this.y == 0;
	},

	/**
	 *	Returns true if the coordinates of the point have the same values as the given Point2.
	 *	!equals (value: Point2) : boolean;
	 */
	/**
	 *	Returns true if the coordinates of the point have the same values as the given Vec2.
	 *	!equals (value: Vec2) : boolean;
	 */
	/**
	 *	Returns true if the coordinates of the point have the same values as the given ones.
	 *	!equals (x: number, y: number) : boolean;
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

	/**
	 *	Adds the coordinates of the given Point2 to the point.
	 *	!add (value: Point2) : Point2;
	 */
	/**
	 *	Adds the coordinates of the given Vec2 to the point.
	 *	!add (value: Vec2) : Point2;
	 */
	/**
	 *	Adds the given delta values to the point.
	 *	@param upscaled - When `true` the specified values are assumed to have already been upscaled.
	 *	!add (dx: number, dy: number, upscaled?: boolean) : Point2;
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

	/**
	 *	Subtracts the coordinates of the given Point2 from the point.
	 *	!sub (value: Point2) : Point2;
	 */
	/**
	 *	Subtracts the coordinates of the given Vec2 from the point.
	 *	!sub (value: Vec2) : Point2;
	 */
	/**
	 *	Subtracts the given delta values from the point.
	 *	@param upscaled - When `true` the specified values are assumed to have already been upscaled.
	 *	!sub (dx: number, dy: number, upscaled?: boolean) : Point2;
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

	/**
	 * 	Returns the string representation of the coordinates of the point.
	 * 	toString() : string;
	 */
	toString: function ()
	{
		return `(${this.x}, ${this.y})`;
	}
});

//!/class

//!namespace Point2
//!namespace Pool

/**
 *	Allocates a Point2 instance from another Point2.
 * 	!function alloc (value: Point2) : Point2;
 */
/**
 *	Allocates a Point2 instance from a Vec2.
 * 	!function alloc (value: Vec2) : Point2;
 */
/**
 *	Allocates a Point2 instance with the specified coordinates.
 * 	!function alloc (x?: number, y?: number) : Point2;
 */

Recycler.createPool (Point2, 2048, 1024);
export default Point2;
