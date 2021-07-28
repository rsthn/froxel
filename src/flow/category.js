/*
**	flow/category.js
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
import List from '../utils/list.js';
import Element from './element.js';

/*
**	A category is a set of elements that behave similarly.
*/

const Category = Class.extend
({
	className: 'Category',

	/*
	**	Scene and node where the category is attached.
	*/
	scene: null,
	node: null,

	/*
	**	List of elements.
	*/
	list: null,

	/*
	**	Constructs the category.
	*/
	__ctor: function()
	{
		this.list = List.calloc();
	},

	/*
	**	Destroys the instance. All elements will just be removed.
	*/
	__dtor: function()
	{
		let i;

		while ((i = this.list.shift()) !== null) {
			i.h_remove.remove(this._remove, this);
		}

		this.list.free();
	},

	/*
	**	Adds an element to the category.
	*/
	add: function (elem)
	{
		if (!Element.isInstance(elem))
			throw new Error ('argument must be an Element');

		this.list.push(elem);

		elem.h_remove.add(this._remove, this, this.list.bottom);
		return true;
	},

	/*
	**	Callback to remove an element from the category (called by Handler).
	*/
	_remove: function (elem, self, node)
	{
		self.list.remove(node);
		return false;
	},

	/*
	**	Removes an element from the category.
	*/
	remove: function (elem)
	{
		elem.h_remove.execf(this._remove, this);
		return elem;
	},

	/*
	**	Runs a sync cycle.
	*/
	sync: function ()
	{
		for (let i = this.list.top; i; i = i.next)
		{
			i.value.sync();
		}
	},

	/*
	**	Runs an update cycle.
	*/
	update: function (dt)
	{
	}
});


export default Category;
