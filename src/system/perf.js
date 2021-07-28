/*
**	system/perf.js
**
**	Copyright (c) 2013-2021, RedStar Technologies, All rights reserved.
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

/**
**	Small utility class for performance tracking.
**
**	>> Perf __constructor (float accumSize, float expectedValue);
**	>> Perf __constructor (float accumSize);
*/

const Perf = function (accumSize, expectedValue)
{
	this.data = [ ];
	this.accumSize = accumSize;

	this.expectedValue = expectedValue;

	this.stdSum = 0;
	this.stdCount = 0;
};

Perf.SAMPLES = 0x01;
Perf.MIN = 0x02;
Perf.MAX = 0x04;
Perf.AVG = 0x08;
Perf.EXPECTED = 0x10;
Perf.STDDEV = 0x20;
Perf.AVG_STDDEV = 0x40;
Perf.ALL = 0xFF;

export default Perf;

/**
**	Marks the start time of the performance test.
**
**	>> void begin();
*/

Perf.prototype.begin = function ()
{
	this.startTime = performance.now();
};


/**
**	Marks the end time of the performance test, the elapsed time is fed into the tracker.
**
**	>> void end();
*/

Perf.prototype.end = function ()
{
	this.feed (performance.now() - this.startTime);
};


/**
**	Feeds a value into the tracker, auto-generates a report using console.log when the number of samples
**	reaches the accumSize specified in the constructor.
**
**	>> void feed (float value);
*/

Perf.prototype.feed = function (value)
{
	this.data.push(value);

	if (this.data.length != this.accumSize)
		return;

	this.report();
	this.data = [ ];
};

/*
**	Updates the min, max, avg std, stdSum and stdCount fields of the object.
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

	let e = this.expectedValue !== undefined ? this.expectedValue : avg;

	for (let i = 0; i < this.data.length; i++) std += Math.pow(this.data[i] - e, 2);

	std = Math.sqrt(std / this.data.length);

	this.stdSum += std;
	this.stdCount++;

	this.min = min;
	this.max = max;
	this.avg = avg;
	this.std = std;

	return this;
};


/**
**	Returns a report string. After a call to this method instance variables 'min', 'max', 'avg' and 'std' will be populated.
*/

Perf.prototype.report = function (flags=255)
{
	let out = '';

	if (flags & Perf.SAMPLES) out += 'n: ' + this.stdCount;
	if (flags & Perf.MIN) out += (out != '' ? ', ' : '') + 'min: ' + this.min;
	if (flags & Perf.MAX) out += (out != '' ? ', ' : '') + 'max: ' + this.max;
	if (flags & Perf.AVG) out += (out != '' ? ', ' : '') + 'avg: ' + this.avg.toFixed(2);
	if (flags & Perf.EXPECTED) out += (out != '' ? ', ' : '') + (this.expectedValue !== undefined ? 'e: ' + this.expectedValue : '');
	if (flags & Perf.STDDEV) out += (out != '' ? ', ' : '') + 'stddev: ' + this.std.toFixed(2);
	if (flags & Perf.AVG_STDDEV) out += (out != '' ? ', ' : '') + 'avg_stddev: ' + (this.stdSum / this.stdCount).toFixed(2)

	return out;
};
