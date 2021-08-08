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
import G from '../system/globals.js';

/*
**	Describes an element that can be rendered to the screen.
*/

export default Element.extend
({
	className: 'Label',

	/*
	**	Text to show and spritefont resource.
	*/
	text: null,
	font: null,

	/*
	**	Last text value and its dimensions.
	*/
	_ltext: null,
	_twidth: null,
	_theight: null,

	/*
	**	Alignment properties of the label.
	*/
	_align: -1, /* -1=LEFT, 0=Center, 1=Right */
	_valign: -1, /* -1=TOP, 0=Middle, 1=Bottom */

	/*
	**	Position offset for the text. Calculated based on alignment properties.
	*/
	_offsx: null,
	_offsy: null,

	/*
	**	Constructs a label element at the specified position with the given text.
	*/
	__ctor: function(x, y, font, text)
	{
		this._super.Element.__ctor(x, y, 4, 4);

		this.text = text;
		this.font = font;
	},

	/*
	**	Sets the horizontal alignment value of the label.
	*/
	align: function(value)
	{
		this._align = value;
		this._offsx = null;
		return this;
	},

	/*
	**	Sets the vertical alignment value of the label.
	*/
	valign: function(value)
	{
		this._valign = value;
		this._offsy = null;
		return this;
	},

	/*
	**	Draws the element on the specified canvas.
	*/
	draw: function(g)
	{
		if (this.font !== null)
		{
			if (this.text !== this._ltext)
			{
				this._twidth = this.font.measureWidth(this.text);
				this._theight = this.font.measureHeight(this.text);
				this._ltext = this.text;
			}

			if (this._offsx === null) {
				if (this._align < 0) this._offsx = 0;
				else if (this._align === 0) this._offsx = -this._twidth >> 1;
				else this._offsx = -this._twidth;
			}

			if (this._offsy === null) {
				if (this._valign < 0) this._offsy = 0;
				else if (this._valign === 0) this._offsy = -this._theight >> 1;
				else this._offsy = -this._theight;
			}

			this.font.drawText (g, this.bounds.x1 + this._offsx, this.bounds.y1 + this._offsy, this.text);
			return;
		}

		// VIOLET: Possibly remove this and mark it as deprecated (fallback when no spritefont is specified).
		if (g.gl !== null) return;

		g.font('bold 4px monospace');
		g.textBaseline('top');
		g.fillStyle('#fff');
		g.fillText(this.text, this.bounds.x1, this.bounds.y1);
	}
});
