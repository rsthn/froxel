/*
**	spatial/quadtree-item.js
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

/*
**	Base class for items accepted by a QuadTree.
*/

let objectIdSequence = 0;

const QuadTreeItem = Class.extend
({
	/*
	**	Name of the class (for inheritance purposes).
	*/
	className: 'QuadTreeItem',

	/*
	**	Selection index of the item. Updated by QuadTree to indicate in which order the item was selected.
	*/
	selectedIndex: 0,

	/*
	**	Boundaries at which the item was inserted.
	*/
	insertionBounds: null,

	/*
	**	Boundaries of the last known position that was correct.
	*/
	lastBounds: null,

	/*
	**	Bounds of the element.
	*/
	bounds: null,

	/*
	**	Z-index (layer ordering) of the item.
	*/
	zindex: 0,

	/*
	**	Indicates if the item can be selected for futher operations.
	*/
	_visible: true,

	/*
	**	Flags of the item (see FLAG_* constants).
	*/
	flags: 0,

	/*
	**	Number of nodes referencing this item.
	*/
	numRefNodes: 0,

	/*
	**	Tag of the item.
	*/
	tag: null,

	/*
	**	ID of the object.
	*/
	objectId: null,

	/*
	**	Constructs the instance.
	*/
	__ctor: function ()
	{
		this.objectId = ++objectIdSequence;

		this.insertionBounds = Bounds2.calloc();
		this.lastBounds = Bounds2.calloc();
		this.bounds = Bounds2.calloc();

		this.numRefNodes = 0;
		this.zindex = 0;
		this.tag = null;

		this.flags = QuadTreeItem.FLAG_INITIAL;
		this._visible = true;
	},

	/*
	**	Destroys the instance.
	*/
	__dtor: function ()
	{
		this.insertionBounds.free();
		this.lastBounds.free();
		this.bounds.free();
	},

	/*
	**	Sets flag bits.
	*/
	setFlags: function (value)
	{
		this.flags |= value;
	},

	/*
	**	Clears flag bits.
	*/
	clearFlags: function (value)
	{
		this.flags &= ~value;
	},

	/*
	**	Returns the result of masking (bitwise AND) the flags by the specified flag bits.
	*/
	getFlags: function (value)
	{
		return this.flags & value;
	},

	/*
	**	Sets the tag of the item.
	*/
	setTag: function (tag)
	{
		this.tag = tag;
	},

	/*
	**	Returns the tag of the item.
	*/
	getTag: function()
	{
		return this.tag;
	},

	/*
	**	Sets the z-index of the item.
	*/
	setZIndex: function (value)
	{
		this.zindex = value;
		return this;
	},

	/*
	**	Returns the Z-index of the item.
	*/
	getZIndex: function ()
	{
		return this.zindex;
	},

	/*
	**	Executed when the item is inserted on the tree.
	*/
	notifyInserted: function (tree)
	{
		this.flags |= QuadTreeItem.FLAG_ATTACHED;

		if (this.flags & QuadTreeItem.FLAG_INITIAL)
		{
			this.flags &= ~QuadTreeItem.FLAG_INITIAL;
		}
	},

	/*
	**	Executed when the item is removed from the tree.
	*/
	notifyRemoved: function (tree)
	{
		this.flags &= ~QuadTreeItem.FLAG_ATTACHED;
	},

	/*
	**	Updates the insertion bounds to reflect the item's bounds.
	*/
	updateInsertionBounds: function ()
	{
		this.lastBounds.set (this.insertionBounds);
		this.insertionBounds.set (this.bounds);
	}
});

/*
**	Executed when the item is removed from the tree.
*/
QuadTreeItem.FLAG_QUEUED_INSERTION	=	0x001;
QuadTreeItem.FLAG_QUEUED_REMOVAL	=	0x002;
QuadTreeItem.FLAG_QUEUED_UPDATE		=	0x004;
QuadTreeItem.FLAG_QUEUED			=	0x007;

QuadTreeItem.FLAG_ATTACHED			=	0x008;
QuadTreeItem.FLAG_SELECTED			=	0x010;
QuadTreeItem.FLAG_INITIAL			=	0x020;
QuadTreeItem.FLAG_ALWAYS_SELECT		=	0x040;
QuadTreeItem.FLAG_NEVER_SELECT		=	0x080;
QuadTreeItem.FLAG_ZOMBIE			=	0x100;
QuadTreeItem.FLAG_UPDATEABLE		=	0x200;

QuadTreeItem.FLAG_USERDEF			=	0x400;

export default QuadTreeItem;
