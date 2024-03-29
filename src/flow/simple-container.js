
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
	 * Constructs the simple container with the specified size.
	 * !constructor (width: number, height: number);
	 */
	/**
	 * Constructs the simple container.
	 * !constructor ();
	 */
	__ctor: function (width=0, height=0)
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
	 * Adds an element to the container.
	 * !override add (elem: Element) : Element;
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
		return elem;
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
			if (i.value.getFlags(flags) === false)
				continue;

			if (this.drawElement(i.value, this) === false)
				break;
		}
	}
});
