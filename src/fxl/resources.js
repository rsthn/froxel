
import Resources from '../resources/resources.js';

/*
**	Resource manager allows to specify resource descriptors to load them.
*/

const res =
{
	/*
	**	Registered resources. Initially these are resource descriptors, but after a call to `res.load` these will be fully loaded resources.
	*/
	r: { },

	/*
	**	Loads all registered resources that have not been loaded yet. Returns a promise.
	*/
	load: function(progressCallback=null)
	{
		return new Promise (function (resolve, reject)
		{
			Resources.load (res.r,
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
		return res.r[id];
	},

	/*
	**	Checks if the ID exists in the fxl `r` map, throws an error if it does.
	*/
	__resIdMustNotExist: function (id)
	{
		if (id in res.r) throw new Error ('res.res: identifier `' + id + '` is already in use');
	},

	/*
	**	Registers a solid-color placeholder resource.
	*/
	placeholder: function (id, color, width, height)
	{
		this.__resIdMustNotExist(id);

		return res.r[id] = { type: 'object', wrapper: 'Placeholder', color: color, width: width, height: height };
	},

	/*
	**	Registers an image resource.
	*/
	image: function (id, path, opts=null)
	{
		this.__resIdMustNotExist(id);

		return res.r[id] = { type: 'image', wrapper: 'Drawable', src: path, pixelated: null, ...opts };
	},

	/*
	**	Registers an spritesheet resource.
	*/
	spritesheet: function (id, path, frameWidth, frameHeight, numFrames=0, optsA=null, optsB=null)
	{
		this.__resIdMustNotExist(id);

		return res.r[id] = { type: 'image', wrapper: 'Spritesheet', src: path, pixelated: null,
			config: {
				frameWidth: frameWidth, frameHeight: frameHeight, numFrames: numFrames, ...optsA
			},
			...optsB
		};
	},

	/*
	**	Registers a spritesheet animation resource.
	*/
	animation: function (id, path, frameWidth, frameHeight, numFrames=0, optsA=null, optsB=null)
	{
		this.__resIdMustNotExist(id);

		return res.r[id] = { type: 'image', wrapper: 'SpritesheetAnimation', src: path,
			config: {
				frameWidth: frameWidth, frameHeight: frameHeight, numFrames: numFrames, ...optsA
			},

			anim: {
				def: null, fps: 15, seq: { }
			},

			...optsB,

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
		
		return res.r[id] = { type: 'image', wrapper: 'SpriteFont', src: path,
			font: {
				charWidth: charWidth, charHeight: charHeight, charset: charset, ...optsA
			},
			...optsB
		};
	}
};

export default res;
