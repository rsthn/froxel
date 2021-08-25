/*
**	system/framebuffer.js
**
**	Copyright (c) 2021-2022, RedStar Technologies, All rights reserved.
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

import { Class } from '@rsthn/rin';
import globals from './globals.js';
import System from './system.js';

/*
 *	Describes a GL framebuffer.
 */

const Framebuffer = Class.extend
({
	/**
	 *	Shader GL identifier.
	 */
	framebufferId: null,

	/**
	 *	Attachments of the framebuffer.
	 */
	attachments: null,

	/**
	 *	Type of each attachment.
	 */
	attachmentTypes: null,

	/**
	 *	Width of the framebuffer.
	 */
	width: 0,

	/**
	 *	Height of the framebuffer.
	 */
	height: 0,

	/**
	 *	Enabled draw buffers.
	 */
	drawBuffers: null,
	drawBufferIds: null,

	/**
	 *	Constructs a GL framebuffer.
	 *
	 * 	@param {number} width
	 * 	@param {number} height
	 */
	__ctor: function (width=null, height=null)
	{
		if (globals.gl === null)
			return;

		if (attachmentPointIds[0] === null)
			initAttachmentPointIds(globals.gl);

		this.framebufferId = globals.gl.createFramebuffer();

		this.drawBuffers = [];
		this.drawBufferIds = [];

		//violet:hardware scaling
		//this.width = width || System.screenWidth;
		//this.height = height || System.screenHeight;

		this.width = width || System.renderer.width;
		this.height = height || System.renderer.height;

	   	this.attachments = new Array(Framebuffer.MAX_ATTACHMENT_POINTS).fill(null);
	   	this.attachmentTypes = new Array(Framebuffer.MAX_ATTACHMENT_POINTS).fill(null);
	},

	/**
	 * 	Destroys the framebuffer and all attached textures.
	 */
	__dtor: function ()
	{
		let gl = globals.gl;
		if (gl === null) return;

		for (let i = 0; i < this.attachments.length; i++)
		{
			if (this.attachments[i] !== null)
			{
				if (this.attachmentTypes[i] === Framebuffer.TEXTURE)
					gl.deleteTexture(this.attachments[i]);
				else
					gl.deleteRenderbuffer(this.attachments[i]);
			}
		}

		gl.deleteFramebuffer(this.frameBufferId);
	},

	/**
	 * 	Attaches a texture to a framebuffer attachment point.
	 *
	 * 	@param {number} attachmentPoint
	 * 	@param {any} texture
	 * 	@param {number} type
	 */
	attach: function (attachmentPoint, texture, type=null)
	{
		let gl = globals.gl;
		if (gl === null) return;

		if (type === null)
			type = attachmentPoint < Framebuffer.DEPTH ? Framebuffer.TEXTURE : Framebuffer.RENDERBUFFER;

		this.attachments[attachmentPoint] = texture;
		this.attachmentTypes[attachmentPoint] = type;

		if (attachmentPoint < Framebuffer.DEPTH && this.drawBuffers.indexOf(attachmentPoint) === -1)
		{
			this.drawBuffers.push(attachmentPoint);
			this.drawBufferIds.push(attachmentPointIds[attachmentPoint]);
		}

		let prev = gl.getParameter(gl.FRAMEBUFFER_BINDING);
		gl.bindFramebuffer (gl.FRAMEBUFFER, this.framebufferId);

		switch (type)
		{
			case Framebuffer.TEXTURE:
				gl.framebufferTexture2D (gl.FRAMEBUFFER, attachmentPointIds[attachmentPoint], gl.TEXTURE_2D, texture, 0);
				break;

			case Framebuffer.RENDERBUFFER:
				gl.framebufferRenderbuffer (gl.FRAMEBUFFER, attachmentPointIds[attachmentPoint], gl.RENDERBUFFER, texture);
				break;
		}

		gl.bindFramebuffer (gl.FRAMEBUFFER, prev);
	},

	/**
	 * 	Creates a new color buffer texture.
	 *
	 * 	@param {number} width
	 * 	@param {number} height
	 * 	@returns {GLTexture}
	 */
	createColorBuffer: function (attachmentPoint, width=null, height=null)
	{
		let gl = globals.gl;
		if (gl === null) return null;

		if (width === null) width = this.width;
		if (height === null) height = this.height;

		let tex = gl.createTexture();
		gl.bindTexture (gl.TEXTURE_2D, tex);

		gl.texStorage2D (gl.TEXTURE_2D, 1, gl.RGBA8, width, height);
		gl.texParameteri (gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri (gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri (gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri (gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

		this.attach(attachmentPoint, tex);
		return tex;
	},

	/**
	 * 	Creates a new depth buffer texture.
	 *
	 * 	@param {number} width
	 * 	@param {number} height
	 * 	@returns {GLTexture}
	 */
	createDepthBuffer: function (width=null, height=null)
	{
		let gl = globals.gl;
		if (gl === null) return null;

		if (width === null) width = this.width;
		if (height === null) height = this.height;

		let tex = gl.createRenderbuffer();
		gl.bindRenderbuffer (gl.RENDERBUFFER, tex);
		gl.renderbufferStorage (gl.RENDERBUFFER, gl.DEPTH_COMPONENT24, width, height);

		this.attach(Framebuffer.DEPTH, tex);
		return tex;
	},

	/**
	 * 	Creates a new stencil buffer texture.
	 *
	 * 	@param {number} width
	 * 	@param {number} height
	 * 	@returns {GLTexture}
	 */
	createStencilBuffer: function (width=null, height=null)
	{
		let gl = globals.gl;
		if (gl === null) return null;

		if (width === null) width = this.width;
		if (height === null) height = this.height;

		let tex = gl.createTexture();
		gl.bindTexture (gl.TEXTURE_2D, tex);

		gl.texStorage2D (gl.TEXTURE_2D, 1, gl.DEPTH_STENCIL, width, height);
		gl.texParameteri (gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri (gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri (gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri (gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

		this.attach(Framebuffer.DEPTH_STENCIL, tex);
		return tex;
	},

	/**
	 * 	Returns a texture from the specified attachment point.
	 * 	@param {number} attachmentPoint 
	 */
	getTexture: function (attachmentPoint)
	{
		if (this.attachmentTypes[attachmentPoint] !== Framebuffer.TEXTURE)
			return null;

		return this.attachments[attachmentPoint];
	},

	/**
	 * 	Returns a renderbuffer from the specified attachment point.
	 * 	@param {number} attachmentPoint 
	 */
	getRenderBuffer: function (attachmentPoint)
	{
		if (this.attachmentTypes[attachmentPoint] !== Framebuffer.RENDERBUFFER)
			return null;

		return this.attachments[attachmentPoint];
	},

	/**
	 *	Binds the framebuffer for further operations.
	 */
	bind: function()
	{
		let gl = globals.gl;
		if (gl === null) return;

		gl.bindFramebuffer (gl.FRAMEBUFFER, this.framebufferId);

		gl.drawBuffers (this.drawBufferIds);
		gl.viewport (0, 0, this.width, this.height);
	},

	/**
	 *	Binds the default framebuffer.
	 */
	unbind: function()
	{
		let gl = globals.gl;
		if (gl === null) return;

		gl.bindFramebuffer (gl.FRAMEBUFFER, null);

		gl.drawBuffers (defaultDrawBuffers);
		gl.viewport (0, 0, System.renderer.width, System.renderer.height);
	},

	/**
	 *	Returns the status of the framebuffer. Returns true if the framebuffer is complete.
	 */
	isComplete: function()
	{
		let gl = globals.gl;
		if (gl === null) return true;

		let prev = gl.getParameter(gl.FRAMEBUFFER_BINDING);
		gl.bindFramebuffer (gl.FRAMEBUFFER, this.framebufferId);
		let result = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
		gl.bindFramebuffer (gl.FRAMEBUFFER, prev);

		return result === gl.FRAMEBUFFER_COMPLETE;
	}

});

/**
 *	Types of attachment objects.
 */
Framebuffer.TEXTURE = 1;
Framebuffer.RENDERBUFFER = 2;

/**
 *	Available attachment points.
 */
Framebuffer.COLOR0			= 0;
Framebuffer.COLOR1			= 1;
Framebuffer.COLOR2			= 2;
Framebuffer.COLOR3			= 3;
Framebuffer.COLOR4			= 4;
Framebuffer.COLOR5			= 5;
Framebuffer.COLOR6			= 6;
Framebuffer.COLOR7			= 7;
Framebuffer.DEPTH 			= 8;
Framebuffer.STENCIL 		= 9;
Framebuffer.DEPTH_STENCIL	= 10;

Framebuffer.MAX_ATTACHMENT_POINTS = 11;

/**
 *	GL framebuffer attachment point IDs.
 */
const attachmentPointIds = new Array(Framebuffer.MAX_ATTACHMENT_POINTS).fill(null);
const defaultDrawBuffers = new Array(1).fill(null);

/**
 * 	Initializes the attachment point IDs.
 */
const initAttachmentPointIds = function (gl)
{
	defaultDrawBuffers[0] = gl.BACK;

	attachmentPointIds[Framebuffer.COLOR0] = gl.COLOR_ATTACHMENT0;
	attachmentPointIds[Framebuffer.COLOR1] = gl.COLOR_ATTACHMENT1;
	attachmentPointIds[Framebuffer.COLOR2] = gl.COLOR_ATTACHMENT2;
	attachmentPointIds[Framebuffer.COLOR3] = gl.COLOR_ATTACHMENT3;
	attachmentPointIds[Framebuffer.COLOR4] = gl.COLOR_ATTACHMENT4;
	attachmentPointIds[Framebuffer.COLOR5] = gl.COLOR_ATTACHMENT5;
	attachmentPointIds[Framebuffer.COLOR6] = gl.COLOR_ATTACHMENT6;
	attachmentPointIds[Framebuffer.COLOR7] = gl.COLOR_ATTACHMENT7;
	attachmentPointIds[Framebuffer.DEPTH] = gl.DEPTH_ATTACHMENT;
	attachmentPointIds[Framebuffer.STENCIL] = gl.STENCIL_ATTACHMENT;
	attachmentPointIds[Framebuffer.DEPTH_STENCIL] = gl.DEPTH_STENCIL_ATTACHMENT;
};

export default Framebuffer;
