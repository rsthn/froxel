/*
**	flow/boot.js
**
**	Copyright (c) 2013-2021, RedStar Technologies, All rights reserved.
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

import { Class } from '@rsthn/rin';

import PriorityQueue from '../utils/priority-queue.js';
import System from '../system/system.js';
import Resources from '../resources/resources.js';
import C from '../system/config.js';

/*
**	
*/

const Boot =
{
	modules: new PriorityQueue(),

	init: function ()
	{
		Resources.integerScaling = false;
	
		System.init ({ antialias: C.ANTIALIAS, fullscreen: false, background: C.BACKGROUND, screenWidth: C.WIDTH, screenHeight: C.HEIGHT, orientation: C.ORIENTATION, fps: C.FPS, minFps: C.MIN_FPS || 15 });
	
		Boot.startup();
	},

	register: function (module)
	{
		return this.modules.add(module);
	},

	unregister: function (module)
	{
		this.modules.remove(module);
		this.modules.cleanup();
	},

	startup: function ()
	{
		this.modules.forEachAsync( (m,r) => { if (m.onStartup(r) !== false) r(); } );
	},

	shutdown: function ()
	{
		this.modules.forEachAsyncRev( (m,r) => { if (m.onShutdown(r) !== false) r(); } );
	}
};

/*
**
*/

Boot.Module = Class.extend
({
	className: "Module",

	priority: 5,

	__ctor: function()
	{
		Boot.register(this);
	},

	__dtor: function()
	{
		Boot.unregister(this);
	},

	/*
	**	Should return false if the method is async and when finished should call next().
	*/
	onStartup: function (next)
	{
	},

	/*
	**	Should return false if the method is async and when finished should call next().
	*/
	onShutdown: function (next)
	{
	}
});

export default Boot;
