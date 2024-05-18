
#include <cstring>
#include <cstdlib>
#include <cmath>
#include <limits>
#include <wasm>

#include "rect.h"
#include "vec2.h"


const double DBL_NULL = std::numeric_limits<double>::max();

export rect *rect_alloc4f (double x1, double y1, double x2, double y2) {
	rect *r = (rect*)malloc(sizeof(rect));
	rect_set4f(r, x1, y1, x2, y2);
	return r;
}

export rect *rect_alloc2f (double width, double height, bool topleft) {
	rect *r = rect_alloc4f(0.0, 0.0, 0.0, 0.0);
	rect_resize(r, width, height, topleft, false);
	return r;
}

export rect *rect_materialize (void *addr) {
	return (rect*)addr;
}

export void rect_free (rect *self) {
	free(self);
}

export rect *rect_clone (rect *self) {
	return rect_alloc4f(self->x1, self->y1, self->x2, self->y2);
}

export void rect_zero (rect *self) {
	memset(self, 0, sizeof(rect));
}

export void rect_reset (rect *self) {
	self->cx = self->cy = DBL_NULL;
	self->x1 = self->y1 = DBL_NULL;
	self->x2 = self->y2 = DBL_NULL;
}

export void rect_extend2f (rect *self, double x, double y)
{
	if (self->x1 == DBL_NULL || x < self->x1) self->x1 = x;
	if (self->y1 == DBL_NULL || y < self->y1) self->y1 = y;
	if (self->x2 == DBL_NULL || x > self->x2) self->x2 = x;
	if (self->y2 == DBL_NULL || y > self->y2) self->y2 = y;

	self->cx = (self->x1 + self->x2) / 2;
	self->cy = (self->y1 + self->y2) / 2;
}

export void rect_extend1v (rect *self, vec2 *v) {
	rect_extend2f(self, v->x, v->y);
}

export void rect_translate2f (rect *self, double dx, double dy)
{
	self->x1 += dx; self->y1 += dy;
	self->x2 += dx; self->y2 += dy;
	self->cx += dx; self->cy += dy;
}

export void rect_translate1v (rect *self, vec2 *v) {
	rect_translate2f(self, v->x, v->y);
}

export void rect_center (rect *self, double x, double y, bool normalized)
{
	if (normalized) {
		x = self->x1 + x*(self->x2 - self->x1);
		y = self->y1 + y*(self->y2 - self->y1);
	}

	rect_translate2f (self, x - self->cx, y - self->cy);
}

export void rect_set4f (rect *self, double x1, double y1, double x2, double y2)
{
	self->cx = (x1 + x2) / 2;
	self->cy = (y1 + y2) / 2;

	self->x1 = x1;
	self->y1 = y1;
	self->x2 = x2;
	self->y2 = y2;
}

export void rect_set1r (rect *self, rect *r) {
	rect_set4f(self, r->x1, r->y1, r->x2, r->y2);
}

export bool rect_equals4f (rect *self, double x1, double y1, double x2, double y2) {
	return x1 == self->x1 && x2 == self->x2 && y1 == self->y1 && y2 == self->y2;
}

export bool rect_equals1r (rect *self, rect *r) {
	return rect_equals4f(self, r->x1, r->y1, r->x2, r->y2);
}

export bool rect_contains4f (rect *self, double x1, double y1, double x2, double y2) {
	return (x1 == std::fmax(self->x1, x1)) && (y1 == std::fmax(self->y1, y1)) && (x2 == std::fmin(self->x2, x2)) && (y2 == std::fmin(self->y2, y2));
}

export bool rect_contains1r (rect *self, rect *r) {
	return rect_contains4f(self, r->x1, r->y1, r->x2, r->y2);
}

export bool rect_contains2f (rect *self, double x, double y, double epsilon) {
	return (self->x1-epsilon <= x && x <= self->x2+epsilon) && (self->y1-epsilon <= y && y <= self->y2+epsilon);
}

export bool rect_contains1v (rect *self, vec2 *v, double epsilon) {
	return rect_contains2f(self, v->x, v->y, epsilon);
}

export void rect_union4f (rect *self, double x1, double y1, double x2, double y2)
{
	self->x1 = std::fmin(self->x1, x1);
	self->y1 = std::fmin(self->y1, y1);
	self->x2 = std::fmax(self->x2, x2);
	self->y2 = std::fmax(self->y2, y2);
}

export void rect_union1r (rect *self, rect *r) {
	rect_union4f(self, r->x1, r->y1, r->x2, r->y2);
}

export bool rect_intersects4f (rect *self, double x1, double y1, double x2, double y2)
{
	x1 = std::fmax(self->x1, x1);
	y1 = std::fmax(self->y1, y1);
	x2 = std::fmin(self->x2, x2);
	y2 = std::fmin(self->y2, y2);

	return std::fmax(0, y2-y1) * std::fmax(0, x2-x1) > 0;
}

export bool rect_intersects1r (rect *self, rect *r) {
	return rect_intersects4f(self, r->x1, r->y1, r->x2, r->y2);
}

export bool rect_intersection4f (rect *self, double x1, double y1, double x2, double y2)
{
	self->x1 = std::fmax(self->x1, x1);
	self->y1 = std::fmax(self->y1, y1);
	self->x2 = std::fmin(self->x2, x2);
	self->y2 = std::fmin(self->y2, y2);

	return std::fmax(0, self->y2-self->y1) * std::fmax(0, self->x2-self->x1) > 0;
}

export bool rect_intersection1r (rect *self, rect *r) {
	return rect_intersection4f(self, r->x1, r->y1, r->x2, r->y2);
}

export void rect_resize (rect *self, double width, double height, bool topLeft, bool normalized)
{
	if (normalized) {
		width *= (self->x2 - self->x1);
		height *= (self->y2 - self->y1);
	}

	if (topLeft) {
		self->x2 = self->x1 + width;
		self->y2 = self->y1 + height;
	}
	else {
		width /= 2;
		height /= 2;

		self->x1 = self->cx - width; self->y1 = self->cy - height;
		self->x2 = self->cx + width; self->y2 = self->cy + height;
	}
}

export void rect_resizeBy (rect *self, double dWidth, double dHeight, bool topLeft)
{
	if (topLeft) {
		self->x2 += dWidth;
		self->y2 += dHeight;
	}
	else {
		dWidth /= 2; dHeight /= 2;

		self->x1 -= dWidth; self->y1 -= dHeight;
		self->x2 += dWidth; self->y2 += dHeight;
	}
}

export double rect_width (rect *self) {
	return self->x2 - self->x1;
}

export double rect_height (rect *self) {
	return self->y2 - self->y1;
}

export bool rect_isRight (rect *self) {
	return self->x1 <= self->x2 && self->y1 <= self->y2;
}

export double rect_area (rect *self, bool strict) {
	return strict ? (rect_isRight(self) ? (self->y2-self->y1)*(self->x2-self->x1) : 0) : ((self->y2-self->y1)*(self->x2-self->x1));
}

export void rect_floor (rect *self)
{
	self->x1 = std::floor(self->x1);
	self->y1 = std::floor(self->y1);
	self->x2 = std::floor(self->x2);
	self->y2 = std::floor(self->y2);
	self->cx = std::floor(self->cx);
	self->cy = std::floor(self->cy);
}

export void rect_ceil (rect *self)
{
	self->x1 = std::ceil(self->x1);
	self->y1 = std::ceil(self->y1);
	self->x2 = std::ceil(self->x2);
	self->y2 = std::ceil(self->y2);
	self->cx = std::ceil(self->cx);
	self->cy = std::ceil(self->cy);
}

export void rect_trunc (rect *self)
{
	self->x1 = (int)(self->x1);
	self->y1 = (int)(self->y1);
	self->x2 = (int)(self->x2);
	self->y2 = (int)(self->y2);
	self->cx = (int)(self->cx);
	self->cy = (int)(self->cy);
}

export void rect_fract (rect *self)
{
	self->x1 -= (int)(self->x1);
	self->y1 -= (int)(self->y1);
	self->x2 -= (int)(self->x2);
	self->y2 -= (int)(self->y2);
	self->cx -= (int)(self->cx);
	self->cy -= (int)(self->cy);
}
