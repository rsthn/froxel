
import { Class } from '@rsthn/rin';
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
	**	Constructs a new gamepad object.
	*/
	__ctor: function(scene, containerIndex)
	{
		this.sticks = { };
		this.buttons = { };

		this.scene = scene;

		this.layer = scene.getContainer(containerIndex);
		this.layer.depthTest(false);
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
	**	Sets the `debugBounds` property of all gamepad controls to the specified value.
	*/
	debug: function (value)
	{
		for (let i in this.sticks)
			this.sticks[i].hitbox.debugBounds = value;

		for (let i in this.buttons)
			this.buttons[i].hitbox.debugBounds = value;
	}
});

export default Gamepad;
