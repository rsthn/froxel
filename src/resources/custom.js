
import Canvas from '../system/canvas.js';
import Drawable from '../flow/drawable.js';

//![import "../system/canvas"]

export default Drawable.extend
({
	className: 'DrawableCustom',

	__ctor: function (r)
	{
		if (r.type != 'object')
			throw new Error ('Resource is not an object.');

		this._super.Drawable.__ctor(null, r.width, r.height);

		this.r = r;
		this.r.wrapper = this;
	},

	init: function (callback)
	{
		Canvas.renderImage(this.r.width, this.r.height,
		(g) => {
			if (this.r.draw !== null && typeof(this.r.draw) === 'function') {
				this.r.draw(g, this.r);
			}
			else {
				g.fillStyle(this.r.color);
				g.fillRect(0, 0, this.r.width, this.r.height);
			}
		},
		(img) => {
			this.resource = img;
			this.swidth = this.resource.width;
			this.sheight = this.resource.height;
			callback();
		});
	}
});
