
import WebGLCanvas from './webgl-canvas.js';

export default VertexArray;

/**
 * Creates a Vertex Array Object (VAO).
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
 */
VertexArray.prototype.bindVertexArray = function()
{
	this.gl.bindVertexArray(this.vertexArray);
};

/**
 * Unbinds the vertex array object from the GPU.
 */
VertexArray.prototype.unbindVertexArray = function()
{
	this.gl.bindVertexArray(null);
};
