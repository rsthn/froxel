
export default
{
	init: function(cmd, postinit=false)
	{
	},

	update: function(anim, block, cmd)
	{
		block.restart();
		return true;
	}
};
