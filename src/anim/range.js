/*
**	froxel/anim/range.js
**
**	Copyright (c) 2013-2021, RedStar Technologies, All rights reserved.
**	https://rsthn.com/
**
**	THIS LIBRARY IS PROVIDED BY REDSTAR TECHNOLOGIES "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES,
**	INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A 
**	PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL REDSTAR TECHNOLOGIES BE LIABLE FOR ANY
**	DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT 
**	NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; 
**	OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, 
**	STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE
**	USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import { Rin } from '@rsthn/rin';

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
			cmd._duration = Rin.typeOf(cmd.duration) === 'string' ? anim.getValue(cmd.duration) : cmd.duration;

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
