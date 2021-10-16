/*
**	froxel/anim/command.js
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

import { Class } from '@rsthn/rin';
import Recycler from '../utils/recycler.js';

//!class Command

const Command = Class.extend
({
	className: 'Anim:Command',

	/**
	 * 	Object having the code of the operation to execute.
	 */
	op: null,

	/**
	 * 	Indicates if execution of the command has started.
	 */
	started: false,

	/**
	 * 	Field related to the command.
	 */
	field: null,

	/**
	 * 	Value related to the field of the command.
	 */
	value: null,

	/**
	 * 	Duration of the command.
	 */
	duration: 0, _duration: 0,

	/**
	 * 	Number of cicles of the command.
	 */
	count: 0, _count: 0,

	/**
	 * 	Initial value for the command's field.
	 */
	startValue: 0, _startValue: 0,

	/**
	 * 	Final value for the command's field.
	 */
	endValue: 0, _endValue: 0,

	/**
	 * 	Easing function to use to interpolate values of the command's field.
	 */
	easing: null,

	_cur: null,
	_last: null,

	/**
	 * 	Block where the command is stored.
	 */
	block: null, /* Block */

	/**
	 * 	Blocks to execute (for commands having multiple blocks).
	 */
	blocks: null, /* List<Block> */

	/**
	 * 	Table with values.
	 */
	table: null,

	/**
	 * 	Sound resource.
	 */
	snd: null,

	/**
	 * 	Function to execute.
	 */
	fn: null,

	/**
	 * 	Initializes the command.
	 * 	!init (op: object) : Command;
	 */
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

	/**
	 * 	Executed when the command properties are ready, to initialize the operation code.
	 * 	!ready() : void;
	 */
	ready: function()
	{
		this.op.init(this, true);
	},

	/**
	 * 	Updates the command execution.
	 * 	!update (anim: Anim, block: Block) : boolean;
	 */
	update: function(anim, block)
	{
		return this.op.update(anim, block, this);
	}
});

/**
 * 	Allocates a new command.
 * 	!static alloc () : Command;
 */

/**
 * 	Allocates a new command and initializes it.
 * 	!static calloc () : Command;
 */

Recycler.attachTo(Command);
export default Command;
