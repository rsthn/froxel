/*
**	flow/scene.js
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
import Container from './container.js';
import Viewport from './viewport.js';
import Group from './group.js';
import Bounds2 from '../math/bounds2.js';
import Globals from '../system/globals.js';
import List from '../utils/list.js';
import Category from './category.js';

/*
**	A scene is a set of containers, viewports and groups. Rendering is done in their specific index-based order.
*/

const Scene = Class.extend
({
	className: 'Scene',

	/*
	**	Minimum dimensions of the scene (smallest container size).
	*/
	minWidth: null, minHeight: null,

	/*
	**	Maximum dimensions of the scene (largest container size).
	*/
	maxWidth: null, maxHeight: null,

	/*
	**	List of containers.
	*/
	containers: null,

	/*
	**	List of viewports.
	*/
	viewports: null,

	/*
	**	Active viewport bounds, used to select items in a visible region.
	*/
	viewportBounds: null,

	/*
	**	List of groups.
	*/
	groupList: null,

	/*
	**	List of categories.
	*/
	categories: null,

	/*
	**	Named groups.
	*/
	groups: null,

	/*
	**	Disposal queue.
	*/
	disposalQueue: null,

	/*
	**	Flags of the object (see constants at the bottom of this file).
	*/
	flags: 0,

	/*
	**	Total number of elements drawn on the last draw operation.
	*/
	drawCount: 0,

	/*
	**	Constructs an empty scene.
	*/
	__ctor: function()
	{
		this.containers = [];

		this.viewports = [];
		this.viewportBounds = Bounds2.alloc();

		this.groupList = List.calloc();
		this.groups = { };

		this.categories = List.calloc();

		this.disposalQueue = List.calloc();

		this.flags = Scene.VISIBLE;
	},

	/*
	**	Destroys the instance along with all containers, viewports and groups.
	*/
	__dtor: function()
	{
		this.disposeQueued();
		this.disposalQueue.free();

		let i;

		while ((i = this.groupList.shift()) !== null)
		{
			i.h_remove.remove(this._remove, this);
			i.container = null;
			dispose(i);
		}

		while ((i = this.categories.shift()) !== null) {
			dispose(i);
		}

		for (i = 0; i < this.containers.length; i++)
		{
			if (!this.containers[i]) continue;

			this.containers[i].scene = null;
			dispose(this.containers[i]);

			this.containers[i] = null;
		}

		for (i = 0; i < this.viewports.length; i++)
		{
			if (!this.viewports[i]) continue;

			dispose(this.viewports[i]);
			this.viewports[i] = null;
		}

		this.viewportBounds.free();
		this.groupList.free();
	},

	/*
	**	Sets or gets the visible flag.
	*/
	visible: function (value=null)
	{
		if (value === null)
			return !!(this.flags & Scene.VISIBLE);

		this.flags &= ~Scene.VISIBLE;
		if (value) this.flags |= Scene.VISIBLE;

		return this;
	},

	/*
	**	Sets a container at the specified index.
	*/
	setContainer: function (index, container)
	{
		if (index < 0) return this;

		if (container === null)
		{
			this.containers[index].scene = null;
			this.containers[index] = null;
			return this;
		}

		if (!Container.isInstance(container))
			throw new Error('Scene: Unable to set container at index ' + index + ': argument is not a Container');

		if (this.minWidth === null || container.width < this.minWidth) this.minWidth = container.width;
		if (this.minHeight === null || container.height < this.minHeight) this.minHeight = container.height;
		if (this.maxWidth === null || container.width > this.maxWidth) this.maxWidth = container.width;
		if (this.maxHeight === null || container.height > this.maxHeight) this.maxHeight = container.height;

		container.scene = this;
		this.containers[index] = container;
		return this;
	},

	/*
	**	Returns the container at the specified index.
	*/
	getContainer: function (index)
	{
		return index < 0 || index >= this.containers.length ? null : this.containers[index];
	},

	/*
	**	Sets a viewport at the specified index.
	*/
	setViewport: function (index, viewport)
	{
		if (index < 0) return this;

		if (viewport !== null && !Viewport.isInstance(viewport))
			throw new Error('Scene: Unable to set viewport at index ' + index + ': argument is not a Viewport.');

		this.viewports[index] = viewport;
		return this;
	},

	/*
	**	Returns the viewport at the specified index.
	*/
	getViewport: function (index)
	{
		return index < 0 || index >= this.viewports.length ? null : this.viewports[index];
	},

	/*
	**	Adds the given element to the disposal queue. To be destroyed on the next call to `disposeQueued`.
	*/
	disposeLater: function (elem)
	{
		if (!elem.alive()) return;

		this.disposalQueue.push(elem);
		elem.alive(false);
	},

	/*
	**	Disposes all elements in the disposal queue.
	*/
	disposeQueued: function ()
	{
		let elem;

		while ((elem = this.disposalQueue.shift()) !== null)
			dispose(elem);
	},

	/*
	**	Adds a group to the scene.
	*/
	addGroup: function (group)
	{
		if (!Group.isInstance(group))
			throw new Error ('argument must be a Group');

		this.groupList.push(group);

		if (group.id !== null)
			this.groups[group.id] = group;

		group.container = this;
		group.h_remove.add(this._removeGroup, this, this.groupList.bottom);

		return true;
	},

	/*
	**	Callback to remove a group from the scene (called by Handler).
	*/
	_removeGroup: function (group, self, node)
	{
		group.container = null;
		self.groupList.remove(node);

		if (group.id !== null)
			delete self.groups[group.id];

		return false;
	},

	/*
	**	Removes a group from the scene.
	*/
	removeGroup: function (group)
	{
		group.h_remove.execf(this._remove, this);
		return group;
	},

	/*
	**	Adds a category to the scene.
	*/
	addCategory: function (catg)
	{
		if (!Category.isInstance(catg))
			throw new Error ('argument must be a Category');

		this.categories.push(catg);

		catg.scene = this;
		catg.node = this.categories.bottom;

		return true;
	},

	/*
	**	Removes a category from the scene.
	*/
	removeCategory: function (catg)
	{
		if (catg.scene !== this)
			return catg;

		this.categories.remove(catg.node);

		catg.scene = null;
		catg.node = null;

		return catg;
	},

	/*
	**	Syncs the actual location of the specified element with its storage location. Returns true if successful.
	*/
	sync: function (group)
	{
		return true;
	},

	/*
	**	Draws the scene, by executing the `draw` method on each container. The entire scene will be drawn once for each viewport
	**	added, and the visible region rules of each viewport will be applied.
	*/
	draw: function (g)
	{
		if (!this.visible()) return;

		this.drawCount = 0;

		if (!this.viewports.length)
		{
			this.drawContainers(g, null);
			return;
		}

		for (let viewportIndex = 0; viewportIndex < this.viewports.length; viewportIndex++)
		{
			let viewport = this.viewports[viewportIndex];
			if (!viewport || !viewport.enabled()) continue;

			Globals.viewport = viewport;

			g.pushClip();
			g.pushMatrix();

			viewport.applyClip(g);
			viewport.applyTransform(g);

			this.viewportBounds.set(viewport.getBounds()).resizeBy(2, 2);
			this.drawContainers(g, this.viewportBounds);

			g.popMatrix();
			g.popClip();
		}
	},

	/*
	**	Draws the scene containers and passes the specified viewport bounds to the container.
	*/
	drawContainers: function (g, viewportBounds)
	{
		try
		{
			for (let i = 0; i < this.containers.length; i++)
			{
				if (!this.containers[i])
					continue;

				this.containers[i].setViewportBounds(viewportBounds);
				this.containers[i].draw(g);

				this.drawCount += this.containers[i].drawCount;
			}
		}
		catch (e)
		{
			if (e.message !== 'FRAME_END') {
				throw e;
			}
		}
	},

	/*
	**	Updates the scene viewports.
	*/
	updateViewports: function (dt)
	{
		for (let i = 0; i < this.viewports.length; i++)
		{
			if (!this.viewports[i])
				continue;

			this.viewports[i].update(dt);
		}
	},

	/*
	**	Updates the scene categories.
	*/
	updateCategories: function (dt)
	{
		for (let i = this.categories.top; i; i = i.next)
			i.value.update (dt);
	},

	/*
	**	Runs a sync on all categories.
	*/
	syncCategories: function ()
	{
		for (let i = this.categories.top; i; i = i.next)
			i.value.sync();
	},

	/*
	**	Runs a scene update cycle.
	*/
	update: function (dt)
	{
		this.updateCategories(dt);
		this.disposeQueued();
		this.syncCategories();
		this.updateViewports(dt);
	}
});


/*
**	Constants.
*/
Scene.VISIBLE = 0x001;

export default Scene;
