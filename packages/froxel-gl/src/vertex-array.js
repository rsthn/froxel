
import WebGLCanvas from './webgl-canvas.js';

export default VertexArray;

/**
 * Vertex Array Object (VAO) is a data structure that stores information about an associated element buffer, one or more vertex attribute
 * pointers, and also one or more vertex buffers.
 * @param {WebGLCanvas} gl
 */
function VertexArray (gl)
{
	/**
	 * Reference to the WebGLCanvas.
	 * @readonly @type {WebGLCanvas}
	 */
	this.gl = gl;

	/**
	 * Vertex array object resource.
	 * @type {WebGLVertexArrayObject}
	 */
	this.vertexArray = gl.genVertexArray();
};

/**
 * Binds the vertex array object to the GPU.
 * @returns {VertexArray}
 */
VertexArray.prototype.bindVertexArray = function()
{
	if (this.gl.state.vertexArray === this)
		return this;

	this.gl.bindVertexArray(this.vertexArray);
	this.gl.state.vertexArray = this;
	return this;
};

/**
 * Unbinds the vertex array object from the GPU.
 * @returns {VertexArray}
 */
VertexArray.prototype.unbindVertexArray = function()
{
	this.gl.bindVertexArray(null);
	this.gl.state.vertexArray = null;
	return this;
};
