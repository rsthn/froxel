import { Module } from 'asyl';

/**
 * 2D Vector.
 */
export declare class Vec2 {
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
	static bind(module: Module): void;
	/**
	 * Allocates a new vector with the specified coordinates.
	 */
	static alloc(x?: number, y?: number): Vec2;
	/**
	 * Materializes a vector at the specified memory location.
	 */
	static materialize(addr: number): Vec2;
	/**
	 * Constructs the vector with the specified coordinates.
	 */
	private constructor();
	/**
	 * Destroys the instance.
	 */
	dtor(): void;
	/**
	 * Returns a new vector with the same coordinates.
	 */
	clone(): Vec2;
	/**
	 * Sets the coordinates of the vector from a Vec2 object.
	 */
	set(v: Vec2): Vec2;
	/**
	 * Sets the coordinates of the vector.
	 */
	set(x: number, y: number): Vec2;
	/**
	 * Sets the X-coordinate of the vector.
	 */
	setX(x: number): Vec2;
	/**
	 * Sets the Y-coordinate of the vector.
	 */
	setY(y: number): Vec2;
	/**
	 * Returns the value of the X-coordinate.
	 */
	x(): number;
	/**
	 * Returns the value of the Y-coordinate.
	 */
	y(): number;
	/**
	 * Sets the coordinates of the vector to zero.
	 */
	zero(): Vec2;
	/**
	 * Returns true if the vector coordinates are zero.
	 */
	iszero(): boolean;
	/**
	 * Returns true if the coordinates of the vector have the same values as the given Vec2.
	 */
	equals(v: Vec2): boolean;
	/**
	 * Returns true if the coordinates of the vector have the same values as the given ones.
	 */
	equals(x: number, y: number): boolean;
	/**
	 * Returns true if the difference between the coordinates is less than the specified epsilon.
	 */
	almost(v: Vec2, epsilon: number): boolean;
	/**
	 * Returns true if the difference between the coordinates is less than the specified epsilon.
	 */
	almost(x: number, y: number, epsilon: number): boolean;
	/**
	 * Negates the vector, that is changing the sign of each component in the vector.
	 */
	neg(): Vec2;
	/**
	 * Inverts the vector by changing each component to its reciprocal.
	 */
	inv(): Vec2;
	/**
	 * Changes the components of the vector to their absolute value.
	 */
	abs(): Vec2;
	/**
	 * Adds the coordinates of the given Vec2 to the vector.
	 */
	translate(v: Vec2): Vec2;
	/**
	 * Adds the given delta values to the vector.
	 */
	translate(dx: number, dy: number): Vec2;
	/**
	 * Rotates the vector by the specified angle (in radians) using the specified (optional) origin point.
	 */
	rotate(angle: number, cx?: number, cy?: number): Vec2;
	/**
	 * Adds the coordinates of the given Vec2 to the vector.
	 */
	add(v: Vec2): Vec2;
	/**
	 * Adds the given delta values to the vector.
	 */
	add(dx: number, dy: number): Vec2;
	/**
	 * Subtracts the coordinates of the given Vec2 from the vector.
	 */
	sub(v: Vec2): Vec2;
	/**
	 * Subtracts the given delta values from the vector.
	 */
	sub(dx: number, dy: number): Vec2;
	/**
	 * Scales each components of the vector by the respective component of the given one.
	 */
	scale(v: Vec2): Vec2;
	/**
	 * Scales both components of the vector by the given factor.
	 */
	scale(factor: number): Vec2;
	/**
	 * Scales each components of the vector by the given factors.
	 */
	scale(fx: number, fy: number): Vec2;
	/**
	 * Performs `floor` on the components of the vector.
	 */
	floor(): Vec2;
	/**
	 * Performs `ceil` on the components of the vector.
	 */
	ceil(): Vec2;
	/**
	 * Truncates the vector components to their integer parts.
	 */
	trunc(): Vec2;
	/**
	 * Truncates the vector components to their fractional parts.
	 */
	fract(): Vec2;
	/**
	 * Returns the dot product of the vectors.
	 */
	dot(v: Vec2): number;
	/**
	 * Returns the dot product of the vector and the given values.
	 */
	dot(x: number, y: number): number;
	/**
	 * Returns the squared magnitude of the vector.
	 */
	mag2(): number;
	/**
	 * Returns the magnitude of the vector.
	 */
	mag(): number;
	/**
	 * Normalizes the vector by dividing each component by the vector magnitude to obtain a unit vector.
	 */
	unit(): Vec2;
	/**
	 * Sets the vector to its major-axis, that is the component with the maximum absolute value.
	 */
	major(): Vec2;
	/**
	 * Sets the vector to its minor-axis, that is the component with the minimum absolute value.
	 */
	minor(): Vec2;
	/**
	 * Sets the vector to its sign-vector representation.
	 */
	sign(): Vec2;
	/**
	 * Returns the string representation of the coordinates of the vector.
	 */
	toString(): string;
}
/**
 * 4D Vector.
 */
export declare class Vec4 {
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
	static bind(module: Module): void;
	/**
	 * Allocates a new vector with the specified coordinates.
	 */
	static alloc(x?: number, y?: number, z?: number, w?: number): Vec4;
	/**
	 * Materializes a vector at the specified memory location.
	 */
	static materialize(addr: number): Vec4;
	/**
	 * Constructs the vector with the specified coordinates.
	 */
	private constructor();
	/**
	 * Destroys the instance.
	 */
	dtor(): void;
	/**
	 * Returns a new vector with the same coordinates.
	 */
	clone(): Vec4;
	/**
	 * Sets the coordinates of the vector from a Vec4 object.
	 */
	set(v: Vec4): Vec4;
	/**
	 * Sets the coordinates of the vector.
	 */
	set(x: number, y: number, z: number, w: number): Vec4;
	/**
	 * Sets the X-coordinate of the vector.
	 */
	setX(x: number): Vec4;
	/**
	 * Sets the Y-coordinate of the vector.
	 */
	setY(y: number): Vec4;
	/**
	 * Sets the Z-coordinate of the vector.
	 */
	setZ(z: number): Vec4;
	/**
	 * Sets the W-coordinate of the vector.
	 */
	setW(w: number): Vec4;
	/**
	 * Returns the value of the X-coordinate.
	 */
	x(): number;
	/**
	 * Returns the value of the Y-coordinate.
	 */
	y(): number;
	/**
	 * Returns the value of the Z-coordinate.
	 */
	z(): number;
	/**
	 * Returns the value of the W-coordinate.
	 */
	w(): number;
	/**
	 * Sets the coordinates of the vector to zero.
	 */
	zero(): Vec4;
	/**
	 * Returns true if the vector coordinates are zero.
	 */
	iszero(): boolean;
	/**
	 * Returns true if the coordinates of the vector have the same values as the given Vec4.
	 */
	equals(v: Vec4): boolean;
	/**
	 * Returns true if the coordinates of the vector have the same values as the given ones.
	 */
	equals(x: number, y: number): boolean;
	/**
	 * Returns true if the coordinates of the vector have the same values as the given ones.
	 */
	equals(x: number, y: number, z: number, w: number): boolean;
	/**
	 * Returns true if the difference between the coordinates is less than the specified epsilon.
	 */
	almost(v: Vec4, epsilon: number): boolean;
	/**
	 * Returns true if the difference between the coordinates is less than the specified epsilon.
	 */
	almost(x: number, y: number, epsilon: number): boolean;
	/**
	 * Returns true if the difference between the coordinates is less than the specified epsilon.
	 */
	almost(x: number, y: number, z: number, w: number, epsilon: number): boolean;
	/**
	 * Negates the vector, that is changing the sign of each component in the vector.
	 */
	neg(): Vec4;
	/**
	 * Inverts the vector by changing each component to its reciprocal.
	 */
	inv(): Vec4;
	/**
	 * Changes the components of the vector to their absolute value.
	 */
	abs(): Vec4;
	/**
	 * Adds the coordinates of the given Vec4 to the vector.
	 */
	translate(v: Vec4): Vec4;
	/**
	 * Adds the given delta values to the vector.
	 */
	translate(dx: number, dy: number): Vec4;
	/**
	 * Adds the given delta values to the vector.
	 */
	translate(dx: number, dy: number, dz: number, dw: number): Vec4;
	/**
	 * Adds the coordinates of the given Vec4 to the vector.
	 */
	add(v: Vec4): Vec4;
	/**
	 * Adds the given delta values to the vector.
	 */
	add(dx: number, dy: number): Vec4;
	/**
	 * Adds the given delta values to the vector.
	 */
	add(dx: number, dy: number, dz: number, dw: number): Vec4;
	/**
	 * Subtracts the coordinates of the given Vec4 from the vector.
	 */
	sub(v: Vec4): Vec4;
	/**
	 * Subtracts the given delta values from the vector.
	 */
	sub(dx: number, dy: number): Vec4;
	/**
	 * Subtracts the given delta values from the vector.
	 */
	sub(dx: number, dy: number, dz: number, dw: number): Vec4;
	/**
	 * Scales each components of the vector by the respective component of the given one.
	 */
	scale(v: Vec4): Vec4;
	/**
	 * Scales both components of the vector by the given factor.
	 */
	scale(factor: number): Vec4;
	/**
	 * Scales each components of the vector by the given factors.
	 */
	scale(fx: number, fy: number): Vec4;
	/**
	 * Scales each components of the vector by the given factors.
	 */
	scale(fx: number, fy: number, fz: number, fw: number): Vec4;
	/**
	 * Performs `floor` on the components of the vector.
	 */
	floor(): Vec4;
	/**
	 * Performs `ceil` on the components of the vector.
	 */
	ceil(): Vec4;
	/**
	 * Truncates the vector components to their integer parts.
	 */
	trunc(): Vec4;
	/**
	 * Truncates the vector components to their fractional parts.
	 */
	fract(): Vec4;
	/**
	 * Returns the dot product of the vectors.
	 */
	dot(v: Vec4): number;
	/**
	 * Returns the dot product of the vector and the given values.
	 */
	dot(x: number, y: number): number;
	/**
	 * Returns the dot product of the vector and the given values.
	 */
	dot(x: number, y: number, z: number, w: number): number;
	/**
	 * Returns the squared magnitude of the vector.
	 */
	mag2(): number;
	/**
	 * Returns the magnitude of the vector.
	 */
	mag(): number;
	/**
	 * Normalizes the vector by dividing each component by the vector magnitude to obtain a unit vector.
	 */
	unit(): Vec4;
	/**
	 * Sets the vector to its major-axis, that is the component with the maximum absolute value.
	 */
	major(): Vec4;
	/**
	 * Sets the vector to its minor-axis, that is the component with the minimum absolute value.
	 */
	minor(): Vec4;
	/**
	 * Sets the vector to its sign-vector representation.
	 */
	sign(): Vec4;
	/**
	 * Returns the string representation of the coordinates of the vector.
	 */
	toString(): string;
}
/**
 * Rectangle.
 */
export declare class Rect {
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
	static bind(module: Module): void;
	/**
	 * Allocates a new rectangle of zero size.
	 */
	static alloc(): Rect;
	/**
	 * Allocates a new rectangle with the specified size.
	 */
	static alloc(width: number, height: number, topLeft?: boolean): Rect;
	/**
	 * Allocates a new rectangle with the specified coordinates.
	 */
	static alloc(x1: number, y1: number, x2: number, y2: number): Rect;
	/**
	 * Materializes a rectangle at the specified memory location.
	 */
	static materialize(addr: number): Rect;
	/**
	 * Constructs the rectangle object.
	 */
	private constructor();
	/**
	 * Destroys the instance.
	 */
	dtor(): void;
	/**
	 * Returns a clone of the rectangle.
	 */
	clone(): Rect;
	/**
	 * Sets all coordinates of the rectangle to zero.
	 */
	zero(): Rect;
	/**
	 * Sets all coordinates of the rectangle to `null` for subsequent use with `extend`.
	 */
	reset(): Rect;
	/**
	 * Extends the rectangle to contain the specified vector coordinates.
	 */
	extend(v: Vec2): Rect;
	/**
	 * Extends the rectangle to contain the specified point.
	 */
	extend(x: number, y: number): Rect;
	/**
	 * Translates the rectangle by the vector coordinates.
	 */
	translate(v: Vec2): Rect;
	/**
	 * Translates the rectangle by the given deltas.
	 */
	translate(dx: number, dy: number): Rect;
	/**
	 * Moves the center of the rectangle to the specified position.
	 * @param normalized - When `true` the parameters `x` and `y` are treated as normalized ranging from 0 to 1 (inclusive).
	 * !centerAt (x: number, y: number, normalized?: false) : Rect;
	 */
	center(x: number, y: number, normalized?: boolean): Rect;
	/**
	 * Copies the coordinates from the specified rectangle.
	 */
	set(r: Rect): Rect;
	/**
	 * Sets the coordinates of the rectangle.
	 */
	set(x1: number, y1: number, x2: number, y2: number): Rect;
	/**
	 * Returns `true` if the given rectangle coordinates are equal.
	 */
	equals(r: Rect): boolean;
	/**
	 * 	Returns `true` if the coordinates are equal.
	 */
	equals(x1: number, y1: number, x2: number, y2: number): boolean;
	/**
	 * Returns `true` if the rectangle contains the given one.
	 */
	contains(r: Rect): boolean;
	/**
	 * Returns `true` if the rectangle contains the given one describes by the (x1, y1) to (x2, y2) coordinates.
	 */
	contains(x1: number, y1: number, x2: number, y2: number): boolean;
	/**
	 * Returns `true` if the rectangle contains the vector given coordinates.
	 */
	contains(v: Vec2, epsilon?: number): boolean;
	/**
	 * Returns `true` if the rectangle contains the given coordinates.
	 */
	contains(x: number, y: number, epsilon?: number): boolean;
	/**
	 * Sets the coordinates of the rectangle to the union of it and the given one.
	 */
	union(r: Rect): Rect;
	/**
	 * Sets the coordinates of the rectangle to the union of it and the given one.
	 */
	union(x1: number, y1: number, x2: number, y2: number): Rect;
	/**
	 * Returns `true` if the rectangles intersect.
	 */
	intersects(r: Rect): Rect;
	/**
	 * Returns `true` if the rectangle and the given coordinates intersect.
	 */
	intersects(x1: number, y1: number, x2: number, y2: number): Rect;
	/**
	 * Sets the coordinates of the rectangle to the intersection of it and the given one.
	 */
	intersection(r: Rect): boolean;
	/**
	 * Sets the coordinates of the rectangle to the intersection of it and the given one.
	 */
	intersection(x1: number, y1: number, x2: number, y2: number): boolean;
	/**
	 * Resizes the rectangle to the given size using its center or top-left corner as reference.
	 * @param topLeft - When `true` reference will be top-left corner, set to `false` to use the center.
	 * @param normalized - When `true` the `width` and `height` will be treated as normalized values ranging from 0 to 1 (inclusive).
	 */
	resize(width: number, height: number, topLeft?: boolean, normalized?: boolean): Rect;
	/**
	 * Resizes the rectangle using the specified deltas, relative to its center or top-left corner.
	 * @param topLeft - When `true` reference will be top-left corner, set to `false` to use the center.
	 */
	resizeBy(dWidth: number, dHeight: number, topLeft?: boolean): Rect;
	/**
	 * Returns the value of the X1 coordinate.
	 */
	x1(): number;
	/**
	 * Returns the value of the Y1 coordinate.
	 */
	y1(): number;
	/**
	 * Returns the value of the X2 coordinate.
	 */
	x2(): number;
	/**
	 * Returns the value of the Y2 coordinate.
	 */
	y2(): number;
	/**
	 * Returns the value of the center X coordinate.
	 */
	cx(): number;
	/**
	 * Returns the value of the center Y coordinate.
	 */
	cy(): number;
	/**
	 * Returns the width of the rectangle.
	 */
	width(): number;
	/**
	 * Returns the height of the rectangle.
	 */
	height(): number;
	/**
	 * Returns `true` if the rectangle is a right rectangle, that is: x1 < x2 and y1 < y2.
	 */
	isRight(): boolean;
	/**
	 * Returns the area of the rectangle.
	 * @param strict - Indicates if the area is returned only if the rectangle is a right rectangle.
	 */
	area(strict?: boolean): number;
	/**
	 * Performs `floor` on the coordinates of the rectangle.
	 */
	floor(): Rect;
	/**
	 * Performs `ceil` on the coordinates of the rectangle.
	 */
	ceil(): Rect;
	/**
	 * Truncates the rectangle coordinates to their integer parts.
	 */
	trunc(): Rect;
	/**
	 * Truncates the rectangle coordinates to their fractional parts.
	 */
	fract(): Rect;
	/**
	 * Returns the string representation of the rectangle.
	 */
	toString(): string;
}
/**
 * 3x3 Matrix.
 */
export declare class Mat3 {
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
	static bind(module: Module): void;
	/**
	 * Allocates a new matrix.
	 */
	static alloc(): Mat3;
	/**
	 * Materializes a matrix at the specified memory location.
	 */
	static materialize(addr: number): Mat3;
	/**
	 * Constructs the matrix object.
	 */
	private constructor();
	/**
	 * Destroys the instance.
	 */
	dtor(): void;
	/**
	 * Returns a clone of the matrix.
	 */
	clone(): Mat3;
	/**
	 * Sets all components of the matrix to the given value.
	 */
	fill(value: number): Mat3;
	/**
	 * Sets the diagonal of the matrix to the specified value.
	 */
	set(value: number): Mat3;
	/**
	 * Copies all the components from the specified matrix.
	 */
	set(matrix: Mat3): Mat3;
	/**
	 * Sets a column of the matrix.
	 */
	set(col: number, a0: number, a1: number, a2: number): Mat3;
	/**
	 * Sets a column of the matrix.
	 */
	col(col: number, a0: number, a1: number, a2: number): Mat3;
	/**
	 * Sets a row of the matrix.
	 */
	row(row: number, a0: number, a1: number, a2: number): Mat3;
	/**
	 * Sets all components of the matrix to zero, and the diagonal to ones.
	 */
	identity(): Mat3;
	/**
	 * Scales all the components of the matrix by the specified factor.
	 */
	scale(f: number): Mat3;
	/**
	 * Appends a `scale` matrix constructed with the specified factors.
	 */
	scale(sx: number, sy: number): Mat3;
	/**
	 * Transposes the matrix.
	 */
	transpose(): Mat3;
	/**
	 * Returns the determinant of the matrix.
	 */
	det(): number;
	/**
	 * Appends the given matrix by using matrix multiplication.
	 */
	append(matrix: Mat3): Mat3;
	/**
	 * Appends a translation matrix constructed with the specified deltas.
	 */
	translate(dx: number, dy: number): Mat3;
	/**
	 * Appends a rotation matrix constructed for the specified angle (in radians).
	 */
	rotate(angle: number): Mat3;
	/**
	 * Returns the string representation of the matrix.
	 */
	toString(): string;
}
/**
 * 4x4 Matrix.
 */
export declare class Mat4 {
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
	static bind(module: Module): void;
	/**
	 * Allocates a new matrix.
	 */
	static alloc(): Mat4;
	/**
	 * Materializes a matrix at the specified memory location.
	 */
	static materialize(addr: number): Mat4;
	/**
	 * Constructs the matrix object.
	 */
	private constructor();
	/**
	 * Destroys the instance.
	 */
	dtor(): void;
	/**
	 * Returns a clone of the matrix.
	 */
	clone(): Mat4;
	/**
	 * Sets all components of the matrix to the given value.
	 */
	fill(value: number): Mat4;
	/**
	 * Sets the diagonal of the matrix to the specified value.
	 */
	set(value: number): Mat4;
	/**
	 * Copies all the components from the specified matrix.
	 */
	set(matrix: Mat4): Mat4;
	/**
	 * Sets a column of the matrix.
	 */
	set(col: number, a0: number, a1: number, a2: number, a3: number): Mat4;
	/**
	 * Sets a column of the matrix.
	 */
	col(col: number, a0: number, a1: number, a2: number, a3: number): Mat4;
	/**
	 * Sets a row of the matrix.
	 */
	row(row: number, a0: number, a1: number, a2: number, a3: number): Mat4;
	/**
	 * Sets all components of the matrix to zero, and the diagonal to ones.
	 */
	identity(): Mat4;
	/**
	 * Scales all the components of the matrix by the specified factor.
	 */
	scale(f: number): Mat4;
	/**
	 * Appends a `scale` matrix constructed with the specified factors.
	 */
	scale(sx: number, sy: number, sz: number): Mat4;
	/**
	 * Transposes the matrix.
	 */
	transpose(): Mat4;
	/**
	 * Returns the determinant of the matrix.
	 */
	det(): number;
	/**
	 * Appends the given matrix by using matrix multiplication.
	 */
	append(matrix: Mat4): Mat4;
	/**
	 * Appends a translation matrix constructed with the specified deltas.
	 */
	translate(dx: number, dy: number, dz: number): Mat4;
	/**
	 * Appends a rotation matrix constructed for the specified angle (radians) along the X-axis.
	 */
	rotateX(angle: number): Mat4;
	/**
	 * Appends a rotation matrix constructed for the specified angle (radians) along the Y-axis.
	 */
	rotateY(angle: number): Mat4;
	/**
	 * Appends a rotation matrix constructed for the specified angle (radians) along the Z-axis.
	 */
	rotateZ(angle: number): Mat4;
	/**
	 * Returns the string representation of the matrix.
	 */
	toString(): string;
}
export declare let module: any;
/**
 * Initializes the WebAssembly module for the froxel-math package.
 */
export declare function init(): Promise<void>;

export {};
