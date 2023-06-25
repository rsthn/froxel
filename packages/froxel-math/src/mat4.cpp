
#include <cstring>
#include <cstdlib>
#include <cmath>
#include <wasm>

#include "mat4.h"

static mat4 tmp { 0 };
static mat4 tmp2 { 0 };

export mat4 *mat4_alloc () {
	return (mat4*)malloc(sizeof(mat4));
}

export mat4 *mat4_materialize (void *addr) {
	return (mat4*)addr;
}

export void mat4_dtor (mat4 *self) {
	free (self);
}

export mat4 *mat4_clone (mat4 *self) {
	mat4 *m = mat4_alloc();
	mat4_set1m(m, self);
	return m;
}

export void mat4_fill1f (mat4 *self, double value) {
	for (int i = 0; i < sizeof(mat4::data)/sizeof(mat4::data[0]); i++)
		self->data[i] = value;
}

export void mat4_set1f (mat4 *self, double value) {
	for (int i = 0; i < sizeof(mat4::data)/sizeof(mat4::data[0]); i += 4+1) self->data[i] = value;
}

export void mat4_set1m (mat4 *self, mat4 *m) {
	memcpy(self->data, m->data, sizeof(mat4::data));
}

export void mat4_col1i4f (mat4 *self, int col, double a0, double a1, double a2, double a3)
{
	if (col < 0 || col > 3)
		return;

	float *p = &self->data[col*4];
	*p++ = a0;
	*p++ = a1;
	*p++ = a2;
	*p = a3;
}

export void mat4_row1i4f (mat4 *self, int row, double a0, double a1, double a2, double a3)
{
	if (row < 0 || row > 3)
		return;

	float *p = &self->data[row];
	*p = a0; p += 4;
	*p = a1; p += 4;
	*p = a2; p += 4;
	*p = a3;
}

export void mat4_identity (mat4 *self) {
	mat4_fill1f(self, 0);
	mat4_set1f(self, 1.0);
}

export void mat4_scale1f (mat4 *self, double value) {
	for (int i = 0; i < sizeof(mat4::data)/sizeof(mat4::data[0]); i++) 
		self->data[i] *= value;
}

export void mat4_transpose (mat4 *self)
{
	mat4_fill1f(&tmp, 0);

	float *data = tmp.data;

	for (int j = 0; j < 4; j++)
	for (int i = 0; i < 4; i++)
		data[j*4+i] = self->data[i*4+j];

	mat4_set1m(self, &tmp);
}

export float mat4_det (mat4 *self)
{
	float *data = self->data;

	return	data[0] * (
				data[5] * (data[10] * data[15] - data[14] * data[11])
				- data[9] * (data[6] * data[15] - data[14] * data[7])
				+ data[13] * (data[6] * data[11] - data[10] * data[7])
			)
			- data[4] * (
				data[1] * (data[10] * data[15] - data[14] * data[11])
				- data[9] * (data[2] * data[15] - data[14] * data[3])
		     	+ data[13] * (data[2] * data[11] - data[10] * data[3])
			)
			+ data[8] * (
				data[1] * (data[6] * data[15] - data[14] * data[7])
				- data[5] * (data[2] * data[15] - data[14] * data[3])
				+ data[13] * (data[2] * data[7] - data[6] * data[3])
			)
			- data[12] * (
				data[1] * (data[6] * data[11] - data[10] * data[7])
				- data[5] * (data[2] * data[11] - data[10] * data[3])
				+ data[9] * (data[2] * data[7] - data[6] * data[3])
			);

}

export void mat4_append1m (mat4 *self, mat4 *m)
{
	mat4_set1m(&tmp, self);

	float *a = tmp.data;
	float *b = m->data;

/* 	A					B
	0	4	8	12		0	4	8	12
	1	5	9	13		1	5	9	13
	2	6	10	14		2	6	10	14
	3	7	11	15		3	7	11	15
 */
	self->data[0] = a[0]*b[0] + a[4]*b[1] + a[8]*b[2] + a[12]*b[3];
	self->data[1] = a[1]*b[0] + a[5]*b[1] + a[9]*b[2] + a[13]*b[3];
	self->data[2] = a[2]*b[0] + a[6]*b[1] + a[10]*b[2] + a[14]*b[3];
	self->data[3] = a[3]*b[0] + a[7]*b[1] + a[11]*b[2] + a[15]*b[3];

	self->data[4] = a[0]*b[4] + a[4]*b[5] + a[8]*b[6] + a[12]*b[7];
	self->data[5] = a[1]*b[4] + a[5]*b[5] + a[9]*b[6] + a[13]*b[7];
	self->data[6] = a[2]*b[4] + a[6]*b[5] + a[10]*b[6] + a[14]*b[7];
	self->data[7] = a[3]*b[4] + a[7]*b[5] + a[11]*b[6] + a[15]*b[7];

	self->data[8] = a[0]*b[8] + a[4]*b[9] + a[8]*b[10] + a[12]*b[11];
	self->data[9] = a[1]*b[8] + a[5]*b[9] + a[9]*b[10] + a[13]*b[11];
	self->data[10] = a[2]*b[8] + a[6]*b[9] + a[10]*b[10] + a[14]*b[11];
	self->data[11] = a[3]*b[8] + a[7]*b[9] + a[11]*b[10] + a[15]*b[11];

	self->data[12] = a[0]*b[12] + a[4]*b[13] + a[8]*b[14] + a[12]*b[15];
	self->data[13] = a[1]*b[12] + a[5]*b[13] + a[9]*b[14] + a[13]*b[15];
	self->data[14] = a[2]*b[12] + a[6]*b[13] + a[10]*b[14] + a[14]*b[15];
	self->data[15] = a[3]*b[12] + a[7]*b[13] + a[11]*b[14] + a[15]*b[15];
}

export void mat4_translate3f (mat4 *self, double dx, double dy, double dz)
{
	if (!dx && !dy && !dz)
		return;

	mat4_set1m(&tmp, self);
	float *a = tmp.data;

	self->data[12] = dx*a[0] + dy*a[4] + dz*a[8] + a[12];
	self->data[13] = dx*a[1] + dy*a[5] + dz*a[9] + a[13];
	self->data[14] = dx*a[2] + dy*a[6] + dz*a[10] + a[14];
	self->data[15] = dx*a[3] + dy*a[7] + dz*a[11] + a[15];
}

export void mat4_rotateX (mat4 *self, double angle)
{
    if (!angle) return;

    mat4_identity(&tmp2);

    float cost = std::cos(angle);
    float sint = std::sin(angle);

    tmp2.data[5] = cost;
    tmp2.data[6] = sint;
    tmp2.data[9] = -sint;
    tmp2.data[10] = cost;

    mat4_append1m(self, &tmp2);
}

export void mat4_rotateY (mat4 *self, double angle)
{
    if (!angle) return;

    mat4_identity(&tmp2);

    float cost = std::cos(angle);
    float sint = std::sin(angle);

    tmp2.data[0] = cost;
    tmp2.data[2] = -sint;
    tmp2.data[8] = sint;
    tmp2.data[10] = cost;

    mat4_append1m(self, &tmp2);
}

export void mat4_rotateZ (mat4 *self, double angle)
{
    if (!angle) return;

    mat4_identity(&tmp2);

    float cost = std::cos(angle);
    float sint = std::sin(angle);

    tmp2.data[0] = cost;
    tmp2.data[1] = sint;
    tmp2.data[4] = -sint;
    tmp2.data[5] = cost;

    mat4_append1m(self, &tmp2);
}

export void mat4_scale3f (mat4 *self, double sx, double sy, double sz)
{
    if (sx == 1.0 && sy == 1.0 && sz == 1.0)
        return;

    mat4_identity(&tmp2);

    tmp2.data[0] = sx;
    tmp2.data[5] = sy;
    tmp2.data[10] = sz;

	mat4_append1m(self, &tmp2);
}
