//@ts-check

import { Stick, Button } from 'froxel';
import Gamepad from './gamepad.js';

type Drawable = import('./drawable').default;

/*
**	Input system allows to create gamepads.
*/

declare class input
{
	/**
	 * 	Currently active gamepad.
	 */
	static activeGamepad: Gamepad|null;

	/**
	 * 	Creates a gamepad object and attaches it to the active scene in the specified layer (defaults to LAYER_HUD_FG).
	 *
	 * 	@param index
	 * 	@param layerIndex
	 */
	static createGamepad (index: number, layerIndex?: number) : void;

	/**
	 * 	Returns a gamepad given its index.
	 *
	 * 	@param index
	 */
	static getGamepad (index: number) : Gamepad;

	/**
	 * 	Selects the active gamepad for subsequent gamepad-level operations.
	 *
	 * 	@param index 
	 */
	static selectGamepad (index: number) : boolean;

	/**
	 * 	Sets the value of `debugBounds` on the specified gamepad. If index `null` is provided, all gamepads will be modified.
	 *
	 *	@param index
	 *	@param value
	 */
	static debugGamepad (index: number, value: boolean) : void;

	/**
	 * 	Adds an stick control to the active gamepad.
	 *
	 * 	@param id - Identifier for the stick control.
	 * 	@param x - X-coordinate
	 * 	@param y - Y-coordinate
	 * 	@param outerDrawable - Image to use as outer circle of the stick.
	 * 	@param innerDrawable - Image to use as inner circle of the stick, should always be smaller than outerDrawable.
	 * 	@param maxRadius - Maximum radius the innerDrawable can move when the user is pressing it in some direction.
	 */
	static stick (id: string, x: number, y: number, outerDrawable: Drawable, innerDrawable: Drawable, maxRadius?: number) : Stick;

	/**
	 * 	Adds a button control to the active gamepad.
	 *
	 * 	@param id - Identifier for the button control.
	 * 	@param x - X-coordinate
	 * 	@param y - Y-coordinate
	 * 	@param unpressedDrawable - Image to use when the button is not pressed.
	 * 	@param pressedDrawable - Image to use when the button is pressed.
	 */
	static button (id: string, x: number, y: number, unpressedDrawable: Drawable, pressedDrawable?: Drawable) : Button;
}

export default input;
