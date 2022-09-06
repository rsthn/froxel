
import WebGLCanvas from './webgl-canvas.js';

export default VertexArrayObject;

/**
 * Creates a Vertex Array Object (VAO).
 * @param {WebGLCanvas} gl
 */
function VertexArrayObject (gl)
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
	this.vertexArray = gl.createVertexArray();
};

/**
 * Binds the vertex array object to the GPU.
 */
VertexArrayObject.prototype.bindVertexArray = function()
{
	this.gl.bindVertexArray(this.vertexArray);
};

/**
 * Unbinds the vertex array object from the GPU.
 */
VertexArrayObject.prototype.unbindVertexArray = function()
{
	this.gl.bindVertexArray(null);
};
