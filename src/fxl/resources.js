
import Resources from '../resources/resources.js';

import r from './r.js';

/*
**	Resource manager allows to specify resource descriptors to load them.
*/

const res =
{
	/*
	**	Loads all registered resources that have not been loaded yet. Returns a promise.
	*/
	load: function(progressCallback=null)
	{
		return new Promise (function (resolve, reject)
		{
			Resources.load (r,
				function (index, total, value) {
					if (progressCallback) progressCallback(value);
				},
				function () {
					resolve();
				}
			);
		});
	},

	/*
	**	Returns a resource given its identifier.
	*/
	get: function (id)
	{
		return r[id];
	},

	/*
	**	Checks if the ID exists in the fxl `r` map, throws an error if it does.
	*/
	__resIdMustNotExist: function (id)
	{
		if (id in r) throw new Error ('Resource identifier `' + id + '` is already in use');
	},

	/*
	**	Registers a solid-color placeholder resource.
	*/
	placeholder: function (id, color, width, height)
	{
		this.__resIdMustNotExist(id);

		return r[id] = { type: 'object', wrapper: 'Placeholder', color: color, width: width, height: height };
	},

	/*
	**	Registers an image resource.
	*/
	image: function (id, path, opts=null)
	{
		this.__resIdMustNotExist(id);

		return r[id] = { type: 'image', wrapper: 'Drawable', src: path, pixelated: null, ...opts };
	},

	/*
	**	Registers an spritesheet resource.
	*/
	spritesheet: function (id, path, frameWidth, frameHeight, numFrames=0, optsA=null, optsB=null)
	{
		this.__resIdMustNotExist(id);

		return r[id] = { type: 'image', wrapper: 'Spritesheet', src: path, pixelated: null,
			config: {
				frameWidth: frameWidth, frameHeight: frameHeight, numFrames: numFrames, ...optsA
			},
			...optsB
		};
	},

	/*
	**	Registers a spritesheet animation resource.
	*/
	animation: function (id, path, frameWidth, frameHeight, numFrames=null, configOptions=null, resOptions=null)
	{
		this.__resIdMustNotExist(id);

		return r[id] = { type: 'image', wrapper: 'SpritesheetAnimation', src: path,
			config: {
				frameWidth: frameWidth, frameHeight: frameHeight, numFrames: numFrames, ...configOptions
			},

			anim: {
				def: null, fps: 15, seq: { }, trans: { }
			},

			...resOptions,

			fps: function(value) {
				this.anim.fps = value;
				return this;
			},

			seq: function(id, loop, group, fps=null)
			{
				this.anim.seq[id] = { loop: loop, group: group };

				if (fps !== null)
					this.anim.seq[id].fps = fps;

				return this;
			},

			trans: function(srcSeq, dstSeq, group)
			{
				if (!(srcSeq in this.anim.trans))
					this.anim.trans[srcSeq] = { };

				this.anim.trans[srcSeq][dstSeq] = group;
				return this;
			},

			def: function(value) {
				this.anim.def = value;
				return this;
			}
		};
	},

	/*
	**	Registers a spritefont animation resource.
	*/
	spritefont: function (id, path, charWidth, charHeight, charset, optsA=null, optsB=null)
	{
		this.__resIdMustNotExist(id);
		
		return r[id] = { type: 'image', wrapper: 'SpriteFont', src: path,
			font: {
				charWidth: charWidth, charHeight: charHeight, charset: charset, ...optsA
			},
			...optsB
		};
	},

	/*
	**	Registers a JSON data resource.
	*/
	json: function (id, path, opts=null)
	{
		this.__resIdMustNotExist(id);

		return r[id] = { type: 'json', src: path, ...opts };
	},

	/*
	**	Registers a binary data resource.
	*/
	data: function (id, path, opts=null)
	{
		this.__resIdMustNotExist(id);

		return r[id] = { type: 'data', src: path, ...opts };
	},

	/*
	**	Registers a text data resource.
	*/
	text: function (id, path, opts=null)
	{
		this.__resIdMustNotExist(id);

		return r[id] = { type: 'text', src: path, ...opts };
	},

	/*
	**	Registers an sound effect audio resource.
	*/
	sfx: function (id, path, opts=null)
	{
		this.__resIdMustNotExist(id);

		return r[id] = { type: 'audio', wrapper: 'Sound', src: path, track: 'sfx', ...opts };
	},

	/*
	**	Registers an music audio resource.
	*/
	music: function (id, path, opts=null)
	{
		this.__resIdMustNotExist(id);

		return r[id] = { type: 'audio', wrapper: 'Sound', src: path, track: 'music', ...opts };
	}
};

export default res;
