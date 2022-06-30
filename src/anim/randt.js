
import { Rinn } from 'rinn';

export default
{
	init: function(cmd, postinit=false)
	{
		if (!postinit) return;

		let table = [ ];

		for (let i = 0; i < cmd.count; i++)
			table.push ((i % (cmd.endValue - cmd.startValue + 1)) + cmd.startValue);

		for (let i = cmd.count >> 2; i > 0; i--)
		{
			let a = int(Math.random() * cmd.count);
			let b = int(Math.random() * cmd.count);

			let c = table[b];
			table[b] = table[a];
			table[a] = c;
		}

		cmd.table = table;
	},

	update: function(anim, block, cmd)
	{
		if (cmd.started === false)
		{
			cmd._duration = Rinn.typeOf(cmd.duration) === 'string' ? anim.getValue(cmd.duration) : cmd.duration;
			cmd.started = true;
		}

		let t = 1.0;
		let i;

		if (anim.time < block.time + cmd._duration)
			t = (anim.time - block.time) / cmd._duration;

		if (cmd.easing && t != 1.0)
			i = cmd.easing(t)*(cmd.count-1);
		else
			i = t*(cmd.count-1);

		anim.setValue(cmd.field, cmd.table[int((i + cmd.count) % cmd.count)]);

		if (t != 1.0)
			return false;

		cmd.started = false;
		block.time += cmd._duration;

		return true;
	}
};
