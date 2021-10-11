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
	getX (absolute?: boolean)

	/**
	 * 	Returns the Y coordinate of the viewport's focus point inside the world.
	 * 	@param absolute - When `true`, the focus point Y (without offset) will be returned.
	 */
	getY (absolute?: boolean)

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
	function dispose (obj: object);

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

enum KeyCodes
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