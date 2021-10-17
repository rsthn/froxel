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
import Mask from './mask.js';
import ScreenControls from './screen-controls.js';

//![import "./group.js"]
//![import "./mask.js"]
//![import "./screen-controls.js"]

/**
 * 	Button class provides an easy way to add push-button support to the world.
 */

//!class Button extends Group

export default Group.extend
({
	/**
	 * 	Indicates if once focus is obtained it is locked until the user releases it.
	 * 	@default false
	 *	!focusLock: boolean;
	 */
	focusLock: false,

	/**
	 * 	Indicates if keyboard events are enabled on this object.
	 * 	@default true
	 *	!keyboardEvents: boolean;
	 */
	keyboardEvents: true,

	/**
	 * 	Current pressed status of the button.
	 *	!isPressed: boolean;
	 */
	isPressed: false,

	/**
	 * 	Previous pressed status of the button.
	 *	!wasPressed: boolean;
	 */
	wasPressed: false,

	/**
	 * 	Image to draw when the button is unpressed.
	 *	!unpressedImg: IDrawable;
	 */
	unpressedImg: null,

	/**
	 * 	Image to draw when the button is pressed.
	 *	!pressedImg: IDrawable;
	 */
	pressedImg: null,

	/**
	 * 	Key code related to the button. Used only if not `null`.
	 * 	@default null
	 *	!keyCode: System.KeyCode;
	 */
	keyCode: null,

	/**
	 * 	Hitbox element.
	 * 	!readonly hitbox: Mask;
	 */
	hitbox: 0,

	/**
	 * 	Creates the button with the specified parameters. Automatically adds it to the screen controls.
	 * 	!constructor (container: Container, x: number, y: number, unpressedImg: IDrawable, pressedImg?: IDrawable);
	 */
	__ctor: function (container, x, y, unpressedImg, pressedImg=null)
	{
		this._super.Group.__ctor();

		this.unpressedImg = unpressedImg;
		this.pressedImg = pressedImg || unpressedImg;

		this.hitbox = new Mask (0, x, y, unpressedImg.width, unpressedImg.height).visible(false);
		this.addChild(this.hitbox);

		container.add(this.hitbox);
		container.add(this);

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
	 * 	Changes the pressed/unpressed images of the button.
	 * 	!setImage (unpressedImg: IDrawable, pressedImg?: IDrawable);
	 */
	setImage: function (unpressedImg, pressedImg=null)
	{
		this.unpressedImg = unpressedImg;
		this.pressedImg = pressedImg || unpressedImg;
		return this;
	},

	/**
	 * 	Changes the key code of the button.
	 * 	!setKeyCode (value: System.KeyCode) : Button;
	 */
	setKeyCode: function (value)
	{
		this.keyCode = value;
		return this;
	},

	/**
	 * 	Resets the button to its initial state.
	 * 	!reset() : void;
	 */
	reset: function ()
	{
		this.onChange (this.isPressed = false, this.wasPressed = false);
	},

	/**
	 * 	Renders the element to the graphics surface.
	 * 	!override render (g: Canvas) : void;
	 */
	render: function (g)
	{
		if (this.isPressed)
			this.pressedImg.draw (g, this.bounds.x1, this.bounds.y1);
		else
			this.unpressedImg.draw (g, this.bounds.x1, this.bounds.y1);
	},

	/**
	 * 	Button pointer update event. Not required for the button control.
	 * 	!pointerUpdate (pointerX: number, pointerY: number, pointer: object) : void;
	 */
	pointerUpdate: function (pointerX, pointerY, pointer)
	{
	},

	/**
	 * 	Sets the pressed state of the button.
	 * 	!setStatus (value: boolean) : Button;
	 */
	setStatus: function (value)
	{
		if ((this.isPressed && value) || (!this.isPressed && !value))
			return this;

		this.updateStatus (value);
		this.onChange (this.isPressed, this.wasPressed);

		return this;
	},

	/**
	 * 	Moves the `isPressed` value of the button to `wasPressed`, and updates `isPressed` with the given value. If none provided, `isPressed` is unchanged.
	 *	!updateStatus (value?: boolean) : Button;
	 */
	updateStatus: function (value=null)
	{
		this.wasPressed = this.isPressed;
		this.isPressed = value === null ? this.isPressed : value;
		return this;
	},

	/**
	 * 	Called when the PointerEventType.POINTER_DOWN event starts within the bounding box of the button.
	 * 	!pointerActivate (pointer: object) : void;
	 */
	pointerActivate: function (pointer)
	{
		this.setStatus(true);
	},

	/**
	 * 	Called when the PointerEventType.POINTER_UP event is fired with the "_ref" attribute pointing to this object.
	 *	!pointerDeactivate (pointer: object) : void;
	 */
	pointerDeactivate: function (pointer)
	{
		this.setStatus(false);
	},

	/**
	 * 	Returns `true` if the button contains the specified point.
	 * 	!containsPoint (x: number, y: number) : boolean;
	 */
	containsPoint: function(x, y)
	{
		if (!this.visible())
			return false;

		return this.hitbox.bounds.containsPoint(x, y);
	},

	/**
	 * 	Executed after any change in the status of the button. Be careful when overriding this, because when so, the `onTap` method will not work.
	 * 	!onChange (isPressed: boolean, wasPressed: boolean) : void;
	 */
	onChange: function (isPressed, wasPressed)
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

	/**
	 * 	Key down event, handles the keys that control the button.
	 * 	!keyDown (keyCode: System.KeyCode, keyArgs: object) : boolean|null;
	 */
	keyDown: function (keyCode, keyArgs)
	{
		if (keyCode === this.keyCode)
		{
			this.pointerActivate();
			return false;
		}
	},

	/**
	 * 	Key up event, handles the keys that control the button.
	 * 	!keyUp (keyCode: System.KeyCode, keyArgs: object) : boolean|null;
	 */
	keyUp: function (keyCode, keyArgs)
	{
		if (keyCode === this.keyCode)
		{
			this.pointerDeactivate();
			return false;
		}
	},

	/**
	 * 	Executed when the button is pressed. Works only if the `onChange` method was not overriden.
	 * 	!onButtonDown: () => void;
	 */
	onButtonDown: function ()
	{
	},

	/**
	 * 	Executed when the button is released. Works only if the onChange method was not overriden.
	 * 	!onButtonUp: () => void;
	 */
	onButtonUp: function ()
	{
	},

	/**
	 * 	Executed when the button is tapped (pressed and then released). Works only if the onChange method was not overriden.
	 * 	!onTap: () => void;
	 */
	onTap: function ()
	{
	}
});
