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
import System from '../system/system.js';

//![import "./grid-element"]
//![import "../system/globals"]
//![import "../utils/recycler"]
//![import "./idrawable"]

//:/**
//: * Describes an element that can be rendered to the screen.
//: */

//!class Element extends GridElement

const Element = GridElement.extend
({
	className: 'Element',

	/**
	 * Parent group to whom this element is related.
	 * !group: Group;
	 */
	group: null,

	/**
	 * Drawable object to render to the display.
	 * !img: IDrawable;
	 */
	img: null,

	/**
	 * Indicates if the bounds of the element should be drawn (for debugging purposes).
	 * !debugBounds: boolean;
	 */
	debugBounds: false,

	/**
	 * Basic depth (z-value) of the element (used for depth micro-adjustments).
	 */
	_zvalue: 0,

	/**
	 * Actual depth (z-value) of the element, calculated by the container.
	 */
	__zvalue: 0,

	/**
	 * Alpha value of the element.
	 */
	_alpha: 1.0,

	/**
	 * Element shader program.
	 */
	_shaderProgram: null,

	/**
	 * Function used to set the uniforms of the shader.
	 */
	_uniformSetter: null,

	/**
	 * Function used to render the element. Called by `draw` after rendering configuration has been set. Defaults to `renderDefault`.
	 */
	render: null,

	/**
	 * Constructs a drawable element at the specified position with the given drawable.
	 * !constructor (x: number, y: number, width: number, height: number, img?: IDrawable);
	 */
	/**
	 * Constructs a drawable element at the specified position with the given drawable.
	 * !constructor (x: number, y: number, img?: IDrawable);
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

		this.group = null;
		this.debugBounds = false;

		this._zvalue = 0;
		this.__zvalue = 0;
		this._alpha = 1.0;

		this._shaderProgram = null;
		this._uniformSetter = null;

		this.render = Element.renderDefault;
	},

	/**
	 * Destroys the element.
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

	/**
	 * Destroys the element later by adding it to the scene's destruction queue. If the element has no container, it will be destroyed immediately.
	 * !destroyLater() : void;
	 */
	destroyLater: function()
	{
		if (!this.alive()) return;

		if (this.container !== null)
			this.container.scene.disposeLater(this);
		else
			dispose(this);
	},

	/**
	 * Returns the alpha value of the element.
	 * @returns {number}
	 * !alpha () : number;
	 */
	/**
	 * Sets the alpha value of the element.
	 * @param {number} value
	 * @returns {Element}
	 * !alpha (value: number) : Element;
	 */
	alpha: function (value=null)
	{
		if (value === null)
			return this._alpha;

		this._alpha = value;
		return this;
	},

	/**
	 * Returns the zvalue of the element.
	 * @returns {number}
	 * !zvalue () : number;
	 */
	/**
	 * Sets the zvalue of the element.
	 * @param {number} value
	 * @returns {Element}
	 * !zvalue (value: number) : Element;
	 */
	zvalue: function (value=null)
	{
		if (value === null)
			return this._zvalue;

		this._zvalue = value;
		return this;
	},

	/**
	 * Returns the shader program of the element.
	 * @returns {ShaderProgram}
	 * !shaderProgram () : ShaderProgram;
	 */
	/**
	 * Sets the shader program of the element.
	 * @param {ShaderProgram} shaderProgram
	 * @returns {Element}
	 * !shaderProgram (shaderProgram: ShaderProgram) : Element;
	 */
	shaderProgram: function (shaderProgram=false)
	{
		if (shaderProgram === false)
			return this._shaderProgram;

		this._shaderProgram = shaderProgram;
		return this;
	},

	/**
	 * Sets the uniform setter function.
	 * @param { (elem:Element, gl:WebGLRenderingContext, pgm:ShaderProgram) => void } uniformSetter
	 * @returns {Element}
	 * !uniformSetter (uniformSetter: (elem:Element, gl:WebGLRenderingContext, pgm:ShaderProgram) => void) : Element;
	 */
	uniformSetter: function (uniformSetter)
	{
		this._uniformSetter = uniformSetter;
		return this;
	},

	/**
	 * Draws the element on the specified canvas.
	 * @param {Canvas} g
	 */
	draw: function(g)
	{
		let shaderChanged = this._shaderProgram !== null ? g.pushShaderProgram(this._shaderProgram) : false;
		let depthFlagChanged = this.depthFlagEnabled() ? g.pushDepthFlag(this.depthFlag()) : false;

		if (this._shaderProgram !== null && this._uniformSetter !== null && g.gl !== null)
			this._uniformSetter (this, g.gl, g.getShaderProgram());

		g.zvalue = this.__zvalue;

		if (this._alpha != 1.0)
		{
			g.pushAlpha();
			g.alpha(this._alpha);
		}

		if (this.render)
			this.render(g);

		if (depthFlagChanged) g.popDepthFlag();
		if (shaderChanged) g.popShaderProgram();

		if (this._alpha != 1.0)
			g.popAlpha();

		/* *********** */
		if (G.debugBounds || this.debugBounds)
		{
			let g2 = System.displayBuffer2;

			g2.pushMatrix();
			g2.loadMatrix(g.getMatrix());

			g2.fillStyle(this.debugBounds === 1 ? 'rgba(255,255,0,0.5)' : 'rgba(0,255,255,0.5)');
			g2.fillRect(this.bounds.x1, this.bounds.y1, this.bounds.width(), this.bounds.height());

			g2.popMatrix();
		}
	},

	/**
	 * Changes the function used to render the element.
	 * @param { (g:Canvas) => void } renderFunction
	 * @returns {Element}
	 */
	renderWith: function (renderFunction)
	{
		this.render = renderFunction ?? Element.renderDefault;
		return this;
	}
});

/**
 * Draws the element in the canvas.
 * @param {Canvas} g
 * !static renderDefault (g: Canvas) : void;
 */
Element.renderDefault = function(g)
{
	this.img.draw (g, this.bounds.x1, this.bounds.y1, this.bounds.width(), this.bounds.height());
};

/**
 * Draws the image without resizing it and clipped to the element's size.
 * @param {Canvas} g
 * !static renderClipped (g: Canvas) : void;
 */
Element.renderClipped = function(g)
{
	let img = this.img.getImage();

	g.drawImage (img,
			this.img.x, this.img.y, this.bounds.width()*img.rscale, this.bounds.height()*img.rscale,
			this.bounds.x1, this.bounds.y1, this.bounds.width(), this.bounds.height(),
			null, null,
			this.img.width, this.img.height);
}

/**
 * Draws the element with a composition of several tiles from a nine-slice spritesheet to create a box.
 * @param {Canvas} g
 * !static renderNineSlice (g: Canvas) : void;
 */
Element.renderNineSlice = function(g)
{
	let ss = this.img.spritesheet;
	if (!ss) throw new Error('renderNineSlice requires the drawable to be a spritesheet with nine frames.');

	let leftWidth = ss.getFrame(0).width;
	let rightWidth = ss.getFrame(2).width;
	let midWidth = ss.getFrame(1).width;

	let topHeight = ss.getFrame(0).height;
	let bottomHeight = ss.getFrame(6).height;
	let midHeight = ss.getFrame(3).height;

	let n = int((this.bounds.width() - leftWidth - rightWidth) / midWidth);
	let m = int((this.bounds.height() - topHeight - bottomHeight) / midHeight);

	let x1 = this.bounds.x1;
	let y1 = this.bounds.y1;

	// Corners
	ss.getFrame(0).draw(g, x1, y1);
	ss.getFrame(2).draw(g, x1 + leftWidth + n*midWidth, y1);
	ss.getFrame(6).draw(g, x1, y1 + topHeight + m*midHeight);
	ss.getFrame(8).draw(g, x1 + leftWidth + n*midWidth, y1 + topHeight + m*midHeight);

	// Top/Bottom
	for (let i = 0; i < n; i++) {
		ss.getFrame(1).draw(g, x1 + leftWidth + i*midWidth, y1);
		ss.getFrame(7).draw(g, x1 + leftWidth + i*midWidth, y1 + topHeight + m*midHeight);
	}

	// Left/Right
	for (let i = 0; i < m; i++) {
		ss.getFrame(3).draw(g, x1, y1 + topHeight + i*midHeight);
		ss.getFrame(5).draw(g, x1 + leftWidth + n*midWidth, y1 + topHeight + i*midHeight);
	}

	// Center
	for (let j = 0; j < m; j++)
	for (let i = 0; i < n; i++) {
		ss.getFrame(4).draw(g, x1 + leftWidth + i*midWidth, y1 + topHeight + j*midHeight);
	}
};

/**
 * Draws the image without resizing it and repeated to the element's size.
 * @param {Canvas} g
 * !static renderRepeat (g: Canvas) : void;
 */
Element.renderRepeat = function(g)
{
	let img = this.img.getImage();

	let h = this.bounds.height();
	let w = this.bounds.width();

	let ih = this.img.height;
	let iw = this.img.width;

	let rh = ih * img.rscale;
	let rw = iw * img.rscale;

	let x, y;

	for (y = 0; y+ih < h; y += ih)
	{
		for (x = 0; x+iw < w; x += iw)
		{
			g.drawImage (img,
					this.img.x, this.img.y, rw, rh,
					this.bounds.x1 + x, this.bounds.y1 + y, iw, ih);
		}

		if (x < w)
		{
			g.drawImage (img,
				this.img.x, this.img.y, (w-x)*img.rscale, rh,
				this.bounds.x1 + x, this.bounds.y1 + y, w-x, ih);
		}
	}

	if (y < h)
	{
		ih = h-y;
		rh = ih*img.rscale;

		for (x = 0; x+iw < w; x += iw)
		{
			g.drawImage (img,
					this.img.x, this.img.y, rw, rh,
					this.bounds.x1 + x, this.bounds.y1 + y, iw, ih);
		}

		if (x < w)
		{
			g.drawImage (img,
				this.img.x, this.img.y, (w-x)*img.rscale, rh,
				this.bounds.x1 + x, this.bounds.y1 + y, w-x, ih);
		}
	}
};

//!/class

//!namespace Element
//!namespace Pool

	/**
	 * Allocates a drawable element at the specified position with the given drawable.
	 * !function alloc (x: number, y: number, width: number, height: number, img?: IDrawable) : Element;
	 */
	/**
	 * Allocates a drawable element at the specified position with the given drawable.
	 * !function alloc (x: number, y: number, img?: IDrawable) : Element;
	 */

Recycler.createPool(Element);
export default Element;
