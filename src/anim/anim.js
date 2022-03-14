/*
**	froxel/anim/anim.js
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

import { Class } from 'rinn';
import List from '../utils/list.js';
import Recycler from '../utils/recycler.js';

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

//:/**
//: * 	Class to animate properties using commands.
//: */

//!class Anim

const Anim = Class.extend
({
	className: 'Anim',

	initialData: null,
	data: null,

	blockStack: null,
	cmdStack: null,

	timeScale: 1,
	block: null,
	time: 0,

	paused: false,
	finished: false,

	finishedCallback: null,
	finishedCallbackHandler: null,
	finishedCallbackContext: null,

	__ctor: function ()
	{
		// VIOLET: Possibly optimize this.
		this.initialData = { };
		this.data = { };

		this.block = Block.alloc();
		this.blockStack = List.Pool.alloc();
		this.cmdStack = List.Pool.alloc();

		return this.reset();
	},

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

	copyTo: function (target)
	{
		target.clear();

		dispose(target.block);
		target.block = this.block.clone();

		target.initialData = this.initialData;

		return target.reset();
	},

	onFinished: function (callback)
	{
		this.finishedCallback = callback;
		return this;
	},

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

	thenCallback: function ()
	{
		if (!this.finishedCallbackHandler.length)
			return false;

		let context = this.finishedCallbackContext.shift();
		this.finishedCallbackHandler.shift()(this, context);
	},

	/*
	**	Clears the object, removes all commands and callbacks. The `initialData` and `data` objects aren't changed.
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

	/*
	**	Resets the animation to its initial state.
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

	/*
	**	Sets the initial data.
	*/
	initial: function (data=null)
	{
		if (data !== null)
			this.initialData = data;

		Object.assign (this.data, this.initialData);
		return this;
	},

	/*
	**	Sets the time scale (animation speed).
	*/
	speed: function (value)
	{
		this.timeScale = value > 0.0 ? value : 1.0;
		return this;
	},

	/*
	**	Sets the output data object.
	*/
	output: function (data)
	{
		this.data = data;
		return this;
	},

	/*
	**	Pauses the animation.
	*/
	pause: function ()
	{
		this.paused = true;
		return this;
	},

	/*
	**	Resumes the animation.
	*/
	resume: function ()
	{
		this.finished = false;
		this.paused = false;
		return this;
	},

	/*
	**	Sets the value of a field.
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

	/*
	**	Returns the value of a field. Performs special transforms to the value if certain prefix is found.
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
	 *
	 * @param {number} dt
	 * @returns {boolean}
	 */
	update: function (dt, self=null)
	{
		if (self === null)
			self = this;

		if (self.paused || self.block.isFinished())
			return false;

		self.time += dt*self.timeScale*Anim.timeScale;

		if (self.block.update(self) !== true)
			return true;

		let finished = self.finished;
		let count = self.block.length;
		let block = self.block;

		self.finished = true;

		if (!finished && self.finishedCallback !== null)
		{
			if (self.finishedCallback(self.data, self) === false)
				self.finishedCallback = null;

			if (self.block !== block || self.block.length != count)
			{
				self.resume();
				return true;
			}
		}

		return false;
	},

	/*
	**	Ensures that the field name is correct for subsequent rules.
	*/
	prepareFieldName: function (value)
	{
		if (typeof(value) === 'function')
			return value;

		return value.indexOf('.') != -1 ? value.split('.') : value;
	},

	/* ****************************************************************************************** */

	/*
	**	Runs the subsequent commands in parallel. Should end the parallel block by calling end().
	*/
	parallel: function ()
	{
		let cmd = this.block.add(Command.alloc(PARALLEL));

		this.blockStack.push (this.block);
		this.cmdStack.push (cmd);

		this.block = cmd.block;
		return this;
	},

	/*
	**	Runs the subsequent commands in series. Should end the serial block by calling end().
	*/
	serial: function ()
	{
		let cmd = this.block.add(Command.alloc(SERIAL));

		this.blockStack.push (this.block);
		this.cmdStack.push (cmd);

		this.block = cmd.block;
		return this;
	},

	/*
	**	Repeats a block the specified number of times.
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

	/*
	**	Ends a parallel(), serial() or repeat() block.
	*/
	end: function ()
	{
		this.cmdStack.pop().ready();
		this.block = this.blockStack.pop();
		return this;
	},

	/*
	**	Sets the value of a variable.
	*/
	set: function (field, value)
	{
		let cmd = this.block.add(Command.alloc(SET));

		cmd.field = this.prepareFieldName(field);
		cmd.value = value;

		return this;
	},

	/*
	**	Restarts the current block.
	*/
	restart: function ()
	{
		this.block.add(Command.alloc(RESTART));
		return this;
	},

	/*
	**	Waits for the specified duration.
	*/
	wait: function (duration)
	{
		let cmd = this.block.add(Command.alloc(WAIT));

		cmd.duration = duration;

		return this;
	},

	/*
	**	Sets the range of a variable.
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

	/*
	**	Sets the range of a variable, using the current value as startValue.
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

	/*
	**	Generates a certain amount of random numbers in the given range (inclusive).
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

	/*
	**	Generates a certain amount of random numbers in the given range (inclusive). This uses a static random table to determine the next values.
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

	/*
	**	Plays a sound.
	*/
	play: function (snd)
	{
		let cmd = this.block.add(Command.alloc(PLAY));
		cmd.snd = snd;

		return this;
	},

	/*
	**	Executes a function.
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

	/*
	**	Sets X coordinate.
	*/
	setX: function (value)
	{
		return this.set(this._bounds_x1, value);
	},

	/*
	**	Sets Y coordinate.
	*/
	setY: function (value)
	{
		return this.set(this._bounds_y1, value);
	},

	/*
	**	Sets X and Y coordinates.
	*/
	position: function (x, y)
	{
		return this.set(this._bounds_x1, x).set(this._bounds_y1, y);
	},

	/*
	**	Translates the X coordinate.
	*/
	translateX: function (duration, deltaValue, easing)
	{
		return this.range(this._bounds_x1, duration, null, (deltaValue < 0 ? '-' : '+') + Math.abs(deltaValue), easing);
	},

	/*
	**	Translates the Y coordinate.
	*/
	translateY: function (duration, deltaValue, easing)
	{
		return this.range(this._bounds_y1, duration, null, (deltaValue < 0 ? '-' : '+') + Math.abs(deltaValue), easing);
	},

	/*
	**	Translates the X and Y coordinates.
	*/
	translate: function (duration, deltaValueX, deltaValueY, easingX, easingY=null)
	{
		return this.parallel()
					.range(this._bounds_x1, duration, null, (deltaValueX < 0 ? '-' : '+') + Math.abs(deltaValueX), easingX)
					.range(this._bounds_y1, duration, null, (deltaValueY < 0 ? '-' : '+') + Math.abs(deltaValueY), easingY ? easingY : easingX)
				.end();
	},

	/*
	**	Sets the X and Y coordinates to the specified values.
	*/
	moveTo: function (duration, endValueX, endValueY, easingX, easingY=null)
	{
		return this.parallel()
				.range(this._bounds_x1, duration, null, endValueX, easingX)
				.range(this._bounds_y1, duration, null, endValueY, easingY ? easingY : easingX)
				.end();
	},

	/*
	**	Sets the X coordinate to the specified value.
	*/
	moveX: function (duration, endValue, easing=null)
	{
		return this.range(this._bounds_x1, duration, null, endValue, easing);
	},

	/*
	**	Sets the Y coordinate to the specified value.
	*/
	moveY: function (duration, endValue, easing=null)
	{
		return this.range(this._bounds_y1, duration, null, endValue, easing);
	},

	/*
	**	Scales the X coordinate.
	*/
	scaleX: function (duration, endValue, easing)
	{
		return this.range('sx', duration, null, endValue, easing);
	},

	/*
	**	Scales the Y coordinate.
	*/
	scaleY: function (duration, endValue, easing)
	{
		return this.range('sy', duration, null, endValue, easing);
	},

	/*
	**	Scales the X and Y coordinates.
	*/
	scale: function (duration, endValueX, endValueY, easingX, easingY=null)
	{
		return this.parallel()
				.range('sx', duration, null, endValueX, easingX)
				.range('sy', duration, null, endValueY, easingY ? easingY : easingX)
				.end();
	},

	/*
	**	Rotates a certain number of radians.
	*/
	rotate: function (duration, deltaValue, easing)
	{
		return this.range('angle', duration, null, (deltaValue < 0 ? '-' : '+') + Math.abs(deltaValue), easing);
	}
});

/*
**	Global time scale.
*/
Anim.timeScale = 1.0;

/*
**	Sets the global time scale (animation speed).
*/
Anim.speed = function (value)
{
	Anim.timeScale = value > 0.0 ? value : 1.0;
};

Recycler.createPool(Anim, 8192);
export default Anim;
