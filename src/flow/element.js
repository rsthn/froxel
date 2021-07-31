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

/*
**	Describes an element that can be rendered to the screen.
*/

export default GridElement.extend
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
	**	Destroys the element.
	*/
	destroy: function()
	{
		if (!this.alive()) return;

		dispose(this);
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
			this.img.draw(g, this.bounds.x1, this.bounds.y1);
		}

		if (g.gl !== null) return;

		if (G.debugBounds || this.debugBounds)
		{
			g.fillStyle("rgba(0,255,255,0.5)");
			g.fillRect(this.bounds.x1, this.bounds.y1, this.bounds.width(), this.bounds.height());
		}

		/*if (G.debugId && this.type)
		{
			g.font('bold 3px monospace');
			g.textBaseline('top');
			g.fillStyle('#000');
			g.fillRect(this.insertionBounds.x1, this.insertionBounds.y1-1, g.measureText(this.id), 4);
			g.fillStyle('#fff');
			g.fillText(this.id, this.insertionBounds.x1, this.insertionBounds.y1);
		}*/
	}
});
