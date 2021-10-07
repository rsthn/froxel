/*
**	flow/updater.js
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
**	An updater is used to update one or more elements and synchronize their position with their container.
*/

const Updater = Class.extend
({
	className: 'Updater',

	/*
	**	Scene where the updater is attached.
	*/
	scene: null,

	/*
	**	List of elements.
	*/
	list: null,

	/*
	**	Callback passed when constructing the updater.
	*/
	__update: null,
	__context: null,

	/*
	**	Constructs the updater.
	*/
	__ctor: function (scene, update=null, context=null)
	{
		this.list = List.Pool.calloc();
		this.scene = scene;

		this.__update = update;
		this.__context = context;

		this.scene.updater.add(this._update, this);
		this.scene.synchronizer.add(this._sync, this);
		this.scene.destroyer.add(this._destroy, this);
	},

	/*
	**	Destroys the instance. All elements will just be removed.
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

	_destroy: function (scene, self)
	{
		dispose(self);
	},

	/*
	**	Adds an element to the updater.
	*/
	add: function (elem)
	{
		if (!Element.isInstance(elem))
			throw new Error ('argument must be an Element');

		this.list.push(elem);

		elem.remover.add(this._remove, this, this.list.bottom);
		return true;
	},

	/*
	**	Callback to remove an element from the updater (called by Handler).
	*/
	_remove: function (elem, self, node)
	{
		self.list.remove(node);
		return false;
	},

	/*
	**	Removes an element from the updater.
	*/
	remove: function (elem)
	{
		elem.remover.execf(this._remove, this);
		return elem;
	},

	/*
	**	Callback for the synchronizer.
	*/
	_sync: function (scene, self)
	{
		for (let i = self.list.top; i; i = i.next)
			i.value.sync();
	},

	/*
	**	Callback for the updater.
	*/
	_update: function (scene, self)
	{
		self.update(scene.dt);
	},

	/*
	**	Runs an update cycle.
	*/
	update: function (dt) /* @override */
	{
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
	}
});

export default Updater;
