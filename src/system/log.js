
import System from './system.js';
import List from '../utils/list.js';

//![import "./system"]
//![import "../utils/list"]

//:/**
//: * 	Logging module to show logs on the system display buffer.
//: */

//!namespace Log

const Log =
{
	/**
	 * 	Indicates if the log module is enabled.
	 *	!let enabled: boolean;
	 */
	enabled: false,

	/**
	 * 	Indicates if the log module is paused.
	 * 	!let paused: boolean;
	 */
	paused: false,

	/**
	 * 	Maximum number of entries to show in the screen.
	 * 	!let maxsize: number;
	 */
	maxsize: 30,

	data: List.Pool.alloc(),
	count: 0,

	/**
	 * 	Indicates if output showuld also be passed to `console.debug` as secondary echo.
	 * 	!let debugEcho: boolean;
	 */
	debugEcho: false,

	/**
	 * 	Foreground (text) color.
	 * 	!let color: string;
	 */
	color: '#fff',

	/**
	 * 	Background color.
	 * 	!let background: string;
	 */
	background: '#cf266a',

	/**
	 * 	Debugging variables to show continuously at the top of the log output.
	 * 	!let vars: object;
	 */
	vars: { },

	/**
	 * 	Writes a message to the log buffer, ensure logging has been enabled by calling `enable` first or any messages will be ignored.
	 * 	!function write (msg: string) : void;
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
	 * 	Clears the current log buffer.
	 * 	!function clear () : void;
	 */
	clear: function ()
	{
		this.data.reset();
		this.count = 0;
	},

	/**
	 * 	Enables on-screen logging for cool stuff.
	 *
	 * 	@param x - X-coordinate of the top-left corner.
	 * 	@param y - Y-coordinate of the top-left corner.
	 * 	@param fontSize - Desired font size in `pt` units.
	 * 	@param showFps - Set to `true` to show FPS.
	 * 	@param showIndex - Set to `true to show the message index.
	 *
	 * 	!function enable (x?: number, y?: number, fontSize?: number, showFps?: boolean, showIndex?: boolean) : void;
	 */
	enable: function (x=0, y=0, fontSize=9.5, showFps=true, showIndex=true)
	{
		if (this.enabled) return;
		this.enabled = true;

		if (!showFps) y -= 16;
		let _y = y;

		System.drawQueueAdd ({ draw: function ()
		{
			if (Log.paused) return;

			let tmp = hrnow();

			const g = System.displayBuffer3;

			g.font('bold '+fontSize+'pt Monospace');
			g.textBaseline('top');

			let s = '';

			y = _y;

			if (showFps !== false && System.perf.fps != 0)
			{
				//s = 'fps: ' + System.perf.fps + '/' + System.perf.averageFps + ', update: ' + System.perf.averageUpdateTime + ', draw: ' + System.perf.averageDrawTime /*+ ', extra: ' + System.perf.averageExtraTime*/ + ', frame: ' + System.perf.averageFrameTime;
				s = 'fps: ' + System.perf.fps + '/' + System.perf.averageFps + ', update:' + System.perf.averageUpdateTime + ', draw:' + System.perf.averageDrawTime + ', frame:' + System.perf.averageFrameTime;

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
				s = (showIndex ? "#" + (Log.count-Log.data.length+i+1) + ": " : "> ") + ii.value;

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

	/**
	 * 	Pauses log rendering.
	 * 	!function pause () : void;
	 */
	pause: function ()
	{
		this.paused = true;
		return;
	},

	/**
	 * 	Resumes log rendering.
	 * 	!function resume () : void;
	 */
	resume: function ()
	{
		this.paused = false;
		return;
	}
};

export default Log;
