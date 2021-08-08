
import Gamepad from './gamepad.js';
import world from './world.js';

/*
**	Input system allows to create gamepads.
*/

const input =
{
	/*
	**	Registered gamepads.
	*/
	_gamepads: [],

	/*
	**	Currently active gamepad.
	*/
	activeGamepad: null,

	/*
	**	Creates a gamepad object and attaches it to the active scene in the specified layer (defaults to world.LAYER_HUD_FG).
	*/
	createGamepad: function (index, layerIndex=null)
	{
		if (world.activeScene === null)
			throw new Error ('input.createGamepad: use world.selectScene first to select the active scene.');

		this._gamepads[index] = new Gamepad (world.activeScene, layerIndex !== null ? layerIndex : world.LAYER_HUD_FG);

		return this;
	},

	/*
	**	Returns a gamepad given its index.
	*/
	getGamepad: function (index)
	{
		if (index < 0 || index >= this._gamepads.length)
			return null;

		return this._gamepads[index] || null;
	},

	/*
	**	Selects the active gamepad for subsequent gamepad-level operations.
	*/
	selectGamepad: function (index)
	{
		this.activeGamepad = this.getGamepad(index);
		return true;
	},

	/*
	**	Sets the value of `debugBounds` on the specified gamepad. If index `null` is provided, all gamepads will be modified.
	*/
	debugGamepad: function (index, value)
	{
		if (index === null)
		{
			for (let i = 0; i < this._gamepads.length; i++)
			{
				if (!this._gamepads[i])
					continue;

				this.debugGamepad(i, value);
			}

			return;
		}

		this._gamepads[index].debug(value);
	},

	/*
	**	Adds an stick control to the active gamepad.
	*/
	stick: function (id, x, y, outerDrawable, innerDrawable, maxRadius=0)
	{
		if (this.activeGamepad === null)
			throw new Error ('input.addStick: use input.selectGamepad first to select the active gamepad.');

		return this.activeGamepad.addStick (id, x, y, outerDrawable, innerDrawable, maxRadius);
	},

	/*
	**	Adds a button control to the active gamepad.
	*/
	button: function (id, x, y, unpressedDrawable, pressedDrawable=null)
	{
		if (this.activeGamepad === null)
			throw new Error ('input.addButton: use input.selectGamepad first to select the active gamepad.');

		return this.activeGamepad.addButton (id, x, y, unpressedDrawable, pressedDrawable);
	}
};

export default input;
