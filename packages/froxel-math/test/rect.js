
import assert from 'assert';
import { Rect } from '../dist/froxel-math.m.js';

const epsilon = 0.0001;

describe('Rect', () =>
{
	let a, b, c, d, t;

	it('alloc()', () => {
		a = Rect.alloc();
		assert(a.x1() == 0 && a.y1() == 0 && a.x2() == 0 && a.y2() == 0);
	});

	it('alloc(width, height, false)', () => {
		b = Rect.alloc(100, 100);
		assert(b.x1() == -50 && b.y1() == -50 && b.x2() == 50 && b.y2() == 50);
	});

	it('alloc(width, height, true)', () => {
		c = Rect.alloc(100, 100, true);
		assert(c.x1() == 0 && c.y1() == 0 && c.x2() == 100 && c.y2() == 100);
	});

	it('alloc(x1, y1, x2, y2)', () => {
		d = Rect.alloc(10, -10, 120, 150);
		assert(d.x1() == 10 && d.y1() == -10 && d.x2() == 120 && d.y2() == 150);
	});

 	it('clone()', () => {
		t = d.clone();
		assert(t.x1() == 10 && t.y1() == -10 && t.x2() == 120 && t.y2() == 150);
	});

 	it('cx() and cy()', () => {
		assert(t.cx() == 65 && t.cy() == 70);
	});

	it('set(x1, y1, x2, y2)', () => {
		a.set(16, -32, 78, 99);
		assert(a.x1() == 16 && a.y1() == -32 && a.x2() == 78 && a.y2() == 99 && a.cx() == 47 && a.cy() == 33.5);
	});

	it('set(vec)', () => {
		t.set(a);
		assert(t.x1() == 16 && t.y1() == -32 && t.x2() == 78 && t.y2() == 99 && t.cx() == 47 && t.cy() == 33.5);
	});

	it('zero()', () => {
		t.zero();
		assert(t.x1() == 0 && t.y1() == 0 && t.x2() == 0 && t.y2() == 0);
	});

	it('reset()', () => {
		t.reset();
		assert(t.x1() == t.y1() && t.x2() == t.y2());
	});

/**
	it('equals(x, y)', () => {
		assert(t.equals(63, -127));
	});

	it('equals(vec)', () => {
		assert(t.equals(a));
	});

	it('neg()', () => {
		t.neg();
		assert(t.equals(-63, 127));
	});

	it('inv()', () => {
		t.inv();
		assert(t.equals(-1.0/63, 1.0/127));
	});

	it('abs()', () => {
		t.abs();
		assert(t.equals(1.0/63, 1.0/127));
	});

	it('translate(vec)', () => {
		t.translate(a);
		assert(t.equals((1.0/63)+63, (1.0/127)-127));
	});

	it('translate(dx, dy)', () => {
		t.translate(-1.0/63, -1.0/127);
		assert(t.equals(63, -127));
	});

	it('rotate(angle)', () => {
		t.rotate(Math.PI*0.5);
		assert(Math.abs(t.x() - (-127)) < epsilon && Math.abs(t.y() - (-63)) < epsilon);
	});

	it('rotate(angle, cx, cy)', () => {
		t.rotate(-Math.PI*0.5, 0, t.y());
		assert(Math.abs(t.x() - (0)) < epsilon && Math.abs(t.y() - (-190)) < epsilon);
	});

	it('near(vec, epsilon)', () => {
		b.set(0, -190);
		assert(t.near(b, 0.00001));
	});

	it('near(x, y, epsilon)', () => {
		assert(t.near(0, -190, 0.00001));
	});

	it('add(vec)', () => {
		t.add(a);
		assert(t.near(63, -317, 0.0001));
	});

	it('add(dx, dy)', () => {
		t.add(7, 17);
		assert(t.near(70, -300, 0.0001));
	});

	it('sub(vec)', () => {
		b.sub(a);
		assert(b.near(-63, -63, 0.0001));
	});

	it('sub(dx, dy)', () => {
		b.sub(-103, 7);
		assert(b.near(40, -70, 0.0001));
	});

	it('scale(factor)', () => {
		b.scale(-2, 3);
		assert(b.near(-80, -210, 0.0001));
	});

	it('scale(vec)', () => {
		b.scale(a);
		assert(b.near(-5040, 26670, 0.0001));
	});

	it('scale(fx, fy)', () => {
		b.scale(1.0/200, 1.0/350);
		assert(b.near(-25.2, 76.2, 0.00001));
	});

	it('trunc()', () => {
		c.set(b).trunc();
		assert(c.equals(-25, 76));
	});

	it('floor()', () => {
		c.set(b).floor();
		assert(c.equals(-26, 76));
	});

	it('ceil()', () => {
		c.set(b).ceil();
		assert(c.equals(-25, 77));
	});

	it('fract()', () => {
		c.set(b).fract();
		assert(c.near(-0.2, 0.2, 0.00001));
	});

	it('dot(vect)', () => {
		assert(c.dot(c) - 0.08 < epsilon);
	});

	it('dot(x, y)', () => {
		assert(b.dot(c) - 20.28 < epsilon);
	});

	it('mag2()', () => {
		assert(a.mag2() == 20098.0);
	});

	it('mag()', () => {
		assert(a.mag() - 141.7674 < epsilon*100);
	});

	it('unit()', () => {
		c.unit();
		assert(c.near(-0.7071, 0.7071, epsilon*100));
	});

	it('major()', () => {
		c.set(a).major();
		assert(c.equals(0, -127));
	});

	it('minor()', () => {
		c.set(a).minor();
		assert(c.equals(63, 0));
	});

	it('sign()', () => {
		c.set(a).sign();
		assert(c.equals(1, -1));
	});

	it('sign() when all zeroes', () => {
		c.zero().sign();
		assert(c.equals(0, 0));
	}); */
});
