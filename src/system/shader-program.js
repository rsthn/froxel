/*
**	system/shader-program.js
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

import { Class } from 'rinn';
import Shader from './shader.js';
import globals from './globals.js';

//![import "./shader"]
//![import "./globals"]

//:/**
//: * 	Describes a shader program.
//: */

//!class ShaderProgram

const ShaderProgram = Class.extend
({
	/**
	 * 	Locations of the generic uniforms.
	 * 
	 *	!readonly uniform_location_matrix: number; // m_location
	 *	!readonly uniform_transform_matrix: number; // m_transform
	 *	!readonly uniform_texture_matrix: number; // m_texture
	 *	!readonly uniform_resolution: number; // v_resolution
	 *	!readonly uniform_texture_size: number; // v_texture_size
	 *	!readonly uniform_frame_size: number; // v_frame_size
	 *	!readonly uniform_base_color: number; // v_base_color
	 *	!readonly uniform_time: number; // f_time
	 *	!readonly uniform_depth: number; // f_depth
	 *	!readonly uniform_scale: number; // f_scale
	 *	!readonly uniform_alpha: number; // f_alpha
	 *	!readonly uniform_texture_0: number; // texture0
	 */

	uniform_location_matrix: 0, /* mat3 */
	uniform_transform_matrix: 0, /* mat3 */
	uniform_texture_matrix: 0, /* mat3 */

	uniform_resolution: 0, /* vec2 */
	uniform_texture_size: 0, /* vec2 */
	uniform_frame_size: 0, /* vec2 */
	uniform_base_color: 0, /* vec4 */

	uniform_time: 0, /* float */
	uniform_depth: 0, /* float */
	uniform_scale: 0, /* float */
	uniform_alpha: 0, /* float */

	uniform_texture_0: 0,

	/**
	 * 	Locations of the generic attributes.
	 * 	!readonly attrib_location: number;
	 */
	attrib_location: 0x00, /* vec2 */

	/**
	 * 	Identifier of the program.
	 * 	!readonly id: string;
	 */
	id: null,

	/**
	 * 	Shaders attached to the program.
	 * 	!readonly shaders: Array<Shader>;
	 */
	shaders: null,

	/**
	 * 	Shader program GL identifier.
	 * 	!readonly programId: number;
	 */
	programId: null,

	/**
	 *	Constructs an empty shader program with the specified identifier. Attach shaders by using the `attach` method.
	 * 	!constructor (id: string);
	 */
	__ctor: function (id)
	{
		this.id = id;

		this.shaders = [];
		this.programId = null;

		ShaderProgram.put(id, this);
	},

	/**
	 * 	Destroys the shader program.
	 */
	__dtor: function ()
	{
		let gl = globals.gl;
		if (!gl) return this;

		gl.deleteProgram(this.programId);
		ShaderProgram.remove(this.id);
	},

	/**
	 * 	Attaches a shader to the shader program.
	 * 	!attach (shader: Shader|string) : ShaderProgram;
	 */
	attach: function (shader)
	{
		if (typeof(shader) === 'string')
			shader = Shader.get(shader);

		if (!shader)
			throw new Error ('Unable to attach shader, invalid argument.');

		this.shaders.push(shader);
		return this;
	},

	/**
	 * 	Binds the attribute locations to their predefined values.
	 * 	!bindLocations (gl: WebGL2RenderingContext) : void;
	 */
	bindLocations: function (gl)
	{
		gl.bindAttribLocation (this.programId, 0, 'location');
	},

	/**
	 * 	Loads the locations of the predefined uniforms and attributes.
	 * 	!loadLocations (gl: WebGL2RenderingContext) : void;
	 */
	loadLocations: function (gl)
	{
		this.uniform_location_matrix = gl.getUniformLocation (this.programId, 'm_location');
		this.uniform_transform_matrix = gl.getUniformLocation (this.programId, 'm_transform');
		this.uniform_texture_matrix = gl.getUniformLocation (this.programId, 'm_texture');
		this.uniform_resolution = gl.getUniformLocation (this.programId, 'v_resolution');
		this.uniform_texture_size = gl.getUniformLocation (this.programId, 'v_texture_size');
		this.uniform_frame_size = gl.getUniformLocation (this.programId, 'v_frame_size');
		this.uniform_base_color = gl.getUniformLocation (this.programId, 'v_base_color');
		this.uniform_time = gl.getUniformLocation (this.programId, 'f_time');
		this.uniform_depth = gl.getUniformLocation (this.programId, 'f_depth');
		this.uniform_scale = gl.getUniformLocation (this.programId, 'f_scale');
		this.uniform_alpha = gl.getUniformLocation (this.programId, 'f_alpha');
		this.uniform_texture_0 = gl.getUniformLocation (this.programId, 'texture0');

		this.attrib_location = gl.getAttribLocation (this.programId, 'location');
	},

	/**
	 * 	Links the shaders into the shader program. Completion can be obtained by calling `getStatus`.
	 * 	!link() : ShaderProgram;
	 */
	link: function ()
	{
		let gl = globals.gl;
		if (!gl) return this;

		this.programId = gl.createProgram();

		for (let shader of this.shaders)
			gl.attachShader (this.programId, shader.shaderId);

		this.bindLocations(gl);
		gl.linkProgram (this.programId);
		this.loadLocations(gl);

		return this;
	},

	/**
	 * 	Enables the shader program to be used in the subsequent drawing operations.
	 * 	!use() : void;
	 */
	use: function ()
	{
		let gl = globals.gl;
		if (!gl) return;

		gl.useProgram (this.programId);
	},

	/**
	 * 	Returns the link status of the program.
	 * 	!getStatus() : boolean;
	 */
	getStatus: function ()
	{
		let gl = globals.gl;
		if (!gl) return true;

		return gl.getProgramParameter(this.programId, gl.LINK_STATUS);
	},

	/**
	 * 	Returns the error of the last link operation.
	 * 	!getError() : string;
	 */
	getError: function ()
	{
		let gl = globals.gl;
		if (!gl) return '';

		if (this.programId === null)
			return 'Program has not been linked.';

		return gl.getProgramInfoLog(this.programId);
	},

	/**
	 * 	Returns the errors found in the program and all shaders.
	 * 	!getAllErrors() : string;
	 */
	getAllErrors: function ()
	{
		let e = '>> PROGRAM:\n' + this.getError();

		for (let shader of this.shaders)
		{
			e += '\n>> ' + (shader.type === Shader.Type.VERTEX ? 'vertex' : 'fragment').toUpperCase() + ':\n' + shader.getError();
		}

		return e;
	}
});

/**
 * 	Global shader program list.
 */
ShaderProgram.programs = { };

/**
 * 	Puts a shader program in the global program list under the specified identifier.
 * 	!static put (id: string, shaderProgram: ShaderProgram) : void;
 */
ShaderProgram.put = function (id, shaderProgram)
{
	this.programs[id] = shaderProgram;
};

/**
 * 	Returns a shader program from the global program list given its identifier.
 * 	!static get (id: string) : ShaderProgram;
 */
ShaderProgram.get = function (id)
{
	return this.programs[id];
};

/**
 * 	Removes a shader program from the global program list.
 * 	!static remove (id: string) : void;
 */
ShaderProgram.remove = function (id)
{
	delete this.programs[id];
};

export default ShaderProgram;
