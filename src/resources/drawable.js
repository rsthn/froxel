
import Drawable from '../flow/drawable.js';

export default Drawable.extend
({
	className: 'DrawableResource',

	r: null,

	__ctor: function (r)
	{
		if (r.type !== 'image')
			throw new Error ('Resource is not an image.');

		this._super.Drawable.__ctor(r.data, r.width, r.height);

		this.r = r;
		this.r.wrapper = this;
	}
});
