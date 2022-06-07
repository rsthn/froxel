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
import Recycler from '../utils/recycler.js';

//![import "./keycode"]
//![import "../utils/list"]
//![import "../utils/linkable"]
//![import "./timer"]
//![import "./canvas"]
//![import "./globals"]

const System = { };

//!namespace System

	//:type DisplayOrientation = 'default'|'landscape'|'portrait'|'automatic'|'strict';

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

	//!type KeyboardState =

		/**
		 * Time of last keyboard event.
		 * !time: number;
		 */

		/**
		 * State of any of the SHIFT keys.
		 * !shift: boolean;
		 */

		/**
		 * State of any of the CTRL keys.
		 * !ctrl: boolean;
		 */

		/**
		 * State of the ALT key.
		 * !alt: boolean;
		 */

		/**
		 * Key code of last keyboard event.
		 * !keyCode: KeyCode;
		 */

	//!/type

	//!type Pointer =

		/**	
		 * ID of the pointer.
		 * !id: number;
		 */

		/**
		 * Indicates if the pointer is active (pressed).
		 * !isActive: boolean;
		 */

		/**
		 * Indicates if the pointer is currently being dragged.
		 * !isDragging: boolean;
		 */

		/**	
		 * Source X-coordinate when the POINTER_DOWN event was fired.
		 * !sx: number;
		 */

		/**
		 * Source Y-coordinate when the POINTER_DOWN event was fired.
		 * !sy: number;
		 */

		/**
		 * Current X-coordinate of the pointer.
		 * !x: number;
		 */

		/**	
		 * Current Y-coordinate of the pointer.
		 * !y: number;
		 */

		/**
		 * Delta in the X direction of the current drag event.
		 * !dx: number;
		 */

		/**
		 * Delta in the Y direction of the current drag event.
		 * !dy: number;
		 */

		/**
		 * Number of the button currently being pressed.
		 * !button: number;
		 */

		/**
		 * Delta value of the mouse-wheel (valid only when the pointer is a mouse pointing-device).
		 * !wheelDelta: number;
		 */

		/**
		 * Accumulated mouse-wheel delta. Should be set to zero (0) manually when needed.
		 * !wheelAccum: number;
		 */

	//!/type

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
		 *	!orientation?: DisplayOrientation;
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
		 *	Maximum scale factor that should be used in the system. A value of `null` will cause no limit.
		 *	@default null
		 *	!maxScaleFactor?: number;
		 */

		/**
		 *	Indicates which method to use to find the target resolution, using `fullscreen` object when `true`, or the `window` object when `false`.
		 *	@default false
		 *	!fullscreen?: boolean;
		 */

		/**
		 * 	Indicates if recycler pool preallocation should be automatically executed. Additionally if this value is a number, it will be used as
		 * 	maximum preallocation parameter for the recycler.
		 * 	@default false
		 * 	!preallocate?: boolean|number;
		 */

	//!/type

	//:type KeyboardEventHandler = (action: KeyboardEventType, keyCode: KeyCode, state: KeyboardState) => boolean;
	//:type PointerEventHandler = (action: PointerEventType, pointer: Pointer, pointers: { \[pointerId: number\]: Pointer }) => boolean;

//!/namespace

//!class System

Object.assign(System,
{
	/**
	 * Renderer status flags.
	 */
	flags:
	{
		renderingEnabled: false,
		renderingPaused: false
	},

	/**
	 * Default options of the rendering system.
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
		maxScaleFactor: null,

		fullscreen: false
	},

	/**
	 * Screen width, available only after the system has been initialized.
	 * !static readonly screenWidth: number;
	 */
	screenWidth: 0,

	/**
	 * Screen height, available only after the system has been initialized.
	 * !static readonly screenHeight: number;
	 */
	screenHeight: 0,

	/**
	 * Current display orientation.
	 * !static readonly orientation: System.DisplayOrientation;
	 */
	orientation: 0,

	/**
	 * Coordinates of the screen's offset (for letter-box effect when the screen does not fit tightly).
	 */
	offsX: 0, offsY: 0,

	/**
	 * Device pixel ratio, canvas backing store ratio and resulting canvas ratio (devicePixelRatio / backingStoreRatio).
	 */
	devicePixelRatio: 1, backingStoreRatio: 1, canvasPixelRatio: 1, canvasScaleFactor: 1, scaleFactor: 1,

	/**
	 * Initial transformation matrix. Should be used (if needed) instead of `loadIdentity` since the System does some transformations first.
	 * !static readonly initialMatrix: Matrix;
	 */
	initialMatrix: null,

	/**
	 * Primary renderer.
	 * !static readonly renderer: Canvas;
	 */
	renderer: null,

	/**
	 * Secondary display buffer (always 2D). Has the same initial transformation matrix as the primary display buffer.
	 * !static readonly displayBuffer2: Canvas;
	 */
	displayBuffer2: null,

	/**
	 * Terciary display buffer (always 2D). Is assured to have 1:1 with the screen size, initial transformation matrix not applied.
	 * !static readonly displayBuffer3: Canvas;
	 */
	displayBuffer3: null,

	/**
	 * Temporal display buffer (640x480). Used to preload images.
	 */
	tempDisplayBuffer: null,

	/**
	 * Map with the status of all keys (along with other flags).
	 * !static readonly keyState: System.KeyboardState;
	 */
	keyState: { time: 0, shift: false, ctrl: false, alt: false, keyCode: 0 },

	/**
	 * Current status of all pointers.
	 * !static readonly pointers: { \[pointerId: number\]: System.Pointer };
	 */
	pointers: { },

	/**
	 * 	The update method of all objects will be executed when the system update() method is called.
	 */
	updateQueue: null,

	/**
	 * The draw method of all objects will be executed when the system draw() method is called.
	 */
	drawQueue: null, /*List*/

	/**
	 * The frame delta is multiplied by this value before each system cycle (defaults to 1).
	 * !static timeScale: number;
	 */
	timeScale: 1,

	/**
	 * Frame interval in milliseconds.
	 * !static readonly frameInterval: number;
	 */
	frameInterval: 0,

	/**
	 * Fixed frame interval in milliseconds, when set to non-zero value the frame delta will always be set to this value.
	 * !static fixedFrameInterval: number;
	 */
	fixedFrameInterval: 0,

	/**
	 * Maximum frame interval in milliseconds, if the `frameDelta` exceeds this, it will be truncated to this value. Controlled by the `minFps` value of the system initialization options.
	 * !static readonly maxFrameInterval: number;
	 */
	maxFrameInterval: 0,

	/**
	 * Last frame delta in seconds.
	 * !static readonly frameDelta: number;
	 */
	frameDelta: 0,

	/**
	 * Logical system time in seconds. Updated on each cycle by the calculated `frameDelta`.
	 * !static readonly frameTime: number;
	 */
	frameTime: 0,

	/**
	 * Current frame number.
	 * !static readonly frameNumber: number;
	 */
	frameNumber: 0,

	/**
	 * Rendering performance data.
	 */
	perf:
	{
		/**
		 * Current time range.
		 */
		startTime: 0,
		lastTime: 0,

		/**
		 * Number of frames drawn in the current time range.
		 */
		numFrames: 0,

		/**
		 * Number of update and draw samples averaged in total.
		 */
		numSamples: 0,

		/**
		 * Total time spent in update, draw and extra respectively in the current time range.
		 */
		updateTimeTotal: 0,
		drawTimeTotal: 0,
		extraTimeTotal: 0,

		/**
		 * Calculated values for the last time range. The updateTime and drawTime are in microseconds.
		 */
		fps: 0,
		averageFps: 0,
		averageUpdateTime: 0,
		averageDrawTime: 0,
		averageExtraTime: 0
	},

	/**
	 * Initializes the system with the specified configuration options.
	 * !static init (options: System.Options) : void;
	 */
	init: function (options=null)
	{
		let self = this;

		let o = { ...this.defaultOptions, ...options };
		this.options = o;

		// Execute recycler pool data preallocation.
		if (this.options.preallocate !== false)
		{
			if (this.options.preallocate === true)
				Recycler.preallocate();
			else
				Recycler.preallocate(this.options.preallocate);
		}

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

		this.tempDisplayBuffer = new Canvas ({ hidden: true, antialias: o.antialias }).resize(640, 480);

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
					if (!System.pointers[touches[i].identifier])
					{
						System.pointers[touches[i].identifier] = {
								id: touches[i].identifier, isActive: false, isDragging: false,
								sx: 0, sy: 0, x: 0, y: 0, dx: 0, dy: 0, button: 0,
								wheelDelta: 0, wheelAccum: 0
							};
					}

					let p = System.pointers[touches[i].identifier];

					p.isActive = true;
					p.isDragging = false;
					p.button = 1;

					p.startTime = hrnow();

					p.x = p.sx = pointerConvX(touches[i].clientX, touches[i].clientY);
					p.y = p.sy = pointerConvY(touches[i].clientX, touches[i].clientY);

					System.onPointerEvent (System.PointerEventType.POINTER_DOWN, p, System.pointers);
				}

				return false;
			};

			display0.ontouchend = function (evt)
			{
				evt.preventDefault();

				let touches = evt.changedTouches;

				for (let i = 0; i < touches.length; i++)
				{
					if (!System.pointers[touches[i].identifier])
						continue;

					let p = System.pointers[touches[i].identifier];

					p.endTime = hrnow();
					p.deltaTime = p.endTime - p.startTime;

					p.x = pointerConvX(touches[i].clientX, touches[i].clientY)
					p.y = pointerConvY(touches[i].clientX, touches[i].clientY)

					if (p.isDragging)
						System.onPointerEvent (System.PointerEventType.POINTER_DRAG_STOP, p, System.pointers);

					System.onPointerEvent (System.PointerEventType.POINTER_UP, p, System.pointers);

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
					if (!System.pointers[touches[i].identifier])
						continue;

					let p = System.pointers[touches[i].identifier];

					p.x = pointerConvX(touches[i].clientX, touches[i].clientY);
					p.y = pointerConvY(touches[i].clientX, touches[i].clientY);

					System.onPointerEvent (p.isDragging ? System.PointerEventType.POINTER_DRAG_STOP : System.PointerEventType.POINTER_UP, p, System.pointers);

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
					if (!System.pointers[touches[i].identifier])
						continue;

					let p = System.pointers[touches[i].identifier];

					if (p.isActive && !p.isDragging)
					{
						System.onPointerEvent (System.PointerEventType.POINTER_DRAG_START, p, System.pointers);
						p.isDragging = true;
					}

					p.x = pointerConvX(touches[i].clientX, touches[i].clientY);
					p.y = pointerConvY(touches[i].clientX, touches[i].clientY);

					p.dx = p.x - p.sx;
					p.dy = p.y - p.sy;

					System.onPointerEvent (p.isDragging ? System.PointerEventType.POINTER_DRAG_MOVE : System.PointerEventType.POINTER_MOVE, p, System.pointers);
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

				if (!System.pointers[0])
				{
					System.pointers[0] = {
							id: 0, isActive: false, isDragging: false,
							sx: 0, sy: 0, x: 0, y: 0, dx: 0, dy: 0, button: 0,
							wheelDelta: 0, wheelAccum: 0
						};
				}

				let p = System.pointers[0];

				p.x = pointerConvX(evt.clientX, evt.clientY);
				p.y = pointerConvY(evt.clientX, evt.clientY);
				p.wheelDelta = evt.deltaY;
				p.wheelAccum += evt.deltaY;

				System.onPointerEvent (System.PointerEventType.POINTER_WHEEL, p, System.pointers);
				return false;
			};

			display0.onmousedown = function (evt)
			{
				evt.preventDefault();

				if (!System.pointers[0])
				{
					System.pointers[0] = {
							id: 0, isActive: false, isDragging: false,
							sx: 0, sy: 0, x: 0, y: 0, dx: 0, dy: 0, button: 0,
							wheelDelta: 0, wheelAccum: 0
						};
				}

				let p = System.pointers[0];

				p.isActive = true;
				p.isDragging = false;
				p.button = evt.which;

				p.x = p.sx = pointerConvX(evt.clientX, evt.clientY);
				p.y = p.sy = pointerConvY(evt.clientX, evt.clientY);

				System.onPointerEvent (System.PointerEventType.POINTER_DOWN, p, System.pointers);
				return false;
			};

			display0.onmouseup = function (evt)
			{
				evt.preventDefault();

				if (!System.pointers[0])
					return false;

				let p = System.pointers[0];

				p.x = pointerConvX(evt.clientX, evt.clientY);
				p.y = pointerConvY(evt.clientX, evt.clientY);

				if (p.isDragging)
					System.onPointerEvent (System.PointerEventType.POINTER_DRAG_STOP, p, System.pointers);

				System.onPointerEvent (System.PointerEventType.POINTER_UP, p, System.pointers);

				p.isActive = false;
				p.isDragging = false;

				p.button = 0;
			};

			display0.onmousemove = function (evt)
			{
				evt.preventDefault();

				if (!System.pointers[0])
					return false;

				let p = System.pointers[0];

				if (p.isActive && !p.isDragging)
				{
					System.onPointerEvent (System.PointerEventType.POINTER_DRAG_START, p, System.pointers);
					p.isDragging = true;
				}

				p.x = pointerConvX(evt.clientX, evt.clientY);
				p.y = pointerConvY(evt.clientX, evt.clientY);

				p.dx = p.x - p.sx;
				p.dy = p.y - p.sy;

				System.onPointerEvent (p.isDragging ? System.PointerEventType.POINTER_DRAG_MOVE : System.PointerEventType.POINTER_MOVE, p, System.pointers);
				return false;
			};
		}

		// Enable log if flag is set.
		if (o.log === true) Log.enable();
	},

	/**
	 * Returns the current logical time in seconds (same as reading `System.frameTime`).
	 * !static time() : number;
	 */
	time: function()
	{
		return this.frameTime;
	},

	/**
	 * Starts the system and enables rendering and updates.
	 * !static start() : void;
	 */
	start: function()
	{
		this.onWindowResized();

		this.flags.renderingPaused = false;
		this.frameTimer.start();
	},

	/**
	 * Stops the system by disabling both rendering and updates.
	 * !static stop() : void;
	 */
	stop: function()
	{
		this.flags.renderingPaused = true;
		this.frameTimer.stop();
	},

	/**
	 * Pauses the system by disabling updates, but rendering will be continued.
	 * !static pause() : void;
	 */
	pause: function()
	{
		this.flags.renderingPaused = true;
	},

	/**
	 * Resumes the system after previously being paused with `pause` method.
	 * !static resume() : void;
	 */
	resume: function()
	{
		this.flags.renderingPaused = false;
		this.resetPerf();
	},

	/**
	 * Executed when a frame needs to be rendered to the display buffer.
	 * static onFrame (delta: number) : void;
	 */
	onFrame: function (delta)
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
	 * Executed when the size of the window has changed.
	 * static onWindowResized (notRendering?: boolean) : void;
	 */
	onWindowResized: function (notRendering=false)
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

		if (this.options.maxScaleFactor > 0 && this.scaleFactor > this.options.maxScaleFactor)
			this.scaleFactor = this.options.maxScaleFactor;

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

		if (this.options.maxScaleFactor > 0 && this.scaleFactor > this.options.maxScaleFactor)
			this.scaleFactor = this.options.maxScaleFactor;

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
	 * Event triggered when the canvas was resized by the system. Can be overriden.
	 * !static onCanvasResized (screenWidth: number, screenHeight: number) : void;
	 */
	onCanvasResized: function (screenWidth, screenHeight)
	{
	},

	/**
	 * Resets the performance data.
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
	 * Adds the specified update handler to the system.
	 * !static updateQueueAdd (handler: { update: (dt: number) => boolean }) : Linkable;
	 * violet
	 */
	updateQueueAdd: function (handler)
	{
		this.updateQueue.push (handler);
		return this.updateQueue.bottom;
	},

	/**
	 * Removes the specified update handler from the system.
	 * !static updateQueueRemove (handler: { update: (dt: number) => boolean }) : void;
	 * violet
	 */
	/**
	 * Removes the specified update handler node from the system.
	 * !static updateQueueRemove (node: Linkable) : void;
	 */
	updateQueueRemove: function (handler)
	{
		this.updateQueue.remove (Linkable.isInstance(handler) ? handler : this.updateQueue.sgetNode(handler));
	},

	/**
	 * Adds the specified draw handler to the system.
	 * !static drawQueueAdd (handler: { draw: (g: Canvas) => void }) : Linkable;
	 * violet
	 */
	drawQueueAdd: function (handler)
	{
		this.drawQueue.push (handler);
		return this.drawQueue.bottom;
	},

	/**
	 * Removes the specified draw handler from the system.
	 * !static drawQueueRemove (handler: { draw: (g: Canvas) => void }) : void;
	 * violet
	 */
	/**
	 * Removes the specified draw handler node from the system.
	 * !static drawQueueRemove (node: Linkable) : void;
	 */
	drawQueueRemove: function (handler)
	{
		this.drawQueue.remove (Linkable.isInstance(handler) ? handler : this.drawQueue.sgetNode(handler));
	},

	/**
	 * Adds the specified handler to the update and draw queues.
	 * !static queueAdd (handler: { update: (dt: number) => boolean, draw: (g: Canvas) => void }) : void;
	 * violet
	 */
	queueAdd: function (handler)
	{
		this.updateQueue.push (handler);
		this.drawQueue.push (handler);
	},

	/**
	 * Removes the specified handler from the update and draw queues.
	 * !static queueRemove (handler: { update: (dt: number) => boolean, draw: (g: Canvas) => void }) : void;
	 * violet
	 */
	queueRemove: function (handler)
	{
		this.updateQueue.remove (this.updateQueue.sgetNode(handler));
		this.drawQueue.remove (this.drawQueue.sgetNode(handler));
	},

	/**
	 * Runs an update cycle. All objects in the `updateQueue` will have their `update method called.
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
	 * Runs a rendering cycle. All objects in the `drawQueue` will have their `draw` method called.
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
	 * Interpolates numeric values between two objects (`src` and `dst`) using the specified `duration` and `easing` function. Note that all four parameters `src`, `dst`,
	 * `duration` and `easing` must be objects having the same number of values.
	 * !static interpolate (src: object, dst: object, duration: object, easing: object, callback: (data: object, isFinished: boolean) => void) : void;
	 */
	//VIOLET: Remove this from here.
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
	 * Event triggered when a keyboard event is detected by the system.
	 * !static onKeyboardEvent: System.KeyboardEventHandler;
	 */
	onKeyboardEvent: function (action, keyCode, state)
	{
		return true;
	},

	/**
	 * Event triggered when a pointer event is detected by the system.
	 * !static onPointerEvent: System.PointerEventHandler;
	 */
	onPointerEvent: function (action, pointer, pointers)
	{
		return true;
	}
});

//!/class

export default System;
