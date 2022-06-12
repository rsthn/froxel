/*
**	system/texture.js
**
**	Copyright (c) 2016-2023, RedStar Technologies, All rights reserved.
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

import { Class } from 'rinn';
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

		const gl = this.bind();

		if (this.mipmap > 0)
			gl.texStorage2D(gl.TEXTURE_2D, this.mipmap, gl.RGBA8, this.width, this.height);
		else
			gl.texStorage2D(gl.TEXTURE_2D, 1, gl.RGBA8, this.width, this.height);

		this.allocated = true;
		return gl;
	},

	/**
	 * Applies the texture filter.
	 * !applyFilter() : Texture;
	 */
	applyFilter: function ()
	{
		const gl = this.bind();

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
	applyWrap: function ()
	{
		const gl = this.bind();

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
	}
});

//!/class