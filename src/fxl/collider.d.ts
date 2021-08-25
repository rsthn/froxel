//@ts-check

import { Handler } from 'froxel';

/*
**	The collider system is responsible of detecting collisions and performing the respective actions.
*/

declare class collider
{
	/*
	**	Allowed actions.
	*/
	static readonly ACTION_TRUNCATE: number;
	static readonly ACTION_CALLBACK: number;

	/**
	 * 	Contact flag bits.
	 */
	static readonly CONTACT_LEFT: number;
	static readonly CONTACT_RIGHT: number;
	static readonly CONTACT_TOP: number;
	static readonly CONTACT_BOTTOM: number;
 
	/*
	**	Collider element flags.
	*/
	static readonly FLAG_EXCLUDE: number;

	/*
	**	First updater.
	*/
	static fupdater: Handler;

	/*
	**	Last updater.
	*/
	static lupdater: Handler

	/**
	 *	Enables the collider system.
	 *
	 * 	@param layerIndex - Index within the active scene of the layer where element masks are stored. Uses world.LAYER_MASK if none specified.
	 */
	static enable (layerIndex?: number) : void;

	/**
	 *	Disables the collider system.
	 */
	 static disable() : void;

	/**
	 * 	Utility object containing actions that are executed later on the next update cycle.
	 */
	static later:
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
		run (elem: any, callback: function, arg1?: any, arg2?: any, arg3?: any);

		/**
		 *	Sets the element's visibility flag.
		 *
		 * 	@param elem
		 * 	@param value
		 */
		setVisible (elem: any, value: boolean) : void;

		/**
		 *	Sets the element's flags.
		 *
		 * 	@param elem
		 * 	@param value
		 */
		setFlags (elem: any, value: number) : void;

		/**
		 *	Clears the element's flags.
		 *
		 * 	@param elem
		 * 	@param value
		 */
		clearFlags (elem: any, value: number) : void;
	};

	/**
	 * 	Adds a collision rule.
	 *
	 * 	@param primaryType - Type of the primary element.
	 * 	@param secondaryType - Type of the secondary element.
	 * 	@param action - Action to perform.
	 * 	@param callback - Callback to execute (when action is collider.ACTION_CALLBACK).
	 * 	@param context - Optional value passed as last parameter to the callback.
	 */
	static add (primaryType: number, secondaryType: number, action: number, callback?: (primary: Mask, secondary: Mask, context:? any) => void, context?: any) : void;

	/**
	 * 	Adds a collision rule.
	 *
	 * 	@param primaryType - Type of the primary element.
	 * 	@param secondaryType - Type of the secondary element.
	 * 	@param callback - Callback to execute.
	 * 	@param context - Optional value passed as last parameter to the callback.
	 */
	static add (primaryType: number, secondaryType: number, callback?: (primary: Mask, secondary: Mask, context:? any) => void, context?: any) : void;

	/**
	 *	Truncates the primary element against the secondary element.
	 */
	static truncate () : void;

	/**
	 * 	Commits the current default action on the primary element.
	 */
	static commit () : void;

	/**
	 * 	Attempts to move the specified group by the given deltas. Any collisions detected against the mask will trigger the respective actions.
	 *
	 * 	@param group - Group where the mask is stored.
	 * 	@param mask - Mask element.
	 * 	@param dx - X delta value.
	 * 	@param dy - Y delta value.
	 */
	static translate (group: Group, mask: Mask, dx: number, dy: number) : void;

	/**
	 *	Checks collisions against the specified mask.
	 *
	 * 	@param group - Group where the mask is stored.
	 * 	@param mask - Mask element.
	 */
	static check (group, mask) : void;
}

export default collider;
