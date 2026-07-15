
import { Module } from "asyl";

let m: Module = null;

/**
 * 3D Vector.
 */
export default class Vec3
{
	/**
	 * Number of bytes per object.
	 */
	static BYTES: number = 3*Float32Array.BYTES_PER_ELEMENT;

	/**
	 * Address of underlying vec3.
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
	static alloc (x:number=0, y:number=0, z:number=0) : Vec3 {
		return new Vec3(m.vec3_alloc3f(x, y, z));
	}

	/**
	 * Materializes a vector at the specified memory location.
	 */
	static materialize(addr: number) : Vec3
	{
		return new Vec3(m.vec3_materialize(addr));
	}

	/**
	 * Constructs the vector with the specified coordinates.
	 */
	private constructor (addr: number) {
		this.addr = addr;
		this.data = m.mapFloat32Array(addr, 3);
	}

	/**
	 * Destroys the instance.
	 */
	free() {
		m.vec3_free(this.addr);
	}

	/**
	 * Returns a new vector with the same coordinates.
	 */
	clone() : Vec3 {
		return new Vec3(m.vec3_clone(this.addr));
	}

	/**
	 * Sets the coordinates of the vector from a Vec3 object.
	 */
	set (v: Vec3) : Vec3;
	/**
	 * Sets the coordinates of the vector.
	 */
	set (x: number, y: number, z: number) : Vec3;

	set (x: Vec3|number, y: number = null, z: number = null) : Vec3
	{
		if (y === null) {
			m.vec3_set1v(this.addr, (x as Vec3).addr);
			return this;
		}

		m.vec3_set3f(this.addr, x, y, z);
		return this;
	}

	/**
	 * Sets the X-coordinate of the vector.
	 */
	setX (x: number) : Vec3 {
		this.data[0] = x;
		return this;
	}

	/**
	 * Sets the Y-coordinate of the vector.
	 */
	setY (y: number) : Vec3 {
		this.data[1] = y;
		return this;
	}

	/**
	 * Sets the Z-coordinate of the vector.
	 */
	setZ (z: number) : Vec3 {
		this.data[2] = z;
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
	 * Sets the coordinates of the vector to zero.
	 */
	zero() : Vec3 {
		m.vec3_zero(this.addr);
		return this;
	}

	/**
	 * Returns true if the vector coordinates are zero.
	 */
	iszero() : boolean {
		return m.vec3_iszero(this.addr);
	}

	/**
	 * Returns true if the coordinates of the vector have the same values as the given Vec3.
	 */
	equals (v: Vec3) : boolean;
	/**
	 * Returns true if the coordinates of the vector have the same values as the given ones.
	 */
	equals (x: number, y: number) : boolean;
	/**
	 * Returns true if the coordinates of the vector have the same values as the given ones.
	 */
	equals (x: number, y: number, z: number) : boolean;

	equals (x: Vec3|number, y: number=null, z: number=null) : boolean
	{
		if (y === null)
			return m.vec3_equals1v(this.addr, (x as Vec3).addr);

		if (z === null)
			return m.vec3_equals2f(this.addr, x, y);

		return m.vec3_equals3f(this.addr, x, y, z);
	}

	/**
	 * Returns true if the difference between the coordinates is less than the specified epsilon.
	 */
	almost (v: Vec3, epsilon: number) : boolean;
	/**
	 * Returns true if the difference between the coordinates is less than the specified epsilon.
	 */
	almost (x: number, y: number, epsilon: number) : boolean;
	/**
	 * Returns true if the difference between the coordinates is less than the specified epsilon.
	 */
	almost (x: number, y: number, z: number, epsilon: number) : boolean;

	almost (x: Vec3|number, y: number=null, z: number=null, epsilon: number=null) : boolean
	{
		if (z === null)
			return m.vec3_almost1v(this.addr, (x as Vec3).addr, y);

		if (epsilon === null)
			return m.vec3_almost2f(this.addr, x, y, z);

		return m.vec3_almost3f(this.addr, x, y, z, epsilon);
	}

	/**
	 * Negates the vector, that is changing the sign of each component in the vector.
	 */
	neg() : Vec3 {
		m.vec3_neg(this.addr);
		return this;
	}

	/**
	 * Inverts the vector by changing each component to its reciprocal.
	 */
	inv() : Vec3 {
		m.vec3_inv(this.addr);
		return this;
	}

	/**
	 * Changes the components of the vector to their absolute value.
	 */
	abs() : Vec3 {
		m.vec3_abs(this.addr);
		return this;
	}

	/**
	 * Adds the coordinates of the given Vec3 to the vector.
	 */
	translate (v: Vec3) : Vec3;
	/**
	 * Adds the given delta values to the vector.
	 */
	translate (dx: number, dy: number) : Vec3;
	/**
	 * Adds the given delta values to the vector.
	 */
	translate (dx: number, dy: number, dz: number) : Vec3;

	translate (dx: Vec3|number, dy: number=null, dz: number=null) : Vec3
	{
		if (dy === null) {
			m.vec3_translate1v(this.addr, (dx as Vec3).addr);
			return this;
		}

		if (dz === null) {
			m.vec3_translate2f(this.addr, dx, dy);
			return this;
		}

		m.vec3_translate3f(this.addr, dx, dy, dz);
		return this;
	}

	/**
	 * Adds the coordinates of the given Vec3 to the vector.
	 */
	add (v: Vec3) : Vec3;
	/**
	 * Adds the given delta values to the vector.
	 */
	add (dx: number, dy: number) : Vec3;
	/**
	 * Adds the given delta values to the vector.
	 */
	add (dx: number, dy: number, dz: number) : Vec3;

	add (dx: Vec3|number, dy: number=null, dz: number=null)
	{
		if (dy === null) {
			m.vec3_add1v(this.addr, (dx as Vec3).addr);
			return this;
		}

		if (dz === null) {
			m.vec3_add2f(this.addr, dx, dy);
			return this;
		}

		m.vec3_add3f(this.addr, dx, dy, dz);
		return this;
	}

	/**
	 * Subtracts the coordinates of the given Vec3 from the vector.
	 */
	sub (v: Vec3) : Vec3;
	/**
	 * Subtracts the given delta values from the vector.
	 */
	sub (dx: number, dy: number) : Vec3;
	/**
	 * Subtracts the given delta values from the vector.
	 */
	sub (dx: number, dy: number, dz: number) : Vec3;

	sub (dx: Vec3|number, dy: number=null, dz: number=null)
	{
		if (dy === null) {
			m.vec3_sub1v(this.addr, (dx as Vec3).addr);
			return this;
		}

		if (dz === null) {
			m.vec3_sub2f(this.addr, dx, dy);
			return this;
		}

		m.vec3_sub3f(this.addr, dx, dy, dz);
		return this;
	}

	/**
	 * Scales each components of the vector by the respective component of the given one.
	 */
	scale (v: Vec3) : Vec3;
	/**
	 * Scales both components of the vector by the given factor.
	 */
	scale (factor: number) : Vec3;
	/**
	 * Scales each components of the vector by the given factors.
	 */
	scale (fx: number, fy: number) : Vec3;
	/**
	 * Scales each components of the vector by the given factors.
	 */
	scale (fx: number, fy: number, fz: number) : Vec3;

	scale (fx: Vec3|number, fy: number=null, fz: number=null) : Vec3
	{
		if (fy === null)
		{
			if (fx instanceof Vec3)
				m.vec3_scale1v(this.addr, fx.addr);
			else
				m.vec3_scale1f(this.addr, fx);

			return this;
		}

		if (fz === null) {
			m.vec3_scale2f(this.addr, fx, fy);
			return this;
		}

		m.vec3_scale3f(this.addr, fx, fy, fz);
		return this;
	}

	/**
	 * Performs `floor` on the components of the vector.
	 */
	floor() : Vec3 {
		m.vec3_floor(this.addr);
		return this;
	}

	/**
	 * Performs `ceil` on the components of the vector.
	 */
	ceil() : Vec3 {
		m.vec3_ceil(this.addr);
		return this;
	}

	/**
	 * Truncates the vector components to their integer parts.
	 */
	trunc() : Vec3 {
		m.vec3_trunc(this.addr);
		return this;
	}

	/**
	 * Truncates the vector components to their fractional parts.
	 */
	fract() : Vec3 {
		m.vec3_fract(this.addr);
		return this;
	}

	/**
	 * Returns the dot product of the vectors.
	 */
	dot (v: Vec3) : number;
	/**
	 * Returns the dot product of the vector and the given values.
	 */
	dot (x: number, y: number) : number;
	/**
	 * Returns the dot product of the vector and the given values.
	 */
	dot (x: number, y: number, z: number) : number;

	dot (x: Vec3|number, y: number=null, z: number=null) : number
	{
		if (y === null)
			return m.vec3_dot1v(this.addr, (x as Vec3).addr);

		if (z === null)
			return m.vec3_dot2f(this.addr, x, y);

		return m.vec3_dot3f(this.addr, x, y, z);
	}

	/**
	 * Sets the vector to the cross product of it and the given one.
	 */
	cross (v: Vec3) : Vec3;
	/**
	 * Sets the vector to the cross product of it and the given values.
	 */
	cross (x: number, y: number, z: number) : Vec3;

	cross (x: Vec3|number, y: number=null, z: number=null) : Vec3
	{
		if (y === null)
			m.vec3_cross1v(this.addr, (x as Vec3).addr);
		else
			m.vec3_cross3f(this.addr, x, y, z);

		return this;
	}

	/**
	 * Returns the squared magnitude of the vector.
	 */
	mag2() : number {
		return m.vec3_mag2(this.addr);
	}

	/**
	 * Returns the magnitude of the vector.
	 */
	mag() : number {
		return m.vec3_mag(this.addr);
	}

	/**
	 * Normalizes the vector by dividing each component by the vector magnitude to obtain a unit vector.
	 */
	unit() : Vec3 {
		m.vec3_unit(this.addr);
		return this;
	}

	/**
	 * Sets the vector to its major-axis, that is the component with the maximum absolute value.
	 */
	major() : Vec3 {
		m.vec3_major(this.addr);
		return this;
	}

	/**
	 * Sets the vector to its minor-axis, that is the component with the minimum absolute value.
	 */
	minor() : Vec3 {
		m.vec3_minor(this.addr);
		return this;
	}

	/**
	 * Sets the vector to its sign-vector representation.
	 */
	sign() : Vec3 {
		m.vec3_sign(this.addr);
		return this;
	}

	/**
	 * Returns the string representation of the coordinates of the vector.
	 */
	toString() : string
	{
		return `(${this.x()}, ${this.y()}, ${this.z()})`;
	}
};
