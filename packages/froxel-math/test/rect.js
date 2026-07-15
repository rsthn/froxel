
import assert from 'assert';
import { init, Rect, Vec2, module } from '../dist/froxel-math.m.js';
import { asyl } from 'asyl';
import { default as chai, expect } from 'chai';
import almost from 'chai-almost';

const epsilon = 0.0001;
chai.use(almost(epsilon));

describe('Rect', () =>
{
    before(() => init());

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

    it('materialize()', () => {
        let ptr = asyl.alloc(2*6*Float32Array.BYTES_PER_ELEMENT);
        let m1 = Rect.materialize(ptr);
        let m2 = Rect.materialize(ptr+6*Float32Array.BYTES_PER_ELEMENT);

        m1.set(-78.25, 2.5768, -23.4, 12.55);
        m2.set(3.14, -6.28, 56.23, -9.78);
        expect(m1.x1()).to.almost.equals(-78.25);
        expect(m1.y1()).to.almost.equals(2.5768);
        expect(m1.x2()).to.almost.equals(-23.4);
        expect(m1.y2()).to.almost.equals(12.55);

        expect(m2.x1()).to.almost.equals(3.14);
        expect(m2.y1()).to.almost.equals(-6.28);
        expect(m2.x2()).to.almost.equals(56.23);
        expect(m2.y2()).to.almost.equals(-9.78);

        let t = asyl.mapFloat32Array(ptr, 2*6);
        expect(t[0]).to.almost.equals(-78.25);
        expect(t[1]).to.almost.equals(2.5768);
        expect(t[2]).to.almost.equals(-23.4);
        expect(t[3]).to.almost.equals(12.55);

        expect(t[6]).to.almost.equals(3.14);
        expect(t[7]).to.almost.equals(-6.28);
        expect(t[8]).to.almost.equals(56.23);
        expect(t[9]).to.almost.equals(-9.78);
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

    it('extend(x, y)', () => {
        t.set(0, 0, 10, 10).extend(20, 5);
        assert(t.equals(0, 0, 20, 10));
        t.extend(-5, -8);
        assert(t.equals(-5, -8, 20, 10));
        assert(t.cx() == 7.5 && t.cy() == 1);
    });

    it('extend(vec)', () => {
        let v = Vec2.alloc(200, -50);
        t.extend(v);
        assert(t.equals(-5, -50, 200, 10));
        v.free();
    });

    it('extend(x, y) after reset()', () => {
        t.reset().extend(10, 20).extend(-5, 8);
        assert(t.equals(-5, 8, 10, 20));
    });

    it('translate(dx, dy)', () => {
        t.set(0, 0, 10, 10).translate(5, -5);
        assert(t.equals(5, -5, 15, 5));
        assert(t.cx() == 10 && t.cy() == 0);
    });

    it('translate(vec)', () => {
        let v = Vec2.alloc(-5, 5);
        t.translate(v);
        assert(t.equals(0, 0, 10, 10));
        v.free();
    });

    it('center(x, y)', () => {
        t.set(0, 0, 10, 10).center(100, 50);
        assert(t.equals(95, 45, 105, 55));
        assert(t.cx() == 100 && t.cy() == 50);
    });

    it('center(x, y, normalized)', () => {
        t.set(0, 0, 10, 10).center(1, 1, true);
        assert(t.equals(5, 5, 15, 15));
        assert(t.cx() == 10 && t.cy() == 10);
    });

    it('equals(x1, y1, x2, y2)', () => {
        t.set(1, 2, 3, 4);
        assert(t.equals(1, 2, 3, 4));
        assert(!t.equals(1, 2, 3, 5));
    });

    it('equals(rect)', () => {
        b.set(1, 2, 3, 4);
        assert(t.equals(b));
        b.set(0, 2, 3, 4);
        assert(!t.equals(b));
    });

    it('contains(x1, y1, x2, y2)', () => {
        t.set(0, 0, 100, 100);
        assert(t.contains(10, 10, 20, 20));
        assert(t.contains(0, 0, 100, 100));
        assert(!t.contains(90, 90, 110, 110));
    });

    it('contains(rect)', () => {
        b.set(25, 25, 75, 75);
        assert(t.contains(b));
        b.set(-1, 25, 75, 75);
        assert(!t.contains(b));
    });

    it('contains(vec)', () => {
        let v = Vec2.alloc(50, 50);
        assert(t.contains(v));
        v.set(150, 50);
        assert(!t.contains(v));
        v.free();
    });

    it('contains(vec, epsilon)', () => {
        let v = Vec2.alloc(100.5, 100);
        assert(t.contains(v, 1.0));
        v.free();
    });

    it('contains(x, y)', () => {
        assert(t.contains(50, 50));
        assert(t.contains(100, 100));
        assert(!t.contains(100.5, 100));
    });

    it('contains(x, y, epsilon)', () => {
        assert(t.contains(100.5, 100, 1.0));
        assert(!t.contains(102, 100, 1.0));
    });

    it('union(x1, y1, x2, y2)', () => {
        t.set(0, 0, 10, 10).union(5, 5, 20, 20);
        assert(t.equals(0, 0, 20, 20));
    });

    it('union(rect)', () => {
        b.set(-10, -10, 5, 5);
        t.union(b);
        assert(t.equals(-10, -10, 20, 20));
    });

    it('intersects(x1, y1, x2, y2)', () => {
        t.set(0, 0, 10, 10);
        assert(t.intersects(5, 5, 15, 15));
        assert(!t.intersects(20, 20, 30, 30));
    });

    it('intersects(rect)', () => {
        b.set(9, 9, 30, 30);
        assert(t.intersects(b));
        b.set(10, 10, 30, 30);
        assert(!t.intersects(b));
    });

    it('intersection(x1, y1, x2, y2)', () => {
        t.set(0, 0, 10, 10);
        assert(t.intersection(5, 5, 20, 20));
        assert(t.equals(5, 5, 10, 10));
    });

    it('intersection(rect)', () => {
        b.set(0, 0, 7, 7);
        assert(t.intersection(b));
        assert(t.equals(5, 5, 7, 7));
    });

    it('intersection() with disjoint rect', () => {
        t.set(0, 0, 10, 10);
        assert(!t.intersection(20, 20, 30, 30));
    });

    it('resize(width, height)', () => {
        t.set(0, 0, 10, 10).resize(20, 30);
        assert(t.equals(-5, -10, 15, 20));
        assert(t.cx() == 5 && t.cy() == 5);
    });

    it('resize(width, height, topLeft)', () => {
        t.set(2, 3, 10, 10).resize(4, 6, true);
        assert(t.equals(2, 3, 6, 9));
    });

    it('resize(width, height, topLeft, normalized)', () => {
        t.set(0, 0, 10, 20).resize(0.5, 0.5, true, true);
        assert(t.equals(0, 0, 5, 10));
    });

    it('resizeBy(dWidth, dHeight)', () => {
        t.set(0, 0, 10, 10).resizeBy(2, 4);
        assert(t.equals(-1, -2, 11, 12));
    });

    it('resizeBy(dWidth, dHeight, topLeft)', () => {
        t.set(0, 0, 10, 10).resizeBy(2, 4, true);
        assert(t.equals(0, 0, 12, 14));
    });

    it('width() and height()', () => {
        t.set(3, 4, 10, 20);
        expect(t.width()).to.equals(7);
        expect(t.height()).to.equals(16);
    });

    it('isRight()', () => {
        t.set(0, 0, 10, 10);
        assert(t.isRight());
        t.set(10, 0, 0, 10);
        assert(!t.isRight());
    });

    it('area()', () => {
        t.set(0, 0, 10, 20);
        expect(t.area()).to.equals(200);
    });

    it('area(strict)', () => {
        t.set(10, 0, 0, 20);
        expect(t.area()).to.equals(-200);
        expect(t.area(true)).to.equals(0);
    });

    it('floor()', () => {
        t.set(1.7, -1.7, 3.2, -3.2).floor();
        expect(t.data).to.deep.almost.equals(new Float32Array([ 1, -2, 3, -4, 2, -3 ]));
    });

    it('ceil()', () => {
        t.set(1.7, -1.7, 3.2, -3.2).ceil();
        expect(t.data).to.deep.almost.equals(new Float32Array([ 2, -1, 4, -3, 3, -2 ]));
    });

    it('trunc()', () => {
        t.set(1.7, -1.7, 3.2, -3.2).trunc();
        expect(t.data).to.deep.almost.equals(new Float32Array([ 1, -1, 3, -3, 2, -2 ]));
    });

    it('fract()', () => {
        t.set(1.7, -1.7, 3.2, -3.2).fract();
        expect(t.data).to.deep.almost.equals(new Float32Array([ 0.7, -0.7, 0.2, -0.2, 0.45, -0.45 ]));
    });

    it('toString()', () => {
        t.set(1, 2, 3, 4);
        expect(t+'').to.equals('(1, 2, 3, 4)');
    });

    it('free()', () => {
        let r = Rect.alloc(0, 0, 5, 5);
        r.free();
    });
});
