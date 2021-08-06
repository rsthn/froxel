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
	**	Constructs a label element at the specified position with the given text.
	*/
	__ctor: function(x, y, font, text)
	{
		this._super.Element.__ctor(x, y, 4, 4);

		this.text = text;
		this.font = font;
	},

	/*
	**	Draws the element on the specified canvas.
	*/
	draw: function(g)
	{
		if (this.font !== null)
		{
			this.font.drawText (g, this.bounds.x1, this.bounds.y1, this.text);
			return;
		}

		if (g.gl !== null) return;

		g.font('bold 4px monospace');
		g.textBaseline('top');
		g.fillStyle('#fff');
		g.fillText(this.text, this.bounds.x1, this.bounds.y1);
	}
});
