/*
**	system/shader.js
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
import glx from './glx.js';
import glsl from './glsl.js';

//![import "./glx"]
//![import "./glsl"]

//:/**
//: * Describes a shader object. The actual shader type is specified at construction.
//: */

//!class Shader

const Shader = Class.extend
({
	/**
	 * Identifier of the shader.
	 * !readonly id: string;
	 */
	id: null,

	/**
	 * Type of the shader.
	 * !readonly type: Shader.Type;
	 */
	type: 0,

	/**
	 * Shader GL identifier.
	 * !readonly shaderId: number;
	 */
	shaderId: null,

	/**
	 * Constructs a shader and registers with the specified id. Compile its GLSL code using the `compile` method.
	 * !constructor (id: string, type: Shader.Type);
	 */
	/**
	 * Constructs a shader, compile its GLSL code using the `compile` method.
	 * !constructor (type: Shader.Type);
	 */
	/**
	 * Constructs a shader with the specified GLSL code and registers with the specified id.
	 * !constructor (id: string, type: Shader.Type, source: string);
	 */
	/**
	 * Constructs a shader with the specified GLSL code.
	 * !constructor (type: Shader.Type, source: string);
	 */
	__ctor: function (id, type=null, source=null)
	{
		if (source === null && type !== null && typeof(type) === 'string')
		{
			source = type;
			type = null;
		}

		if (type === null)
		{
			type = id;
			id = null;
		}

		Shader.put(this.id = id, this);
		this.type = type;

		this.shaderId = null;

		if (source)
			this.compile(source);
	},

	/**
	 * 	Destroys the shader.
	 */
	__dtor: function ()
	{
		glx.gl.deleteShader(this.shaderId);
		Shader.remove(this.id);
	},

	/**
	 * Compiles the shader and throws an exception if any compilations error occur.
	 * !compile (source: string) : Shader;
	 */
	compile: function (source)
	{
		let gl = glx.gl;
		this.shaderId = gl.createShader (this.type === Shader.Type.VERTEX ? gl.VERTEX_SHADER : (this.type === Shader.Type.FRAGMENT ? gl.FRAGMENT_SHADER : gl.GEOMETRY_SHADER));

		source = glsl.process(source);

		gl.shaderSource(this.shaderId, source);
		gl.compileShader(this.shaderId);

		let error = gl.getShaderInfoLog(this.shaderId);
		if (error) {
			console.error(source.split("\n").map((i,index) => (index) + ": " + i).join("\n"));
			throw new Error ((this.id ? '[' + this.id + '] ' : '') + error);
		}

		return this;
	}
});

//!/class

/**
 * 	Global shader list.
 */
Shader.shaders = { };

/**
 * 	Stores a shader with the specified identifier in the global shader list.
 * 	!static put (id: string, shader: Shader) : void;
 */
Shader.put = function (id, shader)
{
	if (id) this.shaders[id] = shader;
};

/**
 * 	Returns a Shader from the global shader list given its identifier.
 * 	!static get (id: string) : Shader;
 */
Shader.get = function (id)
{
	return this.shaders[id];
};

/**
 * 	Removes a shader from the global shader list.
 * 	!static remove (id: string) : void;
 */
Shader.remove = function (id)
{
	delete this.shaders[id];
};

//!namespace Shader

//:/**
//: * 	Shader types.
//: */

//!enum Type

Shader.Type = {
	VERTEX: 0,
	//!VERTEX
	FRAGMENT: 1,
	//!FRAGMENT
	GEOMETRY: 2,
	//!GEOMETRY
};

//!/enum

export default Shader;
