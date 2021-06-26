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

import { Class } from '@rsthn/rin';
import Canvas from '../system/canvas.js';

/*
	font: {
		sheetWidth: int, sheetHeight: int, charWidth: int, charHeight: int, charset: string, widths: [char, width, ...]
	}
*/

export default Class.extend
({
	__ctor: function (r)
	{
		if (r.type != "image" || !r.font)
			throw new Error ("Resource is not a sprite font.");

		var r_scale = r.data.width / r.font.sheetWidth;
		var v_scale = r.width / r.font.sheetWidth;

		this.r_charWidth = (r.font.charWidth * r_scale);
		this.r_charHeight = (r.font.charHeight * r_scale);

		this.charWidth = (r.font.charWidth * v_scale);
		this.charHeight = (r.font.charHeight * v_scale);

		var cols = int(r.font.sheetWidth / r.font.charWidth);

		this.r = r;
		this.r.wrapper = this;

		var n = r.font.charset.length;
		var k = 0;
		var y = 0;

		this.charTable = { };

		this.charTable[" "] = { charWidth: this.charWidth >> 1, r_charWidth: this.r_charWidth };

		while (k < n)
		{
			var x = 0;

			for (var i = 0; i < cols && k < n; i++)
			{
				var c = r.font.charset[k++];

				this.charTable[c] = { x: x, y: y, charWidth: this.charWidth, r_charWidth: this.r_charWidth };

				x += this.r_charWidth;
			}

			y += this.r_charHeight;
		}

		if (!r.font.widths) return;

		var n = r.font.widths.length;

		for (var i = 0; i < n; i += 2)
		{
			var w1 = (r.font.widths[i] * v_scale);
			var w2 = (r.font.widths[i] * r_scale);

			var s = r.font.widths[i+1];

			for (var j = 0; j < s.length; j++)
			{
				this.charTable[s[j]].charWidth = w1;
				this.charTable[s[j]].r_charWidth = w2;
			}
		}
	},

	draw: function (g, x, y, text)
	{
		var n = text.length;

		for (var i = 0; i < n; i++)
		{
			if (text[i] == " ")
			{
				x += this.charTable[text[i]].charWidth;
				continue;
			}

			var c = this.charTable[text[i]];
			if (!c) continue;

			g.drawImage (this.r.data, c.x, c.y, c.r_charWidth, this.r_charHeight, x, y, c.charWidth, this.charHeight);

			x += c.charWidth;
		}
	},

	measureWidth: function (text)
	{
		var n = text.length;
		var x = 0;

		for (var i = 0; i < n; i++)
		{
			var c = this.charTable[text[i]];
			if (!c) continue;

			x += c.charWidth;
		}

		return x;
	},

	measureHeight: function (text)
	{
		return this.charHeight;
	}
});


Canvas.prototype.drawText = function (r, x, y, text)
{
	r.draw (this, x, y, text.toString());
};

Canvas.prototype.drawTextAligned = function (r, x, y, w, h, ax, ay, text)
{
	text = text.toString();

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

	r.draw (this, x, y, text);
};

Canvas.prototype.drawTextAligned2 = function (r, bounds, ax, ay, text)
{
	this.drawTextAligned (r, bounds.x1, bounds.y1, bounds.width(), bounds.height(), ax, ay, text);
};
