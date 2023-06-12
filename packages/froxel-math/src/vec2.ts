
import { Module } from "asyl";

let m: Module = null;

/**
 * 2D Vector.
 */
export default class Vec2
{
	/**
	 * Address of underlying vec2.
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
	static alloc (x:number=0, y:number=0) : Vec2 {
		return new Vec2(m.vec2_alloc2f(x, y));
	}

	/**
	 * Constructs the vector with the specified coordinates.
	 */
	private constructor (addr: number) {
		this.addr = addr;
		this.data = m.mapFloat32Array(addr, 2);
	}

	/**
	 * Destroys the instance.
	 */
	dtor() {
		m.vec2_dtor(this.addr);
	}

	/**
	 * Returns a new vector with the same coordinates.
	 */
	clone() : Vec2 {
		return new Vec2(m.vec2_clone(this.addr));
	}

	/**
	 * Sets the coordinates of the vector from a Vec2 object.
	 */
	set (v: Vec2) : Vec2;
	/**
	 * Sets the coordinates of the vector.
	 */
	set (x: number, y: number) : Vec2;

	set (x: Vec2|number, y: number = null) : Vec2
	{
		if (y === null)
			m.vec2_set1v(this.addr, (x as Vec2).addr);
		else
			m.vec2_set2f(this.addr, x, y);

		return this;
	}

	/**
	 * Sets the X-coordinate of the vector.
	 */
	setX (x: number) : Vec2 {
		this.data[0] = x;
		return this;
	}

	/**
	 * Sets the Y-coordinate of the vector.
	 */
	setY (y: number) : Vec2 {
		this.data[1] = y;
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
	 * Sets the coordinates of the vector to zero.
	 */
	zero() : Vec2 {
		m.vec2_zero(this.addr);
		return this;
	}

	/**
	 * Returns true if the vector coordinates are zero.
	 */
	iszero() : boolean {
		return m.vec2_iszero(this.addr);
	}

	/**
	 * Returns true if the coordinates of the vector have the same values as the given Vec2.
	 */
	equals (v: Vec2) : boolean;
	/**
	 * Returns true if the coordinates of the vector have the same values as the given ones.
	 */
	equals (x: number, y: number) : boolean;

	equals (x: Vec2|number, y: number=null) : boolean
	{
		if (y === null)
			return m.vec2_equals1v(this.addr, (x as Vec2).addr);

		return m.vec2_equals2f(this.addr, x, y);
	}

	/**
	 * Returns true if the difference between the coordinates is less than the specified epsilon.
	 */
	almost (v: Vec2, epsilon: number) : boolean;
	/**
	 * Returns true if the difference between the coordinates is less than the specified epsilon.
	 */
	almost (x: number, y: number, epsilon: number) : boolean;

	almost (x: Vec2|number, y: number=null, epsilon: number=null) : boolean
	{
		if (epsilon === null)
			return m.vec2_almost1v(this.addr, (x as Vec2).addr, y);

		return m.vec2_almost2f(this.addr, x, y, epsilon);
	}

	/**
	 * Negates the vector, that is changing the sign of each component in the vector.
	 */
	neg() : Vec2 {
		m.vec2_neg(this.addr);
		return this;
	}

	/**
	 * Inverts the vector by changing each component to its reciprocal.
	 */
	inv() : Vec2 {
		m.vec2_inv(this.addr);
		return this;
	}

	/**
	 * Changes the components of the vector to their absolute value.
	 */
	abs() : Vec2 {
		m.vec2_abs(this.addr);
		return this;
	}

	/**
	 * Adds the coordinates of the given Vec2 to the vector.
	 */
	translate (v: Vec2) : Vec2;
	/**
	 * Adds the given delta values to the vector.
	 */
	translate (dx: number, dy: number) : Vec2;

	translate (dx: Vec2|number, dy: number=null) : Vec2
	{
		if (dy === null)
			m.vec2_translate1v(this.addr, (dx as Vec2).addr);
		else
			m.vec2_translate2f(this.addr, dx, dy);

		return this;
	}

	/**
	 * Rotates the vector by the specified angle (in radians) using the specified (optional) origin point.
	 */
	rotate (angle: number, cx: number=0, cy: number=0) : Vec2
	{
		m.vec2_rotate3f(this.addr, angle, cx, cy);
		return this;
	}

	/**
	 * Adds the coordinates of the given Vec2 to the vector.
	 */
	add (v: Vec2) : Vec2;
	/**
	 * Adds the given delta values to the vector.
	 */
	add (dx: number, dy: number) : Vec2;

	add (dx: Vec2|number, dy: number=null)
	{
		if (dy === null)
			m.vec2_add1v(this.addr, (dx as Vec2).addr);
		else
			m.vec2_add2f(this.addr, dx, dy);

		return this;
	}

	/**
	 * Subtracts the coordinates of the given Vec2 from the vector.
	 */
	sub (v: Vec2) : Vec2;
	/**
	 * Subtracts the given delta values from the vector.
	 */
	sub (dx: number, dy: number) : Vec2;

	sub (dx: Vec2|number, dy: number=null)
	{
		if (dy === null)
			m.vec2_sub1v(this.addr, (dx as Vec2).addr);
		else
			m.vec2_sub2f(this.addr, dx, dy);

		return this;
	}

	/**
	 * Scales each components of the vector by the respective component of the given one.
	 */
	scale (v: Vec2) : Vec2;
	/**
	 * Scales both components of the vector by the given factor.
	 */
	scale (factor: number) : Vec2;
	/**
	 * Scales each components of the vector by the given factors.
	 */
	scale (fx: number, fy: number) : Vec2;

	scale (fx: Vec2|number, fy: number=null) : Vec2
	{
		if (fy === null)
		{
			if (fx instanceof Vec2)
				m.vec2_scale1v(this.addr, fx.addr);
			else
				m.vec2_scale1f(this.addr, fx);
		}
		else
			m.vec2_scale2f(this.addr, fx, fy);

		return this;
	}

	/**
	 * Performs `floor` on the components of the vector.
	 */
	floor() : Vec2 {
		m.vec2_floor(this.addr);
		return this;
	}

	/**
	 * Performs `ceil` on the components of the vector.
	 */
	ceil() : Vec2 {
		m.vec2_ceil(this.addr);
		return this;
	}

	/**
	 * Truncates the vector components to their integer parts.
	 */
	trunc() : Vec2 {
		m.vec2_trunc(this.addr);
		return this;
	}

	/**
	 * Truncates the vector components to their fractional parts.
	 */
	fract() : Vec2 {
		m.vec2_fract(this.addr);
		return this;
	}

	/**
	 * Returns the dot product of the vectors.
	 */
	dot (v: Vec2) : number;
	/**
	 * Returns the dot product of the vector and the given values.
	 */
	dot (x: number, y: number) : number;

	dot (x: Vec2|number, y: number=null) : number
	{
		if (y === null)
			return m.vec2_dot1v(this.addr, (x as Vec2).addr);

		return m.vec2_dot2f(this.addr, x, y);
	}

	/**
	 * Returns the squared magnitude of the vector.
	 */
	mag2() : number {
		return m.vec2_mag2(this.addr);
	}

	/**
	 * Returns the magnitude of the vector.
	 */
	mag() : number {
		return m.vec2_mag(this.addr);
	}

	/**
	 * Normalizes the vector by dividing each component by the vector magnitude to obtain a unit vector.
	 */
	unit() : Vec2 {
		m.vec2_unit(this.addr);
		return this;
	}

	/**
	 * Sets the vector to its major-axis, that is the component with the maximum absolute value.
	 */
	major() : Vec2 {
		m.vec2_major(this.addr);
		return this;
	}

	/**
	 * Sets the vector to its minor-axis, that is the component with the minimum absolute value.
	 */
	minor() : Vec2 {
		m.vec2_minor(this.addr);
		return this;
	}

	/**
	 * Sets the vector to its sign-vector representation.
	 */
	sign() : Vec2 {
		m.vec2_sign(this.addr);
		return this;
	}

	/**
	 * Returns the string representation of the coordinates of the vector.
	 */
	toString() : string
	{
		return `(${this.x()}, ${this.y()})`;
	}
};
