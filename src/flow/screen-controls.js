/*
**	flow/screen-controls
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

import KeyboardHandler from './keyboard-handler.js';
import PointerHandler from './pointer-handler.js';
import System from '../system/system.js';

//![import "./keyboard-handler"]
//![import "./pointer-handler"]
//![import "../system/system"]

/**
**
*/

const ScreenControls =
({
	priority: 5,

	list: [ ],
	dummy: { },

	hoverEnabled: false,
	zindexEnabled: false,
	lastFrame: 0,

	/*
	**	Adds an item to the ScreenControls control list. The item should be an object with the following mandatory methods:
	**
	**		bool containsPoint (float pointerX, float pointerY)
	**		void pointerActivate (Object pointer)
	**		void pointerDeactivate (Object pointer)
	**		void pointerUpdate (float pointerX, float pointerY, Object pointer)
	**		void hover (bool status, Object pointer)
	**		bool focusLock
	**
	**		bool keyboardEvents
	**		bool keyDown (int keyCode, object keyArgs)
	**		bool keyUp (int keyCode, object keyArgs)
	*/
	add: function (c)
	{
		if (this.zindexEnabled && !('zindex' in c))
			c.zindex = 0;

		if (this.list.indexOf(c) === -1)
			this.list.push(c);
	},

	remove: function (c)
	{
		var i = this.list.indexOf(c);
		if (i !== -1) this.list.splice(i, 1);
	},

	setHoverEnabled: function (value)
	{
		this.hoverEnabled = value;
	},

	setZIndexEnabled: function (value)
	{
		this.zindexEnabled = value;
	},

	findTarget: function (x, y, filter)
	{
		if (this.zindexEnabled && this.lastFrame != System.frameNumber)
		{
			let zindex = this.list[0].zindex;

			for (let item of this.list)
			{
				if (item.zindex > zindex)
				{
					this.list = this.list.sort((a,b) => b.zindex - a.zindex);
					break;
				}

				zindex = item.zindex;
			}

			this.lastFrame = System.frameNumber;
		}

		for (let i = 0; i < this.list.length; i++)
		{
			if (!this.list[i]) continue;

			if (filter != null && filter(this.list[i]) === false)
				continue;

			if (this.list[i].containsPoint(x, y))
				return this.list[i];
		}

		return null;
	},

	filterHover: function (i)
	{
		return 'hover' in i;
	},

	onPointerEvent: function (action, p, pointers)
	{
		let _continue = true;
		let tmp = null;

		switch (action)
		{
			case System.EVT_POINTER_DOWN:

				if (p._ref != null)
				{
					tmp = p._ref; p._ref = null;
					tmp.pointerDeactivate(p);
				}

				tmp = this.findTarget(p.x, p.y);
				if (tmp != null)
				{
					(p._ref = tmp).pointerActivate(p);
					_continue = false;
				}

				break;

			case System.EVT_POINTER_DRAG_START:
				if (p._ref != null) _continue = false;
				break;

			case System.EVT_POINTER_DRAG_MOVE:
				if (this.hoverEnabled)
				{
					if (p._refh != null)
					{
						if (p._refh.containsPoint(p.x, p.y))
						{
						}
						else
						{
							tmp = p._refh; p._refh = null;
							tmp.hover(false, p);
		
							tmp = this.findTarget(p.x, p.y, this.filterHover);
							if (tmp != null)
								(p._refh = tmp).hover(true, p);
						}
					}
					else
					{
						tmp = this.findTarget(p.x, p.y, this.filterHover);
						if (tmp != null)
							(p._refh = tmp).hover(true, p);
					}
				}

				if (p._ref != null)
				{
					if (p._ref.containsPoint(p.x, p.y) || p._ref.focusLock == true)
					{
						p._ref.pointerUpdate (p.x, p.y, p);
						_continue = false;
					}
					else
					{
						tmp = p._ref; p._ref = null;
						tmp.pointerDeactivate(p);
	
						tmp = this.findTarget(p.x, p.y);
						if (tmp != null)
						{
							(p._ref = tmp).pointerActivate(p);
							_continue = false;
						}
					}
				}
				else
				{
					tmp = this.findTarget(p.x, p.y);
					if (tmp != null)
					{
						(p._ref = tmp).pointerActivate(p);
						_continue = false;
					}
				}

				break;

			case System.EVT_POINTER_MOVE:
				if (this.hoverEnabled)
				{
					if (p._refh != null)
					{
						if (p._refh.containsPoint(p.x, p.y))
						{
						}
						else
						{
							tmp = p._refh; p._refh = null;
							tmp.hover(false, p);
		
							tmp = this.findTarget(p.x, p.y, this.filterHover);
							if (tmp != null)
								(p._refh = tmp).hover(true, p);
						}
					}
					else
					{
						tmp = this.findTarget(p.x, p.y, this.filterHover);
						if (tmp != null)
							(p._refh = tmp).hover(true, p);
					}
				}

				if (p._ref == null) break;

				if (p._ref.containsPoint(p.x, p.y) || p._ref.focusLock == true)
				{
					p._ref.pointerUpdate (p.x, p.y, p);
					_continue = false;
				}
				else
				{
					tmp = p._ref; p._ref = null;
					tmp.pointerDeactivate(p);
				}

				break;

			case System.EVT_POINTER_DRAG_STOP:
				if (p._ref != null) _continue = false;
				break;

			case System.EVT_POINTER_UP:
				if (p._ref != null)
				{
					tmp = p._ref; p._ref = null;
					tmp.pointerDeactivate(p);

					_continue = false;
				}

				break;
		}

		return _continue;
	},

	onKeyboardEvent: function (action, keyCode, keyArgs)
	{
		switch (action)
		{
			case System.EVT_KEY_DOWN:

				for (let i = 0; i < this.list.length; i++)
				{
					if (!this.list[i] || !this.list[i].keyboardEvents) continue;

					if (this.list[i].keyDown(keyCode, keyArgs) === false)
						break;
				}

				break;

			case System.EVT_KEY_UP:

				for (let i = 0; i < this.list.length; i++)
				{
					if (!this.list[i] || !this.list[i].keyboardEvents) continue;

					if (this.list[i].keyUp(keyCode, keyArgs) === false)
						break;
				}

				break;
		}
	}
});

PointerHandler.register(ScreenControls);
KeyboardHandler.register(ScreenControls);

export default ScreenControls;
