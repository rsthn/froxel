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

/*
**	Button class provides an easy way to add push-button support to the world.
*/

export default Group.extend
({
	/*
	**	Indicates if once focus is obtained it is locked until the user releases it.
	*/
	focusLock: false,

	/*
	**	Current and previous pressed status of the button.
	*/
	isPressed: false, wasPressed: false,

	/*
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
	hitbox: 0,

	/*
	**	Creates the button with the specified parameters. Automatically adds it to the screen controls.
	*/
	__ctor: function (container, x, y, unpressedImg, pressedImg=null)
	{
		this._super.Group.__ctor();

		this.unpressedImg = unpressedImg;
		this.pressedImg = pressedImg || unpressedImg;

		this.hitbox = new Element (x, y, unpressedImg.width, unpressedImg.height);
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
	**	Changes the pressed/unpressed images of the button.
	*/
	setImage: function (unpressedImg, pressedImg=null)
	{
		this.unpressedImg = unpressedImg;
		this.pressedImg = pressedImg || unpressedImg;
		return this;
	},

	/*
	**	Resets the button to its initial state.
	*/
	reset: function ()
	{
		this.onChange (this.isPressed = false, this.wasPressed = false);
	},

	/*
	**	Draws the element on the given graphics surface.
	*/
	draw: function (g)
	{
		if (this.isPressed)
			this.pressedImg.draw (g, this.bounds.x1, this.bounds.y1);
		else
			this.unpressedImg.draw (g, this.bounds.x1, this.bounds.y1);
	},

	/*
	**	Button pointer update event. Not required for the button control.
	*/
	pointerUpdate: function (pointerX, pointerY)
	{
	},

	/*
	**	Moves the isPressed value of the button to wasPressed, and updates isPressed with the specified value. If none provided, isPressed is unchanged.
	*/
	updateStatus: function (value=null)
	{
		this.wasPressed = this.isPressed;
		this.isPressed = value === null ? this.isPressed : value;
		return this;
	},

	/*
	**	Called when the EVT_POINTER_DOWN event starts within the bounding box of the button.
	*/
	pointerActivate: function (pointer)
	{
		this.updateStatus (true);
		this.onChange (this.isPressed, this.wasPressed);
	},

	/*
	**	Called when the EVT_POINTER_UP event is fired with the "_ref" attribute pointing to this object.
	*/
	pointerDeactivate: function (pointer)
	{
		this.updateStatus (false);
		this.onChange (this.isPressed, this.wasPressed);
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

	/*
	**	Executed after any change in the status of the button. Be careful when overriding this, because when so, the onTap method will not work.
	*/
	onChange: function (isPressed, wasPressed) /* @override */
	{
		if (isPressed != wasPressed)
		{
			if (isPressed)
				this.onButtonDown();
			else
				this.onButtonUp();
		}

		if (!isPressed && wasPressed) this.onTap();
	},

	/*
	**	Executed when the button is pressed. Works only if the onChange method was not overriden.
	*/
	onButtonDown: function () /* @override */
	{
	},

	/*
	**	Executed when the button is released. Works only if the onChange method was not overriden.
	*/
	onButtonUp: function () /* @override */
	{
	},

	/*
	**	Executed when the button is tapped (pressed and then released). Works only if the onChange method was not overriden.
	*/
	onTap: function () /* @override */
	{
	}
});
