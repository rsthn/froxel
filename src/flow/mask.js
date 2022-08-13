
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
		if (globals.debugMasks === false && (this.debugBounds === false || this.debugBounds === 0))
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
