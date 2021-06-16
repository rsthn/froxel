/*
**	flow/button
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

/**
**	Button class provides an easy way to add push-button support to the world.
*/

export default Group.extend
({
	/**
	**	Indicates if once focus is obtained it is locked until the user releases it.
	*/
	focusLock: false,

	/**
	**	Current and last status of the button (0 for unpressed, 1 for pressed).
	*/
	status: 0, lstatus: 0,

	/**
	**	Images for the unpressed and pressed statuses.
	*/
	unpressedImg: null,
	pressedImg: null,

	/*
	**	Indicates if the button should trigger a key press for this key code.
	*/
	keyCode: 0,

	/*
	**	Hitbox element.
	*/
	mask: 0,

	/**
	**	Creates the button with the specified parameters. Automatically adds it to the screen controls.
	*/
	__ctor: function (x, y, unpressedImg, pressedImg=null, relativeToCenter=true)
	{
		this._super.Group.__ctor(x, y, unpressedImg.width, unpressedImg.height);

		this.unpressedImg = unpressedImg;
		this.pressedImg = pressedImg || unpressedImg;

		this.mask = new Element(0, 0, this.width, this.height);
		this.addChild(this.mask);

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
		container.add(this.mask);
	},

	/*
	**	Executed when the item is removed from a container.
	*/
	onDetached: function (container)
	{
		// VIOLET: container should set the 'container' property to null
		container.remove(this.mask);
		this.mask.container = null;
	},

	/*
	**	Changes the pressed/unpressed images of the button.
	*/
	setImage: function (unpressedImg, pressedImg=null)
	{
		this.unpressedImg = unpressedImg;
		this.pressedImg = pressedImg || unpressedImg;
	},

	/**
	**	Resets the button to its initial state.
	*/
	reset: function ()
	{
		this.status = this.lstatus = 0;
		this.onChange (this.status, this.lstatus);
	},

	/**
	**	Draws the element on the given graphics surface.
	*/
	elementDraw: function (g)
	{
		if (this.status)
			this.pressedImg.draw (g, 0, 0);
		else
			this.unpressedImg.draw (g, 0, 0);
	},

	/**
	**	Button pointer update event. Not required for the button control.
	*/
	pointerUpdate: function (pointerX, pointerY)
	{
	},

	/**
	**	Called when the EVT_POINTER_DOWN event starts within the bounding box of the button.
	*/
	pointerActivate: function (pointer)
	{
		this.lstatus = this.status;
		this.status = 1;

		this.onChange (this.status, this.lstatus);
	},

	/**
	**	Called when the EVT_POINTER_UP event is fired with the "_ref" attribute pointing to this object.
	*/
	pointerDeactivate: function (pointer)
	{
		this.lstatus = this.status;
		this.status = 0;

		this.onChange (this.status, this.lstatus);
	},

	/**
	**	Returns true if the button contains the specified point.
	*/
	containsPoint: function(x, y)
	{
		if (!this.active() || !this.visible())
			return false;

		return this.mask.bounds.containsPoint(x, y);
	},

	/**
	**	Executed after any change in the status of the button. Be careful when overriding this, because when so, the onTap method will not work.
	*/
	onChange: function (status, lstatus) /* @override */
	{
		if (status != lstatus)
		{
			if (status)
				this.onButtonDown();
			else
				this.onButtonUp();
		}

		if (status == 0 && lstatus == 1) this.onTap();
	},

	/**
	**	Executed when the button is pressed. Works only if the onChange method was not overriden.
	*/
	onButtonDown: function () /* @override */
	{
	},

	/**
	**	Executed when the button is released. Works only if the onChange method was not overriden.
	*/
	onButtonUp: function () /* @override */
	{
	},

	/**
	**	Executed when the button is tapped (pressed and then released). Works only if the onChange method was not overriden.
	*/
	onTap: function () /* @override */
	{
	}
});
