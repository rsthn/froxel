
import WebGLCanvas from './webgl-canvas.js';
import Buffer from './buffer.js';

export default class ElementBuffer extends Buffer
{
	/**
	 * Creates a ElementBuffer linked to the ELEMENT_ARRAY_BUFFER target.
	 * @param {WebGLCanvas} gl
	 * @param {number} usage
	 */
	constructor (gl, usage)
	{
		super (gl, gl.ELEMENT_ARRAY_BUFFER, usage);
	}
};
