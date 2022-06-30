
//!class Perf

/**
 * 	Initializes the performance monitoring instance.
 *
 * 	@param accumSize - Maximum amount of samples to accumulate.
 * 	@param expectedValue - Expected value (average) of resulting samples.
 * 
 * 	!constructor (accumSize: number, expectedValue?: number);
 */
const Perf = function (accumSize, expectedValue=null)
{
	this.data = [ ];
	this.accumSize = accumSize;

	this.expectedValue = expectedValue;

	this.lastFeed = 0;
	this.lastUpdate = 0;

	this.stdSum = 0;
	this.stdCount = 0;
};

export default Perf;

/**
 * 	Marks the start time of a performance test.
 * 	!begin() : void;
 */
Perf.prototype.begin = function () {
	this.startTime = performance.now();
};

/**
 * 	Marks the end time of the performance test, the elapsed time is fed into the monitor.
 * 	!end() : void;
 */
Perf.prototype.end = function () {
	this.feed (performance.now() - this.startTime);
};

/**
 * 	Feeds a value into the monitor, auto-generates a report using `console.log` when the number of samples reaches the `accumSize` specified in the constructor.
 * 	!feed (value: number) : void;
 */
Perf.prototype.feed = function (value)
{
	this.data.push(value);
	this.lastFeed++;

	if (this.data.length != this.accumSize)
		return;

	this.report();
	this.data = [ ];
};

/**
 * 	Updates the `min`, `max`, `avg` `std`, `stdSum` and `stdCount` fields of the object.
 * 	!update () : void;
 */
Perf.prototype.update = function ()
{
	let min = null;
	let max = null;
	let avg = 0;
	let std = 0;

	for (let i = 0; i < this.data.length; i++)
	{
		min = min === null ? this.data[i] : Math.min(min, this.data[i]);
		max = max === null ? this.data[i] : Math.max(max, this.data[i]);
		avg += this.data[i];
	}

	avg /= this.data.length;

	let e = this.expectedValue !== null ? this.expectedValue : avg;

	for (let i = 0; i < this.data.length; i++) std += Math.pow(this.data[i] - e, 2);

	std = Math.sqrt(std / this.data.length);

	this.stdSum += std;
	this.stdCount++;

	this.min = min;
	this.max = max;
	this.avg = avg;
	this.std = std;

	this.lastUpdate = this.lastFeed;
	return this;
};

/**
 * 	Returns a report string with the values selected by the specified flags.
 * 	!report (flags: Perf.Flags) : string;
 */
Perf.prototype.report = function (flags=255)
{
	let out = '';

	if (this.lastUpdate != this.lastFeed)
		this.update();

	if (flags & Perf.Flags.SAMPLES) out += 'n: ' + this.stdCount;
	if (flags & Perf.Flags.MIN) out += (out != '' ? ', ' : '') + 'min: ' + this.min;
	if (flags & Perf.Flags.MAX) out += (out != '' ? ', ' : '') + 'max: ' + this.max;
	if (flags & Perf.Flags.AVG) out += (out != '' ? ', ' : '') + 'avg: ' + this.avg.toFixed(2);
	if (flags & Perf.Flags.EXPECTED) out += (out != '' ? ', ' : '') + (this.expectedValue !== undefined ? 'e: ' + this.expectedValue : '');
	if (flags & Perf.Flags.STDDEV) out += (out != '' ? ', ' : '') + 'stddev: ' + this.std.toFixed(2);
	if (flags & Perf.Flags.AVG_STDDEV) out += (out != '' ? ', ' : '') + 'avg_stddev: ' + (this.stdSum / this.stdCount).toFixed(2)

	return out;
};

//!/class

//!namespace Perf
//!enum Flags

Perf.Flags = {
	SAMPLES: 1,
	//!SAMPLES
	MIN: 2,
	//!MIN
	MAX: 4,
	//!MAX
	AVG: 8,
	//!AVG
	EXPECTED: 16,
	//!EXPECTED
	STDDEV: 32,
	//!STDDEV
	AVG_STDDEV: 64,
	//!AVG_STDDEV
	ALL: 255,
	//!ALL
};

//!/enum
