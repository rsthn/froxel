/*
**	froxel/anim/parallel.js
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

import List from '../utils/list.js';
import Block from './block.js';

export default
{
	init: function(cmd, postinit=false)
	{
		if (!postinit)
		{
			cmd.block = Block.alloc();
			cmd.blocks = List.Pool.alloc();
			return;
		}

		let i;

		while ((i = cmd.block.commands.shift()) != null)
		{
			let block = Block.alloc();
			block.add(i);
			cmd.blocks.push(block);
		}

		cmd.block.free();
		cmd.block = null;
	},

	update: function (anim, block, cmd)
	{
		if (cmd.started === false)
		{
			for (let i = cmd.blocks.top; i !== null; i = i.next)
			{
				i.value.reset (block.time);
			}

			cmd.started = true;
		}

		let time = block.time;
		let n = 0, m = 0;

		for (let i = cmd.blocks.top; i !== null; i = i.next)
		{
			let r = i.value.update(anim);
			if (r === true) n++; else if (r === null) m++;

			if (i.value.time > time)
				time = i.value.time;
		}

		if ((n+m) != cmd.blocks.length)
			return false;

		cmd.started = false;
		block.time = time;

		return true;
	}
};
