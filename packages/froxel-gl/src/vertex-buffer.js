
import WebGLCanvas from './webgl-canvas.js';
import Buffer from './buffer.js';

export default class VertexBuffer extends Buffer
{
	/**
	 * Creates a VertexBuffer linked to the ARRAY_BUFFER target.
	 * @param {WebGLCanvas} gl
	 * @param {number} usage
	 */
	 constructor (gl, usage)
	 {
		 super (gl, gl.ARRAY_BUFFER, usage);
	 }
};
