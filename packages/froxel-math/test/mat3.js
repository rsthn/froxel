
import { Mat3 } from '../dist/froxel-math.m.js';
import { default as chai, expect } from 'chai';
import { asyl } from 'asyl';
import almost from 'chai-almost';

const epsilon = 0.0001;
chai.use(almost(epsilon));


describe('Mat3', () =>
{
	let a, b, c, t;

	it('alloc()', () => {
		a = Mat3.alloc();
		b = Mat3.alloc();
		c = Mat3.alloc();
		t = Mat3.alloc();
		expect(a.addr).to.not.equals(0);
		expect(b.addr).to.not.equals(0);
		expect(c.addr).to.not.equals(0);
		expect(t.addr).to.not.equals(0);
	});

	it('materialize()', () => {
		let ptr = asyl.alloc(2*9*Float32Array.BYTES_PER_ELEMENT);
		let m1 = Mat3.materialize(ptr);
		let m2 = Mat3.materialize(ptr+9*Float32Array.BYTES_PER_ELEMENT);

		m1.col(0, 1, 2, 3);
		m1.col(1, 2, 9, 8);
		m1.col(2, 5, 6, 7);

		m2.row(0, 1, 2, 3);
		m2.row(1, 2, 9, 8);
		m2.row(2, 5, 6, 7);

		expect(m1.data).to.deep.almost.equals(new Float32Array([ 1, 2, 3, 2, 9, 8, 5, 6, 7 ]));
		expect(m2.data).to.deep.almost.equals(new Float32Array([ 1, 2, 5, 2, 9, 6, 3, 8, 7 ]));

		let t1 = asyl.mapFloat32Array(ptr, 9);
		let t2 = asyl.mapFloat32Array(ptr+9*Float32Array.BYTES_PER_ELEMENT, 9);
		expect(t1).to.deep.almost.equals(new Float32Array([ 1, 2, 3, 2, 9, 8, 5, 6, 7 ]));
		expect(t2).to.deep.almost.equals(new Float32Array([ 1, 2, 5, 2, 9, 6, 3, 8, 7 ]));
	});

	it('float[9]', () => {
		expect(a.data.length).to.equals(9);
	});

	it('fill(number)', () => {
		a.fill(1.5);
		expect(a.data).to.deep.almost.equals(new Float32Array([ 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5 ]));
	});

	it('set(number)', () => {
		b.fill(8).set(1.0);
		expect(b.data).to.deep.almost.equals(new Float32Array([ 1, 8, 8, 8, 1, 8, 8, 8, 1 ]));
	});

	it('identity()', () => {
		b.identity();
		expect(b.data).to.deep.almost.equals(new Float32Array([ 1, 0, 0, 0, 1, 0, 0, 0, 1 ]));
	});

	it('set(matrix)', () => {
		c.set(a);
		expect(c.data).to.deep.almost.equals(new Float32Array([ 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5 ]));
	});

	it('scale(number)', () => {
		c.scale(-5.0);
		expect(c.data).to.deep.almost.equals(new Float32Array([ -7.5, -7.5, -7.5, -7.5, -7.5, -7.5, -7.5, -7.5, -7.5 ]));
	});

	it('scale(number, number)', () => {
		c.scale(10.0, -10.0);
		expect(c.data).to.deep.almost.equals(new Float32Array([ -75, -75, -75, 75, 75, 75, -7.5, -7.5, -7.5 ]));
	});

	it('transpose()', () => {
		c.transpose();
		expect(c.data).to.deep.almost.equals(new Float32Array([ -75, 75, -7.5, -75, 75, -7.5, -75, 75, -7.5 ]));
	});

	it('col(number, number, number, number)', () => {
		a.col(0, 1, 2, 3);
		a.col(1, 2, 9, 8);
		a.col(2, 5, 6, 7);
		expect(a.data).to.deep.almost.equals(new Float32Array([ 1, 2, 3, 2, 9, 8, 5, 6, 7 ]));
	});

	it('row(number, number, number, number)', () => {
		b.set(a);
		b.row(0, 1, 2, 3);
		b.row(1, 2, 9, 8);
		b.row(2, 5, 6, 7);
		expect(b.data).to.deep.almost.equals(new Float32Array([ 1, 2, 5, 2, 9, 6, 3, 8, 7 ]));
	});

	it('det()', () => {
		expect(a.det()).to.equals(-32);
	});

	it('append(matrix)', () => {
		b.identity().scale(2.0, -2.0);
		a.append(b);
		expect(a.data).to.deep.almost.equals(new Float32Array([ 2, 4, 6, -4, -18, -16, 5, 6, 7 ]));
	});

	it('translate(number, number)', () => {
		a.translate(100, -100);
		expect(a.data).to.deep.almost.equals(new Float32Array([ 2, 4, 6, -4, -18, -16, 605, 2206, 2207 ]));
	});

	it('rotate(number)', () => {
		a.rotate(Math.PI);
		expect(a.data).to.deep.almost.equals(new Float32Array([ -2, -4, -6, 4, 18, 16, 605, 2206, 2207 ]));
	});
});
