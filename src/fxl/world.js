
import System from '../system/system.js';
import Scene from '../flow/scene.js';
import Viewport from '../flow/viewport.js';
import Bounds2 from '../math/bounds2.js';
import GridContainer from '../flow/grid-container.js';
import Element from '../flow/element.js';
import Label from '../flow/label.js';
import Group from '../flow/group.js';
import Updater from '../flow/updater.js';
import SimpleContainer from '../flow/simple-container.js';
import Mask from '../flow/mask.js';

import system from './system.js';

/**
 *	World system allows to manage scenes
 containers, viewports and display elements.
 */

const world =
{
	/**
	 *	Built-in scenes.
	 */
	SCENE_MAIN: 0,
	SCENE_HUD: 1,

	/**
	 *	Default layers for the SCENE_MAIN scene.
	 */
	LAYER_BG0: 0,
	LAYER_BG1: 1,
	LAYER_MAIN: 2,
	LAYER_FG0: 3,
	LAYER_FG1: 4,
	LAYER_FG2: 5,
	LAYER_MASK: 6,

	/**
	 *	Default layers for the SCENE_HUD scene.
	 */
	LAYER_HUD_BG: 0,
	LAYER_HUD_FG: 1,

	/**
	 *	Scenes and active scene.
	 */
	_scenes: [],
	activeScene: null,

	/**
	 *	Viewports and active viewport.
	 */
	_viewports: [],
	activeViewport: null,

	/**
	 *	Active container.
	 */
	activeContainer: null,

	/**
	 *	Active and last ended group.
	 */
	activeGroup: null,
	lastGroup: null,

	/**
	 *	Last element created.
	 */
	lastElement: null,

	/**
	 *	Dimensions of the world.
	 */
	bounds: Bounds2.calloc(),

	/**
	 * 	Initializes the world with the default scenes, viewports and layers.
	 */
	init: function (worldWidth=32768, worldHeight=32768, divisor=null)
	{
		if (divisor === null)
			divisor = Math.max(worldWidth, worldHeight) / 512;

		if (divisor < 32)
			divisor = 32;

		this.bounds.zero().resize(worldWidth, worldHeight);

		this.createScene(world.SCENE_MAIN);
		this.setContainer(world.LAYER_BG0, new GridContainer (worldWidth, worldHeight, divisor));
		this.setContainer(world.LAYER_BG1, new GridContainer (worldWidth, worldHeight, divisor));
		this.setContainer(world.LAYER_MAIN, new GridContainer (worldWidth, worldHeight, divisor));
		this.setContainer(world.LAYER_FG0, new GridContainer (worldWidth, worldHeight, divisor));
		this.setContainer(world.LAYER_FG1, new GridContainer (worldWidth, worldHeight, divisor));
		this.setContainer(world.LAYER_FG2, new GridContainer (worldWidth, worldHeight, divisor));

		this.setContainer(world.LAYER_MASK, new GridContainer (worldWidth, worldHeight, divisor));
		this.getContainer(world.LAYER_MASK).visible(false);
		this.createViewport(0);

		this.createScene(world.SCENE_HUD);
		this.setContainer(world.LAYER_HUD_BG, new SimpleContainer (system.screenWidth, system.screenHeight));
		this.setContainer(world.LAYER_HUD_FG, new SimpleContainer (system.screenWidth, system.screenHeight));
	},

	/**
	 * 	Creates a scene for the system at the specified index and automatically selects it.
	 */
	createScene: function (index)
	{
		if (this._scenes[index])
		{
			System.queueRemove(this._scenes[index]);
			global.dispose(this._scenes[index]);
		}

		this._scenes[index] = new Scene();
		System.queueAdd(this._scenes[index]);

		this.selectScene(index);
	},

	/**
	 * 	Returns the scene at the specified index (or the active scene).
	 */
	getScene: function (index=null)
	{
		if (index === null)
			return this.activeScene;

		if (index < 0 || index >= this._scenes.length)
			return null;

		return this._scenes[index];
	},

	/**
	 *	Selects the active scene for subsequence scene-level operations.
	 */
	selectScene: function (index)
	{
		if (index < 0 || index >= this._scenes.length || !this._scenes[index])
			return false;

		this.activeScene = this._scenes[index];
		this.activeContainer = null;

		return true;
	},

	/**
	 *	Creates a viewport at the specified index, attaches it to the active scene and selects it. Use this after attaching all containers
	 *	to the scene or the maxWidth and maxHeight properties of the scene will not be properly set yet.
	 */
	createViewport: function (index)
	{
		if (this.activeScene === null)
			throw new Error ('createViewport: use `selectScene` first to select the active scene.');

		if (this._viewports[index])
		{
			global.dispose(this._viewports[index]);
			this.activeScene.setViewport(index, null);
		}

		this._viewports[index] = new Viewport(
			0, 0,
			system.screenWidth, system.screenHeight,
			this.activeScene.maxWidth, this.activeScene.maxHeight,
			0, 0
		);

		this.activeScene.setViewport(index, this._viewports[index]);

		this.selectViewport(index);
	},

	/**
	 *	Returns a viewport given its index (or the active viewport).
	 */
	getViewport: function (index=null)
	{
		if (index === null)
			return this.activeViewport;

		if (index < 0 || index >= this._viewports.length)
			return null;

		return this._viewports[index];
	},

	/**
	 *	Selects the active viewport for subsequence viewport-level operations.
	 */
	selectViewport: function (index)
	{
		if (index < 0 || index >= this._viewports.length || !this._viewports[index])
			return false;

		this.activeViewport = this._viewports[index];
		return true;
	},

	/**
	 *	Sets a container in the active scene and returns it.
	 */
	setContainer: function (index, container)
	{
		if (this.activeScene === null)
			throw new Error ('setContainer: use `selectScene` first to select the active scene.');

		this.activeScene.setContainer (index, container);
		return container;
	},

	/**
	 *	Returns the container of the active scene at the specified index (or the active container).
	 */
	getContainer: function (index=null, throwErrors=false)
	{
		if (index === null)
		{
			if (this.activeContainer === null && throwErrors)
				throw new Error ('getContainer: container index not specified and default container not set.');

			return this.activeContainer;
		}

		if (this.activeScene === null)
			throw new Error ('getContainer: use `selectScene` first to select the active scene.');

		let container = this.activeScene.getContainer(index);
		if (container === null && throwErrors)
			throw new Error ('getContainer: container index out of bounds.');

		return container;
	},

	/**
	 *	Selects the active container.
	 */
	selectContainer: function (index)
	{
		this.activeContainer = this.getContainer(index, true);
		return this.activeContainer !== null;
	},

	/**
	 *	Creates a group in the active scene and selects it as the active group.
	 */
	createGroup: function(id=null)
	{
		if (this.activeScene === null)
			throw new Error ('createGroup: use selectScene first to select the active scene.');

		this.activeGroup = Group.Pool.alloc().init(id);
		this.activeScene.addGroup (this.activeGroup);

		return this.activeGroup;
	},

	/**
	 *	Stores the activeGroup in `lastGroup` property, then nullifies activeGroup. If the coordinate parameters are provided the group will be translated to
	 *	the specified position first.
	 */
	endGroup: function(x=null, y=null)
	{
		if (x !== null)
			this.activeGroup.translate(x, y);

		this.lastGroup = this.activeGroup;
		this.activeGroup = null;

		return this.lastGroup.sync();
	},

	/**
	 *	Creates an Element with the given position and image, and adds it to the specified container (or the default one) in the
	 *	active scene. If a group is active, the element will be attached to the group.
	 */
	createElement: function (id, x, y, img=null, containerIndex=null)
	{
		if (typeof(id) !== 'string')
		{
			containerIndex = img;
			img = y;
			y = x;
			x = id;
			id = null;
		}

		let container = this.getContainer(containerIndex);

		let elem = Element.Pool.alloc().init (x, y, img);
		container.add(elem.setId(id));

		if (this.activeGroup !== null)
			this.activeGroup.addChild(elem);

		this.lastElement = elem;
		return elem;
	},

	/**
	 *	Creates a default element mask for the active group.
	 */
	createMask: function (id, type=null, x=null, y=null, width=null, height=null, containerIndex=null)
	{
		if (typeof(id) !== 'string')
		{
			containerIndex = height;
			height = width;
			width = y;
			y = x;
			x = type;
			type = id;
			id = null;
		}

		let container = this.getContainer(containerIndex || world.LAYER_MASK);

		if (x === null)
		{
			if (this.activeGroup === null)
				throw new Error ('createMask: create a group first to use automatic masks');

			x = this.activeGroup.bounds.x1;
			y = this.activeGroup.bounds.y1;
			width = this.activeGroup.bounds.width();
			height = this.activeGroup.bounds.height();
		}

		let mask = Mask.Pool.alloc().init (type, x, y, width, height);
		container.add(mask.setId(id));

		if (this.activeGroup !== null)
			this.activeGroup.addChild(mask);

		return mask;
	},

	/**
	 *	Creates a text element with the given position and text, and adds it to the specified container (or the default one) in the
	 *	active scene. If a group is active, the element will be attached to the group.
	 */
	createLabel: function (id, x, y, font, text, containerIndex=null)
	{
		if (typeof(id) !== 'string')
		{
			containerIndex = text;
			text = font;
			font = y;
			y = x;
			x = id;
			id = null;
		}

		let container = this.getContainer(containerIndex);

		let elem = Label.Pool.alloc().init (x, y, font, text);
		container.add(elem.setId(id));

		if (this.activeGroup !== null)
			this.activeGroup.addChild(elem);

		this.lastElement = elem;
		return elem;
	},

	/**
	 *	Creates a new updater, attaches it to the active scene and returns it.
	 */
	createUpdater: function (update=null, context=null)
	{
		if (this.activeScene === null)
			throw new Error ('createUpdater: use selectScene first to select the active scene.');

		return new Updater (this.activeScene, update, context);
	}
};

export default world;
