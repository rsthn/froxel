
#include <cstring>
#include <cstdlib>
#include <cmath>
#include <wasm>

#include "vec3.h"


export vec3 *vec3_alloc3f (double x, double y, double z) {
	vec3 *t = (vec3*)malloc(sizeof(vec3));
	t->x = x;
	t->y = y;
	t->z = z;
	return t;
}

export vec3 *vec3_materialize (void *addr) {
	return (vec3*)addr;
}

export void vec3_free (vec3 *self) {
	free (self);
}

export vec3 *vec3_clone (vec3 *self) {
	return vec3_alloc3f(self->x, self->y, self->z);
}

export void vec3_set3f (vec3 *self, double x, double y, double z) {
	self->x = x;
	self->y = y;
	self->z = z;
}

export void vec3_set1v (vec3 *self, vec3 *v) {
	self->x = v->x;
	self->y = v->y;
	self->z = v->z;
}

export void vec3_zero (vec3 *self) {
	memset(self, 0, sizeof(vec3));
}

export bool vec3_iszero (vec3 *self) {
	return !self->x && !self->y && !self->z;
}

export bool vec3_equals3f (vec3 *self, double x, double y, double z) {
	return self->x == x && self->y == y && self->z == z;
}

export bool vec3_equals2f (vec3 *self, double x, double y) {
	return self->x == x && self->y == y;
}

export bool vec3_equals1v (vec3 *self, vec3 *v) {
	return self->x == v->x && self->y == v->y && self->z == v->z;
}

export bool vec3_almost3f (vec3 *self, double x, double y, double z, double epsilon) {
	return std::abs(self->x - x) <= epsilon && std::abs(self->y - y) <= epsilon && std::abs(self->z - z) <= epsilon;
}

export bool vec3_almost2f (vec3 *self, double x, double y, double epsilon) {
	return std::abs(self->x - x) <= epsilon && std::abs(self->y - y) <= epsilon;
}

export bool vec3_almost1v (vec3 *self, vec3 *v, double epsilon) {
	return std::abs(self->x - v->x) <= epsilon && std::abs(self->y - v->y) <= epsilon && std::abs(self->z - v->z) <= epsilon;
}

export void vec3_neg (vec3 *self) {
	self->x = -self->x;
	self->y = -self->y;
	self->z = -self->z;
}

export void vec3_inv (vec3 *self) {
	self->x = 1.0 / self->x;
	self->y = 1.0 / self->y;
	self->z = 1.0 / self->z;
}

export void vec3_abs (vec3 *self) {
	self->x = std::abs(self->x);
	self->y = std::abs(self->y);
	self->z = std::abs(self->z);
}

export void vec3_translate3f (vec3 *self, double dx, double dy, double dz) {
	self->x += dx;
	self->y += dy;
	self->z += dz;
}

export void vec3_translate2f (vec3 *self, double dx, double dy) {
	self->x += dx;
	self->y += dy;
}

export void vec3_translate1v (vec3 *self, vec3 *v) {
	self->x += v->x;
	self->y += v->y;
	self->z += v->z;
}

export void vec3_add3f (vec3 *self, double dx, double dy, double dz) {
	self->x += dx;
	self->y += dy;
	self->z += dz;
}

export void vec3_add2f (vec3 *self, double dx, double dy) {
	self->x += dx;
	self->y += dy;
}

export void vec3_add1v (vec3 *self, vec3 *v) {
	self->x += v->x;
	self->y += v->y;
	self->z += v->z;
}

export void vec3_sub3f (vec3 *self, double dx, double dy, double dz) {
	self->x -= dx;
	self->y -= dy;
	self->z -= dz;
}

export void vec3_sub2f (vec3 *self, double dx, double dy) {
	self->x -= dx;
	self->y -= dy;
}

export void vec3_sub1v (vec3 *self, vec3 *v) {
	self->x -= v->x;
	self->y -= v->y;
	self->z -= v->z;
}

export void vec3_scale3f (vec3 *self, double fx, double fy, double fz) {
	self->x *= fx;
	self->y *= fy;
	self->z *= fz;
}

export void vec3_scale2f (vec3 *self, double fx, double fy) {
	self->x *= fx;
	self->y *= fy;
}

export void vec3_scale1f (vec3 *self, double f) {
	self->x *= f;
	self->y *= f;
	self->z *= f;
}

export void vec3_scale1v (vec3 *self, vec3 *v) {
	self->x *= v->x;
	self->y *= v->y;
	self->z *= v->z;
}

export void vec3_floor (vec3 *self) {
	self->x = std::floor(self->x);
	self->y = std::floor(self->y);
	self->z = std::floor(self->z);
}

export void vec3_ceil (vec3 *self) {
	self->x = std::ceil(self->x);
	self->y = std::ceil(self->y);
	self->z = std::ceil(self->z);
}

export void vec3_trunc (vec3 *self) {
	self->x = (int)(self->x);
	self->y = (int)(self->y);
	self->z = (int)(self->z);
}

export void vec3_fract (vec3 *self) {
	self->x = self->x - (int)(self->x);
	self->y = self->y - (int)(self->y);
	self->z = self->z - (int)(self->z);
}

export double vec3_dot3f (vec3 *self, double x, double y, double z) {
	return self->x*x + self->y*y + self->z*z;
}

export double vec3_dot2f (vec3 *self, double x, double y) {
	return self->x*x + self->y*y;
}

export double vec3_dot1v (vec3 *self, vec3 *v) {
	return self->x*v->x + self->y*v->y + self->z*v->z;
}

export void vec3_cross3f (vec3 *self, double x, double y, double z)
{
	double sx = self->x, sy = self->y, sz = self->z;

	self->x = sy*z - sz*y;
	self->y = sz*x - sx*z;
	self->z = sx*y - sy*x;
}

export void vec3_cross1v (vec3 *self, vec3 *v) {
	vec3_cross3f(self, v->x, v->y, v->z);
}

export double vec3_mag2 (vec3 *self) {
	return self->x*self->x + self->y*self->y + self->z*self->z;
}

export double vec3_mag (vec3 *self) {
	return std::sqrt(vec3_mag2(self));
}

export void vec3_unit (vec3 *self) {
	if (vec3_iszero(self)) return;
	vec3_scale1f(self, 1.0 / vec3_mag(self));
}

export void vec3_major (vec3 *self)
{
	double x = std::abs(self->x);
	double y = std::abs(self->y);
	double z = std::abs(self->z);

	if (x > y && x > z) {
		self->y = 0;
		self->z = 0;
	}
	else if (y > x && y > z) {
		self->x = 0;
		self->z = 0;
	}
	else {
		self->x = 0;
		self->y = 0;
	}
}

export void vec3_minor (vec3 *self)
{
	double x = std::abs(self->x);
	double y = std::abs(self->y);
	double z = std::abs(self->z);

	if (x < y && x < z) {
		self->y = 0;
		self->z = 0;
	}
	else if (y < x && y < z) {
		self->x = 0;
		self->z = 0;
	}
	else {
		self->x = 0;
		self->y = 0;
	}
}

export void vec3_sign (vec3 *self) {
	self->x = !self->x ? 0 : (self->x < 0 ? -1 : 1);
	self->y = !self->y ? 0 : (self->y < 0 ? -1 : 1);
	self->z = !self->z ? 0 : (self->z < 0 ? -1 : 1);
}
