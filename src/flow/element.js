/*
**	flow/element.js
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

import G from '../system/globals.js';
import Anim from '../anim/anim.js';
import Matrix from '../math/matrix.js';
import QuadTreeItem from '../spatial/quadtree-item.js';

/*
**	Describes a display element.
*/

export default QuadTreeItem.extend
({
	className: 'Element',

	/*
	**	Indicates if the element is visible, when set to `false`, the element will not be drawn.
	*/
	_visible: true,

	/*
	**	Indicates if the element is active, when set to `false` the element will not be updated.
	*/
	_active: true,

	/*
	**	Controls whether bounding box creating is relative to the center (false) or to the top-left corner (true).
	*/
	_topLeftRelative: true,

	/*
	**	Indicates if the position has changed.
	*/
	_dirty: false,

	/*
	**	Animation related to the element.
	*/
	anim: null,

	/*
	**	Parent element to whom this element is related.
	*/
	parent: null,

	/*
	**	Container where this element is stored, and its related node. If `container` is false, it means the element doesn't need a container. These
	**	are set by the parent container, do not modify directly.
	*/
	container: null,
	node: null,

	/*
	**	Element type. Can be used to differentiate between elements.
	*/
	type: 0,

	/*
	**	Element visual status.
	*/
	alpha: 1,

	/*
	**	Indicates if the bounds of the element should be drawn (for debugging purposes).
	*/
	debugBounds: false,

	/*
	**	Constructor.
	*/
	__ctor: function(x=0, y=0, width=0, height=0)
	{
		this._super.QuadTreeItem.__ctor();

		this.anim = null;

		this.translate(x, y);
		this.resize(width, height);
	},

	/*
	**	Destructs the element.
	*/
	__dtor: function()
	{
		this.remove();
		this._super.QuadTreeItem.__dtor();

		if (this.anim !== null)
			this.anim.free();
	},

	/*
	**	Destroys the element by adding it to the container's destruction queue. If the element has no container, then it
	**	will be destroyed immediately.
	*/
	destroy: function()
	{
		if (this.container === null)
		{
			dispose(this);
			return;
		}

		this.container.destroy(this);
	},

	/*
	**	Indicates if the element is live. When live, the container will call the `update` method of the element.
	*/
	live: function(value)
	{
		if (this.container === null)
			return this;

		if (value)
			this.container.attachUpdate(this);
		else
			this.container.detachUpdate(this);

		return this;
	},

	/*
	**	Sets or returns the visible flag.
	*/
	visible: function (value=null)
	{
		if (value === null)
		{
			return this._visible && (this.parent != null ? this.parent.visible() : true);
		}

		this._visible = value;
		return this;
	},

	/*
	**	Sets or returns the active flag.
	*/
	active: function (value=null)
	{
		if (value === null)
		{
			return this._active && (this.parent != null ? this.parent.active() : true);
		}

		this._active = value;
		return this;
	},

	/*
	**	Returns the anim object related to the element. Creates one if `create` is set to true.
	*/
	getAnim: function(create=true)
	{
		if (this.anim === null && create === true)
		{
			this.anim = Anim.calloc();
			this.anim.output(this);
		}

		return this.anim;
	},

	/*
	**	Returns the element's root (first parent) or itself if no parent is set.
	*/
	getRoot: function()
	{
		let item = this;
		while (item.parent) item = item.parent;
		return item;
	},

	/*
	**	Sets the parent of the element.
	*/
	setParent: function(parent)
	{
		if (this.parent != null)
		{
		}

		this.parent = parent;
		this._dirty = true;
	},

	/*
	**	Returns the X coordinate of the element.
	*/
	getX: function()
	{
		return this.bounds.x1;
	},

	/*
	**	Returns the Y coordinate of the element.
	*/
	getY: function()
	{
		return this.bounds.y1;
	},

	/*
	**	Changes the animation object of the element.
	*/
	setAnim: function (anim)
	{
		anim.copyTo(this.getAnim());
		return this;
	},

	/*
	**	Resets the animation object of the element.
	*/
	resetAnim: function (anim=null)
	{
		if (anim != null)
			this.setAnim (anim);
		else if (this.anim !== null)
			this.anim.reset();
	},

	/*
	**	Removes the element from the container (and parent element).
	*/
	remove: function()
	{
		if (this.parent != null)
			this.parent.removeChild(this);

		if (this.container)
		{
			this.container.remove(this);
			this.container = null;
			// VIOLET: make some method on container to set null when removed
		}

		return this;
	},

	/*
	**	Marks the element as dirty so that the bounds are synchronized in the next update.
	*/
	setDirty: function()
	{
		this._dirty = true;
		return this;
	},

	/*
	**	Updates the position of the element in the container.
	*/
	updatePosition: function()
	{
		if (!this._dirty || !this.container) return this;

		this.container.updateElementPosition(this);

		this._dirty = false;
		return this;
	},

	/*
	**	Sets the width and height of the element.
	*/
	resize: function (width, height)
	{
		this.bounds.resize (width, height, this._topLeftRelative);

		this._dirty = true;
		return this;
	},

	/*
	**	Moves the element by the specified deltas.
	*/
	translate: function (dx, dy, upscaled=false)
	{
		this.bounds.translate (dx, dy, upscaled);

		this._dirty = true;
		return this;
	},

	/*
	**	Sets the position of the element.
	*/
	setPosition: function (x, y)
	{
		return this.translate (x-this.bounds.x1, y-this.bounds.y1);
	},

	/*
	**	Called before the `elementDraw` operation to ensure the canvas is transformed based on the element's state.
	*/
	preDraw: function(g)
	{
		g.pushMatrix();
		g.pushAlpha();

		g.translate(this.bounds.x1, this.bounds.y1);

		if (this.alpha != 1.0)
			g.alpha(this.alpha);
	},

	/*
	**	Called after the `elementDraw` operation to restore the canvas transform.
	*/
	postDraw: function(g)
	{
		g.popAlpha();
		g.popMatrix();

		if (g.gl !== null)
			return;

		if ((G.debugBounds && this.type) || this.debugBounds)
		{
			//g.lineWidth(1/System.canvasScaleFactor);
			//g.strokeStyle("yellow");
			//g.strokeRect(0.5, 0.5, this.width-1, this.height-1);

			g.fillStyle("rgba(0,255,255,0.5)");
			g.fillRect(this.insertionBounds.x1, this.insertionBounds.y1, this.insertionBounds.width(), this.insertionBounds.height());
		}

		/*
			// violet: remove this? or figure a better way to have this.
			//if (this.highlight)
			//{
			//	g.fillStyle("rgba(255,0,0,0.5)");
			//	g.fillRect(this.highlight.x1, this.highlight.y1, this.highlight.width(), this.highlight.height());
			//}
		}*/

		if (G.debugId && this.type)
		{
			g.font('bold 3px monospace');
			g.textBaseline('top');
			g.fillStyle('#000');
			g.fillRect(this.insertionBounds.x1, this.insertionBounds.y1-1, g.measureText(this.id), 4);
			g.fillStyle('#fff');
			g.fillText(this.id, this.insertionBounds.x1, this.insertionBounds.y1);
		}
	},

	/*
	**	Draws the element on the specified canvas. If the `_visible` flag is false, this method has no effect.
	*/
	draw: function(g)
	{
		if (!this.visible()) return; // violet: optimize by returning immediately if elementDraw is the default one

		this.preDraw (g);
		this.elementDraw (g);
		this.postDraw (g);
	},

	/*
	**	Updates the element by the specified amount of time `dt` (seconds). If `_active` flag is false, this method has no effect.
	*/
	update: function(dt)
	{
		if (!this.active()) return;

		let animFinished = this.anim !== null ? this.anim.update(dt) : true;

		this.elementUpdate(dt);

		if (!animFinished || this._dirty)
			this.updatePosition();
	},

	/*
	**	Draws the element to the specified canvas. Ensure draw operations are done in model-space.
	*/
	elementDraw: function(g) /* @override */
	{
	},

	/*
	**	Updates the element. Parameter `dt` is the time delta measured in seconds.
	*/
	elementUpdate: function(dt) /* @override */
	{
	},

	/*
	**	Executed when the item is added to a container.
	*/
	onAttached: function (container) /* @override */
	{
	},

	/*
	**	Executed when the item is removed from a container.
	*/
	onDetached: function (container) /* @override */
	{
	}
});
