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

import { Class } from 'rinn';

//!class PriorityQueue

export default Class.extend
({
	className: 'PriorityQueue',

	queue: null,
	queueKeys: null,
	order: null,

	/**
	 * 	Constructs an priority queue.
	 * 	!constructor();
	 */
	__ctor: function()
	{
		this.queue = { };
		this.queueKeys = [];
	},

	/**
	 * 	Adds an object to the priority queue.
	 * 	!add (obj: { priority: number }) : object;
	 */
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

	/**
	 * 	Marks an object to be removed from the priority queue. Use `cleanup` to actually remove them.
	 * 	!remove (obj: object) : object;
	 */
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

	/**
	 * 	Runs a cleanup of the queue by removing any objects marked to be removed.
	 * 	!cleanup() : void;
	 */
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
					q.list.splice(j--, 1);
				}
			}

			q.is_dirty = false;
		}
	},

	/**
	 * 	Runs the specified callback for each object in the queue. Executed in order of priority (from low number to high number).
	 * 	@param callback - Return `false` to stop the forEach execution immediately.
	 * 	!forEach (callback: (obj: object) => boolean) : void;
	 */
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

	/**
	 * 	Runs the specified callback for each object in the queue. Executed in reverse order of priority (from high number to low number).
	 * 	@param callback - Return `false` to stop the forEachRev execution immediately.
	 * 	!forEachRev (callback: (obj: object) => boolean) : void;
	 */
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

	/**
	 * 	Runs the specified callback for each object in the queue. Executed in order of priority (from low number to high number). When
	 * 	the cycle finishes the given `finishedCallback` will be executed.
	 * 	@param callback - Return `false` to stop the forEachAsync execution immediately. Must manually execute `next` when finished.
	 * 	!forEachAsync (callback: (obj: object, next: Function) => boolean) : void;
	 */
	forEachAsync: function (callback, finishedCallback=null)
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
				if (finishedCallback) finishedCallback();
			}
		};

		next_i();
	},

	/**
	 * 	Runs the specified callback for each object in the queue. Executed in reverse order of priority (from high number to low number). When
	 * 	the cycle finishes the given `finishedCallback` will be executed.
	 * 	@param callback - Return `false` to stop the forEachRevAsync execution immediately. Must manually execute `next` when finished.
	 * 	!forEachRevAsync (callback: (obj: object, next: Function) => boolean) : void;
	 */
	forEachRevAsync: function (callback)
	{
		alert('NOT IMPLEMENTED: forEachRevAsync');
	}
});
