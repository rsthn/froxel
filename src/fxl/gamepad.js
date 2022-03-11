
import { Class } from 'rinn';
import Stick from '../flow/stick.js';
import Button from '../flow/button.js';

/*
**	Gamepads are input objects that allow sticks and buttons to be added to it.
*/

const Gamepad = Class.extend
({
	/*
	**	Contains the sticks of the gamepad.
	*/
	sticks: null,

	/*
	**	Contains the buttons of the gamepad.
	*/
	buttons: null,

	/*
	**	World scene where the container is defined.
	*/
	scene: null,

	/*
	**	Container where the gamepad controls will be defined.
	*/
	container: null,

	/*
	**	Indicates the visible state of the gamepad.
	*/
	_visible: true,

	/*
	**	Constructs a new gamepad object.
	*/
	__ctor: function(scene, containerIndex)
	{
		this.sticks = { };
		this.buttons = { };

		this.scene = scene;

		this.layer = scene.getContainer(containerIndex);
		this.layer.depthFlag(false);
	},

	/*
	**	Creates a new stick control and adds it to the gamepad.
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

	/*
	**	Creates a new button control and adds it to the gamepad.
	*/
	addButton: function (id, x, y, unpressedDrawable, pressedDrawable=null)
	{
		let button = new Button (this.layer, x, y, unpressedDrawable, pressedDrawable);

		this.buttons[id] = button;
		this[id] = button;

		return button;
	},

	/*
	**	Gets or sets the `visible` property of all gamepad controls.
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

	/*
	**	Sets the `visible` property of all masks to the specified value.
	*/
	showMasks: function (value)
	{
		for (let i in this.sticks)
			this.sticks[i].hitbox.visible(value);

		for (let i in this.buttons)
			this.buttons[i].hitbox.visible(value);

		return this;
	}
});

export default Gamepad;
