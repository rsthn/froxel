
#include <cstring>
#include <cstdlib>
#include <cmath>
#include <wasm>

#include "vec4.h"


export vec4 *vec4_alloc4f (double x, double y, double z, double w) {
	vec4 *t = (vec4*)malloc(sizeof(vec4));
	t->x = x;
	t->y = y;
	t->z = z;
	t->w = w;
	return t;
}

export vec4 *vec4_materialize (void *addr) {
	return (vec4*)addr;
}

export void vec4_dtor (vec4 *self) {
	free (self);
}

export vec4 *vec4_clone (vec4 *self) {
	return vec4_alloc4f(self->x, self->y, self->z, self->w);
}

export void vec4_set4f (vec4 *self, double x, double y, double z, double w) {
	self->x = x;
	self->y = y;
	self->z = z;
	self->w = w;
}

export void vec4_set1v (vec4 *self, vec4 *v) {
	self->x = v->x;
	self->y = v->y;
	self->z = v->z;
	self->w = v->w;
}

export void vec4_zero (vec4 *self) {	
	memset(self, 0, sizeof(vec4));
}

export bool vec4_iszero (vec4 *self) {
	return !self->x && !self->y && !self->z && !self->w;
}

export bool vec4_equals4f (vec4 *self, double x, double y, double z, double w) {
	return self->x == x && self->y == y && self->z == z && self->w == w;
}

export bool vec4_equals2f (vec4 *self, double x, double y) {
	return self->x == x && self->y == y;
}

export bool vec4_equals1v (vec4 *self, vec4 *v) {
	return self->x == v->x && self->y == v->y && self->z == v->z && self->w == v->w;
}

export bool vec4_almost4f (vec4 *self, double x, double y, double z, double w, double epsilon) {
	return std::abs(self->x - x) <= epsilon && std::abs(self->y - y) <= epsilon && std::abs(self->z - z) <= epsilon && std::abs(self->w - w) <= epsilon;
}

export bool vec4_almost2f (vec4 *self, double x, double y, double epsilon) {
	return std::abs(self->x - x) <= epsilon && std::abs(self->y - y) <= epsilon;
}

export bool vec4_almost1v (vec4 *self, vec4 *v, double epsilon) {
	return std::abs(self->x - v->x) <= epsilon && std::abs(self->y - v->y) <= epsilon && std::abs(self->z - v->z) <= epsilon && std::abs(self->w - v->w) <= epsilon;
}

export void vec4_neg (vec4 *self) {
	self->x = -self->x;
	self->y = -self->y;
	self->z = -self->z;
	self->w = -self->w;
}

export void vec4_inv (vec4 *self) {
	self->x = 1.0 / self->x;
	self->y = 1.0 / self->y;
	self->z = 1.0 / self->z;
	self->w = 1.0 / self->w;
}

export void vec4_abs (vec4 *self) {
	self->x = std::abs(self->x);
	self->y = std::abs(self->y);
	self->z = std::abs(self->z);
	self->w = std::abs(self->w);
}

export void vec4_translate4f (vec4 *self, double dx, double dy, double dz, double dw) {
	self->x += dx;
	self->y += dy;
	self->z += dz;
	self->w += dw;
}

export void vec4_translate2f (vec4 *self, double dx, double dy) {
	self->x += dx;
	self->y += dy;
}

export void vec4_translate1v (vec4 *self, vec4 *v) {
	self->x += v->x;
	self->y += v->y;
	self->z += v->z;
	self->w += v->w;
}

export void vec4_add4f (vec4 *self, double dx, double dy, double dz, double dw) {
	self->x += dx;
	self->y += dy;
	self->z += dz;
	self->w += dw;
}

export void vec4_add2f (vec4 *self, double dx, double dy) {
	self->x += dx;
	self->y += dy;
}

export void vec4_add1v (vec4 *self, vec4 *v) {
	self->x += v->x;
	self->y += v->y;
	self->z += v->z;
	self->w += v->w;
}

export void vec4_sub4f (vec4 *self, double dx, double dy, double dz, double dw) {
	self->x -= dx;
	self->y -= dy;
	self->z -= dz;
	self->w -= dw;
}

export void vec4_sub2f (vec4 *self, double dx, double dy) {
	self->x -= dx;
	self->y -= dy;
}

export void vec4_sub1v (vec4 *self, vec4 *v) {
	self->x -= v->x;
	self->y -= v->y;
	self->z -= v->z;
	self->w -= v->w;
}

export void vec4_scale4f (vec4 *self, double fx, double fy, double fz, double fw) {
	self->x *= fx;
	self->y *= fy;
	self->z *= fz;
	self->w *= fw;
}

export void vec4_scale2f (vec4 *self, double fx, double fy) {
	self->x *= fx;
	self->y *= fy;
}

export void vec4_scale1f (vec4 *self, double f) {
	self->x *= f;
	self->y *= f;
	self->z *= f;
	self->w *= f;
}

export void vec4_scale1v (vec4 *self, vec4 *v) {
	self->x *= v->x;
	self->y *= v->y;
	self->z *= v->z;
	self->w *= v->w;
}

export void vec4_floor (vec4 *self) {
	self->x = std::floor(self->x);
	self->y = std::floor(self->y);
	self->z = std::floor(self->z);
	self->w = std::floor(self->w);
}

export void vec4_ceil (vec4 *self) {
	self->x = std::ceil(self->x);
	self->y = std::ceil(self->y);
	self->z = std::ceil(self->z);
	self->w = std::ceil(self->w);
}

export void vec4_trunc (vec4 *self) {
	self->x = (int)(self->x);
	self->y = (int)(self->y);
	self->z = (int)(self->z);
	self->w = (int)(self->w);
}

export void vec4_fract (vec4 *self) {
	self->x = self->x - (int)(self->x);
	self->y = self->y - (int)(self->y);
	self->z = self->z - (int)(self->z);
	self->w = self->w - (int)(self->w);
}

export double vec4_dot4f (vec4 *self, double x, double y, double z, double w) {
	return self->x*x + self->y*y + self->z*z + self->w*w;
}

export double vec4_dot2f (vec4 *self, double x, double y) {
	return self->x*x + self->y*y;
}

export double vec4_dot1v (vec4 *self, vec4 *v) {
	return self->x*v->x + self->y*v->y + self->z*v->z + self->w*v->w;
}

export double vec4_mag2 (vec4 *self) {
	return self->x*self->x + self->y*self->y + self->z*self->z + self->w*self->w;
}

export double vec4_mag (vec4 *self) {
	return std::sqrt(vec4_mag2(self));
}

export void vec4_unit (vec4 *self) {
	if (vec4_iszero(self)) return;
	vec4_scale1f(self, 1.0 / vec4_mag(self));
}

export void vec4_major (vec4 *self)
{
	double x = std::abs(self->x);
	double y = std::abs(self->y);
	double z = std::abs(self->z);
	double w = std::abs(self->w);

	if (x > y && x > z && x > w) {
		self->y = 0;
		self->z = 0;
		self->w = 0;
	}
	else if (y > x && y > z && y > w) {
		self->x = 0;
		self->z = 0;
		self->w = 0;
	}
	else if (z > x && z > y && z > w) {
		self->x = 0;
		self->y = 0;
		self->w = 0;
	}
	else {
		self->x = 0;
		self->y = 0;
		self->z = 0;
	}
}

export void vec4_minor (vec4 *self)
{
	double x = std::abs(self->x);
	double y = std::abs(self->y);
	double z = std::abs(self->z);
	double w = std::abs(self->w);

	if (x < y && x < z && x < w) {
		self->y = 0;
		self->z = 0;
		self->w = 0;
	}
	else if (y < x && y < z && y < w) {
		self->x = 0;
		self->z = 0;
		self->w = 0;
	}
	else if (z < x && z < y && z < w) {
		self->x = 0;
		self->y = 0;
		self->w = 0;
	}
	else {
		self->x = 0;
		self->y = 0;
		self->z = 0;
	}
}

export void vec4_sign (vec4 *self) {
	self->x = !self->x ? 0 : (self->x < 0 ? -1 : 1);
	self->y = !self->y ? 0 : (self->y < 0 ? -1 : 1);
	self->z = !self->z ? 0 : (self->z < 0 ? -1 : 1);
	self->w = !self->w ? 0 : (self->w < 0 ? -1 : 1);
}
