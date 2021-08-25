/*
**	resources/spritesheet.js
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
	If source is "image":
		config: {
			sheetWidth: int, frameWidth: int, frameHeight: int?, numFrames: int?
			--OR--
			numFrames: int, frameWidth: int, frameHeight: int?
		}

	If source is "images":
		config: {
			frameWidth: int, frameHeight: int
		}
		
	NOTE: The sheetWidth, frameWidth and frameHeight should reflect the real image size. The system will automatically scale it if the source image is smaller/bigger.
*/

export default Class.extend
({
	className: 'Spritesheet',

	width: 0,
	height: 0,

	numCols: 0,
	numFrames: 0,

	drawableCache: null,

	__ctor: function (r)
	{
		if ((r.type != 'image' && r.type != 'images'))
			throw new Error ('Resource is not a sprite sheet.');

		var r_scale, v_scale;

		if (r.type == 'image')
		{
			if (!r.config.sheetWidth && (!r.config.numFrames || !r.config.frameWidth))
				throw new Error ('Required sheetWidth or numFrames+frameWidth');

			if (!r.config.sheetWidth)
				r.config.sheetWidth = r.config.numFrames * r.config.frameWidth;

			if (!r.config.frameHeight)
				r.config.frameHeight = r.data.height;

			r_scale = r.data.width / r.config.sheetWidth;
			v_scale = r.width / r.config.sheetWidth;
		}
		else // r.type == 'images'
		{
			if (!r.config) r.config = { };

			if (!r.config.frameWidth)
				r.config.frameWidth = r.data[0].width;

			if (!r.config.frameHeight)
				r.config.frameHeight = r.data[0].height;

			r_scale = r.data[0].data.width / r.config.frameWidth;
			v_scale = r.data[0].width / r.config.frameWidth;
		}

		this.r_frameWidth = (r.config.frameWidth * r_scale);
		this.r_frameHeight = (r.config.frameHeight * r_scale);

		this.width = r.config.frameWidth * v_scale;
		this.height = r.config.frameHeight * v_scale;

		if (r.type == 'image')
		{
			this.numCols = int(r.data.width / this.r_frameWidth);
			this.numRows = Math.ceil(r.data.height / this.r_frameHeight);

			this.numFrames = r.config.numFrames || (this.numCols * this.numRows);
		}
		else
		{
			this.numCols = this.numRows = 0;
			this.numFrames = r.data.length;
		}

		this.drawableCache = { };

		this.r = r;
		this.r.wrapper = this;
	},

	drawFrame: function (g, x, y, frame, width=0, height=0)
	{
		if (frame < 0 || frame >= this.numFrames)
			return;

		if (!width) width = this.width;
		if (!height) height = this.height;

		if (this.numCols != 0)
		{
			var j = int(frame / this.numCols) * this.r_frameHeight;
			var i =  (frame % this.numCols) * this.r_frameWidth;

			g.drawImage (this.r.data, i, j, this.r_frameWidth, this.r_frameHeight, x, y, width, height);
		}
		else
		{
			g.drawImage (this.r.data[frame].data, 0, 0, this.r_frameWidth, this.r_frameHeight, x, y, width, height);
		}
	},

	getFrame: function (x, y=null)
	// OR getFrame: function (frameIndex)
	{
		let frameIndex;

		if (y !== null)
			frameIndex = y*this.numCols + x;
		else
			frameIndex = x;

		if (frameIndex < 0 || frameIndex >= this.numFrames)
			throw new Error ('frameIndex out of range');

		if (!this.drawableCache[frameIndex])
		{
			this.drawableCache[frameIndex] =
			{
				width: this.width,
				height: this.height,

				frameIndex: frameIndex,
				r: this,

				draw: function (g, x=0, y=0, width=0, height=0)
				{
					g.drawFrame (this.r, x, y, this.frameIndex, width, height);
				},

				getDrawable: function()
				{
					return this;
				}
			};
		}

		return this.drawableCache[frameIndex];
	},

	getDrawable: function()
	{
		return this.getFrame(0);
	}
});

Canvas.prototype.drawFrame = function (r, x, y, frameIndex, width, height)
{
	r.drawFrame (this, x, y, frameIndex, width, height);
};
