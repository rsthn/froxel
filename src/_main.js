//!//@ts-check

// *********************************************
// rinn

import * as rinn from 'rinn';
export const Class = rinn.Class;
export const Schema = rinn.Schema;
export const Template = rinn.Template;

// *********************************************
// system

//![import "system/globals"]
import _globals from './system/globals.js'; export const globals = _globals;

//![import "system/glx"]
import _glx from './system/glx.js'; export const glx = _glx;

//![import "system/glsl"]
import _glsl from './system/glsl.js'; export const glsl = _glsl;

//![import "system/system"]
import _System from './system/system.js'; export const System = _System;

//![import "system/timer"]
import _Timer from './system/timer.js'; export const Timer = _Timer;

//![import "system/random"]
import _Random from './system/random.js'; export const Random = _Random;

//![import "system/keycode"]
import _KeyCode from './system/keycode.js'; export const KeyCode = _KeyCode;

//![import "system/canvas"]
import _Canvas from './system/canvas.js'; export const Canvas = _Canvas;

//![import "system/perf"]
import _Perf from './system/perf.js'; export const Perf = _Perf;

//![import "system/log"]
import _Log from './system/log.js'; export const Log = _Log;

//![import "system/shader"]
import _Shader from './system/shader.js'; export const Shader = _Shader;

//![import "system/shader-program"]
import _ShaderProgram from './system/shader-program.js'; export const ShaderProgram = _ShaderProgram;

//![import "system/framebuffer"]
import _Framebuffer from './system/framebuffer.js'; export const Framebuffer = _Framebuffer;

//![import "system/texture"]
import _Texture from './system/texture.js'; export const Texture = _Texture;


// *********************************************
// resources

//![import "resources/wrappers"]
import * as _Wrappers from './resources/wrappers.js'; export const Wrappers = _Wrappers;

//![import "resources/resources"]
import _Resources from './resources/resources.js'; export const Resources = _Resources;
import _Sound from './resources/sound.js'; export const Sound = _Sound;


// *********************************************
// utils

//![import "utils/recycler"]
import _Recycler from './utils/recycler.js'; export const Recycler = _Recycler;

//![import "utils/linkable"]
import _Linkable from './utils/linkable.js'; export const Linkable = _Linkable;

//![import "utils/list"]
import _List from './utils/list.js'; export const List = _List;

//![import "utils/priority-queue"]
import _PriorityQueue from './utils/priority-queue.js'; export const PriorityQueue = _PriorityQueue;

//![import "utils/handler"]
import _Handler from './utils/handler.js'; export const Handler = _Handler;


// *********************************************
// math

//![import "math/matrix"]
import _Matrix from './math/matrix.js'; export const Matrix = _Matrix;

//![import "math/rect"]
import _Rect from './math/rect.js'; export const Rect = _Rect;

//![import "math/vec2"]
import _Vec2 from './math/vec2.js'; export const Vec2 = _Vec2;

//![import "math/tfunction"]
import _TFunction from './math/tfunction.js'; export const TFunction = _TFunction;

//![import "math/bounds2"]
import _Bounds2 from './math/bounds2.js'; export const Bounds2 = _Bounds2;

//![import "math/point2"]
import _Point2 from './math/point2.js'; export const Point2 = _Point2;


// *********************************************
// anim

//![import "anim/easing"]
import _Easing from './anim/easing.js'; export const Easing = _Easing;

//![import "anim/anim"]
import _Anim from './anim/anim.js'; export const Anim = _Anim;


// *********************************************
// flow

//![import "flow/boot"]
import _Boot from './flow/boot.js'; export const Boot = _Boot;

//![import "flow/grid-element"]
import _GridElement from './flow/grid-element.js'; export const GridElement = _GridElement;

//![import "flow/grid"]
import _Grid from './flow/grid.js'; export const Grid = _Grid;

//![import "flow/scene"]
import _Scene from './flow/scene.js'; export const Scene = _Scene;

//![import "flow/viewport"]
import _Viewport from './flow/viewport.js'; export const Viewport = _Viewport;

//![import "flow/updater"]
import _Updater from './flow/updater.js'; export const Updater = _Updater;

//![import "flow/container"]
import _Container from './flow/container.js'; export const Container = _Container;

//![import "flow/simple-container"]
import _SimpleContainer from './flow/simple-container.js'; export const SimpleContainer = _SimpleContainer;

//![import "flow/grid-container"]
import _GridContainer from './flow/grid-container.js'; export const GridContainer = _GridContainer;

//![import "flow/group"]
import _Group from './flow/group.js'; export const Group = _Group;

//![import "flow/drawable"]
import _Drawable from './flow/drawable.js'; export const Drawable = _Drawable;

//![import "flow/element"]
import _Element from './flow/element.js'; export const Element = _Element;

//![import "flow/mask"]
import _Mask from './flow/mask.js'; export const Mask = _Mask;

//![import "flow/label"]
import _Label from './flow/label.js'; export const Label = _Label;

//![import "flow/keyboard-handler"]
import _KeyboardHandler from './flow/keyboard-handler.js'; export const KeyboardHandler = _KeyboardHandler;

//![import "flow/pointer-handler"]
import _PointerHandler from './flow/pointer-handler.js'; export const PointerHandler = _PointerHandler;

//![import "flow/screen-controls"]
import _ScreenControls from './flow/screen-controls.js'; export const ScreenControls = _ScreenControls;

//![import "flow/button"]
import _Button from './flow/button.js'; export const Button = _Button;

//![import "flow/stick"]
import _Stick from './flow/stick.js'; export const Stick = _Stick;


// *********************************************
// fxl

//![import "fxl/fxl"]
import * as fxl from './fxl/fxl.js';
export default fxl;

//!export default fxl;

global.froxel =
{
	Class: Class,
	Schema: Schema,
	Template: Template,
	globals: globals,
	glx: glx,
	glsl: glsl,
	System: System,
	Timer: Timer,
	Random: Random,
	KeyCode: KeyCode,
	Canvas: Canvas,
	Perf: Perf,
	Log: Log,
	Shader: Shader,
	ShaderProgram: ShaderProgram,
	Framebuffer: Framebuffer,
	Texture: Texture,
	Wrappers: Wrappers,
	Resources: Resources,
	Sound: Sound,
	Recycler: Recycler,
	Linkable: Linkable,
	List: List,
	PriorityQueue: PriorityQueue,
	Handler: Handler,
	Matrix: Matrix,
	Rect: Rect,
	Vec2: Vec2,
	TFunction: TFunction,
	Bounds2: Bounds2,
	Point2: Point2,
	Easing: Easing,
	Anim: Anim,
	Boot: Boot,
	GridElement: GridElement,
	Grid: Grid,
	Scene: Scene,
	Viewport: Viewport,
	Updater: Updater,
	Container: Container,
	SimpleContainer: SimpleContainer,
	GridContainer: GridContainer,
	Group: Group,
	Drawable: Drawable,
	Element: Element,
	Mask: Mask,
	Label: Label,
	KeyboardHandler: KeyboardHandler,
	PointerHandler: PointerHandler,
	ScreenControls: ScreenControls,
	Button: Button,
	Stick: Stick,

	fxl: fxl
};
