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

/**
**	Representation of a vector in 2D space, that is a tuple with two components x and y.
*/

const Vec2 = function ()
{
	switch (arguments.length)
	{
		case 0: return this.Vec2_0.apply(this, arguments);
		case 1: return this.Vec2_1.apply(this, arguments);
		case 2: return this.Vec2_2.apply(this, arguments);
	}
};

export default Vec2;

/**
**	Coordinate value of the X-axis. 	 
*/
Vec2.prototype.x = 0;

/**
**	Coordinate value of the Y-axis.
*/
Vec2.prototype.y = 0;

/**
**	Constructs a vector object. Components are set to zero.
*/
Vec2.prototype.Vec2_0 = function ()
{
	this.x = this.y = 0;
};

/**
**	Constructs a vector object with the given components.
*/
Vec2.prototype.Vec2_2 = function (x, y)
{
	this.x = x; this.y = y;
};

/**
**	Constructs a vector object with the components from the specified vector.
*/
Vec2.prototype.Vec2_1 = function (b)
{
	this.x = b.x; this.y = b.y;
};

/**
**	Clones the vector and returns a new object.
*/
Vec2.prototype.clone = function () /* Vec2 */
{
	return new Vec2 (this.x, this.y);
};

/**
**	Sets the components of the vector. (vec2 or x,y)
*/
Vec2.prototype.set = function (x, y) /* Vec2 */
{
	if (arguments.length == 1)
		this.x = x.x, this.y = x.y;
	else
		this.x = x, this.y = y;

	return this;
};

/**
**	Sets the components of the vector to zero.
*/
Vec2.prototype.zero = function ()
{
	return this.set (0, 0);
};

/**
**	Returns true if the vector is zero.
*/
Vec2.prototype.isZero = function ()
{
	return this.x == 0 && this.y == 0;
};

/**
**	Returns true if the coordinates have the same components as the vector. (vec2 or x,y)
*/
Vec2.prototype.equals = function (x, y)
{
	if (arguments.length == 1)
		return this.x == x.x && this.y == x.y;
	else
		return this.x == x && this.y == y;
};

/**
**	Negates the vector, that is changing the sign of each component in the vector.
*/
Vec2.prototype.neg = function ()
{
	this.x = -this.x; this.y = -this.y;
	return this;
};

/**
**	Inverts the vector by changing each component to its reciprocal.
*/
Vec2.prototype.inv = function ()
{
	this.x = 1 / this.x; this.y = 1 / this.y;
	return this;
};

/**
**	Changes the components of the vector to their absolute value.
*/
Vec2.prototype.abs = function ()
{
	this.x = this.x < 0 ? -this.x : this.x;
	this.y = this.y < 0 ? -this.y : this.y;
	return this;
};

/**
**	Adds the given value to all components of the vector. (vec2 or x,y)
*/
Vec2.prototype.translate = function (dx, dy)
{
	if (arguments.length == 1)
		this.x += dx.x, this.y += dx.y;
	else
		this.x += dx, this.y += dy;

	return this;
};

/**
**	Adds given values to the components of the vector. (vec2 or x,y)
*/
Vec2.prototype.add = function (dx, dy)
{
	if (arguments.length == 1)
		this.x += dx.x, this.y += dx.y;
	else
		this.x += dx, this.y += dy;

	return this;
};

/**
**	Subtracts given values from the components of the vector. (vec2 or x,y)
*/
Vec2.prototype.sub = function (dx, dy)
{
	if (arguments.length == 1)
		this.x -= dx.x, this.y -= dx.y;
	else
		this.x -= dx, this.y -= dy;

	return this;
};

/**
**	Scales both components of the vector by the given factor (fx or fx, fy).
*/
Vec2.prototype.scale = function (fx, fy)
{
	if (arguments.length == 1)
		this.x *= fx, this.y *= fx;
	else
		this.x *= fx, this.y *= fy;

	return this;
};

/**
**	Sets the components to their integer parts.
*/
Vec2.prototype.floor = function ()
{
	this.x = ~~this.x;
	this.y = ~~this.y;

	return this;
};

/**
**	Sets the components to their fractional parts.
*/
Vec2.prototype.fract = function ()
{
	this.x = this.x - ~~this.x;
	this.y = this.y - ~~this.y;

	return this;
};

/**
**	Returns the dot product of the vector and the provided values (x, y).
*/
Vec2.prototype.dot = function (x, y)
{
	if (arguments.length == 2)
		return this.x*x + this.y*y;
	else
		return this.x*x.x + this.y*x.y;
};

/**
**	Returns the magnitude of the vector.
*/
Vec2.prototype.magnitude = function ()
{
	return Math.sqrt(this.x*this.x + this.y*this.y);
};

/**
**	Normalizes the vector. That is achieved by dividing each component of the Vector by its
**	magnitude in order to obtain a unit vector.
*/
Vec2.prototype.normalize = function ()
{
	return this.isZero() ? this : this.scale (1 / this.magnitude());
};

/**
**	Sets the vector to its major-axis.
*/
Vec2.prototype.majorAxis = function ()
{
	if (Math.abs(this.x) > Math.abs(this.y)) this.y = 0; else this.x = 0;
	return this;
};

/**
**	Sets the vector to its minor-axis.
*/
Vec2.prototype.minorAxis = function ()
{
	if (Math.abs(this.x) < Math.abs(this.y)) this.y = 0; else this.x = 0;
	return this;
};

/**
**	Sets the vector to its sign-vector representation.
*/
Vec2.prototype.sign = function ()
{
	this.x = !this.x ? 0 : (this.x < 0 ? -1 : 1);
	this.y = !this.y ? 0 : (this.y < 0 ? -1 : 1);
	return this;
};

/**
**	Returns the string representation of the vector.
*/
Vec2.prototype.toString = function ()
{
	return `(${this.x}, ${this.y})`;
};
