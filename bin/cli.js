#!/usr/bin/env node

import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import url from 'url';
import { exec } from 'child_process';

const INFO = '\x1B[32m';
const ERROR = '\x1B[91m(error)\x1B[0m ';
const SUCCESS = '\x1B[92m';
const BLANK = '\x1B[0m';
const WHITE = '\x1B[97m';

function msg (type, message) {
	console.log(WHITE + 'froxel: ' + type + message + BLANK);
}

function run (command)
{
	return new Promise ((resolve, reject) => {
		exec(command, (err, stdout) => {

			if (err) {
				msg(ERROR, err);
				reject(err);
				return;
			}

			resolve();
		});
	});
};

console.log('');

const args = process.argv.slice(2);
if (args.length == 0)
{
	console.log(
`Syntax:
    froxel <command> [options]

Command:
    create <name>                Create a project <name> in the current folder (yarn).
    prepare                      Installs global requirements (yarn).
`);

	process.exit();
}

const cdir = path.resolve('.');
const sdir = path.dirname(url.fileURLToPath(import.meta.url));

switch (args[0])
{
	case 'create':
		if (args.length < 2) {
			msg(ERROR, 'Parameter <name> missing for command `create`');
			break;
		}

		msg(INFO, 'Creating folder ' + args[1] + '...');
		const dest = path.join(cdir, args[1]);
		if (!fs.existsSync(dest)) fs.mkdirSync(dest);

		msg(INFO, 'Copying template ...');
		fse.copy(path.join(sdir, 'template'), dest, { overwrite: true }, function (err)
		{
			if (err) {
				msg(ERROR, err);
				return;
			}

			msg(INFO, 'Installing dependencies ...');
			process.chdir(dest);

			run('yarn').then(r => {
				msg(SUCCESS, 'Completed.');
			});
		});

		break;

	case 'prepare':
		msg(INFO, 'Installing parcel ...');
		run('yarn global add --ignore-optional parcel').then(r =>
		{
			msg(INFO, 'Installing shx ...');
			run('yarn global add --ignore-optional shx').then(r =>
			{
				msg(SUCCESS, 'Completed.');
			});
		});

		break;

	default:
		msg(ERROR, 'Unknown command: ' + args[0]);
		break;
}
