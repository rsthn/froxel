
import Gamepad from './gamepad.js';
import PointerHandler from '../flow/pointer-handler.js';

import world from './world.js';
import system from './system.js';

/**
 *	Input system allows to create gamepads.
 */

const input =
{
	/**
	 *	Registered gamepads.
	 */
	_gamepads: [],

	/**
	 *	Currently active gamepad.
	 */
	activeGamepad: null,

	/**
	 *	Indicates if the single-cursor input has been enabled.
	 */
	_cursorEnabled: null,

	/**
	 *	Handler callaback for cursor events.
	 */
	_cursorHandler: null,

	/**
	 *	Cursor element used when the single-cursor input is enabled.
	 */
	activeCursor: null,

	/**
	 *	Pointer state related to the cursor when single-cursor input is enabled.
	 */
	pointer: null,

	/**
	 *	Sets or returns the specified element for the single-cursor input.
	 *	@param {Element} element?
	 */
	cursorElement: function (element=false)
	{
		if (element === false)
			return this.activeCursor;

		this.activeCursor = element;
		return this;
	},

	/**
	 *	Enables or disables the single-cursor input.
	 *	@param {boolean} value
	 */
	cursorEnabled: function (value=null)
	{
		if (value === null)
			return this._cursorEnabled;

		if (this._cursorEnabled === value)
			return this;

		this._cursorEnabled = value;

		if (value === true)
		{
			system.renderer.elem.style.cursor = 'none';
			PointerHandler.register(this.cursorPointerHandler);
		}
		else
		{
			system.renderer.elem.style.removeProperty('cursor');
			PointerHandler.unregister(this.cursorPointerHandler);
		}

		return this;
	},

	/**
	 *	Sets the callback to execute when a cursor event happens.
	 *	@param { (action:number, pointer:object) => void } callback
	 */
	cursorHandler: function (callback)
	{
		this._cursorHandler = callback;
		return this;
	},

	/**
	 * 	Pointer event handler for single-cursor input.
	 */
	cursorPointerHandler:
	{
		priority: 50,

		onPointerEvent: function (action, pointer, pointers)
		{
			if (!input._cursorEnabled)
				return;

			input.pointer = pointer;

			if (input.activeCursor !== null)
				input.activeCursor.setPosition(pointer.x, pointer.y);

			if (this._cursorHandler !== null)
				this._cursorHandler (action, pointer);
		},
	},

	/*
	**	Creates a gamepad object and attaches it to the active scene in the specified layer (defaults to world.LAYER_HUD_FG).
	*/
	createGamepad: function (index, layerIndex=null)
	{
		if (world.activeScene === null)
			throw new Error ('input.createGamepad: use world.selectScene first to select the active scene.');

		this._gamepads[index] = new Gamepad (world.activeScene, layerIndex !== null ? layerIndex : world.LAYER_HUD_FG);

		return this;
	},

	/*
	**	Returns a gamepad given its index.
	*/
	getGamepad: function (index)
	{
		if (index < 0 || index >= this._gamepads.length)
			return null;

		return this._gamepads[index] || null;
	},

	/*
	**	Selects the active gamepad for subsequent gamepad-level operations.
	*/
	selectGamepad: function (index)
	{
		this.activeGamepad = this.getGamepad(index);
		return true;
	},

	/*
	**	Sets the value of `debugBounds` on the specified gamepad. If index `null` is provided, all gamepads will be modified.
	*/
	debugGamepad: function (index, value)
	{
		if (index === null)
		{
			for (let i = 0; i < this._gamepads.length; i++)
			{
				if (!this._gamepads[i])
					continue;

				this.debugGamepad(i, value);
			}

			return;
		}

		this._gamepads[index].debug(value);
	},

	/*
	**	Adds an stick control to the active gamepad.
	*/
	stick: function (id, x, y, outerDrawable, innerDrawable, maxRadius=0)
	{
		if (this.activeGamepad === null)
			throw new Error ('input.addStick: use input.selectGamepad first to select the active gamepad.');

		return this.activeGamepad.addStick (id, x, y, outerDrawable, innerDrawable, maxRadius);
	},

	/*
	**	Adds a button control to the active gamepad.
	*/
	button: function (id, x, y, unpressedDrawable, pressedDrawable=null)
	{
		if (this.activeGamepad === null)
			throw new Error ('input.addButton: use input.selectGamepad first to select the active gamepad.');

		return this.activeGamepad.addButton (id, x, y, unpressedDrawable, pressedDrawable);
	}
};

export default input;
