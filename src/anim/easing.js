/*
**	froxel/anim/easing.js
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

/**
**	Collection of useful easing functions.
*/

//!namespace Easing

const Easing =
{
	/* ******************************************** */
	//!namespace Linear
	Linear:
	{
		/**
		 * 	!function IN (t: number) : number;
		 */
		IN: function (t)
		{
			return t;
		},

		/**
		 * 	!function OUT (t: number) : number;
		 */
		OUT: function (t)
		{
			return t;
		},

		/**
		 * 	!function IN_OUT (t: number) : number;
		 */
		IN_OUT: function (t)
		{
			return t;
		}
	},
	//!/namespace

	/* ******************************************** */
	//!namespace Back
	Back:
	{
		k: 1.70158,

		/**
		 * 	!function IN (t: number, k?: number) : number;
		 */
		IN: function (t, k=null)
		{
			if (k === null) k = Easing.Back.k;
			return t*t*((k+1)*t - k);
		},

		/**
		 * 	!function OUT (t: number, k?: number) : number;
		 */
		OUT: function (t, k=null)
		{
			return 1 - Easing.Back.IN(1 - t, k);
		},

		/**
		 * 	!function IN_OUT (t: number, k?: number) : number;
		 */
		IN_OUT: function (t, k=null)
		{
			if (t < 0.5)
				return Easing.Back.IN(t*2, k)/2;
			else
				return Easing.Back.OUT((t-0.5)*2, k)/2 + 0.5;
		}
	},
	//!/namespace

	/* ******************************************** */
	//!namespace Bounce
	Bounce:
	{
		getConst: function (t)
		{
			if (t < 1.0/2.75)
				return 7.5625 * t * t;
			else if (t < 2.0/2.75)
				return 7.5625 * (t -= 1.5/2.75)*t + 0.75;
			else if (t < 2.5/2.75)
				return 7.5625 * (t -= 2.250/2.75) * t + 0.9375;

			return 7.5625 * (t -= 2.625/2.75) * t + 0.984375;
		},

		/**
		 * 	!function IN (t: number) : number;
		 */
		IN: function (t)
		{
			return 1 - Easing.Bounce.getConst(1-t);
		},

		/**
		 * 	!function OUT (t: number) : number;
		 */
		OUT: function (t)
		{
			return Easing.Bounce.getConst(t);
		},

		/**
		 * 	!function IN_OUT (t: number) : number;
		 */
		IN_OUT: function (t)
		{
			if (t < 0.5)
				return (1 - Easing.Bounce.getConst(1-2*t))/2;
			else
				return (Easing.Bounce.getConst((t-0.5)*2)/2)+0.5;
		}
	},
	//!/namespace

	/* ******************************************** */
	//!namespace Circ
	Circ:
	{
		/**
		 * 	!function IN (t: number) : number;
		 */
		IN: function (t)
		{
			return 1 - Math.sqrt(1 - t*t);
		},

		/**
		 * 	!function OUT (t: number) : number;
		 */
		OUT: function (t)
		{
			return 1 - Easing.Circ.IN(1 - t);
		},

		/**
		 * 	!function IN_OUT (t: number) : number;
		 */
		IN_OUT: function (t)
		{
			if (t < 0.5)
					return Easing.Circ.IN(t*2)/2;
				else
					return Easing.Circ.OUT((t-0.5)*2)/2 + 0.5;
		}
	},
	//!/namespace

	/* ******************************************** */
	//!namespace Cubic
	Cubic:
	{
		/**
		 * 	!function IN (t: number) : number;
		 */
		IN: function (t)
		{
			return t*t*t;
		},

		/**
		 * 	!function OUT (t: number) : number;
		 */
		OUT: function (t)
		{
			return 1 - Easing.Cubic.IN(1 - t);
		},

		/**
		 * 	!function IN_OUT (t: number) : number;
		 */
		IN_OUT: function (t)
		{
			if (t < 0.5)
				return Easing.Cubic.IN(t*2)/2;
			else
				return Easing.Cubic.OUT((t-0.5)*2)/2 + 0.5;
		}
	},
	//!/namespace

	/* ******************************************** */
	//!namespace Expo
	Expo:
	{
		/**
		 * 	!function IN (t: number) : number;
		 */
		IN: function (t)
		{
			return Math.pow(2, 12*(t-1));
		},

		/**
		 * 	!function OUT (t: number) : number;
		 */
		OUT: function (t)
		{
			return -Math.pow(2, -12*t) + 1;
		},

		/**
		 * 	!function IN_OUT (t: number) : number;
		 */
		IN_OUT: function (t)
		{
			if ((t *= 2) < 1)
				return Math.pow (2, 12 * (t - 1)) / 2;
			else
				return (-Math.pow (2, -12 * (t - 1)) + 2) / 2;
		}
	},
	//!/namespace

	/* ******************************************** */
	//!namespace Power
	Power:
	{
		/**
		 * 	!function IN (t: number, p?: number) : number;
		 */
		IN: function (t, p=12)
		{
			return Math.pow(t, p);
		},

		/**
		 * 	!function OUT (t: number, p?: number) : number;
		 */
		OUT: function (t, p=12)
		{
			return 1 - Easing.Power.IN(1 - t, p);
		},

		/**
		 * 	!function IN_OUT (t: number, p?: number) : number;
		 */
		IN_OUT: function (t, p=12)
		{
			if (t < 0.5)
				return Easing.Power.IN(t*2, p)/2;
			else
				return Easing.Power.OUT((t-0.5)*2, p)/2 + 0.5;
		}
	},
	//!/namespace

	/* ******************************************** */
	//!namespace Quad
	Quad:
	{
		/**
		 * 	!function IN (t: number) : number;
		 */
		IN: function (t)
		{
			return t*t;
		},

		/**
		 * 	!function OUT (t: number) : number;
		 */
		OUT: function (t)
		{
			return 1 - Easing.Quad.IN(1 - t);
		},

		/**
		 * 	!function IN_OUT (t: number) : number;
		 */
		IN_OUT: function (t)
		{
			if (t < 0.5)
				return Easing.Quad.IN(t*2)/2;
			else
				return Easing.Quad.OUT((t-0.5)*2)/2 + 0.5;
		}
	},
	//!/namespace

	/* ******************************************** */
	//!namespace Quartic
	Quartic:
	{
		/**
		 * 	!function IN (t: number) : number;
		 */
		IN: function (t)
		{
			return t*t*t*t;
		},

		/**
		 * 	!function OUT (t: number) : number;
		 */
		OUT: function (t)
		{
			return 1 - Easing.Quartic.IN(1 - t);
		},

		/**
		 * 	!function IN_OUT (t: number) : number;
		 */
		IN_OUT: function (t)
		{
			if (t < 0.5)
				return Easing.Quartic.IN(t*2)/2;
			else
				return Easing.Quartic.OUT((t-0.5)*2)/2 + 0.5;
		}
	},
	//!/namespace

	/* ******************************************** */
	//!namespace Quintic
	Quintic:
	{
		/**
		 * 	!function IN (t: number) : number;
		 */
		IN: function (t)
		{
			return t*t*t*t*t;
		},

		/**
		 * 	!function OUT (t: number) : number;
		 */
		OUT: function (t)
		{
			return 1 - Easing.Quintic.IN(1 - t);
		},

		/**
		 * 	!function IN_OUT (t: number) : number;
		 */
		IN_OUT: function (t)
		{
			if (t < 0.5)
					return Easing.Quintic.IN(t*2)/2;
				else
					return Easing.Quintic.OUT((t-0.5)*2)/2 + 0.5;
		}
	},
	//!/namespace

	/* ******************************************** */
	//!namespace Sine
	Sine:
	{
		/**
		 * 	!function IN (t: number) : number;
		 */
		IN: function (t)
		{
			return 1 - Math.sin (1.5708 * (1 - t));
		},

		/**
		 * 	!function OUT (t: number) : number;
		 */
		OUT: function (t)
		{
			return Math.sin (1.5708 * t);
		},

		/**
		 * 	!function IN_OUT (t: number) : number;
		 */
		IN_OUT: function (t)
		{
			return (Math.cos (3.1416*t) - 1) / -2;
		}
	},
	//!/namespace

	/* ******************************************** */
	//!namespace Step
	Step:
	{
		/**
		 * 	!function IN (t: number) : number;
		 */
		IN: function (t)
		{
			return t != 1.0 ? 0 : 1.0;
		},

		/**
		 * 	!function OUT (t: number) : number;
		 */
		OUT: function (t)
		{
			return t != 1.0 ? 0 : 1.0;
		},

		/**
		 * 	!function IN_OUT (t: number) : number;
		 */
		IN_OUT: function (t)
		{
			return t != 1.0 ? 0 : 1.0;
		}
	}
};

export default Easing;
