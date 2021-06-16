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


/**
**	Shows a report using console.log, if the returnString parameter is set to true, the report string will be returned
**	instead of printed. After a call to this method instance variables 'min', 'max', 'avg' and 'std' will be populated.
**
**	>> void report (bool returnString=false);
*/

Perf.prototype.report = function (returnString)
{
	var min = null;
	var max = null;
	var avg = 0;
	var std = 0;

	for (var i = 0; i < this.data.length; i++)
	{
		min = min === null ? this.data[i] : Math.min(min, this.data[i]);
		max = max === null ? this.data[i] : Math.max(max, this.data[i]);
		avg += this.data[i];
	}

	avg /= this.data.length;

	var e = this.expectedValue !== undefined ? this.expectedValue : avg;

	for (var i = 0; i < this.data.length; i++) std += Math.pow(this.data[i] - e, 2);

	std = Math.sqrt(std / this.data.length);

	this.stdSum += std;
	this.stdCount++;

	var out = "N: " + this.stdCount + ", MIN: " + min + ", MAX: " + max + ", AVG: " + avg.toFixed(2) + (this.expectedValue !== undefined ? ", E: " + this.expectedValue : "") + ", STDDEV: " + std.toFixed(2) + ", AVG_STDDEV: " + (this.stdSum / this.stdCount).toFixed(2);

	this.min = min;
	this.max = max;
	this.avg = avg;
	this.std = std;

	if (returnString === true)
		return out;

	console.log(out);
};
