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

/*
**	Describes an element that can be added to a grid.
*/

const GridElement = Class.extend
({
	/*
	**	Name of the class (for inheritance purposes).
	*/
	className: 'GridElement',

	/*
	**	Identifier of the element (string).
	*/
	id: null,

	/*
	**	Bounds of the element.
	*/
	bounds: null,

	/*
	**	Z-value of the element.
	*/
	zvalue: 0,

	/*
	**	Flags of the element (see constants of this class).
	*/
	flags: 0,

	/*
	**	Generic tag of the element.
	*/
	tag: null,

	/*
	**	The container where the element is stored.
	*/
	container: null,

	/*
	**	Removal callback node added by Grid.
	*/
	_grid_remove_node: null,

	/*
	**	Remover runs when the `remove` method of the element is called or when the element is destroyed.
	*/
	remover: null,

	/*
	**	Constructs the instance.
	*/
	__ctor: function (x, y, width, height)
	{
		this.bounds = Bounds2.calloc();

		this.bounds.translate (x, y);
		this.bounds.resize (width, height, true);

		this.flags = GridElement.ALIVE | GridElement.VISIBLE | GridElement.DIRTY;
		this.tag = null;

		this.remover = Handler.alloc().init(this);
	},

	/*
	**	Removes the element from its container and destroys it.
	*/
	__dtor: function()
	{
		this.alive(false);

		this.remover.exec();
		this.remover.free();

		this.bounds.free();
	},

	/*
	**	Sets the identifier of the element.
	*/
	setId: function (value)
	{
		this.id = value;
		return this;
	},

	/*
	**	Sets bits of the element flags.
	*/
	setFlags: function (value)
	{
		this.flags |= value;
		return this;
	},

	/*
	**	Clears bits from the element flags.
	*/
	clearFlags: function (value)
	{
		this.flags &= ~value;
		return this;
	},

	/*
	**	Returns true if masking (bitwise AND) the flags by the specified flag bits results in the given value.
	*/
	getFlags: function (andMask, value=null)
	{
		if (value === null)
			return (this.flags & andMask) === andMask;

		return (this.flags & andMask) === value;
	},

	/*
	**	Sets the generic tag of the element.
	*/
	setTag: function (tag)
	{
		this.tag = tag;
		return this;
	},

	/*
	**	Returns the generic tag of the element.
	*/
	getTag: function()
	{
		return this.tag;
	},

	/*
	**	Sets or gets the visible flag.
	*/
	visible: function (value=null)
	{
		if (value === null)
			return !!(this.flags & GridElement.VISIBLE);

		this.flags &= ~GridElement.VISIBLE;
		if (value) this.flags |= GridElement.VISIBLE;

		return this;
	},

	/*
	**	Sets or gets the alive flag.
	*/
	alive: function (value=null)
	{
		if (value === null)
			return !!(this.flags & GridElement.ALIVE);

		this.flags &= ~GridElement.ALIVE;
		if (value) this.flags |= GridElement.ALIVE;

		return this;
	},

	/*
	**	Sets or gets the dirty flag.
	*/
	dirty: function (value=null)
	{
		if (value === null)
			return !!(this.flags & GridElement.DIRTY);

		this.flags &= ~GridElement.DIRTY;
		if (value) this.flags |= GridElement.DIRTY;

		return this;
	},

	/*
	**	Removes the element from the container and returns itself.
	*/
	remove: function()
	{
		this.remover.exec();
		return this;
	},

	/*
	**	Syncs the actual location of the specified element with its storage location (if alive and dirty).
	*/
	sync: function()
	{
		if (this.container === null || !this.getFlags(GridElement.ALIVE | GridElement.DIRTY))
			return this;

		this.container.sync(this);
		return this;
	},

	/*
	**	Sets the width and height of the element.
	*/
	resize: function (width, height)
	{
		this.flags |= GridElement.DIRTY;
		this.bounds.resize (width, height, true);
		return this;
	},

	/*
	**	Resizes the element by the specified deltas.
	*/
	resizeBy: function (dWidth, dHeight)
	{
		return this.resize(this.bounds.width() + dWidth, this.bounds.height() + dHeight);
	},

	/*
	**	Moves the element by the specified deltas.
	*/
	translate: function (dx, dy, upscaled=false)
	{
		this.flags |= GridElement.DIRTY;
		this.bounds.translate (dx, dy, upscaled);
		return this;
	},

	/*
	**	Sets the position of the element.
	*/
	setPosition: function (x, y)
	{
		return this.translate (x-this.bounds.x1, y-this.bounds.y1);
	}
});

/*
**	Grid element flags.
*/
GridElement.ALIVE 		= 	0x0001;
GridElement.VISIBLE 	= 	0x0002;
GridElement.DIRTY 		= 	0x0004;

GridElement.USERDEF		=	0x0100; /* Bits 8 to 31 : 24 flags  */

export default GridElement;
