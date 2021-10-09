/*
**	utils/recycler.js
**
**	Copyright (c) 2016-2021, RedStar Technologies, All rights reserved.
**	https://rsthn.com/
**
**	THIS LIBRARY IS PROVIDED BY REDSTAR TECHNOLOGIES "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES,
**	INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A 
**	PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL REDSTAR TECHNOLOGIES BE LIABLE FOR ANY
**	DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT 
**	NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; 
**	OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, 
**	STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE
**	USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

const recyclingFacilities = { };

const Recycler = { };
export default Recycler;

/*
**	Attaches recycling methods (allocate, alloc and free) to the specified class. Class should implement method `init` to initialize the
**	instance (and return itself) and __dtor to destroy it.
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

	targetClass.recyclerPool = [ ];
	targetClass.recyclerPoolMax = maxPoolSize;

	targetClass.prototype.objectId = 0;

	targetClass.recyclerNextObjectId = 0;
	targetClass.recyclerCreated = 0;
	targetClass.recyclerRecycled = 0;
	targetClass.recyclerMissed = 0;
	targetClass.recyclerLength = 0;
	targetClass.recyclerActive = 0;

	for (let i = 0; i < minPoolSize; i++)
	{
		targetClass.recyclerPool.push(new targetClass ());
		targetClass.recyclerLength++;
	}

	/*const __ctor = targetClass.prototype.__ctor;
	targetClass.prototype.__ctor = function() {
		__ctor.call(this);
	};*/

	/**
	 * 	Allocates a new instance of the class. To ensure correct instance state a call to `init` must be made later.
	 * 	@returns {object}
	 */
	targetClass.allocate = function()
	{
		let item;

		if (!this.recyclerLength)
		{
			item = new targetClass ();
			targetClass.recyclerCreated++;
		}
		else
		{
			item = this.recyclerPool[--this.recyclerLength];
			targetClass.recyclerRecycled++;
		}

		targetClass.recyclerActive++;

		item.objectId = ++this.recyclerNextObjectId;
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

		if (this.objectId == 0)
		{
			console.error ('ERROR: Already released instance of ' + targetClass.prototype.className);
			return this;
		}

		this.__dtor();

		this.objectId = 0;

		if (targetClass.recyclerLength >= maxPoolSize)
			targetClass.recyclerMissed++;
		else
			targetClass.recyclerPool[targetClass.recyclerLength++] = this;

		targetClass.recyclerActive--;
		return this;
	};

	/**
	 * 	Sets a flag used to prevent the instance from being destroyed.
	 * 	@returns {object}
	 */
	targetClass.prototype.lockInstance = function(value)
	{
		this.objectId = Math.abs(this.objectId);
		if (value) this.objectId = -this.objectId;
		return this;
	};
};


/*
**	Shows stats about all recycling facilities using console.debug.
*/
Recycler.showStats = function (name=null)
{
	let list = recyclingFacilities;

	if (name === true)
	{
		console.group('Recycling Facilities');

		for (let i in list)
		{
			let c = list[i];
			if (!c.recyclerCreated) continue;

			console.debug (i + ': '+(100*(c.recyclerCreated/c.recyclerPoolMax)).toFixed(1)+'%  =>  overhead=' + c.recyclerCreated + ', active='+c.recyclerActive+', capacity=' + c.recyclerPool.length + ', recycled=' + c.recyclerRecycled + ', in-recycler=' + c.recyclerLength + ', missed=' + c.recyclerMissed + ', space=' + (c.recyclerPoolMax - c.recyclerLength));
		}
	
		console.groupEnd();
		return;
	}

	if (name !== null)
	{
		if (typeof(name) === 'string')
		{
			let c = recyclingFacilities[name];
			console.debug (name + ': '+(100*(c.recyclerCreated/c.recyclerPoolMax)).toFixed(1)+'%  =>  overhead=' + c.recyclerCreated + ', active='+c.recyclerActive+', capacity=' + c.recyclerPool.length + ', recycled=' + c.recyclerRecycled + ', in-recycler=' + c.recyclerLength + ', missed=' + c.recyclerMissed + ', space=' + (c.recyclerPoolMax - c.recyclerLength));
			return;
		}

		list = name;
	}

	console.group('Recycling Facilities');

	for (let i in list)
	{
		let c = list[i];
		console.debug (i + ': '+(100*(c.recyclerCreated/c.recyclerPoolMax)).toFixed(1)+'%  =>  overhead=' + c.recyclerCreated + ', active='+c.recyclerActive+', capacity=' + c.recyclerPool.length + ', recycled=' + c.recyclerRecycled + ', in-recycler=' + c.recyclerLength + ', missed=' + c.recyclerMissed + ', space=' + (c.recyclerPoolMax - c.recyclerLength));
	}

	console.groupEnd();
};


/*
**	Create a new class extending the specified target class, this new class is a recycling facility and is placed under property `Pool` of the target class. This
**	method can be used instead of the usual `attachTo` when the target class construct/deconstruct methods need to remain untouched.
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
