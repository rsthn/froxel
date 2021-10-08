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

import KeyCodes from './keycodes.js';
import List from '../utils/list.js';
import Linkable from '../utils/linkable.js';
import Timer from './timer.js';
import Canvas from './canvas.js';
import globals from './globals.js';

/*
**	System object.
*/

const System =
{
	/*
	**	System flags.
	*/
	flags:
	{
		renderingEnabled: false,
		renderingPaused: false
	},

	/*
	**	Event codes.
	*/
	EVT_KEY_DOWN:			0x001,
	EVT_KEY_UP:				0x002,

	EVT_POINTER_DOWN: 		0x010,
	EVT_POINTER_UP: 		0x011,
	EVT_POINTER_MOVE: 		0x012,
	EVT_POINTER_DRAG_START:	0x013,
	EVT_POINTER_DRAG_MOVE:	0x014,
	EVT_POINTER_DRAG_STOP:	0x015,

	/*
	**	Display orientations.
	*/
	DEFAULT:	'default',
	LANDSCAPE:	'landscape',
	PORTRAIT:	'portrait',
	AUTOMATIC:	'automatic',

	/*
	**	Default options of the rendering system.
	*/
	defaultOptions:
	{
		background: "#000000",
		gl: true,

		overdraw: false,

		canvas: null,
		canvas2: null,
		canvas3: null,

		fps: 144,
		minFps: 15,
		vsync: true,

		antialias: true,

		screenWidth: null,
		screenHeight: null,

		orientation: 0,

		extraScaleFactor: 1,
		fullscreen: false
	},

	/*
	**	Screen resolution, obtained automatically when the system is initialized.
	*/
	screenWidth: 0, screenHeight: 0,

	/*
	**	Current screen orientation.
	*/
	orientation: 0,

	/*
	**	Coordinates of the screen's offset (for letter-box effect when the screen does not fit tightly).
	*/
	offsX: 0, offsY: 0,

	/*
	**	Device pixel ratio, canvas backing store ratio and resulting canvas ratio (devicePixelRatio / backingStoreRatio).
	*/
	devicePixelRatio: 1, backingStoreRatio: 1, canvasPixelRatio: 1, canvasScaleFactor: 1, scaleFactor: 1,

	/*
	**	Initial transformation matrix. Should be used (if needed) instead of loadIdentity() since the System does some transformations first.
	*/
	initialMatrix: null,

	/*
	**	Primary renderer.
	*/
	renderer: null,

	/*
	**	Secondary display buffer (always 2d) and has the same initial transformation matrix as the primary display buffer.
	*/
	displayBuffer2: null,

	/*
	**	Third display buffer (always 2d), always 1:1 with the screen size.
	*/
	displayBuffer3: null,

	/*
	**	Small (320x240) temporal display buffer.
	*/
	tempDisplayBuffer: null,

	/*
	**	Map with the status of all keys (along with other flags).
	*/
	keyState: { time: 0, shift: false, ctrl: false, alt: false, keyCode: 0 },

	/*
	**	Current status of all pointers. The related object is known as the Pointer State, and has the following fields:
	**	id, isActive, isDragging, sx, sy, x, y, dx, dy, button
	*/
	pointerState: { },

	/*
	**	The update method of all objects will be executed when the system update() method is called.
	*/
	updateQueue: null, /*List*/

	/*
	**	The draw method of all objects will be executed when the system draw() method is called.
	*/
	drawQueue: null, /*List*/

	/*
	**	Time scale, the frame delta is multiplied by this value before each system cycle.
	*/
	timeScale: 1,

	/*
	**	Frame interval in milliseconds.
	*/
	frameInterval: 0,

	/*
	**	Fixed frame interval in milliseconds, when set to non-zero value the frame delta will be set to this value.
	*/
	fixedFrameInterval: 0,

	/*
	**	Maximum frame interval in milliseconds, if the frameDelta exceeds this it will be truncated to this value.
	*/
	maxFrameInterval: 0,

	/*
	**	Last frame delta in seconds (float).
	*/
	frameDelta: 0,

	/*
	**	Logical system time (updated on each cycle by the calculated frameDelta).
	*/
	frameTime: 0,

	/*
	**	Current frame number.
	*/
	frameNumber: 0,

	/*
	**	Rendering performance data.
	*/
	perf:
	{
		/*
		**	Current time range.
		*/
		startTime: 0,
		lastTime: 0,

		/*
		**	Number of frames drawn in the current time range.
		*/
		numFrames: 0,

		/*
		**	Number of update and draw samples averaged in total.
		*/
		numSamples: 0,

		/*
		**	Total time spent in update, draw and extra respectively in the current time range.
		*/
		updateTimeTotal: 0,
		drawTimeTotal: 0,
		extraTimeTotal: 0,

		/*
		**	Calculated values for the last time range. The updateTime and drawTime are in microseconds.
		*/
		fps: 0,
		averageFps: 0,
		averageUpdateTime: 0,
		averageDrawTime: 0,
		averageExtraTime: 0
	},

	/*
	**	Initializes the system with the specified configuration.
	*/
	init: function (options=null)
	{
		let self = this;

		let o = { ...this.defaultOptions, ...options };
		this.options = o;

		// Set default orientation if both target sizes were specified.
		if (o.screenWidth && o.screenHeight && o.orientation == System.DEFAULT)
		{
			o.orientation = o.screenWidth > o.screenHeight ? System.LANDSCAPE : System.PORTRAIT;
		}

		this.orientation = o.orientation;

		this.updateQueue = List.Pool.alloc();
		this.drawQueue = List.Pool.alloc();

		// Attach frame event handlers.
		this.frameInterval = 1000 / o.fps;
		this.maxFrameInterval = 1000 / o.minFps;

		global.onresize = function() { self.onWindowResized(); };

		this.frameTimer = new Timer (o.vsync, this.frameInterval, (delta) => this.onFrame(delta));

		// Setup canvas buffer.
		this.renderer = new Canvas ({ gl: o.gl, elem: o.canvas, absolute: true, hidden: false, antialias: o.antialias, background: o.background });

		this.displayBuffer2 = new Canvas ({ gl: false, elem: o.canvas2, absolute: true, hidden: false, antialias: o.antialias, background: 'none' });
		this.displayBuffer2.elem.style.pointerEvents = 'none';

		this.displayBuffer3 = new Canvas ({ gl: false, elem: o.canvas3, absolute: true, hidden: false, antialias: o.antialias, background: 'none' });
		this.displayBuffer3.elem.style.pointerEvents = 'none';

		this.tempDisplayBuffer = new Canvas ({ hidden: true, antialias: o.antialias }).resize(320, 240);

		let display0 = this.renderer.elem;

		// Obtain device display ratios.
		this.devicePixelRatio = global.devicePixelRatio || 1;

		this.backingStoreRatio = o.gl == true ? 1 : (this.renderer.context.webkitBackingStorePixelRatio ||
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
			if (self.keyState.ctrl && evt.keyCode == KeyCodes.TAB)
			{
				self.keyState[evt.keyCode] = false;
				return true;
			}

			if (self.onKeyboardEvent (self.EVT_KEY_DOWN, evt.keyCode, self.keyState) === false)
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

			if (self.onKeyboardEvent (self.EVT_KEY_UP, evt.keyCode, self.keyState) === false)
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
								sx: 0, sy: 0, x: 0, y: 0, dx: 0, dy: 0, button: 0
							};
					}

					let p = System.pointerState[touches[i].identifier];

					p.isActive = true;
					p.isDragging = false;
					p.button = 1;

					p.startTime = hrnow();

					p.x = p.sx = pointerConvX(touches[i].clientX, touches[i].clientY);
					p.y = p.sy = pointerConvY(touches[i].clientX, touches[i].clientY);

					System.onPointerEvent (System.EVT_POINTER_DOWN, p, System.pointerState);
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
						System.onPointerEvent (System.EVT_POINTER_DRAG_STOP, p, System.pointerState);

					System.onPointerEvent (System.EVT_POINTER_UP, p, System.pointerState);

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

					System.onPointerEvent (p.isDragging ? System.EVT_POINTER_DRAG_STOP : System.EVT_POINTER_UP, p, System.pointerState);

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
						System.onPointerEvent (System.EVT_POINTER_DRAG_START, p, System.pointerState);
						p.isDragging = true;
					}

					p.x = pointerConvX(touches[i].clientX, touches[i].clientY);
					p.y = pointerConvY(touches[i].clientX, touches[i].clientY);

					p.dx = p.x - p.sx;
					p.dy = p.y - p.sy;

					System.onPointerEvent (p.isDragging ? System.EVT_POINTER_DRAG_MOVE : System.EVT_POINTER_MOVE, p, System.pointerState);
				}

				return false;
			};
		}
		// Attach mouse event handlers when pointer-events are not available.
		else
		{
			display0.onmousedown = function (evt)
			{
				evt.preventDefault();

				if (!System.pointerState[0])
				{
					System.pointerState[0] = {
							id: 0, isActive: false, isDragging: false, button: 0,
							sx: 0, sy: 0, x: 0, y: 0, dx: 0, dy: 0,
						};
				}

				let p = System.pointerState[0];

				p.isActive = true;
				p.isDragging = false;
				p.button = evt.which;

				p.x = p.sx = pointerConvX(evt.clientX, evt.clientY);
				p.y = p.sy = pointerConvY(evt.clientX, evt.clientY);

				System.onPointerEvent (System.EVT_POINTER_DOWN, p, System.pointerState);
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
					System.onPointerEvent (System.EVT_POINTER_DRAG_STOP, p, System.pointerState);

				System.onPointerEvent (System.EVT_POINTER_UP, p, System.pointerState);

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
					System.onPointerEvent (System.EVT_POINTER_DRAG_START, p, System.pointerState);
					p.isDragging = true;
				}

				p.x = pointerConvX(evt.clientX, evt.clientY);
				p.y = pointerConvY(evt.clientX, evt.clientY);

				p.dx = p.x - p.sx;
				p.dy = p.y - p.sy;

				System.onPointerEvent (p.isDragging ? System.EVT_POINTER_DRAG_MOVE : System.EVT_POINTER_MOVE, p, System.pointerState);
				return false;
			};
		}
	},

	/*
	**	Returns the current logical time in seconds (same as reading System.frameTime).
	*/
	time: function()
	{
		return this.frameTime;
	},

	/*
	**	Starts the system and enables rendering and updates.
	*/
	start: function()
	{
		this.onWindowResized();

		this.flags.renderingPaused = false;
		this.frameTimer.start();
	},

	/*
	**	Stops the system by disabling both rendering and updates.
	*/
	stop: function()
	{
		this.flags.renderingPaused = true;
		this.frameTimer.stop();
	},

	/*
	**	Disables updates, but continues to render.
	*/
	pause: function()
	{
		this.flags.renderingPaused = true;
	},

	/*
	**	Resumes updates if previously stopped with `pause()`.
	*/
	resume: function()
	{
		this.flags.renderingPaused = false;
		this.resetPerf();
	},

	/*
	**	Executed when a frame needs to be rendered to the display buffer.
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

	/*
	**	Executed when the size of the window has changed. Will cause a full buffer rendering.
	*/
	onWindowResized: function(notRendering=false)
	{
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

		if ((this._screenWidth < this._screenHeight && this.orientation == System.LANDSCAPE) || (this._screenWidth > this._screenHeight && this.orientation == System.PORTRAIT))
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

		// ***
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
				targetScreenWidth = int(this.screenWidth * (this.options.screenHeight / this.screenHeight));
			}
			else if (targetScreenHeight === null)
			{
				targetScreenHeight = int(this.screenHeight * (this.options.screenWidth / this.screenWidth));
			}
		}

		// ***
		let screenWidth = targetScreenWidth;
		let screenHeight = targetScreenHeight;

		if (this.orientation == System.AUTOMATIC && screenWidth && screenHeight)
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
			this.renderer.elem.style.width = (this.screenWidth*this.canvasScaleFactor) + "px";
			this.renderer.elem.style.height = (this.screenHeight*this.canvasScaleFactor) + "px";

			this.displayBuffer2.resize (this.screenWidth*this.scaleFactor, this.screenHeight*this.scaleFactor);
			this.displayBuffer2.elem.style.width = (this.screenWidth*this.canvasScaleFactor) + "px";
			this.displayBuffer2.elem.style.height = (this.screenHeight*this.canvasScaleFactor) + "px";

			this.displayBuffer3.resize (_screenWidth, _screenHeight);
			this.displayBuffer3.elem.style.width = _screenWidth + "px";
			this.displayBuffer3.elem.style.height = _screenHeight + "px";
		}
		else
		{
			this.renderer.resize (this.screenHeight*this.scaleFactor, this.screenWidth*this.scaleFactor);
			this.renderer.elem.style.width = (this.screenHeight*this.canvasScaleFactor) + "px";
			this.renderer.elem.style.height = (this.screenWidth*this.canvasScaleFactor) + "px";

			this.displayBuffer2.resize (this.screenHeight*this.scaleFactor, this.screenWidth*this.scaleFactor);
			this.displayBuffer2.elem.style.width = (this.screenHeight*this.canvasScaleFactor) + "px";
			this.displayBuffer2.elem.style.height = (this.screenWidth*this.canvasScaleFactor) + "px";

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

		this.integerScaleFactor = int(this.scaleFactor + 0.9);
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

	/*
	**	Event triggered when the canvas was resized by the system.
	*/
	onCanvasResized: function (screenWidth, screenHeight)
	{
	},

	/*
	**	Resets the performance data.
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

	/*
	**	Adds the specified handler to the update queue. Must have method update (deltaTime: int).
	*/
	updateQueueAdd: function (/*object*/handler)
	{
		this.updateQueue.push (handler);
		return this.updateQueue.bottom;
	},

	/*
	**	Removes the specified handler from the update queue.
	*/
	updateQueueRemove: function (/*object*/handler)
	{
		this.updateQueue.remove (handler instanceof Linkable ? handler : this.updateQueue.sgetNode(handler));
	},

	/*
	**	Adds the specified handler to the draw queue. Must have method draw (canvas: Canvas).
	*/
	drawQueueAdd: function (/*object*/handler)
	{
		this.drawQueue.push (handler);
		return this.drawQueue.bottom;
	},

	/*
	**	Removes the specified handler from the draw queue.
	*/
	drawQueueRemove: function (/*object*/handler)
	{
		this.drawQueue.remove (handler instanceof Linkable ? handler : this.drawQueue.sgetNode(handler));
	},

	/*
	**	Adds the specified handler to the update and draw queues. Must have both update (deltaTime: int) and draw (canvas: Canvas) methods. Returns `obj`.
	*/
	queueAdd: function (/*object*/handler)
	{
		this.updateQueue.push (handler);
		this.drawQueue.push (handler);
		return handler;
	},

	/*
	**	Removes the specified handler from the update and draw queues.
	*/
	queueRemove: function (/*object*/handler)
	{
		this.updateQueue.remove (this.updateQueue.sgetNode(handler));
		this.drawQueue.remove (this.drawQueue.sgetNode(handler));
	},

	/*
	**	Runs an update cycle, all objects in the updateQueue will be updated.
	*/
	update: function (dt)
	{
		try
		{
			let next;

			for (let elem = this.updateQueue.top; elem; elem = next)
			{
				next = elem.next;
				elem.value.update(dt);
			}
		}
		catch (e)
		{
			System.stop();
			throw e;
		}	
	},

	/*
	**	Runs a rendering cycle, all objects in the drawQueue will be drawn.
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

	/*
	**	Interpolates numeric values between two objects (`src` and `dst`) using the specified `duration` and `easing` function. Note that all four parameters
	**	`src`, `dst`, `duration` and `easing` must be objects having the same number of values.
	*/
	interpolate: function (src, dst, duration, easing, callback/* function(data, isFinished) */)
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
					System.updateQueueRemove(interpolator);
			}
		};

		System.updateQueueAdd(interpolator);
		interpolator.update(0);
	},

	/*
	**	Event triggered when a keyboard event is detected by the system, `action` is one of the EVT_KEY_* constants,
	**	`keyCode` is one of the `KeyCodes` constants and `keyState` a reference to `System.keyState`.
	*/
	onKeyboardEvent: function (action, keyCode, keyState)
	{
	},

	/*
	**	Event triggered when a pointer event is detected by the system, `action` is one of the EVT_POINTER_* constants,
	**	`pointer` contains the pointer state, and `pointers` a reference to `System.pointerState`.
	*/
	onPointerEvent: function (action, pointer, pointers)
	{
	}
};

export default System;
