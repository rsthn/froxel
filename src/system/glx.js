//!namespace glx

	//!enum BufferTarget
		//:ARRAY_BUFFER
		//:ELEMENT_ARRAY_BUFFER
		//:COPY_READ_BUFFER
		//:COPY_WRITE_BUFFER
		//:TRANSFORM_FEEDBACK_BUFFER
		//:UNIFORM_BUFFER
		//:PIXEL_PACK_BUFFER
		//:PIXEL_UNPACK_BUFFER
	//!/enum

	//!enum BufferUsage
		//!STATIC_DRAW
		//!DYNAMIC_DRAW
		//!STREAM_DRAW
		//!STATIC_READ
		//!DYNAMIC_READ
		//!STREAM_READ
		//!STATIC_COPY
		//!DYNAMIC_COPY
		//!STREAM_COPY
	//!/enum

//!/namespace

//!class glx

const glx =
{
	BufferTarget: { },
	BufferUsage: { },

	/**
	 * WebGL rendering context.
	 * !static readonly gl: WebGL2RenderingContext;
	 */
	gl: null,

	/**
	 * Sets the WebGL rendering context.
	 * !static setContext (context: WebGL2RenderingContext) : glx;
	 */
	setContext: function (context)
	{
		this.gl = context;

		this.BufferTarget.ARRAY_BUFFER = this.gl.ARRAY_BUFFER;
		this.BufferTarget.ELEMENT_ARRAY_BUFFER = this.gl.ELEMENT_ARRAY_BUFFER;
		this.BufferTarget.COPY_READ_BUFFER = this.gl.COPY_READ_BUFFER;
		this.BufferTarget.COPY_WRITE_BUFFER = this.gl.COPY_WRITE_BUFFER;
		this.BufferTarget.TRANSFORM_FEEDBACK_BUFFER = this.gl.TRANSFORM_FEEDBACK_BUFFER;
		this.BufferTarget.UNIFORM_BUFFER = this.gl.UNIFORM_BUFFER;
		this.BufferTarget.PIXEL_PACK_BUFFER = this.gl.PIXEL_PACK_BUFFER;
		this.BufferTarget.PIXEL_UNPACK_BUFFER = this.gl.PIXEL_UNPACK_BUFFER;

		this.BufferUsage.STATIC_DRAW = this.gl.STATIC_DRAW;
		this.BufferUsage.DYNAMIC_DRAW = this.gl.DYNAMIC_DRAW;
		this.BufferUsage.STREAM_DRAW = this.gl.STREAM_DRAW;
		this.BufferUsage.STATIC_READ = this.gl.STATIC_READ;
		this.BufferUsage.DYNAMIC_READ = this.gl.DYNAMIC_READ;
		this.BufferUsage.STREAM_READ = this.gl.STREAM_READ;
		this.BufferUsage.STATIC_COPY = this.gl.STATIC_COPY;
		this.BufferUsage.DYNAMIC_COPY = this.gl.DYNAMIC_COPY;
		this.BufferUsage.STREAM_COPY = this.gl.STREAM_COPY;

		return this;
	},

	/**
	 * Returns the value of a GL parameter.
	 * !static getParameter (name: string) : any;
	 */
	getParameter: function (name)
	{
		return this.gl.getParameter(this.gl[name]);
	},

	/**
	 * Returns a slice of an array as a Float32Array.
	 * !static getFloat32Array (data: any, offset: number, length: number) : Float32Array;
	 */
	getFloat32Array: function (data, offset, length)
	{
		if (offset === 0 && length === data.length)
		{
			if (data instanceof Float32Array)
				return data;
		}

		let buff = new Float32Array(length);

		for (let i = 0; i < length; i++)
			buff[i] = data[i+offset];

		return buff;
	},

	/**
	 * Creates a buffer from the specified array.
	 * @param {BufferTarget} target Defaults to ARRAY_BUFFER.
	 * @param {BufferUsage} usage Defaults to STATIC_DRAW.
	 * !static createBufferFrom (data: any, target?: glx.BufferTarget, usage?: glx.BufferUsage, offset?: number, length?: number) : WebGLBuffer;
	 */
	createBufferFrom: function (data, target=null, usage=null, offset=null, length=null)
	{
		target = target ?? glx.BufferTarget.ARRAY_BUFFER;
		usage = usage ?? glx.BufferUsage.STATIC_DRAW;

		let buff = this.gl.createBuffer();
		this.gl.bindBuffer (target, buff);
		this.gl.bufferData (target, this.getFloat32Array(data, offset ?? 0, length ?? data.length), usage);

		//this.gl.bindBuffer (target, null);
		return buff;
	}
};

//!/class

export default glx;
