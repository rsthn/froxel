
import { Class } from 'rinn';
import Stick from '../flow/stick.js';
import Button from '../flow/button.js';

//![import '../flow/stick.js']
//![import '../flow/button.js']

/**
 * Gamepads are input objects that allow sticks and buttons to be added to it.
 */

//!class Gamepad

const Gamepad = Class.extend
({
	/**
	 * Contains the sticks of the gamepad.
	 * !readonly sticks: { \[key:string\]: Stick };
	 */
	sticks: null,

	/**
	 * Contains the buttons of the gamepad.
	 * !readonly buttons: { \[key:string\]: Button };
	 */
	buttons: null,

	/**
	 * World scene where the container is defined.
	 */
	scene: null,

	/**
	 * Container where the gamepad controls will be created.
	 */
	container: null,

	/**
	 * Indicates the visible state of the gamepad.
	 */
	_visible: true,

	/**
	 * Constructs a new gamepad object.
	 * !constructor (scene: Scene, containerIndex: number);
	 */
	__ctor: function(scene, containerIndex)
	{
		this.sticks = { };
		this.buttons = { };

		this.scene = scene;
		this.layer = scene.getContainer(containerIndex);
	},

	/**
	 * Creates a new stick control and adds it to the gamepad.
	 * !addStick (id: string, x: number, y: number, outerDrawable: Drawable, innerDrawable: Drawable, maxRadius?: number|0) : Stick;
	 */
	addStick: function (id, x, y, outerDrawable, innerDrawable, maxRadius=0)
	{
		if (maxRadius == 0)
			maxRadius = outerDrawable.width - innerDrawable.width;

		let stick = new Stick (this.layer, x, y, maxRadius, outerDrawable, innerDrawable);

		this.sticks[id] = stick;
		this[id] = stick;

		return stick;
	},

	/**
	 * Creates a new button control and adds it to the gamepad.
	 * !addButton (id: string, x: number, y: number, unpressedDrawable?: Drawable|null, pressedDrawable?: Drawable|null) : Button;
	 */
	addButton: function (id, x, y, unpressedDrawable=null, pressedDrawable=null)
	{
		let button = new Button (this.layer, x, y, unpressedDrawable, pressedDrawable);

		this.buttons[id] = button;
		this[id] = button;

		return button;
	},

	/**
	 * Returns the `visible` property of the gamepad.
	 * !visible() : boolean;
	 */
	/**
	 * Sets the `visible` property of the gamepad.
	 * !visible (value: boolean) : Gamepad;
	 */
	visible: function (value=null)
	{
		if (value === null)
			return this._visible;

		this._visible = value;

		for (let i in this.sticks)
			this.sticks[i].visible(value);

		for (let i in this.buttons)
			this.buttons[i].visible(value);

		return this;
	},

	/**
	 * Sets the `visible` property of all masks to the specified value.
	 * !showMasks (value: boolean) : Gamepad;
	 */
	showMasks: function (value)
	{
		for (let i in this.sticks)
			this.sticks[i].hitbox.visible(value, true);

		for (let i in this.buttons)
			this.buttons[i].hitbox.visible(value, true);

		return this;
	}
});

//!/class

export default Gamepad;
