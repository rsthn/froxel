
import WebGLCanvas from './webgl-canvas.js';
import UniformBlockBuffer from './uniform-block-buffer.js';

export default ShaderProgram;

/**
 * Creates a WebGL GLSL Shader Program.
 * @param {WebGLCanvas} gl
 * @param {string} vertexShaderSource
 * @param {string} fragmentShaderSource
 */
function ShaderProgram (gl, vertexShaderSource, fragmentShaderSource)
{
	/**
	 * Reference to the WebGLCanvas.
	 * @readonly @type {WebGLCanvas}
	 */
	this.gl = gl;

	/**
	 * Vertex shader resource object.
	 * @readonly @type {WebGLShader}
	 */
	this.vertexShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(this.vertexShader, vertexShaderSource);
	gl.compileShader(this.vertexShader);

	/**
	 * Fragment shader resource object.
	 * @readonly @type {WebGLShader}
	 */
	this.fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(this.fragmentShader, fragmentShaderSource);
	gl.compileShader(this.fragmentShader);

	/**
	 * Shader program resource object.
	 * @readonly @type {WebGLProgram}
	 */
	this.program = gl.createProgram();
	gl.attachShader(this.program, this.vertexShader);
	gl.attachShader(this.program, this.fragmentShader);
};

/**
 * Links the program and throws an error if there was any problem.
 * @throws {Error}
 * @returns {ShaderProgram}
 */
ShaderProgram.prototype.linkProgram = function()
{
	for (let attribName in ShaderProgram.attribLocations) {
		this.gl.bindAttribLocation(this.program, ShaderProgram.attribLocations[attribName], attribName);
	}

	this.gl.linkProgram (this.program);
	if (this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS))
	{
		this.gl.deleteShader(this.vertexShader)
		this.gl.deleteShader(this.fragmentShader)
		return this;
	}

	let vertexError = this.gl.getShaderInfoLog(this.vertexShader);
	let fragmentError = this.gl.getShaderInfoLog(this.fragmentShader);

	throw new Error(
		vertexError ? ('• Vertex Shader:\n' + vertexError + '\n') : '' +
		fragmentError ? ('• Fragment Shader:\n' + fragmentError) : ''
	);
};

/**
 * Binds an attribute location to the shader program.
 * @param {number} attribLocation
 * @param {string} attribName
 * @returns {ShaderProgram}
 */
ShaderProgram.prototype.bindAttribLocation = function (attribLocation, attribName)
{
	this.gl.bindAttribLocation(this.program, attribLocation, attribName);
	return this;
};

/**
 * Map of global attribute locations.
 * @readonly @private
 * @type {Map<string, number>}
 */
ShaderProgram.attribLocations = new Map();

/**
 * Binds a global attribute location to be applied to any newly created shader program.
 * @param {number} attribLocation
 * @param {string} attribName
 * @returns {ShaderProgram}
 */
ShaderProgram.bindAttribLocation = function (attribLocation, attribName)
{
	this.attribLocations[attribName] = attribLocation;
	return this;
};

/**
 * Binds several global attribute locations to be applied to any newly created shader program.
 * @param {Map<string, number>} attribs
 * @returns {ShaderProgram}
 */
ShaderProgram.bindAttribLocations = function (attribs)
{
	for (let attribName in attribs) {
		this.attribLocations[attribName] = attribs[attribName];
	}

	return this;
};

/**
 * Activates the shader program for subsequent drawing operations.
 */
ShaderProgram.prototype.useProgram = function ()
{
	this.gl.useProgram(this.program);
};

/**
 * Returns the location of a uniform variable.
 * @param {string} uniformName
 * @returns {WebGLUniformLocation}
 */
ShaderProgram.prototype.getUniformLocation = function (uniformName)
{
	// TODO Add cache here.
	return this.gl.getUniformLocation(this.program, uniformName);
};

/**
 * Returns the location of one or more uniform variables.
 * @param {Array<string>} uniformNames
 * @returns { [key: string]: WebGLUniformLocation }
 */
ShaderProgram.prototype.getUniformLocations = function (uniformNames)
{
	let uniforms = { };

	for (let uniformName of uniformNames) {
		uniforms[uniformName] = this.getUniformLocation(uniformName);
	}

	return uniforms;
};

/**
 * Returns the index and offset of one or more uniform variables. Useful when using uniform block objects (UBO).
 * @param {Array<string>} uniformNames
 * @returns { [key: string]: { index: number, offset: number } }
 */
ShaderProgram.prototype.getUniformOffsets = function (uniformNames)
{
	let uniforms = { };

	let indices = this.gl.getUniformIndices(this.program, uniformNames);
	let offsets = this.gl.getActiveUniforms(this.program, indices, this.gl.UNIFORM_OFFSET);

	for (let i in uniformNames) {
		uniforms[uniformNames[i]] = { index: indices[i], offset: offsets[i] };
	}

	return uniforms;
};

/**
 * Returns the index of a uniform block.
 * @param {string} blockName
 * @returns {number}
 */
ShaderProgram.prototype.getUniformBlockIndex = function (blockName)
{
	// TODO Add cache here?
	return this.gl.getUniformBlockIndex(this.program, blockName);
};

/**
 * Returns the indices of one or more uniform blocks.
 * @param {Array<string>} blockNames
 * @returns { [key: string]: number }
 */
ShaderProgram.prototype.getUniformBlockIndices = function (blockNames)
{
	let indices = { };

	for (let blockName of blockNames) {
		indices[blockName] = this.getUniformBlockIndex(blockName);
	}

	return indices;
};

/**
 * Assigns the binding index of a uniform block buffer to a block identifier in the program.
 * @param {number|string} blockIdentifier
 * @param {number|UniformBlockBuffer} bindingIndex
 * @returns {ShaderProgram}
 */
ShaderProgram.prototype.uniformBlockBinding = function (blockIdentifier, bindingIndex)
{
	if (typeof(blockIdentifier) === 'string')
		blockIdentifier = this.getUniformBlockIndex(blockIdentifier);

	if (bindingIndex instanceof UniformBlockBuffer)
		bindingIndex = bindingIndex.bindingIndex;

	return this.gl.uniformBlockBinding (this.program, blockIdentifier, bindingIndex);
};
