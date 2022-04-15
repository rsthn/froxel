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

import Canvas from '../system/canvas.js';
import Drawable from '../flow/drawable.js';

//![import "../system/canvas"]

export default Drawable.extend
({
	className: 'DrawableCustom',

	__ctor: function (r)
	{
		if (r.type != 'object')
			throw new Error ('Resource is not an object.');

		this._super.Drawable.__ctor(null, r.width, r.height);

		this.r = r;
		this.r.wrapper = this;

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
			this.resource = img;
			this.swidth = this.resource.width;
			this.sheight = this.resource.height;
		});
	}
});
