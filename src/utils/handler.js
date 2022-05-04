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

import { Class } from 'rinn';
import Recycler from './recycler.js';
import Callback from './callback.js';

//![import "./recycler"]
//![import "./callback"]

//:/**
//: * 	The handler class allows zero or more callbacks to be attached, such that when the `exec` method of the handler is invoked, all attached callbacks will also be executed.
//: */

//!class Handler

const Handler = Class.extend
({
	className: 'Handler',

	/**
	 * 	Handler host element or value.
	 * 	!host: any;
	 */
	host: null,

	/**
	 * 	Top and bottom of the linked list.
	 */
	top: null,
	bottom: null,

	/**
	 * 	Initializes the Handler instance.
	 * 	!constructor (host?: any);
	 */
	__ctor: function (host=null)
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

	/**
	 * 	Adds the specified callback to the handler.
	 * 	!add (callback: Function, arg0?: any, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any) : Callback;
	 */
	add: function (callback, arg0=null, arg1=null, arg2=null, arg3=null, arg4=null, arg5=null)
	{
		let node = Callback.isInstance(callback) ? callback : Callback.Pool.alloc(callback, arg0, arg1, arg2, arg3, arg4, arg5);

		node.prev = this.bottom;

		if (this.bottom !== null)
			this.bottom.next = node;

		this.bottom = node;

		if (this.top === null)
			this.top = node;

		return node;
	},

	/**
	 * 	Unlinks a callback from the handler.
	 * 	!unlink (node: Callback) : Handler;
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

	/**
	 * 	Removes all callbacks matching the specified arguments.
	 * 	!remove (callback?: Function, arg0?: any, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any) : Handler;
	 */
	remove: function (callback=null, arg0=null, arg1=null, arg2=null, arg3=null, arg4=null, arg5=null)
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

			if (node.isEqual(callback, arg0, arg1, arg2, arg3, arg4, arg5))
				this.unlink(node);

			node = next;
		}

		return this;
	},

	/**
	 * 	Returns the first callback matching the specified arguments.
	 * 	!find (callback: Function, arg0?: any, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any) : Callback;
	 */
	find: function (callback, arg0=null, arg1=null, arg2=null, arg3=null, arg4=null, arg5=null)
	{
		let node = this.top;

		while (node !== null)
		{
			if (node.isEqual(callback, arg0, arg1, arg2, arg3, arg4, arg5))
				return node;

			node = node.next;
		}

		return null;
	},

	/**
	 * 	Executes all callbacks in the handler.
	 * 	!exec (host?: any) : void;
	 */
	exec: function (host=null)
	{
		let node = this.top;

		host = host ?? this.host;

		while (node !== null)
		{
			let next = node.next;

			if (node.exec(host) === false)
				this.unlink(node);

			node = next;
		}
	},

	/**
	 * 	Executes the first callback matching the specified arguments.
	 * 	!execf (callback?: Function, arg0?: any, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any) : void;
	 */
	execf: function (callback=null, arg0=null, arg1=null, arg2=null, arg3=null, arg4=null, arg5=null)
	{
		let node = this.top;

		while (node !== null)
		{
			let next = node.next;

			if (node.isEqual(callback, arg0, arg1, arg2, arg3, arg4, arg5))
			{
				if (node.exec(this.host) === false)
					this.unlink(node);

				break;
			}

			node = next;
		}
	},

	/**
	 * 	Executes the specified callback.
	 * 	!execc (node: Callback, host?: any) : void;
	 */
	execc: function (node, host=null)
	{
		if (node.exec(host ?? this.host) === false)
			this.unlink(node);
	}
});

//!/class

//!namespace Handler
//!namespace Pool

/**
 * 	Allocates a new handler instance.
 * 	!function alloc (host?: Object) : Handler;
 */

Recycler.createPool(Handler, 16384, 6144);
export default Handler;
