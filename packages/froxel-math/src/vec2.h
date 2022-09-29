#ifndef __vec2_h
#define __vec2_h

struct vec2 {
	float x, y;
};

export vec2 *vec2_alloc2f (double x, double y);
export void vec2_dtor (vec2 *self);
export vec2 *vec2_clone (vec2 *self);
export void vec2_set2f (vec2 *self, double x, double y);
export void vec2_set1v (vec2 *self, vec2 *v);
export void vec2_zero (vec2 *self) ;
export bool vec2_iszero (vec2 *self);
export bool vec2_equals2f (vec2 *self, double x, double y);
export bool vec2_equals1v (vec2 *self, vec2 *v);
export bool vec2_almost2f (vec2 *self, double x, double y, double epsilon);
export bool vec2_almost1v (vec2 *self, vec2 *v, double epsilon);
export void vec2_neg (vec2 *self);
export void vec2_inv (vec2 *self);
export void vec2_abs (vec2 *self);
export void vec2_translate2f (vec2 *self, double dx, double dy);
export void vec2_translate1v (vec2 *self, vec2 *v);
export void vec2_rotate3f (vec2 *self, double angle, double cx, double cy);
export void vec2_add2f (vec2 *self, double dx, double dy);
export void vec2_add1v (vec2 *self, vec2 *v);
export void vec2_sub2f (vec2 *self, double dx, double dy);
export void vec2_sub1v (vec2 *self, vec2 *v);
export void vec2_scale1f (vec2 *self, double f);
export void vec2_scale2f (vec2 *self, double fx, double fy);
export void vec2_scale1v (vec2 *self, vec2 *v);
export void vec2_floor (vec2 *self);
export void vec2_ceil (vec2 *self);
export void vec2_trunc (vec2 *self);
export void vec2_fract (vec2 *self);
export double vec2_dot2f (vec2 *self, double x, double y);
export double vec2_dot1v (vec2 *self, vec2 *v);
export double vec2_mag2 (vec2 *self);
export double vec2_mag (vec2 *self);
export void vec2_unit (vec2 *self);
export void vec2_major (vec2 *self);
export void vec2_minor (vec2 *self);
export void vec2_sign (vec2 *self);

#endif
