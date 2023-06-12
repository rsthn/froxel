
import { Mat4 } from 'froxel-math';

/**
 * Sets up an orthographic 2D projection matrix.
 * @param {Mat4} outputMatrix - Output to store the projection matrix.
 * @param {number} left - The left coordinate of the view volume.
 * @param {number} right - The right coordinate of the view volume.
 * @param {number} top - The top coordinate of the view volume.
 * @param {number} bottom - The bottom coordinate of the view volume.
 */
export function setOrtho2D (outputMatrix, left, right, top, bottom)
{
	outputMatrix.data[0] = 2.0 / (right - left);
	outputMatrix.data[1] = 0.0;
	outputMatrix.data[2] = 0.0;
	outputMatrix.data[3] = 0.0;

	outputMatrix.data[4] = 0.0;
	outputMatrix.data[5] = 2.0 / (top - bottom);
	outputMatrix.data[6] = 0.0;
	outputMatrix.data[7] = 0.0;

	outputMatrix.data[8] = 0.0;
	outputMatrix.data[9] = 0.0;
	outputMatrix.data[10] = -1.0;
	outputMatrix.data[11] = 0.0;

	outputMatrix.data[12] = -(right + left) / (right - left);
	outputMatrix.data[13] = -(top + bottom) / (top - bottom);
	outputMatrix.data[14] = 0.0;
	outputMatrix.data[15] = 1.0;
}

/**
 * Sets up an orthographic 3D projection matrix.
 * @param {Mat4} outputMatrix - Output to store the projection matrix.
 * @param {number} left - The left coordinate of the view volume.
 * @param {number} right - The right coordinate of the view volume.
 * @param {number} top - The top coordinate of the view volume.
 * @param {number} bottom - The bottom coordinate of the view volume.
 * @param {number} near - The near clipping plane distance.
 * @param {number} far - The far clipping plane distance.
 */
export function setOrtho3D (outputMatrix, left, right, top, bottom, near, far)
{
	outputMatrix.data[0] = 2.0 / (right - left);
	outputMatrix.data[1] = 0.0;
	outputMatrix.data[2] = 0.0;
	outputMatrix.data[3] = 0.0;

	outputMatrix.data[4] = 0.0;
	outputMatrix.data[5] = 2.0 / (top - bottom);
	outputMatrix.data[6] = 0.0;
	outputMatrix.data[7] = 0.0;

	outputMatrix.data[8] = 0.0;
	outputMatrix.data[9] = 0.0;
	outputMatrix.data[10] = -2.0 / (far - near);
	outputMatrix.data[11] = 0.0;

	outputMatrix.data[12] = -(right + left) / (right - left);
	outputMatrix.data[13] = -(top + bottom) / (top - bottom);
	outputMatrix.data[14] = -(far + near) / (far - near);
	outputMatrix.data[15] = 1.0;
}

/**
 * Sets up a perspective projection matrix.
 * @param {Mat4} outputMatrix - Output to store the projection matrix.
 * @param {number} left - The left coordinate of the frustum at the near clipping plane.
 * @param {number} right - The right coordinate of the frustum at the near clipping plane.
 * @param {number} bottom - The bottom coordinate of the frustum at the near clipping plane.
 * @param {number} top - The top coordinate of the frustum at the near clipping plane.
 * @param {number} near - The distance to the near clipping plane.
 * @param {number} far - The distance to the far clipping plane.
 */
export function setPerspective (outputMatrix, left, right, bottom, top, near, far)
{
	outputMatrix.data[0] = (2.0 * near) / (right - left);
	outputMatrix.data[1] = 0.0;
	outputMatrix.data[2] = 0.0;
	outputMatrix.data[3] = 0.0;

	outputMatrix.data[4] = 0.0;
	outputMatrix.data[5] = (2.0 * near) / (top - bottom);
	outputMatrix.data[6] = 0.0;
	outputMatrix.data[7] = 0.0;

	outputMatrix.data[8] = (right + left) / (right - left);
	outputMatrix.data[9] = (top + bottom) / (top - bottom);
	outputMatrix.data[10] = -(far + near) / (far - near);
	outputMatrix.data[11] = -1.0;

	outputMatrix.data[12] = 0.0;
	outputMatrix.data[13] = 0.0;
	outputMatrix.data[14] = (-2.0 * far * near) / (far - near);
	outputMatrix.data[15] = 0.0;
}
