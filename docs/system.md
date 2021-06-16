# System

An static class responsible of timely frame rendering, updates, and handling pointer and keyboard events.

## Usage


```js
import { System } from 'froxel';
```

<br/>

# Constants

The following constants can be accessed directly using the `System` object (i.e. `System.EVT_KEY_UP`).

<br/>

## Keyboard Action Codes

Keyboard action codes are passed in parameter `action` to `onKeyboardEvent` when a keyboard event occurs.

- `EVT_KEY_DOWN`
- `EVT_KEY_UP`

<br/>

## Pointer Action Codes

Pointer action codes are passed in parameter `action` to `onPointerEvent` when a mouse / touch / pointer event occurs.

- `EVT_POINTER_DOWN`
- `EVT_POINTER_UP`
- `EVT_POINTER_MOVE`
- `EVT_POINTER_DRAG_START`
- `EVT_POINTER_DRAG_MOVE`
- `EVT_POINTER_DRAG_STOP`

<br/>

## Display Orientations

Passed as `orientation` property in the `options` object to System.init(). Specifies the desired device orientation. Note that on every orientation change, the `onCanvasResized` event will be triggered.

|Constant|Description
|----|-----------
|`DEFAULT`|Keep whatever orientation the user has, never rotate the canvas.
|`LANDSCAPE`|Force landscape orientation, will rotate the canvas when portrait is detected to ensure that `screenWidth` > `screenHeight`.
|`PORTRAIT`|Force portrait orientation, will rotate the canvas when landscape is detected to ensure that  `screenWidth` < `screenHeight`.
|`AUTOMATIC`|Detect either orientation and rotate the canvas accordingly.

<br/><br/>

# Properties

<br/>

### `screenWidth`: int, `screenHeight`: int
Screen resolution, obtained automatically when the system is initialized.

<br/>

### `orientation`: int
Current screen orientation, available right before `onCanvasResized` is triggered. See [Display Orientations](#display-orientations) for possible values.

<br/>

### `initialMatrix`: [Matrix](matrix.md)
Initial transformation matrix. When rendering, instead of calling `loadIdentity` on the canvas set this matrix to whatever initial transformation you need, because `System` does some transformations first.

<br/>

### `displayBuffer`: [Canvas](canvas.md)
Display buffer for the renderer, this is the primary output canvas.

<br/>

### `tempDisplayBuffer`: [Canvas](canvas.md)
Small (320x240) temporal display buffer, used for off-render of certain small elements and image pre-loading.

<br/>

### `keyState`: Map<int,bool> union { `time`: int, `shift`: bool, `ctrl`: bool, `alt`: bool, `keyCode`: int }
Map with the status of all keys and additional details of the currently fired keyboard event, such as the time, shift-key status, ctrl-key status, alt-key status and the keyCode of the event.

<br/>

### `pointerState`: Map<int, PointerState>
Current status of all pointers. The PointerState object has the following properties:

|Property|Description
|--------|-----------
|`id`: int|The integer ID of the pointer. Usually 1 if using only a mouse, or can be any other number in multitouch environments.
|`isActive`: bool|Indicates if the pointer is down (true) or up (false).
|`isDragging`: bool|Indicates if a dragging operation is in place.
|`sx`: float|Start X value obtained the instant the pointer was held down.
|`sy`: float|Start Y value obtained the instant the pointer was held down.
|`x`: float|Current pointer X value.
|`y`: float|Current pointer Y value.
|`dx`: float|Delta X value for the current dragging operation.
|`dy`: float|Delta Y value for the current dragging operation.
|`button`: int|Indicates which button was pressed. For touch down or left-click the value is 1, for middle-button 2 and right-click 3.

<br/>

### `timeScale`: float
System's time scale, the frame delta is multiplied by this value before each system cycle, can be used to simulate slow-motion or high-speed when desired.

<br/>

### `fixedFrameInterval`: float
Fixed frame interval in milliseconds, when set to non-zero value the frame delta will always be set to this value, regardless of the system rendering speed.

<br/>

### `frameDelta`: float
Last frame delta time in seconds.

<br/>

### `frameDeltaMillis`: int
Last frame delta time in milliseconds.

<br/>

### `frameTime`: float
Logical system time in seconds, increased by `frameDelta` on each update cycle.

<br/>

### `frameNumber`: int
Current frame number.

<br/><br/>

# Methods

<br/>

### void **`init`** (`options`: Object)
Initializes the system with the specified configuration options.

|Property Name|Description|Default Value
|-------------|-----------|-------------
|`background`|Background color of the canvas.|`#000`
|`fps`|Maximum number of frames per second (FPS) the system should target.|`60`
|`minFps`|Minimum number of FPS the system is allowed to reach, when an FPS lower that this value is detected the system will ensure a fixed time step of 1000/minFps is used.|`15`
|`antialias`|Indicates if antialias should be enabled on the system's displayBuffer.|`true`
|`screenWidth`|When not-null and not-zero specifies the target screen width desired. If a larger or smaller width is detected on the client, the system will scale it appropriately such that you can always assume your width is `screenWidth`.|`null`
|`screenHeight`|Same as above, but for height.|`null`
|`orientation`|Specifies the target screen orientation. See available [orientation constants](#display-orientations) for details.|`System.DEFAULT`
|`fullscreen`|When `true` the system will use the `screen` object of the browser to size the canvas. When `false` it will use the `window` object's inner bounds.|`false`

<br/>

### float **`now`** (`asSeconds`: bool = false)
Returns the current time in milliseconds or seconds if `asSeconds` is set to `true`.

<br/>

### float **`time`** ()
Returns the current logical time in seconds (same as reading `System.frameTime` directly).

<br/>

### void **`start`** ()
Starts the system and enables rendering and updates.

<br/>

### void **`stop`** ()
Stops the system by disabling both rendering and updates.

<br/>

### void **`pause`** ()
Disables updates, but continues to render.

<br/>

### void **`resume`** ()
Resumes updates if previously stopped with `pause()`.

<br/>

### [Linkable](linkable.md) **`updateQueueAdd`** (`handler`: Object)
Adds the specified handler to the update queue. Must have the method **update (deltaTime: int)**. Returns a Linkable object which can be used to quickly remove the handler later using `updateQueueRemove`.

<br/>

### void **`updateQueueRemove`**: (`handler`: Object)
Searches for the specified handler object and removes it from the update queue.

<br/>

### void **`updateQueueRemove`**: (`link`: [Linkable](linkable.md))
Removes the specified handler from the update queue given its Linkable object (which was returned by `updateQueueAdd`).

<br/>

### [Linkable](linkable.md) **`drawQueueAdd`** (`handler`: Object)
Adds the specified handler to the draw queue. Must have method **draw (canvas: [Canvas](canvas.md))**.

<br/>

### void **`drawQueueRemove`**  (`handler`: Object)
Searches for the specified handler object and removes it from the draw queue.

<br/>

### void **`drawQueueRemove`**  (`link`: [Linkable](linkable.md))
Removes the specified handler from the draw queue given its Linkable object (which was returned by `drawQueueAdd`).

<br/>

### Object **`queueAdd`** (`handler`: Object)
Adds the specified handler to the update and draw queues. Must have both **update (deltaTime: int)** and **draw (canvas: [Canvas](canvas.md))** methods. Returns the handler object.

<br/>

### void **`queueRemove`** (`handler`: Object)
Searched for the specified handler in the draw and update queues and removes it.

<br/>

### void **`interpolate`** (`src`: Map<string, float>, `dst`: Map<string, float>, `duration`: Map<string, float>, `easing`: Map<string, function>, `callback`: function (data: Object, isFinished: bool))

Interpolates numeric values between two objects (`src` and `dst`) using the specified `duration` and `easing` function. On each interpolation step the `callback` will be executed with the `data` object having the interpolated properties (keys obtained from union of `src` and `dst`).

<br/>

### hookable void **`onCanvasResized`** (`screenWidth`: int, `screenHeight`: int)
Event triggered when the canvas was resized by the system. Use the `System.orientation` property to retrieve the display orientation.

<br/>

### hookable void **`onKeyboardEvent`** (`action`: int, `keyCode`: int, `keys`: &System.keyState)
Event triggered when a keyboard event is detected by the system, `action` is one of the [Keyboard Action Codes](#keyboard-action-codes) constants, `keyCode` is one of the [KeyCodes](keycodes.md) constants and `keys` a reference to `System.keyState`.

<br/>

### void **`onPointerEvent`** (`action`, `pointer`, `pointers`)
Event triggered when a pointer event is detected by the system, `action` is one of the [Pointer Action Codes](#pointer-action-codes) constants, `pointer` contains the pointer state, and `pointers` a reference to `System.pointerState`.
