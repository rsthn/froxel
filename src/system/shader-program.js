
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
			throw new Error ('Unable to attach shader, argument is null.');

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
 * Creates a new shader program. The specified source code allows the use of "//@vert", "//@frag" and "//@geom" directives to specify the code
 * blocks of the vertex, fragment and geometry shader respectively.
 * !static create (id: string, source: string) : ShaderProgram;
 */
ShaderProgram.create = function (id, source)
{
	let vs = null, vsName = null;
	let fs = null, fsName = null;
	let gs = null, gsName = null;

	let active = null;

	for (let i of source.split('\n'))
	{
		let v = i.trim();

		if (v.startsWith('//'))
		{
			v = v.split(' ').map(i => i.trim());

			if (v[0] === '//@vert') {
				if (v.length > 1) vsName = v[1];
				if (vs === null) vs = [];
				active = vs;
				continue;
			}

			if (v[0] === '//@frag') {
				if (v.length > 1) fsName = v[1];
				if (fs === null) fs = [];
				active = fs;
				continue;

			}

			if (v[0] === '//@geom') {
				if (v.length > 1) gsName = v[1];
				if (gs === null) gs = [];
				active = gs;
				continue;
			}
		}

		if (active !== null)
			active.push(i);
	}

	let pgm = new ShaderProgram(id);

	// Convert to string.
	if (vs !== null) vs = vs.join('\n').trim();
	if (fs !== null) fs = fs.join('\n').trim();
	if (gs !== null) gs = gs.join('\n').trim();

	// Load shaders from name if name specified without any source code.
	if (vs !== null && vs.length === 0)
	{
		vs = Shader.get(vsName);
		if (vs === null) throw new Error('Vertex shader not found: ' + vsName);
	}
	else if (vs === null || vs.length === 0)
		vs = null;

	if (fs !== null && fs.length === 0)
	{
		fs = Shader.get(fsName);
		if (fs === null) throw new Error('Fragment shader not found: ' + fsName);
	}
	else if (fs === null || fs.length === 0)
		fs = null;

	if (gs !== null && gs.length === 0)
	{
		gs = Shader.get(gsName);
		if (gs === null) throw new Error('Geometry shader not found: ' + gsName);
	}
	else if (gs === null || gs.length === 0)
		gs = null;

	// Load default if none specified.
	if (vs === null) vs = Shader.get('def-vert');
	if (fs === null) fs = Shader.get('def-frag');

	// Compile source if GLSL source specified.
	if (vs !== null && typeof(vs) === 'string')
		vs = new Shader (vsName, Shader.Type.VERTEX, vs);

	if (fs !== null && typeof(fs) === 'string')
		fs = new Shader (fsName, Shader.Type.FRAGMENT, fs);

	if (gs !== null && typeof(gs) === 'string')
		gs = new Shader (gsName, Shader.Type.GEOMETRY, gs);

	// Attach programs and link.
	if (vs !== null) pgm.attach(vs);
	if (fs !== null) pgm.attach(fs);
	if (gs !== null) pgm.attach(gs);

	return pgm.link();
};

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
