
import assert from 'assert';
import { init, Vec3 } from '../dist/froxel-math.m.js';
import { asyl } from 'asyl';
import { default as chai, expect } from 'chai';
import almost from 'chai-almost';

const epsilon = 0.0001;
chai.use(almost(epsilon));


describe('Vec3', () =>
{
    before(() => init());

    let a, b, c, t;

    it('float precision of at least ' + epsilon, () => {
        c = Vec3.alloc(8.127, -16.511, 12.78);
        assert(c.x() - 8.127 < epsilon && c.y() - -16.511 < epsilon && c.z() - 12.78 < epsilon);
    });

    it('alloc()', () => {
        a = Vec3.alloc();
        assert(a.x() == 0 && a.y() == 0 && a.z() == 0);
    });

    it('alloc(x, y, z)', () => {
        b = Vec3.alloc(-10, 15, 31);
        assert(b.x() == -10 && b.y() == 15 && b.z() == 31);
    });

    it('materialize()', () => {
        let ptr = asyl.alloc(2*3*Float32Array.BYTES_PER_ELEMENT);
        let m1 = Vec3.materialize(ptr);
        let m2 = Vec3.materialize(ptr+3*Float32Array.BYTES_PER_ELEMENT);

        m1.set(3.14, -6.28, 56.23);
        m2.set(-78.25, 2.5768, -23.4);
        expect(m1.x()).to.almost.equals(3.14);
        expect(m1.y()).to.almost.equals(-6.28);
        expect(m1.z()).to.almost.equals(56.23);

        expect(m2.x()).to.almost.equals(-78.25);
        expect(m2.y()).to.almost.equals(2.5768);
        expect(m2.z()).to.almost.equals(-23.4);

        let t = asyl.mapFloat32Array(ptr, 6);
        expect(t[0]).to.almost.equals(3.14);
        expect(t[1]).to.almost.equals(-6.28);
        expect(t[2]).to.almost.equals(56.23);

        expect(t[3]).to.almost.equals(-78.25);
        expect(t[4]).to.almost.equals(2.5768);
        expect(t[5]).to.almost.equals(-23.4);
    });

    it('clone()', () => {
        t = b.clone();
        expect(t.addr).to.not.equals(b.addr);
        assert(t.x() == -10 && t.y() == 15 && t.z() == 31);
    });

    it('set(x, y, z)', () => {
        a.set(16, -32, 13);
        assert(a.x() == 16 && a.y() == -32 && a.z() == 13);
    });

    it('set(vec)', () => {
        t.set(a);
        expect(t.data).to.deep.almost.equals(new Float32Array([16, -32, 13]));
    });

    it('setX(x)', () => {
        t.setX(63);
        expect(t.data).to.deep.almost.equals(new Float32Array([63, -32, 13]));
    });

    it('setY(y)', () => {
        t.setY(-127);
        expect(t.data).to.deep.almost.equals(new Float32Array([63, -127, 13]));
    });

    it('setZ(z)', () => {
        t.setZ(45.5);
        expect(t.data).to.deep.almost.equals(new Float32Array([63, -127, 45.5]));
    });

    it('zero()', () => {
        a.zero();
        assert(a.x() == 0 && a.y() == 0 && a.z() == 0);
    });

    it('iszero()', () => {
        assert(a.iszero());
        a.set(63, -127, 45.5);
        assert(!a.iszero());
    });

    it('equals(x, y, z)', () => {
        assert(t.equals(63, -127, 45.5));
        assert(!t.equals(63, -127, 45));
    });

    it('equals(x, y)', () => {
        assert(t.equals(63, -127));
        assert(!t.equals(63, 127));
    });

    it('equals(vec)', () => {
        assert(t.equals(a));
        a.setZ(45);
        assert(!t.equals(a));
    });

    it('almost(vec, epsilon)', () => {
        a.set(63.05, -127.05, 45.55);
        assert(t.almost(a, 0.1));
        assert(!t.almost(a, 0.01));
    });

    it('almost(x, y, epsilon)', () => {
        assert(t.almost(63.05, -127.05, 0.1));
        assert(!t.almost(63.5, -127.05, 0.1));
    });

    it('almost(x, y, z, epsilon)', () => {
        assert(t.almost(63.05, -127.05, 45.55, 0.1));
        assert(!t.almost(63.05, -127.05, 46, 0.1));
    });

    it('neg()', () => {
        t.set(3, -4, 5).neg();
        assert(t.equals(-3, 4, -5));
    });

    it('inv()', () => {
        t.set(2, -4, 8).inv();
        assert(t.equals(0.5, -0.25, 0.125));
    });

    it('abs()', () => {
        t.set(-1, 2, -3).abs();
        assert(t.equals(1, 2, 3));
    });

    it('translate(vec)', () => {
        let v = Vec3.alloc(1, -2, 3);
        t.set(10, 10, 10).translate(v);
        assert(t.equals(11, 8, 13));
        v.free();
    });

    it('translate(dx, dy)', () => {
        t.translate(-1, 2);
        assert(t.equals(10, 10, 13));
    });

    it('translate(dx, dy, dz)', () => {
        t.translate(1, 1, -3);
        assert(t.equals(11, 11, 10));
    });

    it('add(vec)', () => {
        let v = Vec3.alloc(-1, -1, -10);
        t.add(v);
        assert(t.equals(10, 10, 0));
        v.free();
    });

    it('add(dx, dy)', () => {
        t.add(5, -5);
        assert(t.equals(15, 5, 0));
    });

    it('add(dx, dy, dz)', () => {
        t.add(-5, 5, 7);
        assert(t.equals(10, 10, 7));
    });

    it('sub(vec)', () => {
        let v = Vec3.alloc(1, 2, 3);
        t.sub(v);
        assert(t.equals(9, 8, 4));
        v.free();
    });

    it('sub(dx, dy)', () => {
        t.sub(9, 9);
        assert(t.equals(0, -1, 4));
    });

    it('sub(dx, dy, dz)', () => {
        t.sub(-2, -3, 4);
        assert(t.equals(2, 2, 0));
    });

    it('scale(factor)', () => {
        t.set(1, -2, 3).scale(-2);
        assert(t.equals(-2, 4, -6));
    });

    it('scale(vec)', () => {
        let v = Vec3.alloc(2, 0.5, -1);
        t.scale(v);
        assert(t.equals(-4, 2, 6));
        v.free();
    });

    it('scale(fx, fy)', () => {
        t.scale(0.5, -0.5);
        assert(t.equals(-2, -1, 6));
    });

    it('scale(fx, fy, fz)', () => {
        t.scale(-1, 2, 0.5);
        assert(t.equals(2, -2, 3));
    });

    it('floor()', () => {
        t.set(1.7, -1.7, 3.2).floor();
        assert(t.equals(1, -2, 3));
    });

    it('ceil()', () => {
        t.set(1.7, -1.7, 3.2).ceil();
        assert(t.equals(2, -1, 4));
    });

    it('trunc()', () => {
        t.set(1.7, -1.7, 3.2).trunc();
        assert(t.equals(1, -1, 3));
    });

    it('fract()', () => {
        t.set(1.75, -1.75, 3.25).fract();
        assert(t.equals(0.75, -0.75, 0.25));
    });

    it('dot(vec)', () => {
        t.set(1, 2, 3);
        expect(t.dot(t)).to.equals(14);
    });

    it('dot(x, y)', () => {
        expect(t.dot(4, -5)).to.equals(-6);
    });

    it('dot(x, y, z)', () => {
        expect(t.dot(4, -5, 2)).to.equals(0);
    });

    it('cross(vec)', () => {
        let v = Vec3.alloc(0, 1, 0);
        t.set(1, 0, 0).cross(v);
        assert(t.equals(0, 0, 1));
        v.free();
    });

    it('cross(x, y, z)', () => {
        t.set(2, 3, 4).cross(5, 6, 7);
        assert(t.equals(-3, 6, -3));
    });

    it('cross() anticommutative', () => {
        t.set(5, 6, 7).cross(2, 3, 4);
        assert(t.equals(3, -6, 3));
    });

    it('mag2()', () => {
        t.set(2, -3, 6);
        expect(t.mag2()).to.equals(49);
    });

    it('mag()', () => {
        expect(t.mag()).to.equals(7);
    });

    it('unit()', () => {
        t.unit();
        assert(t.almost(2/7, -3/7, 6/7, epsilon));
    });

    it('unit() when all zeroes', () => {
        c.zero().unit();
        assert(c.equals(0, 0, 0));
    });

    it('major()', () => {
        c.set(2, -5, 3).major();
        assert(c.equals(0, -5, 0));
    });

    it('minor()', () => {
        c.set(2, -5, 3).minor();
        assert(c.equals(2, 0, 0));
    });

    it('sign()', () => {
        c.set(5, -3, 0.5).sign();
        assert(c.equals(1, -1, 1));
    });

    it('sign() when all zeroes', () => {
        c.zero().sign();
        assert(c.equals(0, 0, 0));
    });

    it('toString()', () => {
        c.set(1, 2, 3);
        expect(c+'').to.equals('(1, 2, 3)');
    });

    it('free()', () => {
        let v = Vec3.alloc(1, 2, 3);
        v.free();
    });
});
