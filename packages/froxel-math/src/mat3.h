#ifndef __mat3_h
#define __mat3_h

struct mat3 {
	float data[9];
};

export mat3 *mat3_alloc ();
export void mat3_dtor (mat3 *self);
export mat3 *mat3_clone (mat3 *self);
export void mat3_fill1f (mat3 *self, double value);
export void mat3_set1f (mat3 *self, double value);
export void mat3_set1m (mat3 *self, mat3 *m);
export void mat3_col1i3f (mat3 *self, int col, double a0, double a1, double a2);
export void mat3_row1i3f (mat3 *self, int row, double a0, double a1, double a2);
export void mat3_identity (mat3 *self);
export void mat3_scale1f (mat3 *self, double value);
export void mat3_transpose (mat3 *self);
export float mat3_det (mat3 *self);
export void mat3_append1m (mat3 *self, mat3 *m);
export void mat3_translate2f (mat3 *self, double dx, double dy);
export void mat3_rotate1f (mat3 *self, double angle);
export void mat3_scale2f (mat3 *self, double sx, double sy);

#endif
