
import PointerHandler from '../flow/pointer-handler.js';
import KeyboardHandler from '../flow/keyboard-handler.js';
import Handler from '../utils/handler.js';

import world from './world.js';
import system from './system.js';

import Gamepad from './gamepad.js';

//!namespace input

//:[import './gamepad.js']

	//:type PointerCallback = (action: System.PointerEventType, pointer: System.Pointer, arg0?: any, arg1?: any, args2?: any) => void;
	//:type KeyboardCallback = (action: System.KeyboardEventType, keyCode: KeyCode, keyState: System.KeyboardState, arg0?: any, arg1?: any, args2?: any) => void;

//!/namespace

//!class input

/**
 * Input system allows to interface with the pointer and keyboard devices. And to create on-screen gamepads.
 */

const input =
{
	/**
	 * Registered gamepads.
	 */
	_gamepads: [],

	/**
	 * Currently active gamepad.
	 * !static activeGamepad: input.Gamepad;
	 */
	activeGamepad: null,

	/**
	 * Last created button.
	 * !static lastButton: Button;
	 */
	lastButton: null,

	/**
	 * Last created stick.
	 * !static lastStick: Stick;
	 */
	lastStick: null,

	/**
	 * Cursor object, used to control the state of the single-cursor input.
	 */
	cursor:
	{
		/**
		 * Indicates if the single-cursor input has been enabled.
		 */
		_enabled: null,

		/**
		 * Handler callback for cursor events.
		 */
		_handler: null,

		/**
		 * Cursor element used when the single-cursor input is enabled.
		 */
		_element: null,

		/**
		 * Pointer state related to the cursor when single-cursor input is enabled.
		 */
		pointer: null,

		/**
		 * Returns the element used for single-cursor input.
		 */
		element: function (elem=false)
		{
			if (elem === false)
				return this._element;

			this._element = elem;
			return this;
		},

		/**
		 * Hides or shows the native cursor.
		 */
		native: function (value)
		{
			if (!value && system.renderer.elem.style.cursor !== 'none')
				system.renderer.elem.style.cursor = 'none';
			else if (value && system.renderer.elem.style.cursor === 'none')
				system.renderer.elem.style.removeProperty('cursor');
		},

		/**
		 * Enables or disables the single-cursor input.
		 */
		enabled: function (value=null)
		{
			if (value === null)
				return this._enabled;

			if (this._enabled === value)
				return this;

			this._enabled = value;

			if (value === true)
			{
				if (this._element !== null)
					system.renderer.elem.style.cursor = 'none';

				PointerHandler.register(this.pointerHandler);
			}
			else
			{
				system.renderer.elem.style.removeProperty('cursor');
				PointerHandler.unregister(this.pointerHandler);
			}

			return this;
		},

		/**
		 * Sets the callback to execute when a cursor event happens.
		 * @param { (action:number, pointer:object) => void } callback
		 */
		handler: function (callback)
		{
			this._handler = callback;
			return this;
		},

		/**
		 * Pointer event handler for single-cursor input.
		 */
		pointerHandler:
		{
			priority: 50,

			onPointerEvent: function (action, pointer, pointers)
			{
				if (!input.cursor._enabled)
					return;

				input.cursor.pointer = pointer;

				if (input.cursor._element !== null)
					input.cursor._element.setPosition(pointer.x, pointer.y);

				if (input.cursor._handler !== null)
					input.cursor._handler (action, pointer);
			},
		},
	},

	/**
	 * Pointer related functions.
	 * !static pointer: {
	 */
	pointer:
	{
		/**
		 * Pointer handler.
		 */
		_handler: null,

		/**
		 * Context.
		 */
		context: null,

		/**
		 * Initializes the pointer input system.
		 */
		init: function ()
		{
			if (this._handler !== null)
				return;

			this._handler = Handler.Pool.alloc();
			this.context = { action: null, pointer: null, pointers: null };

			PointerHandler.register(this);
		},

		/**
		 * General pointer event handler.
		 */
		onPointerEvent: function (action, pointer, pointers)
		{
			this.context.action = action;
			this.context.pointer = pointer;
			this.context.pointers = pointers;

			this._handler.exec(this.context);
		},

		/**
		 * Adds a callback to the pointer event dispatcher.
		 * !add: (callback: fxl.input.PointerCallback, arg0?: any, arg1?: any, arg2?: any) => Callback;
		 */
		add: function (callback, arg0=null, arg1=null, arg2=null)
		{
			if (this._handler === null)
				this.init();

			return this._handler.add (this._handler_callback, callback, arg0, arg1, arg2);
		},

		/**
		 * Removes a callback from the pointer event dispatcher.
		 * @param {Callback} callback - The node returned by the `add` method.
		 * !remove: (callback: Callback) => void;
		 */
		remove: function (callback)
		{
			hthis._handler.remove (callback);
		},

		_handler_callback: function (context, callback, arg0, arg1, arg2)
		{
			return callback (context.action, context.pointer, arg0, arg1, arg2);
		},
	},
	//!};

	/**
	 * Keyboard related functions.
	 * !keyboard: {
	 */
	keyboard:
	{
		/**
		 * Keyboard handler.
		 */
		_handler: null,

		/**
		 * Context.
		 */
		context: null,

		/**
		 * Initializes the keyboard input system.
		 */
		init: function ()
		{
			if (this._handler !== null)
				return;

			this._handler = Handler.Pool.alloc();
			this.context = { action: null, keyCode: null, keybState: null };

			KeyboardHandler.register(this);
		},

		/**
		 * General keyboard event handler.
		 */
		onKeyboardEvent: function (action, keyCode, keybState)
		{
			this.context.action = action;
			this.context.keyCode = keyCode;
			this.context.keybState = keybState;

			this._handler.exec(this.context);
		},

		/**
		 * Adds a callback to the keyboard event dispatcher.
		 * !add: (callback: fxl.input.KeyboardCallback, arg0?: any, arg1?: any, arg2?: any) => Callback;
		 */
		add: function (callback, arg0=null, arg1=null, arg2=null)
		{
			if (this._handler === null)
				this.init();

			return this._handler.add (this._handler_callback, callback, arg0, arg1, arg2);
		},

		/**
		 * Removes a callback from the keyboard event dispatcher.
		 * @param {Callback} callback - The node returned by the `add` method.
		 * !remove: (callback: Callback) => void;
		 */
		remove: function (callback)
		{
			this._handler.remove (callback);
		},

		_handler_callback: function (context, callback, arg0, arg1, arg2)
		{
			return callback (context.action, context.keyCode, context.keybState, arg0, arg1, arg2);
		},
	},
	//!};

	/**
	 * Creates a gamepad object and attaches it to the SCENE_HUD in the specified layer (defaults to LAYER_HUD_MAIN).
	 * !static createGamepad (index: number, layerIndex?: number) : input.Gamepad;
	 */
	createGamepad: function (index, layerIndex=null)
	{
		layerIndex = layerIndex !== null ? layerIndex : world.LAYER_HUD_MAIN;

		world.selectScene(world.SCENE_HUD);
		world.selectContainer(layerIndex);

		this._gamepads[index] = new Gamepad (world.activeScene, layerIndex);
		this.selectGamepad(index);

		return this.activeGamepad;
	},

	/**
	 * Returns a gamepad given its index.
	 * !static getGamepad (index: number) : input.Gamepad;
	 */
	getGamepad: function (index)
	{
		if (index < 0 || index >= this._gamepads.length)
			return null;

		return this._gamepads[index] || null;
	},

	/**
	 * Selects the active gamepad for subsequent gamepad-level operations.
	 * !static selectGamepad (index: number) : boolean;
	 */
	selectGamepad: function (index)
	{
		this.activeGamepad = this.getGamepad(index);
		return true;
	},

	/**
	 * Sets the value of `debugBounds` on the specified gamepad. If index is `null`, all gamepads will be selected.
	 * !static debugGamepad (index: number, value: boolean) : void;
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

	/**
	 * Adds an stick control to the active gamepad.
	 * !static stick (id: string, x: number, y: number, outerDrawable: Drawable, innerDrawable: Drawable, maxRadius?: number|0) : Stick;
	 */
	stick: function (id, x, y, outerDrawable, innerDrawable, maxRadius=0)
	{
		if (this.activeGamepad === null)
			throw new Error ('input.addStick: use input.selectGamepad first to select the active gamepad.');

		return this.lastStick = this.activeGamepad.addStick (id, x, y, outerDrawable, innerDrawable, maxRadius);
	},

	/**
	 * Adds a button control to the active gamepad.
	 * !static button (id: string, x: number, y: number, unpressedDrawable?: Drawable|null, pressedDrawable?: Drawable|null) : Button;
	 */
	button: function (id, x, y, unpressedDrawable=null, pressedDrawable=null)
	{
		if (this.activeGamepad === null)
			throw new Error ('input.addButton: use input.selectGamepad first to select the active gamepad.');

		return this.lastButton = this.activeGamepad.addButton (id, x, y, unpressedDrawable, pressedDrawable);
	}
};

//!/class

export default input;
