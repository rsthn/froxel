
import ShaderProgram from './shader-program.js';
import VertexArray from './vertex-array.js';

export default WebGLCanvas;


/**
 * @typedef {Object} WebGLCanvasOptions
 * @prop {boolean} [fullscreen] Positions the canvas to cover the entire screen. default `true`
 * @prop {boolean} [stencil] Indicates if the stencil buffer should be enabled. default `false`
 * @prop {string} [background] Background color, must be a 6-digit hex RGB value. default `#000000`
 * @prop {number} [width] Width of the canvas, used only when `fullscreen` is `false`. default `960`
 * @prop {number} [height] Height of the canvas, used only when `fullscreen` is `false`. default `540`
 */
const defaultOptions = {
	fullscreen: true,
	stencil: false,
	background: '#000000',
	width: 960,
	height: 540
};


/**
 * High performance WebGL2 Canvas.
 * @param {WebGLCanvasOptions} [options]
 */
function WebGLCanvas (options=null)
{
	this.init({ ...defaultOptions, ...options });
};


/**
 * WebGL2 Context.
 * @type {WebGL2RenderingContext}
 * @readonly
 */
WebGLCanvas.prototype.gl = null;


/**
 * Underlying HTML5 canvas element.
 * @type {HTMLCanvasElement}
 * @readonly
 */
WebGLCanvas.prototype.canvas = null;


/**
 * Initializes the instance.
 * @private
 */
WebGLCanvas.prototype.init = function (options)
{
	this.canvas = document.createElement('canvas');

	if (!options.fullscreen && (!options.width || !options.height))
		throw new Error ('Parameter `width` or `height` is missing.');

	if (options.background.length != 7)
		throw new Error ('Parameter `background` should be a 6-digit hex RGB (i.e. #000000).');

	this.canvas.style.background = options.background;

	if (options.fullscreen) {
		this.canvas.style.position = 'absolute';
		this.canvas.style.left = '0px';
		this.canvas.style.top = '0px';
		this.canvas.style.width = window.innerWidth + 'px';
		this.canvas.style.height = window.innerHeight + 'px';
	}
	else {
		this.canvas.style.left = options.width + 'px';
		this.canvas.style.top = options.height + 'px';
		this.canvas.style.width = options.width + 'px';
		this.canvas.style.height = options.height + 'px';
	}

	this.gl = this.canvas.getContext('webgl2', { desynchronized: false, preserveDrawingBuffer: false, alpha: false, stencil: options.stencil });
	console.log(this.gl.getParameter(this.gl.VERSION) + ', ' + this.gl.getParameter(this.gl.SHADING_LANGUAGE_VERSION));
};


/**
 * Creates a shader program with the specified vertex and fragment shader source codes.
 * @param {string} vertexShaderSource
 * @param {string} fragmentShaderSource
 * @returns {ShaderProgram}
 */
WebGLCanvas.prototype.createShaderProgram = function (vertexShaderSource, fragmentShaderSource)
{
	return new ShaderProgram (this, vertexShaderSource, fragmentShaderSource);
};


/**
 * Creates a new vertex array object.
 * @returns {VertexArray}
 */
WebGLCanvas.prototype.createVertexArray = function ()
{
	return new VertexArray(this);
};
