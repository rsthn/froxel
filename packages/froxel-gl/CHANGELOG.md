# v0.0.3 - Jun 6 2023

#### WebGLCanvas
- Added methods `createTextureObject`, `loadImage` and `loadTextureFromUrl`.

#### TextureObject
- Added class `TextureObject` to easily interact with WebGL textures.

#### Buffer
- Added method `unbindBuffer`, which sets the buffer target in WebGL to `null`.
- Added method `allocate` to allocate a buffer space without data.

#### ShaderProgram
- Added method `getUniformOffsets` to get the index and offset of uniforms in a uniform block.
- Added method `getUniformBlockIndex`, returns the index of a uniform in a uniform block.
- Added methods `getUniformBlockIndices` and `uniformBlockBinding`.

<br/>

# v0.0.2 - Sep 28 2022

#### ShaderProgram
- Methods `linkProgram`, `bindAttribLocation`, and `bindAttribLocations` now return the self ShaderProgram.

#### WebGLCanvas
- Added auto-resizing features and related options.
- Added options `scaleFactorOffs` and `scaleFactorMax`.
