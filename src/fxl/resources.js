
import Resources from '../resources/resources.js';
import r from './r.js';

// TODO add an interface to change the parameter of image resources using methods instead of passing the properties.

/**
 * Resource manager allows to specify resource descriptors to load them.
 */

//!namespace res

	//!type AnimationResource =

		/**
		 * Sets the default FPS value.
		 * !fps (value: number) : AnimationResource;
		 */

		/**
		 * Defines an animation sequence.
		 * !seq (sequenceName: string, isLoop: boolean, frameGroup: string, fps?: number) : AnimationResource;
		 */

		/**
		 * Defines a transition sequence.
		 * !trans (sourceSequenceName: string, destinationSequenceName: string, frameGroup: string) : AnimationResource;
		 */

		/**
		 * Sets the default animation sequence.
		 * !def (sequenceName: string) : AnimationResource;
		 */

	//!/type

	//!type SpritesheetResource =

		/**
		 * Adds a frame to the spritesheet given its coordinates.
		 * !frame (x: number, y: number, width: number, height: number) : SpritesheetResource;
		 */

	//!/type

//!/namespace

//!class res

const res =
{
	/**
	 * Configures the resources object with the specified options.
	 * !static config (options: Resources.ConfigOptions) : void;
	 */
	config: function (opts)
	{
		Resources.config(opts);
	},

	/**
	 * Loads all registered resources that have not been loaded yet.
	 * !static load (progressCallback?: (t: number, name: string) => void) : Promise<void>;
	 */
	load: function (progressCallback=null)
	{
		return new Promise (function (resolve, reject)
		{
			Resources.load (r,
				function (index, total, value, name) {
					if (progressCallback) progressCallback(value, name);
				},
				function () {
					resolve();
				}
			);
		});
	},

	/**
	 * Returns a resource given its identifier.
	 * !static get (id: string) : object;
	 */
	get: function (id)
	{
		if (!r.hasOwnProperty(id))
			throw new Error('Resource not found: ' + id);

		return r[id];
	},

	/**
	 * Checks if the ID exists in the fxl `r` map, throws an error if it does.
	 */
	__resIdMustNotExist: function (id)
	{
		if (r.hasOwnProperty(id)) throw new Error ('Resource identifier `' + id + '` is already in use');
	},

	/**
	 * Registers a solid-color resource.
	 * !static color (id: string, color: string, width: number, height: number) : Texture;
	 */
	color: function (id, color, width, height)
	{
		this.__resIdMustNotExist(id);

		return r[id] = { type: 'object', wrapper: 'Custom', color: color, width: width, height: height };
	},

	/**
	 * Registers a custom drawable resource.
	 * !static custom (id: string, width: number, height: number, drawFunction: (g: Canvas) => void) : Texture;
	 */
	custom: function (id, width, height, drawFunction, opts=null)
	{
		this.__resIdMustNotExist(id);

		return r[id] = { type: 'object', wrapper: 'Custom', width: width, height: height, draw: drawFunction, ...opts };
	},

	/**
	 * Registers an image resource.
	 * !static image (id: string, path: string, opts?: object) : Texture;
	 */
	image: function (id, path, opts=null)
	{
		this.__resIdMustNotExist(id);

		return r[id] = { type: 'image', wrapper: 'Drawable', src: path, ...opts };
	},

	/**
	 * Registers a multi image resource.
	 * @param id - Resource identifier.
	 * @param path - Path to the source file. Ensure to add the "#" marks to replace the file index (i.e. "image-##.png").
	 * @param count - Number of images to load (from 0 to count-1).
	 * !static images (id: string, path: string, count: number, frameWidth?: number, frameHeight?: number, configOptions?: object, resOptions?: object) : object;
	 */
	images: function (id, path, count, frameWidth=null, frameHeight=null, configOptions=null, resOptions=null)
	{
		this.__resIdMustNotExist(id);
		return r[id] = { type: 'images', wrapper: 'Spritesheet', src: path, count: count, width: frameWidth, height: frameHeight,
			config: {
				frameWidth: frameWidth, frameHeight: frameHeight, ...configOptions
			},
			...resOptions
		};
	},

	/**
	 * Registers an spritesheet resource.
	 * @param id - Resource identifier.
	 * @param path - Path to the source file.
	 * !static spritesheet (id: string, path: string, frameWidth: number, frameHeight: number, numFrames?: number, configOptions?: object, resOptions?: object) : res.SpritesheetResource;
	 */
	/**
	 * Registers an spritesheet resource.
	 * @param id - Resource identifier.
	 * @param path - Path to the source file.
	 * @param coords - Array of coordinates of each frame.
	 * !static spritesheet (id: string, path: string, frameWidth: number, frameHeight: number, coords: Array<[x,y,w,h]>, configOptions?: object, resOptions?: object) : res.SpritesheetResource;
	 */
	spritesheet: function (id, path, frameWidth, frameHeight, numFrames=0, configOptions=null, resOptions=null)
	{
		this.__resIdMustNotExist(id);

		return r[id] = { type: 'image', wrapper: 'Spritesheet', src: path,
			config: {
				frameWidth: frameWidth, frameHeight: frameHeight,
				numFrames: typeof(numFrames) === 'number' ? numFrames : 0,
				coords: typeof(numFrames) === 'number' ? null : numFrames,
				...configOptions
			},
			...resOptions,

			frame: function (x, y, w, h)
			{
				if (!this.config.coords)
					this.config.coords = [];

				this.config.coords.push([x, y, w, h]);
				return this;
			}
		};
	},

	/**
	 * Registers a spritesheet animation resource.
	 * @param id - Resource identifier.
	 * @param path - Path to the source file.
	 * !static animation (id: string, path: string, frameWidth: number, frameHeight: number, numFrames?: number, configOptions?: object, resOptions?: object) : res.AnimationResource;
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

	/**
	 * Registers a spritefont animation resource.
	 * @param id - Resource identifier.
	 * @param path - Path to the source file.
	 * !static spritefont (id: string, path: string, charWidth: number, charHeight: number, charset: string, optsA?: object, optsB?: object) : object;
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

	/**
	 * Registers a JSON data resource.
	 * @param id - Resource identifier.
	 * @param path - Path to the source file.
	 * !static json (id: string, path: string, opts?: object) : object;
	 */
	json: function (id, path, opts=null)
	{
		this.__resIdMustNotExist(id);

		return r[id] = { type: 'json', src: path, ...opts };
	},

	/**
	 * Registers a binary data resource.
	 * @param id - Resource identifier.
	 * @param path - Path to the source file.
	 * !static data (id: string, path: string, opts?: object) : object;
	 */
	data: function (id, path, opts=null)
	{
		this.__resIdMustNotExist(id);

		return r[id] = { type: 'data', src: path, ...opts };
	},

	/**
	 * Registers a text data resource.
	 * @param id - Resource identifier.
	 * @param path - Path to the source file.
	 * !static text (id: string, path: string, opts?: object) : object;
	 */
	text: function (id, path, opts=null)
	{
		this.__resIdMustNotExist(id);

		return r[id] = { type: 'text', src: path, ...opts };
	},

	/**
	 * Registers a sound effect audio resource.
	 * @param id - Resource identifier.
	 * @param path - Path to the source file.
	 * !static sfx (id: string, path: string, opts?: object) : object;
	 */
	sfx: function (id, path, opts=null)
	{
		this.__resIdMustNotExist(id);

		return r[id] = { type: 'audio', wrapper: 'Sound', src: path, track: 'sfx', ...opts };
	},

	/**
	 * Registers a multi sound effect audio resource.
	 * @param id - Resource identifier.
	 * @param path - Path to the source file. Ensure to add the "#" marks to replace the file index (i.e. "sound-##.ogg").
	 * @param count - Number of sounds to load (from 0 to count-1).
	 * @param mode - Playback mode, can be `sequential` (default) or `random`.
	 * !static sfxm (id: string, path: string, count: number, mode?: string) : object;
	 */
	sfxm: function (id, path, count, mode='sequential')
	{
		this.__resIdMustNotExist(id);
		return r[id] = { type: 'audios', wrapper: 'SoundArray', src: path, count: count, track: 'sfx', mode: mode };
	},

	/**
	 * Registers an music audio resource.
	 * @param id - Resource identifier.
	 * @param path - Path to the source file.
	 * !static music (id: string, path: string) : object;
	 */
	music: function (id, path)
	{
		this.__resIdMustNotExist(id);

		return r[id] = { type: 'audio', wrapper: 'Sound', src: path, track: 'music' };
	}
};

export default res;
