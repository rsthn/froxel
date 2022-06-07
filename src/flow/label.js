/*
**	flow/label.js
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
import Recycler from '../utils/recycler.js';

//![import "./element"]
//![import "../utils/recycler"]

//:/**
//: * 	Describes an element that can be rendered to the screen.
//: */

//!class Label extends Element

const Label = Element.extend
({
	className: 'Label',

	/**
	 * 	Text to render.
	 * 	!readonly text: string;
	 */
	text: null,

	/**
	 * 	Spritefont resource.
	 * 	!readonly font: object;
	 */
	//violet: type fixup
	//readonly font: Spritefont;
	font: null,

	/**
	 * 	Indicates if the `text` property changed.
	 */
	_dirty: false,

	/**
	 * Current text width.
	 * !readonly textWidth: number;
	 */
	textWidth: null,

	/**
	 * Current text height.
	 * !readonly textHeight: number;
	 */
	textHeight: null,

	/**
	 * 	Alignment properties of the label.
	 */
	_align: -1, /* -1=LEFT, 0=CENTER, 1=RIGHT */
	_valign: -1, /* -1=TOP, 0=MIDDLE, 1=BOTTOM */

	/**	
	 * Position offset for the text. Calculated based on alignment properties.
	 */
	textOffsetX: null,
	textOffsetY: null,

	/**
	 * 	Constructs a label element at the specified position with the given text.
	 * 	!constructor (x: number, y: number, font: object, text: string);
	 */
	__ctor: function(x, y, font, text)
	{
		this._super.Element.__ctor(x, y, 4, 4);

		this.text = text;
		this.font = font;

		this._align = -1;
		this._valign = -1;

		this.renderWith(this.renderText);
		this._dirty = true;
	},

	/**
	 * 	Sets the horizontal alignment value of the label.
	 * 	@param value - Use -1 for LEFT, 0 for CENTER, and 1 for RIGHT.
	 * 	!align (value: number) : Label;
	 */
	align: function (value)
	{
		if (this._align === value)
			return this;

		this._align = value;
		this.textOffsetX = null;
		return this;
	},

	/**
	 * 	Sets the vertical alignment value of the label.
	 * 	@param value - Use -1 for TOP, 0 for MIDDLE, and 1 for BOTTOM.
	 * 	!valign (value: number) : Label;
	 */
	valign: function(value)
	{
		if (this._valign === value)
			return this;

		this._valign = value;
		this.textOffsetY = null;
		return this;
	},

	/**
	 * 	Sets the text value of the label.
	 * 	!setText (value: string) : Label;
	 */
	setText: function (value)
	{
		if (this.text === value)
			return this;

		this.text = value;
		this._dirty = true;
		return this;
	},

	/**
	 * 	Sets the font resource to use.
	 * 	!setFont (font: object) : Label;
	 */
	//violet: type fixup
	//setFont (font: Spritefont) : Label;
	setFont: function (font)
	{
		if (this.font === font)
			return this;

		this.font = font;
		this._dirty = true;
		return this;
	},

	/**
	 * Updates the text related properties (textWidth, textHeight, textOffsetX and textOffsetY). Automatically
	 * called before the label is drawn. Recalculates only if text changed since last call.
	 */
	update: function()
	{
		if (this._dirty)
		{
			this.textWidth = this.font.measureWidth(this.text);
			this.textHeight = this.font.measureHeight(this.text);

			this.textOffsetX = null;
			this.textOffsetY = null;

			this._dirty = false;
		}

		if (this.textOffsetX === null) {
			if (this._align < 0) this.textOffsetX = 0;
			else if (this._align === 0) this.textOffsetX = -this.textWidth >> 1;
			else this.textOffsetX = -this.textWidth;
		}

		if (this.textOffsetY === null) {
			if (this._valign < 0) this.textOffsetY = 0;
			else if (this._valign === 0) this.textOffsetY = -this.textHeight >> 1;
			else this.textOffsetY = -this.textHeight;
		}
	},

	/**
	 * 	Renders the element to the graphics surface.
	 */
	renderText: function(g, elem, img)
	{
		elem.update();
		elem.font.drawText (g, elem.bounds.x1 + elem.textOffsetX, elem.bounds.y1 + elem.textOffsetY, elem.text);
	}
});

//!/class

//!namespace Label
//!namespace Pool

	/**
	 * 	Allocates a label element at the specified position with the given text.
	 * 	!function alloc (x: number, y: number, font: object, text: string) : Label;
	 */


Recycler.createPool(Label);
export default Label;
