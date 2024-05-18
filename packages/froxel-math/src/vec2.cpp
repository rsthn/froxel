
#include <cstring>
#include <cstdlib>
#include <cmath>
#include <wasm>

#include "vec2.h"


export vec2 *vec2_alloc2f (double x, double y) {
	vec2 *t = (vec2*)malloc(sizeof(vec2));
	t->x = x;
	t->y = y;
	return t;
}

export vec2 *vec2_materialize (void *addr) {
	return (vec2*)addr;
}

export void vec2_free (vec2 *self) {
	free (self);
}

export vec2 *vec2_clone (vec2 *self) {
	return vec2_alloc2f(self->x, self->y);
}

export void vec2_set2f (vec2 *self, double x, double y) {
	self->x = x;
	self->y = y;
}

export void vec2_set1v (vec2 *self, vec2 *v) {
	self->x = v->x;
	self->y = v->y;
}

export void vec2_zero (vec2 *self) {	
	memset(self, 0, sizeof(vec2));
}

export bool vec2_iszero (vec2 *self) {
	return !self->x && !self->y;
}

export bool vec2_equals2f (vec2 *self, double x, double y) {
	return self->x == x && self->y == y;
}

export bool vec2_equals1v (vec2 *self, vec2 *v) {
	return self->x == v->x && self->y == v->y;
}

export bool vec2_almost2f (vec2 *self, double x, double y, double epsilon) {
	return std::abs(self->x - x) < epsilon && std::abs(self->y - y) < epsilon;
}

export bool vec2_almost1v (vec2 *self, vec2 *v, double epsilon) {
	return std::abs(self->x - v->x) < epsilon && std::abs(self->y - v->y) < epsilon;
}

export void vec2_neg (vec2 *self) {
	self->x = -self->x;
	self->y = -self->y;
}

export void vec2_inv (vec2 *self) {
	self->x = 1.0 / self->x;
	self->y = 1.0 / self->y;
}

export void vec2_abs (vec2 *self) {
	self->x = std::abs(self->x);
	self->y = std::abs(self->y);
}

export void vec2_translate2f (vec2 *self, double dx, double dy) {
	self->x += dx;
	self->y += dy;
}

export void vec2_translate1v (vec2 *self, vec2 *v) {
	self->x += v->x;
	self->y += v->y;

}

export void vec2_rotate3f (vec2 *self, double angle, double cx, double cy)
{
	double cost = std::cos(angle);
	double sint = std::sin(angle);

	self->x -= cx;
	self->y -= cy;

	double x = self->x*cost + self->y*sint;
	double y = self->y*cost - self->x*sint;

	self->x = x + cx;
	self->y = y + cy;
}

export void vec2_add2f (vec2 *self, double dx, double dy) {
	self->x += dx;
	self->y += dy;
}

export void vec2_add1v (vec2 *self, vec2 *v) {
	self->x += v->x;
	self->y += v->y;
}

export void vec2_sub2f (vec2 *self, double dx, double dy) {
	self->x -= dx;
	self->y -= dy;
}

export void vec2_sub1v (vec2 *self, vec2 *v) {
	self->x -= v->x;
	self->y -= v->y;
}

export void vec2_scale1f (vec2 *self, double f) {
	self->x *= f;
	self->y *= f;
}

export void vec2_scale2f (vec2 *self, double fx, double fy) {
	self->x *= fx;
	self->y *= fy;
}

export void vec2_scale1v (vec2 *self, vec2 *v) {
	self->x *= v->x;
	self->y *= v->y;
}

export void vec2_floor (vec2 *self) {
	self->x = std::floor(self->x);
	self->y = std::floor(self->y);
}

export void vec2_ceil (vec2 *self) {
	self->x = std::ceil(self->x);
	self->y = std::ceil(self->y);
}

export void vec2_trunc (vec2 *self) {
	self->x = (int)(self->x);
	self->y = (int)(self->y);
}

export void vec2_fract (vec2 *self) {
	self->x = self->x - (int)(self->x);
	self->y = self->y - (int)(self->y);
}

export double vec2_dot2f (vec2 *self, double x, double y) {
	return self->x*x + self->y*y;
}

export double vec2_dot1v (vec2 *self, vec2 *v) {
	return self->x*v->x + self->y*v->y;
}

export double vec2_mag2 (vec2 *self) {
	return self->x*self->x + self->y*self->y;
}

export double vec2_mag (vec2 *self) {
	return std::sqrt(vec2_mag2(self));
}

export void vec2_unit (vec2 *self) {
	if (vec2_iszero(self)) return;
	vec2_scale1f(self, 1.0 / vec2_mag(self));
}

export void vec2_major (vec2 *self) {
	if (std::abs(self->x) > std::abs(self->y))
		self->y = 0;
	else
		self->x = 0;
}

export void vec2_minor (vec2 *self) {
	if (std::abs(self->x) < std::abs(self->y))
		self->y = 0;
	else
		self->x = 0;
}

export void vec2_sign (vec2 *self) {
	self->x = !self->x ? 0 : (self->x < 0 ? -1 : 1);
	self->y = !self->y ? 0 : (self->y < 0 ? -1 : 1);
}
