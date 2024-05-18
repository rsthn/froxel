
import WebGLCanvas from './webgl-canvas.js';
import UniformBuffer from './uniform-buffer.js';

/**
 * Describes a WebGL shader program.
 */
export default class ShaderProgram
{
	/**
	 * Reference to the WebGLCanvas.
	 * @readonly @type {WebGLCanvas}
	 */
	gl;

	/**
	 * Vertex shader resource object.
	 * @private @type {WebGLShader}
	 */
	vertexShader;

	/**
	 * Fragment shader resource object.
	 * @private @type {WebGLShader}
	 */
	fragmentShader;

	/**
	 * Fragment shader resource object.
	 * @private @type {WebGLShader}
	 */
	geometryShader;

	/**
	 * Shader program resource object.
	 * @readonly @type {WebGLProgram}
	 */
	program;

	/**
	 * Uniform and uniform block cache.
	 * @private @type {object}
	 */
	cache;

	/**
	 * Creates a WebGL GLSL Shader Program.
	 * @param {WebGLCanvas} gl
	 * @param {string} vertexShaderSource
	 * @param {string} fragmentShaderSource
	 * @param {string} geometryShaderSource?
	 */
	constructor (gl, vertexShaderSource, fragmentShaderSource, geometryShaderSource=null)
	{
		this.gl = gl;

		/* *** */
		if (!vertexShaderSource.startsWith('#version'))
			vertexShaderSource = '#version 300 es\nprecision highp float;\n' + vertexShaderSource;

		this.vertexShader = gl.createShader(gl.VERTEX_SHADER);
		gl.shaderSource(this.vertexShader, vertexShaderSource);
		gl.compileShader(this.vertexShader);

		/* *** */
		if (!fragmentShaderSource.startsWith('#version'))
			fragmentShaderSource = '#version 300 es\nprecision highp float;\n' + fragmentShaderSource;

		this.fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
		gl.shaderSource(this.fragmentShader, fragmentShaderSource);
		gl.compileShader(this.fragmentShader);

		/* *** */
		if (geometryShaderSource !== null)
		{
			if (!geometryShaderSource.startsWith('#version'))
				geometryShaderSource = '#version 300 es\nprecision highp float;\n' + geometryShaderSource;

			this.geometryShader = gl.createShader(gl.GEOMETRY_SHADER);
			gl.shaderSource(this.geometryShader, geometryShaderSource);
			gl.compileShader(this.geometryShader);
		}
		else
			this.geometryShader = null;

		/* *** */
		this.program = gl.createProgram();

		gl.attachShader(this.program, this.vertexShader);
		gl.attachShader(this.program, this.fragmentShader);

		if (this.geometryShader)
			gl.attachShader(this.program, this.geometryShader);

		this.cache = { u: { }, b: { }, a: { } };
		this.linkProgram();
	}

	/**
	 * Map of global attribute locations.
	 * @readonly @private
	 * @type {Map<string, number>}
	 */
	static attribLocations = new Map();

	/**
	 * Binds a global attribute location to be applied to any newly created shader program.
	 * @param {number} attribLocation
	 * @param {string} attribName
	 */
	static bindAttribLocation (attribLocation, attribName)
	{
		if (typeof attribLocation === 'string')
			throw new Error('bindAttribLocation: attribLocation should be a number');

		ShaderProgram.attribLocations[attribName] = attribLocation;
	}

	/**
	 * Binds several global attribute locations to be applied to any newly created shader program.
	 * @param {Map<string, number>} attribs
	 */
	static bindAttribLocations (attribs)
	{
		for (let attribName in attribs)
			ShaderProgram.attribLocations[attribName] = attribs[attribName];
	}

	/**
	 * Links the program and throws an error if there was any problem.
	 * @private
	 * @throws {Error}
	 * @returns {ShaderProgram}
	 */
	linkProgram()
	{
		for (let attribName in ShaderProgram.attribLocations)
			this.gl.bindAttribLocation(this.program, ShaderProgram.attribLocations[attribName], attribName);

		this.gl.linkProgram (this.program);
		if (this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS))
		{
			this.gl.deleteShader(this.vertexShader)
			this.gl.deleteShader(this.fragmentShader)

			if (this.geometryShader)
				this.gl.deleteShader(this.geometryShader);

			return this;
		}

		let vertexError = this.gl.getShaderInfoLog(this.vertexShader);
		let fragmentError = this.gl.getShaderInfoLog(this.fragmentShader);
		let geometryError = this.geometryShader ? this.gl.getShaderInfoLog(this.geometryShader) : '';

		throw new Error(
			vertexError ? ('• Vertex Shader:\n' + vertexError + '\n') : '' +
			geometryError ? ('• Geometry Shader:\n' + geometryError + '\n') : '' + 
			fragmentError ? ('• Fragment Shader:\n' + fragmentError) : ''
		);
	}

	/**
	 * Binds an attribute location to the shader program.
	 * @param {number} attribLocation
	 * @param {string} attribName
	 * @returns {ShaderProgram}
	 */
	bindAttribLocation (attribLocation, attribName)
	{
		this.gl.bindAttribLocation(this.program, attribLocation, attribName);
		return this;
	}

	/**
	 * Returns the location of an attribute.
	 * @param {string} attribName
	 * @returns {WebGLUniformLocation}
	 */
	getAttribLocation (attribName)
	{
		if (!(attribName in this.cache.u))
			this.cache.a[attribName] = this.gl.getAttribLocation(this.program, attribName);

		return this.cache.a[attribName];
	}

	/**
	 * Returns the location of one or more attributes.
	 * @param {Array<string>} attribNames
	 * @returns { [key: string]: WebGLUniformLocation }
	 */
	getAttribLocations (attribNames)
	{
		let attribs = { };

		for (let uniformName of attribNames) {
			attribs[uniformName] = this.getAttribLocation(uniformName);
		}

		return attribs;
	}

	/**
	 * Activates the shader program for subsequent drawing operations.
	 * @returns {ShaderProgram}
	 */
	useProgram()
	{
		if (this.gl.state.program === this)
			return this;

		this.gl.useProgram(this.program);
		this.gl.state.program = this;
		return this;
	}

	/**
	 * Returns the location of a uniform variable.
	 * @param {string} uniformName
	 * @returns {WebGLUniformLocation}
	 */
	getUniformLocation (uniformName)
	{
		if (!(uniformName in this.cache.u))
			this.cache.u[uniformName] = this.gl.getUniformLocation(this.program, uniformName);

		return this.cache.u[uniformName];
	}

	/**
	 * Returns the location of one or more uniform variables.
	 * @param {Array<string>} uniformNames
	 * @returns { [key: string]: WebGLUniformLocation }
	 */
	getUniformLocations (uniformNames)
	{
		let uniforms = { };

		for (let uniformName of uniformNames) {
			uniforms[uniformName] = this.getUniformLocation(uniformName);
		}

		return uniforms;
	}

	/**
	 * Returns the index and offset of one or more uniform variables. Highly useful to build an appropriate uniform buffer object (UBO) when
	 * the exact layout of the data is not known beforehand (but the uniform names are).
	 * @param {Array<string>} uniformNames
	 * @returns { [key: string]: { index: number, offset: number } }
	 */
	getUniformOffsets (uniformNames)
	{
		let uniforms = { };

		let indices = this.gl.getUniformIndices(this.program, uniformNames);
		let offsets = this.gl.getActiveUniforms(this.program, indices, this.gl.UNIFORM_OFFSET);

		for (let i in uniformNames) {
			uniforms[uniformNames[i]] = { index: indices[i], offset: offsets[i] };
		}

		return uniforms;
	}

	/**
	 * Returns the index of a uniform block.
	 * @param {string} blockName
	 * @returns {number}
	 */
	getUniformBlockIndex (blockName)
	{
		if (!(blockName in this.cache.b))
			this.cache.b[blockName] = this.gl.getUniformBlockIndex(this.program, blockName);

		return this.cache.b[blockName];
	}

	/**
	 * Returns the indices of one or more uniform blocks.
	 * @param {Array<string>} blockNames
	 * @returns { [key: string]: number }
	 */
	getUniformBlockIndices (blockNames)
	{
		let indices = { };

		for (let blockName of blockNames) {
			indices[blockName] = this.getUniformBlockIndex(blockName);
		}

		return indices;
	}

	/**
	 * Binds a uniform buffer to a uniform block in the program.
	 * @param {number|string} blockIdentifier
	 * @param {number|UniformBuffer} bindingIndex
	 * @returns {ShaderProgram}
	 */
	bindUniformBlock (blockIdentifier, bindingIndex)
	{
		if (typeof(blockIdentifier) === 'string')
			blockIdentifier = this.getUniformBlockIndex(blockIdentifier);

		if (bindingIndex instanceof UniformBuffer)
			bindingIndex = bindingIndex.bindingIndex;

		return this.gl.uniformBlockBinding (this.program, blockIdentifier, bindingIndex);
	}
};
