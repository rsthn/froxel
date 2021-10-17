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

//![import "../utils/priority-queue"]

//!class Boot

const Boot =
{
	modules: new PriorityQueue(),

	/**
	 * 	Registers a new boot module.
	 * 	!static register (module: Boot.Module) : Boot.Module;
	 */
	register: function (module)
	{
		return this.modules.add(module);
	},

	/**
	 * 	Removes a boot module.
	 * 	!static unregister (module: Boot.Module) : void;
	 */
	unregister: function (module)
	{
		this.modules.remove(module);
		this.modules.cleanup();
	},

	/**
	 * 	Executes the startup sequence.
	 * 	!static startup (finishedCallback?: () => void) : void;
	 */
	startup: function (finishedCallback=null)
	{
		this.modules.forEachAsync((m,r) => { if (m.onStartup(r) !== false) r(); }, finishedCallback);
	},

	/**
	 * 	Executes the shutdown sequence.
	 * 	!static shutdown (finishedCallback?: () => void) : void;
	 */
	shutdown: function (finishedCallback=null)
	{
		this.modules.forEachAsyncRev( (m,r) => { if (m.onShutdown(r) !== false) r(); }, finishedCallback);
	}
};

//!/class

//!namespace Boot
//!interface Module

Boot.Module = Class.extend
({
	className: "Module",

	/**
	 * 	Priority of the module (from 0 to 100), lower number means higher priority.
	 * 	!priority: number;
	 */
	priority: 5,

	__ctor: function()
	{
		Boot.register(this);
	},

	__dtor: function()
	{
		Boot.unregister(this);
	},

	/**
	 * 	Should return `false` if the method is async. When async ensure to call `next` once the operation is complete.
	 * 	!onStartup: function (next: () => void) : boolean;
	 */
	onStartup: function (next)
	{
	},

	/**
	 * 	Should return `false` if the method is async. When async ensure to call `next` once the operation is complete.
	 * 	!onShutdown: function (next: () => void) : boolean;
	 */
	onShutdown: function (next)
	{
	}
});

export default Boot;
