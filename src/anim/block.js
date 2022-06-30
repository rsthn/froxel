
import { Class } from 'rinn';
import List from '../utils/list.js';
import Recycler from '../utils/recycler.js';

//!class Block

const Block = Class.extend
({
	className: 'Anim:Block',

	commands: null,

	isFirst: true,
	current: false,
	stamp: 0,
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
	 * Returns the number of commands in the block.
	 * !count() : number;
	 */
	count: function()
	{
		return this.commands.length;
	},

	/**
	 * 	Adds a command to the block.
	 * 	!add (cmd: Command) : Command;
	 */
	add: function (cmd)
	{
		this.commands.push(cmd);

		if (this.isFirst === false && this.current === null)
		{
			this.current = this.commands.bottom;
			this.stamp = rand();
		}

		return cmd;
	},

	/**
	 * 	Clones the block.
	 * 	!clone() : Block;
	 */
	clone: function()
	{
		let block = Block.alloc();

		for (let node = this.commands.top; node !== null; node = node.next)
			block.commands.push(node.value.clone());

		return block;
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
	 * 	!reset (time: number) : Block;
	 */
	reset: function (time=0)
	{
		this.isFirst = true;
		this.current = null;
		this.time = time;
		this.stamp = rand();

		return this;
	},

	/**
	 * 	Sets the block to use the first command in the next call to `update`.
	 * 	!restart() : Block;
	 */
	restart: function()
	{
		this.isFirst = true;
		this.stamp = rand();

		return this;
	},

	/**
	 * 	Returns `true` if all commands in the block have been executed to completion.
	 * 	!isFinished() : boolean;
	 */
	isFinished: function()
	{
		if (this.isFirst === true)
		{
			this.current = this.commands.top;
			this.isFirst = false;
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

Recycler.attachTo(Block, 2048);
export default Block;
