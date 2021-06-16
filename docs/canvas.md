# Canvas

Wraps an HTML5 Canvas element and provides much more functionality.

<br/>

# Usage

```js
import { Canvas } from 'froxel';
```

<br/>

# Methods

<br/>

### Canvas **`Canvas`** (HTML5CanvasElement `elem` = null, [Object `options` = null])
Constructs a canvas object. If the Canvas DOM element is not provided a new element will be created and attached to the page.

<br/>

### void **`dispose`** ()
Disposes the resources used by the canvas. The DOMElement will also be removed from the document.

<br/>

### void **`setBackground`** (string `color`)
Sets the default background color of the canvas. Does not cause a canvas clear.

<br/>

### Canvas **`resize`** (float `width`, float `height`)
Sets the canvas size.

<br/>

### Canvas **`globalScale`** (float `value`)
Sets the global canvas scale.

<br/>

### Canvas **`flipped`** (bool `value`)
### Canvas **`flipped`** ()
Gets or sets the flipped status of the canvas. Indicates if the canvas was flipped (i.e. xy is now yx).

<br/>

### Canvas **`save`** ()
Saves the state of the canvas context.

<br/>

### Canvas **`restore`** ()
Restores the state of the canvas context.

<br/>

### string **`toDataUrl`** (string `name`)
Returns the image on the canvas as a string in DATA-URI format.

<br/>

### string **`toPng64`** ()
Returns the image as a Base64 encoded PNG string.

<br/>

### Canvas **`fillStyle`** (string `value`)
Sets or returns the current fill style (default is black).

<br/>

### Canvas **`strokeStyle`** (string `value`)
Sets or returns the current stroke style (default is black).

<br/>

### Canvas **`lineCap`** (string `value`)
### string **`lineCap`** ()
Sets or returns the current line cap style (butt, round, square. butt is default).

<br/>

### Canvas **`lineJoin`** (string `value`)
### string **`lineJoin`** ()
Sets or returns the current line join style (bevel, round, miter. miter is default).

<br/>

### Canvas **`lineWidth`** (float `value`)
### float **`lineWidth`** ()
Sets or returns the current line width value (default 1).

<br/>

### Canvas **`miterLimit`** (float `value`)
### float **`miterLimit`** ()
Sets or returns the current miter limit value (default 10).

<br/>

### Canvas **`shadowColor`** (string `value`)
### string **`shadowColor`** ()
Sets or returns the current shadow color value (default black).

<br/>

### Canvas **`shadowOffsetX`** (float `value`)
### float **`shadowOffsetX`** ()
Sets or returns the current shadow X offset (default 0).

<br/>

### Canvas **`shadowOffsetY`** (float `value`)
### float **`shadowOffsetY`** ()
Sets or returns the current shadow Y offset (default 0).

<br/>

### Canvas **`shadowBlur`** (string `value`)
### string **`shadowBlur`** ()
Sets or returns the current shadow blue value (default 0).

<br/>

### Canvas **`font`** (string `value`)
### string **`font`** ()
Sets or returns the current font settings.

<br/>

### Canvas **`textAlign`** (string `value`)
### string **`textAlign`** ()
Sets or returns the current text align settings (start, end, left, right, center).

<br/>

### Canvas **`textBaseline`** (string `value`)
### string **`textBaseline`** ()
Sets or returns the current text base line settings (alphabetic, bottom, hanging, ideographic, middle, top. Alphabetic is default).

<br/>

### Canvas **`globalAlpha`** (float `value`)
### float **`globalAlpha`** ()
Sets or returns the current global alpha value.

<br/>

### Canvas **`alpha`** (float `value`)
### float **`alpha`** ()
Sets or returns the relative alpha value for subsequent drawing operations.

<br/>

### Canvas **`globalCompositeOperation`** (string `value`)
### string **`globalCompositeOperation`** ()
Sets or returns the current global composite operation value (source-atop, source-in, source-out, source-over, destination-atop, destination-in, destination-out, destination-over, lighter, copy, xor).

<br/>

### Canvas **`transform`** (float `a`, float `b`, float `c`, float `d`, float `e`, float `f`)
Transforms shape of subsequent drawings based on a matrix. The provided values represent a matrix and it will be multiplied with the current transformation matrix. If no parameter is provided the active matrix will be used.

<br/>

### Canvas **`setTransform`** (float `a`, float `b`, float `c`, float `d`, float `e`, float `f`)
Similar to transform() but this matrix is not multiplied by the active transformation matrix, instead it just comes the current matrix.

<br/>

### Canvas **`fillRect`** (float `x`, float `y`, float `w`, float `h`)
Draws a filled rectangle on the canvas.

<br/>

### Canvas **`strokeRect`** (float `x`, float `y`, float `w`, float `h`)
Draws an stroked rectangle on the canvas.

<br/>

### Canvas **`clearRect`** (float `x`, float `y`, float `w`, float `h`)
Clears a rectangle on the canvas. All pixels will be erased.

<br/>

### Canvas **`beginPath`** ()
Starts a new path. Any previous path points will be cleared.

<br/>

### Canvas **`moveTo`** (float `x`, float `y`)
Creates a new point in the current path.

<br/>

### Canvas **`closePath`** ()
Creates a new point from the first path point to the last, and finishes the path.

<br/>

### Canvas **`lineTo`** (float `x`, float `y`)
Draws a line from the last point on the path to the given point.

<br/>

### Canvas **`rect`** (float `x`, float `y`, float `w`, float `h`)
Creates a hollow rectangle path on the canvas for subsequent stroke or fill.

<br/>

### Canvas **`fill`** (string `value`)
### Canvas **`fill`** ()
Fills the active path with the current fill style or with the one given in the value parameter.

<br/>

### Canvas **`stroke`** (string `value`)
### Canvas **`stroke`** ()
Strokes the active path with the current stroke style or with the one given in the value parameter.

<br/>

### Canvas **`clip`** ()
Creates a viewport with the active path. Only the viewport will be visible.

<br/>

### Canvas **`quadraticCurveTo`** (float `cpx`, float `cpy`, float `x`, float `y`)
Adds points of a quadratic curve to the active path. A control points and one reference point must be provided.

<br/>

### Canvas **`bezierCurveTo`** (float `cx1`, float `cy1`, float `cx2`, float `cy2`, float `x`, float `y`)
Adds points of a bezier curve to the active path. Two control points and one reference point must be provided.

<br/>

### Canvas **`arc`** (float `x`, float `y`, float `r`, float `sA`, float `eA`, float `cw`)
Adds points of an arc the the active path. Used to draw a circle of part of it.

<br/>

### Canvas **`arcTo`** (float `x1`, float `y1`, float `x2`, float `y2`, float `r`)
Adds points of an arc to the active path. Used to create an arc between two points.

<br/>

### Canvas **`fillText`** (string `text`, float `x`, float `y`, float `maxWidth`=1000)
Draws filled text on the canvas with the active font, and fillStyle properties.

<br/>

### Canvas **`strokeText`** (string `text`, float `x`, float `y`, float `maxWidth`=1000)
Draws stroked text on the canvas with the active font, and fillStyle properties.

<br/>

### float **`measureText`** (string `text`)
Measures the width of the given text using active font properties.

<br/>

### ImageData **`createImageData`** (float `w`, float `h`)
Returns a new image data object with the specified size.

<br/>

### ImageData **`getImageData`** (float `x`, float `y`, float `w`, float `h`)
Returns an image data object with the pixels of a rectangular area of the canvas.

<br/>

### Canvas **`putImageData`** (ImageData `data`, float `x`, float `y`)
Puts image data on the canvas at the specified location.

<br/>

### Canvas **`drawImage`** (Image `img`, float `x`, float `y`)
### Canvas **`drawImage`** (Image `img`, float `x`, float `y`, float `w`, float `h`)
### Canvas **`drawImage`** (Image `img`, float `sx`, float `sy`, float `sw`, float `sh`, float `dx`, float `dy`, float `dw`, float `dh`)
Draws an image on the canvas.

<br/>

### Canvas **`clear`** (string `backgroundColor`)
### Canvas **`clear`** ()
Clears the entire canvas. If the `backgroundColor` parameter is set the canvas will be cleared manually by using the fillRect method.

<br/>

### Canvas **`reset`** (bool `clearPath`)
### Canvas **`reset`** ()
Resets the context drawing properties to their initial values.

<br/>

### Canvas **`pushMatrix`** ()
Pushes the current transformation matrix into the matrix stack.

<br/>

### Canvas **`popMatrix`** ()
Pops a matrix from the matrix stack into the transformation matrix.

<br/>

### Canvas **`pushAlpha`** ()
Pushes the current global alpha into the stack.

<br/>

### Canvas **`popAlpha`** ()
Pops an alpha from the stack into the global alpha.

<br/>

### Canvas **`loadIdentity`** ()
Sets the transformation matrix to identity.

<br/>

### Canvas **`loadMatrix`** (Matrix `matr`)
Sets the transformation matrix to the specified one.

<br/>

### Matrix **`getMatrix`** ()
Returns a copy of the current transformation matrix object.

<br/>

### Canvas **`appendMatrix`** (Matrix `matr`)
Appends a matrix to the current transformation matrix.

<br/>

### Canvas **`scale`** (float `sx`, float `sy`, bool `useNative`=false)
Sets scaling factors for subsequent drawing operations. If the `useNative` is not set then scale with the current transformation matrix will be performed.

<br/>

### Canvas **`rotate`** (float `angle`, bool `useNative`=false)
Sets rotation factor for subsequent drawing operations. The angle is in radians. If `useNative` is not set then rotation with the transformation matrix will be used.

<br/>

### Canvas **`translate`** (float `x`, float `y`, bool `useNative`=false)
Moves starting point to an specified location. If the `useNative` parameter is not set then translation with the transformation matrix will be done.

<br/>

### Canvas **`ellipse`** (float `x`, float `y`, float `w`, float `h`)
Creates a hollow ellipse path on the canvas for subsequent stroke or fill.

<br/>

### Canvas **`circle`** (float `x`, float `y`, float `r`, string `strokeColor`)
### Canvas **`circle`** (float `x`, float `y`, float `r`)
Creates a hollow circle path on the canvas for subsequent stroke or fill. If the stroke param is set the circle will be drawn with the specified stroke color.

<br/>

### Canvas **`line`** (float `x1`, float `y1`, float `x2`, float `y2`, string `strokeColor`)
### Canvas **`line`** (float `x1`, float `y1`, float `x2`, float `y2`)
Draws a line for subsequent stroke or fill. If the stroke param is set the line will be drawn with the specified stroke color.

<br/>

### Canvas **`enablePointerEvents`** ()
Attaches internal listeners for mouse/pointer events on the canvas object, this is called automatically when attaching handlers to the canvas. The actual handlers are added or removed using the `addPointerHandler` and `removePointerHandler` respectively.

<br/>

### Canvas **`setPointerScale`** (float `sx`, float `sy`)
Sets the pointer scaling factors.

<br/>

### Canvas **`setPointerOffset`** (float `x`, float `y`)
Sets the pointer offset that is applied after scaling.

<br/>

### string **`addPointerHandler`** (function `callback`, object `context`)
### string **`addPointerHandler`** (function `callback`)
Adds a pointer event handler, returns the handler reference id for later removal.

<br/>

### void **`removePointerHandler`** (string `id`)
Removes a previously attached pointer event handler.

<br/>

### Canvas **`drawImageEx`** (Resource `image`, float `x`, float `y`, [float `width`, float `height`])
Draws an image resource on the canvas (as obtained by `Resources.load`).
