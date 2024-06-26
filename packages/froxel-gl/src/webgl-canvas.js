
import ShaderProgram from './shader-program.js';
import VertexBuffer from './vertex-buffer.js';
import ElementBuffer from './element-buffer.js';
import VertexArray from './vertex-array.js';
import UniformBuffer from './uniform-buffer.js';
import Texture from './texture.js';
import Buffer from './buffer.js';

import { Mat4, Vec4 } from 'froxel-math';

export default WebGLCanvas;

/**
 * @typedef {'default'|'landscape'|'portrait'|'automatic'|'strict'} WebGLCanvasOrientation
 */

/**
 * @typedef {'ARRAY_BUFFER'|'ELEMENT_ARRAY_BUFFER'|'COPY_READ_BUFFER'|'COPY_WRITE_BUFFER'|'TRANSFORM_FEEDBACK_BUFFER'|'UNIFORM_BUFFER'|'PIXEL_PACK_BUFFER'|'PIXEL_UNPACK_BUFFER'} WebGLBufferTarget
 */

/**
 * @typedef {'STATIC_DRAW'|'DYNAMIC_DRAW'|'STREAM_DRAW'|'STATIC_READ'|'DYNAMIC_READ'|'STREAM_READ'|'STATIC_COPY'|'DYNAMIC_COPY'|'STREAM_COPY'} WebGLBufferUsage
 */

/**
 * @typedef {Object} WebGLCanvasOptions
 * @prop {boolean} [fullscreen] Positions the canvas to cover the entire screen. default `true`
 * @prop {boolean} [stencil] Indicates if the stencil buffer should be enabled. default `false`
 * @prop {string} [background] Background color, must be a 6-digit hex RGB value. default `000000`
 * @prop {number} [width] Width of the canvas, used only when `fullscreen` is `false`. default `960`
 * @prop {number} [height] Height of the canvas, used only when `fullscreen` is `false`. default `540`
 * @prop {WebGLCanvasOrientation} [orientation] Orientation of the canvas. Defaults to `AUTOMATIC`.
 * @prop {boolean} [antialias] Controls the antialias option, set to `false` for pixel-perfect output. Default is `true`.
 * @prop {number} [scaleFactorMax] Limit of the scale factor, used only when set to greater than zero.
 * @prop {number} [scaleFactorOffs] Offset used to increase the scale factor before the Math.floor operation. Default is `0.7`.
 */

const defaultOptions = {
	fullscreen: true,
	stencil: false,
	background: '000000',
	width: 960,
	height: 540,
	orientation: 'automatic',
	antialias: true,
	scaleFactorMax: 0,
	scaleFactorOffs: 0.7,
};

/**
 * List of active canvases. Registered when the WebGLCanvas is created, and removed when it is disposed.
 */
const activeCanvases = [
];

/**
 * Indicates if the auto-resizer has been attached to the window.
 */
let autoResizerAttached = false;

/**
 * 
 */
function autoResizeCanvas (wgl)
{
	let fullWidth = wgl.options.width;
	let fullHeight = wgl.options.height;

	if (wgl.options.fullscreen && ('document' in global)) {
		fullWidth = Math.floor(global.innerWidth);
		fullHeight = Math.floor(global.innerHeight);
	}
	else {
		if (wgl.options.width === null && wgl.options.height === null)
			throw new Error ('At least one screen dimension must be specified in headless mode.');
	}

	// Flip dimensions to ensure the desired orientation.
	let currentWidth = fullWidth;
	let currentHeight = fullHeight;
	let flipped = false;

	if ((fullWidth < fullHeight && wgl.options.orientation === 'landscape') || (fullWidth > fullHeight && wgl.options.orientation === 'portrait')) {
		currentWidth = fullHeight;
		currentHeight = fullWidth;
		flipped = true;
	}

	// Get target screen dimensions.
	let targetWidth = wgl.options.width;
	let targetHeight = wgl.options.height;

	if (targetWidth === null || targetHeight === null)
	{
		if (targetWidth === null && targetHeight === null) {
			targetWidth = currentWidth;
			targetHeight = currentHeight;
		}
		else if (targetWidth === null)
			targetWidth = Math.floor(0.5 + currentWidth * (wgl.options.height / currentHeight));
		else
			targetHeight = Math.floor(0.5 + currentHeight * (wgl.options.width / currentWidth));
	}

	// Handle `automatic` canvas orientation.
	let screenWidth = targetWidth;
	let screenHeight = targetHeight;

	if (wgl.options.orientation === 'automatic' && screenWidth && screenHeight)
	{
		if ((screenWidth > screenHeight && currentWidth < currentHeight) || (screenWidth < screenHeight && currentWidth > currentHeight)) {
			screenWidth = targetHeight;
			screenHeight = targetWidth;
		}
	}

	// Compute canvas scale factor.
	let canvasScaleFactor = 1;

	if (screenWidth && screenHeight)
		canvasScaleFactor = Math.min(currentWidth / screenWidth, currentHeight / screenHeight);
	else if (screenWidth)
		canvasScaleFactor = currentWidth / screenWidth;
	else if (screenHeight)
		canvasScaleFactor = currentHeight / screenHeight;

	// ***
	let tmpWidth = currentWidth;
	let tmpHeight = currentHeight;

	if (screenWidth) currentWidth = screenWidth;
	if (screenHeight) currentHeight = screenHeight;

	let offsX = Math.floor((tmpWidth - currentWidth*canvasScaleFactor)*0.5);
	let offsY = Math.floor((tmpHeight - currentHeight*canvasScaleFactor)*0.5);

	if (flipped) {
		let tmp = offsX;
		offsX = offsY;
		offsY = tmp;
	}

	let scaleFactor = canvasScaleFactor * global.devicePixelRatio;
	scaleFactor = Math.floor(wgl.options.scaleFactorOffs + scaleFactor);

	if (wgl.options.scaleFactorMax > 0 && scaleFactor > wgl.options.scaleFactorMax)
		scaleFactor = wgl.options.scaleFactorMax;

	if (wgl.options.fullscreen && ('document' in global))
		global.document.body.style.backgroundColor = wgl.element.style.backgroundColor;

	wgl.resize(currentWidth, currentHeight, false);

	if (!flipped) {
		wgl.element.style.width = Math.floor(currentWidth*canvasScaleFactor+0.5) + 'px';
		wgl.element.style.height = Math.floor(currentHeight*canvasScaleFactor+0.5) + 'px';
	}
	else {
		wgl.element.style.width = Math.floor(currentHeight*canvasScaleFactor+0.5) + 'px';
		wgl.element.style.height = Math.floor(currentWidth*canvasScaleFactor+0.5) + 'px';
	}

	wgl.element.style.marginLeft = offsX + 'px';
	wgl.element.style.marginTop = offsY + 'px';

	wgl.globalScale = scaleFactor;
	wgl.isFlipped = flipped;

	wgl.u.initial.identity();
	wgl.u.initial.scale(scaleFactor, scaleFactor, scaleFactor);

	if (flipped) {
		wgl.u.initial.rotateZ(Math.PI/2);
		wgl.u.initial.translate(-currentWidth, 0, 0);
	}

	wgl.updateViewport();

	//console.log('logical', wgl.width, wgl.height);	
	//console.log('canvas-logical', wgl.element.width, wgl.element.height);
	//console.log('canvas-css', wgl.element.style.width, wgl.element.style.height);
	//console.log('phys', wgl.physWidth, wgl.physHeight);
	//console.log('webGl', wgl.gl.drawingBufferWidth, wgl.gl.drawingBufferHeight);
	//console.log('globalScale', wgl.globalScale);
	//console.log('canvasScaleFactor', canvasScaleFactor);

	/* *** */
	//if (options.maxScaleFactor > 0 && scaleFactor > options.maxScaleFactor)
	//	scaleFactor = options.maxScaleFactor;

	//_this.integerScaleFactor = Math.floor(scaleFactor + 0.5); //0.9
};


/**
 * WebGL2 Canvas.
 *
 * Default WebGL configuration is set as follows:
 *
 * - `DEPTH_TEST`: enabled, `clearDepth`: 1.0, `depthFunc`: LEQUAL
 * - `BLEND`: enabled, `blendEquationSeparate`: FUNC_ADD, FUNC_ADD, `blendFunc`: ONE, ONE_MINUS_SRC_ALPHA
 * - `UNPACK_PREMULTIPLY_ALPHA_WEBGL`: enabled
 * - `SCISSOR_TEST`: enabled
 *
 * @extends {WebGL2RenderingContext}
 * @param {WebGLCanvasOptions} [options]
 */
function WebGLCanvas (options=null)
{
	if (!autoResizerAttached)
	{
		global.onresize = function() {
			for (let wgl of activeCanvases) autoResizeCanvas(wgl);
		};

		autoResizerAttached = true;
	}

	this.init({ ...defaultOptions, ...options });
	activeCanvases.push(this);
}

/**
 * Disposes the canvas and all related resources.
 */
WebGLCanvas.prototype.dispose = function()
{
	activeCanvases.splice(activeCanvases.indexOf(this), 1);
};


/**
 * WebGL2 rendering context.
 * @private @readonly @type {WebGL2RenderingContext}
 */
WebGLCanvas.prototype.gl = null;

/**
 * Contains the state of several WebGL elements (shader program, bound buffer, texture, etc). This is a general object, and each class or interested party
 * is responsible for accesing and maintaining values in this object.
 * @private @type {object}
 */
WebGLCanvas.prototype.state = null;


/**
 * @typedef {Object} WebGLCanvasUniforms
 * @prop {boolean} changed Indicates if the uniforms have changed and should be reloaded in the WebGL program.
 * @prop {Mat4} initial Transformation to achieve correct target resolution and orientation (automatically set by WebGLCanvas).
 * @prop {Mat4} view Transforms coordinates to view space.
 * @prop {Mat4} projection Transforms coordinates to NDC space. Use the `setOrtho2D`, `setOrtho3D` or `setFrustrum` methods of Utils to configure its value.
 * @prop {Vec4} resolution Canvas resolution (automatically set by WebGLCanvas).
 */

/**
 * Common uniforms for WebGL. Note that it is the responsibility of the developer to set, configure and use these uniforms (except the ones marked
 * as "automatically set by WebGLCanvas"). Thse are provided solely as placeholders for easy access from a known interface.
 * @readonly @type {WebGLCanvasUniforms}
 */
WebGLCanvas.prototype.u = null;

/**
 * Underlying HTML5 canvas element.
 * @readonly @type {HTMLCanvasElement}
 */
WebGLCanvas.prototype.element = null;

/**
 * Logical width of the canvas.
 * @readonly @type {number}
 */
WebGLCanvas.prototype.width = 0;

/**
 * Logical height of the canvas.
 * @readonly @type {number}
 */
WebGLCanvas.prototype.height = 0;

/**
 * Physical canvas width.
 * @readonly @type {number}
 */
WebGLCanvas.prototype.physWidth = 0;

/**
 * Physical canvas height.
 * @readonly @type {number}
 */
WebGLCanvas.prototype.physHeight = 0;

/**
 * Indicates if the canvas is flipped.
 * @readonly @type {boolean}
 */
WebGLCanvas.prototype.isFlipped = false;

/**
 * Canvas global scale.
 * @readonly @type {number}
 */
WebGLCanvas.prototype.globalScale = 1.0;

/**
 * Functions that are under a different name in WebGLCanvas from the original WebGL2RenderingContext.
 */
const renamedFunctions = {
	createTexture: 'genTexture',
	createBuffer: 'genBuffer',
	createVertexArray: 'genVertexArray',
};

/**
 * Initializes the instance.
 * @private
 */
WebGLCanvas.prototype.init = function (options)
{
	this.element = document.createElement('canvas');
	this.options = options;

	if (!options.fullscreen && (!options.width || !options.height))
		throw new Error ('Option `width` or `height` is missing while `fullscreen` is `false`.');

	if (options.background.length != 6)
		throw new Error ('Option `background` should be a 6-digit hex RGB (i.e. 000000).');

	this.element.style.imageRendering = options.antialias ? 'auto' : 'crisp-edges';
	this.element.style.backgroundColor = '#' + options.background;

	if (options.fullscreen) {
		this.element.style.position = 'absolute';
		this.element.style.left = '0px';
		this.element.style.top = '0px';
	}

	// Get WebGL context and re-bind functions and values to the WebGLCanvas object.
	this.gl = this.element.getContext('webgl2', { desynchronized: false, preserveDrawingBuffer: false, alpha: false, stencil: options.stencil });

	for (let prop in this.gl)
	{
		let val = this.gl[prop];
		switch (typeof(val))
		{
			case 'function':
				if (prop in renamedFunctions)
					prop = renamedFunctions[prop];

				this[prop] = val.bind(this.gl);
				break;

			case 'number':
				this[prop] = val;
				break;
		}
	}

	console.log(this.getParameter(this.VERSION) + ', ' + this.getParameter(this.SHADING_LANGUAGE_VERSION));

	// Global state object.
	this.state =
	{
		program: null,
		buffer: { },
		vertexArray:  null
	};

	// Allocate placeholder for uniforms.
	this.u = {
		changed: true,

		initial: Mat4.alloc(),
		view: Mat4.alloc(),
		projection: Mat4.alloc(),
		resolution: Vec4.alloc(),
	};

	// Initialize default configuration.
	this.clearColor (parseInt(options.background.substring(0,2), 16)/255.0, parseInt(options.background.substring(2,4), 16)/255.0, parseInt(options.background.substring(4,6), 16)/255.0, 1.0);
	this.colorMask (true, true, true, true);

	this.enable (this.DEPTH_TEST);
	this.clearDepth (1.0);
	this.depthFunc (this.LEQUAL);

	this.enable (this.BLEND);
	this.pixelStorei (this.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
	this.blendEquationSeparate (this.FUNC_ADD, this.FUNC_ADD);
	this.blendFunc (this.ONE, this.ONE_MINUS_SRC_ALPHA);

	this.enable (this.SCISSOR_TEST);
	autoResizeCanvas(this);
};


/**
 * Resizes the canvas to the specified logical size.
 * @param {number} width
 * @param {number} height
 */
WebGLCanvas.prototype.resize = function (width, height, updateViewport=true)
{
	this.width = width;
	this.height = height;

	if (updateViewport)
		this.updateViewport();
};

// VIOLET: Possibly create a viewport object like the olden days.
WebGLCanvas.prototype.updateViewport = function ()
{
	this.physWidth = this.element.width = Math.floor((this.isFlipped ? this.height : this.width) * this.globalScale);
	this.physHeight = this.element.height = Math.floor((this.isFlipped ? this.width : this.height) * this.globalScale);

	this.scissor (0, 0, this.physWidth, this.physHeight);
	this.viewport (0, 0, this.physWidth, this.physHeight);

	//violet:hardware scaling? currently we're using canvas browser-level scaling.
	//this.v_resolution[0] = this._width;
	//this.v_resolution[1] = this._height;
	this.u.resolution.set(this.physWidth, this.physHeight, this.isFlipped ? this.physHeight : this.physWidth, this.isFlipped ? this.physWidth : this.physHeight);
	this.u.changed = true;
};


/**
 * Creates a shader program with the specified vertex and fragment shader source codes.
 * @param {string} vertexShaderSource
 * @param {string} fragmentShaderSource
 * @param {string} geometryShaderSource?
 * @returns {ShaderProgram}
 */
WebGLCanvas.prototype.createShaderProgram = function (vertexShaderSource, fragmentShaderSource, geometryShaderSource=null) {
	return new ShaderProgram(this, vertexShaderSource, fragmentShaderSource, geometryShaderSource);
};


/**
 * Creates a new vertex array object.
 * @returns {VertexArray}
 */
WebGLCanvas.prototype.createVertexArray = function () {
	return new VertexArray(this);
};


/**
 * Creates a new buffer.
 * @param {WebGLBufferTarget} target
 * @param {WebGLBufferUsage} usage
 * @returns {VertexBuffer}
 */
WebGLCanvas.prototype.createBuffer = function (target, usage) {
	return new Buffer(this, this[target], this[usage]);
};


/**
 * Creates a new vertex buffer.
 * @param {WebGLBufferUsage} usage
 * @returns {VertexBuffer}
 */
WebGLCanvas.prototype.createVertexBuffer = function (usage) {
	return new VertexBuffer(this, this[usage]);
};


/**
 * Creates a new element buffer.
 * @param {WebGLBufferUsage} usage
 * @returns {ElementBuffer}
 */
WebGLCanvas.prototype.createElementBuffer = function (usage) {
	return new ElementBuffer(this, this[usage]);
};


/**
 * Creates a new uniform buffer object.
 * @param {WebGLBufferUsage} usage
 * @returns {UniformBuffer}
 */
WebGLCanvas.prototype.createUniformBuffer = function (usage) {
	return new UniformBuffer(this, this[usage]);
};


/**
 * Creates a new texture object of the specified size.
 * @param {number} width - Physical texture width.
 * @param {number} height - Physical texture height.
 * @param {number} [targetWidth] - Logical texture width.
 * @param {number} [targetHeight] - Logical texture height.
 * @returns {Texture}
 */
WebGLCanvas.prototype.createTexture = function (width, height, targetWidth=null, targetHeight=null) {
	return new Texture (this, width, height, targetWidth, targetHeight);
};


/**
 * Loads an image from the specified URL.
 * @param {string} url
 * @returns {Promise<HTMLImageElement>}
 */
WebGLCanvas.loadImage = function (url)
{
	return new Promise((resolve, reject) => {
		let img = new Image();
		img.onload = () => resolve(img);
		img.onerror = () => reject('Unable to load image: ' + url);
		img.src = url;
	});
};


/**
 * Loads an image from the specified URL and creates a texture.
 * @param {string} url
 * @param {number} [mipmapLevels] - Number of levels for mipmapping. Defaults to `0`.
 * @returns {Promise<Texture>}
 */
WebGLCanvas.prototype.loadTextureFromUrl = async function (url, mipmapLevels=0)
{
	let image = await WebGLCanvas.loadImage(url);
	let texture = this.createTexture(image.width, image.height);
	texture.setMipmapLevels(mipmapLevels);
	texture.upload(image);
	return texture;
};
