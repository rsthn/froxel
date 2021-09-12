
import System from '../system/system.js';
import Resources from '../resources/resources.js';
import Boot from '../flow/boot.js';
import Log from '../system/log.js';

const system =
{
	/**
	 * 	Indicates if the system module has already been initialized.
	 */
	initialized: false,

	/**
	 * 	Screen width (available after calling `init`).
	 */
	screenWidth: 0,

	/**
	 * 	Screen height (available after calling `init`).
	 */
	screenHeight: 0,

	/**
	 * 	Main display buffer (available after calling `init`).
	 */
	renderer: null,

	/*
	**	Logical system time (mirrors the value of System.frameTime).
	*/
	time: 0,

	/*
	**	Logical system delta time (mirrors the value of System.frameDelta).
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
