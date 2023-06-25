# v0.0.4 - Jun 25 2023

#### WebGLCanvas
- Added `view`, `projection`, and `mvp` to WebGL uniforms.
- All transformation matrices are now of type Mat4.
- Renamed property 'canvas' to 'element' to be more accurate.
- Added method `createUniformBlockBuffer`.
- Added support to rename functions from original WebGL2RenderingContext.
- Added method `createBuffer`.

#### Utils
- Added utils file with methods `setOrtho2D`, `setOrtho3D` and `setPerspective`.

#### Texture
- Renamed class `TextureObject` to just `Texture`.
- Added method `activeTexture` to activate the texture on a texture unit of the current shader program.
- Using now renamed method `genTexture` to create the texture identifier.

#### Buffer
- Using now renamed method `genBuffer` to create the buffer identifier.

#### VertexArray
- Renamed VertexArrayObject to just VertexArray.
- Using now renamed method `genVertexArray` to create the identifier.

<br/>

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
