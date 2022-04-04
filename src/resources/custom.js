/*
**	resources/custom.js
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
import Canvas from '../system/canvas.js';
import Resources from './resources.js';

//![import "../system/canvas"]
//![import "./resources"]

export default Class.extend
({
	className: "Custom",

	width: null,
	height: null,

	x: 0,
	y: 0,

	__ctor: function (r)
	{
		if (r.type != "object")
			throw new Error ("Resource is not an object.");

		this.width = r.width;
		this.height = r.height;

		this.r = r;
		this.r.wrapper = this;

		this.data = null;

		Canvas.renderImage(r.width, r.height,
		(g) => {
			if (this.r.draw !== null && typeof(this.r.draw) === 'function') {
				this.r.draw(g, this.r);
			}
			else {
				g.fillStyle(this.r.color);
				g.fillRect(0, 0, this.r.width, this.r.height);
			}
		},
		(img) => {
			this.data = img;
		});
	},

	draw: function (g, x=0, y=0, width=null, height=null)
	{
		if (!this.data)
			return;

		g.drawImage (this.data, 0, 0, this.data.width, this.data.height, x, y, width ?? this.width, height ?? this.height);
	},

	getImage: function()
	{
		return this.data;
	},

	getDrawable: function()
	{
		return this;
	}
});

/**
**	Creates a descriptor for a custom.
*/
Resources.Custom = function (width, height, color='#ff0000', opts=null)
{
	return { type: "object", wrapper: "Custom", width: width, height: height, color: color, ...opts };
};
