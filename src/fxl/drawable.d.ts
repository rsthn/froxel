//@ts-check

import { Canvas } from 'froxel';

/**
 * 	Drawable.
 */
declare class Drawable
{
	/**
	 *	Width of the drawable.
	 */
	width: number;

	/**
	 *	height of the drawable.
	 */
	height: number;

	/**
	 *	Draws the drawable to the specified canvas.
	 *	@default true
	 */
	draw (g: Canvas) : void;

	/**
	 *	Returns the underlying drawable.
	 */
	getDrawable () : Drawable;
}

export default Drawable;
