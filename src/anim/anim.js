
import { Class } from 'rinn';
import List from '../utils/list.js';
import Recycler from '../utils/recycler.js';
import sys from '../fxl/system.js';

//![import "../utils/list"]
//![import "../utils/recycler"]

import Block from './block.js';
import Command from './command.js';

//![import "./block"]
//![import "./command"]

import PARALLEL from './parallel.js';
import SERIAL from './serial.js';
import REPEAT from './repeat.js';
import SET from './set.js';
import RESTART from './restart.js';
import WAIT from './wait.js';
import RANGE from './range.js';
import RAND from './rand.js';
import RANDT from './randt.js';
import EXEC from './exec.js';
import PLAY from './play.js';

//:/**
//: * 	Class to animate properties using commands.
//: */

//!class Anim

const Anim = Class.extend
({
	className: 'Anim',

	initialData: null,
	blockStack: null,
	cmdStack: null,
	block: null,

	finishedCallback: null,
	finishedCallbackHandler: null,
	finishedCallbackContext: null,

	/**
	 * Current output data object.
	 * !data: object;
	 */
	data: null,

	/**
	 * Current time scale (animation speed).
	 * !readonly timeScale: number;
	 */
	timeScale: 1,

	/**
	 * Current logical time.
	 * !time: number;
	 */
	time: 0,

	/**
	 * Indicates if the animation is paused.
	 * !readonly paused: boolean;
	 */
	paused: false,

	/**
	 * Indicates if the animation has finished.
	 * !readonly finished: boolean;
	 */
	finished: false,

	/**
	 * Indicates if the animation is running.
	 * !readonly running: boolean;
	 */
	running: false,

	/**
	 * Indicates if the anim should be automatically disposed when finished.
	 * !autoDispose: boolean;
	 */
	autoDispose: false,

	/**
	 * Constructs a new empty Anim object.
	 * @returns {Anim}
	 * !constructor ();
	 */
	__ctor: function ()
	{
		// VIOLET: Possibly optimize this { } objects.
		this.initialData = { };
		this.data = { };

		this.block = Block.alloc();
		this.blockStack = List.Pool.alloc();
		this.cmdStack = List.Pool.alloc();

		this.running = false;
		this.autoDispose = false;

		this.finishedCallback = null;
		this.finishedCallbackHandler = null;
		this.finishedCallbackContext = null;

		return this.reset();
	},

	/**
	 * Destructor.
	 */
	__dtor: function ()
	{
		this.block.free();
		this.blockStack.clear().free();
		this.cmdStack.clear().free();

		if (this.finishedCallbackHandler !== null)
		{
			this.finishedCallbackHandler.free();
			this.finishedCallbackHandler = null;
		}

		if (this.finishedCallbackContext !== null)
		{
			this.finishedCallbackContext.free();
			this.finishedCallbackContext = null;
		}
	},

	/**
	 * Copies the anim to the specified target and returns it.
	 * @param {Anim} target 
	 * @returns {Anim}
	 * !copyTo (target: Anim) : Anim;
	 */
	copyTo: function (target)
	{
		target.clear();

		dispose(target.block);
		target.block = this.block.clone();

		target.initialData = this.initialData;
		return target.reset();
	},

	/**
	 * Returns a clone of the anim.
	 * @param {boolean} autoDispose - If true, the new anim will be disposed when finished.
	 * @returns {Anim}
	 * !clone (autoDispose?: boolean) : Anim;
	 */
	clone: function (autoDispose=false)
	{
		let anim = new Anim();
		anim.autoDispose = autoDispose;

		this.copyTo(anim);
		return anim;
	},

	/**
	 * Sets the callback to be called when the animation finishes.
	 * @param {(anim: Anim, data: object) => boolean} callback
	 * @returns {Anim}
	 * !onFinished (callback: (anim: Anim, data: object) => boolean) : Anim;
	 */
	onFinished: function (callback)
	{
		this.finishedCallback = callback;
		return this;
	},

	/**
	 * Adds the specified callback to be called when the animation finishes.
	 * @param {(anim: Anim, context?: object) => boolean} callback
	 * @param {object} context
	 * @returns {Anim}
	 * !then (callback: (anim: Anim, context?: object) => boolean, context?: object) : Anim;
	 */
	then: function (callback, context=null)
	{
		if (!callback) return this;

		if (this.finishedCallback !== this.thenCallback)
		{
			this.finishedCallback = this.thenCallback;

			if (this.finishedCallbackHandler === null)
			{
				this.finishedCallbackHandler = List.Pool.alloc();
				this.finishedCallbackContext = List.Pool.alloc();
			}
			else
			{
				this.finishedCallbackHandler.reset();
				this.finishedCallbackContext.reset();
			}
		}

		this.finishedCallbackHandler.push(callback);
		this.finishedCallbackContext.push(context);
		return this;
	},

	thenCallback: function (data, self)
	{
		if (!self.finishedCallbackHandler.length)
			return false;

		let context = self.finishedCallbackContext.shift();
		return self.finishedCallbackHandler.shift()(self, context);
	},

	/**
	 * Clears the object by removing all commands and callbacks. The `initialData` and `data` objects aren't changed.
	 * @returns {Anim}
	 * !clear() : Anim;
	 */
	clear: function ()
	{
		this.blockStack.clear();
		this.cmdStack.clear();
		this.block.clear();

		this.paused = false;
		this.finished = false;
		this.time = 0;
		this.timeScale = 1;

		if (this.finishedCallbackHandler !== null)
		{
			this.finishedCallbackHandler.free();
			this.finishedCallbackHandler = null;
		}

		if (this.finishedCallbackContext !== null)
		{
			this.finishedCallbackContext.free();
			this.finishedCallbackContext = null;
		}

		this.finishedCallback = null;
		return this;
	},

	/**
	 * Resets the animation to its initial state.
	 * @returns {Anim}
	 * !reset() : Anim;
	 */
	reset: function ()
	{
		this.blockStack.clear();
		this.cmdStack.clear();
		this.block.reset();

		this.paused = false;
		this.finished = false;
		this.time = 0;
		this.timeScale = 1;

		Object.assign (this.data, this.initialData);
		return this;
	},

	/**
	 * Cleans up the animation so new commands can be added. Callbacks are not removed.
	 * @returns {Anim}
	 * !cleanup() : Anim;
	 */
	cleanup: function ()
	{
		this.blockStack.clear();
		this.cmdStack.clear();
		this.block.clear();

		this.paused = false;
		this.finished = false;
		this.time = 0;
		this.timeScale = 1;

		return this;
	},

	/**
	 * Sets the initial data of the anim.
	 * @param {object} data
	 * @returns {Anim}
	 * !initial (data: object) : Anim;
	 */
	/**
	 * Sets the anim's data to the initial values.
	 * @returns {Anim}
	 * !initial() : Anim;
	 */
	initial: function (data=null)
	{
		if (data !== null)
			this.initialData = data;

		Object.assign (this.data, this.initialData);
		return this;
	},

	/**
	 * Sets the time scale (animation speed) to the specified value.
	 * @param {number} value - The new time scale, should be greater than 0.
	 * @returns {Anim}
	 * !speed (value: number) : Anim;
	 */
	speed: function (value)
	{
		this.timeScale = value > 0.0 ? value : 1.0;
		return this;
	},

	/**
	 * Sets the output data object.
	 * @param {object} data 
	 * @returns {Anim}
	 * !output (data: object) : Anim;
	 */
	output: function (data)
	{
		this.data = data;
		return this;
	},

	/**
	 * Pauses the animation.
	 * @returns {Anim}
	 * !pause() : Anim;
	 */
	pause: function ()
	{
		if (!this.paused)
			this.paused = true;

		return this;
	},

	/**
	 * Resumes the animation.
	 * @returns {Anim}
	 * !resume() : Anim;
	 */
	resume: function ()
	{
		this.finished = false;
		this.paused = false;

		if (!this.running)
			this.run(false);

		return this;
	},

	/**
	 * Starts the animation.
	 * @param {boolean} reset - If true, the animation will be reset to its initial state.
	 * @returns {Anim}
	 * !run (reset?: boolean) : Anim;
	 */
	run: function (reset=true)
	{
		if (this.running)
			return this;

		if (reset == true)
			this.reset();

		sys.update.add(this.update, this);
		this.running = true;

		return this;
	},

	/**
	 * Sets the value of a field.
	 * @param {string|Function} fieldName 
	 * @param {*} value 
	 */
	setValue: function (fieldName, value)
	{
		let curr = this.data;

		if (typeof(fieldName) !== 'string')
		{
			if (typeof(fieldName) === 'function')
			{
				fieldName (this, value);
			}
			else
			{
				let i = 0;

				while (curr !== null && i < fieldName.length-1)
					curr = curr[fieldName[i++]];

				curr[fieldName[i]] = value;
			}
		}
		else
			curr[fieldName] = value;
	},

	/**
	 * Returns the value of a field. Performs special transforms to the value if certain prefix is found.
	 * @param {string|Function} fieldName 
	 * @param {*} value 
	 * @param {*} initialValue 
	 * @returns {*}
	 */
	getValue: function (fieldName, value=null, initialValue=null)
	{
		let curr = this.data;
		
		if (typeof(fieldName) !== 'string')
		{
			if (typeof(fieldName) === 'function')
			{
				curr = fieldName (this, null);
			}
			else
			{
				let i = 0;

				while (curr !== null && i < fieldName.length)
					curr = curr[fieldName[i++]];
			}
		}
		else
			curr = curr[fieldName];

		if (value === null)
			value = curr;

		if (initialValue === null)
			initialValue = curr;

		if (typeof(value) === 'string')
		{
			switch(value[0])
			{
				case '+':
					value = initialValue + Number(value.substr(1));
					break;

				case '-':
					value = initialValue - Number(value.substr(1));
					break;

				default:
					value = Number(value);
					break;
			}
		}
		else if (typeof(value) === 'function')
			value = value (curr, initialValue, this);

		return value;
	},

	/**
	 * Updates the animation by the specified delta, which must be in the same unit as the duration of the commands.
	 * Returns false when the animation has been completed.
	 * @param {number} dt
	 * @param {Anim} self
	 * @returns {boolean}
	 * !update (dt: number, self?: Anim) : boolean;
	 */
	update: function (dt, self=null)
	{
		if (self === null)
			self = this;

		if (self.paused || self.block.isFinished())
		{
			self.running = false;
			return false;
		}

		self.time += dt*self.timeScale*Anim.timeScale;

		if (self.block.update(self) !== true)
			return true;

		let finished = self.finished;
		let stamp = self.block.stamp;
		let block = self.block;

		self.finished = true;

		if (!finished && self.finishedCallback !== null)
		{
			if (self.finishedCallback(self.data, self) === false)
				self.finishedCallback = null;

			if (self.block !== block || self.block.stamp != stamp)
			{
				self.resume();
				return true;
			}
		}

		self.running = false;

		if (self.autoDispose)
			dispose(self);

		return false;
	},

	/**
	 * Ensures that the field name is correct for subsequent rules.
	 * @param {string|Function} value 
	 * @returns {Array}
	 */
	prepareFieldName: function (value)
	{
		if (typeof(value) === 'function')
			return value;

		return value.indexOf('.') != -1 ? value.split('.') : value;
	},

	/* ****************************************************************************************** */

	/**
	 * Runs the subsequent commands in parallel. Should end the parallel block by calling `end`.
	 * @returns {Anim}
	 * !parallel() : Anim;
	 */
	parallel: function ()
	{
		let cmd = this.block.add(Command.alloc(PARALLEL));

		this.blockStack.push (this.block);
		this.cmdStack.push (cmd);

		this.block = cmd.block;
		return this;
	},

	/**
	 * Runs the subsequent commands in series. Should end the serial block by calling `end`.
	 * @returns {Anim}
	 * !serial() : Anim;
	 */
	serial: function ()
	{
		let cmd = this.block.add(Command.alloc(SERIAL));

		this.blockStack.push (this.block);
		this.cmdStack.push (cmd);

		this.block = cmd.block;
		return this;
	},

	/**
	 * Repeats a block the specified number of times.
	 * @param {number} count 
	 * @returns {Anim}
	 * !repeat (count: number) : Anim;
	 */
	repeat: function (count)
	{
		let cmd = this.block.add(Command.alloc(REPEAT));
		cmd.count = count;

		this.blockStack.push (this.block);
		this.cmdStack.push (cmd);

		this.block = cmd.block;
		return this;
	},

	/**
	 * Ends a `parallel`, `serial` or `repeat` block.
	 * @returns {Anim}
	 * !end() : Anim;
	 */
	end: function ()
	{
		this.cmdStack.pop().ready();
		this.block = this.blockStack.pop();
		return this;
	},

	/**
	 * Sets the value of a variable.
	 * @param {string|Function} field 
	 * @param {*} value 
	 * @returns {Anim}
	 * !set (field: string|Function, value: any) : Anim;
	 */
	set: function (field, value)
	{
		let cmd = this.block.add(Command.alloc(SET));

		cmd.field = this.prepareFieldName(field);
		cmd.value = value;

		return this;
	},

	/**
	 * Restarts the current block.
	 * @returns {Anim}
	 * !restart() : Anim;
	 */
	restart: function ()
	{
		this.block.add(Command.alloc(RESTART));
		return this;
	},

	/**
	 * Waits for the specified duration.
	 * @param {number} duration 
	 * @returns {Anim}
	 * !wait (duration: number) : Anim;
	 */
	wait: function (duration)
	{
		let cmd = this.block.add(Command.alloc(WAIT));

		cmd.duration = duration;

		return this;
	},

	/**
	 * Animates a variable from the startValue to the endValue over the specified duration.
	 * @param {string|Function} field 
	 * @param {number} duration 
	 * @param {number} startValue 
	 * @param {number} endValue 
	 * @param {(t: number) => number} easing?
	 * @returns {Anim}
	 * !range (field: string|Function, duration: number, startValue: number, endValue: number, easing?: (t: number) => number) : Anim;
	 */
	range: function (field, duration, startValue, endValue, easing=null)
	{
		let cmd = this.block.add(Command.alloc(RANGE));

		cmd.field = this.prepareFieldName(field);
		cmd.duration = duration;
		cmd.startValue = startValue;
		cmd.endValue = endValue;
		cmd.easing = easing;

		return this;
	},

	/**
	 * Animates a variable from the current value to the endValue over the specified duration.
	 * @param {string|Function} field 
	 * @param {number} duration 
	 * @param {number} endValue 
	 * @param {(t: number) => number} easing?
	 * @returns {Anim}
	 * !rangeTo (field: string|Function, duration: number, endValue: number, easing?: (t: number) => number) : Anim;
	 */
	rangeTo: function (field, duration, endValue, easing=null)
	{
		let cmd = this.block.add(Command.alloc(RANGE));

		cmd.field = this.prepareFieldName(field);
		cmd.duration = duration;
		cmd.startValue = null;
		cmd.endValue = endValue;
		cmd.easing = easing;

		return this;
	},

	/**
	 * Changes the variable with a value that is a random number in the given range (inclusive) for the specified duration.
	 * @param {string|Function} field 
	 * @param {number} duration 
	 * @param {number} count 
	 * @param {number} startValue 
	 * @param {number} endValue 
	 * @param {(t: number) => number} easing?
	 * @returns {Anim}
	 * !rand (field: string|Function, duration: number, count: number, startValue: number, endValue: number, easing?: (t: number) => number) : Anim;
	 */
	rand: function (field, duration, count, startValue, endValue, easing=null)
	{
		let cmd = this.block.add(Command.alloc(RAND));

		cmd.field = this.prepareFieldName(field);
		cmd.duration = duration;
		cmd.count = count;
		cmd.startValue = startValue;
		cmd.endValue = endValue;
		cmd.easing = easing;

		return this;
	},

	/**
	 * Changes the variable with a value that is a random number in the given range (inclusive) for the specified duration. The difference
	 * between this and `rand` is that this function uses a static pre-generated table of random numbers between the specified range.
	 *
	 * @param {string|Function} field 
	 * @param {number} duration 
	 * @param {number} count 
	 * @param {number} startValue 
	 * @param {number} endValue 
	 * @param {(t: number) => number} easing?
	 * @returns {Anim}
	 * !randt (field: string|Function, duration: number, count: number, startValue: number, endValue: number, easing?: (t: number) => number) : Anim;
	 */
	randt: function (field, duration, count, startValue, endValue, easing)
	{
		let cmd = this.block.add(Command.alloc(RANDT));

		cmd.field = this.prepareFieldName(field);
		cmd.duration = duration;
		cmd.count = count;
		cmd.startValue = startValue;
		cmd.endValue = endValue;
		cmd.easing = easing;

		cmd.ready();

		return this;
	},

	/**
	 * Plays a sound.
	 * @param {object} snd 
	 * @returns {Anim}
	 * !play (snd: object) : Anim;
	 */
	play: function (snd)
	{
		let cmd = this.block.add(Command.alloc(PLAY));
		cmd.snd = snd;

		return this;
	},

	/**
	 * Executes a function. If continuous execution is needed, simply return `true`.
	 * @param {(dt: number, data: object, cmd: Command, anim: Anim) => boolean} fn 
	 * @returns {Anim}
	 * !exec (fn: (dt: number, data: object, anim: Anim) => boolean) : Anim;
	 */
	exec: function (fn)
	{
		let cmd = this.block.add(Command.alloc(EXEC));
		cmd.fn = fn;

		return this;
	},

	/* ********************************************************** */

	_bounds_x1: function (anim, value)
	{
		if (value === null)
			return anim.data.bounds.x1;

		anim.data.translate(int(value) - anim.data.bounds.x1, 0);
	},

	_bounds_y1: function (anim, value)
	{
		if (value === null)
			return anim.data.bounds.y1;

		anim.data.translate(0, int(value) - anim.data.bounds.y1);
	},

	/**
	 * Sets X coordinate.
	 * @param {number} value 
	 * @returns {Anim}
	 * !setX (value: number) : Anim;
	 */
	setX: function (value)
	{
		return this.set(this._bounds_x1, value);
	},

	/**
	 * Sets Y coordinate.
	 * @param {number} value 
	 * @returns {Anim}
	 * !setY (value: number) : Anim;
	 */
	setY: function (value)
	{
		return this.set(this._bounds_y1, value);
	},

	/**
	 * Sets both the X and Y coordinates.
	 * @param {number} x 
	 * @param {number} y 
	 * @returns {Anim}
	 * !position (x: number, y: number) : Anim;
	 */
	position: function (x, y)
	{
		return this.set(this._bounds_x1, x).set(this._bounds_y1, y);
	},

	/**
	 * Translates the X coordinate for the specified amount over the specified duration.
	 * @param {number} duration 
	 * @param {number} deltaValue 
	 * @param {(t: number) => number} easing?
	 * @returns {Anim}
	 * !translateX (duration: number, deltaValue: number, easing?: (t: number) => number) : Anim;
	 */
	translateX: function (duration, deltaValue, easing)
	{
		return this.range(this._bounds_x1, duration, null, (deltaValue < 0 ? '-' : '+') + Math.abs(deltaValue), easing);
	},

	/**
	 * Translates the Y coordinate for the specified amount over the specified duration.
	 * @param {number} duration 
	 * @param {number} deltaValue 
	 * @param {(t: number) => number} easing?
	 * @returns {Anim}
	 * !translateY (duration: number, deltaValue: number, easing?: (t: number) => number) : Anim;
	 */
	translateY: function (duration, deltaValue, easing)
	{
		return this.range(this._bounds_y1, duration, null, (deltaValue < 0 ? '-' : '+') + Math.abs(deltaValue), easing);
	},

	/**
	 * Translates the X and Y coordinates for the specified amount over the specified duration.
	 * @param {number} duration 
	 * @param {number} deltaValueX 
	 * @param {number} deltaValueY 
	 * @param {(t: number) => number} easingX?
	 * @param {(t: number) => number} easingY?
	 * @returns {Anim}
	 * !translate (duration: number, deltaValueX: number, deltaValueY: number, easingX?: (t: number) => number, easingY?: (t: number) => number) : Anim;
	 */
	translate: function (duration, deltaValueX, deltaValueY, easingX, easingY=null)
	{
		return this.parallel()
					.range(this._bounds_x1, duration, null, (deltaValueX < 0 ? '-' : '+') + Math.abs(deltaValueX), easingX)
					.range(this._bounds_y1, duration, null, (deltaValueY < 0 ? '-' : '+') + Math.abs(deltaValueY), easingY ? easingY : easingX)
				.end();
	},

	/**
	 * Translates the X and Y coordinates to the specified end values over the specified duration.
	 * @param {numbe} duration 
	 * @param {number} endValueX 
	 * @param {number} endValueY 
	 * @param {(t: number) => number} easingX?
	 * @param {(t: number) => number} easingY?
	 * @returns {Anim}
	 * !moveTo (duration: number, endValueX: number, endValueY: number, easingX?: (t: number) => number, easingY?: (t: number) => number) : Anim;
	 */
	moveTo: function (duration, endValueX, endValueY, easingX=null, easingY=null)
	{
		return this.parallel()
				.range(this._bounds_x1, duration, null, endValueX, easingX)
				.range(this._bounds_y1, duration, null, endValueY, easingY ? easingY : easingX)
				.end();
	},

	/**
	 * Translates the X coordinate to the specified end value over the specified duration.
	 * @param {number} duration 
	 * @param {number} endValue 
	 * @param {(t: number) => number} easing?
	 * @returns {Anim}
	 */
	moveX: function (duration, endValue, easing=null)
	{
		return this.range(this._bounds_x1, duration, null, endValue, easing);
	},

	/**
	 * Translates the Y coordinate to the specified end value over the specified duration.
	 * @param {number} duration 
	 * @param {number} endValue 
	 * @param {(t: number) => number} easing?
	 * @returns {Anim}
	 */
	moveY: function (duration, endValue, easing=null)
	{
		return this.range(this._bounds_y1, duration, null, endValue, easing);
	},

	/**
	 * Changes the `sx` (scale X) property to the specified end value over the specified duration.
	 * @param {numbe} duration 
	 * @param {numbber} endValue 
	 * @param {(t: number) => number} easing?
	 * @returns {Anim}
	 */
	scaleX: function (duration, endValue, easing)
	{
		return this.range('sx', duration, null, endValue, easing);
	},

	/**
	 * Changes the `sy` (scale Y) property to the specified end value over the specified duration.
	 * @param {number} duration 
	 * @param {numbe} endValue 
	 * @param {(t: number) => number} easing?
	 * @returns {Anim}
	 */
	scaleY: function (duration, endValue, easing)
	{
		return this.range('sy', duration, null, endValue, easing);
	},

	/**
	 * Changes the `sx` and `sy` (scale X and scale Y) properties to the specified end values over the specified duration.
	 * @param {number} duration
	 * @param {number} endValueX
	 * @param {number} endValueY
	 * @param {(t: number) => number} easingX?
	 * @param {(t: number) => number} easingY?
	 * @returns {Anim}
	 * !scale (duration: number, endValueX: number, endValueY: number, easingX?: (t: number) => number, easingY?: (t: number) => number) : Anim;
	 */
	scale: function (duration, endValueX, endValueY, easingX, easingY=null)
	{
		return this.parallel()
				.range('sx', duration, null, endValueX, easingX)
				.range('sy', duration, null, endValueY, easingY ? easingY : easingX)
				.end();
	},

	/**
	 * Changes the `rotation` property by the specified delta value over the specified duration.
	 * @param {number} duration
	 * @param {number} deltaValue
	 * @param {(t: number) => number} easing?
	 * @returns {Anim}
	 * !rotate (duration: number, deltaValue: number, easing?: (t: number) => number) : Anim;
	 */
	rotate: function (duration, deltaValue, easing)
	{
		return this.range('angle', duration, null, (deltaValue < 0 ? '-' : '+') + Math.abs(deltaValue), easing);
	}
});

/**
 * Global animation time scale.
 * !static timeScale: number;
 */
Anim.timeScale = 1.0;

/**
 * Sets the global time scale (animation speed).
 * @param {number} value
 * !static speed (value: number) : void;
 */
Anim.speed = function (value)
{
	Anim.timeScale = value > 0.0 ? value : 1.0;
};

Recycler.createPool(Anim, 2048);
export default Anim;
