
import { Module } from "asyl";

let m: Module = null;

/**
 * 4x4 Matrix.
 */
export default class Mat4
{
	/**
	 * Number of bytes per object.
	 */
	static BYTES: number = 16*Float32Array.BYTES_PER_ELEMENT;

	/**
	 * Address of underlying mat4 object.
	 */
	addr: number;

	/**
	 * Underlying vector data.
	 */
	data: Float32Array;

	/**
	 * Binds the specified Asyl module to the class.
	 */
	static bind (module: Module) : void {
		m = module;
	}

	/**
	 * Allocates a new matrix.
	 */
	static alloc() : Mat4
	{
		return new Mat4(m.mat4_alloc());
	}

	/**
	 * Materializes a matrix at the specified memory location.
	 */
	static materialize(addr: number) : Mat4
	{
		return new Mat4(m.mat4_materialize(addr));
	}

	/**
	 * Constructs the matrix object.
	 */
	private constructor (addr: number) {
		this.addr = addr;
		this.data = m.mapFloat32Array(addr, 16);
	}

	/**
	 * Destroys the instance.
	 */
	free() : void {
		m.mat4_free(this.addr);
	}

	/**
	 * Returns a clone of the matrix.
	 */
	clone() : Mat4 {
		return new Mat4(m.mat4_clone(this.addr));
	}

	/**
	 * Sets all components of the matrix to the given value.
	 */
	fill (value: number) : Mat4 {
		m.mat4_fill1f(this.addr, value);
		return this;
	}

	/**
	 * Sets the diagonal of the matrix to the specified value.
	 */
	set (value: number) : Mat4;
	/**
	 * Copies all the components from the specified matrix.
	 */
	set (matrix: Mat4) : Mat4;
	/**
	 * Sets a column of the matrix.
	 */
	set (col: number, a0: number, a1: number, a2: number, a3: number) : Mat4;

	set (value: Mat4|number, a0: number=null, a1: number=null, a2: number=null, a3: number=null) : Mat4
	{
		if (value instanceof Mat4) {
			m.mat4_set1m(this.addr, value.addr);
			return this;
		}

		if (a0 === null) {
			m.mat4_set1f(this.addr, value);
			return this;
		}

		m.mat4_set1i4f(this.addr, value, a0, a1, a2, a3);
		return this;
	}

	/**
	 * Sets a column of the matrix.
	 */
	col (col: number, a0: number, a1: number, a2: number, a3: number) : Mat4
	{
		m.mat4_col1i4f(this.addr, col, a0, a1, a2, a3);
		return this;
	}

	/**
	 * Sets a row of the matrix.
	 */
	row (row: number, a0: number, a1: number, a2: number, a3: number) : Mat4
	{
		m.mat4_row1i4f(this.addr, row, a0, a1, a2, a3);
		return this;
	}

	/**
	 * Sets all components of the matrix to zero, and the diagonal to ones.
	 */
	identity() : Mat4
	{
		m.mat4_identity(this.addr);
		return this;
	}

	/**
	 * Scales all the components of the matrix by the specified factor.
	 */
	scale (f: number) : Mat4;
	/**
	 * Appends a `scale` matrix constructed with the specified factors.
	 */
	scale (sx: number, sy: number, sz: number) : Mat4;

	scale (sx: number, sy: number=null, sz: number=null) : Mat4
	{
		if (sy === null)
			m.mat4_scale1f(this.addr, sx);
		else
			m.mat4_scale3f(this.addr, sx, sy, sz);

		return this;
	}

	/**
	 * Transposes the matrix.
	 */
	transpose() : Mat4
	{
		m.mat4_transpose(this.addr);
		return this;
	}

	/**
	 * Returns the determinant of the matrix.
	 */
	det() : number
	{
		return m.mat4_det(this.addr);
	}

	/**
	 * Appends the given matrix by using matrix multiplication.
	 */
	append (matrix: Mat4) : Mat4
	{
		m.mat4_append1m(this.addr, matrix.addr);
		return this;
	}

	/**
	 * Appends a translation matrix constructed with the specified deltas.
	 */
	translate (dx: number, dy: number, dz: number) : Mat4
	{
		m.mat4_translate3f(this.addr, dx, dy, dz);
		return this;
	}

	/**
	 * Appends a rotation matrix constructed for the specified angle (radians) along the X-axis.
	 */
	rotateX (angle: number) : Mat4
	{
		m.mat4_rotateX(this.addr, angle);
		return this;
	}

	/**
	 * Appends a rotation matrix constructed for the specified angle (radians) along the Y-axis.
	 */
	rotateY (angle: number) : Mat4
	{
		m.mat4_rotateY(this.addr, angle);
		return this;
	}

	/**
	 * Appends a rotation matrix constructed for the specified angle (radians) along the Z-axis.
	 */
	rotateZ (angle: number) : Mat4
	{
		m.mat4_rotateZ(this.addr, angle);
		return this;
	}

	/**
	 * Returns the string representation of the matrix.
	 */
	toString() : string
	{
		return '[' + Array.from(this.data).join(', ') + ']';
	}
};
