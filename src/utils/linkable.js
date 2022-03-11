/*
**	utils/linkable.js
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

//![import "./recycler"]

//:/**
//: * 	Generic class for linkable items such as required by List. The responsibility of this class is to wrap a value into a linkable object.
//: */

//!class Linkable

const Linkable = Class.extend
({
	className: "Linkable",

	/**
	 * 	Pointer to the previous item in the chain.
	 * 	!readonly prev: Linkable;
	 */
	prev: null, /* Linkable */

	/**
	 * 	Pointer to the next item in the chain.
	 * 	!readonly next: Linkable;
	 */
	next: null, /* Linkable */

	/**
	 * 	Wrapped value.
	 * 	!value: any;
	 */
	value: null,

	/**
	 * 	Initializes the linkable item and wraps the given value. Sets the `prev` and `next` pointers to null.
	 * 	!constructor (value?: any);
	 */
	__ctor: function (value)
	{
		this.value = value;
		this.clear();
	},

	/**
	 * 	Unlinks the linkable item.
	 */
	__dtor: function ()
	{
		this.unlink();
	},

	/**
	 * 	Sets the previous/next connection pointers to null. Returns `this`.
	 * 	!clear() : Linkable;
	 */
	clear: function ()
	{
		this.next = this.prev = null;
		return this;
	},

	/**
	 * 	Links the item such that it will be located after the given reference.
	 * 	!linkAfter (ref: Linkable) : Linkable;
	 */
	linkAfter: function (ref)
	{
		this.prev = ref;
		this.next = ref ? ref.next : null;

		if (ref)
		{
			if (ref.next) ref.next.prev = this;
			ref.next = this;
		}
	},

	/**
	 * 	Links the item such that it will be located before the given reference.
	 * 	!linkBefore (ref: Linkable) : Linkable;
	 */
	linkBefore: function (ref)
	{
		this.prev = ref ? ref.prev : null;
		this.next = ref;

		if (ref)
		{
			if (ref.prev) ref.prev.next = this;
			ref.prev = this;
		}
	},

	/**
	 * 	Unlinks the item by linking the `prev` and `next` together (when available) and returns `this`.
	 * 	!unlink() : Linkable;
	 */
	unlink: function () 
	{
		if (this.prev) this.prev.next = this.next;
		if (this.next) this.next.prev = this.prev;

		return this.clear();
	}
});

//!/class

//!namespace Linkable
//!namespace Pool

	/**
	 * 	Allocates a linkable item and wraps the given value. Sets the `prev` and `next` pointers to null.
	 * 	!function alloc (value?: any) : Linkable;
	 */

Recycler.createPool (Linkable, 16384, 6144);
export default Linkable;
