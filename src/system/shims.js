/*
**	system/shims.js
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

/**
 * 	Do some polyfill when running headless.
 */

import sizeOf from 'image-size';
import fs from 'fs';

import { performance } from 'perf_hooks';
global.performance = performance;

import FileReader from 'filereader';
global.FileReader = FileReader;

global.Image = class
{
	constructor() {
		this.width = 0;
		this.height = 0;
		this.path = '';

		this.onload = null;
		this.onerror = null;
	}

	get src() {
		return this.path;
	}

	set src(value) {
		sizeOf(this.path = value.split('?')[0], (err, dimensions) => {
			if (err) {
				if (this.onerror) this.onerror(err);
				return;
			}

			this.width = dimensions.width;
			this.height = dimensions.height;

			if (this.onload) this.onload();
		});
	}
};


global.Audio = class
{
	constructor() {
		this.path = '';

		this.oncanplaythrough = null;
		this.onerror = null;
		this.onended = null;
	}

	get src() {
		return this.path;
	}

	set src(value) {
		this.path = value.split('?')[0];

		if (this.oncanplaythrough)
			this.oncanplaythrough();
	}

	cloneNode () {
		let m = new Audio();
		m.src = this.path;
		return m;
	}

	play() {
		if (this.onended) this.onended();
	}

	pause() {
	}
};


global.fetchd = function (url, options)
{
	return new Promise ((resolve, reject) =>
	{
		if (!options) options = { };
		if (!('responseType' in options)) options.responseType = 'arraybuffer';

		url = url.split('?')[0];

		fs.readFile (url, function(err, data)
		{
			if (err) {
				reject(err);
				return;
			}

			if (options.responseType == 'json') {
				resolve(JSON.parse(data.toString()));
				return;
			}

			resolve(data);
		});
	});
};
