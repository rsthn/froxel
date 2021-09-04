//@ts-check

import { Scene, Viewport, Bounds2, Container, Label, Group, Updater, Mask } from 'froxel';

type Drawable = import('./drawable').default;

/**
 *	World system allows to manage scenes, containers, viewports and display elements.
 */

declare class world
{
	/**
	 *	Built-in scenes.
	 */
	static readonly SCENE_MAIN: number;
	static readonly SCENE_HUD: number;

	/**
	 *	Default layers for the SCENE_MAIN scene.
	 */
	static readonly LAYER_BG0: number;
	static readonly LAYER_BG1: number;
	static readonly LAYER_BG2: number;
	static readonly LAYER_MAIN: number;
	static readonly LAYER_FG0: number;
	static readonly LAYER_FG1: number;
	static readonly LAYER_FG2: number;
	static readonly LAYER_MASK: number;

	/**
	 *	Default layers for the SCENE_HUD scene.
	 */
	static readonly LAYER_HUD_BG: number;
	static readonly LAYER_HUD_FG: number;

	/**
	 *	Active scene.
	 */
	static activeScene: Scene;

	/**
	 *	Active viewport.
	 */
	static activeViewport: Viewport;

	/**
	 *	Active container.
	 */
	static activeContainer: Container;

	/**
	 *	Active group.
	 */
	static activeGroup: Group;

	/**
	 * 	Last ended group.
	 */
	static lastGroup: Group;

	/**
	 * 	Last element created.
	 */
	static lastElement: Element;

	/**
	 *	Dimensions of the world.
	 */
	static bounds: Bounds2;

	/**
	 * 	Initializes the world with the default scenes, viewports and layers.
	 *
	 * 	@param worldWidth - Width of the world.
	 * 	@param worldHeight - Height of the world.
	 * 	@param divisor - Divisor to calculate number of grid slots.
	 */
	static init (worldWidth?: number, worldHeight?: number, divisor?: number) : void;

	/**
	 * 	Creates a scene for the system at the specified index and automatically selects it.
	 *
	 * 	@param index
	 */
	 static createScene (index: number) : void;

	/**
	 * 	Returns the active scene.
	 */
	static getScene () : Scene|null;

	/**
	 * 	Returns the scene at the specified index.
	 * 
	 * 	@param index
	 */
	static getScene (index: number) : Scene|null;

	/**
	 *	Selects the active scene for subsequence scene-level operations.
	 *
	 *	@param index
	 */
	static selectScene (index: number) : boolean;

	/**
	 *	Creates a viewport at the specified index, attaches it to the active scene and selects it. Use this after attaching all containers
	 *	to the scene or the maxWidth and maxHeight properties of the scene will not be properly set yet.
	 *
	 * 	@param index
	 */
	static createViewport (index: number) : void;

	/**
	 *	Returns the active viewport.
	 */
	static getViewport () : Viewport|null;

	/**
	 *	Returns a viewport given its index.
	 *
	 * 	@param index
	 */
	static getViewport (index: number) : Viewport|null;

	/**
	 *	Selects the active viewport for subsequence viewport-level operations.
	 *
	 * 	@param index - Index of the viewport to select.
	 */
	static selectViewport (index: number) : boolean;

	/**
	 *	Sets a container in the active scene and returns it.
	 *
	 * 	@param index - Index of the container within the active scene.
	 * 	@param container - Container object (see {@link GridContainer}, {@link SimpleContainer}).
	 */
	static setContainer (index: number, container: Container) : Container;

	/**
	 *	Returns the active container.
	 */
	static getContainer () : Container;

	/**
	 *	Returns the container of the active scene at the specified index.
	 *
	 * 	@param index - Index of the container within the active scene.
	 * 	@param throwErrors - Indicates if errors should be ignored (null will be returned) or if exceptions should be thrown.
	 */
	static getContainer (index: number, throwErrors?: boolean) : Container;

	/**
	 *	Selects the active container.
	 *
	 * 	@param index - Index of the container within the active scene.
	 */
	static selectContainer (index: number) : boolean;

	/**
	 *	Creates a group in the active scene and selects it as the active group.
	 *
	 * 	@param id - Identifier for the group.
	 */
	static createGroup (id?: string) : Group;

	/**
	 *	Stores the activeGroup in `lastGroup` property, then nullifies activeGroup. If the coordinate parameters are provided the group will be translated to
	 *	the specified position first.
	 *
	 * 	@param x
	 * 	@param y
	 */
	static endGroup(x?: number, y?: number) : Group;

	/**
	 *	Creates an Element with the given position and image, and adds it to the specified container (or the default one) in the
	 *	active scene. If a group is active, the element will be attached to the group.
	 *
	 * 	@param x - X coordinate
	 * 	@param y - Y coordinate
	 * 	@param img - Drawable object
	 * 	@param containerIndex - Index of the target container within the active scene.
	 */
	static createElement (x: number, y: number, img?: Drawable, containerIndex?: number) : Element;

	/**
	 *	Creates an Element with the given position and image, and adds it to the specified container (or the default one) in the
	 *	active scene. If a group is active, the element will be attached to the group.
	 *
	 * 	@param id - Identifier for the element.
	 * 	@param x - X coordinate
	 * 	@param y - Y coordinate
	 * 	@param img - Drawable object
	 * 	@param containerIndex - Index of the target container within the active scene.
	 */
	static createElement (id: string, x: number, y: number, img?: Drawable, containerIndex?: number) : Element;

	/**
	 *	Creates a default element mask for the active group.
	 *
	 * 	@param type - Type of the mask.
	 */
	static createMask (type: number) : Mask;

	/**
	 *	Creates a default element mask for the active group.
	 *
	 * 	@param id - Identifier for the mask.
	 * 	@param type - Type of the mask.
	 */
	static createMask (id: string, type: number) : Mask;

	/**
	 *	Creates an element mask at the given position. Adds it to the specified container (or to LAYER_MASK if none specified) in the
	 *	active scene. If a group is active, the element will be attached to the group.
	 *
	 * 	@param type - Type of the mask.
	 * 	@param x - X coordinate
	 * 	@param y - Y coordinate
	 * 	@param width - Width of the mask.
	 * 	@param height - Height of the mask.
	 * 	@param containerIndex - Index of the target container within the active scene.
	 */
	static createMask (type: number, x: number, y: number, width: number, height: number, containerIndex?: number) : Mask;

	/**
	 *	Creates an element mask at the given position. Adds it to the specified container (or to LAYER_MASK if none specified) in the
	 *	active scene. If a group is active, the element will be attached to the group.
	 *
	 * 	@param id - Identifier for the mask.
	 * 	@param type - Type of the mask.
	 * 	@param x - X coordinate
	 * 	@param y - Y coordinate
	 * 	@param width - Width of the mask.
	 * 	@param height - Height of the mask.
	 * 	@param containerIndex - Index of the target container within the active scene.
	 */
	static createMask (id: string, type: number, x: number, y: number, width: number, height: number, containerIndex?: number) : Mask;

	/**
	 *	Creates a text element with the given position and text, and adds it to the specified container (or the default one) in the
	 *	active scene. If a group is active, the element will be attached to the group.
	 *
	 * 	@param x
	 * 	@param y
	 * 	@param font - Spritefont resource.
	 * 	@param text
	 * 	@param containerIndex - Index of the target container within the active scene.
	 */
	static createLabel (x: number, y: number, font: any, text: string, containerIndex?: number) : Label;

	/**
	 *	Creates a text element with the given position and text, and adds it to the specified container (or the default one) in the
	 *	active scene. If a group is active, the element will be attached to the group.
	 *
	 * 	@param id - Identifier for the text element.
	 * 	@param x
	 * 	@param y
	 * 	@param font - Spritefont resource.
	 * 	@param text
	 * 	@param containerIndex - Index of the target container within the active scene.
	 */
	 static createLabel (id: string, x: number, y: number, font: any, text: string, containerIndex?: number) : Label;

	/**
	 *	Creates a new updater, attaches it to the active scene and returns it.
	 *
	 * 	@param update
	 * 	@param context
	 */
	 static createUpdater (update?: (elem:any, dt:number) => void, context?: any) : Updater;
}

export default world;
