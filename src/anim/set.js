
export default
{
	init: function(cmd, postinit=false)
	{
	},

	update: function(anim, block, cmd)
	{
		anim.setValue(cmd.field, anim.getValue(cmd.field, cmd.value));
		return true;
	}
};
