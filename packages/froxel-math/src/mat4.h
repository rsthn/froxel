#ifndef __mat4_h
#define __mat4_h

struct mat4 {
	float data[16];
};

export mat4 *mat4_alloc ();
export mat4 *mat4_materialize (void *addr);
export void mat4_free (mat4 *self);
export mat4 *mat4_clone (mat4 *self);
export void mat4_fill1f (mat4 *self, double value);
export void mat4_set1f (mat4 *self, double value);
export void mat4_set1m (mat4 *self, mat4 *m);
export void mat4_col1i4f (mat4 *self, int col, double a0, double a1, double a2, double a3);
export void mat4_row1i4f (mat4 *self, int row, double a0, double a1, double a2, double a3);
export void mat4_identity (mat4 *self);
export void mat4_scale1f (mat4 *self, double value);
export void mat4_transpose (mat4 *self);
export float mat4_det (mat4 *self);
export void mat4_append1m (mat4 *self, mat4 *m);
export void mat4_translate3f (mat4 *self, double dx, double dy, double dz);
export void mat4_rotateX (mat4 *self, double angle);
export void mat4_rotateY (mat4 *self, double angle);
export void mat4_rotateZ (mat4 *self, double angle);
export void mat4_scale3f (mat4 *self, double sx, double sy, double sz);

#endif
