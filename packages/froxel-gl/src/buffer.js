
import WebGLCanvas from './webgl-canvas.js';

/**
 * Represents a WebGL buffer.
 */
export default class Buffer
{
	/**
	 * Reference to the WebGLCanvas.
	 * @readonly @type {WebGLCanvas}
	 */
	gl;

	/**
	 * Buffer target.
	 * @type {number}
	 */
	target;

	/**
	 * Buffer usage mode.
	 * @type {number}
	 */
	usage;

	/**
	 * Buffer object resource.
	 * @type {WebGLBuffer}
	 */
	buffer;
 
	/**
	 * Creates a WebGL buffer.
	 * @param {WebGLCanvas} gl
	 * @param {number} target
	 * @param {number} usage
	 */
	constructor (gl, target, usage)
	{
		this.gl = gl;
		this.target = target;
		this.usage = usage;
		this.buffer = gl.createBuffer();
	}

	/**
	 * Binds the buffer to its WebGL target.
	 * @returns {Buffer}
	 */
	bindBuffer()
	{
		this.gl.bindBuffer(this.target, this.buffer);
		return this;
	}

	/**
	 * Unbinds the buffer from its GPU buffer target.
	 * @returns {Buffer}
	 */
	unbindBuffer()
	{
		this.gl.bindBuffer(this.target, null);
		return this;
	}

	/**
	 * Initializes and creates the buffer object's data store.
	 * @param {ArrayBufferView} srcData
	 * @param {number} srcOffset?
	 * @returns {Buffer}
	 */
	bufferData (srcData, srcOffset=0)
	{
		this.bindBuffer();
		this.gl.bufferData(this.target, srcData, this.usage, srcOffset);
		return this;
	}

	/**
	 * Allocates the specified number of bytes for the buffer.
	 * @param {number} numBytes
	 * @returns {Buffer}
	 */
	allocate (numBytes)
	{
		this.bindBuffer();
		this.gl.bufferData(this.target, numBytes, this.usage);
		return this;
	}

	/**
	 * Updates a subset of the buffer object's data store. 
	 * @param {number} dstByteOffset
	 * @param {ArrayBufferView} srcData
	 * @param {number} srcOffset?
	 * @param {number} length?
	 * @returns {Buffer}
	 */
	bufferSubData (dstByteOffset, srcData, srcOffset=0, length=0)
	{
		this.bindBuffer();
		this.gl.bufferSubData(this.target, dstByteOffset, srcData, srcOffset, length ? length : srcData.length);
		return this;
	}

	/**
	 * Deletes the buffer.
	 */
	deleteBuffer()
	{
		this.gl.deleteBuffer(this.buffer);
	}
};
