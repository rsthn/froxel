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

import Element from './element.js';

/*
**	Groups one or more elements into a single one.
*/

export default Element.extend
({
	className: 'Group',

	debugHitbox: false,
	highlight: false,

	/*
	**	Array of children related to the group.
	*/
	children: null,

	// violet: remove??
	undisposable: false,

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
		if (this.undisposable)
			return;

		this._super.Element.__dtor();

		if (this.children != null)
		{
			let tmp = this.children;
			this.children = null;
			tmp.forEach(i => dispose(i));
		}
	},

	/*
	**	Resets the animation object of the element.
	*/
	resetAnim: function (anim=null)
	{
		this._super.Element.resetAnim(anim);

		if (this.children != null)
			this.children.forEach(i => i.resetAnim());
	},

	/*
	**	Adds a child element to the group.
	*/
	addChild: function (elem)
	{
		if (!elem) return elem;

		if (this.children == null)
			this.children = [];

		this.children.push (elem);
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

		let i = this.children.indexOf(elem);
		if (i === -1) return elem;

		this.children.splice(i, 1);
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
			this.children.forEach(elem => elem.updatePosition());
	},

	/*
	**	Updates the element's transformation matrix.
	*/
	updateTransform: function(immediate=false)
	{
		this._super.Element.updateTransform(immediate);

		if (this.children != null)
			this.children.forEach(elem => elem.updateTransform(immediate));
	}
});
