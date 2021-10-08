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

import { Rin, Class } from '@rsthn/rin';
import Linkable from './linkable.js';
import Recycler from './recycler.js';

/*
**	Implementation of a linked list.
*/

const List = Class.extend
({
	/*
	**	Name of the class (for inheritance purposes).
	*/
	className: "List",

	/*
	**	Pointer to the first item in the list.
	*/
	top: null, /* Linkable */

	/*
	**	Pointer to the last item in the list.
	*/
	bottom: null, /* Linkable */

	/*
	**	Number of items in the list.
	*/
	length: 0,

	/*
	**	Initializes the instance.
	*/
	__ctor: function ()
	{
		this.top = null;
		this.bottom = null;
		this.length = 0;
	},

	/*
	**	Traverses the list and destroys all nodes. The actual values are maintained. To destroy the
	**	list contents call clear() instead.
	*/
	__dtor: function ()
	{
		this.reset();
	},

	/*
	**	Clones all contents and returns a new list.
	*/
	clone: function()
	{
		let list = List.Pool.alloc();

		for (let i = this.top; i; i = i.next)
			list.push(Rin.clone(i.value));

		return list;
	},

	/*
	**	Traverses the list and destroys all nodes and values.
	*/
	clear: function () /*List*/
	{
		let item, nextItem;

		for (item = this.top; item != null; item = nextItem)
		{
			nextItem = item.next;
			dispose(item.free().value);
		}

		this.top = this.bottom = null;
		this.length = 0;

		return this;
	},

	/*
	**	Traverses the list and destroys all nodes. Values are preserved.
	*/
	reset: function ()
	{
		let item, nextItem;

		for (item = this.top; item != null; item = nextItem)
		{
			nextItem = item.next;
			item.free();
		}

		this.top = this.bottom = null;
		this.length = 0;

		return this;
	},

	/*
	**	Returns the first item in the list.
	*/
	first: function ()
	{
		return this.top !== null ? this.top.value : null;

	},
	/*
	**	Returns the last item in the list.
	*/
	last: function ()
	{
		return this.bottom !== null ? this.bottom.value : null;
	},

	/*
	**	Returns an item given its index.
	*/
	getAt: function (index) /*(value)*/
	{
		let item = null;

		for (item = this.top; item && index--; item = item.next);

		return item != null ? item.value : null;
	},

	/*
	**	Returns the node at the given index.
	*/
	getNodeAt: function (index) /*Linkable*/
	{
		let item = null;

		for (item = this.top; item && index--; item = item.next);

		return item;
	},

	/*
	**	Returns the node of an item given another element to compare, uses identical comparison to match the item.
	*/
	sgetNode: function (value) /*Linkable*/
	{
		for (let item = this.top; item; item = item.next)
			if (item.value === value) return item;

		return null;
	},

	/*
	**	Removes the given item from the list and returns the item.
	*/
	remove: function (/*Linkable*/item) /*any*/
	{
		if (item != null && !('isInstanceOf' in item && item.isInstanceOf(Linkable)))
			item = this.sgetNode(item);

		if (!item) return null;

		if (!item.prev) this.top = item.next;
		if (!item.next) this.bottom = item.prev;

		this.length--;

		return item.free().value;
	},

	/*
	**	Adds an item before the given reference.
	*/
	insertBefore: function (/*Linkable*/ref, /*any*/value) /*List*/
	{
		if (!ref) return this;

		let item = Linkable.Pool.alloc(value);

		item.linkBefore (ref);

		if (ref == this.top) this.top = item;
		this.length++;

		return value;
	},

	/*
	**	Adds an item after the given reference.
	*/
	insertAfter: function (/*Linkable*/ref, /*any*/value) /*List*/
	{
		if (!ref) return this;

		let item = Linkable.Pool.alloc(value);

		item.linkAfter (ref);

		if (ref == this.bottom) this.bottom = item;
		this.length++;

		return value;
	},

	/*
	**	Adds an item to the top of the list.
	*/
	unshift: function (value) /* List */
	{
		let item = Linkable.Pool.alloc(value);

		item.linkBefore (this.top);
		if (!this.bottom) this.bottom = item;

		this.top = item;
		this.length++;

		return value;
	},

	/*
	**	Removes an item from the top of the list.
	*/
	shift: function () /*any*/
	{
		let item = this.top;
		if (!item) return null;

		if (!(this.top = item.next)) this.bottom = null;
		this.length--;

		return item.free().value;
	},

	/*
	**	Adds an item to the bottom of the list.
	*/
	push: function (value) /* List */
	{
		let item = Linkable.Pool.alloc(value);

		item.linkAfter (this.bottom);
		if (!this.top) this.top = item;

		this.bottom = item;
		this.length++;

		return value;
	},

	/*
	**	Removes an item from the bottom of the list.
	*/
	pop: function () /*any*/
	{
		let item = this.bottom;
		if (!item) return null;

		if (!(this.bottom = item.prev)) this.top = null;
		this.length--;

		return item.free().value;
	},

	/*
	**	Appends all contents of a given list to the list.
	*/
	append: function (/*List*/list) /*List*/
	{
		for (let i = list.top; i; i = i.next)
			this.push(i.value);

		return this;
	},

	/*
	**	Traverses the list calling the specified function for each item.
	*/
	forEach: function(fn, context=null)
	{
		let ni;
	
		for (let i = this.top; i; i = ni)
		{
			ni = i.next;
			if (fn (i.value, i, this, context) === false) return false;
		}

		return true;
	},

	/*
	**	Traverses the list in reverse order, calling the specified function for each item.
	*/
	forEachRev: function(fn, context=null)
	{
		let ni;
	
		for (let i = this.bottom; i; i = ni)
		{
			ni = i.prev;
			if (fn (i.value, i, this, context) === false) return false;
		}

		return true;
	},

	/*
	**	Returns the first item where the filter function returns true.
	*/
	find: function (filter, context=null)
	{
		for (let i = this.top; i; i = i.next)
			if (filter(i.value, context)) return i.value;

		return null;
	},

	/*
	**	Returns an array with all items where the filter function returns true.
	*/
	filter: function (filter, context=null)
	{
		let list = List.Pool.alloc();

		for (let i = this.top; i; i = i.next)
			if (filter(i.value, context)) list.push(i.value);

		return list;
	},

	/*
	**	Returns an array with all the items in the list.
	*/
	toArray: function()
	{
		let array = [];

		for (let i = this.top; i; i = i.next)
			array.push(i.value);

		return array;
	}
});

Recycler.createPool (List, 16384, 6144);
export default List;
