/*
**	resources/drawable
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

import { Class } from '@rsthn/rin';
import Resources from './resources.js';

//![import "./resources"]

export default Class.extend
({
	className: "Drawable",

	width: null,
	height: null,

	__ctor: function (r)
	{
		if (r.type != "image")
			throw new Error ("Resource is not an image.");

		this.width = r.width;
		this.height = r.height;

		this.r = r;
		this.r.wrapper = this;
	},

	draw: function (g, x=0, y=0, width=null, height=null)
	{
		if (width === null)
			g.drawImageResource (this.r, x, y);
		else
			g.drawImageResource (this.r, x, y, width, height);
	},

	getDrawable: function()
	{
		return this;
	}
});

/**
**	Creates a descriptor for an image resource.
*/
Resources.Image = function (src, opts=null)
{
	return { type: "image", wrapper: "Drawable", src: src, pixelated: null, ...opts };
};
