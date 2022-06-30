
import { Rinn } from 'rinn';

export default
{
	init: function(cmd, postinit=false)
	{
	},

	update: function(anim, block, cmd)
	{
		if (cmd.started === false)
		{
			cmd._duration = Rinn.typeOf(cmd.duration) === 'string' ? anim.getValue(cmd.duration) : cmd.duration;
			cmd.started = true;
		}

		if (anim.time < block.time + cmd._duration)
			return false;

		cmd.started = false;
		block.time += cmd._duration;
		return true;
	}
};
