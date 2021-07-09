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
import Element from './element.js';
import ScreenControls from './screen-controls.js';

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
	**	Direction (X and Y) and magnitude of the stick vector. The dirX and dirY are normalized.
	*/
	rdirX: 0, rdirY: 0, dirX: 0, dirY: 0, magnitude: 0,

	/*
	**	Indicates the displacement in X and Y directions of the inner stick. This is calculated when the update() method is called.
	*/
	dispX: 0, dispY: 0,

	/*
	**	Current angle and radius of the stick.
	*/
	angle: 0, radius: 0,

	/*
	**	Maximum radius that the inner stick can move.
	*/
	maxRadius: 0,

	/*
	**	Hitbox element.
	*/
	hitbox: 0,

	/*
	**	Creates the stick with the specified parameters. Automatically adds it to the screen controls.
	*/
	__ctor: function (x, y, maxRadius, unpressedImg, unpressedImgInner, pressedImg=null, pressedImgInner=null)
	{
		this._super.Group.__ctor(x, y, unpressedImg.width, unpressedImg.height);

		this.unpressedImg = unpressedImg;
		this.pressedImg = pressedImg || unpressedImg;

		this.unpressedImgInner = unpressedImgInner;
		this.pressedImgInner = pressedImgInner || unpressedImgInner;

		this.hitbox = new Element(x, y, this.bounds.width(), this.bounds.height());
		this.addChild(this.hitbox);

		this.maxRadius = maxRadius;

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
	**	Executed when the item is added to a container.
	*/
	onAttached: function (container)
	{
		container.add(this.hitbox);
	},

	/*
	**	Executed when the item is removed from a container.
	*/
	onDetached: function (container)
	{
		// VIOLET: container should set the 'container' property to null
		container.remove(this.hitbox);
		this.hitbox.container = null;
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
	**	Resets the button to its initial state.
	*/
	reset: function ()
	{
		this.dispX = 0;
		this.dispY = 0;

		this.rdirX = 0;
		this.rdirY = 0;

		this.dirX = 0;
		this.dirY = 0;
		this.magnitude = 0;

		this.onChange(this.dirX, this.dirY, this.magnitude, this.angle);
	},

	/*
	**	Draws the element on the given graphics surface.
	*/
	elementDraw: function (g)
	{
		if (this.status)
		{
			this.pressedImg.draw (g, 0, 0);
			this.pressedImgInner.draw (g, this.dispX, this.dispY);
		}
		else
		{
			this.unpressedImg.draw (g, 0, 0);
			this.unpressedImgInner.draw (g, 0, 0);
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

		this.rdirX = Math.min(1, Math.max(dx / this.maxRadius, -1));
		this.rdirY = Math.min(1, Math.max(dy / this.maxRadius, -1));

		this.dispX = this.radius * Math.cos(this.angle);
		this.dispY = this.radius * -Math.sin(this.angle);

		if (this.radius > 0)
		{
			this.dirX = this.dispX / this.radius;
			this.dirY = this.dispY / this.radius;

			this.magnitude = this.radius / this.maxRadius;
		}
		else
		{
			this.dirX = 0;
			this.dirY = 0;

			this.magnitude = 0;
		}

		this.onChange(this.dirX, this.dirY, this.magnitude, this.angle);
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
		if (!this.active() || !this.visible())
			return false;

		return this.hitbox.bounds.containsPoint(x, y);
	},

	/**
	**	Executed after any change in the direction of the stick.
	*/
	onChange: function (dirX, dirY, magnitude, angle) /* @override */
	{
	}
});
