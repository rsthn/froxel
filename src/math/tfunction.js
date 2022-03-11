/*
**	math/tfunction.js
**
**	Copyright (c) 2016-2021, RedStar Technologies, All rights reserved.
**	https://rsthn.com/
**
**	THIS LIBRARY IS PROVIDED BY REDSTAR TECHNOLOGIES "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES,
**	INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A 
**	PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL REDSTAR TECHNOLOGIES BE LIABLE FOR ANY
**	DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT 
**	NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; 
**	OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, 
**	STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE
**	USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import { Class } from 'rinn';

//:/**
//: * 	Describes a function dependent of time (t-function), multiple sampling points (t,y) can be added, this class
//: * 	provides methods to access any value for a given time, or the integral of a time range.
//: */

//!class TFunction

const TFunction = Class.extend
({
	className: 'TFunction',

	/**
	 * 	Contains the time values `t` in the t-function, for each time value there is a corresponding `y` and `f`.
	 * 	!t: Array<number>;
	 */
	t: null,

	/**
	 * 	Contains the values (y) for each of the time values (t) in the t-function.
	 * 	!y: Array<number>;
	 */
	y: null,

	/**
	 * 	Contains the easing function (f) for each of the time values (t).
	 * 	!f: Array< (t:number) => number >;
	 */
	f: null,

	/**
	 * 	Constructs the time function.
	 * 	@param value - Initial value of the t-function for t=0, defaults to 0.
	 * 	!constructor (value?: number);
	 */
	__ctor: function (value=0)
	{
		this.reset(value);
	},

	/**
	 * 	Resets the t-function to its initial state.
	 * 	@param value - Initial value of the t-function for t=0. Default is 0.
	 * 	!reset (value?: number) : TFunction;
	 */
	reset: function (value=0)
	{
		this.t = [0];
		this.y = [value];
		this.f = [null];

		return this;
	},

	/**
	 * 	Resets the t-function and copies data from the specified source.
	 * 	@param src - Source TFunction.
	 * 	@param t0 - Initial time, if none specified will be assumed to be the min time of the source.
	 * 	@param t1 - Final time, if none specified will be assumed to the the max time of the source.
	 * 	@returns A TFunction or `null` if the specified time range could not be resolved.
	 * 	!copyFrom (src: TFunction, t0: number, t1: number) : TFunction;
	 */
	copyFrom: function (src, t0, t1)
	{
		this.t = [];
		this.y = [];
		this.f = [];

		if (t0 == null && t1 == null)
		{
			for (let i = 0; i < src.t.length; i++)
			{
				this.t.push(src.t[i]);
				this.y.push(src.y[i]);
				this.f.push(src.f[i]);
			}

			return this;
		}

		if (t0 == null) t0 = src.t[0];
		if (t1 == null) t1 = src.t[src.t.length-1];

		if (t0 < src.t[0]) t0 = src.t[0];

		let i0 = src.find(t0);
		let i1 = src.find(t1);

		if (i0 == null) return null;
		if (i1 == null) return null;

		if (src.t[i0] != t0) {
			this.set(t0, src.getAt(t0), src.f[i0]);
			i0++;
		}

		for (let i = i0; i <= i1; i++)
			this.set(src.t[i], src.y[i], src.f[i]);

		if (src.t[i1] != t1)
		{
			let dt = (t1 - src.t[i1]) / Math.ceil(Math.log(t1 - src.t[i1]));
			let t = this.t[this.t.length-1];

			if (dt <= 0) dt = 1;
dt = t1-t; // Force just one step.
			while (t != t1)
			{
				if (t+dt > t1)
					dt = t1 - t;

				t += dt;
				this.set(float4(t), src.getAt(t), src.f[i1]);
			}
		}
	
		return this;
	},

	/**
	 * 	Creates a new t-function with the same values as the current one.
	 * 	@param t0 - Initial time, if none specified will be assumed to be the min time of the source.
	 * 	@param t1 - Final time, if none specified will be assumed to the the max time of the source.
	 * 	!clone (t0: number, t1: number) : TFunction;
	 */
	clone: function (t0, t1)
	{
		return (new TFunction()).copyFrom(this, t0, t1);
	},

	/**
	 * 	Returns the maximum time value in the t-function plus the given delta.
	 * 	@param delta - Delta value to add to the result.
	 * 	!endTime (delta?: number) : number;
	 */
	endTime: function (delta=0)
	{
		return this.t[this.t.length-1] + delta;
	},

	/**
	 * 	Returns the start time of the t-function plus the given delta.
	 * 	@param delta - Delta value to add to the result.
	 * 	!startTime (delta?: number) : number;
	 */
	startTime: function (delta=0)
	{
		return this.t[0] + delta;
	},

	/**
	 * 	Finds the index of a sampling point whose sampling range contains the given time.
	 * 	@param time - Time value to search.
	 * 	@returns Index of the sampling point or `null` if not within range.
	 * 	!find (time: number) : number|null;
	 */
	find: function (time)
	{
		if (time < this.t[0])
			return null;

		const n = this.t.length;

		for (let i = 1; i < n; i++)
		{
			if (time < this.t[i])
				return i-1;
		}

		return n-1;
	},

	/**
	 * 	Sets a sampling point (t,y).
	 * 	@param t - Time value of the sampling point.
	 * 	@param y - Y-value for the given t.
	 * 	@param f - Easing function.
	 * 	!set (t: number, y: number, f?: (t: number) => number) : TFunction;
	 */
	set: function (t, y, f=null)
	{
		let i = this.find(t);
		if (i == null) return false;

		if (this.t[i] == t)
		{
			this.y[i] = y;
			if (f != null) this.f[i] = f;
		}
		else
		{
			i++;
			this.t.splice(i, 0, t);
			this.y.splice(i, 0, y);
			this.f.splice(i, 0, f);
		}

		return true;
	},

	/**
	 * 	Returns the last Y-value in the t-function.
	 *	!get() : number;
	 */
	get: function ()
	{
		return this.y[this.y.length-1];
	},

	/**
	 * 	Returns the Y-value in the t-function corresponding to some point in time (t).
	 * 	@param t - Time (t) value.
	 * 	!getAt (t: number) : number;
	 */
	getAt: function (t)
	{
		let i0 = this.find(t);
		if (i0 == null) return 0;

		let i1 = i0 + 1;

		if (this.t[i0] == t || i1 >= this.t.length || this.y[i0] == this.y[i1] || this.f[i0] == null)
			return this.y[i0];

		if (this.f[i0] == null)
			return this.y[i0];

		let x = t;
		let x0 = this.t[i0];
		let x1 = this.t[i1];
		let y0 = this.y[i0];
		let y1 = this.y[i1];

		t = (x - x0) / (x1 - x0);
		t = this.f[i0](t);

		return t*y1 + (1-t)*y0;
	},

	/**
	 * 	Returns the approximate definite integral of the t-function for the given time range.
	 * 	@param t0 - Initial time value, defaults to minimum time of the t-function.
	 * 	@param t1 - Final time value, defaults to the maximum time of the t-function.
	 * 	@param c0 - Constant of integration, defaults to 0.
	 * 	@returns Definite integral of t-function from t0 to t1.
	 * 	!integral (t0?: number, t1?: number, c0?: number) : number;
	 */
	integral: function (t0=null, t1=null, c0=0)
	{
		if (t0 == null) t0 = this.t[0];
		if (t1 == null) t1 = this.t[this.t.length-1];

		if (t0 < this.t[0]) t0 = this.t[0];

		let sign = 1;

		if (t0 > t1) {
			let tmp; tmp = t0; t0 = t1; t1 = tmp;
			sign = -1;
		}

		let accum = c0;

		for (let time = t0; time < t1; )
		{
			let i0 = this.find(time);
			if (i0 == null) return 0;

			let i1 = i0 + 1;

			let x0 = Math.max(this.t[i0], time);
			let x1 = Math.min(i1 < this.t.length ? this.t[i1] : t1, t1);

			let y0 = this.getAt(x0);
			let y1 = this.getAt(x1);

			let dx = x1 - x0;
			let dy = y1 - y0;

			if (this.f[i0] == null)
				accum += y0*dx;
			else
				accum += 0.5*dy*(x1+x0) - x0*dy + y0*dx;

			time += dx;
		}

		return sign*accum;
	},

	/**
	 * 	Returns the approximate definite second integral of the t-function for the given time range.
	 * 	@param t0 - Initial time value, defaults to minimum time of the t-function.
	 * 	@param t1 - Final time value, defaults to the maximum time of the t-function.
	 * 	@param c0 - Constant of integration, defaults to 0.
	 * 	@returns Definite second integral of t-function from t0 to t1.
	 * 	!integral (t0?: number, t1?: number, c0?: number) : number;
	 */
	second_integral: function (t0=null, t1=null, c0=0)
	{
		if (t0 == null) t0 = this.t[0];
		if (t1 == null) t1 = this.t[this.t.length-1];

		let a0 = TFunction.Temp1.copyFrom(this, this.t[0], t0).integrate(c0).integral();
		let a1 = TFunction.Temp2.copyFrom(this, this.t[0], t1).integrate(c0).integral();

		return a1 - a0;
	},

	/**
	 * 	Transforms the t-function to its integral. For every sampling range in the t-function their Y-value will be set to the integral
	 * 	of the sampling range plus any previous integrals.
	 *
	 * 	@param c0 - Constant of integration. Defaults to 0.
	 * 	!integrate (c0?: number) : TFunction;
	 */
	integrate: function (c0=0)
	{
		let y = [];

		y.push(c0);

		for (let i = 1; i < this.t.length; i++)
			y.push(y[i-1] + this.integral(this.t[i-1], this.t[i]));

		this.y = y;
		return this;
	},

	/**
	 * 	Transforms the t-function Y-values to the accumulated sum of each Y-value plus the given c0.
	 * 	@param c0 - Initial value (defaults to 0).
	 * 	!accumulate(c0?: number) : TFunction;
	 */
	accumulate: function (c0=0)
	{
		this.y[0] += c0;

		for (let i = 1; i < this.t.length; i++)
			this.y[i] += this.y[i-1];

		return this;
	},

	/**
	 * 	Removes all sampling-points located before the given index.
	 *	!chopLeft (i: number) : TFunction;
	 */
	chopLeft: function (i)
	{
		this.t.splice(0, i);
		this.f.splice(0, i);
		this.y.splice(0, i);

		return this;
	},

	/**
	 * 	Removes all sampling-points located after the given index.
	 * 	!chopRight (i: number) : TFunction;
	 */
	chopRight: function (i)
	{
		this.t.splice(i+1, this.t.length-i-1);
		this.f.splice(i+1, this.f.length-i-1);
		this.y.splice(i+1, this.y.length-i-1);

		return this;
	},

	/**
	 * 	Maps the Y-value to other Y-values using the specified mapping function.
	 * 	@param fn - Receives parameters `y` (y-value), `t` (t-value), and `i` (index).
	 * 	!map (fn: (y: number, t: number, i: number) => number) : TFunction;
	 */
	map: function (fn)
	{
		for (let i = 0; i < this.y.length; i++)
			this.y[i] = fn (this.y[i], this.t[i], i);

		return this;
	},

	/**
	 * 	Returns a string representation of the variable state.
	 * 	!toString (c0?: number) : string;
	 */
	toString: function(c0=0)
	{
		let s = '';
		let n = 10;

		const pad = function (value, n, char)
		{
			value = value.toString();

			if (char == null) char = ' ';
			char = char[0];

			while (value.length < n)
				value += char;

			return value;
		};

		s += '\n';
		s += pad(' Time', n) + ' ' + pad(' Value', n) + ' ' + pad(' Integral', n) + '\n';
		s += pad('', n, '-') + ' ' + pad('', n, '-') + ' ' + pad('', n, '-') + '\n';

		for (let i = 0; i < this.t.length; i++)
		{
			s += pad(' '+float4(this.t[i]), n) + ' ' + pad(' '+float4(this.y[i]), n) + ' ' + pad(' '+float4(this.integral(this.t[0], this.t[i], c0)), n) + '\n';
		}

		return s;
	}
});

TFunction.Temp1 = new TFunction();
TFunction.Temp2 = new TFunction();

export default TFunction;
