
import { Class } from 'rinn';
import List from '../utils/list.js';
import Element from './element.js';

//![import "../utils/list"]
//![import "./element"]

//:/**
//: * 	An updater is used to update one or more elements and synchronize their position with their container.
//: */

//!class Updater

const Updater = Class.extend
({
	className: 'Updater',

	/**
	 * 	Scene where the updater is attached.
	 * 	!readonly scene: Scene;
	 */
	scene: null,

	/**
	 * 	List of elements.
	 */
	list: null,

	/**
	 * 	Callback passed when constructing the updater.
	 */
	__update: null,
	__context: null,

	/**
	 * 	Pre-update and post-update callbacks. Set using the `preupdate` and `postupdate` methods.
	 */
	__preupdate: null,
	__postupdate: null,

	/**
	 * 	Constructs the updater linked to the specified scene.
	 * 	!constructor (scene: Scene, update: (elem: Element, dt: number, context: object) => boolean, context?: object);
	 */
	__ctor: function (scene, update=null, context=null)
	{
		this.list = List.Pool.alloc();
		this.scene = scene;

		this.__update = update;
		this.__context = context;

		this.__preupdate = null;
		this.__postupdate = null;

		this.scene.updater.add(this._update, this);
		this.scene.synchronizer.add(this._sync, this);
		this.scene.destroyer.add(this._destroy, this);
	},

	/**
	 * 	Destroys the instance. All elements will just be removed.
	 */
	__dtor: function()
	{
		let i;

		this.scene.updater.remove(this._update, this);
		this.scene.synchronizer.remove(this._sync, this);
		this.scene.destroyer.remove(this._destroy, this);

		while ((i = this.list.shift()) !== null) {
			i.remover.remove(this._remove, this);
		}

		this.list.free();
	},

	/**
	 * 	Destroyer callback.
	 */
	_destroy: function (scene, self)
	{
		dispose(self);
	},


	/**
	 * 	Resets the updater by removing all elements.
	 * 	!reset () : Updater;
	 */
	reset: function ()
	{
		while ((i = this.list.shift()) !== null) {
			i.remover.remove(this._remove, this);
		}

		return this;
	},

	/**
	 * 	Clears the updater by destroying all elements.
	 * 	!clear () : Updater;
	 */
	clear: function ()
	{
		while ((i = this.list.shift()) !== null) {
			i.remover.remove(this._remove, this);
			dispose(i);
		}

		return this;
	},

	/**
	 * 	Sets the pre-update callback.
	 * 	!preupdate (callback: (list: List, dt: number, updater: Updater) => Updater) : Updater;
	 */
	preUpdate: function (callback)
	{
		this.__preupdate = callback;
		return this;
	},

	/**
	 * 	Sets the post-update callback.
	 * 	!postupdate (callback: (list: List, dt: number, updater: Updater) => Updater) : Updater;
	 */
	postUpdate: function (callback)
	{
		this.__postupdate = callback;
		return this;
	},

	/**
	 * 	Adds an element to the updater.
	 * 	!add (elem: Element) : Element;
	 */
	add: function (elem)
	{
		if (!Element.isInstance(elem))
			throw new Error ('argument must be of type: Element');

		this.list.push(elem);

		elem.remover.add(this._remove, this, this.list.bottom);
		return elem;
	},

	/**
	 * 	Callback to remove an element from the updater (called by Handler).
	 */
	_remove: function (elem, self, node)
	{
		self.list.remove(node);
		return false;
	},

	/**
	 * 	Removes an element from the updater.
	 * 	!remove (elem: Element) : Element;
	 */
	remove: function (elem)
	{
		elem.remover.execf(this._remove, this);
		return elem;
	},

	/**
	 * 	Callback for the synchronizer.
	 */
	_sync: function (scene, self)
	{
		for (let i = self.list.top; i; i = i.next)
			i.value.sync();
	},

	/**
	 * 	Callback for the updater.
	 */
	_update: function (scene, self)
	{
		self.update(scene.dt);
	},

	/**
	 * 	Runs an update cycle.
	 * 	!update (dt: number) : void;
	 */
	update: function (dt)
	{
		if (this.__preupdate !== null)
			this.__preupdate (this.list, dt, this.__context);

		if (this.__update !== null)
		{
			let next = null;
			for (let i = this.list.top; i; i = next)
			{
				next = i.next;

				if (this.__update (i.value, dt, this.__context) === false)
					this.remove(i.value);
			}
		}

		if (this.__postupdate !== null)
			this.__postupdate (this.list, dt, this.__context);
	}
});

export default Updater;
