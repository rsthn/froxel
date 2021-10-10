/*
**	froxel/anim/serial.js
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

import Block from './block.js';

export default
{
	init: function(cmd, postinit=false)
	{
		if (!postinit)
			cmd.block = Block.alloc();
	},

	update: function(anim, block, cmd)
	{
		if (cmd.started === false)
		{
			cmd.block.reset (block.time);
			cmd._count = cmd.count;

			cmd.started = true;
		}

		let r = cmd.block.update(anim);
		if (r !== true) return r;

		if (cmd._count <= 1)
		{
			cmd.started = false;
			block.time = cmd.block.time;
			return true;
		}

		cmd.block.restart();
		cmd._count--;
		return false;
	}
};
