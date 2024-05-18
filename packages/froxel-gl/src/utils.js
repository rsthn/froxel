
import { Mat4 } from 'froxel-math';

/**
 * Sets up a left-handed orthographic 3D projection matrix.
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
	outputMatrix.data[10] = 1.0 / (far - near);
	outputMatrix.data[11] = 0.0;

	outputMatrix.data[12] = -(right + left) / (right - left);
	outputMatrix.data[13] = -(top + bottom) / (top - bottom);
	outputMatrix.data[14] = -near / (far - near);
	outputMatrix.data[15] = 1.0;
}

/**
 * Sets up a left-handed perspective projection matrix.
 * @param {Mat4} outputMatrix - Output to store the projection matrix.
 */
export function setPerspective (outputMatrix, fieldOfView, aspectRatio, zNear, zFar)
{
	fieldOfView = Math.PI*fieldOfView/180;
	const tan_vfov = Math.tan(fieldOfView/2.0);

	outputMatrix.data[0] = 1.0 / tan_vfov;
	outputMatrix.data[1] = 0.0;
	outputMatrix.data[2] = 0.0;
	outputMatrix.data[3] = 0.0;

	outputMatrix.data[4] = 0.0;
	outputMatrix.data[5] = aspectRatio / tan_vfov;
	outputMatrix.data[6] = 0.0;
	outputMatrix.data[7] = 0.0;

	outputMatrix.data[8] = 0.0;
	outputMatrix.data[9] = 0.0;
	outputMatrix.data[10] = zFar / (zFar-zNear);
	outputMatrix.data[11] = 1.0;

	outputMatrix.data[12] = 0.0;
	outputMatrix.data[13] = 0.0;
	outputMatrix.data[14] = -zFar*zNear / (zFar-zNear);
	outputMatrix.data[15] = 0.0;
}
