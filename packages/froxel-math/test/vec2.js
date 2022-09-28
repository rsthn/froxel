
import assert from 'assert';
import { Vec2 } from '../dist/froxel-math.m.js';
import { default as chai, expect } from 'chai';
import almost from 'chai-almost';

const epsilon = 0.0001;
chai.use(almost(epsilon));


describe('Vec2', () =>
{
	let a, b, c, t;

	it('float precision of at least ' + epsilon, () => {
		c = Vec2.alloc(8.127, -16.511);
		assert(c.x() - 8.127 < epsilon && c.y() - -16.511 < epsilon);
	});

	it('alloc()', () => {
		a = Vec2.alloc();
		assert(a.x() == 0 && a.y() == 0);
	});

	it('alloc(x, y)', () => {
		b = Vec2.alloc(-10, 15);
		assert(b.x() == -10 && b.y() == 15);
	});

	it('clone()', () => {
		t = b.clone();
		assert(t.x() == -10 && t.y() == 15);
	});

	it('set(x, y)', () => {
		a.set(16, -32);
		assert(a.x() == 16 && a.y() == -32);
	});

	it('set(vec)', () => {
		t.set(a);
		assert(t.x() == 16 && t.y() == -32);
	});

	it('setX(x)', () => {
		t.setX(63);
		assert(t.x() == 63 && t.y() == -32);
	});

	it('setY(y)', () => {
		t.setY(-127);
		assert(t.x() == 63 && t.y() == -127);
	});

	it('zero()', () => {
		a.zero();
		assert(a.x() == 0 && a.y() == 0);
	});

	it('iszero()', () => {
		assert(a.iszero());
		a.set(63, -127);
	});

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
		expect(t.data).to.deep.almost.equals(new Float32Array([-1.0/63, 1.0/127]));
	});

	it('abs()', () => {
		t.abs();
		assert(t.almost(1.0/63, 1.0/127, epsilon));
	});

	it('translate(vec)', () => {
		t.translate(a);
		assert(t.almost((1.0/63)+63, (1.0/127)-127, epsilon));
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

	it('almost(vec, epsilon)', () => {
		b.set(0, -190);
		assert(t.almost(b, 0.00001));
	});

	it('almost(x, y, epsilon)', () => {
		assert(t.almost(0, -190, 0.00001));
	});

	it('add(vec)', () => {
		t.add(a);
		assert(t.almost(63, -317, 0.0001));
	});

	it('add(dx, dy)', () => {
		t.add(7, 17);
		assert(t.almost(70, -300, 0.0001));
	});

	it('sub(vec)', () => {
		b.sub(a);
		assert(b.almost(-63, -63, 0.0001));
	});

	it('sub(dx, dy)', () => {
		b.sub(-103, 7);
		assert(b.almost(40, -70, 0.0001));
	});

	it('scale(factor)', () => {
		b.scale(-2, 3);
		assert(b.almost(-80, -210, 0.0001));
	});

	it('scale(vec)', () => {
		b.scale(a);
		assert(b.almost(-5040, 26670, 0.0001));
	});

	it('scale(fx, fy)', () => {
		b.scale(1.0/200, 1.0/350);
		assert(b.almost(-25.2, 76.2, 0.00001));
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
		assert(c.almost(-0.2, 0.2, 0.00001));
	});

	it('dot(vect)', () => {
		assert(c.dot(c) - 0.08 < epsilon);
	});

	it('dot(x, y)', () => {
		b.set(1, 3);
		expect(b.dot(3, -5)).to.equals(-12);
	});

	it('mag2()', () => {
		expect(a.mag2()).to.equals(20098.0);
	});

	it('mag()', () => {
		assert(a.mag() - 141.7674 < epsilon*100);
	});

	it('unit()', () => {
		c.unit();
		assert(c.almost(-0.7071, 0.7071, epsilon*100));
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
	});
});
