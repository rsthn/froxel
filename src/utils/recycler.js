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

/**
**	Attaches recycling methods (alloc, dispose) to the specified class. Class should have methods __reinit to reinitialize the
**	object and __dtor to destroy it.
**
**	>> void attachTo (function classConstructor, int maxPoolSize=1024);
*/

Recycler.attachTo = function (_class, _maxPoolSize)
{
	if (!_maxPoolSize) _maxPoolSize = 1024;

	if (!_class.prototype.className)
		throw new Error ('Unable to attach recycler functions to unnamed class.');

	recyclingFacilities[_class.prototype.className] = _class;

	_class.recyclerPool = [ ];

	_class.prototype.objectId = 0;
	_class.nextObjectId = 0;

	_class.createdItems = 0;
	_class.restoredItems = 0;
	_class.recycledItems = 0;

	_class.alloc = function()
	{
		var item;

		if (!this.recyclerPool.length)
		{
			item = new _class ();
			_class.createdItems++;
		}
		else
		{
			item = this.recyclerPool.pop();
			_class.restoredItems++;
		}

		if ("__reinit" in item)
			item.__reinit.apply(item, arguments);

		item.objectId = ++this.nextObjectId;
		this.nextObjectId = this.nextObjectId & 0x3FFFFFFF;

		return item;
	};

	_class.free = function(item)
	{
		if (item) item.dispose();
	};

	_class.prototype.dispose = function (reason)
	{
		if (this.objectId == 0)
		{
			console.error ('Already disposed (' + _class.prototype.className + '): ' + reason + ' / ' + this.disposeReason);
			return;
		}

		if ("__dtor" in this) this.__dtor();

		_class.recycledItems++;

		this.objectId = 0;
		this.disposeReason = reason;

		if (_class.recyclerPool.length < _maxPoolSize)
			_class.recyclerPool.push (this);
	};
};


/**
**	Shows stats about all recycling facilities using console.debug.
**
**	void showStats();
*/

Recycler.showStats = function ()
{
	console.group("Recycling Facilities");

	for (var i in recyclingFacilities)
	{
		var c = recyclingFacilities[i];
		console.debug (i + ": created=" + c.createdItems + ", restored=" + c.restoredItems + ", recycled=" + c.recycledItems + ", available=" + c.recyclerPool.length);
	}

	console.groupEnd();
};
