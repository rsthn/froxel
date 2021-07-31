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

/*
**	Groups one or more elements into a single one.
*/

export default Element.extend
({
	className: 'Group',

	/*
	**	List of elements in to the group.
	*/
	children: null,

	/*
	**	Constructs an empty group element.
	*/
	__ctor: function (id=null)
	{
		this._super.Element.__ctor(0, 0, 0, 0);

		this.children = List.calloc();
		this.bounds.reset();

		this.setId(id);
	},

	/*
	**	Destroys the group and all children.
	*/
	__dtor: function()
	{
		this.clear();
		this.children.free();

		this._super.Element.__dtor();
	},

	/*
	**	Adds all children to the scene's destruction queue. If any element has no container, it will be destroyed immediately.
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

		this._super.Element.destroy();
	},

	/*
	**	Removes and destroys all child elements.
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

	/*
	**	Removes all child elements.
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

	/*
	**	Adds a child element to the group.
	**
	**	Element addChild (string id, Element elem)
	**	Element addChild (Element elem)
	*/
	addChild: function (elem=null)
	{
		if (!elem) return elem;

		let initial = this.bounds.x1 === null;

		if (initial || elem.bounds.x1 < this.bounds.x1) this.ltranslate(elem.bounds.x1 - this.bounds.x1, 0);
		if (initial || elem.bounds.y1 < this.bounds.y1) this.ltranslate(0, elem.bounds.y1 - this.bounds.y1);
		if (initial || elem.bounds.x2 > this.bounds.x2) this.resizeBy(elem.bounds.x2 - this.bounds.x2, 0);
		if (initial || elem.bounds.y2 > this.bounds.y2) this.resizeBy(0, elem.bounds.y2 - this.bounds.y2);

		this.children.push(elem);

		if (elem.id !== null)
			this[elem.id] = elem;

		elem.group = this;
		elem.remover.add(this._remove, this, this.children.bottom);

		return elem;
	},

	/*
	**	Callback to remove an element from the container (called by Handler).
	*/
	_remove: function (elem, self, node)
	{
		self.children.remove(node);
		elem.group = null;

		if (elem.id !== null)
			self[elem.id] = null;

		return false;
	},

	/*
	**	Removes an element from the container and returns it.
	*/
	removeChild: function (elem)
	{
		if (!elem || elem.group !== this)
			return elem;

		elem.remover.execf(this._remove, this);
		return elem;
	},

	/*
	**	Syncs the actual location of the specified element with its storage location. Returns true if successful.
	*/
	sync: function()
	{
		for (let i = this.children.top; i; i = i.next)
			i.value.sync();

		return this._super.Element.sync();
	},

	/*
	**	Local translation, moves only the group by the specified deltas.
	*/
	ltranslate: function (dx, dy, upscaled=false)
	{
		return this._super.Element.translate(dx, dy, upscaled);
	},

	/*
	**	Moves the group and all children by the specified deltas.
	*/
	translate: function (dx, dy, upscaled=false)
	{
		let _dx = this.bounds.x1;
		let _dy = this.bounds.y1;

		this._super.Element.translate(dx, dy, upscaled);

		_dx = this.bounds.x1 - _dx;
		_dy = this.bounds.y1 - _dy;

		for (let i = this.children.top; i; i = i.next)
		{
			i.value.translate(_dx, _dy);
		}

		return this;
	},

	/*
	**	Override of the `draw` method to do nothing.
	*/
	draw: function(g)
	{
	}
});
