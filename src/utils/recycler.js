
const recyclingFacilities = { };
let totalPreallocated = 0;

const Recycler = { };
global.Recycler = Recycler;
export default Recycler;

//:/**
//: * 	Provides functions to attach recycling functionality to any class for object pooling.
//: */

//!namespace Recycler

/**
 * 	Attaches recycling methods (`allocate`, `alloc` and `free`) to the specified class. Class should implement method `init` to initialize the instance (and return itself)
 * 	and `__dtor` to destroy it.
 *
 * 	@param {*} maxPoolSize - Maximum number of instance to hold in the recycler.
 * 	@param {*} minPoolSize - Minimum number of instances to pre-allocate. Defaults to 0.375*`maxPoolSize` if not specified.
 * 
 * 	!function attachTo (targetClass: any, maxPoolSize?: number, minPoolSize?: number) : any;
 */

Recycler.attachTo = function (targetClass, maxPoolSize=8192, minPoolSize=null)
{
	if (!targetClass.prototype.className)
		throw new Error ('Unable to attach recycler methods to an unnamed class.');

	if (!('__dtor' in targetClass.prototype))
		throw new Error ('Recycler: Class '+targetClass.prototype.className+' requires `__dtor` method.');

	if (!('init' in targetClass.prototype))
		throw new Error ('Recycler: Class '+targetClass.prototype.className+' requires `init` method.');

	if (minPoolSize === null)
		minPoolSize = int(maxPoolSize * 0.375);

	recyclingFacilities[targetClass.prototype.className] = targetClass;

	targetClass.recyclerPool = new Array(maxPoolSize).fill(null);
	targetClass.recyclerPoolMax = maxPoolSize;

	targetClass.prototype.objectId = 0;
	targetClass.prototype.objectRefs = 0;

	targetClass.recyclerNextObjectId = 0;
	targetClass.recyclerCreated = 0;
	targetClass.recyclerRecycled = 0;
	targetClass.recyclerDropped = 0;
	targetClass.recyclerLength = 0;
	targetClass.recyclerActive = 0;

	let preallocated = false;

	/**
	 * 	Preallocates instances according the the minPoolSize value.
	 */
	targetClass.preallocate = function (maximum=null)
	{
		if (preallocated)
			return;

		let n = maximum === null ? minPoolSize : Math.min(maximum, minPoolSize);

		for (let i = 0; i < n; i++)
		{
			targetClass.recyclerPool[targetClass.recyclerLength++] = new targetClass();
			totalPreallocated++;
		}

		preallocated = true;
	};

	/**
	 * 	Allocates a new instance of the class. To ensure correct instance state a call to `init` must be made later.
	 * 	@returns {object}
	 */
	targetClass.allocate = function()
	{
		let item;

		if (this.recyclerLength === 0)
		{
			item = new targetClass();
			targetClass.recyclerCreated++;
		}
		else
		{
			item = this.recyclerPool[--this.recyclerLength];
			targetClass.recyclerRecycled++;
		}

		targetClass.recyclerActive++;

		item.objectId = ++this.recyclerNextObjectId;
		item.objectRefs = 1;

		this.recyclerNextObjectId &= 0x7FFFFFFF;
		return item;
	};

	/**
	 * 	Allocates an instance and initializes it. Internally runs `allocate` first and then `init` with up to 10 parameters.
	 * 	@param {any} a0..a9 
	 * 	@returns {object}
	 */
	targetClass.alloc = function(a0=null, a1=null, a2=null, a3=null, a4=null, a5=null, a6=null, a7=null, a8=null, a9=null)
	{
		return targetClass.allocate().init(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9);
	};

	/**
	 * 	Releases the self object and adds it back to the pool. Duplicate call to this method will result in an error.
	 * 	@returns {object}
	 */
	targetClass.prototype.free = function()
	{
		if (this.objectId < 0)
			return this;

		if (this.objectId === 0)
		{
			console.error ('ERROR: Already released instance of ' + targetClass.prototype.className);
			return this;
		}

		if (--this.objectRefs > 0)
			return this;

		this.__dtor();
		this.objectId = 0;

		if (targetClass.recyclerLength >= maxPoolSize)
			targetClass.recyclerDropped++;
		else
			targetClass.recyclerPool[targetClass.recyclerLength++] = this;

		targetClass.recyclerActive--;
		return this;
	};

	/**
	 * Sets a flag used to prevent the instance from being destroyed.
	 * @param {boolean} value
	 * @returns {object}
	 */
	targetClass.prototype.lockInstance = function (value)
	{
		this.objectId = Math.abs(this.objectId);
		if (value) this.objectId = -this.objectId;
		return this;
	};

	/**
	 * Increases the internal reference counter by the specified value and returns the instance. If parameter is provided the default is 1.
	 * @param {number} [count]
	 * @returns {object}
	 */
	targetClass.prototype.instanceRef = function (count=1)
	{
		this.objectRefs += count;
		return this;
	};
};

/**
 * 	Shows stats about all recycling facilities (or just the specified one) using `console.debug`.
 * 	@param name - Name of the class to show.
 * 	!function showStats (name?: string) : void;
 */
Recycler.showStats = function (name=null)
{
	let list = recyclingFacilities;

	console.log('Total Preallocated: ' + totalPreallocated);

	if (name === true)
	{
		console.group('Recycling Facilities');

		for (let i in list)
		{
			let c = list[i];
			if (!c.recyclerCreated) continue;

			console.debug (i + ': '+(100*(c.recyclerCreated/c.recyclerPoolMax)).toFixed(1)+'%  =>  overhead=' + c.recyclerCreated + ', active='+c.recyclerActive+', array=' + c.recyclerPool.length + ', recycled=' + c.recyclerRecycled + ', in-recycler=' + c.recyclerLength + ', dropped=' + c.recyclerDropped + ', space=' + (c.recyclerPoolMax - c.recyclerLength));
		}
	
		console.groupEnd();
		return;
	}

	if (name !== null)
	{
		if (typeof(name) === 'string')
		{
			let c = recyclingFacilities[name];
			console.debug (name + ': '+(100*(c.recyclerCreated/c.recyclerPoolMax)).toFixed(1)+'%  =>  overhead=' + c.recyclerCreated + ', active='+c.recyclerActive+', array=' + c.recyclerPool.length + ', recycled=' + c.recyclerRecycled + ', in-recycler=' + c.recyclerLength + ', dropped=' + c.recyclerDropped + ', space=' + (c.recyclerPoolMax - c.recyclerLength));
			return;
		}

		list = name;
	}

	console.group('Recycling Facilities');

	for (let i in list)
	{
		let c = list[i];
		if (!c.recyclerCreated) continue;

		console.debug (i + ': '+(100*(c.recyclerCreated/c.recyclerPoolMax)).toFixed(1)+'%  =>  overhead=' + c.recyclerCreated + ', active='+c.recyclerActive+', array=' + c.recyclerPool.length + ', recycled=' + c.recyclerRecycled + ', in-recycler=' + c.recyclerLength + ', dropped=' + c.recyclerDropped + ', space=' + (c.recyclerPoolMax - c.recyclerLength));
	}

	console.groupEnd();
};


/**
 * 	Create a new class extending the specified target class, this new class is a recycling facility and is placed under property `Pool` of the target class. This
 * 	method can be used instead of the usual `attachTo` when the target class construct/deconstruct methods need to remain untouched.
 *
 * 	@param {*} maxPoolSize - Maximum number of instance to hold in the recycler.
 * 	@param {*} minPoolSize - Minimum number of instances to pre-allocate. Defaults to 0.375*`maxPoolSize` if not specified.
 * 
 *	!function createPool (targetClass: any, maxPoolSize?: number, minPoolSize?: number) : any;
 */
Recycler.createPool = function (targetClass, maxPoolSize=8192, minPoolSize=null)
{
	const name = targetClass.prototype.className;
	if (!name) throw new Error ('Unable to create pool sub-class on an unnamed class.');

	const Pool = targetClass.extend
	({
		className: targetClass.prototype.className,

		__ctor: function () {
		},

		init: function(a0=null, a1=null, a2=null, a3=null, a4=null, a5=null, a6=null, a7=null, a8=null, a9=null)
		{
			this._super[name].__ctor(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9);
			return this;
		}
	});

	Recycler.attachTo(Pool, maxPoolSize, minPoolSize);
	targetClass.Pool = Pool;

	return targetClass;
};


/**
 * 	Runs the preallocation process of all registered pools. Returns the total number of instances preallocated.
 * 	@param {number|null} maxPreallocationsPerPool
 * 	!function preallocate (maxPreallocationsPerPool?: number) : number;
 */
Recycler.preallocate = function (maxPreallocationsPerPool=null)
{
	totalPreallocated = 0;

	for (let i in recyclingFacilities)
		recyclingFacilities[i].preallocate(maxPreallocationsPerPool);

	return totalPreallocated;
}
