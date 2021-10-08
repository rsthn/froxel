
import Bounds2 from '../math/bounds2.js';
import GridElement from '../flow/grid-element.js';
import Handler from '../utils/handler.js';
import System from '../system/system.js';

import world from './world.js';

xasd

/*
**	The collider system is responsible of detecting collisions and performing the respective actions.
*/

const collider =
{
	/**
	 * 	Contact flag bits.
	 */
	CONTACT_LEFT: 1,
	CONTACT_RIGHT: 2,
	CONTACT_HORIZONTAL: 1|2,

	CONTACT_TOP: 4,
	CONTACT_BOTTOM: 8,
	CONTACT_VERTICAL: 4|8,

	/**
	 *	Collider element flags.
	 */
	FLAG_EXCLUDE: GridElement.allocFlag(),

	/**
	 * 	Contact rules, define what to do when certain types of elements are in contact.
	 */
	contactRules: { },

	/**
	 * 	Truncation rules, indicate which type of elements are not allowed to penetrate each other.
	 */
	truncationRules: { },

	/**
	 *	Scene where the mask layer is contained.
	 */
	scene: null,

	/**
	 *	Layer containing the element masks.
	 */
	maskLayer: null,

	/**
	 *	First updater.
	 */
	fupdater: null,

	/**
	 *	Last updater.
	 */
	lupdater: null,

	/**
	 *	Flags used to filter elements.
	 */
	flagsAnd: 0,
	flagsValue: 0,

	/**
	 *	Current collider state fields.
	 */
	state:
	{
		/**
		 * 	Contact flags and contact area.
		 */
		contact: Bounds2.Pool.alloc(),
		flags: 0,

		/**
		 * 	Final delta values calculated by `translate`.
		 */
		dx: 0,
		dy: 0,

		bounds: Bounds2.Pool.alloc(),

		x: new Array(32).fill(0),
		y: new Array(32).fill(0),
		v0x: new Array(32).fill(0),
		v0y: new Array(32).fill(0),
		v1x: new Array(32).fill(0),
		v1y: new Array(32).fill(0),
		v2x: new Array(32).fill(0),
		v2y: new Array(32).fill(0),

		count: 0,
		target: 0,

		v0: 0, w0: 0, delta0: 0,
		v1: 0, w1: 0, delta1: 0,

		w2: 0,
		t_dx: 0,
		t_dy: 0,
	},

	/**
	 *	Enables the collider system on the specified scene and layer.
	 *
	 * 	@param sceneIndex - Scene to attach the collider updater methods. Uses world.SCENE_MAIN if none specified.
	 * 	@param layerIndex - Index within the scene of the layer where element masks are stored. Uses world.LAYER_MASK if none specified.
	 */
	enable: function(sceneIndex=null, layerIndex=null)
	{
		this.scene = world.getScene(sceneIndex || world.SCENE_MAIN);
		this.maskLayer = this.scene.getContainer(layerIndex || world.LAYER_MASK);

		this.flagsAnd = GridElement.ALIVE | GridElement.VISIBLE | collider.FLAG_EXCLUDE;
		this.flagsValue = GridElement.ALIVE | GridElement.VISIBLE;

		this.scene.fupdater.add(this.update, this);

		this.fupdater = Handler.Pool.alloc(this);
		this.lupdater = Handler.Pool.alloc(this);
	},

	/**
	 *	Disables the collider system.
	 */
	disable: function()
	{
		this.scene.fupdater.remove(this.update, this);
		this.maskLayer = null;

		this.fupdater.free();
		this.lupdater.free();
	},

	/**
	 * 	Runs an update cycle, the `fupdater` and `lupdater` handlers will be executed.
	 */
	update: function(scene, self)
	{
		self.fupdater.exec();
		self.lupdater.exec();
	},

	/**
	 * 	Utility object containing actions that are executed later on the next update cycle.
	 */
	later:
	{
		/**
		 *	Runs the specified callback.
		 *
		 * 	@param elem
		 * 	@param callback
		 * 	@param arg1
		 * 	@param arg2
		 * 	@param arg3
		 */
		run: function (elem, callback, arg1, arg2, arg3)
		{
			collider.fupdater.add(this._run, elem, callback, arg1, arg2, arg3);
		},

		/**
		 *	Sets the element's visibility flag.
		 *
		 * 	@param elem
		 * 	@param value
		 */
		setVisible: function (elem, value)
		{
			collider.fupdater.add(this._setVisible, elem, value);
		},

		/**
		 *	Sets the element's flags.
		 *
		 * 	@param elem
		 * 	@param value
		 */
		setFlags: function (elem, value)
		{
			collider.fupdater.add(this._setFlags, elem, value);
		},

		/**
		 *	Clears the element's flags.
		 *
		 * 	@param elem
		 * 	@param value
		 */
		clearFlags: function (elem, value)
		{
			collider.fupdater.add(this._clearFlags, elem, value);
		},

		/* ******* */

		_run: function (host, elem, callback, arg1, arg2, arg3)
		{
			callback (host, elem, arg1, arg2, arg3);
			return false;
		},

		_setVisible: function (host, elem, value)
		{
			elem.visible(value);
			return false;
		},

		_setFlags: function (host, elem, value)
		{
			elem.setFlags(value);
			return false;
		},

		_clearFlags: function (host, elem, value)
		{
			elem.clearFlags(value);
			return false;
		}
	},

	/**
	 * 	Adds a contact rule.
	 *
	 * 	@param {Number} primaryType - Type of the primary element.
	 * 	@param {Number} secondaryType - Type of the secondary element.
	 * 	@param {(elemA:Mask, elemB:Mask) => void} callback - Callback to execute when contact is detected.
	 * 	@param {*} context - Optional value passed as last parameter to the callback.
	 * 	@returns {fxl.collider}
	 */
	contact: function (primaryType, secondaryType, callback, context=null)
	{
		if (!(primaryType in this.contactRules))
			this.contactRules[primaryType] = { };

		this.contactRules[primaryType][secondaryType] = { callback: callback, context: context };
		return this;
	},

	/**
	 * 	Adds a truncation rule.
	 *
	 * 	@param {Number} primaryType - Type of the primary element.
	 * 	@param {Number} secondaryType - Type of the secondary element.
	 * 	@param {(elemA:Mask, elemB:Mask) => boolean} callback - Returns boolean indicating if the truncation rule should be applied.
	 * 	@param {*} context - Optional value passed as last parameter to the callback.
	 * 	@returns {fxl.collider}
	 */
	truncate: function (primaryType, secondaryType, callback=null, context=null)
	{
		if (!(primaryType in this.truncationRules))
			this.truncationRules[primaryType] = { };

		this.truncationRules[primaryType][secondaryType] = { callback: callback, context: context };
		return this;
	},

	/**
	 * 	Loads the contact flags in the collider state.
	 *
	 * 	@param {Bounds2} boundsA 
	 * 	@param {Bounds2} boundsB 
	 * 	@returns {number}
	 */
	getContactFlags: function (boundsA, boundsB)
	{
		this.state.contact.set(boundsA).setAsIntersection(boundsB);
		let contact = this.state.contact;

		this.state.flags = 0;
		this.state.numFlags = 0;

		if (contact.x1 == boundsB.x1)
		{
			this.state.flags |= collider.CONTACT_LEFT; // LEFT
			this.state.numFlags++;
		}

		if (contact.x2 == boundsB.x2)
		{
			this.state.flags |= collider.CONTACT_RIGHT; // RIGHT
			this.state.numFlags++;
		}

		if (contact.y1 == boundsB.y1)
		{
			this.state.flags |= collider.CONTACT_TOP; // TOP
			this.state.numFlags++;
		}

		if (contact.y2 == boundsB.y2)
		{
			this.state.flags |= collider.CONTACT_BOTTOM; // BOTTOM
			this.state.numFlags++;
		}

		return this.state.flags;
	},

	calc: function (store0, sign, a, v0a, v1a, v1b)
	{
		let n = this.state.count;
		let delta = null;
		let v = 0;

		if (sign > 0)
		{
			for (let i = 0; i < n; i++)
			{
				if (!v0a[i] || !v1a[i] || a[i] < 0) continue;

				if (delta === null || a[i] > delta)
					delta = a[i];

				v1a[i] = v1b[i] = 0;
				v += v0a[i];
			}
		}
		else
		{
			for (let i = 0; i < n; i++)
			{
				if (!v0a[i] || !v1a[i] || a[i] > 0) continue;

				if (delta === null || a[i] < delta)
					delta = a[i];

				v1a[i] = v1b[i] = 0;
				v += v0a[i];
			}
		}

		if (delta === null)
			delta = 0;

		if (store0) {
			this.state.v0 = v;
			this.state.w0 = Math.abs(delta);
			this.state.delta0 = delta;
		} else {
			this.state.v1 = v;
			this.state.w1 = Math.abs(delta);
			this.state.delta1 = delta;
		}
	},

	attemptSelect: function (swapped)
	{
		if (this.state.v1 + this.state.v0 === this.state.target)
		{
			if (this.state.w2 === null || this.state.w1 + this.state.w0 < this.state.w2)
			{
				this.state.w2 = this.state.w1 + this.state.w0;

				if (!swapped) {
					this.state.t_dx = this.state.delta1;
					this.state.t_dy = this.state.delta0;
				}
				else {
					this.state.t_dx = this.state.delta0;
					this.state.t_dy = this.state.delta1;
				}
			}
		}
	},

	load0: function()
	{
		let n = this.state.count;

		for (let i = 0; i < n; i++)
		{
			this.state.v1x[i] = this.state.v0x[i];
			this.state.v1y[i] = this.state.v0y[i];
		}
	},

	save1: function()
	{
		let n = this.state.count;

		for (let i = 0; i < n; i++)
		{
			this.state.v2x[i] = this.state.v1x[i];
			this.state.v2y[i] = this.state.v1y[i];
		}
	},

	load1: function()
	{
		let n = this.state.count;

		for (let i = 0; i < n; i++)
		{
			this.state.v1x[i] = this.state.v2x[i];
			this.state.v1y[i] = this.state.v2y[i];
		}
	},

	resolveXpos: function (single=false)
	{
		this.calc (single, 1, this.state.x, this.state.v0x, this.state.v1x, this.state.v1y);
		if (single) return true;

		this.save1();
		if (this.resolveYpos(true)) this.attemptSelect(false);

		this.load1();
		if (this.resolveYneg(true)) this.attemptSelect(false);

		this.load0();
	},

	resolveXneg: function (single=false)
	{
		this.calc (single, -1, this.state.x, this.state.v0x, this.state.v1x, this.state.v1y);
		if (single) return true;

		this.save1();
		if (this.resolveYpos(true)) this.attemptSelect(false);

		this.load1();
		if (this.resolveYneg(true)) this.attemptSelect(false);

		this.load0();
	},

	resolveYpos: function (single=false)
	{
		this.calc (single, 1, this.state.y, this.state.v0y, this.state.v1y, this.state.v1x);
		if (single) return true;

		this.save1();
		if (this.resolveXpos(true)) this.attemptSelect(true);

		this.load1();
		if (this.resolveXneg(true)) this.attemptSelect(true);

		this.load0();
	},

	resolveYneg: function (single=false)
	{
		this.calc (single, -1, this.state.y, this.state.v0y, this.state.v1y, this.state.v1x);
		if (single) return true;

		this.save1();
		if (this.resolveXpos(true)) this.attemptSelect(true);

		this.load1();
		if (this.resolveXneg(true)) this.attemptSelect(true);

		this.load0();
	},

	/**
	 * 	Completes the translation on the current group.
	 */
	commit: function ()
	{
		if (!this.state.group.alive())
			return;

		this.state.group.translate (this.state.dx, this.state.dy);
		this.state.group.clearFlags (collider.FLAG_EXCLUDE);
	},

	/**
	 * 	Attempts to move the specified group by the given deltas. Any collisions detected on the mask will trigger the respective actions.
	 *
	 * 	@param mask - Mask element.
	 * 	@param group - Group where the mask is stored.
	 * 	@param dx - X delta value.
	 * 	@param dy - Y delta value.
	 */
	translate: function (mask, group=null, dx=0, dy=0)
	{
		if (typeof(group) === 'number')
		{
			dy = dx;
			dx = group;
			group = null;
		}

		if (!group) group = mask.group;

		if (!group.alive() || !mask.alive())
			return;

		this.state.mask = mask;
		this.state.group = group;

		this.state.dx = downscalef(upscale(dx));
		this.state.dy = downscalef(upscale(dy));

		if (!this.maskLayer || !mask.visible())
			return this.commit();

		let truncationRules = this.truncationRules[mask.type];
		if (!truncationRules) return this.scan(mask, group);

		this.state.offs = group.getOffsets(this.state.dx, this.state.dy);
		this.state.bounds.set(mask.bounds).translate(this.state.offs.x+this.state.dx, this.state.offs.y+this.state.dy);

		group.setFlags (collider.FLAG_EXCLUDE);

		let collisionItems = this.maskLayer.selectInRegion(this.state.bounds, this.flagsAnd, this.flagsValue);
		if (collisionItems.length === 0)
		{
			collisionItems.free();
			return this.commit();
		}

		let n = 0;
		let v = 0;

		while (true)
		{
			let item = collisionItems.shift();
			if (item === null) break;

			let allowsTruncation = truncationRules[item.type];
			if (!allowsTruncation) continue;

			if (allowsTruncation.callback === false || (allowsTruncation.callback !== null && allowsTruncation.callback !== true && !allowsTruncation.callback(mask, item, allowsTruncation.context)))
				continue;

			let width = Math.min(this.state.bounds.x2, item.bounds.x2) - Math.max(this.state.bounds.x1, item.bounds.x1);
			let height = Math.min(this.state.bounds.y2, item.bounds.y2) - Math.max(this.state.bounds.y1, item.bounds.y1);

			this.state.v0x[n] = 0;
			this.state.v0y[n] = 0;

			if (Math.min(this.state.bounds.width(), item.bounds.width()) != width) {
				this.state.x[n] = absmin(this.state.bounds.x2 - item.bounds.x1, this.state.bounds.x1 - item.bounds.x2);
				this.state.v0x[n] = 1;
			}

			if (Math.min(this.state.bounds.height(), item.bounds.height()) != height) {
				this.state.y[n] = absmin(this.state.bounds.y2 - item.bounds.y1, this.state.bounds.y1 - item.bounds.y2);
				this.state.v0y[n] = 1;
			}

			let sv = this.state.v0x[n] + this.state.v0y[n];
			v += sv;

			if (sv > 1) {
				this.state.v0x[n] = sv;
				this.state.v0y[n] = sv;
			}

			this.state.v1x[n] = this.state.v0x[n];
			this.state.v1y[n] = this.state.v0y[n];

			n++;
		}

		collisionItems.free();

		if (v == 0)
		{
			this.commit();
			return this.scan(mask, group);
		}

		this.state.target = v;
		this.state.count = n;
		this.state.w2 = null;

		this.resolveXpos();
		this.resolveXneg();
		this.resolveYpos();
		this.resolveYneg();

		if (this.state.w2 !== null)
		{
			let contactRules = this.contactRules[mask.type];
			if (contactRules)
			{
				this.state.bounds.set(mask.bounds).translate(this.state.offs.x+this.state.dx-this.state.t_dx*0.0, this.state.offs.y+this.state.dy-this.state.t_dy*0.0);

				collisionItems = this.maskLayer.selectInRegion(this.state.bounds, this.flagsAnd, this.flagsValue);

				while (true)
				{
					let item = collisionItems.shift();
					if (item === null) break;
		
					let contact = contactRules[item.type];
					if (!contact) continue;

					contact.callback (mask, item, contact.context);
				}

				collisionItems.free();
			}

			this.state.dx -= this.state.t_dx;
			this.state.dy -= this.state.t_dy;
		}

		this.commit();
	},

	/**
	 *	Scans for collisions against the specified mask.
	 *
	 * 	@param mask - Mask element.
	 * 	@param group - Group where the mask is stored.
	 */
	scan: function (mask, group=null)
	{
		if (!group) group = mask.group;

		if (!group.alive() || !mask.alive())
			return;

		this.state.mask = mask;
		this.state.group = group;

		let contactRules = this.contactRules[mask.type];
		if (!this.maskLayer || !mask.visible() || !contactRules)
			return;

		group.setFlags (collider.FLAG_EXCLUDE);
		let collisionItems = this.maskLayer.selectInRegion(mask.bounds, this.flagsAnd, this.flagsValue);
		group.clearFlags (collider.FLAG_EXCLUDE);

		while (true)
		{
			let item = collisionItems.shift();
			if (item === null) break;

			let contact = contactRules[item.type];
			if (!contact) continue;

			contact.callback (mask, item, contact.context);
		}

		collisionItems.free();
	}
};

export default collider;
