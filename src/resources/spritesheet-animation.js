/*
**	resources/spritesheet-animation.js
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

import { Class } from 'rinn';
import Spritesheet from './spritesheet.js';
import System from '../system/system.js';
import List from '../utils/list.js';
import Recycler from '../utils/recycler.js';
import Drawable from '../flow/drawable.js';

//![import "./spritesheet"]
//![import "../system/system"]
//![import "../utils/list"]
//![import "../utils/recycler"]

/*
	anim: {
		def: string, fps: int?,

		seq: {
			seq1: { loop: bool?, group: [ [int, int, ...], ... ] },
			seq2: { loop: bool?, group: [ [int, int, ...], ... ] },
			seq2: { loop: bool?, group: "0-12" },
			seq2: { loop: bool?, group: "4 1 1 2 3" },
		},

		trans: {
			seq1: {
				seq2: [ seq_name, seq_name, ... ]
			}
		}
	}

	NOTE: When specifying a group such as "0,12" it means to draw tiles 0 and the 12 in that single frame.
*/

export const Animation = Drawable.extend
({
	className: 'Animation',

	seq: null, seq_i: 0,
	trans: null, trans_i: 0, trans_t: null,

	queue: null,

	fps: 0, frameSeconds: 0, time: 0,

	frameNumber: -1,

	finished: false,
	_paused: false,

	finishedCallback: null,
	finishedCallbackHandler: null,
	finishedCallbackContext: null,

	frameCallback: null,

	__ctor: function (anim, seq, fps)
	{
		this._super.Drawable.__ctor(anim.getImage(), anim.width, anim.height);

		this.anim = anim;
		this.queue = List.Pool.alloc();

		this.seq = seq;
		this.seq_i = 0;

		this.trans = null;
		this.trans_i = 0;
		this.trans_t = null;

		this.frameNumber = -1;
		this.finished = false;
		this._paused = false;

		this.finishedCallback = null;
		this.finishedCallbackHandler = null;
		this.finishedCallbackContext = null;
		this.frameCallback = null;

		this.fps = fps;
		this.setFps (this.seq.fps || this.fps);
	},

	__dtor: function ()
	{
		this.queue.free();

		if (this.finishedCallbackHandler)
			this.finishedCallbackHandler.free();

		if (this.finishedCallbackContext)
			this.finishedCallbackContext.free();
	},

	setFps: function (fps)
	{
		this.frameSeconds = 1.0 / fps;
		this.time = 0;

		return this;
	},

	paused: function (value=null)
	{
		if (value === null)
			return this._paused;

		this._paused = value;
		return this;
	},

	initialDelay: function (dt)
	{
		this.time = -dt;
		return this;
	},

	onFinished: function (callback)
	{
		this.finishedCallback = callback;
		return this;
	},

	then: function (callback, context=null)
	{
		if (callback === false && this.finishedCallback === this.thenCallback)
		{
			this.finishedCallbackHandler.clear();
			this.finishedCallbackContext.clear();
		}

		if (!callback) return this;

		if (this.finishedCallback !== this.thenCallback)
		{
			this.finishedCallback = this.thenCallback;
			this.finishedCallbackHandler = List.Pool.alloc();
			this.finishedCallbackContext = List.Pool.alloc();
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

	onFrame: function (fn)
	{
		this.frameCallback = fn;
		return this;
	},

	setFrame: function (i)
	{
		this.seq_i = int(i) % this.seq.group.length;
		return this;
	},

	getFrame: function (normalized)
	{
		return normalized === true ? (this.seq_i / (this.seq.group.length-1)) : this.seq_i;
	},

	getLength: function ()
	{
		return this.seq.group.length;
	},

	draw: function (g, x=0, y=0, width=null, height=null)
	{
		if (this.time < 0)
		{
			if (!this._paused)
			{
				this.time += this.frameNumber === System.frameNumber ? 0 : System.frameDelta;
				this.frameNumber = System.frameNumber;
			}

			if (this.time > 0) this.time = 0;
			return;
		}

		if (this.seq_i === this.seq.group.length)
		{
			let t = this.seq.group[this.seq_i-1];

			if (g !== null)
			{
				for (let i = 0; i < t.length; i++)
					this.anim.getFrame(t[i]).draw(g, x, y, width, height);
			}

			return;
		}

		let t = this.seq.group[this.seq_i];

		if (g !== null)
		{
			for (let i = 0; i < t.length; i++)
				this.anim.getFrame(t[i]).draw(g, x, y, width, height);
		}

		if (!this._paused)
		{
			this.time += this.frameNumber === System.frameNumber ? 0 : System.frameDelta;
			this.frameNumber = System.frameNumber;
		}

		if (this.time >= this.frameSeconds)
		{
			const frameIndex = this.seq_i;

			this.time -= this.frameSeconds;
			this.seq_i++;

			if (this.seq_i === this.seq.group.length)
			{
				if (this.trans != null)
				{
					if (++this.trans_i === this.trans.length)
					{
						this.trans = null;
						this.seq = this.trans_t;
					}
					else
						this.seq = this.trans[this.trans_i];

					this.setFps (this.seq.fps || this.fps);

					this.seq_i = 0;
					this.time = 0;

					this.finished = false;
				}
				else
				{
					if (this.seq.loop)
						this.seq_i = 0;
					else
					{
						this.finished = true;

						if (this.finishedCallback)
						{
							if (this.finishedCallback(this) === false)
								this.finishedCallback = null;
						}
					}

					if (this.queue.length)
						this.use(this.queue.shift(), true);
				}
			}

			if (this.frameCallback)
			{
				if (this.frameCallback(frameIndex, this.seq.group.length-1, this) === false)
					this.frameCallback = null;
			}
		}
	},

	getImage: function()
	{
		return this.anim.getImage();
	},

	getDrawable: function()
	{
		return this;
	},

	advance: function ()
	{
		this.paused (false);
		this.draw (null, 0, 0);
	},

	getSequenceName: function ()
	{
		return (this.trans === null ? this.seq : this.trans_t).name;
	},

	use: function (seqName, force=false)
	{
		let seq = this.trans === null ? this.seq : this.trans_t;

		if (seq.name === seqName && !this.finished && force !== true)
			return false;

		if (seq.trans && seq.trans[seqName])
		{
			this.trans_t = this.anim.a.seq[seqName];

			this.trans = seq.trans[seqName];
			this.trans_i = 0;

			this.seq = this.trans[this.trans_i];
		}
		else
		{
			if (force === true)
				this.trans = null;

			this.seq = this.anim.a.seq[seqName];
		}

		this.setFps (this.seq.fps || this.fps);

		this.seq_i = 0;
		this.time = 0;

		this.finished = false;
		return true;
	},

	play: function (name)
	{
		this.use(name);
		return this;
	},

	setQueue: function (list)
	{
		if (!List.isInstance(list))
			throw new Error('setQueue: Parameter must be an instance of List');

		if (this.queue != null)
			this.queue.clear().free();

		this.queue = list;
		this.use(this.queue.shift(), true);
	},

	enqueue: function (seqName, force=false)
	{
		let seq = this.trans === null ? this.seq : this.trans_t;

		let lastName = this.queue.length > 0 ? this.queue[this.queue.length-1] : seq.name;

		if (seq.name === seqName && seq.loop)
			return this;

		if (lastName === seqName && !force)
			return this;

		if (seq.loop || this.finished)
		{
			this.use(seqName, true);
			return this;
		}

		this.queue.push(seqName);
		return this;
	}
});

Recycler.createPool(Animation);

/* ********************************************************** */
export default Spritesheet.extend
({
	className: 'SpritesheetAnimation',

	defaultDrawable: null,
	sharedAnim: null,

	r: null,
	a: null,

	__ctor: function (r)
	{
		if (!r.anim) throw new Error ("Animation descriptors not found.");

		this._super.Spritesheet.__ctor (r);

		this.r = r;
		this.r.wrapper = this;

		let t = this.a = this.r.anim;

		if (t.initialized) return;

		if (!t.def) t.def = 'def';
		if (!t.seq) t.seq = { };

		// Create default sequence if it wasn't defined.
		if (!t.seq[t.def] && (t.def == 'def' || t.def == 'defloop'))
		{
			let p = { loop: (t.def == 'def' ? false : true), group: [ ] };

			for (let i = 0; i < this.numFrames; i++) {
				p.group.push([i]);
			}

			t.seq[t.def] = p;
		}

		if (!t.seq[t.def])
			throw new Error ('Undefined default sequence: ' + t.def);

		if (!t.fps) t.fps = 25;

		t.def = t.seq[t.def];

		let frameIndex = 0;

		for (let i in t.seq)
		{
			t.seq[i].name = i;

			if (!t.seq[i].loop)
				t.seq[i].loop = false;

			if (typeof(t.seq[i].group) == 'string')
			{
				let a, b, c;

				if (t.seq[i].group.indexOf(' ') != -1)
				{
					a = t.seq[i].group.split(' ');
					t.seq[i].group = [ ];

					for (let j in a)
						t.seq[i].group.push([int(a[j])]);
				}
				else if (t.seq[i].group.indexOf('-') != -1)
				{
					c = t.seq[i].group.split('-');
					
					a = int(c[0]);
					b = int(c[1]);

					t.seq[i].group = [ ];

					if (a < b) {
						for (c = a; c <= b; c++)
							t.seq[i].group.push([c]);
					}
					else {
						for (c = a; c >= b; c--)
							t.seq[i].group.push([c]);
					}
				}
				else
				{
					a = int(t.seq[i].group);
					t.seq[i].group = [ ];

					while (a--) t.seq[i].group.push([frameIndex++]);
				}

				t.seq[i].count = t.seq[i].group.length;
			}
		}

		if (t.trans)
		{
			for (let i in t.trans)
			{
				t.seq[i].trans = t.trans[i];

				for (let j in t.trans[i])
				{
					for (let k = 0; k < t.trans[i][j].length; k++)
					{
						let n = t.trans[i][j][k];

						if (!t.seq[n]) throw new Error ('Undefined sequence: ' + n);
						t.trans[i][j][k] = t.seq[n];
					}
				}
			}
		}

		t.initialized = true;
	},

	getSharedAnimation: function (initialseq=null)
	{
		if (this.sharedAnim === null)
		{
			this.sharedAnim = Animation.Pool.alloc(this, initialseq ? this.a.seq[initialseq] : this.a.def, this.a.fps);
			this.sharedAnim.lockInstance(true);

			return this.sharedAnim;
		}

		return this.sharedAnim.play(initialseq ? initialseq : this.a.def.name);
	},

	getAnimation: function (initialseq=null, fps=null)
	{
		return Animation.Pool.alloc(this, initialseq ? this.a.seq[initialseq] : this.a.def, fps || this.a.fps);
	},

	getSequence: function (name)
	{
		return this.a.seq[name];
	},

	getDrawable: function()
	{
		if (this.defaultDrawable === null)
			this.defaultDrawable = this.getAnimation();

		return this.defaultDrawable;
	}
});
