
import System from '../system/system.js';
import Resources from '../resources/resources.js';
import Boot from '../flow/boot.js';
import Handler from '../utils/handler.js';

//!class sys

const system =
{
	/**
	 * Indicates if the system module has already been initialized.
	 */
	initialized: false,

	/**
	 * Screen width (available after calling `init`).
	 * !static readonly screenWidth: number;
	 */
	screenWidth: 0,

	/**
	 * Screen height (available after calling `init`).
	 * !static readonly screenHeight: number;
	 */
	screenHeight: 0,

	/**
	 * Primary renderer (available after calling `init`).
	 * !static readonly renderer: Canvas;
	 */
	renderer: null,

	/**
	 * Logical system time (mirrors the value of System.frameTime).
	 * !static readonly time: number;
	 */
	time: 0,

	/**
	 * Logical system delta time (mirrors the value of System.frameDelta).
	 * !static readonly dt: number;
	 */
	dt: 0,

	/**
	 * Timeout update handler.
	 */
	_timeout: null,

	/**
	 * Interval update handler.
	 */
	_interval: null,

	/**
	 * Time span update handler.
	 */
	_span: null,

	/**
	 * Update handler executed on every frame start.
	 * !static readonly update: Handler;
	 */
	update: null,

	/**
	 * Draw handler executed on every frame start.
	 * !static readonly draw: Handler;
	 */
	draw: null,

	/**
	 * Executed when the system is paused.
	 * !static onPaused: (fromExternalEvent: boolean) => void;
	 */
	onPaused: null,

	/**
	 * Executed when the system is resumed.
	 * !static onResumed: (fromExternalEvent: boolean) => void;
	 */
	onResumed: null,

	/**
	 * System initialization options.
	 */
	options:
	{
		/**
		 * 	Tells the system to enable WebGL support.
		 */
		gl: true,

		/**
		 * 	Indicates if on-screen logging should be enabled.
		 */
		log: false,

		/**
		 * 	Enables or disables antialised canvas. Set to `false` when pixel-perfect is desired.
		 */
		antialias: false,

		/**
		 * 	Background of the system canvas.
		 */
		background: '#000000',

		/**
		 * 	Desired orientaton of the display.
		 */
		orientation: 'automatic',

		/**
		 * 	Desired display width. When not specified (null) the maximum screen width to maintain the aspect ratio will be used.
		 */
		screenWidth: null,

		/**
		 * 	Desired display height. When not specified (null) the maximum screen height to maintain the aspect ratio will be used.
		 */
		screenHeight: null,

		/**
		 * 	Target frames per second (FPS). Used to determine delay between frames.
		 */
		fps: 144,

		/**
		 * 	Minimum allowed frames per second (FPS). If system FPS drops below this value, the `frameDelta` property of System will be truncated to 1/minFps.
		 */
		minFps: 24,

		/**
		 * 	Indicates if recycler pool preallocation should be automatically executed. Additionally if this value is a number, it will be used as
		 * 	maximum preallocation parameter for the recycler.
		 */
		preallocate: false
	},

	/**
	 * Initializes the system with the specified options.
	 * !static init (options: System.Options) : Promise<void>;
	 */
	/**
	 * Initializes the system using the default options.
	 * !static init () : Promise<void>;
	 */
	init: function (options)
	{
		return new Promise ((resolve, reject) =>
		{
			if (this.initialized)
				return resolve();

			Object.assign(this.options, options);

			Resources.config ({ pixelated: !this.options.antialias, filter: this.options.antialias ? 'LINEAR' : 'NEAREST' });
			System.init (this.options);

			System.updateQueueAdd
			({
				update: function(dt)
				{
					system.time = System.frameTime;
					system.dt = dt;

					system._timeout.exec(dt);
					system._interval.exec(dt);
					system._span.exec(dt);

					system.update.exec(dt);
				}
			});

			System.drawQueueAdd
			({
				draw: function(g)
				{
					system.draw.exec(g);
				}
			});

			Boot.startup(function()
			{
				System.start();

				system.screenWidth = System.screenWidth;
				system.screenHeight = System.screenHeight;
				system.renderer = System.renderer;

				system._timeout = Handler.Pool.alloc();
				system._interval = Handler.Pool.alloc();
				system._span = Handler.Pool.alloc();

				system.update = Handler.Pool.alloc();
				system.draw = Handler.Pool.alloc();

				window.onblur = function() {
					system.pause(true);
				};

				window.onfocus = function() {
					system.resume(true);
				};

				system.initialized = true;

				resolve();
			});
		});
	},

	/**
	 * Pauses the system.
	 * !static pause (fromExternalEvent?: boolean|false) : void;
	 */
	pause: function (fromExternalEvent=false)
	{
		if (system.onPaused !== null)
			system.onPaused(fromExternalEvent);
	},

	/**
	 * Resumes the system.
	 * !static resume (fromExternalEvent?: boolean|false) : void;
	 */
	resume: function (fromExternalEvent=false)
	{
		if (system.onResumed !== null)
			system.onResumed(fromExternalEvent);
	},

	/**
	 * Creates a timeout callback.
	 * !static timeout (duration: number, callback: Function, arg0?: any, arg1?: any, arg2?: any, arg3?: any) : Callback;
	 */
	timeout: function (duration, callback, arg0=null, arg1=null, arg2=null, arg3=null)
	{
		return this._timeout.add(this._updateTimeout, duration, callback, arg0, arg1, arg2, arg3);
	},

	/**
	 * Cancels a timeout callback.
	 * !static cancelTimeout (callback: Callback) : void;
	 */
	cancelTimeout: function (node)
	{
		this._timeout.remove(node);
	},

	_updateTimeout: function (dt, _, callback, arg0, arg1, arg2, arg3)
	{
		this.arg0 -= dt;
		if (this.arg0 > 0) return true;

		callback (arg0, arg1, arg2, arg3);
		return false;
	},

	/**
	 * Creates an interval callback.
	 * !static interval (period: number, callback: Function, arg0?: any, arg1?: any, arg2?: any) : Callback;
	 */
	interval: function (period, callback, arg0=null, arg1=null, arg2=null)
	{
		return this._interval.add(this._updateInterval, 0, period, callback, arg0, arg1, arg2);
	},

	/**
	 * Cancels an interval callback.
	 * !static cancelInterval (callback: Callback) : void;
	 */
	cancelInterval: function (node)
	{
		this._interval.remove(node);
	},

	_updateInterval: function (dt, _0, _1, callback, arg0, arg1, arg2)
	{
		this.arg0 += dt;
		if (this.arg0 < this.arg1) return true;

		this.arg0 -= this.arg1;
		return callback (arg0, arg1, arg2);
	},

	/**
	 * Creates a a time-span callback.
	 * !static span (period: number, callback: (t:number, dt:number, ...args:any) => boolean, arg0?: any, arg1?: any, arg2?: any) : Callback;
	 */
	span: function (duration, callback, arg0=null, arg1=null, arg2=null)
	{
		return this._span.add(this._updateSpan, 0, duration, callback, arg0, arg1, arg2);
	},

	/**
	 * Cancels a time-span callback.
	 * !static cancelSpan (callback: Callback) : void;
	 */
	cancelSpan: function (node)
	{
		this._span.remove(node);
	},

	_updateSpan: function (dt, _0, _1, callback, arg0, arg1, arg2)
	{
		this.arg0 += dt;
		if (this.arg0 > this.arg1) {
			dt -= this.arg0 - this.arg1;
			this.arg0 = this.arg1;
		}

		if (callback (this.arg0/this.arg1, dt, arg0, arg1, arg2) === false)
			return false;

		return this.arg0 !== this.arg1;
	}
};

export default system;
