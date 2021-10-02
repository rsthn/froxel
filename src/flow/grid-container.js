/*
**	flow/grid-container.js
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

import Container from './container.js';
import Grid from './grid.js';
import GridElement from './grid-element.js';
import Element from './element.js';
import globals from '../system/globals.js';
import System from '../system/system.js';

/*
**	A grid container is a container that uses an optimized spatial grid structure to store the elements.
*/

export default Container.extend
({
	className: 'GridContainer',

	/*
	**	Grid containing the elements.
	*/
	grid: null,

	/*
	**	Indicates if the container bound should be drawn.
	*/
	debugBounds: false,

	/*
	**	Constructs the grid container with the specified size and divisor.
	*/
	__ctor: function (width=32768, height=32768, divisor=64)
	{
		this._super.Container.__ctor (width, height);
		this.grid = new Grid (width, height, divisor);
	},

	/*
	**	Destroys the container and all contained elements.
	*/
	__dtor: function()
	{
		this.clear();
		this._super.Container.__dtor();
	},

	/*
	**	Syncs the actual location of the specified element with its storage location. Returns true if successful.
	*/
	sync: function (elem)
	{
		this.syncZ(elem);
		return this.grid.sync(elem);
	},

	/*
	**	Clears the container to empty. All contained elements will be destroyed.
	*/
	clear: function()
	{
		this.grid.clear();
	},

	/*
	**	Resets the container to empty. Contained elements are not destroyed. Use `clear` if that is your intention.
	*/
	reset: function()
	{
		this.grid.reset();
	},

	/*
	**	Adds an element to the container. Returns boolean indicating if successful.
	*/
	add: function (elem)
	{
		if (!Element.isInstance(elem))
			throw new Error ('argument must be an Element');

		if (!this.grid.add(elem))
			return false;

		elem.container = this;
		this.elementCount = this.grid.count;

		this.syncZ(elem);
		return true;
	},

	/*
	**	Removes an element from the container and returns it.
	*/
	remove: function (elem)
	{
		this.grid.remove(elem);
		this.elementCount = this.grid.count;
		return elem;
	},

	/*
	**	Draws the contained elements. Does not take the active viewport into account.
	*/
	_draw: function()
	{
		this.grid.forEachInRegion(this.viewportBounds, GridElement.ALIVE | GridElement.VISIBLE, GridElement.ALIVE | GridElement.VISIBLE, this.drawElement, this);

		if (!this.debugBounds || this.viewportBounds === null)
			return;

		let g = System.displayBuffer2;

		g.pushMatrix();
		g.loadMatrix(this.g.getMatrix());

		let y0 = ((this.viewportBounds.y1+this.grid.offsy - (1<<this.grid.ky-1)) >> this.grid.ky) * this.grid.stride;
		let y1 = ((this.viewportBounds.y2+this.grid.offsy) + (1<<this.grid.ky-1) >> this.grid.ky) * this.grid.stride;
		let x0 = ((this.viewportBounds.x1+this.grid.offsx - (1<<this.grid.kx-1)) >> this.grid.kx);
		let x1 = ((this.viewportBounds.x2+this.grid.offsx) + (1<<this.grid.kx-1) >> this.grid.kx);

		y0 = (int(y0 / this.grid.stride) << this.grid.ky) - this.grid.offsy;
		y1 = (int(y1 / this.grid.stride) << this.grid.ky) - this.grid.offsy + (1 << this.grid.ky);
		x0 = (x0 << this.grid.kx) - this.grid.offsx;
		x1 = (x1 << this.grid.kx) - this.grid.offsx + (1 << this.grid.kx);

		g.fillStyle('rgba(255,0,0,0.2)');
		g.fillRect(x0, y0, x1-x0+1, y1-y0+1);

		y0 = this.viewportBounds.y1;
		y1 = this.viewportBounds.y2;
		x0 = this.viewportBounds.x1;
		x1 = this.viewportBounds.x2;

		g.lineWidth(1/System.canvasScaleFactor);
		g.strokeStyle('#fff');
		g.strokeRect(x0, y0, x1-x0+1, y1-y0+1);

		g.lineWidth(1/System.canvasScaleFactor);
		g.strokeStyle('#008');
		for (let y = globals.viewport.worldY1+this.grid.offsy; y < globals.viewport.worldY2+this.grid.offsy; y += (1 << this.grid.ky))
		for (let x = globals.viewport.worldX1+this.grid.offsx; x < globals.viewport.worldX2+this.grid.offsx; x += (1 << this.grid.kx))
		{
			g.strokeRect(x-this.grid.offsx, y-this.grid.offsy, (1 << this.grid.kx), (1 << this.grid.ky));
		}

		g.popMatrix();
	},

	/*
	**	Executes the specified callback function for each element that intersects the given bounds and has the specified flags set. The process
	**	is immediately stopped if the callback returns `false`.
	*/
	forEachInRegion: function (bounds, flagsAndMask, flagsValue, callback, context)
	{
		this.grid.forEachInRegion (bounds, flagsAndMask, flagsValue, callback, context);
	},

	/*
	**	Collects all elements that intersect the given bounds and have the specified flags set. Returns a new List, remember to call free() after using it.
	*/
	selectInRegion: function (bounds, flagsAndMask, flagsValue)
	{
		return this.grid.selectInRegion (bounds, flagsAndMask, flagsValue);
	},

	/*
	**	Counts all elements that intersect the given bounds and have the specified flags set.
	*/
	countInRegion: function (bounds, flagsAndMask, flagsValue)
	{
		return this.grid.countInRegion (bounds, flagsAndMask, flagsValue);
	},

	/*
	**	Returns the first element that intersect the given bounds and have the specified flags set.
	*/
	selectFirst: function (bounds, flagsAndMask, flagsValue)
	{
		return this.grid.selectFirst (bounds, flagsAndMask, flagsValue);
	}
});
