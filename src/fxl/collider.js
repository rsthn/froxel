
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
	truncated: false,

	flags: 0,
	numFlags: 0,

	group: null,
	mask: null,
	collisionItem: null,
	offs: null,
	m_dx: 0, m_dy: 0,
	dx: 0, dy: 0,

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
	 * 	Utility object containing actions that are executed later on the next update cycle.
	 */
	later:
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
		}
		// Single contact side.
		else
		{
			if (this.flags & 1) // LEFT
				this.dx = this.collisionItem.bounds.x1 - this.mask.bounds.x2
			else if (this.flags & 2) // RIGHT
				this.dx = this.collisionItem.bounds.x2 - this.mask.bounds.x1

			if (this.flags & 4) // TOP
				this.dy = this.collisionItem.bounds.y1 - this.mask.bounds.y2;
			else if (this.flags & 8) // BOTTOM
				this.dy = this.collisionItem.bounds.y2 - this.mask.bounds.y1;
		}

		this.truncated = true;
	},

	/**
	 * 	Commits the current default action on the primary element.
	 */
	commit: function (finalCommit=false)
	{
		if ((this.dx != 0 || this.dy != 0) || (this.m_dx === null))
		{
			if (this.m_dx === null || Math.abs(this.dx) < Math.abs(this.m_dx))
				this.m_dx = this.dx;

			if (this.m_dy === null || Math.abs(this.dy) < Math.abs(this.m_dy))
				this.m_dy = this.dy;

			this.dx = 0;
			this.dy = 0;
		}

		if (finalCommit === true)
		{
			if (this.m_dx != 0 || this.m_dy != 0)
				this.group.translate(this.m_dx, this.m_dy);

			this.group.clearFlags(collider.FLAG_EXCLUDE);
		}
	},

	/**
	 *	Attempts to move the specified group by the given deltas. Any collisions detected against the mask will trigger the respective actions.
	 */
	translate: function (group, mask, dx, dy)
	{
		this.group = group;
		this.mask = mask;

		this.truncated = false;

		this.m_dx = null;
		this.m_dy = null;

		this.dx = dx = downscalef(upscale(dx));
		this.dy = dy = downscalef(upscale(dy));

		if (!this.maskLayer) return this.commit(true);

		let primaryType = this.rules[mask.type];
		if (!primaryType) return this.commit(true);

		this.offs = group.getOffsets(this.dx, this.dy);

		this.futureBounds.set(mask.bounds).translate(this.offs.x+this.dx, this.offs.y+this.dy);
		group.setFlags(collider.FLAG_EXCLUDE);

		let collisionItems = this.maskLayer.selectInRegion(this.futureBounds, this.flagsAnd, this.flagsValue);
		if (collisionItems.length === 0)
		{
			collisionItems.free();
			return this.commit(true);
		}

		while (true)
		{
			this.collisionItem = collisionItems.shift();
			if (this.collisionItem === null) break;

			let secondaryType = primaryType.rules[this.collisionItem.type];
			if (!secondaryType) continue;

			this.intersectionRect.set(this.collisionItem.bounds).setAsIntersection(this.futureBounds);

			this.loadContactFlags(this.intersectionRect, this.collisionItem.bounds);
			if (!this.flags) {
				// Possibly INSIDE the collisionItem.
				console.log('INSIDE ' + this.collisionItem.type.toString(16) + ' FROM ' + mask.type.toString(16));
				continue;
			}

			this.dx = dx;
			this.dy = dy;

			switch (secondaryType.action)
			{
				case collider.ACTION_TRUNCATE:
					this.truncate();
					break;

				case collider.ACTION_CALLBACK:
					secondaryType.callback (mask, this.collisionItem, secondaryType.context);
					break;
			}

			this.commit();
		}

		collisionItems.free();
		this.commit(true);
	},

	/**
	 *	Checks collisions against the specified mask.
	 */
	check: function (group, mask)
	{
		this.translate (group, mask, 0, 0);
	}
};

export default collider;
