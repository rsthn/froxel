
import { Class } from 'rinn';
import Canvas from './canvas';
import glx from './glx';

//!namespace Texture

	//:type FilterType = 'NEAREST' | 'LINEAR';
	//:type WrapMode = 'REPEAT' | 'CLAMP_TO_EDGE' | 'MIRRORED_REPEAT';

//!/namespace

//:/**
//: * Definition of a texture.
//: */

//!class Texture

export default Class.extend
({
	className: 'Texture',

	/**
	 * WebGL ID of the texture.
	 * !readonly textureId: number;
	 */
	textureId: null,

	/**
	 * Texture width (physical width).
	 * !readonly width: number;
	 */
	width: 0,

	/**
	 * Texture height (physical height).
	 * !readonly height: number;
	 */
	height: 0,

	/**
	 * Target width originally requested (logical width).
	 * !readonly targetWidth: number;
	 */
	targetWidth: 0,

	/**
	 * Target height originally requested (logical height).
	 * !readonly targetHeight: number;
	 */
	targetHeight: 0,

	/**
	 * Real scale of the texture (physical width / logical width).
	 * !readonly rscale: number;
	 */
	rscale: 1.0,

	/**
	 * Texture filter.
	 * !readonly filter: Texture.FilterType;
	 */
	filter: 'LINEAR',

	/**
	 * Texture wrap mode.
	 * !readonly wrap: Texture.WrapMode;
	 */
	wrap: 'CLAMP_TO_EDGE',

	/**
	 * Number of mipmap levels (use 0 to disable).
	 * !readonly mipmap: number;
	 */
	mipmap: 0,

	/**
	 * Indicates if the texture storage has already been allocated.
	 */
	allocated: false,

	/**
	 * Canvas currently attached to the texture.
	 */
	canvas: null,

	/**
	 * Creates an empty texture of the specified size.
	 * !constructor (width: number, height: number, targetWidth?: number, targetHeight?: number);
	 */
	__ctor: function (width, height, targetWidth=null, targetHeight=null)
	{
		this.textureId = null;

		this.width = width;
		this.height = height;
		this.targetWidth = targetWidth ?? width;
		this.targetHeight = targetHeight ?? height;

		this.rscale = this.width / this.targetWidth;
		this.filter = 'LINEAR';
		this.wrap = 'CLAMP_TO_EDGE';
		this.mipmap = 0;
	},

	/**
	 * Binds the texture to the TEXTURE_2D target.
	 * !bind(): WebGL2RenderingContext;
	 */
	bind: function ()
	{
		const gl = glx.gl;

		if (this.textureId === null)
			this.textureId = gl.createTexture();

		gl.bindTexture(gl.TEXTURE_2D, this.textureId);

		if (this.allocated === false)
		{
			this.allocated = null;
			this.allocate();
		}

		return gl;
	},

	/**
	 * Allocates the texture storage.
	 * !allocate(): Texture;
	 */
	allocate: function ()
	{
		if (this.allocated === true)
			return this;

		this.allocated = true;

		const gl = this.bind();

		this.applyFilter(gl);
		this.applyWrap(gl);

		if (this.mipmap > 0)
			gl.texStorage2D(gl.TEXTURE_2D, this.mipmap, gl.RGBA8, this.width, this.height);
		else
			gl.texStorage2D(gl.TEXTURE_2D, 1, gl.RGBA8, this.width, this.height);

		return this;
	},

	/**
	 * Applies the texture filter.
	 * !applyFilter() : Texture;
	 */
	applyFilter: function (_gl=null)
	{
		const gl = _gl ?? this.bind();

		if (this.mipmap > 0)
		{
			if (this.filter === 'NEAREST')
			{
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
			}
			else
			{
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			}
		}
		else
		{
			if (this.filter === 'NEAREST')
			{
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
			}
			else
			{
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			}
		}

		return this;
	},

	/**
	 * Applies the texture wrap mode.
	 * !applyWrap() : Texture;
	 */
	applyWrap: function (_gl=null)
	{
		const gl = _gl ?? this.bind();

		if (this.wrap === 'REPEAT')
		{
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
		}
		else if (this.wrap === 'MIRRORED_REPEAT')
		{
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
		}
		else
		{
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		}

		return this;
	},

	/**
	 * Sets the texture filter.
	 * !setFilter (filter: Texture.FilterType) : Texture;
	 */
	setFilter: function (filter)
	{
		this.filter = filter;
		if (this.textureId !== null) this.applyFilter();
		return this;
	},

	/**
	 * Sets the texture wrap mode.
	 * !setWrap (wrap: Texture.WrapMode) : Texture;
	 */
	setWrap: function (wrap)
	{
		this.wrap = wrap;
		if (this.textureId !== null) this.applyWrap();
		return this;
	},

	/**
	 * Sets the number of mipmap levels.
	 * !setMipmap (mipmap: number) : Texture;
	 */
	setMipmap: function (mipmap)
	{
		this.mipmap = mipmap;

		if (this.textureId !== null && this.allocated === true && this.mipmap > 0)
		{
			const gl = this.bind();
			gl.generateMipmap(gl.TEXTURE_2D);
		}

		return this;
	},

	/**
	 * Uploads data to the GPU from the specified image.
	 * !upload (image: object, targetX?: number, targetY?: number) : Texture;
	 */
	upload: function (image, targetX=0, targetY=0)
	{
		const gl = this.bind();

		gl.texSubImage2D(gl.TEXTURE_2D, 0, targetX, targetY, Math.min(image.width, this.width), Math.min(image.height, this.height), gl.RGBA, gl.UNSIGNED_BYTE, image);

		if (this.mipmap > 0)
			gl.generateMipmap(gl.TEXTURE_2D);

		return this;
	},

	/**
	 * Creates a canvas and attaches it to the texture. The contents of the attached canvas can be uploaded to the texture by calling the `uploadCanvas` method.
	 * !getCanvas (options?: Canvas.Options) : Texture;
	 */
	createCanvas: function (options=null)
	{
		if (this.canvas === null)
			this.canvas = new Canvas ({ gl: false, hidden: true, width: this.width, height: this.height, antialias: this.filter === 'LINEAR', ...options });

		return this;
	},

	/**
	 * Returns the canvas attached to the texture or `null` if no canvas has been created yet (use `createCanvas` first).
	 * !getCanvas() : Canvas;
	 */
	getCanvas: function ()
	{
		return this.canvas;
	},

	/**
	 * Uploads the bitmap data from the attached canvas to the texture. The callback is called when the upload is completed.
	 * @returns {Texture}
	 * !uploadCanvas (callback?: () => void) : Texture;
	 */
	uploadCanvas: function (callback=null)
	{
		if (this.canvas === null)
		{
			if (callback !== null) callback();
			return this;
		}

		let img = new Image();
		img.onload = () =>
		{
			this.upload(img);
			img = null;

			if (callback !== null) callback();
		};

		img.src = this.canvas.toDataUrl();
		return this;
	},

	/**
	 * Disposes the attached canvas.
	 * @returns {Texture}
	 */
	disposeCanvas: function ()
	{
		if (this.canvas !== null)
		{
			this.canvas.dispose();
			this.canvas = null;
		}

		return this;
	},

	/**
	 * Allocates a canvas, executes the given render function, uploads the result to the texture and disposes the canvas.
	 * @param {Canvas.Options} options
	 * @param {(g: Canvas) => void} render
	 * !uploadRender (options: Canvas.Options, render: (g: Canvas) => void) : Texture;
	 */
	/**
	 * Allocates a canvas, executes the given render function, uploads the result to the texture and disposes the canvas.
	 * @param {(g: Canvas) => void} render
	 * !uploadRender (render: (g: Canvas) => void) : Texture;
	 */
	uploadRender: function (options, render=null)
	{
		if (typeof(options) === 'function')
		{
			render = options;
			options = null;
		}

		render(this.createCanvas(options));

		this.uploadCanvas();
		this.disposeCanvas();
		return this;
	}
});

//!/class
