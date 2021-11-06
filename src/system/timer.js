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

//!class Timer

/**
 * 	@param vsync - Indicates if requestAnimationFrame should be used instead of setTimeout.
 * 	@param interval - Amount of milliseconds between timer activations.
 * 	@param callback - Function to execute on each timer activation.
 *
 * 	!constructor (vsync: boolean, interval: number, callback: (dt: number, timer: Timer) => void );
 */
const Timer = function (vsync, interval, callback)
{
	this.callback = callback;
	this.interval = interval;
	this.vsync = vsync;
	this.handle = null;

	this.isRunning = false;
	this.startTime = 0;
	this.rTime = 0;
	this.sTime = 0;
	this.lTime = 0;
	this.tDelta = 0;

	this._onTimeout = () => {
		this.onTimeout();
	};

	this._onTimeout_b = () => {
		this.runNow();
	};
};

/**
 * 	Timer onTimeout handler.
 */
Timer.prototype.onTimeout = function ()
{
	if (!this.isRunning) return;

	this.rTime = hrnow() - this.startTime;

	let tError = this.rTime - (this.sTime + this.interval);
	if (tError < 0)
	{
		this.runAfter(-tError);
		return;
	}

	this.sTime += this.interval * (1 + int(tError / this.interval));

	this.tDelta = tError < 0 ? this.interval : (this.rTime - this.lTime);
	this.lTime = this.rTime;

	this.runAfter((this.sTime + this.interval) - (hrnow() - this.startTime));
	this.callback(this.tDelta, this);
};

/**
 * 	Starts the timer and triggers `onStarted`.
 *
 * 	@param immediate - When `true` the callback will be executed immediately.
 * 	@param scale - Used to control when to trigger the first timeout, delay is timeInterval*scale.
 *
 * 	!start (immediate?: boolean, scale?: number) : void;
 */
Timer.prototype.start = function (immediate=false, scale=1.0)
{
	if (this.isRunning) return;

	this.startTime = hrnow();
	this.isRunning = true;

	this.sTime = 0;
	this.lTime = 0;

	this.onStarted();

	if (immediate)
		this.callback (0, this);

	this.runAfter(this.interval*scale);
};

/**
 * 	Executes the timer activation after the specified amount of milliseconds.
 *
 * 	!runAfter (timeout: number) : void;
 */
Timer.prototype.runAfter = function (timeout)
{
	if (process.browser && this.vsync)
	{
		requestAnimationFrame(this._onTimeout_b);
		return;
	}

	if (this.handle)
		clearTimeout(this.handle);

	this.handle = setTimeout(this._onTimeout, timeout);
};

/**
 * 	Executes the timer activaton as soon as possible.
 *
 * 	!runNow() : void;
 */
Timer.prototype.runNow = function ()
{
	if (this.handle)
		clearTimeout(this.handle);

	this.handle = setTimeout(this._onTimeout, 0);
};

/**
 * 	Stops the timer and triggers `onStopped`.
 *
 * 	!stop() : void;
 */
Timer.prototype.stop = function ()
{
	if (!this.isRunning) return;

	if (this.handle)
	{
		clearTimeout(this.handle);
		this.handle = null;
	}

	this.isRunning = false;
	this.onStopped();
};

/**
 * 	Timer started event handler.
 *
 * 	!onStarted() : void;
 */
Timer.prototype.onStarted = function ()
{
};

/**
 * 	Timer stopped event handler.
 *
 * 	!onStopped() : void;
 */
Timer.prototype.onStopped = function ()
{
};

export default Timer;
