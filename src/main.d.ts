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




































