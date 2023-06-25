
#include <cstring>
#include <cstdlib>
#include <cmath>
#include <wasm>

#include "mat3.h"

static mat3 tmp { 0 };
static mat3 tmp2 { 0 };

export mat3 *mat3_alloc () {
	return (mat3*)malloc(sizeof(mat3));
}

export mat3 *mat3_materialize (void *addr) {
	return (mat3*)addr;
}

export void mat3_dtor (mat3 *self) {
	free (self);
}

export mat3 *mat3_clone (mat3 *self) {
	mat3 *m = mat3_alloc();
	mat3_set1m(m, self);
	return m;
}

export void mat3_fill1f (mat3 *self, double value) {
	for (int i = 0; i < sizeof(mat3::data)/sizeof(mat3::data[0]); i++)
		self->data[i] = value;
}

export void mat3_set1f (mat3 *self, double value) {
	for (int i = 0; i < sizeof(mat3::data)/sizeof(mat3::data[0]); i += 3+1) self->data[i] = value;
}

export void mat3_set1m (mat3 *self, mat3 *m) {
	memcpy(self->data, m->data, sizeof(mat3::data));
}

export void mat3_col1i3f (mat3 *self, int col, double a0, double a1, double a2)
{
	if (col < 0 || col > 2)
		return;

	float *p = &self->data[col*3];
	*p++ = a0;
	*p++ = a1;
	*p = a2;
}

export void mat3_row1i3f (mat3 *self, int row, double a0, double a1, double a2)
{
	if (row < 0 || row > 2)
		return;

	float *p = &self->data[row];
	*p = a0; p += 3;
	*p = a1; p += 3;
	*p = a2;
}

export void mat3_identity (mat3 *self) {
	mat3_fill1f(self, 0);
	mat3_set1f(self, 1.0);
}

export void mat3_scale1f (mat3 *self, double value) {
	for (int i = 0; i < sizeof(mat3::data)/sizeof(mat3::data[0]); i++) 
		self->data[i] *= value;
}

export void mat3_transpose (mat3 *self)
{
	mat3_fill1f(&tmp, 0);

	float *data = tmp.data;

	for (int j = 0; j < 3; j++)
	for (int i = 0; i < 3; i++)
		data[j*3+i] = self->data[i*3+j];

	mat3_set1m(self, &tmp);
}

export float mat3_det (mat3 *self)
{
	float *data = self->data;

	return	data[0] * (data[4]*data[8] - data[5]*data[7]) -
			data[1] * (data[3]*data[8] - data[5]*data[6]) +
			data[2] * (data[3]*data[7] - data[4]*data[6])
			;
}

export void mat3_append1m (mat3 *self, mat3 *m)
{
	mat3_set1m(&tmp, self);

	float *a = tmp.data;
	float *b = m->data;

	self->data[0] = b[0]*a[0] + b[1]*a[3] + b[2]*a[6];
	self->data[1] = b[0]*a[1] + b[1]*a[4] + b[2]*a[7];
	self->data[2] = b[0]*a[2] + b[1]*a[5] + b[2]*a[8];
	self->data[3] = b[3]*a[0] + b[4]*a[3] + b[5]*a[6];
	self->data[4] = b[3]*a[1] + b[4]*a[4] + b[5]*a[7];
	self->data[5] = b[3]*a[2] + b[4]*a[5] + b[5]*a[8];
	self->data[6] = b[6]*a[0] + b[7]*a[3] + b[8]*a[6];
	self->data[7] = b[6]*a[1] + b[7]*a[4] + b[8]*a[7];
	self->data[8] = b[6]*a[2] + b[7]*a[5] + b[8]*a[8];
}

export void mat3_translate2f (mat3 *self, double dx, double dy)
{
	if (!dx && !dy)
		return;

	mat3_set1m(&tmp, self);
	float *a = tmp.data;

	self->data[6] = dx*a[0] + dy*a[3] + a[6];
	self->data[7] = dx*a[1] + dy*a[4] + a[7];
	self->data[8] = dx*a[2] + dy*a[5] + a[8];
}

export void mat3_rotate1f (mat3 *self, double angle)
{
	if (!angle)
		return;

	mat3_identity(&tmp2);

	float cost = std::cos(angle);
	float sint = std::sin(angle);

	tmp2.data[0] = cost;
	tmp2.data[1] = -sint;
	tmp2.data[3] = sint;
	tmp2.data[4] = cost;

	mat3_append1m(self, &tmp2);
}

export void mat3_scale2f (mat3 *self, double sx, double sy)
{
	if (sx == 1.0 && sy == 1.0)
		return;

	mat3_identity(&tmp2);

	tmp2.data[0] = sx;
	tmp2.data[4] = sy;

	mat3_append1m(self, &tmp2);
}
