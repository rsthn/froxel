
import { Module } from "asyl";

let m: Module = null;

/**
 * 4D Vector.
 */
export default class Vec4
{
	/**
	 * Number of bytes per object.
	 */
	static BYTES: number = 4*Float32Array.BYTES_PER_ELEMENT;

	/**
	 * Address of underlying vec4.
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
	 * Allocates a new vector with the specified coordinates.
	 */
	static alloc (x:number=0, y:number=0, z:number=0, w:number=0) : Vec4 {
		return new Vec4(m.vec4_alloc4f(x, y, z, w));
	}

	/**
	 * Materializes a vector at the specified memory location.
	 */
	static materialize(addr: number) : Vec4
	{
		return new Vec4(m.vec4_materialize(addr));
	}

	/**
	 * Constructs the vector with the specified coordinates.
	 */
	private constructor (addr: number) {
		this.addr = addr;
		this.data = m.mapFloat32Array(addr, 4);
	}

	/**
	 * Destroys the instance.
	 */
	free() {
		m.vec4_free(this.addr);
	}

	/**
	 * Returns a new vector with the same coordinates.
	 */
	clone() : Vec4 {
		return new Vec4(m.vec4_clone(this.addr));
	}

	/**
	 * Sets the coordinates of the vector from a Vec4 object.
	 */
	set (v: Vec4) : Vec4;
	/**
	 * Sets the coordinates of the vector.
	 */
	set (x: number, y: number, z: number, w: number) : Vec4;

	set (x: Vec4|number, y: number = null, z: number = null, w: number = null) : Vec4
	{
		if (y === null) {
			m.vec4_set1v(this.addr, (x as Vec4).addr);
			return this;
		}

		m.vec4_set4f(this.addr, x, y, z, w);
		return this;
	}

	/**
	 * Sets the X-coordinate of the vector.
	 */
	setX (x: number) : Vec4 {
		this.data[0] = x;
		return this;
	}

	/**
	 * Sets the Y-coordinate of the vector.
	 */
	setY (y: number) : Vec4 {
		this.data[1] = y;
		return this;
	}

	/**
	 * Sets the Z-coordinate of the vector.
	 */
	setZ (z: number) : Vec4 {
		this.data[2] = z;
		return this;
	}

	/**
	 * Sets the W-coordinate of the vector.
	 */
	setW (w: number) : Vec4 {
		this.data[3] = w;
		return this;
	}

	/**
	 * Returns the value of the X-coordinate.
	 */
	x() : number {
		return this.data[0];
	}

	/**
	 * Returns the value of the Y-coordinate.
	 */
	y() : number {
		return this.data[1];
	}

	/**
	 * Returns the value of the Z-coordinate.
	 */
	z() : number {
		return this.data[2];
	}

	/**
	 * Returns the value of the W-coordinate.
	 */
	w() : number {
		return this.data[3];
	}

	/**
	 * Sets the coordinates of the vector to zero.
	 */
	zero() : Vec4 {
		m.vec4_zero(this.addr);
		return this;
	}

	/**
	 * Returns true if the vector coordinates are zero.
	 */
	iszero() : boolean {
		return m.vec4_iszero(this.addr);
	}

	/**
	 * Returns true if the coordinates of the vector have the same values as the given Vec4.
	 */
	equals (v: Vec4) : boolean;
	/**
	 * Returns true if the coordinates of the vector have the same values as the given ones.
	 */
	equals (x: number, y: number) : boolean;
	/**
	 * Returns true if the coordinates of the vector have the same values as the given ones.
	 */
	equals (x: number, y: number, z:number, w:number) : boolean;

	equals (x: Vec4|number, y: number=null, z: number = null, w: number = null) : boolean
	{
		if (y === null)
			return m.vec4_equals1v(this.addr, (x as Vec4).addr);

		if (z === null)
			return m.vec4_equals2f(this.addr, x, y);

		return m.vec4_equals4f(this.addr, x, y, z, w);
	}

	/**
	 * Returns true if the difference between the coordinates is less than the specified epsilon.
	 */
	almost (v: Vec4, epsilon: number) : boolean;
	/**
	 * Returns true if the difference between the coordinates is less than the specified epsilon.
	 */
	almost (x: number, y: number, epsilon: number) : boolean;
	/**
	 * Returns true if the difference between the coordinates is less than the specified epsilon.
	 */
	almost (x: number, y: number, z: number, w: number, epsilon: number) : boolean;

	almost (x: Vec4|number, y: number=null, z:number=null, w:number=null, epsilon: number=null) : boolean
	{
		if (z === null)
			return m.vec4_almost1v(this.addr, (x as Vec4).addr, y);

		if (w === null)
			return m.vec4_almost2f(this.addr, x, y, epsilon);

		return m.vec4_almost4f(this.addr, x, y, z, w, epsilon);
	}

	/**
	 * Negates the vector, that is changing the sign of each component in the vector.
	 */
	neg() : Vec4 {
		m.vec4_neg(this.addr);
		return this;
	}

	/**
	 * Inverts the vector by changing each component to its reciprocal.
	 */
	inv() : Vec4 {
		m.vec4_inv(this.addr);
		return this;
	}

	/**
	 * Changes the components of the vector to their absolute value.
	 */
	abs() : Vec4 {
		m.vec4_abs(this.addr);
		return this;
	}

	/**
	 * Adds the coordinates of the given Vec4 to the vector.
	 */
	translate (v: Vec4) : Vec4;
	/**
	 * Adds the given delta values to the vector.
	 */
	translate (dx: number, dy: number) : Vec4;
	/**
	 * Adds the given delta values to the vector.
	 */
	translate (dx: number, dy: number, dz: number, dw: number) : Vec4;

	translate (dx: Vec4|number, dy: number=null, dz: number=null, dw: number=null) : Vec4
	{
		if (dy === null) {
			m.vec4_translate1v(this.addr, (dx as Vec4).addr);
			return this;
		}

		if (dz === null) {
			m.vec4_translate2f(this.addr, dx, dy);
			return this;
		}

		m.vec4_translate4f(this.addr, dx, dy, dz, dw);
		return this;
	}

	/**
	 * Adds the coordinates of the given Vec4 to the vector.
	 */
	add (v: Vec4) : Vec4;
	/**
	 * Adds the given delta values to the vector.
	 */
	add (dx: number, dy: number) : Vec4;
	/**
	 * Adds the given delta values to the vector.
	 */
	add (dx: number, dy: number, dz: number, dw: number) : Vec4;

	add (dx: Vec4|number, dy: number=null, dz: number=null, dw: number=null)
	{
		if (dy === null) {
			m.vec4_add1v(this.addr, (dx as Vec4).addr);
			return this;
		}
		
		if (dz === null) {
			m.vec4_add2f(this.addr, dx, dy);
			return this;
		}

		m.vec4_add4f(this.addr, dx, dy, dz, dw);
		return this;
	}

	/**
	 * Subtracts the coordinates of the given Vec4 from the vector.
	 */
	sub (v: Vec4) : Vec4;
	/**
	 * Subtracts the given delta values from the vector.
	 */
	sub (dx: number, dy: number) : Vec4;
	/**
	 * Subtracts the given delta values from the vector.
	 */
	sub (dx: number, dy: number, dz: number, dw: number) : Vec4;

	sub (dx: Vec4|number, dy: number=null, dz: number=null, dw: number=null)
	{
		if (dy === null) {
			m.vec4_sub1v(this.addr, (dx as Vec4).addr);
			return this;
		}

		if (dz === null) {
			m.vec4_sub2f(this.addr, dx, dy);
			return this;
		}

		m.vec4_sub4f(this.addr, dx, dy, dz, dw);
		return this;
	}

	/**
	 * Scales each components of the vector by the respective component of the given one.
	 */
	scale (v: Vec4) : Vec4;
	/**
	 * Scales both components of the vector by the given factor.
	 */
	scale (factor: number) : Vec4;
	/**
	 * Scales each components of the vector by the given factors.
	 */
	scale (fx: number, fy: number) : Vec4;
	/**
	 * Scales each components of the vector by the given factors.
	 */
	scale (fx: number, fy: number, fz: number, fw: number) : Vec4;

	scale (fx: Vec4|number, fy: number=null, fz: number=null, fw: number=null) : Vec4
	{
		if (fy === null)
		{
			if (fx instanceof Vec4)
				m.vec4_scale1v(this.addr, fx.addr);
			else
				m.vec4_scale1f(this.addr, fx);

			return this;
		}
		
		if (fz === null) {
			m.vec4_scale2f(this.addr, fx, fy);
			return this;
		}

		m.vec4_scale4f(this.addr, fx, fy, fz, fw);
		return this;
	}

	/**
	 * Performs `floor` on the components of the vector.
	 */
	floor() : Vec4 {
		m.vec4_floor(this.addr);
		return this;
	}

	/**
	 * Performs `ceil` on the components of the vector.
	 */
	ceil() : Vec4 {
		m.vec4_ceil(this.addr);
		return this;
	}

	/**
	 * Truncates the vector components to their integer parts.
	 */
	trunc() : Vec4 {
		m.vec4_trunc(this.addr);
		return this;
	}

	/**
	 * Truncates the vector components to their fractional parts.
	 */
	fract() : Vec4 {
		m.vec4_fract(this.addr);
		return this;
	}

	/**
	 * Returns the dot product of the vectors.
	 */
	dot (v: Vec4) : number;
	/**
	 * Returns the dot product of the vector and the given values.
	 */
	dot (x: number, y: number) : number;
	/**
	 * Returns the dot product of the vector and the given values.
	 */
	dot (x: number, y: number, z: number, w: number) : number;

	dot (x: Vec4|number, y: number=null, z: number=null, w: number=null) : number
	{
		if (y === null)
			return m.vec4_dot1v(this.addr, (x as Vec4).addr);

		if (z === null)
			return m.vec4_dot2f(this.addr, x, y);

		return m.vec4_dot4f(this.addr, x, y, z, w);
	}

	/**
	 * Returns the squared magnitude of the vector.
	 */
	mag2() : number {
		return m.vec4_mag2(this.addr);
	}

	/**
	 * Returns the magnitude of the vector.
	 */
	mag() : number {
		return m.vec4_mag(this.addr);
	}

	/**
	 * Normalizes the vector by dividing each component by the vector magnitude to obtain a unit vector.
	 */
	unit() : Vec4 {
		m.vec4_unit(this.addr);
		return this;
	}

	/**
	 * Sets the vector to its major-axis, that is the component with the maximum absolute value.
	 */
	major() : Vec4 {
		m.vec4_major(this.addr);
		return this;
	}

	/**
	 * Sets the vector to its minor-axis, that is the component with the minimum absolute value.
	 */
	minor() : Vec4 {
		m.vec4_minor(this.addr);
		return this;
	}

	/**
	 * Sets the vector to its sign-vector representation.
	 */
	sign() : Vec4 {
		m.vec4_sign(this.addr);
		return this;
	}

	/**
	 * Returns the string representation of the coordinates of the vector.
	 */
	toString() : string
	{
		return `(${this.x()}, ${this.y()}, ${this.z()}, ${this.w()})`;
	}
};
