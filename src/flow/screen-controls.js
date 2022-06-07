/*
**	flow/screen-controls
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

import KeyboardHandler from './keyboard-handler.js';
import PointerHandler from './pointer-handler.js';
import System from '../system/system.js';
import Handler from '../utils/handler.js';

//![import "./keyboard-handler"]
//![import "./pointer-handler"]
//![import "../system/system"]

//!namespace ScreenControls

	//!type Handler =

		/**
		 * Indicates if the pointer focus is locked once acquired, until the pointer is released.
		 * !focusLock : boolean;
		 */

		/**
		 * Indicates if keyboard events are enabled for the host.
		 * !keyboardEvents : boolean;
		 */

		/**
		 * Zindex of the host. Used only if ScreenControls has zindex-flag enabled.
		 * !zindex : number;
		 */

		/**
		 * Returns `true` if the host contains the specified point (screen space).
		 * !containsPoint (x: number, y: number) : boolean;
		 */

		/**
		 * Host activated by a pointer event.
		 * !pointerActivate (pointer: System.Pointer) : void;
		 */

		/**
		 * Host previously activated by a pointer event has now been deactivated.
		 * !pointerDeactivate (pointer: System.Pointer) : void;
		 */

		/**
		 * Executed when a pointer move/drag event has happened (while the host is activated).
		 * !pointerUpdate (x: number, y: number, pointer: System.Pointer) : void;
		 */

		/**
		 * Executed when hover-flag is enabled and a pointer entered or left the host area.
		 * !hover (status: boolean, pointer: System.Pointer) : void;
		 */

		/**
		 * Executed when `keyboardEvents` flag is enabled and a KEY_DOWN event has happened.
		 * !keyDown (keyCode: KeyCode, keyArgs: System.KeyboardState) : void;
		 */

		/**
		 * Executed when `keyboardEvents` flag is enabled and a KEY_UP event has happened.
		 * !keyUp (keyCode: KeyCode, keyArgs: System.KeyboardState) : void;
		 */

	//!/type

//!/namespace

//!class ScreenControls

const ScreenControls =
({
	priority: 5,

	/**
	 * Handler class.
	 */
	Handler: Handler,

	/**
	 * List of handlers.
	 */
	list: [ ],

	/**
	 * Controls if `hover` support is enabled.
	 */
	hoverFlag: false,

	/**
	 * Controls if `zindex` support is enabled.
	 */
	zindexFlag: false,

	/**
	 * Last frame number when the list was sorted (when zindex is enabled).
	 */
	lastFrame: 0,

	/**
	 * Adds the specified handler to the screen controls list.
	 * !static add (handler: ScreenControls.Handler) : void;
	 */
	add: function (handler)
	{
		if (this.list.indexOf(handler) === -1)
			this.list.push(handler);
	},

	/**
	 * Removes the specified handler from the screen controls list.
	 * !static remove (handler: ScreenControls.Handler) : void;
	 */
	remove: function (handler)
	{
		let i = this.list.indexOf(handler);
		if (i !== -1) this.list.splice(i, 1);
	},

	/**
	 * Returns the hover-enable flag.
	 * !static hover() : boolean;
	 */
	/**
	 * Sets the hover-enable flag.
	 * !static hover (value: boolean) : void;
	 */
	hover: function (value=null)
	{
		if (value === null)
			return this.hoverFlag;

		this.hoverFlag = value;
	},

	/**
	 * Returns the zindex-enable flag.
	 * !static zindex() : boolean;
	 */
	/**
	 * Sets the zindex-enable flag.
	 * !static zindex (value: boolean) : void;
	 */
	zindex: function (value=null)
	{
		if (value === null)
			return this.zindexFlag;

		this.zindexFlag = value;
	},

	findTarget: function (x, y, filter)
	{
		// Once per frame the list is re-sorted (if required) when the zindex flag is enabled.
		if (this.zindexFlag && this.lastFrame != System.frameNumber)
		{
			let zindex = this.list[0].zindex;

			for (let item of this.list)
			{
				if (item.zindex > zindex)
				{
					this.list = this.list.sort((a,b) => b.zindex - a.zindex);
					break;
				}

				zindex = item.zindex;
			}

			this.lastFrame = System.frameNumber;
		}

		for (let i = 0; i < this.list.length; i++)
		{
			if (!this.list[i]) continue;

			if (filter !== null && filter(this.list[i]) === false)
				continue;

			if (this.list[i].containsPoint(x, y))
				return this.list[i];
		}

		return null;
	},

	/**
	 * Returns `true` if the specified object has the `hover` method.
	 * @param {object} i 
	 * @returns {boolean}
	 */
	filterHover: function (i)
	{
		return 'hover' in i;
	},

	/**
	 * Pointer event handler.
	 * @param {System.PointerEventType} action 
	 * @param {object} p 
	 * @param {object} pointers 
	 * @returns {boolean}
	 */
	onPointerEvent: function (action, p, pointers)
	{
		let _continue = true;
		let tmp = null;

		switch (action)
		{
			case System.PointerEventType.POINTER_DOWN:

				if (p._ref != null)
				{
					tmp = p._ref; p._ref = null;
					tmp.pointerDeactivate(p);
				}

				tmp = this.findTarget(p.x, p.y);
				if (tmp != null)
				{
					(p._ref = tmp).pointerActivate(p);
					_continue = false;
				}

				break;

			case System.PointerEventType.POINTER_DRAG_START:
				if (p._ref != null) _continue = false;
				break;

			case System.PointerEventType.POINTER_DRAG_MOVE:
				if (this.hoverFlag)
				{
					if (p._refh != null)
					{
						if (p._refh.containsPoint(p.x, p.y))
						{
						}
						else
						{
							tmp = p._refh; p._refh = null;
							tmp.hover(false, p);

							tmp = this.findTarget(p.x, p.y, this.filterHover);
							if (tmp != null)
								(p._refh = tmp).hover(true, p);
						}
					}
					else
					{
						tmp = this.findTarget(p.x, p.y, this.filterHover);
						if (tmp != null)
							(p._refh = tmp).hover(true, p);
					}
				}

				if (p._ref != null)
				{
					if (p._ref.containsPoint(p.x, p.y) || p._ref.focusLock == true)
					{
						p._ref.pointerUpdate (p.x, p.y, p);
						_continue = false;
					}
					else
					{
						tmp = p._ref; p._ref = null;
						tmp.pointerDeactivate(p);

						tmp = this.findTarget(p.x, p.y);
						if (tmp != null)
						{
							(p._ref = tmp).pointerActivate(p);
							_continue = false;
						}
					}
				}
				else
				{
					tmp = this.findTarget(p.x, p.y);
					if (tmp != null)
					{
						(p._ref = tmp).pointerActivate(p);
						_continue = false;
					}
				}

				break;

			case System.PointerEventType.POINTER_MOVE:
				if (this.hoverFlag)
				{
					if (p._refh != null)
					{
						if (p._refh.containsPoint(p.x, p.y))
						{
						}
						else
						{
							tmp = p._refh; p._refh = null;
							tmp.hover(false, p);

							tmp = this.findTarget(p.x, p.y, this.filterHover);
							if (tmp != null)
								(p._refh = tmp).hover(true, p);
						}
					}
					else
					{
						tmp = this.findTarget(p.x, p.y, this.filterHover);
						if (tmp != null)
							(p._refh = tmp).hover(true, p);
					}
				}

				if (p._ref == null) break;

				if (p._ref.containsPoint(p.x, p.y) || p._ref.focusLock == true)
				{
					p._ref.pointerUpdate (p.x, p.y, p);
					_continue = false;
				}
				else
				{
					tmp = p._ref; p._ref = null;
					tmp.pointerDeactivate(p);
				}

				break;

			case System.PointerEventType.POINTER_DRAG_STOP:
				if (p._ref != null) _continue = false;
				break;

			case System.PointerEventType.POINTER_UP:
				if (p._ref != null)
				{
					tmp = p._ref; p._ref = null;
					tmp.pointerDeactivate(p);

					_continue = false;
				}

				break;
		}

		return _continue;
	},

	/**
	 * Keyboard event handler.
	 * @param {System.KeyboardEventType} action 
	 * @param {int} keyCode 
	 * @param {object} keyArgs 
	 * @returns {boolean}
	 */
	onKeyboardEvent: function (action, keyCode, keyArgs)
	{
		switch (action)
		{
			case System.KeyboardEventType.KEY_DOWN:

				for (let i = 0; i < this.list.length; i++)
				{
					if (!this.list[i] || !this.list[i].keyboardEvents) continue;

					if (this.list[i].keyDown(keyCode, keyArgs) === false)
						break;
				}

				break;

			case System.KeyboardEventType.KEY_UP:

				for (let i = 0; i < this.list.length; i++)
				{
					if (!this.list[i] || !this.list[i].keyboardEvents) continue;

					if (this.list[i].keyUp(keyCode, keyArgs) === false)
						break;
				}

				break;
		}

		return true;
	}
});

//!/class

PointerHandler.register(ScreenControls);
KeyboardHandler.register(ScreenControls);

export default ScreenControls;
