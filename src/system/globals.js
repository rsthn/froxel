/*
**	system/globals.js
**
**	Copyright (c) 2016-2021, RedStar Technologies, All rights reserved.
**	https://rsthn.com/
**
**	THIS LIBRARY IS PROVIDED BY REDSTAR TECHNOLOGIES "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES,
**	INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A 
**	PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL REDSTAR TECHNOLOGIES BE LIABLE FOR ANY
**	DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT 
**	NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; 
**	OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, 
**	STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE
**	USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

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
	 * 	Renderer's GL context.
	 * 	!let gl: WebGL2RenderingContext;
	 */
	gl: null,

	/**
	 * 	Global system time, updated once per frame. Mirrors the `System.frameTime` property.
	 *	!let time: number;
	 */
	time: 0,

	/**
	 * 	Active viewport (if any). Set by the `draw` method of the `Scene` class.
	 * 	!let viewport: Viewport;
	 */
	viewport: null,

	/**
	 * 	Indicates if the element bounds should be drawn. Used by the `Element` class.
	 * 	!let debugBounds: boolean;
	 */
	debugBounds: false,

	/**
	 * 	Indicates if the mask bounds should be drawn. Used by the `Mask` class.
	 * 	!let debugMasks: boolean;
	 */
	debugMasks: false,

	/**
	 * 	Global random generators. Only `rand0` is used by the global random functions. The `rand1` and `rand2` can be used manually if desired.
	 *
	 * 	!const rand0: Random;
	 * 	!const rand1: Random;
	 * 	!const rand2: Random;
	 */
	rand0: new Random(),
	rand1: new Random(),
	rand2: new Random()
};

export default globals;

//!/namespace

//!declare global

/**
 * 	Converts the given pixel-value to actual screen pixels taking into account the current scale.
 *
 * 	!function px (value: number) : number;
 */
global.px = function(value)
{
	return value*C.SCALE;
};

/**
 * 	Disposes an object by running the first method that is found in the following order: `free`, `dispose` and finally `__dtor`.
 *
 *	!function dispose (obj: object) : void;
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
};

/**
 * 	Global audio context obtained when the system is initialized.
 *
 * 	!let audioContext: AudioContext;
 */
if ('AudioContext' in global)
{
	global.audioContext = new AudioContext({ latencyHint: 'interactive', sampleRate: 44100 });
	Log.write('AudioContext: baseLatency=' + ~~(global.audioContext.baseLatency*1000) + ' ms' );
}
else
	global.audioContext = null;

/**
 * 	Similar to `fetch` but uses XMLHttpRequest because in some mobile browsers regular mode does not work well with ArrayBuffers.
 *
 * 	!function fetchd (url: string, options?: object) : Promise<object>;
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
};

/**
 * 	Loads an arraybuffer from the specified URL and converts it to a AudioBuffer using the global audioContext.
 *
 * 	!function fetchAudioBuffer (url: string) : Promise<AudioBuffer>;
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
};


/**
 * 	Returns the value as an integer.
 *
 *	!function int (value: number|string) : number;
 */
global.int = function (value)
{
	return value >> 0;
};

/**
 * 	Returns the value as a boolean.
 *
 * 	!function bool (value: number|string|boolean) : number;
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
};

/**
 * 	Returns the value as a floating point number.
 *
 * 	!function float (value: number|string) : number;
 */
global.float = function (value)
{
	return parseFloat(value);
};

/**
 * 	Returns the value truncated to 2 digits of precision.
 *
 * 	!function float2 (value: number) : number;
 */
global.float2 = function (value)
{
	return (int(value*100))/100;
};

/**
 * 	Returns the value truncated to 3 digits of precision.
 *
 * 	!function float3 (value: number) : number;
 */
global.float3 = function (value)
{
	return (int(value*1000))/1000;
};

/**
 * 	Returns the value truncated to 4 digits of precision.
 *
 * 	!function float4 (value: number) : number;
 */
global.float4 = function (value)
{
	return (int(value*10000))/10000;
};

/**
 * 	Converts the given value to radians.
 *
 * 	!function rad (value: number) : number;
 */
global.rad = function (value)
{
	return value*Math.PI / 180;
};

/**
 * 	Converts the given value to degrees.
 *
 * 	!function deg (value: number) : number;
 */
global.deg = function (value)
{
	return (value/Math.PI)*180;
};

/**
 * 	Returns a random integer value from 0 to 0xFFFF (inclusive).
 *
 * 	!function rand() : number;
 */
global.rand = function ()
{
	return globals.rand0.nextInt16();
};

/**
 * 	Returns a random float from 0 to 1 (inclusive).
 *
 * 	!function randf() : number;
 */
global.randf = function ()
{
	return globals.rand0.nextFloat();
};

/**
 * 	Returns a random float within the given (inclusive) range.
 *
 * 	!function randrf (startValue: number, endValue: number) : number;
 */
global.randrf = function (a, b)
{
	let t = globals.rand0.nextFloat();
	return t*b + (1-t)*a;
};

/**
 * 	Returns a random integer within the given range (inclusive).
 *
 * 	!function randr (startValue: number, endValue: number) : number;
 */
global.randr = function (a, b)
{
	let t = globals.rand0.nextFloat();
	return Math.round(t*b + (1-t)*a);
};

/**
 * 	Returns a table (array) of N random float numbers within the given range (inclusive).
 *
 * 	!function randtf (startValue: number, endValue: number, n: number) : Array<number>;
 */
global.randtf = function (a, b, n)
{
	var list = [ ];

	for (var i = 0; i < n; i++)
		list.push(randrf(a, b));

	return list;
};

/**
 * 	Returns the high-resolution `now` counter in milliseconds (includes possibly microseconds in fractional part).
 *
 * 	!function hrnow () : number;
 */
global.hrnow = function ()
{
	return performance.now();
};

/**
 * 	Returns a function that when called produces a random integer value within the given (inclusive) range.
 *
 * 	!function randvar (startValue: number, endValue: number) : () => number;
 */
global.randvar = function (a, b)
{
	return function() { return randr(a, b); };
};

/**
 * 	Returns a function that when called returns an item from the specified array at some random index within the (inclusive) range.
 *
 * 	!function randitem (arr: Array<any>, startValue?: number, endValue?: number) : () => any;
 */
global.randitem = function (arr, a=null, b=null)
{
	if (a === null) a = 0;
	if (b === null) b = arr.length - 1;

	return function() { return arr[randr(a, b)]; };
};

/**
 * 	Returns the parameter 't' where two line segments intersect.
 *
 * 	!function getLineSegmentIntersection (ls1_x1: number, ls1_y1: number, ls1_x2: number, ls1_y2: number, ls2_x1: number, ls2_y1: number, ls2_x2: number, ls2_y2: number) : number;
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
};

/**
 * 	Returns boolean indicating if the line segments intersect.
 *
 * 	!function lineSegmentIntersects (ls1_x1: number, ls1_y1: number, ls1_x2: number, ls1_y2: number, ls2_x1: number, ls2_y1: number, ls2_x2: number, ls2_y2: number) : boolean;
 */
global.lineSegmentIntersects = function (ls1_x1, ls1_y1, ls1_x2, ls1_y2, ls2_x1, ls2_y1, ls2_x2, ls2_y2)
{
	let t = getLineSegmentIntersection (ls1_x1, ls1_y1, ls1_x2, ls1_y2, ls2_x1, ls2_y1, ls2_x2, ls2_y2);
	return t >= 0 && t <= 1.0;
};

/**
 * 	Rotates a point (2d) by the given angle and returns an object having x and y properties.
 * 
 * 	!function rotatePoint (angle: number, x: number, y: number) : { x: number, y: number };
 */
global.rotatePoint = function (angle, x, y)
{
	return { x: x*Math.cos(angle) + y*Math.sin(angle), y: y*Math.cos(angle) - x*Math.sin(angle) };
};

/**
 * 	Returns a value snapped to a step within the given range.
 * 
 * 	!function stepValue (value: number, minValue: number, maxValue: number, numSteps: number) : number;
 */
global.stepValue = function (value, minValue, maxValue, numSteps)
{
	return ((Math.round(numSteps * (value - minValue) / (maxValue - minValue))) / numSteps) * (maxValue - minValue) + minValue;
};

/**
 * 	Returns a value that is a factor of the specified step.
 * 
 * 	!function alignValue (value: number, step: number) : number;
 */
global.alignValue = function (value, step)
{
	return Math.round(value/step)*step;
};

/**
 * 	Number of bits for fixed-point number (default is 8).
 * 
 * 	!let FIXED_POINT_BITS : number;
*/
global.FIXED_POINT_BITS = 8;

/**
 * 	Returns a fixed-point upscaled value.
 * 
 * 	!function upscale (value: number) : number;
 */
global.upscale = function (value)
{
	return (value * (1 << FIXED_POINT_BITS)) >> 0;
};

/**
 * 	Downscales a fixed-point value to its integer part.
 * 
 * 	!function downscale (value: number) : number;
 */
global.downscale = function (value)
{
	return value >> FIXED_POINT_BITS;
};

/**
 * 	Downscales a fixed-point value to floating point.
 * 
 * 	!function downscalef (value: number) : number;
 */
global.downscalef = function (value)
{
	return value / (1 << FIXED_POINT_BITS);
};

/**
 * 	Aligns a value to its fixed point floating point representation such that downscaling results in an integer.
 * 
 * 	!function falign (value: number) : number;
 */
global.falign = function (value)
{
	return downscalef(upscale(value));
};

/**
 * 	Returns the value having the minimum absolute value.
 * 
 * 	!function absmin (a: number, b: number) : number;
 */
global.absmin = function(a, b)
{
	return Math.abs(a) < Math.abs(b) ? a : b;
};

/**
 * 	Returns the value having the maximum absolute value.
 * 
 * 	!function absmax (a: number, b: number) : number;
 */
global.absmax = function(a, b)
{
	return Math.abs(a) > Math.abs(b) ? a : b;
};
