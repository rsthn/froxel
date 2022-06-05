/*
**	fxl/world.js
**
**	Copyright (c) 2016-2022, RedStar Technologies, All rights reserved.
**	https://rsthn.com/
**
**	THIS LIBRARY IS PROVIDED BY REDSTAR TECHNOLOGIES "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES,
**	INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A 
**	PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL REDSTAR TECHNOLOGIES BE LIABLE FOR ANY
**	DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT 
**	NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; 
**	OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, 
**	STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE
**	USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

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
import globals from '../system/globals.js';

//!/**
//! * 	World system allows to manage scenes, containers, viewports and display elements.
//! */

//!class world

const world =
{
	/**
	 * World scene constants.
	 *
	 * !static readonly SCENE_MAIN: number;
	 * !static readonly SCENE_HUD: number;
	 */
	SCENE_MAIN: 0,
	SCENE_HUD: 1,

	/**
	 * Default layers for the SCENE_MAIN scene.
	 *
	 * !static readonly LAYER_BG0: number;
	 * !static readonly LAYER_BG1: number;
	 * !static readonly LAYER_BG2: number;
	 * !static readonly LAYER_BG3: number;
	 * !static readonly LAYER_BG4: number;
	 * !static readonly LAYER_MAIN: number;
	 * !static readonly LAYER_FG0: number;
	 * !static readonly LAYER_FG1: number;
	 * !static readonly LAYER_FG2: number;
	 * !static readonly LAYER_FG3: number;
	 * !static readonly LAYER_FG4: number;
	 * !static readonly LAYER_MASK: number;
	 */
	LAYER_BG0: 0,
	LAYER_BG1: 1,
	LAYER_BG2: 2,
	LAYER_BG3: 3,
	LAYER_BG4: 4,
	LAYER_MAIN: 5,
	LAYER_FG0: 6,
	LAYER_FG1: 7,
	LAYER_FG2: 8,
	LAYER_FG3: 9,
	LAYER_FG4: 10,
	LAYER_MASK: 11,

	/**
	 * Default layers for the SCENE_HUD scene.
	 *
	 * !static readonly LAYER_HUD_BG0: number;
	 * !static readonly LAYER_HUD_BG1: number;
	 * !static readonly LAYER_HUD_BG2: number;
	 * !static readonly LAYER_HUD_MAIN: number;
	 * !static readonly LAYER_HUD_FG0: number;
	 * !static readonly LAYER_HUD_FG1: number;
	 * !static readonly LAYER_HUD_FG2: number;
	 */
 	LAYER_HUD_BG0: 0,
	LAYER_HUD_BG1: 1,
	LAYER_HUD_BG2: 2,
	LAYER_HUD_MAIN: 3,
	LAYER_HUD_FG0: 4,
	LAYER_HUD_FG1: 5,
	LAYER_HUD_FG2: 6,

	/**
	 *	Registered scenes.
	 */
	_scenes: [],

	/**
	 * Active scene set by `selectScene`.
	 * !static activeScene: Scene;
	 */
	activeScene: null,

	/**
	 *	Registered viewports.
	 */
	_viewports: [],

	/**
	 * Active viewport set by `selectViewport`.
	 * !static activeViewport: Viewport;
	 */
	activeViewport: null,

	/**
	 * Active container set by `selectContainer`.
	 * !static activeContainer: Container;
	 */
	activeContainer: null,

	/**
	 * Currently active group (set by `createGroup`).
	 * !static activeGroup: Group;
	 */
	activeGroup: null,

	/**
	 * Last used group (set by `endGroup`).
	 * !static lastGroup: Group;
	 */
	lastGroup: null,

	/**
	 * Last element created by `createElement`, or `createLabel`.
	 * !static lastElement: Element;
	 */
	lastElement: null,

	/**
	 * Dimensions of the world.
	 * !static readonly bounds: Bounds2;
	 */
	bounds: Bounds2.Pool.alloc(),

	/**
	 * Initializes the world with the default scenes, viewports and layers.
	 * !static init (worldWidth?: number, worldHeight?: number, divisorX?: number, divisorY?: number) : void;
	 */
	init: function (worldWidth=32768, worldHeight=32768, divisorX=null, divisorY=null)
	{
		if (divisorX === null)
			divisorX = Math.max(worldWidth, worldHeight) / 512;

		if (divisorX < 16)
			divisorX = 16;

		if (divisorY !== null && divisorY < 16)
			divisorY = 16;

		this.bounds.zero().resize(worldWidth, worldHeight);

		this.createScene(world.SCENE_MAIN, 'SCENE_MAIN');
		this.setContainer(world.LAYER_BG0, new GridContainer (worldWidth, worldHeight, divisorX, divisorY));
		this.setContainer(world.LAYER_BG1, new GridContainer (worldWidth, worldHeight, divisorX, divisorY));
		this.setContainer(world.LAYER_BG2, new GridContainer (worldWidth, worldHeight, divisorX, divisorY));
		this.setContainer(world.LAYER_BG3, new GridContainer (worldWidth, worldHeight, divisorX, divisorY));
		this.setContainer(world.LAYER_BG4, new GridContainer (worldWidth, worldHeight, divisorX, divisorY));
		this.setContainer(world.LAYER_MAIN, new GridContainer (worldWidth, worldHeight, divisorX, divisorY));
		this.setContainer(world.LAYER_FG0, new GridContainer (worldWidth, worldHeight, divisorX, divisorY));
		this.setContainer(world.LAYER_FG1, new GridContainer (worldWidth, worldHeight, divisorX, divisorY));
		this.setContainer(world.LAYER_FG2, new GridContainer (worldWidth, worldHeight, divisorX, divisorY));
		this.setContainer(world.LAYER_FG3, new GridContainer (worldWidth, worldHeight, divisorX, divisorY));
		this.setContainer(world.LAYER_FG4, new GridContainer (worldWidth, worldHeight, divisorX, divisorY));

		this.setContainer(world.LAYER_MASK, new GridContainer (worldWidth, worldHeight, divisorX, divisorY));
		this.getContainer(world.LAYER_MASK).visible(false);
		this.createViewport(0);

		this.createScene(world.SCENE_HUD, 'SCENE_HUD');
		this.setContainer(world.LAYER_HUD_BG0, new SimpleContainer (system.screenWidth, system.screenHeight));
		this.setContainer(world.LAYER_HUD_BG1, new SimpleContainer (system.screenWidth, system.screenHeight));
		this.setContainer(world.LAYER_HUD_BG2, new SimpleContainer (system.screenWidth, system.screenHeight));
		this.setContainer(world.LAYER_HUD_MAIN, new SimpleContainer (system.screenWidth, system.screenHeight));
		this.setContainer(world.LAYER_HUD_FG0, new SimpleContainer (system.screenWidth, system.screenHeight));
		this.setContainer(world.LAYER_HUD_FG1, new SimpleContainer (system.screenWidth, system.screenHeight));
		this.setContainer(world.LAYER_HUD_FG2, new SimpleContainer (system.screenWidth, system.screenHeight));
	},

	/**
	 * Creates a scene at the specified index and automatically selects it.
	 * !static createScene (index: number, name?: string) : Scene;
	 */
	createScene: function (index, name=null)
	{
		if (this._scenes[index])
		{
			System.queueRemove(this._scenes[index]);
			global.dispose(this._scenes[index]);
		}

		this._scenes[index] = new Scene(index, name);
		System.queueAdd(this._scenes[index]);

		this.selectScene(index);
		return this._scenes[index];
	},

	/**
	 * Returns the scene at the specified index (or the active scene if no index provided).
	 * !static getScene (index?: number) : Scene;
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
	 * Selects the active scene for subsequence scene-level operations.
	 * !static selectScene (index: number) : boolean;
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
	 * Creates a viewport at the specified index, attaches it to the active scene and selects it. Use this only after attaching all
	 * containers to the scene or the `maxWidth` and `maxHeight` properties of the scene will not be properly set yet.
	 *
	 * !static createViewport (index: number) : void;
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
			this.activeScene.maxWidth, this.activeScene.maxHeight
		);

		this.activeScene.setViewport(index, this._viewports[index]);

		this.selectViewport(index);
	},

	/**
	 * Returns a viewport given its index (or the active viewport if no index provided).
	 * !static getViewport (index?: number) : Viewport;
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
	 * Selects the active viewport.
	 * !static selectViewport (index: number) : boolean;
	 */
	selectViewport: function (index)
	{
		if (index < 0 || index >= this._viewports.length || !this._viewports[index])
			return false;

		this.activeViewport = this._viewports[index];
		return true;
	},

	/**
	 * Sets a container in the active scene at the specified index and returns it.
	 * !static setContainer (index: number, container: Container) : Container;
	 */
	setContainer: function (index, container)
	{
		if (this.activeScene === null)
			throw new Error ('setContainer: use `selectScene` first to select the active scene.');

		this.activeScene.setContainer (index, container);
		return container;
	},

	/**
	 * Returns the container at the specified index in the active scene (or the active container if no index provided).
	 * !static getContainer (index?: number) : Container;
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
	 * Selects the active container.
	 * !static selectContainer (index: number) : boolean;
	 */
	selectContainer: function (index)
	{
		this.activeContainer = this.getContainer(index, true);
		return this.activeContainer !== null;
	},

	/**
	 * Changes the visibility of the LAYER_MASK to enable (or disable) mask bounds rendering.
	 * @param {boolean} value
	 * @param {boolean} allMasks If set to `false` only masks having `debugBounds` to non-false will be drawn.
	 * !static showMasks (value: boolean, allMasks?: boolean) : void;
	 */
	showMasks: function (value, allMasks=true)
	{
		world.getScene(world.SCENE_MAIN).getContainer(world.LAYER_MASK).visible(value);
		globals.debugMasks = allMasks;
	},

	/**
	 * Creates a group in the active scene and selects it as the active group.
	 * !static createGroup (id?: string) : Group;
	 */
	createGroup: function(id=null)
	{
		if (this.activeScene === null)
			throw new Error ('createGroup: use selectScene first to select the active scene.');

		this.activeGroup = Group.Pool.alloc(id);
		this.activeScene.addGroup(this.activeGroup);

		return this.activeGroup;
	},

	/**
	 * If coordinates are provided the group will be translated to the specified position. It will then set `lastGroup`, and nullify `activeGroup`.
	 * !static endGroup (x?: number, y?: number) : Group;
	 */
	endGroup: function(x=null, y=null)
	{
		if (x !== null && y !== null)
			this.activeGroup.translate(x, y);

		this.lastGroup = this.activeGroup;
		this.activeGroup = null;

		return this.lastGroup.sync();
	},

	/**
	 * Creates a named Element and adds it to the specified container (or the active one) in the active scene.
	 * If a group is active, the element will be attached to the group.
	 * 
	 * !static createElement (id: string, x: number, y: number, img?: Drawable, containerIndex?: number) : Element;
	 */
	/**
	 * Creates an Element and adds it to the specified container (or the active one) in the active scene.
	 * If a group is active, the element will be attached to the group.
	 * 
	 * !static createElement (x: number, y: number, img?: Drawable, containerIndex?: number) : Element;
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

		let elem = Element.Pool.alloc(x, y, img);
		container.add(elem.setId(id));

		if (this.activeGroup !== null)
			this.activeGroup.addChild(elem);

		this.lastElement = elem;
		return elem;
	},

	/**
	 * Creates a named mask and adds it to the specified container or LAYER_MASK if none provided.
	 * If a group is active, the mask will be attached to the group.
	 * 
	 * !static createMask (id: string, type: number, x?: number, y?: number, width?: number, height?: number, containerIndex?: number) : Mask;
	 */
	createMask: function (id, type, x=null, y=null, width=null, height=null, containerIndex=null)
	{
		let container = this.getContainer(containerIndex || world.LAYER_MASK);

		if (x === null)
		{
			if (this.activeGroup === null)
				throw new Error ('createMask: create a group first to use default masks.');

			x = this.activeGroup.bounds.x1;
			y = this.activeGroup.bounds.y1;
			width = this.activeGroup.bounds.width();
			height = this.activeGroup.bounds.height();
		}

		let mask = Mask.Pool.alloc(type, x, y, width, height);
		container.add(mask.setId(id));

		if (this.activeGroup !== null)
			this.activeGroup.addChild(mask);

		return mask;
	},

	/**
	 * Creates a named label element and adds it to the specified container (or the active one) in the active scene.
	 * If a group is active, the label element will be attached to the group.
	 * 
	 * !static createLabel (id: string, x: number, y: number, font: object, text: string, containerIndex?: number) : Label;
	 */
	/**
	 * Creates a label element and adds it to the specified container (or the active one) in the active scene.
	 * If a group is active, the label element will be attached to the group.
	 * 
	 * !static createLabel (x: number, y: number, font: object, text: string, containerIndex?: number) : Label;
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

		let elem = Label.Pool.alloc(x, y, font, text);
		container.add(elem.setId(id));

		if (this.activeGroup !== null)
			this.activeGroup.addChild(elem);

		this.lastElement = elem;
		return elem;
	},

	/**
	 * Creates a new updater, attaches it to the active scene and returns it.
	 * !static createUpdater (update?: (elem: Element, dt: number, context: object) => boolean, context?: object) : Updater;
	 */
	createUpdater: function (update=null, context=null)
	{
		if (this.activeScene === null)
			throw new Error ('createUpdater: use selectScene first to select the active scene.');

		return new Updater (this.activeScene, update, context);
	}
};

//!/class

export default world;
