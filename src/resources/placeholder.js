/*
**	resources/placeholder.js
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

import IDrawable from '../system/idrawable.js';
import Canvas from '../system/canvas.js';
import Resources from './resources.js';

export default IDrawable.extend
({
	className: "Placeholder",

	width: null,
	height: null,

	__ctor: function (r)
	{
		if (r.type != "object")
			throw new Error ("Resource is not an object.");

		this._super.IDrawable.__ctor(r.width, r.height);

		this.r = r;
		this.r.wrapper = this;

		this.data = null;

		Canvas.renderImage(r.width, r.height,
		(g) => {
			g.fillStyle(this.r.color);
			g.fillRect(0, 0, r.width, r.height);
		},
		(img) => {
			this.data = img;
		});
	},

	draw: function (g, x=0, y=0, width=null, height=null)
	{
		if (!this.data)
			return;

		g.drawImageResource (this, x, y, width, height);
	}
});

/**
**	Creates a descriptor for a placeholder.
*/
Resources.Placeholder = function (width, height, color='#ff0000', opts=null)
{
	return { type: "object", wrapper: "Placeholder", width: width, height: height, color: color, ...opts };
};
