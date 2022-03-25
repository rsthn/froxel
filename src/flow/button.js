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
	 * 	Handlers for the button events.
	 */
	_onButtonDown: null,
	_onButtonUp: null,
	_onTap: null,
	_onChange: null,
 
	/**
	 * 	Creates the button with the specified parameters. Automatically adds it to the screen controls.
	 * 	!constructor (container: Container, x: number, y: number, unpressedImg?: IDrawable, pressedImg?: IDrawable);
	 */
	__ctor: function (container, x, y, unpressedImg=null, pressedImg=null)
	{
		this._super.Group.__ctor();

		this.unpressedImg = unpressedImg;
		this.pressedImg = pressedImg || unpressedImg;

		this.hitbox = new Mask (0, x, y, unpressedImg ? unpressedImg.width : 16, unpressedImg ? unpressedImg.height : 16).visible(false);
		this.addChild(this.hitbox);

		container.add(this.hitbox);
		container.add(this);

		this._onButtonDown = null;
		this._onButtonUp = null;
		this._onTap = null;
		this._onChange = this._default_onChange;
	
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
	 * 	Sets the visible flag of the group and all children (except hitbox).
	 * 	!visible (value: boolean) : Group;
	 */
	/**
	 * 	Returns the visible flag of the group.
	 * 	!visible () : boolean;
	 */
	visible: function (value=null)
	{
		if (value === null)
			return this._super.Element.visible();

		for (let i = this.children.top; i; i = i.next)
		{
			if (i.value !== this.hitbox)
			i.value.visible(value);
		}

		return this._super.Element.visible(value);
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
		this._onChange (this.isPressed = false, this.wasPressed = false, this);
	},

	/**
	 * 	Renders the element to the graphics surface.
	 * 	!override render (g: Canvas) : void;
	 */
	render: function (g)
	{
		if (this.isPressed && this.pressedImg)
			this.pressedImg.draw (g, this.bounds.x1, this.bounds.y1);
		else if (!this.isPressed && this.unpressedImg)
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
		this._onChange (this.isPressed, this.wasPressed, this);

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
	 * 	!onChange (isPressed: boolean, wasPressed: boolean, button: Button) : void;
	 */
	_default_onChange: function (isPressed, wasPressed, button)
	{
		if (isPressed != wasPressed)
		{
			if (isPressed && this._onButtonDown)
				this._onButtonDown();
			else if (!isPressed && this._onButtonUp)
				this._onButtonUp();
		}

		if (!isPressed && wasPressed && this._onTap)
			this._onTap();
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
	 * 	Sets the handler for the on-change event. Executed when the button state changes. Settings this callback will cause onButtonDown,
	 * 	onButtonUp and onTap to no longer work. Set the callback to `null` to return it to the default state.
	 * 
	 * 	!onChange: (callback: (isPressed: boolean, wasPressed: boolean, buttons: Button) => void) => Button;
	 */
	onChange: function (callback)
	{
		this._onChange = callback === null ? this._default_onChange : callback;
		return this;
	},

	/**
	 * 	Sets the handler for the button-down event. Executed when the button is pressed. Fired only if the `onChange` method was not overriden.
	 * 	!onButtonDown: (callback: () => void) => Button;
	 */
	onButtonDown: function (callback)
	{
		this._onButtonDown = callback;
		return this;
	},

	/**
	 * 	Sets the handler for the button-up event. Executed when the button is released. Fired only if the `onChange` method was not overriden.
	 * 	!onButtonUp: (callback: () => void) => Button;
	 */
	onButtonUp: function (callback)
	{
		this._onButtonUp = callback;
		return this;
	},

	/**
	 * 	Sets the handler for the on-tap event. Executed when the button is tapped (pressed and then released). Fired only if the `onChange` method was not overriden.
	 * 	!onTap: (callback: () => void) => Button;
	 */
	onTap: function (callback)
	{
		this._onTap = callback;
		return this;
	}
});
