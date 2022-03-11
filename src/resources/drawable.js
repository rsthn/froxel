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

import { Class } from 'rinn';
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
		g.drawImage (this.r.data, 0, 0, this.r.data.width, this.r.data.height, x, y, width || this.r.width, height || this.r.height,
			null, null, this.width, this.height);
	},

	getImage: function()
	{
		return this.r.data;
	},

	getDrawable: function()
	{
		return this;
	}
});

/**
 * 	Creates a descriptor for an image resource.
 */
Resources.Image = function (src, opts=null)
{
	return { type: "image", wrapper: "Drawable", src: src, pixelated: null, ...opts };
};
