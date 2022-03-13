
import System from '../system/system.js';
import Resources from '../resources/resources.js';
import Boot from '../flow/boot.js';
import Handler from '../utils/handler.js';
import Recycler from '../utils/recycler.js';

//!class sys

const system =
{
	/**
	 * 	Indicates if the system module has already been initialized.
	 * 	!static readonly initialized: boolean;
	 */
	initialized: false,

	/**
	 * 	Screen width (available after calling `init`).
	 * 	!static readonly screenWidth: number;
	 */
	screenWidth: 0,

	/**
	 * 	Screen height (available after calling `init`).
	 * 	!static readonly screenHeight: number;
	 */
	screenHeight: 0,

	/**
	 * 	Primary renderer (available after calling `init`).
	 * 	!static readonly renderer: Canvas;
	 */
	renderer: null,

	/**
	 * 	Logical system time (mirrors the value of System.frameTime).
	 * 	!static readonly time: Number;
	 */
	time: 0,

	/**
	 * 	Logical system delta time (mirrors the value of System.frameDelta).
	 * 	!static readonly dt: Number;
	 */
	dt: 0,

	/**
	 * 	Update handler executed on every frame start.
	 * 	!static readonly update: Handler;
	 */
	update: null,

	/**
	 * 	Draw handler executed on every frame start.
	 * 	!static readonly draw: Handler;
	 */
	draw: null,

	/**
	 * 	System initialization options.
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
		preallocate: true
	},

	/**
	 * 	Initializes the system with the specified options.
	 * 	!static init (options: System.Options) : Promise<void>;
	 */
	/**
	 * 	Initializes the system using the default options.
	 * 	!static init () : Promise<void>;
	 */
	init: function (options)
	{
		return new Promise ((resolve, reject) =>
		{
			if (this.initialized)
				return resolve();

			Object.assign(this.options, options);

			Resources.init ({ pixelated: !this.antialias });
			System.init (this.options);

			System.updateQueueAdd
			({
				update: function(dt)
				{
					system.time = System.frameTime;
					system.dt = dt;

					system.update.host = dt;
					system.update.exec();
				}
			});

			System.drawQueueAdd
			({
				draw: function(g)
				{
					system.draw.host = g;
					system.draw.exec();
				}
			});

			Boot.startup(function()
			{
				System.start();

				system.screenWidth = System.screenWidth;
				system.screenHeight = System.screenHeight;
				system.renderer = System.renderer;

				system.update = Handler.Pool.alloc();
				system.draw = Handler.Pool.alloc();

				system.initialized = true;

				resolve();
			});
		});
	}
};

export default system;
