/*
**	froxel/anim/block.js
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

import { Class } from '@rsthn/rin';
import List from '../utils/list.js';
import Recycler from '../utils/recycler.js';

const Block = Class.extend
({
	className: 'Anim:Block',

	commands: null,

	first: true,
	current: false,
	time: 0,

	init: function()
	{
		this.commands = List.Pool.alloc();
		this.reset(0);
		return this;
	},

	__dtor: function()
	{
		this.clear();
		this.commands.free();
	},

	add: function(cmd)
	{
		this.commands.push(cmd);
		return cmd;
	},

	clone: function()
	{
		throw new Error('Method `clone` not implemented in Anim:Block');
	},

	clear: function()
	{
		this.commands.clear();
		this.reset(0);

		return this;
	},

	reset: function(time)
	{
		this.first = true;
		this.current = null;
		this.time = time;

		return this;
	},

	restart: function()
	{
		this.first = true;
		return this;
	},

	isFinished: function()
	{
		if (this.first === true)
		{
			this.current = this.commands.top;
			this.first = false;
		}

		return this.current === null;
	},

	update: function (anim)
	{
		while (!this.isFinished())
		{
			let r = this.current.value.update(anim, this);
			if (r !== true) return r;

			this.current = this.current.next;
		}

		return true;
	}
});

Recycler.attachTo(Block, 8192);
export default Block;
