/*
**	flow/grid.js
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
import GridElement from './grid-element.js';
import List from '../utils/list.js';

/*
**	Describes an optimized data structure to store 2D spatially indexed elements.
*/

const Grid = Class.extend
({
	/*
	**	Name of the class (for inheritance purposes).
	*/
	className: 'Grid',

	/*
	**	Actual grid of data, stored linearly. Contains several entries each of which can be either null or a List containing grid elements.
	*/
	grid: null,

	/*
	**	Number of elements active in the grid.
	*/
	count: 0,

	/*
	**	The X and Y offsets to be added to all input coordinates. Used to ensure that a negative coordinate always ends up positive,
	**	calculated using the width and height of the grid.
	*/
	offsx: 0, offsy: 0,

	/*
	**	Divisors for the X and Y coordinates respectively. All input coordinates (after offseting) will be divided by these values to map
	**	them to a grid entry (list) where the element can be added.
	*/
	kx: 0, ky: 0,

	/*
	**	Stride to calculate an index with a Y-coordinate.
	*/
	stride: 0,

	/*
	**	Indicates if the grid should match regions with exact precision by comparing region to element bounds intersection.
	*/
	verifyIntersection: true,

	/*
	**	Constructs a grid with the specified maximum width and height. The final effective coordinate range will be -(width/2) to (width/2) for X
	**	and -(height/2) to (height/2) for Y.
	**
	**	Note that the width, height and divisors (kx and ky) will be converted to their closest base-2 value. This is done to ensure shifts can be
	**	used to quickly divide the input coordinates.
	*/
	__ctor: function (width, height, kx, ky=null)
	{
		width = 1 << Math.ceil(Math.log2(width));
		height = 1 << Math.ceil(Math.log2(height));

		this.offsx = width >> 1;
		this.offsy = height >> 1;

		kx = Math.floor(Math.log2(kx));
		if (ky === null) ky = kx;

		this.kx = kx;
		this.ky = ky;

		let w = width >> kx;
		let h = height >> ky;

		this.grid = new Array(w*h).fill(null);
		this.stride = w;
	},

	/*
	**	Destroys all lists and elements in the grid.
	*/
	__dtor: function()
	{
		this.clear();
		this.grid = null;
	},

	/*
	**	Destroys all lists and elements in the grid.
	*/
	clear: function()
	{
		for (let i = 0; i < this.grid.length; i++)
		{
			if (this.grid[i] === null)
				continue;

			let j;

			while ((j = this.grid[i].shift()) !== null)
			{
				j.remover.remove(this._remove, this);
				j.container = null;

				dispose(j);
			}

			this.grid[i].free();
			this.grid[i] = null;
		}

		this.count = 0;
	},

	/*
	**	Destroys all lists in the grid. Elements will be preserved.
	*/
	reset: function()
	{
		for (let i = 0; i < this.grid.length; i++)
		{
			if (this.grid[i] === null)
				continue;

			let j;

			while ((j = this.grid[i].shift()) !== null)
			{
				j.remover.remove(this._remove, this);
				j.container = null;
			}

			this.grid[i].free();
			this.grid[i] = null;
		}

		this.count = 0;
	},

	/*
	**	Adds an element to the grid, the argument must be an instance of GridElement. Returns true if successful, or false if the element is outside of the grid bounds.
	*/
	add: function (elem)
	{
		if (!GridElement.isInstance(elem))
			throw new Error ('argument must be a GridElement');

		let i = int((elem.bounds.y1+this.offsy) >> this.ky) * this.stride + int((elem.bounds.x1+this.offsx) >> this.kx);
		if (i < 0 || i >= this.grid.length) return false;

		if (this.grid[i] === null)
			this.grid[i] = List.calloc();

		this.grid[i].push(elem);
		this.count++;

		elem.container = this;
		elem._grid_remove_node = elem.remover.add(this._remove, this, i, this.grid[i].bottom);

		return true;
	},

	/*
	**	Callback to remove an element from the grid (called by Handler).
	*/
	_remove: function (elem, self, index, node)
	{
		self.grid[index].remove(node);
		self.count--;

		elem.container = null;
		return false;
	},

	/*
	**	Removes the element from the grid and returns it.
	*/
	remove: function (elem)
	{
		elem.remover.execc(this._grid_remove_node);
		return elem;
	},

	/*
	**	Updates the storage location of the specified element. Returns true if successful, or false if the element is outside of the grid bounds (in which
	**	case the element will be removed), or if the element does not belong to this grid.
	*/
	sync: function (elem)
	{
		elem.clearFlags(GridElement.DIRTY);

		let node = elem._grid_remove_node;

		let i = int((elem.bounds.y1+this.offsy) >> this.ky) * this.stride + int((elem.bounds.x1+this.offsx) >> this.kx);
		if (i < 0 || i >= this.grid.length)
		{
			elem.remover.execc(node);
			return false;
		}

		if (node.arg1 === i)
			return true;

		this.grid[node.arg1].remove(node.arg2);

		if (this.grid[i] === null)
			this.grid[i] = List.calloc();

		this.grid[i].push(elem);

		node.arg1 = i;
		node.arg2 = this.grid[i].bottom;

		return true;
	},

	/*
	**	Executes the specified callback function for each element that intersects the given bounds and has the specified flags set. The process
	**	is immediately stopped if the callback returns `false`.
	*/
	forEachInRegion: function (bounds, flagsAndMask, flagsValue, callback, context)
	{
		let j0 = ((bounds.y1+this.offsy) - (1<<this.ky-1) >> this.ky) * this.stride;
		let j1 = ((bounds.y2+this.offsy) + (1<<this.ky-1) >> this.ky) * this.stride;
		let i0 = ((bounds.x1+this.offsx) - (1<<this.kx-1) >> this.kx);
		let i1 = ((bounds.x2+this.offsx) + (1<<this.kx-1) >> this.kx);

		let n = this.grid.length-1;

		if (j0 < 0) j0 = 0; if (j1 < 0) j1 = 0;
		if (i0 < 0) i0 = 0; if (i1 < 0) i1 = 0;
		if (j0 > n) j0 = n; if (j1 > n) j1 = n;
		if (i0 > n) i0 = n; if (i1 > n) i1 = n;

		for (let j = j0; j <= j1; j += this.stride)
		{
			for (let i = i0; i <= i1; i++)
			{
				let k = j + i;
				if (k > n || this.grid[k] === null) continue;

				for (let e = this.grid[k].top; e; e = e.next)
				{
					// First check the element flags.
					if (!e.value.getFlags(flagsAndMask, flagsValue)) continue;

					// Verify exact intersection only on elements located on the edges of the indexed-based approximated rectangle.
					if (this.verifyIntersection && (j <= j0+1 || i <= i0+1 || j >= j1-1 || i >= i1-1) && !e.value.bounds.intersects(bounds))
						continue;

					if (callback(e.value, context) === false)
						return;
				}
			}
		}
	},

	/*
	**	Collects all elements that intersect the given bounds and have the specified flags set. Returns a new List, remember to call free() after using it.
	*/
	selectInRegion: function (bounds, flagsAndMask, flagsValue)
	{
		let j0 = ((bounds.y1+this.offsy) - (1<<this.ky-1) >> this.ky) * this.stride;
		let j1 = ((bounds.y2+this.offsy) + (1<<this.ky-1) >> this.ky) * this.stride;
		let i0 = ((bounds.x1+this.offsx) - (1<<this.kx-1) >> this.kx);
		let i1 = ((bounds.x2+this.offsx) + (1<<this.kx-1) >> this.kx);

		let n = this.grid.length-1;

		if (j0 < 0) j0 = 0; if (j1 < 0) j1 = 0;
		if (i0 < 0) i0 = 0; if (i1 < 0) i1 = 0;
		if (j0 > n) j0 = n; if (j1 > n) j1 = n;
		if (i0 > n) i0 = n; if (i1 > n) i1 = n;

		let list = List.calloc();

		for (let j = j0; j <= j1; j += this.stride)
		{
			for (let i = i0; i <= i1; i++)
			{
				let k = j + i;
				if (k > n || this.grid[k] === null) continue;

				for (let e = this.grid[k].top; e; e = e.next)
				{
					// First check the element flags.
					if (!e.value.getFlags(flagsAndMask, flagsValue)) continue;

					// Verify exact intersection only on elements located on the edges of the indexed-based approximated rectangle.
					if (this.verifyIntersection && (j <= j0+1 || i <= i0+1 || j >= j1-1 || i >= i1-1) && !e.value.bounds.intersects(bounds))
						continue;

					list.push(e.value);
				}
			}
		}

		return list;
	},

	/*
	**	Counts all elements that intersect the given bounds and have the specified flags set.
	*/
	countInRegion: function (bounds, flagsAndMask, flagsValue)
	{
		let j0 = ((bounds.y1+this.offsy) - (1<<this.ky-1) >> this.ky) * this.stride;
		let j1 = ((bounds.y2+this.offsy) + (1<<this.ky-1) >> this.ky) * this.stride;
		let i0 = ((bounds.x1+this.offsx) - (1<<this.kx-1) >> this.kx);
		let i1 = ((bounds.x2+this.offsx) + (1<<this.kx-1) >> this.kx);

		let n = this.grid.length-1;

		if (j0 < 0) j0 = 0; if (j1 < 0) j1 = 0;
		if (i0 < 0) i0 = 0; if (i1 < 0) i1 = 0;
		if (j0 > n) j0 = n; if (j1 > n) j1 = n;
		if (i0 > n) i0 = n; if (i1 > n) i1 = n;

		let m = 0;

		for (let j = j0; j <= j1; j += this.stride)
		{
			for (let i = i0; i <= i1; i++)
			{
				let k = j + i;
				if (k > n || this.grid[k] === null) continue;

				for (let e = this.grid[k].top; e; e = e.next)
				{
					// First check the element flags.
					if (!e.value.getFlags(flagsAndMask, flagsValue)) continue;

					// Verify exact intersection only on elements located on the edges of the indexed-based approximated rectangle.
					if (this.verifyIntersection && (j <= j0+1 || i <= i0+1 || j >= j1-1 || i >= i1-1) && !e.value.bounds.intersects(bounds))
						continue;

					m++;
				}
			}
		}

		return m;
	},

	/*
	**	Returns the first element that intersect the given bounds and have the specified flags set.
	*/
	selectFirst: function (bounds, flagsAndMask, flagsValue)
	{
		let j0 = ((bounds.y1+this.offsy) - (1<<this.ky-1) >> this.ky) * this.stride;
		let j1 = ((bounds.y2+this.offsy) + (1<<this.ky-1) >> this.ky) * this.stride;
		let i0 = ((bounds.x1+this.offsx) - (1<<this.kx-1) >> this.kx);
		let i1 = ((bounds.x2+this.offsx) + (1<<this.kx-1) >> this.kx);

		let n = this.grid.length-1;

		if (j0 < 0) j0 = 0; if (j1 < 0) j1 = 0;
		if (i0 < 0) i0 = 0; if (i1 < 0) i1 = 0;
		if (j0 > n) j0 = n; if (j1 > n) j1 = n;
		if (i0 > n) i0 = n; if (i1 > n) i1 = n;

		for (let j = j0; j <= j1; j += this.stride)
		{
			for (let i = i0; i <= i1; i++)
			{
				let k = j + i;
				if (k > n || this.grid[k] === null) continue;

				for (let e = this.grid[k].top; e; e = e.next)
				{
					// First check the element flags.
					if (!e.value.getFlags(flagsAndMask, flagsValue)) continue;

					// Verify exact intersection only on elements located on the edges of the indexed-based approximated rectangle.
					if (this.verifyIntersection && (j <= j0+1 || i <= i0+1 || j >= j1-1 || i >= i1-1) && !e.value.bounds.intersects(bounds))
						continue;

					return e.value;
				}
			}
		}

		return null;
	}
});

export default Grid;
