/*
**	system/random.js
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

const rol16 = function (value, n) { return ((value << n) | ((value >>> (16 - n)) & ((1 << n) - 1))) & 0xFFFF; };
const ror16 = function (value, n) { return ((value >>> n) | ((value & ((1 << n) - 1)) << (16 - n))) & 0xFFFF; };
const add16 = function (value, x) { return (value + x) & 0xFFFF; };
const sub16 = function (value, x) { return (value - x) & 0xFFFF; };
const xor16 = function (value, x) { return (value ^ x) & 0xFFFF; };

//!class Random

const Random = Class.extend
({
	/**
	 * 	Seed value of the generator. Remains constant throughout the life of the generator.
	 * 	!seed: number;
	 */
	seed: 0,

	/**
	 * 	Last value returned by the generator.
	 * 	!last: number;
	 */
	last: 0,

	a: 0, b: 0,

	/**
	 * 	Initializes the instance of the pseudo-random number generator.
	 * 	@param seed - Value to seed the random number generator. If none provided, default one (0xDAE7A5D3) will be used.
	 *
	 *	!constructor (seed?: number);
	 */
	__ctor: function(seed=0xDAE7A5D3)
	{
		this.setSeed(seed);
	},

	/**
	 * 	Sets the seed of the pseudo-random number generator.
	 * 	@param value - Seed value to use (32-bit unsigned integer).
	 *
	 *	!setSeed (value: number) : Random;
	 */
	setSeed: function(value)
	{
		this.seed = value;

		this.a = (value >> 16) & 0xFFFF;
		this.b = (value >> 0) & 0xFFFF;

		this.last = ((this.a >> 4) & 0x00FF) | ((this.b << 4) & 0xFF00);
		return this;
	},

	/**
	 * 	Generates a 16-bit unsigned integer.
	 *	!nextInt16 () : number;
	 */
	nextInt16: function ()
	{
		let value = this.last;

		value = add16(value, this.a);
		value = xor16(value, 0x1515);

		this.a = xor16(this.a, 0x51A1);
		this.a = sub16(this.a, this.b);
		this.b = xor16(this.b, 0x1A15);

		value = rol16(value, this.b & 0x0F);

		return ((this.last = value) & 0xFFFF);
	},

	/**
	 * 	Generates an 8-bit unsigned integer.
	 * 	!nextInt8 () : number;
	 */
	nextInt8: function ()
	{
		return this.nextInt16() & 0xFF;
	},

	/**
	 * 	Generates a floating point number between 0 an 1 (inclusive).
	 * 	!nextFloat () : number;
	 */
	nextFloat: function ()
	{
		return this.nextInt16() / 0xFFFF;
	}
});

export default Random;
