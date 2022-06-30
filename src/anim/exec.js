
export default
{
	init: function (cmd, postinit=false)
	{
	},

	update: function (anim, block, cmd)
	{
		if (cmd.started === false)
		{
			cmd._last = anim.time;
			cmd.started = true;
			cmd.time = anim.time;
		}

		let dt = anim.time - cmd._last;
		cmd._last = anim.time;
		cmd.time += dt;

		let r = cmd.fn(dt, anim.data, cmd, anim);
		if (r === true) return false;

		cmd.started = false;
		return true;
	}
};
