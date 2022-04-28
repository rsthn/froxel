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
import Canvas from '../system/canvas.js';
import ShaderProgram from '../system/shader-program.js';

//![import "./grid-element"]
//![import "../system/globals"]
//![import "../utils/recycler"]
//![import "../system/system"]
//![import "../system/canvas"]
//![import "../system/shader-program"]

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
	 * !img: Drawable;
	 */
	img: null,

	/**
	 * Indicates if the bounds of the element should be drawn (for debugging purposes). You can set it to a boolean or to a number from 1 to 7 to
	 * draw the bounds with a different predefined color.
	 * !debugBounds: boolean|number;
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
	 * Function used to render the element. Called by `draw` after rendering configuration has been set.
	 * @type {(g:Canvas, elem:Element, img:Drawable) => void}
	 */
	render: null,

	/**
	 * Constructs a drawable element at the specified position with the given drawable.
	 * !constructor (x: number, y: number, width: number, height: number, img?: Drawable);
	 */
	/**
	 * Constructs a drawable element at the specified position with the given drawable.
	 * !constructor (x: number, y: number, img?: Drawable);
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

		this.render = null;
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
	 * Returns the `debugBounds` of the element.
	 * @returns {number}
	 * !debug () : number;
	 */
	/**
	 * Sets the `debugBounds` of the element.
	 * @param {boolean|number} value
	 * @returns {Element}
	 * !debug (value: number) : Element;
	 */
	debug: function (value=null)
	{
		if (value === null)
			return this.debugBounds;

		this.debugBounds = value === 0 ? true : value;
		return this;
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
	 * !shaderProgram (shaderProgram: ShaderProgram|string) : Element;
	 */
	shaderProgram: function (shaderProgram=false)
	{
		if (shaderProgram === false)
			return this._shaderProgram;

		if (typeof(shaderProgram) === 'string')
			shaderProgram = ShaderProgram.get(shaderProgram);

		this._shaderProgram = shaderProgram;
		return this;
	},

	/**
	 * Sets the uniform setter function.
	 * @param { (pgm:ShaderProgram, elem:Element, gl:WebGLRenderingContext) => void } uniformSetter
	 * @returns {Element}
	 * !uniformSetter (uniformSetter: (pgm:ShaderProgram, elem:Element, gl:WebGLRenderingContext) => void) : Element;
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
		if (this.img !== null || this.render !== null)
		{
			let shaderChanged = this._shaderProgram !== null ? g.pushShaderProgram(this._shaderProgram) : false;
			let depthFlagChanged = this.depthFlagEnabled() ? g.pushDepthFlag(this.depthFlag()) : false;

			if (this._shaderProgram !== null && this._uniformSetter !== null && g.gl !== null)
				this._uniformSetter (g.getShaderProgram(), this, g.gl);

			g.zvalue = this.__zvalue;

			if (this._alpha != 1.0)
			{
				g.pushAlpha();
				g.alpha(this._alpha);
			}

			if (this.render !== null)
				this.render(g, this, this.img);
			else
				this.img.render(g, this);

			if (depthFlagChanged) g.popDepthFlag();
			if (shaderChanged) g.popShaderProgram();

			if (this._alpha != 1.0)
				g.popAlpha();
		}

		/* *********** */
		if (G.debugBounds || this.debugBounds)
		{
			let m = g.getMatrix();
			g = System.displayBuffer2;
	
			g.pushMatrix();
			g.loadMatrix(m);
			g.fillStyle(Element.getDebugColor(this.debugBounds));
			g.fillRect(this.bounds.x1, this.bounds.y1, this.bounds.width(), this.bounds.height());
			g.popMatrix();
		}
	},

	/**
	 * Changes the function used to render the element.
	 * @param { (g:Canvas, elem:Element, img:Drawable) => void } renderFunction
	 * @returns {Element}
	 */
	renderWith: function (renderFunction)
	{
		this.render = renderFunction ?? null;
		return this;
	}
});

/**
 * Colors for the bounds debugging.
 * !static debugColors : Array<string>;
 */
Element.debugColors = [
	'rgba(0,255,255,0.35)', // Cyan
	'rgba(255,255,0,0.35)', // Yellow
	'rgba(255,0,255,0.35)', // Magenta
	'rgba(255,255,255,0.35)', // White
	'rgba(255,0,0,0.35)', // Red
	'rgba(0,255,0,0.35)', // Green
	'rgba(0,0,255,0.35)', // Blue
	'rgba(128,128,128,0.35)' // Gray
];

/**
 * Returns an RGBA color for the given `debugBounds` value.
 * !static getDebugColor (debugBounds: boolean|number) : string;
 */
Element.getDebugColor = function (debugBounds)
{
	if (debugBounds === true || debugBounds === false)
		debugBounds = 0;

	return Element.debugColors[(~~debugBounds) & 7];
};

//!/class

//!namespace Element
//!namespace Pool

	/**
	 * Allocates a drawable element at the specified position with the given drawable.
	 * !function alloc (x: number, y: number, width: number, height: number, img?: Drawable) : Element;
	 */
	/**
	 * Allocates a drawable element at the specified position with the given drawable.
	 * !function alloc (x: number, y: number, img?: Drawable) : Element;
	 */

Recycler.createPool(Element);
export default Element;
