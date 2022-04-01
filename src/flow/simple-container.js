/*
**	flow/simple-container.js
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

import Container from './container.js';
import GridElement from './grid-element.js';
import Element from './element.js';
import List from '../utils/list.js';

//![import "./container"]
//![import "./grid-element"]
//![import "./element"]
//![import "../utils/list"]

//:/**
//: * 	A simple container is a container that uses a linked-list to storage the elements.
//: */

//!class SimpleContainer extends Container

export default Container.extend
({
	className: 'SimpleContainer',

	/**
	 * List containing the elements.
	 * !readonly list: List;
	 */
	list: null,

	/**
	 * Constructs the container with the specified size.
	 * !constructor (width: number, height: number);
	 */
	__ctor: function (width, height)
	{
		this._super.Container.__ctor (width, height);
		this.list = List.Pool.alloc();

		this.depthFlag(false);
	},

	/**
	 * Destroys the container and all contained elements.
	 */
	__dtor: function()
	{
		this.clear();
		this.list.free();

		this._super.Container.__dtor();
	},

	/**
	 * Syncs the actual location of the specified element with its storage location. Returns true if successful.
	 * !override sync (elem: Element) : boolean;
	 */
	sync: function (elem)
	{
		this.syncZ(elem);
		return true;
	},

	/**
	 * Clears the container to empty. All contained elements will be destroyed.
	 * !override clear() : void;
	 */
	clear: function()
	{
		let i;

		while ((i = this.list.shift()) !== null)
		{
			i.remover.remove(this._remove, this);
			i.container = null;
			dispose(i);
		}

		this.elementCount = 0;
	},

	/**
	 * Resets the container to empty. Contained elements are not destroyed. Use `clear` if that is your intention.
	 * !override reset() : void;
	 */
	reset: function()
	{
		let i;

		while ((i = this.list.shift()) !== null)
		{
			i.remover.remove(this._remove, this);
			i.container = null;
		}

		this.elementCount = 0;
	},

	/**
	 * Adds an element to the container. Returns boolean indicating if successful.
	 * !override add (elem: Element) : boolean;
	 */
	add: function (elem)
	{
		if (!Element.isInstance(elem))
			throw new Error ('argument must be an Element');

		this.list.push(elem);
		this.elementCount++;

		elem.container = this;
		elem.remover.add(this._remove, this, this.list.bottom);

		this.syncZ(elem);
		return true;
	},

	/**
	 * Callback to remove an element from the container (called by Handler).
	 */
	_remove: function (elem, self, node)
	{
		self.list.remove(node);
		self.elementCount--;

		elem.container = null;
		return false;
	},

	/**
	 * Removes an element from the container and returns it.
	 * !override remove (elem: Element) : Element;
	 */
	remove: function (elem)
	{
		elem.remover.execf(this._remove, this);
		return elem;
	},

	/**
	 * Actually draws the contained elements. Does not take the active viewport into account (hence simple container).
	 * !override render() : void;
	 */
	render: function()
	{
		let flags = GridElement.ALIVE | GridElement.VISIBLE;

		for (let i = this.list.top; i; i = i.next)
		{
			if (!i.value.getFlags(flags))
				continue;

			if (this.drawElement(i.value, this) === false)
				break;
		}
	}
});
