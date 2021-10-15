//@ts-check
export class Random
{
	/**
	 * 	Seed value of the generator. Remains constant throughout the life of the generator.
	 */
	seed: number;

	/**
	 * 	Last value returned by the generator.
	 */
	last: number;

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
export enum KeyCodes
{
	BACKSPACE,
	TAB,
	ENTER,
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
}
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

}
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
	magnitude() : number;

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


export class Shader
{
	/**
	 *	Constructs an empty shader. Attach GLSL code by using the `source` method.
	 *
	 * 	@param id - Identifier of the shader.
	 * 	@param type - One of the constants from the Shader.Type enum.
	 */
	constructor (id: string, type: Shader.Type);

	/**
	 * 	Appends GLSL code to the shader's source code buffer.
	 */
	source (value: string) : Shader;

	/**
	 * 	Compiles the shader. Errors can be obtained using getError() method.
	 */
	compile() : void;

	/**
	 * 	Returns the error of the last compile operation.
	 */
	getError() : string;

}

export namespace Shader
{
	enum Type
	{
		VERTEX,
		FRAGMENT,
		GEOMETRY,
	}

	/**
	 * 	Stores a shader with the specified identifier in the global shader map.
	 */
	function put (id: string, shader: Shader) : void;

	/**
	 * 	Returns a Shader given its identifier.
	 */
	function get (id: string) : Shader;

	/**
	 * 	Removes a shader from the global shader map.
	 */
	function remove (id: string) : void;

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
	 * 	Prepares an image to use it on the canvas. Used only when GL mode is active.
	 */
	prepareImage (image: HTMLImageElement) : boolean;

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
	static renderImage (width: number, height: number, draw: (g: Canvas) => void, completed: (img: HTMLImageElement) => void) : void;

}

export namespace System
{
	type DisplayOrientation = 'default'|'landscape'|'portrait'|'automatic';
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
		orientation?: System.DisplayOrientation;

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
		 *	Indicates which method to use to find the target resolution, using `fullscreen` object when `true`, or the `window` object when `false`.
		 *	@default false
		 */
		fullscreen?: boolean;

	}

}

export class System
{
	/**
	 * 	Screen width, available only after the system has been initialized.
	 */
	static readonly screenWidth: number;

	/**
	 * 	Screen height, available only after the system has been initialized.
	 */
	static readonly screenHeight: number;

	/**
	 * 	Current display orientation.
	 */
	static readonly orientation: System.DisplayOrientation;

	/**
	 * 	Initial transformation matrix. Should be used (if needed) instead of `loadIdentity` since the System does some transformations first.
	 */
	static readonly initialMatrix: Matrix;

	/**
	 * 	Primary renderer.
	 */
	static readonly renderer: Canvas;

	/**
	 * 	Secondary display buffer (always 2D). Has the same initial transformation matrix as the primary display buffer.
	 */
	static readonly displayBuffer2: Canvas;

	/**
	 * 	Terciary display buffer (always 2D). Is assured to have 1:1 with the screen size, initial transformation matrix not applied.
	 */
	static readonly displayBuffer3: Canvas;

	/**
	 * 	The frame delta is multiplied by this value before each system cycle (defaults to 1).
	 */
	static timeScale: number;

	/**
	 * 	Frame interval in milliseconds.
	 */
	static readonly frameInterval: number;

	/**
	 * 	Fixed frame interval in milliseconds, when set to non-zero value the frame delta will always be set to this value.
	 */
	static fixedFrameInterval: number;

	/**
	 * 	Maximum frame interval in milliseconds, if the `frameDelta` exceeds this, it will be truncated to this value. Controlled by the `minFps` value
	 * 	of the system initialization options.
	 */
	static readonly maxFrameInterval: number;

	/**
	 * 	Last frame delta in seconds.
	 */
	static readonly frameDelta: number;

	/**
	 * 	Logical system time in seconds. Updated on each cycle by the calculated `frameDelta`.
	 */
	static readonly frameTime: number;

	/**
	 * 	Current frame number.
	 */
	static readonly frameNumber: number;

	/**
	 * 	Initializes the system with the specified configuration options.
	 */
	static init (options: System.Options) : void;

	/**
	 * 	Returns the current logical time in seconds (same as reading `System.frameTime`).
	 */
	static time() : number;

	/**
	 * 	Starts the system and enables rendering and updates.
	 */
	static start() : void;

	/**
	 * 	Stops the system by disabling both rendering and updates.
	 */
	static stop() : void;

	/**
	 * 	Pauses the system by disabling updates, but rendering will be continued.
	 */
	static pause() : void;

	/**
	 * 	Resumes the system after previously being paused with `pause` method.
	 */
	static resume() : void;

	/**
	 * 	Event triggered when the canvas was resized by the system. Can be overriden.
	 */
	static onCanvasResized (screenWidth: number, screenHeight: number) : void;

	/**
	 * 	Adds the specified update handler to the system.
	 */
	updateQueueAdd (handler: { update: (dt: number) => void }) : Linkable;

	/**
	 * 	Removes the specified update handler from the system.
	 */
	updateQueueRemove (handler: { update: (dt: number) => void }) : void;

	/**
	 * 	Removes the specified update handler node from the system.
	 */
	updateQueueRemove (node: Linkable) : void;

	/**
	 * 	Adds the specified draw handler to the system.
	 */
	drawQueueAdd (handler: { draw: (g: Canvas) => void }) : Linkable;

	/**
	 * 	Removes the specified draw handler from the system.
	 */
	drawQueueRemove (handler: { draw: (g: Canvas) => void }) : void;

	/**
	 * 	Removes the specified draw handler node from the system.
	 */
	drawQueueRemove (node: Linkable) : void;

	/**
	 * 	Adds the specified handler to the update and draw queues.
	 */
	queueAdd (handler: { update: (dt: number) => void, draw: (g: Canvas) => void }) : void;

	/**
	 *	Removes the specified handler from the update and draw queues.
	 */
	queueRemove (handler: { update: (dt: number) => void, draw: (g: Canvas) => void }) : void;

	/**
	 * 	Interpolates numeric values between two objects (`src` and `dst`) using the specified `duration` and `easing` function. Note that all four parameters `src`, `dst`,
	 * 	`duration` and `easing` must be objects having the same number of values.
	 */
	interpolate (src: object, dst: object, duration: object, easing: object, callback: (data: object, isFinished: boolean) => void) : void;

}

export namespace System
{
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
	}

}

export namespace Log
{
	/**
	 * 	Indicates if the log module is enabled.
	 */
	let activated: boolean;

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
	 * 	@param normalized - When `true` the `w` and `h` will be treated as normalized ranging from 0 to 1 (inclusive).
	 * 	@param topLeftRelative - When `true` reference will be top-left corner, set to `false` to use the center.
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
	 * 	Sets the container bounds. Used to ensure the viewport bounds are never outside these limits.
	 */
	setContainerBounds (x1: number, y1: number, x2: number, y2: number) : Viewport;

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
	resize (width: number, height: number) : Viewport;

	/**
	 * 	Resizes the viewport by the specified deltas.
	 */
	resizeBy (dWidth: number, dHeight: number) : Viewport;

	/**
	 * 	Sets the position of the viewport's center within the world and resets the relative offset to zero.
	 */
	setPosition (x: number, y: number) : Viewport;

	/**
	 * 	Sets the position of the viewport relative to the current focus point.
	 */
	setOffsets (dx: number, dy: number) : Viewport;

	/**
	 * 	Sets the scale of the viewport.
	 */
	setScale (value: number) : Viewport;

	/**
	 * 	Sets the global scale of the viewport.
	 */
	setGlobalScale (value: number) : Viewport;

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
	 * 	Updates the viewport.
	 */
	update (dt?: number) : void;

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
export namespace globals
{
	/**
	 * 	Renderer's GL context.
	 */
	let gl: WebGL2RenderingContext;

	/**
	 * 	Global system time, updated once per frame. Mirrors the `System.frameTime` property.
	 */
	let time: number;

	/**
	 * 	Active viewport (if any). Set by the `draw` method of the `Scene` class.
	 */
	let viewport: Viewport;

	/**
	 * 	Indicates if the element bounds should be drawn. Used by the `Element` class.
	 */
	let debugBounds: boolean;

	/**
	 * 	Global random generators. Only `rand0` is used by the global random functions. The `rand1` and `rand2` can be used manually if desired.
	 */
	const rand0: Random;
	const rand1: Random;
	const rand2: Random;

}

declare global
{
	/**
	 * 	Converts the given pixel-value to actual screen pixels taking into account the current scale.
	 */
	function px (value: number) : number;

	/**
	 * 	Disposes an object by running the first method that is found in the following order: `free`, `dispose` and finally `__dtor`.
	 */
	function dispose (obj: object) : void;

	/**
	 * 	Global audio context obtained when the system is initialized.
	 */
	let audioContext: AudioContext;

	/**
	 * 	Similar to `fetch` but uses XMLHttpRequest because in some mobile browsers regular mode does not work well with ArrayBuffers.
	 */
	function fetchd (url: string, options?: object) : Promise<object>;

	/**
	 * 	Loads an arraybuffer from the specified URL and converts it to a AudioBuffer using the global audioContext.
	 */
	function fetchAudioBuffer (url: string) : Promise<AudioBuffer>;

	/**
	 * 	Returns the value as an integer.
	 */
	function int (value: number|string) : number;

	/**
	 * 	Returns the value as a boolean.
	 */
	function bool (value: number|string|boolean) : number;

	/**
	 * 	Returns the value as a floating point number.
	 */
	function float (value: number|string) : number;

	/**
	 * 	Returns the value truncated to 2 digits of precision.
	 */
	function float2 (value: number) : number;

	/**
	 * 	Returns the value truncated to 3 digits of precision.
	 */
	function float3 (value: number) : number;

	/**
	 * 	Returns the value truncated to 4 digits of precision.
	 */
	function float4 (value: number) : number;

	/**
	 * 	Converts the given value to radians.
	 */
	function rad (value: number) : number;

	/**
	 * 	Converts the given value to degrees.
	 */
	function deg (value: number) : number;

	/**
	 * 	Returns a random integer value from 0 to 0xFFFF (inclusive).
	 */
	function rand() : number;

	/**
	 * 	Returns a random float from 0 to 1 (inclusive).
	 */
	function randf() : number;

	/**
	 * 	Returns a random float within the given (inclusive) range.
	 */
	function randrf (startValue: number, endValue: number) : number;

	/**
	 * 	Returns a random integer within the given range (inclusive).
	 */
	function randr (startValue: number, endValue: number) : number;

	/**
	 * 	Returns a table (array) of N random float numbers within the given range (inclusive).
	 */
	function randtf (startValue: number, endValue: number, n: number) : Array<number>;

	/**
	 * 	Returns the high-resolution `now` counter in milliseconds (includes possibly microseconds in fractional part).
	 */
	function hrnow () : number;

	/**
	 * 	Returns a function that when called produces a random integer value within the given (inclusive) range.
	 */
	function randvar (startValue: number, endValue: number) : () => number;

	/**
	 * 	Returns a function that when called returns an item from the specified array at some random index within the (inclusive) range.
	 */
	function randitem (arr: Array<any>, startValue?: number, endValue?: number) : () => any;

	/**
	 * 	Returns the parameter 't' where two line segments intersect.
	 */
	function getLineSegmentIntersection (ls1_x1: number, ls1_y1: number, ls1_x2: number, ls1_y2: number, ls2_x1: number, ls2_y1: number, ls2_x2: number, ls2_y2: number) : number;

	/**
	 * 	Returns boolean indicating if the line segments intersect.
	 */
	function lineSegmentIntersects (ls1_x1: number, ls1_y1: number, ls1_x2: number, ls1_y2: number, ls2_x1: number, ls2_y1: number, ls2_x2: number, ls2_y2: number) : boolean;

	/**
	 * 	Rotates a point (2d) by the given angle and returns an object having x and y properties.
	 */
	function rotatePoint (angle: number, x: number, y: number) : { x: number, y: number };

	/**
	 * 	Returns a value snapped to a step within the given range.
	 */
	function stepValue (value: number, minValue: number, maxValue: number, numSteps: number) : number;

	/**
	 * 	Returns a value that is a factor of the specified step.
	 */
	function alignValue (value: number, step: number) : number;

	/**
	 * 	Number of bits for fixed-point number (default is 8).
	 */
	let FIXED_POINT_BITS : number;

	/**
	 * 	Returns a fixed-point upscaled value.
	 */
	function upscale (value: number) : number;

	/**
	 * 	Downscales a fixed-point value to its integer part.
	 */
	function downscale (value: number) : number;

	/**
	 * 	Downscales a fixed-point value to floating point.
	 */
	function downscalef (value: number) : number;

	/**
	 * 	Aligns a value to its fixed point floating point representation such that downscaling results in an integer.
	 */
	function falign (value: number) : number;

	/**
	 * 	Returns the value having the minimum absolute value.
	 */
	function absmin (a: number, b: number) : number;

	/**
	 * 	Returns the value having the maximum absolute value.
	 */
	function absmax (a: number, b: number) : number;

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









export class Callback
{
	/**
	 * 	Initializes the callback with the specified arguments.
	 */
	constructor (callback: Function, context?: any, arg1?: any, arg2?: any, arg3?: any, arg4?: any);

	/**
	 * 	Executes the callback. Returns `false` if the callback should be removed from the handler.
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
		function alloc (callback: Function, context?: any, arg1?: any, arg2?: any, arg3?: any, arg4?: any) : Callback;

	}
}
export class Handler
{
	/**
	 * 	Handler host element.
	 */
	host: Object;

	/**
	 * 	Initializes the Handler instance.
	 */
	constructor (host?: Object);

	/**
	 * 	Adds the specified callback to the handler.
	 */
	add (callback: Function, context?: any, arg1?: any, arg2?: any, arg3?: any, arg4?: any) : Callback;

	/**
	 * 	Unlinks a callback from the handler.
	 */
	unlink (node: Callback) : Handler;

	/**
	 * 	Removes all callbacks matching the specified arguments.
	 */
	remove (callback?: Function, context?: any, arg1?: any, arg2?: any, arg3?: any, arg4?: any) : Handler;

	/**
	 * 	Returns the first callback matching the specified arguments.
	 */
	find (callback: Function, context?: any, arg1?: any, arg2?: any, arg3?: any, arg4?: any) : Callback;

	/**
	 * 	Executes all callbacks in the handler.
	 */
	exec() : void;

	/**
	 * 	Executes the first callback matching the specified arguments.
	 */
	execf (callback?: Function, context?: any, arg1?: any, arg2?: any, arg3?: any, arg4?: any) : void;

	/**
	 * 	Executes the specified callback.
	 */
	execc (node: Callback) : void;

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


export class GridElement
{
	/**
	 * 	Identifier of the element (string).
	 */
	id: string;

	/**
	 * 	Bounds of the element.
	 */
	bounds: Bounds2;

	/**
	 * 	Flags of the element (see constants of this class).
	 */
	flags: number;

	/**
	 * 	Generic data of the element, used to store some value or object.
	 */
	data: object;

	/**
	 * 	Constructs the instance at the specified position and with the specified size.
	 */
	constructor (x: number, y: number, width: number, height: number);

	/**
	 * 	Sets the identifier of the element.
	 */
	setId (value: string) : GridElement;

	/**
	 * 	Sets bits of the element flags.
	 */
	setFlags (value: number) : GridElement;

	/**
	 * 	Clears bits from the element flags.
	 */
	clearFlags (value: number) : GridElement;

	/**
	 * 	Returns true if masking (bitwise AND) the flags by the specified flag bits results in the given value.
	 */
	getFlags (andMask: number, value?: number) : boolean;

	/**
	 * 	Sets the generic data of the element.
	 */
	setData (data: object) : GridElement;

	/**
	 * 	Returns the generic data of the element.
	 */
	getData() : object;

	/**
	 * 	Sets the visible flag.
	 */
	visible (value: boolean) : GridElement;

	/**
	 * 	Returns the visible flag.
	 */
	visible() : boolean;

	/**
	 * 	Sets the alive flag.
	 */
	alive (value: boolean) : GridElement;

	/**
	 * 	Returns the alive flag.
	 */
	alive() : boolean;

	/**
	 * 	Sets the dirty flag.
	 */
	alive (value: boolean) : GridElement;

	/**
	 * 	Returns the dirty flag.
	 */
	alive() : boolean;

	/**
	 * 	Sets the depth-flag-enabled flag.
	 */
	depthFlagEnabled (value: boolean) : GridElement;

	/**
	 * 	Returns the depth-flag-enabled flag.
	 */
	depthFlagEnabled() : boolean;

	/**
	 * 	Sets the depth-flag flag. To actually use the depth-test, you have to enable the depth-flag using `depthFlagEnabled`.
	 */
	depthFlagEnabled (value: boolean) : GridElement;

	/**
	 * 	Returns the depth-flag flag.
	 */
	depthFlagEnabled() : boolean;

	/**
	 * 	Removes the element from the container and returns itself.
	 */
	remove() : GridElement;

	/**
	 * 	Syncs the actual location of the specified element with its storage location (if alive and dirty).
	 */
	sync() : GridElement;

	/**
	 * 	Sets the width and height of the element.
	 */
	resize (width: number, height: number) : GridElement;

	/**
	 * 	Resizes the element by the specified deltas.
	 */
	resizeBy (deltaWidth: number, deltaHeight: number) : GridElement;

	/**
	 * 	Moves the element by the specified deltas.
	 * 	@param upscaled - When `true` the `dx` and `dy` parameters are assumed to be upscaled.
	 */
	translate (dx: number, dy: number, upscaled?: boolean) : GridElement;

	/**
	 * 	Sets the position of the element.
	 */
	setPosition (x: number, y: number) : GridElement;

	/**
	 * 	Class-level function to allocate a new flag.
	 */
	static allocFlag() : number;

}

export class IDrawable
{
	/**
	 * 	Width of the drawable.
	 */
	width: number;

	/**
	 * 	Height of the drawable.
	 */
	height: number;

	/**
	 * 	Returns the actual independent drawable object.
	 */
	getDrawable(): IDrawable;

	/**
	 * 	Draws the drawable on the given canvas.
	 */
	draw(g: Canvas, x: number, y: number): void;

}
export class Element extends GridElement
{
	/**
	 * 	Parent group to whom this element is related.
	 */
	group: Group;

	/**
	 * 	Drawable object to render to the display.
	 */
	img: IDrawable;

	/**
	 * 	Indicates if the bounds of the element should be drawn (for debugging purposes).
	 */
	debugBounds: boolean;

	/**
	 * 	Constructs a drawable element at the specified position with the given drawable.
	 */
	constructor (x: number, y: number, width: number, height: number, img?: IDrawable);

	/**
	 * 	Constructs a drawable element at the specified position with the given drawable.
	 */
	constructor (x: number, y: number, img?: IDrawable);

}

export namespace Element
{
	export namespace Pool
	{
		/**
		 * 	Allocates a drawable element at the specified position with the given drawable.
		 */
		function alloc (x: number, y: number, width: number, height: number, img?: IDrawable) : Element;

		/**
		 * 	Allocates a drawable element at the specified position with the given drawable.
		 */
		function alloc (x: number, y: number, img?: IDrawable) : Element;

	}
}



export class Group extends Element
{
	/**
	 * 	Virtual zero reference point.
	 */
	readonly ref: Point2;

	/**
	 * 	Constructs an empty Group element.
	 */
	constructor (id?: string);

	/**
	 * 	Adds the group itself and all children to the scene's destruction queue. If any element has no container, it will be destroyed immediately.
	 */
	destroyLater() : void;

	/**
	 * 	Removes and destroys all child elements.
	 */
	clear() : Group;

	/**
	 * 	Removes all child elements but does not destroy them.
	 */
	reset() : Group;

	/**
	 * 	Adds a child element to the group. If the element has its `id` property set, it will be added to the group as a
	 * 	property, which can be accessed directly using the element identifier or using the `getChild` method.
	 */
	addChild (elem: Element) : Element;

	/**
	 * 	Return the child element matching the specified identifier.
	 */
	child (id: string) : Element;

	/**
	 * 	Removes an element from the container and returns it.
	 */
	removeChild (elem: Element) : Element;

	/**
	 * 	Local group translation, moves only the group by the specified deltas. Child element remain in position.
	 * 	@param upscaled - When `true` the `dx` and `dy` parameters are assumed to be upscaled.
	 */
	ltranslate (dx: number, dy: number, upscaled?: boolean) : Group;

	/**
	 * 	Moves the group and all children by the specified deltas.
	 * 	@param upscaled - When `true` the `dx` and `dy` parameters are assumed to be upscaled.
	 */
	ltranslate (dx: number, dy: number, upscaled?: boolean) : Group;

	/**
	 * 	Returns a temporal Point2, describing the extra offset introduced by the group when translating a child element by the specified deltas.
	 * 	@param upscaled - When `true` the `dx` and `dy` parameters are assumed to be upscaled.
	 */
	getOffsets (dx: number, dy: number, upscaled?: boolean) : Point2;

	/**
	 * 	Sets bits of the element flags in the group and all children.
	 */
	setFlags (value: number) : Group;

	/**
	 * 	Clears bits from the group and all children flags.
	 */
	clearFlags (value: number) : Group;

	/**
	 * 	Sets the visible flag of the group and all children.
	 */
	visible (value: boolean) : Group;

	/**
	 * 	Returns the visible flag of the group.
	 */
	visible () : boolean;

}

export namespace Group
{
	export namespace Pool
	{
		/**
		 * 	Allocates an empty Group element.
		 */
		function alloc (id?: string) : Group;

	}
}







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






export namespace fxl
{
	export class sys
{
	/**
	 * 	Indicates if the system module has already been initialized.
	 */
	static readonly initialized: boolean;

	/**
	 * 	Screen width (available after calling `init`).
	 */
	static readonly screenWidth: number;

	/**
	 * 	Screen height (available after calling `init`).
	 */
	static readonly screenHeight: number;

	/**
	 * 	Primary renderer (available after calling `init`).
	 */
	static readonly renderer: Canvas;

	/**
	 * 	Logical system time (mirrors the value of System.frameTime).
	 */
	static readonly time: Number;

	/**
	 * 	Logical system delta time (mirrors the value of System.frameDelta).
	 */
	static readonly dt: Number;

	/**
	 * 	Initializes the system with the specified options.
	 */
	static init (options: System.Options) : Promise<void>;

	/**
	 * 	Initializes the system using the default options.
	 */
	static init () : Promise<void>;

}
	
	
	export class res
{
	/**
	 * 	Loads all registered resources that have not been loaded yet.
	 */
	static load (progressCallback?: (level: number) => void) : Promise<void>;

	/**
	 * 	Returns a resource given its identifier.
	 */
	static get (id: string) : object;

	/**
	 * 	Registers a solid-color placeholder resource.
	 */
	static placeholder (id: string, color: string, width: number, height: number) : object;

	/**
	 * 	Registers an image resource.
	 */
	static image (id: string, path: string, opts?: object) : object;

	/**
	 * 	Registers an spritesheet resource.
	 */
	static spritesheet (id: string, path: string, frameWidth: number, frameHeight: number, numFrames?: number, optsA?: object, optsB?: object) : object;

	/**
	 * 	Registers a spritesheet animation resource.
	 */
	static animation (id: string, path: string, frameWidth: number, frameHeight: number, numFrames?: number, configOptions?: object, resOptions?: object) : object;

	/**
	 * 	Registers a spritefont animation resource.
	 */
	static spritefont (id: string, path: string, charWidth: number, charHeight: number, charset: string, optsA?: object, optsB?: object) : object;

	/**
	 * 	Registers a JSON data resource.
	 */
	static json (id: string, path: string, opts?: object) : object;

	/**
	 * 	Registers a binary data resource.
	 */
	static data (id: string, path: string, opts?: object) : object;

	/**
	 * 	Registers a text data resource.
	 */
	static text (id: string, path: string, opts?: object) : object;

	/**
	 * 	Registers an sound effect audio resource.
	 */
	static sfx (id: string, path: string, opts?: object) : object;

	/**
	 * 	Registers an music audio resource.
	 */
	static music (id: string, path: string, opts?: object) : object;

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
	 * 	@param primaryType - Type of the primary element.
	 * 	@param secondaryType - Type of the secondary element.
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
	// fxl ends
}
export default fxl;