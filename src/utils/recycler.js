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

let constructorAllowed = 0;

/*
**	Attaches recycling methods (alloc, calloc and free) to the specified class. Class should implement method `init` to initialize the
**	instance (and returns itself) and __dtor to destroy it.
*/

Recycler.attachTo = function (_class, maxPoolSize=2048)
{
	if (!_class.prototype.className)
		throw new Error ('Unable to attach recycler functions to unnamed class.');

	if (!('__dtor' in _class.prototype))
		throw new Error ('Recycler: Class '+_class.prototype.className+' requires `__dtor` method.');

	if (!('init' in _class.prototype))
		throw new Error ('Recycler: Class '+_class.prototype.className+' requires `init` method.');

	recyclingFacilities[_class.prototype.className] = _class;

	_class.recyclerPool = [ ];

	_class.prototype.objectId = 0;

	_class.recyclerNextObjectId = 0;
	_class.recyclerCreated = 0;
	_class.recyclerRecycled = 0;
	_class.recyclerMissed = 0;
	_class.recyclerLength = 0;
	_class.recyclerActive = 0;

	for (let i = 0; i < maxPoolSize; i++)
	{
		_class.recyclerPool.push(new _class ());
		//_class.recyclerCreated++;
		_class.recyclerLength++;
	}

	const __ctor = _class.prototype.__ctor;

	_class.prototype.__ctor = function()
	{
		if (!constructorAllowed)
			throw new Error ('Recycler: Constructor blocked for class '+_class.prototype.className+', use alloc() instead.');

		__ctor.call(this);
	};

	_class.alloc = function()
	{
		let item;

		if (!this.recyclerLength)
		{
			constructorAllowed++;
			item = new _class ();
			constructorAllowed--;
			_class.recyclerCreated++;
		}
		else
		{
			item = this.recyclerPool[--this.recyclerLength];
			_class.recyclerRecycled++;
		}

		_class.recyclerActive++;

		item.objectId = ++this.recyclerNextObjectId;
		this.recyclerNextObjectId &= 0x7FFFFFFF;

		return item;
	};

	_class.calloc = function()
	{
		return _class.alloc().init();
	};

	_class.free = function(item)
	{
		return item ? item.free() : item;
	};

	_class.prototype.free = function()
	{
		if (this.objectId == 0)
		{
			console.error ('Already freed (' + _class.prototype.className + ')');
			return this;
		}

		this.__dtor();

		this.objectId = 0;

		if (_class.recyclerLength >= _class.recyclerPool.length)
			_class.recyclerMissed++;
		else
			_class.recyclerPool[_class.recyclerLength++] = this;

		_class.recyclerActive--;
		return this;
	};
};


/*
**	Shows stats about all recycling facilities using console.debug.
*/
Recycler.showStats = function ()
{
	console.group('Recycling Facilities');

	for (let i in recyclingFacilities)
	{
		let c = recyclingFacilities[i];
		console.debug (i + ': '+(100*(c.recyclerCreated/c.recyclerPool.length)).toFixed(1)+'%  =>  overhead=' + c.recyclerCreated + ', active='+c.recyclerActive+', capacity=' + c.recyclerPool.length + ', recycled=' + c.recyclerRecycled + ', in-recycler=' + c.recyclerLength + ', missed=' + c.recyclerMissed + ', space=' + (c.recyclerPool.length - c.recyclerLength));
	}

	console.groupEnd();
};
