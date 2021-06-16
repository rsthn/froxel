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

/**
**	Logging module to show logs on the system display buffer.
*/

const Log =
{
	enabled: false,

	data: [ ],
	count: 0,
	maxsize: 30,
	debugEcho: false,

	color: '#fff',
	background: '#000',

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
		this.data = [];
		this.count = 0;
	},

	/**
	**	Enables on-screen logging, must be called first before any call to write() or logging messages will be ignored.
	*/
	enable: function (x, y, fontSize, showFps, showIndex)
	{
		if (this.enabled) return;
		this.enabled = true;

		if (!x) x = 0;
		if (!y) y = 0;

		if (!fontSize) fontSize = 8.5;

		if (showFps === false) y -= 16;

		let _y = y;

		System.drawQueueAdd ({ draw: function (tmp, g)
		{
			g.clear();

			g.font("normal "+fontSize+"pt 'Bitstream Vera Sans Mono', monospace");
			g.textBaseline('top');

			var _time = ((System.perf.lastTime - System.perf.startTime) / 1000);
			var _frames = System.perf.numFrames;
			var s = '';

			y = _y;

			if (showFps !== false)
			{
				s = 'fps: '+(_frames/_time).toFixed(2) + ', dt: ' + (1000/(_frames/_time)).toFixed(2) + ' ms, update: ' + (System.perf.updateTime/_frames).toFixed(2) + ' ms, draw: ' + (System.perf.drawTime/_frames).toFixed(2) + ' ms';

				if (Log.background) {
					g.fillStyle(Log.background);
					g.fillRect (x+8 - 3, y+10-1, g.measureText(s) + 6, fontSize+4);
				}

				g.fillStyle(Log.color);
				g.fillText(s, x+8, y+10);
			}

			s = '';

			for (let i in Log.vars)
				s += i + '=' + Log.vars[i] + '  ';

			if (s)
			{
				y += 24;

				if (Log.background) {
					g.fillStyle(Log.background);
					g.fillRect (x+8 - 3, y+10-1, g.measureText(s) + 6, fontSize+4);
				}

				g.fillStyle(Log.color);
				g.fillText(s, x+8, y+10);
			}

			for (var i = 0; i < Log.data.length; i++)
			{
				s = (showIndex !== false ? "#" + (Log.count-Log.data.length+i+1) + ": " : "> ") + Log.data[i];

				if (Log.background) {
					g.fillStyle(Log.background);
					g.fillRect (x+8 - 3, y+16 + (fontSize+4)*(i+1) - 1, g.measureText(s) + 6, fontSize+4);
				}

				g.fillStyle(Log.color);
				g.fillText(s, x+8, y+16 + (fontSize+4)*(i+1));
			}
		}});
	}
};

export default Log;
