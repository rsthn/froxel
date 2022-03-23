/*
**	resources/spritefont.js
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

//![import "../system/canvas"]

/*
	font: {
		sheetWidth: int?, charWidth: int, charHeight: int, charset: string, widths: [char, width, ...],
		reverseDraw: bool?, paddingX: int?, paddingY: int?, spacingX: int?, spacingY: int?
	}
*/

export default Class.extend
({
	__ctor: function (r)
	{
		if (r.type != 'image' || !r.font)
			throw new Error ('Resource is not a sprite font.');

		if (!r.font.sheetWidth)
			r.font.sheetWidth = r.width;

		let r_scale = r.data.width / r.font.sheetWidth;
		let v_scale = r.width / r.font.sheetWidth;

		this.r_charWidth = (r.font.charWidth * r_scale);
		this.r_charHeight = (r.font.charHeight * r_scale);

		this.charWidth = (r.font.charWidth * v_scale);
		this.charHeight = (r.font.charHeight * v_scale);

		this.paddingX = (r.font.paddingX || 0) * v_scale;
		this.paddingY = (r.font.paddingY || 0) * v_scale;

		this.spacingX = (r.font.spacingX || 0) * v_scale;
		this.spacingY = (r.font.spacingY || 0) * v_scale;

		this.reverseDraw = r.font.reverseDraw || false;

		let cols = int(r.font.sheetWidth / r.font.charWidth);

		this.r = r;
		this.r.wrapper = this;

		let n = r.font.charset.length;
		let k = 0;
		let y = 0;

		this.charTable = { };

		while (k < n)
		{
			let x = 0;

			for (let i = 0; i < cols && k < n; i++)
			{
				let c = r.font.charset[k++];

				this.charTable[c] = { hidden: false, x: x, y: y, charWidth: this.charWidth, r_charWidth: this.r_charWidth, spacingX: 0 };

				x += this.r_charWidth;
			}

			y += this.r_charHeight;
		}

		if (!(' ' in this.charTable))
			this.charTable[' '] = { hidden: true, charWidth: int((this.charWidth + this.paddingX)*2/3), r_charWidth: this.r_charWidth, spacingX: 0 };

		if (!r.font.widths) return;

		n = r.font.widths.length;

		for (let i = 0; i < n; i += 2)
		{
			let w = r.font.widths[i+1] * v_scale;
			let s = r.font.widths[i];

			if (typeof(s) === 'number')
				s = String.fromCharCode(s);

			for (let j = 0; j < s.length; j++)
			{
				if (s[j] in this.charTable)
					this.charTable[s[j]].spacingX = w - this.charTable[s[j]].charWidth;
			}
		}
	},

	drawText: function (g, x, y, text)
	{
		let n = text.length;

		let pX = -2*this.paddingX + this.spacingX;

		x -= this.paddingX;
		y -= this.paddingY;

		if (!this.reverseDraw)
		{
			for (let i = 0; i < n; i++)
			{
				let c = this.charTable[text[i]];
				if (!c) continue;

				if (!c.hidden)
					g.drawImage (this.r.data, c.x, c.y, c.r_charWidth, this.r_charHeight, x, y, c.charWidth, this.charHeight, null, null, c.charWidth, this.charHeight);

				x += c.charWidth + pX + c.spacingX;
			}
		}
		else
		{
			for (let i = 0; i < n-1; i++)
			{
				let c = this.charTable[text[i]];
				if (!c) continue;

				x += c.charWidth + pX;
			}

			for (let i = n-1; i >= 0; i--)
			{
				let c = this.charTable[text[i]];
				if (!c) continue;

				if (!c.hidden)
					g.drawImage (this.r.data, c.x, c.y, c.r_charWidth, this.r_charHeight, x, y, c.charWidth, this.charHeight, null, null, c.charWidth, this.charHeight);

				x -= c.charWidth + pX + c.spacingX;
			}
		}
	},

	measureWidth: function (text)
	{
		let n = text.length;
		let x = 0;

		let pX = -2*this.paddingX + this.spacingX;

		for (let i = 0; i < n; i++)
		{
			let c = this.charTable[text[i]];
			if (!c) continue;

			x += c.charWidth + pX + c.spacingX;
		}

		return x;
	},

	measureHeight: function (text)
	{
		return this.charHeight - 2*this.paddingY + this.spacingY;
	},

	getImage: function()
	{
		return this.r.data;
	}
});


Canvas.prototype.drawText = function (r, x, y, text)
{
	r.drawText (this, x, y, text);
};

Canvas.prototype.drawTextAligned = function (r, x, y, w, h, ax, ay, text)
{
	if (ax == 0) // Align-Center
		x = x + ((w - r.measureWidth(text)) >> 1);
	else if (ax < 0) // Align-Left
		x = x - ax - 1;
	else if (ax > 0) // Align-Right
		x = x + w - ax + 1 - r.measureWidth(text);

	if (ay == 0) // Align-Center
		y = y + ((h - r.measureHeight(text)) >> 1);
	else if (ay < 0) // Align-Top
		y = y - ay - 1;
	else if (ay > 0) // Align-Bottom
		y = y + h - ay + 1 - r.measureHeight(text);

	r.drawText (this, x, y, text);
};

Canvas.prototype.drawTextAligned2 = function (r, bounds, ax, ay, text)
{
	this.drawTextAligned (r, bounds.x1, bounds.y1, bounds.width(), bounds.height(), ax, ay, text);
};
