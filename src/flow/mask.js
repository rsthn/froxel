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
import globals from '../system/globals.js';

//![import "./element"]
//![import "../system/system"]
//![import "../utils/recycler"]

//:/**
//: * 	Describes an element mask. Used for collision detection.
//: */

//!class Mask extends Element

const Mask = Element.extend
({
	className: 'Mask',

	/**
	 * 	Type of the mask (user defined).
	 * 	!type: number;
	 */
	type: 0,

	/**
	 * 	Constructs the Mask element.
	 * 	!constructor (type: number, x: number, y: number, width: number, height: number);
	 */
	__ctor: function(type, x, y, width, height)
	{
		this._super.Element.__ctor(x, y, width, height);

		this.type = type;
	},

	/**
	 * 	Draws the element on the specified canvas.
	 * 	!draw (g: Canvas) : void;
	 */
	draw: function(g)
	{
		if (!globals.debugMasks && !this.debugBounds)
			return;

		let m = g.getMatrix();
		g = System.displayBuffer2;

		g.pushMatrix();
		g.loadMatrix(m);
		g.fillStyle(Element.getDebugColor(this.debugBounds));
		g.fillRect(this.bounds.x1, this.bounds.y1, this.bounds.width(), this.bounds.height());
		g.popMatrix();
	}
});

//!/class

//!namespace Mask
//!namespace Pool

	/**
	 * 	Allocates a new Mask element.
	 * 	!function alloc (type: number, x: number, y: number, width: number, height: number) : Mask;
	 */

Recycler.createPool(Mask);
export default Mask;
