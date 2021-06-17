/*
**	flow/scene.js
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
import Container from './container.js';
import Viewport from './viewport.js';
import Rect from '../math/rect.js';

/*
**	An scene is a set of containers and viewports in specific order.
*/

const Scene = Element.extend
({
	className: 'Scene',

	/*
	**	List of containers.
	*/
	layers: null,

	/*
	**	List of viewports.
	*/
	viewports: null,

	/*
	**	Viewport bounds to select items.
	*/
	viewportBounds: null,

	/*
	**	Constructs an empty scene.
	*/
	__ctor: function()
	{
		this._super.Element.__ctor();

		this.layers = [];

		this.viewports = [];
		this.viewportBounds = Rect.alloc();

		this.container = false;
	},

	/*
	**	Destructs the instance.
	*/
	__dtor: function()
	{
		this._super.Element.__dtor();

		this.viewportBounds.dispose();
	},

	/*
	**	Sets a layer at the specified index.
	*/
	set: function (index, layer)
	{
		if (index < 0) return;

		if (!layer.isInstanceOf(Container))
			throw new Error('Scene: Unable to set layer at index ' + index + ': argument is not a Container.');

		this.layers[index] = layer;
		return layer;
	},

	/*
	**	Returns the layer at the specified index.
	*/
	get: function (index)
	{
		return index < 0 || index >= this.layers.length ? null : this.layers[index];
	},

	/*
	**	Sets a viewport at the specified index.
	*/
	setViewport: function (index, viewport)
	{
		if (index < 0) return;

		if (!viewport.isInstanceOf(Viewport))
			throw new Error('Scene: Unable to set viewport at index ' + index + ': argument is not a Viewport.');

		this.viewports[index] = viewport;
		return viewport;
	},

	/*
	**	Returns the viewport at the specified index.
	*/
	getViewport: function (index)
	{
		return index < 0 || index >= this.viewports.length ? null : this.viewports[index];
	},

	/*
	**	Draws the layers in order.
	*/
	elementDraw: function (g)
	{
		if (!this.viewports.length)
		{
			this._sceneDraw(g, null);
			return;
		}

		for (let viewportIndex = 0; viewportIndex < this.viewports.length; viewportIndex++)
		{
			let viewport = this.viewports[viewportIndex];
			if (!viewport || !viewport.isEnabled()) continue;

			g.pushClip();

			let area = viewport.getScreenBounds();
			g.clip(area.x1, area.y1, area.width()+1, area.height()+1);

			g.pushMatrix();

			viewport.applyTransform(g);

// VIOLET : REMOVE THIS {
/*area = viewport.getFocusBounds();
g.beginPath();
g.moveTo(area.x1, area.y1);
g.lineTo(area.x2, area.y1);
g.lineTo(area.x2, area.y2);
g.lineTo(area.x1, area.y2);
g.closePath();
g.stroke('red');*/
// }
			this.viewportBounds.set(viewport.getBounds()).resizeBy(1, 1);
			this._sceneDraw(g, this.viewportBounds);

			g.popMatrix();
			g.popClip();
		}
	},

	/*
	**	Actually draws the layers in the specified canvas.
	*/
	_sceneDraw: function (g, viewportBounds)
	{
		try
		{
			for (let i = 0; i < this.layers.length; i++)
			{
				if (!this.layers[i])
					continue;

				this.layers[i].setViewportBounds(viewportBounds);
				this.layers[i].draw(g);
			}
		}
		catch (e) {
			if (e.message != "SYS::FRAME_END") {
				throw e;
			}
		}
	},

	/*
	**	Updates the viewports and layers.
	*/
	elementUpdate: function (dt)
	{
		try
		{
			for (let i = 0; i < this.layers.length; i++)
			{
				if (!this.layers[i])
					continue;

				this.layers[i].update(dt);
			}

			for (let i = 0; i < this.viewports.length; i++)
			{
				if (!this.viewports[i])
					continue;

				this.viewports[i].update(dt);
			}
		}
		catch (e) {
			if (e.message != "SYS::FRAME_END")
				throw e;
		}
	}
});

/*
**	Some layer index constants for consistency.
*/

Scene.LAYER_BACK0 		= 0;
Scene.LAYER_BACK1 		= 1;
Scene.LAYER_MAIN0 		= 2;
Scene.LAYER_MAIN1 		= 3;
Scene.LAYER_FRONT0 		= 4;
Scene.LAYER_FRONT1 		= 5;
Scene.LAYER_UI0 		= 6;
Scene.LAYER_UI1 		= 7;
Scene.LAYER_COLLISIONS0	= 8;
Scene.LAYER_COLLISIONS1	= 9;

export default Scene;
