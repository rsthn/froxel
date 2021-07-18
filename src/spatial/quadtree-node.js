/*
**	spatial/quadtree-node.js
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
import Recycler from '../utils/recycler.js';
import QuadTreeItem from './quadtree-item.js';

/*
**	Describes a node of the quad tree.
*/

const QuadTreeNode = Class.extend
({
	/*
	**	Name of the class (for inheritance purposes).
	*/
	className: 'QuadTreeNode',

	/*
	**	Region covered by this node.
	*/
	extents: null, /* Rect */

	/*
	**	Number of items stored in the node (and all of its sub-nodes).
	*/
	numItems: 0, /* int */

	/*
	**	Link to the first item of this node.
	*/
	insertionPoint: null,

	/*
	**	Sub-nodes of the node. If the node is a branch subNode will not be null.
	*/
	subNode: null,

	/*
	**	Indicates if the node or a sub-node is dirty.
	*/
	isDirty: false,

	/*
	**	Tree containing this node.
	*/
	tree: null,

	/*
	**	Constructs the node.
	*/
	__ctor: function ()
	{
		this.subNode = new Array(4).fill(null);
	},

	/*
	**	Initializes the instance.
	*/
	init: function (tree, x1, y1, x2, y2)
	{
		this.tree = tree;

		this.numItems = 0;
		this.isDirty = false;

		this.isLeaf = true;
		this.subNode.fill(null);

		this.insertionPoint = null;
		this.extents = Bounds2.alloc().init(x1, y1, x2, y2);

		return this;
	},

	/*
	**	Destroys the node and all child nodes. Items are not removed, use clear() to properly remove items.
	*/
	__dtor: function ()
	{
		if (!this.isLeaf)
		{
			for (let i = 0; i < 4; i++)
				this.subNode[i].free();

			this.subNode.fill(null);
		}

		this.insertionPoint = null;
		this.extents.free();
	},

	/*
	**	Removes all items and child nodes.
	*/
	clear: function ()
	{
		if (!this.isLeaf)
		{
			for (let i = 0; i < 4; i++)
			{
				this.subNode[i].clear();
				this.subNode[i].free();
				this.subNode[i] = null;
			}

			this.numItems = 0;
		}
		else
		{
			let j = null;

			for (let i = this.insertionPoint; i !== null && this.numItems--; i = j)
			{
				j = i.next;

				let k = this.tree.items.remove(i);
				k.numRefNodes--;

				if (k.numRefNodes == 0)
				{
					k.notifyRemoved(this.tree);
					dispose(k);
				}
			}

			this.insertionPoint = null;
			this.numItems = 0;
		}
	},

	/*
	**	Returns the extents of the node (Rect).
	*/
	getExtents: function () /* Rect */
	{
		return this.extents;
	},

	/*
	**	Returns the sub-nodes of the node.
	*/
	getSubNodes: function () /* Array[QuadTreeNode] or null if it is a leaf. */
	{
		return this.subNode;
	},

	/*
	**	Adds an item to the node or any of its sub-nodes. If the node exceeds the capacity the node will be split in four sub-nodes.
	**	Returns false if the item could not added because (a) it is outside the extents of the tree or (b) the node cannot be split.
	*/
	addItem: function (/*QuadTreeItem*/item) /* bool */
	{
		if (!item.insertionBounds.intersects(this.extents))
			return 1;

		if (!this.isLeaf)
		{
			let result = 2;

			for (let i = 0; i < 4; i++)
			{
				let tmp = this.subNode[i].addItem(item);
				if (!tmp) result = 0;
			}

			if (!result)
			{
				this.isDirty = true;
				this.numItems++;
			}

			return result;
		}

		if (this.numItems < this.tree.nodeCapacity || (this.extents.width() <= this.tree.minNodeSize && this.extents.height() <= this.tree.minNodeSize))
		{
			if (this.insertionPoint === null)
			{
				this.tree.items.push(item);
				this.insertionPoint = this.tree.items.bottom;
			}
			else
				this.tree.items.insertAfter(this.insertionPoint, item);

			this.isDirty = true;
			this.numItems++;

			if (this.numItems > this.tree.leafLevel)
				this.tree.leafLevel = this.numItems;

			if (item.numRefNodes == 0)
				item.notifyInserted(this.tree);

			item.numRefNodes++;
			return 0;
		}

		this.isLeaf = false;

		this.subNode[0] = QuadTreeNode.alloc().init(this.tree, this.extents.x1, this.extents.y1, this.extents.cx, this.extents.cy);
		this.subNode[1] = QuadTreeNode.alloc().init(this.tree, this.extents.cx, this.extents.y1, this.extents.x2, this.extents.cy);
		this.subNode[2] = QuadTreeNode.alloc().init(this.tree, this.extents.x1, this.extents.cy, this.extents.cx, this.extents.y2);
		this.subNode[3] = QuadTreeNode.alloc().init(this.tree, this.extents.cx, this.extents.cy, this.extents.x2, this.extents.y2);

		let k = this.extents.width() >> 1;
		if (this.tree.leafSize === null || k < this.tree.leafSize) this.tree.leafSize = k;

		let n = this.numItems;
		this.numItems = 0;

		for (let i = 0; i < n; i++)
		{
			let next = this.insertionPoint.next;
			let tmp = this.insertionPoint.value;

			tmp.numRefNodes--;

			let result = this.addItem(tmp);
			if (result)
			{
				console.log( 'ITEM: ' + tmp.insertionBounds );
				console.log( 'EXTENTS: ' + this.extents );
				console.log( 'INTERSECTION: ' + Bounds2.alloc().set(tmp.insertionBounds).setAsIntersection(this.extents) );

				throw new Error ('Error: Unable to insert item on a sub-node of a just-split node: ' + result);
			}

			this.tree.items.remove (this.insertionPoint);
			this.insertionPoint = next;
		}

		this.insertionPoint = null;
		return this.addItem(item);
	},

	/*
	**	Removes an item from the node and/or its sub-nodes. Returns false if the node was not found.
	*/
	removeItem: function (/*QuadTreeItem*/item)
	{
		if (!item.insertionBounds.intersects(this.extents))
			return false;

		if (!this.isLeaf)
		{
			let result = false;

			for (let i = 0; i < 4; i++)
				result |= this.subNode[i].removeItem (item);

			if (result)
			{
				this.isDirty = true;
				this.numItems--;
			}

			return result;
		}

		let i = this.insertionPoint;
		let n = this.numItems;

		for (; i !== null && n--; i = i.next)
		{
			if (i.value === item) break;
		}

		if (i === null)
			return false;

		this.isDirty = true;
		this.numItems--;

		item.numRefNodes--;

		if (i === this.insertionPoint)
			this.insertionPoint = this.numItems ? i.next : null;

		this.tree.items.remove(i);

		if (item.numRefNodes == 0)
			item.notifyRemoved(this.tree);

		return true;
	},

	/*
	**	Selects items inside the specified region from the node and all sub-nodes.
	*/
	selectItems: function (/*Bounds2*/bounds=null, filter=null, context=null)
	{
		if (bounds && !bounds.intersects(this.extents))
			return;

		if (!this.isLeaf)
		{
			for (let i = 0; i < 4; i++)
				this.subNode[i].selectItems (bounds, filter, context);
		}
		else
		{
			let i = this.insertionPoint;
			let n = this.numItems;

			for (; i !== null && n--; i = i.next)
			{
				if (!(i.value.flags & QuadTreeItem.FLAG_NEVER_SELECT) && (bounds == null || (i.value._visible == true && i.value.insertionBounds.intersects(bounds)) || (i.value.flags & QuadTreeItem.FLAG_ALWAYS_SELECT)))
				{
					if (filter && !filter(i.value, context))
						continue;

					if (!(i.value.flags & QuadTreeItem.FLAG_SELECTED))
					{
						i.value.flags |= QuadTreeItem.FLAG_SELECTED;
						this.tree.selectedCount++;
					}
				}
			}
		}
	},

	/*
	**	Finds all collisions and executes the specified handler. Before calling the handler the provided filter function will
	**	be used to determine if the two objects colliding actually represent a semantically correct collision.
	*/
	detectCollisions: function (/*IQuadTreeHandler*/handler, context=null, forced=false)
	{
		if (!this.isDirty && !forced)
			return;

		this.isDirty = false;

		if (!this.isLeaf)
		{
			for (let i = 0; i < 4; i++)
				this.subNode[i].detectCollisions (handler, context, forced);

			return;
		}

		let n = this.numItems;
		let i_next;

		for (let i = this.insertionPoint; i !== null && n > 1; i = i_next)
		{
			i_next = i.next;
			let m = --n;

			if (i.value._visible === false || (i.value.flags & QuadTreeItem.FLAG_NEVER_SELECT))
				continue;

			if (!handler.onFilterRequest (i.value, context))
				continue;

			let rect = i.value.bounds;
			let j_next;

			for (let j = i.next; j && m-- > 0; j = j_next)
			{
				j_next = j.next;

				if (j.value._visible == false || (j.value.flags & QuadTreeItem.FLAG_NEVER_SELECT))
					continue;

				if (!handler.onFilterRequest (j.value, context))
					continue;

				if (!j.value.bounds.intersects(rect))
					continue;

				// Following code is non-standard cherry. Required because recycler could reuse the object and update the objectId.
				let iId = i.objectId;
				let jId = j.objectId;

				handler.onCollision (i.value, j.value, context);

				// NOTE: Restarting the collision detector on this loop will cause an infinite loop if the collision
				// is not properly resolved by the handler. It is recommended to gather all collisions instead and
				// run a global solver.

				if (i.objectId != iId)
				{
					i_next = this.insertionPoint;
					n = this.numItems;
					break;
				}

				if (j.objectId != jId)
				{
					j_next = i.next;
					m = n;
					continue;
				}
			}
		}
	}
});

Recycler.attachTo(QuadTreeNode);
export default QuadTreeNode;
