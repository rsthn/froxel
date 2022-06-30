
import { Class } from 'rinn';
import List from '../utils/list.js';
import Recycler from '../utils/recycler.js';

//!class Command

const Command = Class.extend
({
	className: 'Anim:Command',

	/**
	 * Object having the code of the operation to execute.
	 */
	op: null,

	/**
	 * Indicates if execution of the command has started.
	 */
	started: false,

	/**
	 * Time when the command started.
	 */
	time: 0,

	/**
	 * Field related to the command.
	 */
	field: null,

	/**
	 * Value related to the field of the command.
	 */
	value: null,

	/**
	 * Duration of the command.
	 */
	duration: 0, _duration: 0,

	/**
	 * Number of cicles of the command.
	 */
	count: 0, _count: 0,

	/**
	 * Initial value for the command's field.
	 */
	startValue: 0, _startValue: 0,

	/**
	 * Final value for the command's field.
	 */
	endValue: 0, _endValue: 0,

	/**
	 * Easing function to use to interpolate values of the command's field.
	 */
	easing: null,

	_cur: null,
	_last: null,

	/**
	 * Block where the command is stored.
	 */
	block: null, /* Block */

	/**
	 * Blocks to execute (for commands having multiple blocks).
	 */
	blocks: null, /* List<Block> */

	/**
	 * Table with values.
	 */
	table: null,

	/**
	 * Sound resource.
	 */
	snd: null,

	/**
	 * Function to execute.
	 */
	fn: null,

	/**
	 * Initializes the command.
	 * !init (op: object) : Command;
	 */
	init: function (op, autoInit)
	{
		this.op = op;
		this.started = false;

		this.block = null;
		this.blocks = null;
	
		this.table = null;
		this.snd = null;
		this.fn = null;

		if (autoInit !== false)
			op.init(this, false);

		return this;
	},

	__dtor: function()
	{
		if (this.block !== null) this.block.clear().free();
		if (this.blocks !== null) this.blocks.clear().free();
	},

	clone: function()
	{
		let cmd = Command.alloc(this.op, false);

	 	cmd.field = this.field
	 	cmd.value = this.value
	 	cmd.duration = this.duration
	 	cmd.count = this.count
	 	cmd.startValue = this.startValue
	 	cmd.endValue = this.endValue
	 	cmd.easing = this.easing;
		cmd.table = this.table;
		cmd.snd = this.snd;
		cmd.fn = this.fn;

		if (this.block !== null)
			cmd.block = this.block.clone();

		if (this.blocks !== null)
		{
			cmd.blocks = List.Pool.alloc();

			for (let node = this.blocks.top; node !== null; node = node.next)
				cmd.blocks.push(node.value.clone());
		}

		return cmd;
	},

	/**
	 * Executed when the command properties are ready, to initialize the operation code.
	 * !ready() : void;
	 */
	ready: function()
	{
		this.op.init(this, true);
	},

	/**
	 * Updates the command execution.
	 * !update (anim: Anim, block: Block) : boolean;
	 */
	update: function(anim, block)
	{
		return this.op.update(anim, block, this);
	}
});

/**
 * Allocates a new command.
 * !static alloc () : Command;
 */

/**
 * Allocates a new command and initializes it.
 * !static calloc () : Command;
 */

Recycler.attachTo(Command);
export default Command;
