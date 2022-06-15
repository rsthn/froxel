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

const XOR = (value, x) => (value ^ x) & 0x7FFFFFFF;
const SHR = (value, x) => (value >>> x)  & 0x7FFFFFFF;
const SHL = (value, x) => (value << x) & 0x7FFFFFFF;

/**
 * Random number generator based on the WELL algorithm family.
 */

//!class Random

const Random = Class.extend
({
	/**
	 * State of the generator.
	 */
	state: null,

	/**
	 * Index of the next state value.
	 */
	index: 0,

	/**
	 * 	Seed value of the generator. Remains constant throughout the life of the generator.
	 * 	!readonly seed: number;
	 */
	seed: 0,

	/**
	 * 	Initializes the instance of the pseudo-random number generator.
	 * 	@param seed - Value to seed the random number generator. If none provided, default one (0xDAE7A5D3) will be used.
	 *
	 *	!constructor (seed?: number);
	 */
	__ctor: function(seed=0xDAE7A5D3)
	{
		this.index = 0;
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

		this.state = [
			0xA5F7310C, 0xEF731CF3, 0xFA784322, 0x7834FC31,
			0xD9AF7813, 0xDE78AD13, 0x783F3418, 0xAA123176,
			0x871CF4D1, 0x73412FAB, 0xBAE6C710, 0x06F73481,
			0x8910CF15, 0x927CF813, 0xBCF7834F, 0x73F61193
		];

		for (let i = 0; i < this.state.length; i++)
			this.state[i] = XOR(this.state[i], this.seed);

		return this;
	},

	/**
	 * 	Generates a 32-bit unsigned integer.
	 *	!nextInt32 () : number;
	 */
	nextInt32: function ()
	{
		let a, b, c, d;

		a = this.state[this.index];
		c = this.state[(this.index + 13) & 15];
		b = XOR(XOR(XOR(a, c), SHL(a, 16)), SHL(c, 15));
		c = this.state[(this.index + 9) & 15];
		c = XOR(c, SHR(c, 11));
		a = this.state[this.index] = XOR(b, c);
		d = XOR(a, SHL(a, 5) & 0xDA442D24);

		this.index = (this.index + 15) & 15;
		a = this.state[this.index];

		this.state[this.index] = XOR(XOR(XOR(XOR(XOR(a, b), d), SHL(a, 2)), SHL(b, 18)), SHL(c, 28));
		return this.state[this.index] & 0x7FFFFFFF;
	},

	/**
	 * 	Generates a 16-bit unsigned integer.
	 *	!nextInt16 () : number;
	 */
	nextInt16: function ()
	{
		return this.nextInt32() & 0xFFFF;
	},

	/**
	 * 	Generates an 8-bit unsigned integer.
	 * 	!nextInt8 () : number;
	 */
	nextInt8: function ()
	{
		return this.nextInt32() & 0xFF;
	},

	/**
	 * 	Generates a floating point number between 0 an 1 (inclusive).
	 * 	!nextFloat () : number;
	 */
	nextFloat: function ()
	{
		return this.nextInt32() / 0x7FFFFFFF;
	}
});

export default Random;
