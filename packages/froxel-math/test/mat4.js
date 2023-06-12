
import { Mat4 } from '../dist/froxel-math.m.js';
import { default as chai, expect } from 'chai';
import almost from 'chai-almost';

const epsilon = 0.0001;
chai.use(almost(epsilon));


describe('Mat4', () =>
{
	let a, b, c, t;

	it('alloc()', () => {
		a = Mat4.alloc();
		b = Mat4.alloc();
		c = Mat4.alloc();
		t = Mat4.alloc();
		expect(a.addr).to.not.equals(0);
		expect(b.addr).to.not.equals(0);
		expect(c.addr).to.not.equals(0);
		expect(t.addr).to.not.equals(0);
	});

	it('float[16]', () => {
		expect(a.data.length).to.equals(16);
	});

	it('fill(number)', () => {
		a.fill(1.5);
		expect(a.data).to.deep.almost.equals(new Float32Array([ 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5 ]));
	});

	it('set(number)', () => {
		b.fill(8).set(1.0);
		expect(b.data).to.deep.almost.equals(new Float32Array([ 1, 8, 8, 8,  8, 1, 8, 8,  8, 8, 1, 8,  8, 8, 8, 1 ]));
	});

	it('identity()', () => {
		b.identity();
		expect(b.data).to.deep.almost.equals(new Float32Array([ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ]));
	});

	it('set(matrix)', () => {
		for (let i = 0; i < 16; i++) b.data[i] = i+1;
		c.set(b);
		expect(c.data).to.deep.almost.equals(new Float32Array([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ]));
	});

	it('scale(number)', () => {
		c.scale(-5.0);
		expect(c.data).to.deep.almost.equals(new Float32Array([ -5, -10, -15, -20, -25, -30, -35, -40, -45, -50, -55, -60, -65, -70, -75, -80 ]));
	});

	it('scale(number, number, number)', () => {
		c.scale(10.0, -10.0, 2.0);
		expect(c.data).to.deep.almost.equals(new Float32Array([ -50, -100, -150, -200, 250, 300, 350, 400, -90, -100, -110, -120, -65, -70, -75, -80 ]));
	});

	it('transpose()', () => {
		c.transpose();
		expect(c.data).to.deep.almost.equals(new Float32Array([ -50, 250, -90, -65, -100, 300, -100, -70, -150, 350, -110, -75, -200, 400, -120, -80 ]));
	});

	it('col(number, number, number, number, number)', () => {
		a.col(0, 1, 2, 3, 4);
		a.col(1, 5, 16, 7, 8);
		a.col(2, 9, 10, 7, 12);
		a.col(3, 13, 14, 15, 16);
		expect(a.data).to.deep.almost.equals(new Float32Array([ 1, 2, 3, 4, 5, 16, 7, 8, 9, 10, 7, 12, 13, 14, 15, 16 ]));
	});

	it('row(number, number, number, number, number)', () => {
		b.set(a);
		b.row(0, 1, 2, 3, 4);
		b.row(1, 5, 6, 7, 8);
		b.row(2, 9, 10, 11, 12);
		b.row(3, 13, 14, 15, 16);
		expect(b.data).to.deep.almost.equals(new Float32Array([ 1, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15, 4, 8, 12, 16 ]));
	});

	it('det()', () => {
		expect(a.det()).to.equals(1440);
	});

	it('append(matrix)', () => {
		b.identity().scale(2.0, -2.0, 2.5);
		a.append(b);
		expect(a.data).to.deep.almost.equals(new Float32Array([ 2, 4, 6, 8, -10, -32, -14, -16, 22.5, 25, 17.5, 30, 13, 14, 15, 16 ]));
	});

	it('translate(number, number, number)', () => {
		a.translate(100, -100, 50);
		expect(a.data).to.deep.almost.equals(new Float32Array([ 2, 4, 6, 8,  -10, -32, -14, -16,  22.5, 25, 17.5,  30,  2338, 4864, 2890, 3916 ]));
	});

	it('rotateX(number)', () => {
		b.identity().rotateX(0.78);
		expect(b.data).to.deep.almost.equals(new Float32Array([ 1.0, 0.0, 0.0, 0.0, 0.0, 0.710914, 0.703279, 0.0, 0.0, -0.703279, 0.710914, 0.0, 0.0, 0.0, 0.0, 1.0 ]));
	});

	it('rotateY(number)', () => {
		b.identity().rotateY(1.26);
		expect(b.data).to.deep.almost.equals(new Float32Array([ 0.305817, 0.0, -0.95209, 0.0,   0.0, 1.0, 0.0, 0.0,  0.95209, 0.0, 0.305817, 0.0,  0.0, 0.0, 0.0, 1.0 ]));
	});

	it('rotateZ(number)', () => {
		b.identity().rotateZ(-2.33);
		expect(b.data).to.deep.almost.equals(new Float32Array([ -0.688344, -0.725384, 0.0, 0.0, 0.725384, -0.688344, 0.0, 0.0,  0.0, 0.0, 1.0, 0.0,  0.0, 0.0, 0.0, 1.0 ]));
	});
});
