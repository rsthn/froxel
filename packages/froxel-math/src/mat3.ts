
import { Module } from "asyl";

let m: Module = null;

/**
 * 3x3 Matrix.
 */
export default class Mat3
{
	/**
	 * Number of bytes per object.
	 */
	static BYTES: number = 9*Float32Array.BYTES_PER_ELEMENT;

	/**
	 * Address of underlying mat3 object.
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
	static alloc() : Mat3
	{
		return new Mat3(m.mat3_alloc());
	}

	/**
	 * Materializes a matrix at the specified memory location.
	 */
	static materialize(addr: number) : Mat3
	{
		return new Mat3(m.mat3_materialize(addr));
	}

	/**
	 * Constructs the matrix object.
	 */
	private constructor (addr: number) {
		this.addr = addr;
		this.data = m.mapFloat32Array(addr, 9);
	}

	/**
	 * Destroys the instance.
	 */
	free() : void {
		m.mat3_free(this.addr);
	}

	/**
	 * Returns a clone of the matrix.
	 */
	clone() : Mat3 {
		return new Mat3(m.mat3_clone(this.addr));
	}

	/**
	 * Sets all components of the matrix to the given value.
	 */
	fill (value: number) : Mat3 {
		m.mat3_fill1f(this.addr, value);
		return this;
	}

	/**
	 * Sets the diagonal of the matrix to the specified value.
	 */
	set (value: number) : Mat3;
	/**
	 * Copies all the components from the specified matrix.
	 */
	set (matrix: Mat3) : Mat3;
	/**
	 * Sets a column of the matrix.
	 */
	set (col: number, a0: number, a1: number, a2: number) : Mat3;

	set (value: Mat3|number, a0: number=null, a1: number=null, a2: number=null) : Mat3
	{
		if (value instanceof Mat3) {
			m.mat3_set1m(this.addr, value.addr);
			return this;
		}

		if (a0 === null) {
			m.mat3_set1f(this.addr, value);
			return this;
		}

		m.mat3_set1i3f(this.addr, value, a0, a1, a2);
		return this;
	}

	/**
	 * Sets a column of the matrix.
	 */
	col (col: number, a0: number, a1: number, a2: number) : Mat3
	{
		m.mat3_col1i3f(this.addr, col, a0, a1, a2);
		return this;
	}

	/**
	 * Sets a row of the matrix.
	 */
	row (row: number, a0: number, a1: number, a2: number) : Mat3
	{
		m.mat3_row1i3f(this.addr, row, a0, a1, a2);
		return this;
	}

	/**
	 * Sets all components of the matrix to zero, and the diagonal to ones.
	 */
	identity() : Mat3
	{
		m.mat3_identity(this.addr);
		return this;
	}

	/**
	 * Scales all the components of the matrix by the specified factor.
	 */
	scale (f: number) : Mat3;
	/**
	 * Appends a `scale` matrix constructed with the specified factors.
	 */
	scale (sx: number, sy: number) : Mat3;

	scale (sx: number, sy: number=null) : Mat3
	{
		if (sy === null)
			m.mat3_scale1f(this.addr, sx);
		else
			m.mat3_scale2f(this.addr, sx, sy);

		return this;
	}

	/**
	 * Transposes the matrix.
	 */
	transpose() : Mat3
	{
		m.mat3_transpose(this.addr);
		return this;
	}

	/**
	 * Returns the determinant of the matrix.
	 */
	det() : number
	{
		return m.mat3_det(this.addr);
	}

	/**
	 * Appends the given matrix by using matrix multiplication.
	 */
	append (matrix: Mat3) : Mat3
	{
		m.mat3_append1m(this.addr, matrix.addr);
		return this;
	}

	/**
	 * Appends a translation matrix constructed with the specified deltas.
	 */
	translate (dx: number, dy: number) : Mat3
	{
		m.mat3_translate2f(this.addr, dx, dy);
		return this;
	}

	/**
	 * Appends a rotation matrix constructed for the specified angle (in radians).
	 */
	rotate (angle: number) : Mat3
	{
		m.mat3_rotate1f(this.addr, angle);
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
