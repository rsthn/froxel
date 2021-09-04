/*
**	utils/handler.js
**
**	Copyright (c) 2016-2021, RedStar Technologies, All rights reserved.
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
import Recycler from './recycler.js';
import Callback from './callback.js';

/*
**	The handler class allows zero or more callbacks to be attached, such that when the `exec` method of the handler is invoked, all attached
**	callbacks will also be executed.
*/

const Handler = Class.extend
({
	className: 'Handler',

	/*
	**	Handler host element.
	*/
	host: null,

	/*
	**	Top and bottom of the linked list.
	*/
	top: null,
	bottom: null,

	/*
	**	Initializes the instance.
	*/
	init: function (host)
	{
		this.host = host;

		this.top = null;
		this.bottom = null;

		return this;
	},

	/*
	**	Removes all callbacks from the handler.
	*/
	__dtor: function()
	{
		this.remove();
	},

	/*
	**	Adds the specified callback to the handler.
	*/
	add: function(callback, context=null, arg1=null, arg2=null, arg3=null, arg4=null)
	{
		let node = Callback.isInstance(callback) ? callback : Callback.alloc().init(callback, context, arg1, arg2, arg3, arg4);

		node.prev = this.bottom;

		if (this.bottom !== null)
			this.bottom.next = node;

		this.bottom = node;

		if (this.top === null)
			this.top = node;

		return node;
	},

	/*
	**	Unlinks a callback from the handler.
	*/
	unlink: function (node)
	{
		if (node.prev) node.prev.next = node.next;
		if (node.next) node.next.prev = node.prev;

		if (this.top === node)
			this.top = node.next;

		if (this.bottom === node)
			this.bottom = node.prev;

		node.prev = null;
		node.next = null;

		dispose(node);
	},

	/*
	**	Removes all callbacks matching the specified arguments.
	*/
	remove: function(callback=null, context=null, arg1=null, arg2=null, arg3=null, arg4=null)
	{
		if (callback !== null && Callback.isInstance(callback))
		{
			this.unlink(callback);
			return this;
		}

		let node = this.top;

		while (node !== null)
		{
			let next = node.next;

			if (node.isEqual(callback, context, arg1, arg2, arg3, arg4))
				this.unlink(node);

			node = next;
		}

		return this;
	},

	/*
	**	Returns the first callback matching the specified arguments.
	*/
	find: function(callback, context=null, arg1=null, arg2=null, arg3=null, arg4=null)
	{
		let node = this.top;

		while (node !== null)
		{
			if (node.isEqual(callback, context, arg1, arg2, arg3, arg4))
				return node;

			node = node.next;
		}

		return null;
	},

	/*
	**	Executes all callbacks in the handler.
	*/
	exec: function()
	{
		let node = this.top;

		while (node !== null)
		{
			let next = node.next;

			if (node.exec(this.host) === false)
				this.unlink(node);

			node = next;
		}
	},

	/*
	**	Executes the first callback matching the specified arguments.
	*/
	execf: function(callback=null, context=null, arg1=null, arg2=null, arg3=null, arg4=null)
	{
		let node = this.top;

		while (node !== null)
		{
			let next = node.next;

			if (node.isEqual(callback, context, arg1, arg2, arg3, arg4))
			{
				if (node.exec(this.host) === false)
					this.unlink(node);

				break;
			}

			node = next;
		}
	},

	/*
	**	Executes the specified callback.
	*/
	execc: function(node)
	{
		if (node.exec(this.host) === false)
			this.unlink(node);
	}
});

Recycler.attachTo(Handler, 16384, 6144);
export default Handler;
