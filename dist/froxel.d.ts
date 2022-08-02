//@ts-check
export class Random
{
	/**
	 * 	Seed value of the generator. Remains constant throughout the life of the generator.
	 */
	readonly seed: number;

	/**
	 * 	Initializes the instance of the pseudo-random number generator.
	 * 	@param seed - Value to seed the random number generator. If none provided, default one (0xDAE7A5D3) will be used.
	 */
	constructor (seed?: number);

	/**
	 * 	Sets the seed of the pseudo-random number generator.
	 * 	@param value - Seed value to use (32-bit unsigned integer).
	 */
	setSeed (value: number) : Random;

	/**
	 * 	Generates a 32-bit unsigned integer.
	 */
	nextInt32 () : number;

	/**
	 * 	Generates a 16-bit unsigned integer.
	 */
	nextInt16 () : number;

	/**
	 * 	Generates an 8-bit unsigned integer.
	 */
	nextInt8 () : number;

	/**
	 * 	Generates a floating point number between 0 an 1 (inclusive).
	 */
	nextFloat () : number;

}
/**
 * 	Enumeration of key codes supported by the system.
 */
export enum KeyCode
{
	BACKSPACE,
	TAB,
	ENTER,
	SHIFT,
	CTRL,
	ESC,
	SPACE,
	PGUP,
	PGDN,
	END,
	HOME,
	INS,
	DEL,
	LEFT,
	UP,
	RIGHT,
	DOWN,
	NUM_PLUS,
	NUM_MINUS,
	NUM_ASTERISK,
	NUM_SLASH,
	NUM_DOT,
	NUM_0,
	NUM_1,
	NUM_2,
	NUM_3,
	NUM_4,
	NUM_5,
	NUM_6,
	NUM_7,
	NUM_8,
	NUM_9,
	D0,
	D1,
	D2,
	D3,
	D4,
	D5,
	D6,
	D7,
	D8,
	D9,
	A,
	B,
	C,
	D,
	E,
	F,
	G,
	H,
	I,
	J,
	K,
	L,
	M,
	N,
	O,
	P,
	Q,
	R,
	S,
	T,
	U,
	V,
	W,
	X,
	Y,
	Z,
	BACKQUOTE,
	MINUS,
	EQUAL,
	LBRACKET,
	RBRACKET,
	BACKSLASH,
	SEMICOLON,
	QUOTE,
	COMMA,
	DOT,
	SLASH,
}
/**
 * 	Provides functions to attach recycling functionality to any class for object pooling.
 */
export namespace Recycler
{
	/**
	 * 	Attaches recycling methods (`allocate`, `alloc` and `free`) to the specified class. Class should implement method `init` to initialize the instance (and return itself)
	 * 	and `__dtor` to destroy it.
	 *
	 * 	@param {*} maxPoolSize - Maximum number of instance to hold in the recycler.
	 * 	@param {*} minPoolSize - Minimum number of instances to pre-allocate. Defaults to 0.375*`maxPoolSize` if not specified.
	 */
	function attachTo (targetClass: any, maxPoolSize?: number, minPoolSize?: number) : any;

	/**
	 * 	Shows stats about all recycling facilities (or just the specified one) using `console.debug`.
	 * 	@param name - Name of the class to show.
	 */
	function showStats (name?: string) : void;

	/**
	 * 	Create a new class extending the specified target class, this new class is a recycling facility and is placed under property `Pool` of the target class. This
	 * 	method can be used instead of the usual `attachTo` when the target class construct/deconstruct methods need to remain untouched.
	 *
	 * 	@param {*} maxPoolSize - Maximum number of instance to hold in the recycler.
	 * 	@param {*} minPoolSize - Minimum number of instances to pre-allocate. Defaults to 0.375*`maxPoolSize` if not specified.
	 */
	function createPool (targetClass: any, maxPoolSize?: number, minPoolSize?: number) : any;

	/**
	 * 	Runs the preallocation process of all registered pools. Returns the total number of instances preallocated.
	 * 	@param {number|null} maxPreallocationsPerPool
	 */
	function preallocate (maxPreallocationsPerPool?: number) : number;

}
/**
 * 	Generic class for linkable items such as required by List. The responsibility of this class is to wrap a value into a linkable object.
 */
export class Linkable
{
	/**
	 * 	Pointer to the previous item in the chain.
	 */
	readonly prev: Linkable;

	/**
	 * 	Pointer to the next item in the chain.
	 */
	readonly next: Linkable;

	/**
	 * 	Wrapped value.
	 */
	value: any;

	/**
	 * 	Initializes the linkable item and wraps the given value. Sets the `prev` and `next` pointers to null.
	 */
	constructor (value?: any);

	/**
	 * 	Sets the previous/next connection pointers to null. Returns `this`.
	 */
	clear() : Linkable;

	/**
	 * 	Links the item such that it will be located after the given reference.
	 */
	linkAfter (ref: Linkable) : Linkable;

	/**
	 * 	Links the item such that it will be located before the given reference.
	 */
	linkBefore (ref: Linkable) : Linkable;

	/**
	 * 	Unlinks the item by linking the `prev` and `next` together (when available) and returns `this`.
	 */
	unlink() : Linkable;

}

export namespace Linkable
{
	export namespace Pool
	{
		/**
		 * 	Allocates a linkable item and wraps the given value. Sets the `prev` and `next` pointers to null.
		 */
		function alloc (value?: any) : Linkable;

	}
}

/**
 * 	Implementation of a generic linked list.
 */
export class List
{
	/**
	 * 	Pointer to the first node in the list.
	 */
	top: Linkable;

	/**
	 * 	Pointer to the last node in the list.
	 */
	bottom: Linkable;

	/**
	 * 	Number of values in the list.
	 */
	length: number;

	/**
	 * 	Initializes the instance to an empty list.
	 */
	constructor();

	/**
	 * 	Clones all contents and returns a new list.
	 */
	clone() : List;

	/**
	 * 	Traverses the list and destroys all nodes and values.
	 */
	clear() : List;

	/**
	 * 	Traverses the list, destroys all nodes **but** values are preserved.
	 */
	reset() : List;

	/**
	 * 	Returns the first value in the list.
	 */
	first() : any;

	/**
	 * 	Returns the last value in the list.
	 */
	last() : any;

	/**
	 * 	Returns a value given its index.
	 */
	getAt (index: number) : any;

	/**
	 * 	Returns the node at the given index.
	 */
	getNodeAt (index: number) : Linkable;

	/**
	 * 	Returns the node of a value given another value to compare, uses identical comparison (===) to match the value.
	 */
	sgetNode (value: any) : Linkable;

	/**
	 * 	Removes the given value from the list and returns it.
	 */
	remove<T> (value: T) : T;

	/**
	 * 	Adds a value before the given reference node.
	 */
	insertBefore<T> (ref: Linkable, value: T) : T;

	/**
	 * 	Adds a value after the given reference node.
	 */
	insertAfter<T> (ref: Linkable, value: T) : T;

	/**
	 * 	Adds a value to the top of the list.
	 */
	unshift<T> (value: T) : T;

	/**
	 * 	Removes a value from the top of the list.
	 */
	shift() : any;

	/**
	 * 	Adds a value to the bottom of the list.
	 */
	push<T> (value: T) : T;

	/**
	 * 	Removes a value from the bottom of the list.
	 */
	pop() : any;

	/**
	 * 	Appends all contents of the given list to the current one.
	 */
	append (list: List) : List;

	/**
	 * 	Traverses the list calling the specified function for each value.
	 * 	@param fn - Callback to execute, return `false` to stop the loop immediately.
	 */
	forEach(fn: (value: any, node: Linkable, list: List, context: object) => boolean, context?: object) : boolean;

	/**
	 * 	Traverses the list in reverse order, calling the specified function for each value.
	 * 	@param fn - Callback to execute, return `false` to stop the loop immediately.
	 */
	forEachRev(fn: (value: any, node: Linkable, list: List, context: object) => boolean, context?: object) : boolean;

	/**
	 * 	Returns the first value where the specified function returns `true`.
	 */
	find (fn: (value: any, context: object) => boolean, context?: object) : any;

	/**
	 * 	Returns an array with all values where the specified function returns `true`.
	 */
	filter (fn: (value: any, context: object) => boolean, context?: object) : Array<any>;

	/**
	 * 	Returns an array with all the values in the list.
	 */
	toArray() : Array<any>;

}

export namespace List
{
	export namespace Pool
	{
		/**
		 * 	Allocates an empty list.
		 */
		function alloc() : List;

	}
}

export class Timer
{
	/**
	 * 	@param vsync - Indicates if requestAnimationFrame should be used instead of setTimeout.
	 * 	@param interval - Amount of milliseconds between timer activations.
	 * 	@param callback - Function to execute on each timer activation.
	 */
	constructor (vsync: boolean, interval: number, callback: (dt: number, timer: Timer) => void );

	/**
	 * 	Starts the timer and triggers `onStarted`.
	 *
	 * 	@param immediate - When `true` the callback will be executed immediately.
	 * 	@param scale - Used to control when to trigger the first timeout, delay is timeInterval*scale.
	 */
	start (immediate?: boolean, scale?: number) : void;

	/**
	 * 	Executes the timer activation after the specified amount of milliseconds.
	 */
	runAfter (timeout: number) : void;

	/**
	 * 	Executes the timer activaton as soon as possible.
	 */
	runNow() : void;

	/**
	 * 	Stops the timer and triggers `onStopped`.
	 */
	stop() : void;

	/**
	 * 	Timer started event handler.
	 */
	onStarted() : void;

	/**
	 * 	Timer stopped event handler.
	 */
	onStopped() : void;

}
/**
 * 	Representation of a vector in 2D space, that is, a float tuple with components x and y.
 */
export class Vec2
{
	/**
	 * 	Coordinates of the vector.
	 */
	x: number;
	y: number;

	/**
	 *	Constructs the vector from another Vec2.
	 */
	constructor (value: Vec2);

	/**
	 *	Constructs the vector with the specified coordinates.
	 */
	constructor (x?: number, y?: number);

	/**
	 * 	Clones the vector coordinates into a new Vec2 object.
	 */
	clone() : Vec2;

	/**
	 *	Sets the coordinates of the vector from a Vec2 object.
	 */
	set (value: Vec2) : Vec2;

	/**
	 *	Sets the coordinates of the vector.
	 */
	set (x: number, y: number) : Vec2;

	/**
	 * 	Sets the X-coordinate of the vector.
	 */
	setX (x: number) : Vec2;

	/**
	 * 	Sets the Y-coordinate of the vector.
	 */
	setY (y: number) : Vec2;

	/**
	 * 	Sets the coordinates of the vector to zero.
	 */
	zero() : Vec2;

	/**
	 * 	Returns true if the vector coordinates are both zero.
	 */
	isZero() : boolean;

	/**
	 *	Returns true if the coordinates of the vector have the same values as the given Vec2.
	 */
	equals (value: Vec2) : boolean;

	/**
	 *	Returns true if the coordinates of the vector have the same values as the given ones.
	 */
	equals (x: number, y: number) : boolean;

	/**
	 * 	Negates the vector, that is changing the sign of each component in the vector.
	 */
	neg() : Vec2;

	/**
	 * 	Inverts the vector by changing each component to its reciprocal.
	 */
	inv() : Vec2;

	/**
	 * 	Changes the components of the vector to their absolute value.
	 */
	abs() : Vec2;

	/**
	 *	Adds the coordinates of the given Vec2 to the vector.
	 */
	translate (value: Vec2) : Vec2;

	/**
	 *	Adds the given delta values to the vector.
	 */
	translate (dx: number, dy: number) : Vec2;

	/**
	 *	Rotates the vector by the specified angle.
	 */
	rotate (angle: number) : Vec2;

	/**
	 *	Rotates the vector by the specified angle using the given origin point.
	 */
	rotate (angle: number, cx: number, cy: number) : Vec2;

	/**
	 *	Adds the coordinates of the given Vec2 to the vector.
	 */
	add (value: Vec2) : Vec2;

	/**
	 *	Adds the given delta values to the vector.
	 */
	add (dx: number, dy: number) : Vec2;

	/**
	 *	Subtracts the coordinates of the given Vec2 from the vector.
	 */
	sub (value: Vec2) : Vec2;

	/**
	 *	Subtracts the given delta values from the vector.
	 */
	sub (dx: number, dy: number) : Vec2;

	/**
	 * 	Scales each components of the vector by the respective component of the given one.
	 */
	scale (k: number) : Vec2;

	/**
	 * 	Scales both components of the vector by the given factor.
	 */
	scale (k: number) : Vec2;

	/**
	 * 	Scales each components of the vector by the given factors.
	 */
	scale (fx: number, fy: number) : Vec2;

	/**
	 * 	Sets the components to their integer parts.
	 */
	floor() : Vec2;

	/**
	 * 	Sets the components to their fractional parts.
	 */
	fract() : Vec2;

	/**
	 * 	Returns the dot product of the vectors.
	 */
	dot (value: Vec2) : number;

	/**
	 * 	Returns the dot product of the vector and the given values.
	 */
	dot (x: number, y: number) : number;

	/**
	 * 	Returns the magnitude of the vector.
	 */
	magnitude(squared: boolean) : number;

	/**
	 * 	Normalizes the vector by dividing each component by the vector magnitude to obtain a unit vector.
	 */
	normalize() : Vec2;

	/**
	 * 	Sets the vector to its major-axis, that is the component with the maximum absolute value.
	 */
	majorAxis() : Vec2;

	/**
	 * 	Sets the vector to its minor-axis, that is the component with the minimum absolute value.
	 */
	minorAxis() : Vec2;

	/**
	 * 	Sets the vector to its sign-vector representation.
	 */
	sign() : Vec2;

}

export namespace Vec2
{
	export namespace Pool
	{
		/**
		 *	Allocates a vector from another Vec2.
		 */
		function alloc (value: Vec2) : Vec2;

		/**
		 *	Allocates a vector with the specified coordinates.
		 */
		function alloc (x?: number, y?: number) : Vec2;

	}
}
/**
 * 	Represents a 3x3 matrix. Provides an interface to manipulate 3x3 matrices.
 */
export class Matrix
{
	/**
	 * 	Actual elements of the matrix.
	 */
	data: Float32Array

	/**
	 * 	Constructs a new matrix copying the elements from the specified matrix.
	 */
	constructor(value: Matrix);

	/**
	 * 	Constructs a new matrix with the values from the specified array.
	 */
	constructor(value: Float32Array);

	/**
	 * 	Constructs a new matrix with the identity matrix values.
	 */
	constructor();

	/**
	 * 	Fills the matrix with zeroes.
	 */
	zero() : Matrix;

	/**
	 * 	Fills the matrix with the specified value.
	 */
	fill (value: number) : Matrix;

	/**
	 * 	Copies the specified matrix elements into the current one.
	 */
	set (value: Matrix) : Matrix;

	/**
	 * 	Sets the matrix elements from the specified array.
	 */
	set (value: Float32Array) : Matrix;

	/**
	 * 	Sets the elements of the matrix to be the identity matrix.
	 */
	identity() : Matrix;

	/**
	 * 	Multiplies all elements in the matrix by a given scalar.
	 */
	scalef (scalar: number) : Matrix;

	/**
	 * 	Returns a clone of the matrix.
	 */
	clone() : Matrix;

	/**
	 * 	Appends the given matrix to the current one using matrix multiplication (self * matrix).
	 */
	append (matrix: Matrix) : Matrix;

	/**
	 * 	Creates a translation matrix and appends it.
	 */
	translate (x: number, y: number) : Matrix;

	/**
	 * 	Creates a rotation matrix for the given angle (in radians) and appends it.
	 */
	rotate (angle: number) : Matrix;

	/**
	 * 	Creates a scaling matrix and appends it.
	 */
	scale (sx: number, sy: number) : Matrix;

	/**
	 * 	Applies the matrix to the specified vector (matrix-vector multiplication) and returns a new Vec2.
	 */
	applyTo (vect: Vec2) : Vec2;

	/**
	 * 	Applies the matrix to the specified coordinates (matrix-vector multiplication) and returns a new Vec2.
	 */
	applyTo (x: number, y: number) : Vec2;

	/**
	 * 	Transposes the matrix.
	 */
	transpose() : Matrix;

	/**
	 * 	Returns the determinant of the matrix.
	 */
	det() : number;

	/**
	 * 	Returns a new matrix with the adjoint of the current matrix.
	 */
	adj() : Matrix;

	/**
	 * 	Returns a new matrix with the inverse of the current matrix.
	 */
	inverse() : Matrix;

	/**
	 * 	Returns a string representation of the matrix.
	 */
	toString() : string;

	/**
	 * 	Sets the components of the specified array as the identity matrix.
	 */
	static loadIdentity (target: Float32Array) : void;

}

export namespace Matrix
{
	export namespace Pool
	{
		/**
		 * 	Allocates a new matrix copying the components from the specified matrix.
		 */
		function alloc (value: Matrix): Matrix;

		/**
		 * 	Allocates a new matrix with the values from the specified array.
		 */
		function alloc (value: Float32Array): Matrix;

		/**
		 * 	Allocates a new matrix with the identity matrix values.
		 */
		function alloc (): Matrix;

	}
}


export namespace glx
{
	enum BufferTarget
	{
		ARRAY_BUFFER,
		ELEMENT_ARRAY_BUFFER,
		COPY_READ_BUFFER,
		COPY_WRITE_BUFFER,
		TRANSFORM_FEEDBACK_BUFFER,
		UNIFORM_BUFFER,
		PIXEL_PACK_BUFFER,
		PIXEL_UNPACK_BUFFER,
	}

	enum BufferUsage
	{
		STATIC_DRAW,
		DYNAMIC_DRAW,
		STREAM_DRAW,
		STATIC_READ,
		DYNAMIC_READ,
		STREAM_READ,
		STATIC_COPY,
		DYNAMIC_COPY,
		STREAM_COPY,
	}

}

export class glx
{
	/**
	 * WebGL rendering context.
	 */
	static readonly gl: WebGL2RenderingContext;

	/**
	 * Sets the WebGL rendering context.
	 */
	static setContext (context: WebGL2RenderingContext) : glx;

	/**
	 * Returns the value of a GL parameter.
	 */
	static getParameter (name: string) : any;

	/**
	 * Returns a slice of an array as a Float32Array.
	 */
	static getFloat32Array (data: any, offset: number, length: number) : Float32Array;

	/**
	 * Creates a buffer from the specified array.
	 * @param {BufferTarget} target Defaults to ARRAY_BUFFER.
	 * @param {BufferUsage} usage Defaults to STATIC_DRAW.
	 */
	static createBufferFrom (data: any, target?: glx.BufferTarget, usage?: glx.BufferUsage, offset?: number, length?: number) : WebGLBuffer;

}
/**
 * Provides pre-processing to reuse GLSL code.
 */
export class glsl
{
	/**
	 * Registers a snippet in the GLSL code library.
	 */
	static set (name: string, source: string) : void;

	/**
	 * Returns a snippet of code given its name.
	 */
	static get (name: string) : string;

	/**
	 * Processes GLSL code, returns a string of GLSL code ready to be compiled.
	 *
	 * - If "#version" not specified "#version 300 es" will be added.
	 * - If "precision" not specified "precision highp float;" will be added.
	 * - Directive "//@use" will be replaced with the appropriate snippet(s).
	 */
	static process (code: string) : string;

}
/**
 * Describes a shader object. The actual shader type is specified at construction.
 */
export class Shader
{
	/**
	 * Identifier of the shader.
	 */
	readonly id: string;

	/**
	 * Type of the shader.
	 */
	readonly type: Shader.Type;

	/**
	 * Shader GL identifier.
	 */
	readonly shaderId: number;

	/**
	 * Constructs a shader and registers with the specified id. Compile its GLSL code using the `compile` method.
	 */
	constructor (id: string, type: Shader.Type);

	/**
	 * Constructs a shader, compile its GLSL code using the `compile` method.
	 */
	constructor (type: Shader.Type);

	/**
	 * Constructs a shader with the specified GLSL code and registers with the specified id.
	 */
	constructor (id: string, type: Shader.Type, source: string);

	/**
	 * Constructs a shader with the specified GLSL code.
	 */
	constructor (type: Shader.Type, source: string);

	/**
	 * Compiles the shader and throws an exception if any compilations error occur.
	 */
	compile (source: string) : Shader;

}

export namespace Shader
{
	/**
	 * 	Shader types.
	 */
	enum Type
	{
		VERTEX,
		FRAGMENT,
		GEOMETRY,
	}

}


/**
 * Describes a shader program.
 */
export class ShaderProgram
{
	/**
	 * Identifier of the program.
	 */
	readonly id: string;

	/**
	 * Shaders attached to the program.
	 */
	readonly shaders: Array<Shader>;

	/**
	 * Shader program GL identifier.
	 */
	readonly programId: number;

	/**
	 * Constructs an empty shader program with the specified identifier. Attach shaders by using the `attach` method.
	 */
	constructor (id?: string);

	/**
	 * Sets the uniform setter function.
	 * @param { (pgm:ShaderProgram) => void } uniformSetter
	 * @returns {Element}
	 */
	uniformSetter (uniformSetter: (pgm:ShaderProgram) => void) : ShaderProgram;

	/**
	 * Attaches a shader to the shader program.
	 */
	attach (shader: Shader|string) : ShaderProgram;

	/**
	 * Returns the location of an attribute.
	 */
	getAttribLocation (name: string) : object;

	/**
	 * Returns the location of a uniform variable.
	 */
	getUniformLocation (name: string) : object;

	/**
	 * Returns the location of a uniform block.
	 */
	getUniformBlockLocation (name: string) : object;

	/**
	 * Returns the size of a uniform block.
	 */
	getUniformBlockSize (uniformBlock: string|object) : number;

	/**
	 * Creates a buffer for a uniform block.
	 */
	createUniformBlockBuffer (uniformBlock: string|object) : Float32Array;

	/**
	 * Links the shaders into the shader program. Completion can be obtained by calling `getStatus`.
	 */
	link() : ShaderProgram;

	/**
	 * Activates the shader program to be used in the subsequent drawing operations.
	 */
	activate() : void;

	/**
	 * Returns the link status of the program.
	 */
	getStatus() : boolean;

	/**
	 * Returns the error of the last link operation.
	 */
	getError() : string;

	/**
	 * Sets the value of a uniform.
	 */
	uniform1f (location: string|object, v0: number) : ShaderProgram;

	/**
	 * Sets the value of a uniform.
	 */
	uniform1fv (location: string|object, value: any) : ShaderProgram;

	/**
	 * Sets the value of a uniform.
	 */
	uniform1i (location: string|object, v0: number) : ShaderProgram;

	/**
	 * Sets the value of a uniform.
	 */
	uniform1iv (location: string|object, value: any) : ShaderProgram;

	/**
	 * Sets the value of a uniform.
	 */
	uniform2f (location: string|object, v0: number, v1: number) : ShaderProgram;

	/**
	 * Sets the value of a uniform.
	 */
	uniform2fv (location: string|object, value: any) : ShaderProgram;

	/**
	 * Sets the value of a uniform.
	 */
	uniform2i (location: string|object, v0: number, v1: number) : ShaderProgram;

	/**
	 * Sets the value of a uniform.
	 */
	uniform2iv (location: string|object, value: any) : ShaderProgram;

	/**
	 * Sets the value of a uniform.
	 */
	uniform3f (location: string|object, v0: number, v1: number, v2: number) : ShaderProgram;

	/**
	 * Sets the value of a uniform.
	 */
	uniform3fv (location: string|object, value: any) : ShaderProgram;

	/**
	 * Sets the value of a uniform.
	 */
	uniform3i (location: string|object, v0: number, v1: number, v2: number) : ShaderProgram;

	/**
	 * Sets the value of a uniform.
	 */
	uniform3iv (location: string|object, value: any) : ShaderProgram;

	/**
	 * Sets the value of a uniform.
	 */
	uniform4f (location: string|object, v0: number, v1: number, v2: number, v3: number) : ShaderProgram;

	/**
	 * Sets the value of a uniform.
	 */
	uniform4fv (location: string|object, value: any) : ShaderProgram;

	/**
	 * Sets the value of a uniform.
	 */
	uniform4i (location: string|object, v0: number, v1: number, v2: number, v3: number) : ShaderProgram;

	/**
	 * Sets the value of a uniform.
	 */
	uniform4iv (location: string|object, value: any) : ShaderProgram;

	/**
	 * Creates a new shader program. The specified source code allows the use of "//@vert", "//@frag" and "//@geom" directives to specify the code
	 * blocks of the vertex, fragment and geometry shader respectively.
	 */
	static create (id: string, source: string) : ShaderProgram;

	/**
	 * Puts a shader program in the global program list under the specified identifier.
	 */
	static put (id: string, shaderProgram: ShaderProgram) : void;

	/**
	 * Returns a shader program from the global program list given its identifier.
	 */
	static get (id: string) : ShaderProgram;

	/**
	 * Removes a shader program from the global program list.
	 */
	static remove (id: string) : void;

}




export namespace Texture
{
	type FilterType = 'NEAREST' | 'LINEAR';
	type WrapMode = 'REPEAT' | 'CLAMP_TO_EDGE' | 'MIRRORED_REPEAT';
}

/**
 * Definition of a texture.
 */
export class Texture
{
	/**
	 * WebGL ID of the texture.
	 */
	readonly textureId: number;

	/**
	 * Texture width (physical width).
	 */
	readonly width: number;

	/**
	 * Texture height (physical height).
	 */
	readonly height: number;

	/**
	 * Target width originally requested (logical width).
	 */
	readonly targetWidth: number;

	/**
	 * Target height originally requested (logical height).
	 */
	readonly targetHeight: number;

	/**
	 * Real scale of the texture (physical width / logical width).
	 */
	readonly rscale: number;

	/**
	 * Texture filter.
	 */
	readonly filter: Texture.FilterType;

	/**
	 * Texture wrap mode.
	 */
	readonly wrap: Texture.WrapMode;

	/**
	 * Number of mipmap levels (use 0 to disable).
	 */
	readonly mipmap: number;

	/**
	 * Creates an empty texture of the specified size.
	 */
	constructor (width: number, height: number, targetWidth?: number, targetHeight?: number);

	/**
	 * Binds the texture to the TEXTURE_2D target.
	 */
	bind(): WebGL2RenderingContext;

	/**
	 * Allocates the texture storage.
	 */
	allocate(): Texture;

	/**
	 * Applies the texture filter.
	 */
	applyFilter() : Texture;

	/**
	 * Applies the texture wrap mode.
	 */
	applyWrap() : Texture;

	/**
	 * Sets the texture filter.
	 */
	setFilter (filter: Texture.FilterType) : Texture;

	/**
	 * Sets the texture wrap mode.
	 */
	setWrap (wrap: Texture.WrapMode) : Texture;

	/**
	 * Sets the number of mipmap levels.
	 */
	setMipmap (mipmap: number) : Texture;

	/**
	 * Uploads data to the GPU from the specified image.
	 */
	upload (image: object, targetX?: number, targetY?: number) : Texture;

	/**
	 * Creates a canvas and attaches it to the texture. The contents of the attached canvas can be uploaded to the texture by calling the `uploadCanvas` method.
	 */
	getCanvas (options?: Canvas.Options) : Texture;

	/**
	 * Returns the canvas attached to the texture or `null` if no canvas has been created yet (use `createCanvas` first).
	 */
	getCanvas() : Canvas;

	/**
	 * Uploads the bitmap data from the attached canvas to the texture. The callback is called when the upload is completed.
	 * @returns {Texture}
	 */
	uploadCanvas (callback?: () => void) : Texture;

	/**
	 * Allocates a canvas, executes the given render function, uploads the result to the texture and disposes the canvas.
	 * @param {Canvas.Options} options
	 * @param {(g: Canvas) => void} render
	 */
	uploadRender (options: Canvas.Options, render: (g: Canvas) => void) : Texture;

	/**
	 * Allocates a canvas, executes the given render function, uploads the result to the texture and disposes the canvas.
	 * @param {(g: Canvas) => void} render
	 */
	uploadRender (render: (g: Canvas) => void) : Texture;

}
export namespace Canvas
{
	type Options =
	{
		/**
		 * 	Actual HTML5 Canvas element, if `null` a new one will be created.
		 */
		elem: HTMLCanvasElement;

		/**
		 * 	WebGL enable flag.
		 */
		gl: boolean;

		/**
		 * 	Background of the canvas element.
		 */
		background: string;

		/**
		 * 	Width of the canvas.
		 */
		width: number;

		/**
		 * 	Height of the canvas.
		 */
		height: number;

		/**
		 * 	Indicates if the canvas element should be hidden from view (not attached to the document body).
		 */
		hidden: boolean;

		/**
		 * 	Set to `true` to ensure the canvas is positioned absolutly to (0, 0).
		 */
		absolute: boolean;

		/**
		 * 	Used to control the antialias property of the canvas.
		 */
		antialias: boolean;

	}

}

export class Canvas
{
	/**
	 * 	Constructs a canvas object. If the Canvas DOM element is not provided a new element will be created and attached to the page.
	 */
	constructor (options: Canvas.Options);

	/**
	 * Prepares an image to use it on the canvas.
	 */
	prepareImage (image: HTMLImageElement) : void;

	/**
	 * Creates a new texture of the specified size.
	 */
	createTexture (width: number, height: number, filter?: Texture.FilterType, mipmap?: number) : Texture;

	/**
	 * 	Sets the default background color of the canvas. Does not cause a canvas clear.
	 */
	setBackground (color: string) : void;

	/**
	 * 	Sets the canvas size.
	 */
	resize (width: number, height: number) : Canvas;

	/**
	 * 	Sets the global canvas scale.
	 */
	globalScale (value: number) : Canvas;

	/**
	 * 	Sets the flipped status of the canvas, that is, if the canvas coordinates are flipped (i.e. `xy` is now `yx`).
	 */
	flipped (value: boolean) : Canvas;

	/**
	 * 	Saves the clip state of the canvas. Works only in GL mode.
	 */
	pushClip() : Canvas;

	/**
	 * 	Restores the clip state of the canvas. Works only in GL mode.
	 */
	popClip() : Canvas;

	/**
	 * 	Returns the image on the canvas as a string in DATA-URI format.
	 */
	toDataUrl (mime: string, params?: object) : string;

	/**
	 * 	Returns the image as a Base-64 encoded PNG string.
	 */
	toPngBase64() : string;

	/**
	 * 	Sets the fill style.
	 */
	fillStyle (value: string) : Canvas;

	/**
	 * 	Returns the current fill style.
	 */
	fillStyle () : string;

	/**
	 * 	Sets the stroke style.
	 */
	strokeStyle (value: string) : Canvas;

	/**
	 * 	Returns the current strroke style.
	 */
	strokeStyle () : string;

	/**
	 * 	Sets the line cap style (Possible values are `butt`, `round`, or `square`. `butt` is default).
	 */
	lineCap (value: string) : Canvas;

	/**
	 * 	Returns the current line cap style.
	 */
	lineCap() : string;

	/**
	 * 	Executes the `draw` function on a new canvas of the specified width and height. Renders it into an image and runs the completed callback with the ready HTMLImageElement object.
	 */
	static renderImage (width: number, height: number, draw: (g: Canvas) => void, completed: (img: HTMLImageElement, url: string) => void) : void;

	/**
	 * Executes the `draw` function on a new canvas of the specified width and height. Renders it into an image and runs the completed callback with the ready HTMLImageElement object,
	 * note that this function will generate mipmap images.
	 */
	static renderImageMipmap (levels: number, width: number, height: number, draw: (g: Canvas) => void, completed: (img: HTMLImageElement, url: string) => void) : void;

}

export namespace System
{
	type DisplayOrientation = 'default'|'landscape'|'portrait'|'automatic'|'strict';
	enum KeyboardEventType
	{
		KEY_DOWN,
		KEY_UP,
	}

	enum PointerEventType
	{
		POINTER_DOWN,
		POINTER_UP,
		POINTER_MOVE,
		POINTER_DRAG_START,
		POINTER_DRAG_MOVE,
		POINTER_DRAG_STOP,
		POINTER_WHEEL,
	}

	type KeyboardState =
	{
		/**
		 * Time of last keyboard event.
		 */
		time: number;

		/**
		 * State of any of the SHIFT keys.
		 */
		shift: boolean;

		/**
		 * State of any of the CTRL keys.
		 */
		ctrl: boolean;

		/**
		 * State of the ALT key.
		 */
		alt: boolean;

		/**
		 * Key code of last keyboard event.
		 */
		keyCode: KeyCode;

	}

	type Pointer =
	{
		/**
		 * ID of the pointer.
		 */
		id: number;

		/**
		 * Indicates if the pointer is active (pressed).
		 */
		isActive: boolean;

		/**
		 * Indicates if the pointer is currently being dragged.
		 */
		isDragging: boolean;

		/**
		 * Source X-coordinate when the POINTER_DOWN event was fired.
		 */
		sx: number;

		/**
		 * Source Y-coordinate when the POINTER_DOWN event was fired.
		 */
		sy: number;

		/**
		 * Current X-coordinate of the pointer.
		 */
		x: number;

		/**
		 * Current Y-coordinate of the pointer.
		 */
		y: number;

		/**
		 * Delta in the X direction of the current drag event.
		 */
		dx: number;

		/**
		 * Delta in the Y direction of the current drag event.
		 */
		dy: number;

		/**
		 * Number of the button currently being pressed.
		 */
		button: number;

		/**
		 * Delta value of the mouse-wheel (valid only when the pointer is a mouse pointing-device).
		 */
		wheelDelta: number;

		/**
		 * Accumulated mouse-wheel delta. Should be set to zero (0) manually when needed.
		 */
		wheelAccum: number;

	}

	type Options =
	{
		/**
		 *	Background of the system canvas. Should be a full 7-digit HEX RGB color.
		 *	@default "#000000"
		 */
		background?: string;

		/**
		 * 	Set to `false` to disable WebGL mode.
		 * 	@default true
		 */
		gl?: boolean;

		/**
		 *	Set to `true` t o enable on-screen logging.
		 *	@default false
		 */
		log?: boolean,

		/**
		 *	When `true` the renderer will not clear the buffer on each frame draw, thus allowing overdrawing on the previous frame.
		 *	@default false
		 */
		overdraw?: boolean,

		/**
		 *	Enables or disables antialised canvas. Set to `false` when pixel-perfect is desired.
		 *	@default false
		 */
		antialias?: boolean;

		/**
		 *	Desired orientaton of the display.
		 *	@default "automatic"
		 */
		orientation?: DisplayOrientation;

		/**
		 *	Desired display width. When not specified (null) the maximum screen width to maintain the aspect ratio will be used.
		 *	@default null
		 */
		screenWidth?: number;

		/**
		 *	Desired display height. When not specified (null) the maximum screen height to maintain the aspect ratio will be used.
		 *	@default null
		 */
		screenHeight?: number;

		/**
		 *	Target frames per second (FPS). Used to determine delay between frames.
		 *	@default 144
		 */
		fps?: number;

		/**
		 *	Minimum allowed frames per second (FPS). If system FPS drops below this value, the `frameDelta` property of System will be truncated to 1/minFps.
		 *	@default 10
		 */
		minFps?: number;

		/**
		 *	Selects which rendering mechanism to use either requestAnimationFrame when `true` or setTimeout when `false`.
		 *	@default true
		 */
		vsync?: boolean;

		/**
		 *	Extra scale factor used to resize images. Use only when you want to render higher resolution images possibly for a very high DPI display.
		 *	@default 1
		 */
		extraScaleFactor?: number;

		/**
		 *	Maximum scale factor that should be used in the system. A value of `null` will cause no limit.
		 *	@default null
		 */
		maxScaleFactor?: number;

		/**
		 *	Indicates which method to use to find the target resolution, using `fullscreen` object when `true`, or the `window` object when `false`.
		 *	@default false
		 */
		fullscreen?: boolean;

		/**
		 * 	Indicates if recycler pool preallocation should be automatically executed. Additionally if this value is a number, it will be used as
		 * 	maximum preallocation parameter for the recycler.
		 * 	@default false
		 */
		preallocate?: boolean|number;

	}

	type KeyboardEventHandler = (action: KeyboardEventType, keyCode: KeyCode, state: KeyboardState) => boolean;
	type PointerEventHandler = (action: PointerEventType, pointer: Pointer, pointers: { [pointerId: number]: Pointer }) => boolean;
}

export class System
{
	/**
	 * Screen width, available only after the system has been initialized.
	 */
	static readonly screenWidth: number;

	/**
	 * Screen height, available only after the system has been initialized.
	 */
	static readonly screenHeight: number;

	/**
	 * Current display orientation.
	 */
	static readonly orientation: System.DisplayOrientation;

	/**
	 * Initial transformation matrix. Should be used (if needed) instead of `loadIdentity` since the System does some transformations first.
	 */
	static readonly initialMatrix: Matrix;

	/**
	 * Primary renderer.
	 */
	static readonly renderer: Canvas;

	/**
	 * Secondary display buffer (always 2D). Has the same initial transformation matrix as the primary display buffer.
	 */
	static readonly displayBuffer2: Canvas;

	/**
	 * Terciary display buffer (always 2D). Is assured to have 1:1 with the screen size, initial transformation matrix not applied.
	 */
	static readonly displayBuffer3: Canvas;

	/**
	 * Map with the status of all keys (along with other flags).
	 */
	static readonly keyState: System.KeyboardState;

	/**
	 * Current status of all pointers.
	 */
	static readonly pointers: { [pointerId: number]: System.Pointer };

	/**
	 * The frame delta is multiplied by this value before each system cycle (defaults to 1).
	 */
	static timeScale: number;

	/**
	 * Frame interval in milliseconds.
	 */
	static readonly frameInterval: number;

	/**
	 * Fixed frame interval in milliseconds, when set to non-zero value the frame delta will always be set to this value.
	 */
	static fixedFrameInterval: number;

	/**
	 * Maximum frame interval in milliseconds, if the `frameDelta` exceeds this, it will be truncated to this value. Controlled by the `minFps` value of the system initialization options.
	 */
	static readonly maxFrameInterval: number;

	/**
	 * Last frame delta in seconds.
	 */
	static readonly frameDelta: number;

	/**
	 * Logical system time in seconds. Updated on each cycle by the calculated `frameDelta`.
	 */
	static readonly frameTime: number;

	/**
	 * Current frame number.
	 */
	static readonly frameNumber: number;

	/**
	 * Initializes the system with the specified configuration options.
	 */
	static init (options: System.Options) : void;

	/**
	 * Returns the current logical time in seconds (same as reading `System.frameTime`).
	 */
	static time() : number;

	/**
	 * Starts the system and enables rendering and updates.
	 */
	static start() : void;

	/**
	 * Stops the system by disabling both rendering and updates.
	 */
	static stop() : void;

	/**
	 * Pauses the system by disabling updates, but rendering will be continued.
	 */
	static pause() : void;

	/**
	 * Resumes the system after previously being paused with `pause` method.
	 */
	static resume() : void;

	/**
	 * Event triggered when the canvas was resized by the system. Can be overriden.
	 */
	static onCanvasResized (screenWidth: number, screenHeight: number) : void;

	/**
	 * Adds the specified update handler to the system.
	 * violet
	 */
	static updateQueueAdd (handler: { update: (dt: number) => boolean }) : Linkable;

	/**
	 * Removes the specified update handler from the system.
	 * violet
	 */
	static updateQueueRemove (handler: { update: (dt: number) => boolean }) : void;

	/**
	 * Removes the specified update handler node from the system.
	 */
	static updateQueueRemove (node: Linkable) : void;

	/**
	 * Adds the specified draw handler to the system.
	 * violet
	 */
	static drawQueueAdd (handler: { draw: (g: Canvas) => void }) : Linkable;

	/**
	 * Removes the specified draw handler from the system.
	 * violet
	 */
	static drawQueueRemove (handler: { draw: (g: Canvas) => void }) : void;

	/**
	 * Removes the specified draw handler node from the system.
	 */
	static drawQueueRemove (node: Linkable) : void;

	/**
	 * Adds the specified handler to the update and draw queues.
	 * violet
	 */
	static queueAdd (handler: { update: (dt: number) => boolean, draw: (g: Canvas) => void }) : void;

	/**
	 * Removes the specified handler from the update and draw queues.
	 * violet
	 */
	static queueRemove (handler: { update: (dt: number) => boolean, draw: (g: Canvas) => void }) : void;

	/**
	 * Interpolates numeric values between two objects (`src` and `dst`) using the specified `duration` and `easing` function. Note that all four parameters `src`, `dst`,
	 * `duration` and `easing` must be objects having the same number of values.
	 */
	static interpolate (src: object, dst: object, duration: object, easing: object, callback: (data: object, isFinished: boolean) => void) : void;

	/**
	 * Event triggered when a keyboard event is detected by the system.
	 */
	static onKeyboardEvent: System.KeyboardEventHandler;

	/**
	 * Event triggered when a pointer event is detected by the system.
	 */
	static onPointerEvent: System.PointerEventHandler;

}

/**
 * 	Logging module to show logs on the system display buffer.
 */
export namespace Log
{
	/**
	 * 	Indicates if the log module is enabled.
	 */
	let enabled: boolean;

	/**
	 * 	Indicates if the log module is paused.
	 */
	let paused: boolean;

	/**
	 * 	Maximum number of entries to show in the screen.
	 */
	let maxsize: number;

	/**
	 * 	Indicates if output showuld also be passed to `console.debug` as secondary echo.
	 */
	let debugEcho: boolean;

	/**
	 * 	Foreground (text) color.
	 */
	let color: string;

	/**
	 * 	Background color.
	 */
	let background: string;

	/**
	 * 	Debugging variables to show continuously at the top of the log output.
	 */
	let vars: object;

	/**
	 * 	Writes a message to the log buffer, ensure logging has been enabled by calling `enable` first or any messages will be ignored.
	 */
	function write (msg: string) : void;

	/**
	 * 	Clears the current log buffer.
	 */
	function clear () : void;

	/**
	 * 	Enables on-screen logging for cool stuff.
	 *
	 * 	@param x - X-coordinate of the top-left corner.
	 * 	@param y - Y-coordinate of the top-left corner.
	 * 	@param fontSize - Desired font size in `pt` units.
	 * 	@param showFps - Set to `true` to show FPS.
	 * 	@param showIndex - Set to `true to show the message index.
	 */
	function enable (x?: number, y?: number, fontSize?: number, showFps?: boolean, showIndex?: boolean) : void;

	/**
	 * 	Pauses log rendering.
	 */
	function pause () : void;

	/**
	 * 	Resumes log rendering.
	 */
	function resume () : void;

}
/**
 * 	Representation of a point in 2D space. The coordinate values are upscaled by a fixed number of bits to allow
 * 	sub-pixel translations (internally), but the public values will always be integers.
 */
export class Point2
{
	/**
	 * 	Upscaled coordinates of the point.
	 */
	readonly ux: number;
	readonly uy: number;

	/**
	 * 	Coordinates of the point.
	 */
	readonly x: number;
	readonly y: number;

	/**
	 *	Constructs the Point2 instance from another Point2.
	 */
	constructor (value: Point2);

	/**
	 *	Constructs the Point2 instance from a Vec2.
	 */
	constructor (value: Vec2);

	/**
	 *	Constructs the Point2 instance with the specified coordinates.
	 */
	constructor (x?: number, y?: number);

	/**
	 * 	Clones the point coordinates into a new Point2 object.
	 */
	clone() : Point2;

	/**
	 *	Sets the coordinates of the point from another Point2.
	 */
	set (value: Point2) : Point2;

	/**
	 *	Sets the coordinates of the point from a Vec2 object.
	 */
	set (value: Vec2) : Point2;

	/**
	 *	Sets the coordinates of the point.
	 *	@param upscaled - When `true` the specified values are assumed to have already been upscaled.
	 */
	set (x: number, y: number, upscaled?: boolean) : Point2;

	/**
	 * 	Sets the X-coordinate of the point.
	 */
	setX (x: number) : Point2;

	/**
	 * 	Sets the Y-coordinate of the point.
	 */
	setY (y: number) : Point2;

	/**
	 * 	Sets the coordinates of the point to zero.
	 */
	zero() : Point2;

	/**
	 * 	Returns true if the point coordinates are both zero.
	 */
	isZero() : boolean;

	/**
	 *	Returns true if the coordinates of the point have the same values as the given Point2.
	 */
	equals (value: Point2) : boolean;

	/**
	 *	Returns true if the coordinates of the point have the same values as the given Vec2.
	 */
	equals (value: Vec2) : boolean;

	/**
	 *	Returns true if the coordinates of the point have the same values as the given ones.
	 */
	equals (x: number, y: number) : boolean;

	/**
	 *	Adds the coordinates of the given Point2 to the point.
	 */
	add (value: Point2) : Point2;

	/**
	 *	Adds the coordinates of the given Vec2 to the point.
	 */
	add (value: Vec2) : Point2;

	/**
	 *	Adds the given delta values to the point.
	 *	@param upscaled - When `true` the specified values are assumed to have already been upscaled.
	 */
	add (dx: number, dy: number, upscaled?: boolean) : Point2;

	/**
	 *	Subtracts the coordinates of the given Point2 from the point.
	 */
	sub (value: Point2) : Point2;

	/**
	 *	Subtracts the coordinates of the given Vec2 from the point.
	 */
	sub (value: Vec2) : Point2;

	/**
	 *	Subtracts the given delta values from the point.
	 *	@param upscaled - When `true` the specified values are assumed to have already been upscaled.
	 */
	sub (dx: number, dy: number, upscaled?: boolean) : Point2;

}

export namespace Point2
{
	export namespace Pool
	{
		/**
		 *	Allocates a Point2 instance from another Point2.
		 */
		function alloc (value: Point2) : Point2;

		/**
		 *	Allocates a Point2 instance from a Vec2.
		 */
		function alloc (value: Vec2) : Point2;

		/**
		 *	Allocates a Point2 instance with the specified coordinates.
		 */
		function alloc (x?: number, y?: number) : Point2;

	}
}
/**
 * 	Represents a 2D rectangle.
 */
export class Rect
{
	/**
	 */
	readonly cx: number;

	/**
	 */
	readonly cy: number;

	/**
	 */
	readonly x1: number;

	/**
	 */
	readonly y1: number;

	/**
	 */
	readonly x2: number;

	/**
	 */
	readonly y2: number;

	/**
	 * 	Constructs a rectangle of zero size, centered at (0, 0).
	 */
	constructor();

	/**
	 * 	Constructs a rectangle centered at (0, 0) with the specified size.
	 */
	constructor (width: number, height: number);

	/**
	 * 	Constructs a rectangle with the specified coordinates.
	 */
	constructor (x1: number, y1: number, x2: number, y2: number);

	/**
	 * 	Returns a clone of the rectangle.
	 */
	clone() : Rect;

	/**
	 * 	Sets all coordinates of the rectangle to zero.
	 */
	zero() : Rect;

	/**
	 * 	Sets all coordinates of the rectangle to `null` for subsequent use with `extendWithPoint`.
	 */
	reset() : Rect;

	/**
	 * 	Extends the rectangle to contain the specified vector coordinates.
	 */
	extendWithPoint (v: Vec2) : Rect;

	/**
	 * 	Extends the rectangle to contain the specified point.
	 */
	extendWithPoint (x: number, y: number) : Rect;

	/**
	 * 	Translates the rectangle by the given deltas.
	 */
	translate (dx: number, dy: number) : Rect;

	/**
	 * 	Moves the center of the rectangle to the specified position.
	 * 	@param normalized - When `true` the arguments `x` and `y` are treated as normalized ranging from 0 to 1 (inclusive).
	 */
	centerAt (x: number, y: number, normalized?: false) : Rect;

	/**
	 * 	Copies the coordinates of the specified rectangle.
	 */
	set (r: Rect) : Rect;

	/**
	 * 	Sets the coordinates of the rectangle.
	 */
	set (x1: number, y1: number, x2: number, y2: number) : Rect;

	/**
	 * 	Returns `true` if the given rectangle coordinates are equal.
	 */
	equals (r: Rect) : boolean;

	/**
	 * 	Returns `true` if the coordinates are equal.
	 */
	equals (x1: number, y1: number, x2: number, y2: number) : boolean;

	/**
	 * 	Returns `true` if the specified rectangle is contained in the current one.
	 */
	contains (r: Rect) : boolean;

	/**
	 * 	Returns `true` if the specified rectangle is contained in the current one.
	 */
	contains (x1: number, y1: number, x2: number, y2: number) : boolean;

	/**
	 * 	Sets the coordinates of the rectangle to the union of it and the given one.
	 */
	setAsUnion (r: Rect) : Rect;

	/**
	 * 	Sets the coordinates of the rectangle to the union of it and the given one.
	 */
	setAsUnion (x1: number, y1: number, x2: number, y2: number) : Rect;

	/**
	 * 	Returns `true` if the rectangles intersect.
	 */
	intersects (r: Rect) : boolean;

	/**
	 * 	Returns `true` if the rectangles intersect.
	 */
	intersects (x1: number, y1: number, x2: number, y2: number) : boolean;

	/**
	 * 	Sets the coordinates of the rectangle to the intersection of it and the given one.
	 * 	@returns Boolean indicating if the intersection is non-empty.
	 */
	setAsIntersection (r: Rect) : boolean;

	/**
	 * 	Sets the coordinates of the rectangle to the intersection of it and the given one.
	 * 	@returns Boolean indicating if the intersection is non-empty.
	 */
	setAsIntersection (x1: number, y1: number, x2: number, y2: number) : boolean;

	/**
	 * 	Resizes the rectangle to the given size using its center or top-left corner as reference.
	 * 	@param topLeftRelative - When `true` reference will be top-left corner, set to `false` to use the center.
	 * 	@param normalized - When `true` the `w` and `h` will be treated as normalized ranging from 0 to 1 (inclusive).
	 */
	resize (w: number, h: number, normalized?: boolean, topLeftRelative?: boolean) : Rect;

	/**
	 * 	Resizes the rectangle using the specified deltas, relative to its center or top-left corner.
	 * 	@param topLeftRelative - When `true` reference will be top-left corner, set to `false` to use the center.
	 */
	resizeBy (dw: number, dh: number, topLeftRelative?: boolean) : Rect;

	/**
	 * 	Returns the width of the rectangle.
	 */
	width() : number;

	/**
	 * 	Returns the height of the rectangle.
	 */
	height() : number;

	/**
	 * 	Returns the normalized center X-coordinate of the rectangle.
	 */
	ncx() : number;

	/**
	 * 	Returns the normalized center Y-coordinate of the rectangle.
	 */
	ncy() : number;

	/**
	 * 	Returns `true` if the rectangle is a right rectangle, that is: x1 < x2 and y1 < y2.
	 */
	isRight() : boolean;

	/**
	 * 	Returns `true` if the specified point is contained in the rectangle.
	 * 	@param tol - Used to specify a tolerance value (default is zero).
	 */
	containsPoint (x: number, y: number, tol?: number) : boolean;

	/**
	 * 	Returns the area of the rectangle.
	 * 	@param strict - Indicates if the area is returned only if the rectangle is a right rectangle.
	 */
	area (strict?: boolean) : number;

	/**
	 * 	Sets the components of the rectangle to their rounded-down integer parts.
	 */
	floor() : Rect;

	/**
	 * 	Sets the components of the rectangle to their rounded-up integer parts.
	 */
	ceil() : Rect;

	/**
	 * 	Returns the string representation of the rectangle.
	 */
	toString() : string;

	/**
	 * 	Flattens the rectangle.
	 */
	flatten() : Array<number>;

	/**
	 * 	Unflattens the rectangle.
	 */
	unflatten(input: Array<number>) : Rect;

}

export namespace Rect
{
	export namespace Pool
	{
		/**
		 * 	Allocates a new rectangle of zero size.
		 */
		function alloc() : Rect;

		/**
		 * 	Allocates a new rectangle centered at (0, 0) with the specified size.
		 */
		function alloc (width: number, height: number) : Rect;

		/**
		 * 	Allocates a new rectangle with the specified coordinates.
		 */
		function alloc (x1: number, y1: number, x2: number, y2: number) : Rect;

	}
}
/**
 * 	Representation of a bounding box in 2D space. The component values are upscaled by a fixed number of bits to allow sub-pixel
 * 	translations (internally), but the public values will always be integers.
 */
export class Bounds2
{
	/**
	 */
	readonly cx: number;

	/**
	 */
	readonly cy: number;

	/**
	 */
	readonly x1: number;

	/**
	 */
	readonly y1: number;

	/**
	 */
	readonly x2: number;

	/**
	 */
	readonly y2: number;

	/**
	 */
	constructor ();

	/**
	 */
	constructor (bounds: Bounds2);

	/**
	 */
	constructor (rect: Rect);

	/**
	 */
	constructor (width: number, height: number);

	/**
	 */
	constructor (x1: number, y1: number, x2: number, y2: number, upscaled?: boolean|false);

	/**
	 * Truncates the components to remove fractional parts.
	 */
	trunc() : Bounds2;

	/**
	 * Clones the bounds and returns a new object.
	 */
	clone() : Bounds2;

	/**
	 * Sets the components to zero.
	 */
	zero() : Bounds2;

	/**
	 * Resets the component values to `null` for subsequent use with `setAsUnion`.
	 */
	reset() : Bounds2;

	/**
	 * Translates the bounds by the given deltas.
	 */
	translate (point: Point2) : Bounds2;

	/**
	 * Translates the bounds by the given deltas.
	 */
	translate (vec: Vec2) : Bounds2;

	/**
	 * Translates the bounds by the given deltas.
	 */
	translate (dx: number, dy: number, upscaled?: boolean) : Bounds2;

	/**
	 * Resizes the bounds to the given size using the center or top-left as reference.
	 * @param {number} width Use a value, or `true` to preserve aspect ratio, or `null` to keep it unchanged.
	 * @param {number} height Use a value, or `true` to preserve aspect ratio, or `null` to keep it unchanged.
	 * @param {boolean} topLeftRelative (default `false`)
	 */
	resize (width: number|boolean|null, height: number|boolean|null, topLeftRelative?: boolean) : Bounds2;

	/**
	 * Resizes the bounds using the specified deltas (using the center or top-left corner as reference).
	 */
	resizeBy (dWidth: number|boolean, dHeight: number|boolean, topLeftRelative?: boolean) : Bounds2;

	/**
	 * Returns the width of the bounds.
	 */
	width(): number

	/**
	 * Returns the height of the bounds.
	 */
	height(): number

	/**
	 * Returns the aspect ratio (width divided by height).
	 */
	ratio(): number

	/**
	 * Returns true if the bounds are in forward position (x1 < x2 and y1 < y2).
	 */
	isForward() : boolean;

	/**
	 * Returns true if the specified point is within the bounds. The `tol` parameter is used to specify a tolerance value.
	 */
	containsPoint (x: number, y: number, tol?: number) : boolean;

	/**
	 * Returns the area of the bounds. When strict is true, the area will be returned only if the bounds are forward.
	 */
	area (strict?: boolean|false) : number;

	/**
	 * Returns the string representation of the rect coordinates.
	 */
	toString() : string;

	/**
	 * Flattens the contents of the bounds.
	 */
	flatten() : [number,number,number,number];

	/**
	 * Unflattens the given array into the bounds object.
	 */
	unflatten (data: [number,number,number,number]) : Bounds2;

}

export namespace Rect
{
	export namespace Pool
	{
		/**
		 * 	Allocates a new object of zero size.
		 */
		function alloc() : Bounds2;

	}
}


/**
 * 	Viewport class controls the current visible rectangle of a container.
 */
export class Viewport
{
	/**
	 * 	Dimensions of the viewport.
	 */
	readonly width: number;
	readonly height: number;

	/**
	 * 	Boundaries of the container, set by `setContainerBounds`.
	 */
	readonly container: Bounds2;

	/**
	 * 	Bounds of the viewport in world space. Used to determine which elements lie inside the viewport.
	 */
	readonly bounds: Bounds2;

	/**
	 * 	Bounds of the focus area of the viewport in world space. When the `focusRect` moves outside this area the viewport will be panned to keep it inside these bounds.
	 */
	readonly focusBounds: Bounds2;

	/**
	 * 	Bounds of the viewport in screen space, used as target rendering area.
	 */
	readonly screenBounds: Bounds2;

	/**
	 * 	Constructs the viewport with the specified size and container dimensions.
	 *
	 * 	@param sx - Screen position X.
	 * 	@param sy - Screen position Y.
	 * 	@param width - Viewport width.
	 * 	@param height - Viewport height.
	 * 	@param containerWidth - Container width.
	 * 	@param containerHeight - Container height.
	 */
	constructor (sx: number, sy: number, width: number, height: number, containerWidth: number, containerHeight: number);

	/**
	 * 	Returns the value of the `enabled` flag.
	 */
	enabled() : boolean;

	/**
	 * 	Sets the `enabled` flag.
	 */
	enabled (value: boolean) : Viewport;

	/**
	 * 	Returns the value of the `topLeft` flag.
	 */
	topLeft() : boolean;

	/**
	 * 	Sets the `topLeft` flag.
	 */
	topLeft (value: boolean) : Viewport;

	/**
	 * 	Sets the container bounds. Used to ensure the viewport bounds are never outside these limits.
	 */
	setContainerBounds (x1: number, y1: number, x2: number, y2: number) : Viewport;

	/**
	 * 	Sets the container bounds. Used to ensure the viewport bounds are never outside these limits.
	 */
	setContainerBounds (v: Bounds2|Rect) : Viewport;

	/**
	 * 	Sets the viewport padding.
	 */
	setPadding (value: number) : Viewport;

	/**
	 * 	Sets the padding of each side of the viewport (left, top, right and bottom).
	 */
	setPadding (x1: number, y1: number, x2: number, y2: number) : Viewport;

	/**
	 * 	Resizes the viewport to the specified size.
	 */
	resize (width: number|null, height: number|null) : Viewport;

	/**
	 * 	Resizes the viewport by the specified deltas.
	 */
	resizeBy (dWidth: number, dHeight: number) : Viewport;

	/**
	 * Sets the position of the viewport's center within the world and resets the relative offset to zero.
	 * Setting any parameter to `null` will cause it not to be changed.
	 */
	setPosition (x: number|null, y: number|null) : Viewport;

	/**
	 * 	Sets the position of the viewport relative to the current focus point.
	 */
	setOffsets (dx: number, dy: number) : Viewport;

	/**
	 * 	Sets the scale of the viewport.
	 */
	setScale (value: number) : Viewport;

	/**
	 * 	Returns the scale of the viewport.
	 */
	getScale () : number;

	/**
	 * 	Sets the global scale of the viewport.
	 */
	setGlobalScale (value: number) : Viewport;

	/**
	 * 	Returns the global scale of the viewport.
	 */
	getGlobalScale () : number;

	/**
	 * 	Sets the center ratio of the viewport (values from -1 to 1, default is 0). Used to focus on a different point instead of the exact center.
	 */
	setCenter (rx: number, ry: number) : Viewport;

	/**
	 * 	Moves the viewport within the world. Values are relative to the current focus point.
	 *	@param truncateToContainer - When `true` the final viewport bounds will be ensured to not lie outside the container bounds.
	 */
	translate (dx: number, dy: number, truncateToContainer?: boolean) : Viewport;

	/**
	 * 	Sets the screen position of the viewport.
	 */
	setScreenPosition (sx: number, sy: number) : number;

	/**
	 * 	Returns the X coordinate of the viewport's focus point inside the world.
	 * 	@param absolute - When `true`, the focus point X (without offset) will be returned.
	 */
	getX (absolute?: boolean) : number;

	/**
	 * 	Returns the Y coordinate of the viewport's focus point inside the world.
	 * 	@param absolute - When `true`, the focus point Y (without offset) will be returned.
	 */
	getY (absolute?: boolean) : number;

	/**
	 * 	Returns the X position of the viewport inside the world relative to the current focus point.
	 */
	getOffsetX() : void;

	/**
	 * 	Returns the Y position of the viewport inside the world relative to the current focus point.
	 */
	getOffsetY() : void;

	/**
	 * 	Returns the width of the viewport.
	 */
	getWidth() : number;

	/**
	 * 	Returns the height of the viewport.
	 */
	getHeight() : number;

	/**
	 * 	Moves the viewport X coordinate to focus on the specified line or coordinate. Method `updateBounds` should be called afterwards.
	 */
	focusX (x0: number, x1?: number, factor?: number) : Viewport;

	/**
	 * 	Moves the viewport Y coordinate to focus on the specified line or coordinate. Method `updateBounds` should be called afterwards.
	 */
	focusY (y0: number, y1?: number, factor?: number) : Viewport;

	/**
	 * 	Updates the viewport to focus on the focusRect. Takes into account enabled axes.
	 */
	update (dt?: number) : void;

	/**
	 * 	Updates the viewport to focus on the focusRect ignoring the enabled axes.
	 */
	updateForced (dt?: number) : void;

	/**
	 * 	Tracks a specified rectangle by maintaining focus on it (a call to `update` must be made on every frame update).
	 */
	setFocusRect (rect: Rect|Bounds2, offsX?: number, offsY? :number) : Viewport;

	/**
	 * 	Sets the focus offsets of the viewport. Used to translate the viewport without altering the focus point.
	 */
	setFocusOffsets (offsX: number, offsY: number) : Viewport;

	/**
	 * 	Sets the enabled flag of the focus axes. Only enabled axes will be updated when calling `update`.
	 */
	setFocusAxes (enabledX: boolean, enabledY: boolean) : Viewport;

	/**
	 * 	Sets the focus factor of the viewport (value from 0 to 1), that is, the ratio of the smaller focus viewport.
	 */
	setFocusFactor (valueX: number, valueY: number) : Viewport;

	/**
	 * 	Applies the viewport clipping area to the specified canvas.
	 */
	applyClip (g: Canvas) : void;

	/**
	 * 	Applies the viewport transform to the specified canvas.
	 */
	applyTransform (g: Canvas) : void;

	/**
	 * 	Converts a point from screen-space to world-space.
	 * 	@returns Temporal Point2 object.
	 */
	toWorldSpace (input: Point2|Vec2|{x:number,y:number}, floor?: boolean) : Point2;

	/**
	 * 	Converts a point from screen-space to world-space.
	 * 	@returns Temporal Point2 object.
	 */
	toWorldSpace (x: number, y: number, floor?: boolean) : Point2;

	/**
	 * 	Converts a point from world-space to screen-space.
	 * 	@returns Temporal Point2 object.
	 */
	toScreenSpace (input: Point2|Vec2|{x:number,y:number}, floor?: boolean) : Point2;

	/**
	 * 	Converts a point from world-space to screen-space.
	 * 	@returns Temporal Point2 object.
	 */
	toScreenSpace (x: number, y: number, floor?: boolean) : Point2;

}
/**
 * 	Global functions and definitions.
 */
export namespace globals
{
	/**
	 * Renderer's GL context.
	 */
	let gl: WebGL2RenderingContext;

	/**
	 * Global system time, updated once per frame. Mirrors the `System.frameTime` property.
	 */
	let time: number;

	/**
	 * Active viewport (if any). Set by the `draw` method of the `Scene` class.
	 */
	let viewport: Viewport;

	/**
	 * Indicates if the element bounds should be drawn. Used by the `Element` class.
	 */
	let debugBounds: boolean;

	/**
	 * Indicates if the mask bounds should be drawn. Used by the `Mask` class.
	 */
	let debugMasks: boolean;

	/**
	 * Global random generators. Only `rand0` is used by the global random functions. The `rand1` and `rand2` can be used manually if desired.
	 */
	const rand0: Random;
	const rand1: Random;
	const rand2: Random;

}

declare global
{
	/**
	 * Converts the given pixel-value to actual screen pixels taking into account the current scale.
	 */
	function px (value: number) : number;

	/**
	 * Disposes an object by running the first method that is found in the following order: `free`, `dispose` and finally `__dtor`.
	 */
	function dispose (obj: object) : void;

	/**
	 * Global audio context obtained when the system is initialized.
	 */
	let audioContext: AudioContext;

	/**
	 * Similar to `fetch` but uses XMLHttpRequest because in some mobile browsers regular mode does not work well with ArrayBuffers.
	 */
	function fetchd (url: string, options?: object) : Promise<object>;

	/**
	 * Loads an arraybuffer from the specified URL and converts it to a AudioBuffer using the global audioContext.
	 */
	function fetchAudioBuffer (url: string) : Promise<AudioBuffer>;

	/**
	 * Returns the value as an integer.
	 */
	function int (value: number|string) : number;

	/**
	 * Returns the value as a boolean.
	 */
	function bool (value: number|string|boolean) : number;

	/**
	 * Returns the value as a floating point number.
	 */
	function float (value: number|string) : number;

	/**
	 * Returns the value truncated to 2 digits of precision.
	 */
	function float2 (value: number) : number;

	/**
	 * Returns the value truncated to 3 digits of precision.
	 */
	function float3 (value: number) : number;

	/**
	 * Returns the value truncated to 4 digits of precision.
	 */
	function float4 (value: number) : number;

	/**
	 * Converts the given value from degrees to radians.
	 */
	function rad (degrees: number) : number;

	/**
	 * Converts the given value from radians to degrees.
	 */
	function deg (radians: number) : number;

	/**
	 * Returns a random integer value from 0 to 0xFFFF (inclusive).
	 */
	function rand() : number;

	/**
	 * Returns a random float from 0 to 1 (inclusive).
	 */
	function randf() : number;

	/**
	 * Returns a random float within the given (inclusive) range.
	 */
	function randrf (startValue: number, endValue: number) : number;

	/**
	 * Returns a random integer within the given range (inclusive).
	 */
	function randr (startValue: number, endValue: number) : number;

	/**
	 * Returns a table (array) of N random integer numbers within the given range (inclusive). Ensures that the resulting
	 * table has an even distribution.
	 */
	function randt (startValue: number, endValue: number, n: number, removeSubsequent?: boolean) : Array<number>;

	/**
	 * Returns a table (array) of N random float numbers within the given range (inclusive).
	 */
	function randtf (startValue: number, endValue: number, n: number) : Array<number>;

	/**
	 * Returns the high-resolution `now` counter in milliseconds (includes possibly microseconds in fractional part).
	 */
	function hrnow () : number;

	/**
	 * Returns a function that when called produces a random integer value within the given (inclusive) range.
	 */
	function randvar (startValue: number, endValue: number) : () => number;

	/**
	 * Returns a function that when called returns an item from the specified array at some random index within the (inclusive) range.
	 */
	function randitem (arr: Array<any>, startValue?: number, endValue?: number) : () => any;

	/**
	 * Returns the parameter 't' where two line segments intersect.
	 */
	function getLineSegmentIntersection (ls1_x1: number, ls1_y1: number, ls1_x2: number, ls1_y2: number, ls2_x1: number, ls2_y1: number, ls2_x2: number, ls2_y2: number) : number;

	/**
	 * Returns boolean indicating if the line segments intersect.
	 */
	function lineSegmentIntersects (ls1_x1: number, ls1_y1: number, ls1_x2: number, ls1_y2: number, ls2_x1: number, ls2_y1: number, ls2_x2: number, ls2_y2: number) : boolean;

	/**
	 * Rotates a point by the given angle.
	 */
	function rotatePoint (angle: number, x: number, y: number) : { x: number, y: number };

	/**
	 * Rotates a point by the given angle along the given center.
	 */
	function rotatePoint (angle: number, x: number, y: number, cx: number, cy: number) : { x: number, y: number };

	/**
	 * Returns a value snapped to a step within the given range.
	 */
	function stepValue (value: number, minValue: number, maxValue: number, numSteps: number) : number;

	/**
	 * Returns a value that is a factor of the specified step.
	 */
	function alignValue (value: number, step: number) : number;

	/**
	 * Number of bits for fixed-point number (default is 8).
	 */
	let FIXED_POINT_BITS : number;

	/**
	 * Returns a fixed-point upscaled value.
	 */
	function upscale (value: number) : number;

	/**
	 * Downscales a fixed-point value to its integer part.
	 */
	function downscale (value: number) : number;

	/**
	 * Downscales a fixed-point value to floating point.
	 */
	function downscalef (value: number) : number;

	/**
	 * Aligns a value to its fixed point floating point representation such that downscaling results in an integer.
	 */
	function falign (value: number) : number;

	/**
	 * Returns the fractional part of a value.
	 */
	function fract (value: number) : number;

	/**
	 * Returns the value having the minimum absolute value.
	 */
	function absmin (a: number, b: number) : number;

	/**
	 * Returns the value having the maximum absolute value.
	 */
	function absmax (a: number, b: number) : number;

	/**
	 * Repeats a string a number of times.
	 */
	function repeat (str: string, count: number) : string;

	/**
	 * Pads the given value with a character (added to the left) until the specified size is reached.
	 */
	function lpad (val: any, size: number, char?: string) : string;

	/**
	 * Pads the given value with a character (added to the right) until the specified size is reached.
	 */
	function rpad (val: any, size: number, char?: string) : string;

	/**
	 * Returns the normalized (0 to 1) value for the given signed-normalized (-1 to 1) value.
	 */
	function norm (value: number) : number;

	/**
	 * Returns the signed-normalized (-1 to 1) value for the given normalized (0 to 1) value.
	 */
	function snorm (value: number) : number;

	/**
	 * Clamps the specified value to the (Unknown: x0,) range.
	 */
	function clamp (value: number, x0?: number, x1?: number) : number;

	/**
	 * Maps the given value from (Unknown: a0,) to (Unknown: b0,).
	 */
	function map (value: number, a0: number, a1: number, b0: number, b1: number) : number;

	/**
	 * Performs a linear interpolation between `x` and `y` using `a` to weight between them. The return value is computed as x*(1−a)+y*a.
	 */
	function mix (x: number, y: number, a: number) : number;

}







export class Perf
{
	/**
	 * 	Initializes the performance monitoring instance.
	 *
	 * 	@param accumSize - Maximum amount of samples to accumulate.
	 * 	@param expectedValue - Expected value (average) of resulting samples.
	 */
	constructor (accumSize: number, expectedValue?: number);

	/**
	 * 	Marks the start time of a performance test.
	 */
	begin() : void;

	/**
	 * 	Marks the end time of the performance test, the elapsed time is fed into the monitor.
	 */
	end() : void;

	/**
	 * 	Feeds a value into the monitor, auto-generates a report using `console.log` when the number of samples reaches the `accumSize` specified in the constructor.
	 */
	feed (value: number) : void;

	/**
	 * 	Updates the `min`, `max`, `avg` `std`, `stdSum` and `stdCount` fields of the object.
	 */
	update () : void;

	/**
	 * 	Returns a report string with the values selected by the specified flags.
	 */
	report (flags: Perf.Flags) : string;

}

export namespace Perf
{
	enum Flags
	{
		SAMPLES,
		MIN,
		MAX,
		AVG,
		EXPECTED,
		STDDEV,
		AVG_STDDEV,
		ALL,
	}

}





export namespace Resources
{
	type ConfigOptions =
	{
		/**
		 * Enables integer scaling. When enabled, calling `resizeImage` with `pixelated` parameter set to `true` will cause images to be resized to integer
		 * factors. When disabled, images will be resized using the half/double method to eventually end up reaching the exact target size.
		 *
		 * @default true
		 */
		integerScalingEnabled?: boolean;

		/**
		 * Default value for the `pixelated` parameter of image resources. Controls whether to use integer scaling when resizing images.
		 *
		 * @default false
		 */
		pixelated?: boolean;

		/**
		 * Default value for the `filter` parameter of image resources. When an image does not have the `pixelated` property nor `filter`, this value will be used.
		 *
		 * @default LINEAR
		 */
		filter?: 'LINEAR'|'NEAREST';

		/**
		 * Default value for the `original` parameter of image resources. When set to `true`, no resizing at all will take place on the image resources and the
		 * original image will be used as-is.
		 *
		 * @default false
		 */
		original?: boolean;

	}

}

/**
 * Provides functionality to load and manipulate resources (images, audio, etc).
 */
export class Resources
{
	/**
	 * Enables integer scaling. When enabled, calling `resizeImage` with `pixelated` parameter set to `true` will cause images to be resized to integer
	 * factors. When disabled, images will be resized using the half/double method to eventually end up reaching the exact target size.
	 *
	 * @default true
	 */
	static integerScalingEnabled: boolean;

	/**
	 * Default value for the `pixelated` parameter of image resources. Controls whether to use integer scaling when resizing images. Also controls the default
	 * scaling filter (LINEAR/NEAREST) the image will use when converted to a WebGL2 texture.
	 *
	 * @default false
	 */
	static pixelated: boolean;

	/**
	 * Default value for the `filter` parameter of image resources. When an image does not have the `pixelated` property nor `filter`, this value will be used.
	 *
	 * @default LINEAR
	 */
	static filter: 'LINEAR'|'NEAREST';

	/**
	 * Default value for the `original` parameter of image resources. When set to `true`, no resizing will take place on the image resource at all and the
	 * original will be used as-is.
	 *
	 * @default false
	 */
	static original: boolean;

	/**
	 * Configures the resources object with the specified options.
	 */
	static config (options: Resources.ConfigOptions) : void;

	/**
	 * Loads a list of resources. The list parameter is actually a dictionary with objects as shown in the example below.
	 *
	 * { type: "image", wrapper: "", src: "assets/ui/btn-left.png", width: 64, [ height: 64 ], scale: 1, pixelated: false, filter: null, original: false }
	 * { type: "images", wrapper: "", src: "assets/ui/##.png", count: 16, width: 64, [ height: 64 ], pixelated: false }
	 * { type: "audio", wrapper: "", src: "assets/ui/tap.wav", track: "sfx|music" }
	 * { type: "audios", wrapper: "", src: "assets/ui/snd-##.wav", count: 4 }
	 * { type: "json", wrapper: "", src: "assets/config.json" }
	 * { type: "data", wrapper: "", src: "assets/config.dat" }
	 * { type: "text", wrapper: "", src: "assets/config.frag" }
	 * { type: "object", wrapper: "" }
	 *
	 * @param list - Map of resources to load.
	 * @param progressCallback - Executed once for every resource loaded.
	 * @param completeCallback - Executed when all resources have been loaded.
	 */
	static load (list: { [id: string] : object }, progressCallback: (index: number, count: number, ratio: number, name: string) => void, completeCallback: (list: { [id: string] : object }) => void) : void;

	/**
	 * Unloads the specified list of resources.
	 */
	static unload (list: { [id: string] : object }) : void;

	/**
	 * Loads an image, returns a promise.
	 */
	static loadImage (src: string) : Promise<HTMLImageElement>;

	/**
	 * Resizes the given image to the specified size.
	 */
	static resizeImage (image: HTMLImageElement, targetWidth: number, targetHeight: number, pixelated?: boolean, discardOriginal?: boolean) : HTMLImageElement|HTMLCanvasElement;

	/**
	 * Flips an image horizontally.
	 */
	static flipImageHorz (image: HTMLImageElement) : HTMLImageElement;

	/**
	 * Flips an image vertically.
	 */
	static flipImageVert (image: HTMLImageElement) : HTMLImageElement;

	/**
	 * Forces the browser to show a download dialog.
	 */
	static showDownload (filename: string, dataUrl: string) : void;

	/**
	 * Forces the browser to show a file selection dialog.
	 */
	static showFilePicker (allowMultiple: boolean, accept: string, callback: (files: Array<File>) => void) : void;

	/**
	 * Loads a file using FileReader and returns the result as a dataURL.
	 */
	static loadAsDataURL (file: File, callback: (dataUrl: string) => void) : void;

	/**
	 * Loads a file using FileReader and returns the result as text.
	 */
	static loadAsText (file: File, callback: (text: string) => void) : void;

	/**
	 * Loads a file using FileReader and returns the result as an array buffer.
	 */
	static loadAsArrayBuffer (file: File, callback: (buff: ArrayBuffer) => void) : void;

	/**
	 * Loads an array of File objects using FileReader and returns them as data URLs.
	 */
	static loadAllAsDataURL (fileList: Array<File>, callback: (urlList: Array<{name:string, size:number, url:string}>) => void) : void;

}




export class PriorityQueue
{
	/**
	 * 	Constructs an priority queue.
	 */
	constructor();

	/**
	 * 	Adds an object to the priority queue.
	 */
	add (obj: object) : object;

	/**
	 * 	Marks an object to be removed from the priority queue. Use `cleanup` to actually remove them.
	 */
	remove (obj: object) : object;

	/**
	 * 	Runs a cleanup of the queue by removing any objects marked to be removed.
	 */
	cleanup() : void;

	/**
	 * 	Runs the specified callback for each object in the queue. Executed in order of priority (from low number to high number).
	 * 	@param callback - Return `false` to stop the forEach execution immediately.
	 */
	forEach (callback: (obj: object) => boolean) : void;

	/**
	 * 	Runs the specified callback for each object in the queue. Executed in reverse order of priority (from high number to low number).
	 * 	@param callback - Return `false` to stop the forEachRev execution immediately.
	 */
	forEachRev (callback: (obj: object) => boolean) : void;

	/**
	 * 	Runs the specified callback for each object in the queue. Executed in order of priority (from low number to high number). When
	 * 	the cycle finishes the given `finishedCallback` will be executed.
	 * 	@param callback - Return `false` to stop the forEachAsync execution immediately. Must manually execute `next` when finished.
	 */
	forEachAsync (callback: (obj: object, next: Function) => boolean) : void;

	/**
	 * 	Runs the specified callback for each object in the queue. Executed in reverse order of priority (from high number to low number). When
	 * 	the cycle finishes the given `finishedCallback` will be executed.
	 * 	@param callback - Return `false` to stop the forEachRevAsync execution immediately. Must manually execute `next` when finished.
	 */
	forEachRevAsync (callback: (obj: object, next: Function) => boolean) : void;

}
/**
 * Defines a callback node. Contains a callback function, and up to six arguments.
 */
export class Callback
{
	/**
	 * Initializes the callback with the specified arguments.
	 */
	constructor (callback: Function, arg0?: any, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any);

	/**
	 * 	Executes the callback. Returns `false` if the callback has finished and should be removed.
	 * 	@param host - Host object.
	 */
	exec (host: Object) : boolean;

}

export namespace Callback
{
	export namespace Pool
	{
		/**
		 * 	Allocates a callback with the specified arguments.
		 */
		function alloc (callback: Function, arg0?: any, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any) : Callback;

	}
}
/**
 * The handler class allows zero or more callbacks to be attached, such that when the `exec` method is invoked, all attached callbacks will also be executed.
 */
export class Handler
{
	/**
	 * Handler host element or value.
	 */
	host: any;

	/**
	 * Initializes the Handler instance.
	 */
	constructor (host?: any);

	/**
	 * Adds the specified callback to the handler.
	 */
	add (callback: Function, arg0?: any, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any) : Callback;

	/**
	 * Removes a callback from the handler.
	 */
	unlink (node: Callback) : Handler;

	/**
	 * Removes all callbacks matching the specified arguments.
	 */
	remove (callback?: Function, arg0?: any, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any) : Handler;

	/**
	 * Returns the first callback matching the specified arguments.
	 */
	find (callback: Function, arg0?: any, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any) : Callback;

	/**
	 * Executes all callbacks in the handler.
	 */
	exec (host?: any) : void;

	/**
	 * Executes the first callback matching the specified arguments.
	 */
	execf (callback?: Function, arg0?: any, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any) : void;

	/**
	 * Executes the specified callback.
	 */
	execc (node: Callback, host?: any) : void;

}

export namespace Handler
{
	export namespace Pool
	{
		/**
		 * 	Allocates a new handler instance.
		 */
		function alloc (host?: Object) : Handler;

	}
}



/**
 * 	Describes a function dependent of time (t-function), multiple sampling points (t,y) can be added, this class
 * 	provides methods to access any value for a given time, or the integral of a time range.
 */
export class TFunction
{
	/**
	 * 	Contains the time values `t` in the t-function, for each time value there is a corresponding `y` and `f`.
	 */
	t: Array<number>;

	/**
	 * 	Contains the values (y) for each of the time values (t) in the t-function.
	 */
	y: Array<number>;

	/**
	 * 	Contains the easing function (f) for each of the time values (t).
	 */
	f: Array< (t:number) => number >;

	/**
	 * 	Constructs the time function.
	 * 	@param value - Initial value of the t-function for t=0, defaults to 0.
	 */
	constructor (value?: number);

	/**
	 * 	Resets the t-function to its initial state.
	 * 	@param value - Initial value of the t-function for t=0. Default is 0.
	 */
	reset (value?: number) : TFunction;

	/**
	 * 	Resets the t-function and copies data from the specified source.
	 * 	@param src - Source TFunction.
	 * 	@param t0 - Initial time, if none specified will be assumed to be the min time of the source.
	 * 	@param t1 - Final time, if none specified will be assumed to the the max time of the source.
	 * 	@returns A TFunction or `null` if the specified time range could not be resolved.
	 */
	copyFrom (src: TFunction, t0: number, t1: number) : TFunction;

	/**
	 * 	Creates a new t-function with the same values as the current one.
	 * 	@param t0 - Initial time, if none specified will be assumed to be the min time of the source.
	 * 	@param t1 - Final time, if none specified will be assumed to the the max time of the source.
	 */
	clone (t0: number, t1: number) : TFunction;

	/**
	 * 	Returns the maximum time value in the t-function plus the given delta.
	 * 	@param delta - Delta value to add to the result.
	 */
	endTime (delta?: number) : number;

	/**
	 * 	Returns the start time of the t-function plus the given delta.
	 * 	@param delta - Delta value to add to the result.
	 */
	startTime (delta?: number) : number;

	/**
	 * 	Finds the index of a sampling point whose sampling range contains the given time.
	 * 	@param time - Time value to search.
	 * 	@returns Index of the sampling point or `null` if not within range.
	 */
	find (time: number) : number|null;

	/**
	 * 	Sets a sampling point (t,y).
	 * 	@param t - Time value of the sampling point.
	 * 	@param y - Y-value for the given t.
	 * 	@param f - Easing function.
	 */
	set (t: number, y: number, f?: (t: number) => number) : TFunction;

	/**
	 * 	Returns the last Y-value in the t-function.
	 */
	get() : number;

	/**
	 * 	Returns the Y-value in the t-function corresponding to some point in time (t).
	 * 	@param t - Time (t) value.
	 */
	getAt (t: number) : number;

	/**
	 * 	Returns the approximate definite integral of the t-function for the given time range.
	 * 	@param t0 - Initial time value, defaults to minimum time of the t-function.
	 * 	@param t1 - Final time value, defaults to the maximum time of the t-function.
	 * 	@param c0 - Constant of integration, defaults to 0.
	 * 	@returns Definite integral of t-function from t0 to t1.
	 */
	integral (t0?: number, t1?: number, c0?: number) : number;

	/**
	 * 	Returns the approximate definite second integral of the t-function for the given time range.
	 * 	@param t0 - Initial time value, defaults to minimum time of the t-function.
	 * 	@param t1 - Final time value, defaults to the maximum time of the t-function.
	 * 	@param c0 - Constant of integration, defaults to 0.
	 * 	@returns Definite second integral of t-function from t0 to t1.
	 */
	integral (t0?: number, t1?: number, c0?: number) : number;

	/**
	 * 	Transforms the t-function to its integral. For every sampling range in the t-function their Y-value will be set to the integral
	 * 	of the sampling range plus any previous integrals.
	 *
	 * 	@param c0 - Constant of integration. Defaults to 0.
	 */
	integrate (c0?: number) : TFunction;

	/**
	 * 	Transforms the t-function Y-values to the accumulated sum of each Y-value plus the given c0.
	 * 	@param c0 - Initial value (defaults to 0).
	 */
	accumulate(c0?: number) : TFunction;

	/**
	 * 	Removes all sampling-points located before the given index.
	 */
	chopLeft (i: number) : TFunction;

	/**
	 * 	Removes all sampling-points located after the given index.
	 */
	chopRight (i: number) : TFunction;

	/**
	 * 	Maps the Y-value to other Y-values using the specified mapping function.
	 * 	@param fn - Receives parameters `y` (y-value), `t` (t-value), and `i` (index).
	 */
	map (fn: (y: number, t: number, i: number) => number) : TFunction;

	/**
	 * 	Returns a string representation of the variable state.
	 */
	toString (c0?: number) : string;

}


export namespace Easing
{
	export namespace Linear
	{
		/**
		 */
		function IN (t: number) : number;

		/**
		 */
		function OUT (t: number) : number;

		/**
		 */
		function IN_OUT (t: number) : number;

	}

	export namespace Back
	{
		/**
		 */
		function IN (t: number, k?: number) : number;

		/**
		 */
		function OUT (t: number, k?: number) : number;

		/**
		 */
		function IN_OUT (t: number, k?: number) : number;

	}

	export namespace Bounce
	{
		/**
		 */
		function IN (t: number) : number;

		/**
		 */
		function OUT (t: number) : number;

		/**
		 */
		function IN_OUT (t: number) : number;

	}

	export namespace Circ
	{
		/**
		 */
		function IN (t: number) : number;

		/**
		 */
		function OUT (t: number) : number;

		/**
		 */
		function IN_OUT (t: number) : number;

	}

	export namespace Cubic
	{
		/**
		 */
		function IN (t: number) : number;

		/**
		 */
		function OUT (t: number) : number;

		/**
		 */
		function IN_OUT (t: number) : number;

	}

	export namespace Expo
	{
		/**
		 */
		function IN (t: number) : number;

		/**
		 */
		function OUT (t: number) : number;

		/**
		 */
		function IN_OUT (t: number) : number;

	}

	export namespace Power
	{
		/**
		 */
		function IN (t: number, p?: number) : number;

		/**
		 */
		function OUT (t: number, p?: number) : number;

		/**
		 */
		function IN_OUT (t: number, p?: number) : number;

	}

	export namespace Quad
	{
		/**
		 */
		function IN (t: number) : number;

		/**
		 */
		function OUT (t: number) : number;

		/**
		 */
		function IN_OUT (t: number) : number;

	}

	export namespace Quartic
	{
		/**
		 */
		function IN (t: number) : number;

		/**
		 */
		function OUT (t: number) : number;

		/**
		 */
		function IN_OUT (t: number) : number;

	}

	export namespace Quintic
	{
		/**
		 */
		function IN (t: number) : number;

		/**
		 */
		function OUT (t: number) : number;

		/**
		 */
		function IN_OUT (t: number) : number;

	}

	export namespace Sine
	{
		/**
		 */
		function IN (t: number) : number;

		/**
		 */
		function OUT (t: number) : number;

		/**
		 */
		function IN_OUT (t: number) : number;

	}

	export namespace Step
	{
		/**
		 */
		function IN (t: number) : number;

		/**
		 */
		function OUT (t: number) : number;

		/**
		 */
		function IN_OUT (t: number) : number;

	}
}
export class Block
{
	/**
	 * 	Initializes the block to its initial state.
	 */
	init() : Block;

	/**
	 * Returns the number of commands in the block.
	 */
	count() : number;

	/**
	 * 	Adds a command to the block.
	 */
	add (cmd: Command) : Command;

	/**
	 * 	Clones the block.
	 */
	clone() : Block;

	/**
	 * 	Clears the block by removing all commands and resetting it to initial state.
	 */
	clear() : Block;

	/**
	 * 	Resets the block to its initial state. Does not remove commands.
	 */
	reset (time: number) : Block;

	/**
	 * 	Sets the block to use the first command in the next call to `update`.
	 */
	restart() : Block;

	/**
	 * 	Returns `true` if all commands in the block have been executed to completion.
	 */
	isFinished() : boolean;

	/**
	 * 	Executes the next command in the block. Returns `true` when block execution is complete.
	 */
	update (anim: Anim) : boolean;

	/**
	 * 	Allocates a new block.
	 */
	static alloc () : Block;

	/**
	 * 	Allocates a new block and initializes it.
	 */
	static calloc () : Block;

}
export class Command
{
	/**
	 * Initializes the command.
	 */
	init (op: object) : Command;

	/**
	 * Executed when the command properties are ready, to initialize the operation code.
	 */
	ready() : void;

	/**
	 * Updates the command execution.
	 */
	update (anim: Anim, block: Block) : boolean;

	/**
	 * Allocates a new command.
	 */
	static alloc () : Command;

	/**
	 * Allocates a new command and initializes it.
	 */
	static calloc () : Command;

}
/**
 * 	Class to animate properties using commands.
 */
export class Anim
{
	/**
	 * Current output data object.
	 */
	data: object;

	/**
	 * Current time scale (animation speed).
	 */
	readonly timeScale: number;

	/**
	 * Current logical time.
	 */
	time: number;

	/**
	 * Indicates if the animation is paused.
	 */
	readonly paused: boolean;

	/**
	 * Indicates if the animation has finished.
	 */
	readonly finished: boolean;

	/**
	 * Indicates if the animation is running.
	 */
	readonly running: boolean;

	/**
	 * Indicates if the anim should be automatically disposed when finished.
	 */
	autoDispose: boolean;

	/**
	 * Constructs a new empty Anim object.
	 * @returns {Anim}
	 */
	constructor ();

	/**
	 * Copies the anim to the specified target and returns it.
	 * @param {Anim} target
	 * @returns {Anim}
	 */
	copyTo (target: Anim) : Anim;

	/**
	 * Returns a clone of the anim.
	 * @param {boolean} autoDispose - If true, the new anim will be disposed when finished.
	 * @returns {Anim}
	 */
	clone (autoDispose?: boolean) : Anim;

	/**
	 * Sets the callback to be called when the animation finishes.
	 * @param {(anim: Anim, data: object) => boolean} callback
	 * @returns {Anim}
	 */
	onFinished (callback: (anim: Anim, data: object) => boolean) : Anim;

	/**
	 * Adds the specified callback to be called when the animation finishes.
	 * @param {(anim: Anim, context?: object) => boolean} callback
	 * @param {object} context
	 * @returns {Anim}
	 */
	then (callback: (anim: Anim, context?: object) => boolean, context?: object) : Anim;

	/**
	 * Clears the object by removing all commands and callbacks. The `initialData` and `data` objects aren't changed.
	 * @returns {Anim}
	 */
	clear() : Anim;

	/**
	 * Resets the animation to its initial state.
	 * @returns {Anim}
	 */
	reset() : Anim;

	/**
	 * Cleans up the animation so new commands can be added. Callbacks are not removed.
	 * @returns {Anim}
	 */
	cleanup() : Anim;

	/**
	 * Sets the initial data of the anim.
	 * @param {object} data
	 * @returns {Anim}
	 */
	initial (data: object) : Anim;

	/**
	 * Sets the anim's data to the initial values.
	 * @returns {Anim}
	 */
	initial() : Anim;

	/**
	 * Sets the time scale (animation speed) to the specified value.
	 * @param {number} value - The new time scale, should be greater than 0.
	 * @returns {Anim}
	 */
	speed (value: number) : Anim;

	/**
	 * Sets the output data object.
	 * @param {object} data
	 * @returns {Anim}
	 */
	output (data: object) : Anim;

	/**
	 * Pauses the animation.
	 * @returns {Anim}
	 */
	pause() : Anim;

	/**
	 * Resumes the animation.
	 * @returns {Anim}
	 */
	resume() : Anim;

	/**
	 * Starts the animation.
	 * @param {boolean} reset - If true, the animation will be reset to its initial state.
	 * @returns {Anim}
	 */
	run (reset?: boolean) : Anim;

	/**
	 * Updates the animation by the specified delta, which must be in the same unit as the duration of the commands.
	 * Returns false when the animation has been completed.
	 * @param {number} dt
	 * @param {Anim} self
	 * @returns {boolean}
	 */
	update (dt: number, self?: Anim) : boolean;

	/**
	 * Runs the subsequent commands in parallel. Should end the parallel block by calling `end`.
	 * @returns {Anim}
	 */
	parallel() : Anim;

	/**
	 * Runs the subsequent commands in series. Should end the serial block by calling `end`.
	 * @returns {Anim}
	 */
	serial() : Anim;

	/**
	 * Repeats a block the specified number of times.
	 * @param {number} count
	 * @returns {Anim}
	 */
	repeat (count: number) : Anim;

	/**
	 * Ends a `parallel`, `serial` or `repeat` block.
	 * @returns {Anim}
	 */
	end() : Anim;

	/**
	 * Sets the value of a variable.
	 * @param {string|Function} field
	 * @param {*} value
	 * @returns {Anim}
	 */
	set (field: string|Function, value: any) : Anim;

	/**
	 * Restarts the current block.
	 * @returns {Anim}
	 */
	restart() : Anim;

	/**
	 * Waits for the specified duration.
	 * @param {number} duration
	 * @returns {Anim}
	 */
	wait (duration: number) : Anim;

	/**
	 * Animates a variable from the startValue to the endValue over the specified duration.
	 * @param {string|Function} field
	 * @param {number} duration
	 * @param {number} startValue
	 * @param {number} endValue
	 * @param {(t: number) => number} easing?
	 * @returns {Anim}
	 */
	range (field: string|Function, duration: number, startValue: number, endValue: number, easing?: (t: number) => number) : Anim;

	/**
	 * Animates a variable from the current value to the endValue over the specified duration.
	 * @param {string|Function} field
	 * @param {number} duration
	 * @param {number} endValue
	 * @param {(t: number) => number} easing?
	 * @returns {Anim}
	 */
	rangeTo (field: string|Function, duration: number, endValue: number, easing?: (t: number) => number) : Anim;

	/**
	 * Changes the variable with a value that is a random number in the given range (inclusive) for the specified duration.
	 * @param {string|Function} field
	 * @param {number} duration
	 * @param {number} count
	 * @param {number} startValue
	 * @param {number} endValue
	 * @param {(t: number) => number} easing?
	 * @returns {Anim}
	 */
	rand (field: string|Function, duration: number, count: number, startValue: number, endValue: number, easing?: (t: number) => number) : Anim;

	/**
	 * Changes the variable with a value that is a random number in the given range (inclusive) for the specified duration. The difference
	 * between this and `rand` is that this function uses a static pre-generated table of random numbers between the specified range.
	 *
	 * @param {string|Function} field
	 * @param {number} duration
	 * @param {number} count
	 * @param {number} startValue
	 * @param {number} endValue
	 * @param {(t: number) => number} easing?
	 * @returns {Anim}
	 */
	randt (field: string|Function, duration: number, count: number, startValue: number, endValue: number, easing?: (t: number) => number) : Anim;

	/**
	 * Plays a sound.
	 * @param {object} snd
	 * @returns {Anim}
	 */
	play (snd: object) : Anim;

	/**
	 * Executes a function. If continuous execution is needed, simply return `true`.
	 * @param {(dt: number, data: object, cmd: Command, anim: Anim) => boolean} fn
	 * @returns {Anim}
	 */
	exec (fn: (dt: number, data: object, anim: Anim) => boolean) : Anim;

	/**
	 * Sets X coordinate.
	 * @param {number} value
	 * @returns {Anim}
	 */
	setX (value: number) : Anim;

	/**
	 * Sets Y coordinate.
	 * @param {number} value
	 * @returns {Anim}
	 */
	setY (value: number) : Anim;

	/**
	 * Sets both the X and Y coordinates.
	 * @param {number} x
	 * @param {number} y
	 * @returns {Anim}
	 */
	position (x: number, y: number) : Anim;

	/**
	 * Translates the X coordinate for the specified amount over the specified duration.
	 * @param {number} duration
	 * @param {number} deltaValue
	 * @param {(t: number) => number} easing?
	 * @returns {Anim}
	 */
	translateX (duration: number, deltaValue: number, easing?: (t: number) => number) : Anim;

	/**
	 * Translates the Y coordinate for the specified amount over the specified duration.
	 * @param {number} duration
	 * @param {number} deltaValue
	 * @param {(t: number) => number} easing?
	 * @returns {Anim}
	 */
	translateY (duration: number, deltaValue: number, easing?: (t: number) => number) : Anim;

	/**
	 * Translates the X and Y coordinates for the specified amount over the specified duration.
	 * @param {number} duration
	 * @param {number} deltaValueX
	 * @param {number} deltaValueY
	 * @param {(t: number) => number} easingX?
	 * @param {(t: number) => number} easingY?
	 * @returns {Anim}
	 */
	translate (duration: number, deltaValueX: number, deltaValueY: number, easingX?: (t: number) => number, easingY?: (t: number) => number) : Anim;

	/**
	 * Translates the X and Y coordinates to the specified end values over the specified duration.
	 * @param {numbe} duration
	 * @param {number} endValueX
	 * @param {number} endValueY
	 * @param {(t: number) => number} easingX?
	 * @param {(t: number) => number} easingY?
	 * @returns {Anim}
	 */
	moveTo (duration: number, endValueX: number, endValueY: number, easingX?: (t: number) => number, easingY?: (t: number) => number) : Anim;

	/**
	 * Changes the `sx` and `sy` (scale X and scale Y) properties to the specified end values over the specified duration.
	 * @param {number} duration
	 * @param {number} endValueX
	 * @param {number} endValueY
	 * @param {(t: number) => number} easingX?
	 * @param {(t: number) => number} easingY?
	 * @returns {Anim}
	 */
	scale (duration: number, endValueX: number, endValueY: number, easingX?: (t: number) => number, easingY?: (t: number) => number) : Anim;

	/**
	 * Changes the `rotation` property by the specified delta value over the specified duration.
	 * @param {number} duration
	 * @param {number} deltaValue
	 * @param {(t: number) => number} easing?
	 * @returns {Anim}
	 */
	rotate (duration: number, deltaValue: number, easing?: (t: number) => number) : Anim;

	/**
	 * Global animation time scale.
	 */
	static timeScale: number;

	/**
	 * Sets the global time scale (animation speed).
	 * @param {number} value
	 */
	static speed (value: number) : void;

}
export class Boot
{
	/**
	 * 	Registers a new boot module.
	 */
	static register (module: Boot.Module) : Boot.Module;

	/**
	 * 	Removes a boot module.
	 */
	static unregister (module: Boot.Module) : void;

	/**
	 * 	Executes the startup sequence.
	 */
	static startup (finishedCallback?: () => void) : void;

	/**
	 * 	Executes the shutdown sequence.
	 */
	static shutdown (finishedCallback?: () => void) : void;

}

export namespace Boot
{
	interface Module
	{
		/**
		 * 	Priority of the module (from 0 to 100), lower number means higher priority.
		 */
		priority: number;

		/**
		 * 	Should return `false` if the method is async. When async ensure to call `next` once the operation is complete.
		 */
		onStartup (next: () => void) : boolean;

		/**
		 * 	Should return `false` if the method is async. When async ensure to call `next` once the operation is complete.
		 */
		onShutdown (next: () => void) : boolean;

	}

}
/**
 * Describes an element that can be added to a grid.
 */
export class GridElement
{
	/**
	 * Identifier of the element (string).
	 */
	id: string;

	/**
	 * Bounds of the element.
	 */
	bounds: Bounds2;

	/**
	 * Flags of the element (see constants of this class).
	 */
	flags: number;

	/**
	 * Generic data of the element, used to store some value or object.
	 */
	data: object;

	/**
	 * Extension object of the element, can be used to implement specific functionality.
	 */
	ext: object;

	/**
	 * The container where the element is stored.
	 */
	readonly container: Container;

	/**
	 * Remover runs when the `remove` method of the element is called or when the element is destroyed.
	 */
	readonly remover: Handler;

	/**
	 * Constructs the instance at the specified position and with the specified size.
	 */
	constructor (x: number, y: number, width: number, height: number);

	/**
	 * Sets the identifier of the element.
	 */
	setId (value: string) : GridElement;

	/**
	 * Sets bits of the element flags.
	 */
	setFlags (value: number) : GridElement;

	/**
	 * Clears bits from the element flags.
	 */
	clearFlags (value: number) : GridElement;

	/**
	 * Returns true if masking (bitwise AND) the flags by the specified flag bits results in the given value.
	 */
	getFlags (andMask: number, value?: number) : boolean;

	/**
	 * Sets the generic data of the element. Will be disposed when the element is destroyed. The property `host`
	 * of the object will be set with the reference to the element.
	 */
	setData (data: object) : GridElement;

	/**
	 * Returns the generic data of the element.
	 */
	getData() : object;

	/**
	 * Sets the extension object of the element. Calls to functions of this object should be done using the `exec` method.
	 */
	setExt (extensionObject: object) : GridElement;

	/**
	 * Returns the extension object of the element.
	 */
	getExt() : object;

	/**
	 * Executes a function of the extension object.
	 * @param {string} name
	 */
	exec (name: string, ...args: any) : any;

	/**
	 * Sets the visible flag.
	 * @param {boolean} value - New visibility value.
	 * @param {boolean} forced - When `true` forces to ignore the VISIBLE_LOCK flag.
	 */
	visible (value: boolean, forced?: boolean|false) : GridElement;

	/**
	 * Returns the visible flag.
	 */
	visible() : boolean;

	/**
	 * Sets the visible-lock flag.
	 */
	visibleLock (value: boolean) : GridElement;

	/**
	 * Returns the visible-lock flag.
	 */
	visibleLock() : boolean;

	/**
	 * Sets the alive flag.
	 */
	alive (value: boolean) : GridElement;

	/**
	 * Returns the alive flag.
	 */
	alive() : boolean;

	/**
	 * Sets the dirty flag.
	 */
	alive (value: boolean) : GridElement;

	/**
	 * Returns the dirty flag.
	 */
	alive() : boolean;

	/**
	 * Sets the depth-flag-enabled flag.
	 */
	depthFlagEnabled (value: boolean) : GridElement;

	/**
	 * Returns the depth-flag-enabled flag.
	 */
	depthFlagEnabled() : boolean;

	/**
	 * Sets the depth-flag flag. To actually use the depth-test, you have to enable the depth-flag using `depthFlagEnabled`.
	 */
	depthFlagEnabled (value: boolean) : GridElement;

	/**
	 * Returns the depth-flag flag.
	 */
	depthFlagEnabled() : boolean;

	/**
	 * Removes the element from the container and returns itself.
	 */
	remove() : GridElement;

	/**
	 * Syncs the actual location of the specified element with its storage location (if alive and dirty).
	 */
	sync() : GridElement;

	/**
	 * Sets the width and height of the element.
	 */
	resize (width: number|boolean|null, height: number|boolean|null) : GridElement;

	/**
	 * Resizes the element by the specified deltas.
	 */
	resizeBy (deltaWidth: number|boolean, deltaHeight: number|boolean) : GridElement;

	/**
	 * Moves the element by the specified deltas.
	 * @param upscaled - When `true` the `dx` and `dy` parameters are assumed to be upscaled.
	 */
	translate (dx: number, dy: number, upscaled?: boolean) : GridElement;

	/**
	 * Sets the position of the element. Any parameter set to `null` will cause it not to be changed.
	 */
	setPosition (x: number, y: number) : GridElement;

	/**
	 * Sets the position of the element. Any parameter set to `null` will cause it not to be changed.
	 */
	setPosition (pointer: {x:number, y:number}) : GridElement;

	/**
	 * Class-level function to allocate a new flag.
	 */
	static allocFlag() : number;

}
/**
 * 	Describes an optimized data structure to store 2D spatially indexed elements.
 */
export class Grid
{
	/**
	 * 	Number of elements active in the grid.
	 */
	readonly count: number;

	/**
	 * 	Indicates if the grid should match regions with exact precision by comparing region to element bounds intersection.
	 */
	verifyIntersection: boolean;

	/**
	 * 	Constructs a grid with the specified maximum width and height. The final effective coordinate range will be -(width/2) to (width/2)for X,
	 * 	and -(height/2) to (height/2) for Y.
	 *
	 * 	Note that the width, height and divisors kx and ky will be converted to their closest base-2 value. This is done to ensure shifts can be used
	 * 	to quickly divide the input coordinates.
	 */
	constructor (width: number, height: number, kx: number, ky?: number);

	/**
	 * 	Destroys all lists and elements in the grid.
	 */
	clear() : void;

	/**
	 * 	Destroys all lists in the grid. Elements will not be destroyed.
	 */
	reset() : void;

	/**
	 * 	Adds an element to the grid. Returns `true` if successful, or `false` if the element is outside of the grid bounds.
	 */
	add (elem: GridElement) : boolean;

	/**
	 * 	Removes the element from the grid and returns it.
	 */
	remove (elem: GridElement) : GridElement;

	/**
	 * 	Updates the storage location of the specified element. Returns `true` if successful, or `false` if the element is outside of the grid bounds (in
	 * 	which case the element will be removed), or if the element does not belong to this grid.
	 */
	sync (elem: GridElement) : boolean;

	/**
	 * 	Executes the specified callback function for each element that intersects the given bounds and has the specified flags set. The process is immediately
	 * 	stopped if the callback returns `false`.
	 */
	forEachInRegion (bounds: Bounds2|Rect, flagsAndMask: number, flagsValue: number, callback: (elem: GridElement, context?: object) => boolean, context?: object) : void;

	/**
	 * 	Collects all elements that intersect the given bounds and have the specified flags set. Returns a new List, remember to call `free` after using it.
	 */
	selectInRegion (bounds: Bounds2|Rect, flagsAndMask: number, flagsValue: number) : List;

	/**
	 * 	Counts all elements that intersect the given bounds and have the specified flags set.
	 */
	countInRegion (bounds: Bounds2|Rect, flagsAndMask: number, flagsValue: number) : number;

	/**
	 * 	Returns the first element that intersect the given bounds and have the specified flags set.
	 */
	selectFirst (bounds: Bounds2|Rect, flagsAndMask: number, flagsValue: number) : GridElement;

}
/**
 * 	A container is responsible to store elements for their subsequent rendering. The actual storage mechanism used can vary and must be implemented by derived
 * 	classes (see `GridContainer` and `SimpleContainer`).
 */
export class Container
{
	/**
	 * Viewport bounds currently active. Set by the Scene class before calling `draw`.
	 */
	viewportBounds: Bounds2;

	/**
	 * Width of the container.
	 */
	width: number;

	/**
	 * Height of the container.
	 */
	height: number;

	/**
	 * Depth (z-value) of the container, calculated by the scene.
	 */
	zvalue: number;

	/**
	 * Scene object to which this container belongs.
	 */
	scene: Scene;

	/**
	 * Flags of the object (see constants at the bottom of this file).
	 */
	flags: number;

	/**
	 * Currently active display buffer for rendering operations (used by drawElement).
	 */
	g: Canvas;

	/**
	 * Total number of elements in the container.
	 */
	readonly elementCount: number;

	/**
	 * Total number of elements drawn on the last draw operation.
	 */
	readonly drawCount: number;

	/**
	 * Draw handler executed after the scene is drawn.
	 */
	readonly ldraw: Handler;

	/**
	 * Constructs the container with the default size (32768 x 32768).
	 */
	constructor ();

	/**
	 * Constructs the container with the specified size.
	 */
	constructor (width: number, height: number);

	/**
	 * Returns the value of the `visible` flag.
	 */
	visible() : boolean;

	/**
	 * Sets the value of the `visible` flag.
	 */
	visible(value: boolean) : Container;

	/**
	 * Returns the value of the `depthFlag` flag.
	 */
	depthFlag() : boolean;

	/**
	 * Sets the value of the `depthFlag` flag.
	 */
	depthFlag(value: boolean) : Container;

	/**
	 * Sets the active viewport bounds.
	 */
	setViewportBounds (bounds: Bounds2) : Container;

	/**
	 * Draws the specified element.
	 */
	drawElement (elem: Element, self: Container) : boolean;

	/**
	 * Updates the Z-value of the specified element. Should be called after adding an element and after/before every sync.
	 */
	syncZ (elem: Element) : void;

	/**
	 * Syncs the actual location of the specified element with its storage location. Returns true if successful.
	 */
	sync (elem: Element) : boolean;

	/**
	 * Clears the container to empty. All contained elements will be destroyed.
	 */
	clear() : void;

	/**
	 * Resets the container to empty. Contained elements are not destroyed. Use `clear` if that is your intention.
	 */
	reset() : void;

	/**
	 * Adds an element to the container. Returns boolean indicating if successful.
	 */
	add (elem: Element) : Element;

	/**
	 * Removes an element from the container and returns it.
	 */
	remove (elem: Element) : Element;

	/**
	 * Prepares the canvas with depth flag configuration and Z-value to draw the contained elements.
	 */
	draw (g: Canvas) : void;

	/**
	 * Actually draws the contained elements.
	 */
	render() : void;

}

/**
 * Describes an element that can be rendered to the screen.
 */
export class Element extends GridElement
{
	/**
	 * Parent group to whom this element is related.
	 */
	group: Group;

	/**
	 * Drawable object to render to the display.
	 */
	img: Drawable;

	/**
	 * Indicates if the bounds of the element should be drawn (for debugging purposes). You can set it to a boolean or to a number from 1 to 7 to
	 * draw the bounds with a different predefined color.
	 */
	debugBounds: boolean|number;

	/**
	 * Constructs a drawable element at the specified position with the given drawable.
	 */
	constructor (x: number, y: number, width: number, height: number, img?: Drawable);

	/**
	 * Constructs a drawable element at the specified position with the given drawable.
	 */
	constructor (x: number, y: number, img?: Drawable);

	/**
	 * Destroys the element later by adding it to the scene's destruction queue. If the element has no container, it will be destroyed immediately.
	 */
	destroyLater() : void;

	/**
	 * Returns the `debugBounds` of the element.
	 * @returns {number}
	 */
	debug () : number;

	/**
	 * Sets the `debugBounds` of the element.
	 * @param {boolean|number} value
	 * @returns {Element}
	 */
	debug (value: number) : Element;

	/**
	 * Returns the `root` of the element, that is, the top-most element in the hierarchy.
	 */
	root () : Element;

	/**
	 * Returns the alpha value of the element.
	 * @returns {number}
	 */
	alpha () : number;

	/**
	 * Sets the alpha value of the element.
	 * @param {number} value
	 * @returns {Element}
	 */
	alpha (value: number) : Element;

	/**
	 * Returns the zvalue of the element.
	 * @returns {number}
	 */
	zvalue () : number;

	/**
	 * Sets the zvalue of the element.
	 * @param {number} value
	 * @returns {Element}
	 */
	zvalue (value: number) : Element;

	/**
	 * Returns the shader program of the element.
	 * @returns {ShaderProgram}
	 */
	shaderProgram () : ShaderProgram;

	/**
	 * Sets the shader program of the element.
	 * @param {ShaderProgram} shaderProgram
	 * @returns {Element}
	 */
	shaderProgram (shaderProgram: ShaderProgram|string) : Element;

	/**
	 * Sets the uniform setter function.
	 * @param { (pgm:ShaderProgram, elem:Element, gl:WebGLRenderingContext) => void } uniformSetter
	 * @returns {Element}
	 */
	uniformSetter (uniformSetter: (pgm:ShaderProgram, elem:Element, gl:WebGLRenderingContext) => void) : Element;

	/**
	 * Colors for the bounds debugging.
	 */
	static debugColors : Array<string>;

	/**
	 * Returns an RGBA color for the given `debugBounds` value.
	 */
	static getDebugColor (debugBounds: boolean|number) : string;

}

export namespace Element
{
	export namespace Pool
	{
		/**
		 * Allocates a drawable element at the specified position with the given drawable.
		 */
		function alloc (x: number, y: number, width: number, height: number, img?: Drawable) : Element;

		/**
		 * Allocates a drawable element at the specified position with the given drawable.
		 */
		function alloc (x: number, y: number, img?: Drawable) : Element;

	}
}



/**
 * Groups one or more elements into a single one.
 */
export class Group extends Element
{
	/**
	 * List of elements in the group.
	 */
	readonly children: List;

	/**
	 * Virtual zero reference point.
	 */
	readonly ref: Point2;

	/**
	 * Constructs an empty Group element.
	 */
	constructor (id?: string);

	/**
	 * Adds the group itself and all children to the scene's destruction queue. If any element has no container, it will be destroyed immediately.
	 */
	destroyLater() : void;

	/**
	 * Removes and destroys all child elements.
	 */
	clear() : Group;

	/**
	 * Removes all child elements but does not destroy them.
	 */
	reset() : Group;

	/**
	 * Returns the wrapExtents flag of the group.
	 * @returns {boolean}
	 */
	wrapExtents () : boolean;

	/**
	 * Sets the wrapExtents flag of the group.
	 * @param {boolean} value
	 * @returns {Group}
	 */
	wrapExtents (value: boolean) : Group;

	/**
	 * Adds a child element to the group. If the element has its `id` property set, it will be added to the group as a
	 * property, which can be accessed directly using the element identifier or using the `getChild` method.
	 */
	addChild (elem: Element) : Element;

	/**
	 * Return the child element matching the specified identifier.
	 */
	child (id: string) : Element;

	/**
	 * Removes an element from the container and returns it.
	 */
	removeChild (elem: Element) : Element;

	/**
	 * Local group translation, moves only the group by the specified deltas. Child elements remain in position.
	 * @param upscaled - When `true` the `dx` and `dy` parameters are assumed to be upscaled.
	 */
	ltranslate (dx: number, dy: number, upscaled?: boolean) : Group;

	/**
	 * Moves the group and all children by the specified deltas.
	 * @param upscaled - When `true` the `dx` and `dy` parameters are assumed to be upscaled.
	 */
	translate (dx: number, dy: number, upscaled?: boolean) : Group;

	/**
	 * Returns a temporal Point2, describing the extra offset introduced by the group when translating a child element by the specified deltas.
	 * @param upscaled - When `true` the `dx` and `dy` parameters are assumed to be upscaled.
	 */
	getOffsets (dx: number, dy: number, upscaled?: boolean) : Point2;

	/**
	 * Sets bits of the element flags in the group and all children.
	 */
	setFlags (value: number) : Group;

	/**
	 * Clears bits from the group and all children flags.
	 */
	clearFlags (value: number) : Group;

	/**
	 * Sets the visible flag of the group and all children.
	 * @param {boolean} value - New visibility value.
	 * @param {boolean} forced - When `true` forces to ignore the VISIBLE_LOCK flag.
	 */
	visible (value: boolean, forced?: boolean|false) : GridElement;

	/**
	 * Returns the visible flag.
	 */
	visible() : boolean;

	/**
	 * Returns the alpha value of the group.
	 * @returns {number}
	 */
	alpha () : number;

	/**
	 * Sets the alpha value of the group and all children.
	 * @param {number} value
	 * @returns {Element}
	 */
	alpha (value: number) : Element;

}

export namespace Group
{
	export namespace Pool
	{
		/**
		 * Allocates an empty Group element.
		 */
		function alloc (id?: string) : Group;

	}
}




/**
 * 	A scene is a set of containers, viewports and groups. Rendering is done in their specific index-based order.
 */
export class Scene
{
	/**
	 * Minimum dimensions of the scene (smallest container size).
	 */
	readonly minWidth: number;
	readonly minHeight: number;

	/**
	 * Maximum dimensions of the scene (largest container size).
	 */
	readonly maxWidth: number;
	readonly maxHeight: number;

	/**
	 * Active viewport bounds, used to select items in a visible region.
	 */
	readonly viewportBounds: Bounds2;

	/**
	 * First updater. Runs before any other update calls.
	 */
	readonly fupdater: Handler;

	/**
	 * General updater. Runs after the first updater and before synchronizer.
	 */
	readonly updater: Handler;

	/**
	 * Synchronizer. Run after general updater, and before viewport synchronization.
	 */
	readonly synchronizer: Handler;

	/**
	 * Last updater. Runs after all other update calls.
	 */
	readonly lupdater: Handler;

	/**
	 * Destroyer runs when the scene is destroyed.
	 */
	readonly destroyer: Handler;

	/**
	 * Current delta time. Set upon entering the `update` method. Reflects the same value as System.frameDelta.
	 */
	readonly dt: number;

	/**
	 * Total number of elements drawn on the last draw operation.
	 */
	readonly drawCount: number;

	/**
	 * Base depth (z-value) of the scene.
	 */
	readonly zvalue: number;

	/**
	 * Name of the layer.
	 */
	readonly name: string;

	/**
	 * Constructs an empty scene with the specified index.
	 * @param index - Index for the scene. Used to calculate the base z-value of the scene. Valid range is from 0 to 3.
	 * @param name - Name of the scene, used for debugging purposes. If none provided SCENE_X will be used where X is the scene's index.
	 */
	constructor (index: number, name?: string);

	/**
	 * Clears the scene by removing all groups and clearing the containers, leaving only viewports alive.
	 */
	clear() : void;

	/**
	 * Returns the value of the `visible` flag.
	 */
	visible() : boolean;

	/**
	 * Sets the value of the `visible` flag.
	 */
	visible(value: boolean) : Container;

	/**
	 * Sets a container at the specified index.
	 * @param index - Index of the container, valid range is from 0 to 15.
	 */
	setContainer (index: number, container: Container) : Scene;

	/**
	 * Returns the container at the specified index.
	 */
	getContainer (index: number) : Container;

	/**
	 * Sets a viewport at the specified index.
	 */
	setViewport (index: number, viewport: Viewport) : Scene;

	/**
	 * Returns the viewport at the specified index.
	 */
	getViewport (index: number) : Viewport;

	/**
	 * Adds the given element to the disposal queue. To be destroyed on the next call to `disposeQueued`.
	 */
	disposeLater (elem: Element) : void;

	/**
	 * Disposes all elements in the disposal queue.
	 */
	disposeQueued() : void;

	/**
	 * Adds a group to the scene.
	 */
	addGroup (group: Group) : boolean;

	/**
	 * Removes a group from the scene.
	 */
	removeGroup (group: Group) : Group;

	/**
	 * Syncs the actual location of the specified element with its storage location. Returns `true` if successful.
	 */
	sync (group: Group) : boolean;

	/**
	 * Draws the scene, by executing the `draw` method on each container. The entire scene will be drawn once for each viewport, and
	 * the visible region rules of each viewport will be applied.
	 */
	draw (g: Canvas) : void;

	/**
	 * Draws the scene containers and passes the specified viewport bounds to the container.
	 */
	drawContainers (g: Canvas, viewportBounds: Bounds2) : void;

	/**
	 * Runs a scene update cycle.
	 */
	update (dt: number) : void;

}

/**
 * 	An updater is used to update one or more elements and synchronize their position with their container.
 */
export class Updater
{
	/**
	 * 	Scene where the updater is attached.
	 */
	readonly scene: Scene;

	/**
	 * 	Constructs the updater linked to the specified scene.
	 */
	constructor (scene: Scene, update: (elem: Element, dt: number, context: object) => boolean, context?: object);

	/**
	 * 	Resets the updater by removing all elements.
	 */
	reset () : Updater;

	/**
	 * 	Clears the updater by destroying all elements.
	 */
	clear () : Updater;

	/**
	 * 	Sets the pre-update callback.
	 */
	preupdate (callback: (list: List, dt: number, updater: Updater) => Updater) : Updater;

	/**
	 * 	Sets the post-update callback.
	 */
	postupdate (callback: (list: List, dt: number, updater: Updater) => Updater) : Updater;

	/**
	 * 	Adds an element to the updater.
	 */
	add (elem: Element) : Element;

	/**
	 * 	Removes an element from the updater.
	 */
	remove (elem: Element) : Element;

	/**
	 * 	Runs an update cycle.
	 */
	update (dt: number) : void;

}

/**
 * 	A simple container is a container that uses a linked-list to storage the elements.
 */
export class SimpleContainer extends Container
{
	/**
	 * List containing the elements.
	 */
	readonly list: List;

	/**
	 * Constructs the simple container with the specified size.
	 */
	constructor (width: number, height: number);

	/**
	 * Constructs the simple container.
	 */
	constructor ();

	/**
	 * Syncs the actual location of the specified element with its storage location. Returns true if successful.
	 */
	override sync (elem: Element) : boolean;

	/**
	 * Clears the container to empty. All contained elements will be destroyed.
	 */
	override clear() : void;

	/**
	 * Resets the container to empty. Contained elements are not destroyed. Use `clear` if that is your intention.
	 */
	override reset() : void;

	/**
	 * Adds an element to the container.
	 */
	override add (elem: Element) : Element;

	/**
	 * Removes an element from the container and returns it.
	 */
	override remove (elem: Element) : Element;

	/**
	 * Actually draws the contained elements. Does not take the active viewport into account (hence simple container).
	 */
	override render() : void;

}
/**
 * 	A grid container is a container that uses an optimized spatial grid structure to store the elements.
 */
export class GridContainer extends Container
{
	/**
	 * 	Grid containing the elements.
	 */
	readonly grid: Grid;

	/**
	 * 	Indicates if the container bound should be drawn.
	 */
	debugBounds: boolean;

	/**
	 * 	Constructs the grid container with the default size (32768x32768) and divisor (64).
	 */
	constructor ();

	/**
	 * 	Constructs the grid container with the specified size and divisor.
	 */
	constructor (width: number, height: number, divisorX: number, divisorY?: number);

	/**
	 * 	Syncs the actual location of the specified element with its storage location. Returns true if successful.
	 */
	override sync (elem: Element) : boolean;

	/**
	 * 	Clears the container to empty. All contained elements will be destroyed.
	 */
	override clear() : void;

	/**
	 * 	Resets the container to empty. Contained elements are not destroyed. Use `clear` if that is your intention.
	 */
	override reset() : void;

	/**
	 * 	Adds an element to the container. Returns boolean indicating if successful.
	 */
	override add (elem: Element) : Element;

	/**
	 * 	Removes an element from the container and returns it.
	 */
	override remove (elem: Element) : Element;

	/**
	 * 	Actually draws the contained elements.
	 */
	override render() : void;

	/**
	 * 	Executes the specified callback for each element that intersects the given bounds and has the specified flags set. The process is
	 * 	immediately stopped if the callback returns `false`.
	 */
	forEachInRegion (bounds: Bounds2|Rect, flagsAndMask: number, flagsValue: number, callback: (elem: Element, context?: object) => boolean, context?: object) : void;

	/**
	 * 	Collects all elements that intersect the given bounds and have the specified flags set. Returns a new List, remember to call `free` after using it.
	 */
	selectInRegion (bounds: Bounds2|Rect, flagsAndMask: number, flagsValue: number) : List;

	/**
	 * 	Counts all elements that intersect the given bounds and have the specified flags set.
	 */
	countInRegion (bounds: Bounds2|Rect, flagsAndMask: number, flagsValue: number) : number;

	/**
	 * 	Returns the first element that intersect the given bounds and have the specified flags set.
	 */
	selectFirst (bounds: Bounds2|Rect, flagsAndMask: number, flagsValue: number) : Element;

}

/**
 * 	Describes an object that can be drawn to a Canvas.
 */
export class Drawable
{
	/**
	 * Image resource.
	 * @protected
	 */
	readonly resource: Texture;

	/**
	 * Logical width of the drawable.
	 * @protected
	 */
	readonly width: number;

	/**
	 * Logical height of the drawable.
	 * @protected
	 */
	readonly height: number;

	/**
	 * Frame source X-offset in physical units.
	 * @protected
	 */
	readonly sx: number;

	/**
	 * Frame source Y-position in physical units.
	 * @protected
	 */
	readonly sy: number;

	/**
	 * Frame source width in physical units.
	 * @protected
	 */
	readonly swidth: number;

	/**
	 * Frame source height in physical units.
	 * @protected
	 */
	readonly sheight: number;

	/**
	 * Initializes the instance.
	 */
	constructor();

	/**
	 * Returns the actual independent drawable object.
	 */
	getDrawable(): Drawable;

	/**
	 * Returns the underlying Image object, can be used directly with Canvas.drawImage.
	 * @deprecated
	 * TODO remove in next major version
	 */
	getImage(): Texture;

	/**
	 * Returns the underlying texture object.
	 */
	getTexture(): Texture;

	/**
	 * Resizes the logical dimensions of the drawable.
	 */
	resize (width: number|boolean|null, height: number|boolean|null) : Drawable;

	/**
	 * Draws the drawable on the canvas.
	 */
	draw (g: Canvas, x: number, y: number, width?: number|null, height?: number|null) : void;

	/**
	 * Draws a section of the drawable on the canvas using full parameters.
	 */
	drawf (g: Canvas, sx:number, sy:number, swidth:number, sheight:number, tx:number, ty:number, twidth:number, theight:number, fwidth?:number|null, fheight?:number|null) : void;

	/**
	 * Renders the drawable for the specified element.
	 */
	render (g: Canvas, elem: Element) : void;

	/**
	 * Drawable made with a composition of tiles from a nine-slice spritesheet to create a rectangle.
	 */
	static nineSlice (spritesheet: object, startingIndex?:number|0) : Drawable;

	/**
	 * Drawable made with a composition of tiles from a nine-slice spritesheet to create a rectangle.
	 */
	nineSlice (startingIndex?:number|0) : Drawable;

	/**
	 * Drawable tiles to the target size.
	 */
	static repeated (drawable: Drawable) : Drawable;

	/**
	 * Drawable tiles to the target size.
	 */
	repeated () : Drawable;

	/**
	 * Drawable clipped to the target size.
	 */
	static clipped (drawable: Drawable) : Drawable;

	/**
	 * Drawable clipped to the target size.
	 */
	clipped () : Drawable;

	/**
	 * Drawable centered to the target rectangle.
	 */
	static centered (drawable: Drawable, offsX?: number, offsY?: number) : Drawable;

	/**
	 * Drawable centered to the target rectangle.
	 */
	centered (offsX?: number, offsY?: number) : Drawable;

	/**
	 * Drawable as-is without stretching it.
	 */
	static static (drawable: Drawable, offsX?: number, offsY?: number) : Drawable;

	/**
	 * Drawable as-is without stretching it.
	 */
	static (offsX?: number, offsY?: number) : Drawable;

	/**
	 * Creates a drawable group.
	 */
	static group (...args: Array<Drawable>) : Drawable;

	/**
	 * Drawable mirrored horizontally.
	 */
	static mirrorX (drawable: Drawable) : Drawable;

	/**
	 * Drawable mirrored horizontally.
	 */
	mirrorX () : Drawable;

	/**
	 * Drawable mirrored vertically.
	 */
	static mirrorY (drawable: Drawable) : Drawable;

	/**
	 * Drawable mirrored vertically.
	 */
	mirrorY () : Drawable;

}

export namespace Drawable
{
	export namespace Pool
	{
		/**
		 * Allocates a drawable object.
		 */
		function alloc () : Drawable;

	}
}

/**
 * 	Describes an element mask. Used for collision detection.
 */
export class Mask extends Element
{
	/**
	 * 	Type of the mask (user defined).
	 */
	type: number;

	/**
	 * 	Constructs the Mask element.
	 */
	constructor (type: number, x: number, y: number, width: number, height: number);

	/**
	 * 	Draws the element on the specified canvas.
	 */
	draw (g: Canvas) : void;

}

export namespace Mask
{
	export namespace Pool
	{
		/**
		 * 	Allocates a new Mask element.
		 */
		function alloc (type: number, x: number, y: number, width: number, height: number) : Mask;

	}
}
/**
 * Describes an element that can be rendered to the screen.
 */
export class Label extends Element
{
	/**
	 * Text to render.
	 */
	readonly text: string;

	/**
	 * Spritefont resource.
	 */
	readonly font: object;

	/**
	 * Current text width.
	 */
	readonly textWidth: number;

	/**
	 * Current text height.
	 */
	readonly textHeight: number;

	/**
	 * Constructs a label element at the specified position with the given text.
	 */
	constructor (x: number, y: number, font: object, text: string);

	/**
	 * Sets the horizontal alignment value of the label.
	 * @param value - Use -1 for LEFT, 0 for CENTER, and 1 for RIGHT.
	 */
	align (value: number) : Label;

	/**
	 * Sets the vertical alignment value of the label.
	 * @param value - Use -1 for TOP, 0 for MIDDLE, and 1 for BOTTOM.
	 */
	valign (value: number) : Label;

	/**
	 * Sets the text value of the label.
	 */
	setText (value: string) : Label;

	/**
	 * Sets the font resource to use.
	 */
	setFont (font: object) : Label;

	/**
	 * Moves the label by the specified deltas.
	 * @param upscaled - When `true` the `dx` and `dy` parameters are assumed to be upscaled.
	 */
	translate (dx: number, dy: number, upscaled?: boolean) : Group;

}

export namespace Label
{
	export namespace Pool
	{
		/**
		 * Allocates a label element at the specified position with the given text.
		 */
		function alloc (x: number, y: number, font: object, text: string) : Label;

	}
}
export namespace KeyboardHandler
{
	type Handler =
	{
		/**
		 * Executed when the handler is attached.
		 */
		init?: () => void;

		/**
		 * Keyboard event handler.
		 */
		onKeyboardEvent: System.KeyboardEventHandler;

	}

}

/**
 * Used to attach keyboard event handlers to the system.
 */
export class KeyboardHandler
{
	/**
	 * Registers a keyboard event handler.
	 */
	static register (handler: KeyboardHandler.Handler) : KeyboardHandler.Handler;

	/**
	 * Removes a keyboard event handler.
	 */
	static unregister (handler: KeyboardHandler.Handler) : void;

}
export namespace PointerHandler
{
	type Handler =
	{
		/**
		 * Executed when the handler is attached.
		 */
		init?: () => void;

		/**
		 * Pointer event handler.
		 */
		onPointerEvent: System.PointerEventHandler;

	}

}

/**
 * Used to attach pointer event handlers to the system.
 */
export class PointerHandler
{
	/**
	 * Registers a pointer event handler.
	 */
	static register (handler: PointerHandler.Handler) : PointerHandler.Handler;

	/**
	 * Removes a pointer event handler.
	 */
	static unregister (handler: PointerHandler.Handler) : void;

}
export namespace ScreenControls
{
	type Handler =
	{
		/**
		 * Indicates if the pointer focus is locked once acquired, until the pointer is released.
		 */
		focusLock : boolean;

		/**
		 * Indicates if keyboard events are enabled for the object.
		 */
		keyboardEvents : boolean;

		/**
		 * Zindex of the object. Used only if ScreenControls has zindex-flag enabled.
		 */
		zindex : number;

		/**
		 * Returns `true` if the object contains the specified point (screen space).
		 */
		containsPoint (x: number, y: number) : boolean;

		/**
		 * Called when the PointerEventType.POINTER_DOWN event starts within the bounding box of the object.
		 */
		pointerActivate (pointer: System.Pointer) : void;

		/**
		 * Called when the PointerEventType.POINTER_UP event is fired when this object is already activated.
		 */
		pointerDeactivate (pointer: System.Pointer) : void;

		/**
		 * Executed when a pointer move/drag event happens while the object is activated.
		 */
		pointerUpdate (x: number, y: number, pointer: System.Pointer) : void;

		/**
		 * Executed when hover-flag is enabled and a pointer entered or left the host area.
		 */
		hover (status: boolean, pointer: System.Pointer) : void;

		/**
		 * Executed when `keyboardEvents` flag is enabled and a KeyboardEventType.KEY_DOWN event has happened.
		 */
		keyDown (keyCode: KeyCode, keyArgs: System.KeyboardState) : void;

		/**
		 * Executed when `keyboardEvents` flag is enabled and a KeyboardEventType.KEY_UP event has happened.
		 */
		keyUp (keyCode: KeyCode, keyArgs: System.KeyboardState) : void;

	}

}

export class ScreenControls
{
	/**
	 * Adds the specified handler to the screen controls list.
	 */
	static add (handler: ScreenControls.Handler) : void;

	/**
	 * Removes the specified handler from the screen controls list.
	 */
	static remove (handler: ScreenControls.Handler) : void;

	/**
	 * Returns the hover-enable flag.
	 */
	static hover() : boolean;

	/**
	 * Sets the hover-enable flag.
	 */
	static hover (value: boolean) : void;

	/**
	 * Returns the zindex-enable flag.
	 */
	static zindex() : boolean;

	/**
	 * Sets the zindex-enable flag.
	 */
	static zindex (value: boolean) : void;

}
export class Button extends Group
{
	/**
	 * 	Indicates if once focus is obtained it is locked until the user releases it.
	 * 	@default false
	 */
	focusLock: boolean;

	/**
	 * 	Indicates if keyboard events are enabled on this object.
	 * 	@default true
	 */
	keyboardEvents: boolean;

	/**
	 * 	Current pressed status of the button.
	 */
	isPressed: boolean;

	/**
	 * 	Previous pressed status of the button.
	 */
	wasPressed: boolean;

	/**
	 * 	Image to draw when the button is unpressed.
	 */
	unpressedImg: Drawable;

	/**
	 * 	Image to draw when the button is pressed.
	 */
	pressedImg: Drawable;

	/**
	 * 	Key code related to the button. Used only if not `null`.
	 * 	@default null
	 */
	keyCode: KeyCode;

	/**
	 * 	Hitbox element.
	 */
	readonly hitbox: Mask;

	/**
	 * 	Creates the button with the specified parameters. Automatically adds it to the screen controls.
	 */
	constructor (container: Container, x: number, y: number, unpressedImg?: Drawable, pressedImg?: Drawable);

	/**
	 * 	Sets the width and height of the button and the hitbox.
	 */
	resize (width: number, height: number) : GridElement;

	/**
	 * 	Resizes the button and hitbox by the specified deltas.
	 */
	resizeBy (deltaWidth: number, deltaHeight: number) : GridElement;

	/**
	 * 	Changes the pressed/unpressed images of the button.
	 */
	setImage (unpressedImg: Drawable, pressedImg?: Drawable) : Button;

	/**
	 * 	Changes the key code of the button.
	 */
	setKeyCode (value: KeyCode) : Button;

	/**
	 * 	Resets the button to its initial state.
	 */
	reset() : Button;

	/**
	 * 	Button pointer update event. Not required for the button control.
	 */
	pointerUpdate (pointerX: number, pointerY: number, pointer: object) : void;

	/**
	 * 	Sets the pressed state of the button.
	 */
	setStatus (value: boolean) : Button;

	/**
	 * 	Moves the `isPressed` value of the button to `wasPressed`, and updates `isPressed` with the given value. If none provided, `isPressed` is unchanged.
	 */
	updateStatus (value?: boolean) : Button;

	/**
	 * 	Called when the PointerEventType.POINTER_DOWN event starts within the bounding box of the button.
	 */
	pointerActivate (pointer: object) : void;

	/**
	 * 	Called when the PointerEventType.POINTER_UP event is fired with the "_ref" attribute pointing to this object.
	 */
	pointerDeactivate (pointer: object) : void;

	/**
	 * 	Returns `true` if the button contains the specified point.
	 */
	containsPoint (x: number, y: number) : boolean;

	/**
	 * 	Executed after any change in the status of the button. Be careful when overriding this, because when so, the `onTap`, `onButtonDown` and `onButtonUp` methods will not work.
	 */
	onChange (isPressed: boolean, wasPressed: boolean, button: Button) : void;

	/**
	 * 	Key down event, handles the keys that control the button.
	 */
	keyDown (keyCode: KeyCode, keyArgs: object) : boolean|null;

	/**
	 * 	Key up event, handles the keys that control the button.
	 */
	keyUp (keyCode: KeyCode, keyArgs: object) : boolean|null;

	/**
	 * 	Sets the handler for the on-change event. Executed when the button state changes. Setting this callback will cause onButtonDown,
	 * 	onButtonUp and onTap to no longer work. Set the callback to `null` to return it to the default state.
	 */
	onChange (callback: (isPressed: boolean, wasPressed: boolean, buttons: Button) => void) : Button;

	/**
	 * Sets the handler for the button-down event. Executed when the button is pressed. Fired only if the `onChange` method was not overriden.
	 */
	onButtonDown (callback: () => void) : Button;

	/**
	 * Executes the onButtonDown handler.
	 */
	onButtonDown() : void;

	/**
	 * 	Sets the handler for the button-up event. Executed when the button is released. Fired only if the `onChange` method was not overriden.
	 */
	onButtonUp (callback: () => void) : Button;

	/**
	 * Executes the onButtonUp handler.
	 */
	onButtonUp() : void;

	/**
	 * 	Sets the handler for the on-tap event. Executed when the button is tapped (pressed and then released). Fired only if the `onChange` method was not overriden.
	 */
	onTap (callback: () => void) : Button;

	/**
	 * Executes the onTap handler.
	 */
	onTap() : void;

}
export class Stick extends Group
{
	/**
	 * Indicates if once focus is obtained it is locked until the user releases it.
	 * @default true
	 */
	focusLock: boolean;

	/**
	 * Current pressed status of the stick.
	 */
	readonly isPressed: boolean;

	/**
	 * Previous pressed status of the stick.
	 */
	readonly wasPressed: boolean;

	/**
	 * Image to draw when the stick is unpressed (outer circle).
	 */
	readonly unpressedImg: Drawable;

	/**
	 * Image to draw when the stick is pressed (outer circle).
	 */
	readonly pressedImg: Drawable;

	/**
	 * Image to draw when the stick is unpressed (inner circle).
	 */
	readonly unpressedImgInner: Drawable;

	/**
	 * Image to draw when the stick is pressed (inner circle).
	 */
	readonly pressedImgInner: Drawable;

	/**
	 * Number of steps for the angle. Used to snap the stick movement to discrete steps.
	 */
	readonly angleSteps: number;

	/**
	 * Number of steps for the radius of the stick. Used to snap the stick movement to discrete steps.
	 */
	readonly radiusSteps: number;

	/**
	 * Raw direction in the X-axis.
	 */
	readonly rdirx: number;

	/**
	 * Raw direction in the Y-axis.
	 */
	readonly rdiry: number;

	/**
	 * Normalized direction in the Y-axis.
	 */
	readonly diry: number;

	/**
	 * Magnitude of the direction vector.
	 */
	readonly magnitude: number;

	/**
	 * Angle of the direction vector.
	 */
	readonly angle: number;

	/**
	 * Creates the stick with the specified parameters. Automatically adds it to the screen controls.
	 */
	constructor (container: Container, x: number, y: number, maxRadius: number, unpressedImg: Drawable, unpressedImgInner: Drawable, pressedImg?: Drawable, pressedImgInner?: Drawable);

	/**
	 * Binds the stick to the specified keycodes and enables keyboard events.
	 */
	bindKeys (up?: number, down?: number, left?: number, right?: number) : Stick;

	/**
	 * Returns the state of the keyboard events enable flag.
	 */
	keysEnabled () : Stick;

	/**
	 * Enables or disables keyboard interaction with the stick.
	 */
	keysEnabled (value: boolean) : Stick;

	/**
	 * Changes the pressed/unpressed images of the outer stick.
	 */
	setImage (unpressedImg: Drawable, pressedImg?: Drawable) : Stick;

	/**
	 * Changes the pressed/unpressed images of the inner stick.
	 */
	setImageInner (unpressedImg: Drawable, pressedImg?: Drawable) : Stick;

	/**
	 * Sets the number of angle-steps for the stick.
	 */
	setAngleSteps (n: number) : Stick;

	/**
	 * Sets the number of radius-steps for the stick.
	 */
	setRadiusSteps (n: number) : Stick;

	/**
	 * Sets the dead zone values (normalized).
	 */
	setDeadZone (deadZoneX: number, deadZoneY: number) : Stick;

	/**
	 * Resets the button to its initial state.
	 */
	reset() : Stick;

	/**
	 * Returns `true` if the stick contains the specified point.
	 */
	containsPoint (x: number, y: number) : boolean;

	/**
	 * Sets the direction of the stick, the provided deltas should be normalized in the [-1, 1] range.
	 */
	setDirection (dx: number, dy: number, deadZoneX?: number, deadZoneY?: number) : boolean;

	/**
	 * Saves the current state of the stick in the froxen state variables (fdirx, fdiry, etc). When the `lastValid` parameter is `true`, the values
	 * will be saved only if the current value of each field is not zero.
	 */
	freezeState (lastValid?: boolean) : Stick;

	/**
	 * Sets the handler for the on-change event. Executed after any change in the direction of the stick.
	 */
	onChange (callback: (dirx: number, diry: number, magnitude: number, angle: number, stick: Stick) => void) : Stick;

}
export namespace fxl
{
	export class sys
{
	/**
	 * Screen width (available after calling `init`).
	 */
	static readonly screenWidth: number;

	/**
	 * Screen height (available after calling `init`).
	 */
	static readonly screenHeight: number;

	/**
	 * Primary renderer (available after calling `init`).
	 */
	static readonly renderer: Canvas;

	/**
	 * Logical system time (mirrors the value of System.frameTime).
	 */
	static readonly time: number;

	/**
	 * Logical system delta time (mirrors the value of System.frameDelta).
	 */
	static readonly dt: number;

	/**
	 * Update handler executed on every frame start.
	 */
	static readonly update: Handler;

	/**
	 * Draw handler executed on every frame start.
	 */
	static readonly draw: Handler;

	/**
	 * Executed when the system is paused.
	 */
	static onPaused: (fromExternalEvent: boolean) => void;

	/**
	 * Executed when the system is resumed.
	 */
	static onResumed: (fromExternalEvent: boolean) => void;

	/**
	 * Initializes the system with the specified options.
	 */
	static init (options: System.Options) : Promise<void>;

	/**
	 * Initializes the system using the default options.
	 */
	static init () : Promise<void>;

	/**
	 * Pauses the system.
	 */
	static pause (fromExternalEvent?: boolean|false) : void;

	/**
	 * Resumes the system.
	 */
	static resume (fromExternalEvent?: boolean|false) : void;

	/**
	 * Creates a timeout callback.
	 */
	static timeout (duration: number, callback: Function, arg0?: any, arg1?: any, arg2?: any, arg3?: any) : Callback;

	/**
	 * Cancels a timeout callback.
	 */
	static cancelTimeout (callback: Callback) : void;

	/**
	 * Creates an interval callback.
	 */
	static interval (period: number, callback: Function, arg0?: any, arg1?: any, arg2?: any) : Callback;

	/**
	 * Cancels an interval callback.
	 */
	static cancelInterval (callback: Callback) : void;

	/**
	 * Creates a a time-span callback.
	 */
	static span (period: number, callback: (t:number, dt:number, ...args:any) => boolean, arg0?: any, arg1?: any, arg2?: any) : Callback;

	/**
	 * Cancels a time-span callback.
	 */
	static cancelSpan (callback: Callback) : void;

}
	/**
 * 	World system allows to manage scenes, containers, viewports and display elements.
 */
export class world
{
	/**
	 * World scene constants.
	 */
	static readonly SCENE_MAIN: number;
	static readonly SCENE_HUD: number;

	/**
	 * Default layers for the SCENE_MAIN scene.
	 */
	static readonly LAYER_BG0: number;
	static readonly LAYER_BG1: number;
	static readonly LAYER_BG2: number;
	static readonly LAYER_BG3: number;
	static readonly LAYER_BG4: number;
	static readonly LAYER_MAIN: number;
	static readonly LAYER_FG0: number;
	static readonly LAYER_FG1: number;
	static readonly LAYER_FG2: number;
	static readonly LAYER_FG3: number;
	static readonly LAYER_FG4: number;
	static readonly LAYER_MASK: number;

	/**
	 * Default layers for the SCENE_HUD scene.
	 */
	static readonly LAYER_HUD_BG0: number;
	static readonly LAYER_HUD_BG1: number;
	static readonly LAYER_HUD_BG2: number;
	static readonly LAYER_HUD_MAIN: number;
	static readonly LAYER_HUD_FG0: number;
	static readonly LAYER_HUD_FG1: number;
	static readonly LAYER_HUD_FG2: number;

	/**
	 * Active scene set by `selectScene`.
	 */
	static activeScene: Scene;

	/**
	 * Active viewport set by `selectViewport`.
	 */
	static activeViewport: Viewport;

	/**
	 * Active container set by `selectContainer`.
	 */
	static activeContainer: Container;

	/**
	 * Currently active group (set by `createGroup`).
	 */
	static activeGroup: Group;

	/**
	 * Last used group (set by `endGroup`).
	 */
	static lastGroup: Group;

	/**
	 * Last element created by `createElement`, or `createLabel`.
	 */
	static lastElement: Element;

	/**
	 * Dimensions of the world.
	 */
	static readonly bounds: Bounds2;

	/**
	 * Initializes the world with the default scenes, viewports and layers.
	 */
	static init (worldWidth?: number, worldHeight?: number, divisorX?: number, divisorY?: number) : void;

	/**
	 * Creates a scene at the specified index and automatically selects it.
	 */
	static createScene (index: number, name?: string) : Scene;

	/**
	 * Returns the scene at the specified index (or the active scene if no index provided).
	 */
	static getScene (index?: number) : Scene;

	/**
	 * Selects the active scene for subsequence scene-level operations.
	 */
	static selectScene (index: number) : boolean;

	/**
	 * Creates a viewport at the specified index, attaches it to the active scene and selects it. Use this only after attaching all
	 * containers to the scene or the `maxWidth` and `maxHeight` properties of the scene will not be properly set yet.
	 */
	static createViewport (index: number) : void;

	/**
	 * Returns a viewport given its index (or the active viewport if no index provided).
	 */
	static getViewport (index?: number) : Viewport;

	/**
	 * Selects the active viewport.
	 */
	static selectViewport (index: number) : boolean;

	/**
	 * Sets a container in the active scene at the specified index and returns it.
	 */
	static setContainer (index: number, container: Container) : Container;

	/**
	 * Returns the container at the specified index in the active scene (or the active container if no index provided).
	 */
	static getContainer (index?: number) : Container;

	/**
	 * Selects the active container.
	 */
	static selectContainer (index: number) : boolean;

	/**
	 * Changes the visibility of the LAYER_MASK to enable (or disable) mask bounds rendering.
	 * @param {boolean} value
	 * @param {boolean} allMasks If set to `false` only masks having `debugBounds` to non-false will be drawn.
	 */
	static showMasks (value: boolean, allMasks?: boolean) : void;

	/**
	 * Creates a group in the active scene and selects it as the active group.
	 */
	static createGroup (id?: string) : Group;

	/**
	 * If coordinates are provided the group will be translated to the specified position. It will then set `lastGroup`, and nullify `activeGroup`.
	 */
	static endGroup (x?: number, y?: number) : Group;

	/**
	 * Creates a named Element and adds it to the specified container (or the active one) in the active scene.
	 * If a group is active, the element will be attached to the group.
	 */
	static createElement (id: string, x: number, y: number, img?: Drawable, containerIndex?: number) : Element;

	/**
	 * Creates an Element and adds it to the specified container (or the active one) in the active scene.
	 * If a group is active, the element will be attached to the group.
	 */
	static createElement (x: number, y: number, img?: Drawable, containerIndex?: number) : Element;

	/**
	 * Creates a named mask and adds it to the specified container or LAYER_MASK if none provided.
	 * If a group is active, the mask will be attached to the group.
	 */
	static createMask (id: string, type: number, x?: number, y?: number, width?: number, height?: number, containerIndex?: number) : Mask;

	/**
	 * Creates a named label element and adds it to the specified container (or the active one) in the active scene.
	 * If a group is active, the label element will be attached to the group.
	 */
	static createLabel (id: string, x: number, y: number, font: object, text: string, containerIndex?: number) : Label;

	/**
	 * Creates a label element and adds it to the specified container (or the active one) in the active scene.
	 * If a group is active, the label element will be attached to the group.
	 */
	static createLabel (x: number, y: number, font: object, text: string, containerIndex?: number) : Label;

	/**
	 * Creates a new updater, attaches it to the active scene and returns it.
	 */
	static createUpdater (update?: (elem: Element, dt: number, context: object) => boolean, context?: object) : Updater;

}
	/**
 * Registered resources. Initially these are resource descriptors, but after a call to `res.load` these will be fully loaded resources.
 */
const r : { [key: string]: any };
	export namespace res
{
	type AnimationResource =
	{
		/**
		 * Sets the default FPS value.
		 */
		fps (value: number) : AnimationResource;

		/**
		 * Defines an animation sequence.
		 */
		seq (sequenceName: string, isLoop: boolean, frameGroup: string, fps?: number) : AnimationResource;

		/**
		 * Defines a transition sequence.
		 */
		trans (sourceSequenceName: string, destinationSequenceName: string, frameGroup: string) : AnimationResource;

		/**
		 * Sets the default animation sequence.
		 */
		def (sequenceName: string) : AnimationResource;

	}

	type SpritesheetResource =
	{
		/**
		 * Adds a frame to the spritesheet given its coordinates.
		 */
		frame (x: number, y: number, width: number, height: number) : SpritesheetResource;

	}

}

export class res
{
	/**
	 * Configures the resources object with the specified options.
	 */
	static config (options: Resources.ConfigOptions) : void;

	/**
	 * Loads all registered resources that have not been loaded yet.
	 */
	static load (progressCallback?: (t: number, name: string) => void) : Promise<void>;

	/**
	 * Returns a resource given its identifier.
	 */
	static get (id: string) : object;

	/**
	 * Registers a solid-color resource.
	 */
	static color (id: string, color: string, width: number, height: number) : Texture;

	/**
	 * Registers a custom drawable resource.
	 */
	static custom (id: string, width: number, height: number, drawFunction: (g: Canvas) => void) : Texture;

	/**
	 * Registers an image resource.
	 */
	static image (id: string, path: string, opts?: object) : Texture;

	/**
	 * Registers a multi image resource.
	 * @param id - Resource identifier.
	 * @param path - Path to the source file. Ensure to add the "#" marks to replace the file index (i.e. "image-##.png").
	 * @param count - Number of images to load (from 0 to count-1).
	 */
	static images (id: string, path: string, count: number, frameWidth?: number, frameHeight?: number, configOptions?: object, resOptions?: object) : object;

	/**
	 * Registers an spritesheet resource.
	 * @param id - Resource identifier.
	 * @param path - Path to the source file.
	 */
	static spritesheet (id: string, path: string, frameWidth: number, frameHeight: number, numFrames?: number, configOptions?: object, resOptions?: object) : res.SpritesheetResource;

	/**
	 * Registers an spritesheet resource.
	 * @param id - Resource identifier.
	 * @param path - Path to the source file.
	 * @param coords - Array of coordinates of each frame.
	 */
	static spritesheet (id: string, path: string, frameWidth: number, frameHeight: number, coords: Array<>, configOptions?: object, resOptions?: object) : res.SpritesheetResource;

	/**
	 * Registers a spritesheet animation resource.
	 * @param id - Resource identifier.
	 * @param path - Path to the source file.
	 */
	static animation (id: string, path: string, frameWidth: number, frameHeight: number, numFrames?: number, configOptions?: object, resOptions?: object) : res.AnimationResource;

	/**
	 * Registers a spritefont animation resource.
	 * @param id - Resource identifier.
	 * @param path - Path to the source file.
	 */
	static spritefont (id: string, path: string, charWidth: number, charHeight: number, charset: string, optsA?: object, optsB?: object) : object;

	/**
	 * Registers a JSON data resource.
	 * @param id - Resource identifier.
	 * @param path - Path to the source file.
	 */
	static json (id: string, path: string, opts?: object) : object;

	/**
	 * Registers a binary data resource.
	 * @param id - Resource identifier.
	 * @param path - Path to the source file.
	 */
	static data (id: string, path: string, opts?: object) : object;

	/**
	 * Registers a text data resource.
	 * @param id - Resource identifier.
	 * @param path - Path to the source file.
	 */
	static text (id: string, path: string, opts?: object) : object;

	/**
	 * Registers a sound effect audio resource.
	 * @param id - Resource identifier.
	 * @param path - Path to the source file.
	 */
	static sfx (id: string, path: string, opts?: object) : object;

	/**
	 * Registers a multi sound effect audio resource.
	 * @param id - Resource identifier.
	 * @param path - Path to the source file. Ensure to add the "#" marks to replace the file index (i.e. "sound-##.ogg").
	 * @param count - Number of sounds to load (from 0 to count-1).
	 * @param mode - Playback mode, can be `sequential` (default) or `random`.
	 */
	static sfxm (id: string, path: string, count: number, mode?: string) : object;

	/**
	 * Registers an music audio resource.
	 * @param id - Resource identifier.
	 * @param path - Path to the source file.
	 */
	static music (id: string, path: string) : object;

}
	export namespace input
{
	export class Gamepad
{
	/**
	 * Contains the sticks of the gamepad.
	 */
	readonly sticks: { [key:string]: Stick };

	/**
	 * Contains the buttons of the gamepad.
	 */
	readonly buttons: { [key:string]: Button };

	/**
	 * Group containing all elements (buttons, sticks or user-added elements) that belong to the gamepad.
	 */
	readonly group: Group;

	/**
	 * Constructs a new gamepad object.
	 */
	constructor (scene: Scene, containerIndex: number);

	/**
	 * Creates a new stick control and adds it to the gamepad.
	 */
	addStick (id: string, x: number, y: number, outerDrawable: Drawable, innerDrawable: Drawable, maxRadius?: number|0) : Stick;

	/**
	 * Creates a new button control and adds it to the gamepad.
	 */
	addButton (id: string, x: number, y: number, unpressedDrawable?: Drawable|null, pressedDrawable?: Drawable|null) : Button;

	/**
	 * Returns the `visible` property of the gamepad.
	 */
	visible() : boolean;

	/**
	 * Sets the `visible` property of the gamepad.
	 */
	visible (value: boolean) : Gamepad;

	/**
	 * Sets the `visible` property of all masks to the specified value.
	 */
	showMasks (value: boolean) : Gamepad;

}
	type PointerCallback = (action: System.PointerEventType, pointer: System.Pointer, arg0?: any, arg1?: any, args2?: any) => void;
	type KeyboardCallback = (action: System.KeyboardEventType, keyCode: KeyCode, keyState: System.KeyboardState, arg0?: any, arg1?: any, args2?: any) => void;
}

export class input
{
	/**
	 * Currently active gamepad.
	 */
	static activeGamepad: input.Gamepad;

	/**
	 * Last created button.
	 */
	static lastButton: Button;

	/**
	 * Last created stick.
	 */
	static lastStick: Stick;

	/**
	 * Pointer related functions.
	 */
	static pointer: {

	/**
	 * Adds a callback to the pointer event dispatcher.
	 */
	add: (callback: fxl.input.PointerCallback, arg0?: any, arg1?: any, arg2?: any) => Callback;

	/**
	 * Removes a callback from the pointer event dispatcher.
	 * @param {Callback} callback - The node returned by the `add` method.
	 */
	remove: (callback: Callback) => void;

	};
	/**
	 * Keyboard related functions.
	 */
	keyboard: {

	/**
	 * Adds a callback to the keyboard event dispatcher.
	 */
	add: (callback: fxl.input.KeyboardCallback, arg0?: any, arg1?: any, arg2?: any) => Callback;

	/**
	 * Removes a callback from the keyboard event dispatcher.
	 * @param {Callback} callback - The node returned by the `add` method.
	 */
	remove: (callback: Callback) => void;

	};
	/**
	 * Creates a gamepad object and attaches it to the SCENE_HUD in the specified layer (defaults to LAYER_HUD_MAIN).
	 */
	static createGamepad (index: number, layerIndex?: number) : input.Gamepad;

	/**
	 * Returns a gamepad given its index.
	 */
	static getGamepad (index: number) : input.Gamepad;

	/**
	 * Selects the active gamepad for subsequent gamepad-level operations.
	 */
	static selectGamepad (index: number) : boolean;

	/**
	 * Sets the value of `debugBounds` on the specified gamepad. If index is `null`, all gamepads will be selected.
	 */
	static debugGamepad (index: number, value: boolean) : void;

	/**
	 * Adds an stick control to the active gamepad.
	 */
	static stick (id: string, x: number, y: number, outerDrawable: Drawable, innerDrawable: Drawable, maxRadius?: number|0) : Stick;

	/**
	 * Adds a button control to the active gamepad.
	 */
	static button (id: string, x: number, y: number, unpressedDrawable?: Drawable|null, pressedDrawable?: Drawable|null) : Button;

}
	export class collider
{
	/**
	 * 	Flag used to exclude from collision checks.
	 */
	static readonly FLAG_EXCLUDE: number;

	/**
	 *	First updater.
	 */
	static fupdater: Handler;

	/**
	 *	Last updater.
	 */
	static lupdater: Handler;

	/**
	 *	Flags used to filter elements.
	 */
	static flagsAnd: number;
	static flagsValue: number;

	/**
	 *	Current collider state fields.
	 */
	static state: {

	/**
	 * 	Contact area.
	 */
	contact: Bounds2;

	/**
	 * 	Contact flags.
	 */
	flags: collider.Contact;

	/**
	 * 	Final delta value for X-coordinate calculated by `translate`.
	 */
	dx: number;

	/**
	 * 	Final delta value for Y-coordinate calculated by `translate`.
	 */
	dy: number;

	}
	/**
	 *	Enables the collider system on the specified scene and layer.
	 * 	@param sceneIndex - Scene to attach the collider updater methods. Uses world.SCENE_MAIN if none specified.
	 * 	@param layerIndex - Index within the scene of the layer where element masks are stored. Uses world.LAYER_MASK if none specified.
	 */
	static enable (sceneIndex?: number, layerIndex?: number) : void;

	/**
	 *	Disables the collider system.
	 */
	static disable() : void;

	/**
	 * 	Utility object containing actions that are executed later on the next update cycle.
	 */
	static later: {

	/**
	 *	Runs the specified callback.
	 */
	run (elem: Element, callback: Function, arg1?: any, arg2?: any, arg3?: any) : void;

	/**
	 *	Sets the element's visibility flag.
	 */
	setVisible (elem: Element, value: boolean) : void;

	/**
	 *	Sets an attribute of an object to a given value.
	 */
	setValue (obj: Object, name: string, value: any) : void;

	/**
	 *	Sets the element's flags.
	 */
	setFlags (elem: Element, value: number) : void;

	/**
	 *	Clears the element's flags.
	 */
	clearFlags (elem: Element, value: number) : void;

	}
	/**
	 * 	Adds a contact rule.
	 * 	@param primaryType - Type of the primary element.
	 * 	@param secondaryType - Type of the secondary element.
	 * 	@param callback - Callback to execute when contact is detected.
	 * 	@param context - Optional value passed as last parameter to the callback.
	 */
	static contact (primaryType: number, secondaryType: number, callback: (primary: Mask, secondary: Mask, context?: any) => void, context?: any) : collider;

	/**
	 * 	Adds a truncation rule.
	 * 	@param primaryType - Type or super-type of the primary element.
	 * 	@param secondaryType - Type or super-type of the secondary element.
	 * 	@param value - Indicates the status of the truncation rule.
	 */
	static truncate (primaryType: number, secondaryType: number, value: boolean) : collider;

	/**
	 * 	Loads the contact flags in the collider state.
	 */
	static getContactFlags (boundsA: Bounds2, boundsB: Bounds2) : number;

	/**
	 * 	Attempts to move the specified group by the given deltas. Any collisions detected on the mask will trigger the respective actions.
	 * 	@param mask - Mask element.
	 * 	@param dx - X delta value.
	 * 	@param dy - Y delta value.
	 */
	static translate (mask: Mask, dx: number, dy: number) : void;

	/**
	 * 	Attempts to move the specified group by the given deltas. Any collisions detected on the mask will trigger the respective actions.
	 * 	@param mask - Mask element.
	 * 	@param group - Group where the mask is stored.
	 * 	@param dx - X delta value.
	 * 	@param dy - Y delta value.
	 */
	static translate (mask: Mask, group: Group, dx: number, dy: number) : void;

	/**
	 *	Scans for collisions against the specified mask.
	 * 	@param mask - Mask element.
	 */
	static scan (mask: Mask) : void;

	/**
	 *	Scans for collisions against the specified mask.
	 * 	@param mask - Mask element.
	 * 	@param group - Group where the mask is stored.
	 */
	static scan (mask: Mask, group: Group) : void;

}

export namespace collider
{
	enum Contact
	{
		LEFT,
		RIGHT,
		HORIZONTAL,
		TOP,
		BOTTOM,
		VERTICAL,
	}

}
}
export default fxl;