//@ts-check

/**
 * 	Resource manager allows to specify resource descriptors to load them.
 */

declare class res
{
	/**
	 * 	Registered resources. Initially these are resource descriptors, but after a call to `res.load` these will be fully loaded resources.
	 */
	static r: { [key: string]: any };

	/**
	 *	Loads all registered resources that have not been loaded yet. Returns a promise.
	 *
	 *	@param progressCallback
	 */
	static load (progressCallback?: (value: number) => void) : Promise<any>;

	/**
	 * 	Returns a resource given its identifier.
	 *
	 * 	@param id - Resource identifier.
	 */
	static get (id: string) : any;

	/**
	 * 	Registers a solid-color placeholder resource.
	 *
	 * 	@param id - Resource identifier.
	 * 	@param color
	 * 	@param width
	 * 	@param height
	 */
	static placeholder (id: string, color: string, width: number, height: number) : any;

	/**
	 * 	Registers an image resource.
	 *
	 * 	@param id - Resource identifier.
	 * 	@param path - Path to the source file.
	 */
	static image (id: string, path: string, opts?: object) : any;

	/**
	 * 	Registers an spritesheet resource.
	 *
	 * 	@param id - Resource identifier.
	 * 	@param path - Path to the source file.
	 * 	@param frameWidth
	 * 	@param frameHeight
	 * 	@param numFrames
	 * 	@param optsA
	 * 	@param optsB
	 */
	static spritesheet (id: string, path: string, frameWidth: number, frameHeight: number, numFrames?: boolean, optsA?: object, optsB?: object) : any;

	/**
	 * 	Registers a spritesheet animation resource.
	 *
	 * 	@param id - Resource identifier.
	 * 	@param path - Path to the source file.
	 * 	@param frameWidth
	 * 	@param frameHeight
	 * 	@param numFrames
	 * 	@param optsA
	 * 	@param optsB
	 */
	static animation (id: string, path: string, frameWidth: number, frameHeight: number, numFrames?: number, optsA?: object, optsB?: object) : any;

	/**
	 * 	Registers a spritefont animation resource.
	 *
	 * 	@param id - Resource identifier.
	 * 	@param path - Path to the source file.
	 * 	@param charWidth
	 * 	@param charHeight
	 * 	@param charset
	 * 	@param optsA
	 * 	@param optsB
	 */
	static spritefont (id: string, path: string, charWidth: number, charHeight: number, charset: string, optsA?: object, optsB?: object) : any;
}

export default res;
