
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
	 * @readonly @type {number}
	 */
	target;

	/**
	 * Buffer usage mode.
	 * @readonly @type {number}
	 */
	usage;

	/**
	 * Buffer object resource.
	 * @readonly @type {WebGLBuffer}
	 */
	buffer;

	/**
	 * Buffer size in bytes.
	 * @readonly @type {number}
	 */
	byteLength;

	/**
	 * Source buffer, used for automatic upload of data to the GPU memory when `update` is called.
	 * @readonly @type {Uint8Array}
	 */
	source;

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

		this.buffer = gl.genBuffer();
		this.byteLength = null;

		this.source = null;
	}

	/**
	 * Binds the buffer to its respective WebGL target.
	 * @returns {Buffer}
	 */
	bindBuffer()
	{
		if (this.gl.state.buffer[this.target] === this)
			return this;

		this.gl.bindBuffer(this.target, this.buffer);
		this.gl.state.buffer[this.target] = this;
		return this;
	}

	/**
	 * Unbinds the buffer from its GPU buffer target.
	 * @returns {Buffer}
	 */
	unbindBuffer()
	{
		this.gl.bindBuffer(this.target, null);
		this.gl.state.buffer[this.target] = null;
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
		this.byteLength = numBytes;
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
		this.byteLength = this.gl.getBufferParameter(this.target, this.gl.BUFFER_SIZE);
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

	/**
	 * Sets the buffer source. When not `null`, calling `update` will automatically upload the source buffer's data to the GPU.
	 * @param {Uint8Array} buffer
	 * @returns {Buffer}
	 */
	bufferSource (buffer)
	{
		if (this.byteLength === null)
			this.bufferData(buffer);

		this.source = buffer;
		return this;
	}

	/**
	 * Updates the buffer in the GPU with data from the source buffer (only when not `null`).
	 * @param {number} byteOffset
	 * @param {number} byteLength
	 * @returns {Buffer}
	 */
	update (byteOffset=0, byteLength=0)
	{
		if (this.source !== null)
			this.bufferSubData(byteOffset, this.source, byteOffset, byteLength);

		return this;
	}
};
