/*
**	system/canvas.js
**
**	Copyright (c) 2016-2021, RedStar Technologies, All rights reserved.
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

import { Rinn } from 'rinn';
import Matrix from '../math/matrix.js';
import System from './system.js';
import List from '../utils/list.js';
import ShaderProgram from './shader-program.js';
import Shader from './shader.js';
import globals from './globals.js';
import Log from './log.js';

//![import "../math/matrix"]
//![import "./system"]
//![import "../utils/list"]
//![import "./shader-program"]
//![import "./shader"]
//![import "./globals"]
//![import "./log"]

//!namespace Canvas

	//!type Options =

		/**
		 * 	Actual HTML5 Canvas element, if `null` a new one will be created.
		 * 	!elem: HTMLCanvasElement;
		 */
		
		/**
		 * 	WebGL enable flag.
		 * 	!gl: boolean;
		 */

		/**
		 * 	Background of the canvas element.
		 * 	!background: string;
		 */

		/**
		 * 	Width of the canvas.
		 * 	!width: number;
		 */

		/**
		 * 	Height of the canvas.
		 * 	!height: number;
		 */

		/**
		 * 	Indicates if the canvas element should be hidden from view (not attached to the document body).
		 * 	!hidden: boolean;
		 */

		/**
		 * 	Set to `true` to ensure the canvas is positioned absolutly to (0, 0).
		 * 	!absolute: boolean;
		 */

		/**
		 * 	Used to control the antialias property of the canvas.
		 * 	!antialias: boolean;
		 */

	//!/type

//!/namespace

//!class Canvas

/**
 * 	Constructs a canvas object. If the Canvas DOM element is not provided a new element will be created and attached to the page.
 * 	!constructor (options: Canvas.Options);
 */

const Canvas = function (options=null)
{
	let opts = {
		elem: null,
		gl: false,
		background: '#000000',
		width: 0,
		height: 0,
		hidden: true,
		absolute: false,
		antialias: false,
		...options
	};

	const headless = global.document ? false : true;

	// Create canvas element if required.
	if (opts.elem == null)
	{
		this.elem = !headless ? global.document.createElement('canvas') : Rinn.clone(Canvas.passThruCanvas);

		if (global.document && opts.hidden != true)
		{
			global.document.body.appendChild (this.elem);

			if (opts.absolute === true) {
				this.elem.style.position = 'absolute';
				this.elem.style.left = '0';
				this.elem.style.top = '0';
			}
		}
	}
	else
	{
		this.elem = opts.elem;
	}

	if (!this.elem.getContext) return;

	if (opts.gl === true && !headless)
	{
		this.gl = this.elem.getContext('webgl2', { desynchronized: false, alpha: false });
		this.context = null;

		Log.write(this.gl.getParameter(this.gl.VERSION) + ', ' + this.gl.getParameter(this.gl.SHADING_LANGUAGE_VERSION));

		globals.gl = this.gl;
	}
	else
	{
		this.context = this.elem.getContext('2d', { desynchronized: false });
		this.gl = null;
	}

	// State stack support.
	this.matrixStack = List.Pool.alloc();
	this.alphaStack = List.Pool.alloc();
	this.depthFlagStack = List.Pool.alloc();
	this.shaderProgramStack = List.Pool.alloc();

	this.matr = Matrix.Pool.alloc();
	this.transform = Matrix.Pool.alloc();

	// Default context values.
	this._globalScale = 1.0;
	this._alpha = 1.0;
	this._depthFlag = true;
	this.shaderProgram = null;

	// Set initial transformation matrix.
	this.updateTransform();
	this.strokeStyle("#fff");
	this.fillStyle("#fff");

	if (opts.width && opts.height)
	this.resize (opts.width, opts.height);

	if (this.gl !== null)
		this.initGl();

	this.antialias = opts.antialias;
	this.setBackground (opts.background);
};

Canvas.passThruCanvas = 
{
	parentNode: null,

	imageSmoothingEnabled: true,

	style: {
	},

	width: 960,
	height: 540,

	getContext: function (renderingContext) {
		return this;
	},

	pushClip: function() {
	},

	popClip: function() {
	},

	scale: function (sx, sy) {
	},

	rotate: function (angle) {
	},

	translate: function (x, y) {
	},

	setTransform: function (a, b, c, d, e, f) {
	},

	updateTransform: function () {
	},

	toDataURL: function (mime, params) {
		return '';
	},

	beginPath: function () {
	},

	moveTo: function (x, y) {
	},

	closePath: function() {
	},

	lineTo: function() {
	},

	rect: function(x, y, w, h) {
	},

	fill: function() {
	},

	stroke: function() {
	},

	fillRect: function(x, y, w, h) {
	},

	strokeRect: function(x, y, w, h) {
	},

	clip: function() {
	},

	quadraticCurveTo: function (cpx, cpy, x, y) {
	},

	bezierCurveTo: function (cx1, cy1, cx2, cy2, x, y) {
	},

	arc: function (x, y, r, sA, eA, cw) {
	},

	arcTo: function (x1, y1, x2, y2, r) {
	},

	fillText: function (text, x, y, maxWidth) {
	},

	strokeText: function (text, x, y, maxWidth) {
	},

	measureText: function (text) {
		return { width: 0 };
	},

	createImageData: function (w, h) {
		return { width: w, height: h };
	},

	getImageData: function (x, y, w, h) {
		return { width: w, height: h, data: [] };
	},

	putImageData: function (data, x, y) {
	},

	drawImage: function (img, sx=0, sy=0, sw=null, sh=null, dx=null, dy=null, dw=null, dh=null, textureWidth=null, textureHeight=null, frameWidth=null, frameHeight=null) {
	},

	getBoundingClientRect: function () {
		return { left: 0, top: 0 };
	}
};

/**
 * 	Initializes the OpenGL ES context.
 */
Canvas.prototype.initGl = function ()
{
	let gl = this.gl;

	// This code is required if "desynchronized" is set to true (for some reason).
	//if (navigator && navigator.userAgent.toLowerCase().indexOf('firefox') > -1)
	//	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
	//else
	//	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

	/**
	 * 	Create the default shader program.
	 */
	this.glDefaultProgram = new ShaderProgram('def');

	(new Shader ('def-vert', Shader.Type.VERTEX))
	.source(
		`#version 300 es
		precision highp float;

		uniform mat3 m_location;
		uniform mat3 m_transform;
		uniform mat3 m_texture;

		uniform vec2 v_resolution;
		uniform vec2 v_texture_size;
		uniform vec2 v_frame_size;

		uniform float f_time;
		uniform float f_depth;

		uniform sampler2D texture0;

		in vec2 location;
		out vec2 texcoords;

		void main()
		{
			gl_Position = vec4(((vec2(m_transform * m_location * vec3(location, 1.0)) / v_resolution)*2.0 - vec2(1.0, 1.0)) * vec2(1.0, -1.0), f_depth / 16777216.0, 1.0);
			texcoords = vec2(m_texture * vec3(location, 1.0)) / v_texture_size;
		}
	`)
	.compile();

	(new Shader ('def-frag', Shader.Type.FRAGMENT))
	.source(
		`#version 300 es
		precision highp float;

		uniform sampler2D texture0;
		uniform float f_alpha;
		in vec2 texcoords;

		out vec4 color;

		void main()
		{
			color = texture(texture0, texcoords);
			color.a *= f_alpha;

			if (color.a == 0.0) discard;
		}
	`)
	.compile();

	/**
	 * 	Create repeat (tileable) shader program.
	 */
	this.glRepeatProgram = new ShaderProgram('repeat');

	(new Shader ('repeat-vert', Shader.Type.VERTEX))
	.source(
		`#version 300 es
		precision highp float;
		
		uniform mat3 m_location;
		uniform mat3 m_transform;
		uniform mat3 m_texture;
		
		uniform vec2 v_resolution;
		uniform vec2 v_texture_size;
		uniform vec2 v_frame_size;
		
		uniform float f_time;
		uniform float f_depth;
		
		uniform sampler2D texture0;
		
		in vec2 location;
		out vec2 texcoords;
		
		out vec2 texoffs;
		out vec2 texsiz;
		
		void main()
		{
			gl_Position = vec4(((vec2(m_transform * m_location * vec3(location, 1.0)) / v_resolution)*2.0 - vec2(1.0, 1.0)) * vec2(1.0, -1.0), f_depth / 16777216.0, 1.0);
		
			texcoords = vec2(
				(location.x*m_texture[0][0]/v_texture_size[0])*(m_location[0][0] / v_frame_size[0]),
				(location.y*m_texture[1][1]/v_texture_size[1])*(m_location[1][1] / v_frame_size[1])
			);
		
			texoffs = vec2(m_texture[2][0]/v_texture_size[0], m_texture[2][1]/v_texture_size[1]);
			texsiz = vec2(m_texture[0][0]/v_texture_size[0], m_texture[1][1]/v_texture_size[1]);
		}
	`)
	.compile();

	(new Shader ('repeat-frag', Shader.Type.FRAGMENT))
	.source(
		`#version 300 es
		precision highp float;
		
		uniform mat3 m_texture;
		uniform vec2 v_texture_size;
		
		uniform sampler2D texture0;
		uniform float f_alpha;
		
		in vec2 texcoords;
		in vec2 texoffs;
		in vec2 texsiz;
		
		out vec4 color;
		
		void main()
		{
			color = texture(texture0, mod(texcoords, texsiz) + texoffs);
		
			color.a *= f_alpha;
			if (color.a == 0.0) discard;
		}
	`)
	.compile();

	/**
	 * 	Create the frame buffer blit shader program.
	 */
	this.glBlitProgram = new ShaderProgram('blit');

	(new Shader ('blit-vert', Shader.Type.VERTEX))
	.source(
		`#version 300 es
		precision highp float;

		uniform mat3 m_location;
		uniform mat3 m_texture;
		uniform vec2 v_resolution;
		uniform vec2 v_texture_size;

		uniform sampler2D texture0;

		in vec2 location;
		out vec2 texcoords;

		void main()
		{
			gl_Position = vec4(((vec2(m_location * vec3(location, 1.0)) / v_resolution)*2.0 - vec2(1.0, 1.0)) * vec2(1.0, 1.0), 0.0, 1.0);
			texcoords = vec2(m_texture * vec3(location, 1.0)) / v_texture_size;
		}
	`)
	.compile();

	(new Shader ('blit-frag', Shader.Type.FRAGMENT))
	.source(
		`#version 300 es
		precision highp float;

		uniform sampler2D texture0;
		in vec2 texcoords;

		out vec4 color;

		void main()
		{
			color = texture(texture0, texcoords);
		}
	`)
	.compile();

	/* ****** */
	this.glDefaultProgram.attach('def-vert');
	this.glDefaultProgram.attach('def-frag');

	this.glRepeatProgram.attach('repeat-vert');
	this.glRepeatProgram.attach('repeat-frag');

	this.glBlitProgram.attach('blit-vert');
	this.glBlitProgram.attach('blit-frag');

	this.glDefaultProgram.link();
	this.glRepeatProgram.link();
	this.glBlitProgram.link();

	if (!this.glDefaultProgram.getStatus())
		throw new Error (this.glDefaultProgram.getAllErrors());

	if (!this.glRepeatProgram.getStatus())
		throw new Error (this.glRepeatProgram.getAllErrors());

	if (!this.glBlitProgram.getStatus())
		throw new Error (this.glBlitProgram.getAllErrors());

	this.setShaderProgram(this.glDefaultProgram);

	/**
	 * 	Create the vertex buffer.
	 */
	let buffer = this.attrib_location_buffer = gl.createBuffer();
	gl.bindBuffer (gl.ARRAY_BUFFER, buffer);
	gl.bufferData (gl.ARRAY_BUFFER, new Float32Array ([0, 0, 0, 1, 1, 0, 1, 1]), gl.STATIC_DRAW);

	gl.enableVertexAttribArray (this.shaderProgram.attrib_location);
	gl.vertexAttribPointer (this.shaderProgram.attrib_location, 2, gl.FLOAT, gl.FALSE, 2*Float32Array.BYTES_PER_ELEMENT, 0*Float32Array.BYTES_PER_ELEMENT);

	/**
	 * 	Setup initial GL configuration.
	 */
	gl.clearColor (0, 0, 0, 1.0);

	gl.enable (gl.DEPTH_TEST);
	gl.clearDepth (0.0);
	gl.depthFunc (gl.GEQUAL);

	gl.enable (gl.BLEND);
	gl.blendFunc (gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

	/**
	 * 	Setup frame buffer.
	 */

	/* *** */
	this.m_location = new Float32Array(9).fill(0);
	this.m_texture = new Float32Array(9).fill(0);
	this.v_texture_size = new Float32Array(2).fill(0);
	this.v_frame_size = new Float32Array(2).fill(0);
	this.v_resolution = new Float32Array(2).fill(0);
	this.zvalue = 0;

	Matrix.loadIdentity(this.m_location);
	Matrix.loadIdentity(this.m_texture);

	// drawImage (Image img, float x, float y);
	// drawImage (Image img, float x, float y, float w, float h);
	// drawImage (Image img, float sx, float sy, float sw, float sh, float dx, float dy, float dw, float dh);
	// drawImage (Image img, float sx, float sy, float sw, float sh, float dx, float dy, float dw, float dh, float textureWidth, float textureHeight, float frameWidth, float frameHeight);
	this.drawImage = function (img, sx=0, sy=0, sw=null, sh=null, dx=null, dy=null, dw=null, dh=null, textureWidth=null, textureHeight=null, frameWidth=null, frameHeight=null)
	{
		if (!img.glTextureReady)
			return;

		let gl = this.gl;
		let program = this.shaderProgram;

		if (textureWidth === null)
		{
			textureWidth = img.width;
			textureHeight = img.height;
		}

		if (frameWidth === null)
		{
			frameWidth = img.targetWidth;
			frameHeight = img.targetHeight;
		}

		gl.uniform2fv (program.uniform_resolution, this.v_resolution);
		gl.uniform1f (program.uniform_time, globals.time);
		gl.uniform1f (program.uniform_scale, this._globalScale);
		gl.uniform1f (program.uniform_alpha, this._alpha);

		if (this.glActiveTextureId !== img.glTextureId || this.glActiveShader !== program)
		{
			gl.activeTexture (gl.TEXTURE0);
			gl.bindTexture (gl.TEXTURE_2D, img.glTextureId);
			gl.uniform1i (program.uniform_texture_0, 0);

			this.v_texture_size[0] = textureWidth;
			this.v_texture_size[1] = textureHeight;
			gl.uniform2fv (program.uniform_texture_size, this.v_texture_size);

			this.v_frame_size[0] = frameWidth;
			this.v_frame_size[1] = frameHeight;
			gl.uniform2fv (program.uniform_frame_size, this.v_frame_size);

			this.glActiveTextureId = img.glTextureId;
			this.glActiveShader = program;
		}

		// [3] image, x, y
		if (sw === null)
		{
			this.m_location[0] = textureWidth;
			this.m_location[4] = textureHeight;
			this.m_location[6] = sx;
			this.m_location[7] = sy;

			this.m_texture[0] = textureWidth;
			this.m_texture[4] = textureHeight;
			this.m_texture[6] = 0;
			this.m_texture[7] = 0;

			gl.uniformMatrix3fv (program.uniform_transform_matrix, false, this.transform.data);
			gl.uniformMatrix3fv (program.uniform_location_matrix, false, this.m_location);
			gl.uniformMatrix3fv (program.uniform_texture_matrix, false, this.m_texture);
			gl.uniform1f (program.uniform_depth, this.zvalue);
			gl.drawArrays (gl.TRIANGLE_STRIP, 0, 4);

			return;
		}

		// [5] image, x, y, width, height
		if (dx === null)
		{
			this.m_location[0] = sw;
			this.m_location[4] = sh;
			this.m_location[6] = sx;
			this.m_location[7] = sy;

			this.m_texture[0] = textureWidth;
			this.m_texture[4] = textureHeight;
			this.m_texture[6] = 0;
			this.m_texture[7] = 0;

			gl.uniformMatrix3fv (program.uniform_transform_matrix, false, this.transform.data);
			gl.uniformMatrix3fv (program.uniform_location_matrix, false, this.m_location);
			gl.uniformMatrix3fv (program.uniform_texture_matrix, false, this.m_texture);
			gl.uniform1f (program.uniform_depth, this.zvalue);
			gl.drawArrays (gl.TRIANGLE_STRIP, 0, 4);

			return;
		}

		// [9] image, sx, sy, sw, sh, dx, dy, dw, dh
		this.m_location[0] = dw;
		this.m_location[4] = dh;
		this.m_location[6] = dx;
		this.m_location[7] = dy;

		this.m_texture[0] = sw;
		this.m_texture[4] = sh;
		this.m_texture[6] = sx;
		this.m_texture[7] = sy;

		gl.uniformMatrix3fv (program.uniform_transform_matrix, false, this.transform.data);
		gl.uniformMatrix3fv (program.uniform_location_matrix, false, this.m_location);
		gl.uniformMatrix3fv (program.uniform_texture_matrix, false, this.m_texture);
		gl.uniform1f (program.uniform_depth, this.zvalue);
		gl.drawArrays (gl.TRIANGLE_STRIP, 0, 4);
	};

	// drawRect (float x, float y, float w, float h);
	this.drawRect = function (x, y, w, h)
	{
		let gl = this.gl;
		let program = this.shaderProgram;

		gl.uniform2fv (program.uniform_resolution, this.v_resolution);
		gl.uniform1f (program.uniform_time, globals.time);
		gl.uniform1f (program.uniform_scale, this._globalScale);
		gl.uniform1f (program.uniform_alpha, this._alpha);

		this.glActiveTextureId = null;

		this.v_texture_size[0] = w;
		this.v_texture_size[1] = h;
		gl.uniform2fv (program.uniform_texture_size, this.v_texture_size);

		this.m_location[0] = w;
		this.m_location[4] = h;
		this.m_location[6] = x;
		this.m_location[7] = y;

		this.m_texture[0] = w;
		this.m_texture[4] = h;
		this.m_texture[6] = 0;
		this.m_texture[7] = 0;

		gl.uniformMatrix3fv (program.uniform_transform_matrix, false, this.transform.data);
		gl.uniformMatrix3fv (program.uniform_location_matrix, false, this.m_location);
		gl.uniformMatrix3fv (program.uniform_texture_matrix, false, this.m_texture);
		gl.uniform1f (program.uniform_depth, this.zvalue);
		gl.drawArrays (gl.TRIANGLE_STRIP, 0, 4);
	};
};


/**
 * 	Prepares an image to use it on the canvas. Used only when GL mode is active.
 * 	!prepareImage (image: HTMLImageElement) : boolean;
 */
Canvas.prototype.prepareImage = function (image)
{
	let gl = this.gl;
	if (gl == null) return false;

	let texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, texture);

	gl.texStorage2D(gl.TEXTURE_2D, 1, gl.RGBA8, image.width, image.height);
	gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, image.width, image.height, gl.RGBA, gl.UNSIGNED_BYTE, image);

	if (!image.filter)
		image.filter = 'NEAREST';

	if (image.filter === 'NEAREST')
	{
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	}
	else
	{
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	}

	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

	image.glTextureId = texture;
	image.glTextureReady = true;

	return true;
};

/**
 * 	Configures the texture related to specified image to gl.REPEAT.
 * 	!setWrapRepeat (image: HTMLImageElement) : HTMLImageElement;
 */
Canvas.prototype.setWrapRepeat = function (image)
{
	let gl = this.gl;
	if (gl == null || !image.glTextureReady) return image;

	gl.bindTexture(gl.TEXTURE_2D, image.glTextureId);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

	return image;
};

/**
 * 	Applies the current config to the canvas (usually called after a reset on the canvas).
 */
Canvas.prototype.applyConfig = function ()
{
	if (this.antialias == false)
	{
		if (this.context != null)
			this.context.imageSmoothingEnabled = false;

		this.elem.style.imageRendering = 'crisp-edges';
	}
	else
	{
		if (this.context != null)
			this.context.imageSmoothingEnabled = true;

		this.elem.style.imageRendering = 'auto';
	}
};

/**
 * 	Disposes the resources used by the canvas. The HTMLCanvasElement will also be removed from the document.
 */
Canvas.prototype.dispose = function ()
{
	if (this.elem.parentNode)
		this.elem.parentNode.removeChild (this.elem);

	this.matrixStack.free();
	this.alphaStack.free();
	this.depthFlagStack.free();
	this.shaderProgramStack.free();

	this.matr = null;
	this.context = null;
	this.elem = null;
};

/**
 * 	Sets the default background color of the canvas. Does not cause a canvas clear.
 * 	!setBackground (color: string) : void;
 */
Canvas.prototype.setBackground = function (color)
{
	this.elem.style.background = color;
	this.backgroundColor = color;

	if (this.gl !== null)
	{
		if (color.length != 7)
			throw new Error ('Canvas.setBackground: color parameter should be CSS-style hex-rgb with 6 digits.');

		let r = parseInt(color.substr(1,2), 16) / 255.0;
		let g = parseInt(color.substr(3,2), 16) / 255.0;
		let b = parseInt(color.substr(5,2), 16) / 255.0;

		this.gl.clearColor (r, g, b, 1.0);
	}
};

/**
 * 	Sets the canvas size.
 * 	!resize (width: number, height: number) : Canvas;
 */
Canvas.prototype.resize = function (width, height)
{
	let rect = this.elem.getBoundingClientRect();

	if (!width) width = rect.width;
	if (!height) height = rect.height;

	this.elem.width = width;
	this.elem.height = height;

	this.width = this.elem.width;
	this.height = this.elem.height;

	this._width = int(this.width / this._globalScale);
	this._height = int(this.height / this._globalScale);

	let gl = this.gl;
	if (gl != null)
	{
		gl.enable (gl.SCISSOR_TEST);
		gl.scissor (0, 0, this.width, this.height);
		gl.viewport (0, 0, this.width, this.height);

		if (this.v_resolution)
		{
			//violet:hardware scaling
			//this.v_resolution[0] = this._width;
			//this.v_resolution[1] = this._height;

			this.v_resolution[0] = this.width;
			this.v_resolution[1] = this.height;
		}
	}

	this.applyConfig();
	return this;
};

/**
 * 	Sets the global canvas scale.
 * 	!globalScale (value: number) : Canvas;
 */
Canvas.prototype.globalScale = function (value)
{
	this._globalScale = value;

	this._width = int(this.width / this._globalScale);
	this._height = int(this.height / this._globalScale);

	this.loadIdentity();

	//violet:hardware scaling
	//if (this.gl === null)
		this.scale(value, value);

	return this;
};

/**
 * 	Sets the flipped status of the canvas, that is, if the canvas coordinates are flipped (i.e. `xy` is now `yx`).
 * 	!flipped (value: boolean) : Canvas;
 */
Canvas.prototype.flipped = function (value)
{
	if (value)
	{
		this._width = int(this.height / this._globalScale);
		this._height = int(this.width / this._globalScale);
	}
	else
	{
		this._width = int(this.width / this._globalScale);
		this._height = int(this.height / this._globalScale);
	}

	this.isFlipped = value;
	return this;
};

/**
 * 	Saves the clip state of the canvas. Works only in GL mode.
 * 	!pushClip() : Canvas;
 */
Canvas.prototype.pushClip = function ()
{
	return this;
};

/**
 * 	Restores the clip state of the canvas. Works only in GL mode.
 * 	!popClip() : Canvas;
 */
Canvas.prototype.popClip = function ()
{
	if (this.gl != null)
		this.gl.scissor(0, 0, this.width, this.height);

	return this;
};

/**
 * 	Returns the image on the canvas as a string in DATA-URI format.
 * 	!toDataUrl (mime: string, params?: object) : string;
 */
Canvas.prototype.toDataUrl = function (mime='image/png', params=null)
{
	return this.elem.toDataURL (mime, params);
};

/**
 * 	Returns the image as a Base-64 encoded PNG string.
 * 	!toPngBase64() : string;
 */
Canvas.prototype.toPngBase64 = function ()
{
	return this.elem.toDataURL("image/png").substr(22);
};

/**
 * 	Sets or returns an attribute of the canvas context.
 */
Canvas.prototype._contextAttribute = function (name, value=null)
{
	if (!this.context) return;

	if (value !== null)
	{
		this.context[name] = value;
		return this;
	}

	return this.context[name];
};

/**
 * 	Sets the fill style.
 * 	!fillStyle (value: string) : Canvas;
 */
/**
 * 	Returns the current fill style.
 * 	!fillStyle () : string;
 */
Canvas.prototype.fillStyle = function (value)
{
	return this._contextAttribute ("fillStyle", value);
};

/**
 * 	Sets the stroke style.
 * 	!strokeStyle (value: string) : Canvas;
 */
/**
 * 	Returns the current strroke style.
 * 	!strokeStyle () : string;
 */
Canvas.prototype.strokeStyle = function (value)
{
	return this._contextAttribute ("strokeStyle", value);
};

/**
 * 	Sets the line cap style (Possible values are `butt`, `round`, or `square`. `butt` is default).
 * 	!lineCap (value: string) : Canvas;
 */
/**
 * 	Returns the current line cap style.
 * 	!lineCap() : string;
 */
Canvas.prototype.lineCap = function (value)
{
	return this._contextAttribute ("lineCap", value);
};

// violet

/*
**	Sets or returns the current line join style (bevel, round, miter. miter is default).
**
**	>> Canvas lineJoin (string value);
**	>> string lineJoin ();
*/

Canvas.prototype.lineJoin = function (value)
{
	return this._contextAttribute ("lineJoin", value);
};


/*
**	Sets or returns the current line width value (default 1).
**
**	>> Canvas lineWidth (float value);
**	>> float lineWidth ();
*/

Canvas.prototype.lineWidth = function (value)
{
	return this._contextAttribute ("lineWidth", value);
};


/*
**	Sets or returns the current miter limit value (default 10).
**
**	>> Canvas miterLimit (float value);
**	>> float miterLimit ();
*/

Canvas.prototype.miterLimit = function (value)
{
	return this._contextAttribute ("miterLimit", value);
};


/*
**	Sets or returns the current shadow color value (default black).
**
**	>> Canvas shadowColor (string value);
**	>> string shadowColor ();
*/

Canvas.prototype.shadowColor = function (value)
{
	return this._contextAttribute ("shadowColor", value);
};


/*
**	Sets or returns the current shadow X offset (default 0).
**
**	>> Canvas shadowOffsetX (float value);
**	>> float shadowOffsetX ();
*/

Canvas.prototype.shadowOffsetX = function (value)
{
	return this._contextAttribute ("shadowOffsetX", value);
};


/*
**	Sets or returns the current shadow Y offset (default 0).
**
**	>> Canvas shadowOffsetY (float value);
**	>> float shadowOffsetY ();
*/

Canvas.prototype.shadowOffsetY = function (value)
{
	return this._contextAttribute ("shadowOffsetY", value);
};


/*
**	Sets or returns the current shadow blue value (default 0).
**
**	>> Canvas shadowBlur (string value);
**	>> string shadowBlur ();
*/

Canvas.prototype.shadowBlur = function (value)
{
	return this._contextAttribute ("shadowBlur", value);
};


/*
**	Sets or returns the current font settings.
**
**	>> Canvas font (string value);
**	>> string font ();
*/

Canvas.prototype.font = function (value)
{
	return this._contextAttribute ("font", value);
};


/*
**	Sets or returns the current text align settings (start, end, left, right, center).
**
**	>> Canvas textAlign (string value);
**	>> string textAlign ();
*/

Canvas.prototype.textAlign = function (value)
{
	return this._contextAttribute ("textAlign", value);
};


/*
**	Sets or returns the current text base line settings (alphabetic, bottom, hanging, ideographic, middle, top. Alphabetic is default).
**
**	>> Canvas textBaseline (string value);
**	>> string textBaseline ();
*/

Canvas.prototype.textBaseline = function (value)
{
	return this._contextAttribute ("textBaseline", value);
};


/*
**	Sets or returns the current global alpha value.
**
**	>> Canvas globalAlpha (float value);
**	>> float globalAlpha ();
*/

Canvas.prototype.globalAlpha = function (value=null)
{
	if (value !== null)
		this._alpha = value;
	else
		return this._alpha;

	return this.alpha(1.0);
};


/*
**	Sets or returns the current global composite operation value (source-atop, source-in, source-out, source-over, destination-atop,
**	destination-in, destination-out, destination-over, lighter, copy, xor).
**
**	>> Canvas globalCompositeOperation (string value);
**	>> string globalCompositeOperation ();
*/
Canvas.prototype.globalCompositeOperation = function (value)
{
	return this._contextAttribute ("globalCompositeOperation", value);
};

/*
**	Updates the underlying canvas or gl transformation matrix. 
**
**	Canvas updateTransform();
*/
Canvas.prototype.updateTransform = function()
{
	this.setTransform (this.matr.data[0], this.matr.data[1], this.matr.data[3], this.matr.data[4], this.matr.data[6], this.matr.data[7]);
	return this;
};

/*
**	Sets the canvas or gl transformation matrix to the given one.
**
**	Canvas setTransform (float a, float b, float c, float d, float e, float f)
*/
Canvas.prototype.setTransform = function (a, b, c, d, e, f)
{
	if (this.context === null)
	{
		this.transform.data[0] = a;
		this.transform.data[1] = b;
		this.transform.data[2] = 0;
		this.transform.data[3] = c;
		this.transform.data[4] = d;
		this.transform.data[5] = 0;
		this.transform.data[6] = int(e);//Math.ceil(e);
		this.transform.data[7] = int(f);//Math.ceil(f);
		this.transform.data[8] = 1;

		return this;
	}

	//this.context.setTransform (a, b, c, d, Math.ceil(e), Math.ceil(f));
	this.context.setTransform (a, b, c, d, int(e), int(f));
	return this;
};

/*
**	Draws a filled rectangle on the canvas.
**
**	Canvas fillRect (float x, float y, float w, float h)
*/
Canvas.prototype.fillRect = function (x, y, w, h)
{
	this.context.fillRect (x, y, w, h);
	return this;
};

/*
**	Draws an stroked rectangle on the canvas.
**
**	Canvas strokeRect (float x, float y, float w, float h)
*/
Canvas.prototype.strokeRect = function (x, y, w, h)
{
	this.context.strokeRect (x, y, w, h);
	return this;
};

/*
**	Clears a rectangle on the canvas. All pixels will be erased.
**
**	Canvas clearRect (float x, float y, float w, float h)
*/
Canvas.prototype.clearRect = function (x, y, w, h)
{
	this.context.clearRect (x, y, w, h);
	return this;
};

/*
**	Starts a new path. Any previous path points will be cleared.
**
**	Canvas beginPath()
*/
Canvas.prototype.beginPath = function ()
{
	this.context.beginPath ();
	return this;
};

/*
**	Creates a new point in the current path.
**
**	Canvas moveTo (float x, float y)
*/
Canvas.prototype.moveTo = function (x, y)
{
	this.context.moveTo (x, y);
	return this;
};

/*
**	Creates a new point from the first path point to the last, and finishes the path.
**
**	Canvas closePath()
*/
Canvas.prototype.closePath = function ()
{
	this.context.closePath ();
	return this;
};

/*
**	Draws a line from the last point on the path to the given point.
**
**	Canvas lineTo (float x, float y)
*/
Canvas.prototype.lineTo = function (x, y)
{
	this.context.lineTo (x, y);
	return this;
};

/*
**	Creates a hollow rectangle path on the canvas for subsequent stroke or fill.
**
**	Canvas rect (float x, float y, float w, float h)
*/
Canvas.prototype.rect = function (x, y, w, h)
{
	this.context.rect (x, y, w, h);
	return this;
};

/*
**	Fills the active path with the current fill style or with the one given in the value parameter.
**
**	Canvas fill (string value=null)
*/
Canvas.prototype.fill = function (value=null)
{
	if (value) this.fillStyle (value);
	this.context.fill ();
	return this;
};

/*
**	Strokes the active path with the current stroke style or with the one given in the value parameter.
**
**	Canvas stroke (string value=null)
*/
Canvas.prototype.stroke = function (value=null)
{
	if (value) this.strokeStyle (value);
	this.context.stroke ();
	return this;
};

/*
**	Clips a region of the canvas so that only the region will be used for drawing. Coordinates must be in logical screen space.
**
**	Canvas clip()
*/
Canvas.prototype.clip = function (x, y, width, height)
{
	if (this.gl !== null)
	{
		x *= this._globalScale;
		y *= this._globalScale;
		width *= this._globalScale;
		height *= this._globalScale;

		if (this.isFlipped)
			this.gl.scissor(this.width-y-height-1, this.height-x-width-1, height, width);
		else
			this.gl.scissor(x, this.height-y-height-1, width, height);
	}

	return this;
};

/*
**	Adds points of a quadratic curve to the active path. A control points and one reference point must be provided.
**
**	Canvas quadraticCurveTo (float cpx, float cpy, float x, float y)
*/
Canvas.prototype.quadraticCurveTo = function (cpx, cpy, x, y)
{
	this.context.quadraticCurveTo (cpx, cpy, x, y);
	return this;
};

/*
**	Adds points of a bezier curve to the active path. Two control points and one reference point must be provided.
**
**	Canvas bezierCurveTo (float cx1, float cy1, float cx2, float cy2, float x, float y)
*/
Canvas.prototype.bezierCurveTo = function (cx1, cy1, cx2, cy2, x, y)
{
	this.context.bezierCurveTo (cx1, cy1, cx2, cy2, x, y);
	return this;
};

/*
**	Adds points of an arc the the active path. Used to draw a circle of part of it.
**
**	Canvas arc (float x, float y, float r, float sA, float eA, float cw)
*/
Canvas.prototype.arc = function (x, y, r, sA, eA, cw)
{
	this.context.arc (x, y, r, sA, eA, cw);
	return this;
};

/*
**	Adds points of an arc to the active path. Used to create an arc between two points.
**
**	Canvas arcTo (float x1, float y1, float x2, float y2, float r)
*/
Canvas.prototype.arcTo = function (x1, y1, x2, y2, r)
{
	this.context.arcTo (x1, y1, x2, y2, r);
	return this;
};

/*
**	Draws filled text on the canvas with the active font, and fillStyle properties.
**
**	Canvas fillText (string text, float x, float y, float maxWidth=1000)
*/
Canvas.prototype.fillText = function (text, x, y, maxWidth=1000)
{
	this.context.fillText (text, x, y, maxWidth);
	return this;
};

/*
**	Draws stroked text on the canvas with the active font, and fillStyle properties.
**
**	Canvas strokeText (string text, float x, float y, float maxWidth=1000)
*/
Canvas.prototype.strokeText = function (text, x, y, maxWidth=1000)
{
	this.context.strokeText (text, x, y, maxWidth);
	return this;
};


/*
**	Measures the width of the given text using active font properties.
**
**	float measureText (string text)
*/
Canvas.prototype.measureText = function (text)
{
	return this.context.measureText(text).width;
};


/*
**	Returns a new image data object with the specified size.
**
**	ImageData createImageData (float w, float h)
*/
Canvas.prototype.createImageData = function (w, h)
{
	return this.context.createImageData (w, h);
};


/*
**	Returns an image data object with the pixels of a rectangular area of the canvas.
**
**	ImageData getImageData (float x, float y, float w, float h)
*/
Canvas.prototype.getImageData = function (x, y, w, h)
{
	return this.context.getImageData (x, y, w, h);
};


/*
**	Puts image data on the canvas at the specified location.
**
**	Canvas putImageData (ImageData data, float x, float y)
*/
Canvas.prototype.putImageData = function (data, x, y)
{
	this.context.putImageData (data, x, y);
	return this;
};


/*
**	Draws an image on the canvas.
**
**	Canvas drawImage (Image img, float x, float y)
**	Canvas drawImage (Image img, float x, float y, float w, float h)
**	Canvas drawImage (Image img, float sx, float sy, float sw, float sh, float dx, float dy, float dw, float dh)
*/
Canvas.prototype.drawImage = function (img, sx=0, sy=0, sw=null, sh=null, dx=null, dy=null, dw=null, dh=null)
{
	if (sw === null)
	{
		this.context.drawImage (img, int(sx), int(sy));
	}
	else if (dx === null)
	{
		this.context.drawImage (img, int(sx), int(sy), int(sw), int(sh));
	}
	else
	{
		let a3 = int(sw);
		let a4 = int(sh);
		if (!a3 || !a4) return this;

		let a7 = int(dw);
		let a8 = int(dh);
		if (!a7 || !a8) return this;

		this.context.drawImage (img, int(sx), int(sy), a3, a4, int(dx), int(dy), a7, a8);
	}

	return this;
};


/*
**	Clears the entire canvas. If the backgroundColor parameter is set the canvas will be cleared manually by using
**	the fillRect method.
**
**	Canvas clear (string backgroundColor)
**	Canvas clear ()
*/

Canvas.prototype.clear = function (backgroundColor=null)
{
	if (this.gl != null)
	{
		this.gl.clear(this.gl.DEPTH_BUFFER_BIT | this.gl.COLOR_BUFFER_BIT);
		this.glActiveTextureId = null;

		return this;
	}

	if (backgroundColor)
	{
		this.globalCompositeOperation("source-over").globalAlpha(1.0).fillStyle(backgroundColor !== true ? backgroundColor : this.backgroundColor).fillRect(0, 0, this._width, this._height);
	}
	else
	{
		this.elem.width = this.width;
		this.applyConfig();
	}

	this.updateTransform();
	return this;
};


/*
**	Indicates that rendering is about to start. Used only in gl mode.
*/
Canvas.prototype.start = function ()
{
};

/*
**	Indicates that rendering has ended. Used only in gl mode.
*/
Canvas.prototype.end = function ()
{
};

/*
**	Indicates that rendering has been completed and any flush operation should be executed. Used only in gl mode.
*/
Canvas.prototype.flush = function ()
{
	let gl = this.gl;
	if (gl === null) return;

	gl.colorMask (false, false, false, true);
	gl.clear (gl.COLOR_BUFFER_BIT);
	gl.colorMask (true, true, true, true);

	// VIOLET: Add gl.flush() if not using RAF.
};

/**
 *	Blits the specified texture to the active framebuffer.
 */
Canvas.prototype.blit = function (texture, width, height, shaderProgram=null)
{
	let gl = this.gl;
	if (gl === null) return;

	shaderProgram = shaderProgram || this.glBlitProgram;

	this.setShaderProgram(shaderProgram);
	gl.disable (gl.DEPTH_TEST);

		gl.activeTexture (gl.TEXTURE0);
		gl.bindTexture (gl.TEXTURE_2D, texture);
		gl.uniform1i (shaderProgram.uniform_texture_0, 0);

		gl.uniform2fv (shaderProgram.uniform_resolution, this.v_resolution);
		gl.uniform1f (shaderProgram.uniform_time, globals.time);
		gl.uniform1f (shaderProgram.uniform_scale, this._globalScale);
		gl.uniform1f (shaderProgram.uniform_alpha, this._alpha);

		this.v_texture_size[0] = width;
		this.v_texture_size[1] = height;
		gl.uniform2fv (shaderProgram.uniform_texture_size, this.v_texture_size);

		this.m_location[0] = this.width;
		this.m_location[4] = this.height;
		this.m_location[6] = 0;
		this.m_location[7] = 0;

		this.m_texture[0] = this.width;
		this.m_texture[4] = this.height;
		this.m_texture[6] = 0;
		this.m_texture[7] = 0;

		gl.uniformMatrix3fv (shaderProgram.uniform_location_matrix, false, this.m_location);
		gl.uniformMatrix3fv (shaderProgram.uniform_texture_matrix, false, this.m_texture);
		gl.drawArrays (gl.TRIANGLE_STRIP, 0, 4);

	this.setShaderProgram(this.glDefaultProgram);
	gl.enable (gl.DEPTH_TEST);
};

/*
**	Resets the context drawing properties to their initial values.
**
**	Canvas reset (bool clearPath=false);
*/
Canvas.prototype.reset = function (clearPath=false)
{
	this.fillStyle("#000000").strokeStyle("#000000").lineCap("butt").lineJoin("miter")
	.lineWidth("1").miterLimit("10").shadowColor("#000000").shadowOffsetX("0")
	.shadowOffsetY("0").shadowBlur("0").globalAlpha("1.0").globalCompositeOperation("source-over");

	if (clearPath) this.beginPath().closePath();

	return this;
};

/*
**	Pushes the current transformation matrix into the matrix stack.
*/
Canvas.prototype.pushMatrix = function ()
{
	this.matrixStack.push(this.matr);
	this.matr = this.matr.clone();

	return this;
};

/*
**	Pops a matrix from the matrix stack into the transformation matrix.
*/
Canvas.prototype.popMatrix = function ()
{
	this.matr.free();
	this.matr = this.matrixStack.pop();

	return this.updateTransform();
};

/*
**	Sets or returns the relative alpha value for subsequent drawing operations.
**
**	>> Canvas alpha (float value);
**	>> float alpha ();
*/

Canvas.prototype.alpha = function (value)
{
	this._alpha *= value;

	if (this.context && this.gl === null)
		this.context.globalAlpha = this._alpha;

	return this;
};

/*
**	Pushes the current global alpha into the stack.
*/
Canvas.prototype.pushAlpha = function ()
{
	this.alphaStack.push (this.globalAlpha());
	return this;
};

/*
**	Pops an alpha from the stack into the global alpha.
**
**	>> Canvas popAlpha();
*/
Canvas.prototype.popAlpha = function ()
{
	this.globalAlpha(this.alphaStack.pop());
	return this;
};

/*
**	Sets the depth-test flag.
*/
Canvas.prototype.setDepthFlag = function (value)
{
	let gl = this.gl;
	if (gl === null) return;

	if (value)
	{
		gl.enable (gl.DEPTH_TEST);
		this._depthFlag = true;
	}
	else
	{
		gl.disable (gl.DEPTH_TEST);
		this._depthFlag = false;
	}
};

/*
**	Returns the depth-test flag.
*/
Canvas.prototype.getDepthFlag = function ()
{
	return this._depthFlag;
};

/*
**	Pushes the current depth-test flag into the depth flag stack. If a value is provided, the current flag will be pushed and set to the
**	given value only if they're different, when so, true will be returned.
*/
Canvas.prototype.pushDepthFlag = function (value=null)
{
	if (value !== null)
	{
		value = !!value;

		if (value === this._depthFlag)
			return false;

		this.depthFlagStack.push(this._depthFlag);
		this.setDepthFlag(value);

		return true;
	}

	this.depthFlagStack.push(this._depthFlag);
};

/*
**	Pops the depth-test flag from the depth flag stack.
*/
Canvas.prototype.popDepthFlag = function ()
{
	this.setDepthFlag(this.depthFlagStack.pop());
};

/*
**	Sets the active shader program.
*/
Canvas.prototype.setShaderProgram = function (program)
{
	let gl = this.gl;
	if (gl === null) return;

	this.shaderProgram = program;
	this.shaderProgram.use();
};

/*
**	Returns the current shader program.
*/
Canvas.prototype.getShaderProgram = function ()
{
	return this.shaderProgram;
};

/*
**	Pushes the current shader program into the stack. If a value is provided, the current shader program will be pushed and set to the
**	given one only if they're different, when so, true will be returned.
*/
Canvas.prototype.pushShaderProgram = function (program=null)
{
	if (program !== null)
	{
		if (program === this.shaderProgram)
			return false;

		this.shaderProgramStack.push(this.shaderProgram);
		this.setShaderProgram(program);

		return true;
	}

	this.shaderProgramStack.push(this.shaderProgram);
};

/*
**	Pops the shader program from the stack.
*/
Canvas.prototype.popShaderProgram = function ()
{
	this.setShaderProgram(this.shaderProgramStack.pop());
};


/*
**	Sets the transformation matrix to identity.
**
**	>> Canvas loadIdentity();
*/

Canvas.prototype.loadIdentity = function ()
{
	this.matr.identity();
	return this.updateTransform();
};


/*
**	Sets the transformation matrix to the specified one.
**
**	>> Canvas loadMatrix (Matrix matr);
*/

Canvas.prototype.loadMatrix = function (matr)
{
	this.matr.set(matr);
	return this.updateTransform();
};


/*
**	Returns the current transformation matrix, when `clone` is set to true, a cloned matrix will be returned.
**
**	>> Matrix getMatrix(bool clone=false);
*/

Canvas.prototype.getMatrix = function (clone=false)
{
	return clone ? this.matr.clone() : this.matr;
};


/*
**	Appends a matrix to the current transformation matrix.
**
**	>> Canvas appendMatrix (Matrix matr);
*/

Canvas.prototype.appendMatrix = function (matr)
{
	this.matr.append(matr);
	return this.updateTransform();
};


/*
**	Sets scaling factors for subsequent drawing operations. If the useNative is not set then scale with the current
**	transformation matrix will be performed.
**
**	>> Canvas scale (float sx, float sy, bool useNative=false);
*/

Canvas.prototype.scale = function (sx, sy, useNative)
{
	if (useNative) {
		this.context.scale (sx, sy);
		return this;
	}

	this.matr.scale (sx, sy);
	return this.updateTransform();
};


/*
**	Sets rotation factor for subsequent drawing operations. The angle is in radians. If useNative is not set
**	then rotation with the transformation matrix will be used.
**
**	>> Canvas rotate (float angle, bool useNative=false);
*/

Canvas.prototype.rotate = function (angle, useNative)
{
	if (useNative) {
		this.context.rotate (angle);
		return this;
	}

	this.matr.rotate(angle);
	return this.updateTransform();
};


/*
**	Moves starting point to an specified location. If the useNative parameter is not set then translation with
**	the transformation matrix will be done.
**
**	>> Canvas translate (float x, float y, bool useNative=false);
*/

Canvas.prototype.translate = function (x, y, useNative)
{
	if (useNative) {
		this.context.translate(x, y);
		return this;
	}

	this.matr.translate(x, y);
	return this.updateTransform();
};


/*
**	Creates a hollow ellipse path on the canvas for subsequent stroke or fill.
**
**	>> Canvas ellipse (float x, float y, float w, float h);
*/

Canvas.prototype.ellipse = function (x, y, w, h)
{
	var ox = (w/2)*.5522848, oy = (h/2)*.5522848;
	var xe = x+w-1, ye = y+h-1, xm = x+w/2, ym = y+h/2;

	this.beginPath ().moveTo(x, ym);
	this.bezierCurveTo (x, ym - oy, xm - ox, y, xm, y);
	this.bezierCurveTo (xm + ox, y, xe, ym - oy, xe, ym);
	this.bezierCurveTo (xe, ym + oy, xm + ox, ye, xm, ye);
	this.bezierCurveTo (xm - ox, ye, x, ym + oy, x, ym);
	this.closePath ();

	return this;
};


/*
**	Creates a hollow circle path on the canvas for subsequent stroke or fill. If the stroke param is set the circle
**	will be drawn with the specified stroke color.
**
**	>> Canvas circle (float x, float y, float r, string strokeColor);
**	>> Canvas circle (float x, float y, float r);
*/

Canvas.prototype.circle = function (x, y, r, stroke)
{
	this.beginPath();
	this.arc(x, y, r, 0, 2*Math.PI);
	this.closePath();

	if (stroke) this.stroke(stroke);

	return this;
};


/*
**	Draws a line for subsequent stroke or fill. If the stroke param is set the line will be drawn with
**	the specified stroke color.
**
**	>> Canvas line (float x1, float y1, float x2, float y2, string strokeColor);
**	>> Canvas line (float x1, float y1, float x2, float y2);
*/

Canvas.prototype.line = function (x1, y1, x2, y2, stroke)
{
	this.beginPath();
	this.moveTo(x1, y1);
	this.lineTo(x2, y2);
	this.closePath();

	if (stroke) this.stroke(stroke);
	return this;
};


/*
**	Attaches internal listeners for mouse/pointer events on the canvas object, this is called automatically when
**	attaching handlers to the canvas. The actual handlers are added or removed using the addPointerHandler and
**	removePointerHandler respectively.
**
**	>> Canvas enablePointerEvents();
*/

Canvas.prototype.enablePointerEvents = function()
{
	if (this.pointerHandler) return this;

	this.pointerScale = { sx: 1, sy: 1 };
	this.pointerOffset = { x: 0, y: 0 };

	var _ = this;

	var _evt =
	{
		action: '',
		buttons: 0, lbuttons: 0,
		x: 0, y: 0,

		containedBy: function (x, y, w, h) {
			return this.x >= x && this.x <= (x+w-1) && this.y >= y && this.y <= (y+h-1);
		}
	};

	this.pointerHandlers = [];

	this.pointerHandler = function (code, evt)
	{
		var rect = this.elem.getBoundingClientRect();

		_evt.action = code;
		_evt.buttons = evt.buttons;
		_evt.x = _evt.rx = int(evt.clientX - rect.left);
		_evt.y = _evt.ry = int(evt.clientY - rect.top);

		_evt.x = ((_evt.x - _.pointerOffset.x) - 0.0*_.pointerScale.sx) / _.pointerScale.sx;
		_evt.y = ((_evt.y - _.pointerOffset.y) - 0.0*_.pointerScale.sy) / _.pointerScale.sy;

		_evt.dragging = false;

		if (_evt.buttons && !_evt.lbuttons)
		{
			_evt.sx = _evt.x;
			_evt.sy = _evt.y;

			_evt.ldx = _evt.ldy = 0;
		}

		if (_evt.buttons && _evt.lbuttons)
		{
			_evt.dragging = true;

			_evt.dx = _evt.x - _evt.sx;
			_evt.dy = _evt.y - _evt.sy;
			
			_evt.ddx = _evt.dx - _evt.ldx;
			_evt.ddy = _evt.dy - _evt.ldy;

			_evt.ldx = _evt.dx;
			_evt.ldy = _evt.dy;
		}

		_evt.lbuttons = _evt.buttons;

		for (var i = 0; i < this.pointerHandlers.length; i++)
		{
			if (this.pointerHandlers[i][1] (_evt, this.pointerHandlers[i][2]) === false)
				break;
		}
	};

	this.elem.onmousedown = function(evt) {  _.pointerHandler('DOWN', evt); };
	this.elem.onmouseup = function(evt) { _.pointerHandler('UP', evt); };
	this.elem.onmousemove = function(evt) { _.pointerHandler('MOVE', evt); };

	return this;
};


/*
**	Sets the pointer scaling factors.
**
**	>> Canvas setPointerScale (float sx, float sy);
*/

Canvas.prototype.setPointerScale = function (sx, sy)
{
	this.pointerScale = { sx: sx, sy: sy };
	return this;
};


/*
**	Sets the pointer offset that is applied after scaling.
**
**	>> Canvas setPointerOffset (float x, float y);
*/

Canvas.prototype.setPointerOffset = function (x, y)
{
	this.pointerOffset = { x: x, y: y };
	return this;
};


/*
**	Adds a pointer event handler, returns the handler reference id for later removal.
**
**	>> string addPointerHandler (function callback, object context);
**	>> string addPointerHandler (function callback);
*/

Canvas.prototype.addPointerHandler = function (callback, context)
{
	this.enablePointerEvents();

	this.pointerHandlers.push ([this.pointerHandlers.length+"_"+int(Math.random()*1e6), callback, context]);

	return this.pointerHandlers[this.pointerHandlers.length-1][0];
};


/*
**	Removes a previously attached pointer event handler.
**
**	>> void removePointerHandler (string id);
*/

Canvas.prototype.removePointerHandler = function (id)
{
	if (!this.pointerHandlers) return;

	for (var i = 0; i < this.pointerHandlers.length; i++)
	{
		if (this.pointerHandlers[i][0] == id)
		{
			this.pointerHandlers.splice(i, 1);
			break;
		}
	}
};

/**
 * 	Executes the `draw` function on a new canvas of the specified width and height. Renders it into an image and runs the completed callback with the ready HTMLImageElement object.
 * 	!static renderImage (width: number, height: number, filter: 'NEAREST'|'LINEAR', draw: (g: Canvas) => void, completed: (img: HTMLImageElement) => void) : void;
 */
Canvas.renderImage = function (width, height, draw, completed)
{
	let g = new Canvas({ width: width, height: height });

	draw(g);

	let img = new Image();
	img.onload = () => {
		//Violet: set other image properties.
		img.filter = 'NEAREST';
		img.rscale = 1.0;
		System.renderer.prepareImage(img);
		completed(img);
	};

	img.src = g.toDataUrl();
	g.dispose();
};

export default Canvas;
