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

//:/**
//: * Provides pre-processing to reuse GLSL code.
//: */

//!class glsl

const glsl =
{
	/**
	 * Library of GLSL code snippets.
	 */
	snippets: { },

	/**
	 * Registers a snippet in the GLSL code library.
	 * !static set (name: string, source: string) : void;
	 */
	set: function (name, source)
	{
		this.snippets[name] = source;
	},

	/**
	 * Returns a snippet of code given its name.
	 * !static get (name: string) : string;
	 */
	get: function (name)
	{
		return this.snippets.hasOwnProperty(name) ? this.snippets[name] : '';
	},

	/**
	 * Replaces special marks in the code.
	 */
	replace: function (code, alreadyImported)
	{
		code = code.split('\n');

		for (let i = 0; i < code.length; i++)
		{
			let value = code[i].trim();

			if (value.startsWith('#use '))
			{
				let str = '';

				for (let name of value.substring(5).split(','))
				{
					name = name.trim();

					if (alreadyImported.hasOwnProperty(name))
						continue;

					alreadyImported[name] = true;

					str += glsl.replace(glsl.get(name), alreadyImported) + '\n';
				}

				code[i] = str;
			}
		}

		return code.join('\n');
	},

	/**
	 * Processes GLSL code, returns a string of GLSL code ready to be compiled.
	 *
	 * - If "#version" not specified "#version 300 es" will be added.
	 * - If "precision" not specified "precision highp float;" will be added.
	 * - xasd
	 *
	 * !static process (code: string) : string;
	 */
	process: function (code)
	{
		code = code.trim();

		if (code.indexOf('precision') === -1)
			code = 'precision highp float;\n' + code;

		if (code.indexOf('#version') === -1)
			code = '#version 300 es\n' + code;

		return this.replace(code, { });
	}
};

//!/class

export default glsl;

/**
 * Reusable GLSL snippets.
 */

glsl.set('invertX', `
	vec2 invertX (vec2 value) {
		return value * vec2(-1.0, 1.0);
	}
`);

glsl.set('invertY', `
	vec2 invertY (vec2 value) {
		return value * vec2(1.0, -1.0);
	}
`);

glsl.set('snorm', `
	vec2 snorm (vec2 value) {
		return value * 2.0 - 1.0;
	}
`);

glsl.set('location2d', `
	#use invertY, snorm

	vec4 location2d (vec3 location, float depth)
	{
		vec2 loc = vec2(m_transform * m_quad * location) / v_resolution;
		return vec4(invertY(snorm(loc)), depth/16777216.0, 1.0);
	}
`);

glsl.set('frameTexCoords', `
	flat out vec2 v_frame_offset;

	vec2 frameTexCoords (vec3 location) {
		v_frame_offset = vec2(m_texture[2][0], m_texture[2][1]);
		return mat2(m_texture * m_quad) * location.xy / (v_frame_size.xy * v_frame_size.zw);
	}
`);

glsl.set('frameTex', `
	flat in vec2 v_frame_offset;

	vec4 frameTex (vec2 texcoords) {
		return texture(texture0, fract(texcoords)*v_frame_size.xy + v_frame_offset);
	}
`);

glsl.set('rand', `
	float rand (vec2 value) {
		return fract(sin(dot(value, vec2(12.9898, 78.233))) * 43758.5453);
	}
`);

glsl.set('align', `
	float align (float value, float step) {
		return floor(value/step)*step;
	}
`);
