/*
**	utils/list.js
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

import { Rinn, Class } from 'rinn';
import Linkable from './linkable.js';
import Recycler from './recycler.js';

//![import "./linkable"]
//![import "./recycler"]

//:/**
//: * 	Implementation of a generic linked list.
//: */

//!class List

const List = Class.extend
({
	/**
	 * 	Name of the class (for inheritance purposes).
	 */
	className: "List",

	/**
	 * 	Pointer to the first node in the list.
	 * 	!top: Linkable;
	 */
	top: null,

	/**
	 * 	Pointer to the last node in the list.
	 * 	!bottom: Linkable;
	 */
	bottom: null,

	/**
	 * 	Number of values in the list.
	 * 	!length: number;
	 */
	length: 0,

	/**
	 * 	Initializes the instance to an empty list.
	 * 	!constructor();
	 */
	__ctor: function ()
	{
		this.top = null;
		this.bottom = null;
		this.length = 0;
	},

	/**
	 * 	Traverses the list and destroys all nodes. The actual values are maintained. To destroy the
	 * 	list contents call clear() instead.
	 */
	__dtor: function ()
	{
		this.reset();
	},

	/**
	 * 	Clones all contents and returns a new list.
	 * 	!clone() : List;
	 */
	clone: function()
	{
		let list = List.Pool.alloc();

		for (let i = this.top; i; i = i.next)
			list.push(Rinn.clone(i.value));

		return list;
	},

	/**
	 * 	Traverses the list and destroys all nodes and values.
	 * 	!clear() : List;
	 */
	clear: function ()
	{
		let i, ni;

		for (i = this.top; i; i = ni)
		{
			ni = i.next;
			dispose(i.free().value);
		}

		this.top = this.bottom = null;
		this.length = 0;

		return this;
	},

	/**
	 * 	Traverses the list, destroys all nodes **but** values are preserved.
	 * 	!reset() : List;
	 */
	reset: function ()
	{
		let i, ni;

		for (i = this.top; i != null; i = ni)
		{
			ni = i.next;
			i.free();
		}

		this.top = this.bottom = null;
		this.length = 0;

		return this;
	},

	/**
	 * 	Returns the first value in the list.
	 * 	!first() : any;
	 */
	first: function ()
	{
		return this.top !== null ? this.top.value : null;

	},
	/**
	 * 	Returns the last value in the list.
	 * 	!last() : any;
	 */
	last: function ()
	{
		return this.bottom !== null ? this.bottom.value : null;
	},

	/**
	 * 	Returns a value given its index.
	 * 	!getAt (index: number) : any;
	 */
	getAt: function (index)
	{
		let i = null;
		for (i = this.top; i && index-- > 0; i = i.next);
		return i != null ? i.value : null;
	},

	/**
	 * 	Returns the node at the given index.
	 * 	!getNodeAt (index: number) : Linkable;
	 */
	getNodeAt: function (index)
	{
		let i = null;
		for (i = this.top; i && index--; i = i.next);
		return i;
	},

	/**
	 * 	Returns the node of a value given another value to compare, uses identical comparison (===) to match the value.
	 * 	!sgetNode (value: any) : Linkable;
	 */
	sgetNode: function (value)
	{
		for (let i = this.top; i; i = i.next)
			if (i.value === value) return i;

		return null;
	},

	/**
	 * 	Removes the given value from the list and returns it.
	 * 	!remove<T> (value: T) : T;
	 */
	remove: function (i)
	{
		if (i != null && !Linkable.isInstance(i))
			i = this.sgetNode(i);

		if (!i) return null;

		if (!i.prev) this.top = i.next;
		if (!i.next) this.bottom = i.prev;

		this.length--;
		return i.free().value;
	},

	/**
	 * 	Adds a value before the given reference node.
	 * 	!insertBefore<T> (ref: Linkable, value: T) : T;
	 */
	insertBefore: function (ref, value)
	{
		if (!ref) return this;

		let i = Linkable.Pool.alloc(value);
		i.linkBefore (ref);

		if (ref == this.top) this.top = i;
		this.length++;

		return value;
	},

	/**
	 * 	Adds a value after the given reference node.
	 * 	!insertAfter<T> (ref: Linkable, value: T) : T;
	 */
	insertAfter: function (ref, value)
	{
		if (!ref) return this;

		let i = Linkable.Pool.alloc(value);
		i.linkAfter (ref);

		if (ref == this.bottom) this.bottom = i;
		this.length++;

		return value;
	},

	/**
	 * 	Adds a value to the top of the list.
	 * 	!unshift<T> (value: T) : T;
	 */
	unshift: function (value)
	{
		let i = Linkable.Pool.alloc(value);

		i.linkBefore (this.top);
		if (!this.bottom) this.bottom = i;

		this.top = i;
		this.length++;

		return value;
	},

	/**
	 * 	Removes a value from the top of the list.
	 * 	!shift() : any;
	 */
	shift: function ()
	{
		let i = this.top;
		if (!i) return null;

		if (!(this.top = i.next)) this.bottom = null;
		this.length--;

		return i.free().value;
	},

	/**
	 * 	Adds a value to the bottom of the list.
	 * 	!push<T> (value: T) : T;
	 */
	push: function (value)
	{
		let i = Linkable.Pool.alloc(value);

		i.linkAfter (this.bottom);
		if (!this.top) this.top = i;

		this.bottom = i;
		this.length++;

		return value;
	},

	/**
	 * 	Removes a value from the bottom of the list.
	 * 	!pop() : any;
	 */
	pop: function ()
	{
		let i = this.bottom;
		if (!i) return null;

		if (!(this.bottom = i.prev)) this.top = null;
		this.length--;

		return i.free().value;
	},

	/**
	 * 	Appends all contents of the given list to the current one.
	 * 	!append (list: List) : List;
	 */
	append: function (list)
	{
		for (let i = list.top; i; i = i.next)
			this.push(i.value);

		return this;
	},

	/**
	 * 	Traverses the list calling the specified function for each value.
	 * 	@param fn - Callback to execute, return `false` to stop the loop immediately.
	 * 	!forEach(fn: (value: any, node: Linkable, list: List, context: object) => boolean, context?: object) : boolean;
	 */
	forEach: function (fn, context=null)
	{
		let ni;
	
		for (let i = this.top; i; i = ni)
		{
			ni = i.next;
			if (fn (i.value, i, this, context) === false) return false;
		}

		return true;
	},

	/**
	 * 	Traverses the list in reverse order, calling the specified function for each value.
	 * 	@param fn - Callback to execute, return `false` to stop the loop immediately.
	 * 	!forEachRev(fn: (value: any, node: Linkable, list: List, context: object) => boolean, context?: object) : boolean;
	 */
	forEachRev: function (fn, context=null)
	{
		let ni;
	
		for (let i = this.bottom; i; i = ni)
		{
			ni = i.prev;
			if (fn (i.value, i, this, context) === false) return false;
		}

		return true;
	},

	/**
	 * 	Returns the first value where the specified function returns `true`.
	 * 	!find (fn: (value: any, context: object) => boolean, context?: object) : any;
	 */
	find: function (fn, context=null)
	{
		for (let i = this.top; i; i = i.next)
			if (fn(i.value, context)) return i.value;

		return null;
	},

	/**
	 * 	Returns an array with all values where the specified function returns `true`.
	 * 	!filter (fn: (value: any, context: object) => boolean, context?: object) : Array<any>;
	 */
	filter: function (fn, context=null)
	{
		let list = List.Pool.alloc();

		for (let i = this.top; i; i = i.next)
			if (fn(i.value, context)) list.push(i.value);

		return list;
	},

	/**
	 * 	Returns an array with all the values in the list.
	 * 	!toArray() : Array<any>;
	 */
	toArray: function()
	{
		let array = [];

		for (let i = this.top; i; i = i.next)
			array.push(i.value);

		return array;
	}
});

//!/class

//!namespace List
//!namespace Pool

	/**
	 * 	Allocates an empty list.
	 * 	!function alloc() : List;
	 */

Recycler.createPool (List, 16384, 6144);
export default List;
