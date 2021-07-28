/*
**	system/log.js
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

import System from './system.js';
import List from '../utils/list.js';

/**
**	Logging module to show logs on the system display buffer.
*/

const Log =
{
	activated: false,
	paused: false,

	data: List.calloc(),
	count: 0,
	maxsize: 30,
	debugEcho: false,

	color: '#fff',
	background: '#cf266a',

	vars: { },

	/**
	**	Writes a message to the log buffer, ensure logging has been enabled by calling enable() or any messages will be ignored.
	*/
	write: function (msg)
	{
		this.data.push(msg);
		this.count++;

		while (this.data.length > this.maxsize)
			this.data.shift();

		if (this.debugEcho)
			console.debug(this.count + ": " + msg);
	},

	/**
	**	Clears the current log buffer.
	*/
	clear: function ()
	{
		this.data.reset();
		this.count = 0;
	},

	/**
	**	Enables on-screen logging, must be called first before any call to write() or logging messages will be ignored.
	*/
	enable: function (x, y, fontSize, showFps, showIndex)
	{
		if (this.activated) return;
		this.activated = true;

		if (!x) x = 0;
		if (!y) y = 0;
		if (!fontSize) fontSize = 9.5;

		if (showFps === false) y -= 16;
		let _y = y;

		System.drawQueueAdd ({ draw: function ()
		{
			if (Log.paused) return;

			let tmp = hrnow();

			const g = System.displayBuffer3;
			g.clear();

			g.font('bold '+fontSize+'pt Monospace');
			g.textBaseline('top');

			let s = '';

			y = _y;

			if (showFps !== false && System.perf.fps != 0)
			{
				s = 'fps: ' + System.perf.fps + '/' + System.perf.averageFps + ', update: ' + System.perf.averageUpdateTime + ', draw: ' + System.perf.averageDrawTime + ', extra: ' + System.perf.averageExtraTime;

				if (Log.background) {
					g.fillStyle(Log.background);
					g.fillRect (x-3, y-1, g.measureText(s)+6, fontSize+5);
				}

				g.fillStyle(Log.color);
				g.fillText(s, x, y);
			}

			s = '';

			for (let i in Log.vars)
				s += i + ': ' + Log.vars[i] + '  ';

			if (s !== '')
			{
				y += 24;

				if (Log.background) {
					g.fillStyle(Log.background);
					g.fillRect (x-3, y-1, g.measureText(s)+6, fontSize+5);
				}

				g.fillStyle(Log.color);
				g.fillText(s, x, y);
			}

			let i = 0;
			for (let ii = Log.data.top; ii; ii = ii.next, i++)
			{
				s = (showIndex !== false ? "#" + (Log.count-Log.data.length+i+1) + ": " : "> ") + ii.value;

				if (Log.background) {
					g.fillStyle(Log.background);
					g.fillRect (x-3, y-1+7 + (fontSize+5)*(i+1) - 1, g.measureText(s)+6, fontSize+5);
				}

				g.fillStyle(Log.color);
				g.fillText(s, x, y-1+7 + (fontSize+5)*(i+1));
			}

			tmp = (hrnow() - tmp);
			System.perf.drawTimeTotal -= tmp;
			System.perf.extraTimeTotal += tmp;
		}});
	},

	/*
	**	Pauses log on-screen rendering.
	*/
	pause: function ()
	{
		this.paused = true;
		return;
	},

	/*
	**	Resumes log on-screen rendering (requires log to be enabled first).
	*/
	resume: function ()
	{
		this.paused = false;
		return;
	}
};

export default Log;
