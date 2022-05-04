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

import { Class } from 'rinn';
import Container from './container.js';
import Viewport from './viewport.js';
import Group from './group.js';
import Bounds2 from '../math/bounds2.js';
import List from '../utils/list.js';
import Handler from '../utils/handler.js';
import globals from '../system/globals.js';

//![import "./container"]
//![import "./viewport"]
//![import "./group"]
//![import "../math/bounds2"]
//![import "../utils/list"]
//![import "../utils/handler"]
//![import "../system/globals"]

//:/**
//: * 	A scene is a set of containers, viewports and groups. Rendering is done in their specific index-based order.
//: */

//!class Scene

const Scene = Class.extend
({
	className: 'Scene',

	/**
	 * Minimum dimensions of the scene (smallest container size).
	 * !readonly minWidth: number;
	 * !readonly minHeight: number;
	 */
	minWidth: null,
	minHeight: null,

	/**
	 * Maximum dimensions of the scene (largest container size).
	 * !readonly maxWidth: number;
	 * !readonly maxHeight: number;
	 */
	maxWidth: null,
	maxHeight: null,

	/**
	 * List of containers.
	 */
	containers: null,

	/**
	 * List of viewports.
	 */
	viewports: null,

	/**
	 * Active viewport bounds, used to select items in a visible region.
	 * !readonly viewportBounds: Bounds2;
	 */
	viewportBounds: null,

	/**
	 * List of Group elements.
	 */
	groupList: null,

	/**
	 * Named Group elements.
	 */
	groups: null,

	/**
	 * Disposal queue.
	 */
	disposalQueue: null,

	/**
	 * First updater. Runs before any other update calls.
	 * !readonly fupdater: Handler;
	 */
	fupdater: null,

	/**
	 * General updater. Runs after the first updater and before synchronizer.
	 * !readonly updater: Handler;
	 */
	updater: null,

	/**
	 * Synchronizer. Run after general updater, and before viewport synchronization.
	 * !readonly synchronizer: Handler;
	 */
	synchronizer: null,

	/**
	 * Last updater. Runs after all other update calls.
	 * !readonly lupdater: Handler;
	 */
	lupdater: null,

	/**
	 * Destroyer runs when the scene is destroyed.
	 * !readonly destroyer: Handler;
	 */
	destroyer: null,

	/**
	 * Current delta time. Set upon entering the `update` method. Reflects the same value as System.frameDelta.
	 * !readonly dt: number;
	 */
	dt: 0,

	/**
	 * Flags of the object (see constants at the bottom of this file).
	 */
	flags: 0,

	/**
	 * Total number of elements drawn on the last draw operation.
	 * !readonly drawCount: number;
	 */
	drawCount: 0,

	/**
	 * Scene object pointing to itself.
	 */
	scene: null,

	/**
	 * Base depth (z-value) of the scene.
	 * !readonly zvalue: number;
	 */
	zvalue: null,

	/**
	 * Constructs an empty scene with the specified index.
	 * @param index - Index for the scene. Used to calculate the base z-value of the scene. Valid range is from 0 to 3.
	 * !constructor (index: number);
	 */
	__ctor: function(index)
	{
		this.containers = [];

		/**
		 * 	Z-value is a 24-bit value constructed as:
		 *		2-bits: Scene Index
		 *		4-bits: Container Index
		 *		18-bits: Element z-value
		 */
		this.zvalue = (index & 3) << (18+4);

		this.viewports = [];
		this.viewportBounds = Bounds2.Pool.alloc();

		this.groupList = List.Pool.alloc();
		this.groups = { };

		this.disposalQueue = List.Pool.alloc();

		this.fupdater = Handler.Pool.alloc(this);
		this.updater = Handler.Pool.alloc(this);
		this.synchronizer = Handler.Pool.alloc(this);
		this.lupdater = Handler.Pool.alloc(this);
		this.destroyer = Handler.Pool.alloc(this);

		this.flags = Scene.VISIBLE;
		this.scene = this;
	},

	/**
	 * Destroys the instance along with all containers, viewports and groups.
	 */
	__dtor: function()
	{
		this.disposeQueued();
		this.disposalQueue.free();

		this.destroyer.exec();
		this.destroyer.free();

		this.fupdater.free();
		this.updater.free();
		this.synchronizer.free();
		this.lupdater.free();

		let i;

		while ((i = this.groupList.shift()) !== null)
		{
			i.remover.remove(this._remove, this);
			i.container = null;
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

	/**
	 * Clears the scene leaving only viewports.
	 * !clear() : void;
	 */
	clear: function()
	{
		this.disposeQueued();

		let i;

		while ((i = this.groupList.shift()) !== null)
		{
			i.remover.remove(this._remove, this);
			i.container = null;
			dispose(i);
		}

		for (i = 0; i < this.containers.length; i++)
		{
			if (this.containers[i])
				this.containers[i].clear();
		}
	},

	/**
	 * Returns the value of the `visible` flag.
	 * !visible() : boolean;
	 */
	/**
	 * Sets the value of the `visible` flag.
	 * !visible(value: boolean) : Container;
	 */
	visible: function (value=null)
	{
		if (value === null)
			return !!(this.flags & Scene.VISIBLE);

		this.flags &= ~Scene.VISIBLE;
		if (value) this.flags |= Scene.VISIBLE;

		return this;
	},

	/**
	 * Sets a container at the specified index.
	 * @param index - Index of the container, valid range is from 0 to 15.
	 * !setContainer (index: number, container: Container) : Scene;
	 */
	setContainer: function (index, container)
	{
		if (index < 0) return this;
		index &= 15;

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
		container.zvalue = this.zvalue + (index << 18);

		this.containers[index] = container;
		return this;
	},

	/**
	 * Returns the container at the specified index.
	 * !getContainer (index: number) : Container;
	 */
	getContainer: function (index)
	{
		return index < 0 || index >= this.containers.length ? null : this.containers[index];
	},

	/**
	 * Sets a viewport at the specified index.
	 * !setViewport (index: number, viewport: Viewport) : Scene;
	 */
	setViewport: function (index, viewport)
	{
		if (index < 0) return this;

		if (viewport !== null && !Viewport.isInstance(viewport))
			throw new Error('Scene: Unable to set viewport at index ' + index + ': argument is not a Viewport.');

		this.viewports[index] = viewport;
		return this;
	},

	/**
	 * Returns the viewport at the specified index.
	 * !getViewport (index: number) : Viewport;
	 */
	getViewport: function (index)
	{
		return index < 0 || index >= this.viewports.length ? null : this.viewports[index];
	},

	/**
	 * Adds the given element to the disposal queue. To be destroyed on the next call to `disposeQueued`.
	 * !disposeLater (elem: Element) : void;
	 */
	disposeLater: function (elem)
	{
		if (!elem.alive()) return;

		this.disposalQueue.push(elem);
		elem.alive(false);
	},

	/**
	 * Disposes all elements in the disposal queue.
	 * !disposeQueued() : void;
	 */
	disposeQueued: function ()
	{
		let elem;

		while ((elem = this.disposalQueue.shift()) !== null)
			dispose(elem);
	},

	/**
	 * Adds a group to the scene.
	 * !addGroup (group: Group) : boolean;
	 */
	addGroup: function (group)
	{
		if (!Group.isInstance(group))
			throw new Error ('argument must be a Group');

		this.groupList.push(group);

		if (group.id !== null)
			this.groups[group.id] = group;

		group.container = this;
		group.remover.add(this._removeGroup, this, this.groupList.bottom);

		return true;
	},

	/**
	 * Callback to remove a group from the scene (called by Handler).
	 */
	_removeGroup: function (group, self, node)
	{
		group.container = null;
		self.groupList.remove(node);

		if (group.id !== null)
			self.groups[group.id] = null;

		return false;
	},

	/**
	 * Removes a group from the scene.
	 * !removeGroup (group: Group) : Group;
	 */
	removeGroup: function (group)
	{
		group.remover.execf(this._remove, this);
		return group;
	},

	/**
	 * Syncs the actual location of the specified element with its storage location. Returns `true` if successful.
	 * !sync (group: Group) : boolean;
	 */
	sync: function (group)
	{
		return true;
	},

	/**
	 * Draws the scene, by executing the `draw` method on each container. The entire scene will be drawn once for each viewport, and
	 * the visible region rules of each viewport will be applied.
	 * !draw (g: Canvas) : void;
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

			globals.viewport = viewport;

			g.pushClip();
			g.pushMatrix();

			viewport.applyClip(g);
			viewport.applyTransform(g);

			this.viewportBounds.set(viewport.bounds);//.resizeBy(2, 2);
			this.drawContainers(g, this.viewportBounds);

			g.popMatrix();
			g.popClip();
		}
	},

	/**
	 * Draws the scene containers and passes the specified viewport bounds to the container.
	 * !drawContainers (g: Canvas, viewportBounds: Bounds2) : void;
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

	/**
	 * Updates the scene viewports.
	 */
	updateViewports: function ()
	{
		for (let i = 0; i < this.viewports.length; i++)
		{
			if (!this.viewports[i])
				continue;

			this.viewports[i].update(this.dt);
		}
	},

	/**
	 * Runs a scene update cycle.
	 * !update (dt: number) : void;
	 */
	update: function (dt)
	{
		this.dt = dt;
		this.fupdater.exec();

		this.updater.exec();
		this.disposeQueued();
		this.synchronizer.exec();
		this.updateViewports();

		this.lupdater.exec();
	}
});


/**
 * 	Constants.
 */
Scene.VISIBLE = 0x001;

export default Scene;
