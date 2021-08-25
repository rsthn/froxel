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

import { Class } from '@rsthn/rin';
import globals from './globals.js';

/**
 * 	Describes a shader object. The actual shader type is specified at construction.
 */

const Shader = Class.extend
({
	/**
	 * 	Identifier of the shader.
	 */
	id: null,

	/**
	 * 	Type of the shader.
	 */
	type: 0,

	/**
	 * 	Source code of the shader.
	 */
	sourceCode: null,

	/**
	 *	Shader GL identifier.
	 */
	shaderId: null,

	/**
	 *	Constructs a shader, attach GLSL code by using the `source` method.
	 *
	 * 	@param {string} id - Identifier of the shader.
	 * 	@param {number} type - One of the constants GEOMETRY_SHADER, VERTEX_SHADER or FRAGMENT_SHADER from this class.
	 */
	__ctor: function (id, type)
	{
		this.id = id;
		this.type = type;

		this.sourceCode = '';
		this.shaderId = null;

		Shader.put(id, this);
	},

	/**
	 * 	Destroys the shader.
	 */
	__dtor: function ()
	{
		let gl = globals.gl;
		if (!gl) return;

		gl.deleteShader(this.shaderId);
		Shader.remove(this.id);
	},

	/**
	 * 	Appends GLSL code to the shader's source code buffer.
	 * 	@param {string} value
	 */
	source: function (value)
	{
		this.sourceCode += value;
		return this;
	},

	/**
	 * 	Compiles the shader. Errors can be obtained using getError() method.
	 */
	compile: function ()
	{
		let gl = globals.gl;
		if (!gl) return;

		this.shaderId = gl.createShader (this.type === Shader.VERTEX_SHADER ? gl.VERTEX_SHADER : (this.type === Shader.FRAGMENT_SHADER ? gl.FRAGMENT_SHADER : gl.GEOMETRY_SHADER));

		gl.shaderSource(this.shaderId, this.sourceCode);
		gl.compileShader(this.shaderId);
	},

	/**
	 * 	Returns the error of the last compile operation.
	 */
	getError: function ()
	{
		let gl = globals.gl;
		if (!gl) return '';

		if (this.shaderId === null)
			return 'Shader has not been compiled.';

		return gl.getShaderInfoLog(this.shaderId);
	}
});

/**
 * 	Shader types.
 */
Shader.VERTEX_SHADER = 0;
Shader.FRAGMENT_SHADER = 1;
Shader.GEOMETRY_SHADER = 2;

/**
 * 	Static methods.
 */

Shader.shaders = { };

Shader.put = function (id, shader)
{
	this.shaders[id] = shader;
};

Shader.get = function (id)
{
	return this.shaders[id];
};

Shader.remove = function (id)
{
	delete this.shaders[id];
};

export default Shader;
