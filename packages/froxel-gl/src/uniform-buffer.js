
import WebGLCanvas from './webgl-canvas.js';
import Buffer from './buffer.js';

export default class UniformBuffer extends Buffer
{
	/**
	 * Uniform block binding index. Set using `bindBufferBase`.
	 * @readonly @type {number}
	 */
	bindingIndex;

	/**
	 * Creates a buffer linked to the UNIFORM_BUFFER target.
	 * @param {WebGLCanvas} gl
	 * @param {number} usage
	 */
	constructor (gl, usage)
	{
		super (gl, gl.UNIFORM_BUFFER, usage);
	}

	/**
	 * Binds the buffer to the UNIFORM_BUFFER binding point at a given index. 
	 * @param {number} index
	 * @returns {UniformBuffer}
	 */
	bindBufferBase (index)
	{
		 this.gl.bindBufferBase(this.target, this.bindingIndex = index, this.buffer);
		 return this;
	}
};
