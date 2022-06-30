
import List from '../utils/list.js';
import Block from './block.js';

export default
{
	init: function(cmd, postinit=false)
	{
		if (!postinit)
		{
			cmd.block = Block.alloc();
			cmd.blocks = List.Pool.alloc();
			return;
		}

		let i;

		while ((i = cmd.block.commands.shift()) != null)
		{
			let block = Block.alloc();
			block.add(i);
			cmd.blocks.push(block);
		}

		cmd.block.free();
		cmd.block = null;
	},

	update: function (anim, block, cmd)
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
		let n = 0, m = 0;

		for (let i = cmd.blocks.top; i !== null; i = i.next)
		{
			let r = i.value.update(anim);
			if (r === true) n++; else if (r === null) m++;

			if (i.value.time > time)
				time = i.value.time;
		}

		if ((n+m) != cmd.blocks.length)
			return false;

		cmd.started = false;
		block.time = time;

		return true;
	}
};
