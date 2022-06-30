
import PriorityQueue from '../utils/priority-queue.js';
import Boot from './boot.js';
import System from '../system/system.js';

//![import "../utils/priority-queue"]
//![import "./boot"]
//![import "../system/system"]

//!namespace KeyboardHandler

	//!type Handler =

		/**
		 * Executed when the handler is attached.
		 * !init?: () => void;
		 */

		/**
		 * Keyboard event handler.
		 * !onKeyboardEvent: System.KeyboardEventHandler;
		 */

	//!/type

//!/namespace

//:/**
//: * Used to attach keyboard event handlers to the system.
//: */

//!class KeyboardHandler

export default Boot.Module.create
({
	handlers: null,

	__ctor: function ()
	{
		const self = this;

		this._super.Module.__ctor();

		this.handlers = new PriorityQueue();

		this._callOnKeyboardEvent = function (handler) {
			return self.callOnKeyboardEvent(handler);
		};
	},

	/**
	 * Registers a keyboard event handler.
	 * !static register (handler: KeyboardHandler.Handler) : KeyboardHandler.Handler;
	 */
	register: function (handler)
	{
		try {
			this.handlers.add(handler);

			if ('init' in handler)
				handler.init();
		}
		catch (e) {
			throw new Error ("KeyboardHandler (register): " + e.message);
		}

		return handler;
	},

	/**
	 * Removes a keyboard event handler.
	 * !static unregister (handler: KeyboardHandler.Handler) : void;
	 */
	unregister: function (handler)
	{
		try {
			this.handlers.remove(handler);
			this.handlers.cleanup();
		}
		catch (e) {
			throw new Error ("KeyboardHandler (unregister): " + e.message);
		}
	},

	callOnKeyboardEvent: function (handler)
	{
		return handler.onKeyboardEvent(this._action, this._keyCode, this._keyState);
	},

	/**
	 * Overrides the default keyboard event handler.
	 */
	onStartup: function()
	{
		System.onKeyboardEvent = (action, keyCode, keyState) =>
		{
			this._action = action;
			this._keyCode = keyCode;
			this._keyState = keyState;

			this.handlers.forEach(this._callOnKeyboardEvent);
		};
	},

	/**
	 * Removes the default keyboard handler.
	 */
	onShutdown: function()
	{
		System.onKeyboardEvent = null;
	}
});
