
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
			cmd._startValue = anim.getValue(cmd.field, cmd.startValue);
			cmd._duration = Rinn.typeOf(cmd.duration) === 'string' ? anim.getValue(cmd.duration) : cmd.duration;

			cmd.started = true;
		}

		cmd._endValue = anim.getValue(cmd.field, cmd.endValue, cmd._startValue);

		let t = 1.0;

		if (anim.time < block.time + cmd._duration)
			t = (anim.time - block.time) / cmd._duration;

		if (cmd.easing && t != 1.0)
			anim.setValue(cmd.field, cmd.easing(t)*(cmd._endValue - cmd._startValue) + cmd._startValue);
		else
			anim.setValue(cmd.field, t*(cmd._endValue - cmd._startValue) + cmd._startValue);

		if (t != 1.0)
			return false;

		cmd.started = false;
		block.time += cmd._duration;

		return true;
	}
};
