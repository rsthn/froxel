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

/*
**	A container is responsible to store drawable elements (Element class) for their subsequent rendering. The actual storage
**	mechanism used can vary and must be implemented by derived classes (see GridContainer and SimpleContainer).
*/

const Container = Class.extend
({
	className: 'Container',

	/*
	**	Viewport bounds currently active. Set by the Scene class before calling `draw`.
	*/
	viewportBounds: null,

	/*
	**	Dimensions of the container.
	*/
	width: 0, height: 0,

	/*
	**	Depth (z-value) of the container.
	*/
	zvalue: 0,

	/*
	**	Scene object to which this container belongs.
	*/
	scene: null,

	/*
	**	Flags of the object (see constants at the bottom of this file).
	*/
	flags: 0,

	/*
	**	Currently active display buffer for rendering operations (used by drawElement).
	*/
	g: null,

	/*
	**	Total number of elements in the container.
	*/
	elementCount: 0,

	/*
	**	Total number of elements drawn on the last draw operation.
	*/
	drawCount: 0,

	/*
	**	Constructs the container with the specified size.
	*/
	__ctor: function (width=32768, height=32768)
	{
		this.width = width;
		this.height = height;

		this.flags = Container.VISIBLE | Container.DEPTH_FLAG;
	},

	/*
	**	Destroys the container.
	*/
	__dtor: function()
	{
	},

	/*
	**	Sets or gets the visible flag.
	*/
	visible: function (value=null)
	{
		if (value === null)
			return !!(this.flags & Container.VISIBLE);

		this.flags &= ~Container.VISIBLE;
		if (value) this.flags |= Container.VISIBLE;

		return this;
	},

	/*
	**	Sets or gets the depth-test flag.
	*/
	depthFlag: function (value=null)
	{
		if (value === null)
			return !!(this.flags & Container.DEPTH_FLAG);

		this.flags &= ~Container.DEPTH_FLAG;
		if (value) this.flags |= Container.DEPTH_FLAG;

		return this;
	},

	/*
	**	Sets the active viewport bounds.
	*/
	setViewportBounds: function (rect)
	{
		this.viewportBounds = rect;
		return this;
	},

	/*
	**	Draws the specified element.
	*/
	drawElement: function (elem, self)
	{
		self.drawCount++;
		return elem.draw(self.g);
	},

	/*
	**	Updates the Z-value of the specified element. Should be called after adding an element and after/before every sync.
	*/
	syncZ: function (elem)
	{
		elem.__zvalue = this.zvalue + elem._zvalue + elem.bounds.y2;
	},

	/*
	**	Syncs the actual location of the specified element with its storage location. Returns true if successful.
	*/
	sync: function (elem)
	{
		throw new Error ('Container::sync not implemented');
	},

	/*
	**	Clears the container to empty. All contained elements will be destroyed.
	*/
	clear: function() /* @override */
	{
		throw new Error ('Container::clear not implemented');
	},

	/*
	**	Resets the container to empty. Contained elements are not destroyed. Use `clear` if that is your intention.
	*/
	reset: function() /* @override */
	{
		throw new Error ('Container::reset not implemented');
	},

	/*
	**	Adds an element to the container. Returns boolean indicating if successful.
	*/
	add: function (elem) /* @override */
	{
		throw new Error ('Container::add not implemented');
	},

	/*
	**	Removes an element from the container and returns it.
	*/
	remove: function (elem) /* @override */
	{
		throw new Error ('Container::remove not implemented');
	},

	/*
	**	Draws the contained elements.
	*/
	draw: function(g)
	{
		if (!this.visible()) return;

		let depthFlagChanged = g.pushDepthFlag(this.flags & Container.DEPTH_FLAG);

		g.zvalue = this.zvalue;

		this.drawCount = 0;
		this.g = g;

		this._draw();

		if (depthFlagChanged) g.popDepthFlag();
	},

	/*
	**	Actually draws the contained elements.
	*/
	_draw: function()
	{
		throw new Error ('Container::draw not implemented');
	}
});


/*
**	Constants.
*/
Container.VISIBLE = 0x001;
Container.DEPTH_FLAG = 0x002;

export default Container;
