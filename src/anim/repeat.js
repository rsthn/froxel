
import Block from './block.js';

export default
{
	init: function(cmd, postinit=false)
	{
		if (!postinit)
			cmd.block = Block.alloc();
	},

	update: function(anim, block, cmd)
	{
		if (cmd.started === false)
		{
			cmd.block.reset (block.time);
			cmd._count = cmd.count;

			cmd.started = true;
		}

		let r = cmd.block.update(anim);
		if (r !== true) return r;

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
