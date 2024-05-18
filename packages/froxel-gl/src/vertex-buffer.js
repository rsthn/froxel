
import WebGLCanvas from './webgl-canvas.js';
import Buffer from './buffer.js';

/**
 * @typedef {'BYTE'|'UNSIGNED_BYTE'|'SHORT'|'UNSIGNED_SHORT'|'FLOAT'} WebGLAttribType
 */

export default class VertexBuffer extends Buffer
{
	/**
	 * Stride of the buffer.
	 * @readonly @type {number}
	 */
	stride;

	/**
	 * Creates a buffer for the ARRAY_BUFFER target.
	 * @param {WebGLCanvas} gl
	 * @param {number} usage
	 */
	constructor (gl, usage)
	{
		super (gl, gl.ARRAY_BUFFER, usage);
	}

	/**
	 * Sets the stride of the vertex buffer.
	 * @param {number} stride
	 * @returns {VertexBuffer}
	 */
	bufferStride (stride)
	{
		this.stride = stride;
		return this;
	}

	/**
	 * Configures a vertex attribute pointer.
	 * @param {number} attribLocation - Location of the attribute within the shader program.
	 * @param {number} numElems - Number of elements (of `dataType`) for this attribute.
	 * @param {WebGLAttribType} dataType - Type of the attribute.
	 * @param {number} byteOffset - Offset within the buffer to the first value.
	 * @returns {VertexBuffer}
	 */
	attribPointer (attribLocation, numElems, dataType, byteOffset=0)
	{
		this.bindBuffer();
		this.gl.vertexAttribPointer(attribLocation, numElems, this.gl[dataType], false, this.stride, byteOffset);
		return this;
	}

	/**
	 * Enables the attribute vertex array at the specified location.
	 * @param {number} attribLocation 
	 * @returns {VertexBuffer}
	 */
	enableAttrib (attribLocation)
	{
		this.bindBuffer();
		this.gl.enableVertexAttribArray(attribLocation);
		return this;
	}

	/**
	 * Disables the attribute vertex array at the specified location.
	 * @param {number} attribLocation
	 * @returns {VertexBuffer}
	 */
	disableAttrib (attribLocation)
	{
		this.bindBuffer();
		this.gl.disableVertexAttribArray(attribLocation);
		return this;
	}
};
