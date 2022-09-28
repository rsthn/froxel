
import assert from 'assert';
import { Vec4 } from '../dist/froxel-math.m.js';
import { default as chai, expect } from 'chai';
import almost from 'chai-almost';

const epsilon = 0.0001;
chai.use(almost(epsilon));


describe('Vec4', () =>
{
	let a, b, c, t;

	it('float precision of at least ' + epsilon, () => {
		c = Vec4.alloc(8.127, -16.511, 12.78, -11.165);
		assert(c.x() - 8.127 < epsilon && c.y() - -16.511 < epsilon && c.z() - 12.78 < epsilon && c.w() - -11.165 < epsilon);
	});

	it('alloc()', () => {
		a = Vec4.alloc();
		assert(a.x() == 0 && a.y() == 0 && a.z() == 0 && a.w() == 0);
	});

	it('alloc(x, y, z, w)', () => {
		b = Vec4.alloc(-10, 15, 31, -27.5);
		assert(b.x() == -10 && b.y() == 15 && b.z() == 31 && b.w() == -27.5);
	});

	it('clone()', () => {
		t = b.clone();
		assert(t.x() == -10 && t.y() == 15 && t.z() == 31 && t.w() == -27.5);
	});

	it('set(x, y, z, w)', () => {
		a.set(16, -32, 13, 47);
		assert(a.x() == 16 && a.y() == -32 && a.z() == 13 && a.w() == 47);
	});

	it('set(vec)', () => {
		t.set(a);
		expect(t.data).to.deep.almost.equals(new Float32Array([16, -32, 13, 47]));
	});

	it('setX(x)', () => {
		t.setX(63);
		expect(t.data).to.deep.almost.equals(new Float32Array([63, -32, 13, 47]));
	});

	it('setY(y)', () => {
		t.setY(-127);
		expect(t.data).to.deep.almost.equals(new Float32Array([63, -127, 13, 47]));
	});

	it('setZ(z)', () => {
		t.setZ(45.128);
		expect(t.data).to.deep.almost.equals(new Float32Array([63, -127, 45.128, 47]));
	});

	it('setW(w)', () => {
		t.setW(-4.12);
		expect(t.data).to.deep.almost.equals(new Float32Array([63, -127, 45.128, -4.12]));
	});

	it('zero()', () => {
		a.zero();
		assert(a.x() == 0 && a.y() == 0 && a.z() == 0 && a.w() == 0);
	});

	it('iszero()', () => {
		assert(a.iszero());
		a.set(63, -127, 45.128, -4.12);
	});

	it('equals(x, y, z, w)', () => {
		assert(t.almost(63, -127, 45.128, -4.12, epsilon));
	});

	it('equals(vec)', () => {
		assert(t.equals(a));
	});

	it('neg()', () => {
		t.neg();
		assert(t.almost(-63, 127, -45.128, 4.12, epsilon));
	});

	it('inv()', () => {
		t.inv();
		assert(t.almost(-1.0/63, 1.0/127, 1.0/-45.128, 1.0/4.12, epsilon));
	});

	it('abs()', () => {
		t.abs();
		assert(t.almost(1.0/63, 1.0/127,  1.0/45.128, 1.0/4.12, epsilon));
	});

	it('translate(vec)', () => {
		t.translate(a);
		assert(t.almost((1.0/63)+63, (1.0/127)-127, (1.0/45.128)+45.128, (1.0/4.12)-4.12, epsilon));
	});

	it('translate(dx, dy)', () => {
		t.translate(-1.0/63, -1.0/127, -1.0/45.128, -1.0/4.12);
		assert(t.almost(63, -127, 45.128, -4.12, epsilon));
	});

	it('almost(vec, epsilon)', () => {
		b.set(62.9, -127.1, 45.120, -4.11);
		assert(t.almost(b, 0.15));
	});

	it('almost(x, y, z, w, epsilon)', () => {
		assert(t.almost(62.9, -127.1, 45.120, -4.11, 0.15));
	});

	it('add(vec)', () => {
		t.zero().add(a);
		assert(t.almost(a, 0.0001));
	});

	it('add(dx, dy, dz, dw)', () => {
		t.add(7, 27, 10, -10);
		assert(t.almost(70, -100, 55.128, -14.12, 0.0001));
	});

	it('sub(vec)', () => {
		b.set(-63+70, 63-100, -63+55.128, 63-14.12);
		b.sub(t);
		assert(b.almost(-63, 63, -63, 63, 0.0001));
	});

	it('sub(dx, dy, dz, dw)', () => {
		b.sub(10, -20, 30, -40);
		assert(b.almost(-73, 83, -93, 103, 0.0001));
	});

	it('scale(factor)', () => {
		b.set(1, 2, 3, 4);
		b.scale(-2, -3, 0.5, 3);
		assert(b.almost(-2, -6, 1.5, 12, 0.0001));
	});

	it('scale(vec)', () => {
		a.set(1, -1, -2, 2);
		b.scale(a);
		assert(b.almost(-2, 6, -3, 24, 0.0001));
	});

	it('scale(fx, fy, fz, fw)', () => {
		b.scale(1.0/-2.0, 1.0/6, 1.0/-3, 1.0/24);
		assert(b.almost(1.0, 1.0, 1.0, 1.0, 0.00001));
		b.set(1.2, 3.4, 5.67, -8.9);
	});

	it('trunc()', () => {
		c.set(b).trunc();
		expect(c+'').to.equals('(1, 3, 5, -8)');
	});

	it('floor()', () => {
		c.set(b).floor();
		expect(c+'').to.equals('(1, 3, 5, -9)');
	});

	it('ceil()', () => {
		c.set(b).ceil();
		expect(c+'').to.equals('(2, 4, 6, -8)');
	});

	it('fract()', () => {
		c.set(b).fract();
		assert(c.almost(0.2, 0.4, 0.67, -0.9, 0.00001));
	});

	it('dot(vect)', () => {
		c.set(1, 2, 1, -9);
		expect(c.dot(c)).to.equals(87);
	});

	it('dot(x, y, z, w)', () => {
		b.set(1, 2, 1, -9);
		expect(b.dot(-9, 2, 1, 5)).to.equals(-49);
	});

	it('mag2()', () => {
		a.set(4, -5, 12, 100);
		expect(a.mag2()).to.equals(10185.0);
	});

	it('mag()', () => {
		expect(a.mag()).to.almost.equals(100.92076);
	});

	it('unit()', () => {
		a.unit();
		expect(a.data).to.deep.almost.equals(new Float32Array([0.03963, -0.04954, 0.11890, 0.99087]));
	});

	it('major()', () => {
		c.set(a).major();
		expect(c.data).to.deep.almost.equals(new Float32Array([0, 0, 0, 0.99087]));
	});

	it('minor()', () => {
		c.set(a).minor();
		expect(c.data).to.deep.almost.equals(new Float32Array([0.03963, 0, 0, 0]));
	});

	it('sign()', () => {
		c.set(a).sign();
		expect(c.data).to.deep.equals(new Float32Array([1, -1, 1, 1]));
	});

	it('sign() when all zeroes', () => {
		c.zero().sign();
		expect(c.data).to.deep.equals(new Float32Array([0, 0, 0, 0]));
	});
});
