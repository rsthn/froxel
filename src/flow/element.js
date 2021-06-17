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

import G from '../system/globals'
import Anim from '../anim/anim';
import Matrix from '../math/matrix';
import System from '../system/system';
import QuadTreeItem from '../spatial/quadtree-item';

/*
**
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
	**	Element initial status.
	*/
	alpha: 1,
	angle: 0,
	x: 0, y: 0,
	sx: 1, sy: 1,
	width: 0, height: 0,

	/*
	**	Transformation matrix to place the object in world space.
	*/
	transform: null,
	transformDirty: false,

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

		this.anim = new Anim();
		this.anim.output(this);

		this.x = x;
		this.y = y;

		this.transform = new Matrix();

		this.resize(width, height);
		this.updateTransform(true);
	},

	/*
	**	Destructs the element.
	*/
	__dtor: function()
	{
		this.remove();
		this._super.QuadTreeItem.__dtor();

		dispose(this.anim);
		dispose(this.transform);
	},

	/*
	**	Sets or returns the visible flag.
	*/
	visible: function (value=null)
	{
		if (value === null)
		{
			//if (this.container === null)
			//	return false;

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
			return this._active && (this.parent != null ? this.parent.active() : true);

		this._active = value;
		return this;
	},

	/*
	**	Sets the width and height of the element.
	*/
	resize: function (width, height)
	{
		this.width = width;
		this.height = height;

		this._updateBounds();
	},

	/*
	**	Updates the world-space bounding box.
	*/
	_updateBounds: function()
	{
		this.bounds.zero();
		this.bounds.translate (0, 0);
		this.bounds.resizeBy (this.width, this.height, this._topLeftRelative);

		// violet: figure a way to optimize this
		let p0 = this.transform.applyTo(this.bounds.x1, this.bounds.y1);
		//let p1 = this.transform.applyTo(this.bounds.x1, this.bounds.y2);
		//let p2 = this.transform.applyTo(this.bounds.x2, this.bounds.y1);
		let p3 = this.transform.applyTo(this.bounds.x2, this.bounds.y2);

		this.bounds.reset();
		this.bounds.extendWithPoint(p0);
		//this.bounds.extendWithPoint(p1);
		//this.bounds.extendWithPoint(p2);
		this.bounds.extendWithPoint(p3);
	},

	/*
	**	Updates the element's transformation matrix.
	*/
	updateTransform: function(immediateTransformUpdate=false)
	{
		if (!immediateTransformUpdate)
		{
			this.transformDirty = true;
			return;
		}

		/* ** */
		if (this.parent != null)
			this.transform.set(this.parent.transform);
		else
			this.transform.identity();

		this.transform.translate(this.x, this.y);

		if (this.sx != 0)
			this.transform.scale(this.sx, 1.0);

		if (this.sy != 0)
			this.transform.scale(1.0, this.sy);

		if (this.angle != 0)
		{
			this.transform.translate(0.5*this.width, 0.5*this.height);
			this.transform.rotate(this.angle);
		}

		this.transformDirty = false;

		this._updateBounds();
		this.updatePosition();
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
		this.transformDirty = true;
	},

	/*
	**	Returns the X coordinate of the element, if `absolute` is true it will include any offset introduced by the parent.
	*/
	getX: function(absolute=false)
	{
		return (absolute && this.parent != null ? this.parent.getX(true) : 0) + this.x;
	},

	/*
	**	Returns the Y coordinate of the element, if `absolute` is true it will include any offset introduced by the parent.
	*/
	getY: function(absolute=false)
	{
		return (absolute && this.parent != null ? this.parent.getY(true) : 0) + this.y;
	},

	/*
	**	Applies the inverse transform of the element (including parent transform) to the specified point.
	*/
	inverseTransform: function (point)
	{
		if (this.parent != null)
			this.parent.inverseTransform (point);
//violet: check if this is ok
		point.x -= this.x;
		point.y -= this.y;

		point.x /= this.sx;
		point.y /= this.sy;

		return point;
	},

	/*
	**	Changes the animation object of the element.
	*/
	setAnim: function (anim)
	{
		anim.clone(this.anim);
		return this;
	},

	/*
	**	Resets the animation object of the element.
	*/
	resetAnim: function (anim=null)
	{
		if (anim != null) this.setAnim (anim);
		this.anim.reset();
	},

	/*
	**	Adds the element to the specified container. Returns itself.
	*/
	addTo: function (container)
	{
		container.add(this);
		return this;
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
	**	Updates the position of the element in the container.
	*/
	updatePosition: function()
	{
		if (this.container)
			this.container.syncPosition(this);
	},

	/*
	**	Moves the element by the specified deltas.
	*/
	translate: function (dx, dy, immediateTransformUpdate=false)
	{
		this.x += dx;
		this.y += dy;

		this.bounds.translate (dx, dy);

		this.updateTransform(immediateTransformUpdate);
		return this;
	},

	/*
	**	Sets the position of the element.
	*/
	setPosition: function (x, y, immediateTransformUpdate=false)
	{
		return this.translate (x - this.x, y - this.y, immediateTransformUpdate);
	},

	/*
	**	Applies the element's transform to the specified canvas.
	*/
	applyTransform: function(g)
	{
		g.appendMatrix(this.transform);

		if (this.alpha != 1.0)
			g.alpha(this.alpha);
	},

	/*
	**	Called before the `elementDraw` operation to ensure the canvas is transformed based on the element's state.
	*/
	preDraw: function(g)
	{
		g.pushMatrix();
		g.pushAlpha();

		this.applyTransform(g);
	},

	/*
	**	Called after the `elementDraw` operation to restore the canvas transform.
	*/
	postDraw: function(g)
	{
		g.popAlpha();
		g.popMatrix();

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

		this.preDraw(g);
		this.elementDraw(g);
		this.postDraw(g);
	},

	/*
	**	Updates the element by the specified amount of time `dt` (seconds). If `_active` flag is false, this method has no effect.
	*/
	update: function(dt)
	{
		if (!this.active()) return;

		if (!this.anim.update(dt) || this.transformDirty)
		{
			this.updateTransform(true);
//Log.vars.Y++;//violet: remove, was used to count transform updates
		}
//		else
//Log.vars.X++;//violet: remove, was used to count transform updates

		this.elementUpdate(dt);
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
