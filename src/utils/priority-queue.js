/*
**	utils/priority-queue.js
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

export default Class.extend
({
	className: 'PriorityQueue',

	queue: null,
	queueKeys: null,
	order: null,

	__ctor: function()
	{
		this.queue = { };
		this.queueKeys = [];
	},

	add: function (object)
	{
		if (object == null)
			return null;

		if (!('priority' in object))
			throw new Error ('PriorityQueue (add): Object has no `priority` property.');

		if (!(object.priority in this.queue))
		{
			this.queue[object.priority] = { is_dirty: false, list: [ ] };
			this.queueKeys.push(object.priority);

			this.order = Object.keys(this.queue).sort((a,b) => a-b);
		}

		if (this.queue[object.priority].list.indexOf(object) === -1)
			this.queue[object.priority].list.push(object);

		return object;
	},

	remove: function (object)
	{
		if (object == null)
			return null;

		if (!('priority' in object))
			throw new Error ('PriorityQueue (remove): Object has no `priority` property.');

		if (!(object.priority in this.queue))
			return object;

		let i = this.queue[object.priority].list.indexOf(object);
		if (i === -1) return object;

		this.queue[object.priority].is_dirty = true;
		this.queue[object.priority].list[i] = null;

		return object;
	},

	cleanup: function()
	{
		for (let i = 0; i < this.queueKeys.length; i++)
		{
			let q = this.queue[this.queueKeys[i]];
			if (!q.is_dirty) continue;

			for (let j = 0; j < q.list.length; j++)
			{
				if (q.list[j] == null)
				{
					console.log('CLEANUP CALLED');
					q.list[j--].splice(1, 0);
				}
			}

			q.is_dirty = false;
		}
	},

	forEach: function (callback)
	{
		let is_dirty = false;
		let is_complete = false;

		for (let i = 0; !is_complete && i < this.order.length; i++)
		{
			let list = this.queue[this.order[i]].list;

			for (let j = 0; !is_complete && j < list.length; j++)
			{
				if (list[j] != null)
				{
					if (callback(list[j]) === false)
						is_complete = true;
				}

				if (list[j] == null)
					is_dirty = true;
			}
		}

		if (is_dirty) this.cleanup();
	},

	forEachRev: function (callback)
	{
		let is_dirty = false;
		let is_complete = false;

		for (let i = this.order.length-1; !is_complete && i >= 0; i--)
		{
			let list = this.queue[this.order[i]].list;

			for (let j = list.length-1; !is_complete && j >= 0; j--)
			{
				if (list[j] != null)
				{
					if (callback(list[j]) === false)
						is_complete = true;
				}

				if (list[j] == null)
					is_dirty = true;
			}
		}

		if (is_dirty) this.cleanup();
	},

	forEachAsync: function (callback)
	{
		let _ = this;

		let is_dirty = false;
		let is_complete = false;

		let i = -1;
		let j = -1;

		let list = null;

		let next_j = function()
		{
			j++;

			if (!is_complete && j < list.length)
			{
				if (list[j] != null)
				{
					if (callback(list[j], next_j) === false)
						is_complete = true;
				}

				if (list[j] == null)
					is_dirty = true;

				if (is_complete) next_j();
			}
			else
				next_i();
		};

		let next_i = function()
		{
			i++;

			if (!is_complete && i < _.order.length)
			{
				list = _.queue[_.order[i]].list;
				j = -1;
				next_j();
			}
			else
			{
				if (is_dirty) _.cleanup();
			}
		};

		next_i();
	},

	forEachRevAsync: function (callback)
	{
	}
});
