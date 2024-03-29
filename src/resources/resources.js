
import { Rinn } from 'rinn';
import System from '../system/system.js';
import Canvas from '../system/canvas.js';
import Log from '../system/log.js';

//[import '../system/system']
//[import '../system/canvas']
//[import '../system/log']

const Resources = { };

import * as Wrappers from './wrappers.js';

let reported = false;


//!namespace Resources

	//!type ConfigOptions =

		/**
		 * Enables integer scaling. When enabled, calling `resizeImage` with `pixelated` parameter set to `true` will cause images to be resized to integer
		 * factors. When disabled, images will be resized using the half/double method to eventually end up reaching the exact target size.
		 *
		 * @default true
		 * !integerScalingEnabled?: boolean;
		 */
		/**
		 * Default value for the `pixelated` parameter of image resources. Controls whether to use integer scaling when resizing images.
		 * 
		 * @default false
		 * !pixelated?: boolean;
		 */
		/**
		 * Default value for the `filter` parameter of image resources. When an image does not have the `pixelated` property nor `filter`, this value will be used.
		 * 
		 * @default LINEAR
		 * !filter?: 'LINEAR'|'NEAREST';
		 */
		/**
		 * Default value for the `original` parameter of image resources. When set to `true`, no resizing at all will take place on the image resources and the
		 * original image will be used as-is.
		 * 
		 * @default false
		 * !original?: boolean;
		 */

	//!/type

//!/namespace

//:/**
//: * Provides functionality to load and manipulate resources (images, audio, etc).
//: */

//!class Resources

Object.assign(Resources,
{
	/**
	 * Enables integer scaling. When enabled, calling `resizeImage` with `pixelated` parameter set to `true` will cause images to be resized to integer
	 * factors. When disabled, images will be resized using the half/double method to eventually end up reaching the exact target size.
	 *
	 * @default true
	 * !static integerScalingEnabled: boolean;
	 */
	integerScalingEnabled: true,

	/**
	 * Default value for the `pixelated` parameter of image resources. Controls whether to use integer scaling when resizing images. Also controls the default
	 * scaling filter (LINEAR/NEAREST) the image will use when converted to a WebGL2 texture.
	 * 
	 * @default false
	 * !static pixelated: boolean;
	 */
	pixelated: false,

	/**
	 * Default value for the `filter` parameter of image resources. When an image does not have the `pixelated` property nor `filter`, this value will be used.
	 * 
	 * @default LINEAR
	 * !static filter: 'LINEAR'|'NEAREST';
	 */
	filter: 'LINEAR',

	/**
	 * Default value for the `original` parameter of image resources. When set to `true`, no resizing will take place on the image resource at all and the
	 * original will be used as-is.
	 * 
	 * @default false
	 * !static original: boolean;
	 */
	original: false,

	/**
	 * Configures the resources object with the specified options.
	 * !static config (options: Resources.ConfigOptions) : void;
	 */
	config: function (opts)
	{
		if (opts !== null)
			Object.assign(this, opts);
	},

	/**
	 * Loads a list of resources. The list parameter is actually a dictionary with objects as shown in the example below.
	 *
	 * { type: "image", wrapper: "", src: "assets/ui/btn-left.png", width: 64, \[ height: 64 \], scale: 1, pixelated: false, filter: null, original: false }
	 * { type: "images", wrapper: "", src: "assets/ui/##.png", count: 16, width: 64, \[ height: 64 \], pixelated: false }
	 * { type: "audio", wrapper: "", src: "assets/ui/tap.wav", track: "sfx|music" }
	 * { type: "audios", wrapper: "", src: "assets/ui/snd-##.wav", count: 4 }
	 * { type: "json", wrapper: "", src: "assets/config.json" }
	 * { type: "data", wrapper: "", src: "assets/config.dat" }
	 * { type: "text", wrapper: "", src: "assets/config.frag" }
	 * { type: "object", wrapper: "" }
	 *
	 * @param list - Map of resources to load.
	 * @param progressCallback - Executed once for every resource loaded.
	 * @param completeCallback - Executed when all resources have been loaded.
	 * !static load (list: { \[id: string\] : object }, progressCallback: (index: number, count: number, ratio: number, name: string) => void, completeCallback: (list: { \[id: string\] : object }) => void) : void;
	 */
	load: function (list, progressCallback, completeCallback, keyList, index)
	{
		if (!keyList)
		{
			keyList = Object.keys(list);

			for (let i in keyList)
			{
				if (!('__loaded' in list[keyList[i]]))
					list[keyList[i]].__clone = Rinn.clone(list[keyList[i]]);
			}

			index = 0;
		}

		while (index < keyList.length && ('__loaded' in list[keyList[index]]))
			index++;

		if (progressCallback)
			progressCallback (index, keyList.length, index / keyList.length, index < keyList.length ? keyList[index] : null);

		if (index == keyList.length)
		{
			if (completeCallback)
				completeCallback(list);

			return;
		}

		let r = list[keyList[index]];
		r.resName = keyList[index];

		let src, d0, d1, dN, cb;

		switch (r.type)
		{
			case "image":
				r.data = new Image ();
				r.data.onload = async function ()
				{
					const ratio = r.data.width / r.data.height;

					if (r.scale) {
						r.width = int(r.data.width*r.scale);
						r.height = int(r.data.height*r.scale);
					}

					if (!r.hasOwnProperty('extraScale'))
						r.extraScale = 0.0;

					if (!r.width && !r.height)
					{
						r.width = r.data.width;
						r.height = r.data.height;
					}
					else if (r.width && !r.height)
					{
						r.height = int(r.width / ratio);
					}
					else if (!r.width && r.height)
					{
						r.width = int(ratio * r.height);
					}

					//TODO remove this comment if nothing explodes after removing owidth and oheight.
					//r.owidth = r.data.width;
					//r.oheight = r.data.height;

					if (!r.hasOwnProperty('filter'))
						r.filter = !r.hasOwnProperty('pixelated') ? Resources.filter : (r.pixelated === true ? 'NEAREST' : Resources.filter);

					if (!r.hasOwnProperty('pixelated'))
						r.pixelated = Resources.pixelated;

					if (!r.hasOwnProperty('original'))
						r.original = Resources.original;

					if ((r.data.width != r.width || r.data.height != r.height || r.extraScale != 0.0) && r.original !== true)
					{
//let t = hrnow(); //violet
						r.data = await Resources.resizeImage (r, r.width * (r.extraScale + (r.pixelated ? System.integerScaleFactor : System.scaleFactor)), r.height * (r.extraScale + (r.pixelated ? System.integerScaleFactor : System.scaleFactor)), r.pixelated, true);
//console.log((hrnow() - t) + ': resize to ' + (r.width * (r.pixelated ? System.integerScaleFactor : System.scaleFactor)) + 'x' + (r.height * (r.pixelated ? System.integerScaleFactor : System.scaleFactor)));
					}

					r.rscale = r.data.width / r.width;

					r.data.rscale = r.rscale;
					r.data.filter = r.filter;
					r.data.targetWidth = r.width;
					r.data.targetHeight = r.height;

					if (r.hasOwnProperty('mipmap') && r.mipmap > 0)
						r.data.mipmap = r.mipmap;

					// Pre-draw on an offscreen canvas, used to prevent a delay when rendering an image for the first time on some browsers.
					System.tempDisplayBuffer.drawImage(r.data, 0, 0);
					System.renderer.prepareImage(r.data);

					Resources.onLoaded (list, keyList[index], () => {
						Resources.load (list, progressCallback, completeCallback, keyList, index+1);
					});
				};

				r.data.onerror = function () {
					console.error ("Error: Unable to load: " + r.resName);
				};

				r.data.src = r.src + "?r=" + Math.random();
				break;

			case "images":
				src = r.src;
				d0 = src.indexOf("#");
				d1 = src.lastIndexOf("#");
				dN = d1 - d0 + 1;

				if (d0 == -1)
				{
					console.error ("Unable to load: " + r.resName + "\nError: The 'src' attribute requires one or more '#' marks.");
					return;
				}

				if (!r.count)
				{
					console.error ("Unable to load: " + r.resName + "\nError: The 'count' attribute was not found.");
					return;
				}

				r._i = 0;
				r.data = [ ];

				cb = function ()
				{
					if (r._i == r.count)
					{
						Resources.onLoaded (list, keyList[index], () => {
							Resources.load (list, progressCallback, completeCallback, keyList, index + 1);
						});

						return;
					}

					// TODO add support for extraScale
					let tmp = { type: "image", width: r.width, height: r.height, scale: r.scale };

					tmp.src = r.src.substr(0, d0) + ((r._i++) / Math.pow(10,dN)).toFixed(dN).substr(2) + r.src.substr(d1+1);
					tmp.data = new Image ();
					tmp.resName = r.resName + "#" + (r._i - 1);

					if (progressCallback)
						progressCallback (index, keyList.length, (index / keyList.length) + ((r._i-1)/r.count)*(1 / keyList.length), r.resName + '/' + (r._i-1));

					tmp.data.onload = async function ()
					{
						let ratio = tmp.data.width / tmp.data.height;

						if (tmp.scale)
						{
							tmp.width = int(tmp.data.width*tmp.scale);
							tmp.height = int(tmp.data.height*tmp.scale);
						}

						if (!tmp.width && !tmp.height)
						{
							tmp.width = tmp.data.width;
							tmp.height = tmp.data.height;
						}
						else if (tmp.width && !tmp.height)
						{
							tmp.height = int(tmp.width / ratio);
						}
						else if (!tmp.width && tmp.height)
						{
							tmp.width = int(ratio * tmp.height);
						}

						if (r._i == 1)
						{
							r.owidth = tmp.data.width;
							r.oheight = tmp.data.height;

							if (!r.hasOwnProperty('filter'))
								r.filter = !r.hasOwnProperty('pixelated') ? Resources.filter : (r.pixelated === true ? 'NEAREST' : Resources.filter);

							if (!r.hasOwnProperty('pixelated'))
								r.pixelated = Resources.pixelated;

							if (!r.hasOwnProperty('original'))
								r.original = Resources.original;
						}

						tmp.pixelated = r.pixelated;
						tmp.filter = r.filter;
						tmp.original = r.original;

						if ((tmp.data.width != tmp.width || tmp.data.height != tmp.height) && tmp.original !== true)
						{
//let t = hrnow();//violet
							tmp.data = await Resources.resizeImage (tmp, tmp.width * (r.pixelated ? System.integerScaleFactor : System.scaleFactor), tmp.height * (tmp.pixelated ? System.integerScaleFactor : System.scaleFactor), tmp.pixelated, true);
//console.log((hrnow() - t) + ': resize to ' + (tmp.width * (r.pixelated ? System.integerScaleFactor : System.scaleFactor)) + 'x' + (tmp.height * (r.pixelated ? System.integerScaleFactor : System.scaleFactor)));
						}

						tmp.rscale = tmp.data.width / tmp.width;

						tmp.data.rscale = tmp.rscale;
						tmp.data.filter = tmp.filter;
						tmp.data.targetWidth = tmp.width;
						tmp.data.targetHeight = tmp.height;

						if (r.hasOwnProperty('mipmap') && r.mipmap > 0)
							tmp.data.mipmap = r.mipmap;
	
						if (r._i == 1)
						{
							r.width = tmp.width;
							r.height = tmp.height;
							r.rscale = tmp.rscale;
						}

						System.tempDisplayBuffer.drawImage(tmp.data, 0, 0);
						System.renderer.prepareImage(tmp.data);

						r.data.push(tmp);
						cb();
					};

					tmp.data.onerror = function () {
						console.error("Error: Unable to load: " + tmp.resName);
					};

					tmp.data.src = tmp.src + "?r=" + Math.random();
				};

				cb();
				break;

			case "audio":
				if (!r.track) r.track = "sfx";

				if (global.plugins && global.plugins.NativeAudio && r.track == "sfx")
				{
					if (!reported) {
						Log.write('ENGINE_NATIVEAUDIO');
						reported = true;
					}

					r.engine = Wrappers.Sound.ENGINE_NATIVEAUDIO;
					r.data = "snd_" + index;

					global.plugins.NativeAudio.preloadSimple(r.data, r.src,
						function() {
							Resources.onLoaded (list, keyList[index], () => {
								Resources.load (list, progressCallback, completeCallback, keyList, index + 1);		
							});
						},
						function(e) {
							console.error("Error: Unable to load (sfx): " + r.resName + "\n" + e);
						}
					);

					break;
				}

				if (global.audioContext)
				{
					if (!reported) {
						Log.write('ENGINE_WEBAUDIO');
						reported = true;
					}

					r.engine = Wrappers.Sound.ENGINE_WEBAUDIO;

					fetchAudioBuffer (r.src + "?r=" + Math.random())
					.then (audioBuffer => {
						r.data = audioBuffer;
						Resources.onLoaded (list, keyList[index], () => {
							Resources.load (list, progressCallback, completeCallback, keyList, index + 1);
						});
					})
					.catch (err => {
						console.error("Error: Unable to load: " + r.resName + "\n" + err);
					});

					break;
				}

				if (!reported) {
					Log.write('ENGINE_HTML5');
					reported = true;
				}

				r.data = new Audio ();
				r.engine = Wrappers.Sound.ENGINE_HTML5;

				r.data.oncanplaythrough = function ()
				{
					Resources.onLoaded (list, keyList[index],  () => {
						Resources.load (list, progressCallback, completeCallback, keyList, index + 1);
					});
				};

				r.data.onerror = function ()
				{
					console.error("Error: Unable to load: " + r.resName);
				};

				r.data.src = r.src + "?r=" + Math.random();
				break;

			case "audios":
				src = r.src;
				d0 = src.indexOf("#");
				d1 = src.lastIndexOf("#");
				dN = d1 - d0 + 1;

				if (d0 == -1)
				{
					console.error ("Unable to load: " + r.resName + "\nError: The 'src' attribute requires one or more '#' marks.");
					return;
				}

				if (!r.count)
				{
					console.error ("Unable to load: " + r.resName + "\nError: The 'count' attribute was not found.");
					return;
				}

				r._i = 0;
				r.data = [ ];

				cb = function ()
				{
					if (r._i == r.count)
					{
						Resources.onLoaded (list, keyList[index], () => {
							Resources.load (list, progressCallback, completeCallback, keyList, index + 1);
						});
						return;
					}

					let tmp = { type: "audio", track: r.track };

					tmp.src = r.src.substr(0, d0) + ((r._i++) / Math.pow(10,dN)).toFixed(dN).substr(2) + r.src.substr(d1+1);
					tmp.resName = r.resName + "#" + (r._i - 1);

					if (!tmp.track) tmp.track = "sfx";

					if (global.plugins && global.plugins.NativeAudio && tmp.track == "sfx")
					{
						tmp.engine = Wrappers.Sound.ENGINE_NATIVEAUDIO;
						tmp.data = "snd_" + index + "_" + r._i;
	
						global.plugins.NativeAudio.preloadSimple(tmp.data, tmp.src,
							function() {
								r.data.push(tmp);
								cb();
							},
							function(e) {
								console.error("Error: Unable to load (sfx): " + tmp.resName + "\n" + e);
							}
						);

						return;
					}

					if (global.audioContext)
					{
						tmp.engine = Wrappers.Sound.ENGINE_WEBAUDIO;

						fetchAudioBuffer (tmp.src + "?r=" + Math.random())
						.then (audioBuffer => {
							tmp.data = audioBuffer;
							r.data.push(tmp);
							cb();
						})
						.catch (err => {
							console.error("Error: Unable to load: " + tmp.resName + "\n" + err);
						});

						return;
					}

					tmp.data = new Audio ();
					tmp.engine = Wrappers.Sound.ENGINE_HTML5;

					tmp.data.oncanplaythrough = function ()
					{
						r.data.push(tmp);
						cb();
					};

					tmp.data.onerror = function ()
					{
						console.error("Error: Unable to load: " + tmp.resName);
					};

					tmp.data.src = tmp.src + "?r=" + Math.random();
				};

				cb();
				break;

			case "json":

				fetchd (r.src + "?r=" + Math.random(), { responseType: 'json' }).then(function(json)
				{
					r.data = json;

					Resources.onLoaded (list, keyList[index], () => {
						Resources.load (list, progressCallback, completeCallback, keyList, index + 1);
					});
				})
				.catch(function(err)
				{
					console.error("Error: Unable to load: " + r.resName + "\n" + err);
				});

				break;

			case "data":

				fetchd (r.src + "?r=" + Math.random()).then(function(arraybuffer)
				{
					r.data = arraybuffer;

					Resources.onLoaded (list, keyList[index], () => {
						Resources.load (list, progressCallback, completeCallback, keyList, index + 1);
					});
				})
				.catch(function(err)
				{
					console.error("Error: Unable to load: " + r.resName + "\n" + err);
				});

				break;

			case "text":

				fetchd (r.src + "?r=" + Math.random()).then(function(arrayBuffer)
				{
					let enc = new TextDecoder('utf-8');
					r.data = enc.decode(arrayBuffer);

					Resources.onLoaded (list, keyList[index], () => {
						Resources.load (list, progressCallback, completeCallback, keyList, index + 1);
					});
				})
				.catch(function(err)
				{
					console.error("Error: Unable to load: " + r.resName + "\n" + err);
				});

				break;

			case "object":
				r.data = { };

				Resources.onLoaded (list, keyList[index], () => {
					Resources.load (list, progressCallback, completeCallback, keyList, index + 1);
				});
				break;
		}
	},

	/**
	 * Unloads the specified list of resources.
	 * !static unload (list: { \[id: string\] : object }) : void;
	 */
	unload: function (list)
	{
		throw new Error('IMPLEMENTED UNLOAD!');

		let __original;

		for (let i in list)
		{
			if (i == "__original")
			{
				__original = list[i];
				delete list[i];
				continue;
			}

			if (list[i].r)
			{
				dispose(list[i]);
				list[i] = list[i].r;
			}

			switch (list[i].type)
			{
				case "audio":
					// TODO unload audio if using NativeAudio
					// global.plugins.NativeAudio.unload
					break;

				case "audios":
					// TODO unload audio if using NativeAudio
					// global.plugins.NativeAudio.unload
					break;

				case "images":
					for (let j = 0; j < list[i].data.length; j++)
						dispose (list[i].data[j]);
					break;

				default:
					dispose (list[i].data);
					break;
			}

			list[i].data = null;
			delete list[i];
		}

		for (let i in __original)
			list[i] = __original[i];
	},

	/**
	 * Executes post-load actions on a resource.
	 */
	onLoaded: function (list, index, callback)
	{
		let r = list[index];
		if (!r.wrapper || !(r.wrapper in Wrappers))
		{
			callback();
			return;
		}

		list[index] = new Wrappers[r.wrapper] (r);

		if ('init' in list[index])
		{
			list[index].init(() => {
				list[index].__loaded = true;
				callback();
			});
		}
		else {
			list[index].__loaded = true;
			callback();
		}
	},

	/**
	 * Loads an image, returns a promise.
	 * !static loadImage (src: string) : Promise<HTMLImageElement>;
	 */
	loadImage: function (url)
	{
		return new Promise((resolve, reject) => {
			const image = new Image();
			image.onload = () => resolve(image);
			image.onerror = () => reject(new Error('Unable to load image'));
			image.src = url;
		});
	},

	/**
	 * Resizes the given image to the specified size.
	 * !static resizeImage (image: HTMLImageElement, targetWidth: number, targetHeight: number, pixelated?: boolean, discardOriginal?: boolean) : HTMLImageElement|HTMLCanvasElement;
	 */
	resizeImage: async function (image, dw, dh, pixelated, discardOriginal)
	{
		let sw = image.data.width;
		let sh = image.data.height;

		dw = int(dw);
		dh = int(dh);

		if (sw == dw && sh == dh)
			return image.data;

		if (!this.integerScalingEnabled && pixelated) pixelated = null;

		if (!pixelated)
		{
			pixelated = pixelated === null ? false : true;

			let temp = new Canvas ({ hidden: true, antialias: pixelated }).resize (sw, sh);
			temp.drawImage (image.data, 0, 0);

			while (true)
			{
				let tw = sw >> 1;
				let th = sh >> 1;

				if (tw <= dw || th <= dh)
					break;

				let output = new Canvas ({ hidden: true, antialias: pixelated }).resize (tw, th);
				output.drawImage (temp.elem, 0, 0, tw, th);
				temp.dispose ();

				sw = tw;
				sh = th;

				temp = output;
			}

			let output = new Canvas ({ hidden: true, antialias: pixelated }).resize (dw, dh);
			output.drawImage (temp.elem, 0, 0, dw, dh);
			temp.dispose ();

			if (discardOriginal)
				dispose (image.data);

			return await this.loadImage(output.toDataUrl());
		}
		else
		{
			if (int(dw / sw) > 0)
			{
				let ratio = int((dw / sw) + 0.9);

				dw = ratio * sw;
				dh = ratio * sh;

				let rep_x = dw / sw;
				let rep_y = dh / sh;

				let output = new Canvas ({ hidden: true, antialias: false }).resize (dw, dh);

				let temp = new Canvas ({ hidden: true, antialias: false }).resize (sw, sh);
				temp.drawImage (image.data, 0, 0);

				for (let j = 0; j < sh; j++)
				{
					let s = temp.getImageData(0, j, sw, 1).data;
					let sp = 0;

					for (let i = 0; i < sw && sp < s.length; i++, sp += 4)
					{
						output.fillStyle("rgba("+s[sp]+","+s[sp+1]+","+s[sp+2]+","+(s[sp+3] / 255)+")");
						output.fillRect(i*rep_x, j*rep_y, rep_x, rep_y);
					}
				}

				temp.dispose();

				return await this.loadImage(output.toDataUrl());
			}

			return this.resizeImage (image, dw, dh, null, discardOriginal);
		}
	},

	/**
	 * Flips an image horizontally.
	 * !static flipImageHorz (image: HTMLImageElement) : HTMLImageElement;
	 */
	flipImageHorz: function (image)
	{
		let temp = new Canvas ({ hidden: true }).resize (image.data.width, image.data.height);

		temp.translate(image.data.width, 0);
		temp.scale(-1, 1);

		temp.drawImage (image.data, 0, 0);
		return temp.elem;
	},

	/**
	 * Flips an image vertically.
	 * !static flipImageVert (image: HTMLImageElement) : HTMLImageElement;
	 */
	flipImageVert: function (image)
	{
		let temp = new Canvas ({ hidden: true }).resize (image.data.width, image.data.height);

		temp.translate(0, image.data.height);
		temp.scale(1, -1);

		temp.drawImage (image.data, 0, 0);
		return temp.elem;
	},

	/**
	 * Forces the browser to show a download dialog.
	 * !static showDownload (filename: string, dataUrl: string) : void;
	 */
	showDownload: function (filename, dataUrl)
	{
		let link = document.createElement("a");
		link.href = dataUrl;

		link.style.display = 'none';
		link.download = filename;
		link.target = "_blank";

		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	},

	/**
	 * Forces the browser to show a file selection dialog.
	 * !static showFilePicker (allowMultiple: boolean, accept: string, callback: (files: Array<File>) => void) : void;
	 */
	showFilePicker: function (allowMultiple, accept, callback)
	{
		let input = document.createElement("input");

		input.type = "file";
		input.accept = accept;
		input.style.display = 'none';
		input.multiple = allowMultiple;

		document.body.appendChild(input);

		input.onchange = function ()
		{
			callback(input.files);
		};

		document.body.onfocus = function ()
		{
			document.body.onfocus = null;
			document.body.removeChild(input);
		};

		input.click();
	},

	/**
	 * Loads a file using FileReader and returns the result as a dataURL.
	 * !static loadAsDataURL (file: File, callback: (dataUrl: string) => void) : void;
	 */
	loadAsDataURL: function (file, callback)
	{
		let reader = new FileReader();

		reader.onload = function(e) {
			callback (e.target.result);
		};

		reader.readAsDataURL(file);
	},

	/**
	 * Loads a file using FileReader and returns the result as text.
	 * !static loadAsText (file: File, callback: (text: string) => void) : void;
	 */
	loadAsText: function (file, callback)
	{
		let reader = new FileReader();

		reader.onload = function(e) {
			callback (e.target.result);
		};

		reader.readAsText(file);
	},

	/**
	 * Loads a file using FileReader and returns the result as an array buffer.
	 * !static loadAsArrayBuffer (file: File, callback: (buff: ArrayBuffer) => void) : void;
	 */
	loadAsArrayBuffer: function (file, callback)
	{
		let reader = new FileReader();

		reader.onload = function(e) {
			callback (e.target.result);
		};

		reader.readAsArrayBuffer(file);
	},

	/**
	 * Loads an array of File objects using FileReader and returns them as data URLs.
	 * !static loadAllAsDataURL (fileList: Array<File>, callback: (urlList: Array<{name:string, size:number, url:string}>) => void) : void;
	 */
	loadAllAsDataURL: function (fileList, callback)
	{
		let result = [];

		if (!fileList || !fileList.length)
		{
			callback(result);
			return;
		}

		let loadNext = function (i)
		{
			if (i == fileList.length)
			{
				callback(result);
				return;
			}

			Resources.loadAsDataURL (fileList[i], function(url) {
				result.push({ name: fileList[i].name, size: fileList[i].size, url: url });
				loadNext(i+1);
			});
		};

		loadNext(0);
	}
});

//!/class

export default Resources;
