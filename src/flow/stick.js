
import Group from './group.js';
import Mask from './mask.js';
import ScreenControls from './screen-controls.js';
import KeyCode from '../system/keycode.js';

//![import "./group"]
//![import "./mask"]
//![import "./screen-controls"]
//![import "../system/keycode"]

/**
 * Stick class provides an easy way to add directional control sticks to the world.
 */

//!class Stick extends Group

export default Group.extend
({
	/**
	 * Indicates if once focus is obtained it is locked until the user releases it.
	 * @default true
	 * !focusLock: boolean;
	 */
	focusLock: true,

	/**
	 * Indicates if keyboard events are enabled on this object. Use `bindKeys` to enable.
	 */
	keyboardEvents: false,

	/**
	 * Current pressed status of the stick.
	 * !readonly isPressed: boolean;
	 */
	isPressed: false,

	/**
	 * Previous pressed status of the stick.
	 * !readonly wasPressed: boolean;
	 */
	wasPressed: false,

	/**
	 * Image to draw when the stick is unpressed (outer circle).
	 * !readonly unpressedImg: Drawable;
	 */
	unpressedImg: null,

	/**
	 * Image to draw when the stick is pressed (outer circle).
	 * !readonly pressedImg: Drawable;
	 */
	pressedImg: null,

	/**
	 * Image to draw when the stick is unpressed (inner circle).
	 * !readonly unpressedImgInner: Drawable;
	 */
	unpressedImgInner: null,

	/**
	 * Image to draw when the stick is pressed (inner circle).
	 * !readonly pressedImgInner: Drawable;
	 */
	pressedImgInner: null,

	/**
	 * Number of steps for the angle. Used to snap the stick movement to discrete steps.
	 * !readonly angleSteps: number;
	 */
	angleSteps: 0,

	/**
	 * Number of steps for the radius of the stick. Used to snap the stick movement to discrete steps.
	 * !readonly radiusSteps: number;
	 */
	radiusSteps: 0,

	/**
	 * Current center offset X.
	 * !readonly offsX: number;
	 */
	offsX: 0,

	/**
	 * Current center offset Y.
	 * !readonly offsY: number;
	 */
	offsY: 0,

	/**
	 * Raw direction in the X-axis.
	 * !readonly rdirx: number;
	 */
	rdirx: 0,

	/**
	 * Raw direction in the Y-axis.
	 * !readonly rdiry: number;
	 */
	rdiry: 0,

	/*
	 * Normalized direction in the X-axis.
	 * !readonly dirx: number;
	 */
	dirx: 0,

	/**
	 * Normalized direction in the Y-axis.
	 * !readonly diry: number;
	 */
	diry: 0,

	/**
	 * Magnitude of the direction vector.
	 * !readonly magnitude: number;
	 */
	magnitude: 0,

	/**
	 * Angle of the direction vector.
	 * !readonly angle: number;
	 */
	angle: 0,

	/*
	** Frozen stick state. Set by calling `freezeState`.
	*/
	frdirx: 0, frdiry: 0, fdirx: 0, fdiry: 0, fmagnitude: 0, fangle: 0,

	/**
	 * Displacement of the inner stick. Calculated when the `update` method is called.
	 */
	dispx: 0, dispy: 0,

	/**
	 * Current radius of the inner stick (how far it moved). And maximum radius that the inner stick can move.
	 */
	radius: 0, maxRadius: 0,

	/**
	 * Dead zone values for each axis. Set using `setDeadZone`.
	 */
	deadZoneX: 0, deadZoneY: 0,

	/**
	 * Hitbox element.
	 */
	hitbox: null,

	/**
	 * Handler for the stick change event. Set using the `onChange` method.
	 */
	_onChange: null,

	/**
	 * Key codes to control the stick direction with the keyboard. Set using the `bindKeys` method.
	 */
	UP: null,
	DOWN: null,
	LEFT: null,
	RIGHT: null,
 
	/**
	 * Maximum limits for the stick dragging.
	 */
	limitX1: null, limitY1: null,
	limitX2: null, limitY2: null,

	/**
	 * Creates the stick with the specified parameters. Automatically adds it to the screen controls.
	 * !constructor (container: Container, x: number, y: number, maxRadius: number, unpressedImg: Drawable, unpressedImgInner: Drawable, pressedImg?: Drawable, pressedImgInner?: Drawable);
	 */
	__ctor: function (container, x, y, maxRadius, unpressedImg, unpressedImgInner, pressedImg=null, pressedImgInner=null)
	{
		this._super.Group.__ctor();

		this.unpressedImg = unpressedImg;
		this.pressedImg = pressedImg || unpressedImg;

		this.unpressedImgInner = unpressedImgInner;
		this.pressedImgInner = pressedImgInner || unpressedImgInner;

		this.maxRadius = maxRadius;

		this.deadZoneX = 0.0;
		this.deadZoneY = 0.0;

		this.offsX = 0;
		this.offsY = 0;

		this.limitX1 = false;
		this.limitY1 = false;
		this.limitX2 = false;
		this.limitY2 = false;

		this.hitbox = Mask.Pool.alloc (0, x, y, (this.unpressedImg ?? this.unpressedImgInner).width, (this.unpressedImg ?? this.unpressedImgInner).height).visible(false).visibleLock(true).debug(2);
		this.addChild(this.hitbox);

		container.add(this.hitbox);
		container.add(this);

		this._onChange = null;

		this.renderWith(this.renderStick);
		ScreenControls.add(this);
	},

	/**
	 * Removes the button from the screen controls and destroys it.
	 */
	__dtor: function ()
	{
		this._super.Group.__dtor();
		ScreenControls.remove(this);
	},

	/**
	 * Binds the stick to the specified keycodes and enables keyboard events.
	 * !bindKeys (up?: number, down?: number, left?: number, right?: number) : Stick;
	 */
	bindKeys: function (up=KeyCode.UP, down=KeyCode.DOWN, left=KeyCode.LEFT, right=KeyCode.RIGHT)
	{
		this.UP = up;
		this.DOWN = down;
		this.LEFT = left;
		this.RIGHT = right;

		this.keyboardEvents = true;
		return this;
	},

	/**
	 * Returns the state of the keyboard events enable flag.
	 * !keysEnabled () : Stick;
	 */
	/**
	 * Enables or disables keyboard interaction with the stick.
	 * !keysEnabled (value: boolean) : Stick;
	 */
	keysEnabled: function (value=null)
	{
		if (value === null)
			return this.keyboardEvents;

		this.keyboardEvents = value;
		return this;
	},

	/**
	 * Sets the maximum dragging limits for the stick. Values of `false` will disable dragging in the respective axis. And `null` will cause the axis to be unlimited.
	 * !setLimits (x1: number|boolean|null, y1: number|boolean|null, x2: number|null, y2: number|null) : Stick;
	 */
	setLimits: function (x1, y1, x2, y2)
	{
		this.limitX1 = x1;
		this.limitY1 = y1;
		this.limitX2 = x2;
		this.limitY2 = y2;
		return this;
	},

	/**
	 * Changes the pressed/unpressed images of the outer stick.
	 * !setImage (unpressedImg: Drawable, pressedImg?: Drawable) : Stick;
	 */
	setImage: function (unpressedImg, pressedImg=null)
	{
		this.unpressedImg = unpressedImg;
		this.pressedImg = pressedImg || unpressedImg;
		return this;
	},

	/**
	 * Changes the pressed/unpressed images of the inner stick.
	 * !setImageInner (unpressedImg: Drawable, pressedImg?: Drawable) : Stick;
	 */
	setImageInner: function (unpressedImg, pressedImg=null)
	{
		this.unpressedImgInner = unpressedImg;
		this.pressedImgInner = pressedImg || unpressedImg;
		return this;
	},

	/**
	 * Sets the number of angle-steps for the stick.
	 * !setAngleSteps (n: number) : Stick;
	 */
	setAngleSteps: function (n)
	{
		this.angleSteps = n;
		return this;
	},

	/**
	 * Sets the number of radius-steps for the stick.
	 * !setRadiusSteps (n: number) : Stick;
	 */
	setRadiusSteps: function (n)
	{
		this.radiusSteps = n;
		return this;
	},

	/**
	 * Sets the dead zone values (normalized).
	 * !setDeadZone (deadZoneX: number, deadZoneY: number) : Stick;
	 */
	/**
	 * Sets the dead zone values (normalized).
	 * !setDeadZone (deadZone: number) : Stick;
	 */
	setDeadZone: function (deadZoneX, deadZoneY=null)
	{
		this.deadZoneX = deadZoneX;
		this.deadZoneY = deadZoneY ?? deadZoneX;

		return this;
	},

	/**
	 * Resets the button to its initial state.
	 * !reset() : Stick;
	 */
	reset: function ()
	{
		this.dispx = 0;
		this.dispy = 0;

		this.rdirx = 0;
		this.rdiry = 0;

		this.dirx = 0;
		this.diry = 0;
		this.magnitude = 0;

		if (this._onChange)
			this._onChange (this.dirx, this.diry, this.magnitude, this.angle, this);

		return this;
	},

	/**
	 * Renders the stick in the canvas.
	 */
	renderStick: function (g, elem, img)
	{
		if (elem.isPressed)
		{
			if (elem.pressedImg)
				elem.pressedImg.draw (g, elem.bounds.x1 + elem.offsX, elem.bounds.y1 + elem.offsY);

			if (elem.pressedImgInner)
				elem.pressedImgInner.draw (g, elem.bounds.x1 + elem.offsX + elem.dispx, elem.bounds.y1 + elem.offsY + elem.dispy);
		}
		else
		{
			if (elem.unpressedImg)
				elem.unpressedImg.draw (g, elem.bounds.x1 + elem.offsX, elem.bounds.y1 + elem.offsY);

			if (elem.unpressedImgInner)
				elem.unpressedImgInner.draw (g, elem.bounds.x1 + elem.offsX, elem.bounds.y1 + elem.offsY);
		}
	},

	/**
	 * Button pointer update event. Not required for the button control.
	 */
	pointerUpdate: function (pointerX, pointerY)
	{
		let dx, dy;

		dx = pointerX - (this.bounds.cx + this.offsX);
		dy = pointerY - (this.bounds.cy + this.offsY);

		this.angle = Math.atan2(-dy, dx);
		this.radius = Math.sqrt(dx*dx + dy*dy);

		if (this.radius > this.maxRadius)
		{
			if (this.limitX1 !== false) {
				this.offsX += Math.cos(this.angle)*(this.radius - this.maxRadius);
				if (this.limitX1 !== null && (this.bounds.cx+this.offsX) < this.limitX1) this.offsX = this.limitX1 - this.bounds.cx;
				if (this.limitX2 !== null && (this.bounds.cx+this.offsX) > this.limitX2) this.offsX = this.limitX2 - this.bounds.cx;
			}

			if (this.limitY1 !== false) {
				this.offsY += -Math.sin(this.angle)*(this.radius - this.maxRadius);
				if (this.limitY1 !== null && (this.bounds.cy+this.offsY) < this.limitY1) this.offsY = this.limitY1 - this.bounds.cy;
				if (this.limitY2 !== null && (this.bounds.cy+this.offsY) > this.limitY2) this.offsY = this.limitY2 - this.bounds.cy;
			}

			this.radius = this.maxRadius;
		}

		if (this.angleSteps)
		{
			let fs = (2*Math.PI / this.angleSteps);
			this.angle = int((this.angle + Math.PI + fs/2) / fs) * fs - Math.PI;
		}

		if (this.radiusSteps)
		{
			let fs = (this.maxRadius / this.radiusSteps);
			this.radius = int((this.radius + fs/2) / fs) * fs;
		}

		this.rdirx = Math.min(1, Math.max(dx / this.maxRadius, -1));
		this.rdiry = Math.min(1, Math.max(dy / this.maxRadius, -1));

		this.dispx = this.radius * Math.cos(this.angle);
		this.dispy = this.radius * -Math.sin(this.angle);

		if (this.radius > 0)
		{
			this.dirx = this.dispx / this.radius;
			this.diry = this.dispy / this.radius;

			this.magnitude = this.radius / this.maxRadius;
		}
		else
		{
			this.dirx = 0;
			this.diry = 0;

			this.magnitude = 0;
		}

		if (Math.abs(this.rdirx) < this.deadZoneX) {
			this.rdirx = 0;
			this.dirx = 0;
		}

		if (Math.abs(this.rdiry) < this.deadZoneY) {
			this.rdiry = 0;
			this.diry = 0;
		}

		if (this._onChange)
			this._onChange (this.dirx, this.diry, this.magnitude, this.angle, this);
	},

	/**
	 * Called when the PointerEventType.POINTER_DOWN event starts within the bounding box of the stick.
	 */
	pointerActivate: function (pointer)
	{
		this.wasPressed = this.isPressed;
		this.isPressed = 1;

		this.offsX = 0;
		this.offsY = 0;

		this.pointerUpdate(pointer.x, pointer.y);
	},

	/**
	 * Called when the PointerEventType.POINTER_UP event is fired with the "_ref" attribute pointing to this object.
	 */
	pointerDeactivate: function (pointer)
	{
		this.wasPressed = this.isPressed;
		this.isPressed = 0;

		this.offsX = 0;
		this.offsY = 0;

		this.reset();
	},

	/**
	 * Returns `true` if the stick contains the specified point.
	 * !containsPoint (x: number, y: number) : boolean;
	 */
	containsPoint: function(x, y)
	{
		if (!this.visible() || this.alpha() <= 0)
			return false;

		return this.hitbox.bounds.containsPoint(x, y);
	},

	/**
	 * Sets the direction of the stick, the provided deltas should be normalized in the \[-1, 1\] range.
	 * !setDirection (dx: number, dy: number, deadZoneX?: number, deadZoneY?: number) : boolean;
	 */
	setDirection: function (dx, dy, deadZoneX=0.10, deadZoneY=0.10)
	{
		if (Math.abs(dx) < deadZoneX) dx = 0;
		if (Math.abs(dy) < deadZoneY) dy = 0;

		this.wasPressed = this.isPressed;
		this.isPressed = dx == 0 && dy == 0 ? 0 : 1;

		this.pointerUpdate (this.bounds.cx + dx*this.maxRadius, this.bounds.cy + dy*this.maxRadius);
		return false;
	},

	/**
	 * Saves the current state of the stick in the froxen state variables (fdirx, fdiry, etc). When the `lastValid` parameter is `true`, the values
	 * will be saved only if the current value of each field is not zero.
	 *
	 * !freezeState (lastValid?: boolean) : Stick;
	 */
	freezeState: function (lastValid=false)
	{
		this.frdirx = lastValid ? (this.rdirx != 0 ? this.rdirx : this.frdirx) : this.rdirx;
		this.frdiry = lastValid ? (this.rdiry != 0 ? this.rdiry : this.frdiry) : this.rdiry;
		this.fdirx = lastValid ? (this.dirx != 0 ? this.dirx : this.fdirx) : this.dirx;
		this.fdiry = lastValid ? (this.diry != 0 ? this.diry : this.fdiry) : this.diry;
		this.fmagnitude = lastValid ? (this.magnitude != 0 ? this.magnitude : this.fmagnitude) : this.magnitude;
		this.fangle = lastValid ? (this.angle != 0 ? this.angle : this.fangle) : this.angle;

		return this;
	},

	/**
	 * Key down event, handles the keys that control the direction of the stick.
	 */
	keyDown: function (keyCode, keyArgs)
	{
		let dx = 0;
		let dy = 0;

		this.offsX = 0;
		this.offsY = 0;

		if (keyArgs[this.UP] === true) dy = -this.maxRadius;
		if (keyArgs[this.LEFT] === true) dx = -this.maxRadius;
		if (keyArgs[this.DOWN] === true) dy = this.maxRadius;
		if (keyArgs[this.RIGHT] === true) dx = this.maxRadius;

		if (keyCode === this.UP || keyCode === this.LEFT || keyCode === this.DOWN || keyCode === this.RIGHT)
		{
			this.wasPressed = this.isPressed;
			this.isPressed = 1;

			if (dx != 0 && dy != 0)
			{
				dx *= 0.7071;
				dy *= 0.7071;
			}

			this.pointerUpdate (this.bounds.cx + dx, this.bounds.cy + dy);
			return false;
		}
	},

	/**
	 * Key up event, handles the keys that control the direction of the stick.
	 */
	keyUp: function (keyCode, keyArgs)
	{
		let dx = 0;
		let dy = 0;

		this.offsX = 0;
		this.offsY = 0;

		if (keyArgs[this.UP] === true) dy = -this.maxRadius;
		if (keyArgs[this.LEFT] === true) dx = -this.maxRadius;
		if (keyArgs[this.DOWN] === true) dy = this.maxRadius;
		if (keyArgs[this.RIGHT] === true) dx = this.maxRadius;

		if (keyCode === this.UP || keyCode === this.LEFT || keyCode === this.DOWN || keyCode === this.RIGHT)
		{
			if (dx != 0 && dy != 0)
			{
				dx *= 0.7071;
				dy *= 0.7071;
			}

			this.pointerUpdate (this.bounds.cx + dx, this.bounds.cy + dy);

			if (dx === 0 && dy === 0)
			{
				this.wasPressed = this.isPressed;
				this.isPressed = 0;
			}

			return false;
		}
	},

	/**
	 * Sets the handler for the on-change event. Executed after any change in the direction of the stick.
	 * !onChange (callback: (dirx: number, diry: number, magnitude: number, angle: number, stick: Stick) => void) : Stick;
	 */
	onChange: function (callback)
	{
		this._onChange = callback;
		return this;
	}
});
