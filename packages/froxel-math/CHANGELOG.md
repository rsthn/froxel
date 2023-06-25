# v0.0.3 - Jun 25 2023

#### Global
- Updated all source files to include `materialize`, a special function that creates an object at a specified memory location.
- Updated unit tests to ensure materialization works as expected.
- Now compiling with option `-nostdlib` to be compatible with asyl.

<br/>

# v0.0.1 - Sep 28 2022

#### Mat4
- Added Mat4 class, C++ bindings and unit tests.

#### Mat3
- Added Mat3 class, C++ bindings and unit tests.
- Added `col` and `row` methods to Mat3, to manipulate columns and rows respectively.
- Fixed bug in Mat3 causing temp matrices not to be set to identity.

#### Rect
- Added support for Rect objects (rectangles).

#### Vec4
- Added Vec4 class, improved unit tests and added direct access to vector components.
