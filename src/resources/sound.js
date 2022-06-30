
import { Class } from 'rinn';
import Resources from './resources.js';

//![import "./resources"]

/*
	track: string (music|sfx)
*/

const Sound = Class.extend
({
	r: null,

	__ctor: function (r)
	{
		if (r.type != "audio")
			throw new Error ("Resource is not audio.");

		this.r = r;
		this.r.wrapper = this;

		this.track = Sound[this.r.track.toUpperCase()];
	},

	play: function (callback, volume)
	{
		return Sound.play (this, callback, volume);
	},

	playLoop: function (callback, volume)
	{
		return Sound.playLoop (this, callback, volume);
	}
});

Sound.ENGINE_HTML5 = 1;
Sound.ENGINE_WEBAUDIO = 2;
Sound.ENGINE_NATIVEAUDIO = 3;

Object.assign(Sound,
{
	MASTER: {
		enabled: true,
		volume: 1
	},

	SFX: {
		enabled: true,
		volume: 1
	},

	MUSIC: {
		enabled: true,
		volume: 0.8
	},

	VOICE: {
		enabled: true,
		volume: 1
	},

	MAX_POOL_SIZE: 100,

	pool: [ ],
	active: [ ],

	register: function (node)
	{
		if (node.registered) return;

		node.registered = true;
		this.active.push(node);
	},

	unregister: function (node)
	{
		if (!node.registered) return;

		node.registered = false;

		var i = Sound.active.indexOf(node);
		if (i == -1) return;

		Sound.active.splice(i, 1);
	},

	updateNode: function (node, cmd)
	{
		switch (node.snd.r.engine)
		{
			case Sound.ENGINE_WEBAUDIO:
				return this.updateNode_webaudio(node, cmd);

			case Sound.ENGINE_NATIVEAUDIO:
				return this.updateNode_nativeaudio(node, cmd);
		}

		return this.updateNode_audio(node, cmd);
	},

	// Web Audio.
	alloc_webaudio: function (node)
	{
		node.gainNode = audioContext.createGain();
		node.gainNode.gain.value = 0;
		node.gainNode.connect(audioContext.destination);

		node.res = audioContext.createBufferSource();
		node.res.buffer = node.snd.r.data;
		node.res.loop = false;
		node.res.connect(node.gainNode);
		node.res.node = node;
	},

	free_webaudio: function (node)
	{
		if (!node.res) return;

		node.gainNode.disconnect();

		node.res = null;
		node.gainNode = null;
	},

	// Native Audio (Cordova plugin).
	alloc_nativeaudio: function (node)
	{
		node.res = true;
	},

	free_nativeaudio: function (node)
	{
		node.res = false;
	},

	// HTML5 Audio.
	alloc_audio: function (node)
	{
		if (!this.pool.length)
			item = node.cloneNode();
		else
			item = this.pool.pop();

		item._src = node.src;
		return item;
	},

	free_audio: function (node)
	{
		if (this.pool.length == this.MAX_POOL_SIZE)
			return;

		//BUG: This causes a GET request of "/null" on Chromium.
		//node.src = null;

		this.pool.push(node);
	},

	/* *********************** */
	updateNode_webaudio: function (node, cmd)
	{
		if (!node) return null;

		var volume = Sound.MASTER.volume * node.snd.track.volume * node.volume;

		switch (cmd)
		{
			/* **************** */
			case 'play':
				if (node.playing) break;

				if (!node.res)
					Sound.alloc_webaudio(node);

				node.playTime = hrnow();
				node.playing = true;
				node.pause = false;

				node.res.onended = Sound.onended_webaudio;
				node.gainNode.gain.value = volume;

				try {
					node.res.start(0, node.startTime/1000.0);
				}
				catch (e) {
					Sound.free_webaudio(node);
					return null;
				}

				Sound.register(node);
				break;

			/* **************** */
			case 'setvolume':
				if (!node.res) break;

				node.gainNode.gain.value = volume;
				break;

			/* **************** */
			case 'stop':
				if (!node.playing && node.paused)
				{
					node.startTime = 0;
					node.paused = false;

					Sound.free_webaudio(node);
	
					if (node.callback) node.callback();
					break;
				}

				if (!node.res) break;

				node.startTime = 0;
				node.playing = false;
				node.pause = false;
				node.res.onended = null;

				Sound.unregister(node);
				node.res.stop();

				Sound.free_webaudio(node);

				if (node.callback) node.callback();
				break;

			/* **************** */
			case 'pause':
				if (!node.playing || !node.res)
					break;

				node.startTime += hrnow() - node.playTime;
				node.playing = false;
				node.pause = true;
				node.res.onended = null;

				Sound.unregister(node);
				node.res.stop();

				Sound.free_webaudio(node);
				break;

			/* **************** */
			case 'softstop':
				if (!node.playing && node.paused)
				{
					node.startTime = 0;
					node.paused = false;
					break;
				}

				if (!node.playing || !node.res)
					break;

				node.startTime = 0;
				node.playing = false;
				node.pause = false;

				node.res.loop = false;
				break;	
		}

		return node;
	},

	onended_webaudio: function (e)
	{
		var node = e.currentTarget.node;

		if (node.playing && node.loop != 0)
		{
			Sound.free_webaudio(node);

			if (node.loop != -1)
				node.loop--;

			node.startTime = 0;
			node.playing = false;
			node.pause = false;

			Sound.updateNode_webaudio (node, 'play');
			return;
		}

		node.res.onended = null;
		node.res.volume = 0;

		Sound.updateNode_webaudio (node, 'stop');
	},

	/* *********************** */
	updateNode_nativeaudio: function (node, cmd)
	{
		if (!node) return null;

		switch (cmd)
		{
			/* **************** */
			case 'play':
				if (node.playing) break;

				if (!node.res)
					Sound.alloc_nativeaudio(node);

				node.playing = true;
				node.pause = false;

				try {
					global.plugins.NativeAudio.play (node.snd.r.data, null, null, function() { Sound.onended_nativeaudio(node); } );
				}
				catch (e) {
					Sound.free_nativeaudio(node);
					return null;
				}

				Sound.register(node);
				break;

			/* **************** */
			case 'setvolume':
				// Unsupported.
				break;

			/* **************** */
			case 'stop':
				if (!node.res) break;

				node.playing = false;
				node.pause = false;

				Sound.unregister(node);
				global.plugins.NativeAudio.stop (node.snd.r.data, null);

				Sound.free_nativeaudio(node);

				if (node.callback) node.callback();
				break;

			/* **************** */
			case 'pause':
				// Unsupported.
				break;

			/* **************** */
			case 'softstop':
				// Unsupported.
				break;	
		}

		return node;
	},

	onended_nativeaudio: function (node)
	{
		Sound.updateNode_nativeaudio (node, 'stop');
	},

	updateNode_audio: function (node, cmd)
	{
		if (!node) return null;

		var volume = Sound.MASTER.volume * node.snd.track.volume * node.volume;

		switch (cmd)
		{
			/* **************** */
			case 'play':
				if (node.playing) break;

				if (!node.res)
				{
					node.res = Sound.alloc_audio (node.snd.r.data);
					node.res.node = node;
					node.res.src = node.res._src;
				}

				node.playTime = hrnow();
				node.playing = true;
				node.pause = false;

				node.res.onended = Sound.onended_audio;
				node.res.currentTime = node.startTime/1000.0;
				node.res.volume = volume;

				try {
					node.res.play();
				}
				catch (e) {
					Sound.free_audio (node.res);
					node.res = null;
					return null;
				}

				Sound.register(node);
				break;

			/* **************** */
			case 'setvolume':
				if (!node.res) break;

				node.res.volume = volume;
				break;

			/* **************** */
			case 'stop':
				if (!node.playing && node.paused)
				{
					node.startTime = 0;
					node.paused = false;

					Sound.free_audio (node.res);
					node.res = null;
	
					if (node.callback) node.callback();
					break;
				}

				if (!node.res) break;

				node.startTime = 0;
				node.playing = false;
				node.pause = false;

				Sound.unregister (node);
				node.res.pause();

				Sound.free_audio (node.res);
				node.res = null;

				if (node.callback) node.callback();
				break;

			/* **************** */
			case 'pause':
				if (!node.playing || !node.res)
					break;

				node.startTime += hrnow() - node.playTime;
				node.playing = false;
				node.pause = true;

				Sound.unregister (node);
				node.res.pause();
				break;

			/* **************** */
			case 'softstop':
				if (!node.playing && node.paused)
				{
					node.startTime = 0;
					node.paused = false;
					break;
				}

				if (!node.playing || !node.res)
					break;

				node.startTime = 0;
				node.playing = false;
				node.pause = false;
				break;	
		}

		return node;
	},

	onended_audio: function (e)
	{
		var node = e.currentTarget.node;

		if (node.playing && node.loop != 0)
		{
			if (node.loop != -1)
				node.loop--;

			node.startTime = 0;
			node.playing = false;
			node.pause = false;

			Sound.updateNode_audio (node, 'play');
			return;
		}

		node.res.onended = null;
		node.res.volume = 0;

		Sound.updateNode_audio (node, 'stop');
	},

	/* *************************************** */
	/* PUBLIC */

	enableTrack: function (track)
	{
		if (!track) return;

		track.enabled = true;
	},

	disableTrack: function (track)
	{
		if (!track) return;

		track.enabled = false;
	},

	setVolume: function (track, value)
	{
		if (!track) return;

		track.volume = value;
	},

	createNode: function (snd, volume)
	{
		var node = { };

		node.startVolume = volume;
		node.volume = volume;
		node.snd = snd;
		node.loop = 0;
		node.playing = false;
		node.paused = false;
		node.startTime = 0;
		node.playTime = 0;
		node.callback = null;
		node.timer = null;
		node.res = null;

		return node;
	},

	play: function (snd, completeCallback, volume)
	{
		if (!this.MASTER.enabled || !snd || !snd.track.enabled)
			return null;

		var volume = (volume !== undefined && volume !== null) ? volume : 1.0;

		var node = this.createNode(snd, volume);
		node.callback = completeCallback;

		return this.updateNode(node, 'play');
	},

	playLoop: function (snd, completeCallback, volume)
	{
		if (!this.MASTER.enabled || !snd || !snd.track.enabled)
			return null;

		volume = (volume !== undefined && volume !== null) ? volume : 1.0;
	
		var node = this.createNode(snd, volume);
		node.callback = completeCallback;
		node.loop = -1;

		return this.updateNode(node, 'play');
	},

	stop: function (node, callback)
	{
		if (!node) return null;

		if (callback && callback !== true) node.callback = callback;
		return this.updateNode(node, callback === true ? 'stop' : 'softstop');
	},

	pause: function (node)
	{
		if (!node) return null;

		return this.updateNode(node, 'pause');
	},

	resume: function (node)
	{
		if (!node) return null;

		return this.updateNode (node, 'play');
	},

	fadeOut: function (node, millis, callback)
	{
		if (!node) return;

		if (!node.playing || node.timer)
		{
			if (callback) callback();
			return;
		}

		var startTime = hrnow();
		node.startVolume = node.volume;

		node.timer = setInterval (function()
		{
			var t = ((hrnow() - startTime) / millis);
			if (t > 1) t = 1;

			node.volume = node.startVolume*(1-t);
			Sound.updateNode(node, 'setvolume');

			if (t == 1)
			{
				clearInterval (node.timer);
				node.timer = null;

				if (callback === true)
					Sound.updateNode(node, 'stop');
				else
					Sound.updateNode(node, 'pause');

				if (callback && callback !== true)
					callback();
			}
		},
		50);
	},

	fadeIn: function (node, millis, callback)
	{
		if (!node) return;

		if (node.playing || node.timer)
		{
			if (callback) callback();
			return;
		}

		var startTime = hrnow();

		node.volume = 0;
		this.updateNode(node, 'play');

		node.timer = setInterval (function()
		{
			var t = ((hrnow() - startTime) / millis);
			if (t > 1) t = 1;

			node.volume = node.startVolume*t;
			Sound.updateNode(node, 'setvolume');

			if (t == 1)
			{
				clearInterval (node.timer);
				node.timer = null;

				if (callback) callback();
			}
		},
		50);
	}
});

/**
 * 	Creates a descriptor for an audio resource.
 */
Resources.Audio = function (src, opts=null)
{
	return { type: "audio", wrapper: "Sound", src: src, ...opts };
};

export default Sound;
