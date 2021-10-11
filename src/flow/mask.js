/*
**	flow/mask.js
**
**	Copyright (c) 2013-2021, RedStar Technologies, All rights reserved.
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

import Element from './element.js';
import System from '../system/system.js';
import Recycler from '../utils/recycler.js';

//![import "./element"]
//![import "../system/system"]
//![import "../utils/recycler"]

/*
**	Describes an element mask. Used for collision detection.
*/

const Mask = Element.extend
({
	className: 'Mask',

	/*
	**	Type of the mask (user defined).
	*/
	type: 0,

	/*
	**	Constructs a mask at the specified position.
	*/
	__ctor: function(type, x, y, width, height)
	{
		this._super.Element.__ctor(x, y, width, height);

		this.type = type;
	},

	/*
	**	Draws the element on the specified canvas.
	*/
	draw: function(g)
	{
		let g2 = System.displayBuffer2;

		g2.pushMatrix();
		g2.loadMatrix(g.getMatrix());

		g2.fillStyle('rgba(255,0,255,0.3)');
		g2.fillRect(this.bounds.x1, this.bounds.y1, this.bounds.width(), this.bounds.height());

		g2.popMatrix();
	}
});

Recycler.createPool(Mask);
export default Mask;
