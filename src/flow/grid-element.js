/*
**	flow/grid-element.js
**
**	Copyright (c) 2016-2021, RedStar Technologies, All rights reserved.
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

import { Class } from '@rsthn/rin';
import Bounds2 from '../math/bounds2.js';
import Handler from '../utils/handler.js';

//![import "../math/bounds2"]
//![import "../utils/handler"]

//:/**
//: * 	Describes an element that can be added to a grid.
//: */

//!class GridElement

const GridElement = Class.extend
({
	/*
	**	Name of the class (for inheritance purposes).
	*/
	className: 'GridElement',

	/**
	 * 	Identifier of the element (string).
	 * 	!id: string;
	 */
	id: null,

	/**
	 * 	Bounds of the element.
	 * 	!bounds: Bounds2;
	 */
	bounds: null,

	/**
	 * 	Flags of the element (see constants of this class).
	 * 	!flags: number;
	 */
	flags: 0,

	/**
	 * 	Generic data of the element, used to store some value or object.
	 * 	!data: object;
	 */
	data: null,

	/**
	 * 	The container where the element is stored.
	 */
	container: null,

	/**
	 * 	Removal callback node added by Grid.
	 */
	_grid_remove_node: null,

	/**
	 * 	Remover runs when the `remove` method of the element is called or when the element is destroyed.
	 */
	remover: null,

	/**
	 * 	Constructs the instance at the specified position and with the specified size.
	 * 	!constructor (x: number, y: number, width: number, height: number);
	 */
	__ctor: function (x, y, width, height)
	{
		this.bounds = Bounds2.Pool.alloc();

		this.bounds.translate (x, y);
		this.bounds.resize (width, height, true);

		this.flags = GridElement.ALIVE | GridElement.VISIBLE | GridElement.DIRTY | GridElement.DEPTH_FLAG;
		this.data = null;

		this.remover = Handler.Pool.alloc(this);
	},

	/**
	 * 	Removes the element from its container and destroys it.
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
	 * 	Sets the identifier of the element.
	 * 	!setId (value: string) : GridElement;
	 */
	setId: function (value)
	{
		this.id = value;
		return this;
	},

	/**
	 * 	Sets bits of the element flags.
	 * 	!setFlags (value: number) : GridElement;
	 */
	setFlags: function (value)
	{
		this.flags |= value;
		return this;
	},

	/**
	 * 	Clears bits from the element flags.
	 * 	!clearFlags (value: number) : GridElement;
	 */
	clearFlags: function (value)
	{
		this.flags &= ~value;
		return this;
	},

	/**
	 * 	Returns true if masking (bitwise AND) the flags by the specified flag bits results in the given value.
	 * 	!getFlags (andMask: number, value?: number) : boolean;
	 */
	getFlags: function (andMask, value=null)
	{
		if (value === null)
			return (this.flags & andMask) === andMask;

		return (this.flags & andMask) === value;
	},

	/**
	 * 	Sets the generic data of the element.
	 * 	!setData (data: object) : GridElement;
	 */
	setData: function (data)
	{
		this.data = data;
		return this;
	},

	/**
	 * 	Returns the generic data of the element.
	 * 	!getData() : object;
	 */
	getData: function()
	{
		return this.data;
	},

	/**
	 * 	Sets the visible flag.
	 * 	!visible (value: boolean) : GridElement;
	 */
	/**
	 * 	Returns the visible flag.
	 * 	!visible() : boolean;
	 */
	visible: function (value=null)
	{
		if (value === null)
			return !!(this.flags & GridElement.VISIBLE);

		this.flags &= ~GridElement.VISIBLE;
		if (value) this.flags |= GridElement.VISIBLE;

		return this;
	},

	/**
	 * 	Sets the alive flag.
	 * 	!alive (value: boolean) : GridElement;
	 */
	/**
	 * 	Returns the alive flag.
	 * 	!alive() : boolean;
	 */
	alive: function (value=null)
	{
		if (value === null)
			return !!(this.flags & GridElement.ALIVE);

		this.flags &= ~GridElement.ALIVE;
		if (value) this.flags |= GridElement.ALIVE;

		return this;
	},

	/**
	 * 	Sets the dirty flag.
	 * 	!alive (value: boolean) : GridElement;
	 */
	/**
	 * 	Returns the dirty flag.
	 * 	!alive() : boolean;
	 */
	dirty: function (value=null)
	{
		if (value === null)
			return !!(this.flags & GridElement.DIRTY);

		this.flags &= ~GridElement.DIRTY;
		if (value) this.flags |= GridElement.DIRTY;

		return this;
	},

	/**
	 * 	Sets the depth-flag-enabled flag.
	 * 	!depthFlagEnabled (value: boolean) : GridElement;
	 */
	/**
	 * 	Returns the depth-flag-enabled flag.
	 * 	!depthFlagEnabled() : boolean;
	 */
	depthFlagEnabled: function (value=null)
	{
		if (value === null)
			return !!(this.flags & GridElement.DEPTH_FLAG_ENABLED);

		this.flags &= ~GridElement.DEPTH_FLAG_ENABLED;
		if (value) this.flags |= GridElement.DEPTH_FLAG_ENABLED;

		return this;
	},

	/**
	 * 	Sets the depth-flag flag. To actually use the depth-test, you have to enable the depth-flag using `depthFlagEnabled`.
	 * 	!depthFlagEnabled (value: boolean) : GridElement;
	 */
	/**
	 * 	Returns the depth-flag flag.
	 * 	!depthFlagEnabled() : boolean;
	 */
	depthFlag: function (value=null)
	{
		if (value === null)
			return !!(this.flags & GridElement.DEPTH_FLAG);

		this.flags &= ~GridElement.DEPTH_FLAG;
		if (value) this.flags |= GridElement.DEPTH_FLAG;

		return this;
	},

	/**
	 * 	Removes the element from the container and returns itself.
	 * 	!remove() : GridElement;
	 */
	remove: function()
	{
		this.remover.exec();
		return this;
	},

	/**
	 * 	Syncs the actual location of the specified element with its storage location (if alive and dirty).
	 * 	!sync() : GridElement;
	 */
	sync: function()
	{
		if (this.container === null || !this.getFlags(GridElement.ALIVE | GridElement.DIRTY))
			return this;

		this.container.sync(this);
		return this;
	},

	/**
	 * 	Sets the width and height of the element.
	 * 	!resize (width: number, height: number) : GridElement;
	 */
	resize: function (width, height)
	{
		this.flags |= GridElement.DIRTY;
		this.bounds.resize (width, height, true);
		return this;
	},

	/**
	 * 	Resizes the element by the specified deltas.
	 * 	!resizeBy (deltaWidth: number, deltaHeight: number) : GridElement;
	 */
	resizeBy: function (dWidth, dHeight)
	{
		return this.resize(this.bounds.width() + dWidth, this.bounds.height() + dHeight);
	},

	/**
	 * 	Moves the element by the specified deltas.
	 * 	@param upscaled - When `true` the `dx` and `dy` parameters are assumed to be upscaled.
	 * 	!translate (dx: number, dy: number, upscaled?: boolean) : GridElement;
	 */
	translate: function (dx, dy, upscaled=false)
	{
		this.flags |= GridElement.DIRTY;
		this.bounds.translate (dx, dy, upscaled);
		return this;
	},

	/**
	 * 	Sets the position of the element.
	 * 	!setPosition (x: number, y: number) : GridElement;
	 */
	setPosition: function (x, y)
	{
		return this.translate (upscale(x)-this.bounds.ux1, upscale(y)-this.bounds.uy1, true);
	}
});

/*
**	Grid element flags.
*/
GridElement.ALIVE 				= 	0x0001;
GridElement.VISIBLE 			= 	0x0002;
GridElement.DIRTY 				= 	0x0004;
GridElement.DEPTH_FLAG_ENABLED	= 	0x0008;
GridElement.DEPTH_FLAG			= 	0x0010;

GridElement.USERDEF		=	0x0100; /* Bits 8 to 30 : 23 flags  */
GridElement.LAST_FLAG	=	0x0080;

/**
 * 	Class-level function to allocate a new flag.
 * 	!static allocFlag() : number;
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
