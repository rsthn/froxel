import { Mat4, Vec4 } from 'froxel-math';

/**
 * Represents a WebGL buffer.
 */
export declare class Buffer {
	/**
	 * Creates a WebGL buffer.
	 * @param {WebGLCanvas} gl
	 * @param {number} target
	 * @param {number} usage
	 */
	constructor(gl: WebGLCanvas, target: number, usage: number);
	/**
	 * Reference to the WebGLCanvas.
	 * @readonly @type {WebGLCanvas}
	 */
	readonly gl: WebGLCanvas;
	/**
	 * Buffer target.
	 * @type {number}
	 */
	target: number;
	/**
	 * Buffer usage mode.
	 * @type {number}
	 */
	usage: number;
	/**
	 * Buffer object resource.
	 * @type {WebGLBuffer}
	 */
	buffer: WebGLBuffer;
	/**
	 * Binds the buffer to its WebGL target.
	 * @returns {Buffer}
	 */
	bindBuffer(): Buffer;
	/**
	 * Unbinds the buffer from its GPU buffer target.
	 * @returns {Buffer}
	 */
	unbindBuffer(): Buffer;
	/**
	 * Initializes and creates the buffer object's data store.
	 * @param {ArrayBufferView} srcData
	 * @param {number} srcOffset?
	 * @returns {Buffer}
	 */
	bufferData(srcData: ArrayBufferView, srcOffset?: number): Buffer;
	/**
	 * Allocates the specified number of bytes for the buffer.
	 * @param {number} numBytes
	 * @returns {Buffer}
	 */
	allocate(numBytes: number): Buffer;
	/**
	 * Updates a subset of the buffer object's data store.
	 * @param {number} dstByteOffset
	 * @param {ArrayBufferView} srcData
	 * @param {number} srcOffset?
	 * @param {number} length?
	 * @returns {Buffer}
	 */
	bufferSubData(dstByteOffset: number, srcData: ArrayBufferView, srcOffset?: number, length?: number): Buffer;
	/**
	 * Deletes the buffer.
	 */
	deleteBuffer(): void;
}
export declare class UniformBlockBuffer extends Buffer {
	/**
	 * Creates a buffer for the UNIFORM_BUFFER target.
	 * @param {WebGLCanvas} gl
	 * @param {number} usage
	 */
	constructor(gl: WebGLCanvas, usage: number);
	/**
	 * Uniform block binding index. Set using `bindBufferBase`.
	 * @readonly @type {number}
	 */
	readonly bindingIndex: number;
	/**
	 * Binds the buffer to the UNIFORM_BUFFER binding point at a given index.
	 * @param {number} index
	 * @returns {UniformBlockBuffer}
	 */
	bindBufferBase(index: number): UniformBlockBuffer;
}
/**
 * Creates a WebGL GLSL Shader Program.
 * @param {WebGLCanvas} gl
 * @param {string} vertexShaderSource
 * @param {string} fragmentShaderSource
 */
export declare function ShaderProgram(gl: WebGLCanvas, vertexShaderSource: string, fragmentShaderSource: string): void;
export declare class ShaderProgram {
	/**
	 * Creates a WebGL GLSL Shader Program.
	 * @param {WebGLCanvas} gl
	 * @param {string} vertexShaderSource
	 * @param {string} fragmentShaderSource
	 */
	constructor(gl: WebGLCanvas, vertexShaderSource: string, fragmentShaderSource: string);
	/**
	 * Reference to the WebGLCanvas.
	 * @readonly @type {WebGLCanvas}
	 */
	readonly gl: WebGLCanvas;
	/**
	 * Vertex shader resource object.
	 * @readonly @type {WebGLShader}
	 */
	readonly vertexShader: WebGLShader;
	/**
	 * Fragment shader resource object.
	 * @readonly @type {WebGLShader}
	 */
	readonly fragmentShader: WebGLShader;
	/**
	 * Shader program resource object.
	 * @readonly @type {WebGLProgram}
	 */
	readonly program: WebGLProgram;
	/**
	 * Links the program and throws an error if there was any problem.
	 * @throws {Error}
	 * @returns {ShaderProgram}
	 */
	linkProgram(): ShaderProgram;
	/**
	 * Binds an attribute location to the shader program.
	 * @param {number} attribLocation
	 * @param {string} attribName
	 * @returns {ShaderProgram}
	 */
	bindAttribLocation(attribLocation: number, attribName: string): ShaderProgram;
	/**
	 * Activates the shader program for subsequent drawing operations.
	 */
	useProgram(): void;
	/**
	 * Returns the location of a uniform variable.
	 * @param {string} uniformName
	 * @returns {WebGLUniformLocation}
	 */
	getUniformLocation(uniformName: string): WebGLUniformLocation;
	/**
	 * Returns the location of one or more uniform variables.
	 * @param {Array<string>} uniformNames
	 * @returns { [key: string]: WebGLUniformLocation }
	 */
	getUniformLocations(uniformNames: Array<string>): [
		key: string
	];
	/**
	 * Returns the index and offset of one or more uniform variables. Useful when using uniform block objects (UBO).
	 * @param {Array<string>} uniformNames
	 * @returns { [key: string]: { index: number, offset: number } }
	 */
	getUniformOffsets(uniformNames: Array<string>): [
		key: string
	];
	/**
	 * Returns the index of a uniform block.
	 * @param {string} blockName
	 * @returns {number}
	 */
	getUniformBlockIndex(blockName: string): number;
	/**
	 * Returns the indices of one or more uniform blocks.
	 * @param {Array<string>} blockNames
	 * @returns { [key: string]: number }
	 */
	getUniformBlockIndices(blockNames: Array<string>): [
		key: string
	];
	/**
	 * Assigns the binding index of a uniform block buffer to a block identifier in the program.
	 * @param {number|string} blockIdentifier
	 * @param {number|UniformBlockBuffer} bindingIndex
	 * @returns {ShaderProgram}
	 */
	uniformBlockBinding(blockIdentifier: number | string, bindingIndex: number | UniformBlockBuffer): ShaderProgram;
}
export declare namespace ShaderProgram {
	const attribLocations: Map<string, number>;
	/**
	 * Binds a global attribute location to be applied to any newly created shader program.
	 * @param {number} attribLocation
	 * @param {string} attribName
	 * @returns {ShaderProgram}
	 */
	function bindAttribLocation(attribLocation: number, attribName: string): ShaderProgram;
	/**
	 * Binds several global attribute locations to be applied to any newly created shader program.
	 * @param {Map<string, number>} attribs
	 * @returns {ShaderProgram}
	 */
	function bindAttribLocations(attribs: Map<string, number>): ShaderProgram;
}
/**
 * Creates a Vertex Array Object (VAO).
 * @param {WebGLCanvas} gl
 */
export declare function VertexArray(gl: WebGLCanvas): void;
export declare class VertexArray {
	/**
	 * Creates a Vertex Array Object (VAO).
	 * @param {WebGLCanvas} gl
	 */
	constructor(gl: WebGLCanvas);
	/**
	 * Reference to the WebGLCanvas.
	 * @readonly @type {WebGLCanvas}
	 */
	readonly gl: WebGLCanvas;
	/**
	 * Vertex array object resource.
	 * @type {WebGLVertexArrayObject}
	 */
	vertexArray: WebGLVertexArrayObject;
	/**
	 * Binds the vertex array object to the GPU.
	 */
	bindVertexArray(): void;
	/**
	 * Unbinds the vertex array object from the GPU.
	 */
	unbindVertexArray(): void;
}
export declare class VertexBuffer extends Buffer {
	/**
	 * Creates a buffer for the ARRAY_BUFFER target.
	 * @param {WebGLCanvas} gl
	 * @param {number} usage
	 */
	constructor(gl: WebGLCanvas, usage: number);
}
export declare class ElementBuffer extends Buffer {
	/**
	 * Creates a buffer for the ELEMENT_ARRAY_BUFFER target.
	 * @param {WebGLCanvas} gl
	 * @param {number} usage
	 */
	constructor(gl: WebGLCanvas, usage: number);
}
/**
 * @typedef {'NEAREST' | 'LINEAR'} TextureFilterType
 */
/**
 * @typedef {'REPEAT' | 'CLAMP_TO_EDGE' | 'MIRRORED_REPEAT'} TextureWrapMode
 */
/**
 * WebGLCanvas Texture Object.
 */
export declare class Texture {
	/**
	 * Creates an empty texture object of the specified size.
	 * @param {WebGLCanvas} gl
	 * @param {number} width - Physical texture width.
	 * @param {number} height - Physical texture height.
	 * @param {number} [targetWidth] - Logical texture width.
	 * @param {number} [targetHeight] - Logical texture height.
	 */
	constructor(gl: WebGLCanvas, width: number, height: number, targetWidth?: number, targetHeight?: number);
	/**
	 * Reference to the WebGLCanvas.
	 * @readonly @type {WebGLCanvas}
	 */
	readonly gl: WebGLCanvas;
	/**
	 * Texture object resource.
	 * @readonly @type {WebGLTexture}
	 */
	readonly texture: WebGLTexture;
	/**
	 * Texture width (physical width).
	 * @readonly @type {number}
	 */
	readonly width: number;
	/**
	 * Texture height (physical height).
	 * @readonly @type {number}
	 */
	readonly height: number;
	/**
	 * Target width originally requested (logical width).
	 * @readonly @type {number}
	 */
	readonly targetWidth: number;
	/**
	 * Target height originally requested (logical height).
	 * @readonly @type {number}
	 */
	readonly targetHeight: number;
	/**
	 * Scale of the texture (physical width / logical width).
	 * @readonly @type {number}
	 */
	readonly scale: number;
	/**
	 * Texture filter type. Defaults to `LINEAR`.
	 * @readonly @type {TextureFilterType}
	 */
	readonly filterType: TextureFilterType;
	/**
	 * Texture wrap mode. Defaults to `CLAMP_TO_EDGE`.
	 * @readonly @type {TextureWrapMode}
	 */
	readonly wrapMode: TextureWrapMode;
	/**
	 * Number of mipmap levels (use 0 to disable). Default is `0`.
	 * @readonly @type {number}
	 */
	readonly mipmapLevels: number;
	/**
	 * Indicates if the texture storage has already been allocated.
	 * @readonly @private @type {boolean}
	 */
	private readonly allocated;
	/**
	 * Binds the texture to the `TEXTURE_2D` target and allocates the texture storage if not allocated yet.
	 * @returns {Texture}
	 */
	bindTexture(): Texture;
	/**
	 * Allocates the texture storage.
	 * @returns {Texture}
	 */
	allocate(): Texture;
	/**
	 * Applies the texture filter.
	 * @private
	 * @param {boolean} [bindTexture]
	 * @returns {Texture}
	 */
	private applyFilter;
	/**
	 * Applies the texture wrap mode.
	 * @private
	 * @param {boolean} [bindTexture]
	 * @returns {Texture}
	 */
	private applyWrap;
	/**
	 * Sets the texture filter type.
	 * @param {TextureFilterType} filterType
	 * @returns {Texture}
	 */
	setFilter(filterType: TextureFilterType): Texture;
	/**
	 * Sets the texture wrap mode.
	 * @param {TextureWrapMode} wrapMode
	 * @returns {Texture}
	 */
	setWrapMode(wrapMode: TextureWrapMode): Texture;
	/**
	 * Sets the number of mipmap levels. Valid only if texture data has not been allocated yet.
	 * @param {number} numLevels
	 * @returns {Texture}
	 */
	setMipmapLevels(numLevels: number): Texture;
	/**
	 * Uploads data to the GPU from the specified image.
	 * @param {HTMLImageElement} image
	 * @param {number} [offsX] - Target X offset.
	 * @param {number} [offsY] - Target Y offset;
	 * @returns {Texture}
	 */
	upload(image: HTMLImageElement, offsX?: number, offsY?: number): Texture;
	/**
	 * Makes the texture active on the specified texture unit.
	 * @param {number} unit - Texture unit index (0 to 15).
	 * @returns {Texture}
	 */
	activeTexture(unit: number): Texture;
}
export type TextureFilterType = "NEAREST" | "LINEAR";
export type TextureWrapMode = "REPEAT" | "CLAMP_TO_EDGE" | "MIRRORED_REPEAT";
export type WebGLCanvasOrientation = "default" | "landscape" | "portrait" | "automatic" | "strict";
export type WebGLCanvasOptions = {
	/**
	 * Positions the canvas to cover the entire screen. default `true`
	 */
	fullscreen?: boolean;
	/**
	 * Indicates if the stencil buffer should be enabled. default `false`
	 */
	stencil?: boolean;
	/**
	 * Background color, must be a 6-digit hex RGB value. default `000000`
	 */
	background?: string;
	/**
	 * Width of the canvas, used only when `fullscreen` is `false`. default `960`
	 */
	width?: number;
	/**
	 * Height of the canvas, used only when `fullscreen` is `false`. default `540`
	 */
	height?: number;
	/**
	 * Orientation of the canvas. Defaults to `AUTOMATIC`.
	 */
	orientation?: WebGLCanvasOrientation;
	/**
	 * Controls the antialias option, set to `false` for pixel-perfect output. Default is `true`.
	 */
	antialias?: boolean;
	/**
	 * Limit of the scale factor, used only when set to greater than zero.
	 */
	scaleFactorMax?: number;
	/**
	 * Offset used to increase the scale factor before the Math.floor operation. Default is `0.7`.
	 */
	scaleFactorOffs?: number;
};
export type WebGLCanvasUniforms = {
	/**
	 * Indicates if the uniforms have changed and should be reloaded in the WebGL program.
	 */
	changed: boolean;
	/**
	 * Canvas resolution (automatically set by WebGLCanvas).
	 */
	resolution: Vec4;
	/**
	 * Transformation to achieve correct target resolution and orientation (automatically set by WebGLCanvas).
	 */
	initial: Mat4;
	/**
	 * Transforms coordinates to view space.
	 */
	view: Mat4;
	/**
	 * Transforms coordinates to NDC space. Use the `setOrtho2D`, `setOrtho3D` or `setFrustrum` methods of Utils to configure its value.
	 */
	projection: Mat4;
	/**
	 * Model-view-projection (MVP) matrix contains all transformations in a single matrix.
	 */
	mvp: Mat4;
};
/**
 * WebGL2 Canvas.
 *
 * Default WebGL configuration is set as follows:
 *
 * - `DEPTH_TEST`: enabled, `clearDepth`: -1.0, `depthFunc`: GEQUAL
 * - `BLEND`: enabled, `blendEquationSeparate`: FUNC_ADD, FUNC_ADD, `blendFunc`: ONE, ONE_MINUS_SRC_ALPHA
 * - `UNPACK_PREMULTIPLY_ALPHA_WEBGL`: enabled
 * - `SCISSOR_TEST`: enabled
 *
 * @extends {WebGL2RenderingContext}
 * @param {WebGLCanvasOptions} [options]
 */
export declare function WebGLCanvas(options?: WebGLCanvasOptions): void;
export declare class WebGLCanvas {
	/**
	 * WebGL2 Canvas.
	 *
	 * Default WebGL configuration is set as follows:
	 *
	 * - `DEPTH_TEST`: enabled, `clearDepth`: -1.0, `depthFunc`: GEQUAL
	 * - `BLEND`: enabled, `blendEquationSeparate`: FUNC_ADD, FUNC_ADD, `blendFunc`: ONE, ONE_MINUS_SRC_ALPHA
	 * - `UNPACK_PREMULTIPLY_ALPHA_WEBGL`: enabled
	 * - `SCISSOR_TEST`: enabled
	 *
	 * @extends {WebGL2RenderingContext}
	 * @param {WebGLCanvasOptions} [options]
	 */
	constructor(options?: WebGLCanvasOptions);
	/**
	 * Disposes the canvas and all related resources.
	 */
	dispose(): void;
	/**
	 * WebGL2 Context.
	 * @private @readonly @type {WebGL2RenderingContext}
	 */
	private readonly gl;
	/**
	 * @typedef {Object} WebGLCanvasUniforms
	 * @prop {boolean} changed Indicates if the uniforms have changed and should be reloaded in the WebGL program.
	 * @prop {Vec4} resolution Canvas resolution (automatically set by WebGLCanvas).
	 * @prop {Mat4} initial Transformation to achieve correct target resolution and orientation (automatically set by WebGLCanvas).
	 * @prop {Mat4} view Transforms coordinates to view space.
	 * @prop {Mat4} projection Transforms coordinates to NDC space. Use the `setOrtho2D`, `setOrtho3D` or `setFrustrum` methods of Utils to configure its value.
	 * @prop {Mat4} mvp Model-view-projection (MVP) matrix contains all transformations in a single matrix.
	 */
	/**
	 * Common uniforms for WebGL. Note that it is the responsibility of the developer to set, configure and use these uniforms (except the ones marked
	 * as "automatically set by WebGLCanvas"). Thse are provided solely as placeholders for easy access from a known interface.
	 * @readonly @type {WebGLCanvasUniforms}
	 */
	readonly u: WebGLCanvasUniforms;
	/**
	 * Underlying HTML5 canvas element.
	 * @readonly @type {HTMLCanvasElement}
	 */
	readonly element: HTMLCanvasElement;
	/**
	 * Logical width of the canvas.
	 * @readonly @type {number}
	 */
	readonly width: number;
	/**
	 * Logical height of the canvas.
	 * @readonly @type {number}
	 */
	readonly height: number;
	/**
	 * Physical canvas width.
	 * @readonly @type {number}
	 */
	readonly physWidth: number;
	/**
	 * Physical canvas height.
	 * @readonly @type {number}
	 */
	readonly physHeight: number;
	/**
	 * Indicates if the canvas is flipped.
	 * @readonly @type {boolean}
	 */
	readonly isFlipped: boolean;
	/**
	 * Canvas global scale.
	 * @readonly @type {number}
	 */
	readonly globalScale: number;
	private init;
	options: any;
	/**
	 * Resizes the canvas to the specified logical size.
	 * @param {number} width
	 * @param {number} height
	 */
	resize(width: number, height: number, updateViewport?: boolean): void;
	updateViewport(): void;
	/**
	 * Creates a shader program with the specified vertex and fragment shader source codes.
	 * @param {string} vertexShaderSource
	 * @param {string} fragmentShaderSource
	 * @returns {ShaderProgram}
	 */
	createShaderProgram(vertexShaderSource: string, fragmentShaderSource: string): ShaderProgram;
	/**
	 * Creates a new vertex array object.
	 * @returns {VertexArray}
	 */
	createVertexArray(): VertexArray;
	/**
	 * Creates a new buffer.
	 * @param {number} target Possible values are: `ARRAY_BUFFER`, `ELEMENT_ARRAY_BUFFER`, `COPY_READ_BUFFER`, `COPY_WRITE_BUFFER`, `TRANSFORM_FEEDBACK_BUFFER`, `UNIFORM_BUFFER`, `PIXEL_PACK_BUFFER`, or `PIXEL_UNPACK_BUFFER`.
	 * @param {number} usage Possible values are: `STATIC_DRAW`, `DYNAMIC_DRAW`, `STREAM_DRAW`, `STATIC_READ`, `DYNAMIC_READ`, `STREAM_READ`, `STATIC_COPY`, `DYNAMIC_COPY`, or `STREAM_COPY`.
	 * @returns {VertexBuffer}
	 */
	createBuffer(target: number, usage: number): VertexBuffer;
	/**
	 * Creates a new vertex buffer.
	 * @param {number} usage Possible values are: `STATIC_DRAW`, `DYNAMIC_DRAW`, `STREAM_DRAW`, `STATIC_READ`, `DYNAMIC_READ`, `STREAM_READ`, `STATIC_COPY`, `DYNAMIC_COPY`, or `STREAM_COPY`.
	 * @returns {VertexBuffer}
	 */
	createVertexBuffer(usage: number): VertexBuffer;
	/**
	 * Creates a new element buffer.
	 * @param {number} usage Possible values are: `STATIC_DRAW`, `DYNAMIC_DRAW`, `STREAM_DRAW`, `STATIC_READ`, `DYNAMIC_READ`, `STREAM_READ`, `STATIC_COPY`, `DYNAMIC_COPY`, or `STREAM_COPY`.
	 * @returns {ElementBuffer}
	 */
	createElementBuffer(usage: number): ElementBuffer;
	/**
	 * Creates a new uniform block buffer.
	 * @param {number} usage Possible values are: `STATIC_DRAW`, `DYNAMIC_DRAW`, `STREAM_DRAW`, `STATIC_READ`, `DYNAMIC_READ`, `STREAM_READ`, `STATIC_COPY`, `DYNAMIC_COPY`, or `STREAM_COPY`.
	 * @returns {UniformBlockBuffer}
	 */
	createUniformBlockBuffer(usage: number): UniformBlockBuffer;
	/**
	 * Creates a new texture object of the specified size.
	 * @param {number} width - Physical texture width.
	 * @param {number} height - Physical texture height.
	 * @param {number} [targetWidth] - Logical texture width.
	 * @param {number} [targetHeight] - Logical texture height.
	 * @returns {Texture}
	 */
	createTexture(width: number, height: number, targetWidth?: number, targetHeight?: number): Texture;
	/**
	 * Loads an image from the specified URL and creates a texture.
	 * @param {string} url
	 * @param {number} [mipmapLevels] - Number of levels for mipmapping. Defaults to `0`.
	 * @returns {Promise<Texture>}
	 */
	loadTextureFromUrl(url: string, mipmapLevels?: number): Promise<Texture>;
}
export declare namespace WebGLCanvas {
	/**
	 * Loads an image from the specified URL.
	 * @param {string} url
	 * @returns {Promise<HTMLImageElement>}
	 */
	function loadImage(url: string): Promise<HTMLImageElement>;
}

export {};
