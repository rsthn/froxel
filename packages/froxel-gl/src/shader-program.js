
import WebGLCanvas from './webgl-canvas.js';


export default ShaderProgram;

/**
 * Creates a WebGL GLSL Shader Program.
 * @param {WebGLCanvas} wgl
 * @param {string} vertexShaderSource
 * @param {string} fragmentShaderSource
 */
function ShaderProgram (wgl=null, vertexShaderSource, fragmentShaderSource)
{
	/**
	 * Reference to the WebGLCanvas.
	 * @readonly @type {WebGLCanvas}
	 */
	this.wgl = wgl;

	/**
	 * Vertex shader resource object.
	 * @readonly @type {WebGLShader}
	 */
	this.vertexShader = wgl.gl.createShader(wgl.gl.VERTEX_SHADER);
	wgl.gl.shaderSource(this.vertexShader, vertexShaderSource);
	wgl.gl.compileShader(this.vertexShader);

	/**
	 * Fragment shader resource object.
	 * @readonly @type {WebGLShader}
	 */
	this.fragmentShader = wgl.gl.createShader(wgl.gl.FRAGMENT_SHADER);
	wgl.gl.shaderSource(this.fragmentShader, fragmentShaderSource);
	wgl.gl.compileShader(this.fragmentShader);

	/**
	 * Shader program resource object.
	 * @readonly @type {WebGLProgram}
	 */
	this.program = wgl.gl.createProgram();
	wgl.gl.attachShader(this.program, this.vertexShader);
	wgl.gl.attachShader(this.program, this.fragmentShader);
};


/**
 * Links the program and throws an error if there was any problem.
 * @throws {Error}
 */
ShaderProgram.prototype.linkProgram = function()
{
	for (let attribLocation in ShaderProgram.attribLocations) {
		this.wgl.gl.bindAttribLocation(this.program, attribLocation, ShaderProgram.attribLocations[attribLocation]);
	}

	this.wgl.gl.linkProgram (this.program);
	if (this.wgl.gl.getProgramParameter(this.program, this.wgl.gl.LINK_STATUS))
	{
		this.wgl.gl.deleteShader(this.vertexShader)
		this.wgl.gl.deleteShader(this.fragmentShader)
		return;
	}

	let vertexError = this.wgl.gl.getShaderInfoLog(this.vertexShader);
	let fragmentError = this.wgl.gl.getShaderInfoLog(this.fragmentShader);

	throw new Error(
		vertexError ? ('• Vertex Shader:\n' + vertexError + '\n') : '' +
		fragmentError ? ('• Fragment Shader:\n' + fragmentError) : ''
	);
};


/**
 * Binds an attribute location to the shader program.
 * @param {number} attribLocation
 * @param {string} attribName
 */
ShaderProgram.prototype.bindAttribLocation = function (attribLocation, attribName)
{
	this.wgl.gl.bindAttribLocation(this.program, attribLocation, attribName);
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
 */
ShaderProgram.bindAttribLocation = function (attribLocation, attribName)
{
	this.attribLocations[attribName] = attribLocation;
};


/**
 * Binds several global attribute locations to be applied to any newly created shader program.
 * @param {Map<string, number>} attribs
 */
ShaderProgram.bindAttribLocations = function (attribs)
{
	for (let attribName in attribs) {
		this.attribLocations[attribName] = attribs[attribName];
	}
};


/**
 * Returns the location of a uniform variable.
 * @param {string} uniformName
 * @returns {WebGLUniformLocation}
 */
ShaderProgram.prototype.getUniformLocation = function (uniformName)
{
	// TODO Add cache here.
	return this.wgl.gl.getUniformLocation(this.program, uniformName);
};


/**
 * Returns the location of one or more uniform variables.
 * @param {Array<string>} uniformNames
 * @returns {Array<WebGLUniformLocation>}
 */
ShaderProgram.prototype.getUniformLocations = function (uniformNames)
{
	let uniforms = [];

	for (let uniformName of uniformNames) {
		uniforms.push(this.getUniformLocation(uniformName));
	}

	return uniforms;
};


/**
 * Activates the shader program for subsequent drawing operations.
 */
ShaderProgram.prototype.useProgram = function ()
{
	this.wgl.gl.useProgram(this.program);
};
