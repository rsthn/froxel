/*
**	flow/group.js
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

import Element from './element.js';
import List from '../utils/list.js';
import Point2 from '../math/point2.js';
import Recycler from '../utils/recycler.js';
import GridElement from './grid-element.js';

//![import "./element"]
//![import "../utils/list"]
//![import "../math/point2"]
//![import "../utils/recycler"]

const tempPoint = Point2.Pool.alloc();

//:/**
//: * 	Groups one or more elements into a single one.
//: */

//!class Group extends Element

const Group = Element.extend
({
	className: 'Group',

	/**
	 * List of elements in the group.
	 * !readonly children: List;
	 */
	children: null,

	/**
	 * 	Virtual zero reference point.
	 * 	!readonly ref: Point2;
	 */
	ref: null,

	/**
	 * 	Constructs an empty Group element.
	 * 	!constructor (id?: string);
	 */
	__ctor: function (id=null)
	{
		this._super.Element.__ctor(0, 0, 0, 0);

		this.children = List.Pool.alloc();
		this.bounds.reset();

		this.ref = Point2.Pool.alloc();
		this.setId(id);
	},

	/**
	 * 	Destroys the group and all children.
	 */
	__dtor: function()
	{
		this.clear();
		this.children.free();
		this.ref.free();

		this._super.Element.__dtor();
	},

	/**
	 * 	Adds the group itself and all children to the scene's destruction queue. If any element has no container, it will be destroyed immediately.
	 * 	!destroyLater() : void;
	 */
	destroyLater: function()
	{
		if (!this.alive()) return;

		let i;

		while ((i = this.children.shift()) != null)
		{
			i.remover.remove(this._remove, this);
			i.group = null;
			i.destroyLater();
		}

		this._super.Element.destroyLater();
	},

	/**
	 * 	Removes and destroys all child elements.
	 * 	!clear() : Group;
	 */
	clear: function()
	{
		let i;

		while ((i = this.children.shift()) != null)
		{
			i.remover.remove(this._remove, this);
			i.group = null;
			dispose(i);
		}

		return this;
	},

	/**
	 * 	Removes all child elements but does not destroy them.
	 * 	!reset() : Group;
	 */
	reset: function()
	{
		let i;

		while ((i = this.children.shift()) != null)
		{
			i.remover.remove(this._remove, this);
			i.group = null;
		}

		return this;
	},

	/**
	 * Returns the wrapExtents flag of the group.
	 * @returns {boolean}
	 * !wrapExtents () : boolean;
	 */
	/**
	 * Sets the wrapExtents flag of the group.
	 * @param {boolean} value
	 * @returns {Group}
	 * !wrapExtents (value: boolean) : Group;
	 */
	wrapExtents: function (value=null)
	{
		if (value === null)
			return !!(this.flags & GridElement.WRAP_EXTENTS);

		this.flags &= ~GridElement.WRAP_EXTENTS;
		if (value) this.flags |= GridElement.WRAP_EXTENTS;

		return this;
	},

	/**
	 * 	Adds a child element to the group. If the element has its `id` property set, it will be added to the group as a
	 * 	property, which can be accessed directly using the element identifier or using the `getChild` method.
	 * 	!addChild (elem: Element) : Element;
	 */
	addChild: function (elem, relative=false)
	{
		if (!elem) return elem;

		let initial = this.bounds.x1 === null;

		if (initial || (this.flags & GridElement.WRAP_EXTENTS))
		{
			if (initial || elem.bounds.x1 < this.bounds.x1) this.ltranslate(elem.bounds.x1 - this.bounds.x1, 0);
			if (initial || elem.bounds.y1 < this.bounds.y1) this.ltranslate(0, elem.bounds.y1 - this.bounds.y1);
			if (initial || elem.bounds.x2 > this.bounds.x2) this.resizeBy(elem.bounds.x2 - this.bounds.x2, 0);
			if (initial || elem.bounds.y2 > this.bounds.y2) this.resizeBy(0, elem.bounds.y2 - this.bounds.y2);
		}

		this.children.push(elem);

		if (elem.id !== null)
			this[elem.id] = elem;

		if (relative === true)
			elem.translate(this.bounds.x1, this.bounds.y1);

		elem.group = this;
		elem.remover.add(this._remove, this, this.children.bottom);

		return elem;
	},

	/**
	 * 	Return the child element matching the specified identifier.
	 * 	!child (id: string) : Element;
	 */
	getChild: function (id)
	{
		return this[id] || null;
	},

	/**
	 * 	Callback to remove an element from the container (called by Handler).
	 */
	_remove: function (elem, self, node)
	{
		self.children.remove(node);
		elem.group = null;

		if (elem.id !== null)
			self[elem.id] = null;

		return false;
	},

	/**
	 * 	Removes an element from the container and returns it.
	 * 	!removeChild (elem: Element) : Element;
	 */
	removeChild: function (elem)
	{
		if (!elem || elem.group !== this)
			return elem;

		elem.remover.execf(this._remove, this);
		return elem;
	},

	/**
	 * 	Syncs the actual location of the specified element with its storage location. Returns `true` if successful.
	 */
	sync: function()
	{
		for (let i = this.children.top; i; i = i.next)
			i.value.sync();

		return this._super.Element.sync();
	},

	/**
	 * 	Local group translation, moves only the group by the specified deltas. Child elements remain in position.
	 * 	@param upscaled - When `true` the `dx` and `dy` parameters are assumed to be upscaled.
	 * 	!ltranslate (dx: number, dy: number, upscaled?: boolean) : Group;
	 */
	ltranslate: function (dx, dy, upscaled=false)
	{
		return this._super.Element.translate(dx, dy, upscaled);
	},

	/**
	 * 	Moves the group and all children by the specified deltas.
	 * 	@param upscaled - When `true` the `dx` and `dy` parameters are assumed to be upscaled.
	 * 	!ltranslate (dx: number, dy: number, upscaled?: boolean) : Group;
	 */
	translate: function (dx, dy, upscaled=false)
	{
		let _dx = this.bounds.x1;
		let _dy = this.bounds.y1;

		this._super.Element.translate(dx, dy, upscaled);
		this.ref.add(dx, dy, upscaled);

		_dx = this.bounds.x1 - _dx;
		_dy = this.bounds.y1 - _dy;

		for (let i = this.children.top; i; i = i.next)
			i.value.translate(_dx, _dy);

		return this;
	},

	/**
	 * 	Returns a temporal Point2, describing the extra offset introduced by the group when translating a child element by the specified deltas.
	 * 	@param upscaled - When `true` the `dx` and `dy` parameters are assumed to be upscaled.
	 * 	!getOffsets (dx: number, dy: number, upscaled?: boolean) : Point2;
	 */
	getOffsets: function (dx, dy, upscaled=false)
	{
		tempPoint.set(this.bounds.ux1, this.bounds.uy1, true);

		let _dx = tempPoint.x;
		let _dy = tempPoint.y;

		tempPoint.add(dx, dy, upscaled);

		_dx = tempPoint.x - _dx;
		_dy = tempPoint.y - _dy;

		tempPoint.set(_dx, _dy);

		tempPoint.x -= dx;
		tempPoint.y -= dy;

		return tempPoint;
	},

	/**
	 * 	Sets bits of the element flags in the group and all children.
	 * 	!setFlags (value: number) : Group;
	 */
	setFlags: function (value)
	{
		for (let i = this.children.top; i; i = i.next)
			i.value.setFlags(value);

		return this._super.Element.setFlags(value);
	},

	/**
	 * 	Clears bits from the group and all children flags.
	 * 	!clearFlags (value: number) : Group;
	 */
	clearFlags: function (value)
	{
		for (let i = this.children.top; i; i = i.next)
			i.value.clearFlags(value);

		return this._super.Element.clearFlags(value);
	},

	/**
	 * Sets the visible flag of the group and all children.
	 * @param {boolean} value - New visibility value.
	 * @param {boolean} forced - When `true` forces to ignore the VISIBLE_LOCK flag.
	 * !visible (value: boolean, forced?: boolean|false) : GridElement;
	 */
	/**
	 * Returns the visible flag.
	 * !visible() : boolean;
	 */
	visible: function (value=null, forced=false)
	{
		if (value === null)
			return this._super.Element.visible();

		for (let i = this.children.top; i; i = i.next)
			i.value.visible(value, forced);

		return this._super.Element.visible(value, forced);
	},

	/**
	 * Returns the alpha value of the group.
	 * @returns {number}
	 * !alpha () : number;
	 */
	/**
	 * Sets the alpha value of the group and all children.
	 * @param {number} value
	 * @returns {Element}
	 * !alpha (value: number) : Element;
	 */
	alpha: function (value=null)
	{
		if (value === null)
			return this._super.Element.alpha();

		for (let i = this.children.top; i; i = i.next)
			i.value.alpha(value);

		return this._super.Element.alpha(value);
	}
});

//!/class

//!namespace Group
//!namespace Pool

	/**
	 * 	Allocates an empty Group element.
	 * 	!function alloc (id?: string) : Group;
	 */

Recycler.createPool(Group);
export default Group;
