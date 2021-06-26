/*
**	flow/container.js
**
**	Copyright (c) 2013-2021, RedStar Technologies, All rights reserved.
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
import Element from './element.js';
import QuadTree from '../spatial/quadtree.js';

/*
**	Element container class.
*/

export default Class.extend(Element,
{
	className: 'Container',

	reverseDraw: false,

	tree: null,
	viewportBounds: null,

	__ctor: function (x1=-1e6, y1=-1e6, x2=1e6, y2=1e6, nodeCapacity=24)
	{
		this._super.Element.__ctor();

		this.container = false;

		this.tree = new QuadTree (x1, y1, x2, y2, nodeCapacity);
	},

	getTree: function()
	{
		return this.tree;
	},

	add: function(elem)
	{
		if (!this.tree.addItem(elem))
			return null;

		elem.container = this;

		elem.onAttached(this);
		return elem;
	},

	remove: function(elem)
	{
		if (elem.container !== this)
			return elem;

		this.tree.removeItem(elem);

		elem.onDetached(this);
		return elem;
	},

	syncPosition: function(elem)
	{
		if (!elem || elem.container !== this)
			return;

		this.tree.updateItem(elem);
	},

	setViewportBounds: function(rect)
	{
		this.viewportBounds = rect;
	},

	elementDraw: function(g)
	{
		this.tree.selectItems(this.viewportBounds, this.reverseDraw);

		while (true)
		{
			let elem = this.tree.getNextSelected();
			if (!elem) break;

			elem.draw(g);
		}

		this.containerDraw(g);
	},

	elementUpdate: function(dt)
	{
		this.tree.lock();

		for (let i = this.tree.getItems().top; i; i = i.next)
			i.value.update(dt);

		this.containerUpdate(dt);

		this.tree.unlock();
		this.tree.update();
	},

	containerDraw: function(g) /* @override */
	{
	},

	containerUpdate: function(dt) /* @override */
	{
	},
});
