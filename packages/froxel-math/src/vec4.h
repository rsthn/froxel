#ifndef __vec4_h
#define __vec4_h

struct vec4 {
	float x, y, z, w;
};

export vec4 *vec4_alloc4f (double x, double y, double z, double w);
export vec4 *vec4_materialize (void *addr);
export void vec4_free (vec4 *self);
export vec4 *vec4_clone (vec4 *self);
export void vec4_set4f (vec4 *self, double x, double y, double z, double w);
export void vec4_set1v (vec4 *self, vec4 *v);
export void vec4_zero (vec4 *self) ;
export bool vec4_iszero (vec4 *self);
export bool vec4_equals4f (vec4 *self, double x, double y, double z, double w);
export bool vec4_equals2f (vec4 *self, double x, double y);
export bool vec4_equals1v (vec4 *self, vec4 *v);
export bool vec4_almost4f (vec4 *self, double x, double y, double z, double w, double epsilon);
export bool vec4_almost2f (vec4 *self, double x, double y, double epsilon);
export bool vec4_almost1v (vec4 *self, vec4 *v, double epsilon);
export void vec4_neg (vec4 *self);
export void vec4_inv (vec4 *self);
export void vec4_abs (vec4 *self);
export void vec4_translate4f (vec4 *self, double dx, double dy, double dz, double dw);
export void vec4_translate2f (vec4 *self, double dx, double dy);
export void vec4_translate1v (vec4 *self, vec4 *v);
export void vec4_add4f (vec4 *self, double dx, double dy, double dz, double dw);
export void vec4_add2f (vec4 *self, double dx, double dy);
export void vec4_add1v (vec4 *self, vec4 *v);
export void vec4_sub4f (vec4 *self, double dx, double dy, double dz, double dw);
export void vec4_sub2f (vec4 *self, double dx, double dy);
export void vec4_sub1v (vec4 *self, vec4 *v);
export void vec4_scale4f (vec4 *self, double fx, double fy, double fz, double fw);
export void vec4_scale2f (vec4 *self, double fx, double fy);
export void vec4_scale1f (vec4 *self, double f);
export void vec4_scale1v (vec4 *self, vec4 *v);
export void vec4_floor (vec4 *self);
export void vec4_ceil (vec4 *self);
export void vec4_trunc (vec4 *self);
export void vec4_fract (vec4 *self);
export double vec4_dot4f (vec4 *self, double x, double y, double z, double w);
export double vec4_dot2f (vec4 *self, double x, double y);
export double vec4_dot1v (vec4 *self, vec4 *v);
export double vec4_mag2 (vec4 *self);
export double vec4_mag (vec4 *self);
export void vec4_unit (vec4 *self);
export void vec4_major (vec4 *self);
export void vec4_minor (vec4 *self);
export void vec4_sign (vec4 *self);

#endif
