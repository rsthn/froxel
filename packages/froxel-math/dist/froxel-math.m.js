import{loadFromDataUri as A}from"asyl";let g=null;class I{static #A=(()=>{this.BYTES=2*Float32Array.BYTES_PER_ELEMENT})();static bind(A){g=A}static alloc(A=0,C=0){return new I(g.vec2_alloc2f(A,C))}static materialize(A){return new I(g.vec2_materialize(A))}constructor(A){this.addr=A,this.data=g.mapFloat32Array(A,2)}free(){g.vec2_free(this.addr)}clone(){return new I(g.vec2_clone(this.addr))}set(A,I=null){return null===I?g.vec2_set1v(this.addr,A.addr):g.vec2_set2f(this.addr,A,I),this}setX(A){return this.data[0]=A,this}setY(A){return this.data[1]=A,this}x(){return this.data[0]}y(){return this.data[1]}zero(){return g.vec2_zero(this.addr),this}iszero(){return g.vec2_iszero(this.addr)}equals(A,I=null){return null===I?g.vec2_equals1v(this.addr,A.addr):g.vec2_equals2f(this.addr,A,I)}almost(A,I=null,C=null){return null===C?g.vec2_almost1v(this.addr,A.addr,I):g.vec2_almost2f(this.addr,A,I,C)}neg(){return g.vec2_neg(this.addr),this}inv(){return g.vec2_inv(this.addr),this}abs(){return g.vec2_abs(this.addr),this}translate(A,I=null){return null===I?g.vec2_translate1v(this.addr,A.addr):g.vec2_translate2f(this.addr,A,I),this}rotate(A,I=0,C=0){return g.vec2_rotate3f(this.addr,A,I,C),this}add(A,I=null){return null===I?g.vec2_add1v(this.addr,A.addr):g.vec2_add2f(this.addr,A,I),this}sub(A,I=null){return null===I?g.vec2_sub1v(this.addr,A.addr):g.vec2_sub2f(this.addr,A,I),this}scale(A,C=null){return null===C?A instanceof I?g.vec2_scale1v(this.addr,A.addr):g.vec2_scale1f(this.addr,A):g.vec2_scale2f(this.addr,A,C),this}floor(){return g.vec2_floor(this.addr),this}ceil(){return g.vec2_ceil(this.addr),this}trunc(){return g.vec2_trunc(this.addr),this}fract(){return g.vec2_fract(this.addr),this}dot(A,I=null){return null===I?g.vec2_dot1v(this.addr,A.addr):g.vec2_dot2f(this.addr,A,I)}mag2(){return g.vec2_mag2(this.addr)}mag(){return g.vec2_mag(this.addr)}unit(){return g.vec2_unit(this.addr),this}major(){return g.vec2_major(this.addr),this}minor(){return g.vec2_minor(this.addr),this}sign(){return g.vec2_sign(this.addr),this}toString(){return`(${this.x()}, ${this.y()})`}}let C=null;class t{static #A=(()=>{this.BYTES=4*Float32Array.BYTES_PER_ELEMENT})();static bind(A){C=A}static alloc(A=0,g=0,I=0,Q=0){return new t(C.vec4_alloc4f(A,g,I,Q))}static materialize(A){return new t(C.vec4_materialize(A))}constructor(A){this.addr=A,this.data=C.mapFloat32Array(A,4)}free(){C.vec4_free(this.addr)}clone(){return new t(C.vec4_clone(this.addr))}set(A,g=null,I=null,t=null){return null===g?(C.vec4_set1v(this.addr,A.addr),this):(C.vec4_set4f(this.addr,A,g,I,t),this)}setX(A){return this.data[0]=A,this}setY(A){return this.data[1]=A,this}setZ(A){return this.data[2]=A,this}setW(A){return this.data[3]=A,this}x(){return this.data[0]}y(){return this.data[1]}z(){return this.data[2]}w(){return this.data[3]}zero(){return C.vec4_zero(this.addr),this}iszero(){return C.vec4_iszero(this.addr)}equals(A,g=null,I=null,t=null){return null===g?C.vec4_equals1v(this.addr,A.addr):null===I?C.vec4_equals2f(this.addr,A,g):C.vec4_equals4f(this.addr,A,g,I,t)}almost(A,g=null,I=null,t=null,Q=null){return null===I?C.vec4_almost1v(this.addr,A.addr,g):null===t?C.vec4_almost2f(this.addr,A,g,Q):C.vec4_almost4f(this.addr,A,g,I,t,Q)}neg(){return C.vec4_neg(this.addr),this}inv(){return C.vec4_inv(this.addr),this}abs(){return C.vec4_abs(this.addr),this}translate(A,g=null,I=null,t=null){return null===g?(C.vec4_translate1v(this.addr,A.addr),this):null===I?(C.vec4_translate2f(this.addr,A,g),this):(C.vec4_translate4f(this.addr,A,g,I,t),this)}add(A,g=null,I=null,t=null){return null===g?(C.vec4_add1v(this.addr,A.addr),this):null===I?(C.vec4_add2f(this.addr,A,g),this):(C.vec4_add4f(this.addr,A,g,I,t),this)}sub(A,g=null,I=null,t=null){return null===g?(C.vec4_sub1v(this.addr,A.addr),this):null===I?(C.vec4_sub2f(this.addr,A,g),this):(C.vec4_sub4f(this.addr,A,g,I,t),this)}scale(A,g=null,I=null,Q=null){return null===g?(A instanceof t?C.vec4_scale1v(this.addr,A.addr):C.vec4_scale1f(this.addr,A),this):null===I?(C.vec4_scale2f(this.addr,A,g),this):(C.vec4_scale4f(this.addr,A,g,I,Q),this)}floor(){return C.vec4_floor(this.addr),this}ceil(){return C.vec4_ceil(this.addr),this}trunc(){return C.vec4_trunc(this.addr),this}fract(){return C.vec4_fract(this.addr),this}dot(A,g=null,I=null,t=null){return null===g?C.vec4_dot1v(this.addr,A.addr):null===I?C.vec4_dot2f(this.addr,A,g):C.vec4_dot4f(this.addr,A,g,I,t)}mag2(){return C.vec4_mag2(this.addr)}mag(){return C.vec4_mag(this.addr)}unit(){return C.vec4_unit(this.addr),this}major(){return C.vec4_major(this.addr),this}minor(){return C.vec4_minor(this.addr),this}sign(){return C.vec4_sign(this.addr),this}toString(){return`(${this.x()}, ${this.y()}, ${this.z()}, ${this.w()})`}}let Q=null;class B{static #A=(()=>{this.BYTES=6*Float32Array.BYTES_PER_ELEMENT})();static bind(A){Q=A}static alloc(A=null,g=null,I=!1,C=null){return new B(null===A?Q.rect_alloc4f(0,0,0,0):null===C?Q.rect_alloc2f(A,g,I):Q.rect_alloc4f(A,g,I,C))}static materialize(A){return new B(Q.rect_materialize(A))}constructor(A){this.addr=A,this.data=Q.mapFloat32Array(A,6)}free(){Q.rect_free(this.addr)}clone(){return new B(Q.rect_clone(this.addr))}zero(){return Q.rect_zero(this.addr),this}reset(){return Q.rect_reset(this.addr),this}extend(A,g=null){return null===g?Q.rect_extend1v(this.addr,A.addr):Q.rect_extend2f(this.addr,A,g),this}translate(A,g=null){return null===g?Q.rect_translate1v(this.addr,A.addr):Q.rect_translate2f(this.addr,A,g),this}center(A,g,I=!1){return Q.rect_center(this.addr,A,g,I),this}set(A,g=null,I,C){return null===g?Q.rect_set1r(this.addr,A.addr):Q.rect_set4f(this.addr,A,g,I,C),this}equals(A,g=null,I,C){return null===g?Q.rect_equals1r(this.addr,A.addr):Q.rect_equals4f(this.addr,A,g,I,C)}contains(A,g=0,C=0,t=null){return A instanceof B?Q.rect_contains1r(this.addr,A.addr):A instanceof I?Q.rect_contains1v(this.addr,A.addr,C):null===t?Q.rect_contains2f(this.addr,A,g,C):Q.rect_contains4f(this.addr,A,g,C,t)}union(A,g=null,I,C){return null===g?Q.rect_union1r(this.addr,A.addr):Q.rect_union4f(this.addr,A,g,I,C),this}intersects(A,g=null,I,C){return null===g?Q.rect_intersects1r(this.addr,A.addr):Q.rect_intersects4f(this.addr,A,g,I,C),this}intersection(A,g=null,I,C){return null===g?Q.rect_intersection1r(this.addr,A.addr):Q.rect_intersection4f(this.addr,A,g,I,C)}resize(A,g,I=!1,C=!1){return Q.rect_resize(this.addr,A,g,I,C),this}resizeBy(A,g,I=!1){return Q.rect_resizeBy(this.addr,A,g,I),this}x1(){return this.data[0]}y1(){return this.data[1]}x2(){return this.data[2]}y2(){return this.data[3]}cx(){return this.data[4]}cy(){return this.data[5]}width(){return Q.rect_width(this.addr)}height(){return Q.rect_height(this.addr)}isRight(){return Q.rect_isRight(this.addr)}area(A){return Q.rect_area(this.addr,A)}floor(){return Q.rect_floor(this.addr),this}ceil(){return Q.rect_ceil(this.addr),this}trunc(){return Q.rect_trunc(this.addr),this}fract(){return Q.rect_fract(this.addr),this}toString(){return`(${this.x1()}, ${this.y1()}, ${this.x2()}, ${this.y2()})`}}let E=null;class i{static #A=(()=>{this.BYTES=9*Float32Array.BYTES_PER_ELEMENT})();static bind(A){E=A}static alloc(){return new i(E.mat3_alloc())}static materialize(A){return new i(E.mat3_materialize(A))}constructor(A){this.addr=A,this.data=E.mapFloat32Array(A,9)}free(){E.mat3_free(this.addr)}clone(){return new i(E.mat3_clone(this.addr))}fill(A){return E.mat3_fill1f(this.addr,A),this}set(A,g=null,I=null,C=null){return A instanceof i?(E.mat3_set1m(this.addr,A.addr),this):null===g?(E.mat3_set1f(this.addr,A),this):(E.mat3_set1i3f(this.addr,A,g,I,C),this)}col(A,g,I,C){return E.mat3_col1i3f(this.addr,A,g,I,C),this}row(A,g,I,C){return E.mat3_row1i3f(this.addr,A,g,I,C),this}identity(){return E.mat3_identity(this.addr),this}scale(A,g=null){return null===g?E.mat3_scale1f(this.addr,A):E.mat3_scale2f(this.addr,A,g),this}transpose(){return E.mat3_transpose(this.addr),this}det(){return E.mat3_det(this.addr)}append(A){return E.mat3_append1m(this.addr,A.addr),this}translate(A,g){return E.mat3_translate2f(this.addr,A,g),this}rotate(A){return E.mat3_rotate1f(this.addr,A),this}toString(){return"["+Array.from(this.data).join(", ")+"]"}}let r=null;class s{static #A=(()=>{this.BYTES=16*Float32Array.BYTES_PER_ELEMENT})();static bind(A){r=A}static alloc(){return new s(r.mat4_alloc())}static materialize(A){return new s(r.mat4_materialize(A))}constructor(A){this.addr=A,this.data=r.mapFloat32Array(A,16)}free(){r.mat4_free(this.addr)}clone(){return new s(r.mat4_clone(this.addr))}fill(A){return r.mat4_fill1f(this.addr,A),this}set(A,g=null,I=null,C=null,t=null){return A instanceof s?(r.mat4_set1m(this.addr,A.addr),this):null===g?(r.mat4_set1f(this.addr,A),this):(r.mat4_set1i4f(this.addr,A,g,I,C,t),this)}col(A,g,I,C,t){return r.mat4_col1i4f(this.addr,A,g,I,C,t),this}row(A,g,I,C,t){return r.mat4_row1i4f(this.addr,A,g,I,C,t),this}identity(){return r.mat4_identity(this.addr),this}scale(A,g=null,I=null){return null===g?r.mat4_scale1f(this.addr,A):r.mat4_scale3f(this.addr,A,g,I),this}transpose(){return r.mat4_transpose(this.addr),this}det(){return r.mat4_det(this.addr)}append(A){return r.mat4_append1m(this.addr,A.addr),this}translate(A,g,I){return r.mat4_translate3f(this.addr,A,g,I),this}rotateX(A){return r.mat4_rotateX(this.addr,A),this}rotateY(A){return r.mat4_rotateY(this.addr,A),this}rotateZ(A){return r.mat4_rotateZ(this.addr,A),this}toString(){return"["+Array.from(this.data).join(", ")+"]"}}var a={};a="data:application/wasm;base64,AGFzbQEAAAABxQEeYAF%2FAX9gAX8AYAF8AXxgAnx8AXxgAn19AX1gAABgAnx8AX9gA398fABgAn9%2FAGADf3x8AX9gAn9%2FAX9gBH98fHwBf2ADf398AX9gBH98fHwAYAJ%2FfABgA398fAF8YAJ%2FfwF8YAF%2FAXxgBHx8fHwBf2AFf3x8fHwAYAV%2FfHx8fAF%2FYAZ%2FfHx8fHwBf2AFf3x8fHwBfGAAAX9gBX9%2FfHx8AGABfwF9YAZ%2Ff3x8fHwAYAN8fH8Bf2AFf3x8f38AYAR%2FfHx%2FAAJsCQNlbnYGbWVtb3J5AgMCgIACA2VudgZtYWxsb2MAAANlbnYEZnJlZQABA2VudgNzaW4AAgNlbnYDY29zAAIDZW52BGZtYXgAAwNlbnYEZm1pbgADA2VudgVmbWluZgAEA2VudgVmbWF4ZgAEA5sBmQEFBgABAAcIAQAJCgsMAQEBBwgNBwgHCA4HCAEBAQEPEBERAQEBARIAAQATCAEAFAkKFQsMAQEBEwcIEwcIEwcIEwcOCAEBAQEWDxAREQEBAQEXAAEACA4OGBgBDgEZCAcOBxcAAQAIDg4aGgEOARkIDQ4ODg0SExscAAEAAQEHCAcIHQgUChQKCwwTCBQKFAodEREAEAEBAQEGCAF%2FAUHQiQQLB70RmAEMdmVjMl9hbGxvYzJmAAkQdmVjMl9tYXRlcmlhbGl6ZQAKCXZlYzJfZnJlZQALCnZlYzJfY2xvbmUADAp2ZWMyX3NldDJmAA0KdmVjMl9zZXQxdgAOCXZlYzJfemVybwAPC3ZlYzJfaXN6ZXJvABANdmVjMl9lcXVhbHMyZgARDXZlYzJfZXF1YWxzMXYAEg12ZWMyX2FsbW9zdDJmABMNdmVjMl9hbG1vc3QxdgAUCHZlYzJfbmVnABUIdmVjMl9pbnYAFgh2ZWMyX2FicwAXEHZlYzJfdHJhbnNsYXRlMmYAGBB2ZWMyX3RyYW5zbGF0ZTF2ABkNdmVjMl9yb3RhdGUzZgAaCnZlYzJfYWRkMmYAGwp2ZWMyX2FkZDF2ABwKdmVjMl9zdWIyZgAdCnZlYzJfc3ViMXYAHgx2ZWMyX3NjYWxlMWYAHwx2ZWMyX3NjYWxlMmYAIAx2ZWMyX3NjYWxlMXYAIQp2ZWMyX2Zsb29yACIJdmVjMl9jZWlsACMKdmVjMl90cnVuYwAkCnZlYzJfZnJhY3QAJQp2ZWMyX2RvdDJmACYKdmVjMl9kb3QxdgAnCXZlYzJfbWFnMgAoCHZlYzJfbWFnACkJdmVjMl91bml0ACoKdmVjMl9tYWpvcgArCnZlYzJfbWlub3IALAl2ZWMyX3NpZ24ALQx2ZWM0X2FsbG9jNGYALhB2ZWM0X21hdGVyaWFsaXplAC8JdmVjNF9mcmVlADAKdmVjNF9jbG9uZQAxCnZlYzRfc2V0NGYAMgp2ZWM0X3NldDF2ADMJdmVjNF96ZXJvADQLdmVjNF9pc3plcm8ANQ12ZWM0X2VxdWFsczRmADYNdmVjNF9lcXVhbHMyZgA3DXZlYzRfZXF1YWxzMXYAOA12ZWM0X2FsbW9zdDRmADkNdmVjNF9hbG1vc3QyZgA6DXZlYzRfYWxtb3N0MXYAOwh2ZWM0X25lZwA8CHZlYzRfaW52AD0IdmVjNF9hYnMAPhB2ZWM0X3RyYW5zbGF0ZTRmAD8QdmVjNF90cmFuc2xhdGUyZgBAEHZlYzRfdHJhbnNsYXRlMXYAQQp2ZWM0X2FkZDRmAEIKdmVjNF9hZGQyZgBDCnZlYzRfYWRkMXYARAp2ZWM0X3N1YjRmAEUKdmVjNF9zdWIyZgBGCnZlYzRfc3ViMXYARwx2ZWM0X3NjYWxlNGYASAx2ZWM0X3NjYWxlMmYASQx2ZWM0X3NjYWxlMWYASgx2ZWM0X3NjYWxlMXYASwp2ZWM0X2Zsb29yAEwJdmVjNF9jZWlsAE0KdmVjNF90cnVuYwBOCnZlYzRfZnJhY3QATwp2ZWM0X2RvdDRmAFAKdmVjNF9kb3QyZgBRCnZlYzRfZG90MXYAUgl2ZWM0X21hZzIAUwh2ZWM0X21hZwBUCXZlYzRfdW5pdABVCnZlYzRfbWFqb3IAVgp2ZWM0X21pbm9yAFcJdmVjNF9zaWduAFgKbWF0M19hbGxvYwBZEG1hdDNfbWF0ZXJpYWxpemUAWgltYXQzX2ZyZWUAWwptYXQzX2Nsb25lAFwKbWF0M19zZXQxbQBdC21hdDNfZmlsbDFmAF4KbWF0M19zZXQxZgBfDG1hdDNfY29sMWkzZgBgDG1hdDNfcm93MWkzZgBhDW1hdDNfaWRlbnRpdHkAYgxtYXQzX3NjYWxlMWYAYw5tYXQzX3RyYW5zcG9zZQBkCG1hdDNfZGV0AGUNbWF0M19hcHBlbmQxbQBmEG1hdDNfdHJhbnNsYXRlMmYAZw1tYXQzX3JvdGF0ZTFmAGgMbWF0M19zY2FsZTJmAGkKbWF0NF9hbGxvYwBqEG1hdDRfbWF0ZXJpYWxpemUAawltYXQ0X2ZyZWUAbAptYXQ0X2Nsb25lAG0KbWF0NF9zZXQxbQBuC21hdDRfZmlsbDFmAG8KbWF0NF9zZXQxZgBwDG1hdDRfY29sMWk0ZgBxDG1hdDRfcm93MWk0ZgByDW1hdDRfaWRlbnRpdHkAcwxtYXQ0X3NjYWxlMWYAdA5tYXQ0X3RyYW5zcG9zZQB1CG1hdDRfZGV0AHYNbWF0NF9hcHBlbmQxbQB3EG1hdDRfdHJhbnNsYXRlM2YAeAxtYXQ0X3JvdGF0ZVgAeQxtYXQ0X3JvdGF0ZVkAegxtYXQ0X3JvdGF0ZVoAewxtYXQ0X3NjYWxlM2YAfAxyZWN0X2FsbG9jNGYAfQpyZWN0X3NldDRmAH4McmVjdF9hbGxvYzJmAH8LcmVjdF9yZXNpemUAgAEQcmVjdF9tYXRlcmlhbGl6ZQCBAQlyZWN0X2ZyZWUAggEKcmVjdF9jbG9uZQCDAQlyZWN0X3plcm8AhAEKcmVjdF9yZXNldACFAQ1yZWN0X2V4dGVuZDJmAIYBDXJlY3RfZXh0ZW5kMXYAhwEQcmVjdF90cmFuc2xhdGUyZgCIARByZWN0X3RyYW5zbGF0ZTF2AIkBC3JlY3RfY2VudGVyAIoBCnJlY3Rfc2V0MXIAiwENcmVjdF9lcXVhbHM0ZgCMAQ1yZWN0X2VxdWFsczFyAI0BD3JlY3RfY29udGFpbnM0ZgCOAQ9yZWN0X2NvbnRhaW5zMXIAjwEPcmVjdF9jb250YWluczJmAJABD3JlY3RfY29udGFpbnMxdgCRAQxyZWN0X3VuaW9uNGYAkgEMcmVjdF91bmlvbjFyAJMBEXJlY3RfaW50ZXJzZWN0czRmAJQBEXJlY3RfaW50ZXJzZWN0czFyAJUBE3JlY3RfaW50ZXJzZWN0aW9uNGYAlgETcmVjdF9pbnRlcnNlY3Rpb24xcgCXAQ1yZWN0X3Jlc2l6ZUJ5AJgBCnJlY3Rfd2lkdGgAmQELcmVjdF9oZWlnaHQAmgEMcmVjdF9pc1JpZ2h0AJsBCXJlY3RfYXJlYQCcAQpyZWN0X2Zsb29yAJ0BCXJlY3RfY2VpbACeAQpyZWN0X3RydW5jAJ8BCnJlY3RfZnJhY3QAoAEIAQgK82yZAUcAAkACQAJAQcgJQQBBAf5IAgAOAgABAgtBgAhBAEHIAfwLAEHICUEC%2FhcCAEHICUF%2F%2FgACABoMAQtByAlBAUJ%2F%2FgECABoLCx4BAX9BCBCAgICAACICIAG2OAIEIAIgALY4AgAgAgsEACAACwoAIAAQgYCAgAALHAEBfiAAKQIAIQFBCBCAgICAACIAIAE3AgAgAAsSACAAIAK2OAIEIAAgAbY4AgALDAAgACABKQIANwIACwkAIABCADcCAAsnAQF%2FQQAhAQJAIAAqAgBDAAAAAFwNACAAKgIEQwAAAABbIQELIAELHAACQCAAKgIAuyABYQ0AQQAPCyAAKgIEuyACYQsgAAJAIAAqAgAgASoCAFsNAEEADwsgACoCBCABKgIEWwssAQF%2FQQAhBAJAIAAqAgC7IAGhmSADY0UNACAAKgIEuyACoZkgA2MhBAsgBAsyAQF%2FQQAhAwJAIAAqAgAgASoCAJOLuyACY0UNACAAKgIEIAEqAgSTi7sgAmMhAwsgAwsYACAAIAAqAgCMOAIAIAAgACoCBIw4AgQLIgAgAEMAAIA%2FIAAqAgCVOAIAIABDAACAPyAAKgIElTgCBAsYACAAIAAqAgCLOAIAIAAgACoCBIs4AgQLIAAgACAAKgIAuyABoLY4AgAgACAAKgIEuyACoLY4AgQLIgAgACABKgIAIAAqAgCSOAIAIAAgASoCBCAAKgIEkjgCBAtaAgF9A3wgACoCACEEIAEQgoCAgAAhBSAAIAAqAgS7IAOhtrsiBiABEIOAgIAAIgGiIAUgBLsgAqG2uyIHoqEgA6C2OAIEIAAgByABoiAFIAaioCACoLY4AgALIAAgACAAKgIAuyABoLY4AgAgACAAKgIEuyACoLY4AgQLIgAgACABKgIAIAAqAgCSOAIAIAAgASoCBCAAKgIEkjgCBAsgACAAIAAqAgC7IAGhtjgCACAAIAAqAgS7IAKhtjgCBAsiACAAIAAqAgAgASoCAJM4AgAgACAAKgIEIAEqAgSTOAIECyAAIAAgACoCALsgAaK2OAIAIAAgACoCBLsgAaK2OAIECyAAIAAgACoCALsgAaK2OAIAIAAgACoCBLsgAqK2OAIECyIAIAAgASoCACAAKgIAlDgCACAAIAEqAgQgACoCBJQ4AgQLGAAgACAAKgIAjjgCACAAIAAqAgSOOAIECxgAIAAgACoCAI04AgAgACAAKgIEjTgCBAtiAgF9AX8CQAJAIAAqAgAiAYtDAAAAT11FDQAgAaghAgwBC0GAgICAeCECCyAAIAKyOAIAAkACQCAAKgIEIgGLQwAAAE9dRQ0AIAGoIQIMAQtBgICAgHghAgsgACACsjgCBAtoAgF9AX8CQAJAIAAqAgAiAYtDAAAAT11FDQAgAaghAgwBC0GAgICAeCECCyAAIAEgArKTOAIAAkACQCAAKgIEIgGLQwAAAE9dRQ0AIAGoIQIMAQtBgICAgHghAgsgACABIAKykzgCBAsVACAAKgIAuyABoiAAKgIEuyACoqALGgAgACoCACABKgIAlCAAKgIEIAEqAgSUkrsLGgEBfSAAKgIAIgEgAZQgACoCBCIBIAGUkrsLGwEBfSAAKgIAIgEgAZQgACoCBCIBIAGUkrufC1wCAn0BfAJAAkAgACoCACIBQwAAAABcDQAgACoCBEMAAAAAWw0BCyAARAAAAAAAAPA%2FIAEgAZQgACoCBCICIAKUkrufoyIDIAK7orY4AgQgACADIAG7orY4AgALCxoAIAAgACoCAIsgACoCBIteQQJ0akEANgIACxoAIAAgACoCAIsgACoCBItdQQJ0akEANgIAC1oBAX0gAEMAAIC%2FQwAAgD8gACoCACIBQwAAAABdG0MAAAAAIAFDAAAAAFwbOAIAIABDAACAv0MAAIA%2FIAAqAgQiAUMAAAAAXRtDAAAAACABQwAAAABcGzgCBAsuAQF%2FQRAQgICAgAAiBCADtjgCDCAEIAK2OAIIIAQgAbY4AgQgBCAAtjgCACAECwQAIAALCgAgABCBgICAAAsqAQJ%2BIAApAgAhASAAKQIIIQJBEBCAgICAACIAIAI3AgggACABNwIAIAALIgAgACAEtjgCDCAAIAO2OAIIIAAgArY4AgQgACABtjgCAAsWACAAIAEpAgA3AgAgACABKQIINwIICxMAIABCADcCACAAQQhqQgA3AgALQQEBf0EAIQECQCAAKgIAQwAAAABcDQAgACoCBEMAAAAAXA0AIAAqAghDAAAAAFwNACAAKgIMQwAAAABbIQELIAELOQEBf0EAIQUCQCAAKgIAuyABYg0AIAAqAgS7IAJiDQAgACoCCLsgA2INACAAKgIMuyAEYSEFCyAFCxwAAkAgACoCALsgAWENAEEADwsgACoCBLsgAmELQQEBf0EAIQICQCAAKgIAIAEqAgBcDQAgACoCBCABKgIEXA0AIAAqAgggASoCCFwNACAAKgIMIAEqAgxbIQILIAILTAEBf0EAIQYCQCAAKgIAuyABoZkgBWVFDQAgACoCBLsgAqGZIAVlRQ0AIAAqAgi7IAOhmSAFZUUNACAAKgIMuyAEoZkgBWUhBgsgBgssAQF%2FQQAhBAJAIAAqAgC7IAGhmSADZUUNACAAKgIEuyACoZkgA2UhBAsgBAtYAQF%2FQQAhAwJAIAAqAgAgASoCAJOLuyACZUUNACAAKgIEIAEqAgSTi7sgAmVFDQAgACoCCCABKgIIk4u7IAJlRQ0AIAAqAgwgASoCDJOLuyACZSEDCyADCy4AIAAgACoCAIw4AgAgACAAKgIEjDgCBCAAIAAqAgiMOAIIIAAgACoCDIw4AgwLQgAgAEMAAIA%2FIAAqAgCVOAIAIABDAACAPyAAKgIElTgCBCAAQwAAgD8gACoCCJU4AgggAEMAAIA%2FIAAqAgyVOAIMCy4AIAAgACoCAIs4AgAgACAAKgIEizgCBCAAIAAqAgiLOAIIIAAgACoCDIs4AgwLPgAgACAAKgIAuyABoLY4AgAgACAAKgIEuyACoLY4AgQgACAAKgIIuyADoLY4AgggACAAKgIMuyAEoLY4AgwLIAAgACAAKgIAuyABoLY4AgAgACAAKgIEuyACoLY4AgQLQgAgACABKgIAIAAqAgCSOAIAIAAgASoCBCAAKgIEkjgCBCAAIAEqAgggACoCCJI4AgggACABKgIMIAAqAgySOAIMCz4AIAAgACoCALsgAaC2OAIAIAAgACoCBLsgAqC2OAIEIAAgACoCCLsgA6C2OAIIIAAgACoCDLsgBKC2OAIMCyAAIAAgACoCALsgAaC2OAIAIAAgACoCBLsgAqC2OAIEC0IAIAAgASoCACAAKgIAkjgCACAAIAEqAgQgACoCBJI4AgQgACABKgIIIAAqAgiSOAIIIAAgASoCDCAAKgIMkjgCDAs%2BACAAIAAqAgC7IAGhtjgCACAAIAAqAgS7IAKhtjgCBCAAIAAqAgi7IAOhtjgCCCAAIAAqAgy7IAShtjgCDAsgACAAIAAqAgC7IAGhtjgCACAAIAAqAgS7IAKhtjgCBAtCACAAIAAqAgAgASoCAJM4AgAgACAAKgIEIAEqAgSTOAIEIAAgACoCCCABKgIIkzgCCCAAIAAqAgwgASoCDJM4AgwLPgAgACAAKgIAuyABorY4AgAgACAAKgIEuyACorY4AgQgACAAKgIIuyADorY4AgggACAAKgIMuyAEorY4AgwLIAAgACAAKgIAuyABorY4AgAgACAAKgIEuyACorY4AgQLPgAgACAAKgIAuyABorY4AgAgACAAKgIEuyABorY4AgQgACAAKgIIuyABorY4AgggACAAKgIMuyABorY4AgwLQgAgACABKgIAIAAqAgCUOAIAIAAgASoCBCAAKgIElDgCBCAAIAEqAgggACoCCJQ4AgggACABKgIMIAAqAgyUOAIMCy4AIAAgACoCAI44AgAgACAAKgIEjjgCBCAAIAAqAgiOOAIIIAAgACoCDI44AgwLLgAgACAAKgIAjTgCACAAIAAqAgSNOAIEIAAgACoCCI04AgggACAAKgIMjTgCDAu%2BAQIBfQF%2FAkACQCAAKgIAIgGLQwAAAE9dRQ0AIAGoIQIMAQtBgICAgHghAgsgACACsjgCAAJAAkAgACoCBCIBi0MAAABPXUUNACABqCECDAELQYCAgIB4IQILIAAgArI4AgQCQAJAIAAqAggiAYtDAAAAT11FDQAgAaghAgwBC0GAgICAeCECCyAAIAKyOAIIAkACQCAAKgIMIgGLQwAAAE9dRQ0AIAGoIQIMAQtBgICAgHghAgsgACACsjgCDAvKAQIBfQF%2FAkACQCAAKgIAIgGLQwAAAE9dRQ0AIAGoIQIMAQtBgICAgHghAgsgACABIAKykzgCAAJAAkAgACoCBCIBi0MAAABPXUUNACABqCECDAELQYCAgIB4IQILIAAgASACspM4AgQCQAJAIAAqAggiAYtDAAAAT11FDQAgAaghAgwBC0GAgICAeCECCyAAIAEgArKTOAIIAkACQCAAKgIMIgGLQwAAAE9dRQ0AIAGoIQIMAQtBgICAgHghAgsgACABIAKykzgCDAspACAAKgIMuyAEoiAAKgIIuyADoiAAKgIAuyABoiAAKgIEuyACoqCgoAsVACAAKgIAuyABoiAAKgIEuyACoqALMgAgACoCDCABKgIMlCAAKgIIIAEqAgiUIAAqAgAgASoCAJQgACoCBCABKgIElJKSkrsLMAEBfSAAKgIMIgEgAZQgACoCCCIBIAGUIAAqAgAiASABlCAAKgIEIgEgAZSSkpK7CzEBAX0gACoCDCIBIAGUIAAqAggiASABlCAAKgIAIgEgAZQgACoCBCIBIAGUkpKSu58LpAECBH0BfAJAAkAgACoCACIBQwAAAABcDQAgACoCBEMAAAAAXA0AIAAqAghDAAAAAFwNACAAKgIMQwAAAABbDQELIABEAAAAAAAA8D8gACoCDCICIAKUIAAqAggiAyADlCABIAGUIAAqAgQiBCAElJKSkrufoyIFIAK7orY4AgwgACAFIAO7orY4AgggACAFIAS7orY4AgQgACAFIAG7orY4AgALC6oBAgF%2FBH0gAEEMaiEBIAAqAgyLIQIgACoCCIshAwJAAkAgACoCAIsiBCAAKgIEiyIFXkUNACAEIANeRQ0AIAQgAl5FDQAgAEIANwIEDAELAkAgBSAEXkUNACAFIANeRQ0AIAUgAl5FDQAgAEEANgIIIABBADYCAAwBCyAAQgA3AgAgASAAQQhqIgAgAyACXhsgACADIAVeGyAAIAMgBF4bIQELIAFBADYCAAuqAQIBfwR9IABBDGohASAAKgIMiyECIAAqAgiLIQMCQAJAIAAqAgCLIgQgACoCBIsiBV1FDQAgBCADXUUNACAEIAJdRQ0AIABCADcCBAwBCwJAIAUgBF1FDQAgBSADXUUNACAFIAJdRQ0AIABBADYCCCAAQQA2AgAMAQsgAEIANwIAIAEgAEEIaiIAIAMgAl0bIAAgAyAFXRsgACADIARdGyEBCyABQQA2AgALsAEBAX0gAEMAAIC%2FQwAAgD8gACoCACIBQwAAAABdG0MAAAAAIAFDAAAAAFwbOAIAIABDAACAv0MAAIA%2FIAAqAgQiAUMAAAAAXRtDAAAAACABQwAAAABcGzgCBCAAQwAAgL9DAACAPyAAKgIIIgFDAAAAAF0bQwAAAAAgAUMAAAAAXBs4AgggAEMAAIC%2FQwAAgD8gACoCDCIBQwAAAABdG0MAAAAAIAFDAAAAAFwbOAIMCwoAQSQQgICAgAALBAAgAAsKACAAEIGAgIAAC1gBAX9BJBCAgICAACIBQSBqIABBIGooAgA2AgAgAUEYaiAAQRhqKQIANwIAIAFBEGogAEEQaikCADcCACABQQhqIABBCGopAgA3AgAgASAAKQIANwIAIAELTAAgACABKQIANwIAIABBIGogAUEgaigCADYCACAAQRhqIAFBGGopAgA3AgAgAEEQaiABQRBqKQIANwIAIABBCGogAUEIaikCADcCAAsoAgF9AX8gAbYhAkEAIQMDQCAAIANqIAI4AgAgA0EEaiIDQSRHDQALCywCAX0BfyABtiECQXwhAwNAIAAgAjgCACAAQRBqIQAgA0EEaiIDQQVJDQALCywAAkAgAUECSw0AIAAgAUEMbGoiASAEtjgCCCABIAO2OAIEIAEgArY4AgALCywAAkAgAUECSw0AIAAgAUECdGoiASAEtjgCGCABIAO2OAIMIAEgArY4AgALC1gBAX8gAEIANwIAIABBIGpBADYCACAAQRhqQgA3AgAgAEEQakIANwIAIABBCGpCADcCAEF8IQEDQCAAQYCAgPwDNgIAIABBEGohACABQQRqIgFBBUkNAAsLKwECf0EAIQIDQCAAIAJqIgMgAyoCALsgAaK2OAIAIAJBBGoiAkEkRw0ACwvlAQEFf0EAIQFBAEIANwKYiICAAEEAQgA3ApCIgIAAQQBCADcCiIiAgABBAEIANwKAiICAAEEAQQA2AqCIgIAAQYCIgIAAIQIgACEDA0AgAyEEQQAhBQNAIAIgBWogBCoCADgCACAEQQxqIQQgBUEEaiIFQQxHDQALIANBBGohAyACQQxqIQIgAUEBaiIBQQNHDQALIABBIGpBACgCoIiAgAA2AgAgAEEYakEAKQKYiICAADcCACAAQRBqQQApApCIgIAANwIAIABBCGpBACkCiIiAgAA3AgAgAEEAKQKAiICAADcCAAtXAQV9IAAqAgggACoCDCIBIAAqAhwiApQgACoCGCIDIAAqAhAiBJSTlCAAKgIAIAQgACoCICIFlCACIAAqAhQiBJSTlCABIAWUIAMgBJSTIAAqAgSUk5ILpQQCBH8DfUEAIABBCGoiAikCADcCiIiAgABBACAAKQIANwKAiICAAEEAIABBIGoiAygCADYCoIiAgABBACAAQRhqIgQpAgA3ApiIgIAAQQAgAEEQaiIFKQIANwKQiICAACAAIAEqAghBACoCmIiAgACUIAEqAgBBACoCgIiAgACUIAEqAgRBACoCjIiAgACUkpI4AgAgACABKgIIQQAqApyIgIAAlCABKgIAQQAqAoSIgIAAlCABKgIEQQAqApCIgIAAlJKSOAIEIAIgASoCCEEAKgKgiICAAJQgASoCAEEAKgKIiICAAJQgASoCBEEAKgKUiICAAJSSkjgCACAAIAEqAhRBACoCmIiAgACUIAEqAgxBACoCgIiAgAAiBpQgASoCEEEAKgKMiICAAJSSkjgCDCAFIAEqAhRBACoCnIiAgACUIAEqAgxBACoChIiAgAAiB5QgASoCEEEAKgKQiICAAJSSkjgCACAAIAEqAhRBACoCoIiAgACUIAEqAgxBACoCiIiAgAAiCJQgASoCEEEAKgKUiICAAJSSkjgCFCAEIAEqAiBBACoCmIiAgACUIAYgASoCGJQgASoCHEEAKgKMiICAAJSSkjgCACAAIAEqAiBBACoCnIiAgACUIAcgASoCGJQgASoCHEEAKgKQiICAAJSSkjgCHCADIAEqAiBBACoCoIiAgACUIAggASoCGJQgASoCHEEAKgKUiICAAJSSkjgCAAuAAgECfwJAAkAgAUQAAAAAAAAAAGINACACRAAAAAAAAAAAYQ0BC0EAIAApAgA3AoCIgIAAQQAgAEEIaikCADcCiIiAgABBACAAQRhqIgMpAgA3ApiIgIAAQQAgAEEgaiIEKAIANgKgiICAAEEAIABBEGopAgA3ApCIgIAAIAMgAUEAKgKAiICAALuiQQAqAoyIgIAAuyACoqBBACoCmIiAgAC7oLY4AgAgACABQQAqAoSIgIAAu6JBACoCkIiAgAC7IAKioEEAKgKciICAALugtjgCHCAEIAFBACoCiIiAgAC7okEAKgKUiICAALsgAqKgQQAqAqCIgIAAu6C2OAIACwvIAQICfwJ9AkAgAUQAAAAAAAAAAGENAEEAQgA3AryIgIAAQQBCADcCtIiAgABBAEIANwKsiICAAEEAQgA3AqSIgIAAQQBBADYCxIiAgABBfCECQaSIgIAAIQMDQCADQYCAgPwDNgIAIANBEGohAyACQQRqIgJBBUkNAAtBACABEIOAgIAAtiIEOAK0iICAAEEAIAEQgoCAgAC2IgU4ArCIgIAAQQAgBDgCpIiAgABBACAFjDgCqIiAgAAgAEGkiICAABDmgICAAAsLsAEBAn8CQAJAIAFEAAAAAAAA8D9iDQAgAkQAAAAAAADwP2ENAQtBAEIANwK8iICAAEEAQgA3ArSIgIAAQQBCADcCrIiAgABBAEIANwKkiICAAEEAQQA2AsSIgIAAQXwhA0GkiICAACEEA0AgBEGAgID8AzYCACAEQRBqIQQgA0EEaiIDQQVJDQALQQAgArY4ArSIgIAAQQAgAbY4AqSIgIAAIABBpIiAgAAQ5oCAgAALCwsAQcAAEICAgIAACwQAIAALCgAgABCBgICAAAuJAQEBf0HAABCAgICAACIBQThqIABBOGopAgA3AgAgAUEwaiAAQTBqKQIANwIAIAFBKGogAEEoaikCADcCACABQSBqIABBIGopAgA3AgAgAUEYaiAAQRhqKQIANwIAIAFBEGogAEEQaikCADcCACABQQhqIABBCGopAgA3AgAgASAAKQIANwIAIAELfAAgACABKQIANwIAIABBOGogAUE4aikCADcCACAAQTBqIAFBMGopAgA3AgAgAEEoaiABQShqKQIANwIAIABBIGogAUEgaikCADcCACAAQRhqIAFBGGopAgA3AgAgAEEQaiABQRBqKQIANwIAIABBCGogAUEIaikCADcCAAspAgF9AX8gAbYhAkEAIQMDQCAAIANqIAI4AgAgA0EEaiIDQcAARw0ACwssAgF9AX8gAbYhAkF7IQMDQCAAIAI4AgAgAEEUaiEAIANBBWoiA0ELSQ0ACws0AAJAIAFBA0sNACAAIAFBBHRqIgEgBbY4AgwgASAEtjgCCCABIAO2OAIEIAEgArY4AgALCzQAAkAgAUEDSw0AIAAgAUECdGoiASAFtjgCMCABIAS2OAIgIAEgA7Y4AhAgASACtjgCAAsLdgEBfyAAQgA3AgAgAEE4akIANwIAIABBMGpCADcCACAAQShqQgA3AgAgAEEgakIANwIAIABBGGpCADcCACAAQRBqQgA3AgAgAEEIakIANwIAQXshAQNAIABBgICA%2FAM2AgAgAEEUaiEAIAFBBWoiAUELSQ0ACwssAQJ%2FQQAhAgNAIAAgAmoiAyADKgIAuyABorY4AgAgAkEEaiICQcAARw0ACwu5AgEFf0EAIQFBAEIANwKAiYCAAEEAQgA3AviIgIAAQQBCADcC8IiAgABBAEIANwLoiICAAEEAQgA3AuCIgIAAQQBCADcC2IiAgABBAEIANwLQiICAAEEAQgA3AsiIgIAAQciIgIAAIQIgACEDA0BBACEEIAMhBQNAIAIgBGogBSoCADgCACAFQRBqIQUgBEEEaiIEQRBHDQALIAJBEGohAiADQQRqIQMgAUEBaiIBQQRHDQALIABBOGpBACkCgImAgAA3AgAgAEEwakEAKQL4iICAADcCACAAQShqQQApAvCIgIAANwIAIABBIGpBACkC6IiAgAA3AgAgAEEYakEAKQLgiICAADcCACAAQRBqQQApAtiIgIAANwIAIABBCGpBACkC0IiAgAA3AgAgAEEAKQLIiICAADcCAAvhAQEOfSAAKgIgIAAqAjQiASAAKgIIIgIgACoCHCIDlCAAKgIMIgQgACoCGCIFlJMiBpQgACoCBCIHIAUgACoCPCIIlCADIAAqAjgiCZSTIgqUIAIgCJQgBCAJlJMiCyAAKgIUIgyUk5KUIAAqAgAgASAFIAAqAiwiDZQgAyAAKgIoIgWUkyIOlCAMIAUgCJQgDSAJlJMiCJQgCiAAKgIkIgOUk5KUIAEgAiANlCAEIAWUkyIClCAHIAiUIAsgA5STkiAAKgIQlJOSIAAqAjAgAyAGlCAHIA6UIAIgDJSTkpSTC5UJAgd%2FCH1BACAAKQIANwLIiICAAEEAIABBOGoiAikCADcCgImAgABBACAAQTBqIgMpAgA3AviIgIAAQQAgAEEoaiIEKQIANwLwiICAAEEAIABBIGoiBSkCADcC6IiAgABBACAAQRhqIgYpAgA3AuCIgIAAQQAgAEEQaiIHKQIANwLYiICAAEEAIABBCGoiCCkCADcC0IiAgAAgAEEAKgL4iICAACABKgIMlEEAKgLoiICAACABKgIIlEEAKgLIiICAACABKgIAlEEAKgLYiICAACABKgIElJKSkjgCACAAQQAqAvyIgIAAIAEqAgyUQQAqAuyIgIAAIAEqAgiUQQAqAsyIgIAAIAEqAgCUQQAqAtyIgIAAIAEqAgSUkpKSOAIEIAhBACoCgImAgAAgASoCDJRBACoC8IiAgAAgASoCCJRBACoC0IiAgAAgASoCAJRBACoC4IiAgAAgASoCBJSSkpI4AgAgAEEAKgKEiYCAACABKgIMlEEAKgL0iICAACABKgIIlEEAKgLUiICAACABKgIAlEEAKgLkiICAACABKgIElJKSkjgCDCAHQQAqAviIgIAAIAEqAhyUQQAqAuiIgIAAIAEqAhiUQQAqAsiIgIAAIgkgASoCEJRBACoC2IiAgAAgASoCFJSSkpI4AgAgAEEAKgL8iICAACABKgIclEEAKgLsiICAACABKgIYlEEAKgLMiICAACIKIAEqAhCUQQAqAtyIgIAAIAEqAhSUkpKSOAIUIAZBACoCgImAgAAgASoCHJRBACoC8IiAgAAgASoCGJRBACoC0IiAgAAiCyABKgIQlEEAKgLgiICAACABKgIUlJKSkjgCACAAQQAqAoSJgIAAIAEqAhyUQQAqAvSIgIAAIAEqAhiUQQAqAtSIgIAAIgwgASoCEJRBACoC5IiAgAAgASoCFJSSkpI4AhwgBUEAKgL4iICAACABKgIslEEAKgLoiICAACABKgIolCAJIAEqAiCUQQAqAtiIgIAAIg0gASoCJJSSkpI4AgAgAEEAKgL8iICAACABKgIslEEAKgLsiICAACABKgIolCAKIAEqAiCUQQAqAtyIgIAAIg4gASoCJJSSkpI4AiQgBEEAKgKAiYCAACABKgIslEEAKgLwiICAACABKgIolCALIAEqAiCUQQAqAuCIgIAAIg8gASoCJJSSkpI4AgAgAEEAKgKEiYCAACABKgIslEEAKgL0iICAACABKgIolCAMIAEqAiCUQQAqAuSIgIAAIhAgASoCJJSSkpI4AiwgA0EAKgL4iICAACABKgI8lEEAKgLoiICAACABKgI4lCAJIAEqAjCUIA0gASoCNJSSkpI4AgAgAEEAKgL8iICAACABKgI8lEEAKgLsiICAACABKgI4lCAKIAEqAjCUIA4gASoCNJSSkpI4AjQgAkEAKgKAiYCAACABKgI8lEEAKgLwiICAACABKgI4lCALIAEqAjCUIA8gASoCNJSSkpI4AgAgAEEAKgKEiYCAACABKgI8lEEAKgL0iICAACABKgI4lCAMIAEqAjCUIBAgASoCNJSSkpI4AjwLpQMBAn8CQAJAIAFEAAAAAAAAAABiDQAgAkQAAAAAAAAAAGINACADRAAAAAAAAAAAYQ0BC0EAIAApAgA3AsiIgIAAQQAgAEEQaikCADcC2IiAgABBACAAQSBqKQIANwLoiICAAEEAIABBMGoiBCkCADcC%2BIiAgABBACAAQThqIgUpAgA3AoCJgIAAQQAgAEEoaikCADcC8IiAgABBACAAQRhqKQIANwLgiICAAEEAIABBCGopAgA3AtCIgIAAIAQgA0EAKgLoiICAALuiIAFBACoCyIiAgAC7okEAKgLYiICAALsgAqKgoEEAKgL4iICAALugtjgCACAAIANBACoC7IiAgAC7oiABQQAqAsyIgIAAu6JBACoC3IiAgAC7IAKioKBBACoC%2FIiAgAC7oLY4AjQgBSADQQAqAvCIgIAAu6IgAUEAKgLQiICAALuiQQAqAuCIgIAAuyACoqCgQQAqAoCJgIAAu6C2OAIAIAAgA0EAKgL0iICAALuiIAFBACoC1IiAgAC7okEAKgLkiICAALsgAqKgoEEAKgKEiYCAALugtjgCPAsL6QECAn8CfQJAIAFEAAAAAAAAAABhDQBBAEIANwLAiYCAAEEAQgA3AriJgIAAQQBCADcCsImAgABBAEIANwKoiYCAAEEAQgA3AqCJgIAAQQBCADcCmImAgABBAEIANwKQiYCAAEEAQgA3AoiJgIAAQXshAkGIiYCAACEDA0AgA0GAgID8AzYCACADQRRqIQMgAkEFaiICQQtJDQALQQAgARCDgICAALYiBDgCsImAgABBACABEIKAgIAAtiIFOAKsiYCAAEEAIAQ4ApyJgIAAQQAgBYw4AqCJgIAAIABBiImAgAAQ94CAgAALC%2BkBAgJ%2FAn0CQCABRAAAAAAAAAAAYQ0AQQBCADcCwImAgABBAEIANwK4iYCAAEEAQgA3ArCJgIAAQQBCADcCqImAgABBAEIANwKgiYCAAEEAQgA3ApiJgIAAQQBCADcCkImAgABBAEIANwKIiYCAAEF7IQJBiImAgAAhAwNAIANBgICA%2FAM2AgAgA0EUaiEDIAJBBWoiAkELSQ0AC0EAIAEQg4CAgAC2IgQ4ArCJgIAAQQAgARCCgICAALYiBTgCkImAgABBACAEOAKIiYCAAEEAIAWMOAKoiYCAACAAQYiJgIAAEPeAgIAACwvpAQICfwJ9AkAgAUQAAAAAAAAAAGENAEEAQgA3AsCJgIAAQQBCADcCuImAgABBAEIANwKwiYCAAEEAQgA3AqiJgIAAQQBCADcCoImAgABBAEIANwKYiYCAAEEAQgA3ApCJgIAAQQBCADcCiImAgABBeyECQYiJgIAAIQMDQCADQYCAgPwDNgIAIANBFGohAyACQQVqIgJBC0kNAAtBACABEIOAgIAAtiIEOAKciYCAAEEAIAEQgoCAgAC2IgU4ApiJgIAAQQAgBDgCiImAgABBACAFjDgCjImAgAAgAEGIiYCAABD3gICAAAsL6wEBAn8CQAJAIAFEAAAAAAAA8D9iDQAgAkQAAAAAAADwP2INACADRAAAAAAAAPA%2FYQ0BC0EAQgA3AsCJgIAAQQBCADcCuImAgABBAEIANwKwiYCAAEEAQgA3AqiJgIAAQQBCADcCoImAgABBAEIANwKYiYCAAEEAQgA3ApCJgIAAQQBCADcCiImAgABBeyEEQYiJgIAAIQUDQCAFQYCAgPwDNgIAIAVBFGohBSAEQQVqIgRBC0kNAAtBACADtjgCsImAgABBACACtjgCnImAgABBACABtjgCiImAgAAgAEGIiYCAABD3gICAAAsLWAEBf0EYEICAgIAAIgQgA7Y4AgwgBCACtjgCCCAEIAG2OAIEIAQgALY4AgAgBCABIAOgRAAAAAAAAOA%2ForY4AhQgBCAAIAKgRAAAAAAAAOA%2ForY4AhAgBAtMACAAIAS2OAIMIAAgA7Y4AgggACACtjgCBCAAIAG2OAIAIAAgAiAEoEQAAAAAAADgP6K2OAIUIAAgASADoEQAAAAAAADgP6K2OAIQC5ABAQF%2FQRgQgICAgAAiA0IANwIAIANBEGpCADcCACADQQhqQgA3AgACQCACDQAgA0QAAAAAAAAAACABRAAAAAAAAOA%2FoiIBobY4AgQgA0QAAAAAAAAAACAARAAAAAAAAOA%2FoiIAobY4AgALIAMgAUQAAAAAAAAAAKC2OAIMIAMgAEQAAAAAAAAAAKC2OAIIIAMLqQEBAXwCQCAERQ0AIAAqAgwgACoCBJO7IAKiIQIgACoCCCAAKgIAk7sgAaIhAQsCQAJAIANFDQAgACABIAAqAgC7oLY4AgggAiAAKgIEu6AhAQwBCyAAIAAqAhC7IgUgAUQAAAAAAADgP6IiAaG2OAIAIAAgASAFoLY4AgggACAAKgIUuyIBIAJEAAAAAAAA4D%2BiIgKhtjgCBCACIAGgIQELIAAgAbY4AgwLBAAgAAsKACAAEIGAgIAAC3QBBH0gACoCACEBIAAqAgQhAiAAKgIIIQMgACoCDCEEQRgQgICAgAAiACAEOAIMIAAgAzgCCCAAIAI4AgQgACABOAIAIAAgArsgBLugRAAAAAAAAOA%2ForY4AhQgACABuyADu6BEAAAAAAAA4D%2BitjgCECAACx0AIABCADcCACAAQRBqQgA3AgAgAEEIakIANwIACzIAIABCgICA%2FIeAgMD%2FADcCECAAQoCAgPyHgIDA%2FwA3AgAgAEKAgID8h4CAwP8ANwIIC9gBAQF8AkACQCAAKgIAuyIDRP%2F%2F%2F%2F%2F%2F%2F%2B9%2FYQ0AIAMgAWRFDQELIAAgAbY4AgALAkACQCAAKgIEuyIDRP%2F%2F%2F%2F%2F%2F%2F%2B9%2FYQ0AIAMgAmRFDQELIAAgArY4AgQLAkACQCAAKgIIuyIDRP%2F%2F%2F%2F%2F%2F%2F%2B9%2FYQ0AIAMgAWNFDQELIAAgAbY4AggLAkACQCAAKgIMuyIBRP%2F%2F%2F%2F%2F%2F%2F%2B9%2FYQ0AIAEgAmNFDQELIAAgArY4AgwLIAAgACoCACAAKgIIkkMAAAA%2FlDgCECAAIAAqAgQgACoCDJJDAAAAP5Q4AhQL3AEBA30gASoCBCECAkACQCAAKgIAIgMgASoCACIEXg0AIAO7RP%2F%2F%2F%2F%2F%2F%2F%2B9%2FYg0BCyAAIAQ4AgALAkACQCAAKgIEIgMgAl4NACADu0T%2F%2F%2F%2F%2F%2F%2F%2Fvf2INAQsgACACOAIECwJAAkAgACoCCCIDIARdDQAgA7tE%2F%2F%2F%2F%2F%2F%2F%2F739iDQELIAAgBDgCCAsCQAJAIAAqAgwiBCACXQ0AIAS7RP%2F%2F%2F%2F%2F%2F%2F%2B9%2FYg0BCyAAIAI4AgwLIAAgACoCACAAKgIIkkMAAAA%2FlDgCECAAIAAqAgQgACoCDJJDAAAAP5Q4AhQLXAAgACAAKgIAuyABoLY4AgAgACAAKgIEuyACoLY4AgQgACAAKgIIuyABoLY4AgggACAAKgIMuyACoLY4AgwgACAAKgIQuyABoLY4AhAgACAAKgIUuyACoLY4AhQLXAECfSAAIAEqAgAiAiAAKgIAkjgCACAAIAEqAgQiAyAAKgIEkjgCBCAAIAIgACoCCJI4AgggACADIAAqAgySOAIMIAAgAiAAKgIQkjgCECAAIAMgACoCFJI4AhQLpAECAX0CfAJAIANFDQAgAiAAKgIMIAAqAgQiBJO7oiAEu6AhAiABIAAqAgggACoCACIEk7uiIAS7oCEBCyAAIAEgACoCELsiBaEiASAAKgIAu6C2OAIAIAAgAiAAKgIUuyIGoSICIAAqAgS7oLY4AgQgACABIAAqAgi7oLY4AgggACACIAAqAgy7oLY4AgwgACACIAagtjgCFCAAIAEgBaC2OAIQC2IBBH0gACABKgIMIgI4AgwgACABKgIIIgM4AgggACABKgIEIgQ4AgQgACABKgIAIgU4AgAgACAEuyACu6BEAAAAAAAA4D%2BitjgCFCAAIAW7IAO7oEQAAAAAAADgP6K2OAIQCzkBAX9BACEFAkAgACoCALsgAWINACAAKgIIuyADYg0AIAAqAgS7IAJiDQAgACoCDLsgBGEhBQsgBQtBAQF%2FQQAhAgJAIAAqAgAgASoCAFwNACAAKgIIIAEqAghcDQAgACoCBCABKgIEXA0AIAAqAgwgASoCDFshAgsgAgtZAQF%2FQQAhBQJAIAAqAgC7IAEQhICAgAAgAWINACAAKgIEuyACEISAgIAAIAJiDQAgACoCCLsgAxCFgICAACADYg0AIAAqAgy7IAQQhYCAgAAgBGEhBQsgBQt9AwF%2FAXwCfUEAIQICQCAAKgIAuyABKgIAuyIDEISAgIAAIANiDQAgASoCDCEEIAEqAgghBSAAKgIEuyABKgIEuyIDEISAgIAAIANiDQAgACoCCLsgBbsiAxCFgICAACADYg0AIAAqAgy7IAS7IgMQhYCAgAAgA2EhAgsgAgtIAQF%2FQQAhBAJAIAAqAgC7IAOhIAFlRQ0AIAAqAgi7IAOgIAFmRQ0AIAAqAgS7IAOhIAJlRQ0AIAAqAgy7IAOgIAJmIQQLIAQLVgIBfwF8QQAhAwJAIAAqAgC7IAKhIAEqAgC7IgRlRQ0AIAAqAgi7IAKgIARmRQ0AIAAqAgS7IAKhIAEqAgS7IgRlRQ0AIAAqAgy7IAKgIARmIQMLIAMLUgAgACAAKgIAuyABEIWAgIAAtjgCACAAIAAqAgS7IAIQhYCAgAC2OAIEIAAgACoCCLsgAxCEgICAALY4AgggACAAKgIMuyAEEISAgIAAtjgCDAtWACAAIAAqAgAgASoCABCGgICAADgCACAAIAAqAgQgASoCBBCGgICAADgCBCAAIAAqAgggASoCCBCHgICAADgCCCAAIAAqAgwgASoCDBCHgICAADgCDAt7AQF9IAAqAgghBSAAKgIAuyABEISAgIAAIQEgBbsgAxCFgICAACEDIAAqAgwhBSAAKgIEuyACEISAgIAAIQIgBbsgBBCFgICAACACoUQAAAAAAAAAABCEgICAACADIAGhRAAAAAAAAAAAEISAgIAAokQAAAAAAAAAAGQLfwEDfSAAKgIAIAEqAgAQh4CAgAAhAiAAKgIIIAEqAggQhoCAgAAhAyAAKgIEIAEqAgQQh4CAgAAhBCAAKgIMIAEqAgwQhoCAgAC7IAS7oUQAAAAAAAAAABCEgICAACADuyACu6FEAAAAAAAAAAAQhICAgACiRAAAAAAAAAAAZAuRAQEEfSAAIAAqAgC7IAEQhICAgAC2IgU4AgAgACAAKgIEuyACEISAgIAAtiIGOAIEIAAgACoCCLsgAxCFgICAALYiBzgCCCAAIAAqAgy7IAQQhYCAgAC2Igg4AgwgCCAGk7tEAAAAAAAAAAAQhICAgAAgByAFk7tEAAAAAAAAAAAQhICAgACiRAAAAAAAAAAAZAuVAQEEfSAAIAAqAgAgASoCABCHgICAACICOAIAIAAgACoCBCABKgIEEIeAgIAAIgM4AgQgACAAKgIIIAEqAggQhoCAgAAiBDgCCCAAIAAqAgwgASoCDBCGgICAACIFOAIMIAUgA5O7RAAAAAAAAAAAEISAgIAAIAQgApO7RAAAAAAAAAAAEISAgIAAokQAAAAAAAAAAGQLjgEBAXwCQAJAIANFDQAgACAAKgIIuyABoLY4AgggAEEMaiEDIAAqAgy7IQEMAQsgACAAKgIAuyABRAAAAAAAAOA%2FoiIEobY4AgAgACAAKgIEuyACRAAAAAAAAOA%2FoiIBobY4AgQgACAEIAAqAgi7oLY4AgggAEEMaiEDIAAqAgy7IQILIAMgASACoLY4AgALDgAgACoCCCAAKgIAk7sLDgAgACoCDCAAKgIEk7sLKAEBf0EAIQECQCAAKgIAIAAqAghfRQ0AIAAqAgQgACoCDF8hAQsgAQtlAQN9AkACQCABRQ0AQwAAAAAhAiAAKgIAIgMgACoCCCIEX0UNASAAKgIEIAAqAgxfRQ0BIAQgA5MgACoCDCAAKgIEk5S7DwsgACoCDCAAKgIEkyAAKgIIIAAqAgCTlCECCyACuwtEACAAIAAqAgCOOAIAIAAgACoCBI44AgQgACAAKgIIjjgCCCAAIAAqAgyOOAIMIAAgACoCEI44AhAgACAAKgIUjjgCFAtEACAAIAAqAgCNOAIAIAAgACoCBI04AgQgACAAKgIIjTgCCCAAIAAqAgyNOAIMIAAgACoCEI04AhAgACAAKgIUjTgCFAuaAgIBfQF%2FAkACQCAAKgIAIgGLQwAAAE9dRQ0AIAGoIQIMAQtBgICAgHghAgsgACACsjgCAAJAAkAgACoCBCIBi0MAAABPXUUNACABqCECDAELQYCAgIB4IQILIAAgArI4AgQCQAJAIAAqAggiAYtDAAAAT11FDQAgAaghAgwBC0GAgICAeCECCyAAIAKyOAIIAkACQCAAKgIMIgGLQwAAAE9dRQ0AIAGoIQIMAQtBgICAgHghAgsgACACsjgCDAJAAkAgACoCECIBi0MAAABPXUUNACABqCECDAELQYCAgIB4IQILIAAgArI4AhACQAJAIAAqAhQiAYtDAAAAT11FDQAgAaghAgwBC0GAgICAeCECCyAAIAKyOAIUC6wCAgF9AX8CQAJAIAAqAgAiAYtDAAAAT11FDQAgAaghAgwBC0GAgICAeCECCyAAIAEgArKTOAIAAkACQCAAKgIEIgGLQwAAAE9dRQ0AIAGoIQIMAQtBgICAgHghAgsgACABIAKykzgCBAJAAkAgACoCCCIBi0MAAABPXUUNACABqCECDAELQYCAgIB4IQILIAAgASACspM4AggCQAJAIAAqAgwiAYtDAAAAT11FDQAgAaghAgwBC0GAgICAeCECCyAAIAEgArKTOAIMAkACQCAAKgIQIgGLQwAAAE9dRQ0AIAGoIQIMAQtBgICAgHghAgsgACABIAKykzgCEAJAAkAgACoCFCIBi0MAAABPXUUNACABqCECDAELQYCAgIB4IQILIAAgASACspM4AhQL";let d=null;function o(){return new Promise(async(g,C)=>{var Q;A((Q=a)&&Q.__esModule?Q.default:Q,{}).then(A=>{d=A,I.bind(d),t.bind(d),B.bind(d),i.bind(d),s.bind(d),g()}).catch(C)})}export{d as module,o as init,I as Vec2,t as Vec4,B as Rect,i as Mat3,s as Mat4};
//# sourceMappingURL=froxel-math.m.js.map
