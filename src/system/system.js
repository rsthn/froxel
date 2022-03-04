/*
**	system/system.js
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

import KeyCode from './keycode.js';
import List from '../utils/list.js';
import Linkable from '../utils/linkable.js';
import Timer from './timer.js';
import Canvas from './canvas.js';
import Log from './log.js';
import globals from './globals.js';

//![import "./keycode"]
//![import "../utils/list"]
//![import "../utils/linkable"]
//![import "./timer"]
//![import "./canvas"]
//![import "./globals"]

//!namespace System

	//:type DisplayOrientation = 'default'|'landscape'|'portrait'|'automatic';

	//!type Options =

		/**
		 *	Background of the system canvas. Should be a full 7-digit HEX RGB color.
		 *	@default "#000000"
		 *	!background?: string;
		 */

		/**
		 * 	Set to `false` to disable WebGL mode.
		 * 	@default true
		 * 	!gl?: boolean;
		 */

		/**
		 *	Set to `true` t o enable on-screen logging.
		 *	@default false
		 *	!log?: boolean,
		 */

		/**
		 *	When `true` the renderer will not clear the buffer on each frame draw, thus allowing overdrawing on the previous frame.
		 *	@default false
		 *	!overdraw?: boolean,
		 */

		/**
		 *	Enables or disables antialised canvas. Set to `false` when pixel-perfect is desired.
		 *	@default false
		 *	!antialias?: boolean;
		 */

		/**
		 *	Desired orientaton of the display.
		 *	@default "automatic"
		 *	!orientation?: System.DisplayOrientation;
		 */

		/**
		 *	Desired display width. When not specified (null) the maximum screen width to maintain the aspect ratio will be used.
		 *	@default null
		 *	!screenWidth?: number;
		 */

		/**
		 *	Desired display height. When not specified (null) the maximum screen height to maintain the aspect ratio will be used.
		 *	@default null
		 *	!screenHeight?: number;
		 */

		/**
		 *	Target frames per second (FPS). Used to determine delay between frames.
		 *	@default 144
		 *	!fps?: number;
		 */

		/**
		 *	Minimum allowed frames per second (FPS). If system FPS drops below this value, the `frameDelta` property of System will be truncated to 1/minFps.
		 *	@default 10
		 *	!minFps?: number;
		 */

		/**
		 *	Selects which rendering mechanism to use either requestAnimationFrame when `true` or setTimeout when `false`.
		 *	@default true
		 *	!vsync?: boolean;
		 */

		/**
		 *	Extra scale factor used to resize images. Use only when you want to render higher resolution images possibly for a very high DPI display.
		 *	@default 1
		 *	!extraScaleFactor?: number;
		 */

		/**
		 *	Indicates which method to use to find the target resolution, using `fullscreen` object when `true`, or the `window` object when `false`.
		 *	@default false
		 *	!fullscreen?: boolean;
		 */
	  
	//!/type

//!/namespace

//!class System

const System =
{
	/**
	 * 	Renderer status flags.
	 */
	flags:
	{
		renderingEnabled: false,
		renderingPaused: false
	},

	/**
	 * 	Default options of the rendering system.
	 */
	defaultOptions:
	{
		background: "#000000",
		gl: true,
		log: false,

		overdraw: false,
		antialias: true,
		orientation: 0,

		fps: 144,
		minFps: 15,
		vsync: true,

		screenWidth: null,
		screenHeight: null,

		extraScaleFactor: 1,
		fullscreen: false
	},

	/**
	 * 	Screen width, available only after the system has been initialized.
	 * 	!static readonly screenWidth: number;
	 */
	screenWidth: 0,

	/**
	 * 	Screen height, available only after the system has been initialized.
	 * 	!static readonly screenHeight: number;
	 */
	screenHeight: 0,

	/**
	 * 	Current display orientation.
	 * 	!static readonly orientation: System.DisplayOrientation;
	 */
	orientation: 0,

	/**
	 * 	Coordinates of the screen's offset (for letter-box effect when the screen does not fit tightly).
	 */
	offsX: 0, offsY: 0,

	/**
	 * 	Device pixel ratio, canvas backing store ratio and resulting canvas ratio (devicePixelRatio / backingStoreRatio).
	 */
	devicePixelRatio: 1, backingStoreRatio: 1, canvasPixelRatio: 1, canvasScaleFactor: 1, scaleFactor: 1,

	/**
	 * 	Initial transformation matrix. Should be used (if needed) instead of `loadIdentity` since the System does some transformations first.
	 * 	!static readonly initialMatrix: Matrix;
	 */
	initialMatrix: null,

	/**
	 * 	Primary renderer.
	 * 	!static readonly renderer: Canvas;
	 */
	renderer: null,

	/**
	 * 	Secondary display buffer (always 2D). Has the same initial transformation matrix as the primary display buffer.
	 * 	!static readonly displayBuffer2: Canvas;
	 */
	displayBuffer2: null,

	/**
	 * 	Terciary display buffer (always 2D). Is assured to have 1:1 with the screen size, initial transformation matrix not applied.
	 * 	!static readonly displayBuffer3: Canvas;
	 */
	displayBuffer3: null,

	/**
	 * 	Small (320x240) temporal display buffer. Used to preload images.
	 */
	tempDisplayBuffer: null,

	/**
	 * 	Map with the status of all keys (along with other flags).
	 */
	keyState: { time: 0, shift: false, ctrl: false, alt: false, keyCode: 0 },

	/**
	 * 	Current status of all pointers. The related object is known as the Pointer State, and has the following fields: id, isActive, isDragging, sx, sy, x, y, dx, dy, button, wheelDelta and wheelAccum.
	 */
	pointerState: { },

	/**
	 * 	The update method of all objects will be executed when the system update() method is called.
	 */
	updateQueue: null,

	/**
	 * 	The draw method of all objects will be executed when the system draw() method is called.
	 */
	drawQueue: null, /*List*/

	/**
	 * 	The frame delta is multiplied by this value before each system cycle (defaults to 1).
	 * 	!static timeScale: number;
	 */
	timeScale: 1,

	/**
	 * 	Frame interval in milliseconds.
	 * 	!static readonly frameInterval: number;
	 */
	frameInterval: 0,

	/**
	 * 	Fixed frame interval in milliseconds, when set to non-zero value the frame delta will always be set to this value.
	 * 	!static fixedFrameInterval: number;
	 */
	fixedFrameInterval: 0,

	/**
	 * 	Maximum frame interval in milliseconds, if the `frameDelta` exceeds this, it will be truncated to this value. Controlled by the `minFps` value
	 * 	of the system initialization options.
	 * 	!static readonly maxFrameInterval: number;
	 */
	maxFrameInterval: 0,

	/**
	 * 	Last frame delta in seconds.
	 * 	!static readonly frameDelta: number;
	 */
	frameDelta: 0,

	/**
	 * 	Logical system time in seconds. Updated on each cycle by the calculated `frameDelta`.
	 * 	!static readonly frameTime: number;
	 */
	frameTime: 0,

	/**
	 * 	Current frame number.
	 * 	!static readonly frameNumber: number;
	 */
	frameNumber: 0,

	/**
	 * 	Rendering performance data.
	 */
	perf:
	{
		/**
		 * 	Current time range.
		 */
		startTime: 0,
		lastTime: 0,

		/**
		 * 	Number of frames drawn in the current time range.
		 */
		numFrames: 0,

		/**
		 * 	Number of update and draw samples averaged in total.
		 */
		numSamples: 0,

		/**
		 * 	Total time spent in update, draw and extra respectively in the current time range.
		 */
		updateTimeTotal: 0,
		drawTimeTotal: 0,
		extraTimeTotal: 0,

		/**
		 * 	Calculated values for the last time range. The updateTime and drawTime are in microseconds.
		 */
		fps: 0,
		averageFps: 0,
		averageUpdateTime: 0,
		averageDrawTime: 0,
		averageExtraTime: 0
	},

	/**
	 * 	Initializes the system with the specified configuration options.
	 * 	!static init (options: System.Options) : void;
	 */
	init: function (options=null)
	{
		let self = this;

		let o = { ...this.defaultOptions, ...options };
		this.options = o;

		// Set default orientation if both target sizes were specified.
		if (o.screenWidth && o.screenHeight && o.orientation == 'default')
			o.orientation = o.screenWidth > o.screenHeight ? 'landscape' : 'portrait';

		this.orientation = o.orientation;

		this.updateQueue = List.Pool.alloc();
		this.drawQueue = List.Pool.alloc();

		// Attach frame event handlers.
		this.frameInterval = 1000 / o.fps;
		this.maxFrameInterval = 1000 / o.minFps;

		global.onresize = function() { self.onWindowResized(); };

		this.frameTimer = new Timer (o.vsync, this.frameInterval, (delta) => this.onFrame(delta));

		// Setup canvas buffer.
		this.renderer = new Canvas ({ gl: o.gl, elem: null, absolute: true, hidden: false, antialias: o.antialias, background: o.background });

		this.displayBuffer2 = new Canvas ({ gl: false, elem: null, absolute: true, hidden: false, antialias: o.antialias, background: 'none' });
		this.displayBuffer2.elem.style.pointerEvents = 'none';

		this.displayBuffer3 = new Canvas ({ gl: false, elem: null, absolute: true, hidden: false, antialias: o.antialias, background: 'none' });
		this.displayBuffer3.elem.style.pointerEvents = 'none';

		this.tempDisplayBuffer = new Canvas ({ hidden: true, antialias: o.antialias }).resize(320, 240);

		let display0 = this.renderer.elem;

		// Obtain device display ratios.
		this.devicePixelRatio = global.devicePixelRatio || 1;

		this.backingStoreRatio = o.gl === true ? 1 : (this.renderer.context.webkitBackingStorePixelRatio ||
									this.renderer.context.mozBackingStorePixelRatio ||
									this.renderer.context.msBackingStorePixelRatio ||
									this.renderer.context.oBackingStorePixelRatio ||
									this.renderer.context.backingStorePixelRatio || 1);

		this.canvasPixelRatio = this.devicePixelRatio / this.backingStoreRatio;

		System.onWindowResized(true);

		// Attach keyboard event handlers.
		global.onkeydown = function (evt)
		{
			if (evt.target !== global.document.body)
				return;

			if (self.keyState[evt.keyCode])
				return false;

			self.keyState[evt.keyCode] = true;

			self.keyState.keyCode = evt.keyCode;
			self.keyState.startTime = hrnow();

			switch (evt.keyCode)
			{
				case 16: // SHIFT
					self.keyState.shift = true;
					break;

				case 17: // CTRL
					self.keyState.ctrl = true;
					break;

				case 18: // ALT
					self.keyState.alt = true;
					break;
			}

			// CTRL+TAB should always be handled by the browser.
			if (self.keyState.ctrl && evt.keyCode == KeyCode.TAB)
			{
				self.keyState[evt.keyCode] = false;
				return true;
			}

			if (self.onKeyboardEvent (self.KeyboardEventType.KEY_DOWN, evt.keyCode, self.keyState) === false)
				return false;
		};

		global.onkeyup = function (evt)
		{
			if (evt.target !== global.document.body)
				return;

			if (!self.keyState[evt.keyCode])
				return false;

			self.keyState[evt.keyCode] = false;
			self.keyState.endTime = hrnow();
			self.keyState.keyCode = evt.keyCode;

			switch (evt.keyCode)
			{
				case 16: // SHIFT
					self.keyState.shift = false;
					break;

				case 17: // CTRL
					self.keyState.ctrl = false;
					break;

				case 18: // ALT
					self.keyState.alt = false;
					break;
			}

			if (self.onKeyboardEvent (self.KeyboardEventType.KEY_UP, evt.keyCode, self.keyState) === false)
				return false;
		};

		// Converts pointer coordinates from physical space to screen space.

		const pointerConvX = function (x, y)
		{
			return System.reverseRender ? int(System.screenWidth-1 - (y-System.offsY)/System.canvasScaleFactor) : int((x-System.offsX)/System.canvasScaleFactor);
		};

		const pointerConvY = function (x, y)
		{
			return System.reverseRender ? int((x-System.offsX)/System.canvasScaleFactor) : int((y-System.offsY)/System.canvasScaleFactor);
		};

		// Attach pointer event handlers if pointer-events are available.
		if ("ontouchstart" in global)
		{
			display0.ontouchstart = function (evt)
			{
				evt.preventDefault();

				let touches = evt.changedTouches;

				for (let i = 0; i < touches.length; i++)
				{
					if (!System.pointerState[touches[i].identifier])
					{
						System.pointerState[touches[i].identifier] = {
								id: touches[i].identifier, isActive: false, isDragging: false,
								sx: 0, sy: 0, x: 0, y: 0, dx: 0, dy: 0, button: 0,
								wheelDelta: 0, wheelAccum: 0
							};
					}

					let p = System.pointerState[touches[i].identifier];

					p.isActive = true;
					p.isDragging = false;
					p.button = 1;

					p.startTime = hrnow();

					p.x = p.sx = pointerConvX(touches[i].clientX, touches[i].clientY);
					p.y = p.sy = pointerConvY(touches[i].clientX, touches[i].clientY);

					System.onPointerEvent (System.PointerEventType.POINTER_DOWN, p, System.pointerState);
				}

				return false;
			};

			display0.ontouchend = function (evt)
			{
				evt.preventDefault();

				let touches = evt.changedTouches;

				for (let i = 0; i < touches.length; i++)
				{
					if (!System.pointerState[touches[i].identifier])
						continue;

					let p = System.pointerState[touches[i].identifier];

					p.endTime = hrnow();
					p.deltaTime = p.endTime - p.startTime;

					p.x = pointerConvX(touches[i].clientX, touches[i].clientY)
					p.y = pointerConvY(touches[i].clientX, touches[i].clientY)

					if (p.isDragging)
						System.onPointerEvent (System.PointerEventType.POINTER_DRAG_STOP, p, System.pointerState);

					System.onPointerEvent (System.PointerEventType.POINTER_UP, p, System.pointerState);

					p.isActive = false;
					p.isDragging = false;

					p.button = 0;
				}

				return false;
			};

			display0.ontouchcancel = function (evt)
			{
				evt.preventDefault();

				let touches = evt.changedTouches;

				for (let i = 0; i < touches.length; i++)
				{
					if (!System.pointerState[touches[i].identifier])
						continue;

					let p = System.pointerState[touches[i].identifier];

					p.x = pointerConvX(touches[i].clientX, touches[i].clientY);
					p.y = pointerConvY(touches[i].clientX, touches[i].clientY);

					System.onPointerEvent (p.isDragging ? System.PointerEventType.POINTER_DRAG_STOP : System.PointerEventType.POINTER_UP, p, System.pointerState);

					p.isActive = false;
					p.isDragging = false;

					p.button = 0;
				}

				return false;
			};

			display0.ontouchmove = function (evt)
			{
				evt.preventDefault();

				let touches = evt.changedTouches;

				for (let i = 0; i < touches.length; i++)
				{
					if (!System.pointerState[touches[i].identifier])
						continue;

					let p = System.pointerState[touches[i].identifier];

					if (p.isActive && !p.isDragging)
					{
						System.onPointerEvent (System.PointerEventType.POINTER_DRAG_START, p, System.pointerState);
						p.isDragging = true;
					}

					p.x = pointerConvX(touches[i].clientX, touches[i].clientY);
					p.y = pointerConvY(touches[i].clientX, touches[i].clientY);

					p.dx = p.x - p.sx;
					p.dy = p.y - p.sy;

					System.onPointerEvent (p.isDragging ? System.PointerEventType.POINTER_DRAG_MOVE : System.PointerEventType.POINTER_MOVE, p, System.pointerState);
				}

				return false;
			};
		}
		// Attach mouse event handlers when pointer-events are not available.
		else
		{
			display0.oncontextmenu = function (evt)
			{
				evt.preventDefault();
				return false;
			};

			display0.onwheel = function (evt)
			{
				evt.preventDefault();

				if (!System.pointerState[0])
				{
					System.pointerState[0] = {
							id: 0, isActive: false, isDragging: false,
							sx: 0, sy: 0, x: 0, y: 0, dx: 0, dy: 0, button: 0,
							wheelDelta: 0, wheelAccum: 0
						};
				}

				let p = System.pointerState[0];

				p.x = pointerConvX(evt.clientX, evt.clientY);
				p.y = pointerConvY(evt.clientX, evt.clientY);
				p.wheelDelta = evt.deltaY;
				p.wheelAccum += evt.deltaY;

				System.onPointerEvent (System.PointerEventType.POINTER_WHEEL, p, System.pointerState);
				return false;
			};

			display0.onmousedown = function (evt)
			{
				evt.preventDefault();

				if (!System.pointerState[0])
				{
					System.pointerState[0] = {
							id: 0, isActive: false, isDragging: false,
							sx: 0, sy: 0, x: 0, y: 0, dx: 0, dy: 0, button: 0,
							wheelDelta: 0, wheelAccum: 0
						};
				}

				let p = System.pointerState[0];

				p.isActive = true;
				p.isDragging = false;
				p.button = evt.which;

				p.x = p.sx = pointerConvX(evt.clientX, evt.clientY);
				p.y = p.sy = pointerConvY(evt.clientX, evt.clientY);

				System.onPointerEvent (System.PointerEventType.POINTER_DOWN, p, System.pointerState);
				return false;
			};

			display0.onmouseup = function (evt)
			{
				evt.preventDefault();

				if (!System.pointerState[0])
					return false;

				let p = System.pointerState[0];

				p.x = pointerConvX(evt.clientX, evt.clientY);
				p.y = pointerConvY(evt.clientX, evt.clientY);

				if (p.isDragging)
					System.onPointerEvent (System.PointerEventType.POINTER_DRAG_STOP, p, System.pointerState);

				System.onPointerEvent (System.PointerEventType.POINTER_UP, p, System.pointerState);

				p.isActive = false;
				p.isDragging = false;

				p.button = 0;
			};

			display0.onmousemove = function (evt)
			{
				evt.preventDefault();

				if (!System.pointerState[0])
					return false;

				let p = System.pointerState[0];

				if (p.isActive && !p.isDragging)
				{
					System.onPointerEvent (System.PointerEventType.POINTER_DRAG_START, p, System.pointerState);
					p.isDragging = true;
				}

				p.x = pointerConvX(evt.clientX, evt.clientY);
				p.y = pointerConvY(evt.clientX, evt.clientY);

				p.dx = p.x - p.sx;
				p.dy = p.y - p.sy;

				System.onPointerEvent (p.isDragging ? System.PointerEventType.POINTER_DRAG_MOVE : System.PointerEventType.POINTER_MOVE, p, System.pointerState);
				return false;
			};
		}

		// Enable log if flag is set.
		if (o.log === true) Log.enable();
	},

	/**
	 * 	Returns the current logical time in seconds (same as reading `System.frameTime`).
	 * 	!static time() : number;
	 */
	time: function()
	{
		return this.frameTime;
	},

	/**
	 * 	Starts the system and enables rendering and updates.
	 * 	!static start() : void;
	 */
	start: function()
	{
		this.onWindowResized();

		this.flags.renderingPaused = false;
		this.frameTimer.start();
	},

	/**
	 * 	Stops the system by disabling both rendering and updates.
	 * 	!static stop() : void;
	 */
	stop: function()
	{
		this.flags.renderingPaused = true;
		this.frameTimer.stop();
	},

	/**
	 * 	Pauses the system by disabling updates, but rendering will be continued.
	 * 	!static pause() : void;
	 */
	pause: function()
	{
		this.flags.renderingPaused = true;
	},

	/**
	 * 	Resumes the system after previously being paused with `pause` method.
	 * 	!static resume() : void;
	 */
	resume: function()
	{
		this.flags.renderingPaused = false;
		this.resetPerf();
	},

	/**
	 * 	Executed when a frame needs to be rendered to the display buffer.
	 * 	static onFrame (delta: number) : void;
	 */
	onFrame: function(delta)
	{
		let now = hrnow()
		let tmp;

		if (delta > this.maxFrameInterval)
			delta = this.maxFrameInterval;

		if (this.fixedFrameInterval !== 0)
			delta = this.fixedFrameInterval;

		if (!this.flags.renderingEnabled || this.flags.renderingPaused)
		{
			this.draw();
			return;
		}

		delta *= this.timeScale;

		this.frameDelta = delta / 1000.0;
		this.frameTime += this.frameDelta;
		globals.time = this.frameTime;

		this.frameNumber++;

		/* ~ */
		tmp = hrnow();
		this.update (this.frameDelta);
		this.perf.updateTimeTotal += hrnow() - tmp;

		/* ~ */
		tmp = hrnow();
		this.draw();
		this.perf.drawTimeTotal += hrnow() - tmp;

		/* ~ */
		this.perf.lastTime = now;
		this.perf.numFrames++;

		delta = this.perf.lastTime - this.perf.startTime;
		if (delta > 1000)
		{
			this.perf.fps = int(this.perf.numFrames*1000 / delta);

			//this.perf.extraTimeTotal = delta - this.perf.updateTimeTotal - this.perf.drawTimeTotal;

			this.perf.averageFps = int(((this.perf.averageFps*this.perf.numSamples) + this.perf.fps) / (this.perf.numSamples + 1));
			this.perf.averageUpdateTime = int(((this.perf.averageUpdateTime*this.perf.numSamples) + (this.perf.updateTimeTotal*1000 / this.perf.numFrames)) / (this.perf.numSamples + 1));
			this.perf.averageDrawTime = int(((this.perf.averageDrawTime*this.perf.numSamples) + (this.perf.drawTimeTotal*1000 / this.perf.numFrames)) / (this.perf.numSamples + 1));
			this.perf.averageExtraTime = int(((this.perf.averageExtraTime*this.perf.numSamples) + (this.perf.extraTimeTotal*1000 / this.perf.numFrames)) / (this.perf.numSamples + 1));
			this.perf.numSamples++;

			this.perf.startTime = now;
			this.perf.lastTime = now;
			this.perf.numFrames = 0;
			this.perf.updateTimeTotal = 0;
			this.perf.drawTimeTotal = 0;
			this.perf.extraTimeTotal = 0;
		}
	},

	/**
	 * 	Executed when the size of the window has changed.
	 * 	static onWindowResized (notRendering: boolean = false) : void;
	 */
	onWindowResized: function(notRendering=false)
	{
		// Determine size of the screen.
		if ('document' in global)
		{
			if (this.options.fullscreen)
			{
				this._screenWidth = int(global.screen.width);
				this._screenHeight = int(global.screen.height);
			}
			else
			{
				this._screenWidth = global.innerWidth;
				this._screenHeight = global.innerHeight;
			}
		}
		else
		{
			this._screenWidth = this.options.screenWidth;
			this._screenHeight = this.options.screenHeight;

			if (this.options.screenWidth == null && this.options.screenHeight == null)
				throw new Error ('At least one screen dimension must be specified in headless mode.');
		}

		// Flip dimensions to ensure the desired orientation.
		if ((this._screenWidth < this._screenHeight && this.orientation == 'landscape') || (this._screenWidth > this._screenHeight && this.orientation == 'portrait'))
		{
			this.screenWidth = this._screenHeight;
			this.screenHeight = this._screenWidth;

			this.reverseRender = true;
		}
		else
		{
			this.screenWidth = this._screenWidth;
			this.screenHeight = this._screenHeight;

			this.reverseRender = false;
		}

		// Get target screen dimensions.
		let targetScreenWidth = this.options.screenWidth;
		let targetScreenHeight = this.options.screenHeight;

		if (targetScreenWidth === null || targetScreenHeight === null)
		{
			if (targetScreenWidth === null && targetScreenHeight === null)
			{
				targetScreenWidth = this.screenWidth;
				targetScreenHeight = this.screenHeight;
			}
			else if (targetScreenWidth === null)
			{
				targetScreenWidth = int(0.5 + this.screenWidth * (this.options.screenHeight / this.screenHeight));
			}
			else if (targetScreenHeight === null)
			{
				targetScreenHeight = int(0.5 + this.screenHeight * (this.options.screenWidth / this.screenWidth));
			}
		}

		// ***
		let screenWidth = targetScreenWidth;
		let screenHeight = targetScreenHeight;

		if (this.orientation === 'automatic' && screenWidth && screenHeight)
		{
			if ((screenWidth > screenHeight && this.screenWidth < this.screenHeight) || (screenWidth < screenHeight && this.screenWidth > this.screenHeight))
			{
				screenWidth = screenHeight;
				screenHeight = targetScreenWidth;
			}
		}

		// ***
		this.canvasScaleFactor = 1;

		if (screenWidth && screenHeight)
		{
			this.canvasScaleFactor = Math.min(this.screenWidth / screenWidth, this.screenHeight / screenHeight);
		}
		else if (screenWidth)
		{
			this.canvasScaleFactor = this.screenWidth / screenWidth;
		}
		else if (screenHeight)
		{
			this.canvasScaleFactor = this.screenHeight / screenHeight;
		}

		// ***
		let _screenWidth = this.screenWidth;
		let _screenHeight = this.screenHeight;

		if (screenWidth) this.screenWidth = screenWidth;
		if (screenHeight) this.screenHeight = screenHeight;

		this.offsX = int((_screenWidth - this.screenWidth*this.canvasScaleFactor)*0.5);
		this.offsY = int((_screenHeight - this.screenHeight*this.canvasScaleFactor)*0.5);

		if (this.reverseRender)
		{
			let tmp = this.offsX;
			this.offsX = this.offsY;
			this.offsY = tmp;
		}

		this.scaleFactor = this.canvasScaleFactor * this.canvasPixelRatio;
		this.scaleFactor = int(0.7 + this.scaleFactor);

		this.flags.renderingEnabled = false;

		/*
		**	If the scale is not exact, the final canvas size might not fit the entire screen perfectly (will always be a little smaller in
		**	such a case), when that happens the body's background color will be quite noticeable, to mitigate that we set the body background
		**	to the same color as the primary canvas.
		*/
		if ('document' in global)
			global.document.body.style.backgroundColor = this.renderer.backgroundColor;

		/*
		**	Resize all display buffers.
		*/
		if (!this.reverseRender)
		{
			this.renderer.resize (this.screenWidth*this.scaleFactor, this.screenHeight*this.scaleFactor);
			this.renderer.elem.style.width = int(this.screenWidth*this.canvasScaleFactor+0.5) + "px";
			this.renderer.elem.style.height = int(this.screenHeight*this.canvasScaleFactor+0.5) + "px";

			this.displayBuffer2.resize (this.screenWidth*this.scaleFactor, this.screenHeight*this.scaleFactor);
			this.displayBuffer2.elem.style.width = int(this.screenWidth*this.canvasScaleFactor+0.5) + "px";
			this.displayBuffer2.elem.style.height = int(this.screenHeight*this.canvasScaleFactor+0.5) + "px";

			this.displayBuffer3.resize (_screenWidth, _screenHeight);
			this.displayBuffer3.elem.style.width = _screenWidth + "px";
			this.displayBuffer3.elem.style.height = _screenHeight + "px";
		}
		else
		{
			this.renderer.resize (this.screenHeight*this.scaleFactor, this.screenWidth*this.scaleFactor);
			this.renderer.elem.style.width = int(this.screenHeight*this.canvasScaleFactor+0.5) + "px";
			this.renderer.elem.style.height = int(this.screenWidth*this.canvasScaleFactor+0.5) + "px";

			this.displayBuffer2.resize (this.screenHeight*this.scaleFactor, this.screenWidth*this.scaleFactor);
			this.displayBuffer2.elem.style.width = int(this.screenHeight*this.canvasScaleFactor+0.5) + "px";
			this.displayBuffer2.elem.style.height = int(this.screenWidth*this.canvasScaleFactor+0.5) + "px";

			this.displayBuffer3.resize (_screenHeight, _screenWidth);
			this.displayBuffer3.elem.style.width = _screenHeight + "px";
			this.displayBuffer3.elem.style.height = _screenWidth + "px";
		}

		this.renderer.elem.style.marginLeft = this.offsX + "px";
		this.renderer.elem.style.marginTop = this.offsY + "px";

		this.displayBuffer2.elem.style.marginLeft = this.offsX + "px";
		this.displayBuffer2.elem.style.marginTop = this.offsY + "px";

		this.renderer.loadIdentity();
		this.displayBuffer2.loadIdentity();
		this.displayBuffer3.loadIdentity();

		if (this.scaleFactor != 1)
		{
			this.renderer.globalScale(this.scaleFactor);
			this.displayBuffer2.globalScale(this.scaleFactor);
		}

		if (this.reverseRender)
		{
			this.renderer.rotate(Math.PI/2);
			this.renderer.translate(-this.screenWidth, 0);
			this.renderer.flipped(true);

			this.displayBuffer2.rotate(Math.PI/2);
			this.displayBuffer2.translate(-this.screenWidth, 0);
			this.displayBuffer2.flipped(true);

			this.displayBuffer3.rotate(Math.PI/2);
			this.displayBuffer3.translate(-_screenWidth, 0);
			this.displayBuffer3.flipped(true);
		}
		else
		{
			this.renderer.flipped(false);
			this.displayBuffer2.flipped(false);
			this.displayBuffer3.flipped(false);
		}

		/* *** */
		this.scaleFactor *= this.options.extraScaleFactor;

		this.integerScaleFactor = int(this.scaleFactor + 0.5); //0.9
		this.resetPerf();

		if (this.initialMatrix)
			this.initialMatrix.free();

		this.initialMatrix = this.renderer.getMatrix(true);

		if (notRendering != true)
		{
			this.flags.renderingEnabled = true;
			this.onCanvasResized (this.screenWidth, this.screenHeight);
		}
	},

	/**
	 * 	Event triggered when the canvas was resized by the system. Can be overriden.
	 * 	!static onCanvasResized (screenWidth: number, screenHeight: number) : void;
	 */
	onCanvasResized: function (screenWidth, screenHeight)
	{
	},

	/**
	 * 	Resets the performance data.
	 */
	resetPerf: function()
	{
		this.perf.startTime = hrnow();
		this.perf.lastTime = hrnow();

		this.perf.numFrames = 0;
		this.perf.updateTimeTotal = 0;
		this.perf.drawTimeTotal = 0;
		this.perf.extraTimeTotal = 0;

		this.perf.numSamples = 0;
		this.perf.fps = 0;
		this.perf.averageFps = 0;
		this.perf.averageUpdateTime = 0;
		this.perf.averageDrawTime = 0;
		this.perf.averageExtraTime = 0;
	},

	/**
	 * 	Adds the specified update handler to the system.
	 * 	!updateQueueAdd (handler: { update: (dt: number) => void }) : Linkable;
	 */
	updateQueueAdd: function (handler)
	{
		this.updateQueue.push (handler);
		return this.updateQueue.bottom;
	},

	/**
	 * 	Removes the specified update handler from the system.
	 * 	!updateQueueRemove (handler: { update: (dt: number) => void }) : void;
	 */
	/**
	 * 	Removes the specified update handler node from the system.
	 * 	!updateQueueRemove (node: Linkable) : void;
	 */
	updateQueueRemove: function (handler)
	{
		this.updateQueue.remove (Linkable.isInstance(handler) ? handler : this.updateQueue.sgetNode(handler));
	},

	/**
	 * 	Adds the specified draw handler to the system.
	 * 	!drawQueueAdd (handler: { draw: (g: Canvas) => void }) : Linkable;
	 */
	drawQueueAdd: function (handler)
	{
		this.drawQueue.push (handler);
		return this.drawQueue.bottom;
	},

	/**
	 * 	Removes the specified draw handler from the system.
	 * 	!drawQueueRemove (handler: { draw: (g: Canvas) => void }) : void;
	 */
	/**
	 * 	Removes the specified draw handler node from the system.
	 * 	!drawQueueRemove (node: Linkable) : void;
	 */
	drawQueueRemove: function (handler)
	{
		this.drawQueue.remove (Linkable.isInstance(handler) ? handler : this.drawQueue.sgetNode(handler));
	},

	/**
	 * 	Adds the specified handler to the update and draw queues.
	 * 	!queueAdd (handler: { update: (dt: number) => void, draw: (g: Canvas) => void }) : void;
	 */
	queueAdd: function (handler)
	{
		this.updateQueue.push (handler);
		this.drawQueue.push (handler);
	},

	/**
	 *	Removes the specified handler from the update and draw queues.
	 * 	!queueRemove (handler: { update: (dt: number) => void, draw: (g: Canvas) => void }) : void;
	 */
	queueRemove: function (handler)
	{
		this.updateQueue.remove (this.updateQueue.sgetNode(handler));
		this.drawQueue.remove (this.drawQueue.sgetNode(handler));
	},

	/**
	 * 	Runs an update cycle. All objects in the `updateQueue` will have their `update method called.
	 */
	update: function (dt)
	{
		try
		{
			let next;

			for (let elem = this.updateQueue.top; elem; elem = next)
			{
				next = elem.next;

				if (elem.value.update(dt) === false)
					this.updateQueueRemove(elem);
			}
		}
		catch (e)
		{
			System.stop();
			throw e;
		}	
	},

	/**
	 * 	Runs a rendering cycle. All objects in the `drawQueue` will have their `draw` method called.
	 */
	draw: function ()
	{
		if (this.renderer.gl !== null)
			this.renderer.start();

		if (!this.options.overdraw)
		{
			this.renderer.clear();
			this.displayBuffer2.clear();
			this.displayBuffer3.clear();
		}

		try
		{
			let next;

			for (let elem = this.drawQueue.top; elem; elem = next)
			{
				next = elem.next;
				elem.value.draw(this.renderer);
			}

			if (this.renderer.gl !== null)
			{
				this.renderer.flush();
				this.renderer.end();
			}
		}
		catch (e)
		{
			System.stop();
			throw e;
		}	
	},

	/**
	 * 	Interpolates numeric values between two objects (`src` and `dst`) using the specified `duration` and `easing` function. Note that all four parameters `src`, `dst`,
	 * 	`duration` and `easing` must be objects having the same number of values.
	 * 	!interpolate (src: object, dst: object, duration: object, easing: object, callback: (data: object, isFinished: boolean) => void) : void;
	 */
	interpolate: function (src, dst, duration, easing, callback)
	{
		//violet: not optimized
		let time = { };
		let data = { };
		let count = 0;

		for (let x in src)
		{
			time[x] = 0.0;
			data[x] = src[x]
			count++;
		}

		let interpolator =
		{
			update: function(dt)
			{
				for (let x in time)
				{
					if (time[x] == duration[x])
						continue;

					time[x] += dt;
					if (time[x] >= duration[x])
					{
						time[x] = duration[x];
						count--;
					}

					let t = easing[x] (time[x] / duration[x]);
					data[x] = (1-t)*src[x] + t*dst[x];
				}

				callback (data, count == 0);

				if (count == 0)
					return false;
			}
		};

		System.updateQueueAdd(interpolator);
		interpolator.update(0);
	},

	/**
	 * 	Event triggered when a keyboard event is detected by the system.
	 * 	onKeyboardEvent (action: KeyboardEventType, keyCode: number, keyState: object) : void;
	 */
	onKeyboardEvent: function (action, keyCode, keyState)
	{
	},

	/**
	 * 	Event triggered when a pointer event is detected by the system.
	 * 	onPointerEvent (action: PointerEventType, pointer: object, pointers: object) : void;
	 */
	onPointerEvent: function (action, pointer, pointers)
	{
	}
};

//!/class

//!namespace System

	//!enum KeyboardEventType
	System.KeyboardEventType = {
		KEY_DOWN: 0x001,
		KEY_UP: 0x002,

		//!KEY_DOWN
		//!KEY_UP
	};
	//!/enum

	//!enum PointerEventType
	System.PointerEventType = {
		POINTER_DOWN: 		0x010,
		POINTER_UP: 		0x011,
		POINTER_MOVE: 		0x012,
		POINTER_DRAG_START:	0x013,
		POINTER_DRAG_MOVE:	0x014,
		POINTER_DRAG_STOP:	0x015,
		POINTER_WHEEL:		0x016,

		//!POINTER_DOWN
		//!POINTER_UP
		//!POINTER_MOVE
		//!POINTER_DRAG_START
		//!POINTER_DRAG_MOVE
		//!POINTER_DRAG_STOP
		//!POINTER_WHEEL
	};
	//!/enum

//!/namespace

export default System;
