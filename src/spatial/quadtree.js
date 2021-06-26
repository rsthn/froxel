/*
**	spatial/quadtree.js
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
import List from '../utils/list.js';
import QuadTreeNode from './quadtree-node.js';
import QuadTreeItem from './quadtree-item.js';

/*
**	Implemention of a quad tree for optimized storage of spatial items.
*/

const QuadTree = Class.extend
({
	/*
	**	Name of the class (for inheritance purposes).
	*/
	className: "QuadTree",

	/*
	**	Root node of the tree.
	*/
	root: null, /*QuadTreeNode*/

	/*
	**	List of all inserted items, linearly grouped by node.
	*/
	items: null, /*List<QuadTreeItem>*/

	/*
	**	List of items ordered by their depending on the tree's comparator function.
	*/
	orderedItems: null, /*List<QuadTreeItem>*/

	/*
	**	Queue of items to be updated on the next update cycle.
	*/
	updateQueue: null, /*List<QuadTreeItem>*/

	/*
	**	Maximum number of items per each node.
	*/
	nodeCapacity: 0,

	/*
	**	Minimum node size (width or height).
	*/
	minNodeSize: 128,

	/*
	**	Current minimum leaf node size (the smallest leaf).
	*/
	leafSize: null,

	/*
	**	Current maximum leaf fill level (the leaf with the most number of children).
	*/
	leafLevel: 0,

	/*
	**	Node pointing to the next selected item.
	*/
	nextItem: null, /*Linkable<QuadTreeItem>*/

	/*
	**	Number of remaining selected items. Read by using `getSelectedCount` after a call to `selectItems`.
	*/
	selectedCount: 0,

	/*
	**	Internally used to update the selectedIndex property of QuadTreeItem.
	*/
	selectedIndex: 0,

	/*
	**	Direction of traversal of selected items, forward (false) or backward (true).
	*/
	isReverse: false,

	/*
	**	Indicates if the quad tree layer is visible.
	*/
	visible: true,

	/*
	**	Indicates if the tree is locked, when so, adding or removing items will be postponed.
	*/
	locked: 0,

	/*
	**	Direction of the X, Y and Z coordinates (true=inverted). Used to alter ordering of items in the quad tree.
	*/
	xd: false, yd: false, zd: false,

	/*
	**	Constructs a quad tree for the specified region.
	*/
	__ctor: function (x1, y1, x2, y2, nodeCapacity)
	{
		this.items = List.calloc();
		this.orderedItems = List.calloc();
		this.updateQueue = List.calloc();

		this.root = QuadTreeNode.alloc().init(this, x1, y1, x2, y2);
		this.nodeCapacity = nodeCapacity;

		this.isReverse = false;
		this.visible = true;

		this.fnComparator = this.COMPARATOR_DEFAULT_YX;
	},

	/*
	**	Destructs the tree, all nodes and all items.
	*/
	__dtor: function ()
	{
		this.root.clear();
		this.root.free();

		this.items.free();
		this.orderedItems.free();
		this.updateQueue.free();
	},

	/*
	**	Returns the root node of the quad tree.
	*/
	getRoot: function () /*QuadTreeNode*/
	{
		return this.root;
	},

	/*
	**	Returns the extents of the quad tree.
	*/
	getExtents: function () /*Rect*/
	{
		return this.root.getExtents();
	},

	/*
	**	Sets the visibility of the QuadTree.
	*/
	setVisible: function (value)
	{
		this.visible = value;
		return this;
	},

	/*
	**	Returns the visibility of the QuadTree.
	*/
	getVisible: function ()
	{
		return this.visible;
	},

	/*
	**	Locks the tree.
	*/
	lock: function ()
	{
		this.locked++;
		return this;
	},

	/*
	**	Unlocks the tree.
	*/
	unlock: function ()
	{
		this.locked--;
		return this;
	},

	/*
	**	Removes (and destroys) all items and all nodes from the tree.
	*/
	clear: function ()
	{
		this.root.clear();

		this.orderedItems.reset();
		this.updateQueue.reset();
	},

	/*
	**	Sets the direction of the x, y or z axis.
	*/
	setXd: function (value) { if (this.xd == value) return false; this.xd = value; return true; },
	setYd: function (value) { if (this.yd == value) return false; this.yd = value; return true; },
	setZd: function (value) { if (this.zd == value) return false; this.zd = value; return true; },

	/*
	**	Returns the sign of the x, y or z axis.
	*/
	getXd: function() { return this.xd; },
	getYd: function() { return this.yd; },
	getZd: function() { return this.zd; },

	/*
	**	Returns true if "a" should be drawn before "b".
	*/
	fnComparator: null,

	/*
	**	Sets the comparator function used to determine the drawing order of items. Returns false if the provided comparator
	**	is the same as the one currently being used.
	*/
	setComparator: function (fnComparator)
	{
		if (this.fnComparator == fnComparator)
			return false;

		this.fnComparator = fnComparator;
		return true;
	},

	/*
	**	Returns true if "a" should be drawn before "b". Uses 2D-grid comparison. Z-Index specifies a virtual layer.
	*/
	COMPARATOR_DEFAULT_YX: function (a, b, p, q)
	{
		return ((p.zindex<q.zindex)^this.zd) || (p.zindex==q.zindex && (((a.y1<b.y1)^this.yd) || (a.y1==b.y1 && ((a.x1<b.x1)^this.xd))));
	},

	/*
	**	Returns true if "a" should be drawn before "b". Uses 2D-grid comparison. Z-Index specifies a virtual layer.
	*/
	COMPARATOR_DEFAULT_XY: function (a, b, p, q)
	{
		return ((p.zindex<q.zindex)^this.zd) || (p.zindex==q.zindex && (((a.x1<b.x1)^this.xd) || (a.x1==b.x1 && ((a.y1<b.y1)^this.yd))));
	},

	/*
	**	Returns true if "a" should be drawn before "b". Uses Manhattan distance function. Z-Index specifies a virtual layer.
	*/
	COMPARATOR_MANHATTAN: function (a, b, p, q)
	{
		return ((p.zindex < q.zindex) ^ this.zd) || (p.zindex == q.zindex && (a.cx + a.cy < b.cx + b.cy));
	},

	/*
	**	Returns true if "a" should be drawn before "b" by comparing only the Y2 component. The Z-Index is arithmetically added to the Y2 value.
	*/
	COMPARATOR_Y2: function (a, b, p, q)
	{
		return ((p.zindex<q.zindex)^this.zd) || (p.zindex==q.zindex && (((a.y2<b.y2)^this.yd) || (a.y2==b.y2 && (a.x1<=b.x1)^this.xd)));
	},

	/*
	**	Returns true if "a" should be drawn before "b" by comparing only the Y-axis. The Z-Index is arithmetically added to the Y1 value.
	*/
	COMPARATOR_Y1: function (a, b, p, q)
	{
		return ((a.y1 + p.zindex) < (b.y1 + q.zindex)) ^ this.yd;
	},

	/*
	**	Returns true if "a" should be drawn before "b" by comparing only the Y-axis. The Z-Index is arithmetically added to the X2 value.
	*/
	COMPARATOR_X2: function (a, b, p, q)
	{
		return ((a.x2 + p.zindex) < (b.x2 + q.zindex)) ^ this.xd;
	},

	/*
	**	Returns true if "a" should be drawn before "b" by comparing only the Y-axis. The Z-Index is arithmetically added to the X1 value.
	*/
	COMPARATOR_X1: function (a, b, p, q)
	{
		return ((a.x1 + p.zindex) < (b.x1 + q.zindex)) ^ this.xd;
	},

	/*
	**	Used for internal ordering. Returns true if item P is before item Q by comparing their position.
	*/
	isBefore: function (/*QuadTreeItem*/p, /*QuadTreeItem*/q)
	{
		return this.fnComparator(p.insertionBounds, q.insertionBounds, p, q);
	},

	/*
	**	Adds an item to the ordered list.
	*/
	addItemOrdered: function (/*QuadTreeItem*/item)
	{
		for (let i = this.orderedItems.top; i; i = i.next)
		{
			if (this.isBefore (item, i.value))
			{
				this.orderedItems.insertBefore (i, item);
				return;
			}
		}

		this.orderedItems.push(item);
	},

	/*
	**	Reorders the ordered-items-list using the current comparator. Should be called after changing the comparator or the axes sign.
	*/
	reorderItems: function ()
	{
		let tmp = this.orderedItems;

		this.orderedItems = List.calloc();

		for (let i = tmp.top; i; i = i.next)
			this.addItemOrdered(i.value);

		tmp.free();
	},

	/*
	**	Adds an item to the tree, returns false if the operation was unsuccessful.
	*/
	addItem: function (/*QuadTreeItem*/item, immediate=false) /*bool*/
	{
		if (this.locked != 0 && !immediate)
		{
			if (!(item.flags & QuadTreeItem.FLAG_QUEUED))
				this.updateQueue.push(item);

			if (item.flags & QuadTreeItem.FLAG_QUEUED_UPDATE)
				return true;

			item.flags &= ~QuadTreeItem.FLAG_QUEUED_REMOVAL;
			item.flags |= QuadTreeItem.FLAG_QUEUED_INSERTION;

			return true;
		}

		item.updateInsertionBounds();

		if (!this.root.addItem(item))
		{
			this.addItemOrdered(item);
			return true;
		}

		return false;
	},

	/*
	**	Removes an item from the tree. Returns false if the operation was unsuccessful.
	*/
	removeItem: function (/*QuadTreeItem*/item, immediate=false) /*bool*/
	{
		if (this.locked != 0 && !immediate)
		{
			if (!(item.flags & QuadTreeItem.FLAG_QUEUED))
				this.updateQueue.push(item);

			item.flags &= ~(QuadTreeItem.FLAG_QUEUED_UPDATE | QuadTreeItem.FLAG_QUEUED_INSERTION);
			item.flags |= QuadTreeItem.FLAG_QUEUED_REMOVAL;

			return true;
		}

		if (!(item.flags & QuadTreeItem.FLAG_ATTACHED))
			return true;

		if (!this.root.removeItem (item))
			return false;

		this.orderedItems.remove (this.orderedItems.sgetNode (item));
		return true;
	},

	/*
	**	Adds an item to the update queue to be processed on the next update cycle.
	*/
	updateItem: function (/*QuadTreeItem*/item, immediate=false)
	{
		if (!immediate)
		{
			if (!(item.flags & QuadTreeItem.FLAG_QUEUED))
				this.updateQueue.push(item);

			if (item.flags & QuadTreeItem.FLAG_QUEUED_REMOVAL)
				return;

			item.flags &= ~QuadTreeItem.FLAG_QUEUED_INSERTION;
			item.flags |= QuadTreeItem.FLAG_QUEUED_UPDATE;

			return;
		}

		this.removeItem(item, true);

		if (!this.addItem(item, true))
			throw new Error ('Unable to re-attach item to quadtree.');
	},

	/*
	**	Runs an update cycle on the tree. Any queued items will be processed.
	*/
	update: function()
	{
		if (this.locked != 0)
			return;

		let i;

		while ((i = this.updateQueue.shift()) != null)
		{
			let flags = i.flags;
			i.flags &= ~QuadTreeItem.FLAG_QUEUED;

			if (flags & QuadTreeItem.FLAG_QUEUED_UPDATE)
			{
				this.updateItem(i, true);
			}
			else if (flags & QuadTreeItem.FLAG_QUEUED_REMOVAL)
			{
				this.removeItem(i, true);
			}
			else if (flags & QuadTreeItem.FLAG_QUEUED_INSERTION)
			{
				this.addItem(i, true);
			}
		}
	},

	/*
	**	Returns the list of ordered items.
	*/
	getItems: function () /*List<QuadTreeItem>*/
	{
		return this.orderedItems;
	},

	/*
	**	Sets the reverse-flag to report selected items from front-to-back (true) or back-to-front (false).
	*/
	setReverse: function (value) /*QuadTree*/
	{
		this.isReverse = value;
		return this;
	},

	/*
	**	Selects all items that are within the specified region. Methods `getNextSelected` and `getCountSelected` can be used to determine the next
	**	item and the number of remaining selected items. Returns the number of items selected.
	*/
	selectItems: function (/*Bounds2*/bounds=null, filter=null, isReverse=null)
	{
		if (isReverse === null)
			isReverse = this.isReverse;

		this.selectedCount = 0;
		this.selectedIndex = 0;

		this.root.selectItems (bounds, filter);

		this.nextItem = isReverse ? this.orderedItems.bottom : this.orderedItems.top;
		return this.selectedCount;
	},

	/*
	**	Returns the number of remaining selected items.
	*/
	getCountSelected: function()
	{
		return this.selectedCount;
	},

	/*
	**	Returns the next selected item in the list or null if the end has been reached.
	*/
	getNextSelected: function (isReverse=null) /*QuadTreeItem*/
	{
		if (isReverse === null)
			isReverse = this.isReverse;

		while (this.nextItem != null && !(this.nextItem.value.flags & QuadTreeItem.FLAG_SELECTED))
		{
			this.nextItem = isReverse ? this.nextItem.prev : this.nextItem.next;
		}

		let ret = this.nextItem;

		if (this.nextItem)
		{
			this.nextItem.value.flags &= ~QuadTreeItem.FLAG_SELECTED;
			this.nextItem = isReverse ? this.nextItem.prev : this.nextItem.next;
		}

		if (ret != null)
		{
			ret.value.selectedIndex = this.selectedIndex;

			this.selectedIndex++;
			this.selectedCount--;

			return ret.value;
		}

		return null;
	},

	/*
	**	Clears the FLAG_SELECTED from all currently selected items.
	*/
	releaseSelected: function ()
	{
		while (this.selectedCount > 0) this.getNextSelected();
	},

	/*
	**	Returns the number of items inside the specified region.
	*/
	countItems: function (/*Bounds2*/bounds=null, filter=null)
	{
		let count = this.selectItems(bounds, filter);
		this.releaseSelected();

		return count;
	},

	/*
	**	Detects collisions between items and executes the methods of the specified handler. The handler object should implement:
	**
	**	bool onFilterRequest (item)
	**	bool onCollision (a, b)
	*/
	detectCollisions: function (/*IQuadTreeHandler*/handler, forced=false)
	{
		this.root.detectCollisions (handler, forced);
	},

	/*
	**	Returns the items inside the specified region as a List.
	*/
	selectItemsAsList: function (/*Bounds2*/bounds, filter=null)
	{
		let list = List.calloc();

		this.selectItems(bounds, filter);

		while (this.getCountSelected())
			list.push(this.getNextSelected());

		return list;
	}
});

export default QuadTree;
