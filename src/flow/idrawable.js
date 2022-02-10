/*
**	flow/idrawable.js
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

//:/**
//: * 	Describes an object that can be drawn to a Canvas.
//: */

//!class IDrawable

	/**
	 * 	Width of the drawable.
	 * 	!width: number;
	 */

	/**
	 * 	Height of the drawable.
	 * 	!height: number;
	 */

	/**
	 * 	Returns the actual independent drawable object.
	 * 	!getDrawable(): IDrawable;
	 */

	/**
	 * 	Returns the underlying Image object, can be used directly with Canvas.drawImage.
	 * 	!getImage(): HTMLImageElement|Canvas;
	 */

	/**
	 * 	Draws the drawable on the given canvas.
	 * 	!draw(g: Canvas, x: number, y: number, width: number, height: number): void;
	 */
