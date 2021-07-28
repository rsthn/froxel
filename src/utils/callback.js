/*
**	utils/callback.js
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

/*
**	Defines a callback node. Contains a callback function, its context and up to four arguments.
*/

const Callback = Class.extend
({
	className: 'Callback',

	/*
	**	Callback and its context.
	*/
	callback: null,
	context: null,

	/*
	**	Optional arguments.
	*/
	arg1: null,
	arg2: null,
	arg3: null,
	arg4: null,

	/*
	**	Link to the previous and next callback.
	*/
	prev: null,
	next: null,

	/*
	**	Initializes the instance with the specified arguments.
	*/
	init: function (callback, context=null, arg1=null, arg2=null, arg3=null, arg4=null)
	{
		this.callback = callback;
		this.context = context;

		this.arg1 = arg1;
		this.arg2 = arg2;
		this.arg3 = arg3;
		this.arg4 = arg4;

		this.prev = null;
		this.next = null;
		return this;
	},

	/*
	**	Destructs the instance.
	*/
	__dtor: function()
	{
		this.callback = null;
		this.context = null;

		this.arg1 = null;
		this.arg2 = null;
		this.arg3 = null;
		this.arg4 = null;

		this.prev = null;
		this.next = null;
	},

	/*
	**	Returns true if the specified arguments are the same as the callback. Compares from left to right. All null values are ignored.
	*/
	isEqual: function (callback=null, context=null, arg1=null, arg2=null, arg3=null, arg4=null)
	{
		if (callback !== null && Callback.isInstance(callback))
		{
			return callback === this;
		}

		if (callback !== null && this.callback !== callback)
			return false;

		if (context !== null && this.context !== context)
			return false;

		if (arg1 !== null && this.arg1 !== arg1)
			return false;

		if (arg2 !== null && this.arg2 !== arg2)
			return false;

		if (arg3 !== null && this.arg3 !== arg3)
			return false;

		if (arg4 !== null && this.arg4 !== arg4)
			return false;

		return true;
	},

	/*
	**	Executes the callback. Returns `false` if the callback should be removed from the handler.
	*/
	exec: function(host)
	{
		if (this.callback !== null)
			return this.callback (host, this.context, this.arg1, this.arg2, this.arg3, this.arg4);

		return true;
	}
});

Recycler.attachTo(Callback);

export default Callback;
