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

import { Rin, Class } from '@rsthn/rin';
import List from '../utils/list.js';
import Recycler from '../utils/recycler.js';

/*
**	Available commands.
*/
const PARALLEL =
{
	init: function(cmd, postinit=false)
	{
		if (!postinit)
		{
			cmd.block = List.calloc();
			cmd.blocks = List.calloc();
			return;
		}

		let i;

		while ((i = cmd.block.shift()) != null)
		{
			let block = Block.alloc();
			block.add(i);
			cmd.blocks.push(block);
		}

		cmd.block.free();
		cmd.block = null;
	},

	update: function(anim, block, cmd)
	{
		if (cmd.started === false)
		{
			for (let i = cmd.blocks.top; i !== null; i = i.next)
			{
				i.value.reset (block.time);
			}

			cmd.started = true;
		}

		let time = block.time;
		let n = 0;

		for (let i = cmd.blocks.top; i !== null; i = i.next)
		{
			if (i.value.update(anim) === true)
				n++;

			if (i.value.time > time)
				time = i.value.time;
		}

		//VIOLET:CALLBACK
		//if (cmd.fn) cmd.fn.call(this);

		if (n != cmd.blocks.length)
			return false;

		cmd.started = false;
		block.time = time;
		return true;
	}
};

const SERIAL =
{
	init: function(cmd, postinit=false)
	{
		if (!postinit)
			cmd.block = List.calloc();
	},

	update: function(anim, block, cmd)
	{
		if (cmd.started === false)
		{
			cmd.block.reset (block.time);
			cmd.started = true;
		}

		if (cmd.block.update(anim) !== true)
			return false;

		//violet:callback
		//if (cmd.fn) cmd.fn.call(this);

		cmd.started = false;
		block.time = cmd.block.time;
		return true;
	}
};

const REPEAT =
{
	init: function(cmd, postinit=false)
	{
		if (!postinit)
			cmd.block = List.calloc();
	},

	update: function(anim, block, cmd)
	{
		if (cmd.started === false)
		{
			cmd.block.reset (block.time);
			cmd._count = cmd.count;

			cmd.started = true;
		}

		if (cmd.block.update(anim) !== true)
			return false;

		// violet callback
		//if (cmd.fn) cmd.fn.call(this);

		if (cmd._count <= 1)
		{
			cmd.started = false;
			block.time = cmd.block.time;
			return true;
		}

		cmd.block.restart();
		cmd._count--;
		return false;
	}
};

const SET =
{
	init: function(cmd, postinit=false)
	{
	},

	update: function(anim, block, cmd)
	{
		anim.data[cmd.field] = anim.getValue(cmd.value, cmd.field);
		return true;
	}
};

const RESTART =
{
	init: function(cmd, postinit=false)
	{
	},

	update: function(anim, block, cmd)
	{
		block.restart();
		return true;
	}
};

const WAIT =
{
	init: function(cmd, postinit=false)
	{
	},

	update: function(anim, block, cmd)
	{
		if (cmd.started === false)
		{
			cmd._duration = Rin.typeOf(cmd.duration) === 'string' ? anim.data[cmd.duration] : cmd.duration;
			cmd.started = true;
		}

		if (anim.time < block.time + cmd._duration)
			return false;

		cmd.started = false;
		block.time += cmd._duration;
		return true;
	}
};

const RANGE =
{
	init: function(cmd, postinit=false)
	{
	},

	update: function(anim, block, cmd)
	{
		if (cmd.started === false)
		{
			cmd._startValue = anim.getValue(cmd.startValue, cmd.field);
			cmd._endValue = anim.getValue(cmd.endValue, cmd.field);
			cmd._duration = Rin.typeOf(cmd.duration) === 'string' ? anim.data[cmd.duration] : cmd.duration;

			cmd.started = true;
		}

		let t = 1.0;

		if (anim.time < block.time + cmd._duration)
			t = (anim.time - block.time) / cmd._duration;

		if (cmd.easing && t != 1.0)
			anim.data[cmd.field] = cmd.easing(t)*(cmd._endValue - cmd._startValue) + cmd._startValue;
		else
			anim.data[cmd.field] = t*(cmd._endValue - cmd._startValue) + cmd._startValue;

		if (t != 1.0)
			return false;

		cmd.started = false;
		block.time += cmd._duration;
		return true;
	}
};

const RAND =
{
	init: function(cmd, postinit=false)
	{
	},

	update: function(anim, block, cmd)
	{
		if (cmd.started === false)
		{
			cmd._duration = Rin.typeOf(cmd.duration) === 'string' ? this.data[cmd.duration] : cmd.duration;
			cmd._last = null;

			cmd.started = true;
		}

		let t = 1.0;

		if (anim.time < block.time + cmd._duration)
			t = (anim.time - block.time) / cmd._duration;

		if (cmd.easing && t != 1.0)
			cmd._cur = int(cmd.easing(t)*cmd.count);
		else
			cmd._cur = int(t*cmd.count);

		if (cmd._cur != cmd._last)
		{
			while (true) {
				let i = int(Math.random()*(cmd.endValue - cmd.startValue + 1)) + cmd.startValue;
				if (i != anim.data[cmd.field]) break;
			}

			anim.data[cmd.field] = i;
			cmd._last = cmd._cur;
		}

		if (t != 1.0)
			return false;

		cmd.started = false;
		block.time += cmd._duration;
		return true;
	}
};

const RANDT =
{
	init: function(cmd, postinit=false)
	{
		if (!postinit) return;

		let table = [ ];

		for (let i = 0; i < cmd.count; i++)
			table.push ((i % (cmd.endValue - cmd.startValue + 1)) + cmd.startValue);

		for (let i = cmd.count >> 2; i > 0; i--)
		{
			let a = int(Math.random() * cmd.count);
			let b = int(Math.random() * cmd.count);

			let c = table[b];
			table[b] = table[a];
			table[a] = c;
		}

		cmd.table = table;
	},

	update: function(anim, block, cmd)
	{
		if (cmd.started === false)
		{
			cmd._duration = Rin.typeOf(cmd.duration) === 'string' ? this.data[cmd.duration] : cmd.duration;
			cmd.started = true;
		}

		let t = 1.0;
		let i;

		if (anim.time < block.time + cmd._duration)
			t = (anim.time - block.time) / cmd._duration;

		if (cmd.easing && t != 1.0)
			i = cmd.easing(t)*(cmd.count-1);
		else
			i = t*(cmd.count-1);

		anim.data[cmd.field] = cmd.table[int((i + cmd.count) % cmd.count)];

		if (t != 1.0)
			return false;

		cmd.started = false;
		block.time += cmd._duration;
		return true;
	}
};

const PLAY =
{
	init: function(cmd, postinit=false)
	{
	},

	update: function(anim, block, cmd)
	{
		//if (cmd.snd instanceof Sound)
		cmd.snd.play();
		//else
		//cmd.snd.wrapper.play();
		return true;
	}
};

const EXEC =
{
	init: function(cmd, postinit=false)
	{
	},

	update: function(anim, block, cmd)
	{
		if (cmd.started === false)
		{
			cmd._last = anim.time;
			cmd.started = true;
		}

		let t = anim.time - cmd._last;
		cmd._last = anim.time;

		if (cmd.fn.call(anim, t, anim.data, anim) === true)
		{
			cmd.started = false;
			return true;
		}

		return false;
	}
};


/*
**	Describes an animation block.
*/
const Block = Class.extend
({
	className: 'Anim_Block',

	commands: null,

	first: true,
	current: false,
	time: 0,

	init: function()
	{
		this.commands = List.calloc();
		this.reset(0);
		return this;
	},

	__dtor: function()
	{
		this.commands.clear().free();
		this.current = null;
	},

	add: function(cmd)
	{
		this.commands.push(cmd);
		return cmd;
	},

	clone: function()
	{
		throw new Error('NOT IMPLEMENTED CLONE ON ANIM');
	},

	reset: function(time)
	{
		this.first = true;
		this.current = null;
		this.time = time;

		return this;
	},

	restart: function()
	{
		this.first = true;
		return this;
	},

	isFinished: function()
	{
		if (this.first === true)
		{
			this.current = this.commands.top;
			this.first = false;
		}

		return this.current === null;
	},

	update: function (anim)
	{
		while (!this.isFinished())
		{
			if (this.current.update(anim, this) !== true)
				return false;

			this.current = this.current.next;
		}

		return true;
	}
});

Recycler.attachTo(Block);


/*
**	Describes an animation command.
*/
const Command = Class.extend
({
	className: 'Anim_Command',

	op: null,
	started: false,

	field: null,
	value: null,

	duration: 0, _duration: 0,
	count: 0, _count: 0,

	startValue: 0, _startValue: 0,
	endValue: 0, _endValue: 0,
	easing: null,

	_cur: null,
	_last: null,

	block: null, /* Block */
	blocks: null, /* List<Block> */

	table: null,
	snd: null,
	fn: null,

	init: function(op)
	{
		this.op = op;
		this.started = false;

		this.block = null;
		this.blocks = null;
	
		this.table = null;
		this.snd = null;
		this.fn = null;

		op.init(this, false);
		return this;
	},

	__dtor: function()
	{
		if (this.block !== null) this.block.clear().free();
		if (this.blocks !== null) this.blocks.clear().free();
	},

	ready: function()
	{
		this.op.init(this, true);
	},

	update: function(anim, block)
	{
		return this.op.update(anim, block, this);
	}
});

Recycler.attachTo(Command);


/**
**	Class to animate properties using commands.
*/
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
	finishedCallbackChain: null,

	init: function ()
	{
		this.initialData = { };
		this.data = { };

		this.block = Block.calloc();
		this.blockStack = List.calloc();
		this.cmdStack = List.calloc();

		return this.reset();
	},

	__dtor: function ()
	{
		this.block.free();
		this.blockStack.clear().free();
		this.cmdStack.clear().free();

		if (this.finishedCallbackChain !== null)
			this.finishedCallbackChain.free();
	},

	copyTo: function (target)
	{
		target.block = this.block.clone();
		target.initialData = this.initialData;

		return target.reset();
	},

	onFinished: function (callback)
	{
		this.finishedCallback = callback;
		return this;
	},

	then: function (callback)
	{
		if (this.finishedCallback !== this.thenCallback)
		{
			this.finishedCallback = this.thenCallback;

			if (this.finishedCallbackChain === null)
				this.finishedCallbackChain = List.calloc();
			else
				this.finishedCallbackChain.reset();
		}

		this.finishedCallbackChain.push(callback);
		return this;
	},

	thenCallback: function ()
	{
		if (!this.finishedCallbackChain.length)
			return false;

		this.finishedCallbackChain.shift().call(this);
	},

	/*
	**	Clears the object and removes all commands. The finished callback, initialData and data objects aren't changed.
	*/
	clear: function ()
	{
		this.blockStack.clear();
		this.cmdStack.clear();
		this.block.clear();

		this.paused = false;
		this.finished = false;
		this.time = 0;

		return this;
	},

	/*
	**	Resets the animation to its initial state (using initialData). The finished callback isn't changed.
	*/
	reset: function ()
	{
		this.blockStack.clear();
		this.cmdStack.clear();
		this.block.reset();

		this.paused = false;
		this.finished = false;
		this.time = 0;

		Object.assign (this.data, this.initialData);
		return this;
	},

	/*
	**	Sets the initial data.
	*/
	initial: function (data)
	{
		this.initialData = data;
		return this.reset();
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
	**	Returns the value of a field. Performs special transforms to the value if certain prefix is found.
	*/
	getValue: function (value, fieldName)
	{
		let curr = this.data[fieldName];

		if (value === null)
			value = curr;

		if (typeof(value) === 'string')
		{
			switch(value[0])
			{
				case '+':
					value = curr + Number(value.substr(1));
					break;

				case '-':
					value = curr - Number(value.substr(1));
					break;

				default:
					value = Number(value);
					break;
			}
		}

		if (typeof(value) === 'function')
			value = value.call(this, this.data[fieldName], this.data, this);

		return value;
	},

	/*
	**	Updates the animation by the specified delta time, ensure the time is specified in the same unit as the duration of the commands.
	*/
	update: function (dt)
	{
		if (this.paused || this.block.isFinished())
			return true;

		this.time += dt*this.timeScale*Anim.timeScale;

		if (this.block.update(this) !== true)
			return false;

		let finished = this.finished;
		let count = this.block.length;
		let block = this.block;

		this.finished = true;

		if (!finished && this.finishedCallback !== null)
		{
			if (this.finishedCallback(this.data, this) === false)
				this.finishedCallback = null;

			if (this.block !== block || this.block.length != count)
			{
				this.resume();
				return false;
			}
		}

		return true;
	},

	/*
	**	Runs the subsequent commands in parallel. Should end the parallel block by calling end().
	*/
	parallel: function ()
	{
		let cmd = this.block.add(Command.alloc().init(PARALLEL));

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
		let cmd = this.block.add(Command.alloc().init(SERIAL));

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
		let cmd = this.block.add(Command.alloc().init(REPEAT));
		cmd.count = count;

		this.blockStack.push (this.block);
		this.cmdStack.push (cmd);

		this.block = cmd.block;
		return this;
	},

	/*
	**	Sets the callback of the current block.
	*/
	callback: function (fn)
	{
		//violet fix
		//let block = this.blockStack.last();
		//block[block.length-1].fn = fn;

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
		let cmd = this.block.add(Command.alloc().init(SET));

		cmd.field = field;
		cmd.value = value;

		return this;
	},

	/*
	**	Restarts the current block.
	*/
	restart: function ()
	{
		this.block.add(Command.alloc().init(RESTART));
		return this;
	},

	/*
	**	Waits for the specified duration.
	*/
	wait: function (duration)
	{
		let cmd = this.block.add(Command.alloc().init(WAIT));

		cmd.duration = duration;

		return this;
	},

	/*
	**	Sets the range of a variable.
	*/
	range: function (field, duration, startValue, endValue, easing=null)
	{
		let cmd = this.block.add(Command.alloc().init(RANGE));

		cmd.field = field;
		cmd.duration = duration;
		cmd.startValue = startValue;
		cmd.endValue = endValue;
		cmd.easing = easing;

		return this;
	},

	/*
	**	Generates a certain amount of random numbers in the given range (inclusive).
	*/
	rand: function (field, duration, count, startValue, endValue, easing=null)
	{
		let cmd = this.block.add(Command.alloc().init(RAND));

		cmd.field = field;
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
		let cmd = this.block.add(Command.alloc().init(RANDT));

		cmd.field = field;
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
		let cmd = this.block.add(Command.alloc().init(PLAY));
		cmd.snd = snd;

		return this;
	},

	/*
	**	Executes a function.
	*/
	exec: function (fn)
	{
		let cmd = this.block.add(Command.alloc().init(EXEC));
		cmd.fn = fn;

		return this;
	},

	/* ********************************************************** */

	/*
	**	Sets X coordinate.
	*/
	setX: function (value)
	{
		return this.set('x', value);
	},

	/*
	**	Sets Y coordinate.
	*/
	setY: function (value)
	{
		return this.set('y', value);
	},

	/*
	**	Sets X and Y coordinates.
	*/
	position: function (x, y)
	{
		return this.set('x', x).set('y', y);
	},

	/*
	**	Translates the X coordinate.
	*/
	translateX: function (duration, deltaValue, easing)
	{
		return this.range('x', duration, null, (deltaValue < 0 ? '-' : '+') + Math.abs(deltaValue), easing);
	},

	/*
	**	Translates the Y coordinate.
	*/
	translateY: function (duration, deltaValue, easing)
	{
		return this.range('y', duration, null, (deltaValue < 0 ? '-' : '+') + Math.abs(deltaValue), easing);
	},

	/*
	**	Translates the X and Y coordinates.
	*/
	translate: function (duration, deltaValueX, deltaValueY, easingX, easingY=null)
	{
		return this.parallel()
				.range('x', duration, null, (deltaValueX < 0 ? '-' : '+') + Math.abs(deltaValueX), easingX)
				.range('y', duration, null, (deltaValueY < 0 ? '-' : '+') + Math.abs(deltaValueY), easingY ? easingY : easingX)
				.end();
	},

	/*
	**	Sets the X and Y coordinates to the specified values.
	*/
	moveTo: function (duration, endValueX, endValueY, easingX, easingY=null)
	{
		return this.parallel()
				.range('x', duration, null, endValueX, easingX)
				.range('y', duration, null, endValueY, easingY ? easingY : easingX)
				.end();
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

Recycler.attachTo(Anim);


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

export default Anim;
