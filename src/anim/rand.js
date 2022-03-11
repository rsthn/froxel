/*
**	froxel/anim/rand.js
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
