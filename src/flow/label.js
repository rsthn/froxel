
import Element from './element.js';
import Recycler from '../utils/recycler.js';

//![import "./element"]
//![import "../utils/recycler"]

//:/**
//: * Describes an element that can be rendered to the screen.
//: */

//!class Label extends Element

const Label = Element.extend
({
	className: 'Label',

	/**
	 * Original label position.
	 */
	sx: 0, sy: 0,

	/**
	 * Text to render.
	 * !readonly text: string;
	 */
	text: null,

	/**
	 * Spritefont resource.
	 * !readonly font: object;
	 */
	//violet: type fixup
	//readonly font: Spritefont;
	font: null,

	/**
	 * Indicates if the `text` property changed.
	 */
	_dirty: false,

	/**
	 * Current text width.
	 * !readonly textWidth: number;
	 */
	textWidth: null,

	/**
	 * Current text height.
	 * !readonly textHeight: number;
	 */
	textHeight: null,

	/**
	 * Alignment properties of the label.
	 */
	_align: -1, /* -1=LEFT, 0=CENTER, 1=RIGHT */
	_valign: -1, /* -1=TOP, 0=MIDDLE, 1=BOTTOM */

	/**	
	 * Position offset for the text. Calculated based on alignment properties.
	 */
	textOffsetX: null,
	textOffsetY: null,

	/**
	 * Constructs a label element at the specified position with the given text.
	 * !constructor (x: number, y: number, font: object, text: string);
	 */
	__ctor: function(x, y, font, text)
	{
		this._super.Element.__ctor(this.sx = x, this.sy = y, 1, 1);

		this.text = null;
		this.font = font;

		this._align = -1;
		this._valign = -1;

		this.renderWith(this.renderText);
		this.setText(text);
	},

	/**
	 * Sets the horizontal alignment value of the label.
	 * @param value - Use -1 for LEFT, 0 for CENTER, and 1 for RIGHT.
	 * !align (value: number) : Label;
	 */
	align: function (value)
	{
		if (this._align === value)
			return this;

		this._align = value;
		this.textOffsetX = null;
		return this.update();
	},

	/**
	 * Sets the vertical alignment value of the label.
	 * @param value - Use -1 for TOP, 0 for MIDDLE, and 1 for BOTTOM.
	 * !valign (value: number) : Label;
	 */
	valign: function(value)
	{
		if (this._valign === value)
			return this;

		this._valign = value;
		this.textOffsetY = null;
		return this.update();
	},

	/**
	 * Sets the text value of the label.
	 * !setText (value: string) : Label;
	 */
	setText: function (value)
	{
		if (this.text === value)
			return this;

		this.text = value;
		this._dirty = true;
		return this.update();
	},

	/**
	 * Sets the font resource to use.
	 * !setFont (font: object) : Label;
	 */
	//violet: type fixup
	//setFont (font: Spritefont) : Label;
	setFont: function (font)
	{
		if (this.font === font)
			return this;

		this.font = font;
		this._dirty = true;
		return this.update();
	},

	/**
	 * Updates the text related properties (textWidth, textHeight, textOffsetX and textOffsetY). Automatically
	 * called before the label is drawn. Recalculates offsets only if text changed since last call.
	 */
	update: function()
	{
		if (this._dirty === true)
		{
			this.textOffsetX = null;
			this.textOffsetY = null;

			this.textWidth = this.font.measureWidth(this.text);
			this.textHeight = this.font.measureHeight(this.text);

			this._dirty = false;

			this.bounds.resize(this.textWidth, this.textHeight, true);
		}

		if (this.textOffsetX === null)
		{
			if (this._align < 0) this.textOffsetX = 0;
			else if (this._align === 0) this.textOffsetX = -this.textWidth >> 1;
			else this.textOffsetX = -this.textWidth;

			this.bounds.translate(-this.bounds.x1 + this.sx + this.textOffsetX, 0);
		}

		if (this.textOffsetY === null)
		{
			if (this._valign < 0) this.textOffsetY = 0;
			else if (this._valign === 0) this.textOffsetY = -this.textHeight >> 1;
			else this.textOffsetY = -this.textHeight;

			this.bounds.translate(0, -this.bounds.y1 + this.sy + this.textOffsetY);
		}

		return this;
	},

	/**
	 * Moves the label by the specified deltas.
	 * @param upscaled - When `true` the `dx` and `dy` parameters are assumed to be upscaled.
	 * !translate (dx: number, dy: number, upscaled?: boolean) : Group;
	 */
	translate: function (dx, dy, upscaled=false)
	{
		this._super.Element.translate(dx, dy, upscaled);

		this.sx = this.bounds.x1;
		this.sy = this.bounds.y1;

		this.textOffsetX = null;
		this.textOffsetY = null;

		return this.update();
	},

	/**
	 * Renders the element to the graphics surface.
	 */
	renderText: function(g, elem, img)
	{
		elem.font.drawText (g, elem.bounds.x1, elem.bounds.y1, elem.text);
	}
});

//!/class

//!namespace Label
//!namespace Pool

	/**
	 * Allocates a label element at the specified position with the given text.
	 * !function alloc (x: number, y: number, font: object, text: string) : Label;
	 */


Recycler.createPool(Label);
export default Label;
