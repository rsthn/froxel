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

Froxel is a lightweight and powerful framework to build games using HTML5 technology. You can use npm/yarn/pnpm to install the framework in your project, or download the standalone `froxel.js` ESM file from the `dist` folder and include it in your project directly using the `import` keyword of JavaScript.

```sh
yarn add froxel
```


<br/>

## Getting Started

The fastest way to get started is to create a froxel project from a template, build it and view it on your browser. To create a project in folder `test`, run:

```sh
npx froxel create test
```

You need to have parcel and shx installed (preferrably globally). You can install them yourself or just run `yarn requirements` from your froxel project to get those installed automatically.

Build your project using `yarn build` and then just open the `index.html` file in your browser to view the results.

<br/>

##### <b>NOTE:</b> Due to restrictions of access to the `file://` URI in browsers, it is recommended to use an HTTP server to host your project in a localhost environment. You can use a server such as the `http-server` package for Node, `nginx`, `Apache`, etc. If you're using Firefox, you can alternatively open `about:config` and set `security.fileuri.strict_origin_policy` to `false`.
