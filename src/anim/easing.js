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

const Easing =
{
	/* ******************************************** */
	Linear:
	{
		IN: function (t)
		{
			return t;
		},

		OUT: function (t)
		{
			return t;
		},

		IN_OUT: function (t)
		{
			return t;
		}
	},

	/* ******************************************** */
	Back:
	{
		k: 1.70158,

		IN: function (t, k)
		{
			if (k === undefined) k = Easing.Back.k;
			return t*t*((k+1)*t - k);
		},

		OUT: function (t, k)
		{
			return 1 - Easing.Back.IN(1 - t, k);
		},

		IN_OUT: function (t, k)
		{
			if (t < 0.5)
				return Easing.Back.IN(t*2, k)/2;
			else
				return Easing.Back.OUT((t-0.5)*2, k)/2 + 0.5;
		}
	},

	/* ******************************************** */
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

		IN: function (t)
		{
			return 1 - Easing.Bounce.getConst(1-t);
		},

		OUT: function (t)
		{
			return Easing.Bounce.getConst(t);
		},

		IN_OUT: function (t)
		{
			if (t < 0.5)
				return (1 - Easing.Bounce.getConst(1-2*t))/2;
			else
				return (Easing.Bounce.getConst((t-0.5)*2)/2)+0.5;
		}
	},

	/* ******************************************** */
	Circ:
	{
		IN: function (t)
		{
			return 1 - Math.sqrt(1 - t*t);
		},

		OUT: function (t)
		{
			return 1 - Easing.Circ.IN(1 - t);
		},

		IN_OUT: function (t)
		{
			if (t < 0.5)
					return Easing.Circ.IN(t*2)/2;
				else
					return Easing.Circ.OUT((t-0.5)*2)/2 + 0.5;
		}
	},

	/* ******************************************** */
	Cubic:
	{
		IN: function (t)
		{
			return t*t*t;
		},

		OUT: function (t)
		{
			return 1 - Easing.Cubic.IN(1 - t);
		},

		IN_OUT: function (t)
		{
			if (t < 0.5)
				return Easing.Cubic.IN(t*2)/2;
			else
				return Easing.Cubic.OUT((t-0.5)*2)/2 + 0.5;
		}
	},

	/* ******************************************** */
	Expo:
	{
		IN: function (t)
		{
			return Math.pow(2, 12*(t-1));
		},

		OUT: function (t)
		{
			return -Math.pow(2, -12*t) + 1;
		},

		IN_OUT: function (t)
		{
			if ((t *= 2) < 1)
				return Math.pow (2, 12 * (t - 1)) / 2;
			else
				return (-Math.pow (2, -12 * (t - 1)) + 2) / 2;
		}
	},

	/* ******************************************** */
	Power:
	{
		p: 12,

		IN: function (t)
		{
			return Math.pow(t, Easing.Power.p);
		},

		OUT: function (t)
		{
			return 1 - Easing.Power.IN(1 - t);
		},

		IN_OUT: function (t)
		{
			if (t < 0.5)
				return Easing.Power.IN(t*2)/2;
			else
				return Easing.Power.OUT((t-0.5)*2)/2 + 0.5;
		}
	},

	/* ******************************************** */
	Quad:
	{
		IN: function (t)
		{
			return t*t;
		},

		OUT: function (t)
		{
			return 1 - Easing.Quad.IN(1 - t);
		},

		IN_OUT: function (t)
		{
			if (t < 0.5)
				return Easing.Quad.IN(t*2)/2;
			else
				return Easing.Quad.OUT((t-0.5)*2)/2 + 0.5;
		}
	},

	/* ******************************************** */
	Quartic:
	{
		IN: function (t)
		{
			return t*t*t*t;
		},

		OUT: function (t)
		{
			return 1 - Easing.Quartic.IN(1 - t);
		},

		IN_OUT: function (t)
		{
			if (t < 0.5)
				return Easing.Quartic.IN(t*2)/2;
			else
				return Easing.Quartic.OUT((t-0.5)*2)/2 + 0.5;
		}
	},

	/* ******************************************** */
	Quintic:
	{
		IN: function (t)
		{
			return t*t*t*t*t;
		},

		OUT: function (t)
		{
			return 1 - Easing.Quintic.IN(1 - t);
		},

		IN_OUT: function (t)
		{
			if (t < 0.5)
					return Easing.Quintic.IN(t*2)/2;
				else
					return Easing.Quintic.OUT((t-0.5)*2)/2 + 0.5;
		}
	},

	/* ******************************************** */
	Sine:
	{
		IN: function (t)
		{
			return 1 - Math.sin (1.5708 * (1 - t));
		},

		OUT: function (t)
		{
			return Math.sin (1.5708 * t);
		},

		IN_OUT: function (t)
		{
			return (Math.cos (3.1416*t) - 1) / -2;
		}
	},

	/* ******************************************** */
	Step:
	{
		IN: function (t)
		{
			return t != 1.0 ? 0 : 1.0;
		},

		OUT: function (t)
		{
			return t != 1.0 ? 0 : 1.0;
		},

		IN_OUT: function (t)
		{
			return t != 1.0 ? 0 : 1.0;
		}
	}
};

export default Easing;
