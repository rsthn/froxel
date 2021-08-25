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

import { Class } from '@rsthn/rin';
import Shader from './shader.js';
import globals from './globals.js';

/**
 * 	Describes a shader program.
 */

const ShaderProgram = Class.extend
({
	/**
	 * 	Locations of the generic uniforms.
	 */
	uniform_location_matrix: 0, /* mat3 */
	uniform_transform_matrix: 0, /* mat3 */
	uniform_texture_matrix: 0, /* mat3 */

	uniform_resolution: 0, /* vec2 */
	uniform_texture_size: 0, /* vec2 */
	uniform_base_color: 0, /* vec4 */

	uniform_time: 0, /* float */
	uniform_depth: 0, /* float */
	uniform_scale: 0, /* float */
	uniform_alpha: 0, /* float */

	uniform_texture_0: 0,

	/**
	 * 	Locations of the generic attributes.
	 */
	attrib_location: 0x00, /* vec2 */

	/**
	 * 	Identifier of the program.
	 */
	id: null,

	/**
	 * 	Shaders attached to the program.
	 */
	shaders: null,

	/**
	 *	Shader program GL identifier.
	 */
	programId: null,

	/**
	 *	Constructs an empty shader program, attach shaders by using the `attach` method.
	 * 	@param {string} id - Identifier of the shader.
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
	 * 	@param {Shader|string} shader
	 * 	@returns {ShaderProgram}
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
	 * 	@param {WebGL2Context} gl
	 */
	bindLocations: function (gl)
	{
		gl.bindAttribLocation (this.programId, 0, 'location');
	},

	/**
	 * 	Loads the locations of the predefined uniforms and attributes.
	 * 	@param {WebGL2Context} gl
	 */
	loadLocations: function (gl)
	{
		this.uniform_location_matrix = gl.getUniformLocation (this.programId, 'm_location');
		this.uniform_transform_matrix = gl.getUniformLocation (this.programId, 'm_transform');
		this.uniform_texture_matrix = gl.getUniformLocation (this.programId, 'm_texture');
		this.uniform_resolution = gl.getUniformLocation (this.programId, 'v_resolution');
		this.uniform_texture_size = gl.getUniformLocation (this.programId, 'v_texture_size');
		this.uniform_base_color = gl.getUniformLocation (this.programId, 'v_base_color');
		this.uniform_time = gl.getUniformLocation (this.programId, 'f_time');
		this.uniform_depth = gl.getUniformLocation (this.programId, 'f_depth');
		this.uniform_scale = gl.getUniformLocation (this.programId, 'f_scale');
		this.uniform_alpha = gl.getUniformLocation (this.programId, 'f_alpha');
		this.uniform_texture_0 = gl.getUniformLocation (this.programId, 'texture0');

		this.attrib_location = gl.getAttribLocation (this.programId, 'location');
	},

	/**
	 * 	Links the shaders into the shader program. Completion can be obtained by calling getStatus().
	 * 	@returns {ShaderProgram}
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
	 */
	use: function ()
	{
		let gl = globals.gl;
		if (!gl) return;

		gl.useProgram (this.programId);
	},

	/**
	 * 	Returns the link status of the program.
	 * 	@returns {boolean}
	 */
	getStatus: function ()
	{
		let gl = globals.gl;
		if (!gl) return true;

		return gl.getProgramParameter(this.programId, gl.LINK_STATUS);
	},

	/**
	 * 	Returns the error of the last link operation.
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
	 */
	getAllErrors: function ()
	{
		let e = '>> PROGRAM:\n' + this.getError();

		for (let shader of this.shaders)
		{
			e += '\n>> ' + (shader.type === Shader.VERTEX_SHADER ? 'vertex' : 'fragment').toUpperCase() + ':\n' + shader.getError();
		}

		return e;
	}
});

/**
 * 	Static methods.
 */

ShaderProgram.programs = { };

ShaderProgram.put = function (id, shaderProgram)
{
	this.programs[id] = shaderProgram;
};

ShaderProgram.get = function (id)
{
	return this.programs[id];
};

ShaderProgram.remove = function (id)
{
	delete this.programs[id];
};

export default ShaderProgram;
