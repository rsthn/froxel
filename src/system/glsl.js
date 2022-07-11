
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

			if (value.startsWith('//@use '))
			{
				let str = '';

				for (let name of value.substring(7).split(','))
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
	 * - Directive "//@use" will be replaced with the appropriate snippet(s).
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

glsl.set('vert-defs', `
	uniform mat3 m_transform;
	uniform mat3 m_quad;
	uniform mat3 m_texture;
	uniform vec4 v_resolution;
	uniform vec4 v_frame_size;
	uniform float f_scale;
	uniform float f_time;
	uniform float f_depth;

	in vec3 location;
	out vec2 texcoords;
`);

glsl.set('frag-defs', `
	uniform vec4 v_resolution;
	uniform vec4 v_frame_size;
	uniform float f_scale;
	uniform float f_time;
	uniform float f_alpha;
	uniform sampler2D texture0;

	in vec2 texcoords;
	out vec4 color;
`);

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

// Returns the normalized (0 to 1) value for the given signed-normalized (-1 to 1) value.
glsl.set('norm', `
	float norm (float value) {
		return (value + 1.0) * 0.5;
	}

	vec2 norm (vec2 value) {
		return (value + 1.0) * 0.5;
	}

	vec3 norm (vec3 value) {
		return (value + 1.0) * 0.5;
	}
`);

// Returns the signed-normalized (-1 to 1) value for the given normalized (0 to 1) value.
glsl.set('snorm', `
	float snorm (float value) {
		return value * 2.0 - 1.0;
	}

	vec2 snorm (vec2 value) {
		return value * 2.0 - 1.0;
	}

	vec3 snorm (vec3 value) {
		return value * 2.0 - 1.0;
	}
`);

glsl.set('location2d', `
	//@use invertY, snorm

	vec4 location2d (vec3 location, float depth)
	{
		vec2 loc = vec2(m_transform * m_quad * location) / v_resolution.xy;
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

glsl.set('sqwave', `
	float sqwave (float time, float period, float dcycle) {
		return step(mod(time, period) - dcycle*period, 0.0);
	}
`);

glsl.set('mask', `
	float mask (float alpha) {
		return 1.0 - step(alpha, 0.0);
	}

	float mask (vec4 color) {
		return 1.0 - step(color.a, 0.0);
	}
`);
