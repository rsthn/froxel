/*
**	flow/group.js
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

import List from '../utils/list.js';
import Element from './element.js';

/*
**	Groups one or more elements into a single one.
*/

export default Element.extend
({
	className: 'Group',

	/*
	**	Array of children related to the group.
	*/
	children: null,

	/*
	**	Constructs an empty group element.
	*/
	__ctor: function (x, y, width=1, height=1)
	{
		this._super.Element.__ctor(x, y, width, height);
	},

	/*
	**	Destroys the group, all children and related elements.
	*/
	__dtor: function()
	{
		this.clear();
		this._super.Element.__dtor();
	},

	/*
	**	Removes and destroys all children elements.
	*/
	clear: function()
	{
		if (this.children === null)
			return;

		let elem;

		while ((elem = this.children.shift()) != null)
		{
			elem.setParent(null);
			dispose(elem);
		}

		this.children.free();
		this.children = null;

		return this;
	},

	/*
	**	Resets the animation object of the element.
	*/
	resetAnim: function (anim=null)
	{
		this._super.Element.resetAnim(anim);

		if (this.children != null)
		{
			for (let i = this.children.top; i; i = i.next)
				i.value.resetAnim();
		}
	},

	/*
	**	Adds a child element to the group.
	*/
	addChild: function (elem)
	{
		if (!elem) return elem;

		if (this.children === null)
			this.children = List.calloc();

		this.children.push(elem);
		elem.setParent(this);

		return elem;
	},

	/*
	**	Removes a child element from the group.
	*/
	removeChild: function (elem)
	{
		if (elem == null || elem.parent !== this || this.children == null)
			return elem;

		let i = this.children.sgetNode(elem);
		if (!i) return elem;

		this.children.remove(i);
		elem.setParent(null);

		return elem;
	},

	/*
	**	Updates the position of the element in the container.
	*/
	updatePosition: function()
	{
		this._super.Element.updatePosition();

		if (this.children != null)
		{
			for (let i = this.children.top; i; i = i.next)
				i.value.updatePosition();
		}
	},

	/*
	**	Moves the elements by the specified deltas.
	*/
	translate: function (dx, dy, upscaled=false)
	{
		let _dx = this.bounds.x1;
		let _dy = this.bounds.y1;

		this._super.Element.translate(dx, dy, upscaled);

		_dx = this.bounds.x1 - _dx;
		_dy = this.bounds.y1 - _dy;

		if (this.children != null)
		{
			for (let i = this.children.top; i; i = i.next)
				i.value.translate(_dx, _dy);
		}

		return this;
	}
});
