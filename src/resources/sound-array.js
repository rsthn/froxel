/*
**	resources/sound-array.js
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
import Sound from './sound.js';

//![import "./sound.js"]

/*
	track: string (music|sfx)
	mode: sequential|random
*/

export default Class.extend
({
	r: null,

	__ctor: function (r)
	{
		if (r.type != "audios")
			throw new Error ("Resource is not audios.");

		this.r = r;
		this.r.wrapper = this;

		if (!this.r.track)
			this.r.track = "sfx";

		if (!this.r.mode)
			this.r.mode = "random";

		this.track = Sound[this.r.track.toUpperCase()];

		this.sounds = [];
		this.lastIndex = -1;

		for (var i = 0; i < this.r.data.length; i++)
		{
			this.sounds.push(new Sound (Object.assign (this.r.data[i], { track: this.r.track })));
		}
	},

	getRandomSound: function ()
	{
		if (this.r.mode == "random")
			return this.sounds[randr(0, this.sounds.length-1)];

		this.lastIndex = ++this.lastIndex % this.sounds.length;
		return this.sounds[this.lastIndex];
	},

	play: function (callback, volume)
	{
		return Sound.play (this.getRandomSound(), callback, volume);
	},

	playLoop: function (callback, volume)
	{
		return Sound.playLoop (this.getRandomSound(), callback, volume);
	},

	playAt: function (index, callback, volume)
	{
		return Sound.play (this.sounds[index % this.sounds.length], callback, volume);
	},

	playLoopAt: function (index, callback, volume)
	{
		return Sound.playLoop (this.sounds[index % this.sounds.length], callback, volume);
	}
});
