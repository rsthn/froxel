/*
**	froxel/anim/block.js
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
import List from '../utils/list.js';
import Recycler from '../utils/recycler.js';

//!class Block

const Block = Class.extend
({
	className: 'Anim:Block',

	commands: null,

	first: true,
	current: false,
	time: 0,

	/**
	 * 	Initializes the block to its initial state.
	 * 	!init() : Block;
	 */
	init: function()
	{
		this.commands = List.Pool.alloc();
		this.reset(0);
		return this;
	},

	__dtor: function()
	{
		this.clear();
		this.commands.free();
	},

	/**
	 * 	Adds a command to the block.
	 * 	!add (cmd: Command) : Command;
	 */
	add: function(cmd)
	{
		this.commands.push(cmd);
		return cmd;
	},

	/**
	 * 	Clones the block.
	 * 	!clone() : Block;
	 */
	clone: function()
	{
		throw new Error('Method `clone` not implemented in Anim:Block');
	},

	/**
	 * 	Clears the block by removing all commands and resetting it to initial state.
	 * 	!clear() : Block;
	 */
	clear: function()
	{
		this.commands.clear();
		this.reset(0);

		return this;
	},

	/**
	 * 	Resets the block to its initial state. Does not remove commands.
	 * 	!reset(time: number) : Block;
	 */
	reset: function(time)
	{
		this.first = true;
		this.current = null;
		this.time = time;

		return this;
	},

	/**
	 * 	Sets the block to use the first command in the next call to `update`.
	 * 	!restart() : Block;
	 */
	restart: function()
	{
		this.first = true;
		return this;
	},

	/**
	 * 	Returns `true` if all commands in the block have been executed to completion.
	 * 	!isFinished() : boolean;
	 */
	isFinished: function()
	{
		if (this.first === true)
		{
			this.current = this.commands.top;
			this.first = false;
		}

		return this.current === null;
	},

	/**
	 * 	Executes the next command in the block. Returns `true` when block execution is complete.
	 * 	!update (anim: Anim) : boolean;
	 */
	update: function (anim)
	{
		while (!this.isFinished())
		{
			let r = this.current.value.update(anim, this);
			if (r !== true) return r;

			this.current = this.current.next;
		}

		return true;
	}
});

/**
 * 	Allocates a new block.
 * 	!static alloc () : Block;
 */

/**
 * 	Allocates a new block and initializes it.
 * 	!static calloc () : Block;
 */

Recycler.attachTo(Block, 8192);
export default Block;
