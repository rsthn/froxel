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
import glx from './glx.js';

//![import "./shader"]
//![import "./globals"]
//![import "./glx"]

//:/**
//: * Describes a shader program.
//: */

//!class ShaderProgram

const ShaderProgram = Class.extend
({
	/**
	 * Cache of locations.
	 */
	locations: null,

	/**
	 * Identifier of the program.
	 * !readonly id: string;
	 */
	id: null,

	/**
	 * Shaders attached to the program.
	 * !readonly shaders: Array<Shader>;
	 */
	shaders: null,

	/**
	 * Shader program GL identifier.
	 * !readonly programId: number;
	 */
	programId: null,

	/**
	 * Constructs an empty shader program with the specified identifier. Attach shaders by using the `attach` method.
	 * !constructor (id?: string);
	 */
	__ctor: function (id=null)
	{
		this.id = id;

		this.shaders = [];
		this.programId = null;

		this.locations = { };

		this._uniformSetter = null;

		ShaderProgram.put(id, this);
	},

	/**
	 * Destroys the shader program.
	 */
	__dtor: function ()
	{
		let gl = glx.gl;
		if (!gl) return this;

		gl.deleteProgram(this.programId);
		ShaderProgram.remove(this.id);
	},

	/**
	 * Sets the uniform setter function.
	 * @param { (pgm:ShaderProgram) => void } uniformSetter
	 * @returns {Element}
	 * !uniformSetter (uniformSetter: (pgm:ShaderProgram) => void) : ShaderProgram;
	 */
	uniformSetter: function (uniformSetter)
	{
		this._uniformSetter = uniformSetter;
		return this;
	},

	/**
	 * Attaches a shader to the shader program.
	 * !attach (shader: Shader|string) : ShaderProgram;
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
	 * Binds the attribute locations to their predefined values.
	 */
	bindLocations: function ()
	{
		glx.gl.bindAttribLocation (this.programId, 0, 'location');
	},

	/**
	 * Returns the location of an attribute.
	 * !getAttribLocation (name: string) : object;
	 */
	getAttribLocation: function (name)
	{
		if (!this.locations.hasOwnProperty(name))
			this.locations[name] = glx.gl.getAttribLocation (this.programId, name);

		return this.locations[name];
	},

	/**
	 * Returns the location of a uniform variable.
	 * !getUniformLocation (name: string) : object;
	 */
	getUniformLocation: function (name)
	{
		if (!this.locations.hasOwnProperty(name))
			this.locations[name] = glx.gl.getUniformLocation (this.programId, name);

		return this.locations[name];
	},

	/**
	 * Returns the location of a uniform block.
	 * !getUniformBlockLocation (name: string) : object;
	 */
	getUniformBlockLocation: function (name)
	{
		if (!this.locations.hasOwnProperty(name))
			this.locations[name] = glx.gl.getUniformBlockIndex (this.programId, name);

		return this.locations[name];
	},

	/**
	 * Returns the size of a uniform block.
	 * !getUniformBlockSize (uniformBlock: string|object) : number;
	 */
	getUniformBlockSize: function (uniformBlock)
	{
		if (typeof(uniformBlock) === 'string')
			uniformBlock = this.getUniformBlockLocation(uniformBlock);

		return glx.gl.getActiveUniformBlockParameter(this.programId, uniformBlock, glx.gl.UNIFORM_BLOCK_DATA_SIZE);
	},
	
	/**
	 * Creates a buffer for a uniform block.
	 * !createUniformBlockBuffer (uniformBlock: string|object) : Float32Array;
	 */
	createUniformBlockBuffer: function (uniformBlock)
	{
		if (typeof(uniformBlock) === 'string')
			uniformBlock = this.getUniformBlockLocation(uniformBlock);

		let size = this.getUniformBlockSize(uniformBlock);
		let buff = glx.createBufferFrom (new Float32Array(size).fill(0), glx.BufferTarget.UNIFORM_BUFFER, glx.BufferUsage.DYNAMIC_DRAW);

		glx.gl.bindBufferBase (glx.BufferTarget.UNIFORM_BUFFER, 0, buff);
	},

	/**
	 * Loads the locations of the predefined uniforms and attributes.
	 */
	preloadLocations: function ()
	{
		this.getUniformLocation('f_time');
		this.getUniformLocation('f_scale');

		this.getUniformLocation('m_transform');
		this.getUniformLocation('m_texture');
		this.getUniformLocation('m_quad');

		this.getUniformLocation('v_resolution');
		this.getUniformLocation('v_frame_size');

		this.getUniformLocation('f_depth');
		this.getUniformLocation('f_alpha');
		this.getUniformLocation('v_base_color');

		this.getUniformLocation('texture0');

		this.getAttribLocation('location');
	},

	/**
	 * Links the shaders into the shader program. Completion can be obtained by calling `getStatus`.
	 * !link() : ShaderProgram;
	 */
	link: function ()
	{
		let gl = glx.gl;
		if (!gl) return this;

		this.programId = gl.createProgram();

		for (let shader of this.shaders)
			gl.attachShader (this.programId, shader.shaderId);

		this.bindLocations();
		gl.linkProgram (this.programId);
		this.preloadLocations();

		return this;
	},

	/**
	 * Activates the shader program to be used in the subsequent drawing operations.
	 * !activate() : void;
	 */
	activate: function ()
	{
		let gl = glx.gl;
		if (!gl) return;

		gl.useProgram (this.programId);

		if (this._uniformSetter !== null)
			this._uniformSetter (this, gl);
	},

	/**
	 * Returns the link status of the program.
	 * !getStatus() : boolean;
	 */
	getStatus: function ()
	{
		let gl = glx.gl;
		if (!gl) return true;

		return gl.getProgramParameter(this.programId, gl.LINK_STATUS);
	},

	/**
	 * Returns the error of the last link operation.
	 * !getError() : string;
	 */
	getError: function ()
	{
		let gl = glx.gl;
		if (!gl) return '';

		if (this.programId === null)
			return 'Program has not been linked.';

		return gl.getProgramInfoLog(this.programId);
	},

	/**
	 * Sets the value of a uniform.
	 * !uniform1f (location: string|object, v0: number) : ShaderProgram;
	 */
	uniform1f: function (location, v0)
	{
		if (typeof(location) === 'string')
			location = this.getUniformLocation(location);

		glx.gl.uniform1f (location, v0);
		return this;
	},

	/**
	 * Sets the value of a uniform.
	 * !uniform1fv (location: string|object, value: any) : ShaderProgram;
	 */
	uniform1fv: function (location, value)
	{
		if (typeof(location) === 'string')
			location = this.getUniformLocation(location);

		glx.gl.uniform1fv (location, value);
		return this;
	},

	/**
	 * Sets the value of a uniform.
	 * !uniform1i (location: string|object, v0: number) : ShaderProgram;
	 */
	uniform1i: function (location, v0)
	{
		if (typeof(location) === 'string')
			location = this.getUniformLocation(location);

		glx.gl.uniform1i (location, v0);
		return this;
	},

	/**
	 * Sets the value of a uniform.
	 * !uniform1iv (location: string|object, value: any) : ShaderProgram;
	 */
	uniform1iv: function (location, value)
	{
		if (typeof(location) === 'string')
			location = this.getUniformLocation(location);

		glx.gl.uniform1iv (location, value);
		return this;
	},

	/**
	 * Sets the value of a uniform.
	 * !uniform2f (location: string|object, v0: number, v1: number) : ShaderProgram;
	 */
	uniform2f: function (location, v0, v1)
	{
		if (typeof(location) === 'string')
			location = this.getUniformLocation(location);

		glx.gl.uniform2f (location, v0, v1);
		return this;
	},

	/**
	 * Sets the value of a uniform.
	 * !uniform2fv (location: string|object, value: any) : ShaderProgram;
	 */
	uniform2fv: function (location, value)
	{
		if (typeof(location) === 'string')
			location = this.getUniformLocation(location);

		glx.gl.uniform2fv (location, value);
		return this;
	},

	/**
	 * Sets the value of a uniform.
	 * !uniform2i (location: string|object, v0: number, v1: number) : ShaderProgram;
	 */
	uniform2i: function (location, v0, v1)
	{
		if (typeof(location) === 'string')
			location = this.getUniformLocation(location);

		glx.gl.uniform2i (location, v0, v1);
		return this;
	},

	/**
	 * Sets the value of a uniform.
	 * !uniform2iv (location: string|object, value: any) : ShaderProgram;
	 */
	uniform2iv: function (location, value)
	{
		if (typeof(location) === 'string')
			location = this.getUniformLocation(location);

		glx.gl.uniform2iv (location, value);
		return this;
	},

	/**
	 * Sets the value of a uniform.
	 * !uniform3f (location: string|object, v0: number, v1: number, v2: number) : ShaderProgram;
	 */
	uniform3f: function (location, v0, v1, v2)
	{
		if (typeof(location) === 'string')
			location = this.getUniformLocation(location);

		glx.gl.uniform3f (location, v0, v1, v2);
		return this;
	},

	/**
	 * Sets the value of a uniform.
	 * !uniform3fv (location: string|object, value: any) : ShaderProgram;
	 */
	uniform3fv: function (location, value)
	{
		if (typeof(location) === 'string')
			location = this.getUniformLocation(location);

		glx.gl.uniform3fv (location, value);
		return this;
	},

	/**
	 * Sets the value of a uniform.
	 * !uniform3i (location: string|object, v0: number, v1: number, v2: number) : ShaderProgram;
	 */
	uniform3i: function (location, v0, v1, v2)
	{
		if (typeof(location) === 'string')
			location = this.getUniformLocation(location);

		glx.gl.uniform3i (location, v0, v1, v2);
		return this;
	},

	/**
	 * Sets the value of a uniform.
	 * !uniform3iv (location: string|object, value: any) : ShaderProgram;
	 */
	uniform3iv: function (location, value)
	{
		if (typeof(location) === 'string')
			location = this.getUniformLocation(location);

		glx.gl.uniform3iv (location, value);
		return this;
	},
	
	/**
	 * Sets the value of a uniform.
	 * !uniform4f (location: string|object, v0: number, v1: number, v2: number, v3: number) : ShaderProgram;
	 */
	uniform4f: function (location, v0, v1, v2, v3)
	{
		if (typeof(location) === 'string')
			location = this.getUniformLocation(location);

		glx.gl.uniform4f (location, v0, v1, v2, v3);
		return this;
	},

	/**
	 * Sets the value of a uniform.
	 * !uniform4fv (location: string|object, value: any) : ShaderProgram;
	 */
	uniform4fv: function (location, value)
	{
		if (typeof(location) === 'string')
			location = this.getUniformLocation(location);

		glx.gl.uniform4fv (location, value);
		return this;
	},

	/**
	 * Sets the value of a uniform.
	 * !uniform4i (location: string|object, v0: number, v1: number, v2: number, v3: number) : ShaderProgram;
	 */
	uniform4i: function (location, v0, v1, v2, v3)
	{
		if (typeof(location) === 'string')
			location = this.getUniformLocation(location);

		glx.gl.uniform4i (location, v0, v1, v2, v3);
		return this;
	},

	/**
	 * Sets the value of a uniform.
	 * !uniform4iv (location: string|object, value: any) : ShaderProgram;
	 */
	uniform4iv: function (location, value)
	{
		if (typeof(location) === 'string')
			location = this.getUniformLocation(location);

		glx.gl.uniform4iv (location, value);
		return this;
	},

});

/**
 * Global shader program list.
 */
ShaderProgram.programs = { };

/**
 * Puts a shader program in the global program list under the specified identifier.
 * !static put (id: string, shaderProgram: ShaderProgram) : void;
 */
ShaderProgram.put = function (id, shaderProgram)
{
	if (id) this.programs[id] = shaderProgram;
};

/**
 * Returns a shader program from the global program list given its identifier.
 * !static get (id: string) : ShaderProgram;
 */
ShaderProgram.get = function (id)
{
	return this.programs[id];
};

/**
 * Removes a shader program from the global program list.
 * !static remove (id: string) : void;
 */
ShaderProgram.remove = function (id)
{
	delete this.programs[id];
};

export default ShaderProgram;
