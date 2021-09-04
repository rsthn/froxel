//@ts-check

import { Stick, Button, Scene, Container } from 'froxel';

type Drawable = import('./drawable').default;

/**
 * 	Gamepad class.
 */

declare class Gamepad
{
	/**
	 *	Contains the sticks of the gamepad.
	 */
	sticks: { [key: string]: Stick };

	/**
	 *	Contains the buttons of the gamepad.
	 */
	buttons: { [key: string]: Button };

	/**
	 *	World scene where the container is defined.
	 */
	scene: Scene;

	/**
	 *	Container where the gamepad controls will be defined.
	 */
	container: Container;

	/**
	 *	Constructs a new gamepad object.
	 *
	 * 	@param scene - Scene object holding the container index provided.
	 * 	@param containerIndex - Index of the container where the gamepad controls will be added.
	 */
	constructor (scene: Scene, containerIndex: number);

	/**
	 *	Creates a new stick control and adds it to the gamepad.
	 * 
	 * 	@param id - Identifier for the stick control.
	 * 	@param x - X-coordinate
	 * 	@param y - Y-coordinate
	 * 	@param outerDrawable - Image to use as outer circle of the stick.
	 * 	@param innerDrawable - Image to use as inner circle of the stick, should always be smaller than outerDrawable.
	 * 	@param maxRadius - Maximum radius the innerDrawable can move when the user is pressing it in some direction.
	 */
	addStick (id: string, x: number, y: number, outerDrawable: Drawable, innerDrawable: Drawable, maxRadius: number) : Stick;

	/**
	 * 	Creates a new button control and adds it to the gamepad.
	 * 
	 * 	@param id - Identifier for the button control.
	 * 	@param x - X-coordinate
	 * 	@param y - Y-coordinate
	 * 	@param unpressedDrawable - Image to use when the button is not pressed.
	 * 	@param pressedDrawable - Image to use when the button is pressed.
	 */
	addButton (id:string , x: number, y: number, unpressedDrawable: Drawable, pressedDrawable: Drawable) : Button;

	/**
	 *	Gets or sets the `visible` property of all gamepad controls.
	 * 	@param value
	 */
	visible (value?: boolean) : Gamepad;

	/**
	 * 	Sets the `visible` property of all masks to the specified value.
	 * 	@param value - Value to be used to set `visible` property of each gamepad control.
	 */
	showMasks (value: boolean) : Gamepad;
}

export default Gamepad;
