//@ts-check

import { Group, Mask, Handler, Bounds2 } from 'froxel';

/*
**	The collider system is responsible of detecting collisions and performing the respective actions.
*/

declare class collider
{
	/**
	 * 	Contact flag bits.
	 */
	static readonly CONTACT_LEFT: number;
	static readonly CONTACT_RIGHT: number;
	static readonly CONTACT_HORIZONTAL: number;
	static readonly CONTACT_TOP: number;
	static readonly CONTACT_BOTTOM: number;
	static readonly CONTACT_VERTICAL: number;
 
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
	 *	Flags used to filter elements.
	 */
	static flagsAnd: number;
	static flagsValue: number;

	/**
	 *	Current collider state fields.
	 */
	static state:
	{
		/**
		 * 	Contact flags and contact area.
		 */
		contact: Bounds2,
		flags: number,

		/**
		 * 	Final delta values calculated by `translate`.
		 */
		dx: number,
		dy: number
	};

	/**
	 *	Enables the collider system on the specified scene and layer.
	 *
	 * 	@param sceneIndex - Scene to attach the collider updater methods. Uses world.SCENE_MAIN if none specified.
	 * 	@param layerIndex - Index within the scene of the layer where element masks are stored. Uses world.LAYER_MASK if none specified.
	 */
	static enable (sceneIndex?: number, layerIndex?: number) : void;

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
		run (elem: any, callback: Function, arg1?: any, arg2?: any, arg3?: any);

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
	 * 	Adds a contact rule.
	 *
	 * 	@param {Number} primaryType - Type of the primary element.
	 * 	@param {Number} secondaryType - Type of the secondary element.
	 * 	@param {(elemA:Mask, elemB:Mask) => void} callback - Callback to execute when contact is detected.
	 * 	@param {*} context - Optional value passed as last parameter to the callback.
	 */
	static contact (primaryType: number, secondaryType: number, callback: (primary: Mask, secondary: Mask, context?: any) => void, context?: any) : void;

	/**
	 * 	Adds a truncation rule.
	 *
	 * 	@param {Number} primaryType - Type of the primary element.
	 * 	@param {Number} secondaryType - Type of the secondary element.
	 * 	@param {(elemA:Mask, elemB:Mask) => boolean} callback - Returns boolean indicating if the truncation rule should be applied.
	 * 	@param {*} context - Optional value passed as last parameter to the callback.
	 */
	static truncate (primaryType: number, secondaryType: number, callback: (primary: Mask, secondary: Mask, context?: any) => void, context?: any) : void;

	/**
	 * 	Loads the contact flags in the collider state.
	 *
	 * 	@param {Bounds2} boundsA 
	 * 	@param {Bounds2} boundsB 
	 * 	@returns {number}
	 */
	static getContactFlags (boundsA: Bounds2, boundsB: Bounds2) : number;

	/**
	 * 	Attempts to move the specified group by the given deltas. Any collisions detected on the mask will trigger the respective actions.
	 *
	 * 	@param mask - Mask element.
	 * 	@param group - Group where the mask is stored.
	 * 	@param dx - X delta value.
	 * 	@param dy - Y delta value.
	 */
	static translate (mask: Mask, group: Group, dx: number, dy: number) : void;

	/**
	 * 	Attempts to move the specified group by the given deltas. Any collisions detected on the mask will trigger the respective actions.
	 *
	 * 	@param mask - Mask element.
	 * 	@param dx - X delta value.
	 * 	@param dy - Y delta value.
	 */
	static translate (mask: Mask, dx: number, dy: number) : void;

	/**
	 *	Scans for collisions against the specified mask.
	 *
	 * 	@param mask - Mask element.
	 * 	@param group - Group where the mask is stored.
	 */
	static scan (mask: Mask, group: Group) : void;

	/**
	 *	Scans for collisions against the specified mask.
	 *
	 * 	@param mask - Mask element.
	 */
	static scan (mask: Mask) : void;
}

export default collider;
