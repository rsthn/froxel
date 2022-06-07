/*
**	flow/stick
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

import Group from './group.js';
import Mask from './mask.js';
import ScreenControls from './screen-controls.js';
import KeyCode from '../system/keycode.js';

//![import "./group"]
//![import "./mask"]
//![import "./screen-controls"]
//![import "../system/keycode"]

/**
 * 	Stick class provides an easy way to add directional control sticks to the world.
 */

//!class Stick extends Group

export default Group.extend
({
	/**
	 * 	Indicates if once focus is obtained it is locked until the user releases it.
	 * 	@default true
	 *	!focusLock: boolean;
	 */
	focusLock: true,

	/**
	 * 	Indicates if keyboard events are enabled on this object.
	 * 	@default true
	 *	!keyboardEvents: boolean;
	 */
	keyboardEvents: true,

	/**
	 * 	Current pressed status of the stick.
	 *	!isPressed: boolean;
	 */
	isPressed: false,

	/**
	 * 	Previous pressed status of the stick.
	 *	!wasPressed: boolean;
	 */
	wasPressed: false,

		/**
		 * 	Image to draw when the stick is unpressed (outer circle).
		 *	!unpressedImg: Drawable;
		 */
		unpressedImg: null,

		/**
		 * 	Image to draw when the stick is pressed (outer circle).
		 *	!pressedImg: Drawable;
		 */
		pressedImg: null,

	/**
	 * 	Image to draw when the stick is unpressed (inner circle).
	 *	!unpressedImgInner: Drawable;
	 */
	unpressedImgInner: null,

	/**
	 * 	Image to draw when the stick is pressed (inner circle).
	 *	!pressedImgInner: Drawable;
	 */
	pressedImgInner: null,

		/**
		 * 	Number of steps for the angle. Used to snap the stick movement to discrete steps.
		 * 	!angleSteps: number;
		 */
		angleSteps: 0,

		/**
		 * 	Number of steps for the radius of the stick. Used to snap the stick movement to discrete steps.
		 * 	!radiusSteps: number;
		 */
		radiusSteps: 0,

	/**
	 * Center reference coordinates. Set when the pointer is activated.
	 */
	refX: null,
	refY: null,

	/*
	**	Direction (X and Y), magnitude and angle of the stick vector. The dirx and diry are normalized.
	*/
	rdirx: 0,
	rdiry: 0,

	dirx: 0,
	diry: 0,

	magnitude: 0,
	angle: 0,

	/*
	**	Frozen stick state. Set by calling `freezeState`.
	*/
	frdirx: 0, frdiry: 0, fdirx: 0, fdiry: 0, fmagnitude: 0, fangle: 0,

	/*
	**	Indicates the displacement in X and Y directions of the inner stick. This is calculated when the update() method is called.
	*/
	dispx: 0, dispy: 0,

	/*
	**	Current radius of the inner stick (how far it moved). And maximum radius that the inner stick can move.
	*/
	radius: 0, maxRadius: 0,

	/*
	**	Dead zone values for each axis.
	*/
	deadZoneX: 0, deadZoneY: 0,

	/*
	**	Hitbox element.
	*/
	hitbox: 0,

	/**
	 * 	Handlers for the stick events.
	 */
	_onChange: null,
 
	/**
	 * 	Creates the stick with the specified parameters. Automatically adds it to the screen controls.
	 * 	!constructor (container: Container, x: number, y: number, maxRadius: number, unpressedImg: Drawable, unpressedImgInner: Drawable, pressedImg?: Drawable, pressedImgInner?: Drawable);
	 */
	__ctor: function (container, x, y, maxRadius, unpressedImg, unpressedImgInner, pressedImg=null, pressedImgInner=null)
	{
		this._super.Group.__ctor();

		this.unpressedImg = unpressedImg;
		this.pressedImg = pressedImg || unpressedImg;

		this.unpressedImgInner = unpressedImgInner;
		this.pressedImgInner = pressedImgInner || unpressedImgInner;

		this.maxRadius = maxRadius;

		this.deadZoneX = 0;
		this.deadZoneY = 0;

		this.hitbox = Mask.Pool.alloc (0, x, y, (this.unpressedImg ?? this.unpressedImgInner).width, (this.unpressedImg ?? this.unpressedImgInner).height).visible(false).visibleLock(true).debug(2);
		this.addChild(this.hitbox);

		container.add(this.hitbox);
		container.add(this);

		this._onChange = null;

		this.renderWith(this.renderStick);
		ScreenControls.add(this);
	},

	/**
	 * 	Removes the button from the screen controls and destroys it.
	 */
	__dtor: function ()
	{
		this._super.Group.__dtor();
		ScreenControls.remove(this);
	},

	/**
	 * 	Changes the pressed/unpressed images of the outer stick.
	 * 	!setImage (unpressedImg: Drawable, pressedImg?: Drawable) : Stick;
	 */
	setImage: function (unpressedImg, pressedImg=null)
	{
		this.unpressedImg = unpressedImg;
		this.pressedImg = pressedImg || unpressedImg;
		return this;
	},

	/**
	 * 	Changes the pressed/unpressed images of the inner stick.
	 * 	!setImageInner (unpressedImg: Drawable, pressedImg?: Drawable) : Stick;
	 */
	setImageInner: function (unpressedImg, pressedImg=null)
	{
		this.unpressedImgInner = unpressedImg;
		this.pressedImgInner = pressedImg || unpressedImg;
		return this;
	},

	/**
	 * 	Sets the number of angle-steps for the stick.
	 * 	!setAngleSteps (n: number) : Stick;
	 */
	setAngleSteps: function (n)
	{
		this.angleSteps = n;
		return this;
	},

	/**
	 * 	Sets the number of radius-steps for the stick.
	 * 	!setRadiusSteps (n: number) : Stick;
	 */
	setRadiusSteps: function (n)
	{
		this.radiusSteps = n;
		return this;
	},

	/**
	 * 	Sets the dead zone values (normalized).
	 * 	!setDeadZone (deadZoneX: number, deadZoneY: number) : Stick;
	 */
	setDeadZone: function (deadZoneX, deadZoneY)
	{
		this.deadZoneX = deadZoneX;
		this.deadZoneY = deadZoneY;

		return this;
	},

	/**
	 * 	Resets the button to its initial state.
	 * 	!reset() : Stick;
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
	 * 	Renders the stick in the canvas.
	 * 	!renderStick (g: Canvas) : void;
	 */
	renderStick: function (g, elem, img)
	{
		if (elem.isPressed)
		{
			if (elem.pressedImg)
				elem.pressedImg.draw (g, elem.bounds.x1, elem.bounds.y1);

			if (elem.pressedImgInner)
				elem.pressedImgInner.draw (g, elem.bounds.x1 + elem.dispx, elem.bounds.y1 + elem.dispy);
		}
		else
		{
			if (elem.unpressedImg)
				elem.unpressedImg.draw (g, elem.bounds.x1, elem.bounds.y1);

			if (elem.unpressedImgInner)
				elem.unpressedImgInner.draw (g, elem.bounds.x1, elem.bounds.y1);
		}
	},

	/**
	 * 	Button pointer update event. Not required for the button control.
	 * 	!pointerUpdate (pointerX: number, pointerY: number, pointer: object) : void;
	 */
	pointerUpdate: function (pointerX, pointerY)
	{
		let dx, dy;

		dx = pointerX - this.refX;
		dy = pointerY - this.refY;

		this.angle = Math.atan2(-dy, dx);
		this.radius = Math.sqrt(dx*dx + dy*dy);

		if (this.radius > this.maxRadius)
			this.radius = this.maxRadius;

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
	 * 	Called when the PointerEventType.POINTER_DOWN event starts within the bounding box of the stick.
	 * 	!pointerActivate (pointer: object) : void;
	 */
	pointerActivate: function (pointer)
	{
		this.wasPressed = this.isPressed;
		this.isPressed = 1;

		this.refX = pointer.x;
		this.refY = pointer.y;

		this.pointerUpdate(pointer.x, pointer.y);
	},

	/**
	 * 	Called when the PointerEventType.POINTER_UP event is fired with the "_ref" attribute pointing to this object.
	 *	!pointerDeactivate (pointer: object) : void;
	 */
	pointerDeactivate: function (pointer)
	{
		this.wasPressed = this.isPressed;
		this.isPressed = 0;

		this.reset();
	},

	/**
	 * 	Returns `true` if the stick contains the specified point.
	 * 	!containsPoint (x: number, y: number) : boolean;
	 */
	containsPoint: function(x, y)
	{
		if (!this.visible())
			return false;

		return this.hitbox.bounds.containsPoint(x, y);
	},

	/**
	 * 	Sets the direction of the stick, the provided deltas should be normalized in the \[-1, 1\] range.
	 * 	!setDirection (dx: number, dy: number, deadZoneX?: number, deadZoneY?: number) : boolean;
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
	 * 	Saves the current state of the stick in the f* variables (fdirx, fdiry, etc). When the `lastValid` parameter is true, the values will
	 * 	be saved on each field only if the current value is not zero.
	 * 	!freezeState (lastValid?: boolean) : Stick;
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
	 * 	Key down event, handles the keys that control the direction of the stick.
	 * 	!keyDown (keyCode: KeyCode, keyArgs: object) : boolean|null;
	 */
	keyDown: function (keyCode, keyArgs)
	{
		let dx = 0;
		let dy = 0;

		if (keyArgs[KeyCode.UP] === true) dy = -this.maxRadius;
		if (keyArgs[KeyCode.LEFT] === true) dx = -this.maxRadius;
		if (keyArgs[KeyCode.DOWN] === true) dy = this.maxRadius;
		if (keyArgs[KeyCode.RIGHT] === true) dx = this.maxRadius;

		if (keyCode === KeyCode.UP || keyCode === KeyCode.LEFT || keyCode === KeyCode.DOWN || keyCode === KeyCode.RIGHT)
		{
			dx = this.bounds.cx + dx;
			dy = this.bounds.cy + dy;

			this.wasPressed = this.isPressed;
			this.isPressed = 1;

			this.pointerUpdate (dx, dy);
			return false;
		}
	},

	/**
	 * 	Key up event, handles the keys that control the direction of the stick.
	 * 	!keyUp (keyCode: KeyCode, keyArgs: object) : boolean|null;
	 */
	keyUp: function (keyCode, keyArgs)
	{
		let dx = 0;
		let dy = 0;

		if (keyArgs[KeyCode.UP] === true) dy = -this.maxRadius;
		if (keyArgs[KeyCode.LEFT] === true) dx = -this.maxRadius;
		if (keyArgs[KeyCode.DOWN] === true) dy = this.maxRadius;
		if (keyArgs[KeyCode.RIGHT] === true) dx = this.maxRadius;

		if (keyCode === KeyCode.UP || keyCode === KeyCode.LEFT || keyCode === KeyCode.DOWN || keyCode === KeyCode.RIGHT)
		{
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
	 * 	Sets the handler for the on-change event. Executed after any change in the direction of the stick.
	 * 	!onChange (callback: (dirx: number, diry: number, magnitude: number, angle: number, stick: Stick) => void) : Stick;
	 */
	onChange: function (callback)
	{
		this._onChange = callback;
		return this;
	}
});
