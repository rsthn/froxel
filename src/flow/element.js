/*
**	flow/element.js
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

import GridElement from './grid-element.js';
import G from '../system/globals.js';
import Recycler from '../utils/recycler.js';

/*
**	Describes an element that can be rendered to the screen.
*/

const Element = GridElement.extend
({
	className: 'Element',

	/*
	**	Parent group to whom this element is related.
	*/
	group: null,

	/*
	**	Drawable object, should have methods draw(g,x,y), getDrawable(), and properties width, and height.
	*/
	img: null,

	/*
	**	Indicates if the bounds of the element should be drawn (for debugging purposes).
	*/
	debugBounds: false,

	/*
	**	Constructs a drawable element at the specified position with the given image.
	**
	**	x, y, width, height, img
	**	x, y, img
	*/
	__ctor: function(x, y, width=null, height=null, img=null)
	{
		if (width === null)
			width = height = 0;

		if (height === null)
		{
			img = width;
			width = img.width;
			height = img.height;
		}

		this._super.GridElement.__ctor(x, y, width, height);
		this.img = img !== null ? img.getDrawable() : img;
	},

	/*
	**	Destroys the element.
	*/
	__dtor: function()
	{
		if (this.img !== null)
		{
			dispose(this.img);
			this.img = null;
		}

		this._super.GridElement.__dtor();
	},

	/*
	**	Destroys the element later by adding it to the scene's destruction queue. If the element has no container, it will be destroyed immediately.
	*/
	destroyLater: function()
	{
		if (!this.alive()) return;

		if (this.container !== null)
			this.container.scene.disposeLater(this);
		else
			dispose(this);
	},

	/*
	**	Draws the element on the specified canvas.
	*/
	draw: function(g)
	{
		if (this.img !== null)
		{
			g.zvalue = this.zvalue;
			this.img.draw(g, this.bounds.x1, this.bounds.y1);
		}

		if (G.debugBounds || this.debugBounds)
		{
			let g2 = System.displayBuffer2;

			g2.pushMatrix();
			g2.loadMatrix(g.getMatrix());

			g2.fillStyle('rgba(0,255,255,0.5)');
			g2.fillRect(this.bounds.x1, this.bounds.y1, this.bounds.width(), this.bounds.height());

			g2.popMatrix();
		}
	}
});


/*
**	Setup recycling facility.
*/

const Pool = Element.extend
({
	className: 'Element',

	__ctor: function ()
	{
	},

	init: function(x, y, width=null, height=null, img=null)
	{
		this._super.Element.__ctor(x, y, width, height, img);
		return this;
	}
});

Recycler.attachTo(Pool);
Element.Pool = Pool;

export default Element;
