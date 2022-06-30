
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
			cmd.started = true;
		}

		let r = cmd.block.update(anim);
		if (r !== true) return r;

		cmd.started = false;
		block.time = cmd.block.time;
		return true;
	}
};
