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

/*
**	Global functions and definitions.
*/

/*
**	Variables and behavior flags, can be extended as needed from other modules.
*/
const globals =
{
	/*
	**	Active viewport (if any). Set by the `draw` method of the Scene class.
	*/
	viewport: null,

	/*
	**	Indicates if the element bounds should be drawn. Used by the Element class.
	*/
	debugBounds: false,

	/*
	**	Global random generators. Only rand0 is used by the global random functions. The rand1 and rand2 can be used manually if desired.
	*/
	rand0: new Random(),
	rand1: new Random(),
	rand2: new Random()
};

export default globals;

/*
**	Converts the given pixel-value to actual screen pixels taking into account the current scale.
**
**	>> float px (float value);
*/
global.px = function(value)
{
	return value*C.SCALE;
};

/*
**	Disposes an object, first by checking if it has a 'dispose' method, and if not, tried to check
**	with a '__dtor' method.
*/
global.dispose = function (obj)
{
	if (!obj) return;

	if ('free' in obj)
		return obj.free();

	if ('dispose' in obj)
		return obj.dispose();

	if ('__dtor' in obj)
		obj.__dtor();
};

/*
**	Creates a global AudioContext if supported.
*/
if ('AudioContext' in global)
	global.audioContext = new AudioContext();
else
	global.audioContext = null;

/*
**	Similar to fetch() but uses XMLHttpRequest, as in some mobile browsers normal mode does not work well for ArrayBuffers.
**
**	>> Promise fetchd (string url, object options);
**	>> Promise fetchd (string url);
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

/*
**	Loads an arraybuffer from the specified URL and converts it to a AudioBuffer using the global audioContext.
**
**	>> Promise fetchAudioBuffer (string url);
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

/*
**	Returns the value as an integer.
**
**	int int (T value);
*/
global.int = function (value)
{
	return value >> 0;
};

/*
**	Returns the value as a boolean.
**
**	bool bool (T value);
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

/*
**	Returns the value as a floating point number.
**
**	float float (T value);
*/
global.float = function (value)
{
	return parseFloat(value);
};

/*
**	Returns the value with 2 digits of precision.
**
**	float float2 (float value);
*/
global.float2 = function (value)
{
	return (int(value*100))/100;
};

/*
**	Returns the value with 3 digits of precision.
**
**	float float3 (float value);
*/
global.float3 = function (value)
{
	return (int(value*1000))/1000;
};

/*
**	Returns the value with 4 digits of precision.
**
**	float float4 (float value);
*/
global.float4 = function (value)
{
	return (int(value*10000))/10000;
};

/*
**	Converts the given value to radians.
**
**	float rad (float value);
*/
global.rad = function (value)
{
	return value*Math.PI / 180;
};

/*
**	Converts the given value to degrees.
**
**	float deg (float value);
*/
global.deg = function (value)
{
	return (value/Math.PI)*180;
};

/*
**	Returns a random integer value from 0 to 0xFFFF (inclusive).
**
**	int rand();
*/
global.rand = function ()
{
	return globals.rand0.nextInt16();
};

/*
**	Returns a random float from 0 to 1 (inclusive).
**
**	float randf ();
*/
global.randf = function ()
{
	return globals.rand0.nextFloat();
};

/*
**	Returns a random float within the given (inclusive) range.
**
**	float randrf (float a, float b);
*/
global.randrf = function (a, b)
{
	let t = globals.rand0.nextFloat();
	return t*b + (1-t)*a;
};

/*
**	Returns a random integer within the given range (inclusive).
**
**	int randr (int a, int b);
*/
global.randr = function (a, b)
{
	let t = globals.rand0.nextFloat();
	return int(t*b + (1-t)*a);
};

/*
**	Returns a table of random float numbers within the given range (inclusive).
**
**	array randtf (float a, float b, int n);
*/
global.randtf = function (a, b, n)
{
	var list = [ ];

	for (var i = 0; i < n; i++)
		list.push(randrf(a, b));

	return list;
};

/*
**	Returns the high-resolution 'now' counter in milliseconds (includes possibly microseconds in fractional part).
**
**	float hrnow();
*/
global.hrnow = function ()
{
	return performance.now();
};


/*
**	Returns a function that produces a random integer value within the given (inclusive) range.
**
**	function randvar (int a, int b);
*/
global.randvar = function (a, b)
{
	return function() { return randr(a, b); };
};

/*
**	Returns a function that returns an item from the specified array at some random index within the
**	given inclusive range.
**
**	function randitem (array arr, int a, int b);
**	function randitem (array arr, int a);
**	function randitem (array arr);
*/
global.randitem = function (arr, a, b)
{
	if (!a) a = 0;
	if (!b) b = arr.length - 1;

	return function() { return arr[randr(a, b)]; };
};

/*
**	Returns the parameter 't' where two line segments intersect.
**
**	float getLineSegmentIntersection (float ls1_x1, float ls1_y1, float ls1_x2, float ls1_y2, float ls2_x1, float ls2_y1, float ls2_x2, float ls2_y2);
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

/*
**	Returns boolean if the line segments intersect.
**
**	bool lineSegmentIntersects (float ls1_x1, float ls1_y1, float ls1_x2, float ls1_y2, float ls2_x1, float ls2_y1, float ls2_x2, float ls2_y2);
*/
global.lineSegmentIntersects = function (ls1_x1, ls1_y1, ls1_x2, ls1_y2, ls2_x1, ls2_y1, ls2_x2, ls2_y2)
{
	let t = getLineSegmentIntersection (ls1_x1, ls1_y1, ls1_x2, ls1_y2, ls2_x1, ls2_y1, ls2_x2, ls2_y2);
	return t >= 0 && t <= 1.0;
};

/*
**	Rotates a point (2d) by the given angle and returns an object.
**
**	>> Object{x,y} rotatePoint (Object{x,y} angle, x, y);
**	>> Object{x,y} rotatePoint (float angle, x, y);
*/
global.rotatePoint = function (angle, x, y)
{
	if (Rin.typeOf(angle) == "object")
		return { x: x*angle.x + y*angle.y, y: y*angle.x - x*angle.y };
	else
		return { x: x*Math.cos(angle) + y*Math.sin(angle), y: y*Math.cos(angle) - x*Math.sin(angle) };
};

/*
**	Returns a value snapped to a step within the given range.
**
**	float stepValue (float value, float minValue, float maxValue, int numSteps);
*/
global.stepValue = function (value, minValue, maxValue, numSteps)
{
	return ((Math.round(numSteps * (value - minValue) / (maxValue - minValue))) / numSteps) * (maxValue - minValue) + minValue;
};

/*
**	Returns a value that is a factor of the specified step.
**
**	float alignValue (float value, float step);
*/
global.alignValue = function (value, step)
{
	return Math.round(value/step)*step;
};


/*
**	Number of bits for fixed-point number.
*/
const BITS = 4;

/*
**	Returns a fixed-point upscaled value.
**
**	int upscale (float value)
*/
global.upscale = function (value)
{
	return (value * (1 << BITS)) >> 0;
};

/*
**	Downscales a fixed-point value to its integer part.
**
**	int downscale (int value)
*/
global.downscale = function (value)
{
	return value >> BITS;
};

/*
**	Downscales a fixed-point value to floating point.
**
**	float downscale (int value)
*/
global.downscalef = function (value)
{
	return value / (1 << BITS);
};
