/*
**	math/matrix.js
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
import Vec2 from './vec2.js';

//![import "../utils/recycler"]
//![import "./vec2"]

const temp = new Float32Array(9).fill(0);
const temp2 = new Float32Array(9).fill(0);

//:/**
//: * 	Represents a 3x3 matrix. Provides an interface to manipulate 3x3 matrices.
//: */

//!class Matrix

const Matrix = Class.extend
({
	className: 'Matrix',

	/**
	 * 	Actual elements of the matrix.
	 * 	!data: Float32Array
	 */
	data: null,

	/**
	 * 	Constructs a new matrix copying the elements from the specified matrix.
	 * 	!constructor(value: Matrix);
	 */
	/**
	 * 	Constructs a new matrix with the values from the specified array.
	 * 	!constructor(value: Float32Array);
	 */
	/**
	 * 	Constructs a new matrix with the identity matrix values.
	 * 	!constructor();
	 */
	__ctor: function(value=null)
	{
		if (this.data === null)
			this.data = new Float32Array(9);

		if (value !== null)
			this.set(value);
		else
			this.identity();
	},

	/**
	 * 	Fills the matrix with zeroes.
	 * 	!zero() : Matrix;
	 */
	zero: function()
	{
		this.data.fill(0);
		return this;
	},

	/**
	 * 	Fills the matrix with the specified value.
	 * 	!fill (value: number) : Matrix;
	 */
	fill: function (value)
	{
		this.data.fill(value);
		return this;
	},

	/**
	 * 	Copies the specified matrix elements into the current one.
	 * 	!set (value: Matrix) : Matrix;
	 */
	/**
	 * 	Sets the matrix elements from the specified array.
	 * 	!set (value: Float32Array) : Matrix;
	 */
	set: function (value)
	{
		if (Matrix.isInstance(value))
		{
			for (let i = 0; i < 9; i++) this.data[i] = value.data[i];
		}
		else
		{
			for (let i = 0; i < 9; i++) this.data[i] = value[i];
		}

		return this;
	},

	/**
	 * 	Sets the elements of the matrix to be the identity matrix.
	 * 	!identity() : Matrix;
	 */
	identity: function (target=null)
	{
		if (target === null)
			target = this.data;

		target.fill(0);
		target[0] = target[4] = target[8] = 1;

		return this;
	},

	/**
	 * 	Multiplies all elements in the matrix by a given scalar.
	 * 	!scalef (scalar: number) : Matrix;
	 */
	scalef: function (scalar)
	{
		for (let i = 0; i < 9; i++) this.data[i] *= scalar;
		return this;
	},

	/**
	 * 	Returns a clone of the matrix.
	 * 	!clone() : Matrix;
	 */
	clone: function ()
	{
		return Matrix.Pool.alloc(this);
	},

	/**
	 * 	Appends the given matrix to the current one using matrix multiplication (self * matrix).
	 * 	!append (matrix: Matrix) : Matrix;
	 */
	append: function (matr)
	{
		if (matr instanceof Matrix)
			matr = matr.data;

		for (let i = 0; i < 9; i++) temp[i] = this.data[i];

		this.data[0] = matr[0]*temp[0] + matr[1]*temp[3] + matr[2]*temp[6];
		this.data[1] = matr[0]*temp[1] + matr[1]*temp[4] + matr[2]*temp[7];
		this.data[2] = matr[0]*temp[2] + matr[1]*temp[5] + matr[2]*temp[8];
		this.data[3] = matr[3]*temp[0] + matr[4]*temp[3] + matr[5]*temp[6];
		this.data[4] = matr[3]*temp[1] + matr[4]*temp[4] + matr[5]*temp[7];
		this.data[5] = matr[3]*temp[2] + matr[4]*temp[5] + matr[5]*temp[8];
		this.data[6] = matr[6]*temp[0] + matr[7]*temp[3] + matr[8]*temp[6];
		this.data[7] = matr[6]*temp[1] + matr[7]*temp[4] + matr[8]*temp[7];
		this.data[8] = matr[6]*temp[2] + matr[7]*temp[5] + matr[8]*temp[8];

		return this;
	},

	/**
	 * 	Creates a translation matrix and appends it.
	 * 	!translate (x: number, y: number) : Matrix;
	 */
	translate: function (x, y)
	{
		if (x == 0 && y == 0)
			return this;

		for (let i = 0; i < 9; i++) temp[i] = this.data[i];

		this.data[6] = x*temp[0] + y*temp[3] + temp[6];
		this.data[7] = x*temp[1] + y*temp[4] + temp[7];
		this.data[8] = x*temp[2] + y*temp[5] + temp[8];

		return this;
	},

	/**
	 * 	Creates a rotation matrix for the given angle (in radians) and appends it.
	 * 	!rotate (angle: number) : Matrix;
	 */
	rotate: function (angle)
	{
		if (angle == 0)
			return this;

		this.identity(temp2);

		let cost = Math.cos(angle);
		let sint = Math.sin(angle);

		temp2[0] = cost;
		temp2[1] = -sint;
		temp2[3] = sint;
		temp2[4] = cost;

		return this.append(temp2);
	},

	/**
	 * 	Creates a scaling matrix and appends it.
	 * 	!scale (sx: number, sy: number) : Matrix;
	 */
	scale: function (sx, sy)
	{
		if (sx == 1 && sy == 1)
			return this;

		this.identity(temp2);

		temp2[0] = sx;
		temp2[4] = sy;

		return this.append(temp2);
	},

	/**
	 * 	Applies the matrix to the specified vector (matrix-vector multiplication) and returns a new Vec2.
	 * 	!applyTo (vect: Vec2) : Vec2;
	 */
	/**
	 * 	Applies the matrix to the specified coordinates (matrix-vector multiplication) and returns a new Vec2.
	 * 	!applyTo (x: number, y: number) : Vec2;
	 */
	applyTo: function (x, y=null)
	{
		if (y === null)
		{
			const v = x;
			x = v.x;
			y = v.y;
		}

		let nx = this.data[0]*x + this.data[3]*y + this.data[6];
		let ny = this.data[1]*x + this.data[4]*y + this.data[7];

		return Vec2.Pool.alloc(nx, ny);
	},

	/**
	 * 	Transposes the matrix.
	 * 	!transpose() : Matrix;
	 */
	transpose: function ()
	{
		temp.fill(0);

		for (let j = 0; j < 3; j++)
		for (let i = 0; i < 3; i++)
			temp[j*3+i] = this.data[i*3+j];

		for (let i = 0; i < 9; i++) this.data[i] = temp[i];

		return this;
	},

	/**
	 * 	Returns the determinant of the matrix.
	 * 	!det() : number;
	 */
	det: function ()
	{
		return	this.data[0] * (this.data[4]*this.data[8] - this.data[5]*this.data[7]) -
				this.data[1] * (this.data[3]*this.data[8] - this.data[5]*this.data[6]) +
				this.data[2] * (this.data[3]*this.data[7] - this.data[4]*this.data[6])
				;
	},

	/**
	 * 	Returns a new matrix with the adjoint of the current matrix.
	 * 	!adj() : Matrix;
	 */
	adj: function () // violet:verify and fix
	{
		/*let t = this.transpose();
		let d = Matrix.Pool.alloc();

		d.data[0] = (t.data[4]*t.data[8] - t.data[5]*t.data[7]);
		d.data[1] = -(t.data[3]*t.data[8] - t.data[5]*t.data[6]);
		d.data[2] = (t.data[3]*t.data[7] - t.data[4]*t.data[6]);

		d.data[3] = -(t.data[1]*t.data[8] - t.data[2]*t.data[7]);
		d.data[4] = (t.data[0]*t.data[8] - t.data[2]*t.data[6]);
		d.data[5] = -(t.data[0]*t.data[7] - t.data[1]*t.data[6]);

		d.data[6] = (t.data[1]*t.data[5] - t.data[2]*t.data[4]);
		d.data[7] = -(t.data[0]*t.data[5] - t.data[2]*t.data[3]);
		d.data[8] = (t.data[0]*t.data[4] - t.data[1]*t.data[3]);

		t.data = d;
		return t;*/
		throw new Error('NOT IMPLEMENTED');
	},

	/**
	 * 	Returns a new matrix with the inverse of the current matrix.
	 * 	!inverse() : Matrix;
	 */
	inverse: function ()
	{
		let det = this.det();
		if (!det) return null;

		return this.adj().scalef(1/det);
	},

	/**
	 * 	Returns a string representation of the matrix.
	 * 	!toString() : string;
	 */
	toString: function ()
	{
		return `[${this.data[0]}, ${this.data[3]}, ${this.data[6]}]\n[${this.data[1]}, ${this.data[4]}, ${this.data[7]}]\n[${this.data[2]}, ${this.data[5]}, ${this.data[8]}]\n`;
	}
});

/**
 * 	Sets the components of the specified array as the identity matrix.
 * 	!static loadIdentity (target: Float32Array) : void;
 */
Matrix.loadIdentity = function (target)
{
	target.fill(0);
	target[0] = target[4] = target[8] = 1;
};

//!/class

//!namespace Matrix
//!namespace Pool

	/**
	 * 	Allocates a new matrix copying the components from the specified matrix.
	 * 	!function alloc (value: Matrix): Matrix;
	 */
	/**
	 * 	Allocates a new matrix with the values from the specified array.
	 * 	!function alloc (value: Float32Array): Matrix;
	 */
	/**
	 * 	Allocates a new matrix with the identity matrix values.
	 * 	!function alloc (): Matrix;
	 */

Recycler.createPool (Matrix, 4096, 1024);
export default Matrix;
