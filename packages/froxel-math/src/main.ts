
import { loadFromDataUri } from 'asyl';

import Vec2 from './vec2';
export { default as Vec2 } from './vec2';
import Vec4 from './vec4';
export { default as Vec4 } from './vec4';
import Rect from './rect';
export { default as Rect } from './rect';
import Mat3 from './mat3';
export { default as Mat3 } from './mat3';

export let module = null;

//@ts-ignore
import froxel_math from 'data-url:./froxel-math.wasm';

/**
 * Initializes the WebAssembly module for the froxel-math package.
 */
export function init () : Promise<void>
{
	return new Promise<void> (async (resolve, reject) =>
	{
		loadFromDataUri(froxel_math, { })
		.then(asylModule =>
		{
			module = asylModule;

			Vec2.bind(module);
			Vec4.bind(module);
			Rect.bind(module);
			Mat3.bind(module);

			resolve();
		})
		.catch(reject);
	});
}
