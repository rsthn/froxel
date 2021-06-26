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

/*
**	Timer class.
*/
const Timer = function (interval, callback)
{
	this.callback = callback;
	this.interval = interval;

	this.isRunning = false;
	this.startTime = 0;
	this.rTime = 0;
	this.sTime = 0;
	this.lTime = 0;
	this.tDelta = 0;

	this._onTimeout = () => {
		this.onTimeout();
	};
};

/*
**	Timeout handler.
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

	this.callback (this.tDelta, this);
	this.runAfter((this.sTime + this.interval) - (hrnow() - this.startTime));
};

/*
**	Timer start handler (overridable).
*/
Timer.prototype.onStart = function ()
{
};

/*
**	Starts the timer. When immediate is `true` the callback will be executed immediately. The scale parameter is used to control when to
**	trigger the first timeout, set to timeInterval*scale.
*/
Timer.prototype.start = function (immediate=false, scale=1.0)
{
	this.startTime = hrnow();
	this.isRunning = true;

	this.sTime = 0;
	this.lTime = 0;

	this.onStart();

	if (immediate)
		this.callback (0, this);

	this.runAfter(this.interval*scale);
};

/*
**	Executes the timer onTimeout() after the specified amount of milliseconds.
*/
Timer.prototype.runAfter = function (timeout)
{
	if (process.browser)
		requestAnimationFrame(this._onTimeout);
	else
		setTimeout(this._onTimeout, 0);
};

/*
**	Stops the timer.
*/
Timer.prototype.stop = function ()
{
	this.isRunning = false;
};

export default Timer;
