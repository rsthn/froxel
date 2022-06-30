
import Random from './random.js';
import Log from './log.js';

//![import "./random"]
//![import "./log"]
//![import "../flow/viewport"]

//:/**
//: * 	Global functions and definitions.
//: */

//!namespace globals

/*
**	Variables and behavior flags, can be extended as needed from other modules.
*/
const globals =
{
	/**
	 * Renderer's GL context.
	 * !let gl: WebGL2RenderingContext;
	 */
	gl: null,

	/**
	 * Currently active shader program.
	 * !let shaderProgram: ShaderProgram;
	 */
	shaderProgram: null,

	/**
	 * Global system time, updated once per frame. Mirrors the `System.frameTime` property.
	 * !let time: number;
	 */
	time: 0,

	/**
	 * Active viewport (if any). Set by the `draw` method of the `Scene` class.
	 * !let viewport: Viewport;
	 */
	viewport: null,

	/**
	 * Indicates if the element bounds should be drawn. Used by the `Element` class.
	 * !let debugBounds: boolean;
	 */
	debugBounds: false,

	/**
	 * Indicates if the mask bounds should be drawn. Used by the `Mask` class.
	 * !let debugMasks: boolean;
	 */
	debugMasks: false,

	/**
	 * Global random generators. Only `rand0` is used by the global random functions. The `rand1` and `rand2` can be used manually if desired.
	 *
	 * !const rand0: Random;
	 * !const rand1: Random;
	 * !const rand2: Random;
	 */
	rand0: new Random(),
	rand1: new Random(),
	rand2: new Random()
}

export default globals;

//!/namespace

//!declare global

/**
 * Converts the given pixel-value to actual screen pixels taking into account the current scale.
 * !function px (value: number) : number;
 */
global.px = function(value)
{
	return value*C.SCALE;
}

/**
 * Disposes an object by running the first method that is found in the following order: `free`, `dispose` and finally `__dtor`.
 * !function dispose (obj: object) : void;
 */
global.dispose = function (obj)
{
	if (obj === null || typeof(obj) !== 'object')
		return;

	if ('free' in obj)
		return obj.free();

	if ('dispose' in obj)
		return obj.dispose();

	if ('__dtor' in obj)
		obj.__dtor();
}

/**
 * Global audio context obtained when the system is initialized.
 * !let audioContext: AudioContext;
 */
if ('AudioContext' in global)
{
	global.audioContext = new AudioContext({ latencyHint: 'interactive', sampleRate: 44100 });
	Log.write('AudioContext: baseLatency=' + ~~(global.audioContext.baseLatency*1000) + ' ms' );
}
else
	global.audioContext = null;

/**
 * Similar to `fetch` but uses XMLHttpRequest because in some mobile browsers regular mode does not work well with ArrayBuffers.
 * !function fetchd (url: string, options?: object) : Promise<object>;
 */
global.fetchd = function (url, options)
{
	return new Promise ((resolve, reject) =>
	{
		if (!options) options = { };
		if (!('responseType' in options)) options.responseType = 'arraybuffer';

		var request = new XMLHttpRequest();
		request.open('GET', url, true);

		for (let i in options) request[i] = options[i];

		request.onload = function() {
			resolve (request.response);
		};

		request.onerror = function() {
			reject ('Unable to fetch specified resource.');
		};

		request.send();
	});
}

/**
 * Loads an arraybuffer from the specified URL and converts it to a AudioBuffer using the global audioContext.
 * !function fetchAudioBuffer (url: string) : Promise<AudioBuffer>;
 */
global.fetchAudioBuffer = function (url)
{
	return new Promise((resolve, reject) =>
	{
		if (!global.audioContext)
		{
			reject ('AudioContext is not available.');
			return;
		}

		fetchd(url)
		.then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
		.then(audioBuffer => resolve(audioBuffer))
		.catch(err => reject(err));
	});
}

/**
 * Returns the value as an integer.
 * !function int (value: number|string) : number;
 */
global.int = function (value)
{
	return value >> 0;
}

/**
 * Returns the value as a boolean.
 * !function bool (value: number|string|boolean) : number;
 */
global.bool = function (value)
{
	if (value === true || value === false)
		return value;

	if (value == 'true')
		return true;

	if (value == 'false')
		return false;

	return !(!value);
}

/**
 * Returns the value as a floating point number.
 * !function float (value: number|string) : number;
 */
global.float = function (value)
{
	return parseFloat(value);
}

/**
 * Returns the value truncated to 2 digits of precision.
 * !function float2 (value: number) : number;
 */
global.float2 = function (value)
{
	return (int(value*100))/100;
}

/**
 * Returns the value truncated to 3 digits of precision.
 * !function float3 (value: number) : number;
 */
global.float3 = function (value)
{
	return (int(value*1000))/1000;
}

/**
 * Returns the value truncated to 4 digits of precision.
 * !function float4 (value: number) : number;
 */
global.float4 = function (value)
{
	return (int(value*10000))/10000;
}

/**
 * Converts the given value from degrees to radians.
 * !function rad (degrees: number) : number;
 */
global.rad = function (degrees)
{
	return degrees*Math.PI/180.0;
}

/**
 * Converts the given value from radians to degrees.
 * !function deg (radians: number) : number;
 */
global.deg = function (radians)
{
	return (radians/Math.PI)*180;
}

/**
 * Returns a random integer value from 0 to 0xFFFF (inclusive).
 * !function rand() : number;
 */
global.rand = function ()
{
	return globals.rand0.nextInt16();
}

/**
 * Returns a random float from 0 to 1 (inclusive).
 * !function randf() : number;
 */
global.randf = function ()
{
	return globals.rand0.nextFloat();
}

/**
 * Returns a random float within the given (inclusive) range.
 * !function randrf (startValue: number, endValue: number) : number;
 */
global.randrf = function (a, b)
{
	let t = globals.rand0.nextFloat();
	return t*b + (1-t)*a;
}

/**
 * Returns a random integer within the given range (inclusive).
 * !function randr (startValue: number, endValue: number) : number;
 */
global.randr = function (a, b)
{
	let t = globals.rand0.nextFloat();
	return Math.round(t*b + (1-t)*a);
}

/**
 * Returns a table (array) of N random integer numbers within the given range (inclusive). Ensures that the resulting
 * table has an even distribution.
 * !function randt (startValue: number, endValue: number, n: number, removeSubsequent?: boolean) : Array<number>;
 */
global.randt = function (a, b, n, removeSubsequent=true)
{
	let table = [ ];

	// Generate numbers in order to even-out the probability of each.
	let k = a;
	for (let i = 0; i < n; i++, k++)
	{
		table.push(k);
		if (k+1 > b) k = a-1;
	}

	// Shuffle the table.
	const m = n >>> 1;
	for (let i = 0; i < m; i++)
	{
		a = randr(i+1, n-1);

		let tmp = table[i];
		table[i] = table[a];
		table[a] = tmp;
	}

	// Remove subsequent duplicates.
	if (!removeSubsequent) return table;

	let j = n-1;
	for (let i = 1; i < n; i++)
	{
		if (table[i] !== table[i-1])
			continue;

		while(table[i] === table[j])
		{
			if (--j < 0) {
				j = n-1;
				console.log('!!');
			}
		}

		let tmp = table[i];
		table[i] = table[j];
		table[j] = tmp;
	}

	return table;
}

/**
 * Returns a table (array) of N random float numbers within the given range (inclusive).
 * !function randtf (startValue: number, endValue: number, n: number) : Array<number>;
 */
global.randtf = function (a, b, n)
{
	var list = [ ];

	for (var i = 0; i < n; i++)
		list.push(randrf(a, b));

	return list;
}

/**
 * Returns the high-resolution `now` counter in milliseconds (includes possibly microseconds in fractional part).
 * !function hrnow () : number;
 */
global.hrnow = function ()
{
	return performance.now();
}

/**
 * Returns a function that when called produces a random integer value within the given (inclusive) range.
 * !function randvar (startValue: number, endValue: number) : () => number;
 */
global.randvar = function (a, b)
{
	return function() { return randr(a, b); };
}

/**
 * Returns a function that when called returns an item from the specified array at some random index within the (inclusive) range.
 * !function randitem (arr: Array<any>, startValue?: number, endValue?: number) : () => any;
 */
global.randitem = function (arr, a=null, b=null)
{
	if (a === null) a = 0;
	if (b === null) b = arr.length - 1;

	return function() { return arr[randr(a, b)]; };
}

/**
 * Returns the parameter 't' where two line segments intersect.
 * !function getLineSegmentIntersection (ls1_x1: number, ls1_y1: number, ls1_x2: number, ls1_y2: number, ls2_x1: number, ls2_y1: number, ls2_x2: number, ls2_y2: number) : number;
 */
global.getLineSegmentIntersection = function (ls1_x1, ls1_y1, ls1_x2, ls1_y2, ls2_x1, ls2_y1, ls2_x2, ls2_y2)
{
	// Case #1: Identical segments.
	if (ls1_x1 == ls2_x1 && ls1_y1 == ls2_y1 && ls1_x2 == ls2_x2 && ls1_y2 == ls2_y2)
		return 0;

	let inf = 2.0;

	var dyA = ls1_y2 - ls1_y1;
	var dxA = ls1_x2 - ls1_x1;
	var dyB = ls2_y2 - ls2_y1;
	var dxB = ls2_x2 - ls2_x1;

	// Case #2: Horizontal vs. Horizontal
	if (dyA == 0 && dyB == 0)
	{
		if (ls1_y1 != ls2_y1) return inf;

		var x1 = Math.max(ls1_x1, ls2_x1);
		var x2 = Math.min(ls1_x2, ls2_x2);

		if (x1 > x2) return inf;

		return (x1 - ls1_x1) / dxA;
	}

	// Case #3: Vertical vs. Vertical
	if (dxA == 0 && dxB == 0)
	{
		if (ls1_x1 != ls2_x1) return inf;

		var y1 = Math.max(ls1_y1, ls2_y1);
		var y2 = Math.min(ls1_y2, ls2_y2);

		if (y1 > y2) return inf;

		return (y1 - ls1_y1) / dyA;
	}

	// Case #4: Vertical vs. Horizontal or Sloped
	if (dxA == 0)
	{
		var tA = (dyB*(ls1_x1 - ls2_x1) + dxB*(ls2_y1 - ls1_y1)) / (dxB * dyA);
		if (0 > tA || tA > 1) return inf;

		var tB = (ls1_x1 - ls2_x1) / dxB; 
		if (0 > tB || tB > 1) return inf;

		return tA;
	}

	// Case #5: Regular line segments.
	var a = dyA*(ls2_x1 - ls1_x1) + dxA*(ls1_y1 - ls2_y1);
	var b = dyB*dxA - dxB*dyA;

	if (b == 0) return inf;

	var tB = a / b;
	if (0 > tB || tB > 1) return inf;

	var tA = (dxB*tB + ls2_x1 - ls1_x1) / dxA;
	if (0 > tA || tA > 1) return inf;

	return tA;
}

/**
 * Returns boolean indicating if the line segments intersect.
 * !function lineSegmentIntersects (ls1_x1: number, ls1_y1: number, ls1_x2: number, ls1_y2: number, ls2_x1: number, ls2_y1: number, ls2_x2: number, ls2_y2: number) : boolean;
 */
global.lineSegmentIntersects = function (ls1_x1, ls1_y1, ls1_x2, ls1_y2, ls2_x1, ls2_y1, ls2_x2, ls2_y2)
{
	let t = getLineSegmentIntersection (ls1_x1, ls1_y1, ls1_x2, ls1_y2, ls2_x1, ls2_y1, ls2_x2, ls2_y2);
	return t >= 0 && t <= 1.0;
}

/**
 * Rotates a point by the given angle.
 * !function rotatePoint (angle: number, x: number, y: number) : { x: number, y: number };
 */
/**
 * Rotates a point by the given angle along the given center.
 * !function rotatePoint (angle: number, x: number, y: number, cx: number, cy: number) : { x: number, y: number };
 */
global.rotatePoint = function (angle, x, y, cx=0, cy=0)
{
	return {
		x: cx + (x-cx)*Math.cos(angle) + (y-cy)*Math.sin(angle),
		y: cy + (y-cy)*Math.cos(angle) - (x-cx)*Math.sin(angle)
	};
}

/**
 * Returns a value snapped to a step within the given range.
 * !function stepValue (value: number, minValue: number, maxValue: number, numSteps: number) : number;
 */
global.stepValue = function (value, minValue, maxValue, numSteps)
{
	return ((Math.round(numSteps * (value - minValue) / (maxValue - minValue))) / numSteps) * (maxValue - minValue) + minValue;
}

/**
 * Returns a value that is a factor of the specified step.
 * !function alignValue (value: number, step: number) : number;
 */
global.alignValue = function (value, step)
{
	return Math.round(value/step)*step;
}

/**
 * Number of bits for fixed-point number (default is 8).
 * !let FIXED_POINT_BITS : number;
*/
global.FIXED_POINT_BITS = 8;

/**
 * Returns a fixed-point upscaled value.
 * !function upscale (value: number) : number;
 */
global.upscale = function (value)
{
	return (value * (1 << FIXED_POINT_BITS)) >> 0;
}

/**
 * Downscales a fixed-point value to its integer part.
 * !function downscale (value: number) : number;
 */
global.downscale = function (value)
{
	return value >> FIXED_POINT_BITS;
}

/**
 * Downscales a fixed-point value to floating point.
 * !function downscalef (value: number) : number;
 */
global.downscalef = function (value)
{
	return value / (1 << FIXED_POINT_BITS);
}

/**
 * Aligns a value to its fixed point floating point representation such that downscaling results in an integer.
 * !function falign (value: number) : number;
 */
global.falign = function (value)
{
	return downscalef(upscale(value));
}

/**
 * Returns the fractional part of a value.
 * !function fract (value: number) : number;
 */
global.fract = function(value)
{
	return value - (~~value);
}

/**
 * Returns the value having the minimum absolute value.
 * !function absmin (a: number, b: number) : number;
 */
global.absmin = function(a, b)
{
	return Math.abs(a) < Math.abs(b) ? a : b;
}

/**
 * Returns the value having the maximum absolute value.
 * !function absmax (a: number, b: number) : number;
 */
global.absmax = function(a, b)
{
	return Math.abs(a) > Math.abs(b) ? a : b;
}

/**
 * Repeats a string a number of times.
 * !function repeat (str: string, count: number) : string;
 */
global.repeat = function (str, count)
{
	let out = '';

	while (count-- > 0)
		out += str;

	return out;
}

/**
 * Pads the given value with a character (added to the left) until the specified size is reached.
 * !function lpad (val: any, size: number, char?: string) : string;
 */
global.lpad = function (val, size, char='0')
{
	val = val.toString();
	return repeat(char.charAt(0), size-val.length) + val;
}

/**
 * Pads the given value with a character (added to the right) until the specified size is reached.
 * !function rpad (val: any, size: number, char?: string) : string;
 */
global.rpad = function (val, size, char='0')
{
	val = val.toString();
	return val + repeat(char.charAt(0), size-val.length);
}

/**
 * Returns the normalized (0 to 1) value for the given signed-normalized (-1 to 1) value.
 * !function norm (value: number) : number;
 */
global.norm = function (value)
{
	return (value + 1.0) * 0.5;
}

/**
 * Returns the signed-normalized (-1 to 1) value for the given normalized (0 to 1) value.
 * !function snorm (value: number) : number;
 */
global.snorm = function (value)
{
	return value * 2.0 - 1.0;
}

/**
 * Clamps the specified value to the [x0, x1] range.
 * !function clamp (value: number, x0?: number, x1?: number) : number;
 */
global.clamp = function (value, x0=0.0, x1=1.0)
{
	return value < x0 ? x0 : (value > x1 ? x1 : value);
}

/**
 * Maps the given value from [a0, a1] to [b0, b1].
 * !function map (value: number, a0: number, a1: number, b0: number, b1: number) : number;
 */
global.map = function (value, a0, a1, b0, b1)
{
	return ((value - a0)*(b1 - b0) / (a1 - a0)) + b0;
}

/**
 * Performs a linear interpolation between `x` and `y` using `a` to weight between them. The return value is computed as x*(1−a)+y*a.
 * !function mix (x: number, y: number, a: number) : number;
 */
global.mix = function (x, y, a)
{
	return x*(1-a) + y*a;
}
