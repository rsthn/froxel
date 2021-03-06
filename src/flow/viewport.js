
import { Class } from 'rinn';
import Bounds2 from '../math/bounds2.js';
import Point2 from '../math/point2.js';

//![import "../math/point2"]
//![import "../math/bounds2"]
//![import "../math/rect"]
//![import "../system/canvas"]

//:/**
//: * 	Viewport class controls the current visible rectangle of a container.
//: */

//!class Viewport

const Viewport = Class.extend
({
	className: 'Viewport',

	/**
	 * 	Dimensions of the viewport.
	 *
	 * 	!readonly width: number;
	 * 	!readonly height: number;
	 */
	width: 0, initialWidth: 0,
	height: 0, initialHeight: 0,

	/**
	 * 	Position of the top-left corner of the viewport in screen space.
	 */
	sx: 0,
	sy: 0,

	/**
	 * 	Position of the center of the viewport in the container.
	 */
	x: 0,
	y: 0,

	/**
	 * 	Ratio for the viewport's center (value from -1 to 1), used when focusing to use a different focus point instead of the exact center.
	 */
	centerRatioX: 0,
	centerRatioY: 0,

	/**
	 * 	Position offset, used to move the viewport around without affecting the focus point.
	 */
	offset: null,

	/**
	 * 	Boundaries of the container, set by `setContainerBounds`.
	 *
	 * 	!readonly container: Bounds2;
	 */
	container: null,

	/**
	 * 	The focus factor determines the ratio of a smaller viewport on which the current focus point must  be contained. If the focus point is not inside the
	 * 	smaller viewport scrolling will be performed.
	 */
	focusFactorX: 0,
	focusFactorY: 0,

	/**
	 * 	Focus target rectangle and its offsets. When the viewport is updated it will automatically focus on this rect.
	 */
	focusRect: null,
	focusOffsX: 0,
	focusOffsY: 0,

	/**
	 * 	Enabled focus axes. Used by the `update` method to figure which axis to update.
	 */
	focusAxisX: true,
	focusAxisY: true,

	/**
	 * 	Flags of the viewport.
	 */
	flags: 0,

	/**
	 * 	Viewport scale.
	 */
	scale: 1,

	/**
	 * 	Global scale, used to scale the entire canvas including the viewport. Useful for debugging viewport bounds.
	 */
	globalScale: 1,

	/**
	 * 	Bounds of the viewport in world space. Used to determine which elements lie inside the viewport.
	 *
	 * 	!readonly bounds: Bounds2;
	 */
	bounds: null,

	/**
	 * 	Extra padding for the viewport bounds. Used to extend the viewport bounds without altering the original viewport size nor the world bounds.
	 */
	padding: null,

	/**
	 * 	Bounds of the focus area of the viewport in world space. When the `focusRect` moves outside this area the viewport will be panned to keep it inside these bounds.
	 * 
	 * 	!readonly focusBounds: Bounds2;
	 */
	focusBounds: null,

	/**
	 * 	Bounds of the viewport in screen space, used as target rendering area.
	 *
	 *	!readonly screenBounds: Bounds2;
	 */
	screenBounds: null,

	/**
	 * 	Temporal Point2 object used as temporary result for `toWorldSpace` and `toScreenSpace`.
	 */
	tmpPoint: null,

	/**
	 * 	Constructs the viewport with the specified size and container dimensions.
	 *
	 * 	@param sx - Screen position X.
	 * 	@param sy - Screen position Y.
	 * 	@param width - Viewport width.
	 * 	@param height - Viewport height.
	 * 	@param containerWidth - Container width.
	 * 	@param containerHeight - Container height.
	 *
	 * 	!constructor (sx: number, sy: number, width: number, height: number, containerWidth: number, containerHeight: number);
	 */
	__ctor: function (sx, sy, width, height, containerWidth, containerHeight)
	{
		this.focusFactorX = 0.4;
		this.focusFactorY = 0.4;
		this.focusRect = null;

		this.sx = sx;
		this.sy = sy;
		this.width = this.initialWidth = width;
		this.height = this.initialHeight = height;

		this.x = 0;
		this.y = 0;

		this.bounds = Bounds2.Pool.alloc();
		this.padding = null;

		this.focusBounds = Bounds2.Pool.alloc();
		this.screenBounds = Bounds2.Pool.alloc();
		this.container = Bounds2.Pool.alloc();
		this.offset = Point2.Pool.alloc();

		this.flags = Viewport.ENABLED;
		this.tmpPoint = Point2.Pool.alloc();

		this.setContainerBounds(-containerWidth>>1, -containerHeight>>1, containerWidth>>1, containerHeight>>1);

		this.updateScreenBounds();
		this.updateBounds();
	},

	/**
	 * 	Destructs the viewport.
	 */
	__dtor: function ()
	{
		this.bounds.free();
		this.focusBounds.free();
		this.screenBounds.free();
		this.container.free();
		this.tmpPoint.free();

		if (this.padding !== null)
			this.padding.free();
	},

	/**
	 * 	Returns the value of the `enabled` flag.
	 *
	 * 	!enabled() : boolean;
	 */
	/**
	 * 	Sets the `enabled` flag.
	 *
	 * 	!enabled (value: boolean) : Viewport;
	 */
	enabled: function (value=null)
	{
		if (value === null)
			return !!(this.flags & Viewport.ENABLED);

		this.flags &= ~Viewport.ENABLED;
		if (value) this.flags |= Viewport.ENABLED;

		return this;
	},

	/**
	 * 	Returns the value of the `topLeft` flag.
	 * 	!topLeft() : boolean;
	 */
	/**
	 * 	Sets the `topLeft` flag.
	 * 	!topLeft (value: boolean) : Viewport;
	 */
	topLeft: function (value=null)
	{
		if (value === null)
			return !!(this.flags & Viewport.TOP_LEFT);

		this.flags &= ~Viewport.TOP_LEFT;
		if (value) this.flags |= Viewport.TOP_LEFT;

		return this;
	},

	/**
	 * 	Sets the container bounds. Used to ensure the viewport bounds are never outside these limits.
	 *
	 * 	!setContainerBounds (x1: number, y1: number, x2: number, y2: number) : Viewport;
	 */
	/**
	 * 	Sets the container bounds. Used to ensure the viewport bounds are never outside these limits.
	 *
	 * 	!setContainerBounds (v: Bounds2|Rect) : Viewport;
	 */
	setContainerBounds: function (x1, y1=null, x2=null, y2=null)
	{
		if (y1 === null)
		{
			y2 = x1.y2;
			x2 = x1.x2;
			y1 = x1.y1;
			x1 = x1.x1;
		}

		this.width = this.initialWidth;
		this.height = this.initialHeight;

		if (this.width > x2-x1) this.width = x2-x1;
		if (this.height > y2-y1) this.height = y2-y1;

		this.container.set(x1, y1, x2, y2);
		return this;
	},

	/**
	 * 	Sets the viewport padding.
	 *
	 * 	!setPadding (value: number) : Viewport;
	 */
	/**
	 * 	Sets the padding of each side of the viewport (left, top, right and bottom).
	 *
	 * 	!setPadding (x1: number, y1: number, x2: number, y2: number) : Viewport;
	 */
	setPadding: function (x1, y1=null, x2=null, y2=null)
	{
		if (this.padding === null)
			this.padding = Bounds2.Pool.alloc();

		if (y1 === null)
		{
			x2 = y2 = x1;
			x1 = y1 = -x1;
		}

		this.padding.set(x1, y1, x2, y2);
		return this;
	},

	/**
	 * 	Updates the bound rect of the viewport.
	 */
	updateBounds: function (truncateToContainer=false)
	{
		let w, h, ws, hs;
		let x1, y1, x2, y2;

		w = this.width >> 1;
		h = this.height >> 1;

		ws = (w/this.scale);
		hs = (h/this.scale);

		x1 = this.x-ws+this.offset.x;
		y1 = this.y-hs+this.offset.y;
		x2 = this.x+ws+this.offset.x;
		y2 = this.y+hs+this.offset.y;

		if (truncateToContainer)
		{
			if (x1 < this.container.x1)
				this.offset.setX(this.container.x1 - this.x + ws);
			else if (x2 > this.container.x2)
				this.offset.setX(this.container.x2 - this.x - ws);

			if (y1 < this.container.y1)
				this.offset.setY(this.container.y1 - this.y + hs);
			else if (y2 > this.container.y2)
				this.offset.setY(this.container.y2 - this.y - hs);

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

	/**
	 * 	Updates the screen bound rect of the viewport.
	 */
	updateScreenBounds: function ()
	{
		this.screenBounds.set (this.sx, this.sy, this.sx + this.width, this.sy + this.height);
	},

	/**
	 * 	Resizes the viewport to the specified size.
	 *
	 * 	!resize (width: number|null, height: number|null) : Viewport;
	 */
	resize: function (width, height)
	{
		this.width = this.initialWidth = width ?? this.width;
		this.height = this.initialHeight = height ?? this.height;

		this.updateScreenBounds();
		this.updateBounds();

		return this;
	},

	/**
	 * 	Resizes the viewport by the specified deltas.
	 *
	 * 	!resizeBy (dWidth: number, dHeight: number) : Viewport;
	 */
	resizeBy: function (dWidth, dHeight)
	{
		this.width += dWidth;
		this.height += dHeight;

		this.initialWidth = this.width;
		this.initialHeight = this.height;

		this.updateScreenBounds();
		this.updateBounds();

		return this;
	},

	/**
	 * Sets the position of the viewport's center within the world and resets the relative offset to zero.
	 * Setting any parameter to `null` will cause it not to be changed.
	 * 
	 * !setPosition (x: number|null, y: number|null) : Viewport;
	 */
	setPosition: function (x, y)
	{
		this.x = x ?? this.x;
		this.y = y ?? this.y;

		this.offset.set(0, 0);
		this.updateBounds();

		return this;
	},

	/**
	 * 	Sets the position of the viewport relative to the current focus point.
	 * 
	 * 	!setOffsets (dx: number, dy: number) : Viewport;
	 */
	setOffsets: function (dx, dy)
	{
		this.offset.set(dx, dy);
		this.updateBounds();

		return this;
	},

	/**
	 * 	Sets the scale of the viewport.
	 * 
	 * 	!setScale (value: number) : Viewport;
	 */
	setScale: function (value)
	{
		this.scale = value;
		this.updateBounds();
		return this;
	},

	/**
	 * 	Returns the scale of the viewport.
	 * 
	 * 	!getScale () : number;
	 */
	getScale: function ()
	{
		return this.scale;
	},

	/**
	 * 	Sets the global scale of the viewport.
	 * 
	 * 	!setGlobalScale (value: number) : Viewport;
	 */
	setGlobalScale: function (value)
	{
		this.globalScale = value;
		return this;
	},

	/**
	 * 	Returns the global scale of the viewport.
	 * 
	 * 	!getGlobalScale () : number;
	 */
	getGlobalScale: function ()
	{
		return this.globalScale;
	},

	/**
	 * 	Sets the center ratio of the viewport (values from -1 to 1, default is 0). Used to focus on a different point instead of the exact center.
	 * 
	 * 	!setCenter (rx: number, ry: number) : Viewport;
	 */
	setCenter: function (rx, ry)
	{
		this.centerRatioX = rx;
		this.centerRatioY = ry;

		return this;
	},

	/**
	 * 	Moves the viewport within the world. Values are relative to the current focus point.
	 *	@param truncateToContainer - When `true` the final viewport bounds will be ensured to not lie outside the container bounds.
	 *
	 * 	!translate (dx: number, dy: number, truncateToContainer?: boolean) : Viewport;
	 */
	translate: function (dx, dy, truncateToContainer=false)
	{
		this.offset.add(dx, dy);

		this.updateBounds(truncateToContainer);
		return this;
	},

	/**
	 * 	Sets the screen position of the viewport.
	 * 
	 * 	!setScreenPosition (sx: number, sy: number) : number;
	 */
	setScreenPosition: function (sx, sy)
	{
		this.sx = sx;
		this.sy = sy;

		this.updateScreenBounds();
		return this;
	},

	/**
	 * 	Returns the X coordinate of the viewport's focus point inside the world.
	 * 	@param absolute - When `true`, the focus point X (without offset) will be returned.
	 * 	
	 * 	!getX (absolute?: boolean) : number;
	 */
	getX: function (absolute=false)
	{
		return this.x + (absolute ? 0 : this.offset.x);
	},

	/**
	 * 	Returns the Y coordinate of the viewport's focus point inside the world.
	 * 	@param absolute - When `true`, the focus point Y (without offset) will be returned.
	 * 	
	 * 	!getY (absolute?: boolean) : number;
	 */
	getY: function (absolute=false)
	{
		return this.y + (absolute ? 0 : this.offset.y);
	},

	/**
	 * 	Returns the X position of the viewport inside the world relative to the current focus point.
	 * 
	 * 	!getOffsetX() : void;
	 */
	getOffsetX: function ()
	{
		return this.offset.x;
	},

	/**
	 * 	Returns the Y position of the viewport inside the world relative to the current focus point.
	 * 
	 * 	!getOffsetY() : void;
	 */
	getOffsetY: function ()
	{
		return this.offset.y;
	},

	/**
	 * 	Returns the width of the viewport.
	 * 
	 * 	!getWidth() : number;
	 */
	getWidth: function ()
	{
		return this.width;
	},

	/**
	 * 	Returns the height of the viewport.
	 * 
	 * 	!getHeight() : number;
	 */
	getHeight: function ()
	{
		return this.height;
	},

	/**
	 * 	Moves the viewport X coordinate to focus on the specified line or coordinate. Method `updateBounds` should be called afterwards.
	 * 
	 * 	!focusX (x0: number, x1?: number, factor?: number) : Viewport;
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

		if (x1 < this.container.x1) nx = this.container.x1 + w;
		if (x2 > this.container.x2) nx = this.container.x2 - w;

		this.x = nx;
		return this;
	},

	/**
	 * 	Moves the viewport Y coordinate to focus on the specified line or coordinate. Method `updateBounds` should be called afterwards.
	 * 
	 * 	!focusY (y0: number, y1?: number, factor?: number) : Viewport;
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

		if (y1 < this.container.y1) ny = this.container.y1 + h;
		if (y2 > this.container.y2) ny = this.container.y2 - h;

		this.y = ny;
		return this;
	},

	/**
	 * 	Updates the viewport to focus on the focusRect. Takes into account enabled axes.
	 *
	 * 	!update (dt?: number) : void;
	 */
	update: function (dt=0)
	{
		if (this.focusRect === null)
			return;

		if (this.focusAxisX)
			this.focusX (this.focusRect.x1 + this.focusOffsX, this.focusRect.x2 + this.focusOffsX);

		if (this.focusAxisY)
			this.focusY (this.focusRect.y1 + this.focusOffsY, this.focusRect.y2 + this.focusOffsY);

		this.updateBounds();
	},

	/**
	 * 	Updates the viewport to focus on the focusRect ignoring the enabled axes.
	 *
	 * 	!updateForced (dt?: number) : void;
	 */
	updateForced: function (dt=0)
	{
		if (this.focusRect === null)
			return;

		this.focusX (this.focusRect.x1 + this.focusOffsX, this.focusRect.x2 + this.focusOffsX);
		this.focusY (this.focusRect.y1 + this.focusOffsY, this.focusRect.y2 + this.focusOffsY);

		this.updateBounds();
	},

	/**
	 * 	Tracks a specified rectangle by maintaining focus on it (a call to `update` must be made on every frame update).
	 * 
	 * 	!setFocusRect (rect: Rect|Bounds2, offsX?: number, offsY? :number) : Viewport;
	 */
	setFocusRect: function (rect, offsX=0, offsY=0)
	{
		this.focusRect = rect;

		this.focusOffsX = offsX;
		this.focusOffsY = offsY;

		this.update(0);
		return this;
	},

	/**
	 * 	Sets the focus offsets of the viewport. Used to translate the viewport without altering the focus point.
	 *
	 * 	!setFocusOffsets (offsX: number, offsY: number) : Viewport;
	 */
	setFocusOffsets: function (offsX, offsY)
	{
		this.focusOffsX = offsX;
		this.focusOffsY = offsY;

		return this;
	},

	/**
	 * 	Sets the enabled flag of the focus axes. Only enabled axes will be updated when calling `update`.
	 * 
	 * 	!setFocusAxes (enabledX: boolean, enabledY: boolean) : Viewport;
	 */
	setFocusAxes: function (enabledX, enabledY)
	{
		this.focusAxisX = enabledX;
		this.focusAxisY = enabledY;

		return this;
	},

	/**
	 * 	Sets the focus factor of the viewport (value from 0 to 1), that is, the ratio of the smaller focus viewport.
	 * 
	 * 	!setFocusFactor (valueX: number, valueY: number) : Viewport;
	 */
	setFocusFactor: function (valueX, valueY)
	{
		this.focusFactorX = valueX;
		this.focusFactorY = valueY === undefined ? valueX : valueY;

		return this;
	},

	/**
	 * 	Applies the viewport clipping area to the specified canvas.
	 * 
	 * 	!applyClip (g: Canvas) : void;
	 */
	applyClip: function (g)
	{
		g.clip(this.screenBounds.x1, this.screenBounds.y1, this.screenBounds.width(), this.screenBounds.height());
	},

	/**
	 * 	Applies the viewport transform to the specified canvas.
	 * 
	 * 	!applyTransform (g: Canvas) : void;
	 */
	applyTransform: function (g)
	{
		if (!(this.flags & Viewport.TOP_LEFT))
			g.translate (this.screenBounds.cx, this.screenBounds.cy);
		else
			g.translate (this.screenBounds.x1, this.screenBounds.y1);

		if (this.scale != 1.0)
			g.scale (this.scale, this.scale);

		if (this.globalScale != 1.0)
			g.scale (this.globalScale, this.globalScale);

		if (!(this.flags & Viewport.TOP_LEFT))
			g.translate (-this.bounds.cx, -this.bounds.cy);
		else
			g.translate (-this.bounds.x1, -this.bounds.y1);

		g.updateTransform();
	},

	/**
	 * 	Converts a point from screen-space to world-space.
	 * 	@returns Temporal Point2 object.
	 *
	 * 	!toWorldSpace (input: Point2|Vec2|{x:number,y:number}, floor?: boolean) : Point2;
	 */
	/**
	 * 	Converts a point from screen-space to world-space.
	 * 	@returns Temporal Point2 object.
	 *
	 * 	!toWorldSpace (x: number, y: number, floor?: boolean) : Point2;
	 */
	toWorldSpace: function (x, y=null, floor=false)
	{
		if (y === null || y === true)
		{
			floor = y === true;
			y = x.y;
			x = x.x;
		}

		let refX, refY;

		if (!(this.flags & Viewport.TOP_LEFT))
		{
			refX = this.screenBounds.cx;
			refY = this.screenBounds.cy;

			if (floor) {
				x = ((x - int(refX)) / this.scale) + int(this.bounds.cx);
				y = ((y - int(refY)) / this.scale) + int(this.bounds.cy);
			}
			else {
				x = ((x - refX) / this.scale) + this.bounds.cx;
				y = ((y - refY) / this.scale) + this.bounds.cy;
			}
		}
		else
		{
			refX = this.screenBounds.x1;
			refY = this.screenBounds.y1;

			if (floor) {
				x = ((x - int(refX)) / this.scale) + int(this.bounds.x1);
				y = ((y - int(refY)) / this.scale) + int(this.bounds.y1);
			}
			else {
				x = ((x - refX) / this.scale) + this.bounds.x1;
				y = ((y - refY) / this.scale) + this.bounds.y1;
			}
		}

		return this.tmpPoint.set(x, y);
	},

	/**
	 * 	Converts a point from world-space to screen-space.
	 * 	@returns Temporal Point2 object.
	 *
	 * 	!toScreenSpace (input: Point2|Vec2|{x:number,y:number}, floor?: boolean) : Point2;
	 */
	/**
	 * 	Converts a point from world-space to screen-space.
	 * 	@returns Temporal Point2 object.
	 *
	 * 	!toScreenSpace (x: number, y: number, floor?: boolean) : Point2;
	 */
	toScreenSpace: function (x, y=null, floor=false)
	{
		if (y === null || y === true)
		{
			floor = y === true;
			y = x.y;
			x = x.x;
		}

		let refX, refY;

		if (!(this.flags & Viewport.TOP_LEFT))
		{
			refX = this.screenBounds.cx;
			refY = this.screenBounds.cy;

			if (floor) {
				x = (x - int(this.bounds.cx)) * this.scale + int(refX);
				y = (y - int(this.bounds.cy)) * this.scale + int(refY);
			}
			else {
				x = (x - this.bounds.cx) * this.scale + refX;
				y = (y - this.bounds.cy) * this.scale + refY;
			}
		}
		else
		{
			refX = this.screenBounds.x1;
			refY = this.screenBounds.y1;

			if (floor) {
				x = (x - int(this.bounds.x1)) * this.scale + int(refX);
				y = (y - int(this.bounds.y1)) * this.scale + int(refY);
			}
			else {
				x = (x - this.bounds.x1) * this.scale + refX;
				y = (y - this.bounds.y1) * this.scale + refY;
			}
		}

		return this.tmpPoint.set(x, y);
	}
});

/*
**	Constants.
*/
Viewport.ENABLED = 0x001;
Viewport.TOP_LEFT = 0x002;

export default Viewport;
