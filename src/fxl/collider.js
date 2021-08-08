
import Bounds2 from '../math/bounds2.js';
import GridElement from '../flow/grid-element.js';
import Handler from '../utils/handler.js';

import world from './world.js';

/*
**	The collider system is responsible of detecting collisions and performing the respective actions.
*/

const collider =
{
	/**
	 *	Allowed actions.
	 */
	ACTION_TRUNCATE: 1,
	ACTION_CALLBACK: 2,

	/**
	 *	Collider element flags.
	 */
	FLAG_EXCLUDE: GridElement.allocFlag(),

	/**
	 *	Internal fields.
	 */
	futureBounds: Bounds2.calloc(),
	intersectionRect: Bounds2.calloc(),
	tempRect: Bounds2.calloc(),

	rules: { },

	/*
	**	Scene where the mask layer is contained.
	*/
	scene: null,

	/*
	**	Layer containing the element masks.
	*/
	maskLayer: null,

	/*
	**	First updater.
	*/
	fupdater: null,

	/*
	**	Last updater.
	*/
	lupdater: null,

	/*
	**	Flags used to filter elements.
	*/
	flagsAnd: 0,
	flagsValue: 0,

	/*
	**	Current collider state fields.
	*/
	flags: 0,
	numFlags: 0,

	group: null,
	mask: null,
	collisionItem: null,
	offs: null,
	dx: 0,
	dy: 0,

	/**
	 *	Enables the collider system.
	 *
	 * 	@param layerIndex - Index within the active scene of the layer where element masks are stored. Uses world.LAYER_MASK if none specified.
	 */
	enable: function(layerIndex=null)
	{
		this.scene = world.getScene();
		this.maskLayer = world.getContainer(layerIndex || world.LAYER_MASK);

		this.flagsAnd = GridElement.ALIVE | GridElement.VISIBLE | collider.FLAG_EXCLUDE;
		this.flagsValue = GridElement.ALIVE | GridElement.VISIBLE;

		this.scene.fupdater.add(this.update, this);

		this.fupdater = Handler.alloc().init(this);
		this.lupdater = Handler.alloc().init(this);
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
	 * 	Runs an update cycle, the `fupdater` and `lupdater` will be executed.
	 */
	update: function(scene, self)
	{
		self.fupdater.exec();
		self.lupdater.exec();
	},

	/**
	 * 	Utility object containing actions that are executed on the next update cycle.
	 */
	next:
	{
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
	 * 	Adds a collision rule.
	 *
	 * 	@param primaryType - Type of the primary element.
	 * 	@param secondaryType - Type of the secondary element.
	 * 	@param action - Action to perform.
	 * 	@param callback - Callback to execute (when action is collider.ACTION_CALLBACK).
	 * 	@param context - Optional value passed as last parameter to the callback.
	 */
	add: function (primaryType, secondaryType, action, callback=null, context=null)
	{
		if (typeof(action) === 'function')
		{
			context = callback;
			callback = action;
			action = collider.ACTION_CALLBACK;
		}

		if (!(primaryType in this.rules))
			this.rules[primaryType] = { rules: { } };

		this.rules[primaryType].rules[secondaryType] = { action: action, callback: callback, context: context };
	},

	/**
	 *	Loads the contact flags in the collider state.
	 */
	loadContactFlags: function (intersectionBounds, elemBounds)
	{
		this.flags = 0;
		this.numFlags = 0;

		if (intersectionBounds.x1 == elemBounds.x1)
		{
			this.flags |= 1; // LEFT
			this.numFlags++;
		}

		if (intersectionBounds.x2 == elemBounds.x2)
		{
			this.flags |= 2; // RIGHT
			this.numFlags++;
		}

		if (intersectionBounds.y1 == elemBounds.y1)
		{
			this.flags |= 4; // TOP
			this.numFlags++;
		}

		if (intersectionBounds.y2 == elemBounds.y2)
		{
			this.flags |= 8; // BOTTOM
			this.numFlags++;
		}

		return this.flags;
	},

	/**
	 *	Truncates the primary element against the secondary element.
	 */
	truncate: function ()
	{
		// Multiple contact sides, but only one non-zero component.
		if (this.numFlags != 1 && (this.dx == 0 || this.dy == 0))
		{
			if (this.dx == 0)
				this.flags &= 4|8;
			else
				this.flags &= 1|2;

			this.numFlags = 1;
		}

		// Multiple contact sides, but one collision dimension is greater than the other.
		if (this.numFlags != 1 && this.intersectionRect.width() != this.intersectionRect.height())
		{
			if (this.intersectionRect.width() > this.intersectionRect.height())
				this.flags &= 4|8;
			else
				this.flags &= 1|2;

			this.numFlags = 1;
		}

		// Multiple contact sides, remove flags in the same direction as the movement components.
		if (this.numFlags != 1)
		{
			if ((this.flags & 1) && this.dx <= 0) { this.flags &= ~1; this.numFlags--; }
			if ((this.flags & 2) && this.dx >= 0) { this.flags &= ~2; this.numFlags--; }
			if ((this.flags & 4) && this.dy <= 0) { this.flags &= ~4; this.numFlags--; }
			if ((this.flags & 8) && this.dy >= 0) { this.flags &= ~8; this.numFlags--; }
		}

		// Multiple contact sides. Attempt to figure which movement component does not generate a collision.
		if (this.numFlags != 1)
		{
			this.tempRect.set(this.mask.bounds).translate(this.offs.x+this.dx, 0);
			if (0 == this.maskLayer.countInRegion(this.tempRect, this.flagsAnd, this.flagsValue))
			{
				this.dy = 0;
			}
			else
			{
				this.tempRect.set(this.mask.bounds).translate(0, this.offs.y+this.dy);
				if (0 == this.maskLayer.countInRegion(this.tempRect, this.flagsAnd, this.flagsValue))
				{
					this.dx = 0;
				}
				else
				{
					console.log('ISSUE WITH MOVEMENT');
					return;
				}
			}

			this.group.translate(this.dx, this.dy);
		}
		// Single contact side.
		else
		{
			if (this.flags & 1) // LEFT
				this.group.translate(this.collisionItem.bounds.x1 - this.mask.bounds.x2, this.dy);

			if (this.flags & 2) // RIGHT
				this.group.translate(this.collisionItem.bounds.x2 - this.mask.bounds.x1, this.dy);

			if (this.flags & 4) // TOP
				this.group.translate(this.dx, this.collisionItem.bounds.y1 - this.mask.bounds.y2);

			if (this.flags & 8) // BOTTOM
				this.group.translate(this.dx, this.collisionItem.bounds.y2 - this.mask.bounds.y1);
		}
	},

	/**
	 * 	Commits the current default action on the primary element.
	 */
	commit: function()
	{
		this.mask.clearFlags(collider.FLAG_EXCLUDE);

		if (this.dx != 0 || this.dy != 0)
			this.group.translate(this.dx, this.dy);
	},

	/**
	 *	Attempts to move the specified group by the given deltas. Any collisions detected against the mask will trigger the respective actions.
	 */
	translate: function (group, mask, dx, dy)
	{
		this.group = group;
		this.mask = mask;

		this.dx = dx = downscalef(upscale(dx));
		this.dy = dy = downscalef(upscale(dy));

		if (!this.maskLayer) return this.commit();

		let primaryType = this.rules[mask.type];
		if (!primaryType) return this.commit();

		this.offs = group.getOffsets(dx, dy);

		this.futureBounds.set(mask.bounds).translate(this.offs.x+dx, this.offs.y+dy);
		mask.setFlags(collider.FLAG_EXCLUDE);

		this.collisionItem = this.maskLayer.selectFirst(this.futureBounds, this.flagsAnd, this.flagsValue);
		if (this.collisionItem === null) return this.commit();

		let secondaryType = primaryType.rules[this.collisionItem.type];
		if (!secondaryType) return this.commit();

		this.intersectionRect.set(this.collisionItem.bounds).setAsIntersection(this.futureBounds);

		this.loadContactFlags(this.intersectionRect, this.collisionItem.bounds);
		// Possibly INSIDE the collisionItem.
		if (!this.flags) return this.commit();

		switch (secondaryType.action)
		{
			case collider.ACTION_TRUNCATE:
				this.truncate();
				break;

			case collider.ACTION_CALLBACK:
				secondaryType.callback (mask, this.collisionItem, secondaryType.context);
				break;
		}

		mask.clearFlags(collider.FLAG_EXCLUDE);
	},

	/**
	 *	Checks collisions against the specified mask.
	 */
	check: function (group, mask)
	{
		this.group = group;
		this.mask = mask;

		this.dx = 0;
		this.dy = 0;

		if (!this.maskLayer) return;

		let primaryType = this.rules[mask.type];
		if (!primaryType) return;

		this.offs = group.getOffsets(0, 0);

		this.futureBounds.set(mask.bounds).translate(this.offs.x, this.offs.y);
		mask.setFlags(collider.FLAG_EXCLUDE);

		this.collisionItem = this.maskLayer.selectFirst(this.futureBounds, this.flagsAnd, this.flagsValue);
		if (this.collisionItem === null) return;

		let secondaryType = primaryType.rules[this.collisionItem.type];
		if (!secondaryType) return;

		this.intersectionRect.set(this.collisionItem.bounds).setAsIntersection(this.futureBounds);

		this.loadContactFlags(this.intersectionRect, this.collisionItem.bounds);
		// Possibly INSIDE the collisionItem.
		if (!this.flags) return;

		switch (secondaryType.action)
		{
			case collider.ACTION_TRUNCATE:
				this.truncate();
				break;

			case collider.ACTION_CALLBACK:
				secondaryType.callback (mask, this.collisionItem, secondaryType.context);
				break;
		}

		mask.clearFlags(collider.FLAG_EXCLUDE);
	}
};

export default collider;
