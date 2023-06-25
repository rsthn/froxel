
import WebGLCanvas from './webgl-canvas.js';

/**
 * @typedef {'NEAREST' | 'LINEAR'} TextureFilterType
 */
/**
 * @typedef {'REPEAT' | 'CLAMP_TO_EDGE' | 'MIRRORED_REPEAT'} TextureWrapMode
 */

/**
 * WebGLCanvas Texture Object.
 */
export default class Texture
{
	/**
	 * Reference to the WebGLCanvas.
	 * @readonly @type {WebGLCanvas}
	 */
	gl;

	/**
	 * Texture object resource.
	 * @readonly @type {WebGLTexture}
	 */
	texture;

	/**
	 * Texture width (physical width).
	 * @readonly @type {number}
	 */
	width;

	/**
	 * Texture height (physical height).
	 * @readonly @type {number}
	 */
	height;

	/**
	 * Target width originally requested (logical width).
	 * @readonly @type {number}
	 */
	targetWidth;

	/**
	 * Target height originally requested (logical height).
	 * @readonly @type {number}
	 */
	targetHeight;

	/**
	 * Scale of the texture (physical width / logical width).
	 * @readonly @type {number}
	 */
	scale;

	/**
	 * Texture filter type. Defaults to `LINEAR`.
	 * @readonly @type {TextureFilterType}
	 */
	filterType;

	/**
	 * Texture wrap mode. Defaults to `CLAMP_TO_EDGE`.
	 * @readonly @type {TextureWrapMode}
	 */
	wrapMode;

	/**
	 * Number of mipmap levels (use 0 to disable). Default is `0`.
	 * @readonly @type {number}
	 */
	mipmapLevels;

	/**
	 * Indicates if the texture storage has already been allocated.
	 * @readonly @private @type {boolean}
	 */
	allocated;

	/**
	 * Creates an empty texture object of the specified size.
	 * @param {WebGLCanvas} gl
	 * @param {number} width - Physical texture width.
	 * @param {number} height - Physical texture height.
	 * @param {number} [targetWidth] - Logical texture width.
	 * @param {number} [targetHeight] - Logical texture height.
	 */
	constructor (gl, width, height, targetWidth=null, targetHeight=null)
	{
		this.gl = gl;
		this.texture = gl.genTexture();

		this.width = width;
		this.height = height;
		this.targetWidth = targetWidth ?? width;
		this.targetHeight = targetHeight ?? height;
		this.scale = this.width / this.targetWidth;

		this.allocated = false;
		this.mipmapLevels = 0;
		this.wrapMode = 'CLAMP_TO_EDGE';
		this.filterType = 'LINEAR';
	}

	/**
	 * Binds the texture to the `TEXTURE_2D` target and allocates the texture storage if not allocated yet.
	 * @returns {Texture}
	 */
	bindTexture()
	{
		this.gl.bindTexture (this.gl.TEXTURE_2D, this.texture);
		if (this.allocated !== false) return this;

		this.allocated = null;
		this.allocate();
		return this;
	}

	/**
	 * Allocates the texture storage.
	 * @returns {Texture}
	 */
	allocate()
	{
		if (this.allocated === true)
			return this;

		this.allocated = true;
		this.bindTexture().applyFilter().applyWrap();

		if (this.mipmapLevels > 0)
			this.gl.texStorage2D(this.gl.TEXTURE_2D, this.mipmapLevels, this.gl.RGBA8, this.width, this.height);
		else
			this.gl.texStorage2D(this.gl.TEXTURE_2D, 1, this.gl.RGBA8, this.width, this.height);

		return this;
	}

	/**
	 * Applies the texture filter.
	 * @private
	 * @param {boolean} [bindTexture]
	 * @returns {Texture}
	 */
	applyFilter (bindTexture=false)
	{
		if (bindTexture) this.bindTexture();

		let minFilter = this.gl.LINEAR;
		let magFilter = this.gl.LINEAR;

		if (this.filterType === 'NEAREST')
			minFilter = magFilter = this.gl.NEAREST;

		if (this.mipmapLevels > 0)
		{
			minFilter = this.gl.LINEAR_MIPMAP_LINEAR

			if (this.filterType === 'NEAREST')
				minFilter = this.gl.NEAREST_MIPMAP_LINEAR;
		}

		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, minFilter);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, magFilter);
		return this;
	}

	/**
	 * Applies the texture wrap mode.
	 * @private
	 * @param {boolean} [bindTexture]
	 * @returns {Texture}
	 */
	applyWrap (bindTexture=false)
	{
		if (bindTexture) this.bindTexture();

		let wrapMode = this.gl.CLAMP_TO_EDGE;

		if (this.wrapMode === 'REPEAT')
			wrapMode = this.gl.REPEAT;
		else if (this.wrap === 'MIRRORED_REPEAT')
			wrapMode = this.gl.MIRRORED_REPEAT;

		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, wrapMode);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, wrapMode);
		return this;
	}

	/**
	 * Sets the texture filter type.
	 * @param {TextureFilterType} filterType
	 * @returns {Texture}
	 */
	setFilter (filterType)
	{
		this.filterType = filterType;
		return this.allocated === true ? this.applyFilter(true) : this;
	}

	/**
	 * Sets the texture wrap mode.
	 * @param {TextureWrapMode} wrapMode
	 * @returns {Texture}
	 */
	setWrapMode (wrapMode)
	{
		this.wrapMode = wrapMode;
		return this.allocated === true ? this.applyWrap(true) : this;
	}

	/**
	 * Sets the number of mipmap levels. Valid only if texture data has not been allocated yet.
	 * @param {number} numLevels
	 * @returns {Texture}
	 */
	setMipmapLevels (numLevels)
	{
		if (this.allocated === true)
			return this;

		this.mipmapLevels = Math.max(0, numLevels);
		return this;
	}

	/**
	 * Uploads data to the GPU from the specified image.
	 * @param {HTMLImageElement} image
	 * @param {number} [offsX] - Target X offset.
	 * @param {number} [offsY] - Target Y offset;
	 * @returns {Texture}
	 */
	upload (image, offsX=0, offsY=0)
	{
		this.bindTexture();
		this.gl.texSubImage2D(this.gl.TEXTURE_2D, 0, offsX, offsY, Math.min(image.width, this.width), Math.min(image.height, this.height), this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);

		if (this.mipmapLevels > 0)
			this.gl.generateMipmap(this.gl.TEXTURE_2D);

		return this;
	}

	/**
	 * Makes the texture active on the specified texture unit.
	 * @param {number} unit - Texture unit index (0 to 15).
	 * @returns {Texture}
	 */
	activeTexture (unit)
	{
		this.gl.activeTexture(this.gl.TEXTURE0+(unit&15));
		this.bindTexture();
		return this;
	}
};
