
import WebGLCanvas from './webgl-canvas.js';


export default VertexArray;

/**
 * Creates a Vertex Array Object (VAO).
 * @param {WebGLCanvas} wgl
 */
function VertexArray (wgl=null)
{
	/**
	 * Reference to the WebGLCanvas.
	 * @readonly @type {WebGLCanvas}
	 */
	this.wgl = wgl;

	/**
	 * Vertex array object resource.
	 * @type {WebGLVertexArrayObject}
	 */
	this.vertexArray = wgl.gl.createVertexArray();
};


/**
 * Binds the vertex array object to the GPU.
 */
VertexArray.prototype.bindVertexArray = function()
{
	this.wgl.gl.bindVertexArray(this.vertexArray);
};


/**
 * Unbinds the vertex array object from the GPU.
 */
VertexArray.prototype.unbindVertexArray = function()
{
	this.wgl.gl.bindVertexArray(null);
};
