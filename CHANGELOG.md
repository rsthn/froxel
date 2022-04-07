# v2.2.1 - April 6th 2022

### What's New
- `Drawable` class is now part of the family. All resources using the deprecated `IDrawable` interface are now extending `Drawable` instead and taking advantage of the pre-made methods.
- Several static methods of `Element` removed since those are now replaced by functionality from `Drawable`.
- Ditched `yarn` and using now `pnpm` as package manager.
- Removed `prepare` command from `froxel` CLI.

### Class Changes

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
