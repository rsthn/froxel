/*
**	system/timer.js
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

/**
**	Timer class.
**
**	Timer __constructor (float interval, function callback);
*/
const Timer = function (interval, callback)
{
	this.callback = callback;
	this.interval = interval;
};

/**
**	Timeout handler.
**
**	void onTimeout();
*/
Timer.prototype.onTimeout = function ()
{
	if (!this.isRunning) return;

	this.rTime = hrnow() - this.startTime;

	var tError = this.rTime - (this.sTime + this.interval);
	if (tError < 0)
	{
		this.runAfter(-tError);
		return;
	}

	this.sTime += this.interval * (1 + int(tError / this.interval));

	this.tDelta = tError < 0 ? this.interval : (this.rTime - this.lTime);
	this.lTime = this.rTime;

	this.callback (this.tDelta, this);
	this.runAfter((this.sTime + this.interval) - (hrnow() - this.startTime));
};


/**
**	Timer start handler (overridable).
**
**	void onStart();
*/
Timer.prototype.onStart = function ()
{
};


/**
**	Starts the timer. When immediate is `true` the callback will be executed immediately. The scale parameter is used to control when to
**	trigger the first timeout, set to timeInterval*scale.
**
**	void start (bool immediate=false, float scale=1.0);
*/
Timer.prototype.start = function (immediate=false, scale=1.0)
{
	this.startTime = hrnow();

	this.sTime = 0;
	this.lTime = 0;

	this.lastTime = hrnow();
	this.isRunning = true;

	this.onStart();

	if (immediate)
		this.callback (0, this);

	this.runAfter(this.interval*scale);
};


/**
**	Executes the timer onTimeout() after the specified amount of milliseconds.
**
**	void runAfter (int timeout);
*/
Timer.prototype.runAfter = function (timeout)
{
	if (process.browser)
		requestAnimationFrame(() => this.onTimeout());
	else
		setTimeout (() => this.onTimeout(), 0);
};

/**
**	Stops the timer.
**
**	void stop();
*/
Timer.prototype.stop = function ()
{
	this.isRunning = false;
};

export default Timer;
