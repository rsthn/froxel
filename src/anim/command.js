/*
**	froxel/anim/command.js
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
import Recycler from '../utils/recycler.js';

const Command = Class.extend
({
	className: 'Anim:Command',

	op: null,
	started: false,

	field: null,
	value: null,

	duration: 0, _duration: 0,
	count: 0, _count: 0,

	startValue: 0, _startValue: 0,
	endValue: 0, _endValue: 0,
	easing: null,

	_cur: null,
	_last: null,

	block: null, /* Block */
	blocks: null, /* List<Block> */

	table: null,
	snd: null,
	fn: null,

	init: function(op)
	{
		this.op = op;
		this.started = false;

		this.block = null;
		this.blocks = null;
	
		this.table = null;
		this.snd = null;
		this.fn = null;

		op.init(this, false);
		return this;
	},

	__dtor: function()
	{
		if (this.block !== null) this.block.clear().free();
		if (this.blocks !== null) this.blocks.clear().free();
	},

	ready: function()
	{
		this.op.init(this, true);
	},

	update: function(anim, block)
	{
		return this.op.update(anim, block, this);
	}
});

Recycler.attachTo(Command);
export default Command;
