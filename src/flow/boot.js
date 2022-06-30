
import { Class } from 'rinn';
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
	 * 	!onStartup (next: () => void) : boolean;
	 */
	onStartup: function (next)
	{
	},

	/**
	 * 	Should return `false` if the method is async. When async ensure to call `next` once the operation is complete.
	 * 	!onShutdown (next: () => void) : boolean;
	 */
	onShutdown: function (next)
	{
	}
});

//!/interface
//!/namespace

export default Boot;
