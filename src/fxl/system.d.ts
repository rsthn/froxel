//@ts-check

import { Canvas } from 'froxel';

export type Orientation = 'default' | 'landscape' | 'portrait' | 'automatic';

/**
 * 	System initialization options.
 */
declare type Options =
{
	/**
	 * 	Tells the system to enable WebGL support.
	 * 	@default true
	 */
	gl?: boolean;

	/**
	 *	Indicates if on-screen logging should be enabled.
	 *	@default false
	 */
	log?: boolean,

	/**
	 *	Enables or disables antialised canvas. Set to `false` when pixel-perfect is desired.
	 *	@default false
	 */
	antialias?: boolean;

	/**
	 *	Background of the system canvas.
	 *	@default "#000"
	 */
	background?: string;

	/**
	 *	Desired orientaton of the display.
	 *	@default "automatic"
	 */
	orientation?: Orientation;

	/**
	 *	Desired display width. When not specified (null) the maximum screen width to maintain the aspect ratio will be used.
	 *	@default null
	 */
	screenWidth?: number;

	/**
	 *	Desired display height. When not specified (null) the maximum screen height to maintain the aspect ratio will be used.
	 *	@default null
	 */
	screenHeight?: number;

	/**
	 *	Target frames per second (FPS). Used to determine delay between frames.
	 *	@default 144
	 */
	fps?: number;

	/**
	 *	Minimum allowed frames per second (FPS). If system FPS drops below this value, the `frameDelta` property of System will be truncated to 1/minFps.
	 *	@default 10
	 */
	minFps?: number;
};

/**
 *	System module.
 */
declare class system
{
	/**
	 *	Indicates if the system module has already been initialized.
	 */
	static initialized: boolean;

	/**
	 *	Screen width (available after calling `init`).
	 */
	static screenWidth: number;

	/**
	 *	Screen height (available after calling `init`).
	 */
	static screenHeight: number;

	/**
	 *	Primary renderer (available after calling `init`).
	 */
	static renderer: Canvas;

	/*
	**	Logical system time (mirrors the value of System.frameTime).
	*/
	static time: Number;

	/*
	**	Logical system delta time (mirrors the value of System.frameDelta).
	*/
	static dt: Number;

	/**
	 *	Initializes the system with the specified options.
	 */
	static init (options: Options) : Promise<any>;

	/**
	 *	Initializes the system using the default options.
	 */
	static init () : Promise<any>;
}

export default system;
