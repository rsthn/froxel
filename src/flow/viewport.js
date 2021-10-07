/*
**	flow/viewport.js
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

/*
**	Viewport class controls the current visible rectangle of the world.
*/

import { Class } from '@rsthn/rin';
import Bounds2 from '../math/bounds2.js';
import Point2 from '../math/point2.js';

const Viewport = Class.extend
({
	className: 'Viewport',

	/*
	**	Dimensions of the viewport.
	*/
	width: 0,
	height: 0,

	/*
	**	Position of the top-left corner of the viewport in screen space.
	*/
	sx: 0,
	sy: 0,

	/*
	**	Position of the center of the viewport in the world.
	*/
	x: 0,
	y: 0,

	/*
	**	Ratio for the viewport's center (value from -1 to 1), used when focusing to use a different focus point instead of the exact center.
	*/
	centerRatioX: 0,
	centerRatioY: 0,

	/*
	**	Position offset, used to move the viewport around without affecting the focus point.
	*/
	offset: null,

	/*
	**	Boundaries of the world (automatically calculated from the world dimensions).
	*/
	worldX1: 0,
	worldY1: 0,
	worldX2: 0,
	worldY2: 0,

	/*
	**	The focus factor determines the ratio of a smaller viewport on which the current focus point must 
	**	be contained. If the focus point is not inside the smaller viewport scrolling will be performed.
	*/
	focusFactorX: 0,
	focusFactorY: 0,

	/*
	**	Focus target rectangle and its offsets. When the viewport is updated it will automatically focus on this rect.
	*/
	focusRect: null,
	focusOffsX: 0,
	focusOffsY: 0,

	/*
	**	Enabled focus axes. Used by the `update` method to figure which axis to update.
	*/
	focusAxisX: true,
	focusAxisY: true,

	/*
	**	Flags of the viewport.
	*/
	flags: 0,

	/*
	**	Viewport scale.
	*/
	scale: 1,

	/*
	**	Global scale, used to scale the entire canvas including the viewport. Useful for debugging viewport bounds.
	*/
	globalScale: 1,

	/*
	**	Bounds of the viewport in world space. Used to determine which elements lie inside the viewport.
	*/
	bounds: null,

	/*
	**	Extra padding for the viewport bounds. Used to extend the viewport bounds without altering the original viewport size nor the world bounds.
	*/
	padding: null,

	/*
	**	Bounds of the focus area of the viewport in world space. When the focusRect moves outside this area the viewport will be
	**	panned to keep it inside these bounds.
	*/
	focusBounds: null,

	/*
	**	Bounds of the viewport in screen space for rendering.
	*/
	screenBounds: null,

	/*
	**	Constructs the viewport with the specified viewport and world dimensions. A focus factor can
	**	be specified as well, if none provided the default value is 0.4.
	*/
	__ctor: function (sx, sy, width, height, worldWidth, worldHeight, focusFactorX/*0.4*/, focusFactorY/*0.4*/)
	{
		this.focusFactorX = focusFactorX == undefined ? 0.4 : focusFactorX;
		this.focusFactorY = focusFactorY == undefined ? 0.4 : focusFactorY;
		this.focusRect = null;

		this.sx = sx;
		this.sy = sy;
		this.width = width;
		this.height = height;

		this.x = 0;
		this.y = 0;

		this.bounds = Bounds2.Pool.calloc();
		this.padding = null;

		this.focusBounds = Bounds2.Pool.calloc();
		this.screenBounds = Bounds2.Pool.calloc();
		this.offset = Point2.Pool.calloc();

		this.flags = Viewport.ENABLED;

		this.setWorldBounds(-worldWidth>>1, -worldHeight>>1, worldWidth>>1, worldHeight>>1);

		this.updateScreenBounds();
		this.updateBounds();
	},

	/*
	**	Destructs the viewport.
	*/
	__dtor: function ()
	{
		this.bounds.free();
		this.focusBounds.free();
		this.screenBounds.free();

		if (this.padding !== null)
			this.padding.free();
	},

	/*
	**	Sets or gets the enabled flag.
	*/
	enabled: function(value=null)
	{
		if (value === null)
			return !!(this.flags & Viewport.ENABLED);

		this.flags &= ~Viewport.ENABLED;
		if (value) this.flags |= Viewport.ENABLED;

		return this;
	},

	/*
	**	Sets the world bounds.
	*/
	setWorldBounds: function (x1, y1, x2, y2)
	{
		if (this.width > x2-x1) this.width = x2-x1;
		if (this.height > y2-y1) this.height = y2-y1;

		this.worldX1 = x1;
		this.worldY1 = y1;
		this.worldX2 = x2;
		this.worldY2 = y2;

		return this;
	},

	/*
	**	Sets the viewport padding.
	*/
	setPadding: function (x1, y1=null, x2=null, y2=null)
	{
		if (this.padding === null)
			this.padding = Bounds2.Pool.calloc();

		if (y1 === null)
		{
			x2 = y2 = x1;
			x1 = y1 = -x1;
		}

		this.padding.set(x1, y1, x2, y2);
		return this;
	},

	/*
	**	Updates the bound rect of the viewport.
	*/
	updateBounds: function (truncateToWorld=false)
	{
		let w = this.width >> 1;
		let h = this.height >> 1;

		let ws = (w/this.scale);
		let hs = (h/this.scale);

		let x1 = this.x-ws+this.offset.x;
		let y1 = this.y-hs+this.offset.y;
		let x2 = this.x+ws+this.offset.x;
		let y2 = this.y+hs+this.offset.y;

		if (truncateToWorld)
		{
			if (x1 < this.worldX1)
				this.offset.setX(this.worldX1 - this.x + ws);
			else if (x2 > this.worldX2)
				this.offset.setX(this.worldX2 - this.x - ws);

			if (y1 < this.worldY1)
				this.offset.setY(this.worldY1 - this.y + hs);
			else if (y2 > this.worldY2)
				this.offset.setY(this.worldY2 - this.y - hs);

			x1 = this.x-ws+this.offset.x;
			y1 = this.y-hs+this.offset.y;
			x2 = this.x+ws+this.offset.x;
			y2 = this.y+hs+this.offset.y;
		}

		this.bounds.set (x1, y1, x2, y2);

		if (this.padding !== null)
			this.bounds.add (this.padding);

		this.focusBounds.set (
			this.x - (this.focusFactorX*w + this.centerRatioX*w)/this.scale, this.y - (this.focusFactorY*h + this.centerRatioY*h)/this.scale,
			this.x + (this.focusFactorX*w + this.centerRatioX*w)/this.scale, this.y + (this.focusFactorY*h + this.centerRatioY*h)/this.scale
		);
	},

	/*
	**	Updates the screen bound rect of the viewport.
	*/
	updateScreenBounds: function ()
	{
		this.screenBounds.set (this.sx, this.sy, this.sx + this.width, this.sy + this.height);
	},

	/*
	**	Sets the size of the viewport.
	*/
	resize: function (width, height)
	{
		this.width = width;
		this.height = height;

		this.updateScreenBounds();
		this.updateBounds();

		return this;
	},

	/*
	**	Resizes the viewport by the specified deltas.
	*/
	resizeBy: function (dWidth, dHeight)
	{
		this.width += dWidth;
		this.height += dHeight;

		this.updateScreenBounds();
		this.updateBounds();

		return this;
	},

	/*
	**	Sets the center position of the viewport within the world.
	*/
	setPosition: function (x, y)
	{
		this.x = x;
		this.y = y;

		this.offset.set(0, 0);
		this.updateBounds();

		return this;
	},

	/*
	**	Sets the position of the viewport relative to the current focus point.
	*/
	setOffsets: function (dx, dy)
	{
		this.offset.set(dx, dy);
		this.updateBounds();

		return this;
	},

	/*
	**	Sets the scale of the viewport.
	*/
	setScale: function (value)
	{
		this.scale = value;

		this.updateScreenBounds();
		this.updateBounds();

		return this;
	},

	/*
	**	Sets the global scale of the viewport.
	*/
	setGlobalScale: function (value)
	{
		this.globalScale = value;
		return this;
	},

	/*
	**	Sets the center ratio of the viewport.
	*/
	setCenter: function (rx, ry)
	{
		this.centerRatioX = rx;
		this.centerRatioY = ry;

		return this;
	},

	/*
	**	Moves the viewport in the world, relative to the current focus point.
	*/
	translate: function (dx, dy, truncateToWorld=false)
	{
		this.offset.add(dx, dy);

		this.updateBounds(truncateToWorld);
		return this;
	},

	/*
	**	Sets the screen position of the viewport.
	*/
	setScreenPosition: function (sx, sy)
	{
		this.sx = sx;
		this.sy = sy;

		this.updateScreenBounds();
		return this;
	},

	/*
	**	Returns the X position of the viewport inside the world. When `absolute` is true, the focus point X (without offset) will be returned.
	*/
	getX: function (absolute=false)
	{
		return this.x + (absolute ? 0 : this.offset.x);
	},

	/*
	**	Returns the Y position of the viewport inside the world. When `absolute` is true, the focus point Y (without offset) will be returned.
	*/
	getY: function (absolute=false)
	{
		return this.y + (absolute ? 0 : this.offset.y);
	},

	/*
	**	Returns the X position of the viewport inside the world relative to the current focus point.
	*/
	getOffsetX: function ()
	{
		return this.offset.x;
	},

	/*
	**	Returns the Y position of the viewport inside the world relative to the current focus point.
	*/
	getOffsetY: function ()
	{
		return this.offset.y;
	},

	/*
	**	Returns the width of the viewport.
	*/
	getWidth: function ()
	{
		return this.width;
	},

	/*
	**	Returns the height of the viewport.
	*/
	getHeight: function ()
	{
		return this.height;
	},

	/*
	**	Returns the bounds of the viewport in world-space.
	*/
	getBounds: function ()
	{
		return this.bounds;
	},

	/*
	**	Returns the bounds of the viewport in screens-space.
	*/
	getScreenBounds: function ()
	{
		return this.screenBounds;
	},

	/*
	**	Returns the bounds of the focus-area rectangle in world-space.
	*/
	getFocusBounds: function ()
	{
		return this.focusBounds;
	},

	/*
	**	Moves the viewport to focus on the specified line or coordinate (X-axis). Method `updateBounds` should be called afterwards.
	*/
	focusX: function (i0, i1=null, kx=null)
	{
		if (kx === null) kx = this.focusFactorX;
		if (i1 === null) i1 = i0;

		let w = this.width >> 1;

		let x1 = this.x - int((kx*w + this.centerRatioX*w)/this.scale);
		let x2 = this.x + int((kx*w + this.centerRatioX*w)/this.scale);

		if (x1 == x2)
			i0 = i1 = (i0 + i1) >> 1;

		let nx = this.x;

		if (i0 < x1) nx += (i0 - x1);
		else if (i1 > x2) nx += (i1 - x2);

		x1 = nx - w;
		x2 = nx + w;

		if (x1 < this.worldX1) nx = this.worldX1 + w;
		if (x2 > this.worldX2) nx = this.worldX2 - w;

		this.x = nx;
		return this;
	},

	/*
	**	Moves the viewport to focus on the specified line or coordinate (Y-axis). Method `updateBounds` should be called afterwards.
	*/
	focusY: function (j0, j1=null, ky=null)
	{
		if (ky === null) ky = this.focusFactorY;
		if (j1 === null) j1 = j0;

		let h = this.height >> 1;

		let y1 = this.y - int((ky*h + this.centerRatioY*h)/this.scale);
		let y2 = this.y + int((ky*h + this.centerRatioY*h)/this.scale);

		if (y1 == y2)
			j0 = j1 = (j0 + j1) >> 1;

		let ny = this.y;

		if (j0 < y1) ny += (j0 - y1);
		else if (j1 > y2) ny += (j1 - y2);

		y1 = ny - h;
		y2 = ny + h;

		if (y1 < this.worldY1) ny = this.worldY1 + h;
		if (y2 > this.worldY2) ny = this.worldY2 - h;

		this.y = ny;
		return this;
	},

	/*
	**	Updates the viewport.
	*/
	update: function (dt)
	{
		if (this.focusRect === null)
			return;

		if (this.focusAxisX)
			this.focusX (this.focusRect.x1, this.focusRect.x2);

		if (this.focusAxisY)
			this.focusY (this.focusRect.y1, this.focusRect.y2);

		this.updateBounds();
	},

	/*
	**	Tracks a specified rectangle by maintaining focus on it (a call to `update` must be made on every frame update).
	*/
	setFocusRect: function (/*Rect*/rect, offsX=0, offsY=0)
	{
		this.focusRect = rect;

		this.focusOffsX = offsX;
		this.focusOffsY = offsY;

		this.update(0);
		return this;
	},

	/*
	**	Sets the focus offsets of the viewport. Used to translate the focus point.
	*/
	setFocusOffsets: function (/*float*/offsX, /*float*/offsY)
	{
		this.focusOffsX = offsX;
		this.focusOffsY = offsY;

		return this;
	},

	/*
	**	Sets the enabled flag of the focus axes.
	*/
	setFocusAxes: function (/*float*/enabledX, /*float*/enabledY)
	{
		this.focusAxisX = enabledX;
		this.focusAxisY = enabledY;

		return this;
	},

	/*
	**	Sets the focus factor of the viewport (value from 0 to 1), that is, the ratio of the smaller focus viewport.
	*/
	setFocusFactor: function (/*float*/valueX, /*float*/valueY)
	{
		this.focusFactorX = valueX;
		this.focusFactorY = valueY === undefined ? valueX : valueY;

		return this;
	},

	/*
	**	Applies the viewport clipping area to the specified display buffer.
	*/
	applyClip: function (g)
	{
		g.clip(this.screenBounds.x1, this.screenBounds.y1, this.screenBounds.width(), this.screenBounds.height());
	},

	/*
	**	Applies the viewport transform to the specified display buffer.
	*/
	applyTransform: function (g)
	{
		let cx = this.screenBounds.x1 + (this.screenBounds.width() >> 1);
		let cy = this.screenBounds.y1 + (this.screenBounds.height() >> 1);

		g.translate (cx, cy);

		if (this.scale != 1.0)
			g.scale (this.scale, this.scale);

		if (this.globalScale != 1.0)
			g.scale (this.globalScale, this.globalScale);

		g.translate (-this.getX(), -this.getY());
		g.updateTransform();
	},

	/*
	**	Converts a point from screen-space to world-space.
	*/
	toWorldSpace: function (x, y, floor=false)
	{
		let cx = this.screenBounds.x1 + (this.screenBounds.width() >> 1);
		let cy = this.screenBounds.y1 + (this.screenBounds.height() >> 1);

		if (floor) {
			x = ((x - int(cx)) / this.scale) + int(this.getX());
			y = ((y - int(cy)) / this.scale) + int(this.getY());
		}
		else {
			x = ((x - cx) / this.scale) + this.getX();
			y = ((y - cy) / this.scale) + this.getY();
		}

		return { x: x, y: y };
	},

	/*
	**	Converts a point from world-space to screen-space.
	*/
	toScreenSpace: function (x, y, floor=false)
	{
		let cx = this.screenBounds.x1 + (this.screenBounds.width() >> 1);
		let cy = this.screenBounds.y1 + (this.screenBounds.height() >> 1);

		if (floor) {
			x = (x - int(this.getX())) * this.scale + int(cx);
			y = (y - int(this.getY())) * this.scale + int(cy);
		}
		else {
			x = (x - this.getX()) * this.scale + cx;
			y = (y - this.getY()) * this.scale + cy;
		}

		return { x: x, y: y };
	},
});


/*
**	Constants.
*/
Viewport.ENABLED = 0x001;

export default Viewport;
