# v2.2.15 - Aug 02 2022

#### Stick
- Fixed bug calculating wrong direction when using the stick with the arrow keys.
- ⚠ Keyboard events are no longer enabled by default, use new methods `bindKeys` and `keysEnabled` to properly activate it.
- New method `bindKeys` allows the key codes for the `UP`, `DOWN`, `LEFT` and `RIGHT` keys to be specified if desired.
- Method `keysEnabled` returns or sets the keyboard interaction enabled state.

#### KeyCode
- Added constants for BACKQUOTE, MINUS, EQUAL, LBRACKET, RBRACKET, BACKSLASH, SEMICOLON, QUOTE, COMMA, DOT and SLASH.

#### Texture
- Fixed bug in `allocate` method not returning the texture itself.
- 🌿 Added `createCanvas` method to create a canvas and attach it to the texture to draw easily. Only 2D canvases supported at the moment.
- 🌿 Method `getCanvas` has been added, returns the currently attached canvas.
- 🌿 Added method `uploadCanvas` to upload the attached canvas bitmap data to the texture.
- 🌿 Added method `disposeCanvas` to dispose a previously attached canvas.
- 🌿 Added method `uploadRender` as a shorthand method for allocating a canvas, drawing on it, uploading it to the texture and disposing the canvas.

#### globals
- 🔻 Removed `shaderProgram` from globals because it is not used anywhere now.

#### Canvas
- Added property `shaderProgram` indicating which program the canvas is currently using.

#### Spritefont
- 🔻 Removed methods `drawText`, `drawTextAligned` and `drawTextAligned2` that were attached to the Canvas prototype.

<br/>

# v2.2.14 - Jul 20 2022

#### glsl
- Added function `mask` taking a float or a vec4 as argument and returns 0.0 when the alpha is 0.0 or 1.0 otherwise.
- Added function `sqwave` that returns a square wave value (1.0 or 0.0) for the given time, period and duty cycle parameters.

#### Canvas
- Updated `initGl` to set UNPACK_PREMULTIPLY_ALPHA_WEBGL to ensure all textures are treated as premultiplied-alpha textures.
- Updated default fragment shaders since textures values are now premultiplied alpha.

<br/>

# v2.2.13 - Jul 08 2022

#### Recycler
- Added property `objectRefs` to recycler items to count the number of references to the instance.
- Method `free` updated to destroy instance only when the `objectRefs` counter reaches zero.
- 🌿 Added method `instanceRef` to increase the reference counter of an instance.

#### SpritesheetAnimation
- Fixed bug in Animation class causing `repeated` and other drawable wrappers not to work properly.

#### Random
- 🌿 Added property `count` indicating the number of times the generator was called.

#### anim.Block
- The `stamp` property is now set using a global counter instead of using a random value.

#### Stick
- Updated method `containsPoint` to return `false` if alpha is 0.

#### Button
- Updated method `containsPoint` to return `false` if alpha is 0.

<br/>

# v2.2.12 - Jul 07 2022

#### Element
- Method `draw` now immediately returns if alpha is less than or equal to zer0.

#### fxl.sys
- Methods `timeout`, `interval` and `span` now return the Callback node.
- Added `cancelTimeout`, `cancelInterval` and `cancelSpan` methods.

#### Resources
- Fixed bug introduced recently of an undeclared variable when loading audio.

#### SpritesheetAnimation
- Parameter `forced` added to `play` method.
- Fixed frame index overflow bug.

#### Spritesheet
- Added support for configuration option `coords` containing the rectangle coords of each frame (x, y, w, h). When specified, overrides the automatic frame calculation.

#### fxl.res
- Added support for latest Spritesheet feature (coordinate based frames), method `frame` of object returned by `spritesheet` can be used to define frame coordinates.

<br/>

# v2.2.10 - Jun 20 2022

#### SpritesheetAnimation
- Removed all support for `transitions` since that can easily be achieved with sequences.
- Fixed a few bugs regarding wrong frame being drawn when the animation is rendered multiple times in the same rendering frame.

#### Anim
- Added parameter `cmd` when calling the callback function of the `exec` action.
- Added property `time` to Command, used to keep track of the logical time of a command.

#### Label
- Properties `textWidth` and `textHeight` are now available as soon as text and font properties are set.
- The `bounds` property is now updated to reflect the active alignment and text size.

#### Drawable
- Added `mirrorX` and `mirrorY` drawable modifiers.

<br/>

# v2.2.9 - Jun 14 2022

#### globals
- Added `randt` to generate a table of random integers.

#### fxl.res
- Fixed typo in the AnimationResource type of fxl.res regarding the `seq` method.

#### Element
- Added `root` method which returns the root of an Element.

#### GridElement
- Method `setData` now properly sets the `host` property.

#### Texture
- Fixed bug in `upload` causing filter and wrap modes to be ignored.

<br/>

# v2.2.8 - Jun 12 2022

#### General
- Added Texture class with general definition of a texture.

#### fxl.res
- Exception will be thrown when using `get` if the resource ID is not found.
- Fixed signature of several methods in fxl.res to reflect `Texture` class.
- Added `AnimationResource` type to describe the object obtained by calling `animation`.

#### Canvas
- Removed `setWrapRepeat` and `uploadTexture` because those are now available in the Texture class.

#### Drawable
- Added method `getTexture` as replacement of `getImage` which is still available but now deprecated.

#### Resources
- Method `resizeImage` of Resources now always returns HTMLImageElement instead of HTMLCanvasElement.
- Added method `loadImage`, returns an HTMLImageElement from a given URL.

<br/>

# v2.2.7 - Jun 06 2022

#### Vec2
- Method `rotate` now allows rotation origin (cx, cy) to be specified.

#### Canvas
- Added method `createTexture` and `uploadTexture` to manually create and populate the texture buffer, works only in GL mode.

#### Global
- Function `rotatePoint` now allows the rotation origin (cx, cy) to be specified.

#### ScreenControls
- Renamed method `setHoverEnabled` to just `hover` and converted it to getter/setter.
- Renamed method `setZIndexEnabled` to `zindex` and made it a getter/setter.
- Added type `Handler` to formally define what is a screen control handler.

#### System
- Added types `KeyboardEventHandler`, `PointerEventHandler`, `Pointer`, and `KeyboardState`.

#### Handler
- Callbacks can now return `null` to stop further execution of other callbacks.

#### fxl.input
- Added interfaces `pointer` and `keyboard` to register callbacks for pointer and keyboard events respectively.
- Added types `KeyboardCallback` and `PointerCallback`.

<br/>

# v2.2.6 - Jun 05 2022

#### Anim
- Added tsdoc to all methods and cleaned up some code.

#### Container
- Method `add` now returns the element added instead of boolean.

#### GridContainer
- Method `add` now returns the element added instead of boolean.

#### SimpleContainer
- Method `add` now returns the element added instead of boolean.
- Constructor now allows no parameters to be passed to build a size-irrelevant simple container (width and height will be zero).

#### World
- Method `createScene` now returns the created scene.

#### Resources
- Added mipmap support to `image` and `images` resources. Use the `mipmap` (integer) property to specify how many mipmap levels to generate.

#### Global
- Added `fract` and `mix` functions with the same behavior as in GLSL.

<br/>

# v2.2.5 - May 26 2022

#### System
- Added new orientation type `strict` to ensure target resolution is always preserved.

#### Resources
- Progress level calculated better to provide smooth progress updates when using `images` resource.
- Function `onLoad` is now async, and method `init` of the loaded resources will be executed if it exists.

#### Updater
- Method `add` now returns the element instead of boolean.

#### Global
- Added functions `norm` and `snorm` to handle normalized values.
- Added functions `clamp` and `map` with the same functionality as the GLSL ones.

#### Scene
- Added `name` property (can be set when constructing the scene) to debug drawCounts easily.
- Number of elements drawn will be sent as a variable to the Log when on-screen log is enabled.

#### World
- Method `init` now creates the scenes with their appropriate names.
- Method `createScene` now allows to specify the name of the scene.

#### Log
- Renamed property `activated` to `enabled` to be more semantically correct.

#### Custom
- Added `init` method to setup the resource asynchronously.

<br/>

# v2.2.4 - May 09 2022

#### Bounds2
- Added method `ratio` returning the aspect ratio of the bounds.
- Parameters `width` and `height` of method `resize` and `resizeBy` and can now be set to `true` to automatically calculate the respective dimension keeping aspect ratio.

#### fxl.sys
- Option `preallocate` now defaults to `false`, since only high performance applications need preallocation.
- Method `span` now sends parameter `dt` right after `t`.

#### glsl
- Directive '#use' replaced with '//@use' for cleaner syntax.
- Added snippets `vert-defs` and `frag-defs` to include default uniforms and in/out for the vertex and fragment shaders.
- Added function `norm` to normalize from [-1,1] to [0,1].
- Updated snippets to reflect the changes to the v_resolution uniform.

#### ShaderProgram
- Added static method `create` with support to specify all shader sources (vertex, fragment and geometry) in a single string.

#### Canvas
- Added shader program `fwrap` to support frame wrapping.
- Added option `mipmap` and `levels` for method `prepareImage`, used to setup mipmap on a texture.
- Added method `renderImageMipmap` similar to `renderImage` but with mipmap support.
- Vector `v_resolution` changed to 4-component vector, second half (z and w) has the screen logical resolution after the flip flag has been applied (if any).

#### Container
- Added handler `ldraw` executed after the container is drawn.

#### Drawable
- Added method `resize` to change the logical size of the drawable.

#### System
- Changed `tempDisplayBuffer` size from 320x240 to 640x480.

#### Resources
- Method `load` now also executes the progress callback for every resource in an array resource (i.e. images).

<br/>

# v2.2.3 - Apr 30 2022

#### General
- Added `glx` to exports. A new static class that provides access to some WebGL features.
- Upgraded rinn dependency to 2.0.42.

#### Global
- Added `repeat`, `lpad` and `rpad` functions.

#### Drawable
- Fixed bug causing groups to have zero width/height.

#### Element
- Updated `draw` to allow drawing the bounds when `debugBounds` is set even if there is no `img` nor `render` method attached (i.e. Groups).
- Method `debug` now accepts value 0 as an alias of `true`.
- Changed order of debugColors to make brighter ones first.

#### Button
- Methods `onButtonUp`, `onButtonDown` and `onTap` can now be called without parameters to trigger the handler.

#### Canvas
- Heavily updated shaders to improve performance.
- Vertex buffer of the quad is now 3-component vector, with z as 1.0 to improve performance.
- Renamed matrix `m_location` to `m_quad` in all shaders.
- Removed no longer needed `v_texture_size`, and updated `v_frame_size` to be a 4-component vector.
- Values of matrix `m_texture` are now passed as normalized values (in relation to the texture size).
- Added regular quick shader program and respective shaders (quick-vert and quick-frag) that don't wrap the texture coordinates.

#### glsl
- New static class that allows processing of GLSL and reusing code snippets.
- Methods `get` and `set` can be used to read and set snippets of GLSL code.
- Method `process` used to replace special marks in GLSL code with their respective value.
- Support for `#use xxx` added, where xxx is a comma separated list of names of GLSL snippets.
- Snippets added: invertX, invertY, snorm, location2d, frameTexCoords, frameTex, rand and align.

#### Shader
- Method `source` has been removed, the GLSL source code must be passed to the `compile` method now.
- Removed method `getError`, since now error is automatically thrown when calling the `compile` method.
- GLSL source code can now be passed to the constructor to automatically compile the shader.

#### ShaderProgram
- Removed `getAllErrors` method, and removed pre-loading of several uniform locations no longer needed.

#### Resources
- Added option `extraScale` when loading images. Used to add the value to the calculated scale to achieve images with higher resolution but the same "target" resolution.

<br/>

# v2.2.2 - Apr 19th 2022

#### Element
- Changed signature of callback for `uniformSetter`.
- 🌿 Method `shaderProgram` now allows a string (name of registered shader program) to be passed.
- Added method `getDebugColor`, returns a color given the `debugBounds` value. Valid values are boolean or number from 0 to 7.
- Added static array `debugColors` with the eight color values supported.
- 🌿 New method `debug` can be used to set/get the `debugBounds` property.

#### GridElement
- Added new flag `WRAP_EXTENTS` to be used by Group.

#### Group
- 🌿 Added method `wrapExtents` to read/set the `WRAP_EXTENTS` flag, used make the group bounds extend to wrap all children, defaults to `false`.
- ⚠ Method `alpha` now sets alpha on all children as well.

#### ShaderProgram
- 🔻 Removed all uniform_* variables, replaced by single map `locations` which contains the cached locations of uniforms, uniform blocks and attributes.
- 🌿 Added methods `getAttribLocation`, and `getUniformLocation`.
- Method `use` renamed to `activate` to be more accurate with what it actually does.
- Added set of uniform* methods to set uniform values directly from the program object.
- Added method `uniformSetter` to get/set the uniform-setter function of the program.

#### Drawable
- ⚠ Renamed properties `x` and `y` to `sx` and `sy` to denote source coordinates.
- Added properties `swidth` and `sheight` to represent source width/height in physical image units.
- Added method `drawf` to draw the drawable using full parameters.
- Optimized `Repeated` class to use new `drawf` method instead of multiple `draw` calls.

#### Stick
- Added `refX` and `refY` parameters, used as center of the stick when the pointer is activated.
- Constructor now calls `debug(2)` on the hitbox to set its mask color.

#### Canvas
- Removed `repeat` shader program and merged its functionality in the default shader.

#### Button
- Constructor now calls `debug(2)` on the hitbox to set its mask color.

#### Mask
- Method `draw` now uses Element's `getDebugColor` to pick the right color for the mask bounds.

#### fxl.world
- 🌿 Added method `showMasks` to easily enable/disable mask rendering.

#### global
- Added property `debugMasks` to control drawing masks for debugging purposes.
- Added property `shaderProgram` with the currently active program. Updated Canvas to use this new property.

<br/>

# v2.2.1 - April 6th 2022

#### General
- `Drawable` class is now part of the family. All resources using the deprecated `IDrawable` interface are now extending `Drawable` instead and taking advantage of the pre-made methods.
- Several static methods of `Element` removed since those are now replaced by functionality from `Drawable`.
- Ditched `yarn` and using now `pnpm` as package manager.
- Removed `prepare` command from `froxel` CLI.

#### `Drawable`
- New class that represents an object that can be drawn on the canvas.
- Retains compatibility with `IDrawable`, but includes new method `render` _(g:Canvas, elem:Element)_ called by `Element` to render the drawable on the canvas.
- 🌿 Static methods `nineSlice`, `repeated`, `clipped`, `centered`, `static` and `group` can be used to change the rendering behavior of a drawable.
- 🌿 There are also instance methods with the same names as the static ones to quickly create new drawables that are rendered differently.

#### `IDrawable`
- 🔻 Removed from the system in favor of the new `Drawable` class.

#### `Group`
- 🌿 Method `addChild` now has a parameter `relative` (boolean) to add the child element relative to the position of the group.
- ⚠ The size of the group is now determined by the first child added to it.

#### `Button`
- 🌿⚠ Methods `resize` and `resizeBy` now automatically resize the hitbox to the same size as the button. You can still modify the hitbox's size manually.
- `Button` class no longer uses `renderWith`, but rather just swaps the active drawable depending on the button state.

#### `Element`
- Now extends the `Drawable` class.
- Method `draw` will return immediately if both `img` and `render` are `null`.
- Method `draw` calls `render` always if it is present, otherwise uses `Drawable.render` from `img`.
- ⚠ Signature of callbacks passed to `renderWith` are now `(g:Canvas, elem:Element, img:Drawable) => void`
- 🔻 Removed deprecated methods: `renderDefault`, `renderClipped`, `renderNineSlice`, and `renderRepeat`, use the static methods with similar names of `Drawable` instead.

#### `Label`
- Updated signature of `renderText` to comply with changes in `Element`.

#### `Stick`
- Updated signature of `renderStick` to comply with changes in `Element`.

#### `Placeholder` (Resource)
- 🔻 Removed in favor of the `Custom` resource.

#### `Custom` (Resource)
- 🌿 Allows optional `draw` function to be specified in the resource options to render the actual custom drawable contents.
- Signature of `draw` method (if provided) should be `(g: Canvas, r: Object) => void`.
- Can be used to create a solid color drawable, by setting the `color` resource option to some hex RGB value.

#### `Drawable` (Resource)
- Now inherits functionality from `Drawable` (flow).

#### `Spritesheet` (Resource)
- Inherits functionality from `Drawable`.
- Created internal class `FrameDrawable` (extends `Drawable`) to represent drawable frames.
- Method `getFrame` returns the `FrameDrawable` corresponding to the desired frame number.
- 🔻 Method `drawFrame` has been removed. Was used internally anyway.
- 🔻 Add-on method `drawFrame` attached to `Canvas` has been removed.

#### `SpritesheetAnimation.Animation` (Resource)
- Now inherits functionality from `Drawable`.
- Uses method `getFrame` of `Spritesheet` to draw each frame.
