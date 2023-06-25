
import { Module } from "asyl";
import Vec2 from './vec2';

let m: Module = null;

/**
 * Rectangle.
 */
export default class Rect
{
	/**
	 * Address of underlying Rect.
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
	 * Allocates a new rectangle of zero size.
	 */
	static alloc() : Rect;
	/**
	 * Allocates a new rectangle with the specified size.
	 */
	static alloc (width: number, height: number, topLeft?: boolean) : Rect;
	/**
	 * Allocates a new rectangle with the specified coordinates.
	 */
	static alloc (x1: number, y1: number, x2: number, y2: number) : Rect;

	static alloc (x1: number=null, y1: number=null, x2: number|boolean=false, y2: number=null) : Rect
	{
		if (x1 === null)
			return new Rect(m.rect_alloc4f(0, 0, 0, 0));

		if (y2 === null)
			return new Rect(m.rect_alloc2f(x1, y1, x2));

		return new Rect(m.rect_alloc4f(x1, y1, x2, y2));
	}

	/**
	 * Materializes a rectangle at the specified memory location.
	 */
	static materialize(addr: number) : Rect
	{
		return new Rect(m.rect_materialize(addr));
	}

	/**
	 * Constructs the rectangle object.
	 */
	private constructor (addr: number) {
		this.addr = addr;
		this.data = m.mapFloat32Array(addr, 6);
	}

	/**
	 * Destroys the instance.
	 */
	dtor() : void {
		m.rect_dtor(this.addr);
	}

	/**
	 * Returns a clone of the rectangle.
	 */
	clone() : Rect {
		return new Rect(m.rect_clone(this.addr));
	}

	/**
	 * Sets all coordinates of the rectangle to zero.
	 */
	zero() : Rect {
		m.rect_zero(this.addr);
		return this;
	}

	/**
	 * Sets all coordinates of the rectangle to `null` for subsequent use with `extend`.
	 */
	reset() : Rect {
		m.rect_reset(this.addr);
		return this;
	}

	/**
	 * Extends the rectangle to contain the specified vector coordinates.
	 */
	extend (v: Vec2) : Rect;
	/**
	 * Extends the rectangle to contain the specified point.
	 */
	extend (x: number, y: number) : Rect;

	extend (x: Vec2|number, y: number=null) : Rect
	{
		if (y === null)
			m.rect_extend1v(this.addr, (x as Vec2).addr);
		else
			m.rect_extend2f(this.addr, x, y);

		return this;
	}

	/**
	 * Translates the rectangle by the vector coordinates.
	 */
	translate (v: Vec2) : Rect;
	/**
	 * Translates the rectangle by the given deltas.
	 */
	translate (dx: number, dy: number) : Rect;

	translate (dx: Vec2|number, dy: number=null) : Rect
	{
		if (dy === null)
			m.rect_translate1v(this.addr, (dx as Vec2).addr);
		else
			m.rect_translate2f(this.addr, dx, dy);

		return this;
	}

	/**
	 * Moves the center of the rectangle to the specified position.	 
	 * @param normalized - When `true` the parameters `x` and `y` are treated as normalized ranging from 0 to 1 (inclusive).
	 * !centerAt (x: number, y: number, normalized?: false) : Rect;
	 */
	center (x: number, y: number, normalized: boolean=false) : Rect
	{
		m.rect_center(this.addr, x, y, normalized);
		return this;
	}

	/**
	 * Copies the coordinates from the specified rectangle.
	 */
	set (r: Rect) : Rect;
	/**
	 * Sets the coordinates of the rectangle.
	 */
	set (x1: number, y1: number, x2: number, y2: number) : Rect;

	set (x1: Rect|number, y1: number=null, x2?: number, y2?: number) : Rect
	{
		if (y1 === null)
			m.rect_set1r(this.addr, (x1 as Rect).addr);
		else
			m.rect_set4f(this.addr, x1, y1, x2, y2);

		return this;
	}

	/**
	 * Returns `true` if the given rectangle coordinates are equal.
	 */
	equals (r: Rect) : boolean;
	/**
	 * 	Returns `true` if the coordinates are equal.
	 */
	equals (x1: number, y1: number, x2: number, y2: number) : boolean;
	
	equals (x1: Rect|number, y1: number=null, x2?: number, y2?: number) : boolean
	{
		if (y1 === null)
			return m.rect_equals1r(this.addr, (x1 as Rect).addr);

		return m.rect_equals4f(this.addr, x1, y1, x2, y2);
	}

	/**
	 * Returns `true` if the rectangle contains the given one.
	 */
	contains (r: Rect) : boolean;
	/**
	 * Returns `true` if the rectangle contains the given one describes by the (x1, y1) to (x2, y2) coordinates.
	 */
	contains (x1: number, y1: number, x2: number, y2: number) : boolean;
	/**
	 * Returns `true` if the rectangle contains the vector given coordinates.
	 */
	contains (v: Vec2, epsilon?: number) : boolean;
	/**
	 * Returns `true` if the rectangle contains the given coordinates.
	 */
	contains (x: number, y: number, epsilon?: number) : boolean;

	contains (x1: Rect|Vec2|number, y1: number=0, x2: number=0, y2: number=null) : boolean
	{
		if (x1 instanceof Rect)
			return m.rect_contains1r(this.addr, x1.addr);

		if (x1 instanceof Vec2)
			return m.rect_contains1v(this.addr, x1.addr, x2);

		if (y2 === null)
			return m.rect_contains2f(this.addr, x1, y1, x2);

		return m.rect_contains4f(this.addr, x1, y1, x2, y2);
	}

	/**
	 * Sets the coordinates of the rectangle to the union of it and the given one.
	 */
	union (r: Rect) : Rect;
	/**
	 * Sets the coordinates of the rectangle to the union of it and the given one.
	 */
	union (x1: number, y1: number, x2: number, y2: number) : Rect;
	
	union (x1: Rect|number, y1: number=null, x2?: number, y2?: number) : Rect
	{
		if (y1 === null)
			m.rect_union1r(this.addr, (x1 as Rect).addr);
		else
			m.rect_union4f(this.addr, x1, y1, x2, y2);

		return this;
	}

	/**
	 * Returns `true` if the rectangles intersect.
	 */
	intersects (r: Rect) : Rect;
	/**
	 * Returns `true` if the rectangle and the given coordinates intersect.
	 */
	intersects (x1: number, y1: number, x2: number, y2: number) : Rect;

	intersects (x1: Rect|number, y1: number=null, x2?: number, y2?: number) : Rect
	{
		if (y1 === null)
			m.rect_intersects1r(this.addr, (x1 as Rect).addr);
		else
			m.rect_intersects4f(this.addr, x1, y1, x2, y2);

		return this;
	}

	/**
	 * Sets the coordinates of the rectangle to the intersection of it and the given one.
	 */
	intersection (r: Rect) : boolean;
	/**
	 * Sets the coordinates of the rectangle to the intersection of it and the given one.
	 */
	intersection (x1: number, y1: number, x2: number, y2: number) : boolean;

	intersection (x1: Rect|number, y1: number=null, x2?: number, y2?: number) : boolean
	{
		if (y1 === null)
			return m.rect_intersection1r(this.addr, (x1 as Rect).addr);

		return m.rect_intersection4f(this.addr, x1, y1, x2, y2);
	}

	/**
	 * Resizes the rectangle to the given size using its center or top-left corner as reference.
	 * @param topLeft - When `true` reference will be top-left corner, set to `false` to use the center.
	 * @param normalized - When `true` the `width` and `height` will be treated as normalized values ranging from 0 to 1 (inclusive).
	 */
	resize (width: number, height: number, topLeft: boolean=false, normalized: boolean=false) : Rect
	{
		m.rect_resize (this.addr, width, height, topLeft, normalized);
		return this;
	}

	/**
	 * Resizes the rectangle using the specified deltas, relative to its center or top-left corner.
	 * @param topLeft - When `true` reference will be top-left corner, set to `false` to use the center.
	 */
	resizeBy (dWidth: number, dHeight: number, topLeft: boolean=false) : Rect
	{
		m.rect_resizeBy (this.addr, dWidth, dHeight, topLeft);
		return this;
	}

	/**
	 * Returns the value of the X1 coordinate.
	 */
	x1() : number {
		return this.data[0];
	}

	/**
	 * Returns the value of the Y1 coordinate.
	 */
	y1() : number {
		return this.data[1];
	}


	/**
	 * Returns the value of the X2 coordinate.
	 */
	x2() : number {
		return this.data[2];
	}

	/**
	 * Returns the value of the Y2 coordinate.
	 */
	y2() : number {
		return this.data[3];
	}

	/**
	 * Returns the value of the center X coordinate.
	 */
	cx() : number {
		return this.data[4];
	}

	/**
	 * Returns the value of the center Y coordinate.
	 */
	cy() : number {
		return this.data[5];
	}

	/**
	 * Returns the width of the rectangle.
	 */
	width() : number {
		return m.rect_width (this.addr);
	}

	/**
	 * Returns the height of the rectangle.	 
	 */
	height() : number {
		return m.rect_height (this.addr);
	}

	/**
	 * Returns `true` if the rectangle is a right rectangle, that is: x1 < x2 and y1 < y2.
	 */
	isRight() : boolean {
		return m.rect_isRight (this.addr);
	}

	/**
	 * Returns the area of the rectangle.
	 * @param strict - Indicates if the area is returned only if the rectangle is a right rectangle.
	 */
	area (strict?: boolean) : number {
		return m.rect_area (this.addr, strict);
	}

	/**
	 * Performs `floor` on the coordinates of the rectangle.
	 */
	floor() : Rect {
		m.rect_floor (this.addr);
		return this;
	}

	/**
	 * Performs `ceil` on the coordinates of the rectangle.
	 */
	ceil() : Rect {
		m.rect_ceil (this.addr);
		return this;
	}

	/**
	 * Truncates the rectangle coordinates to their integer parts.
	 */
	trunc() : Rect {
		m.rect_trunc (this.addr);
		return this;
	}

	/**
	 * Truncates the rectangle coordinates to their fractional parts.
	 */
	fract() : Rect {
		m.rect_fract (this.addr);
		return this;
	}


	/**
	 * Returns the string representation of the rectangle.
	 */
	toString() : string
	{
		return `(${this.x1()}, ${this.y1()}, ${this.x2()}, ${this.y2()})`;
	}
};
