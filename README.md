<p align="center">
	<img width="240px" src="./docs/logo.png"/>
	<br/>
	<span>Froxel Gamedev Framework</span>
	<br/><br/>
	<img src="https://img.shields.io/npm/v/froxel?label=version&color=%2300a020&style=flat-square"/>
	<img src="https://img.shields.io/npm/dt/froxel?color=%23a000a0&style=flat-square"/>
	<img src="https://img.shields.io/bundlephobia/min/froxel/latest?color=%2300a0b0&style=flat-square"/>
</p>

<br/>

## Installation

Froxel is a lightweight and powerful framework to build games using HTML5 technology. You can use npm/yarn/pnpm to install the framework in your project, or download the respective flavor (ESM or global) of target from the `dist` folder and include it in your project directly (using the `import` keyword of JS, or the global `froxel` object).

```sh
pnpm add froxel
```


<br/>

## Getting Started

The fastest way to get started is to create a froxel project from a template, build it and view it on your browser. To create a project in folder `test`, and install all dependencies, execute the following:

```sh
pnpm dlx froxel create test
cd test
```

Build your project using `pnpm build` and then either open the `index.html` file directly in your browser<sup>1</sup> or execute `pnpm serve` to spin up a mini HTTP server, when using the latter navigate to [http://localhost:1234/](http://localhost:1234/) to view the results.

You can also use `pnpm watch` to start in watcher mode and have your modifications reflected quickly. HMR is disabled by default, so ensure you reload the browser window after every change, if this behavior is not desired edit the `watch` script of the `package.json` file.

<br/>

##### <sup>1</sup> Due to restrictions of access to the `file://` URI in browsers, it is recommended to use an HTTP server to host your project in a localhost environment. You can use a server such as the `http-server` package for Node (which is included in the froxel project), `nginx`, `Apache`, etc. If you're using Firefox, you can alternatively open `about:config` and set `security.fileuri.strict_origin_policy` to `false` and open the `index.html` directly.
