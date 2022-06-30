
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
			let val = anim.getValue(cmd.field);

			while (true) {
				let i = int(Math.random()*(cmd.endValue - cmd.startValue + 1)) + cmd.startValue;
				if (i != val) break;
			}

			anim.setValue(cmd.field, i);
			cmd._last = cmd._cur;
		}

		if (t != 1.0)
			return false;

		cmd.started = false;
		block.time += cmd._duration;

		return true;
	}
};
