
export default
{
	init: function (cmd, postinit=false)
	{
	},

	update: function (anim, block, cmd)
	{
		cmd.snd.play();
		return true;
	}
};
