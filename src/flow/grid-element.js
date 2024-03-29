
import { Class } from 'rinn';
import Bounds2 from '../math/bounds2.js';
import Handler from '../utils/handler.js';

//![import "../math/bounds2"]
//![import "../utils/handler"]

//:/**
//: * Describes an element that can be added to a grid.
//: */

//!class GridElement

const GridElement = Class.extend
({
	/**
	 * Name of the class (for inheritance purposes).
	 */
	className: 'GridElement',

	/**
	 * Identifier of the element (string).
	 * !id: string;
	 */
	id: null,

	/**
	 * Bounds of the element.
	 * !bounds: Bounds2;
	 */
	bounds: null,

	/**
	 * Flags of the element (see constants of this class).
	 * !flags: number;
	 */
	flags: 0,

	/**
	 * Generic data of the element, used to store some value or object.
	 * !data: object;
	 */
	data: null,

	/**
	 * Extension object of the element, can be used to implement specific functionality.
	 * !ext: object;
	 */
	ext: null,

	/**
	 * The container where the element is stored.
	 * !readonly container: Container;
	 */
	container: null,

	/**
	 * Removal callback node added by Grid.
	 */
	_grid_remove_node: null,

	/**
	 * Remover runs when the `remove` method of the element is called or when the element is destroyed.
	 * !readonly remover: Handler;
	 */
	remover: null,

	/**
	 * Constructs the instance at the specified position and with the specified size.
	 * !constructor (x: number, y: number, width: number, height: number);
	 */
	__ctor: function (x, y, width, height)
	{
		this.bounds = Bounds2.Pool.alloc();

		this.bounds.translate (x, y);
		this.bounds.resize (width, height, true);

		this.flags = GridElement.ALIVE | GridElement.VISIBLE | GridElement.DIRTY | GridElement.DEPTH_FLAG;
		this.data = null;
		this.ext = null;

		this.remover = Handler.Pool.alloc(this);
	},

	/**
	 * Removes the element from its container and destroys it.
	 */
	__dtor: function()
	{
		this.alive(false);

		if (this.data !== null)
		{
			dispose(this.data);
			this.data = null;
		}

		this.remover.exec();
		this.remover.free();

		this.bounds.free();
	},

	/**
	 * Sets the identifier of the element.
	 * !setId (value: string) : GridElement;
	 */
	setId: function (value)
	{
		this.id = value;
		return this;
	},

	/**
	 * Sets bits of the element flags.
	 * !setFlags (value: number) : GridElement;
	 */
	setFlags: function (value)
	{
		this.flags |= value;
		return this;
	},

	/**
	 * Clears bits from the element flags.
	 * !clearFlags (value: number) : GridElement;
	 */
	clearFlags: function (value)
	{
		this.flags &= ~value;
		return this;
	},

	/**
	 * Returns true if masking (bitwise AND) the flags by the specified flag bits results in the given value.
	 * !getFlags (andMask: number, value?: number) : boolean;
	 */
	getFlags: function (andMask, value=null)
	{
		if (value === null)
			return (this.flags & andMask) === andMask;

		return (this.flags & andMask) === value;
	},

	/**
	 * Sets the generic data of the element. Will be disposed when the element is destroyed. The property `host`
	 * of the object will be set with the reference to the element.
	 * !setData (data: object) : GridElement;
	 */
	setData: function (data)
	{
		this.data = data;

		if (this.data !== null)
			this.data.host = this;

		return this;
	},

	/**
	 * Returns the generic data of the element.
	 * !getData() : object;
	 */
	getData: function()
	{
		return this.data;
	},

	/**
	 * Sets the extension object of the element. Calls to functions of this object should be done using the `exec` method.
	 * !setExt (extensionObject: object) : GridElement;
	 */
	setExt: function (extensionObject)
	{
		this.ext = extensionObject;
		return this;
	},

	/**
	 * Returns the extension object of the element.
	 * !getExt() : object;
	 */
	getExt: function()
	{
		return this.ext;
	},

	/**
	 * Executes a function of the extension object.
	 * @param {string} name
	 * !exec (name: string, ...args: any) : any;
	 */
	exec: function(name, arg0=null, arg1=null, arg2=null, arg3=null, arg4=null, arg5=null, arg6=null, arg7=null, arg8=null, arg9=null)
	{
		if (this.ext === null || this.ext.hasOwnProperty(name) === false)
			return false;

		return this.ext[name] (this, arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9);
	},

	/**
	 * Sets the visible flag.
	 * @param {boolean} value - New visibility value.
	 * @param {boolean} forced - When `true` forces to ignore the VISIBLE_LOCK flag.
	 * !visible (value: boolean, forced?: boolean|false) : GridElement;
	 */
	/**
	 * Returns the visible flag.
	 * !visible() : boolean;
	 */
	visible: function (value=null, forced=false)
	{
		if (value === null)
			return !!(this.flags & GridElement.VISIBLE);

		if (forced === false && (this.flags & GridElement.VISIBLE_LOCK) !== 0)
			return this;

		this.flags &= ~GridElement.VISIBLE;
		if (value === true) this.flags |= GridElement.VISIBLE;

		return this;
	},

	/**
	 * Sets the visible-lock flag.
	 * !visibleLock (value: boolean) : GridElement;
	 */
	/**
	 * Returns the visible-lock flag.
	 * !visibleLock() : boolean;
	 */
	visibleLock: function (value=null)
	{
		if (value === null)
			return !!(this.flags & GridElement.VISIBLE_LOCK);

		this.flags &= ~GridElement.VISIBLE_LOCK;
		if (value === true) this.flags |= GridElement.VISIBLE_LOCK;

		return this;
	},

	/**
	 * Sets the alive flag.
	 * !alive (value: boolean) : GridElement;
	 */
	/**
	 * Returns the alive flag.
	 * !alive() : boolean;
	 */
	alive: function (value=null)
	{
		if (value === null)
			return !!(this.flags & GridElement.ALIVE);

		this.flags &= ~GridElement.ALIVE;
		if (value === true) this.flags |= GridElement.ALIVE;

		return this;
	},

	/**
	 * Sets the dirty flag.
	 * !alive (value: boolean) : GridElement;
	 */
	/**
	 * Returns the dirty flag.
	 * !alive() : boolean;
	 */
	dirty: function (value=null)
	{
		if (value === null)
			return !!(this.flags & GridElement.DIRTY);

		this.flags &= ~GridElement.DIRTY;
		if (value === true) this.flags |= GridElement.DIRTY;

		return this;
	},

	/**
	 * Sets the depth-flag-enabled flag.
	 * !depthFlagEnabled (value: boolean) : GridElement;
	 */
	/**
	 * Returns the depth-flag-enabled flag.
	 * !depthFlagEnabled() : boolean;
	 */
	depthFlagEnabled: function (value=null)
	{
		if (value === null)
			return !!(this.flags & GridElement.DEPTH_FLAG_ENABLED);

		this.flags &= ~GridElement.DEPTH_FLAG_ENABLED;
		if (value === true) this.flags |= GridElement.DEPTH_FLAG_ENABLED;

		return this;
	},

	/**
	 * Sets the depth-flag flag. To actually use the depth-test, you have to enable the depth-flag using `depthFlagEnabled`.
	 * !depthFlagEnabled (value: boolean) : GridElement;
	 */
	/**
	 * Returns the depth-flag flag.
	 * !depthFlagEnabled() : boolean;
	 */
	depthFlag: function (value=null)
	{
		if (value === null)
			return !!(this.flags & GridElement.DEPTH_FLAG);

		this.flags &= ~GridElement.DEPTH_FLAG;
		if (value === true) this.flags |= GridElement.DEPTH_FLAG;

		return this;
	},

	/**
	 * Removes the element from the container and returns itself.
	 * !remove() : GridElement;
	 */
	remove: function()
	{
		this.remover.exec();
		return this;
	},

	/**
	 * Syncs the actual location of the specified element with its storage location (if alive and dirty).
	 * !sync() : GridElement;
	 */
	sync: function()
	{
		if (this.container === null || this.getFlags(GridElement.ALIVE | GridElement.DIRTY) === false)
			return this;

		this.container.sync(this);
		return this;
	},

	/**
	 * Sets the width and height of the element.
	 * !resize (width: number|boolean|null, height: number|boolean|null) : GridElement;
	 */
	resize: function (width, height)
	{
		this.flags |= GridElement.DIRTY;
		this.bounds.resize (width, height, true);
		return this;
	},

	/**
	 * Resizes the element by the specified deltas.
	 * !resizeBy (deltaWidth: number|boolean, deltaHeight: number|boolean) : GridElement;
	 */
	resizeBy: function (dWidth, dHeight)
	{
		this.flags |= GridElement.DIRTY;
		this.bounds.resizeBy (dWidth, dHeight, true);
		return this;
	},

	/**
	 * Moves the element by the specified deltas.
	 * @param upscaled - When `true` the `dx` and `dy` parameters are assumed to be upscaled.
	 * !translate (dx: number, dy: number, upscaled?: boolean) : GridElement;
	 */
	translate: function (dx, dy, upscaled=false)
	{
		this.flags |= GridElement.DIRTY;
		this.bounds.translate (dx, dy, upscaled);
		return this;
	},

	/**
	 * Sets the position of the element. Any parameter set to `null` will cause it not to be changed.
	 * !setPosition (x: number, y: number) : GridElement;
	 */
	/**
	 * Sets the position of the element. Any parameter set to `null` will cause it not to be changed.
	 * !setPosition (pointer: {x:number, y:number}) : GridElement;
	 */
	setPosition: function (x, y=false)
	{
		if (y === false) {
			y = x.y;
			x = x.x;
		}

		return this.translate (x !== null ? upscale(x)-this.bounds.ux1 : 0, y !== null ? upscale(y)-this.bounds.uy1 : 0, true);
	}
});

/*
**	Grid element flags.
*/
GridElement.ALIVE 				= 	0x0001;
GridElement.VISIBLE 			= 	0x0002;
GridElement.VISIBLE_LOCK 		= 	0x0004;
GridElement.DIRTY 				= 	0x0008;
GridElement.DEPTH_FLAG_ENABLED	= 	0x0010;
GridElement.DEPTH_FLAG			= 	0x0020;
GridElement.WRAP_EXTENTS		=	0x0040;

GridElement.USERDEF		=	0x0100; /* Bits 8 to 30 : 23 flags  */
GridElement.LAST_FLAG	=	0x0080;

/**
 * Class-level function to allocate a new flag.
 * !static allocFlag() : number;
 */
GridElement.allocFlag = function()
{
	let flag = GridElement.LAST_FLAG;
	if (flag === 0x4000_0000) throw new Error ('allocFlag: out of bit space to allocate another flag');

	flag <<= 1;
	GridElement.LAST_FLAG = flag;

	return flag;
};

export default GridElement;
