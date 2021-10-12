
import System from '../system/system.js';
import Resources from '../resources/resources.js';
import Boot from '../flow/boot.js';
import Log from '../system/log.js';

//!namespace sys

//:type Orientation = 'default' | 'landscape' | 'portrait' | 'automatic';

//!type Options =

	/**
	 * 	Tells the system to enable WebGL support.
	 * 	@default true
	 * 	!gl?: boolean;
	 */

	/**
	 *	Indicates if on-screen logging should be enabled.
	 *	@default false
	 *	!log?: boolean,
	 */

	/**
	 *	Enables or disables antialised canvas. Set to `false` when pixel-perfect is desired.
	 *	@default false
	 *	!antialias?: boolean;
	 */

	/**
	 *	Background of the system canvas.
	 *	@default "#000"
	 *	!background?: string;
	 */

	/**
	 *	Desired orientaton of the display.
	 *	@default "automatic"
	 *	!orientation?: fxl.sys.Orientation;
	 */

	/**
	 *	Desired display width. When not specified (null) the maximum screen width to maintain the aspect ratio will be used.
	 *	@default null
	 *	!screenWidth?: number;
	 */

	/**
	 *	Desired display height. When not specified (null) the maximum screen height to maintain the aspect ratio will be used.
	 *	@default null
	 *	!screenHeight?: number;
	 */

	/**
	 *	Target frames per second (FPS). Used to determine delay between frames.
	 *	@default 144
	 *	!fps?: number;
	 */

	/**
	 *	Minimum allowed frames per second (FPS). If system FPS drops below this value, the `frameDelta` property of System will be truncated to 1/minFps.
	 *	@default 10
	 *	!minFps?: number;
	 */

//!/type
//!/namespace

//!class sys

const system =
{
	/**
	 * 	Indicates if the system module has already been initialized.
	 * 	!initialized: boolean;
	 */
	initialized: false,

	/**
	 * 	Screen width (available after calling `init`).
	 * 	!screenWidth: number;
	 */
	screenWidth: 0,

	/**
	 * 	Screen height (available after calling `init`).
	 * 	!screenHeight: number;
	 */
	screenHeight: 0,

	/**
	 * 	Primary renderer (available after calling `init`).
	 * 	!renderer: Canvas;
	 */
	renderer: null,

	/**
	 * 	Logical system time (mirrors the value of System.frameTime).
	 * 	!time: Number;
	 */
	time: 0,

	/**
	 * 	Logical system delta time (mirrors the value of System.frameDelta).
	 * 	!dt: Number;
	 */
	dt: 0,

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
		minFps: 10
	},

	/**
	 * 	Initializes the system with the specified options.
	 * 	!init (options: sys.Options) : Promise<any>;
	 */
	/**
	 * 	Initializes the system using the default options.
	 * 	!init () : Promise<any>;
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

			System.updateQueueAdd({
				update: function(dt) {
					system.time = System.frameTime;
					system.dt = dt;
				}
			});

			Boot.startup(function()
			{
				System.start();

				system.screenWidth = System.screenWidth;
				system.screenHeight = System.screenHeight;
				system.renderer = System.renderer;

				system.initialized = true;

				if (system.options.log === true)
					Log.enable();

				resolve();
			});
		});
	}
};

export default system;
