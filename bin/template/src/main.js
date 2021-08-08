
import fxl, { Bounds2 } from 'froxel';

/**
 *	Entry point.
 */
async function main()
{
	await fxl.sys.init({ log: true, screenWidth: 180, orientation: 'portrait' });

	fxl.world.init(fxl.sys.screenWidth, fxl.sys.screenHeight);

	fxl.res.placeholder('red_block', '#ff0000', 2, 2);
	fxl.res.placeholder('blue_block', '#0000ff', 2, 2);
	fxl.res.placeholder('cyan_block', '#00ffff', 2, 2);
	fxl.res.placeholder('magenta_block', '#ff00ff', 2, 2);
	await fxl.res.load();

	fxl.world.selectScene(fxl.world.SCENE_MAIN);
	fxl.world.selectContainer(fxl.world.LAYER_MAIN);

	let tmp = Bounds2.alloc().init();

	let updater = fxl.world.createUpdater((elem, dt) =>
	{
		let dx = elem.dx*dt;
		let dy = elem.dy*dt;

		tmp.set(elem.bounds).translate(dx, dy);

		if (tmp.x1 < fxl.world.bounds.x1)
		{
			dx = fxl.world.bounds.x1 - elem.bounds.x1;
			elem.dx *= -1;
		}
		else if (tmp.x2 > fxl.world.bounds.x2)
		{
			dx = fxl.world.bounds.x2 - elem.bounds.x2;
			elem.dx *= -1;
		}

		if (tmp.y1 < fxl.world.bounds.y1)
		{
			dy = fxl.world.bounds.y1 - elem.bounds.y1;
			elem.dy *= -1;
		}
		else if (tmp.y2 > fxl.world.bounds.y2)
		{
			dy = fxl.world.bounds.y2 - elem.bounds.y2;
			elem.dy *= -1;
		}

		elem.translate(dx, dy);
	});

	let drawables = [
		fxl.res.r.red_block,
		fxl.res.r.blue_block,
		fxl.res.r.cyan_block,
		fxl.res.r.magenta_block
	];

	let getDrawable = randitem(drawables);

	for (let i = 0; i < 250; i++)
	{
		let elem = fxl.world.createElement(randr(fxl.world.bounds.x1, fxl.world.bounds.x2), randr(fxl.world.bounds.y1, fxl.world.bounds.y2), getDrawable());

		elem.dx = randr(-150, 150);
		elem.dy = randr(-150, 150);

		updater.add(elem);
	}
}

/**
 * 	Execute entry point.
 */
main();
