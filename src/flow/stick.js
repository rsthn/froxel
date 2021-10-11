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
import KeyCodes from '../system/keycodes.js';

//![import "./group"]
//![import "./mask"]
//![import "./screen-controls"]
//![import "../system/keycodes"]

/*
**	Stick class provides an easy way to add directional control sticks to the world.
*/

export default Group.extend
({
	/*
	**	Indicates if once focus is obtained it is locked until the user releases it.
	*/
	focusLock: true,

	/*
	**	Indicates if keyboard events are enabled on this object.
	*/
	keyboardEvents: true,

	/*
	**	Current and last status of the button (0 for unpressed, 1 for pressed).
	*/
	status: 0, lstatus: 0,

	/*
	**	Images for the unpressed and pressed statuses for the outer stick.
	*/
	unpressedImg: null,
	pressedImg: null,

	/*
	**	Images for the unpressed and pressed statuses for the inner stick.
	*/
	unpressedImgInner: null,
	pressedImgInner: null,

	/*
	**	Number of steps for the angle and radius of the stick. Used to snap the stick movement to discrete steps.
	*/
	angleSteps: 0, radiusSteps: 0,

	/*
	**	Direction (X and Y), magnitude and angle of the stick vector. The dirx and diry are normalized.
	*/
	rdirx: 0, rdiry: 0, dirx: 0, diry: 0, magnitude: 0, angle: 0,

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

	/*
	**	Creates the stick with the specified parameters. Automatically adds it to the screen controls.
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

		this.hitbox = new Mask(0, x, y, unpressedImg.width, unpressedImg.height).visible(false);
		this.addChild(this.hitbox);

		container.add(this.hitbox);
		container.add(this);

		ScreenControls.add(this);
	},

	/*
	**	Removes the button from the screen controls and destroys it.
	*/
	__dtor: function ()
	{
		this._super.Group.__dtor();
		ScreenControls.remove(this);
	},

	/*
	**	Changes the pressed/unpressed images of the outer stick.
	*/
	setImage: function (unpressedImg, pressedImg=null)
	{
		this.unpressedImg = unpressedImg;
		this.pressedImg = pressedImg || unpressedImg;
		return this;
	},

	/*
	**	Changes the pressed/unpressed images of the inner stick.
	*/
	setImageInner: function (unpressedImg, pressedImg=null)
	{
		this.unpressedImgInner = unpressedImg;
		this.pressedImgInner = pressedImg || unpressedImg;
		return this;
	},

	/*
	**	Sets the number of angle-steps for the stick.
	*/
	setAngleSteps: function (n)
	{
		this.angleSteps = n;
		return this;
	},

	/*
	**	Sets the number of radius-steps for the stick.
	*/
	setRadiusSteps: function (n)
	{
		this.radiusSteps = n;
		return this;
	},

	/*
	**	Sets the dead zone values (normalized).
	*/
	setDeadZone: function (deadZoneX, deadZoneY)
	{
		this.deadZoneX = deadZoneX;
		this.deadZoneY = deadZoneY;

		return this;
	},

	/*
	**	Resets the button to its initial state.
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

		this.onChange(this.dirx, this.diry, this.magnitude, this.angle);
	},

	/*
	**	Renders the element to the graphics surface.
	*/
	render: function (g)
	{
		if (this.status)
		{
			this.pressedImg.draw (g, this.bounds.x1, this.bounds.y1);
			this.pressedImgInner.draw (g, this.bounds.x1 + this.dispx, this.bounds.y1 + this.dispy);
		}
		else
		{
			this.unpressedImg.draw (g, this.bounds.x1, this.bounds.y1);
			this.unpressedImgInner.draw (g, this.bounds.x1, this.bounds.y1);
		}
	},

	/*
	**	Button pointer update event. Not required for the button control.
	*/
	pointerUpdate: function (pointerX, pointerY)
	{
		let dx = pointerX - this.bounds.cx;
		let dy = pointerY - this.bounds.cy;

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

		this.onChange(this.dirx, this.diry, this.magnitude, this.angle);
	},

	/*
	**	Called when the EVT_POINTER_DOWN event starts within the bounding box of the button.
	*/
	pointerActivate: function (pointer)
	{
		this.lstatus = this.status;
		this.status = 1;

		this.pointerUpdate(pointer.x, pointer.y);
	},

	/*
	**	Called when the EVT_POINTER_UP event is fired with the "_ref" attribute pointing to this object.
	*/
	pointerDeactivate: function (pointer)
	{
		this.lstatus = this.status;
		this.status = 0;

		this.reset();
	},

	/*
	**	Returns true if the button contains the specified point.
	*/
	containsPoint: function(x, y)
	{
		if (!this.visible())
			return false;

		return this.hitbox.bounds.containsPoint(x, y);
	},

	/**
	 * 	Sets the direction of the stick, the provided deltas should be normalized in the [-1, 1] range.
	 */
	setDirection: function (dx, dy, deadZoneX=0.10, deadZoneY=0.10)
	{
		if (Math.abs(dx) < deadZoneX) dx = 0;
		if (Math.abs(dy) < deadZoneY) dy = 0;

		this.lstatus = this.status;
		this.status = dx == 0 && dy == 0 ? 0 : 1;

		this.pointerUpdate (this.bounds.cx + dx*this.maxRadius, this.bounds.cy + dy*this.maxRadius);
		return false;
	},

	/*
	**	Saves the current state of the stick in the f* variables (fdirx, fdiry, etc). When the `lastValid` parameter is true, the values will be saved
	**	on each field only if the current value is not zero.
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
	**	Key-down event, handles the keys that control the direction of the stick.
	*/
	keyDown: function (keyCode, keyArgs)
	{
		let dx = 0;
		let dy = 0;

		if (keyArgs[KeyCodes.UP] === true) dy = -this.maxRadius;
		if (keyArgs[KeyCodes.LEFT] === true) dx = -this.maxRadius;
		if (keyArgs[KeyCodes.DOWN] === true) dy = this.maxRadius;
		if (keyArgs[KeyCodes.RIGHT] === true) dx = this.maxRadius;

		if (keyCode === KeyCodes.UP || keyCode === KeyCodes.LEFT || keyCode === KeyCodes.DOWN || keyCode === KeyCodes.RIGHT)
		{
			dx = this.bounds.cx + dx;
			dy = this.bounds.cy + dy;

			this.lstatus = this.status;
			this.status = 1;

			this.pointerUpdate (dx, dy);
			return false;
		}
	},

	/**
	**	Key-up event, handles the keys that control the direction of the stick.
	*/
	keyUp: function (keyCode, keyArgs)
	{
		let dx = 0;
		let dy = 0;

		if (keyArgs[KeyCodes.UP] === true) dy = -this.maxRadius;
		if (keyArgs[KeyCodes.LEFT] === true) dx = -this.maxRadius;
		if (keyArgs[KeyCodes.DOWN] === true) dy = this.maxRadius;
		if (keyArgs[KeyCodes.RIGHT] === true) dx = this.maxRadius;

		if (keyCode === KeyCodes.UP || keyCode === KeyCodes.LEFT || keyCode === KeyCodes.DOWN || keyCode === KeyCodes.RIGHT)
		{
			this.pointerUpdate (this.bounds.cx + dx, this.bounds.cy + dy);

			if (dx === 0 && dy === 0)
			{
				this.lstatus = this.status;
				this.status = 0;
			}

			return false;
		}
	},

	/**
	**	Executed after any change in the direction of the stick.
	*/
	onChange: function (dirx, diry, magnitude, angle) /* @override */
	{
	}
});
