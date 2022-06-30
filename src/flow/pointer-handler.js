
import PriorityQueue from '../utils/priority-queue.js';
import Boot from './boot.js';
import System from '../system/system.js';

//![import "../utils/priority-queue"]
//![import "./boot"]
//![import "../system/system"]

//!namespace PointerHandler

	//!type Handler =

		/**
		 * Executed when the handler is attached.
		 * !init?: () => void;
		 */

		/**
		 * Pointer event handler.
		 * !onPointerEvent: System.PointerEventHandler;
		 */

	//!/type

//!/namespace

//:/**
//: * Used to attach pointer event handlers to the system.
//: */

//!class PointerHandler

export default Boot.Module.create
({
	handlers: null,

	__ctor: function ()
	{
		const self = this;

		this._super.Module.__ctor();

		this.handlers = new PriorityQueue();

		this._callOnPointerEvent = function (handler) {
			return self.callOnPointerEvent(handler);
		};
	},

	/**
	 * Registers a pointer event handler.
	 * !static register (handler: PointerHandler.Handler) : PointerHandler.Handler;
	 */
	register: function (handler)
	{
		try {
			this.handlers.add(handler);

			if ('init' in handler)
				handler.init();
		}
		catch (e) {
			throw new Error ("PointerHandler (register): " + e.message);
		}

		return handler;
	},

	/**
	 * Removes a pointer event handler.
	 * !static unregister (handler: PointerHandler.Handler) : void;
	 */
	unregister: function (handler)
	{
		try {
			this.handlers.remove(handler);
			this.handlers.cleanup();
		}
		catch (e) {
			throw new Error ("PointerHandler (unregister): " + e.message);
		}
	},

	callOnPointerEvent: function (handler)
	{
		return handler.onPointerEvent(this._action, this._p, this._pointers);
	},

	/**
	 * Overrides the default pointer event handler.
	 */
	onStartup: function()
	{
		System.onPointerEvent = (action, p, pointers) =>
		{
			this._action = action;
			this._p = p;
			this._pointers = pointers;

			this.handlers.forEach(this._callOnPointerEvent);
		};
	},

	/**
	 * Removes the default pointer handler.
	 */
	onShutdown: function()
	{
		System.onPointerEvent = null;
	}
});
