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

import { Class } from '@rsthn/rin';
import Recycler from './recycler.js';

/*
**	Generic class for linkable items such as required by linked lists. The responsibility of this class is
**	to wrap a value into a linkable object.
*/

const Linkable = Class.extend
({
	className: "Linkable",

	/*
	**	Pointer to the previous item in the chain.
	*/
	prev: null, /* Linkable */

	/*
	**	Pointer to the next item in the chain.
	*/
	next: null, /* Linkable */

	/*
	**	Wrapped value.
	*/
	value: null,

	/*
	**	Initializes the linkable item and wraps the given value. Makes sure the previous and next pointers are clear.
	*/
	init: function (value)
	{
		this.value = value;
		this.clear();

		return this;
	},

	/*
	**	Unlinks the linkable item.
	*/
	__dtor: function ()
	{
		this.unlink();
	},

	/*
	**	Sets the previous/next connection pointers to null. Returns `this`.
	*/
	clear: function () /*Linkable*/
	{
		this.next = this.prev = null;
		return this;
	},

	/*
	**	Links the item such that it will be located after the given reference.
	*/
	linkAfter: function (/*Linkable*/ref)
	{
		this.prev = ref;
		this.next = ref ? ref.next : null;

		if (ref)
		{
			if (ref.next) ref.next.prev = this;
			ref.next = this;
		}
	},

	/*
	**	Links the item such that it will be located before the given reference.
	*/
	linkBefore: function (/*Linkable*/ref)
	{
		this.prev = ref ? ref.prev : null;
		this.next = ref;

		if (ref)
		{
			if (ref.prev) ref.prev.next = this;
			ref.prev = this;
		}
	},

	/*
	**	Unlinks the item by linking the `prev` and `next` together (when available) and returns `this`.
	*/
	unlink: function () /*Linkable*/
	{
		if (this.prev) this.prev.next = this.next;
		if (this.next) this.next.prev = this.prev;

		return this.clear();
	}
});

Recycler.attachTo (Linkable);
export default Linkable;
