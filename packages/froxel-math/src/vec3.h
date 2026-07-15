#ifndef __vec3_h
#define __vec3_h

struct vec3 {
    float x, y, z;
};

export vec3 *vec3_alloc3f (double x, double y, double z);
export vec3 *vec3_materialize (void *addr);
export void vec3_free (vec3 *self);
export vec3 *vec3_clone (vec3 *self);
export void vec3_set3f (vec3 *self, double x, double y, double z);
export void vec3_set1v (vec3 *self, vec3 *v);
export void vec3_zero (vec3 *self) ;
export bool vec3_iszero (vec3 *self);
export bool vec3_equals3f (vec3 *self, double x, double y, double z);
export bool vec3_equals2f (vec3 *self, double x, double y);
export bool vec3_equals1v (vec3 *self, vec3 *v);
export bool vec3_almost3f (vec3 *self, double x, double y, double z, double epsilon);
export bool vec3_almost2f (vec3 *self, double x, double y, double epsilon);
export bool vec3_almost1v (vec3 *self, vec3 *v, double epsilon);
export void vec3_neg (vec3 *self);
export void vec3_inv (vec3 *self);
export void vec3_abs (vec3 *self);
export void vec3_translate3f (vec3 *self, double dx, double dy, double dz);
export void vec3_translate2f (vec3 *self, double dx, double dy);
export void vec3_translate1v (vec3 *self, vec3 *v);
export void vec3_add3f (vec3 *self, double dx, double dy, double dz);
export void vec3_add2f (vec3 *self, double dx, double dy);
export void vec3_add1v (vec3 *self, vec3 *v);
export void vec3_sub3f (vec3 *self, double dx, double dy, double dz);
export void vec3_sub2f (vec3 *self, double dx, double dy);
export void vec3_sub1v (vec3 *self, vec3 *v);
export void vec3_scale3f (vec3 *self, double fx, double fy, double fz);
export void vec3_scale2f (vec3 *self, double fx, double fy);
export void vec3_scale1f (vec3 *self, double f);
export void vec3_scale1v (vec3 *self, vec3 *v);
export void vec3_floor (vec3 *self);
export void vec3_ceil (vec3 *self);
export void vec3_trunc (vec3 *self);
export void vec3_fract (vec3 *self);
export double vec3_dot3f (vec3 *self, double x, double y, double z);
export double vec3_dot2f (vec3 *self, double x, double y);
export double vec3_dot1v (vec3 *self, vec3 *v);
export void vec3_cross3f (vec3 *self, double x, double y, double z);
export void vec3_cross1v (vec3 *self, vec3 *v);
export double vec3_mag2 (vec3 *self);
export double vec3_mag (vec3 *self);
export void vec3_unit (vec3 *self);
export void vec3_major (vec3 *self);
export void vec3_minor (vec3 *self);
export void vec3_sign (vec3 *self);

#endif
