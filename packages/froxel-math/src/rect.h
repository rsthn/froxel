#ifndef __rect_h
#define __rect_h

#include "vec2.h"

struct rect {
	float x1, y1;
	float x2, y2;
	float cx, cy;
};

export rect *rect_alloc4f (double x1, double y1, double x2, double y2);
export rect *rect_alloc2f (double width, double height, bool topLeft);
export rect *rect_materialize (void *addr);
export void rect_free (rect *self);
export rect *rect_clone (rect *r);
export void rect_zero (rect *self);
export void rect_reset (rect *self);
export void rect_extend2f (rect *self, double x, double y);
export void rect_extend1v (rect *self, vec2 *v);
export void rect_translate2f (rect *self, double dx, double dy);
export void rect_translate1v (rect *self, vec2 *v);
export void rect_center (rect *self, double x, double y, bool normalized);
export void rect_set4f (rect *self, double x1, double y1, double x2, double y2);
export void rect_set1r (rect *self, rect *r);
export bool rect_equals4f (rect *self, double x1, double y1, double x2, double y2);
export bool rect_equals1r (rect *self, rect *r);
export bool rect_contains4f (rect *self, double x1, double y1, double x2, double y2);
export bool rect_contains1r (rect *self, rect *r);
export bool rect_contains2f (rect *self, double x, double y, double epsilon);
export bool rect_contains1v (rect *self, vec2 *v, double epsilon);
export void rect_union4f (rect *self, double x1, double y1, double x2, double y2);
export void rect_union1r (rect *self, rect *r);
export bool rect_intersects4f (rect *self, double x1, double y1, double x2, double y2);
export bool rect_intersects1r (rect *self, rect *r);
export bool rect_intersection4f (rect *self, double x1, double y1, double x2, double y2);
export bool rect_intersection1r (rect *self, rect *r);
export void rect_resize (rect *self, double width, double height, bool topLeft, bool normalized);
export void rect_resizeBy (rect *self, double dWidth, double dHeight, bool topLeft);
export double rect_width (rect *self);
export double rect_height (rect *self);
export bool rect_isRight (rect *self);
export double rect_area (rect *self, bool strict);
export void rect_floor (rect *self);
export void rect_ceil (rect *self);
export void rect_trunc (rect *self);
export void rect_fract (rect *self);

#endif
