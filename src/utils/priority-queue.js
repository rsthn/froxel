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
	order: null,

	__ctor: function()
	{
		this.queue = { };
	},

	add: function (object)
	{
		if (object == null)
			return null;

		if (!("priority" in object))
			throw new Error ("PriorityQueue (add): Object has no `priority` property.");

		if (!(object.priority in this.queue))
		{
			this.queue[object.priority] = { is_dirty: false, list: [ ] };
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

		if (!("priority" in object))
			throw new Error ("PriorityQueue (remove): Object has no `priority` property.");

		if (!(object.priority in this.queue))
			return object;

		var i = this.queue[object.priority].list.indexOf(object);
		if (i === -1) return object;

		this.queue[object.priority].is_dirty = true;
		this.queue[object.priority].list[i] = null;

		return object;
	},

	cleanup: function()
	{
		for (var i in this.queue)
		{
			var q = this.queue[i];

			if (q.is_dirty == false)
				continue;

			for (var j = 0; j < q.list.length; j++)
			{
				if (q.list[j] == null)
					q.list[j--].splice(1, 0);
			}

			q.is_dirty = false;
		}
	},

	forEach: function (callback)
	{
		var is_dirty = false;
		var is_complete = false;

		for (var i = 0; !is_complete && i < this.order.length; i++)
		{
			var list = this.queue[this.order[i]].list;

			for (var j = 0; !is_complete && j < list.length; j++)
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
		var is_dirty = false;
		var is_complete = false;

		for (var i = this.order.length-1; !is_complete && i >= 0; i--)
		{
			var list = this.queue[this.order[i]].list;

			for (var j = list.length-1; !is_complete && j >= 0; j--)
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
		var _ = this;

		var is_dirty = false;
		var is_complete = false;

		var i = -1;
		var j = -1;

		var list = null;

		var next_j = function()
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

		var next_i = function()
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
