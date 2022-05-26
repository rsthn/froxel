var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire3a43"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire3a43"] = parcelRequire;
}
parcelRequire.register("hNLgQ", function(module, exports) {

$parcel$export(module.exports, "Rinn", function () { return $07eb01cb16db42c1$export$eefcfe56efaaa57d; });
$parcel$export(module.exports, "Class", function () { return $07eb01cb16db42c1$export$4c85e640eb41c31b; });
$parcel$export(module.exports, "Schema", function () { return $07eb01cb16db42c1$export$19342e026b58ebb7; });
$parcel$export(module.exports, "Template", function () { return $07eb01cb16db42c1$export$14416b8d99d47caa; });
function $parcel$export(e, t, n, r) {
    Object.defineProperty(e, t, {
        get: n,
        set: r,
        enumerable: !0,
        configurable: !0
    });
}
var $parcel$global = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof $parcel$global ? $parcel$global : {}, $parcel$modules = {}, $parcel$inits = {}, parcelRequire = $parcel$global.parcelRequire25d2;
null == parcelRequire && (parcelRequire = function(e) {
    if (e in $parcel$modules) return $parcel$modules[e].exports;
    if (e in $parcel$inits) {
        var t = $parcel$inits[e];
        delete $parcel$inits[e];
        var n = {
            id: e,
            exports: {}
        };
        return $parcel$modules[e] = n, t.call(n.exports, n, n.exports), n.exports;
    }
    var r = new Error("Cannot find module '" + e + "'");
    throw r.code = "MODULE_NOT_FOUND", r;
}, parcelRequire.register = function(e, t) {
    $parcel$inits[e] = t;
}, $parcel$global.parcelRequire25d2 = parcelRequire), parcelRequire.register("91JQY", function(module, exports) {
    $parcel$export(module.exports, "default", function() {
        return $6927c693ce3dd189$export$2e2bcd8739ae039;
    });
    var $8ogo9 = parcelRequire("8ogo9"), $6927c693ce3dd189$export$2e2bcd8739ae039 = {
        _getref: function(value, obj) {
            return "string" == typeof value ? ("#" == value.substr(0, 1) ? value = obj.get(value.substr(1)) : "@" == value.substr(0, 1) && (value = obj[value.substr(1)]), "string" == typeof value ? eval(value) : value) : value;
        },
        type: function(e, t, n, r) {
            switch(t){
                case "int":
                    if (r = parseInt(r), isNaN(r)) throw new Error(t);
                    break;
                case "float":
                    if (r = parseFloat(r), isNaN(r)) throw new Error(t);
                    break;
                case "string":
                    r = null == r ? "" : r.toString();
                    break;
                case "bit":
                    if (!0 === r || !1 === r) {
                        r = r ? 1 : 0;
                        break;
                    }
                    if (r = parseInt(r), isNaN(r)) throw new Error(t);
                    r = r ? 1 : 0;
                    break;
                case "array":
                    if ("array" == $0bc52734b49fc041$export$2e2bcd8739ae039.typeOf(r)) break;
                    if (null == r) {
                        r = [];
                        break;
                    }
                    throw new Error(t);
                case "bool":
                    if ("true" === r || !0 === r) {
                        r = !0;
                        break;
                    }
                    if ("false" === r || !1 === r) {
                        r = !1;
                        break;
                    }
                    throw new Error(t);
            }
            return r;
        },
        model: function(e, t, n, r) {
            var i = this._getref(t, e);
            if (!i) throw new Error(t);
            return r ? i.ensure(r) : new i;
        },
        cls: function(e, t, n, r) {
            var i = this._getref(t, e);
            return r ? $0bc52734b49fc041$export$2e2bcd8739ae039.ensureTypeOf(i, r) : new i;
        },
        arrayof: function(e, t, n, r) {
            var i = this._getref(t, e);
            if (r || (r = []), !i || "array" != $0bc52734b49fc041$export$2e2bcd8739ae039.typeOf(r)) throw new Error(t);
            for(var a = 0; a < r.length; a++)r[a] = $0bc52734b49fc041$export$2e2bcd8739ae039.ensureTypeOf(i, r[a]);
            return r;
        },
        arraynull: function(e, t, n, r) {
            var i = !1;
            if ("object" == $0bc52734b49fc041$export$2e2bcd8739ae039.typeOf(t) && (t.remove && (i = t.remove), t = t.value), t) return r;
            if ("array" != $0bc52734b49fc041$export$2e2bcd8739ae039.typeOf(r)) throw new Error(t);
            for(var a = 0; a < r.length; a++)if (null == r[a]) {
                if (!i) throw new Error(t);
                r.splice(a--, 1);
            }
            return r;
        },
        arraycompliant: function(e, t, n, r) {
            var i = !1;
            if ("object" == $0bc52734b49fc041$export$2e2bcd8739ae039.typeOf(t) && (t.remove && (i = t.remove), t = t.value), !t) return r;
            if ("array" != $0bc52734b49fc041$export$2e2bcd8739ae039.typeOf(r)) throw new Error(t);
            for(var a = 0; a < r.length; a++)if (null != r[a] && !r[a].isCompliant()) {
                if (!i) throw new Error(t);
                r.splice(a--, 1);
            }
            return r;
        },
        required: function(e, t, n, r) {
            if (null == r) throw new Error(t ? "" : "null");
            if ("array" === $0bc52734b49fc041$export$2e2bcd8739ae039.typeOf(r)) {
                if (0 == r.length) throw new Error(t ? "" : "null");
            } else if (0 == r.toString().length) throw new Error(t ? "" : "null");
            return r;
        },
        minlen: function(e, t, n, r) {
            if (r.toString().length < t) throw new Error(t);
            return r;
        },
        maxlen: function(e, t, n, r) {
            if (r.toString().length > t) throw new Error(t);
            return r;
        },
        minval: function(e, t, n, r) {
            if (parseFloat(r) < t) throw new Error(t);
            return r;
        },
        maxval: function(e, t, n, r) {
            if (parseFloat(r) > t) throw new Error(t);
            return r;
        },
        mincount: function(e, t, n, r) {
            if ("array" != $0bc52734b49fc041$export$2e2bcd8739ae039.typeOf(r) || r.length < t) throw new Error(t);
            return r;
        },
        maxcount: function(e, t, n, r) {
            if ("array" != $0bc52734b49fc041$export$2e2bcd8739ae039.typeOf(r) || r.length > t) throw new Error(t);
            return r;
        },
        pattern: function(e, t, n, r) {
            if (!$8ogo9.default[t].test(r.toString())) throw new Error(t);
            return r;
        },
        inset: function(e, t, n, r) {
            if ("array" != $0bc52734b49fc041$export$2e2bcd8739ae039.typeOf(t)) {
                if (!new RegExp("^(" + t.toString() + ")$").test(r.toString())) throw new Error(t);
                return r;
            }
            if (-1 == t.indexOf(r.toString())) throw new Error(t.join("|"));
            return r;
        },
        upper: function(e, t, n, r) {
            return t ? r.toString().toUpperCase() : r;
        },
        lower: function(e, t, n, r) {
            return t ? r.toString().toLowerCase() : r;
        }
    };
});
let $0bc52734b49fc041$var$Rinn = {};
var $0bc52734b49fc041$export$2e2bcd8739ae039 = $0bc52734b49fc041$var$Rinn;
$0bc52734b49fc041$var$Rinn.invokeLater = function(e) {
    e && setTimeout(function() {
        e();
    }, 10);
}, $0bc52734b49fc041$var$Rinn.wait = function(e) {
    return new Promise(function(t, n) {
        setTimeout(t, e);
    });
}, $0bc52734b49fc041$var$Rinn.typeOf = function(e) {
    return e instanceof Array ? "array" : null === e ? "null" : (typeof e).toString().toLowerCase();
}, $0bc52734b49fc041$var$Rinn.isArrayOrObject = function(e) {
    switch($0bc52734b49fc041$var$Rinn.typeOf(e)){
        case "array":
        case "object":
            return !0;
    }
    return !1;
}, $0bc52734b49fc041$var$Rinn.clone = function(e) {
    let t = $0bc52734b49fc041$var$Rinn.typeOf(e);
    if ("array" === t) {
        t = [];
        for(let n = 0; n < e.length; n++)t.push($0bc52734b49fc041$var$Rinn.clone(e[n]));
    } else if ("object" === t) {
        if ("clone" in e && "function" == typeof e.clone) return e.clone();
        t = {};
        for(let n in e)t[n] = $0bc52734b49fc041$var$Rinn.clone(e[n]);
    } else t = e;
    return t;
}, $0bc52734b49fc041$var$Rinn.merge = function(e, ...t) {
    if ("array" == $0bc52734b49fc041$var$Rinn.typeOf(e)) for(let n = 0; n < t.length; n++){
        let r = t[n];
        if ("array" != $0bc52734b49fc041$var$Rinn.typeOf(r)) e.push(r);
        else for(let t1 = 0; t1 < r.length; t1++)e.push($0bc52734b49fc041$var$Rinn.clone(r[t1]));
    }
    else if ("object" == $0bc52734b49fc041$var$Rinn.typeOf(e)) for(let n1 = 0; n1 < t.length; n1++){
        let r = t[n1];
        if ("object" == $0bc52734b49fc041$var$Rinn.typeOf(r)) for(let t2 in r)$0bc52734b49fc041$var$Rinn.isArrayOrObject(r[t2]) ? t2 in e ? $0bc52734b49fc041$var$Rinn.merge(e[t2], r[t2]) : e[t2] = $0bc52734b49fc041$var$Rinn.clone(r[t2]) : e[t2] = r[t2];
    }
    return e;
}, $0bc52734b49fc041$var$Rinn.override = function(e, ...t) {
    for(let n = 0; n < t.length; n++)for(let r in t[n])e[r] = t[n][r];
    return e;
}, $0bc52734b49fc041$var$Rinn.partialCompare = function(e, t) {
    if (null == e || null == t) return !1;
    if (e === t) return !0;
    for(var n in t)if (e[n] != t[n]) return !1;
    return !0;
}, $0bc52734b49fc041$var$Rinn.arrayFind = function(e, t, n) {
    for(var r = 0; e && r < e.length; r++)if (this.partialCompare(e[r], t)) return n ? e[r] : r;
    return !!n && null;
}, $0bc52734b49fc041$var$Rinn.isInstanceOf = function(e, t) {
    return !(!e || !t || "object" != typeof e) && (e instanceof t || "isInstanceOf" in e && e.isInstanceOf(t));
}, $0bc52734b49fc041$var$Rinn.indexOf = function(e, t, n = !1) {
    if (n) {
        for(let n = 0; n < e.length; n++)if (e[n] === t) return n;
        return -1;
    }
    for(let n2 in e)if (e[n2] === t) return n2;
    return -1;
}, $0bc52734b49fc041$var$Rinn.escape = function(e) {
    return (e + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}, $0bc52734b49fc041$var$Rinn.ensureTypeOf = function(e, t) {
    return !t || !e || t instanceof e || t.isInstanceOf && e.prototype.className && t.isInstanceOf(e.prototype.className) ? t : new e(t);
}, $0bc52734b49fc041$var$Rinn.serialize = function(e) {
    return JSON.stringify(e);
}, $0bc52734b49fc041$var$Rinn.deserialize = function(e) {
    return JSON.parse(e);
}, $0bc52734b49fc041$var$Rinn.hookAppend = function(e1, t, n, r = !0) {
    const i = e1[t];
    return e1[t] = r ? function(...e) {
        if (!1 !== i.apply(this, e)) return n.apply(this, e);
    } : function(...e) {
        return i.apply(this, e), n.apply(this, e);
    }, {
        unhook: function() {
            e1[t] = i;
        }
    };
}, $0bc52734b49fc041$var$Rinn.hookPrepend = function(e2, t, n, r = !0) {
    const i = e2[t];
    return e2[t] = r ? function(...e) {
        if (!1 !== n.apply(this, e)) return i.apply(this, e);
    } : function(...e) {
        return n.apply(this, e), i.apply(this, e);
    }, {
        unhook: function() {
            e2[t] = i;
        }
    };
}, parcelRequire.register("8ogo9", function(e, t) {
    $parcel$export(e.exports, "default", function() {
        return n;
    });
    var n = {
        email: /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)+$/i,
        url: /^[\w-]+:\/\/[\w-]+(\.\w+)+.*$/,
        urlNoProt: /^[\w-]+(\.\w+)+.*$/,
        name: /^[-A-Za-z0-9_.]+$/,
        uname: /^['\pL\pN ]+$/,
        text: /^[^&<>{}]*$/,
        utext: /^([\r\n\pL\pN\pS &!@#$%*\[\]()_+=;',.\/?:"~-]+)$/
    };
});
//!class Class
const $8651ccc8e7e5ec23$var$Class = function() {};
$8651ccc8e7e5ec23$var$Class._class = $8651ccc8e7e5ec23$var$Class, $8651ccc8e7e5ec23$var$Class._super = {}, $8651ccc8e7e5ec23$var$Class.prototype.className = "Class", $8651ccc8e7e5ec23$var$Class.prototype.__ctor = function() {}, $8651ccc8e7e5ec23$var$Class.prototype.__dtor = function() {}, $8651ccc8e7e5ec23$var$Class.prototype.isInstanceOf = function(e) {
    return null !== e && ("function" == typeof e ? e = e.prototype.className : "string" != typeof e && (e = e.__proto__.className), this.className === e || this._super.hasOwnProperty(e));
}, $8651ccc8e7e5ec23$var$Class.instanceOf = function(e, t) {
    return null !== e && null !== t && e.isInstanceOf(t);
}, $8651ccc8e7e5ec23$var$Class.prototype._initSuperRefs = function() {
    let e4 = this.constructor._super, t3 = {};
    const n = this;
    for(let r1 in e4){
        let i1 = {}, a1 = e4[r1].prototype;
        for(let e3 in a1)"function" === $0bc52734b49fc041$export$2e2bcd8739ae039.typeOf(a1[e3]) && (i1[e3] = function(e) {
            return function(t, r, i, a, s, c, l, o, u, f, p) {
                return e.call(n, t, r, i, a, s, c, l, o, u, f, p);
            };
        }(a1[e3]));
        t3[r1] = i1;
    }
    this._super = t3;
}, $8651ccc8e7e5ec23$var$Class.inherit = function(e) {
    let t = this._class, n = t._super, r = t._class;
    if ("function" === $0bc52734b49fc041$export$2e2bcd8739ae039.typeOf(e)) {
        for(let n3 in e._class)/^[A-Z]/.test(n3) || (t[n3] = e._class[n3]);
        $0bc52734b49fc041$export$2e2bcd8739ae039.override(t.prototype, e._class.prototype), $0bc52734b49fc041$export$2e2bcd8739ae039.override(n, e._class._super), e._class.prototype.className && (n[e._class.prototype.className] = e._class);
    } else $0bc52734b49fc041$export$2e2bcd8739ae039.override(t.prototype, e);
    return t._super = n, t._class = r, t;
}, $8651ccc8e7e5ec23$var$Class.prototype._extend = function(e6, t) {
    if (0 === t.length) return e6;
    const n = function(...e) {
        this._initSuperRefs(), this.__ctor.apply(this, e);
    };
    n._class = n, n._super = {}, $8651ccc8e7e5ec23$var$Class.inherit.call(n, e6), delete n.prototype.className;
    for(let e5 = 0; e5 < t.length; e5++)n.inherit(t[e5]);
    return delete n._super.Class, "classInit" in n.prototype && n.prototype.classInit(), n.isInstance = function(e) {
        return $0bc52734b49fc041$export$2e2bcd8739ae039.isInstanceOf(e, n);
    }, n;
}, $8651ccc8e7e5ec23$var$Class.extend = function(...e) {
    return this._class.prototype._extend(this, e);
}, $8651ccc8e7e5ec23$var$Class.create = function(e) {
    return new (this.extend(e));
};
var $8651ccc8e7e5ec23$export$2e2bcd8739ae039 = $8651ccc8e7e5ec23$var$Class, $b6677aaba4a0e4e9$export$2e2bcd8739ae039 = $8651ccc8e7e5ec23$export$2e2bcd8739ae039.extend({
    className: "Event",
    source: null,
    name: null,
    args: null,
    _async: !1,
    list: null,
    next: null,
    ret: null,
    original: null,
    i: -1,
    __ctor: function(e, t, n, r, i, a) {
        this.source = e, this.name = n, this.args = r, this.cbHandler = i, this.cbContext = a, this.list = t, this.reset();
    },
    reset: function() {
        return this.next = null, this.ret = [], this._async = !1, this.i = -1, this;
    },
    setSource: function(e) {
        return this.source = e, this;
    },
    wait: function() {
        return this._async = !0, this;
    },
    resume: function() {
        for(this._async = !1; !(this._async || ++this.i >= this.list.length);)if (!this.list[this.i].silent) {
            if ("string" == $0bc52734b49fc041$export$2e2bcd8739ae039.typeOf(this.list[this.i].handler)) {
                if (this.list[this.i].context) {
                    if (!this.list[this.i].context[this.list[this.i].handler]) continue;
                    if (!1 === this.list[this.i].context[this.list[this.i].handler](this, this.args, this.list[this.i].data)) break;
                } else if (!1 === $parcel$global[this.list[this.i].handler].call(null, this, this.args, this.list[this.i].data)) break;
            } else if (!1 === this.list[this.i].handler.call(this.list[this.i].context, this, this.args, this.list[this.i].data)) break;
        }
        return this._async || (this.i >= this.list.length && this.next && this.next.resume(), this.cbHandler && this.cbHandler.call(this.cbContext)), this;
    },
    from: function(e) {
        return this.original = e, this;
    },
    enqueue: function(e) {
        if (!e) return this;
        var t;
        for(t = this; null != t.next; t = t.next);
        return t.next = e, e.from(this), this;
    }
}), $cb9168e99253fb00$export$2e2bcd8739ae039 = $8651ccc8e7e5ec23$export$2e2bcd8739ae039.extend({
    className: "EventDispatcher",
    listeners: null,
    namespace: null,
    __ctor: function() {
        this.listeners = {};
    },
    setNamespace: function(e) {
        return this.namespace = e, this;
    },
    addEventListener: function(e, t, n, r) {
        var i = (e = e.split(":"))[e.length - 1], a = e.length > 1 ? e[0] : null;
        return this.listeners[i] || (this.listeners[i] = []), this.listeners[i].push({
            ns: a,
            handler: t,
            context: n,
            data: r,
            silent: 0
        }), this;
    },
    removeEventListener: function(e, t, n) {
        var r = (e = e.split(":"))[e.length - 1], i = e.length > 1 ? e[0] : null;
        if ("*" == r) for(var a in this.listeners)for(var s = this.listeners[a], c = 0; c < s.length; c++){
            var l = !0;
            t && (l = l && s[c].handler === t), n && (l = l && s[c].context === n), i && (l = l && s[c].ns == i), l && s.splice(c--, 1);
        }
        else {
            if (!this.listeners[r]) return this;
            for(s = this.listeners[r], c = 0; c < s.length; c++){
                l = !0;
                t && (l = l && s[c].handler === t), n && (l = l && s[c].context === n), i && (l = l && s[c].ns == i), l && s.splice(c--, 1);
            }
        }
        return this;
    },
    prepareEvent: function(e, t, n, r) {
        var i = [], a = (e = e.split(":"))[e.length - 1], s = e.length > 1 ? e[0] : null;
        this.listeners[a] && (i = i.concat(this.listeners[a])), this.listeners["*"] && (i = i.concat(this.listeners["*"]));
        for(var c = 0; c < i.length; c++)i[c].silent && i.splice(c--, 1);
        if (s) for(c = 0; c < i.length; c++)i[c].ns != s && i.splice(c--, 1);
        return new $b6677aaba4a0e4e9$export$2e2bcd8739ae039(this, i, a, t, n, r);
    },
    silence: function(e, t) {
        var n = (e = e.split(":"))[e.length - 1], r = e.length > 1 ? e[0] : null;
        if (t = !1 === t ? -1 : 1, "*" == n) for(var i in this.listeners)for(var a = this.listeners[i], s = 0; s < a.length; s++)r && a[s].ns != r || (a[s].silent += t);
        else {
            if (!this.listeners[n]) return this;
            for(a = this.listeners[n], s = 0; s < a.length; s++)r && a[s].ns != r || (a[s].silent += t);
        }
        return this;
    },
    dispatchEvent: function(e, t, n, r) {
        return this.prepareEvent(this.namespace ? this.namespace + ":" + e : e, t, n, r).resume();
    }
}), $91JQY = parcelRequire("91JQY");
let $4d78f9734f64a4b0$var$_Model = $cb9168e99253fb00$export$2e2bcd8739ae039.extend({
    className: "Model",
    defaults: null,
    constraints: null,
    data: null,
    changedList: null,
    _silent: 0,
    _level: 0,
    __ctor: function(e, t) {
        if (this._super.EventDispatcher.__ctor(), this.data = {}, null != t) this.reset(t, !1);
        else {
            let e = null;
            if (!this.defaults && this.constraints) {
                e = {};
                for(let t in this.constraints){
                    let n = this.constraints[t];
                    null !== n.def && void 0 !== n.def ? "function" == typeof n.def ? e[t] = n.def() : e[t] = n.def : e[t] = null;
                }
            }
            this.reset(e);
        }
        this.init(), null != e && this.set(e, !0), this.constraints && this.update(), this.ready();
    },
    reset: function(e, t) {
        if (!this.defaults) {
            if (!e || "object" !== $0bc52734b49fc041$export$2e2bcd8739ae039.typeOf(e) && "function" !== $0bc52734b49fc041$export$2e2bcd8739ae039.typeOf(e)) return this;
            this.defaults = e;
        }
        return "function" === $0bc52734b49fc041$export$2e2bcd8739ae039.typeOf(this.defaults) ? this.data = this.defaults() : this.data = $0bc52734b49fc041$export$2e2bcd8739ae039.clone(this.defaults), !1 === t || !1 === e ? this : this.update(null, !0);
    },
    init: function() {},
    ready: function() {},
    silent: function(e) {
        return this._silent += e ? 1 : -1, this;
    },
    _validate: function(e, t) {
        if (!this.constraints || !this.constraints[e]) return t;
        var n = this.constraints[e], r = t;
        for(var i in n)if ($4d78f9734f64a4b0$var$_Model.Constraints[i]) try {
            r = $4d78f9734f64a4b0$var$_Model.Constraints[i](this, n[i], e, r);
        } catch (t4) {
            if ("null" == t4.message) break;
            throw new Error(`Constraint [${i}:${n[i]}] failed on property '${e}'.`);
        }
        return r;
    },
    _set: function(e, t) {
        if (!this.constraints || !this.constraints[e]) return this.data[e] = t, t;
        var n = this.constraints[e], r = (this.data[e], t);
        for(var i in n)if ($4d78f9734f64a4b0$var$_Model.Constraints[i]) try {
            r = $4d78f9734f64a4b0$var$_Model.Constraints[i](this, n[i], e, r);
        } catch (n4) {
            if ("null" == n4.message) break;
            this._silent || this.dispatchEvent("constraintError", {
                constraint: i,
                message: n4.message,
                name: e,
                value: t
            });
            break;
        }
        return this.data[e] = r;
    },
    _propertyEvent: function(e, t, n, r) {
        var i = {
            name: e,
            old: t,
            value: n,
            level: this._level
        }, a = this.dispatchEvent("propertyChanging", i);
        r ? this.data[e] = i.value : i.value = this._set(e, i.value), null != a && a.ret.length && !1 === a.ret[0] || (this.dispatchEvent("propertyChanged." + e, i), this.dispatchEvent("propertyChanged", i), this.changedList.push(e));
    },
    set: function() {
        var e = arguments.length, t = !1, n = !1;
        if ((e > 2 || 2 == e && "object" == $0bc52734b49fc041$export$2e2bcd8739ae039.typeOf(arguments[0])) && "boolean" == $0bc52734b49fc041$export$2e2bcd8739ae039.typeOf(arguments[e - 1]) && !1 === (t = arguments[--e]) && (n = !0), 0 == this._level && (this.changedList = []), this._level++, 2 == e) (this.data[arguments[0]] != arguments[1] || t) && (this._silent || n ? this._set(arguments[0], arguments[1]) : this._propertyEvent(arguments[0], this.data[arguments[0]], this._validate(arguments[0], arguments[1])));
        else for(var r in arguments[0])(this.data[r] != arguments[0][r] || t) && (this._silent || n ? this._set(r, arguments[0][r]) : this._propertyEvent(r, this.data[r], this._validate(r, arguments[0][r])));
        return --this._level || !this.changedList.length || n || this._silent || this.dispatchEvent("modelChanged", {
            fields: this.changedList
        }), this;
    },
    has: function(e) {
        return e in this.data;
    },
    get: function(e, t) {
        return 0 == arguments.length || !1 === e ? this.data : 1 == arguments.length && !0 === e ? this.flatten() : 2 == arguments.length && void 0 === this.data[e] ? t : this.data[e];
    },
    getInt: function(e, t) {
        return 2 == arguments.length && void 0 === this.data[e] ? t : parseInt(this.data[e]);
    },
    getFloat: function(e, t) {
        return 2 == arguments.length && void 0 === this.data[e] ? t : parseFloat(this.data[e]);
    },
    getBool: function(e, t) {
        return "true" === (e = 2 == arguments.length && void 0 === this.data[e] ? t : this.data[e]) || !0 === e || "false" !== e && !1 !== e && !!parseInt(e);
    },
    getReference: function(e) {
        var t = this;
        return {
            get: function() {
                return t.get(e);
            },
            set: function(n) {
                t.set(e, n);
            }
        };
    },
    constraint: function(e, t, n) {
        if (3 == arguments.length || 2 == arguments.length || 1 == arguments.length && "object" == $0bc52734b49fc041$export$2e2bcd8739ae039.typeOf(e)) {
            switch(this.constraints === this.constructor.prototype.constraints && (this.constraints = $0bc52734b49fc041$export$2e2bcd8739ae039.clone(this.constraints)), arguments.length){
                case 1:
                    $0bc52734b49fc041$export$2e2bcd8739ae039.override(this.constraints, e);
                    break;
                case 2:
                    $0bc52734b49fc041$export$2e2bcd8739ae039.override(this.constraints[e], t);
                    break;
                case 3:
                    this.constraints[e][t] = n;
            }
            return this;
        }
        return e ? this.constraints[e] : this;
    },
    flatten: function(e, t) {
        if (e) return null == (i = this.flatten(!1, !0)) ? null : (i.class = this.classPath, i);
        if (!this.constraints && !this.defaults) return this.data;
        if (!this.isCompliant()) return {};
        var n = this.constraints, r = this.defaults ? "function" == $0bc52734b49fc041$export$2e2bcd8739ae039.typeOf(this.defaults) ? this.defaults() : this.defaults : this.constraints, i = {};
        for(var a in this.data)if (a in r) {
            if (n && n[a]) {
                var s = n[a];
                if (s.model) {
                    i[a] = this.data[a] ? this.data[a].flatten(t) : null;
                    continue;
                }
                if (s.arrayof) {
                    i[a] = [];
                    for(var c = 0; c < this.data[a].length; c++)i[a][c] = this.data[a][c] ? this.data[a][c].flatten(t) : null;
                    continue;
                }
                if (s.cls) {
                    i[a] = this.data[a] ? this.data[a].flatten() : null;
                    continue;
                }
            }
            i[a] = this.data[a];
        }
        return i;
    },
    remove: function(e, t) {
        if ("array" == $0bc52734b49fc041$export$2e2bcd8739ae039.typeOf(e)) {
            for(var n = 0; n < e.length; n++)delete this.data[e[n]];
            !1 === t || this._silent || this.dispatchEvent("propertyRemoved", {
                fields: e
            });
        } else delete this.data[e], !1 === t || this._silent || this.dispatchEvent("propertyRemoved", {
            fields: [
                e
            ]
        });
    },
    update: function(e, t) {
        if (this._silent) return this;
        if (0 == this._level && (this.changedList = []), this._level++, e && "string" == $0bc52734b49fc041$export$2e2bcd8739ae039.typeOf(e)) this._propertyEvent(e, this.data[e], this.data[e], t);
        else if (e && "array" == $0bc52734b49fc041$export$2e2bcd8739ae039.typeOf(e)) for (var n of e)this._propertyEvent(n, this.data[n], this.data[n], t);
        else for(var n in this.data)this._propertyEvent(n, this.data[n], this.data[n], t);
        return --this._level || this._silent || 0 == this.changedList.length && !0 !== e || this.dispatchEvent("modelChanged", {
            fields: this.changedList
        }), this;
    },
    validate: function(e) {
        if (!this.constraints) return this;
        if (e && "string" == $0bc52734b49fc041$export$2e2bcd8739ae039.typeOf(e)) this._set(e, this.data[e]);
        else for(var t in this.data)e && -1 == $0bc52734b49fc041$export$2e2bcd8739ae039.indexOf(e, t) || this._set(t, this.data[t]);
        return this;
    },
    isCompliant: function() {
        if (!this.constraints) return !0;
        try {
            for(var e in this.data)this._validate(e, this.data[e]);
            return !0;
        } catch (e) {}
        return !1;
    },
    observe: function(e, t, n) {
        this.addEventListener("propertyChanged." + e, t, n);
    },
    unobserve: function(e, t, n) {
        this.removeEventListener("propertyChanged." + e, t, n);
    },
    watch: function(e7, t) {
        1 == (e7 = e7.split(":")).length && (e7[1] = e7[0], e7[0] = "watch"), this.addEventListener(e7[0] + ":propertyChanged." + e7[1], function(e, n) {
            t(n.value, n, e);
        });
    },
    unwatch: function(e) {
        1 == (e = e.split(":")).length && (e[1] = e[0], e[0] = "watch"), this.removeEventListener(e[0] + ":propertyChanged." + e[1]);
    },
    toString: function() {
        return $0bc52734b49fc041$export$2e2bcd8739ae039.serialize(this.get(!0));
    }
});
$4d78f9734f64a4b0$var$_Model.Constraints = $91JQY.default;
var $4d78f9734f64a4b0$export$2e2bcd8739ae039 = $4d78f9734f64a4b0$var$_Model, $e1ecb91f5a3e913e$export$2e2bcd8739ae039 = $4d78f9734f64a4b0$export$2e2bcd8739ae039.extend({
    className: "ModelList",
    itemt: $4d78f9734f64a4b0$export$2e2bcd8739ae039,
    contents: null,
    itemId: null,
    nextId: null,
    defaults: {
        contents: null
    },
    constraints: {
        contents: {
            type: "array",
            arrayof: "@itemt"
        }
    },
    __ctor: function(...e) {
        this.itemId = [], this.nextId = 0, this._super.Model.__ctor(...e);
    },
    ready: function() {
        this._eventGroup = "ModelList_" + Date.now() + ":modelChanged", this.contents = this.data.contents;
    },
    _bind: function(e, t) {
        return t && t.addEventListener && t.addEventListener(this._eventGroup, this._onItemEvent, this, e), t;
    },
    _unbind: function(e) {
        return e && e.removeEventListener && e.removeEventListener(this._eventGroup), e;
    },
    _onItemEvent: function(e, t, n) {
        this.prepareEvent("itemChanged", {
            id: n,
            item: e.source
        }).from(e).enqueue(this.prepareEvent("modelChanged", {
            fields: [
                "contents"
            ]
        })).resume();
    },
    length: function() {
        return this.data.contents.length;
    },
    clear: function() {
        for(var e = 0; e < this.data.contents; e++)this._unbind(this.data.contents[e]);
        return this.itemId = [], this.nextId = 0, this.contents = this.data.contents = [], this.prepareEvent("itemsCleared").enqueue(this.prepareEvent("modelChanged", {
            fields: [
                "contents"
            ]
        })).resume(), this;
    },
    setData: function(e) {
        if (this.clear(), !e) return this;
        for(var t = 0; t < e.length; t++){
            var n = $0bc52734b49fc041$export$2e2bcd8739ae039.ensureTypeOf(this.itemt, e[t]);
            this.itemId.push(this.nextId++), this.data.contents.push(n), this._bind(this.nextId - 1, n);
        }
        return this.prepareEvent("itemsChanged").enqueue(this.prepareEvent("modelChanged", {
            fields: [
                "contents"
            ]
        })).resume(), this;
    },
    getData: function() {
        return this.data.contents;
    },
    getAt: function(e) {
        return e < 0 || e >= this.data.contents.length ? null : this.data.contents[e];
    },
    removeAt: function(e) {
        if (e < 0 || e >= this.data.contents.length) return null;
        let t = this.data.contents.splice(e, 1)[0], n = this.itemId.splice(e, 1)[0];
        return this._unbind(t), this.prepareEvent("itemRemoved", {
            id: n,
            item: t
        }).enqueue(this.prepareEvent("modelChanged", {
            fields: [
                "contents"
            ]
        })).resume(), t;
    },
    setAt: function(e, t) {
        return !(e < 0 || e >= this.data.contents.length) && (t = $0bc52734b49fc041$export$2e2bcd8739ae039.ensureTypeOf(this.itemt, t), this._unbind(this.data.contents[e]), this.data.contents[e] = t, this._bind(this.itemId[e], t), this.prepareEvent("itemChanged", {
            id: this.itemId[e],
            item: t
        }).enqueue(this.prepareEvent("modelChanged", {
            fields: [
                "contents"
            ]
        })).resume(), !0);
    },
    updateAt: function(e) {
        return !(e < 0 || e >= this.data.contents.length) && (this.prepareEvent("itemChanged", {
            id: this.itemId[e],
            item: this.data.contents[e]
        }).enqueue(this.prepareEvent("modelChanged", {
            fields: [
                "contents"
            ]
        })).resume(), !0);
    },
    push: function(e) {
        return e && "object" != $0bc52734b49fc041$export$2e2bcd8739ae039.typeOf(e) ? null : (e = $0bc52734b49fc041$export$2e2bcd8739ae039.ensureTypeOf(this.itemt, e), this.itemId.push(this.nextId++), this.data.contents.push(e), this._bind(this.nextId - 1, e), this.prepareEvent("itemAdded", {
            id: this.itemId[this.itemId.length - 1],
            item: e,
            position: "tail"
        }).enqueue(this.prepareEvent("modelChanged", {
            fields: [
                "contents"
            ]
        })).resume(), e);
    },
    pop: function() {
        return this._unbind(this.data.contents.pop());
    },
    unshift: function(e) {
        return e && "object" != $0bc52734b49fc041$export$2e2bcd8739ae039.typeOf(e) ? null : (e = $0bc52734b49fc041$export$2e2bcd8739ae039.ensureTypeOf(this.itemt, e), this.itemId.unshift(this.nextId++), this.data.contents.unshift(e), this._bind(this.nextId - 1, e), this.prepareEvent("itemAdded", {
            id: this.itemId[0],
            item: e,
            position: "head"
        }).enqueue(this.prepareEvent("modelChanged", {
            fields: [
                "contents"
            ]
        })).resume(), e);
    },
    shift: function() {
        return this._unbind(this.data.contents.shift());
    },
    find: function(e, t = !1) {
        for(var n = this.data.contents, r = 0; r < n.length; r++)if ($0bc52734b49fc041$export$2e2bcd8739ae039.partialCompare(n[r].data, e)) return t ? n[r] : r;
        return t ? null : -1;
    }
});
let $ab6fe0a06ccbea8c$var$Schema = {
    Type: function(e8) {
        let t = {
            flatten: function(e, t) {
                return e;
            },
            unflatten: function(e, t) {
                return e;
            }
        };
        return e8 ? $0bc52734b49fc041$export$2e2bcd8739ae039.override(t, e8) : t;
    },
    String: function() {
        return $ab6fe0a06ccbea8c$var$Schema.Type({
            flatten: function(e, t) {
                return null != e ? e.toString() : null;
            },
            unflatten: function(e, t) {
                return null != e ? e.toString() : null;
            }
        });
    },
    Integer: function() {
        return $ab6fe0a06ccbea8c$var$Schema.Type({
            flatten: function(e, t) {
                return ~~e;
            },
            unflatten: function(e, t) {
                return ~~e;
            }
        });
    },
    Number: function(e9) {
        return $ab6fe0a06ccbea8c$var$Schema.Type({
            _precision: e9,
            _round: !1,
            precision: function(e) {
                return this._precision = ~~e, this;
            },
            flatten: function(e, t) {
                return e = parseFloat(e), this._precision > 0 && (e = ~~(e * Math.pow(10, this._precision)) / Math.pow(10, this._precision)), e;
            },
            unflatten: function(e, t) {
                return parseFloat(e);
            }
        });
    },
    Bool: function(e10) {
        return $ab6fe0a06ccbea8c$var$Schema.Type({
            _compact: e10,
            compact: function(e) {
                return this._compact = e, this;
            },
            flatten: function(e, t) {
                return e = ~~e, this._compact ? e > 0 ? 1 : 0 : e > 0;
            },
            unflatten: function(e, t) {
                return !!~~e;
            }
        });
    },
    SharedString: function() {
        return $ab6fe0a06ccbea8c$var$Schema.Type({
            flatten: function(e, t) {
                return null == e ? 0 : (e = e.toString(), "strings" in t || (t.index = {}, t.strings = []), e in t.index || (t.strings.push(e), t.index[e] = t.strings.length), t.index[e]);
            },
            unflatten: function(e, t) {
                return null == e || 0 == e ? null : t.strings[~~e - 1];
            }
        });
    },
    Array: function(e11) {
        return $ab6fe0a06ccbea8c$var$Schema.Type({
            itemType: e11,
            _debug: !1,
            _filter: null,
            debug: function(e) {
                return this._debug = e, this;
            },
            of: function(e) {
                return this.itemType = e, this;
            },
            filter: function(e) {
                return this._filter = e, this;
            },
            flatten: function(e, t) {
                if (null == e) return null;
                let n = [];
                for(let r = 0; r < e.length; r++)this._filter && !this._filter(e[r], r) || n.push(this.itemType.flatten(e[r], t));
                return n;
            },
            unflatten: async function(e, t) {
                if (null == e) return null;
                let n = [];
                for(let r = 0; r < e.length; r++)n.push(await this.itemType.unflatten(e[r], t));
                return n;
            }
        });
    },
    Object: function() {
        return $ab6fe0a06ccbea8c$var$Schema.Type({
            properties: [],
            property: function(e, t, n = null) {
                return this.properties.push({
                    name: e,
                    source: e,
                    type: t,
                    defvalue: n
                }), this;
            },
            propertyAlias: function(e, t, n, r = null) {
                return this.properties.push({
                    name: e,
                    source: t,
                    type: n,
                    defvalue: r
                }), this;
            },
            flatten: function(e, t) {
                if (null == e) return null;
                let n;
                if (!0 === t.symbolic) {
                    n = {};
                    for(let r = 0; r < this.properties.length; r++)this.properties[r].source in e ? n[this.properties[r].name] = this.properties[r].type.flatten(e[this.properties[r].source], t) : n[this.properties[r].name] = this.properties[r].type.flatten(this.properties[r].defvalue, t);
                } else {
                    n = [];
                    for(let r = 0; r < this.properties.length; r++)this.properties[r].source in e ? n.push(this.properties[r].type.flatten(e[this.properties[r].source], t)) : n.push(this.properties[r].type.flatten(this.properties[r].defvalue, t));
                }
                return n;
            },
            unflatten: async function(e, t) {
                if (null == e) return null;
                let n = {};
                if (!0 === t.symbolic) for(let r = 0; r < this.properties.length; r++)n[this.properties[r].name] = await this.properties[r].type.unflatten(this.properties[r].name in e ? e[this.properties[r].name] : this.properties[r].defvalue, t);
                else for(let r2 = 0; r2 < this.properties.length; r2++)n[this.properties[r2].name] = await this.properties[r2].type.unflatten(r2 in e ? e[r2] : this.properties[r2].defvalue, t);
                return n;
            }
        });
    },
    Class: function(e12) {
        return $ab6fe0a06ccbea8c$var$Schema.Type({
            _constructor: e12,
            constructor: function(e) {
                return this._constructor = e, this;
            },
            flatten: function(e, t) {
                return null == e ? null : e.flatten(t);
            },
            unflatten: async function(e, t) {
                return null == e ? null : await (new this._constructor).unflatten(e, t);
            }
        });
    },
    Property: function(e13, t5) {
        return $ab6fe0a06ccbea8c$var$Schema.Type({
            property: e13,
            type: t5,
            name: function(e) {
                return this.property = e, this;
            },
            is: function(e) {
                return this.type = e, this;
            },
            flatten: function(e, t) {
                if (null == e) return null;
                let n;
                return !0 === t.symbolic ? (n = {}, n[this.property] = this.type.flatten(e[this.property], t)) : n = this.type.flatten(e[this.property], t), n;
            },
            unflatten: async function(e, t) {
                if (null == e) return null;
                let n = {};
                return !0 === t.symbolic ? n[this.property] = await this.type.unflatten(e[this.property], t) : n[this.property] = await this.type.unflatten(e, t), n;
            }
        });
    },
    Map: function() {
        return $ab6fe0a06ccbea8c$var$Schema.Type({
            flatten: function(e, t) {
                if (null == e) return null;
                if (!0 === t.symbolic) return e;
                let n = [];
                for(let t6 in e)n.push(t6), n.push(e[t6]);
                return n;
            },
            unflatten: function(e, t) {
                if (null == e) return null;
                if (!0 === t.symbolic) return e;
                let n = {};
                for(let t7 = 0; t7 < e.length; t7 += 2)n[e[t7]] = e[t7 + 1];
                return n;
            }
        });
    },
    Selector: function() {
        return $ab6fe0a06ccbea8c$var$Schema.Type({
            conditions: [],
            value: null,
            when: function(e, t8) {
                return this.conditions.push([
                    (t)=>t === e
                    ,
                    t8
                ]), this;
            },
            with: function(e) {
                return this.value = e, this;
            },
            flatten: function(e, t) {
                if (null == e) return null;
                for (let n of this.conditions)if (!0 === n[0](this.value)) return n[1].flatten(e, t);
                return null;
            },
            unflatten: async function(e, t) {
                if (null == e) return null;
                for (let n of this.conditions)if (!0 === n[0](this.value)) return await n[1].unflatten(e, t);
                return null;
            }
        });
    }
};
var $ab6fe0a06ccbea8c$export$2e2bcd8739ae039 = $ab6fe0a06ccbea8c$var$Schema, $65a911499be22e32$export$2e2bcd8739ae039 = $8651ccc8e7e5ec23$export$2e2bcd8739ae039.extend({
    className: "Flattenable",
    typeSchema: null,
    flatten: function(e) {
        return this.typeSchema.flatten(this, e);
    },
    unflatten: async function(e, t) {
        return Object.assign(this, await this.typeSchema.unflatten(e, t)), await this.onUnflattened(), this;
    },
    onUnflattened: async function() {}
}), $ac94ca3ce7f52d5a$export$2e2bcd8739ae039 = $65a911499be22e32$export$2e2bcd8739ae039.extend({
    className: "Collection",
    itemTypeSchema: null,
    items: null,
    __ctor: function(e) {
        e || (e = this.itemTypeSchema), e && (this.typeSchema = $ab6fe0a06ccbea8c$export$2e2bcd8739ae039.Property("items").is($ab6fe0a06ccbea8c$export$2e2bcd8739ae039.Array().of(e))), this.reset();
    },
    onUnflattened: function() {
        let e = this.items;
        this.reset();
        for (let t of e)this.add(t);
    },
    itemsReferenceChanged: function() {},
    reset: function() {
        return this.items = [], this.itemsReferenceChanged(), this;
    },
    clear: function() {
        var e = this.items;
        this.reset();
        for(var t = 0; t < e.length; t++)this.onItemRemoved(e[t], 0);
        return this;
    },
    sort: function(e, t) {
        return "function" != typeof e ? this.items.sort(function(n, r) {
            return (n[e] <= r[e] ? -1 : 1) * (!0 === t ? -1 : 1);
        }) : this.items.sort(e), this;
    },
    findItem: function(e, t) {
        if (!this.items) return null;
        for(var n = 0; n < this.items.length; n++)if ((!t || !$0bc52734b49fc041$export$2e2bcd8739ae039.partialCompare(this.items[n], t)) && $0bc52734b49fc041$export$2e2bcd8739ae039.partialCompare(this.items[n], e)) return this.items[n];
        return null;
    },
    getItems: function() {
        return this.items;
    },
    length: function() {
        return this.items.length;
    },
    isEmpty: function() {
        return !this.items.length;
    },
    indexOf: function(e) {
        return this.items.indexOf(e);
    },
    getAt: function(e, t = !1) {
        return e < 0 && 1 == t && (e += this.items.length), e >= 0 && e < this.items.length ? this.items[e] : null;
    },
    first: function() {
        return this.getAt(0);
    },
    last: function() {
        return this.getAt(-1, !0);
    },
    addAt: function(e, t) {
        if (!t || !this.onBeforeItemAdded(t)) return this;
        if (e < 0 && (e = 0), e > this.items.length && (e = this.items.length), 0 == e) this.items.unshift(t);
        else if (e == this.items.length) this.items.push(t);
        else {
            var n = this.items.splice(0, e);
            n.push(t), this.items = n.concat(this.items), this.itemsReferenceChanged();
        }
        return this.onItemAdded(t), this;
    },
    unshift: function(e) {
        return this.addAt(0, e);
    },
    push: function(e) {
        return this.addAt(this.items.length, e);
    },
    add: function(e) {
        return this.push(e);
    },
    removeAt: function(e, t = !1) {
        if (e < 0 && 1 == t && (e += this.items.length), e < 0 || e >= this.items.length) return null;
        var n = this.items[e];
        return this.items.splice(e, 1), this.onItemRemoved(n, e), n;
    },
    pop: function(e) {
        return this.removeAt(-1, !0);
    },
    shift: function(e) {
        return this.removeAt(0);
    },
    remove: function(e) {
        return this.removeAt(this.indexOf(e));
    },
    forEach: function(e) {
        if (this.isEmpty()) return this;
        for(var t = 0; t < this.items.length && !1 !== e(this.items[t], t, this); t++);
        return this;
    },
    forEachCall: function(e, ...t) {
        if (this.isEmpty()) return this;
        for(var n = 0; n < this.items.length && !1 !== this.items[n][e](...t); n++);
        return this;
    },
    forEachRev: function(e) {
        if (this.isEmpty()) return this;
        for(var t = this.items.length - 1; t >= 0 && !1 !== e(this.items[t], t, this); t--);
        return this;
    },
    forEachRevCall: function(e, ...t) {
        if (this.isEmpty()) return this;
        for(var n = this.items.length - 1; n >= 0 && !1 !== this.items[n][e](...t); n--);
        return this;
    },
    onBeforeItemAdded: function(e) {
        return !0;
    },
    onItemAdded: function(e) {},
    onItemRemoved: function(e) {}
});
let $87679206ec041316$var$Template = {
    strict: !1,
    parseTemplate: function(e15, t9, n5, r4 = !1, i = 1) {
        let a = "string", s = null, c = 0, l = 0, o = "", u = [], f = u, p = !1;
        function h(e16, r) {
            if ("template" == e16 ? r = $87679206ec041316$var$Template.parseTemplate(r, t9, n5, !0, 0) : "parse" == e16 ? (r = $87679206ec041316$var$Template.parseTemplate(r, t9, n5, !1, 0), e16 = "base-string", "array" == $0bc52734b49fc041$export$2e2bcd8739ae039.typeOf(r) && (e16 = r[0].type, r = r[0].data)) : "parse-trim-merge" == e16 ? r = $87679206ec041316$var$Template.parseTemplate(r.trim().split("\n").map((e)=>e.trim()
            ).join("\n"), t9, n5, !1, 0) : "parse-merge" == e16 ? r = $87679206ec041316$var$Template.parseTemplate(r, t9, n5, !1, 0) : "parse-merge-alt" == e16 && (r = $87679206ec041316$var$Template.parseTemplate(r, "{", "}", !1, 0)), "parse-merge" == e16 || "parse-merge-alt" == e16 || "parse-trim-merge" == e16) for(let e14 = 0; e14 < r.length; e14++)u.push(r[e14]);
            else u.push({
                type: e16,
                data: r
            });
            p && (f.push(u = []), p = !1);
        }
        !0 === r4 && (e15 = e15.trim(), a = "identifier", c = 10, f.push(u = [])), e15 += "\0";
        for(let r3 = 0; r3 < e15.length; r3++)if ("\\" != e15[r3]) {
            switch(c){
                case 0:
                    "\0" == e15[r3] ? s = "string" : e15[r3] == t9 && "<" == e15[r3 + 1] ? (c = 1, l = 1, s = "string", a = "parse-merge") : e15[r3] == t9 && "@" == e15[r3 + 1] ? (c = 1, l = 1, s = "string", a = "parse-trim-merge", r3++) : e15[r3] == t9 && ":" == e15[r3 + 1] ? (c = 12, l = 1, s = "string", a = "string", r3++) : e15[r3] == t9 ? (c = 1, l = 1, s = "string", a = "template") : o += e15[r3];
                    break;
                case 1:
                    if ("\0" == e15[r3]) throw new Error("Parse error: Unexpected end of template");
                    if (e15[r3] == n5) {
                        if (l--, l < 0) throw new Error("Parse error: Unmatched " + n5);
                        if (0 == l) {
                            c = 0, s = a;
                            break;
                        }
                    } else e15[r3] == t9 && l++;
                    o += e15[r3];
                    break;
                case 10:
                    if ("\0" == e15[r3]) {
                        s = a;
                        break;
                    }
                    if ("." == e15[r3]) {
                        h(a, o), h("access", "."), a = "identifier", o = "";
                        break;
                    }
                    if (null != e15[r3].match(/[\t\n\r\f\v ]/)) {
                        for(s = a, a = "identifier", p = !0; null != e15[r3].match(/[\t\n\r\f\v ]/);)r3++;
                        r3--;
                        break;
                    }
                    if (e15[r3] == t9 && "<" == e15[r3 + 1]) {
                        o && (s = a), c = 11, l = 1, a = "parse-merge";
                        break;
                    }
                    if (e15[r3] == t9 && "@" == e15[r3 + 1]) {
                        o && (s = a), c = 11, l = 1, a = "parse-trim-merge", r3++;
                        break;
                    }
                    if ('"' == e15[r3]) {
                        o && (s = a), c = 14, l = 1, a = "parse-merge";
                        break;
                    }
                    if ("'" == e15[r3]) {
                        o && (s = a), c = 15, l = 1, a = "parse-merge";
                        break;
                    }
                    if ("`" == e15[r3]) {
                        o && (s = a), c = 16, l = 1, a = "parse-merge-alt";
                        break;
                    }
                    if (e15[r3] == t9 && ":" == e15[r3 + 1]) {
                        o && (s = a), c = 13, l = 1, a = "string", r3++;
                        break;
                    }
                    if (e15[r3] == t9) {
                        o && h(a, o), c = 11, l = 1, o = "", a = "parse", o += e15[r3];
                        break;
                    }
                    "identifier" != a && (h(a, o), o = "", a = "identifier"), o += e15[r3];
                    break;
                case 11:
                    if ("\0" == e15[r3]) throw new Error("Parse error: Unexpected end of template");
                    if (e15[r3] == n5) {
                        if (l--, l < 0) throw new Error("Parse error: Unmatched " + n5);
                        if (0 == l && (c = 10, "parse-merge" == a || "parse-merge-alt" == a || "parse-trim-merge" == a)) break;
                    } else e15[r3] == t9 && l++;
                    o += e15[r3];
                    break;
                case 12:
                    if ("\0" == e15[r3]) throw new Error("Parse error: Unexpected end of template");
                    if (e15[r3] == n5) {
                        if (l--, l < 0) throw new Error("Parse error: Unmatched " + n5);
                        if (0 == l) {
                            0 != o.length && "<" != o[0] && "[" != o[0] && " " != o[0] && (o = t9 + o + n5), c = 0, s = a;
                            break;
                        }
                    } else e15[r3] == t9 && l++;
                    o += e15[r3];
                    break;
                case 13:
                    if ("\0" == e15[r3]) throw new Error("Parse error: Unexpected end of template");
                    if (e15[r3] == n5) {
                        if (l--, l < 0) throw new Error("Parse error: Unmatched " + n5);
                        if (0 == l) {
                            "<" != o[0] && "[" != o[0] && " " != o[0] && (o = t9 + o + n5), c = 10;
                            break;
                        }
                    } else e15[r3] == t9 && l++;
                    o += e15[r3];
                    break;
                case 14:
                    if ("\0" == e15[r3]) throw new Error("Parse error: Unexpected end of template");
                    if ('"' == e15[r3]) {
                        if (l--, l < 0) throw new Error('Parse error: Unmatched "');
                        if (0 == l && (c = 10, "parse-merge" == a || "parse-merge-alt" == a || "parse-trim-merge" == a)) break;
                    }
                    o += e15[r3];
                    break;
                case 15:
                    if ("\0" == e15[r3]) throw new Error("Parse error: Unexpected end of template");
                    if ("'" == e15[r3]) {
                        if (l--, l < 0) throw new Error("Parse error: Unmatched '");
                        if (0 == l && (c = 10, "parse-merge" == a || "parse-merge-alt" == a || "parse-trim-merge" == a)) break;
                    }
                    o += e15[r3];
                    break;
                case 16:
                    if ("\0" == e15[r3]) throw new Error("Parse error: Unexpected end of template");
                    if ("`" == e15[r3]) {
                        if (l--, l < 0) throw new Error("Parse error: Unmatched `");
                        if (0 == l && (c = 10, "parse-merge" == a || "parse-merge-alt" == a || "parse-trim-merge" == a)) break;
                    }
                    o += e15[r3];
            }
            s && (h(s, o), s = o = "");
        } else o += "\\", o += e15[++r3];
        if (!r4) {
            let e = 0;
            for(; e < f.length && "string" == f[e].type && "" == f[e].data;)f.splice(e, 1);
            for(e = f.length - 1; e > 0 && "string" == f[e].type && "" == f[e].data;)f.splice(e--, 1);
            0 == f.length && f.push({
                type: "string",
                data: ""
            });
        }
        return i && function e(t) {
            if ("object" == typeof t) {
                if (t instanceof Array) for(let n = 0; n < t.length; n++)e(t[n]);
                else t.data = e(t.data);
                return t;
            }
            for(let e17 = 0; e17 < t.length; e17++)if ("\\" == t[e17]) {
                let n = t[e17 + 1];
                switch(n){
                    case "n":
                        n = "\n";
                        break;
                    case "r":
                        n = "\r";
                        break;
                    case "f":
                        n = "\f";
                        break;
                    case "v":
                        n = "\v";
                        break;
                    case "t":
                        n = "\t";
                        break;
                    case "s":
                        n = "s";
                        break;
                    case '"':
                        n = '"';
                        break;
                    case "'":
                        n = "'";
                }
                t = t.substr(0, e17) + n + t.substr(e17 + 2);
            }
            return t;
        }(f), f;
    },
    parse: function(e) {
        return this.parseTemplate(e.trim(), "[", "]", !1);
    },
    clean: function(e) {
        for(let t = 0; t < e.length; t++)"template" != e[t].type && (e.splice(t, 1), t--);
        return e;
    },
    expand: function(e, t10, n = "text", r = "base-string") {
        let i = [];
        if ("var" == r) {
            let n = !0, r = !1, a = t10, s = null, c = !0, l = "";
            for(let i3 = 0; i3 < e.length && null != t10; i3++)switch(e[i3].type){
                case "identifier":
                case "string":
                    l += e[i3].data, s = null;
                    break;
                case "template":
                    s = this.expand(e[i3].data, a, "arg", "template"), l += "object" != typeof s ? s : "";
                    break;
                case "base-string":
                    l += this.expand(e[i3].data, a, "arg", "base-string"), s = null;
                    break;
                case "access":
                    if (s && "object" == typeof s) t10 = s;
                    else {
                        for("" == l && (l = "this");;)if ("!" == l[0]) l = l.substr(1), n = !1;
                        else {
                            if ("$" != l[0]) break;
                            l = l.substr(1), r = !0;
                        }
                        if ("this" != l && null != t10) {
                            let e = t10;
                            null === (t10 = l in t10 ? t10[l] : null) && c && l in $87679206ec041316$var$Template.functions && (t10 = $87679206ec041316$var$Template.functions[l](null, null, e)), c = !1;
                        }
                    }
                    l = "";
            }
            for(; "" != l;)if ("!" == l[0]) l = l.substr(1), n = !1;
            else {
                if ("$" != l[0]) break;
                l = l.substr(1), r = !0;
            }
            if ("this" != l) {
                let n = !1;
                if (null != t10 ? l in t10 ? t10 = t10[l] : (n = !0, t10 = null) : n = !0, n && 1 == e.length && 1 == $87679206ec041316$var$Template.strict) throw new Error("Expression function `" + l + "` not found.");
            }
            "string" == typeof t10 && (n && (t10 = t10.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")), r && (t10 = '"' + t10 + '"')), i.push(t10);
        }
        if ("varref" == n) {
            let n = t10, r = null, i = !0, a = "";
            for(let s = 0; s < e.length && null != t10; s++)switch(e[s].type){
                case "identifier":
                case "string":
                    a += e[s].data, r = null;
                    break;
                case "template":
                    r = this.expand(e[s].data, n, "arg", "template"), a += "object" != typeof r ? r : "";
                    break;
                case "base-string":
                    a += this.expand(e[s].data, n, "arg", "base-string"), r = null;
                    break;
                case "access":
                    if (r && "object" == typeof r) t10 = r;
                    else {
                        for("" == a && (a = "this");;)if ("!" == a[0]) a = a.substr(1);
                        else {
                            if ("$" != a[0]) break;
                            a = a.substr(1);
                        }
                        if ("this" != a && null != t10) {
                            let e = t10;
                            null === (t10 = a in t10 ? t10[a] : null) && i && a in $87679206ec041316$var$Template.functions && (t10 = $87679206ec041316$var$Template.functions[a](null, null, e)), i = !1;
                        }
                    }
                    a = "";
            }
            for(; "" != a;)if ("!" == a[0]) a = a.substr(1);
            else {
                if ("$" != a[0]) break;
                a = a.substr(1);
            }
            return "this" != a ? [
                t10,
                a
            ] : null;
        }
        if ("fn" == r) {
            var a = [];
            if (a.push($87679206ec041316$var$Template.expand(e[0], t10, "text", "base-string")), "_" + a[0] in $87679206ec041316$var$Template.functions && (a[0] = "_" + a[0]), !(a[0] in $87679206ec041316$var$Template.functions)) {
                if (1 == $87679206ec041316$var$Template.strict) throw new Error("Expression function `" + a[0] + "` not found.");
                return `(Unknown: ${a[0]})`;
            }
            if ("_" == a[0][0]) return $87679206ec041316$var$Template.functions[a[0]](e, t10);
            for(let n = 1; n < e.length; n++)a.push($87679206ec041316$var$Template.expand(e[n], t10, "arg", "base-string"));
            i.push($87679206ec041316$var$Template.functions[a[0]](a, e, t10));
        }
        if ("template" == r) {
            if (1 == e.length) {
                if (1 == e[0].length && "string" == e[0][0].type) return e[0][0].data;
                if (1 == e[0].length && "identifier" == e[0][0].type) {
                    let r = e[0][0].data;
                    if (r in $87679206ec041316$var$Template.functions || "_" + r in $87679206ec041316$var$Template.functions) return $87679206ec041316$var$Template.expand(e, t10, n, "fn");
                }
                return $87679206ec041316$var$Template.expand(e[0], t10, n, "var");
            }
            return $87679206ec041316$var$Template.expand(e, t10, n, "fn");
        }
        if ("base-string" == r) {
            let r = -1;
            for (let a of e){
                let s = null;
                switch(r++, a.type){
                    case "template":
                        s = $87679206ec041316$var$Template.expand(a.data, t10, n, "template");
                        break;
                    case "string":
                    case "identifier":
                        s = a.data;
                        break;
                    case "base-string":
                        s = $87679206ec041316$var$Template.expand(a.data, t10, n, "base-string");
                }
                "void" != n && ("last" == n && r != e.length - 1 || i.push(s));
            }
        }
        if ("obj" == n) return i;
        if ("last" == n) return "Rose\\Arry" == typeOf(i) && (i = i[0]), i;
        if ("void" == n) return null;
        if ("arg" == n) return "array" == $0bc52734b49fc041$export$2e2bcd8739ae039.typeOf(i) ? 1 != i.length ? i.join("") : i[0] : i;
        if ("text" == n && "array" == $0bc52734b49fc041$export$2e2bcd8739ae039.typeOf(i)) {
            let e = (t)=>null != t && "object" == typeof t ? "map" in t ? t.map(e).join("") : "join" in t ? t.join("") : t.toString() : t
            ;
            i = i.map(e).join("");
        }
        return i;
    },
    compile: function(e) {
        return e = $87679206ec041316$var$Template.parse(e), function(t = null, n = "text") {
            return $87679206ec041316$var$Template.expand(e, t || {}, n);
        };
    },
    eval: function(e, t = null, n = "text") {
        return e = $87679206ec041316$var$Template.parse(e), $87679206ec041316$var$Template.expand(e, t || {}, n);
    },
    value: function(e, t = null) {
        return "array" != $0bc52734b49fc041$export$2e2bcd8739ae039.typeOf(e) ? e : $87679206ec041316$var$Template.expand(e, t || {}, "arg");
    },
    register: function(e, t) {
        $87679206ec041316$var$Template.functions[e] = t;
    },
    call: function(e, t, n = null) {
        return e in $87679206ec041316$var$Template.functions ? $87679206ec041316$var$Template.functions[e](t, null, n) : null;
    },
    getNamedValues: function(e, t, n = 1, r = !0) {
        let i = {}, a = 0;
        for(; n < e.length; n += 2){
            let s = $87679206ec041316$var$Template.expand(e[n], t, "arg");
            a || (a = s.startsWith(":") ? 1 : s.endsWith(":") ? 2 : 3), 1 == a ? s = s.substr(1) : 2 == a && (s = s.substr(0, s.length - 1)), i[s] = r ? $87679206ec041316$var$Template.expand(e[n + 1], t, "arg") : e[n + 1];
        }
        return i;
    }
};
$87679206ec041316$var$Template.functions = {
    global: function(e) {
        return globalThis;
    },
    null: function(e) {
        return null;
    },
    true: function(e) {
        return !0;
    },
    false: function(e) {
        return !1;
    },
    len: function(e) {
        return e[1].toString().length;
    },
    int: function(e) {
        return ~~e[1];
    },
    str: function(e) {
        return e[1].toString();
    },
    float: function(e) {
        return parseFloat(e[1]);
    },
    chr: function(e) {
        return String.fromCharCode(e[1]);
    },
    ord: function(e) {
        return e[1].toString().charCodeAt(0);
    },
    not: function(e) {
        return !e[1];
    },
    neg: function(e) {
        return -e[1];
    },
    abs: function(e) {
        return Math.abs(e[1]);
    },
    and: function(e) {
        for(let t = 1; t < e.length; t++)if (!e[t]) return !1;
        return !0;
    },
    or: function(e) {
        for(let t = 1; t < e.length; t++)if (~~e[t]) return !0;
        return !1;
    },
    eq: function(e) {
        return e[1] == e[2];
    },
    ne: function(e) {
        return e[1] != e[2];
    },
    lt: function(e) {
        return e[1] < e[2];
    },
    le: function(e) {
        return e[1] <= e[2];
    },
    gt: function(e) {
        return e[1] > e[2];
    },
    ge: function(e) {
        return e[1] >= e[2];
    },
    isnotnull: function(e) {
        return !!e[1];
    },
    isnull: function(e) {
        return !e[1];
    },
    iszero: function(e) {
        return 0 == parseInt(e[1]);
    },
    "eq?": function(e) {
        return e[1] == e[2];
    },
    "ne?": function(e) {
        return e[1] != e[2];
    },
    "lt?": function(e) {
        return e[1] < e[2];
    },
    "le?": function(e) {
        return e[1] <= e[2];
    },
    "gt?": function(e) {
        return e[1] > e[2];
    },
    "ge?": function(e) {
        return e[1] >= e[2];
    },
    "notnull?": function(e) {
        return !!e[1];
    },
    "null?": function(e) {
        return !e[1];
    },
    "zero?": function(e) {
        return 0 == parseInt(e[1]);
    },
    typeof: function(e) {
        return $0bc52734b49fc041$export$2e2bcd8739ae039.typeOf(e[1]);
    },
    "*": function(e) {
        let t = e[1];
        for(let n = 2; n < e.length; n++)t *= e[n];
        return t;
    },
    "/": function(e) {
        let t = e[1];
        for(let n = 2; n < e.length; n++)t /= e[n];
        return t;
    },
    "+": function(e) {
        let t = e[1];
        for(let n = 2; n < e.length; n++)t -= -e[n];
        return t;
    },
    "-": function(e) {
        let t = e[1];
        for(let n = 2; n < e.length; n++)t -= e[n];
        return t;
    },
    mul: function(e) {
        let t = e[1];
        for(let n = 2; n < e.length; n++)t *= e[n];
        return t;
    },
    div: function(e) {
        let t = e[1];
        for(let n = 2; n < e.length; n++)t /= e[n];
        return t;
    },
    sum: function(e) {
        let t = e[1];
        for(let n = 2; n < e.length; n++)t -= -e[n];
        return t;
    },
    sub: function(e) {
        let t = e[1];
        for(let n = 2; n < e.length; n++)t -= e[n];
        return t;
    },
    mod: function(e) {
        let t = e[1];
        for(let n = 2; n < e.length; n++)t %= e[n];
        return t;
    },
    pow: function(e) {
        let t = e[1];
        for(let n = 2; n < e.length; n++)t = Math.pow(t, e[n]);
        return t;
    },
    dump: function(e) {
        return JSON.stringify(e[1]);
    },
    _set: function(e, t) {
        for(let n = 1; n + 1 < e.length; n += 2){
            let r = $87679206ec041316$var$Template.value(e[n + 1], t);
            if (e[n].length > 1) {
                let i = $87679206ec041316$var$Template.expand(e[n], t, "varref");
                null != i && (i[0][i[1]] = r);
            } else t[$87679206ec041316$var$Template.value(e[n], t)] = r;
        }
        return "";
    },
    _unset: function(e, t) {
        for(let n = 1; n < e.length; n++)if (e[n].length > 1) {
            let r = $87679206ec041316$var$Template.expand(e[n], t, "varref");
            null != r && delete r[0][r[1]];
        } else delete t[$87679206ec041316$var$Template.value(e[n], t)];
        return null;
    },
    trim: function(e18) {
        return e18[1] ? "object" == typeof e18[1] ? e18[1].map((e)=>e.trim()
        ) : e18[1].trim() : "";
    },
    upper: function(e19) {
        return e19[1] ? "object" == typeof e19[1] ? e19[1].map((e)=>e.toUpperCase()
        ) : e19[1].toUpperCase() : "";
    },
    lower: function(e20) {
        return e20[1] ? "object" == typeof e20[1] ? e20[1].map((e)=>e.toLowerCase()
        ) : e20[1].toLowerCase() : "";
    },
    substr: function(e) {
        let t = e[e.length - 1].toString(), n = 0, r = null;
        return 4 == e.length ? (n = ~~e[1], r = ~~e[2]) : (n = ~~e[1], r = null), n < 0 && (n += t.length), r < 0 && (r += t.length), null === r && (r = t.length - n), t.substr(n, r);
    },
    replace: function(e) {
        return e[3].split(e[1]).join(e[2]);
    },
    nl2br: function(e21) {
        return e21[1] ? "object" == typeof e21[1] ? e21[1].map((e)=>e.replace(/\n/g, "<br/>")
        ) : e21[1].replace(/\n/g, "<br/>") : "";
    },
    "%": function(e) {
        e.shift();
        var t = e.shift();
        let n = "";
        for(let r = 0; r < e.length; r++)if ("array" == $0bc52734b49fc041$export$2e2bcd8739ae039.typeOf(e[r])) {
            n += `<${t}>`;
            for(let t11 = 0; t11 < e[r].length; t11++)n += e[r][t11];
            n += `</${t}>`;
        } else n += `<${t}>${e[r]}</${t}>`;
        return n;
    },
    "%%": function(e) {
        e.shift();
        var t = e.shift();
        let n = "", r = "";
        for(let t12 = 0; t12 < e.length; t12 += 2)t12 + 1 < e.length ? n += ` ${e[t12]}="${e[t12 + 1]}"` : r = e[t12];
        return r ? `<${t}${n}>${r}</${t}>` : `<${t}${n}/>`;
    },
    join: function(e) {
        return e[2] && "array" == $0bc52734b49fc041$export$2e2bcd8739ae039.typeOf(e[2]) ? e[2].join(e[1]) : "";
    },
    split: function(e) {
        return e[2] && "string" == typeof e[2] ? e[2].split(e[1]) : [];
    },
    keys: function(e) {
        return e[1] && "object" == typeof e[1] ? Object.keys(e[1]) : [];
    },
    values: function(e) {
        return e[1] && "object" == typeof e[1] ? Object.values(e[1]) : [];
    },
    _each: function(e, t) {
        let n = $87679206ec041316$var$Template.expand(e[1], t, "arg"), r = $87679206ec041316$var$Template.expand(e[2], t, "arg"), i = "", a = 0;
        if (!r) return i;
        for(let s in r)t[n] = r[s], t[n + "##"] = a++, t[n + "#"] = s, i += $87679206ec041316$var$Template.expand(e[3], t, "text");
        return delete t[n], delete t[n + "##"], delete t[n + "#"], i;
    },
    _foreach: function(e, t) {
        let n = $87679206ec041316$var$Template.expand(e[1], t, "arg"), r = $87679206ec041316$var$Template.expand(e[2], t, "arg"), i = 0;
        if (!r) return null;
        for(let a in r)t[n] = r[a], t[n + "##"] = i++, t[n + "#"] = a, $87679206ec041316$var$Template.expand(e[3], t, "text");
        return delete t[n], delete t[n + "##"], delete t[n + "#"], null;
    },
    "_?": function(e, t) {
        return $87679206ec041316$var$Template.expand(e[1], t, "arg") ? $87679206ec041316$var$Template.expand(e[2], t, "arg") : e.length > 3 ? $87679206ec041316$var$Template.expand(e[3], t, "arg") : "";
    },
    "_??": function(e, t) {
        let n = $87679206ec041316$var$Template.expand(e[1], t, "arg");
        return n || $87679206ec041316$var$Template.expand(e[2], t, "arg");
    },
    _if: function(e, t) {
        for(let n = 0; n < e.length; n += 3){
            if ("else" == $87679206ec041316$var$Template.expand(e[n], t, "arg")) return $87679206ec041316$var$Template.expand(e[n + 1], t, "text");
            if ($87679206ec041316$var$Template.expand(e[n + 1], t, "arg")) return $87679206ec041316$var$Template.expand(e[n + 2], t, "text");
        }
        return "";
    },
    _switch: function(e, t) {
        let n = $87679206ec041316$var$Template.expand(e[1], t, "arg");
        for(let r = 2; r < e.length; r += 2){
            let i = $87679206ec041316$var$Template.expand(e[r], t, "arg");
            if (i == n || "default" == i) return $87679206ec041316$var$Template.expand(e[r + 1], t, "text");
        }
        return "";
    },
    _break: function(e, t) {
        throw new Error("EXC_BREAK");
    },
    _continue: function(e, t) {
        throw new Error("EXC_CONTINUE");
    },
    _repeat: function(e, t) {
        if (e.length < 3 || 1 != (1 & e.length)) return "(`repeat`: Wrong number of parameters)";
        let n = $87679206ec041316$var$Template.value(e[1], t), r = null, i = 0, a = null, s = null;
        for(let n6 = 2; n6 < e.length - 1; n6 += 2)switch($87679206ec041316$var$Template.value(e[n6], t).toLowerCase()){
            case "from":
                i = parseFloat($87679206ec041316$var$Template.value(e[n6 + 1], t));
                break;
            case "to":
                a = parseFloat($87679206ec041316$var$Template.value(e[n6 + 1], t));
                break;
            case "count":
                r = parseFloat($87679206ec041316$var$Template.value(e[n6 + 1], t));
                break;
            case "step":
                s = parseFloat($87679206ec041316$var$Template.value(e[n6 + 1], t));
        }
        let c = e[e.length - 1], l = [];
        if (null !== a) {
            if (null === s && (s = i > a ? -1 : 1), s < 0) for(let e = i; e >= a; e += s)try {
                t[n] = e, l.push($87679206ec041316$var$Template.value(c, t));
            } catch (e23) {
                let t = e23.message;
                if ("EXC_BREAK" == t) break;
                if ("EXC_CONTINUE" == t) continue;
                throw e23;
            }
            else for(let e22 = i; e22 <= a; e22 += s)try {
                t[n] = e22, l.push($87679206ec041316$var$Template.value(c, t));
            } catch (e24) {
                let t = e24.message;
                if ("EXC_BREAK" == t) break;
                if ("EXC_CONTINUE" == t) continue;
                throw e24;
            }
        } else if (null !== r) {
            null === s && (s = 1);
            for(let e = i; r > 0; r--, e += s)try {
                t[n] = e, l.push($87679206ec041316$var$Template.value(c, t));
            } catch (e25) {
                let t = e25.message;
                if ("EXC_BREAK" == t) break;
                if ("EXC_CONTINUE" == t) continue;
                throw e25;
            }
        } else {
            null === s && (s = 1);
            for(let e = i;; e += s)try {
                t[n] = e, l.push($87679206ec041316$var$Template.value(c, t));
            } catch (e26) {
                let t = e26.message;
                if ("EXC_BREAK" == t) break;
                if ("EXC_CONTINUE" == t) continue;
                throw e26;
            }
        }
        return delete t[n], l;
    },
    _for: function(e, t) {
        if (e.length < 3 || 1 != (1 & e.length)) return "(`for`: Wrong number of parameters)";
        let n = $87679206ec041316$var$Template.value(e[1], t), r = null, i = 0;
        to = null;
        let a = null;
        for(let n7 = 2; n7 < e.length - 1; n7 += 2)switch(value = $87679206ec041316$var$Template.value(e[n7], t), value.toLowerCase()){
            case "from":
                i = parseFloat($87679206ec041316$var$Template.value(e[n7 + 1], t));
                break;
            case "to":
                to = parseFloat($87679206ec041316$var$Template.value(e[n7 + 1], t));
                break;
            case "count":
                r = parseFloat($87679206ec041316$var$Template.value(e[n7 + 1], t));
                break;
            case "step":
                a = parseFloat($87679206ec041316$var$Template.value(e[n7 + 1], t));
        }
        let s = e[e.length - 1];
        if (null !== to) {
            if (null === a && (a = i > to ? -1 : 1), a < 0) for(let e = i; e >= to; e += a)try {
                t[n] = e, $87679206ec041316$var$Template.value(s, t);
            } catch (e28) {
                let t = e28.message;
                if ("EXC_BREAK" == t) break;
                if ("EXC_CONTINUE" == t) continue;
                throw e28;
            }
            else for(let e27 = i; e27 <= to; e27 += a)try {
                t[n] = e27, $87679206ec041316$var$Template.value(s, t);
            } catch (e29) {
                let t = e29.message;
                if ("EXC_BREAK" == t) break;
                if ("EXC_CONTINUE" == t) continue;
                throw e29;
            }
        } else if (null !== r) {
            null === a && (a = 1);
            for(let e = i; r > 0; r--, e += a)try {
                t[n] = e, $87679206ec041316$var$Template.value(s, t);
            } catch (e30) {
                let t = e30.message;
                if ("EXC_BREAK" == t) break;
                if ("EXC_CONTINUE" == t) continue;
                throw e30;
            }
        } else {
            null === a && (a = 1);
            for(let e = i;; e += a)try {
                t[n] = e, $87679206ec041316$var$Template.value(s, t);
            } catch (e31) {
                let t = e31.message;
                if ("EXC_BREAK" == t) break;
                if ("EXC_CONTINUE" == t) continue;
                throw e31;
            }
        }
        return delete t[n], null;
    },
    _loop: function(e, t) {
        if (e.length < 2) return "(`loop`: Wrong number of parameters)";
        let n = e[1];
        for(;;)try {
            $87679206ec041316$var$Template.value(n, t);
        } catch (e32) {
            let t = e32.message;
            if ("EXC_BREAK" == t) break;
            if ("EXC_CONTINUE" == t) continue;
            throw e32;
        }
        return null;
    },
    _echo: function(e, t) {
        let n = "";
        for(let r = 1; r < e.length; r++)n += $87679206ec041316$var$Template.expand(e[r], t, "arg");
        return console.log(n), "";
    },
    "_#": function(e, t) {
        let n = [];
        for(let r = 1; r < e.length; r++)n.push($87679206ec041316$var$Template.expand(e[r], t, "arg"));
        return n;
    },
    "_##": function(e, t) {
        let n = [];
        for(let t13 = 1; t13 < e.length; t13++)n.push(e[t13]);
        return n;
    },
    "_&": function(e, t) {
        return $87679206ec041316$var$Template.getNamedValues(e, t, 1, !0);
    },
    "_&&": function(e, t) {
        return $87679206ec041316$var$Template.getNamedValues(e, t, 1, !1);
    },
    contains: function(e, t, n) {
        let r = e[1];
        if ("object" != typeof r) return n.err = "Argument is not a Map", !1;
        let i = "";
        for(let t14 = 2; t14 < e.length; t14++)e[t14] in r || (i += ", " + e[t14]);
        return "" == i || (n.err = i.substr(1), !1);
    },
    has: function(e, t, n) {
        let r = e[2];
        return "object" == $0bc52734b49fc041$export$2e2bcd8739ae039.typeOf(r) && e[1] in r;
    },
    _map: function(e, t) {
        let n = $87679206ec041316$var$Template.expand(e[1], t, "arg"), r = $87679206ec041316$var$Template.expand(e[2], t, "arg");
        if (!r) return r;
        let i = "array" == $0bc52734b49fc041$export$2e2bcd8739ae039.typeOf(r), a = i ? [] : {}, s = 0;
        for(let c in r)t[n] = r[c], t[n + "##"] = s++, t[n + "#"] = c, i ? a.push($87679206ec041316$var$Template.expand(e[3], t, "arg")) : a[c] = $87679206ec041316$var$Template.expand(e[3], t, "arg");
        return delete t[n], delete t[n + "##"], delete t[n + "#"], a;
    },
    _filter: function(e, t) {
        let n = $87679206ec041316$var$Template.expand(e[1], t, "arg"), r = $87679206ec041316$var$Template.expand(e[2], t, "arg");
        if (!r) return r;
        let i = "array" == $0bc52734b49fc041$export$2e2bcd8739ae039.typeOf(r), a = i ? [] : {}, s = 0;
        for(let c in r)t[n] = r[c], t[n + "##"] = s++, t[n + "#"] = c, ~~$87679206ec041316$var$Template.expand(e[3], t, "arg") && (i ? a.push(r[c]) : a[c] = r[c]);
        return delete t[n], delete t[n + "##"], delete t[n + "#"], a;
    },
    expand: function(e, t, n) {
        return $87679206ec041316$var$Template.expand($87679206ec041316$var$Template.parseTemplate(e[1], "{", "}"), 3 == e.length ? e[2] : n);
    },
    _call: function(e33, t) {
        let n = $87679206ec041316$var$Template.expand(e33[1], t, "varref");
        if (!n || "function" != typeof n[0][n[1]]) throw new Error("Expression is not a function: " + $87679206ec041316$var$Template.expand(e33[1], t, "obj").map((e)=>null == e ? "." : e
        ).join(""));
        let r = [];
        for(let n8 = 2; n8 < e33.length; n8++)r.push($87679206ec041316$var$Template.value(e33[n8], t));
        return n[0][n[1]](...r);
    }
};
var $87679206ec041316$export$2e2bcd8739ae039 = $87679206ec041316$var$Template;
const $07eb01cb16db42c1$export$eefcfe56efaaa57d = $0bc52734b49fc041$export$2e2bcd8739ae039, $07eb01cb16db42c1$export$4c85e640eb41c31b = $8651ccc8e7e5ec23$export$2e2bcd8739ae039, $07eb01cb16db42c1$export$d61e24a684f9e51 = $b6677aaba4a0e4e9$export$2e2bcd8739ae039, $07eb01cb16db42c1$export$ec8b666c5fe2c75a = $cb9168e99253fb00$export$2e2bcd8739ae039, $07eb01cb16db42c1$export$a1edc412be3e1841 = $4d78f9734f64a4b0$export$2e2bcd8739ae039, $07eb01cb16db42c1$export$59eced47f477f85a = $e1ecb91f5a3e913e$export$2e2bcd8739ae039, $07eb01cb16db42c1$export$19342e026b58ebb7 = $ab6fe0a06ccbea8c$export$2e2bcd8739ae039, $07eb01cb16db42c1$export$3a9581c9ade29768 = $65a911499be22e32$export$2e2bcd8739ae039, $07eb01cb16db42c1$export$fb8073518f34e6ec = $ac94ca3ce7f52d5a$export$2e2bcd8739ae039, $07eb01cb16db42c1$export$14416b8d99d47caa = $87679206ec041316$export$2e2bcd8739ae039;

});


var $hNLgQ = parcelRequire("hNLgQ");

var $hNLgQ = parcelRequire("hNLgQ");
const $70dacaf824eda432$var$XOR = (value, x)=>(value ^ x) & 0x7FFFFFFF
;
const $70dacaf824eda432$var$SHR = (value, x)=>value >>> x & 0x7FFFFFFF
;
const $70dacaf824eda432$var$SHL = (value, x)=>value << x & 0x7FFFFFFF
;
/**
 * Random number generator based on the WELL algorithm family.
 */ //!class Random
const $70dacaf824eda432$var$Random = $hNLgQ.Class.extend({
    /**
	 * State of the generator.
	 */ state: null,
    /**
	 * Index of the next state value.
	 */ index: 0,
    /**
	 * 	Seed value of the generator. Remains constant throughout the life of the generator.
	 * 	!readonly seed: number;
	 */ seed: 0,
    /**
	 * 	Initializes the instance of the pseudo-random number generator.
	 * 	@param seed - Value to seed the random number generator. If none provided, default one (0xDAE7A5D3) will be used.
	 *
	 *	!constructor (seed?: number);
	 */ __ctor: function(seed = 0xDAE7A5D3) {
        this.state = [
            0xA5F7310C,
            0xEF731CF3,
            0xFA784322,
            0x7834FC31,
            0xD9AF7813,
            0xDE78AD13,
            0x783F3418,
            0xAA123176,
            0x871CF4D1,
            0x73412FAB,
            0xBAE6C710,
            0x06F73481,
            0x8910CF15,
            0x927CF813,
            0xBCF7834F,
            0x73F61193
        ];
        this.index = 0;
        this.setSeed(seed);
    },
    /**
	 * 	Sets the seed of the pseudo-random number generator.
	 * 	@param value - Seed value to use (32-bit unsigned integer).
	 *
	 *	!setSeed (value: number) : Random;
	 */ setSeed: function(value) {
        this.seed = value;
        this.state = [
            0xA5F7310C,
            0xEF731CF3,
            0xFA784322,
            0x7834FC31,
            0xD9AF7813,
            0xDE78AD13,
            0x783F3418,
            0xAA123176,
            0x871CF4D1,
            0x73412FAB,
            0xBAE6C710,
            0x06F73481,
            0x8910CF15,
            0x927CF813,
            0xBCF7834F,
            0x73F61193
        ];
        for(let i = 0; i < this.state.length; i++)this.state[i] = $70dacaf824eda432$var$XOR(this.state[i], this.seed);
        return this;
    },
    /**
	 * 	Generates a 32-bit unsigned integer.
	 *	!nextInt32 () : number;
	 */ nextInt32: function() {
        let a, b, c, d;
        a = this.state[this.index];
        c = this.state[this.index + 13 & 15];
        b = $70dacaf824eda432$var$XOR($70dacaf824eda432$var$XOR($70dacaf824eda432$var$XOR(a, c), $70dacaf824eda432$var$SHL(a, 16)), $70dacaf824eda432$var$SHL(c, 15));
        c = this.state[this.index + 9 & 15];
        c = $70dacaf824eda432$var$XOR(c, $70dacaf824eda432$var$SHR(c, 11));
        a = this.state[this.index] = $70dacaf824eda432$var$XOR(b, c);
        d = $70dacaf824eda432$var$XOR(a, $70dacaf824eda432$var$SHL(a, 5) & 0xDA442D24);
        this.index = this.index + 15 & 15;
        a = this.state[this.index];
        this.state[this.index] = $70dacaf824eda432$var$XOR($70dacaf824eda432$var$XOR($70dacaf824eda432$var$XOR($70dacaf824eda432$var$XOR($70dacaf824eda432$var$XOR(a, b), d), $70dacaf824eda432$var$SHL(a, 2)), $70dacaf824eda432$var$SHL(b, 18)), $70dacaf824eda432$var$SHL(c, 28));
        return this.state[this.index] & 0x7FFFFFFFF;
    },
    /**
	 * 	Generates a 16-bit unsigned integer.
	 *	!nextInt16 () : number;
	 */ nextInt16: function() {
        return this.nextInt32() & 0xFFFF;
    },
    /**
	 * 	Generates an 8-bit unsigned integer.
	 * 	!nextInt8 () : number;
	 */ nextInt8: function() {
        return this.nextInt32() & 0xFF;
    },
    /**
	 * 	Generates a floating point number between 0 an 1 (inclusive).
	 * 	!nextFloat () : number;
	 */ nextFloat: function() {
        return this.nextInt32() / 0x7FFFFFFF;
    }
});
var $70dacaf824eda432$export$2e2bcd8739ae039 = $70dacaf824eda432$var$Random;


var /*
**	system/keycode.js
**
**	Copyright (c) 2016-2021, RedStar Technologies, All rights reserved.
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
*/ //:/**
//: * 	Enumeration of key codes supported by the system.
//: */
//!enum KeyCode
$315d91d8694d77f0$export$2e2bcd8739ae039 = {
    BACKSPACE: 8,
    //!BACKSPACE
    TAB: 9,
    //!TAB
    ENTER: 13,
    //!ENTER
    SHIFT: 16,
    //!SHIFT
    CTRL: 17,
    //!CTRL
    ESC: 27,
    //!ESC
    SPACE: 32,
    //!SPACE
    PGUP: 33,
    //!PGUP
    PGDN: 34,
    //!PGDN
    END: 35,
    //!END
    HOME: 36,
    //!HOME
    INS: 45,
    //!INS
    DEL: 46,
    //!DEL
    LEFT: 37,
    //!LEFT
    UP: 38,
    //!UP
    RIGHT: 39,
    //!RIGHT
    DOWN: 40,
    //!DOWN
    NUM_PLUS: 107,
    //!NUM_PLUS
    NUM_MINUS: 109,
    //!NUM_MINUS
    NUM_ASTERISK: 106,
    //!NUM_ASTERISK
    NUM_SLASH: 111,
    //!NUM_SLASH
    NUM_DOT: 110,
    //!NUM_DOT
    NUM_0: 96,
    //!NUM_0
    NUM_1: 97,
    //!NUM_1
    NUM_2: 98,
    //!NUM_2
    NUM_3: 99,
    //!NUM_3
    NUM_4: 100,
    //!NUM_4
    NUM_5: 101,
    //!NUM_5
    NUM_6: 102,
    //!NUM_6
    NUM_7: 103,
    //!NUM_7
    NUM_8: 104,
    //!NUM_8
    NUM_9: 105,
    //!NUM_9
    D0: 48,
    //!D0
    D1: 49,
    //!D1
    D2: 50,
    //!D2
    D3: 51,
    //!D3
    D4: 52,
    //!D4
    D5: 53,
    //!D5
    D6: 54,
    //!D6
    D7: 55,
    //!D7
    D8: 56,
    //!D8
    D9: 57,
    //!D9
    A: 65,
    //!A
    B: 66,
    //!B
    C: 67,
    //!C
    D: 68,
    //!D
    E: 69,
    //!E
    F: 70,
    //!F
    G: 71,
    //!G
    H: 72,
    //!H
    I: 73,
    //!I
    J: 74,
    //!J
    K: 75,
    //!K
    L: 76,
    //!L
    M: 77,
    //!M
    N: 78,
    //!N
    O: 79,
    //!O
    P: 80,
    //!P
    Q: 81,
    //!Q
    R: 82,
    //!R
    S: 83,
    //!S
    T: 84,
    //!T
    U: 85,
    //!U
    V: 86,
    //!V
    W: 87,
    //!W
    X: 88,
    //!X
    Y: 89,
    //!Y
    Z: 90
};



var $hNLgQ = parcelRequire("hNLgQ");

var $hNLgQ = parcelRequire("hNLgQ");
/*
**	utils/recycler.js
**
**	Copyright (c) 2016-2021, RedStar Technologies, All rights reserved.
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
*/ const $1fea8365818f3b22$var$recyclingFacilities = {};
let $1fea8365818f3b22$var$totalPreallocated = 0;
const $1fea8365818f3b22$var$Recycler = {};
$parcel$global.Recycler = $1fea8365818f3b22$var$Recycler;
var $1fea8365818f3b22$export$2e2bcd8739ae039 = $1fea8365818f3b22$var$Recycler;
//:/**
//: * 	Provides functions to attach recycling functionality to any class for object pooling.
//: */
//!namespace Recycler
/**
 * 	Attaches recycling methods (`allocate`, `alloc` and `free`) to the specified class. Class should implement method `init` to initialize the instance (and return itself)
 * 	and `__dtor` to destroy it.
 *
 * 	@param {*} maxPoolSize - Maximum number of instance to hold in the recycler.
 * 	@param {*} minPoolSize - Minimum number of instances to pre-allocate. Defaults to 0.375*`maxPoolSize` if not specified.
 * 
 * 	!function attachTo (targetClass: any, maxPoolSize?: number, minPoolSize?: number) : any;
 */ $1fea8365818f3b22$var$Recycler.attachTo = function(targetClass, maxPoolSize = 8192, minPoolSize = null) {
    if (!targetClass.prototype.className) throw new Error('Unable to attach recycler methods to an unnamed class.');
    if (!('__dtor' in targetClass.prototype)) throw new Error('Recycler: Class ' + targetClass.prototype.className + ' requires `__dtor` method.');
    if (!('init' in targetClass.prototype)) throw new Error('Recycler: Class ' + targetClass.prototype.className + ' requires `init` method.');
    if (minPoolSize === null) minPoolSize = int(maxPoolSize * 0.375);
    $1fea8365818f3b22$var$recyclingFacilities[targetClass.prototype.className] = targetClass;
    targetClass.recyclerPool = [];
    targetClass.recyclerPoolMax = maxPoolSize;
    targetClass.prototype.objectId = 0;
    targetClass.recyclerNextObjectId = 0;
    targetClass.recyclerCreated = 0;
    targetClass.recyclerRecycled = 0;
    targetClass.recyclerMissed = 0;
    targetClass.recyclerLength = 0;
    targetClass.recyclerActive = 0;
    let preallocated = false;
    /**
	 * 	Preallocates instances according the the minPoolSize value.
	 */ targetClass.preallocate = function(maximum = null) {
        if (preallocated) return;
        let n = maximum === null ? minPoolSize : Math.min(maximum, minPoolSize);
        for(let i = 0; i < n; i++){
            targetClass.recyclerPool.push(new targetClass());
            targetClass.recyclerLength++;
            $1fea8365818f3b22$var$totalPreallocated++;
        }
        preallocated = true;
    };
    /**
	 * 	Allocates a new instance of the class. To ensure correct instance state a call to `init` must be made later.
	 * 	@returns {object}
	 */ targetClass.allocate = function() {
        let item;
        if (!this.recyclerLength) {
            item = new targetClass();
            targetClass.recyclerCreated++;
        } else {
            item = this.recyclerPool[--this.recyclerLength];
            targetClass.recyclerRecycled++;
        }
        targetClass.recyclerActive++;
        item.objectId = ++this.recyclerNextObjectId;
        this.recyclerNextObjectId &= 0x7FFFFFFF;
        return item;
    };
    /**
	 * 	Allocates an instance and initializes it. Internally runs `allocate` first and then `init` with up to 10 parameters.
	 * 	@param {any} a0..a9 
	 * 	@returns {object}
	 */ targetClass.alloc = function(a0 = null, a1 = null, a2 = null, a3 = null, a4 = null, a5 = null, a6 = null, a7 = null, a8 = null, a9 = null) {
        return targetClass.allocate().init(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9);
    };
    /**
	 * 	Releases the self object and adds it back to the pool. Duplicate call to this method will result in an error.
	 * 	@returns {object}
	 */ targetClass.prototype.free = function() {
        if (this.objectId < 0) return this;
        if (this.objectId == 0) {
            console.error('ERROR: Already released instance of ' + targetClass.prototype.className);
            return this;
        }
        this.__dtor();
        this.objectId = 0;
        if (targetClass.recyclerLength >= maxPoolSize) targetClass.recyclerMissed++;
        else targetClass.recyclerPool[targetClass.recyclerLength++] = this;
        targetClass.recyclerActive--;
        return this;
    };
    /**
	 * 	Sets a flag used to prevent the instance from being destroyed.
	 * 	@returns {object}
	 */ targetClass.prototype.lockInstance = function(value) {
        this.objectId = Math.abs(this.objectId);
        if (value) this.objectId = -this.objectId;
        return this;
    };
};
/**
 * 	Shows stats about all recycling facilities (or just the specified one) using `console.debug`.
 * 	@param name - Name of the class to show.
 * 	!function showStats (name?: string) : void;
 */ $1fea8365818f3b22$var$Recycler.showStats = function(name = null) {
    let list = $1fea8365818f3b22$var$recyclingFacilities;
    console.log('Total Preallocated: ' + $1fea8365818f3b22$var$totalPreallocated);
    if (name === true) {
        console.group('Recycling Facilities');
        for(let i in list){
            let c = list[i];
            if (!c.recyclerCreated) continue;
            console.debug(i + ': ' + (100 * (c.recyclerCreated / c.recyclerPoolMax)).toFixed(1) + '%  =>  overhead=' + c.recyclerCreated + ', active=' + c.recyclerActive + ', array=' + c.recyclerPool.length + ', recycled=' + c.recyclerRecycled + ', in-recycler=' + c.recyclerLength + ', missed=' + c.recyclerMissed + ', space=' + (c.recyclerPoolMax - c.recyclerLength));
        }
        console.groupEnd();
        return;
    }
    if (name !== null) {
        if (typeof name === 'string') {
            let c = $1fea8365818f3b22$var$recyclingFacilities[name];
            console.debug(name + ': ' + (100 * (c.recyclerCreated / c.recyclerPoolMax)).toFixed(1) + '%  =>  overhead=' + c.recyclerCreated + ', active=' + c.recyclerActive + ', array=' + c.recyclerPool.length + ', recycled=' + c.recyclerRecycled + ', in-recycler=' + c.recyclerLength + ', missed=' + c.recyclerMissed + ', space=' + (c.recyclerPoolMax - c.recyclerLength));
            return;
        }
        list = name;
    }
    console.group('Recycling Facilities');
    for(let i in list){
        let c = list[i];
        console.debug(i + ': ' + (100 * (c.recyclerCreated / c.recyclerPoolMax)).toFixed(1) + '%  =>  overhead=' + c.recyclerCreated + ', active=' + c.recyclerActive + ', array=' + c.recyclerPool.length + ', recycled=' + c.recyclerRecycled + ', in-recycler=' + c.recyclerLength + ', missed=' + c.recyclerMissed + ', space=' + (c.recyclerPoolMax - c.recyclerLength));
    }
    console.groupEnd();
};
/**
 * 	Create a new class extending the specified target class, this new class is a recycling facility and is placed under property `Pool` of the target class. This
 * 	method can be used instead of the usual `attachTo` when the target class construct/deconstruct methods need to remain untouched.
 *
 * 	@param {*} maxPoolSize - Maximum number of instance to hold in the recycler.
 * 	@param {*} minPoolSize - Minimum number of instances to pre-allocate. Defaults to 0.375*`maxPoolSize` if not specified.
 * 
 *	!function createPool (targetClass: any, maxPoolSize?: number, minPoolSize?: number) : any;
 */ $1fea8365818f3b22$var$Recycler.createPool = function(targetClass, maxPoolSize = 8192, minPoolSize = null) {
    const name = targetClass.prototype.className;
    if (!name) throw new Error('Unable to create pool sub-class on an unnamed class.');
    const Pool = targetClass.extend({
        className: targetClass.prototype.className,
        __ctor: function() {},
        init: function(a0 = null, a1 = null, a2 = null, a3 = null, a4 = null, a5 = null, a6 = null, a7 = null, a8 = null, a9 = null) {
            this._super[name].__ctor(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9);
            return this;
        }
    });
    $1fea8365818f3b22$var$Recycler.attachTo(Pool, maxPoolSize, minPoolSize);
    targetClass.Pool = Pool;
    return targetClass;
};
/**
 * 	Runs the preallocation process of all registered pools. Returns the total number of instances preallocated.
 * 	@param {number|null} maxPreallocationsPerPool
 * 	!function preallocate (maxPreallocationsPerPool?: number) : number;
 */ $1fea8365818f3b22$var$Recycler.preallocate = function(maxPreallocationsPerPool = null) {
    $1fea8365818f3b22$var$totalPreallocated = 0;
    for(let i in $1fea8365818f3b22$var$recyclingFacilities)$1fea8365818f3b22$var$recyclingFacilities[i].preallocate(maxPreallocationsPerPool);
    return $1fea8365818f3b22$var$totalPreallocated;
};


//![import "./recycler"]
//:/**
//: * 	Generic class for linkable items such as required by List. The responsibility of this class is to wrap a value into a linkable object.
//: */
//!class Linkable
const $33942535e15f5720$var$Linkable = $hNLgQ.Class.extend({
    className: "Linkable",
    /**
	 * 	Pointer to the previous item in the chain.
	 * 	!readonly prev: Linkable;
	 */ prev: null,
    /* Linkable */ /**
	 * 	Pointer to the next item in the chain.
	 * 	!readonly next: Linkable;
	 */ next: null,
    /* Linkable */ /**
	 * 	Wrapped value.
	 * 	!value: any;
	 */ value: null,
    /**
	 * 	Initializes the linkable item and wraps the given value. Sets the `prev` and `next` pointers to null.
	 * 	!constructor (value?: any);
	 */ __ctor: function(value) {
        this.value = value;
        this.clear();
    },
    /**
	 * 	Unlinks the linkable item.
	 */ __dtor: function() {
        this.unlink();
    },
    /**
	 * 	Sets the previous/next connection pointers to null. Returns `this`.
	 * 	!clear() : Linkable;
	 */ clear: function() {
        this.next = this.prev = null;
        return this;
    },
    /**
	 * 	Links the item such that it will be located after the given reference.
	 * 	!linkAfter (ref: Linkable) : Linkable;
	 */ linkAfter: function(ref) {
        this.prev = ref;
        this.next = ref ? ref.next : null;
        if (ref) {
            if (ref.next) ref.next.prev = this;
            ref.next = this;
        }
    },
    /**
	 * 	Links the item such that it will be located before the given reference.
	 * 	!linkBefore (ref: Linkable) : Linkable;
	 */ linkBefore: function(ref) {
        this.prev = ref ? ref.prev : null;
        this.next = ref;
        if (ref) {
            if (ref.prev) ref.prev.next = this;
            ref.prev = this;
        }
    },
    /**
	 * 	Unlinks the item by linking the `prev` and `next` together (when available) and returns `this`.
	 * 	!unlink() : Linkable;
	 */ unlink: function() {
        if (this.prev) this.prev.next = this.next;
        if (this.next) this.next.prev = this.prev;
        return this.clear();
    }
});
//!/class
//!namespace Linkable
//!namespace Pool
/**
	 * 	Allocates a linkable item and wraps the given value. Sets the `prev` and `next` pointers to null.
	 * 	!function alloc (value?: any) : Linkable;
	 */ $1fea8365818f3b22$export$2e2bcd8739ae039.createPool($33942535e15f5720$var$Linkable, 16384, 6144);
var $33942535e15f5720$export$2e2bcd8739ae039 = $33942535e15f5720$var$Linkable;



//![import "./linkable"]
//![import "./recycler"]
//:/**
//: * 	Implementation of a generic linked list.
//: */
//!class List
const $f6bd4ab8b6c953de$var$List = $hNLgQ.Class.extend({
    /**
	 * 	Name of the class (for inheritance purposes).
	 */ className: "List",
    /**
	 * 	Pointer to the first node in the list.
	 * 	!top: Linkable;
	 */ top: null,
    /**
	 * 	Pointer to the last node in the list.
	 * 	!bottom: Linkable;
	 */ bottom: null,
    /**
	 * 	Number of values in the list.
	 * 	!length: number;
	 */ length: 0,
    /**
	 * 	Initializes the instance to an empty list.
	 * 	!constructor();
	 */ __ctor: function() {
        this.top = null;
        this.bottom = null;
        this.length = 0;
    },
    /**
	 * 	Traverses the list and destroys all nodes. The actual values are maintained. To destroy the
	 * 	list contents call clear() instead.
	 */ __dtor: function() {
        this.reset();
    },
    /**
	 * 	Clones all contents and returns a new list.
	 * 	!clone() : List;
	 */ clone: function() {
        let list = $f6bd4ab8b6c953de$var$List.Pool.alloc();
        for(let i = this.top; i; i = i.next)list.push($hNLgQ.Rinn.clone(i.value));
        return list;
    },
    /**
	 * 	Traverses the list and destroys all nodes and values.
	 * 	!clear() : List;
	 */ clear: function() {
        let i, ni;
        for(i = this.top; i; i = ni){
            ni = i.next;
            dispose(i.free().value);
        }
        this.top = this.bottom = null;
        this.length = 0;
        return this;
    },
    /**
	 * 	Traverses the list, destroys all nodes **but** values are preserved.
	 * 	!reset() : List;
	 */ reset: function() {
        let i, ni;
        for(i = this.top; i != null; i = ni){
            ni = i.next;
            i.free();
        }
        this.top = this.bottom = null;
        this.length = 0;
        return this;
    },
    /**
	 * 	Returns the first value in the list.
	 * 	!first() : any;
	 */ first: function() {
        return this.top !== null ? this.top.value : null;
    },
    /**
	 * 	Returns the last value in the list.
	 * 	!last() : any;
	 */ last: function() {
        return this.bottom !== null ? this.bottom.value : null;
    },
    /**
	 * 	Returns a value given its index.
	 * 	!getAt (index: number) : any;
	 */ getAt: function(index) {
        let i = null;
        for(i = this.top; i && index-- > 0; i = i.next);
        return i != null ? i.value : null;
    },
    /**
	 * 	Returns the node at the given index.
	 * 	!getNodeAt (index: number) : Linkable;
	 */ getNodeAt: function(index) {
        let i = null;
        for(i = this.top; i && index--; i = i.next);
        return i;
    },
    /**
	 * 	Returns the node of a value given another value to compare, uses identical comparison (===) to match the value.
	 * 	!sgetNode (value: any) : Linkable;
	 */ sgetNode: function(value) {
        for(let i = this.top; i; i = i.next)if (i.value === value) return i;
        return null;
    },
    /**
	 * 	Removes the given value from the list and returns it.
	 * 	!remove<T> (value: T) : T;
	 */ remove: function(i) {
        if (i != null && !$33942535e15f5720$export$2e2bcd8739ae039.isInstance(i)) i = this.sgetNode(i);
        if (!i) return null;
        if (!i.prev) this.top = i.next;
        if (!i.next) this.bottom = i.prev;
        this.length--;
        return i.free().value;
    },
    /**
	 * 	Adds a value before the given reference node.
	 * 	!insertBefore<T> (ref: Linkable, value: T) : T;
	 */ insertBefore: function(ref, value) {
        if (!ref) return this;
        let i = $33942535e15f5720$export$2e2bcd8739ae039.Pool.alloc(value);
        i.linkBefore(ref);
        if (ref == this.top) this.top = i;
        this.length++;
        return value;
    },
    /**
	 * 	Adds a value after the given reference node.
	 * 	!insertAfter<T> (ref: Linkable, value: T) : T;
	 */ insertAfter: function(ref, value) {
        if (!ref) return this;
        let i = $33942535e15f5720$export$2e2bcd8739ae039.Pool.alloc(value);
        i.linkAfter(ref);
        if (ref == this.bottom) this.bottom = i;
        this.length++;
        return value;
    },
    /**
	 * 	Adds a value to the top of the list.
	 * 	!unshift<T> (value: T) : T;
	 */ unshift: function(value) {
        let i = $33942535e15f5720$export$2e2bcd8739ae039.Pool.alloc(value);
        i.linkBefore(this.top);
        if (!this.bottom) this.bottom = i;
        this.top = i;
        this.length++;
        return value;
    },
    /**
	 * 	Removes a value from the top of the list.
	 * 	!shift() : any;
	 */ shift: function() {
        let i = this.top;
        if (!i) return null;
        if (!(this.top = i.next)) this.bottom = null;
        this.length--;
        return i.free().value;
    },
    /**
	 * 	Adds a value to the bottom of the list.
	 * 	!push<T> (value: T) : T;
	 */ push: function(value) {
        let i = $33942535e15f5720$export$2e2bcd8739ae039.Pool.alloc(value);
        i.linkAfter(this.bottom);
        if (!this.top) this.top = i;
        this.bottom = i;
        this.length++;
        return value;
    },
    /**
	 * 	Removes a value from the bottom of the list.
	 * 	!pop() : any;
	 */ pop: function() {
        let i = this.bottom;
        if (!i) return null;
        if (!(this.bottom = i.prev)) this.top = null;
        this.length--;
        return i.free().value;
    },
    /**
	 * 	Appends all contents of the given list to the current one.
	 * 	!append (list: List) : List;
	 */ append: function(list) {
        for(let i = list.top; i; i = i.next)this.push(i.value);
        return this;
    },
    /**
	 * 	Traverses the list calling the specified function for each value.
	 * 	@param fn - Callback to execute, return `false` to stop the loop immediately.
	 * 	!forEach(fn: (value: any, node: Linkable, list: List, context: object) => boolean, context?: object) : boolean;
	 */ forEach: function(fn, context = null) {
        let ni;
        for(let i = this.top; i; i = ni){
            ni = i.next;
            if (fn(i.value, i, this, context) === false) return false;
        }
        return true;
    },
    /**
	 * 	Traverses the list in reverse order, calling the specified function for each value.
	 * 	@param fn - Callback to execute, return `false` to stop the loop immediately.
	 * 	!forEachRev(fn: (value: any, node: Linkable, list: List, context: object) => boolean, context?: object) : boolean;
	 */ forEachRev: function(fn, context = null) {
        let ni;
        for(let i = this.bottom; i; i = ni){
            ni = i.prev;
            if (fn(i.value, i, this, context) === false) return false;
        }
        return true;
    },
    /**
	 * 	Returns the first value where the specified function returns `true`.
	 * 	!find (fn: (value: any, context: object) => boolean, context?: object) : any;
	 */ find: function(fn, context = null) {
        for(let i = this.top; i; i = i.next)if (fn(i.value, context)) return i.value;
        return null;
    },
    /**
	 * 	Returns an array with all values where the specified function returns `true`.
	 * 	!filter (fn: (value: any, context: object) => boolean, context?: object) : Array<any>;
	 */ filter: function(fn, context = null) {
        let list = $f6bd4ab8b6c953de$var$List.Pool.alloc();
        for(let i = this.top; i; i = i.next)if (fn(i.value, context)) list.push(i.value);
        return list;
    },
    /**
	 * 	Returns an array with all the values in the list.
	 * 	!toArray() : Array<any>;
	 */ toArray: function() {
        let array = [];
        for(let i = this.top; i; i = i.next)array.push(i.value);
        return array;
    }
});
//!/class
//!namespace List
//!namespace Pool
/**
	 * 	Allocates an empty list.
	 * 	!function alloc() : List;
	 */ $1fea8365818f3b22$export$2e2bcd8739ae039.createPool($f6bd4ab8b6c953de$var$List, 16384, 6144);
var $f6bd4ab8b6c953de$export$2e2bcd8739ae039 = $f6bd4ab8b6c953de$var$List;



/*
**	system/timer.js
**
**	Copyright (c) 2016-2021, RedStar Technologies, All rights reserved.
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
*/ //!class Timer
/**
 * 	@param vsync - Indicates if requestAnimationFrame should be used instead of setTimeout.
 * 	@param interval - Amount of milliseconds between timer activations.
 * 	@param callback - Function to execute on each timer activation.
 *
 * 	!constructor (vsync: boolean, interval: number, callback: (dt: number, timer: Timer) => void );
 */ const $f1d765b3e2b341ba$var$Timer = function(vsync, interval, callback) {
    this.callback = callback;
    this.interval = interval;
    this.vsync = vsync;
    this.handle = null;
    this.isRunning = false;
    this.startTime = 0;
    this.rTime = 0;
    this.sTime = 0;
    this.lTime = 0;
    this.tDelta = 0;
    this._onTimeout = ()=>{
        this.onTimeout();
    };
    this._onTimeout_b = ()=>{
        this.runNow();
    };
};
/**
 * 	Timer onTimeout handler.
 */ $f1d765b3e2b341ba$var$Timer.prototype.onTimeout = function() {
    if (!this.isRunning) return;
    this.rTime = hrnow() - this.startTime;
    let tError = this.rTime - (this.sTime + this.interval);
    if (tError < 0) {
        this.runAfter(-tError);
        return;
    }
    this.sTime += this.interval * (1 + int(tError / this.interval));
    this.tDelta = tError < 0 ? this.interval : this.rTime - this.lTime;
    this.lTime = this.rTime;
    this.runAfter(this.sTime + this.interval - (hrnow() - this.startTime));
    this.callback(this.tDelta, this);
};
/**
 * 	Starts the timer and triggers `onStarted`.
 *
 * 	@param immediate - When `true` the callback will be executed immediately.
 * 	@param scale - Used to control when to trigger the first timeout, delay is timeInterval*scale.
 *
 * 	!start (immediate?: boolean, scale?: number) : void;
 */ $f1d765b3e2b341ba$var$Timer.prototype.start = function(immediate = false, scale = 1.0) {
    if (this.isRunning) return;
    this.startTime = hrnow();
    this.isRunning = true;
    this.sTime = 0;
    this.lTime = 0;
    this.onStarted();
    if (immediate) this.callback(0, this);
    this.runAfter(this.interval * scale);
};
/**
 * 	Executes the timer activation after the specified amount of milliseconds.
 *
 * 	!runAfter (timeout: number) : void;
 */ $f1d765b3e2b341ba$var$Timer.prototype.runAfter = function(timeout) {
    if (this.vsync) {
        requestAnimationFrame(this._onTimeout_b);
        return;
    }
    if (this.handle) clearTimeout(this.handle);
    this.handle = setTimeout(this._onTimeout, timeout);
};
/**
 * 	Executes the timer activaton as soon as possible.
 *
 * 	!runNow() : void;
 */ $f1d765b3e2b341ba$var$Timer.prototype.runNow = function() {
    if (this.handle) clearTimeout(this.handle);
    this.handle = setTimeout(this._onTimeout, 0);
};
/**
 * 	Stops the timer and triggers `onStopped`.
 *
 * 	!stop() : void;
 */ $f1d765b3e2b341ba$var$Timer.prototype.stop = function() {
    if (!this.isRunning) return;
    if (this.handle) {
        clearTimeout(this.handle);
        this.handle = null;
    }
    this.isRunning = false;
    this.onStopped();
};
/**
 * 	Timer started event handler.
 *
 * 	!onStarted() : void;
 */ $f1d765b3e2b341ba$var$Timer.prototype.onStarted = function() {};
/**
 * 	Timer stopped event handler.
 *
 * 	!onStopped() : void;
 */ $f1d765b3e2b341ba$var$Timer.prototype.onStopped = function() {};
var $f1d765b3e2b341ba$export$2e2bcd8739ae039 = $f1d765b3e2b341ba$var$Timer;



var $hNLgQ = parcelRequire("hNLgQ");

var $hNLgQ = parcelRequire("hNLgQ");


var $hNLgQ = parcelRequire("hNLgQ");

//![import "../utils/recycler"]
//:/**
//: * 	Representation of a vector in 2D space, that is, a float tuple with components x and y.
//: */
//!class Vec2
const $43205fbc94829382$var$Vec2 = $hNLgQ.Class.extend({
    className: 'Vec2',
    /**
	 * 	Coordinates of the vector.
	 * 	!x: number;
	 * 	!y: number;
	 */ x: 0,
    y: 0,
    /**
	 *	Constructs the vector from another Vec2.
	 * 	!constructor (value: Vec2);
	 */ /**
	 *	Constructs the vector with the specified coordinates.
	 * 	!constructor (x?: number, y?: number);
	 */ __ctor: function(x = null, y = null) {
        return this.set(x, y);
    },
    /**
	 * 	Clones the vector coordinates into a new Vec2 object.
	 * 	!clone() : Vec2;
	 */ clone: function() {
        return $43205fbc94829382$var$Vec2.Pool.alloc(this);
    },
    /**
	 *	Sets the coordinates of the vector from a Vec2 object.
	 *	!set (value: Vec2) : Vec2;
	 */ /**
	 *	Sets the coordinates of the vector.
	 *	!set (x: number, y: number) : Vec2;
	 */ set: function(x, y = null) {
        if (x === null) {
            x = 0;
            y = 0;
        } else if (y === null) {
            let v = x;
            x = v.x;
            y = v.y;
        }
        this.x = x;
        this.y = y;
        return this;
    },
    /**
	 * 	Sets the X-coordinate of the vector.
	 * 	!setX (x: number) : Vec2;
	 */ setX: function(x) {
        this.x = x;
        return this;
    },
    /**
	 * 	Sets the Y-coordinate of the vector.
	 * 	!setY (y: number) : Vec2;
	 */ setY: function(y) {
        this.y = y;
        return this;
    },
    /**
	 * 	Sets the coordinates of the vector to zero.
	 * 	!zero() : Vec2;
	 */ zero: function() {
        return this.set(0, 0);
    },
    /**
	 * 	Returns true if the vector coordinates are both zero.
	 * 	!isZero() : boolean;
	 */ isZero: function() {
        return this.x == 0 && this.y == 0;
    },
    /**
	 *	Returns true if the coordinates of the vector have the same values as the given Vec2.
	 *	!equals (value: Vec2) : boolean;
	 */ /**
	 *	Returns true if the coordinates of the vector have the same values as the given ones.
	 *	!equals (x: number, y: number) : boolean;
	 */ equals: function(x, y = null) {
        if (y === null) {
            let v = x;
            x = v.x;
            y = v.y;
        }
        return this.x == x && this.y == y;
    },
    /**
	 * 	Negates the vector, that is changing the sign of each component in the vector.
	 * 	!neg() : Vec2;
	 */ neg: function() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    },
    /**
	 * 	Inverts the vector by changing each component to its reciprocal.
	 * 	!inv() : Vec2;
	 */ inv: function() {
        this.x = 1 / this.x;
        this.y = 1 / this.y;
        return this;
    },
    /**
	 * 	Changes the components of the vector to their absolute value.
	 * 	!abs() : Vec2;
	 */ abs: function() {
        this.x = this.x < 0 ? -this.x : this.x;
        this.y = this.y < 0 ? -this.y : this.y;
        return this;
    },
    /**
	 *	Adds the coordinates of the given Vec2 to the vector.
	 *	!translate (value: Vec2) : Vec2;
	 */ /**
	 *	Adds the given delta values to the vector.
	 *	!translate (dx: number, dy: number) : Vec2;
	 */ translate: function(dx, dy = null) {
        if (dy === null) {
            let v = dx;
            dx = v.x;
            dy = v.y;
        }
        this.x += dx, this.y += dy;
        return this;
    },
    /**
	 *	Rotates the vector by the specified angle.
	 *	!rotate (angle: number) : Vec2;
	 */ rotate: function(angle) {
        let x = this.x * Math.cos(angle) + this.y * Math.sin(angle);
        let y = this.y * Math.cos(angle) - this.x * Math.sin(angle);
        this.x = x;
        this.y = y;
        return this;
    },
    /**
	 *	Adds the coordinates of the given Vec2 to the vector.
	 *	!add (value: Vec2) : Vec2;
	 */ /**
	 *	Adds the given delta values to the vector.
	 *	!add (dx: number, dy: number) : Vec2;
	 */ add: function(dx, dy = null) {
        if (dy === null) {
            let v = dx;
            dx = v.x;
            dy = v.y;
        }
        this.x += dx, this.y += dy;
        return this;
    },
    /**
	 *	Subtracts the coordinates of the given Vec2 from the vector.
	 *	!sub (value: Vec2) : Vec2;
	 */ /**
	 *	Subtracts the given delta values from the vector.
	 *	!sub (dx: number, dy: number) : Vec2;
	 */ sub: function(dx, dy = null) {
        if (dy === null) {
            let v = dx;
            dx = v.x;
            dy = v.y;
        }
        this.x -= dx, this.y -= dy;
        return this;
    },
    /**
	 * 	Scales each components of the vector by the respective component of the given one.
	 * 	!scale (k: number) : Vec2;
	 */ /**
	 * 	Scales both components of the vector by the given factor.
	 * 	!scale (k: number) : Vec2;
	 */ /**
	 * 	Scales each components of the vector by the given factors.
	 * 	!scale (fx: number, fy: number) : Vec2;
	 */ scale: function(fx, fy = null) {
        if (fy === null) {
            if ($43205fbc94829382$var$Vec2.isInstance(fx)) {
                let v = fx;
                fx = v.x;
                fy = v.y;
            } else fy = fx;
        }
        this.x *= fx, this.y *= fy;
        return this;
    },
    /**
	 * 	Sets the components to their integer parts.
	 * 	!floor() : Vec2;
	 */ floor: function() {
        this.x = int(this.x);
        this.y = int(this.y);
        return this;
    },
    /**
	 * 	Sets the components to their fractional parts.
	 * 	!fract() : Vec2;
	 */ fract: function() {
        this.x = this.x - int(this.x);
        this.y = this.y - int(this.y);
        return this;
    },
    /**
	 * 	Returns the dot product of the vectors.
	 * 	!dot (value: Vec2) : number;
	 */ /**
	 * 	Returns the dot product of the vector and the given values.
	 * 	!dot (x: number, y: number) : number;
	 */ dot: function(x, y = null) {
        if (y === null) {
            let v = x;
            x = v.x;
            y = v.y;
        }
        return this.x * x + this.y * y;
    },
    /**
	 * 	Returns the magnitude of the vector.
	 * 	!magnitude(squared: boolean) : number;
	 */ magnitude: function(squared = false) {
        return squared ? this.x * this.x + this.y * this.y : Math.sqrt(this.x * this.x + this.y * this.y);
    },
    /**
	 * 	Normalizes the vector by dividing each component by the vector magnitude to obtain a unit vector.
	 * 	!normalize() : Vec2;
	 */ normalize: function() {
        return this.isZero() ? this : this.scale(1 / this.magnitude());
    },
    /**
	 * 	Sets the vector to its major-axis, that is the component with the maximum absolute value.
	 * 	!majorAxis() : Vec2;
	 */ majorAxis: function() {
        if (Math.abs(this.x) > Math.abs(this.y)) this.y = 0;
        else this.x = 0;
        return this;
    },
    /**
	 * 	Sets the vector to its minor-axis, that is the component with the minimum absolute value.
	 * 	!minorAxis() : Vec2;
	 */ minorAxis: function() {
        if (Math.abs(this.x) < Math.abs(this.y)) this.y = 0;
        else this.x = 0;
        return this;
    },
    /**
	 * 	Sets the vector to its sign-vector representation.
	 * 	!sign() : Vec2;
	 */ sign: function() {
        this.x = !this.x ? 0 : this.x < 0 ? -1 : 1;
        this.y = !this.y ? 0 : this.y < 0 ? -1 : 1;
        return this;
    },
    /**
	 * 	Returns the string representation of the coordinates of the vector.
	 * 	toString() : string;
	 */ toString: function() {
        return `(${this.x}, ${this.y})`;
    }
});
//!/class
//!namespace Vec2
//!namespace Pool
/**
 *	Allocates a vector from another Vec2.
 * 	!function alloc (value: Vec2) : Vec2;
 */ /**
 *	Allocates a vector with the specified coordinates.
 * 	!function alloc (x?: number, y?: number) : Vec2;
 */ $1fea8365818f3b22$export$2e2bcd8739ae039.createPool($43205fbc94829382$var$Vec2, 4096, 2048);
var $43205fbc94829382$export$2e2bcd8739ae039 = $43205fbc94829382$var$Vec2;


//![import "../utils/recycler"]
//![import "./vec2"]
const $0bee0760636b614a$var$temp = new Float32Array(9).fill(0);
const $0bee0760636b614a$var$temp2 = new Float32Array(9).fill(0);
//:/**
//: * 	Represents a 3x3 matrix. Provides an interface to manipulate 3x3 matrices.
//: */
//!class Matrix
const $0bee0760636b614a$var$Matrix = $hNLgQ.Class.extend({
    className: 'Matrix',
    /**
	 * 	Actual elements of the matrix.
	 * 	!data: Float32Array
	 */ data: null,
    /**
	 * 	Constructs a new matrix copying the elements from the specified matrix.
	 * 	!constructor(value: Matrix);
	 */ /**
	 * 	Constructs a new matrix with the values from the specified array.
	 * 	!constructor(value: Float32Array);
	 */ /**
	 * 	Constructs a new matrix with the identity matrix values.
	 * 	!constructor();
	 */ __ctor: function(value = null) {
        if (this.data === null) this.data = new Float32Array(9);
        if (value !== null) this.set(value);
        else this.identity();
    },
    /**
	 * 	Fills the matrix with zeroes.
	 * 	!zero() : Matrix;
	 */ zero: function() {
        this.data.fill(0);
        return this;
    },
    /**
	 * 	Fills the matrix with the specified value.
	 * 	!fill (value: number) : Matrix;
	 */ fill: function(value) {
        this.data.fill(value);
        return this;
    },
    /**
	 * 	Copies the specified matrix elements into the current one.
	 * 	!set (value: Matrix) : Matrix;
	 */ /**
	 * 	Sets the matrix elements from the specified array.
	 * 	!set (value: Float32Array) : Matrix;
	 */ set: function(value) {
        if ($0bee0760636b614a$var$Matrix.isInstance(value)) for(let i = 0; i < 9; i++)this.data[i] = value.data[i];
        else for(let i1 = 0; i1 < 9; i1++)this.data[i1] = value[i1];
        return this;
    },
    /**
	 * 	Sets the elements of the matrix to be the identity matrix.
	 * 	!identity() : Matrix;
	 */ identity: function(target = null) {
        if (target === null) target = this.data;
        target.fill(0);
        target[0] = target[4] = target[8] = 1;
        return this;
    },
    /**
	 * 	Multiplies all elements in the matrix by a given scalar.
	 * 	!scalef (scalar: number) : Matrix;
	 */ scalef: function(scalar) {
        for(let i = 0; i < 9; i++)this.data[i] *= scalar;
        return this;
    },
    /**
	 * 	Returns a clone of the matrix.
	 * 	!clone() : Matrix;
	 */ clone: function() {
        return $0bee0760636b614a$var$Matrix.Pool.alloc(this);
    },
    /**
	 * 	Appends the given matrix to the current one using matrix multiplication (self * matrix).
	 * 	!append (matrix: Matrix) : Matrix;
	 */ append: function(matr) {
        if (matr instanceof $0bee0760636b614a$var$Matrix) matr = matr.data;
        for(let i = 0; i < 9; i++)$0bee0760636b614a$var$temp[i] = this.data[i];
        this.data[0] = matr[0] * $0bee0760636b614a$var$temp[0] + matr[1] * $0bee0760636b614a$var$temp[3] + matr[2] * $0bee0760636b614a$var$temp[6];
        this.data[1] = matr[0] * $0bee0760636b614a$var$temp[1] + matr[1] * $0bee0760636b614a$var$temp[4] + matr[2] * $0bee0760636b614a$var$temp[7];
        this.data[2] = matr[0] * $0bee0760636b614a$var$temp[2] + matr[1] * $0bee0760636b614a$var$temp[5] + matr[2] * $0bee0760636b614a$var$temp[8];
        this.data[3] = matr[3] * $0bee0760636b614a$var$temp[0] + matr[4] * $0bee0760636b614a$var$temp[3] + matr[5] * $0bee0760636b614a$var$temp[6];
        this.data[4] = matr[3] * $0bee0760636b614a$var$temp[1] + matr[4] * $0bee0760636b614a$var$temp[4] + matr[5] * $0bee0760636b614a$var$temp[7];
        this.data[5] = matr[3] * $0bee0760636b614a$var$temp[2] + matr[4] * $0bee0760636b614a$var$temp[5] + matr[5] * $0bee0760636b614a$var$temp[8];
        this.data[6] = matr[6] * $0bee0760636b614a$var$temp[0] + matr[7] * $0bee0760636b614a$var$temp[3] + matr[8] * $0bee0760636b614a$var$temp[6];
        this.data[7] = matr[6] * $0bee0760636b614a$var$temp[1] + matr[7] * $0bee0760636b614a$var$temp[4] + matr[8] * $0bee0760636b614a$var$temp[7];
        this.data[8] = matr[6] * $0bee0760636b614a$var$temp[2] + matr[7] * $0bee0760636b614a$var$temp[5] + matr[8] * $0bee0760636b614a$var$temp[8];
        return this;
    },
    /**
	 * 	Creates a translation matrix and appends it.
	 * 	!translate (x: number, y: number) : Matrix;
	 */ translate: function(x, y) {
        if (x == 0 && y == 0) return this;
        for(let i = 0; i < 9; i++)$0bee0760636b614a$var$temp[i] = this.data[i];
        this.data[6] = x * $0bee0760636b614a$var$temp[0] + y * $0bee0760636b614a$var$temp[3] + $0bee0760636b614a$var$temp[6];
        this.data[7] = x * $0bee0760636b614a$var$temp[1] + y * $0bee0760636b614a$var$temp[4] + $0bee0760636b614a$var$temp[7];
        this.data[8] = x * $0bee0760636b614a$var$temp[2] + y * $0bee0760636b614a$var$temp[5] + $0bee0760636b614a$var$temp[8];
        return this;
    },
    /**
	 * 	Creates a rotation matrix for the given angle (in radians) and appends it.
	 * 	!rotate (angle: number) : Matrix;
	 */ rotate: function(angle) {
        if (angle == 0) return this;
        this.identity($0bee0760636b614a$var$temp2);
        let cost = Math.cos(angle);
        let sint = Math.sin(angle);
        $0bee0760636b614a$var$temp2[0] = cost;
        $0bee0760636b614a$var$temp2[1] = -sint;
        $0bee0760636b614a$var$temp2[3] = sint;
        $0bee0760636b614a$var$temp2[4] = cost;
        return this.append($0bee0760636b614a$var$temp2);
    },
    /**
	 * 	Creates a scaling matrix and appends it.
	 * 	!scale (sx: number, sy: number) : Matrix;
	 */ scale: function(sx, sy) {
        if (sx == 1 && sy == 1) return this;
        this.identity($0bee0760636b614a$var$temp2);
        $0bee0760636b614a$var$temp2[0] = sx;
        $0bee0760636b614a$var$temp2[4] = sy;
        return this.append($0bee0760636b614a$var$temp2);
    },
    /**
	 * 	Applies the matrix to the specified vector (matrix-vector multiplication) and returns a new Vec2.
	 * 	!applyTo (vect: Vec2) : Vec2;
	 */ /**
	 * 	Applies the matrix to the specified coordinates (matrix-vector multiplication) and returns a new Vec2.
	 * 	!applyTo (x: number, y: number) : Vec2;
	 */ applyTo: function(x, y = null) {
        if (y === null) {
            const v = x;
            x = v.x;
            y = v.y;
        }
        let nx = this.data[0] * x + this.data[3] * y + this.data[6];
        let ny = this.data[1] * x + this.data[4] * y + this.data[7];
        return $43205fbc94829382$export$2e2bcd8739ae039.Pool.alloc(nx, ny);
    },
    /**
	 * 	Transposes the matrix.
	 * 	!transpose() : Matrix;
	 */ transpose: function() {
        $0bee0760636b614a$var$temp.fill(0);
        for(let j = 0; j < 3; j++)for(let i = 0; i < 3; i++)$0bee0760636b614a$var$temp[j * 3 + i] = this.data[i * 3 + j];
        for(let i2 = 0; i2 < 9; i2++)this.data[i2] = $0bee0760636b614a$var$temp[i2];
        return this;
    },
    /**
	 * 	Returns the determinant of the matrix.
	 * 	!det() : number;
	 */ det: function() {
        return this.data[0] * (this.data[4] * this.data[8] - this.data[5] * this.data[7]) - this.data[1] * (this.data[3] * this.data[8] - this.data[5] * this.data[6]) + this.data[2] * (this.data[3] * this.data[7] - this.data[4] * this.data[6]);
    },
    /**
	 * 	Returns a new matrix with the adjoint of the current matrix.
	 * 	!adj() : Matrix;
	 */ adj: function() {
        /*let t = this.transpose();
		let d = Matrix.Pool.alloc();

		d.data[0] = (t.data[4]*t.data[8] - t.data[5]*t.data[7]);
		d.data[1] = -(t.data[3]*t.data[8] - t.data[5]*t.data[6]);
		d.data[2] = (t.data[3]*t.data[7] - t.data[4]*t.data[6]);

		d.data[3] = -(t.data[1]*t.data[8] - t.data[2]*t.data[7]);
		d.data[4] = (t.data[0]*t.data[8] - t.data[2]*t.data[6]);
		d.data[5] = -(t.data[0]*t.data[7] - t.data[1]*t.data[6]);

		d.data[6] = (t.data[1]*t.data[5] - t.data[2]*t.data[4]);
		d.data[7] = -(t.data[0]*t.data[5] - t.data[2]*t.data[3]);
		d.data[8] = (t.data[0]*t.data[4] - t.data[1]*t.data[3]);

		t.data = d;
		return t;*/ throw new Error('NOT IMPLEMENTED');
    },
    /**
	 * 	Returns a new matrix with the inverse of the current matrix.
	 * 	!inverse() : Matrix;
	 */ inverse: function() {
        let det = this.det();
        if (!det) return null;
        return this.adj().scalef(1 / det);
    },
    /**
	 * 	Returns a string representation of the matrix.
	 * 	!toString() : string;
	 */ toString: function() {
        return `[${this.data[0]}, ${this.data[3]}, ${this.data[6]}]\n[${this.data[1]}, ${this.data[4]}, ${this.data[7]}]\n[${this.data[2]}, ${this.data[5]}, ${this.data[8]}]\n`;
    }
});
/**
 * 	Sets the components of the specified array as the identity matrix.
 * 	!static loadIdentity (target: Float32Array) : void;
 */ $0bee0760636b614a$var$Matrix.loadIdentity = function(target) {
    target.fill(0);
    target[0] = target[4] = target[8] = 1;
};
//!/class
//!namespace Matrix
//!namespace Pool
/**
	 * 	Allocates a new matrix copying the components from the specified matrix.
	 * 	!function alloc (value: Matrix): Matrix;
	 */ /**
	 * 	Allocates a new matrix with the values from the specified array.
	 * 	!function alloc (value: Float32Array): Matrix;
	 */ /**
	 * 	Allocates a new matrix with the identity matrix values.
	 * 	!function alloc (): Matrix;
	 */ $1fea8365818f3b22$export$2e2bcd8739ae039.createPool($0bee0760636b614a$var$Matrix, 4096, 1024);
var $0bee0760636b614a$export$2e2bcd8739ae039 = $0bee0760636b614a$var$Matrix;





var $hNLgQ = parcelRequire("hNLgQ");

var $hNLgQ = parcelRequire("hNLgQ");
//!namespace glx
//!enum BufferTarget
//:ARRAY_BUFFER
//:ELEMENT_ARRAY_BUFFER
//:COPY_READ_BUFFER
//:COPY_WRITE_BUFFER
//:TRANSFORM_FEEDBACK_BUFFER
//:UNIFORM_BUFFER
//:PIXEL_PACK_BUFFER
//:PIXEL_UNPACK_BUFFER
//!/enum
//!enum BufferUsage
//!STATIC_DRAW
//!DYNAMIC_DRAW
//!STREAM_DRAW
//!STATIC_READ
//!DYNAMIC_READ
//!STREAM_READ
//!STATIC_COPY
//!DYNAMIC_COPY
//!STREAM_COPY
//!/enum
//!/namespace
//!class glx
const $0e3762fc4cbc2c8f$var$glx = {
    BufferTarget: {},
    BufferUsage: {},
    /**
	 * WebGL rendering context.
	 * !static readonly gl: WebGL2RenderingContext;
	 */ gl: null,
    /**
	 * Sets the WebGL rendering context.
	 * !static setContext (context: WebGL2RenderingContext) : gl;
	 */ setContext: function(context) {
        this.gl = context;
        this.BufferTarget.ARRAY_BUFFER = this.gl.ARRAY_BUFFER;
        this.BufferTarget.ELEMENT_ARRAY_BUFFER = this.gl.ELEMENT_ARRAY_BUFFER;
        this.BufferTarget.COPY_READ_BUFFER = this.gl.COPY_READ_BUFFER;
        this.BufferTarget.COPY_WRITE_BUFFER = this.gl.COPY_WRITE_BUFFER;
        this.BufferTarget.TRANSFORM_FEEDBACK_BUFFER = this.gl.TRANSFORM_FEEDBACK_BUFFER;
        this.BufferTarget.UNIFORM_BUFFER = this.gl.UNIFORM_BUFFER;
        this.BufferTarget.PIXEL_PACK_BUFFER = this.gl.PIXEL_PACK_BUFFER;
        this.BufferTarget.PIXEL_UNPACK_BUFFER = this.gl.PIXEL_UNPACK_BUFFER;
        this.BufferUsage.STATIC_DRAW = this.gl.STATIC_DRAW;
        this.BufferUsage.DYNAMIC_DRAW = this.gl.DYNAMIC_DRAW;
        this.BufferUsage.STREAM_DRAW = this.gl.STREAM_DRAW;
        this.BufferUsage.STATIC_READ = this.gl.STATIC_READ;
        this.BufferUsage.DYNAMIC_READ = this.gl.DYNAMIC_READ;
        this.BufferUsage.STREAM_READ = this.gl.STREAM_READ;
        this.BufferUsage.STATIC_COPY = this.gl.STATIC_COPY;
        this.BufferUsage.DYNAMIC_COPY = this.gl.DYNAMIC_COPY;
        this.BufferUsage.STREAM_COPY = this.gl.STREAM_COPY;
        return this;
    },
    /**
	 * Returns the value of a GL parameter.
	 * !static getParameter (name: string) : any;
	 */ getParameter: function(name) {
        return this.gl.getParameter(this.gl[name]);
    },
    /**
	 * Returns a slice of an array as a Float32Array.
	 * !static getFloat32Array (data: any, offset: number, length: number) : Float32Array;
	 */ getFloat32Array: function(data, offset, length) {
        if (offset === 0 && length === data.length) {
            if (data instanceof Float32Array) return data;
        }
        let buff = new Float32Array(length);
        for(let i = 0; i < length; i++)buff[i] = data[i + offset];
        return buff;
    },
    /**
	 * Creates a buffer from the specified array.
	 * @param {BufferTarget} target Defaults to ARRAY_BUFFER.
	 * @param {BufferUsage} usage Defaults to STATIC_DRAW.
	 * !static createBufferFrom (data: any, target?: glx.BufferTarget, usage?: glx.BufferUsage, offset?: number, length?: number) : WebGLBuffer;
	 */ createBufferFrom: function(data, target = null, usage = null, offset = null, length = null) {
        target = target !== null && target !== void 0 ? target : $0e3762fc4cbc2c8f$var$glx.BufferTarget.ARRAY_BUFFER;
        usage = usage !== null && usage !== void 0 ? usage : $0e3762fc4cbc2c8f$var$glx.BufferUsage.STATIC_DRAW;
        let buff = this.gl.createBuffer();
        this.gl.bindBuffer(target, buff);
        this.gl.bufferData(target, this.getFloat32Array(data, offset !== null && offset !== void 0 ? offset : 0, length !== null && length !== void 0 ? length : data.length), usage);
        //this.gl.bindBuffer (target, null);
        return buff;
    }
};
var //!/class
$0e3762fc4cbc2c8f$export$2e2bcd8739ae039 = $0e3762fc4cbc2c8f$var$glx;


/*
**	system/shader.js
**
**	Copyright (c) 2021-2022, RedStar Technologies, All rights reserved.
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
*/ //:/**
//: * Provides pre-processing to reuse GLSL code.
//: */
//!class glsl
const $0bab618843c5cc55$var$glsl = {
    /**
	 * Library of GLSL code snippets.
	 */ snippets: {},
    /**
	 * Registers a snippet in the GLSL code library.
	 * !static set (name: string, source: string) : void;
	 */ set: function(name, source) {
        this.snippets[name] = source;
    },
    /**
	 * Returns a snippet of code given its name.
	 * !static get (name: string) : string;
	 */ get: function(name) {
        return this.snippets.hasOwnProperty(name) ? this.snippets[name] : '';
    },
    /**
	 * Replaces special marks in the code.
	 */ replace: function(code, alreadyImported) {
        code = code.split('\n');
        for(let i = 0; i < code.length; i++){
            let value = code[i].trim();
            if (value.startsWith('//@use ')) {
                let str = '';
                for (let name of value.substring(7).split(',')){
                    name = name.trim();
                    if (alreadyImported.hasOwnProperty(name)) continue;
                    alreadyImported[name] = true;
                    str += $0bab618843c5cc55$var$glsl.replace($0bab618843c5cc55$var$glsl.get(name), alreadyImported) + '\n';
                }
                code[i] = str;
            }
        }
        return code.join('\n');
    },
    /**
	 * Processes GLSL code, returns a string of GLSL code ready to be compiled.
	 *
	 * - If "#version" not specified "#version 300 es" will be added.
	 * - If "precision" not specified "precision highp float;" will be added.
	 * - Directive "//@use" will be replaced with the appropriate snippet(s).
	 *
	 * !static process (code: string) : string;
	 */ process: function(code) {
        code = code.trim();
        if (code.indexOf('precision') === -1) code = 'precision highp float;\n' + code;
        if (code.indexOf('#version') === -1) code = '#version 300 es\n' + code;
        return this.replace(code, {});
    }
};
var //!/class
$0bab618843c5cc55$export$2e2bcd8739ae039 = $0bab618843c5cc55$var$glsl;
/**
 * Reusable GLSL snippets.
 */ $0bab618843c5cc55$var$glsl.set('vert-defs', `
	uniform mat3 m_transform;
	uniform mat3 m_quad;
	uniform mat3 m_texture;
	uniform vec4 v_resolution;
	uniform vec4 v_frame_size;
	uniform float f_scale;
	uniform float f_time;
	uniform float f_depth;

	in vec3 location;
	out vec2 texcoords;
`);
$0bab618843c5cc55$var$glsl.set('frag-defs', `
	uniform vec4 v_resolution;
	uniform vec4 v_frame_size;
	uniform float f_scale;
	uniform float f_time;
	uniform float f_alpha;
	uniform sampler2D texture0;

	in vec2 texcoords;
	out vec4 color;
`);
$0bab618843c5cc55$var$glsl.set('invertX', `
	vec2 invertX (vec2 value) {
		return value * vec2(-1.0, 1.0);
	}
`);
$0bab618843c5cc55$var$glsl.set('invertY', `
	vec2 invertY (vec2 value) {
		return value * vec2(1.0, -1.0);
	}
`);
$0bab618843c5cc55$var$glsl.set('norm', `
	vec2 norm (vec2 value) {
		return (value + 1.0) * 0.5;
	}

	vec3 norm (vec3 value) {
		return (value + 1.0) * 0.5;
	}
`);
$0bab618843c5cc55$var$glsl.set('snorm', `
	vec2 snorm (vec2 value) {
		return value * 2.0 - 1.0;
	}

	vec3 snorm (vec3 value) {
		return value * 2.0 - 1.0;
	}
`);
$0bab618843c5cc55$var$glsl.set('location2d', `
	//@use invertY, snorm

	vec4 location2d (vec3 location, float depth)
	{
		vec2 loc = vec2(m_transform * m_quad * location) / v_resolution.xy;
		return vec4(invertY(snorm(loc)), depth/16777216.0, 1.0);
	}
`);
$0bab618843c5cc55$var$glsl.set('frameTexCoords', `
	flat out vec2 v_frame_offset;

	vec2 frameTexCoords (vec3 location) {
		v_frame_offset = vec2(m_texture[2][0], m_texture[2][1]);
		return mat2(m_texture * m_quad) * location.xy / (v_frame_size.xy * v_frame_size.zw);
	}
`);
$0bab618843c5cc55$var$glsl.set('frameTex', `
	flat in vec2 v_frame_offset;

	vec4 frameTex (vec2 texcoords) {
		return texture(texture0, fract(texcoords)*v_frame_size.xy + v_frame_offset);
	}
`);
$0bab618843c5cc55$var$glsl.set('rand', `
	float rand (vec2 value) {
		return fract(sin(dot(value, vec2(12.9898, 78.233))) * 43758.5453);
	}
`);
$0bab618843c5cc55$var$glsl.set('align', `
	float align (float value, float step) {
		return floor(value/step)*step;
	}
`);


//![import "./glx"]
//![import "./glsl"]
//:/**
//: * Describes a shader object. The actual shader type is specified at construction.
//: */
//!class Shader
const $9a9389f93d34564b$var$Shader = $hNLgQ.Class.extend({
    /**
	 * Identifier of the shader.
	 * !readonly id: string;
	 */ id: null,
    /**
	 * Type of the shader.
	 * !readonly type: Shader.Type;
	 */ type: 0,
    /**
	 * Shader GL identifier.
	 * !readonly shaderId: number;
	 */ shaderId: null,
    /**
	 * Constructs a shader and registers with the specified id. Compile its GLSL code using the `compile` method.
	 * !constructor (id: string, type: Shader.Type);
	 */ /**
	 * Constructs a shader, compile its GLSL code using the `compile` method.
	 * !constructor (type: Shader.Type);
	 */ /**
	 * Constructs a shader with the specified GLSL code and registers with the specified id.
	 * !constructor (id: string, type: Shader.Type, source: string);
	 */ /**
	 * Constructs a shader with the specified GLSL code.
	 * !constructor (type: Shader.Type, source: string);
	 */ __ctor: function(id, type = null, source = null) {
        if (source === null && type !== null && typeof type === 'string') {
            source = type;
            type = null;
        }
        if (type === null) {
            type = id;
            id = null;
        }
        $9a9389f93d34564b$var$Shader.put(this.id = id, this);
        this.type = type;
        this.shaderId = null;
        if (source) this.compile(source);
    },
    /**
	 * 	Destroys the shader.
	 */ __dtor: function() {
        $0e3762fc4cbc2c8f$export$2e2bcd8739ae039.gl.deleteShader(this.shaderId);
        $9a9389f93d34564b$var$Shader.remove(this.id);
    },
    /**
	 * Compiles the shader and throws an exception if any compilations error occur.
	 * !compile (source: string) : Shader;
	 */ compile: function(source) {
        let gl = $0e3762fc4cbc2c8f$export$2e2bcd8739ae039.gl;
        this.shaderId = gl.createShader(this.type === $9a9389f93d34564b$var$Shader.Type.VERTEX ? gl.VERTEX_SHADER : this.type === $9a9389f93d34564b$var$Shader.Type.FRAGMENT ? gl.FRAGMENT_SHADER : gl.GEOMETRY_SHADER);
        source = $0bab618843c5cc55$export$2e2bcd8739ae039.process(source);
        gl.shaderSource(this.shaderId, source);
        gl.compileShader(this.shaderId);
        let error = gl.getShaderInfoLog(this.shaderId);
        if (error) {
            console.error(source.split("\n").map((i, index)=>index + ": " + i
            ).join("\n"));
            throw new Error((this.id ? '[' + this.id + '] ' : '') + error);
        }
        return this;
    }
});
//!/class
/**
 * 	Global shader list.
 */ $9a9389f93d34564b$var$Shader.shaders = {};
/**
 * 	Stores a shader with the specified identifier in the global shader list.
 * 	!static put (id: string, shader: Shader) : void;
 */ $9a9389f93d34564b$var$Shader.put = function(id, shader) {
    if (id) this.shaders[id] = shader;
};
/**
 * 	Returns a Shader from the global shader list given its identifier.
 * 	!static get (id: string) : Shader;
 */ $9a9389f93d34564b$var$Shader.get = function(id) {
    return this.shaders[id];
};
/**
 * 	Removes a shader from the global shader list.
 * 	!static remove (id: string) : void;
 */ $9a9389f93d34564b$var$Shader.remove = function(id) {
    delete this.shaders[id];
};
//!namespace Shader
//:/**
//: * 	Shader types.
//: */
//!enum Type
$9a9389f93d34564b$var$Shader.Type = {
    VERTEX: 0,
    //!VERTEX
    FRAGMENT: 1,
    //!FRAGMENT
    GEOMETRY: 2
};
var //!/enum
$9a9389f93d34564b$export$2e2bcd8739ae039 = $9a9389f93d34564b$var$Shader;



//![import "./shader"]
//![import "./globals"]
//![import "./glx"]
//:/**
//: * Describes a shader program.
//: */
//!class ShaderProgram
const $427f4d3ec70ccf6e$var$ShaderProgram = $hNLgQ.Class.extend({
    /**
	 * Cache of locations.
	 */ locations: null,
    /**
	 * Identifier of the program.
	 * !readonly id: string;
	 */ id: null,
    /**
	 * Shaders attached to the program.
	 * !readonly shaders: Array<Shader>;
	 */ shaders: null,
    /**
	 * Shader program GL identifier.
	 * !readonly programId: number;
	 */ programId: null,
    /**
	 * Constructs an empty shader program with the specified identifier. Attach shaders by using the `attach` method.
	 * !constructor (id?: string);
	 */ __ctor: function(id = null) {
        this.id = id;
        this.shaders = [];
        this.programId = null;
        this.locations = {};
        this._uniformSetter = null;
        $427f4d3ec70ccf6e$var$ShaderProgram.put(id, this);
    },
    /**
	 * Destroys the shader program.
	 */ __dtor: function() {
        let gl = $0e3762fc4cbc2c8f$export$2e2bcd8739ae039.gl;
        if (!gl) return this;
        gl.deleteProgram(this.programId);
        $427f4d3ec70ccf6e$var$ShaderProgram.remove(this.id);
    },
    /**
	 * Sets the uniform setter function.
	 * @param { (pgm:ShaderProgram) => void } uniformSetter
	 * @returns {Element}
	 * !uniformSetter (uniformSetter: (pgm:ShaderProgram) => void) : ShaderProgram;
	 */ uniformSetter: function(uniformSetter) {
        this._uniformSetter = uniformSetter;
        return this;
    },
    /**
	 * Attaches a shader to the shader program.
	 * !attach (shader: Shader|string) : ShaderProgram;
	 */ attach: function(shader) {
        if (typeof shader === 'string') shader = $9a9389f93d34564b$export$2e2bcd8739ae039.get(shader);
        if (!shader) throw new Error('Unable to attach shader, invalid argument.');
        this.shaders.push(shader);
        return this;
    },
    /**
	 * Binds the attribute locations to their predefined values.
	 */ bindLocations: function() {
        $0e3762fc4cbc2c8f$export$2e2bcd8739ae039.gl.bindAttribLocation(this.programId, 0, 'location');
    },
    /**
	 * Returns the location of an attribute.
	 * !getAttribLocation (name: string) : object;
	 */ getAttribLocation: function(name) {
        if (!this.locations.hasOwnProperty(name)) this.locations[name] = $0e3762fc4cbc2c8f$export$2e2bcd8739ae039.gl.getAttribLocation(this.programId, name);
        return this.locations[name];
    },
    /**
	 * Returns the location of a uniform variable.
	 * !getUniformLocation (name: string) : object;
	 */ getUniformLocation: function(name) {
        if (!this.locations.hasOwnProperty(name)) this.locations[name] = $0e3762fc4cbc2c8f$export$2e2bcd8739ae039.gl.getUniformLocation(this.programId, name);
        return this.locations[name];
    },
    /**
	 * Returns the location of a uniform block.
	 * !getUniformBlockLocation (name: string) : object;
	 */ getUniformBlockLocation: function(name) {
        if (!this.locations.hasOwnProperty(name)) this.locations[name] = $0e3762fc4cbc2c8f$export$2e2bcd8739ae039.gl.getUniformBlockIndex(this.programId, name);
        return this.locations[name];
    },
    /**
	 * Returns the size of a uniform block.
	 * !getUniformBlockSize (uniformBlock: string|object) : number;
	 */ getUniformBlockSize: function(uniformBlock) {
        if (typeof uniformBlock === 'string') uniformBlock = this.getUniformBlockLocation(uniformBlock);
        return $0e3762fc4cbc2c8f$export$2e2bcd8739ae039.gl.getActiveUniformBlockParameter(this.programId, uniformBlock, $0e3762fc4cbc2c8f$export$2e2bcd8739ae039.gl.UNIFORM_BLOCK_DATA_SIZE);
    },
    /**
	 * Creates a buffer for a uniform block.
	 * !createUniformBlockBuffer (uniformBlock: string|object) : Float32Array;
	 */ createUniformBlockBuffer: function(uniformBlock) {
        if (typeof uniformBlock === 'string') uniformBlock = this.getUniformBlockLocation(uniformBlock);
        let size = this.getUniformBlockSize(uniformBlock);
        let buff = $0e3762fc4cbc2c8f$export$2e2bcd8739ae039.createBufferFrom(new Float32Array(size).fill(0), $0e3762fc4cbc2c8f$export$2e2bcd8739ae039.BufferTarget.UNIFORM_BUFFER, $0e3762fc4cbc2c8f$export$2e2bcd8739ae039.BufferUsage.DYNAMIC_DRAW);
        $0e3762fc4cbc2c8f$export$2e2bcd8739ae039.gl.bindBufferBase($0e3762fc4cbc2c8f$export$2e2bcd8739ae039.BufferTarget.UNIFORM_BUFFER, 0, buff);
    },
    /**
	 * Loads the locations of the predefined uniforms and attributes.
	 */ preloadLocations: function() {
        this.getUniformLocation('f_time');
        this.getUniformLocation('f_scale');
        this.getUniformLocation('m_transform');
        this.getUniformLocation('m_texture');
        this.getUniformLocation('m_quad');
        this.getUniformLocation('v_resolution');
        this.getUniformLocation('v_frame_size');
        this.getUniformLocation('f_depth');
        this.getUniformLocation('f_alpha');
        this.getUniformLocation('v_base_color');
        this.getUniformLocation('texture0');
        this.getAttribLocation('location');
    },
    /**
	 * Links the shaders into the shader program. Completion can be obtained by calling `getStatus`.
	 * !link() : ShaderProgram;
	 */ link: function() {
        let gl = $0e3762fc4cbc2c8f$export$2e2bcd8739ae039.gl;
        if (!gl) return this;
        this.programId = gl.createProgram();
        for (let shader of this.shaders)gl.attachShader(this.programId, shader.shaderId);
        this.bindLocations();
        gl.linkProgram(this.programId);
        this.preloadLocations();
        return this;
    },
    /**
	 * Activates the shader program to be used in the subsequent drawing operations.
	 * !activate() : void;
	 */ activate: function() {
        let gl = $0e3762fc4cbc2c8f$export$2e2bcd8739ae039.gl;
        if (!gl) return;
        gl.useProgram(this.programId);
        if (this._uniformSetter !== null) this._uniformSetter(this, gl);
    },
    /**
	 * Returns the link status of the program.
	 * !getStatus() : boolean;
	 */ getStatus: function() {
        let gl = $0e3762fc4cbc2c8f$export$2e2bcd8739ae039.gl;
        if (!gl) return true;
        return gl.getProgramParameter(this.programId, gl.LINK_STATUS);
    },
    /**
	 * Returns the error of the last link operation.
	 * !getError() : string;
	 */ getError: function() {
        let gl = $0e3762fc4cbc2c8f$export$2e2bcd8739ae039.gl;
        if (!gl) return '';
        if (this.programId === null) return 'Program has not been linked.';
        return gl.getProgramInfoLog(this.programId);
    },
    /**
	 * Sets the value of a uniform.
	 * !uniform1f (location: string|object, v0: number) : ShaderProgram;
	 */ uniform1f: function(location, v0) {
        if (typeof location === 'string') location = this.getUniformLocation(location);
        $0e3762fc4cbc2c8f$export$2e2bcd8739ae039.gl.uniform1f(location, v0);
        return this;
    },
    /**
	 * Sets the value of a uniform.
	 * !uniform1fv (location: string|object, value: any) : ShaderProgram;
	 */ uniform1fv: function(location, value) {
        if (typeof location === 'string') location = this.getUniformLocation(location);
        $0e3762fc4cbc2c8f$export$2e2bcd8739ae039.gl.uniform1fv(location, value);
        return this;
    },
    /**
	 * Sets the value of a uniform.
	 * !uniform1i (location: string|object, v0: number) : ShaderProgram;
	 */ uniform1i: function(location, v0) {
        if (typeof location === 'string') location = this.getUniformLocation(location);
        $0e3762fc4cbc2c8f$export$2e2bcd8739ae039.gl.uniform1i(location, v0);
        return this;
    },
    /**
	 * Sets the value of a uniform.
	 * !uniform1iv (location: string|object, value: any) : ShaderProgram;
	 */ uniform1iv: function(location, value) {
        if (typeof location === 'string') location = this.getUniformLocation(location);
        $0e3762fc4cbc2c8f$export$2e2bcd8739ae039.gl.uniform1iv(location, value);
        return this;
    },
    /**
	 * Sets the value of a uniform.
	 * !uniform2f (location: string|object, v0: number, v1: number) : ShaderProgram;
	 */ uniform2f: function(location, v0, v1) {
        if (typeof location === 'string') location = this.getUniformLocation(location);
        $0e3762fc4cbc2c8f$export$2e2bcd8739ae039.gl.uniform2f(location, v0, v1);
        return this;
    },
    /**
	 * Sets the value of a uniform.
	 * !uniform2fv (location: string|object, value: any) : ShaderProgram;
	 */ uniform2fv: function(location, value) {
        if (typeof location === 'string') location = this.getUniformLocation(location);
        $0e3762fc4cbc2c8f$export$2e2bcd8739ae039.gl.uniform2fv(location, value);
        return this;
    },
    /**
	 * Sets the value of a uniform.
	 * !uniform2i (location: string|object, v0: number, v1: number) : ShaderProgram;
	 */ uniform2i: function(location, v0, v1) {
        if (typeof location === 'string') location = this.getUniformLocation(location);
        $0e3762fc4cbc2c8f$export$2e2bcd8739ae039.gl.uniform2i(location, v0, v1);
        return this;
    },
    /**
	 * Sets the value of a uniform.
	 * !uniform2iv (location: string|object, value: any) : ShaderProgram;
	 */ uniform2iv: function(location, value) {
        if (typeof location === 'string') location = this.getUniformLocation(location);
        $0e3762fc4cbc2c8f$export$2e2bcd8739ae039.gl.uniform2iv(location, value);
        return this;
    },
    /**
	 * Sets the value of a uniform.
	 * !uniform3f (location: string|object, v0: number, v1: number, v2: number) : ShaderProgram;
	 */ uniform3f: function(location, v0, v1, v2) {
        if (typeof location === 'string') location = this.getUniformLocation(location);
        $0e3762fc4cbc2c8f$export$2e2bcd8739ae039.gl.uniform3f(location, v0, v1, v2);
        return this;
    },
    /**
	 * Sets the value of a uniform.
	 * !uniform3fv (location: string|object, value: any) : ShaderProgram;
	 */ uniform3fv: function(location, value) {
        if (typeof location === 'string') location = this.getUniformLocation(location);
        $0e3762fc4cbc2c8f$export$2e2bcd8739ae039.gl.uniform3fv(location, value);
        return this;
    },
    /**
	 * Sets the value of a uniform.
	 * !uniform3i (location: string|object, v0: number, v1: number, v2: number) : ShaderProgram;
	 */ uniform3i: function(location, v0, v1, v2) {
        if (typeof location === 'string') location = this.getUniformLocation(location);
        $0e3762fc4cbc2c8f$export$2e2bcd8739ae039.gl.uniform3i(location, v0, v1, v2);
        return this;
    },
    /**
	 * Sets the value of a uniform.
	 * !uniform3iv (location: string|object, value: any) : ShaderProgram;
	 */ uniform3iv: function(location, value) {
        if (typeof location === 'string') location = this.getUniformLocation(location);
        $0e3762fc4cbc2c8f$export$2e2bcd8739ae039.gl.uniform3iv(location, value);
        return this;
    },
    /**
	 * Sets the value of a uniform.
	 * !uniform4f (location: string|object, v0: number, v1: number, v2: number, v3: number) : ShaderProgram;
	 */ uniform4f: function(location, v0, v1, v2, v3) {
        if (typeof location === 'string') location = this.getUniformLocation(location);
        $0e3762fc4cbc2c8f$export$2e2bcd8739ae039.gl.uniform4f(location, v0, v1, v2, v3);
        return this;
    },
    /**
	 * Sets the value of a uniform.
	 * !uniform4fv (location: string|object, value: any) : ShaderProgram;
	 */ uniform4fv: function(location, value) {
        if (typeof location === 'string') location = this.getUniformLocation(location);
        $0e3762fc4cbc2c8f$export$2e2bcd8739ae039.gl.uniform4fv(location, value);
        return this;
    },
    /**
	 * Sets the value of a uniform.
	 * !uniform4i (location: string|object, v0: number, v1: number, v2: number, v3: number) : ShaderProgram;
	 */ uniform4i: function(location, v0, v1, v2, v3) {
        if (typeof location === 'string') location = this.getUniformLocation(location);
        $0e3762fc4cbc2c8f$export$2e2bcd8739ae039.gl.uniform4i(location, v0, v1, v2, v3);
        return this;
    },
    /**
	 * Sets the value of a uniform.
	 * !uniform4iv (location: string|object, value: any) : ShaderProgram;
	 */ uniform4iv: function(location, value) {
        if (typeof location === 'string') location = this.getUniformLocation(location);
        $0e3762fc4cbc2c8f$export$2e2bcd8739ae039.gl.uniform4iv(location, value);
        return this;
    }
});
/**
 * Global shader program list.
 */ $427f4d3ec70ccf6e$var$ShaderProgram.programs = {};
/**
 * Creates a new shader program. The specified source code allows the use of "//@vert", "//@frag" and "//@geom" directives to specify the code
 * blocks of the vertex, fragment and geometry shader respectively.
 * !static create (id: string, source: string) : ShaderProgram;
 */ $427f4d3ec70ccf6e$var$ShaderProgram.create = function(id, source) {
    let vs = null, vsName = null;
    let fs = null, fsName = null;
    let gs = null, gsName = null;
    let active = null;
    for (let i1 of source.split('\n')){
        let v = i1.trim();
        if (v.startsWith('//')) {
            v = v.split(' ').map((i)=>i.trim()
            );
            if (v[0] === '//@vert') {
                if (v.length > 1) vsName = v[1];
                if (vs === null) vs = [];
                active = vs;
                continue;
            }
            if (v[0] === '//@frag') {
                if (v.length > 1) fsName = v[1];
                if (fs === null) fs = [];
                active = fs;
                continue;
            }
            if (v[0] === '//@geom') {
                if (v.length > 1) gsName = v[1];
                if (gs === null) gs = [];
                active = gs;
                continue;
            }
        }
        if (active !== null) active.push(i1);
    }
    let pgm = new $427f4d3ec70ccf6e$var$ShaderProgram(id);
    // Convert to string.
    if (vs !== null) vs = vs.join('\n').trim();
    if (fs !== null) fs = fs.join('\n').trim();
    if (gs !== null) gs = gs.join('\n').trim();
    // Load shaders from name if name specified without any source code.
    if (vs !== null && vs.length === 0) {
        vs = $9a9389f93d34564b$export$2e2bcd8739ae039.get(vsName);
        if (vs === null) throw new Error('Vertex shader not found: ' + vsName);
    } else if (vs === null || vs.length === 0) vs = null;
    if (fs !== null && fs.length === 0) {
        fs = $9a9389f93d34564b$export$2e2bcd8739ae039.get(fsName);
        if (fs === null) throw new Error('Fragment shader not found: ' + fsName);
    } else if (fs === null || fs.length === 0) fs = null;
    if (gs !== null && gs.length === 0) {
        gs = $9a9389f93d34564b$export$2e2bcd8739ae039.get(gsName);
        if (gs === null) throw new Error('Geometry shader not found: ' + gsName);
    } else if (gs === null || gs.length === 0) gs = null;
    // Load default if none specified.
    if (vs === null) vs = $9a9389f93d34564b$export$2e2bcd8739ae039.get('def-vert');
    if (fs === null) fs = $9a9389f93d34564b$export$2e2bcd8739ae039.get('def-frag');
    // Compile source if GLSL source specified.
    if (vs !== null && typeof vs === 'string') vs = new $9a9389f93d34564b$export$2e2bcd8739ae039(vsName, $9a9389f93d34564b$export$2e2bcd8739ae039.Type.VERTEX, vs);
    if (fs !== null && typeof fs === 'string') fs = new $9a9389f93d34564b$export$2e2bcd8739ae039(fsName, $9a9389f93d34564b$export$2e2bcd8739ae039.Type.FRAGMENT, fs);
    if (gs !== null && typeof gs === 'string') gs = new $9a9389f93d34564b$export$2e2bcd8739ae039(gsName, $9a9389f93d34564b$export$2e2bcd8739ae039.Type.GEOMETRY, gs);
    // Attach programs and link.
    if (vs !== null) pgm.attach(vs);
    if (fs !== null) pgm.attach(fs);
    if (gs !== null) pgm.attach(gs);
    return pgm.link();
};
/**
 * Puts a shader program in the global program list under the specified identifier.
 * !static put (id: string, shaderProgram: ShaderProgram) : void;
 */ $427f4d3ec70ccf6e$var$ShaderProgram.put = function(id, shaderProgram) {
    if (id) this.programs[id] = shaderProgram;
};
/**
 * Returns a shader program from the global program list given its identifier.
 * !static get (id: string) : ShaderProgram;
 */ $427f4d3ec70ccf6e$var$ShaderProgram.get = function(id) {
    return this.programs[id];
};
/**
 * Removes a shader program from the global program list.
 * !static remove (id: string) : void;
 */ $427f4d3ec70ccf6e$var$ShaderProgram.remove = function(id) {
    delete this.programs[id];
};
var $427f4d3ec70ccf6e$export$2e2bcd8739ae039 = $427f4d3ec70ccf6e$var$ShaderProgram;






//![import "../math/matrix"]
//![import "./system"]
//![import "../utils/list"]
//![import "./shader-program"]
//![import "./shader"]
//![import "./globals"]
//![import "./log"]
//![import "./glx"]
//!namespace Canvas
//!type Options =
/**
		 * 	Actual HTML5 Canvas element, if `null` a new one will be created.
		 * 	!elem: HTMLCanvasElement;
		 */ /**
		 * 	WebGL enable flag.
		 * 	!gl: boolean;
		 */ /**
		 * 	Background of the canvas element.
		 * 	!background: string;
		 */ /**
		 * 	Width of the canvas.
		 * 	!width: number;
		 */ /**
		 * 	Height of the canvas.
		 * 	!height: number;
		 */ /**
		 * 	Indicates if the canvas element should be hidden from view (not attached to the document body).
		 * 	!hidden: boolean;
		 */ /**
		 * 	Set to `true` to ensure the canvas is positioned absolutly to (0, 0).
		 * 	!absolute: boolean;
		 */ /**
		 * 	Used to control the antialias property of the canvas.
		 * 	!antialias: boolean;
		 */ //!/type
//!/namespace
//!class Canvas
/**
 * 	Constructs a canvas object. If the Canvas DOM element is not provided a new element will be created and attached to the page.
 * 	!constructor (options: Canvas.Options);
 */ const $f7388fefeedc4aac$var$Canvas = function(options = null) {
    let opts = {
        elem: null,
        gl: false,
        background: '#000000',
        width: 0,
        height: 0,
        hidden: true,
        absolute: false,
        antialias: false,
        ...options
    };
    const headless = $parcel$global.document ? false : true;
    // Create canvas element if required.
    if (opts.elem == null) {
        this.elem = !headless ? $parcel$global.document.createElement('canvas') : $hNLgQ.Rinn.clone($f7388fefeedc4aac$var$Canvas.passThruCanvas);
        if ($parcel$global.document && opts.hidden != true) {
            $parcel$global.document.body.appendChild(this.elem);
            if (opts.absolute === true) {
                this.elem.style.position = 'absolute';
                this.elem.style.left = '0';
                this.elem.style.top = '0';
            }
        }
    } else this.elem = opts.elem;
    if (!this.elem.getContext) return;
    if (opts.gl === true && !headless) {
        this.gl = this.elem.getContext('webgl2', {
            desynchronized: false,
            alpha: false,
            stencil: true
        });
        $fdb3e373096c6ca3$export$2e2bcd8739ae039.gl = this.gl;
        $fdb3e373096c6ca3$export$2e2bcd8739ae039.shaderProgram = null;
        $0e3762fc4cbc2c8f$export$2e2bcd8739ae039.setContext(this.gl);
        this.context = null;
        $d0de706be9d545de$export$2e2bcd8739ae039.write($0e3762fc4cbc2c8f$export$2e2bcd8739ae039.getParameter('VERSION') + ', ' + $0e3762fc4cbc2c8f$export$2e2bcd8739ae039.getParameter('SHADING_LANGUAGE_VERSION'));
    } else {
        this.context = this.elem.getContext('2d', {
            desynchronized: false
        });
        this.gl = null;
    }
    // State stack support.
    this.matrixStack = $f6bd4ab8b6c953de$export$2e2bcd8739ae039.Pool.alloc();
    this.alphaStack = $f6bd4ab8b6c953de$export$2e2bcd8739ae039.Pool.alloc();
    this.depthFlagStack = $f6bd4ab8b6c953de$export$2e2bcd8739ae039.Pool.alloc();
    this.shaderProgramStack = $f6bd4ab8b6c953de$export$2e2bcd8739ae039.Pool.alloc();
    this.matr = $0bee0760636b614a$export$2e2bcd8739ae039.Pool.alloc();
    this.transform = $0bee0760636b614a$export$2e2bcd8739ae039.Pool.alloc();
    // Default context values.
    this._globalScale = 1.0;
    this._alpha = 1.0;
    this._depthFlag = true;
    // Set initial transformation matrix.
    this.updateTransform();
    this.strokeStyle("#fff");
    this.fillStyle("#fff");
    if (opts.width && opts.height) this.resize(opts.width, opts.height);
    if (this.gl !== null) this.initGl();
    this.antialias = opts.antialias;
    this.setBackground(opts.background);
};
$f7388fefeedc4aac$var$Canvas.passThruCanvas = {
    parentNode: null,
    imageSmoothingEnabled: true,
    style: {},
    width: 960,
    height: 540,
    getContext: function(renderingContext) {
        return this;
    },
    pushClip: function() {},
    popClip: function() {},
    scale: function(sx, sy) {},
    rotate: function(angle) {},
    translate: function(x, y) {},
    setTransform: function(a, b, c, d, e, f) {},
    updateTransform: function() {},
    toDataURL: function(mime, params) {
        return '';
    },
    beginPath: function() {},
    moveTo: function(x, y) {},
    closePath: function() {},
    lineTo: function() {},
    rect: function(x, y, w, h) {},
    fill: function() {},
    stroke: function() {},
    fillRect: function(x, y, w, h) {},
    strokeRect: function(x, y, w, h) {},
    clip: function() {},
    quadraticCurveTo: function(cpx, cpy, x, y) {},
    bezierCurveTo: function(cx1, cy1, cx2, cy2, x, y) {},
    arc: function(x, y, r, sA, eA, cw) {},
    arcTo: function(x1, y1, x2, y2, r) {},
    fillText: function(text, x, y, maxWidth) {},
    strokeText: function(text, x, y, maxWidth) {},
    measureText: function(text) {
        return {
            width: 0
        };
    },
    createImageData: function(w, h) {
        return {
            width: w,
            height: h
        };
    },
    getImageData: function(x, y, w, h) {
        return {
            width: w,
            height: h,
            data: []
        };
    },
    putImageData: function(data, x, y) {},
    drawImage: function(img, sx = 0, sy = 0, sw = null, sh = null, dx = null, dy = null, dw = null, dh = null, textureWidth = null, textureHeight = null, frameWidth = null, frameHeight = null) {},
    getBoundingClientRect: function() {
        return {
            left: 0,
            top: 0
        };
    }
};
/**
 * 	Initializes the OpenGL ES context.
 */ $f7388fefeedc4aac$var$Canvas.prototype.initGl = function() {
    let gl1 = this.gl;
    /**
	 * 	Create the frame-wrap shader program.
	 */ this.glFWrapProgram = new $427f4d3ec70ccf6e$export$2e2bcd8739ae039('fwrap');
    new $9a9389f93d34564b$export$2e2bcd8739ae039('fwrap-vert', $9a9389f93d34564b$export$2e2bcd8739ae039.Type.VERTEX, `
		uniform mat3 m_transform;
		uniform mat3 m_quad;
		uniform mat3 m_texture;
		uniform vec4 v_resolution;
		uniform vec4 v_frame_size;
		uniform float f_depth;

		in vec3 location;
		out vec2 texcoords;

		//@use location2d, frameTexCoords

		void main ()
		{
			gl_Position = location2d (location, f_depth);
			texcoords = frameTexCoords(location);
		}
	`);
    new $9a9389f93d34564b$export$2e2bcd8739ae039('fwrap-frag', $9a9389f93d34564b$export$2e2bcd8739ae039.Type.FRAGMENT, `
		uniform sampler2D texture0;
		uniform vec4 v_frame_size;
		uniform float f_alpha;

		in vec2 texcoords;
		out vec4 color;

		//@use frameTex

		void main ()
		{
			color = frameTex(texcoords);

			color.a *= f_alpha;
			if (color.a <= 0.0) discard;
		}
	`);
    /**
	 * 	Create the default shader program.
	 */ this.glDefaultProgram = new $427f4d3ec70ccf6e$export$2e2bcd8739ae039('def');
    new $9a9389f93d34564b$export$2e2bcd8739ae039('def-vert', $9a9389f93d34564b$export$2e2bcd8739ae039.Type.VERTEX, `
		uniform mat3 m_transform;
		uniform mat3 m_quad;
		uniform mat3 m_texture;
		uniform vec4 v_resolution;
		uniform float f_depth;

		in vec3 location;
		out vec2 texcoords;

		//@use location2d

		void main ()
		{
			gl_Position = location2d (location, f_depth);
			texcoords = vec2(m_texture * location);
		}
	`);
    new $9a9389f93d34564b$export$2e2bcd8739ae039('def-frag', $9a9389f93d34564b$export$2e2bcd8739ae039.Type.FRAGMENT, `
		uniform sampler2D texture0;
		uniform float f_alpha;

		in vec2 texcoords;
		out vec4 color;

		void main()
		{
			color = texture(texture0, texcoords);

			color.a *= f_alpha;
			if (color.a <= 0.0) discard;
		}
	`);
    /**
	 * 	Create the frame buffer blit shader program.
	 */ this.glBlitProgram = new $427f4d3ec70ccf6e$export$2e2bcd8739ae039('blit');
    new $9a9389f93d34564b$export$2e2bcd8739ae039('blit-vert', $9a9389f93d34564b$export$2e2bcd8739ae039.Type.VERTEX, `
		uniform vec4 v_resolution;
		uniform mat3 m_quad;
		uniform mat3 m_texture;

		in vec3 location;
		out vec2 texcoords;

		//@use snorm

		void main() {
			gl_Position = vec4(snorm(vec2(m_quad * location) / v_resolution.xy), 0.0, 1.0);
			texcoords = vec2(m_texture * location);
		}
	`);
    new $9a9389f93d34564b$export$2e2bcd8739ae039('blit-frag', $9a9389f93d34564b$export$2e2bcd8739ae039.Type.FRAGMENT, `
		uniform sampler2D texture0;
		in vec2 texcoords;

		out vec4 color;

		void main() {
			color = texture(texture0, texcoords);
		}
	`);
    /* ****** */ this.glDefaultProgram.attach('def-vert');
    this.glDefaultProgram.attach('def-frag');
    this.glFWrapProgram.attach('fwrap-vert');
    this.glFWrapProgram.attach('fwrap-frag');
    this.glBlitProgram.attach('blit-vert');
    this.glBlitProgram.attach('blit-frag');
    this.glDefaultProgram.link();
    this.glFWrapProgram.link();
    this.glBlitProgram.link();
    if (!this.glDefaultProgram.getStatus()) throw new Error(this.glDefaultProgram.getAllErrors());
    if (!this.glFWrapProgram.getStatus()) throw new Error(this.glFWrapProgram.getAllErrors());
    if (!this.glBlitProgram.getStatus()) throw new Error(this.glBlitProgram.getAllErrors());
    this.setShaderProgram($427f4d3ec70ccf6e$export$2e2bcd8739ae039.get('def'));
    /**
	 * 	Create the vertex buffer.
	 */ this.vao0 = gl1.createVertexArray();
    gl1.bindVertexArray(this.vao0);
    $0e3762fc4cbc2c8f$export$2e2bcd8739ae039.createBufferFrom([
        0.0,
        0.0,
        1.0,
        0.0,
        1.0,
        1.0,
        1.0,
        0.0,
        1.0,
        1.0,
        1.0,
        1.0
    ], $0e3762fc4cbc2c8f$export$2e2bcd8739ae039.BufferTarget.ARRAY_BUFFER, $0e3762fc4cbc2c8f$export$2e2bcd8739ae039.BufferUsage.STATIC_DRAW);
    gl1.vertexAttribPointer($fdb3e373096c6ca3$export$2e2bcd8739ae039.shaderProgram.getAttribLocation('location'), 3, gl1.FLOAT, gl1.FALSE, 3 * Float32Array.BYTES_PER_ELEMENT, 0 * Float32Array.BYTES_PER_ELEMENT);
    gl1.enableVertexAttribArray($fdb3e373096c6ca3$export$2e2bcd8739ae039.shaderProgram.getAttribLocation('location'));
    /**
	 * 	Setup initial GL configuration.
	 */ gl1.clearColor(0.0, 0.0, 0.0, 1.0);
    gl1.enable(gl1.DEPTH_TEST);
    gl1.clearDepth(0.0);
    gl1.depthFunc(gl1.GEQUAL);
    gl1.enable(gl1.BLEND);
    gl1.blendFunc(gl1.SRC_ALPHA, gl1.ONE_MINUS_SRC_ALPHA);
    /**
	 * 	Setup frame buffer.
	 */ /* *** */ this.m_quad = new Float32Array(9).fill(0);
    this.m_texture = new Float32Array(9).fill(0);
    this.v_resolution = new Float32Array(4).fill(0);
    this.zvalue = 0;
    $0bee0760636b614a$export$2e2bcd8739ae039.loadIdentity(this.m_quad);
    $0bee0760636b614a$export$2e2bcd8739ae039.loadIdentity(this.m_texture);
    // drawImage (Image img, float sx, float sy, float sw, float sh, float dx, float dy, float dw, float dh, float textureWidth, float textureHeight, float frameWidth, float frameHeight);
    this.drawImage = function(img, sx, sy, sw, sh, dx, dy, dw, dh, textureWidth = null, textureHeight = null, frameWidth = null, frameHeight = null) {
        if (!img.glTextureReady) return;
        let gl = this.gl;
        let program = $fdb3e373096c6ca3$export$2e2bcd8739ae039.shaderProgram;
        if (textureWidth === null) {
            textureWidth = img.width;
            textureHeight = img.height;
        }
        if (frameWidth === null) {
            frameWidth = img.targetWidth;
            frameHeight = img.targetHeight;
        }
        program.uniform4fv('v_resolution', this.v_resolution);
        program.uniform1f('f_time', $fdb3e373096c6ca3$export$2e2bcd8739ae039.time);
        program.uniform1f('f_scale', this._globalScale);
        program.uniform1f('f_alpha', this._alpha);
        if (this.glActiveTextureId !== img.glTextureId || this.glActiveShader !== program) {
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, img.glTextureId);
            program.uniform1i('texture0', 0);
            program.uniform4f('v_frame_size', frameWidth * img.rscale / textureWidth, frameHeight * img.rscale / textureHeight, frameWidth, frameHeight);
            this.glActiveTextureId = img.glTextureId;
            this.glActiveShader = program;
        }
        this.m_quad[0] = dw;
        this.m_quad[4] = dh;
        this.m_quad[6] = dx;
        this.m_quad[7] = dy;
        this.m_texture[0] = sw / textureWidth;
        this.m_texture[4] = sh / textureHeight;
        this.m_texture[6] = sx / textureWidth;
        this.m_texture[7] = sy / textureHeight;
        gl.uniformMatrix3fv(program.getUniformLocation('m_transform'), false, this.transform.data);
        gl.uniformMatrix3fv(program.getUniformLocation('m_quad'), false, this.m_quad);
        gl.uniformMatrix3fv(program.getUniformLocation('m_texture'), false, this.m_texture);
        gl.uniform1f(program.getUniformLocation('f_depth'), this.zvalue);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    // drawRect (float x, float y, float w, float h, Image img=null);
    this.drawRect = function(x, y, w, h, img = null) {
        let gl = this.gl;
        let program = $fdb3e373096c6ca3$export$2e2bcd8739ae039.shaderProgram;
        program.uniform4fv('v_resolution', this.v_resolution);
        program.uniform1f('f_time', $fdb3e373096c6ca3$export$2e2bcd8739ae039.time);
        program.uniform1f('f_scale', this._globalScale);
        program.uniform1f('f_alpha', this._alpha);
        this.glActiveTextureId = null;
        this.m_quad[0] = w;
        this.m_quad[4] = h;
        this.m_quad[6] = x;
        this.m_quad[7] = y;
        this.m_texture[0] = 1.0;
        this.m_texture[4] = 1.0;
        this.m_texture[6] = 0.0;
        this.m_texture[7] = 0.0;
        gl.uniformMatrix3fv(program.getUniformLocation('m_transform'), false, this.transform.data);
        gl.uniformMatrix3fv(program.getUniformLocation('m_quad'), false, this.m_quad);
        gl.uniformMatrix3fv(program.getUniformLocation('m_texture'), false, this.m_texture);
        gl.uniform1f(program.getUniformLocation('f_depth'), this.zvalue);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
};
/**
 * 	Prepares an image to use it on the canvas. Used only when GL mode is active.
 * 	!prepareImage (image: HTMLImageElement) : boolean;
 */ $f7388fefeedc4aac$var$Canvas.prototype.prepareImage = function(image) {
    let gl = this.gl;
    if (gl == null) return false;
    let texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    if (!image.filter) image.filter = 'NEAREST';
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    if (image.mipmap === true) {
        gl.texStorage2D(gl.TEXTURE_2D, image.levels, gl.RGBA8, image.width, image.height);
        gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, image.width, image.height, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.generateMipmap(gl.TEXTURE_2D);
        if (image.filter === 'NEAREST') {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        } else {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        }
    } else {
        gl.texStorage2D(gl.TEXTURE_2D, 1, gl.RGBA8, image.width, image.height);
        gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, image.width, image.height, gl.RGBA, gl.UNSIGNED_BYTE, image);
        if (image.filter === 'NEAREST') {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        } else {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        }
    }
    image.glTextureId = texture;
    image.glTextureReady = true;
    return true;
};
/**
 * 	Configures the texture related to specified image to gl.REPEAT.
 * 	!setWrapRepeat (image: HTMLImageElement) : HTMLImageElement;
 */ $f7388fefeedc4aac$var$Canvas.prototype.setWrapRepeat = function(image) {
    let gl = this.gl;
    if (gl == null || !image.glTextureReady) return image;
    gl.bindTexture(gl.TEXTURE_2D, image.glTextureId);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    return image;
};
/**
 * 	Applies the current config to the canvas (usually called after a reset on the canvas).
 */ $f7388fefeedc4aac$var$Canvas.prototype.applyConfig = function() {
    if (this.antialias == false) {
        if (this.context != null) this.context.imageSmoothingEnabled = false;
        this.elem.style.imageRendering = 'crisp-edges';
    } else {
        if (this.context != null) this.context.imageSmoothingEnabled = true;
        this.elem.style.imageRendering = 'auto';
    }
};
/**
 * 	Disposes the resources used by the canvas. The HTMLCanvasElement will also be removed from the document.
 */ $f7388fefeedc4aac$var$Canvas.prototype.dispose = function() {
    if (this.elem.parentNode) this.elem.parentNode.removeChild(this.elem);
    this.matrixStack.free();
    this.alphaStack.free();
    this.depthFlagStack.free();
    this.shaderProgramStack.free();
    this.matr = null;
    this.context = null;
    this.elem = null;
};
/**
 * 	Sets the default background color of the canvas. Does not cause a canvas clear.
 * 	!setBackground (color: string) : void;
 */ $f7388fefeedc4aac$var$Canvas.prototype.setBackground = function(color) {
    this.elem.style.background = color;
    this.backgroundColor = color;
    if (this.gl !== null) {
        if (color.length != 7) throw new Error('Canvas.setBackground: color parameter should be CSS-style hex-rgb with 6 digits.');
        let r = parseInt(color.substr(1, 2), 16) / 255.0;
        let g = parseInt(color.substr(3, 2), 16) / 255.0;
        let b = parseInt(color.substr(5, 2), 16) / 255.0;
        this.gl.clearColor(r, g, b, 1.0);
    }
};
/**
 * 	Sets the canvas size.
 * 	!resize (width: number, height: number) : Canvas;
 */ $f7388fefeedc4aac$var$Canvas.prototype.resize = function(width, height) {
    let rect = this.elem.getBoundingClientRect();
    if (!width) width = rect.width;
    if (!height) height = rect.height;
    this.elem.width = width;
    this.elem.height = height;
    this.width = this.elem.width;
    this.height = this.elem.height;
    this._width = int(this.width / this._globalScale);
    this._height = int(this.height / this._globalScale);
    let gl = this.gl;
    if (gl != null) {
        gl.enable(gl.SCISSOR_TEST);
        gl.scissor(0, 0, this.width, this.height);
        gl.viewport(0, 0, this.width, this.height);
        if (this.v_resolution) {
            //violet:hardware scaling
            //this.v_resolution[0] = this._width;
            //this.v_resolution[1] = this._height;
            this.v_resolution[0] = this.width;
            this.v_resolution[1] = this.height;
            this.v_resolution[2] = this.width;
            this.v_resolution[3] = this.height;
        }
    }
    this.applyConfig();
    return this;
};
/**
 * 	Sets the global canvas scale.
 * 	!globalScale (value: number) : Canvas;
 */ $f7388fefeedc4aac$var$Canvas.prototype.globalScale = function(value) {
    this._globalScale = value;
    this._width = int(this.width / this._globalScale);
    this._height = int(this.height / this._globalScale);
    this.loadIdentity();
    //violet:hardware scaling
    //if (this.gl === null)
    this.scale(value, value);
    return this;
};
/**
 * 	Sets the flipped status of the canvas, that is, if the canvas coordinates are flipped (i.e. `xy` is now `yx`).
 * 	!flipped (value: boolean) : Canvas;
 */ $f7388fefeedc4aac$var$Canvas.prototype.flipped = function(value) {
    if (value) {
        this._width = int(this.height / this._globalScale);
        this._height = int(this.width / this._globalScale);
    } else {
        this._width = int(this.width / this._globalScale);
        this._height = int(this.height / this._globalScale);
    }
    if (this.gl != null && this.v_resolution) {
        this.v_resolution[0] = this.width;
        this.v_resolution[1] = this.height;
        this.v_resolution[2] = value ? this.height : this.width;
        this.v_resolution[3] = value ? this.width : this.height;
    }
    this.isFlipped = value;
    return this;
};
/**
 * 	Saves the clip state of the canvas. Works only in GL mode.
 * 	!pushClip() : Canvas;
 */ $f7388fefeedc4aac$var$Canvas.prototype.pushClip = function() {
    return this;
};
/**
 * 	Restores the clip state of the canvas. Works only in GL mode.
 * 	!popClip() : Canvas;
 */ $f7388fefeedc4aac$var$Canvas.prototype.popClip = function() {
    if (this.gl != null) this.gl.scissor(0, 0, this.width, this.height);
    return this;
};
/**
 * 	Returns the image on the canvas as a string in DATA-URI format.
 * 	!toDataUrl (mime: string, params?: object) : string;
 */ $f7388fefeedc4aac$var$Canvas.prototype.toDataUrl = function(mime = 'image/png', params = null) {
    return this.elem.toDataURL(mime, params);
};
/**
 * 	Returns the image as a Base-64 encoded PNG string.
 * 	!toPngBase64() : string;
 */ $f7388fefeedc4aac$var$Canvas.prototype.toPngBase64 = function() {
    return this.elem.toDataURL("image/png").substr(22);
};
/**
 * 	Sets or returns an attribute of the canvas context.
 */ $f7388fefeedc4aac$var$Canvas.prototype._contextAttribute = function(name, value = null) {
    if (!this.context) return;
    if (value !== null) {
        this.context[name] = value;
        return this;
    }
    return this.context[name];
};
/**
 * 	Sets the fill style.
 * 	!fillStyle (value: string) : Canvas;
 */ /**
 * 	Returns the current fill style.
 * 	!fillStyle () : string;
 */ $f7388fefeedc4aac$var$Canvas.prototype.fillStyle = function(value) {
    return this._contextAttribute("fillStyle", value);
};
/**
 * 	Sets the stroke style.
 * 	!strokeStyle (value: string) : Canvas;
 */ /**
 * 	Returns the current strroke style.
 * 	!strokeStyle () : string;
 */ $f7388fefeedc4aac$var$Canvas.prototype.strokeStyle = function(value) {
    return this._contextAttribute("strokeStyle", value);
};
/**
 * 	Sets the line cap style (Possible values are `butt`, `round`, or `square`. `butt` is default).
 * 	!lineCap (value: string) : Canvas;
 */ /**
 * 	Returns the current line cap style.
 * 	!lineCap() : string;
 */ $f7388fefeedc4aac$var$Canvas.prototype.lineCap = function(value) {
    return this._contextAttribute("lineCap", value);
};
// violet
/*
**	Sets or returns the current line join style (bevel, round, miter. miter is default).
**
**	>> Canvas lineJoin (string value);
**	>> string lineJoin ();
*/ $f7388fefeedc4aac$var$Canvas.prototype.lineJoin = function(value) {
    return this._contextAttribute("lineJoin", value);
};
/*
**	Sets or returns the current line width value (default 1).
**
**	>> Canvas lineWidth (float value);
**	>> float lineWidth ();
*/ $f7388fefeedc4aac$var$Canvas.prototype.lineWidth = function(value) {
    return this._contextAttribute("lineWidth", value);
};
/*
**	Sets or returns the current miter limit value (default 10).
**
**	>> Canvas miterLimit (float value);
**	>> float miterLimit ();
*/ $f7388fefeedc4aac$var$Canvas.prototype.miterLimit = function(value) {
    return this._contextAttribute("miterLimit", value);
};
/*
**	Sets or returns the current shadow color value (default black).
**
**	>> Canvas shadowColor (string value);
**	>> string shadowColor ();
*/ $f7388fefeedc4aac$var$Canvas.prototype.shadowColor = function(value) {
    return this._contextAttribute("shadowColor", value);
};
/*
**	Sets or returns the current shadow X offset (default 0).
**
**	>> Canvas shadowOffsetX (float value);
**	>> float shadowOffsetX ();
*/ $f7388fefeedc4aac$var$Canvas.prototype.shadowOffsetX = function(value) {
    return this._contextAttribute("shadowOffsetX", value);
};
/*
**	Sets or returns the current shadow Y offset (default 0).
**
**	>> Canvas shadowOffsetY (float value);
**	>> float shadowOffsetY ();
*/ $f7388fefeedc4aac$var$Canvas.prototype.shadowOffsetY = function(value) {
    return this._contextAttribute("shadowOffsetY", value);
};
/*
**	Sets or returns the current shadow blue value (default 0).
**
**	>> Canvas shadowBlur (string value);
**	>> string shadowBlur ();
*/ $f7388fefeedc4aac$var$Canvas.prototype.shadowBlur = function(value) {
    return this._contextAttribute("shadowBlur", value);
};
/*
**	Sets or returns the current font settings.
**
**	>> Canvas font (string value);
**	>> string font ();
*/ $f7388fefeedc4aac$var$Canvas.prototype.font = function(value) {
    return this._contextAttribute("font", value);
};
/*
**	Sets or returns the current text align settings (start, end, left, right, center).
**
**	>> Canvas textAlign (string value);
**	>> string textAlign ();
*/ $f7388fefeedc4aac$var$Canvas.prototype.textAlign = function(value) {
    return this._contextAttribute("textAlign", value);
};
/*
**	Sets or returns the current text base line settings (alphabetic, bottom, hanging, ideographic, middle, top. Alphabetic is default).
**
**	>> Canvas textBaseline (string value);
**	>> string textBaseline ();
*/ $f7388fefeedc4aac$var$Canvas.prototype.textBaseline = function(value) {
    return this._contextAttribute("textBaseline", value);
};
/*
**	Sets or returns the current global alpha value.
**
**	>> Canvas globalAlpha (float value);
**	>> float globalAlpha ();
*/ $f7388fefeedc4aac$var$Canvas.prototype.globalAlpha = function(value = null) {
    if (value !== null) this._alpha = value;
    else return this._alpha;
    return this.alpha(1.0);
};
/*
**	Sets or returns the current global composite operation value (source-atop, source-in, source-out, source-over, destination-atop,
**	destination-in, destination-out, destination-over, lighter, copy, xor).
**
**	>> Canvas globalCompositeOperation (string value);
**	>> string globalCompositeOperation ();
*/ $f7388fefeedc4aac$var$Canvas.prototype.globalCompositeOperation = function(value) {
    return this._contextAttribute("globalCompositeOperation", value);
};
/*
**	Updates the underlying canvas or gl transformation matrix. 
**
**	Canvas updateTransform();
*/ $f7388fefeedc4aac$var$Canvas.prototype.updateTransform = function() {
    this.setTransform(this.matr.data[0], this.matr.data[1], this.matr.data[3], this.matr.data[4], this.matr.data[6], this.matr.data[7]);
    return this;
};
/*
**	Sets the canvas or gl transformation matrix to the given one.
**
**	Canvas setTransform (float a, float b, float c, float d, float e, float f)
*/ $f7388fefeedc4aac$var$Canvas.prototype.setTransform = function(a, b, c, d, e, f) {
    if (this.context === null) {
        this.transform.data[0] = a;
        this.transform.data[1] = b;
        this.transform.data[2] = 0;
        this.transform.data[3] = c;
        this.transform.data[4] = d;
        this.transform.data[5] = 0;
        this.transform.data[6] = int(e); //Math.ceil(e);
        this.transform.data[7] = int(f); //Math.ceil(f);
        this.transform.data[8] = 1;
        return this;
    }
    //this.context.setTransform (a, b, c, d, Math.ceil(e), Math.ceil(f));
    this.context.setTransform(a, b, c, d, int(e), int(f));
    return this;
};
/*
**	Draws a filled rectangle on the canvas.
**
**	Canvas fillRect (float x, float y, float w, float h)
*/ $f7388fefeedc4aac$var$Canvas.prototype.fillRect = function(x, y, w, h) {
    this.context.fillRect(x, y, w, h);
    return this;
};
/*
**	Draws an stroked rectangle on the canvas.
**
**	Canvas strokeRect (float x, float y, float w, float h)
*/ $f7388fefeedc4aac$var$Canvas.prototype.strokeRect = function(x, y, w, h) {
    this.context.strokeRect(x, y, w, h);
    return this;
};
/*
**	Clears a rectangle on the canvas. All pixels will be erased.
**
**	Canvas clearRect (float x, float y, float w, float h)
*/ $f7388fefeedc4aac$var$Canvas.prototype.clearRect = function(x, y, w, h) {
    this.context.clearRect(x, y, w, h);
    return this;
};
/*
**	Starts a new path. Any previous path points will be cleared.
**
**	Canvas beginPath()
*/ $f7388fefeedc4aac$var$Canvas.prototype.beginPath = function() {
    this.context.beginPath();
    return this;
};
/*
**	Creates a new point in the current path.
**
**	Canvas moveTo (float x, float y)
*/ $f7388fefeedc4aac$var$Canvas.prototype.moveTo = function(x, y) {
    this.context.moveTo(x, y);
    return this;
};
/*
**	Creates a new point from the first path point to the last, and finishes the path.
**
**	Canvas closePath()
*/ $f7388fefeedc4aac$var$Canvas.prototype.closePath = function() {
    this.context.closePath();
    return this;
};
/*
**	Draws a line from the last point on the path to the given point.
**
**	Canvas lineTo (float x, float y)
*/ $f7388fefeedc4aac$var$Canvas.prototype.lineTo = function(x, y) {
    this.context.lineTo(x, y);
    return this;
};
/*
**	Creates a hollow rectangle path on the canvas for subsequent stroke or fill.
**
**	Canvas rect (float x, float y, float w, float h)
*/ $f7388fefeedc4aac$var$Canvas.prototype.rect = function(x, y, w, h) {
    this.context.rect(x, y, w, h);
    return this;
};
/*
**	Fills the active path with the current fill style or with the one given in the value parameter.
**
**	Canvas fill (string value=null)
*/ $f7388fefeedc4aac$var$Canvas.prototype.fill = function(value = null) {
    if (value) this.fillStyle(value);
    this.context.fill();
    return this;
};
/*
**	Strokes the active path with the current stroke style or with the one given in the value parameter.
**
**	Canvas stroke (string value=null)
*/ $f7388fefeedc4aac$var$Canvas.prototype.stroke = function(value = null) {
    if (value) this.strokeStyle(value);
    this.context.stroke();
    return this;
};
/*
**	Clips a region of the canvas so that only the region will be used for drawing. Coordinates must be in logical screen space.
**
**	Canvas clip()
*/ $f7388fefeedc4aac$var$Canvas.prototype.clip = function(x, y, width, height) {
    if (this.gl !== null) {
        x *= this._globalScale;
        y *= this._globalScale;
        width *= this._globalScale;
        height *= this._globalScale;
        if (this.isFlipped) this.gl.scissor(this.width - y - height - 1, this.height - x - width - 1, height, width);
        else this.gl.scissor(x, this.height - y - height - 1, width, height);
    }
    return this;
};
/*
**	Adds points of a quadratic curve to the active path. A control points and one reference point must be provided.
**
**	Canvas quadraticCurveTo (float cpx, float cpy, float x, float y)
*/ $f7388fefeedc4aac$var$Canvas.prototype.quadraticCurveTo = function(cpx, cpy, x, y) {
    this.context.quadraticCurveTo(cpx, cpy, x, y);
    return this;
};
/*
**	Adds points of a bezier curve to the active path. Two control points and one reference point must be provided.
**
**	Canvas bezierCurveTo (float cx1, float cy1, float cx2, float cy2, float x, float y)
*/ $f7388fefeedc4aac$var$Canvas.prototype.bezierCurveTo = function(cx1, cy1, cx2, cy2, x, y) {
    this.context.bezierCurveTo(cx1, cy1, cx2, cy2, x, y);
    return this;
};
/*
**	Adds points of an arc the the active path. Used to draw a circle of part of it.
**
**	Canvas arc (float x, float y, float r, float sA, float eA, float cw)
*/ $f7388fefeedc4aac$var$Canvas.prototype.arc = function(x, y, r, sA, eA, cw) {
    this.context.arc(x, y, r, sA, eA, cw);
    return this;
};
/*
**	Adds points of an arc to the active path. Used to create an arc between two points.
**
**	Canvas arcTo (float x1, float y1, float x2, float y2, float r)
*/ $f7388fefeedc4aac$var$Canvas.prototype.arcTo = function(x1, y1, x2, y2, r) {
    this.context.arcTo(x1, y1, x2, y2, r);
    return this;
};
/*
**	Draws filled text on the canvas with the active font, and fillStyle properties.
**
**	Canvas fillText (string text, float x, float y, float maxWidth=1000)
*/ $f7388fefeedc4aac$var$Canvas.prototype.fillText = function(text, x, y, maxWidth = 1000) {
    this.context.fillText(text, x, y, maxWidth);
    return this;
};
/*
**	Draws stroked text on the canvas with the active font, and fillStyle properties.
**
**	Canvas strokeText (string text, float x, float y, float maxWidth=1000)
*/ $f7388fefeedc4aac$var$Canvas.prototype.strokeText = function(text, x, y, maxWidth = 1000) {
    this.context.strokeText(text, x, y, maxWidth);
    return this;
};
/*
**	Measures the width of the given text using active font properties.
**
**	float measureText (string text)
*/ $f7388fefeedc4aac$var$Canvas.prototype.measureText = function(text) {
    return this.context.measureText(text).width;
};
/*
**	Returns a new image data object with the specified size.
**
**	ImageData createImageData (float w, float h)
*/ $f7388fefeedc4aac$var$Canvas.prototype.createImageData = function(w, h) {
    return this.context.createImageData(w, h);
};
/*
**	Returns an image data object with the pixels of a rectangular area of the canvas.
**
**	ImageData getImageData (float x, float y, float w, float h)
*/ $f7388fefeedc4aac$var$Canvas.prototype.getImageData = function(x, y, w, h) {
    return this.context.getImageData(x, y, w, h);
};
/*
**	Puts image data on the canvas at the specified location.
**
**	Canvas putImageData (ImageData data, float x, float y)
*/ $f7388fefeedc4aac$var$Canvas.prototype.putImageData = function(data, x, y) {
    this.context.putImageData(data, x, y);
    return this;
};
/*
**	Draws an image on the canvas.
**
**	Canvas drawImage (Image img, float x, float y)
**	Canvas drawImage (Image img, float x, float y, float w, float h)
**	Canvas drawImage (Image img, float sx, float sy, float sw, float sh, float dx, float dy, float dw, float dh)
*/ $f7388fefeedc4aac$var$Canvas.prototype.drawImage = function(img, sx = 0, sy = 0, sw = null, sh = null, dx = null, dy = null, dw = null, dh = null) {
    if (sw === null) this.context.drawImage(img, int(sx), int(sy));
    else if (dx === null) this.context.drawImage(img, int(sx), int(sy), int(sw), int(sh));
    else {
        let a3 = int(sw);
        let a4 = int(sh);
        if (!a3 || !a4) return this;
        let a7 = int(dw);
        let a8 = int(dh);
        if (!a7 || !a8) return this;
        this.context.drawImage(img, int(sx), int(sy), a3, a4, int(dx), int(dy), a7, a8);
    }
    return this;
};
/*
**	Clears the entire canvas. If the backgroundColor parameter is set the canvas will be cleared manually by using
**	the fillRect method.
**
**	Canvas clear (string backgroundColor)
**	Canvas clear ()
*/ $f7388fefeedc4aac$var$Canvas.prototype.clear = function(backgroundColor = null) {
    if (this.gl != null) {
        this.gl.clear(this.gl.STENCIL_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT | this.gl.COLOR_BUFFER_BIT);
        this.glActiveTextureId = null;
        return this;
    }
    if (backgroundColor) this.globalCompositeOperation("source-over").globalAlpha(1.0).fillStyle(backgroundColor !== true ? backgroundColor : this.backgroundColor).fillRect(0, 0, this._width, this._height);
    else {
        this.elem.width = this.width;
        this.applyConfig();
    }
    this.updateTransform();
    return this;
};
/*
**	Indicates that rendering is about to start. Used only in GL mode.
*/ $f7388fefeedc4aac$var$Canvas.prototype.start = function() {};
/*
**	Indicates that rendering has ended. Used only in GL mode.
*/ $f7388fefeedc4aac$var$Canvas.prototype.end = function() {};
/*
**	Indicates that rendering has been completed and any flush operation should be executed. Used only in GL mode.
*/ $f7388fefeedc4aac$var$Canvas.prototype.flush = function() {
    let gl = this.gl;
    if (gl === null) return;
    gl.colorMask(false, false, false, true);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.colorMask(true, true, true, true);
// VIOLET: Add gl.flush() if not using RAF.
};
/**
 *	Blits the specified texture to the active framebuffer.
 */ $f7388fefeedc4aac$var$Canvas.prototype.blit = function(texture, width, height, shaderProgram = null) {
    let gl = this.gl;
    if (gl === null) return;
    shaderProgram = shaderProgram || this.glBlitProgram;
    this.setShaderProgram(shaderProgram);
    gl.disable(gl.DEPTH_TEST);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    shaderProgram.uniform1i('texture0', 0);
    shaderProgram.uniform4fv('v_resolution', this.v_resolution);
    shaderProgram.uniform1f('f_time', $fdb3e373096c6ca3$export$2e2bcd8739ae039.time);
    shaderProgram.uniform1f('f_scale', this._globalScale);
    shaderProgram.uniform1f('f_alpha', this._alpha);
    this.m_quad[0] = this.width;
    this.m_quad[4] = this.height;
    this.m_quad[6] = 0;
    this.m_quad[7] = 0;
    this.m_texture[0] = this.width / width;
    this.m_texture[4] = this.height / height;
    this.m_texture[6] = 0.0;
    this.m_texture[7] = 0.0;
    gl.uniformMatrix3fv(shaderProgram.getUniformLocation('m_quad'), false, this.m_quad);
    gl.uniformMatrix3fv(shaderProgram.getUniformLocation('m_texture'), false, this.m_texture);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    this.setShaderProgram($427f4d3ec70ccf6e$export$2e2bcd8739ae039.get('def'));
    gl.enable(gl.DEPTH_TEST);
};
/*
**	Resets the context drawing properties to their initial values.
**
**	Canvas reset (bool clearPath=false);
*/ $f7388fefeedc4aac$var$Canvas.prototype.reset = function(clearPath = false) {
    this.fillStyle("#000000").strokeStyle("#000000").lineCap("butt").lineJoin("miter").lineWidth("1").miterLimit("10").shadowColor("#000000").shadowOffsetX("0").shadowOffsetY("0").shadowBlur("0").globalAlpha("1.0").globalCompositeOperation("source-over");
    if (clearPath) this.beginPath().closePath();
    return this;
};
/*
**	Pushes the current transformation matrix into the matrix stack.
*/ $f7388fefeedc4aac$var$Canvas.prototype.pushMatrix = function() {
    this.matrixStack.push(this.matr);
    this.matr = this.matr.clone();
    return this;
};
/*
**	Pops a matrix from the matrix stack into the transformation matrix.
*/ $f7388fefeedc4aac$var$Canvas.prototype.popMatrix = function() {
    this.matr.free();
    this.matr = this.matrixStack.pop();
    return this.updateTransform();
};
/*
**	Sets or returns the relative alpha value for subsequent drawing operations.
**
**	>> Canvas alpha (float value);
**	>> float alpha ();
*/ $f7388fefeedc4aac$var$Canvas.prototype.alpha = function(value) {
    this._alpha *= value;
    if (this.context && this.gl === null) this.context.globalAlpha = this._alpha;
    return this;
};
/*
**	Pushes the current global alpha into the stack.
*/ $f7388fefeedc4aac$var$Canvas.prototype.pushAlpha = function() {
    this.alphaStack.push(this.globalAlpha());
    return this;
};
/*
**	Pops an alpha from the stack into the global alpha.
**
**	>> Canvas popAlpha();
*/ $f7388fefeedc4aac$var$Canvas.prototype.popAlpha = function() {
    this.globalAlpha(this.alphaStack.pop());
    return this;
};
/*
**	Sets the depth-test flag.
*/ $f7388fefeedc4aac$var$Canvas.prototype.setDepthFlag = function(value) {
    let gl = this.gl;
    if (gl === null) return;
    if (value) {
        gl.enable(gl.DEPTH_TEST);
        this._depthFlag = true;
    } else {
        gl.disable(gl.DEPTH_TEST);
        this._depthFlag = false;
    }
};
/*
**	Returns the depth-test flag.
*/ $f7388fefeedc4aac$var$Canvas.prototype.getDepthFlag = function() {
    return this._depthFlag;
};
/*
**	Pushes the current depth-test flag into the depth flag stack. If a value is provided, the current flag will be pushed and set to the
**	given value only if they're different, when so, true will be returned.
*/ $f7388fefeedc4aac$var$Canvas.prototype.pushDepthFlag = function(value = null) {
    if (value !== null) {
        value = !!value;
        if (value === this._depthFlag) return false;
        this.depthFlagStack.push(this._depthFlag);
        this.setDepthFlag(value);
        return true;
    }
    this.depthFlagStack.push(this._depthFlag);
};
/*
**	Pops the depth-test flag from the depth flag stack.
*/ $f7388fefeedc4aac$var$Canvas.prototype.popDepthFlag = function() {
    this.setDepthFlag(this.depthFlagStack.pop());
};
/*
**	Sets the active shader program.
*/ $f7388fefeedc4aac$var$Canvas.prototype.setShaderProgram = function(program) {
    let gl = this.gl;
    if (gl === null) return;
    $fdb3e373096c6ca3$export$2e2bcd8739ae039.shaderProgram = program;
    $fdb3e373096c6ca3$export$2e2bcd8739ae039.shaderProgram.activate();
};
/*
**	Returns the current shader program.
*/ $f7388fefeedc4aac$var$Canvas.prototype.getShaderProgram = function() {
    return $fdb3e373096c6ca3$export$2e2bcd8739ae039.shaderProgram;
};
/*
**	Pushes the current shader program into the stack. If a value is provided, the current shader program will be pushed and set to the
**	given one only if they're different, when so, true will be returned.
*/ $f7388fefeedc4aac$var$Canvas.prototype.pushShaderProgram = function(program = null) {
    if (program !== null) {
        if (program === $fdb3e373096c6ca3$export$2e2bcd8739ae039.shaderProgram) return false;
        this.shaderProgramStack.push($fdb3e373096c6ca3$export$2e2bcd8739ae039.shaderProgram);
        this.setShaderProgram(program);
        return true;
    }
    this.shaderProgramStack.push($fdb3e373096c6ca3$export$2e2bcd8739ae039.shaderProgram);
};
/*
**	Pops the shader program from the stack.
*/ $f7388fefeedc4aac$var$Canvas.prototype.popShaderProgram = function() {
    this.setShaderProgram(this.shaderProgramStack.pop());
};
/*
**	Sets the transformation matrix to identity.
**
**	>> Canvas loadIdentity();
*/ $f7388fefeedc4aac$var$Canvas.prototype.loadIdentity = function() {
    this.matr.identity();
    return this.updateTransform();
};
/*
**	Sets the transformation matrix to the specified one.
**
**	>> Canvas loadMatrix (Matrix matr);
*/ $f7388fefeedc4aac$var$Canvas.prototype.loadMatrix = function(matr) {
    this.matr.set(matr);
    return this.updateTransform();
};
/*
**	Returns the current transformation matrix, when `clone` is set to true, a cloned matrix will be returned.
**
**	>> Matrix getMatrix(bool clone=false);
*/ $f7388fefeedc4aac$var$Canvas.prototype.getMatrix = function(clone = false) {
    return clone ? this.matr.clone() : this.matr;
};
/*
**	Appends a matrix to the current transformation matrix.
**
**	>> Canvas appendMatrix (Matrix matr);
*/ $f7388fefeedc4aac$var$Canvas.prototype.appendMatrix = function(matr) {
    this.matr.append(matr);
    return this.updateTransform();
};
/*
**	Sets scaling factors for subsequent drawing operations. If the useNative is not set then scale with the current
**	transformation matrix will be performed.
**
**	>> Canvas scale (float sx, float sy, bool useNative=false);
*/ $f7388fefeedc4aac$var$Canvas.prototype.scale = function(sx, sy, useNative = false) {
    if (useNative) {
        this.context.scale(sx, sy);
        return this;
    }
    this.matr.scale(sx, sy);
    return this.updateTransform();
};
/*
**	Sets rotation factor for subsequent drawing operations. The angle is in radians. If useNative is not set
**	then rotation with the transformation matrix will be used.
**
**	>> Canvas rotate (float angle, bool useNative=false);
*/ $f7388fefeedc4aac$var$Canvas.prototype.rotate = function(angle, useNative = false) {
    if (useNative) {
        this.context.rotate(angle);
        return this;
    }
    this.matr.rotate(angle);
    return this.updateTransform();
};
/*
**	Moves starting point to an specified location. If the useNative parameter is not set then translation with
**	the transformation matrix will be done.
**
**	>> Canvas translate (float x, float y, bool useNative=false);
*/ $f7388fefeedc4aac$var$Canvas.prototype.translate = function(x, y, useNative = false) {
    if (useNative) {
        this.context.translate(x, y);
        return this;
    }
    this.matr.translate(x, y);
    return this.updateTransform();
};
/*
**	Creates a hollow ellipse path on the canvas for subsequent stroke or fill.
**
**	>> Canvas ellipse (float x, float y, float w, float h);
*/ $f7388fefeedc4aac$var$Canvas.prototype.ellipse = function(x, y, w, h) {
    var ox = w / 2 * .5522848, oy = h / 2 * .5522848;
    var xe = x + w - 1, ye = y + h - 1, xm = x + w / 2, ym = y + h / 2;
    this.beginPath().moveTo(x, ym);
    this.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    this.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
    this.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    this.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
    this.closePath();
    return this;
};
/*
**	Creates a hollow circle path on the canvas for subsequent stroke or fill. If the stroke param is set the circle
**	will be drawn with the specified stroke color.
**
**	>> Canvas circle (float x, float y, float r, string strokeColor);
**	>> Canvas circle (float x, float y, float r);
*/ $f7388fefeedc4aac$var$Canvas.prototype.circle = function(x, y, r, stroke) {
    this.beginPath();
    this.arc(x, y, r, 0, 2 * Math.PI);
    this.closePath();
    if (stroke) this.stroke(stroke);
    return this;
};
/*
**	Draws a line for subsequent stroke or fill. If the stroke param is set the line will be drawn with
**	the specified stroke color.
**
**	>> Canvas line (float x1, float y1, float x2, float y2, string strokeColor);
**	>> Canvas line (float x1, float y1, float x2, float y2);
*/ $f7388fefeedc4aac$var$Canvas.prototype.line = function(x1, y1, x2, y2, stroke) {
    this.beginPath();
    this.moveTo(x1, y1);
    this.lineTo(x2, y2);
    this.closePath();
    if (stroke) this.stroke(stroke);
    return this;
};
/*
**	Attaches internal listeners for mouse/pointer events on the canvas object, this is called automatically when
**	attaching handlers to the canvas. The actual handlers are added or removed using the addPointerHandler and
**	removePointerHandler respectively.
**
**	>> Canvas enablePointerEvents();
*/ $f7388fefeedc4aac$var$Canvas.prototype.enablePointerEvents = function() {
    if (this.pointerHandler) return this;
    this.pointerScale = {
        sx: 1,
        sy: 1
    };
    this.pointerOffset = {
        x: 0,
        y: 0
    };
    var _ = this;
    var _evt = {
        action: '',
        buttons: 0,
        lbuttons: 0,
        x: 0,
        y: 0,
        containedBy: function(x, y, w, h) {
            return this.x >= x && this.x <= x + w - 1 && this.y >= y && this.y <= y + h - 1;
        }
    };
    this.pointerHandlers = [];
    this.pointerHandler = function(code, evt) {
        var rect = this.elem.getBoundingClientRect();
        _evt.action = code;
        _evt.buttons = evt.buttons;
        _evt.x = _evt.rx = int(evt.clientX - rect.left);
        _evt.y = _evt.ry = int(evt.clientY - rect.top);
        _evt.x = (_evt.x - _.pointerOffset.x - 0.0 * _.pointerScale.sx) / _.pointerScale.sx;
        _evt.y = (_evt.y - _.pointerOffset.y - 0.0 * _.pointerScale.sy) / _.pointerScale.sy;
        _evt.dragging = false;
        if (_evt.buttons && !_evt.lbuttons) {
            _evt.sx = _evt.x;
            _evt.sy = _evt.y;
            _evt.ldx = _evt.ldy = 0;
        }
        if (_evt.buttons && _evt.lbuttons) {
            _evt.dragging = true;
            _evt.dx = _evt.x - _evt.sx;
            _evt.dy = _evt.y - _evt.sy;
            _evt.ddx = _evt.dx - _evt.ldx;
            _evt.ddy = _evt.dy - _evt.ldy;
            _evt.ldx = _evt.dx;
            _evt.ldy = _evt.dy;
        }
        _evt.lbuttons = _evt.buttons;
        for(var i = 0; i < this.pointerHandlers.length; i++){
            if (this.pointerHandlers[i][1](_evt, this.pointerHandlers[i][2]) === false) break;
        }
    };
    this.elem.onmousedown = function(evt) {
        _.pointerHandler('DOWN', evt);
    };
    this.elem.onmouseup = function(evt) {
        _.pointerHandler('UP', evt);
    };
    this.elem.onmousemove = function(evt) {
        _.pointerHandler('MOVE', evt);
    };
    return this;
};
/*
**	Sets the pointer scaling factors.
**
**	>> Canvas setPointerScale (float sx, float sy);
*/ $f7388fefeedc4aac$var$Canvas.prototype.setPointerScale = function(sx, sy) {
    this.pointerScale = {
        sx: sx,
        sy: sy
    };
    return this;
};
/*
**	Sets the pointer offset that is applied after scaling.
**
**	>> Canvas setPointerOffset (float x, float y);
*/ $f7388fefeedc4aac$var$Canvas.prototype.setPointerOffset = function(x, y) {
    this.pointerOffset = {
        x: x,
        y: y
    };
    return this;
};
/*
**	Adds a pointer event handler, returns the handler reference id for later removal.
**
**	>> string addPointerHandler (function callback, object context);
**	>> string addPointerHandler (function callback);
*/ $f7388fefeedc4aac$var$Canvas.prototype.addPointerHandler = function(callback, context) {
    this.enablePointerEvents();
    this.pointerHandlers.push([
        this.pointerHandlers.length + "_" + int(Math.random() * 1e6),
        callback,
        context
    ]);
    return this.pointerHandlers[this.pointerHandlers.length - 1][0];
};
/*
**	Removes a previously attached pointer event handler.
**
**	>> void removePointerHandler (string id);
*/ $f7388fefeedc4aac$var$Canvas.prototype.removePointerHandler = function(id) {
    if (!this.pointerHandlers) return;
    for(var i = 0; i < this.pointerHandlers.length; i++)if (this.pointerHandlers[i][0] == id) {
        this.pointerHandlers.splice(i, 1);
        break;
    }
};
/**
 * 	Executes the `draw` function on a new canvas of the specified width and height. Renders it into an image and runs the completed callback with the ready HTMLImageElement object.
 * 	!static renderImage (width: number, height: number, draw: (g: Canvas) => void, completed: (img: HTMLImageElement, url: string) => void) : void;
 */ $f7388fefeedc4aac$var$Canvas.renderImage = function(width, height, draw, completed) {
    let g = new $f7388fefeedc4aac$var$Canvas({
        hidden: true,
        width: width,
        height: height,
        antialias: $c5f44d8482fd28c9$export$2e2bcd8739ae039.options.antialias
    });
    draw(g);
    let url = g.toDataUrl();
    let img = new Image();
    img.onload = ()=>{
        img.filter = $c5f44d8482fd28c9$export$2e2bcd8739ae039.options.antialias ? 'LINEAR' : 'NEAREST';
        img.rscale = 1.0;
        img.targetWidth = width;
        img.targetHeight = height;
        $c5f44d8482fd28c9$export$2e2bcd8739ae039.renderer.prepareImage(img);
        completed(img, url);
    };
    img.src = url;
    g.dispose();
};
/**
 * Executes the `draw` function on a new canvas of the specified width and height. Renders it into an image and runs the completed callback with the ready HTMLImageElement object,
 * note that this function will generate mipmap images.
 * !static renderImageMipmap (levels: number, width: number, height: number, draw: (g: Canvas) => void, completed: (img: HTMLImageElement, url: string) => void) : void;
 */ $f7388fefeedc4aac$var$Canvas.renderImageMipmap = function(levels, width, height, draw, completed) {
    let g = new $f7388fefeedc4aac$var$Canvas({
        hidden: true,
        width: width,
        height: height,
        antialias: $c5f44d8482fd28c9$export$2e2bcd8739ae039.options.antialias
    });
    draw(g);
    let url = g.toDataUrl();
    let img = new Image();
    img.onload = ()=>{
        img.filter = $c5f44d8482fd28c9$export$2e2bcd8739ae039.options.antialias ? 'LINEAR' : 'NEAREST';
        img.rscale = 1.0;
        img.targetWidth = width;
        img.targetHeight = height;
        img.mipmap = true;
        img.levels = levels;
        $c5f44d8482fd28c9$export$2e2bcd8739ae039.renderer.prepareImage(img);
        completed(img, url);
    };
    img.src = url;
    g.dispose();
};
var $f7388fefeedc4aac$export$2e2bcd8739ae039 = $f7388fefeedc4aac$var$Canvas;





//![import "./keycode"]
//![import "../utils/list"]
//![import "../utils/linkable"]
//![import "./timer"]
//![import "./canvas"]
//![import "./globals"]
//!namespace System
//:type DisplayOrientation = 'default'|'landscape'|'portrait'|'automatic'|'strict';
//!type Options =
/**
		 *	Background of the system canvas. Should be a full 7-digit HEX RGB color.
		 *	@default "#000000"
		 *	!background?: string;
		 */ /**
		 * 	Set to `false` to disable WebGL mode.
		 * 	@default true
		 * 	!gl?: boolean;
		 */ /**
		 *	Set to `true` t o enable on-screen logging.
		 *	@default false
		 *	!log?: boolean,
		 */ /**
		 *	When `true` the renderer will not clear the buffer on each frame draw, thus allowing overdrawing on the previous frame.
		 *	@default false
		 *	!overdraw?: boolean,
		 */ /**
		 *	Enables or disables antialised canvas. Set to `false` when pixel-perfect is desired.
		 *	@default false
		 *	!antialias?: boolean;
		 */ /**
		 *	Desired orientaton of the display.
		 *	@default "automatic"
		 *	!orientation?: System.DisplayOrientation;
		 */ /**
		 *	Desired display width. When not specified (null) the maximum screen width to maintain the aspect ratio will be used.
		 *	@default null
		 *	!screenWidth?: number;
		 */ /**
		 *	Desired display height. When not specified (null) the maximum screen height to maintain the aspect ratio will be used.
		 *	@default null
		 *	!screenHeight?: number;
		 */ /**
		 *	Target frames per second (FPS). Used to determine delay between frames.
		 *	@default 144
		 *	!fps?: number;
		 */ /**
		 *	Minimum allowed frames per second (FPS). If system FPS drops below this value, the `frameDelta` property of System will be truncated to 1/minFps.
		 *	@default 10
		 *	!minFps?: number;
		 */ /**
		 *	Selects which rendering mechanism to use either requestAnimationFrame when `true` or setTimeout when `false`.
		 *	@default true
		 *	!vsync?: boolean;
		 */ /**
		 *	Extra scale factor used to resize images. Use only when you want to render higher resolution images possibly for a very high DPI display.
		 *	@default 1
		 *	!extraScaleFactor?: number;
		 */ /**
		 *	Maximum scale factor that should be used in the system. A value of `null` will cause no limit.
		 *	@default null
		 *	!maxScaleFactor?: number;
		 */ /**
		 *	Indicates which method to use to find the target resolution, using `fullscreen` object when `true`, or the `window` object when `false`.
		 *	@default false
		 *	!fullscreen?: boolean;
		 */ /**
		 * 	Indicates if recycler pool preallocation should be automatically executed. Additionally if this value is a number, it will be used as
		 * 	maximum preallocation parameter for the recycler.
		 * 	@default false
		 * 	!preallocate?: boolean|number;
		 */ //!/type
//!/namespace
//!class System
const $c5f44d8482fd28c9$var$System = {
    /**
	 * 	Renderer status flags.
	 */ flags: {
        renderingEnabled: false,
        renderingPaused: false
    },
    /**
	 * 	Default options of the rendering system.
	 */ defaultOptions: {
        background: "#000000",
        gl: true,
        log: false,
        overdraw: false,
        antialias: true,
        orientation: 0,
        fps: 144,
        minFps: 15,
        vsync: true,
        screenWidth: null,
        screenHeight: null,
        extraScaleFactor: 1,
        maxScaleFactor: null,
        fullscreen: false
    },
    /**
	 * 	Screen width, available only after the system has been initialized.
	 * 	!static readonly screenWidth: number;
	 */ screenWidth: 0,
    /**
	 * 	Screen height, available only after the system has been initialized.
	 * 	!static readonly screenHeight: number;
	 */ screenHeight: 0,
    /**
	 * 	Current display orientation.
	 * 	!static readonly orientation: System.DisplayOrientation;
	 */ orientation: 0,
    /**
	 * 	Coordinates of the screen's offset (for letter-box effect when the screen does not fit tightly).
	 */ offsX: 0,
    offsY: 0,
    /**
	 * 	Device pixel ratio, canvas backing store ratio and resulting canvas ratio (devicePixelRatio / backingStoreRatio).
	 */ devicePixelRatio: 1,
    backingStoreRatio: 1,
    canvasPixelRatio: 1,
    canvasScaleFactor: 1,
    scaleFactor: 1,
    /**
	 * 	Initial transformation matrix. Should be used (if needed) instead of `loadIdentity` since the System does some transformations first.
	 * 	!static readonly initialMatrix: Matrix;
	 */ initialMatrix: null,
    /**
	 * 	Primary renderer.
	 * 	!static readonly renderer: Canvas;
	 */ renderer: null,
    /**
	 * 	Secondary display buffer (always 2D). Has the same initial transformation matrix as the primary display buffer.
	 * 	!static readonly displayBuffer2: Canvas;
	 */ displayBuffer2: null,
    /**
	 * 	Terciary display buffer (always 2D). Is assured to have 1:1 with the screen size, initial transformation matrix not applied.
	 * 	!static readonly displayBuffer3: Canvas;
	 */ displayBuffer3: null,
    /**
	 * 	Temporal display buffer (640x480). Used to preload images.
	 */ tempDisplayBuffer: null,
    /**
	 * 	Map with the status of all keys (along with other flags).
	 */ keyState: {
        time: 0,
        shift: false,
        ctrl: false,
        alt: false,
        keyCode: 0
    },
    /**
	 * 	Current status of all pointers. The related object is known as the Pointer State, and has the following fields: id, isActive, isDragging, sx, sy, x, y, dx, dy, button, wheelDelta and wheelAccum.
	 */ pointerState: {},
    /**
	 * 	The update method of all objects will be executed when the system update() method is called.
	 */ updateQueue: null,
    /**
	 * 	The draw method of all objects will be executed when the system draw() method is called.
	 */ drawQueue: null,
    /*List*/ /**
	 * 	The frame delta is multiplied by this value before each system cycle (defaults to 1).
	 * 	!static timeScale: number;
	 */ timeScale: 1,
    /**
	 * 	Frame interval in milliseconds.
	 * 	!static readonly frameInterval: number;
	 */ frameInterval: 0,
    /**
	 * 	Fixed frame interval in milliseconds, when set to non-zero value the frame delta will always be set to this value.
	 * 	!static fixedFrameInterval: number;
	 */ fixedFrameInterval: 0,
    /**
	 * 	Maximum frame interval in milliseconds, if the `frameDelta` exceeds this, it will be truncated to this value. Controlled by the `minFps` value
	 * 	of the system initialization options.
	 * 	!static readonly maxFrameInterval: number;
	 */ maxFrameInterval: 0,
    /**
	 * 	Last frame delta in seconds.
	 * 	!static readonly frameDelta: number;
	 */ frameDelta: 0,
    /**
	 * 	Logical system time in seconds. Updated on each cycle by the calculated `frameDelta`.
	 * 	!static readonly frameTime: number;
	 */ frameTime: 0,
    /**
	 * 	Current frame number.
	 * 	!static readonly frameNumber: number;
	 */ frameNumber: 0,
    /**
	 * 	Rendering performance data.
	 */ perf: {
        /**
		 * 	Current time range.
		 */ startTime: 0,
        lastTime: 0,
        /**
		 * 	Number of frames drawn in the current time range.
		 */ numFrames: 0,
        /**
		 * 	Number of update and draw samples averaged in total.
		 */ numSamples: 0,
        /**
		 * 	Total time spent in update, draw and extra respectively in the current time range.
		 */ updateTimeTotal: 0,
        drawTimeTotal: 0,
        extraTimeTotal: 0,
        /**
		 * 	Calculated values for the last time range. The updateTime and drawTime are in microseconds.
		 */ fps: 0,
        averageFps: 0,
        averageUpdateTime: 0,
        averageDrawTime: 0,
        averageExtraTime: 0
    },
    /**
	 * 	Initializes the system with the specified configuration options.
	 * 	!static init (options: System.Options) : void;
	 */ init: function(options = null) {
        let self = this;
        let o = {
            ...this.defaultOptions,
            ...options
        };
        this.options = o;
        // Execute recycler pool data preallocation.
        if (this.options.preallocate !== false) {
            if (this.options.preallocate === true) $1fea8365818f3b22$export$2e2bcd8739ae039.preallocate();
            else $1fea8365818f3b22$export$2e2bcd8739ae039.preallocate(this.options.preallocate);
        }
        // Set default orientation if both target sizes were specified.
        if (o.screenWidth && o.screenHeight && o.orientation == 'default') o.orientation = o.screenWidth > o.screenHeight ? 'landscape' : 'portrait';
        this.orientation = o.orientation;
        this.updateQueue = $f6bd4ab8b6c953de$export$2e2bcd8739ae039.Pool.alloc();
        this.drawQueue = $f6bd4ab8b6c953de$export$2e2bcd8739ae039.Pool.alloc();
        // Attach frame event handlers.
        this.frameInterval = 1000 / o.fps;
        this.maxFrameInterval = 1000 / o.minFps;
        $parcel$global.onresize = function() {
            self.onWindowResized();
        };
        this.frameTimer = new $f1d765b3e2b341ba$export$2e2bcd8739ae039(o.vsync, this.frameInterval, (delta)=>this.onFrame(delta)
        );
        // Setup canvas buffer.
        this.renderer = new $f7388fefeedc4aac$export$2e2bcd8739ae039({
            gl: o.gl,
            elem: null,
            absolute: true,
            hidden: false,
            antialias: o.antialias,
            background: o.background
        });
        this.displayBuffer2 = new $f7388fefeedc4aac$export$2e2bcd8739ae039({
            gl: false,
            elem: null,
            absolute: true,
            hidden: false,
            antialias: o.antialias,
            background: 'none'
        });
        this.displayBuffer2.elem.style.pointerEvents = 'none';
        this.displayBuffer3 = new $f7388fefeedc4aac$export$2e2bcd8739ae039({
            gl: false,
            elem: null,
            absolute: true,
            hidden: false,
            antialias: o.antialias,
            background: 'none'
        });
        this.displayBuffer3.elem.style.pointerEvents = 'none';
        this.tempDisplayBuffer = new $f7388fefeedc4aac$export$2e2bcd8739ae039({
            hidden: true,
            antialias: o.antialias
        }).resize(640, 480);
        let display0 = this.renderer.elem;
        // Obtain device display ratios.
        this.devicePixelRatio = $parcel$global.devicePixelRatio || 1;
        this.backingStoreRatio = o.gl === true ? 1 : this.renderer.context.webkitBackingStorePixelRatio || this.renderer.context.mozBackingStorePixelRatio || this.renderer.context.msBackingStorePixelRatio || this.renderer.context.oBackingStorePixelRatio || this.renderer.context.backingStorePixelRatio || 1;
        this.canvasPixelRatio = this.devicePixelRatio / this.backingStoreRatio;
        $c5f44d8482fd28c9$var$System.onWindowResized(true);
        // Attach keyboard event handlers.
        $parcel$global.onkeydown = function(evt) {
            if (evt.target !== $parcel$global.document.body) return;
            if (self.keyState[evt.keyCode]) return false;
            self.keyState[evt.keyCode] = true;
            self.keyState.keyCode = evt.keyCode;
            self.keyState.startTime = hrnow();
            switch(evt.keyCode){
                case 16:
                    self.keyState.shift = true;
                    break;
                case 17:
                    self.keyState.ctrl = true;
                    break;
                case 18:
                    self.keyState.alt = true;
                    break;
            }
            // CTRL+TAB should always be handled by the browser.
            if (self.keyState.ctrl && evt.keyCode == $315d91d8694d77f0$export$2e2bcd8739ae039.TAB) {
                self.keyState[evt.keyCode] = false;
                return true;
            }
            if (self.onKeyboardEvent(self.KeyboardEventType.KEY_DOWN, evt.keyCode, self.keyState) === false) return false;
        };
        $parcel$global.onkeyup = function(evt) {
            if (evt.target !== $parcel$global.document.body) return;
            if (!self.keyState[evt.keyCode]) return false;
            self.keyState[evt.keyCode] = false;
            self.keyState.endTime = hrnow();
            self.keyState.keyCode = evt.keyCode;
            switch(evt.keyCode){
                case 16:
                    self.keyState.shift = false;
                    break;
                case 17:
                    self.keyState.ctrl = false;
                    break;
                case 18:
                    self.keyState.alt = false;
                    break;
            }
            if (self.onKeyboardEvent(self.KeyboardEventType.KEY_UP, evt.keyCode, self.keyState) === false) return false;
        };
        // Converts pointer coordinates from physical space to screen space.
        const pointerConvX = function(x, y) {
            return $c5f44d8482fd28c9$var$System.reverseRender ? int($c5f44d8482fd28c9$var$System.screenWidth - 1 - (y - $c5f44d8482fd28c9$var$System.offsY) / $c5f44d8482fd28c9$var$System.canvasScaleFactor) : int((x - $c5f44d8482fd28c9$var$System.offsX) / $c5f44d8482fd28c9$var$System.canvasScaleFactor);
        };
        const pointerConvY = function(x, y) {
            return $c5f44d8482fd28c9$var$System.reverseRender ? int((x - $c5f44d8482fd28c9$var$System.offsX) / $c5f44d8482fd28c9$var$System.canvasScaleFactor) : int((y - $c5f44d8482fd28c9$var$System.offsY) / $c5f44d8482fd28c9$var$System.canvasScaleFactor);
        };
        // Attach pointer event handlers if pointer-events are available.
        if ("ontouchstart" in $parcel$global) {
            display0.ontouchstart = function(evt) {
                evt.preventDefault();
                let touches = evt.changedTouches;
                for(let i = 0; i < touches.length; i++){
                    if (!$c5f44d8482fd28c9$var$System.pointerState[touches[i].identifier]) $c5f44d8482fd28c9$var$System.pointerState[touches[i].identifier] = {
                        id: touches[i].identifier,
                        isActive: false,
                        isDragging: false,
                        sx: 0,
                        sy: 0,
                        x: 0,
                        y: 0,
                        dx: 0,
                        dy: 0,
                        button: 0,
                        wheelDelta: 0,
                        wheelAccum: 0
                    };
                    let p = $c5f44d8482fd28c9$var$System.pointerState[touches[i].identifier];
                    p.isActive = true;
                    p.isDragging = false;
                    p.button = 1;
                    p.startTime = hrnow();
                    p.x = p.sx = pointerConvX(touches[i].clientX, touches[i].clientY);
                    p.y = p.sy = pointerConvY(touches[i].clientX, touches[i].clientY);
                    $c5f44d8482fd28c9$var$System.onPointerEvent($c5f44d8482fd28c9$var$System.PointerEventType.POINTER_DOWN, p, $c5f44d8482fd28c9$var$System.pointerState);
                }
                return false;
            };
            display0.ontouchend = function(evt) {
                evt.preventDefault();
                let touches = evt.changedTouches;
                for(let i = 0; i < touches.length; i++){
                    if (!$c5f44d8482fd28c9$var$System.pointerState[touches[i].identifier]) continue;
                    let p = $c5f44d8482fd28c9$var$System.pointerState[touches[i].identifier];
                    p.endTime = hrnow();
                    p.deltaTime = p.endTime - p.startTime;
                    p.x = pointerConvX(touches[i].clientX, touches[i].clientY);
                    p.y = pointerConvY(touches[i].clientX, touches[i].clientY);
                    if (p.isDragging) $c5f44d8482fd28c9$var$System.onPointerEvent($c5f44d8482fd28c9$var$System.PointerEventType.POINTER_DRAG_STOP, p, $c5f44d8482fd28c9$var$System.pointerState);
                    $c5f44d8482fd28c9$var$System.onPointerEvent($c5f44d8482fd28c9$var$System.PointerEventType.POINTER_UP, p, $c5f44d8482fd28c9$var$System.pointerState);
                    p.isActive = false;
                    p.isDragging = false;
                    p.button = 0;
                }
                return false;
            };
            display0.ontouchcancel = function(evt) {
                evt.preventDefault();
                let touches = evt.changedTouches;
                for(let i = 0; i < touches.length; i++){
                    if (!$c5f44d8482fd28c9$var$System.pointerState[touches[i].identifier]) continue;
                    let p = $c5f44d8482fd28c9$var$System.pointerState[touches[i].identifier];
                    p.x = pointerConvX(touches[i].clientX, touches[i].clientY);
                    p.y = pointerConvY(touches[i].clientX, touches[i].clientY);
                    $c5f44d8482fd28c9$var$System.onPointerEvent(p.isDragging ? $c5f44d8482fd28c9$var$System.PointerEventType.POINTER_DRAG_STOP : $c5f44d8482fd28c9$var$System.PointerEventType.POINTER_UP, p, $c5f44d8482fd28c9$var$System.pointerState);
                    p.isActive = false;
                    p.isDragging = false;
                    p.button = 0;
                }
                return false;
            };
            display0.ontouchmove = function(evt) {
                evt.preventDefault();
                let touches = evt.changedTouches;
                for(let i = 0; i < touches.length; i++){
                    if (!$c5f44d8482fd28c9$var$System.pointerState[touches[i].identifier]) continue;
                    let p = $c5f44d8482fd28c9$var$System.pointerState[touches[i].identifier];
                    if (p.isActive && !p.isDragging) {
                        $c5f44d8482fd28c9$var$System.onPointerEvent($c5f44d8482fd28c9$var$System.PointerEventType.POINTER_DRAG_START, p, $c5f44d8482fd28c9$var$System.pointerState);
                        p.isDragging = true;
                    }
                    p.x = pointerConvX(touches[i].clientX, touches[i].clientY);
                    p.y = pointerConvY(touches[i].clientX, touches[i].clientY);
                    p.dx = p.x - p.sx;
                    p.dy = p.y - p.sy;
                    $c5f44d8482fd28c9$var$System.onPointerEvent(p.isDragging ? $c5f44d8482fd28c9$var$System.PointerEventType.POINTER_DRAG_MOVE : $c5f44d8482fd28c9$var$System.PointerEventType.POINTER_MOVE, p, $c5f44d8482fd28c9$var$System.pointerState);
                }
                return false;
            };
        } else {
            display0.oncontextmenu = function(evt) {
                evt.preventDefault();
                return false;
            };
            display0.onwheel = function(evt) {
                evt.preventDefault();
                if (!$c5f44d8482fd28c9$var$System.pointerState[0]) $c5f44d8482fd28c9$var$System.pointerState[0] = {
                    id: 0,
                    isActive: false,
                    isDragging: false,
                    sx: 0,
                    sy: 0,
                    x: 0,
                    y: 0,
                    dx: 0,
                    dy: 0,
                    button: 0,
                    wheelDelta: 0,
                    wheelAccum: 0
                };
                let p = $c5f44d8482fd28c9$var$System.pointerState[0];
                p.x = pointerConvX(evt.clientX, evt.clientY);
                p.y = pointerConvY(evt.clientX, evt.clientY);
                p.wheelDelta = evt.deltaY;
                p.wheelAccum += evt.deltaY;
                $c5f44d8482fd28c9$var$System.onPointerEvent($c5f44d8482fd28c9$var$System.PointerEventType.POINTER_WHEEL, p, $c5f44d8482fd28c9$var$System.pointerState);
                return false;
            };
            display0.onmousedown = function(evt) {
                evt.preventDefault();
                if (!$c5f44d8482fd28c9$var$System.pointerState[0]) $c5f44d8482fd28c9$var$System.pointerState[0] = {
                    id: 0,
                    isActive: false,
                    isDragging: false,
                    sx: 0,
                    sy: 0,
                    x: 0,
                    y: 0,
                    dx: 0,
                    dy: 0,
                    button: 0,
                    wheelDelta: 0,
                    wheelAccum: 0
                };
                let p = $c5f44d8482fd28c9$var$System.pointerState[0];
                p.isActive = true;
                p.isDragging = false;
                p.button = evt.which;
                p.x = p.sx = pointerConvX(evt.clientX, evt.clientY);
                p.y = p.sy = pointerConvY(evt.clientX, evt.clientY);
                $c5f44d8482fd28c9$var$System.onPointerEvent($c5f44d8482fd28c9$var$System.PointerEventType.POINTER_DOWN, p, $c5f44d8482fd28c9$var$System.pointerState);
                return false;
            };
            display0.onmouseup = function(evt) {
                evt.preventDefault();
                if (!$c5f44d8482fd28c9$var$System.pointerState[0]) return false;
                let p = $c5f44d8482fd28c9$var$System.pointerState[0];
                p.x = pointerConvX(evt.clientX, evt.clientY);
                p.y = pointerConvY(evt.clientX, evt.clientY);
                if (p.isDragging) $c5f44d8482fd28c9$var$System.onPointerEvent($c5f44d8482fd28c9$var$System.PointerEventType.POINTER_DRAG_STOP, p, $c5f44d8482fd28c9$var$System.pointerState);
                $c5f44d8482fd28c9$var$System.onPointerEvent($c5f44d8482fd28c9$var$System.PointerEventType.POINTER_UP, p, $c5f44d8482fd28c9$var$System.pointerState);
                p.isActive = false;
                p.isDragging = false;
                p.button = 0;
            };
            display0.onmousemove = function(evt) {
                evt.preventDefault();
                if (!$c5f44d8482fd28c9$var$System.pointerState[0]) return false;
                let p = $c5f44d8482fd28c9$var$System.pointerState[0];
                if (p.isActive && !p.isDragging) {
                    $c5f44d8482fd28c9$var$System.onPointerEvent($c5f44d8482fd28c9$var$System.PointerEventType.POINTER_DRAG_START, p, $c5f44d8482fd28c9$var$System.pointerState);
                    p.isDragging = true;
                }
                p.x = pointerConvX(evt.clientX, evt.clientY);
                p.y = pointerConvY(evt.clientX, evt.clientY);
                p.dx = p.x - p.sx;
                p.dy = p.y - p.sy;
                $c5f44d8482fd28c9$var$System.onPointerEvent(p.isDragging ? $c5f44d8482fd28c9$var$System.PointerEventType.POINTER_DRAG_MOVE : $c5f44d8482fd28c9$var$System.PointerEventType.POINTER_MOVE, p, $c5f44d8482fd28c9$var$System.pointerState);
                return false;
            };
        }
        // Enable log if flag is set.
        if (o.log === true) $d0de706be9d545de$export$2e2bcd8739ae039.enable();
    },
    /**
	 * 	Returns the current logical time in seconds (same as reading `System.frameTime`).
	 * 	!static time() : number;
	 */ time: function() {
        return this.frameTime;
    },
    /**
	 * 	Starts the system and enables rendering and updates.
	 * 	!static start() : void;
	 */ start: function() {
        this.onWindowResized();
        this.flags.renderingPaused = false;
        this.frameTimer.start();
    },
    /**
	 * 	Stops the system by disabling both rendering and updates.
	 * 	!static stop() : void;
	 */ stop: function() {
        this.flags.renderingPaused = true;
        this.frameTimer.stop();
    },
    /**
	 * 	Pauses the system by disabling updates, but rendering will be continued.
	 * 	!static pause() : void;
	 */ pause: function() {
        this.flags.renderingPaused = true;
    },
    /**
	 * 	Resumes the system after previously being paused with `pause` method.
	 * 	!static resume() : void;
	 */ resume: function() {
        this.flags.renderingPaused = false;
        this.resetPerf();
    },
    /**
	 * 	Executed when a frame needs to be rendered to the display buffer.
	 * 	static onFrame (delta: number) : void;
	 */ onFrame: function(delta) {
        let now = hrnow();
        let tmp;
        if (delta > this.maxFrameInterval) delta = this.maxFrameInterval;
        if (this.fixedFrameInterval !== 0) delta = this.fixedFrameInterval;
        if (!this.flags.renderingEnabled || this.flags.renderingPaused) {
            this.draw();
            return;
        }
        delta *= this.timeScale;
        this.frameDelta = delta / 1000.0;
        this.frameTime += this.frameDelta;
        $fdb3e373096c6ca3$export$2e2bcd8739ae039.time = this.frameTime;
        this.frameNumber++;
        /* ~ */ tmp = hrnow();
        this.update(this.frameDelta);
        this.perf.updateTimeTotal += hrnow() - tmp;
        /* ~ */ tmp = hrnow();
        this.draw();
        this.perf.drawTimeTotal += hrnow() - tmp;
        /* ~ */ this.perf.lastTime = now;
        this.perf.numFrames++;
        delta = this.perf.lastTime - this.perf.startTime;
        if (delta > 1000) {
            this.perf.fps = int(this.perf.numFrames * 1000 / delta);
            //this.perf.extraTimeTotal = delta - this.perf.updateTimeTotal - this.perf.drawTimeTotal;
            this.perf.averageFps = int((this.perf.averageFps * this.perf.numSamples + this.perf.fps) / (this.perf.numSamples + 1));
            this.perf.averageUpdateTime = int((this.perf.averageUpdateTime * this.perf.numSamples + this.perf.updateTimeTotal * 1000 / this.perf.numFrames) / (this.perf.numSamples + 1));
            this.perf.averageDrawTime = int((this.perf.averageDrawTime * this.perf.numSamples + this.perf.drawTimeTotal * 1000 / this.perf.numFrames) / (this.perf.numSamples + 1));
            this.perf.averageExtraTime = int((this.perf.averageExtraTime * this.perf.numSamples + this.perf.extraTimeTotal * 1000 / this.perf.numFrames) / (this.perf.numSamples + 1));
            this.perf.numSamples++;
            this.perf.startTime = now;
            this.perf.lastTime = now;
            this.perf.numFrames = 0;
            this.perf.updateTimeTotal = 0;
            this.perf.drawTimeTotal = 0;
            this.perf.extraTimeTotal = 0;
        }
    },
    /**
	 * 	Executed when the size of the window has changed.
	 * 	static onWindowResized (notRendering: boolean = false) : void;
	 */ onWindowResized: function(notRendering = false) {
        // Determine size of the screen.
        if ('document' in $parcel$global) {
            if (this.options.fullscreen) {
                this._screenWidth = int($parcel$global.screen.width);
                this._screenHeight = int($parcel$global.screen.height);
            } else {
                this._screenWidth = $parcel$global.innerWidth;
                this._screenHeight = $parcel$global.innerHeight;
            }
        } else {
            this._screenWidth = this.options.screenWidth;
            this._screenHeight = this.options.screenHeight;
            if (this.options.screenWidth == null && this.options.screenHeight == null) throw new Error('At least one screen dimension must be specified in headless mode.');
        }
        // Flip dimensions to ensure the desired orientation.
        if (this._screenWidth < this._screenHeight && this.orientation == 'landscape' || this._screenWidth > this._screenHeight && this.orientation == 'portrait') {
            this.screenWidth = this._screenHeight;
            this.screenHeight = this._screenWidth;
            this.reverseRender = true;
        } else {
            this.screenWidth = this._screenWidth;
            this.screenHeight = this._screenHeight;
            this.reverseRender = false;
        }
        // Get target screen dimensions.
        let targetScreenWidth = this.options.screenWidth;
        let targetScreenHeight = this.options.screenHeight;
        if (targetScreenWidth === null || targetScreenHeight === null) {
            if (targetScreenWidth === null && targetScreenHeight === null) {
                targetScreenWidth = this.screenWidth;
                targetScreenHeight = this.screenHeight;
            } else if (targetScreenWidth === null) targetScreenWidth = int(0.5 + this.screenWidth * (this.options.screenHeight / this.screenHeight));
            else if (targetScreenHeight === null) targetScreenHeight = int(0.5 + this.screenHeight * (this.options.screenWidth / this.screenWidth));
        }
        // ***
        let screenWidth = targetScreenWidth;
        let screenHeight = targetScreenHeight;
        if (this.orientation === 'automatic' && screenWidth && screenHeight) {
            if (screenWidth > screenHeight && this.screenWidth < this.screenHeight || screenWidth < screenHeight && this.screenWidth > this.screenHeight) {
                screenWidth = screenHeight;
                screenHeight = targetScreenWidth;
            }
        }
        // ***
        this.canvasScaleFactor = 1;
        if (screenWidth && screenHeight) this.canvasScaleFactor = Math.min(this.screenWidth / screenWidth, this.screenHeight / screenHeight);
        else if (screenWidth) this.canvasScaleFactor = this.screenWidth / screenWidth;
        else if (screenHeight) this.canvasScaleFactor = this.screenHeight / screenHeight;
        // ***
        let _screenWidth = this.screenWidth;
        let _screenHeight = this.screenHeight;
        if (screenWidth) this.screenWidth = screenWidth;
        if (screenHeight) this.screenHeight = screenHeight;
        this.offsX = int((_screenWidth - this.screenWidth * this.canvasScaleFactor) * 0.5);
        this.offsY = int((_screenHeight - this.screenHeight * this.canvasScaleFactor) * 0.5);
        if (this.reverseRender) {
            let tmp = this.offsX;
            this.offsX = this.offsY;
            this.offsY = tmp;
        }
        this.scaleFactor = this.canvasScaleFactor * this.canvasPixelRatio;
        this.scaleFactor = int(0.7 + this.scaleFactor);
        if (this.options.maxScaleFactor > 0 && this.scaleFactor > this.options.maxScaleFactor) this.scaleFactor = this.options.maxScaleFactor;
        this.flags.renderingEnabled = false;
        /*
		**	If the scale is not exact, the final canvas size might not fit the entire screen perfectly (will always be a little smaller in
		**	such a case), when that happens the body's background color will be quite noticeable, to mitigate that we set the body background
		**	to the same color as the primary canvas.
		*/ if ('document' in $parcel$global) $parcel$global.document.body.style.backgroundColor = this.renderer.backgroundColor;
        /*
		**	Resize all display buffers.
		*/ if (!this.reverseRender) {
            this.renderer.resize(this.screenWidth * this.scaleFactor, this.screenHeight * this.scaleFactor);
            this.renderer.elem.style.width = int(this.screenWidth * this.canvasScaleFactor + 0.5) + "px";
            this.renderer.elem.style.height = int(this.screenHeight * this.canvasScaleFactor + 0.5) + "px";
            this.displayBuffer2.resize(this.screenWidth * this.scaleFactor, this.screenHeight * this.scaleFactor);
            this.displayBuffer2.elem.style.width = int(this.screenWidth * this.canvasScaleFactor + 0.5) + "px";
            this.displayBuffer2.elem.style.height = int(this.screenHeight * this.canvasScaleFactor + 0.5) + "px";
            this.displayBuffer3.resize(_screenWidth, _screenHeight);
            this.displayBuffer3.elem.style.width = _screenWidth + "px";
            this.displayBuffer3.elem.style.height = _screenHeight + "px";
        } else {
            this.renderer.resize(this.screenHeight * this.scaleFactor, this.screenWidth * this.scaleFactor);
            this.renderer.elem.style.width = int(this.screenHeight * this.canvasScaleFactor + 0.5) + "px";
            this.renderer.elem.style.height = int(this.screenWidth * this.canvasScaleFactor + 0.5) + "px";
            this.displayBuffer2.resize(this.screenHeight * this.scaleFactor, this.screenWidth * this.scaleFactor);
            this.displayBuffer2.elem.style.width = int(this.screenHeight * this.canvasScaleFactor + 0.5) + "px";
            this.displayBuffer2.elem.style.height = int(this.screenWidth * this.canvasScaleFactor + 0.5) + "px";
            this.displayBuffer3.resize(_screenHeight, _screenWidth);
            this.displayBuffer3.elem.style.width = _screenHeight + "px";
            this.displayBuffer3.elem.style.height = _screenWidth + "px";
        }
        this.renderer.elem.style.marginLeft = this.offsX + "px";
        this.renderer.elem.style.marginTop = this.offsY + "px";
        this.displayBuffer2.elem.style.marginLeft = this.offsX + "px";
        this.displayBuffer2.elem.style.marginTop = this.offsY + "px";
        this.renderer.loadIdentity();
        this.displayBuffer2.loadIdentity();
        this.displayBuffer3.loadIdentity();
        if (this.scaleFactor != 1) {
            this.renderer.globalScale(this.scaleFactor);
            this.displayBuffer2.globalScale(this.scaleFactor);
        }
        if (this.reverseRender) {
            this.renderer.rotate(Math.PI / 2);
            this.renderer.translate(-this.screenWidth, 0);
            this.renderer.flipped(true);
            this.displayBuffer2.rotate(Math.PI / 2);
            this.displayBuffer2.translate(-this.screenWidth, 0);
            this.displayBuffer2.flipped(true);
            this.displayBuffer3.rotate(Math.PI / 2);
            this.displayBuffer3.translate(-_screenWidth, 0);
            this.displayBuffer3.flipped(true);
        } else {
            this.renderer.flipped(false);
            this.displayBuffer2.flipped(false);
            this.displayBuffer3.flipped(false);
        }
        /* *** */ this.scaleFactor *= this.options.extraScaleFactor;
        if (this.options.maxScaleFactor > 0 && this.scaleFactor > this.options.maxScaleFactor) this.scaleFactor = this.options.maxScaleFactor;
        this.integerScaleFactor = int(this.scaleFactor + 0.5); //0.9
        this.resetPerf();
        if (this.initialMatrix) this.initialMatrix.free();
        this.initialMatrix = this.renderer.getMatrix(true);
        if (notRendering != true) {
            this.flags.renderingEnabled = true;
            this.onCanvasResized(this.screenWidth, this.screenHeight);
        }
    },
    /**
	 * 	Event triggered when the canvas was resized by the system. Can be overriden.
	 * 	!static onCanvasResized (screenWidth: number, screenHeight: number) : void;
	 */ onCanvasResized: function(screenWidth, screenHeight) {},
    /**
	 * 	Resets the performance data.
	 */ resetPerf: function() {
        this.perf.startTime = hrnow();
        this.perf.lastTime = hrnow();
        this.perf.numFrames = 0;
        this.perf.updateTimeTotal = 0;
        this.perf.drawTimeTotal = 0;
        this.perf.extraTimeTotal = 0;
        this.perf.numSamples = 0;
        this.perf.fps = 0;
        this.perf.averageFps = 0;
        this.perf.averageUpdateTime = 0;
        this.perf.averageDrawTime = 0;
        this.perf.averageExtraTime = 0;
    },
    /**
	 * 	Adds the specified update handler to the system.
	 * 	!updateQueueAdd (handler: { update: (dt: number) => void }) : Linkable;
	 */ updateQueueAdd: function(handler) {
        this.updateQueue.push(handler);
        return this.updateQueue.bottom;
    },
    /**
	 * 	Removes the specified update handler from the system.
	 * 	!updateQueueRemove (handler: { update: (dt: number) => void }) : void;
	 */ /**
	 * 	Removes the specified update handler node from the system.
	 * 	!updateQueueRemove (node: Linkable) : void;
	 */ updateQueueRemove: function(handler) {
        this.updateQueue.remove($33942535e15f5720$export$2e2bcd8739ae039.isInstance(handler) ? handler : this.updateQueue.sgetNode(handler));
    },
    /**
	 * 	Adds the specified draw handler to the system.
	 * 	!drawQueueAdd (handler: { draw: (g: Canvas) => void }) : Linkable;
	 */ drawQueueAdd: function(handler) {
        this.drawQueue.push(handler);
        return this.drawQueue.bottom;
    },
    /**
	 * 	Removes the specified draw handler from the system.
	 * 	!drawQueueRemove (handler: { draw: (g: Canvas) => void }) : void;
	 */ /**
	 * 	Removes the specified draw handler node from the system.
	 * 	!drawQueueRemove (node: Linkable) : void;
	 */ drawQueueRemove: function(handler) {
        this.drawQueue.remove($33942535e15f5720$export$2e2bcd8739ae039.isInstance(handler) ? handler : this.drawQueue.sgetNode(handler));
    },
    /**
	 * 	Adds the specified handler to the update and draw queues.
	 * 	!queueAdd (handler: { update: (dt: number) => void, draw: (g: Canvas) => void }) : void;
	 */ queueAdd: function(handler) {
        this.updateQueue.push(handler);
        this.drawQueue.push(handler);
    },
    /**
	 *	Removes the specified handler from the update and draw queues.
	 * 	!queueRemove (handler: { update: (dt: number) => void, draw: (g: Canvas) => void }) : void;
	 */ queueRemove: function(handler) {
        this.updateQueue.remove(this.updateQueue.sgetNode(handler));
        this.drawQueue.remove(this.drawQueue.sgetNode(handler));
    },
    /**
	 * 	Runs an update cycle. All objects in the `updateQueue` will have their `update method called.
	 */ update: function(dt) {
        try {
            let next;
            for(let elem = this.updateQueue.top; elem; elem = next){
                next = elem.next;
                if (elem.value.update(dt) === false) this.updateQueueRemove(elem);
            }
        } catch (e) {
            $c5f44d8482fd28c9$var$System.stop();
            throw e;
        }
    },
    /**
	 * 	Runs a rendering cycle. All objects in the `drawQueue` will have their `draw` method called.
	 */ draw: function() {
        if (this.renderer.gl !== null) this.renderer.start();
        if (!this.options.overdraw) {
            this.renderer.clear();
            this.displayBuffer2.clear();
            this.displayBuffer3.clear();
        }
        try {
            let next;
            for(let elem = this.drawQueue.top; elem; elem = next){
                next = elem.next;
                elem.value.draw(this.renderer);
            }
            if (this.renderer.gl !== null) {
                this.renderer.flush();
                this.renderer.end();
            }
        } catch (e) {
            $c5f44d8482fd28c9$var$System.stop();
            throw e;
        }
    },
    /**
	 * 	Interpolates numeric values between two objects (`src` and `dst`) using the specified `duration` and `easing` function. Note that all four parameters `src`, `dst`,
	 * 	`duration` and `easing` must be objects having the same number of values.
	 * 	!interpolate (src: object, dst: object, duration: object, easing: object, callback: (data: object, isFinished: boolean) => void) : void;
	 */ interpolate: function(src, dst, duration, easing, callback) {
        //violet: not optimized
        let time = {};
        let data = {};
        let count = 0;
        for(let x1 in src){
            time[x1] = 0.0;
            data[x1] = src[x1];
            count++;
        }
        let interpolator = {
            update: function(dt) {
                for(let x in time){
                    if (time[x] == duration[x]) continue;
                    time[x] += dt;
                    if (time[x] >= duration[x]) {
                        time[x] = duration[x];
                        count--;
                    }
                    let t = easing[x](time[x] / duration[x]);
                    data[x] = (1 - t) * src[x] + t * dst[x];
                }
                callback(data, count == 0);
                if (count == 0) return false;
            }
        };
        $c5f44d8482fd28c9$var$System.updateQueueAdd(interpolator);
        interpolator.update(0);
    },
    /**
	 * 	Event triggered when a keyboard event is detected by the system.
	 * 	onKeyboardEvent (action: KeyboardEventType, keyCode: number, keyState: object) : void;
	 */ onKeyboardEvent: function(action, keyCode, keyState) {},
    /**
	 * 	Event triggered when a pointer event is detected by the system.
	 * 	onPointerEvent (action: PointerEventType, pointer: object, pointers: object) : void;
	 */ onPointerEvent: function(action, pointer, pointers) {}
};
//!/class
//!namespace System
//!enum KeyboardEventType
$c5f44d8482fd28c9$var$System.KeyboardEventType = {
    KEY_DOWN: 0x001,
    KEY_UP: 0x002
};
//!/enum
//!enum PointerEventType
$c5f44d8482fd28c9$var$System.PointerEventType = {
    POINTER_DOWN: 0x010,
    POINTER_UP: 0x011,
    POINTER_MOVE: 0x012,
    POINTER_DRAG_START: 0x013,
    POINTER_DRAG_MOVE: 0x014,
    POINTER_DRAG_STOP: 0x015,
    POINTER_WHEEL: 0x016
};
var //!/enum
//!/namespace
$c5f44d8482fd28c9$export$2e2bcd8739ae039 = $c5f44d8482fd28c9$var$System;



//![import "./system"]
//![import "../utils/list"]
//:/**
//: * 	Logging module to show logs on the system display buffer.
//: */
//!namespace Log
const $d0de706be9d545de$var$Log = {
    /**
	 * 	Indicates if the log module is enabled.
	 *	!let enabled: boolean;
	 */ enabled: false,
    /**
	 * 	Indicates if the log module is paused.
	 * 	!let paused: boolean;
	 */ paused: false,
    /**
	 * 	Maximum number of entries to show in the screen.
	 * 	!let maxsize: number;
	 */ maxsize: 30,
    data: $f6bd4ab8b6c953de$export$2e2bcd8739ae039.Pool.alloc(),
    count: 0,
    /**
	 * 	Indicates if output showuld also be passed to `console.debug` as secondary echo.
	 * 	!let debugEcho: boolean;
	 */ debugEcho: false,
    /**
	 * 	Foreground (text) color.
	 * 	!let color: string;
	 */ color: '#fff',
    /**
	 * 	Background color.
	 * 	!let background: string;
	 */ background: '#cf266a',
    /**
	 * 	Debugging variables to show continuously at the top of the log output.
	 * 	!let vars: object;
	 */ vars: {},
    /**
	 * 	Writes a message to the log buffer, ensure logging has been enabled by calling `enable` first or any messages will be ignored.
	 * 	!function write (msg: string) : void;
	 */ write: function(msg) {
        this.data.push(msg);
        this.count++;
        while(this.data.length > this.maxsize)this.data.shift();
        if (this.debugEcho) console.debug(this.count + ": " + msg);
    },
    /**
	 * 	Clears the current log buffer.
	 * 	!function clear () : void;
	 */ clear: function() {
        this.data.reset();
        this.count = 0;
    },
    /**
	 * 	Enables on-screen logging for cool stuff.
	 *
	 * 	@param x - X-coordinate of the top-left corner.
	 * 	@param y - Y-coordinate of the top-left corner.
	 * 	@param fontSize - Desired font size in `pt` units.
	 * 	@param showFps - Set to `true` to show FPS.
	 * 	@param showIndex - Set to `true to show the message index.
	 *
	 * 	!function enable (x?: number, y?: number, fontSize?: number, showFps?: boolean, showIndex?: boolean) : void;
	 */ enable: function(x = 0, y = 0, fontSize = 9.5, showFps = true, showIndex = true) {
        if (this.enabled) return;
        this.enabled = true;
        if (!showFps) y -= 16;
        let _y = y;
        $c5f44d8482fd28c9$export$2e2bcd8739ae039.drawQueueAdd({
            draw: function() {
                if ($d0de706be9d545de$var$Log.paused) return;
                let tmp = hrnow();
                const g = $c5f44d8482fd28c9$export$2e2bcd8739ae039.displayBuffer3;
                g.font('bold ' + fontSize + 'pt Monospace');
                g.textBaseline('top');
                let s = '';
                y = _y;
                if (showFps !== false && $c5f44d8482fd28c9$export$2e2bcd8739ae039.perf.fps != 0) {
                    s = 'fps: ' + $c5f44d8482fd28c9$export$2e2bcd8739ae039.perf.fps + '/' + $c5f44d8482fd28c9$export$2e2bcd8739ae039.perf.averageFps + ', update: ' + $c5f44d8482fd28c9$export$2e2bcd8739ae039.perf.averageUpdateTime + ', draw: ' + $c5f44d8482fd28c9$export$2e2bcd8739ae039.perf.averageDrawTime + ', extra: ' + $c5f44d8482fd28c9$export$2e2bcd8739ae039.perf.averageExtraTime;
                    if ($d0de706be9d545de$var$Log.background) {
                        g.fillStyle($d0de706be9d545de$var$Log.background);
                        g.fillRect(x - 3, y - 1, g.measureText(s) + 6, fontSize + 5);
                    }
                    g.fillStyle($d0de706be9d545de$var$Log.color);
                    g.fillText(s, x, y);
                }
                s = '';
                for(let i in $d0de706be9d545de$var$Log.vars)s += i + ': ' + $d0de706be9d545de$var$Log.vars[i] + '  ';
                if (s !== '') {
                    y += 24;
                    if ($d0de706be9d545de$var$Log.background) {
                        g.fillStyle($d0de706be9d545de$var$Log.background);
                        g.fillRect(x - 3, y - 1, g.measureText(s) + 6, fontSize + 5);
                    }
                    g.fillStyle($d0de706be9d545de$var$Log.color);
                    g.fillText(s, x, y);
                }
                let i1 = 0;
                for(let ii = $d0de706be9d545de$var$Log.data.top; ii; ii = ii.next, i1++){
                    s = (showIndex ? "#" + ($d0de706be9d545de$var$Log.count - $d0de706be9d545de$var$Log.data.length + i1 + 1) + ": " : "> ") + ii.value;
                    if ($d0de706be9d545de$var$Log.background) {
                        g.fillStyle($d0de706be9d545de$var$Log.background);
                        g.fillRect(x - 3, y - 1 + 7 + (fontSize + 5) * (i1 + 1) - 1, g.measureText(s) + 6, fontSize + 5);
                    }
                    g.fillStyle($d0de706be9d545de$var$Log.color);
                    g.fillText(s, x, y - 1 + 7 + (fontSize + 5) * (i1 + 1));
                }
                tmp = hrnow() - tmp;
                $c5f44d8482fd28c9$export$2e2bcd8739ae039.perf.drawTimeTotal -= tmp;
                $c5f44d8482fd28c9$export$2e2bcd8739ae039.perf.extraTimeTotal += tmp;
            }
        });
    },
    /**
	 * 	Pauses log rendering.
	 * 	!function pause () : void;
	 */ pause: function() {
        this.paused = true;
        return;
    },
    /**
	 * 	Resumes log rendering.
	 * 	!function resume () : void;
	 */ resume: function() {
        this.paused = false;
        return;
    }
};
var $d0de706be9d545de$export$2e2bcd8739ae039 = $d0de706be9d545de$var$Log;


//![import "./random"]
//![import "./log"]
//![import "../flow/viewport"]
//:/**
//: * 	Global functions and definitions.
//: */
//!namespace globals
/*
**	Variables and behavior flags, can be extended as needed from other modules.
*/ const $fdb3e373096c6ca3$var$globals = {
    /**
	 * Renderer's GL context.
	 * !let gl: WebGL2RenderingContext;
	 */ gl: null,
    /**
	 * Currently active shader program.
	 * !let shaderProgram: ShaderProgram;
	 */ shaderProgram: null,
    /**
	 * Global system time, updated once per frame. Mirrors the `System.frameTime` property.
	 * !let time: number;
	 */ time: 0,
    /**
	 * Active viewport (if any). Set by the `draw` method of the `Scene` class.
	 * !let viewport: Viewport;
	 */ viewport: null,
    /**
	 * Indicates if the element bounds should be drawn. Used by the `Element` class.
	 * !let debugBounds: boolean;
	 */ debugBounds: false,
    /**
	 * Indicates if the mask bounds should be drawn. Used by the `Mask` class.
	 * !let debugMasks: boolean;
	 */ debugMasks: false,
    /**
	 * Global random generators. Only `rand0` is used by the global random functions. The `rand1` and `rand2` can be used manually if desired.
	 *
	 * !const rand0: Random;
	 * !const rand1: Random;
	 * !const rand2: Random;
	 */ rand0: new $70dacaf824eda432$export$2e2bcd8739ae039(),
    rand1: new $70dacaf824eda432$export$2e2bcd8739ae039(),
    rand2: new $70dacaf824eda432$export$2e2bcd8739ae039()
};
var $fdb3e373096c6ca3$export$2e2bcd8739ae039 = $fdb3e373096c6ca3$var$globals;
//!/namespace
//!declare global
/**
 * Converts the given pixel-value to actual screen pixels taking into account the current scale.
 * !function px (value: number) : number;
 */ $parcel$global.px = function(value) {
    return value * C.SCALE;
};
/**
 * Disposes an object by running the first method that is found in the following order: `free`, `dispose` and finally `__dtor`.
 * !function dispose (obj: object) : void;
 */ $parcel$global.dispose = function(obj) {
    if (obj === null || typeof obj !== 'object') return;
    if ('free' in obj) return obj.free();
    if ('dispose' in obj) return obj.dispose();
    if ('__dtor' in obj) obj.__dtor();
};
/**
 * Global audio context obtained when the system is initialized.
 * !let audioContext: AudioContext;
 */ if ('AudioContext' in $parcel$global) {
    $parcel$global.audioContext = new AudioContext({
        latencyHint: 'interactive',
        sampleRate: 44100
    });
    $d0de706be9d545de$export$2e2bcd8739ae039.write('AudioContext: baseLatency=' + ~~($parcel$global.audioContext.baseLatency * 1000) + ' ms');
} else $parcel$global.audioContext = null;
/**
 * Similar to `fetch` but uses XMLHttpRequest because in some mobile browsers regular mode does not work well with ArrayBuffers.
 * !function fetchd (url: string, options?: object) : Promise<object>;
 */ $parcel$global.fetchd = function(url, options) {
    return new Promise((resolve, reject)=>{
        if (!options) options = {};
        if (!('responseType' in options)) options.responseType = 'arraybuffer';
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        for(let i in options)request[i] = options[i];
        request.onload = function() {
            resolve(request.response);
        };
        request.onerror = function() {
            reject('Unable to fetch specified resource.');
        };
        request.send();
    });
};
/**
 * Loads an arraybuffer from the specified URL and converts it to a AudioBuffer using the global audioContext.
 * !function fetchAudioBuffer (url: string) : Promise<AudioBuffer>;
 */ $parcel$global.fetchAudioBuffer = function(url) {
    return new Promise((resolve, reject)=>{
        if (!$parcel$global.audioContext) {
            reject('AudioContext is not available.');
            return;
        }
        fetchd(url).then((arrayBuffer)=>audioContext.decodeAudioData(arrayBuffer)
        ).then((audioBuffer)=>resolve(audioBuffer)
        ).catch((err)=>reject(err)
        );
    });
};
/**
 * Returns the value as an integer.
 * !function int (value: number|string) : number;
 */ $parcel$global.int = function(value) {
    return value >> 0;
};
/**
 * Returns the value as a boolean.
 * !function bool (value: number|string|boolean) : number;
 */ $parcel$global.bool = function(value) {
    if (value === true || value === false) return value;
    if (value == 'true') return true;
    if (value == 'false') return false;
    return !!value;
};
/**
 * Returns the value as a floating point number.
 * !function float (value: number|string) : number;
 */ $parcel$global.float = function(value) {
    return parseFloat(value);
};
/**
 * Returns the value truncated to 2 digits of precision.
 * !function float2 (value: number) : number;
 */ $parcel$global.float2 = function(value) {
    return int(value * 100) / 100;
};
/**
 * Returns the value truncated to 3 digits of precision.
 * !function float3 (value: number) : number;
 */ $parcel$global.float3 = function(value) {
    return int(value * 1000) / 1000;
};
/**
 * Returns the value truncated to 4 digits of precision.
 * !function float4 (value: number) : number;
 */ $parcel$global.float4 = function(value) {
    return int(value * 10000) / 10000;
};
/**
 * Converts the given value from degrees to radians.
 * !function rad (degrees: number) : number;
 */ $parcel$global.rad = function(degrees) {
    return degrees * Math.PI / 180.0;
};
/**
 * Converts the given value from radians to degrees.
 * !function deg (radians: number) : number;
 */ $parcel$global.deg = function(radians) {
    return radians / Math.PI * 180;
};
/**
 * Returns a random integer value from 0 to 0xFFFF (inclusive).
 * !function rand() : number;
 */ $parcel$global.rand = function() {
    return $fdb3e373096c6ca3$var$globals.rand0.nextInt16();
};
/**
 * Returns a random float from 0 to 1 (inclusive).
 * !function randf() : number;
 */ $parcel$global.randf = function() {
    return $fdb3e373096c6ca3$var$globals.rand0.nextFloat();
};
/**
 * Returns a random float within the given (inclusive) range.
 * !function randrf (startValue: number, endValue: number) : number;
 */ $parcel$global.randrf = function(a, b) {
    let t = $fdb3e373096c6ca3$var$globals.rand0.nextFloat();
    return t * b + (1 - t) * a;
};
/**
 * Returns a random integer within the given range (inclusive).
 * !function randr (startValue: number, endValue: number) : number;
 */ $parcel$global.randr = function(a, b) {
    let t = $fdb3e373096c6ca3$var$globals.rand0.nextFloat();
    return Math.round(t * b + (1 - t) * a);
};
/**
 * Returns a table (array) of N random float numbers within the given range (inclusive).
 * !function randtf (startValue: number, endValue: number, n: number) : Array<number>;
 */ $parcel$global.randtf = function(a, b, n) {
    var list = [];
    for(var i = 0; i < n; i++)list.push(randrf(a, b));
    return list;
};
/**
 * Returns the high-resolution `now` counter in milliseconds (includes possibly microseconds in fractional part).
 * !function hrnow () : number;
 */ $parcel$global.hrnow = function() {
    return performance.now();
};
/**
 * Returns a function that when called produces a random integer value within the given (inclusive) range.
 * !function randvar (startValue: number, endValue: number) : () => number;
 */ $parcel$global.randvar = function(a, b) {
    return function() {
        return randr(a, b);
    };
};
/**
 * Returns a function that when called returns an item from the specified array at some random index within the (inclusive) range.
 * !function randitem (arr: Array<any>, startValue?: number, endValue?: number) : () => any;
 */ $parcel$global.randitem = function(arr, a = null, b = null) {
    if (a === null) a = 0;
    if (b === null) b = arr.length - 1;
    return function() {
        return arr[randr(a, b)];
    };
};
/**
 * Returns the parameter 't' where two line segments intersect.
 * !function getLineSegmentIntersection (ls1_x1: number, ls1_y1: number, ls1_x2: number, ls1_y2: number, ls2_x1: number, ls2_y1: number, ls2_x2: number, ls2_y2: number) : number;
 */ $parcel$global.getLineSegmentIntersection = function(ls1_x1, ls1_y1, ls1_x2, ls1_y2, ls2_x1, ls2_y1, ls2_x2, ls2_y2) {
    // Case #1: Identical segments.
    if (ls1_x1 == ls2_x1 && ls1_y1 == ls2_y1 && ls1_x2 == ls2_x2 && ls1_y2 == ls2_y2) return 0;
    let inf = 2.0;
    var dyA = ls1_y2 - ls1_y1;
    var dxA = ls1_x2 - ls1_x1;
    var dyB = ls2_y2 - ls2_y1;
    var dxB = ls2_x2 - ls2_x1;
    // Case #2: Horizontal vs. Horizontal
    if (dyA == 0 && dyB == 0) {
        if (ls1_y1 != ls2_y1) return inf;
        var x1 = Math.max(ls1_x1, ls2_x1);
        var x2 = Math.min(ls1_x2, ls2_x2);
        if (x1 > x2) return inf;
        return (x1 - ls1_x1) / dxA;
    }
    // Case #3: Vertical vs. Vertical
    if (dxA == 0 && dxB == 0) {
        if (ls1_x1 != ls2_x1) return inf;
        var y1 = Math.max(ls1_y1, ls2_y1);
        var y2 = Math.min(ls1_y2, ls2_y2);
        if (y1 > y2) return inf;
        return (y1 - ls1_y1) / dyA;
    }
    // Case #4: Vertical vs. Horizontal or Sloped
    if (dxA == 0) {
        var tA = (dyB * (ls1_x1 - ls2_x1) + dxB * (ls2_y1 - ls1_y1)) / (dxB * dyA);
        if (0 > tA || tA > 1) return inf;
        var tB = (ls1_x1 - ls2_x1) / dxB;
        if (0 > tB || tB > 1) return inf;
        return tA;
    }
    // Case #5: Regular line segments.
    var a = dyA * (ls2_x1 - ls1_x1) + dxA * (ls1_y1 - ls2_y1);
    var b = dyB * dxA - dxB * dyA;
    if (b == 0) return inf;
    var tB = a / b;
    if (0 > tB || tB > 1) return inf;
    var tA = (dxB * tB + ls2_x1 - ls1_x1) / dxA;
    if (0 > tA || tA > 1) return inf;
    return tA;
};
/**
 * Returns boolean indicating if the line segments intersect.
 * !function lineSegmentIntersects (ls1_x1: number, ls1_y1: number, ls1_x2: number, ls1_y2: number, ls2_x1: number, ls2_y1: number, ls2_x2: number, ls2_y2: number) : boolean;
 */ $parcel$global.lineSegmentIntersects = function(ls1_x1, ls1_y1, ls1_x2, ls1_y2, ls2_x1, ls2_y1, ls2_x2, ls2_y2) {
    let t = getLineSegmentIntersection(ls1_x1, ls1_y1, ls1_x2, ls1_y2, ls2_x1, ls2_y1, ls2_x2, ls2_y2);
    return t >= 0 && t <= 1.0;
};
/**
 * Rotates a point (2d) by the given angle and returns an object having x and y properties.
 * !function rotatePoint (angle: number, x: number, y: number) : { x: number, y: number };
 */ $parcel$global.rotatePoint = function(angle, x, y) {
    return {
        x: x * Math.cos(angle) + y * Math.sin(angle),
        y: y * Math.cos(angle) - x * Math.sin(angle)
    };
};
/**
 * Returns a value snapped to a step within the given range.
 * !function stepValue (value: number, minValue: number, maxValue: number, numSteps: number) : number;
 */ $parcel$global.stepValue = function(value, minValue, maxValue, numSteps) {
    return Math.round(numSteps * (value - minValue) / (maxValue - minValue)) / numSteps * (maxValue - minValue) + minValue;
};
/**
 * Returns a value that is a factor of the specified step.
 * !function alignValue (value: number, step: number) : number;
 */ $parcel$global.alignValue = function(value, step) {
    return Math.round(value / step) * step;
};
/**
 * Number of bits for fixed-point number (default is 8).
 * !let FIXED_POINT_BITS : number;
*/ $parcel$global.FIXED_POINT_BITS = 8;
/**
 * Returns a fixed-point upscaled value.
 * !function upscale (value: number) : number;
 */ $parcel$global.upscale = function(value) {
    return value * (1 << FIXED_POINT_BITS) >> 0;
};
/**
 * Downscales a fixed-point value to its integer part.
 * !function downscale (value: number) : number;
 */ $parcel$global.downscale = function(value) {
    return value >> FIXED_POINT_BITS;
};
/**
 * Downscales a fixed-point value to floating point.
 * !function downscalef (value: number) : number;
 */ $parcel$global.downscalef = function(value) {
    return value / (1 << FIXED_POINT_BITS);
};
/**
 * Aligns a value to its fixed point floating point representation such that downscaling results in an integer.
 * !function falign (value: number) : number;
 */ $parcel$global.falign = function(value) {
    return downscalef(upscale(value));
};
/**
 * Returns the value having the minimum absolute value.
 * !function absmin (a: number, b: number) : number;
 */ $parcel$global.absmin = function(a, b) {
    return Math.abs(a) < Math.abs(b) ? a : b;
};
/**
 * Returns the value having the maximum absolute value.
 * !function absmax (a: number, b: number) : number;
 */ $parcel$global.absmax = function(a, b) {
    return Math.abs(a) > Math.abs(b) ? a : b;
};
/**
 * Repeats a string a number of times.
 * !function repeat (str: string, count: number) : string;
 */ $parcel$global.repeat = function(str, count) {
    let out = '';
    while(count-- > 0)out += str;
    return out;
};
/**
 * Pads the given value with a character (added to the left) until the specified size is reached.
 * !function lpad (val: any, size: number, char?: string) : string;
 */ $parcel$global.lpad = function(val, size, char = '0') {
    val = val.toString();
    return repeat(char.charAt(0), size - val.length) + val;
};
/**
 * Pads the given value with a character (added to the right) until the specified size is reached.
 * !function rpad (val: any, size: number, char?: string) : string;
 */ $parcel$global.rpad = function(val, size, char = '0') {
    val = val.toString();
    return val + repeat(char.charAt(0), size - val.length);
};
/**
 * Returns the normalized (0 to 1) value for the given signed-normalized (-1 to 1) value.
 * !function norm (value: number) : number;
 */ $parcel$global.norm = function(value) {
    return (value + 1.0) * 0.5;
};
/**
 * Returns the signed-normalized (-1 to 1) value for the given normalized (0 to 1) value.
 * !function snorm (value: number) : number;
 */ $parcel$global.snorm = function(value) {
    return value * 2.0 - 1.0;
};
/**
 * Clamps the specified value to the [x0, x1] range.
 * !function clamp (value: number, x0?: number, x1?: number) : number;
 */ $parcel$global.clamp = function(value, x0 = 0.0, x1 = 1.0) {
    return value < x0 ? x0 : value > x1 ? x1 : value;
};
/**
 * Maps the given value from [a0, a1] to [b0, b1].
 * !function map (value: number, a0: number, a1: number, b0: number, b1: number) : number;
 */ $parcel$global.map = function(value, a0, a1, b0, b1) {
    return (value - a0) * (b1 - b0) / (a1 - a0) + b0;
};









/*
**	system/perf.js
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
*/ //!class Perf
/**
 * 	Initializes the performance monitoring instance.
 *
 * 	@param accumSize - Maximum amount of samples to accumulate.
 * 	@param expectedValue - Expected value (average) of resulting samples.
 * 
 * 	!constructor (accumSize: number, expectedValue?: number);
 */ const $fd8633c77128ce2f$var$Perf = function(accumSize, expectedValue = null) {
    this.data = [];
    this.accumSize = accumSize;
    this.expectedValue = expectedValue;
    this.lastFeed = 0;
    this.lastUpdate = 0;
    this.stdSum = 0;
    this.stdCount = 0;
};
var $fd8633c77128ce2f$export$2e2bcd8739ae039 = $fd8633c77128ce2f$var$Perf;
/**
 * 	Marks the start time of a performance test.
 * 	!begin() : void;
 */ $fd8633c77128ce2f$var$Perf.prototype.begin = function() {
    this.startTime = performance.now();
};
/**
 * 	Marks the end time of the performance test, the elapsed time is fed into the monitor.
 * 	!end() : void;
 */ $fd8633c77128ce2f$var$Perf.prototype.end = function() {
    this.feed(performance.now() - this.startTime);
};
/**
 * 	Feeds a value into the monitor, auto-generates a report using `console.log` when the number of samples reaches the `accumSize` specified in the constructor.
 * 	!feed (value: number) : void;
 */ $fd8633c77128ce2f$var$Perf.prototype.feed = function(value) {
    this.data.push(value);
    this.lastFeed++;
    if (this.data.length != this.accumSize) return;
    this.report();
    this.data = [];
};
/**
 * 	Updates the `min`, `max`, `avg` `std`, `stdSum` and `stdCount` fields of the object.
 * 	!update () : void;
 */ $fd8633c77128ce2f$var$Perf.prototype.update = function() {
    let min = null;
    let max = null;
    let avg = 0;
    let std = 0;
    for(let i = 0; i < this.data.length; i++){
        min = min === null ? this.data[i] : Math.min(min, this.data[i]);
        max = max === null ? this.data[i] : Math.max(max, this.data[i]);
        avg += this.data[i];
    }
    avg /= this.data.length;
    let e = this.expectedValue !== null ? this.expectedValue : avg;
    for(let i1 = 0; i1 < this.data.length; i1++)std += Math.pow(this.data[i1] - e, 2);
    std = Math.sqrt(std / this.data.length);
    this.stdSum += std;
    this.stdCount++;
    this.min = min;
    this.max = max;
    this.avg = avg;
    this.std = std;
    this.lastUpdate = this.lastFeed;
    return this;
};
/**
 * 	Returns a report string with the values selected by the specified flags.
 * 	!report (flags: Perf.Flags) : string;
 */ $fd8633c77128ce2f$var$Perf.prototype.report = function(flags = 255) {
    let out = '';
    if (this.lastUpdate != this.lastFeed) this.update();
    if (flags & $fd8633c77128ce2f$var$Perf.Flags.SAMPLES) out += 'n: ' + this.stdCount;
    if (flags & $fd8633c77128ce2f$var$Perf.Flags.MIN) out += (out != '' ? ', ' : '') + 'min: ' + this.min;
    if (flags & $fd8633c77128ce2f$var$Perf.Flags.MAX) out += (out != '' ? ', ' : '') + 'max: ' + this.max;
    if (flags & $fd8633c77128ce2f$var$Perf.Flags.AVG) out += (out != '' ? ', ' : '') + 'avg: ' + this.avg.toFixed(2);
    if (flags & $fd8633c77128ce2f$var$Perf.Flags.EXPECTED) out += (out != '' ? ', ' : '') + (this.expectedValue !== undefined ? 'e: ' + this.expectedValue : '');
    if (flags & $fd8633c77128ce2f$var$Perf.Flags.STDDEV) out += (out != '' ? ', ' : '') + 'stddev: ' + this.std.toFixed(2);
    if (flags & $fd8633c77128ce2f$var$Perf.Flags.AVG_STDDEV) out += (out != '' ? ', ' : '') + 'avg_stddev: ' + (this.stdSum / this.stdCount).toFixed(2);
    return out;
};
//!/class
//!namespace Perf
//!enum Flags
$fd8633c77128ce2f$var$Perf.Flags = {
    SAMPLES: 1,
    //!SAMPLES
    MIN: 2,
    //!MIN
    MAX: 4,
    //!MAX
    AVG: 8,
    //!AVG
    EXPECTED: 16,
    //!EXPECTED
    STDDEV: 32,
    //!STDDEV
    AVG_STDDEV: 64,
    //!AVG_STDDEV
    ALL: 255
}; //!/enum






var $hNLgQ = parcelRequire("hNLgQ");


//![import "./globals"]
//![import "./system"]
/*
 *	Describes a GL framebuffer.
 */ const $c046478fd7ecfb31$var$Framebuffer = $hNLgQ.Class.extend({
    /**
	 *	Shader GL identifier.
	 */ framebufferId: null,
    /**
	 *	Attachments of the framebuffer.
	 */ attachments: null,
    /**
	 *	Type of each attachment.
	 */ attachmentTypes: null,
    /**
	 *	Width of the framebuffer.
	 */ width: 0,
    /**
	 *	Height of the framebuffer.
	 */ height: 0,
    /**
	 *	Enabled draw buffers.
	 */ drawBuffers: null,
    drawBufferIds: null,
    /**
	 *	Constructs a GL framebuffer.
	 *
	 * 	@param {number} width
	 * 	@param {number} height
	 */ __ctor: function(width = null, height = null) {
        if ($fdb3e373096c6ca3$export$2e2bcd8739ae039.gl === null) return;
        if ($c046478fd7ecfb31$var$attachmentPointIds[0] === null) $c046478fd7ecfb31$var$initAttachmentPointIds($fdb3e373096c6ca3$export$2e2bcd8739ae039.gl);
        this.framebufferId = $fdb3e373096c6ca3$export$2e2bcd8739ae039.gl.createFramebuffer();
        this.drawBuffers = [];
        this.drawBufferIds = [];
        //violet:hardware scaling
        //this.width = width || System.screenWidth;
        //this.height = height || System.screenHeight;
        this.width = width || $c5f44d8482fd28c9$export$2e2bcd8739ae039.renderer.width;
        this.height = height || $c5f44d8482fd28c9$export$2e2bcd8739ae039.renderer.height;
        this.attachments = new Array($c046478fd7ecfb31$var$Framebuffer.MAX_ATTACHMENT_POINTS).fill(null);
        this.attachmentTypes = new Array($c046478fd7ecfb31$var$Framebuffer.MAX_ATTACHMENT_POINTS).fill(null);
    },
    /**
	 * 	Destroys the framebuffer and all attached textures.
	 */ __dtor: function() {
        let gl = $fdb3e373096c6ca3$export$2e2bcd8739ae039.gl;
        if (gl === null) return;
        for(let i = 0; i < this.attachments.length; i++)if (this.attachments[i] !== null) {
            if (this.attachmentTypes[i] === $c046478fd7ecfb31$var$Framebuffer.TEXTURE) gl.deleteTexture(this.attachments[i]);
            else gl.deleteRenderbuffer(this.attachments[i]);
        }
        gl.deleteFramebuffer(this.frameBufferId);
    },
    /**
	 * 	Attaches a texture to a framebuffer attachment point.
	 *
	 * 	@param {number} attachmentPoint
	 * 	@param {any} texture
	 * 	@param {number} type
	 */ attach: function(attachmentPoint, texture, type = null) {
        let gl = $fdb3e373096c6ca3$export$2e2bcd8739ae039.gl;
        if (gl === null) return;
        if (type === null) type = attachmentPoint < $c046478fd7ecfb31$var$Framebuffer.DEPTH ? $c046478fd7ecfb31$var$Framebuffer.TEXTURE : $c046478fd7ecfb31$var$Framebuffer.RENDERBUFFER;
        this.attachments[attachmentPoint] = texture;
        this.attachmentTypes[attachmentPoint] = type;
        if (attachmentPoint < $c046478fd7ecfb31$var$Framebuffer.DEPTH && this.drawBuffers.indexOf(attachmentPoint) === -1) {
            this.drawBuffers.push(attachmentPoint);
            this.drawBufferIds.push($c046478fd7ecfb31$var$attachmentPointIds[attachmentPoint]);
        }
        let prev = gl.getParameter(gl.FRAMEBUFFER_BINDING);
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebufferId);
        switch(type){
            case $c046478fd7ecfb31$var$Framebuffer.TEXTURE:
                gl.framebufferTexture2D(gl.FRAMEBUFFER, $c046478fd7ecfb31$var$attachmentPointIds[attachmentPoint], gl.TEXTURE_2D, texture, 0);
                break;
            case $c046478fd7ecfb31$var$Framebuffer.RENDERBUFFER:
                gl.framebufferRenderbuffer(gl.FRAMEBUFFER, $c046478fd7ecfb31$var$attachmentPointIds[attachmentPoint], gl.RENDERBUFFER, texture);
                break;
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, prev);
    },
    /**
	 * 	Creates a new color buffer texture.
	 *
	 * 	@param {number} width
	 * 	@param {number} height
	 * 	@returns {GLTexture}
	 */ createColorBuffer: function(attachmentPoint, width = null, height = null) {
        let gl = $fdb3e373096c6ca3$export$2e2bcd8739ae039.gl;
        if (gl === null) return null;
        if (width === null) width = this.width;
        if (height === null) height = this.height;
        let tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texStorage2D(gl.TEXTURE_2D, 1, gl.RGBA8, width, height);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        this.attach(attachmentPoint, tex);
        return tex;
    },
    /**
	 * 	Creates a new depth buffer texture.
	 *
	 * 	@param {number} width
	 * 	@param {number} height
	 * 	@returns {GLTexture}
	 */ createDepthBuffer: function(width = null, height = null) {
        let gl = $fdb3e373096c6ca3$export$2e2bcd8739ae039.gl;
        if (gl === null) return null;
        if (width === null) width = this.width;
        if (height === null) height = this.height;
        let tex = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, tex);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT24, width, height);
        this.attach($c046478fd7ecfb31$var$Framebuffer.DEPTH, tex);
        return tex;
    },
    /**
	 * 	Creates a new stencil buffer texture.
	 *
	 * 	@param {number} width
	 * 	@param {number} height
	 * 	@returns {GLTexture}
	 */ createStencilBuffer: function(width = null, height = null) {
        let gl = $fdb3e373096c6ca3$export$2e2bcd8739ae039.gl;
        if (gl === null) return null;
        if (width === null) width = this.width;
        if (height === null) height = this.height;
        let tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texStorage2D(gl.TEXTURE_2D, 1, gl.DEPTH_STENCIL, width, height);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        this.attach($c046478fd7ecfb31$var$Framebuffer.DEPTH_STENCIL, tex);
        return tex;
    },
    /**
	 * 	Returns a texture from the specified attachment point.
	 * 	@param {number} attachmentPoint 
	 */ getTexture: function(attachmentPoint) {
        if (this.attachmentTypes[attachmentPoint] !== $c046478fd7ecfb31$var$Framebuffer.TEXTURE) return null;
        return this.attachments[attachmentPoint];
    },
    /**
	 * 	Returns a renderbuffer from the specified attachment point.
	 * 	@param {number} attachmentPoint 
	 */ getRenderBuffer: function(attachmentPoint) {
        if (this.attachmentTypes[attachmentPoint] !== $c046478fd7ecfb31$var$Framebuffer.RENDERBUFFER) return null;
        return this.attachments[attachmentPoint];
    },
    /**
	 *	Binds the framebuffer for further operations.
	 */ bind: function() {
        let gl = $fdb3e373096c6ca3$export$2e2bcd8739ae039.gl;
        if (gl === null) return;
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebufferId);
        gl.drawBuffers(this.drawBufferIds);
        gl.viewport(0, 0, this.width, this.height);
    },
    /**
	 *	Binds the default framebuffer.
	 */ unbind: function() {
        let gl = $fdb3e373096c6ca3$export$2e2bcd8739ae039.gl;
        if (gl === null) return;
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.drawBuffers($c046478fd7ecfb31$var$defaultDrawBuffers);
        gl.viewport(0, 0, $c5f44d8482fd28c9$export$2e2bcd8739ae039.renderer.width, $c5f44d8482fd28c9$export$2e2bcd8739ae039.renderer.height);
    },
    /**
	 *	Returns the status of the framebuffer. Returns true if the framebuffer is complete.
	 */ isComplete: function() {
        let gl = $fdb3e373096c6ca3$export$2e2bcd8739ae039.gl;
        if (gl === null) return true;
        let prev = gl.getParameter(gl.FRAMEBUFFER_BINDING);
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebufferId);
        let result = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
        gl.bindFramebuffer(gl.FRAMEBUFFER, prev);
        return result === gl.FRAMEBUFFER_COMPLETE;
    }
});
/**
 *	Types of attachment objects.
 */ $c046478fd7ecfb31$var$Framebuffer.TEXTURE = 1;
$c046478fd7ecfb31$var$Framebuffer.RENDERBUFFER = 2;
/**
 *	Available attachment points.
 */ $c046478fd7ecfb31$var$Framebuffer.COLOR0 = 0;
$c046478fd7ecfb31$var$Framebuffer.COLOR1 = 1;
$c046478fd7ecfb31$var$Framebuffer.COLOR2 = 2;
$c046478fd7ecfb31$var$Framebuffer.COLOR3 = 3;
$c046478fd7ecfb31$var$Framebuffer.COLOR4 = 4;
$c046478fd7ecfb31$var$Framebuffer.COLOR5 = 5;
$c046478fd7ecfb31$var$Framebuffer.COLOR6 = 6;
$c046478fd7ecfb31$var$Framebuffer.COLOR7 = 7;
$c046478fd7ecfb31$var$Framebuffer.DEPTH = 8;
$c046478fd7ecfb31$var$Framebuffer.STENCIL = 9;
$c046478fd7ecfb31$var$Framebuffer.DEPTH_STENCIL = 10;
$c046478fd7ecfb31$var$Framebuffer.MAX_ATTACHMENT_POINTS = 11;
/**
 *	GL framebuffer attachment point IDs.
 */ const $c046478fd7ecfb31$var$attachmentPointIds = new Array($c046478fd7ecfb31$var$Framebuffer.MAX_ATTACHMENT_POINTS).fill(null);
const $c046478fd7ecfb31$var$defaultDrawBuffers = new Array(1).fill(null);
/**
 * 	Initializes the attachment point IDs.
 */ const $c046478fd7ecfb31$var$initAttachmentPointIds = function(gl) {
    $c046478fd7ecfb31$var$defaultDrawBuffers[0] = gl.BACK;
    $c046478fd7ecfb31$var$attachmentPointIds[$c046478fd7ecfb31$var$Framebuffer.COLOR0] = gl.COLOR_ATTACHMENT0;
    $c046478fd7ecfb31$var$attachmentPointIds[$c046478fd7ecfb31$var$Framebuffer.COLOR1] = gl.COLOR_ATTACHMENT1;
    $c046478fd7ecfb31$var$attachmentPointIds[$c046478fd7ecfb31$var$Framebuffer.COLOR2] = gl.COLOR_ATTACHMENT2;
    $c046478fd7ecfb31$var$attachmentPointIds[$c046478fd7ecfb31$var$Framebuffer.COLOR3] = gl.COLOR_ATTACHMENT3;
    $c046478fd7ecfb31$var$attachmentPointIds[$c046478fd7ecfb31$var$Framebuffer.COLOR4] = gl.COLOR_ATTACHMENT4;
    $c046478fd7ecfb31$var$attachmentPointIds[$c046478fd7ecfb31$var$Framebuffer.COLOR5] = gl.COLOR_ATTACHMENT5;
    $c046478fd7ecfb31$var$attachmentPointIds[$c046478fd7ecfb31$var$Framebuffer.COLOR6] = gl.COLOR_ATTACHMENT6;
    $c046478fd7ecfb31$var$attachmentPointIds[$c046478fd7ecfb31$var$Framebuffer.COLOR7] = gl.COLOR_ATTACHMENT7;
    $c046478fd7ecfb31$var$attachmentPointIds[$c046478fd7ecfb31$var$Framebuffer.DEPTH] = gl.DEPTH_ATTACHMENT;
    $c046478fd7ecfb31$var$attachmentPointIds[$c046478fd7ecfb31$var$Framebuffer.STENCIL] = gl.STENCIL_ATTACHMENT;
    $c046478fd7ecfb31$var$attachmentPointIds[$c046478fd7ecfb31$var$Framebuffer.DEPTH_STENCIL] = gl.DEPTH_STENCIL_ATTACHMENT;
};
var $c046478fd7ecfb31$export$2e2bcd8739ae039 = $c046478fd7ecfb31$var$Framebuffer;


var $f6d10e9657762025$exports = {};

$parcel$export($f6d10e9657762025$exports, "Drawable", function () { return $f6d10e9657762025$export$f35845279390eafd; });
$parcel$export($f6d10e9657762025$exports, "Custom", function () { return $f6d10e9657762025$export$922ad9063d3cdee8; });
$parcel$export($f6d10e9657762025$exports, "Spritesheet", function () { return $f6d10e9657762025$export$674d2eb4debbef0c; });
$parcel$export($f6d10e9657762025$exports, "SpritesheetAnimation", function () { return $f6d10e9657762025$export$7faa71ea66a694bb; });
$parcel$export($f6d10e9657762025$exports, "SpriteFont", function () { return $f6d10e9657762025$export$e1896ac0c4970221; });
$parcel$export($f6d10e9657762025$exports, "Sound", function () { return $f6d10e9657762025$export$85990f0f98a390bb; });
$parcel$export($f6d10e9657762025$exports, "SoundArray", function () { return $f6d10e9657762025$export$bc40a15752ef9732; });

var $hNLgQ = parcelRequire("hNLgQ");
//:/**
//: * 	Describes an object that can be drawn to a Canvas.
//: */
//!class Drawable
const $f2a87ce0e4ca782b$var$Drawable = $hNLgQ.Class.extend({
    className: 'Drawable',
    /**
	 * Image resource.
	 * @protected
	 * !readonly resource: HTMLImageElement|Canvas;
	 */ resource: null,
    /**
	 * Logical width of the drawable.
	 * @protected
	 * !readonly width: number;
	 */ width: 0,
    /**
	 * Logical height of the drawable.
	 * @protected
	 * !readonly height: number;
	 */ height: 0,
    /**
	 * Frame source X-offset in physical units.
	 * @protected
	 * !readonly sx: number;
	 */ sx: 0,
    /**
	 * Frame source Y-position in physical units.
	 * @protected
	 * !readonly sy: number;
	 */ sy: 0,
    /**
	 * Frame source width in physical units.
	 * @protected
	 * !readonly swidth: number;
	 */ swidth: 0,
    /**
	 * Frame source height in physical units.
	 * @protected
	 * !readonly sheight: number;
	 */ sheight: 0,
    /**
	 * Initializes the instance.
	 * !constructor();
	 */ __ctor: function(resource = null, width = null, height = null) {
        if ($hNLgQ.Rinn.isInstanceOf(resource, $f2a87ce0e4ca782b$var$Drawable)) {
            let drawable = resource;
            this.resource = drawable.resource;
            this.width = width !== null && width !== void 0 ? width : drawable.width;
            this.height = height !== null && height !== void 0 ? height : drawable.height;
            this.sx = drawable.sx;
            this.sy = drawable.sy;
            this.swidth = drawable.swidth;
            this.sheight = drawable.sheight;
        } else {
            this.resource = resource;
            this.sx = 0;
            this.sy = 0;
            if (this.resource) {
                this.width = width !== null && width !== void 0 ? width : resource.targetWidth;
                this.height = height !== null && height !== void 0 ? height : resource.targetHeight;
                this.swidth = resource.width;
                this.sheight = resource.height;
            } else {
                this.width = width;
                this.height = height;
                this.swidth = width;
                this.sheight = height;
            }
        }
    },
    /**
	 * Returns the actual independent drawable object.
	 * !getDrawable(): Drawable;
	 */ getDrawable: function() {
        return this;
    },
    /**
	 * Returns the underlying Image object, can be used directly with Canvas.drawImage.
	 * !getImage(): HTMLImageElement|Canvas;
	 */ getImage: function() {
        return this.resource;
    },
    /**
	 * Resizes the logical dimensions of the drawable.
	 * !resize (width: number|boolean|null, height: number|boolean|null) : Drawable;
	 */ resize: function(width, height) {
        width = width !== null ? width !== true ? width : true : this.width;
        height = height !== null ? height !== true ? height : true : this.height;
        if (width === true) width = height * (this.width / this.height);
        else if (height === true) height = width * (this.height / this.width);
        this.width = width;
        this.height = height;
        return this;
    },
    /**
	 * Draws the drawable on the canvas.
	 * !draw (g: Canvas, x: number, y: number, width?: number|null, height?: number|null) : void;
	 */ draw: function(g, x, y, width = null, height = null) {
        width = width !== null && width !== void 0 ? width : this.width;
        height = height !== null && height !== void 0 ? height : this.height;
        this.drawf(g, this.sx, this.sy, this.swidth, this.sheight, x, y, width, height);
    },
    /**
	 * Draws a section of the drawable on the canvas using full parameters.
	 * !drawf (g: Canvas, sx:number, sy:number, swidth:number, sheight:number, tx:number, ty:number, twidth:number, theight:number, fwidth?:number|null, fheight?:number|null) : void;
	 */ drawf: function(g, sx, sy, swidth, sheight, tx, ty, twidth, theight, fwidth = null, fheight = null) {
        g.drawImage(this.resource, sx, sy, swidth, sheight, tx, ty, twidth, theight, null, null, fwidth !== null && fwidth !== void 0 ? fwidth : twidth, fheight !== null && fheight !== void 0 ? fheight : theight);
    },
    /**
	 * Renders the drawable for the specified element.
	 * !render (g: Canvas, elem: Element) : void;
	 */ render: function(g, elem) {
        this.draw(g, elem.bounds.x1, elem.bounds.y1, elem.bounds.width(), elem.bounds.height());
    }
});
/**
 * Nine-Slice Drawable.
 */ const $f2a87ce0e4ca782b$var$NineSlice = $f2a87ce0e4ca782b$var$Drawable.extend({
    className: 'DrawableNineSlice',
    ss: null,
    startingIndex: 0,
    __ctor: function(spritesheet, startingIndex) {
        this._super.Drawable.__ctor(spritesheet);
        if (spritesheet === null || !$hNLgQ.Class.instanceOf(spritesheet, 'Spritesheet')) throw new Error('NineSlice: spritesheet required');
        this.ss = spritesheet;
        this.startingIndex = startingIndex;
    },
    __dtor: function() {
        dispose(this.ss);
    },
    getImage: function() {
        return this.ss.getImage();
    },
    draw: function(g, x, y, width, height) {
        const k = this.startingIndex;
        let leftWidth = this.ss.getFrame(k + 0).width;
        let rightWidth = this.ss.getFrame(k + 2).width;
        let midWidth = this.ss.getFrame(k + 1).width;
        let topHeight = this.ss.getFrame(k + 0).height;
        let bottomHeight = this.ss.getFrame(k + 6).height;
        let midHeight = this.ss.getFrame(k + 3).height;
        let n = int((width - leftWidth - rightWidth) / midWidth);
        let m = int((height - topHeight - bottomHeight) / midHeight);
        let x1 = x;
        let y1 = y;
        // Corners
        this.ss.getFrame(k + 0).draw(g, x1, y1);
        this.ss.getFrame(k + 2).draw(g, x1 + leftWidth + n * midWidth, y1);
        this.ss.getFrame(k + 6).draw(g, x1, y1 + topHeight + m * midHeight);
        this.ss.getFrame(k + 8).draw(g, x1 + leftWidth + n * midWidth, y1 + topHeight + m * midHeight);
        // Top/Bottom
        for(let i = 0; i < n; i++){
            this.ss.getFrame(k + 1).draw(g, x1 + leftWidth + i * midWidth, y1);
            this.ss.getFrame(k + 7).draw(g, x1 + leftWidth + i * midWidth, y1 + topHeight + m * midHeight);
        }
        // Left/Right
        for(let i1 = 0; i1 < m; i1++){
            this.ss.getFrame(k + 3).draw(g, x1, y1 + topHeight + i1 * midHeight);
            this.ss.getFrame(k + 5).draw(g, x1 + leftWidth + n * midWidth, y1 + topHeight + i1 * midHeight);
        }
        // Center
        for(let j = 0; j < m; j++)for(let i2 = 0; i2 < n; i2++)this.ss.getFrame(k + 4).draw(g, x1 + leftWidth + i2 * midWidth, y1 + topHeight + j * midHeight);
    }
});
Recycler.createPool($f2a87ce0e4ca782b$var$NineSlice, 512);
/**
 * Repeated drawable.
 */ const $f2a87ce0e4ca782b$var$Repeated = $f2a87ce0e4ca782b$var$Drawable.extend({
    className: 'DrawableRepeated',
    drawable: null,
    __ctor: function(drawable) {
        this._super.Drawable.__ctor(drawable);
        this.drawable = drawable;
    },
    __dtor: function() {
        dispose(this.drawable);
    },
    drawf: function(g, sx, sy, swidth, sheight, tx, ty, twidth, theight, fwidth = null, fheight = null) {
        this.drawable.drawf(g, sx, sy, swidth, sheight, tx, ty, twidth, theight, this.width, this.height);
    }
});
Recycler.createPool($f2a87ce0e4ca782b$var$Repeated, 512);
/**
 * Clipped drawable.
 */ const $f2a87ce0e4ca782b$var$Clipped = $f2a87ce0e4ca782b$var$Drawable.extend({
    className: 'DrawableClipped',
    drawable: null,
    __ctor: function(drawable) {
        this._super.Drawable.__ctor(drawable);
        this.drawable = drawable;
    },
    __dtor: function() {
        dispose(this.drawable);
    },
    draw: function(g, x, y, width = null, height = null) {
        let img = this.getImage();
        width = width !== null && width !== void 0 ? width : this.width;
        height = height !== null && height !== void 0 ? height : this.height;
        this.drawable.drawf(g, this.drawable.sx, this.drawable.sy, width * img.rscale, height * img.rscale, x, y, width, height);
    }
});
Recycler.createPool($f2a87ce0e4ca782b$var$Clipped, 512);
/**
 * Centered drawable.
 */ const $f2a87ce0e4ca782b$var$Centered = $f2a87ce0e4ca782b$var$Drawable.extend({
    className: 'DrawableCentered',
    drawable: null,
    offsX: 0,
    offsY: 0,
    __ctor: function(drawable, offsX, offsY) {
        this._super.Drawable.__ctor(drawable);
        this.drawable = drawable;
        this.offsX = offsX;
        this.offsY = offsY;
    },
    __dtor: function() {
        dispose(this.drawable);
    },
    draw: function(g, x, y, width = null, height = null) {
        width = width !== null && width !== void 0 ? width : this.width;
        height = height !== null && height !== void 0 ? height : this.height;
        this.drawable.draw(g, x + this.offsX + (width - this.width) * 0.5, y + this.offsY + (height - this.height) * 0.5, this.width, this.height);
    }
});
Recycler.createPool($f2a87ce0e4ca782b$var$Centered, 512);
/**
 * Static drawable.
 */ const $f2a87ce0e4ca782b$var$Static = $f2a87ce0e4ca782b$var$Drawable.extend({
    className: 'DrawableStatic',
    drawable: null,
    offsX: 0,
    offsY: 0,
    __ctor: function(drawable, offsX, offsY) {
        this._super.Drawable.__ctor(drawable);
        this.drawable = drawable;
        this.offsX = offsX;
        this.offsY = offsY;
    },
    __dtor: function() {
        dispose(this.drawable);
    },
    draw: function(g, x, y, width = null, height = null) {
        this.drawable.draw(g, x + this.offsX, y + this.offsY, width, height);
    }
});
Recycler.createPool($f2a87ce0e4ca782b$var$Static, 512);
/**
 * Drawable group.
 */ const $f2a87ce0e4ca782b$var$Group = $f2a87ce0e4ca782b$var$Drawable.extend({
    className: 'DrawableGroup',
    list: null,
    __ctor: function(list) {
        this._super.Drawable.__ctor();
        this.list = list;
        this.width = 0;
        this.height = 0;
        for(let i = 0; i < this.list.length; i++){
            if (this.list[i].width > this.width) this.width = this.list[i].width;
            if (this.list[i].height > this.height) this.height = this.list[i].height;
        }
        this.swidth = this.width;
        this.sheight = this.height;
    },
    __dtor: function() {
        if (this.list !== null) {
            for(let i = 0; i < this.list.length; i++)dispose(this.list[i]);
            this.list = null;
        }
    },
    draw: function(g, x, y, width = null, height = null) {
        for(let i = 0; i < this.list.length; i++)this.list[i].draw(g, x, y, width, height);
    },
    render: function(g, elem) {
        for(let i = 0; i < this.list.length; i++)this.list[i].render(g, elem);
    }
});
Recycler.createPool($f2a87ce0e4ca782b$var$Group, 512);
/**
 * Drawable made with a composition of tiles from a nine-slice spritesheet to create a rectangle.
 * !static nineSlice (spritesheet: Spritesheet, startingIndex?:number|0) : Drawable;
 */ $f2a87ce0e4ca782b$var$Drawable.nineSlice = function(spritesheet, startingIndex = 0) {
    return $f2a87ce0e4ca782b$var$NineSlice.Pool.alloc(spritesheet, startingIndex);
};
/**
 * Drawable made with a composition of tiles from a nine-slice spritesheet to create a rectangle.
 * !nineSlice (startingIndex?:number|0) : Drawable;
 */ $f2a87ce0e4ca782b$var$Drawable.prototype.nineSlice = function(startingIndex = 0) {
    return $f2a87ce0e4ca782b$var$NineSlice.Pool.alloc(this, startingIndex);
};
/**
 * Drawable tiles to the target size.
 * !static repeated (drawable: Drawable) : Drawable;
 */ $f2a87ce0e4ca782b$var$Drawable.repeated = function(drawable) {
    return $f2a87ce0e4ca782b$var$Repeated.Pool.alloc(drawable);
};
/**
 * Drawable tiles to the target size.
 * !repeated () : Drawable;
 */ $f2a87ce0e4ca782b$var$Drawable.prototype.repeated = function() {
    return $f2a87ce0e4ca782b$var$Repeated.Pool.alloc(this);
};
/**
 * Drawable clipped to the target size.
 * !static clipped (drawable: Drawable) : Drawable;
 */ $f2a87ce0e4ca782b$var$Drawable.clipped = function(drawable) {
    return $f2a87ce0e4ca782b$var$Clipped.Pool.alloc(drawable);
};
/**
 * Drawable clipped to the target size.
 * !clipped () : Drawable;
 */ $f2a87ce0e4ca782b$var$Drawable.prototype.clipped = function() {
    return $f2a87ce0e4ca782b$var$Clipped.Pool.alloc(this);
};
/**
 * Drawable centered to the target rectangle.
 * !static centered (drawable: Drawable, offsX?: number, offsY?: number) : Drawable;
 */ $f2a87ce0e4ca782b$var$Drawable.centered = function(drawable, offsX, offsY) {
    return $f2a87ce0e4ca782b$var$Centered.Pool.alloc(drawable, offsX, offsY);
};
/**
 * Drawable centered to the target rectangle.
 * !centered (offsX?: number, offsY?: number) : Drawable;
 */ $f2a87ce0e4ca782b$var$Drawable.prototype.centered = function(offsX, offsY) {
    return $f2a87ce0e4ca782b$var$Centered.Pool.alloc(this, offsX, offsY);
};
/**
 * Drawable as-is without stretching it.
 * !static static (drawable: Drawable, offsX?: number, offsY?: number) : Drawable;
 */ $f2a87ce0e4ca782b$var$Drawable.static = function(drawable, offsX, offsY) {
    return $f2a87ce0e4ca782b$var$Static.Pool.alloc(drawable, offsX, offsY);
};
/**
 * Drawable as-is without stretching it.
 * !static (offsX?: number, offsY?: number) : Drawable;
 */ $f2a87ce0e4ca782b$var$Drawable.prototype.static = function(offsX, offsY) {
    return $f2a87ce0e4ca782b$var$Static.Pool.alloc(this, offsX, offsY);
};
/**
 * Creates a drawable group.
 * !static group (...args: Array<Drawable>) : Drawable;
 */ $f2a87ce0e4ca782b$var$Drawable.group = function(...args) {
    return $f2a87ce0e4ca782b$var$Group.Pool.alloc(args);
};
//!/class
//!namespace Drawable
//!namespace Pool
/**
	 * Allocates a drawable object.
	 * !function alloc () : Drawable;
	 */ Recycler.createPool($f2a87ce0e4ca782b$var$Drawable, 512);
var $f2a87ce0e4ca782b$export$2e2bcd8739ae039 = $f2a87ce0e4ca782b$var$Drawable;


var $5e304c8eb49413df$export$2e2bcd8739ae039 = $f2a87ce0e4ca782b$export$2e2bcd8739ae039.extend({
    className: 'DrawableResource',
    r: null,
    __ctor: function(r) {
        if (r.type !== 'image') throw new Error('Resource is not an image.');
        this._super.Drawable.__ctor(r.data, r.width, r.height);
        this.r = r;
        this.r.wrapper = this;
    }
});




var //![import "../system/canvas"]
$e9bde19fe1534480$export$2e2bcd8739ae039 = $f2a87ce0e4ca782b$export$2e2bcd8739ae039.extend({
    className: 'DrawableCustom',
    __ctor: function(r) {
        if (r.type != 'object') throw new Error('Resource is not an object.');
        this._super.Drawable.__ctor(null, r.width, r.height);
        this.r = r;
        this.r.wrapper = this;
    },
    init: function(callback) {
        $f7388fefeedc4aac$export$2e2bcd8739ae039.renderImage(this.r.width, this.r.height, (g)=>{
            if (this.r.draw !== null && typeof this.r.draw === 'function') this.r.draw(g, this.r);
            else {
                g.fillStyle(this.r.color);
                g.fillRect(0, 0, this.r.width, this.r.height);
            }
        }, (img)=>{
            this.resource = img;
            this.swidth = this.resource.width;
            this.sheight = this.resource.height;
            callback();
        });
    }
});



/*
	If source is "image":
		config: {
			sheetWidth: int, frameWidth: int, frameHeight: int?, numFrames: int?
			--OR--
			numFrames: int, frameWidth: int, frameHeight: int?
		}

	If source is "images":
		config: {
			frameWidth: int, frameHeight: int
		}
		
	NOTE: The sheetWidth, frameWidth and frameHeight should reflect the real image size. The system will automatically scale it if the source image is smaller/bigger.
*/ const $8f2a3604cf4d3a90$var$FrameDrawable = $f2a87ce0e4ca782b$export$2e2bcd8739ae039.extend({
    spritesheet: null,
    frameIndex: 0,
    __ctor: function(spritesheet, frameIndex) {
        this._super.Drawable.__ctor(null, spritesheet.width, spritesheet.height);
        this.spritesheet = spritesheet;
        this.frameIndex = frameIndex;
        this.width = spritesheet.width;
        this.height = spritesheet.height;
        this.swidth = spritesheet.frameWidth;
        this.sheight = spritesheet.frameHeight;
    }
});
var $8f2a3604cf4d3a90$export$2e2bcd8739ae039 = $f2a87ce0e4ca782b$export$2e2bcd8739ae039.extend({
    className: 'Spritesheet',
    numCols: 0,
    numFrames: 0,
    frameCache: null,
    __ctor: function(r) {
        this._super.Drawable.__ctor();
        if (r.type != 'image' && r.type != 'images') throw new Error('Resource is not a sprite sheet.');
        var r_scale, v_scale;
        if (r.type == 'image') {
            if (!r.config.sheetWidth && (!r.config.numFrames || !r.config.frameWidth)) throw new Error(r.resName + ': required sheetWidth or numFrames+frameWidth');
            if (!r.config.sheetWidth) r.config.sheetWidth = r.width; //r.config.numFrames * r.config.frameWidth;
            if (!r.config.frameHeight) r.config.frameHeight = r.data.height;
            r_scale = r.data.width / r.config.sheetWidth;
            v_scale = r.width / r.config.sheetWidth;
        } else {
            if (!r.config) r.config = {};
            if (!r.config.frameWidth) r.config.frameWidth = r.data[0].width;
            if (!r.config.frameHeight) r.config.frameHeight = r.data[0].height;
            r_scale = r.data[0].data.width / r.config.frameWidth;
            v_scale = r.data[0].width / r.config.frameWidth;
        }
        // Physical frame dimensions.
        this.frameWidth = r.config.frameWidth * r_scale;
        this.frameHeight = r.config.frameHeight * r_scale;
        // Logical frame dimensions.
        this.width = r.config.frameWidth * v_scale;
        this.height = r.config.frameHeight * v_scale;
        if (r.type == 'image') {
            this.numCols = int(r.data.width / this.frameWidth);
            this.numRows = Math.ceil(r.data.height / this.frameHeight);
            this.numFrames = r.config.numFrames || this.numCols * this.numRows;
        } else {
            this.numCols = this.numRows = 0;
            this.numFrames = r.data.length;
        }
        this.frameCache = {};
        this.r = r;
        this.r.wrapper = this;
        // Preload frameCache.
        for(let i = 0; i < this.numFrames; i++)this.getFrame(i);
    },
    getFrame: function(x, y = null) {
        let frameIndex = y !== null ? y * this.numCols + x : x;
        if (frameIndex < 0 || frameIndex >= this.numFrames) throw new Error('frameIndex out of range');
        if (this.frameCache[frameIndex]) return this.frameCache[frameIndex];
        let frameObject = new $8f2a3604cf4d3a90$var$FrameDrawable(this, frameIndex);
        if (this.numCols != 0) {
            frameObject.sy = int(frameIndex / this.numCols) * this.frameHeight;
            frameObject.sx = frameIndex % this.numCols * this.frameWidth;
            frameObject.resource = this.r.data;
        } else frameObject.resource = this.r.data[frameIndex].data;
        return this.frameCache[frameIndex] = frameObject;
    },
    getImage: function() {
        return this.getFrame(0).getImage();
    },
    getDrawable: function() {
        return this.getFrame(0);
    }
});


parcelRequire("hNLgQ");





const $f36c5f2b0736caac$export$c35d437ae5945fcd = $f2a87ce0e4ca782b$export$2e2bcd8739ae039.extend({
    className: 'Animation',
    seq: null,
    seq_i: 0,
    trans: null,
    trans_i: 0,
    trans_t: null,
    queue: null,
    fps: 0,
    frameSeconds: 0,
    time: 0,
    frameNumber: -1,
    finished: false,
    _paused: false,
    finishedCallback: null,
    finishedCallbackHandler: null,
    finishedCallbackContext: null,
    frameCallback: null,
    __ctor: function(anim, seq, fps) {
        this._super.Drawable.__ctor(anim.getImage(), anim.width, anim.height);
        this.anim = anim;
        this.queue = $f6bd4ab8b6c953de$export$2e2bcd8739ae039.Pool.alloc();
        this.seq = seq;
        this.seq_i = 0;
        this.trans = null;
        this.trans_i = 0;
        this.trans_t = null;
        this.frameNumber = -1;
        this.finished = false;
        this._paused = false;
        this.finishedCallback = null;
        this.finishedCallbackHandler = null;
        this.finishedCallbackContext = null;
        this.frameCallback = null;
        this.fps = fps;
        this.setFps(this.seq.fps || this.fps);
    },
    __dtor: function() {
        this.queue.free();
        if (this.finishedCallbackHandler) this.finishedCallbackHandler.free();
        if (this.finishedCallbackContext) this.finishedCallbackContext.free();
    },
    setFps: function(fps) {
        this.frameSeconds = 1.0 / fps;
        this.time = 0;
        return this;
    },
    paused: function(value = null) {
        if (value === null) return this._paused;
        this._paused = value;
        return this;
    },
    initialDelay: function(dt) {
        this.time = -dt;
        return this;
    },
    onFinished: function(callback) {
        this.finishedCallback = callback;
        return this;
    },
    then: function(callback, context = null) {
        if (callback === false && this.finishedCallback === this.thenCallback) {
            this.finishedCallbackHandler.clear();
            this.finishedCallbackContext.clear();
        }
        if (!callback) return this;
        if (this.finishedCallback !== this.thenCallback) {
            this.finishedCallback = this.thenCallback;
            this.finishedCallbackHandler = $f6bd4ab8b6c953de$export$2e2bcd8739ae039.Pool.alloc();
            this.finishedCallbackContext = $f6bd4ab8b6c953de$export$2e2bcd8739ae039.Pool.alloc();
        }
        this.finishedCallbackHandler.push(callback);
        this.finishedCallbackContext.push(context);
        return this;
    },
    thenCallback: function() {
        if (!this.finishedCallbackHandler.length) return false;
        let context = this.finishedCallbackContext.shift();
        this.finishedCallbackHandler.shift()(this, context);
    },
    onFrame: function(fn) {
        this.frameCallback = fn;
        return this;
    },
    setFrame: function(i) {
        this.seq_i = int(i) % this.seq.group.length;
        return this;
    },
    getFrame: function(normalized) {
        return normalized === true ? this.seq_i / (this.seq.group.length - 1) : this.seq_i;
    },
    getLength: function() {
        return this.seq.group.length;
    },
    draw: function(g, x = 0, y = 0, width = null, height = null) {
        if (this.time < 0) {
            if (!this._paused) {
                this.time += this.frameNumber === $c5f44d8482fd28c9$export$2e2bcd8739ae039.frameNumber ? 0 : $c5f44d8482fd28c9$export$2e2bcd8739ae039.frameDelta;
                this.frameNumber = $c5f44d8482fd28c9$export$2e2bcd8739ae039.frameNumber;
            }
            if (this.time > 0) this.time = 0;
            return;
        }
        if (this.seq_i === this.seq.group.length) {
            let t = this.seq.group[this.seq_i - 1];
            if (g !== null) for(let i = 0; i < t.length; i++)this.anim.getFrame(t[i]).draw(g, x, y, width, height);
            return;
        }
        let t = this.seq.group[this.seq_i];
        if (g !== null) for(let i = 0; i < t.length; i++)this.anim.getFrame(t[i]).draw(g, x, y, width, height);
        if (!this._paused) {
            this.time += this.frameNumber === $c5f44d8482fd28c9$export$2e2bcd8739ae039.frameNumber ? 0 : $c5f44d8482fd28c9$export$2e2bcd8739ae039.frameDelta;
            this.frameNumber = $c5f44d8482fd28c9$export$2e2bcd8739ae039.frameNumber;
        }
        if (this.time >= this.frameSeconds) {
            const frameIndex = this.seq_i;
            this.time -= this.frameSeconds;
            this.seq_i++;
            if (this.seq_i === this.seq.group.length) {
                if (this.trans != null) {
                    if (++this.trans_i === this.trans.length) {
                        this.trans = null;
                        this.seq = this.trans_t;
                    } else this.seq = this.trans[this.trans_i];
                    this.setFps(this.seq.fps || this.fps);
                    this.seq_i = 0;
                    this.time = 0;
                    this.finished = false;
                } else {
                    if (this.seq.loop) this.seq_i = 0;
                    else {
                        this.finished = true;
                        if (this.finishedCallback) {
                            if (this.finishedCallback(this) === false) this.finishedCallback = null;
                        }
                    }
                    if (this.queue.length) this.use(this.queue.shift(), true);
                }
            }
            if (this.frameCallback) {
                if (this.frameCallback(frameIndex, this.seq.group.length - 1, this) === false) this.frameCallback = null;
            }
        }
    },
    getImage: function() {
        return this.anim.getImage();
    },
    getDrawable: function() {
        return this;
    },
    advance: function() {
        this.paused(false);
        this.draw(null, 0, 0);
    },
    getSequenceName: function() {
        return (this.trans === null ? this.seq : this.trans_t).name;
    },
    use: function(seqName, force = false) {
        let seq = this.trans === null ? this.seq : this.trans_t;
        if (seq.name === seqName && !this.finished && force !== true) return false;
        if (seq.trans && seq.trans[seqName]) {
            this.trans_t = this.anim.a.seq[seqName];
            this.trans = seq.trans[seqName];
            this.trans_i = 0;
            this.seq = this.trans[this.trans_i];
        } else {
            if (force === true) this.trans = null;
            this.seq = this.anim.a.seq[seqName];
        }
        this.setFps(this.seq.fps || this.fps);
        this.seq_i = 0;
        this.time = 0;
        this.finished = false;
        return true;
    },
    play: function(name) {
        this.use(name);
        return this;
    },
    setQueue: function(list) {
        if (!$f6bd4ab8b6c953de$export$2e2bcd8739ae039.isInstance(list)) throw new Error('setQueue: Parameter must be an instance of List');
        if (this.queue != null) this.queue.clear().free();
        this.queue = list;
        this.use(this.queue.shift(), true);
    },
    enqueue: function(seqName, force = false) {
        let seq = this.trans === null ? this.seq : this.trans_t;
        let lastName = this.queue.length > 0 ? this.queue[this.queue.length - 1] : seq.name;
        if (seq.name === seqName && seq.loop) return this;
        if (lastName === seqName && !force) return this;
        if (seq.loop || this.finished) {
            this.use(seqName, true);
            return this;
        }
        this.queue.push(seqName);
        return this;
    }
});
$1fea8365818f3b22$export$2e2bcd8739ae039.createPool($f36c5f2b0736caac$export$c35d437ae5945fcd);
var /* ********************************************************** */ $f36c5f2b0736caac$export$2e2bcd8739ae039 = $8f2a3604cf4d3a90$export$2e2bcd8739ae039.extend({
    className: 'SpritesheetAnimation',
    defaultDrawable: null,
    sharedAnim: null,
    r: null,
    a: null,
    __ctor: function(r) {
        if (!r.anim) throw new Error("Animation descriptors not found.");
        this._super.Spritesheet.__ctor(r);
        this.r = r;
        this.r.wrapper = this;
        let t = this.a = this.r.anim;
        if (t.initialized) return;
        if (!t.def) t.def = 'def';
        if (!t.seq) t.seq = {};
        // Create default sequence if it wasn't defined.
        if (!t.seq[t.def] && (t.def == 'def' || t.def == 'defloop')) {
            let p = {
                loop: t.def == 'def' ? false : true,
                group: []
            };
            for(let i = 0; i < this.numFrames; i++)p.group.push([
                i
            ]);
            t.seq[t.def] = p;
        }
        if (!t.seq[t.def]) throw new Error('Undefined default sequence: ' + t.def);
        if (!t.fps) t.fps = 25;
        t.def = t.seq[t.def];
        let frameIndex = 0;
        for(let i in t.seq){
            t.seq[i].name = i;
            if (!t.seq[i].loop) t.seq[i].loop = false;
            if (typeof t.seq[i].group == 'string') {
                let a, b, c;
                if (t.seq[i].group.indexOf(' ') != -1) {
                    a = t.seq[i].group.split(' ');
                    t.seq[i].group = [];
                    for(let j in a)t.seq[i].group.push([
                        int(a[j])
                    ]);
                } else if (t.seq[i].group.indexOf('-') != -1) {
                    c = t.seq[i].group.split('-');
                    a = int(c[0]);
                    b = int(c[1]);
                    t.seq[i].group = [];
                    if (a < b) for(c = a; c <= b; c++)t.seq[i].group.push([
                        c
                    ]);
                    else for(c = a; c >= b; c--)t.seq[i].group.push([
                        c
                    ]);
                } else {
                    a = int(t.seq[i].group);
                    t.seq[i].group = [];
                    while(a--)t.seq[i].group.push([
                        frameIndex++
                    ]);
                }
                t.seq[i].count = t.seq[i].group.length;
            }
        }
        if (t.trans) for(let i1 in t.trans){
            t.seq[i1].trans = t.trans[i1];
            for(let j in t.trans[i1])for(let k = 0; k < t.trans[i1][j].length; k++){
                let n = t.trans[i1][j][k];
                if (!t.seq[n]) throw new Error('Undefined sequence: ' + n);
                t.trans[i1][j][k] = t.seq[n];
            }
        }
        t.initialized = true;
    },
    getSharedAnimation: function(initialseq = null) {
        if (this.sharedAnim === null) {
            this.sharedAnim = $f36c5f2b0736caac$export$c35d437ae5945fcd.Pool.alloc(this, initialseq ? this.a.seq[initialseq] : this.a.def, this.a.fps);
            this.sharedAnim.lockInstance(true);
            return this.sharedAnim;
        }
        return this.sharedAnim.play(initialseq ? initialseq : this.a.def.name);
    },
    getAnimation: function(initialseq = null, fps = null) {
        return $f36c5f2b0736caac$export$c35d437ae5945fcd.Pool.alloc(this, initialseq ? this.a.seq[initialseq] : this.a.def, fps || this.a.fps);
    },
    getSequence: function(name) {
        return this.a.seq[name];
    },
    getDrawable: function() {
        if (this.defaultDrawable === null) this.defaultDrawable = this.getAnimation();
        return this.defaultDrawable;
    }
});



var $hNLgQ = parcelRequire("hNLgQ");

var //![import "../system/canvas"]
/*
	font: {
		sheetWidth: int?, charWidth: int, charHeight: int, charset: string, widths: [char, width, ...],
		reverseDraw: bool?, paddingX: int?, paddingY: int?, spacingX: int?, spacingY: int?
	}
*/ $f6c02b81225f9dbf$export$2e2bcd8739ae039 = $hNLgQ.Class.extend({
    __ctor: function(r) {
        if (r.type != 'image' || !r.font) throw new Error('Resource is not a sprite font.');
        if (!r.font.sheetWidth) r.font.sheetWidth = r.width;
        let r_scale = r.data.width / r.font.sheetWidth;
        let v_scale = r.width / r.font.sheetWidth;
        this.r_charWidth = r.font.charWidth * r_scale;
        this.r_charHeight = r.font.charHeight * r_scale;
        this.charWidth = r.font.charWidth * v_scale;
        this.charHeight = r.font.charHeight * v_scale;
        this.paddingX = (r.font.paddingX || 0) * v_scale;
        this.paddingY = (r.font.paddingY || 0) * v_scale;
        this.spacingX = (r.font.spacingX || 0) * v_scale;
        this.spacingY = (r.font.spacingY || 0) * v_scale;
        this.reverseDraw = r.font.reverseDraw || false;
        let cols = int(r.font.sheetWidth / r.font.charWidth);
        this.r = r;
        this.r.wrapper = this;
        let n = r.font.charset.length;
        let k = 0;
        let y = 0;
        this.charTable = {};
        while(k < n){
            let x = 0;
            for(let i = 0; i < cols && k < n; i++){
                let c = r.font.charset[k++];
                this.charTable[c] = {
                    hidden: false,
                    x: x,
                    y: y,
                    charWidth: this.charWidth,
                    r_charWidth: this.r_charWidth,
                    spacingX: 0
                };
                x += this.r_charWidth;
            }
            y += this.r_charHeight;
        }
        if (!(' ' in this.charTable)) this.charTable[' '] = {
            hidden: true,
            charWidth: int((this.charWidth + this.paddingX) * 2 / 3),
            r_charWidth: this.r_charWidth,
            spacingX: 0
        };
        if (!r.font.widths) return;
        n = r.font.widths.length;
        for(let i = 0; i < n; i += 2){
            let w = r.font.widths[i + 1] * v_scale;
            let s = r.font.widths[i];
            if (typeof s === 'number') s = String.fromCharCode(s);
            for(let j = 0; j < s.length; j++)if (s[j] in this.charTable) this.charTable[s[j]].spacingX = w - this.charTable[s[j]].charWidth;
        }
    },
    drawText: function(g, x, y, text) {
        let n = text.length;
        let pX = -2 * this.paddingX + this.spacingX;
        x -= this.paddingX;
        y -= this.paddingY;
        if (!this.reverseDraw) for(let i = 0; i < n; i++){
            let c = this.charTable[text[i]];
            if (!c) continue;
            if (!c.hidden) g.drawImage(this.r.data, c.x, c.y, c.r_charWidth, this.r_charHeight, x, y, c.charWidth, this.charHeight, null, null, c.charWidth, this.charHeight);
            x += c.charWidth + pX + c.spacingX;
        }
        else {
            for(let i = 0; i < n - 1; i++){
                let c = this.charTable[text[i]];
                if (!c) continue;
                x += c.charWidth + pX;
            }
            for(let i1 = n - 1; i1 >= 0; i1--){
                let c = this.charTable[text[i1]];
                if (!c) continue;
                if (!c.hidden) g.drawImage(this.r.data, c.x, c.y, c.r_charWidth, this.r_charHeight, x, y, c.charWidth, this.charHeight, null, null, c.charWidth, this.charHeight);
                x -= c.charWidth + pX + c.spacingX;
            }
        }
    },
    measureWidth: function(text) {
        let n = text.length;
        let x = 0;
        let pX = -2 * this.paddingX + this.spacingX;
        for(let i = 0; i < n; i++){
            let c = this.charTable[text[i]];
            if (!c) continue;
            x += c.charWidth + pX + c.spacingX;
        }
        return x;
    },
    measureHeight: function(text) {
        return this.charHeight - 2 * this.paddingY + this.spacingY;
    }
});
$f7388fefeedc4aac$export$2e2bcd8739ae039.prototype.drawText = function(r, x, y, text) {
    r.drawText(this, x, y, text);
};
$f7388fefeedc4aac$export$2e2bcd8739ae039.prototype.drawTextAligned = function(r, x, y, w, h, ax, ay, text) {
    if (ax == 0) x = x + (w - r.measureWidth(text) >> 1);
    else if (ax < 0) x = x - ax - 1;
    else if (ax > 0) x = x + w - ax + 1 - r.measureWidth(text);
    if (ay == 0) y = y + (h - r.measureHeight(text) >> 1);
    else if (ay < 0) y = y - ay - 1;
    else if (ay > 0) y = y + h - ay + 1 - r.measureHeight(text);
    r.drawText(this, x, y, text);
};
$f7388fefeedc4aac$export$2e2bcd8739ae039.prototype.drawTextAligned2 = function(r, bounds, ax, ay, text) {
    this.drawTextAligned(r, bounds.x1, bounds.y1, bounds.width(), bounds.height(), ax, ay, text);
};



var $hNLgQ = parcelRequire("hNLgQ");

var $hNLgQ = parcelRequire("hNLgQ");




//[import '../system/system']
//[import '../system/canvas']
//[import '../system/log']
const $0150c0894dfca188$var$Resources = {};
let $0150c0894dfca188$var$reported = false;
//!namespace Resources
//!type ConfigOptions =
/**
		 * Enables integer scaling. When enabled, calling `resizeImage` with `pixelated` parameter set to `true` will cause images to be resized to integer
		 * factors. When disabled, images will be resized using the half/double method to eventually end up reaching the exact target size.
		 *
		 * @default true
		 * !integerScalingEnabled?: boolean;
		 */ /**
		 * Default value for the `pixelated` parameter of image resources. Controls whether to use integer scaling when resizing images. Also controls the default
		 * scaling filter (LINEAR/NEAREST) the image will use when converted to a WebGL2 texture.
		 * 
		 * @default false
		 * !pixelated?: boolean;
		 */ /**
		 * Default value for the `filter` parameter of image resources. When an image does not have the `pixelated` property nor `filter`, this value will be used.
		 * 
		 * @default NEAREST
		 * !filter?: 'LINEAR'|'NEAREST';
		 */ /**
		 * Default value for the `original` parameter of image resources. When set to `true`, no resizing will take place on the image resource at all and the
		 * original will be used as-is.
		 * 
		 * @default false
		 * !original?: boolean;
		 */ //!/type
//!/namespace
//:/**
//: * Provides functionality to load and manipulate resources (images, audio, etc).
//: */
//!class Resources
Object.assign($0150c0894dfca188$var$Resources, {
    /**
	 * Enables integer scaling. When enabled, calling `resizeImage` with `pixelated` parameter set to `true` will cause images to be resized to integer
	 * factors. When disabled, images will be resized using the half/double method to eventually end up reaching the exact target size.
	 *
	 * @default true
	 * !static integerScalingEnabled: boolean;
	 */ integerScalingEnabled: true,
    /**
	 * Default value for the `pixelated` parameter of image resources. Controls whether to use integer scaling when resizing images. Also controls the default
	 * scaling filter (LINEAR/NEAREST) the image will use when converted to a WebGL2 texture.
	 * 
	 * @default false
	 * !static pixelated: boolean;
	 */ pixelated: false,
    /**
	 * Default value for the `filter` parameter of image resources. When an image does not have the `pixelated` property nor `filter`, this value will be used.
	 * 
	 * @default LINEAR
	 * !static filter: 'LINEAR'|'NEAREST';
	 */ filter: 'LINEAR',
    /**
	 * Default value for the `original` parameter of image resources. When set to `true`, no resizing will take place on the image resource at all and the
	 * original will be used as-is.
	 * 
	 * @default false
	 * !static original: boolean;
	 */ original: false,
    /**
	 * Configures the resources object with the specified options.
	 * !static config (options: Resources.ConfigOptions) : void;
	 */ config: function(opts) {
        if (opts !== null) Object.assign(this, opts);
    },
    /**
	 * Loads a list of resources. The list parameter is actually a dictionary with objects as shown in the example below.
	 *
	 * { type: "image", wrapper: "", src: "assets/ui/btn-left.png", width: 64, \[ height: 64 \], scale: 1, pixelated: false, filter: null, original: false }
	 * { type: "images", wrapper: "", src: "assets/ui/##.png", count: 16, width: 64, \[ height: 64 \], pixelated: false }
	 * { type: "audio", wrapper: "", src: "assets/ui/tap.wav", track: "sfx|music" }
	 * { type: "audios", wrapper: "", src: "assets/ui/snd-##.wav", count: 4 }
	 * { type: "json", wrapper: "", src: "assets/config.json" }
	 * { type: "data", wrapper: "", src: "assets/config.dat" }
	 * { type: "text", wrapper: "", src: "assets/config.frag" }
	 * { type: "object", wrapper: "" }
	 * 
	 * @param list - Map of resources to load.
	 * @param progressCallback - Executed once for every resource loaded.
	 * @param completeCallback - Executed when all resources have been loaded.
	 * !static load (list: { \[id: string\] : object }, progressCallback: (index: number, count: number, ratio: number, name: string) => void, completeCallback: (list: { \[id: string\] : object }) => void) : void;
	 */ load: function(list, progressCallback, completeCallback, keyList, index) {
        if (!keyList) {
            keyList = Object.keys(list);
            for(let i in keyList)if (!('__loaded' in list[keyList[i]])) list[keyList[i]].__clone = $hNLgQ.Rinn.clone(list[keyList[i]]);
            index = 0;
        }
        while(index < keyList.length && '__loaded' in list[keyList[index]])index++;
        if (progressCallback) progressCallback(index, keyList.length, index / keyList.length, index < keyList.length ? keyList[index] : null);
        if (index == keyList.length) {
            if (completeCallback) completeCallback(list);
            return;
        }
        let r = list[keyList[index]];
        r.resName = keyList[index];
        switch(r.type){
            case "image":
                r.data = new Image();
                r.data.onload = function() {
                    var ratio = r.data.width / r.data.height;
                    if (r.scale) {
                        r.width = int(r.data.width * r.scale);
                        r.height = int(r.data.height * r.scale);
                    }
                    if (!r.hasOwnProperty('extraScale')) r.extraScale = 0.0;
                    if (!r.width && !r.height) {
                        r.width = r.data.width;
                        r.height = r.data.height;
                    } else if (r.width && !r.height) r.height = int(r.width / ratio);
                    else if (!r.width && r.height) r.width = int(ratio * r.height);
                    r.owidth = r.data.width;
                    r.oheight = r.data.height;
                    if (!r.hasOwnProperty('filter')) r.filter = !r.hasOwnProperty('pixelated') ? $0150c0894dfca188$var$Resources.filter : r.pixelated === true ? 'NEAREST' : $0150c0894dfca188$var$Resources.filter;
                    if (!r.hasOwnProperty('pixelated')) r.pixelated = $0150c0894dfca188$var$Resources.pixelated;
                    if (!r.hasOwnProperty('original')) r.original = $0150c0894dfca188$var$Resources.original;
                    if ((r.data.width != r.width || r.data.height != r.height || r.extraScale != 0.0) && r.original !== true) //let t = hrnow();//violet
                    r.data = $0150c0894dfca188$var$Resources.resizeImage(r, r.width * (r.extraScale + (r.pixelated ? $c5f44d8482fd28c9$export$2e2bcd8739ae039.integerScaleFactor : $c5f44d8482fd28c9$export$2e2bcd8739ae039.scaleFactor)), r.height * (r.extraScale + (r.pixelated ? $c5f44d8482fd28c9$export$2e2bcd8739ae039.integerScaleFactor : $c5f44d8482fd28c9$export$2e2bcd8739ae039.scaleFactor)), r.pixelated, true);
                    r.rscale = r.data.width / r.width;
                    r.data.rscale = r.rscale;
                    r.data.filter = r.filter;
                    r.data.targetWidth = r.width;
                    r.data.targetHeight = r.height;
                    // Pre-draw on an offscreen canvas, used to prevent a delay when rendering an image for the first time on some browsers.
                    $c5f44d8482fd28c9$export$2e2bcd8739ae039.tempDisplayBuffer.drawImage(r.data, 0, 0);
                    $c5f44d8482fd28c9$export$2e2bcd8739ae039.renderer.prepareImage(r.data);
                    $0150c0894dfca188$var$Resources.onLoaded(list, keyList[index], ()=>{
                        $0150c0894dfca188$var$Resources.load(list, progressCallback, completeCallback, keyList, index + 1);
                    });
                };
                r.data.onerror = function() {
                    console.error("Error: Unable to load: " + r.resName);
                };
                r.data.src = r.src + "?r=" + Math.random();
                break;
            case "images":
                let src = r.src;
                let d0 = src.indexOf("#");
                let d1 = src.lastIndexOf("#");
                let dN = d1 - d0 + 1;
                if (d0 == -1) {
                    console.error("Unable to load: " + r.resName + "\nError: The 'src' attribute requires one or more '#' marks.");
                    return;
                }
                if (!r.count) {
                    console.error("Unable to load: " + r.resName + "\nError: The 'count' attribute was not found.");
                    return;
                }
                r._i = 0;
                r.data = [];
                var cb = function() {
                    if (r._i == r.count) {
                        $0150c0894dfca188$var$Resources.onLoaded(list, keyList[index], ()=>{
                            $0150c0894dfca188$var$Resources.load(list, progressCallback, completeCallback, keyList, index + 1);
                        });
                        return;
                    }
                    // violet :add support for extraScale
                    var tmp = {
                        type: "image",
                        width: r.width,
                        height: r.height,
                        scale: r.scale
                    };
                    tmp.src = r.src.substr(0, d0) + ((r._i++) / Math.pow(10, dN)).toFixed(dN).substr(2) + r.src.substr(d1 + 1);
                    tmp.data = new Image();
                    tmp.resName = r.resName + "#" + (r._i - 1);
                    if (progressCallback) progressCallback(index, keyList.length, index / keyList.length + (r._i - 1) / r.count * (1 / keyList.length), r.resName + '/' + (r._i - 1));
                    tmp.data.onload = function() {
                        var ratio = tmp.data.width / tmp.data.height;
                        if (tmp.scale) {
                            tmp.width = int(tmp.data.width * tmp.scale);
                            tmp.height = int(tmp.data.height * tmp.scale);
                        }
                        if (!tmp.width && !tmp.height) {
                            tmp.width = tmp.data.width;
                            tmp.height = tmp.data.height;
                        } else if (tmp.width && !tmp.height) tmp.height = int(tmp.width / ratio);
                        else if (!tmp.width && tmp.height) tmp.width = int(ratio * tmp.height);
                        if (r._i == 1) {
                            r.owidth = tmp.data.width;
                            r.oheight = tmp.data.height;
                            if (!r.hasOwnProperty('filter')) r.filter = !r.hasOwnProperty('pixelated') ? $0150c0894dfca188$var$Resources.filter : r.pixelated === true ? 'NEAREST' : $0150c0894dfca188$var$Resources.filter;
                            if (!r.hasOwnProperty('pixelated')) r.pixelated = $0150c0894dfca188$var$Resources.pixelated;
                            if (!r.hasOwnProperty('original')) r.original = $0150c0894dfca188$var$Resources.original;
                        }
                        tmp.pixelated = r.pixelated;
                        tmp.filter = r.filter;
                        tmp.original = r.original;
                        if ((tmp.data.width != tmp.width || tmp.data.height != tmp.height) && tmp.original !== true) //let t = hrnow();//violet
                        tmp.data = $0150c0894dfca188$var$Resources.resizeImage(tmp, tmp.width * (r.pixelated ? $c5f44d8482fd28c9$export$2e2bcd8739ae039.integerScaleFactor : $c5f44d8482fd28c9$export$2e2bcd8739ae039.scaleFactor), tmp.height * (tmp.pixelated ? $c5f44d8482fd28c9$export$2e2bcd8739ae039.integerScaleFactor : $c5f44d8482fd28c9$export$2e2bcd8739ae039.scaleFactor), tmp.pixelated, true);
                        tmp.rscale = tmp.data.width / tmp.width;
                        tmp.data.rscale = tmp.rscale;
                        tmp.data.filter = tmp.filter;
                        tmp.data.targetWidth = tmp.width;
                        tmp.data.targetHeight = tmp.height;
                        if (r._i == 1) {
                            r.width = tmp.width;
                            r.height = tmp.height;
                            r.rscale = tmp.rscale;
                        }
                        $c5f44d8482fd28c9$export$2e2bcd8739ae039.tempDisplayBuffer.drawImage(tmp.data, 0, 0);
                        $c5f44d8482fd28c9$export$2e2bcd8739ae039.renderer.prepareImage(tmp.data);
                        r.data.push(tmp);
                        cb();
                    };
                    tmp.data.onerror = function() {
                        console.error("Error: Unable to load: " + tmp.resName);
                    };
                    tmp.data.src = tmp.src + "?r=" + Math.random();
                };
                cb();
                break;
            case "audio":
                if (!r.track) r.track = "sfx";
                if ($parcel$global.plugins && $parcel$global.plugins.NativeAudio && r.track == "sfx") {
                    if (!$0150c0894dfca188$var$reported) {
                        $d0de706be9d545de$export$2e2bcd8739ae039.write('ENGINE_NATIVEAUDIO');
                        $0150c0894dfca188$var$reported = true;
                    }
                    r.engine = $f6d10e9657762025$exports.Sound.ENGINE_NATIVEAUDIO;
                    r.data = "snd_" + index;
                    $parcel$global.plugins.NativeAudio.preloadSimple(r.data, r.src, function() {
                        $0150c0894dfca188$var$Resources.onLoaded(list, keyList[index], ()=>{
                            $0150c0894dfca188$var$Resources.load(list, progressCallback, completeCallback, keyList, index + 1);
                        });
                    }, function(e) {
                        console.error("Error: Unable to load (sfx): " + r.resName + "\n" + e);
                    });
                    break;
                }
                if ($parcel$global.audioContext) {
                    if (!$0150c0894dfca188$var$reported) {
                        $d0de706be9d545de$export$2e2bcd8739ae039.write('ENGINE_WEBAUDIO');
                        $0150c0894dfca188$var$reported = true;
                    }
                    r.engine = $f6d10e9657762025$exports.Sound.ENGINE_WEBAUDIO;
                    fetchAudioBuffer(r.src + "?r=" + Math.random()).then((audioBuffer)=>{
                        r.data = audioBuffer;
                        $0150c0894dfca188$var$Resources.onLoaded(list, keyList[index], ()=>{
                            $0150c0894dfca188$var$Resources.load(list, progressCallback, completeCallback, keyList, index + 1);
                        });
                    }).catch((err)=>{
                        console.error("Error: Unable to load: " + r.resName);
                    });
                    break;
                }
                if (!$0150c0894dfca188$var$reported) {
                    $d0de706be9d545de$export$2e2bcd8739ae039.write('ENGINE_HTML5');
                    $0150c0894dfca188$var$reported = true;
                }
                r.data = new Audio();
                r.engine = $f6d10e9657762025$exports.Sound.ENGINE_HTML5;
                r.data.oncanplaythrough = function() {
                    $0150c0894dfca188$var$Resources.onLoaded(list, keyList[index], ()=>{
                        $0150c0894dfca188$var$Resources.load(list, progressCallback, completeCallback, keyList, index + 1);
                    });
                };
                r.data.onerror = function() {
                    console.error("Error: Unable to load: " + r.resName);
                };
                r.data.src = r.src + "?r=" + Math.random();
                break;
            case "audios":
                var src1 = r.src;
                var d01 = src.indexOf("#");
                var d11 = src.lastIndexOf("#");
                var dN1 = d1 - d0 + 1;
                if (d0 == -1) {
                    console.error("Unable to load: " + r.resName + "\nError: The 'src' attribute requires one or more '#' marks.");
                    return;
                }
                if (!r.count) {
                    console.error("Unable to load: " + r.resName + "\nError: The 'count' attribute was not found.");
                    return;
                }
                r._i = 0;
                r.data = [];
                var cb = function() {
                    if (r._i == r.count) {
                        $0150c0894dfca188$var$Resources.onLoaded(list, keyList[index], ()=>{
                            $0150c0894dfca188$var$Resources.load(list, progressCallback, completeCallback, keyList, index + 1);
                        });
                        return;
                    }
                    var tmp = {
                        type: "audio",
                        track: r.track
                    };
                    tmp.src = r.src.substr(0, d0) + ((r._i++) / Math.pow(10, dN)).toFixed(dN).substr(2) + r.src.substr(d1 + 1);
                    tmp.resName = r.resName + "#" + (r._i - 1);
                    if (!tmp.track) tmp.track = "sfx";
                    if ($parcel$global.plugins && $parcel$global.plugins.NativeAudio && tmp.track == "sfx") {
                        tmp.engine = $f6d10e9657762025$exports.Sound.ENGINE_NATIVEAUDIO;
                        tmp.data = "snd_" + index + "_" + r._i;
                        $parcel$global.plugins.NativeAudio.preloadSimple(tmp.data, tmp.src, function() {
                            r.data.push(tmp);
                            cb();
                        }, function(e) {
                            console.error("Error: Unable to load (sfx): " + tmp.resName + "\n" + e);
                        });
                        return;
                    }
                    if ($parcel$global.audioContext) {
                        tmp.engine = $f6d10e9657762025$exports.Sound.ENGINE_WEBAUDIO;
                        fetchAudioBuffer(tmp.src + "?r=" + Math.random()).then((audioBuffer)=>{
                            tmp.data = audioBuffer;
                            r.data.push(tmp);
                            cb();
                        }).catch((err)=>{
                            console.error("Error: Unable to load: " + tmp.resName);
                        });
                        return;
                    }
                    tmp.data = new Audio();
                    tmp.engine = $f6d10e9657762025$exports.Sound.ENGINE_HTML5;
                    tmp.data.oncanplaythrough = function() {
                        r.data.push(tmp);
                        cb();
                    };
                    tmp.data.onerror = function() {
                        console.error("Error: Unable to load: " + tmp.resName);
                    };
                    tmp.data.src = tmp.src + "?r=" + Math.random();
                };
                cb();
                break;
            case "json":
                fetchd(r.src + "?r=" + Math.random(), {
                    responseType: 'json'
                }).then(function(json) {
                    r.data = json;
                    $0150c0894dfca188$var$Resources.onLoaded(list, keyList[index], ()=>{
                        $0150c0894dfca188$var$Resources.load(list, progressCallback, completeCallback, keyList, index + 1);
                    });
                }).catch(function(err) {
                    console.error("Error: Unable to load: " + r.resName + ". Error: " + err);
                });
                break;
            case "data":
                fetchd(r.src + "?r=" + Math.random()).then(function(arraybuffer) {
                    r.data = arraybuffer;
                    $0150c0894dfca188$var$Resources.onLoaded(list, keyList[index], ()=>{
                        $0150c0894dfca188$var$Resources.load(list, progressCallback, completeCallback, keyList, index + 1);
                    });
                }).catch(function(err) {
                    console.error("Error: Unable to load: " + r.resName + ". Error: " + err);
                });
                break;
            case "text":
                fetchd(r.src + "?r=" + Math.random()).then(function(arrayBuffer) {
                    r.data = String.fromCharCode.apply(null, new Uint8Array(arrayBuffer));
                    $0150c0894dfca188$var$Resources.onLoaded(list, keyList[index], ()=>{
                        $0150c0894dfca188$var$Resources.load(list, progressCallback, completeCallback, keyList, index + 1);
                    });
                }).catch(function(err) {
                    console.error("Error: Unable to load: " + r.resName + ". Error: " + err);
                });
                break;
            case "object":
                r.data = {};
                $0150c0894dfca188$var$Resources.onLoaded(list, keyList[index], ()=>{
                    $0150c0894dfca188$var$Resources.load(list, progressCallback, completeCallback, keyList, index + 1);
                });
                break;
        }
    },
    /**
	 * Unloads the specified list of resources.
	 * !static unload (list: { \[id: string\] : object }) : void;
	 */ unload: function(list) {
        var __original, i, j, i;
        throw new Error('IMPLEMENTED UNLOAD!');
    },
    /**
	 * Executes post-load actions on a resource.
	 */ onLoaded: function(list, index, callback) {
        let r = list[index];
        if (!r.wrapper || !(r.wrapper in $f6d10e9657762025$exports)) {
            callback();
            return;
        }
        list[index] = new $f6d10e9657762025$exports[r.wrapper](r);
        if ('init' in list[index]) list[index].init(()=>{
            list[index].__loaded = true;
            callback();
        });
        else {
            list[index].__loaded = true;
            callback();
        }
    },
    /**
	 * Resizes the given image to the specified size.
	 * !static resizeImage (image: HTMLImageElement, targetWidth: number, targetHeight: number, pixelated?: boolean, discardOriginal?: boolean) : HTMLImageElement;
	 */ resizeImage: function(image, dw, dh, pixelated, discardOriginal) {
        var sw = image.data.width;
        var sh = image.data.height;
        dw = int(dw);
        dh = int(dh);
        if (sw == dw && sh == dh) return image.data;
        if (!this.integerScalingEnabled && pixelated) pixelated = null;
        if (!pixelated) {
            pixelated = pixelated === null ? false : true;
            var temp = new $f7388fefeedc4aac$export$2e2bcd8739ae039({
                hidden: true,
                antialias: pixelated
            }).resize(sw, sh);
            temp.drawImage(image.data, 0, 0);
            while(true){
                var tw = sw >> 1;
                var th = sh >> 1;
                if (tw <= dw || th <= dh) break;
                var output = new $f7388fefeedc4aac$export$2e2bcd8739ae039({
                    hidden: true,
                    antialias: pixelated
                }).resize(tw, th);
                output.drawImage(temp.elem, 0, 0, tw, th);
                temp.dispose();
                sw = tw;
                sh = th;
                temp = output;
            }
            var output = new $f7388fefeedc4aac$export$2e2bcd8739ae039({
                hidden: true,
                antialias: pixelated
            }).resize(dw, dh);
            output.drawImage(temp.elem, 0, 0, dw, dh);
            temp.dispose();
            if (discardOriginal) dispose(image.data);
            return output.elem;
        } else {
            if (int(dw / sw) > 0) {
                var ratio = int(dw / sw + 0.9);
                dw = ratio * sw;
                dh = ratio * sh;
                var rep_x = dw / sw;
                var rep_y = dh / sh;
                var output = new $f7388fefeedc4aac$export$2e2bcd8739ae039({
                    hidden: true,
                    antialias: false
                }).resize(dw, dh);
                var temp = new $f7388fefeedc4aac$export$2e2bcd8739ae039({
                    hidden: true,
                    antialias: false
                }).resize(sw, sh);
                temp.drawImage(image.data, 0, 0);
                for(var j = 0; j < sh; j++){
                    var s = temp.getImageData(0, j, sw, 1).data;
                    var sp = 0;
                    for(var i = 0; i < sw && sp < s.length; i++, sp += 4){
                        output.fillStyle("rgba(" + s[sp] + "," + s[sp + 1] + "," + s[sp + 2] + "," + s[sp + 3] / 255 + ")");
                        output.fillRect(i * rep_x, j * rep_y, rep_x, rep_y);
                    }
                }
                temp.dispose();
                return output.elem;
            }
            return this.resizeImage(image, dw, dh, null, discardOriginal);
        }
    },
    /**
	 * Flips an image horizontally.
	 * !static flipImageHorz (image: HTMLImageElement) : HTMLImageElement;
	 */ flipImageHorz: function(image) {
        var temp = new $f7388fefeedc4aac$export$2e2bcd8739ae039({
            hidden: true
        }).resize(image.data.width, image.data.height);
        temp.translate(image.data.width, 0);
        temp.scale(-1, 1);
        temp.drawImage(image.data, 0, 0);
        return temp.elem;
    },
    /**
	 * Flips an image vertically.
	 * !static flipImageVert (image: HTMLImageElement) : HTMLImageElement;
	 */ flipImageVert: function(image) {
        var temp = new $f7388fefeedc4aac$export$2e2bcd8739ae039({
            hidden: true
        }).resize(image.data.width, image.data.height);
        temp.translate(0, image.data.height);
        temp.scale(1, -1);
        temp.drawImage(image.data, 0, 0);
        return temp.elem;
    },
    /**
	 * Forces the browser to show a download dialog.
	 * !static showDownload (filename: string, dataUrl: string) : void;
	 */ showDownload: function(filename, dataUrl) {
        var link = document.createElement("a");
        link.href = dataUrl;
        link.style.display = 'none';
        link.download = filename;
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },
    /**
	 * Forces the browser to show a file selection dialog.
	 * !static showFilePicker (allowMultiple: boolean, accept: string, callback: (files: Array<File>) => void) : void;
	 */ showFilePicker: function(allowMultiple, accept, callback) {
        var input = document.createElement("input");
        input.type = "file";
        input.accept = accept;
        input.style.display = 'none';
        input.multiple = allowMultiple;
        document.body.appendChild(input);
        input.onchange = function() {
            callback(input.files);
        };
        document.body.onfocus = function() {
            document.body.onfocus = null;
            document.body.removeChild(input);
        };
        input.click();
    },
    /**
	 * Loads a file using FileReader and returns the result as a dataURL.
	 * !static loadAsDataURL (file: File, callback: (dataUrl: string) => void) : void;
	 */ loadAsDataURL: function(file, callback) {
        var reader = new FileReader();
        reader.onload = function(e) {
            callback(e.target.result);
        };
        reader.readAsDataURL(file);
    },
    /**
	 * Loads a file using FileReader and returns the result as text.
	 * !static loadAsText (file: File, callback: (text: string) => void) : void;
	 */ loadAsText: function(file, callback) {
        var reader = new FileReader();
        reader.onload = function(e) {
            callback(e.target.result);
        };
        reader.readAsText(file);
    },
    /**
	 * Loads a file using FileReader and returns the result as an array buffer.
	 * !static loadAsArrayBuffer (file: File, callback: (buff: ArrayBuffer) => void) : void;
	 */ loadAsArrayBuffer: function(file, callback) {
        var reader = new FileReader();
        reader.onload = function(e) {
            callback(e.target.result);
        };
        reader.readAsArrayBuffer(file);
    },
    /**
	 * Loads an array of File objects using FileReader and returns them as data URLs.
	 * !static loadAllAsDataURL (fileList: Array<File>, callback: (urlList: Array<{name:string, size:number, url:string}>) => void) : void;
	 */ loadAllAsDataURL: function(fileList, callback) {
        var result = [];
        if (!fileList || !fileList.length) {
            callback(result);
            return;
        }
        var loadNext = function(i) {
            if (i == fileList.length) {
                callback(result);
                return;
            }
            $0150c0894dfca188$var$Resources.loadAsDataURL(fileList[i], function(url) {
                result.push({
                    name: fileList[i].name,
                    size: fileList[i].size,
                    url: url
                });
                loadNext(i + 1);
            });
        };
        loadNext(0);
    }
});
var //!/class
$0150c0894dfca188$export$2e2bcd8739ae039 = $0150c0894dfca188$var$Resources;


//![import "./resources"]
/*
	track: string (music|sfx)
*/ const $3172a43632fd2a5e$var$Sound = $hNLgQ.Class.extend({
    r: null,
    __ctor: function(r) {
        if (r.type != "audio") throw new Error("Resource is not audio.");
        this.r = r;
        this.r.wrapper = this;
        this.track = $3172a43632fd2a5e$var$Sound[this.r.track.toUpperCase()];
    },
    play: function(callback, volume) {
        return $3172a43632fd2a5e$var$Sound.play(this, callback, volume);
    },
    playLoop: function(callback, volume) {
        return $3172a43632fd2a5e$var$Sound.playLoop(this, callback, volume);
    }
});
$3172a43632fd2a5e$var$Sound.ENGINE_HTML5 = 1;
$3172a43632fd2a5e$var$Sound.ENGINE_WEBAUDIO = 2;
$3172a43632fd2a5e$var$Sound.ENGINE_NATIVEAUDIO = 3;
Object.assign($3172a43632fd2a5e$var$Sound, {
    MASTER: {
        enabled: true,
        volume: 1
    },
    SFX: {
        enabled: true,
        volume: 1
    },
    MUSIC: {
        enabled: true,
        volume: 0.8
    },
    VOICE: {
        enabled: true,
        volume: 1
    },
    MAX_POOL_SIZE: 100,
    pool: [],
    active: [],
    register: function(node) {
        if (node.registered) return;
        node.registered = true;
        this.active.push(node);
    },
    unregister: function(node) {
        if (!node.registered) return;
        node.registered = false;
        var i = $3172a43632fd2a5e$var$Sound.active.indexOf(node);
        if (i == -1) return;
        $3172a43632fd2a5e$var$Sound.active.splice(i, 1);
    },
    updateNode: function(node, cmd) {
        switch(node.snd.r.engine){
            case $3172a43632fd2a5e$var$Sound.ENGINE_WEBAUDIO:
                return this.updateNode_webaudio(node, cmd);
            case $3172a43632fd2a5e$var$Sound.ENGINE_NATIVEAUDIO:
                return this.updateNode_nativeaudio(node, cmd);
        }
        return this.updateNode_audio(node, cmd);
    },
    // Web Audio.
    alloc_webaudio: function(node) {
        node.gainNode = audioContext.createGain();
        node.gainNode.gain.value = 0;
        node.gainNode.connect(audioContext.destination);
        node.res = audioContext.createBufferSource();
        node.res.buffer = node.snd.r.data;
        node.res.loop = false;
        node.res.connect(node.gainNode);
        node.res.node = node;
    },
    free_webaudio: function(node) {
        if (!node.res) return;
        node.gainNode.disconnect();
        node.res = null;
        node.gainNode = null;
    },
    // Native Audio (Cordova plugin).
    alloc_nativeaudio: function(node) {
        node.res = true;
    },
    free_nativeaudio: function(node) {
        node.res = false;
    },
    // HTML5 Audio.
    alloc_audio: function(node) {
        if (!this.pool.length) item = node.cloneNode();
        else item = this.pool.pop();
        item._src = node.src;
        return item;
    },
    free_audio: function(node) {
        if (this.pool.length == this.MAX_POOL_SIZE) return;
        //BUG: This causes a GET request of "/null" on Chromium.
        //node.src = null;
        this.pool.push(node);
    },
    /* *********************** */ updateNode_webaudio: function(node, cmd) {
        if (!node) return null;
        var volume = $3172a43632fd2a5e$var$Sound.MASTER.volume * node.snd.track.volume * node.volume;
        switch(cmd){
            /* **************** */ case 'play':
                if (node.playing) break;
                if (!node.res) $3172a43632fd2a5e$var$Sound.alloc_webaudio(node);
                node.playTime = hrnow();
                node.playing = true;
                node.pause = false;
                node.res.onended = $3172a43632fd2a5e$var$Sound.onended_webaudio;
                node.gainNode.gain.value = volume;
                try {
                    node.res.start(0, node.startTime / 1000.0);
                } catch (e) {
                    $3172a43632fd2a5e$var$Sound.free_webaudio(node);
                    return null;
                }
                $3172a43632fd2a5e$var$Sound.register(node);
                break;
            /* **************** */ case 'setvolume':
                if (!node.res) break;
                node.gainNode.gain.value = volume;
                break;
            /* **************** */ case 'stop':
                if (!node.playing && node.paused) {
                    node.startTime = 0;
                    node.paused = false;
                    $3172a43632fd2a5e$var$Sound.free_webaudio(node);
                    if (node.callback) node.callback();
                    break;
                }
                if (!node.res) break;
                node.startTime = 0;
                node.playing = false;
                node.pause = false;
                node.res.onended = null;
                $3172a43632fd2a5e$var$Sound.unregister(node);
                node.res.stop();
                $3172a43632fd2a5e$var$Sound.free_webaudio(node);
                if (node.callback) node.callback();
                break;
            /* **************** */ case 'pause':
                if (!node.playing || !node.res) break;
                node.startTime += hrnow() - node.playTime;
                node.playing = false;
                node.pause = true;
                node.res.onended = null;
                $3172a43632fd2a5e$var$Sound.unregister(node);
                node.res.stop();
                $3172a43632fd2a5e$var$Sound.free_webaudio(node);
                break;
            /* **************** */ case 'softstop':
                if (!node.playing && node.paused) {
                    node.startTime = 0;
                    node.paused = false;
                    break;
                }
                if (!node.playing || !node.res) break;
                node.startTime = 0;
                node.playing = false;
                node.pause = false;
                node.res.loop = false;
                break;
        }
        return node;
    },
    onended_webaudio: function(e) {
        var node = e.currentTarget.node;
        if (node.playing && node.loop != 0) {
            $3172a43632fd2a5e$var$Sound.free_webaudio(node);
            if (node.loop != -1) node.loop--;
            node.startTime = 0;
            node.playing = false;
            node.pause = false;
            $3172a43632fd2a5e$var$Sound.updateNode_webaudio(node, 'play');
            return;
        }
        node.res.onended = null;
        node.res.volume = 0;
        $3172a43632fd2a5e$var$Sound.updateNode_webaudio(node, 'stop');
    },
    /* *********************** */ updateNode_nativeaudio: function(node, cmd) {
        if (!node) return null;
        switch(cmd){
            /* **************** */ case 'play':
                if (node.playing) break;
                if (!node.res) $3172a43632fd2a5e$var$Sound.alloc_nativeaudio(node);
                node.playing = true;
                node.pause = false;
                try {
                    $parcel$global.plugins.NativeAudio.play(node.snd.r.data, null, null, function() {
                        $3172a43632fd2a5e$var$Sound.onended_nativeaudio(node);
                    });
                } catch (e) {
                    $3172a43632fd2a5e$var$Sound.free_nativeaudio(node);
                    return null;
                }
                $3172a43632fd2a5e$var$Sound.register(node);
                break;
            /* **************** */ case 'setvolume':
                break;
            /* **************** */ case 'stop':
                if (!node.res) break;
                node.playing = false;
                node.pause = false;
                $3172a43632fd2a5e$var$Sound.unregister(node);
                $parcel$global.plugins.NativeAudio.stop(node.snd.r.data, null);
                $3172a43632fd2a5e$var$Sound.free_nativeaudio(node);
                if (node.callback) node.callback();
                break;
            /* **************** */ case 'pause':
                break;
            /* **************** */ case 'softstop':
                break;
        }
        return node;
    },
    onended_nativeaudio: function(node) {
        $3172a43632fd2a5e$var$Sound.updateNode_nativeaudio(node, 'stop');
    },
    updateNode_audio: function(node, cmd) {
        if (!node) return null;
        var volume = $3172a43632fd2a5e$var$Sound.MASTER.volume * node.snd.track.volume * node.volume;
        switch(cmd){
            /* **************** */ case 'play':
                if (node.playing) break;
                if (!node.res) {
                    node.res = $3172a43632fd2a5e$var$Sound.alloc_audio(node.snd.r.data);
                    node.res.node = node;
                    node.res.src = node.res._src;
                }
                node.playTime = hrnow();
                node.playing = true;
                node.pause = false;
                node.res.onended = $3172a43632fd2a5e$var$Sound.onended_audio;
                node.res.currentTime = node.startTime / 1000.0;
                node.res.volume = volume;
                try {
                    node.res.play();
                } catch (e) {
                    $3172a43632fd2a5e$var$Sound.free_audio(node.res);
                    node.res = null;
                    return null;
                }
                $3172a43632fd2a5e$var$Sound.register(node);
                break;
            /* **************** */ case 'setvolume':
                if (!node.res) break;
                node.res.volume = volume;
                break;
            /* **************** */ case 'stop':
                if (!node.playing && node.paused) {
                    node.startTime = 0;
                    node.paused = false;
                    $3172a43632fd2a5e$var$Sound.free_audio(node.res);
                    node.res = null;
                    if (node.callback) node.callback();
                    break;
                }
                if (!node.res) break;
                node.startTime = 0;
                node.playing = false;
                node.pause = false;
                $3172a43632fd2a5e$var$Sound.unregister(node);
                node.res.pause();
                $3172a43632fd2a5e$var$Sound.free_audio(node.res);
                node.res = null;
                if (node.callback) node.callback();
                break;
            /* **************** */ case 'pause':
                if (!node.playing || !node.res) break;
                node.startTime += hrnow() - node.playTime;
                node.playing = false;
                node.pause = true;
                $3172a43632fd2a5e$var$Sound.unregister(node);
                node.res.pause();
                break;
            /* **************** */ case 'softstop':
                if (!node.playing && node.paused) {
                    node.startTime = 0;
                    node.paused = false;
                    break;
                }
                if (!node.playing || !node.res) break;
                node.startTime = 0;
                node.playing = false;
                node.pause = false;
                break;
        }
        return node;
    },
    onended_audio: function(e) {
        var node = e.currentTarget.node;
        if (node.playing && node.loop != 0) {
            if (node.loop != -1) node.loop--;
            node.startTime = 0;
            node.playing = false;
            node.pause = false;
            $3172a43632fd2a5e$var$Sound.updateNode_audio(node, 'play');
            return;
        }
        node.res.onended = null;
        node.res.volume = 0;
        $3172a43632fd2a5e$var$Sound.updateNode_audio(node, 'stop');
    },
    /* *************************************** */ /* PUBLIC */ enableTrack: function(track) {
        if (!track) return;
        track.enabled = true;
    },
    disableTrack: function(track) {
        if (!track) return;
        track.enabled = false;
    },
    setVolume: function(track, value) {
        if (!track) return;
        track.volume = value;
    },
    createNode: function(snd, volume) {
        var node = {};
        node.startVolume = volume;
        node.volume = volume;
        node.snd = snd;
        node.loop = 0;
        node.playing = false;
        node.paused = false;
        node.startTime = 0;
        node.playTime = 0;
        node.callback = null;
        node.timer = null;
        node.res = null;
        return node;
    },
    play: function(snd, completeCallback, volume) {
        if (!this.MASTER.enabled || !snd || !snd.track.enabled) return null;
        var volume = volume !== undefined && volume !== null ? volume : 1.0;
        var node = this.createNode(snd, volume);
        node.callback = completeCallback;
        return this.updateNode(node, 'play');
    },
    playLoop: function(snd, completeCallback, volume) {
        if (!this.MASTER.enabled || !snd || !snd.track.enabled) return null;
        volume = volume !== undefined && volume !== null ? volume : 1.0;
        var node = this.createNode(snd, volume);
        node.callback = completeCallback;
        node.loop = -1;
        return this.updateNode(node, 'play');
    },
    stop: function(node, callback) {
        if (!node) return null;
        if (callback && callback !== true) node.callback = callback;
        return this.updateNode(node, callback === true ? 'stop' : 'softstop');
    },
    pause: function(node) {
        if (!node) return null;
        return this.updateNode(node, 'pause');
    },
    resume: function(node) {
        if (!node) return null;
        return this.updateNode(node, 'play');
    },
    fadeOut: function(node, millis, callback) {
        if (!node) return;
        if (!node.playing || node.timer) {
            if (callback) callback();
            return;
        }
        var startTime = hrnow();
        node.startVolume = node.volume;
        node.timer = setInterval(function() {
            var t = (hrnow() - startTime) / millis;
            if (t > 1) t = 1;
            node.volume = node.startVolume * (1 - t);
            $3172a43632fd2a5e$var$Sound.updateNode(node, 'setvolume');
            if (t == 1) {
                clearInterval(node.timer);
                node.timer = null;
                if (callback === true) $3172a43632fd2a5e$var$Sound.updateNode(node, 'stop');
                else $3172a43632fd2a5e$var$Sound.updateNode(node, 'pause');
                if (callback && callback !== true) callback();
            }
        }, 50);
    },
    fadeIn: function(node, millis, callback) {
        if (!node) return;
        if (node.playing || node.timer) {
            if (callback) callback();
            return;
        }
        var startTime = hrnow();
        node.volume = 0;
        this.updateNode(node, 'play');
        node.timer = setInterval(function() {
            var t = (hrnow() - startTime) / millis;
            if (t > 1) t = 1;
            node.volume = node.startVolume * t;
            $3172a43632fd2a5e$var$Sound.updateNode(node, 'setvolume');
            if (t == 1) {
                clearInterval(node.timer);
                node.timer = null;
                if (callback) callback();
            }
        }, 50);
    }
});
/**
 * 	Creates a descriptor for an audio resource.
 */ $0150c0894dfca188$export$2e2bcd8739ae039.Audio = function(src, opts = null) {
    return {
        type: "audio",
        wrapper: "Sound",
        src: src,
        ...opts
    };
};
var $3172a43632fd2a5e$export$2e2bcd8739ae039 = $3172a43632fd2a5e$var$Sound;



var $hNLgQ = parcelRequire("hNLgQ");

var //![import "./sound.js"]
/*
	track: string (music|sfx)
	mode: sequential|random
*/ $ade7aa17730395b7$export$2e2bcd8739ae039 = $hNLgQ.Class.extend({
    r: null,
    __ctor: function(r) {
        if (r.type != "audios") throw new Error("Resource is not audios.");
        this.r = r;
        this.r.wrapper = this;
        if (!this.r.track) this.r.track = "sfx";
        if (!this.r.mode) this.r.mode = "random";
        this.track = $3172a43632fd2a5e$export$2e2bcd8739ae039[this.r.track.toUpperCase()];
        this.sounds = [];
        this.lastIndex = -1;
        for(var i = 0; i < this.r.data.length; i++)this.sounds.push(new $3172a43632fd2a5e$export$2e2bcd8739ae039(Object.assign(this.r.data[i], {
            track: this.r.track
        })));
    },
    getRandomSound: function() {
        if (this.r.mode == "random") return this.sounds[randr(0, this.sounds.length - 1)];
        this.lastIndex = ++this.lastIndex % this.sounds.length;
        return this.sounds[this.lastIndex];
    },
    play: function(callback, volume) {
        return $3172a43632fd2a5e$export$2e2bcd8739ae039.play(this.getRandomSound(), callback, volume);
    },
    playLoop: function(callback, volume) {
        return $3172a43632fd2a5e$export$2e2bcd8739ae039.playLoop(this.getRandomSound(), callback, volume);
    },
    playAt: function(index, callback, volume) {
        return $3172a43632fd2a5e$export$2e2bcd8739ae039.play(this.sounds[index % this.sounds.length], callback, volume);
    },
    playLoopAt: function(index, callback, volume) {
        return $3172a43632fd2a5e$export$2e2bcd8739ae039.playLoop(this.sounds[index % this.sounds.length], callback, volume);
    }
});


const $f6d10e9657762025$export$f35845279390eafd = $5e304c8eb49413df$export$2e2bcd8739ae039;
const $f6d10e9657762025$export$922ad9063d3cdee8 = $e9bde19fe1534480$export$2e2bcd8739ae039;
const $f6d10e9657762025$export$674d2eb4debbef0c = $8f2a3604cf4d3a90$export$2e2bcd8739ae039;
const $f6d10e9657762025$export$7faa71ea66a694bb = $f36c5f2b0736caac$export$2e2bcd8739ae039;
const $f6d10e9657762025$export$e1896ac0c4970221 = $f6c02b81225f9dbf$export$2e2bcd8739ae039;
const $f6d10e9657762025$export$85990f0f98a390bb = $3172a43632fd2a5e$export$2e2bcd8739ae039;
const $f6d10e9657762025$export$bc40a15752ef9732 = $ade7aa17730395b7$export$2e2bcd8739ae039;








var $hNLgQ = parcelRequire("hNLgQ");
var //!class PriorityQueue
$6cb3980136ee15d8$export$2e2bcd8739ae039 = $hNLgQ.Class.extend({
    className: 'PriorityQueue',
    queue: null,
    queueKeys: null,
    order: null,
    /**
	 * 	Constructs an priority queue.
	 * 	!constructor();
	 */ __ctor: function() {
        this.queue = {};
        this.queueKeys = [];
    },
    /**
	 * 	Adds an object to the priority queue.
	 * 	!add (obj: object) : object;
	 */ add: function(object) {
        if (object == null) return null;
        if (!('priority' in object)) object.priority = 50;
        if (!(object.priority in this.queue)) {
            this.queue[object.priority] = {
                is_dirty: false,
                list: []
            };
            this.queueKeys.push(object.priority);
            this.order = Object.keys(this.queue).sort((a, b)=>a - b
            );
        }
        if (this.queue[object.priority].list.indexOf(object) === -1) this.queue[object.priority].list.push(object);
        return object;
    },
    /**
	 * 	Marks an object to be removed from the priority queue. Use `cleanup` to actually remove them.
	 * 	!remove (obj: object) : object;
	 */ remove: function(object) {
        if (object == null) return null;
        if (!('priority' in object)) object.priority = 50;
        if (!(object.priority in this.queue)) return object;
        let i = this.queue[object.priority].list.indexOf(object);
        if (i === -1) return object;
        this.queue[object.priority].is_dirty = true;
        this.queue[object.priority].list[i] = null;
        return object;
    },
    /**
	 * 	Runs a cleanup of the queue by removing any objects marked to be removed.
	 * 	!cleanup() : void;
	 */ cleanup: function() {
        for(let i = 0; i < this.queueKeys.length; i++){
            let q = this.queue[this.queueKeys[i]];
            if (!q.is_dirty) continue;
            for(let j = 0; j < q.list.length; j++)if (q.list[j] == null) q.list.splice(j--, 1);
            q.is_dirty = false;
        }
    },
    /**
	 * 	Runs the specified callback for each object in the queue. Executed in order of priority (from low number to high number).
	 * 	@param callback - Return `false` to stop the forEach execution immediately.
	 * 	!forEach (callback: (obj: object) => boolean) : void;
	 */ forEach: function(callback) {
        let is_dirty = false;
        let is_complete = false;
        for(let i = 0; !is_complete && i < this.order.length; i++){
            let list = this.queue[this.order[i]].list;
            for(let j = 0; !is_complete && j < list.length; j++){
                if (list[j] != null) {
                    if (callback(list[j]) === false) is_complete = true;
                }
                if (list[j] == null) is_dirty = true;
            }
        }
        if (is_dirty) this.cleanup();
    },
    /**
	 * 	Runs the specified callback for each object in the queue. Executed in reverse order of priority (from high number to low number).
	 * 	@param callback - Return `false` to stop the forEachRev execution immediately.
	 * 	!forEachRev (callback: (obj: object) => boolean) : void;
	 */ forEachRev: function(callback) {
        let is_dirty = false;
        let is_complete = false;
        for(let i = this.order.length - 1; !is_complete && i >= 0; i--){
            let list = this.queue[this.order[i]].list;
            for(let j = list.length - 1; !is_complete && j >= 0; j--){
                if (list[j] != null) {
                    if (callback(list[j]) === false) is_complete = true;
                }
                if (list[j] == null) is_dirty = true;
            }
        }
        if (is_dirty) this.cleanup();
    },
    /**
	 * 	Runs the specified callback for each object in the queue. Executed in order of priority (from low number to high number). When
	 * 	the cycle finishes the given `finishedCallback` will be executed.
	 * 	@param callback - Return `false` to stop the forEachAsync execution immediately. Must manually execute `next` when finished.
	 * 	!forEachAsync (callback: (obj: object, next: Function) => boolean) : void;
	 */ forEachAsync: function(callback, finishedCallback = null) {
        let _ = this;
        let is_dirty = false;
        let is_complete = false;
        let i = -1;
        let j = -1;
        let list = null;
        let next_j = function() {
            j++;
            if (!is_complete && j < list.length) {
                if (list[j] != null) {
                    if (callback(list[j], next_j) === false) is_complete = true;
                }
                if (list[j] == null) is_dirty = true;
                if (is_complete) next_j();
            } else next_i();
        };
        let next_i = function() {
            i++;
            if (!is_complete && i < _.order.length) {
                list = _.queue[_.order[i]].list;
                j = -1;
                next_j();
            } else {
                if (is_dirty) _.cleanup();
                if (finishedCallback) finishedCallback();
            }
        };
        next_i();
    },
    /**
	 * 	Runs the specified callback for each object in the queue. Executed in reverse order of priority (from high number to low number). When
	 * 	the cycle finishes the given `finishedCallback` will be executed.
	 * 	@param callback - Return `false` to stop the forEachRevAsync execution immediately. Must manually execute `next` when finished.
	 * 	!forEachRevAsync (callback: (obj: object, next: Function) => boolean) : void;
	 */ forEachRevAsync: function(callback) {
        alert('NOT IMPLEMENTED: forEachRevAsync');
    }
});



var $hNLgQ = parcelRequire("hNLgQ");


var $hNLgQ = parcelRequire("hNLgQ");

//![import "./recycler"]
//:/**
//: * 	Defines a callback node. Contains a callback function, and up to six arguments.
//: */
//!class Callback
const $c66a01e7b0ed95e9$var$Callback = $hNLgQ.Class.extend({
    className: 'Callback',
    /*
	**	Callback function.
	*/ callback: null,
    /*
	**	Optional arguments.
	*/ arg0: null,
    arg1: null,
    arg2: null,
    arg3: null,
    arg4: null,
    arg5: null,
    /*
	**	Link to the previous and next callback.
	*/ prev: null,
    next: null,
    /**
	 * 	Initializes the callback with the specified arguments.
	 * 	!constructor (callback: Function, arg0?: any, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any);
	 */ __ctor: function(callback, arg0 = null, arg1 = null, arg2 = null, arg3 = null, arg4 = null, arg5 = null) {
        this.callback = callback;
        this.arg0 = arg0;
        this.arg1 = arg1;
        this.arg2 = arg2;
        this.arg3 = arg3;
        this.arg4 = arg4;
        this.arg5 = arg5;
        this.prev = null;
        this.next = null;
    },
    /*
	**	Destructs the instance.
	*/ __dtor: function() {
        this.callback = null;
        this.arg0 = null;
        this.arg1 = null;
        this.arg2 = null;
        this.arg3 = null;
        this.arg4 = null;
        this.arg5 = null;
        this.prev = null;
        this.next = null;
    },
    /*
	**	Returns true if the specified arguments are the same as the callback. Compares from left to right. All null values are ignored.
	*/ isEqual: function(callback = null, arg0 = null, arg1 = null, arg2 = null, arg3 = null, arg4 = null, arg5 = null) {
        if (callback !== null && $c66a01e7b0ed95e9$var$Callback.isInstance(callback)) return callback === this;
        if (callback !== null && this.callback !== callback) return false;
        if (arg0 !== null && this.arg0 !== arg0) return false;
        if (arg1 !== null && this.arg1 !== arg1) return false;
        if (arg2 !== null && this.arg2 !== arg2) return false;
        if (arg3 !== null && this.arg3 !== arg3) return false;
        if (arg4 !== null && this.arg4 !== arg4) return false;
        if (arg5 !== null && this.arg5 !== arg5) return false;
        return true;
    },
    /**
	 * 	Executes the callback. Returns `false` if the callback has finished and should be removed.
	 * 	@param host - Host object.
	 * 	!exec (host: Object) : boolean;
	 */ exec: function(host) {
        if (this.callback !== null) return this.callback(host, this.arg0, this.arg1, this.arg2, this.arg3, this.arg4, this.arg5);
        return true;
    }
});
//!/class
//!namespace Callback
//!namespace Pool
/**
 * 	Allocates a callback with the specified arguments.
 * 	!function alloc (callback: Function, arg0?: any, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any) : Callback;
 */ $1fea8365818f3b22$export$2e2bcd8739ae039.createPool($c66a01e7b0ed95e9$var$Callback, 16384, 6144);
var $c66a01e7b0ed95e9$export$2e2bcd8739ae039 = $c66a01e7b0ed95e9$var$Callback;


//![import "./recycler"]
//![import "./callback"]
//:/**
//: * 	The handler class allows zero or more callbacks to be attached, such that when the `exec` method of the handler is invoked, all attached callbacks will also be executed.
//: */
//!class Handler
const $628f585857a65401$var$Handler = $hNLgQ.Class.extend({
    className: 'Handler',
    /**
	 * 	Handler host element or value.
	 * 	!host: any;
	 */ host: null,
    /**
	 * 	Top and bottom of the linked list.
	 */ top: null,
    bottom: null,
    /**
	 * 	Initializes the Handler instance.
	 * 	!constructor (host?: any);
	 */ __ctor: function(host = null) {
        this.host = host;
        this.top = null;
        this.bottom = null;
        return this;
    },
    /*
	**	Removes all callbacks from the handler.
	*/ __dtor: function() {
        this.remove();
    },
    /**
	 * 	Adds the specified callback to the handler.
	 * 	!add (callback: Function, arg0?: any, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any) : Callback;
	 */ add: function(callback, arg0 = null, arg1 = null, arg2 = null, arg3 = null, arg4 = null, arg5 = null) {
        let node = $c66a01e7b0ed95e9$export$2e2bcd8739ae039.isInstance(callback) ? callback : $c66a01e7b0ed95e9$export$2e2bcd8739ae039.Pool.alloc(callback, arg0, arg1, arg2, arg3, arg4, arg5);
        node.prev = this.bottom;
        if (this.bottom !== null) this.bottom.next = node;
        this.bottom = node;
        if (this.top === null) this.top = node;
        return node;
    },
    /**
	 * 	Unlinks a callback from the handler.
	 * 	!unlink (node: Callback) : Handler;
	 */ unlink: function(node) {
        if (node.prev) node.prev.next = node.next;
        if (node.next) node.next.prev = node.prev;
        if (this.top === node) this.top = node.next;
        if (this.bottom === node) this.bottom = node.prev;
        node.prev = null;
        node.next = null;
        dispose(node);
    },
    /**
	 * 	Removes all callbacks matching the specified arguments.
	 * 	!remove (callback?: Function, arg0?: any, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any) : Handler;
	 */ remove: function(callback = null, arg0 = null, arg1 = null, arg2 = null, arg3 = null, arg4 = null, arg5 = null) {
        if (callback !== null && $c66a01e7b0ed95e9$export$2e2bcd8739ae039.isInstance(callback)) {
            this.unlink(callback);
            return this;
        }
        let node = this.top;
        while(node !== null){
            let next = node.next;
            if (node.isEqual(callback, arg0, arg1, arg2, arg3, arg4, arg5)) this.unlink(node);
            node = next;
        }
        return this;
    },
    /**
	 * 	Returns the first callback matching the specified arguments.
	 * 	!find (callback: Function, arg0?: any, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any) : Callback;
	 */ find: function(callback, arg0 = null, arg1 = null, arg2 = null, arg3 = null, arg4 = null, arg5 = null) {
        let node = this.top;
        while(node !== null){
            if (node.isEqual(callback, arg0, arg1, arg2, arg3, arg4, arg5)) return node;
            node = node.next;
        }
        return null;
    },
    /**
	 * 	Executes all callbacks in the handler.
	 * 	!exec (host?: any) : void;
	 */ exec: function(host = null) {
        let node = this.top;
        host = host !== null && host !== void 0 ? host : this.host;
        while(node !== null){
            let next = node.next;
            if (node.exec(host) === false) this.unlink(node);
            node = next;
        }
    },
    /**
	 * 	Executes the first callback matching the specified arguments.
	 * 	!execf (callback?: Function, arg0?: any, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any) : void;
	 */ execf: function(callback = null, arg0 = null, arg1 = null, arg2 = null, arg3 = null, arg4 = null, arg5 = null) {
        let node = this.top;
        while(node !== null){
            let next = node.next;
            if (node.isEqual(callback, arg0, arg1, arg2, arg3, arg4, arg5)) {
                if (node.exec(this.host) === false) this.unlink(node);
                break;
            }
            node = next;
        }
    },
    /**
	 * 	Executes the specified callback.
	 * 	!execc (node: Callback, host?: any) : void;
	 */ execc: function(node, host = null) {
        if (node.exec(host !== null && host !== void 0 ? host : this.host) === false) this.unlink(node);
    }
});
//!/class
//!namespace Handler
//!namespace Pool
/**
 * 	Allocates a new handler instance.
 * 	!function alloc (host?: Object) : Handler;
 */ $1fea8365818f3b22$export$2e2bcd8739ae039.createPool($628f585857a65401$var$Handler, 16384, 6144);
var $628f585857a65401$export$2e2bcd8739ae039 = $628f585857a65401$var$Handler;




var $hNLgQ = parcelRequire("hNLgQ");

//![import "../utils/recycler"]
//![import "./vec2"]
//:/**
//: * 	Represents a 2D rectangle.
//: */
//!class Rect
const $a894a9381ffd6f0a$var$Rect = $hNLgQ.Class.extend({
    className: 'Rect',
    /**
	 * 	Coordinates of the rectangle (cx and cy are for the center). Note that this fields are readonly they should be
	 * 	modified through methods only.
	 */ /**
	 * 	!readonly cx: number;
	 */ cx: 0,
    /**
	 * 	!readonly cy: number;
	 */ cy: 0,
    /**
	 * 	!readonly x1: number;
	 */ x1: 0,
    /**
	 * 	!readonly y1: number;
	 */ y1: 0,
    /**
	 * 	!readonly x2: number;
	 */ x2: 0,
    /**
	 * 	!readonly y2: number;
	 */ y2: 0,
    /**
	 * 	Constructs a rectangle of zero size, centered at (0, 0).
	 * 	!constructor();
	 */ /**
	 * 	Constructs a rectangle centered at (0, 0) with the specified size.
	 * 	!constructor (width: number, height: number);
	 */ /**
	 * 	Constructs a rectangle with the specified coordinates.
	 * 	!constructor (x1: number, y1: number, x2: number, y2: number);
	 */ __ctor: function(x1 = null, y1 = null, x2 = null, y2 = null) {
        if (x1 === null) {
            this.x1 = this.y1 = this.x2 = this.y2 = this.cx = this.cy = 0;
            return this;
        }
        if (x2 === null) {
            this.set(0, 0, 0, 0);
            this.resize(x1, y1);
            return this;
        }
        return this.set(x1, y1, x2, y2);
    },
    /*
	**	Destructor.
	*/ __dtor: function() {},
    /**
	 * 	Returns a clone of the rectangle.
	 * 	!clone() : Rect;
	 */ clone: function() {
        return $a894a9381ffd6f0a$var$Rect.Rool.alloc(this.x1, this.y1, this.x2, this.y2);
    },
    /**
	 * 	Sets all coordinates of the rectangle to zero.
	 * 	!zero() : Rect;
	 */ zero: function() {
        this.cx = 0;
        this.cy = 0;
        this.x1 = 0;
        this.y1 = 0;
        this.x2 = 0;
        this.y2 = 0;
        return this;
    },
    /**
	 * 	Sets all coordinates of the rectangle to `null` for subsequent use with `extendWithPoint`.
	 * 	!reset() : Rect;
	 */ reset: function() {
        this.cx = null;
        this.cy = null;
        this.x1 = null;
        this.y1 = null;
        this.x2 = null;
        this.y2 = null;
        return this;
    },
    /**
	 * 	Extends the rectangle to contain the specified vector coordinates.
	 * 	!extendWithPoint (v: Vec2) : Rect;
	 */ /**
	 * 	Extends the rectangle to contain the specified point.
	 * 	!extendWithPoint (x: number, y: number) : Rect;
	 */ extendWithPoint: function(x, y = null) {
        if (y === null) {
            const r = x;
            x = r.x;
            y = r.y;
        }
        if (this.x1 === null || x < this.x1) this.x1 = x;
        if (this.y1 === null || y < this.y1) this.y1 = y;
        if (this.x2 === null || x > this.x2) this.x2 = x;
        if (this.y2 === null || y > this.y2) this.y2 = y;
        this.cx = (this.x1 + this.x2) / 2;
        this.cy = (this.y1 + this.y2) / 2;
        return this;
    },
    /**
	 * 	Translates the rectangle by the given deltas.
	 * 	!translate (dx: number, dy: number) : Rect;
	 */ translate: function(dx, dy) {
        this.x1 += dx;
        this.y1 += dy;
        this.x2 += dx;
        this.y2 += dy;
        this.cx += dx;
        this.cy += dy;
        return this;
    },
    /**
	 * 	Moves the center of the rectangle to the specified position.	 
	 * 	@param normalized - When `true` the arguments `x` and `y` are treated as normalized ranging from 0 to 1 (inclusive).
	 * 	!centerAt (x: number, y: number, normalized?: false) : Rect;
	 */ centerAt: function(x, y, normalized = false) {
        if (normalized == true) {
            x = this.x1 + x * (this.x2 - this.x1);
            y = this.y1 + y * (this.y2 - this.y1);
        }
        return this.translate(x - this.cx, y - this.cy);
    },
    /**
	 * 	Copies the coordinates of the specified rectangle.
	 * 	!set (r: Rect) : Rect;
	 */ /**
	 * 	Sets the coordinates of the rectangle.
	 * 	!set (x1: number, y1: number, x2: number, y2: number) : Rect;
	 */ set: function(x1, y1 = null, x2 = null, y2 = null) {
        if (y1 === null) {
            const r = x1;
            x1 = r.x1;
            y1 = r.y1;
            x2 = r.x2;
            y2 = r.y2;
        }
        this.cx = (x1 + x2) / 2;
        this.cy = (y1 + y2) / 2;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        return this;
    },
    /**
	 * 	Returns `true` if the given rectangle coordinates are equal.
	 * 	!equals (r: Rect) : boolean;
	 */ /**
	 * 	Returns `true` if the coordinates are equal.
	 * 	!equals (x1: number, y1: number, x2: number, y2: number) : boolean;
	 */ equals: function(x1, y1 = null, x2 = null, y2 = null) {
        if (y1 === null) {
            const r = x1;
            x1 = r.x1;
            y1 = r.y1;
            x2 = r.x2;
            y2 = r.y2;
        }
        return x1 == this.x1 && x2 == this.x2 && y1 == this.y1 && y2 == this.y2;
    },
    /**
	 * 	Returns `true` if the specified rectangle is contained in the current one.
	 * 	!contains (r: Rect) : boolean;
	 */ /**
	 * 	Returns `true` if the specified rectangle is contained in the current one.
	 * 	!contains (x1: number, y1: number, x2: number, y2: number) : boolean;
	 */ contains: function(x1, y1 = null, x2 = null, y2 = null) {
        if (y1 === null) {
            const r = x1;
            x1 = r.x1;
            y1 = r.y1;
            x2 = r.x2;
            y2 = r.y2;
        }
        return x1 == Math.max(this.x1, x1) && y1 == Math.max(this.y1, y1) && x2 == Math.min(this.x2, x2) && y2 == Math.min(this.y2, y2);
    },
    /**
	 * 	Sets the coordinates of the rectangle to the union of it and the given one.
	 * 	!setAsUnion (r: Rect) : Rect;
	 */ /**
	 * 	Sets the coordinates of the rectangle to the union of it and the given one.
	 * 	!setAsUnion (x1: number, y1: number, x2: number, y2: number) : Rect;
	 */ setAsUnion: function(x1, y1 = null, x2 = null, y2 = null) {
        if (y1 === null) {
            const r = x1;
            x1 = r.x1;
            y1 = r.y1;
            x2 = r.x2;
            y2 = r.y2;
        }
        this.x1 = Math.min(this.x1, x1);
        this.y1 = Math.min(this.y1, y1);
        this.x2 = Math.max(this.x2, x2);
        this.y2 = Math.max(this.y2, y2);
        return this;
    },
    /**
	 * 	Returns `true` if the rectangles intersect.
	 * 	!intersects (r: Rect) : boolean;
	 */ /**
	 * 	Returns `true` if the rectangles intersect.
	 * 	!intersects (x1: number, y1: number, x2: number, y2: number) : boolean;
	 */ intersects: function(x1, y1 = null, x2 = null, y2 = null) {
        if (y1 === null) {
            const r = x1;
            x1 = r.x1;
            y1 = r.y1;
            x2 = r.x2;
            y2 = r.y2;
        }
        let _x1 = Math.max(this.x1, x1);
        let _y1 = Math.max(this.y1, y1);
        let _x2 = Math.min(this.x2, x2);
        let _y2 = Math.min(this.y2, y2);
        return Math.max(0, _y2 - _y1) * Math.max(0, _x2 - _x1) > 0;
    },
    /**
	 * 	Sets the coordinates of the rectangle to the intersection of it and the given one.
	 * 	@returns Boolean indicating if the intersection is non-empty.
	 * 	!setAsIntersection (r: Rect) : boolean;
	 */ /**
	 * 	Sets the coordinates of the rectangle to the intersection of it and the given one.
	 * 	@returns Boolean indicating if the intersection is non-empty.
	 * 	!setAsIntersection (x1: number, y1: number, x2: number, y2: number) : boolean;
	 */ setAsIntersection: function(x1, y1 = null, x2 = null, y2 = null) {
        if (y1 === null) {
            const r = x1;
            x1 = r.x1;
            y1 = r.y1;
            x2 = r.x2;
            y2 = r.y2;
        }
        this.x1 = Math.max(this.x1, x1);
        this.y1 = Math.max(this.y1, y1);
        this.x2 = Math.min(this.x2, x2);
        this.y2 = Math.min(this.y2, y2);
        return Math.max(0, this.y2 - this.y1) * Math.max(0, this.x2 - this.x1) > 0;
    },
    /**
	 * 	Resizes the rectangle to the given size using its center or top-left corner as reference.
	 * 	@param topLeftRelative - When `true` reference will be top-left corner, set to `false` to use the center.
	 * 	@param normalized - When `true` the `w` and `h` will be treated as normalized ranging from 0 to 1 (inclusive).
	 * 	!resize (w: number, h: number, normalized?: boolean, topLeftRelative?: boolean) : Rect;
	 */ resize: function(w, h, topLeftRelative = false, normalized = false) {
        if (normalized == true) {
            w *= this.x2 - this.x1;
            h *= this.y2 - this.y1;
        }
        if (topLeftRelative == true) {
            this.x2 = this.x1 + w;
            this.y2 = this.y1 + h;
        } else {
            w /= 2;
            h /= 2;
            this.x1 = this.cx - w;
            this.y1 = this.cy - h;
            this.x2 = this.cx + w;
            this.y2 = this.cy + h;
        }
        return this;
    },
    /**
	 * 	Resizes the rectangle using the specified deltas, relative to its center or top-left corner.
	 * 	@param topLeftRelative - When `true` reference will be top-left corner, set to `false` to use the center.
	 * 	!resizeBy (dw: number, dh: number, topLeftRelative?: boolean) : Rect;
	 */ resizeBy: function(dw, dh, topLeftRelative = false) {
        if (topLeftRelative == true) {
            this.x2 += dw;
            this.y2 += dh;
        } else {
            dw /= 2;
            dh /= 2;
            this.x1 -= dw;
            this.y1 -= dh;
            this.x2 += dw;
            this.y2 += dh;
        }
        return this;
    },
    /**
	 * 	Returns the width of the rectangle.
	 * 	!width() : number;
	 */ width: function() {
        return this.x2 - this.x1;
    },
    /**
	 * 	Returns the height of the rectangle.	 
	 * 	!height() : number;
	 */ height: function() {
        return this.y2 - this.y1;
    },
    /**
	 * 	Returns the normalized center X-coordinate of the rectangle.
	 * 	!ncx() : number;
	 */ ncx: function() {
        return (this.cx - this.x1) / (this.x2 - this.x1);
    },
    /**
	 * 	Returns the normalized center Y-coordinate of the rectangle.
	 * 	!ncy() : number;
	 */ ncy: function() {
        return (this.cy - this.y1) / (this.y2 - this.y1);
    },
    /**
	 * 	Returns `true` if the rectangle is a right rectangle, that is: x1 < x2 and y1 < y2.
	 * 	!isRight() : boolean;
	 */ isRight: function() {
        return this.x1 <= this.x2 && this.y1 <= this.y2;
    },
    /**
	 * 	Returns `true` if the specified point is contained in the rectangle.
	 * 	@param tol - Used to specify a tolerance value (default is zero).
	 * 	!containsPoint (x: number, y: number, tol?: number) : boolean;
	 */ containsPoint: function(x, y, tol = 0) {
        return this.x1 - tol <= x && x <= this.x2 + tol && this.y1 - tol <= y && y <= this.y2 + tol;
    },
    /**
	 * 	Returns the area of the rectangle.
	 * 	@param strict - Indicates if the area is returned only if the rectangle is a right rectangle. 	 
	 * 	!area (strict?: boolean) : number;
	 */ area: function(strict) {
        return strict ? this.isRight() ? (this.y2 - this.y1) * (this.x2 - this.x1) : 0 : (this.y2 - this.y1) * (this.x2 - this.x1);
    },
    /**
	 * 	Sets the components of the rectangle to their rounded-down integer parts.
	 * 	!floor() : Rect;
	 */ floor: function() {
        this.x1 = Math.floor(this.x1);
        this.y1 = Math.floor(this.y1);
        this.x2 = Math.floor(this.x2);
        this.y2 = Math.floor(this.y2);
        this.cx = Math.floor(this.cx);
        this.cy = Math.floor(this.cy);
        return this;
    },
    /**
	 * 	Sets the components of the rectangle to their rounded-up integer parts.
	 * 	!ceil() : Rect;
	 */ ceil: function() {
        this.x1 = Math.ceil(this.x1);
        this.y1 = Math.ceil(this.y1);
        this.x2 = Math.ceil(this.x2);
        this.y2 = Math.ceil(this.y2);
        this.cx = Math.ceil(this.cx);
        this.cy = Math.ceil(this.cy);
        return this;
    },
    /**
	 * 	Returns the string representation of the rectangle.
	 * 	!toString() : string;
	 */ toString: function() {
        return "(" + this.x1.toFixed(2) + ", " + this.y1.toFixed(2) + ", " + this.x2.toFixed(2) + ", " + this.y2.toFixed(2) + ")";
    },
    /**
	 * 	Flattens the rectangle.
	 * 	!flatten() : Array<number>;
	 */ flatten: function() {
        return [
            this.x1,
            this.y1,
            this.x2,
            this.y2
        ];
    },
    /**
	 * 	Unflattens the rectangle.
	 * 	!unflatten(input: Array<number>) : Rect;
	 */ unflatten: function(o) {
        this.set(o[0], o[1], o[2], o[3]);
        return this;
    }
});
//!/class
//!namespace Rect
//!namespace Pool
/**
	 * 	Allocates a new rectangle of zero size.
	 * 	!function alloc() : Rect;
	 */ /**
	 * 	Allocates a new rectangle centered at (0, 0) with the specified size.
	 * 	!function alloc (width: number, height: number) : Rect;
	 */ /**
	 * 	Allocates a new rectangle with the specified coordinates.
	 * 	!function alloc (x1: number, y1: number, x2: number, y2: number) : Rect;
	 */ $1fea8365818f3b22$export$2e2bcd8739ae039.createPool($a894a9381ffd6f0a$var$Rect, 4096, 2048);
var $a894a9381ffd6f0a$export$2e2bcd8739ae039 = $a894a9381ffd6f0a$var$Rect;




var $hNLgQ = parcelRequire("hNLgQ");
//:/**
//: * 	Describes a function dependent of time (t-function), multiple sampling points (t,y) can be added, this class
//: * 	provides methods to access any value for a given time, or the integral of a time range.
//: */
//!class TFunction
const $414af195437ed39f$var$TFunction = $hNLgQ.Class.extend({
    className: 'TFunction',
    /**
	 * 	Contains the time values `t` in the t-function, for each time value there is a corresponding `y` and `f`.
	 * 	!t: Array<number>;
	 */ t: null,
    /**
	 * 	Contains the values (y) for each of the time values (t) in the t-function.
	 * 	!y: Array<number>;
	 */ y: null,
    /**
	 * 	Contains the easing function (f) for each of the time values (t).
	 * 	!f: Array< (t:number) => number >;
	 */ f: null,
    /**
	 * 	Constructs the time function.
	 * 	@param value - Initial value of the t-function for t=0, defaults to 0.
	 * 	!constructor (value?: number);
	 */ __ctor: function(value = 0) {
        this.reset(value);
    },
    /**
	 * 	Resets the t-function to its initial state.
	 * 	@param value - Initial value of the t-function for t=0. Default is 0.
	 * 	!reset (value?: number) : TFunction;
	 */ reset: function(value = 0) {
        this.t = [
            0
        ];
        this.y = [
            value
        ];
        this.f = [
            null
        ];
        return this;
    },
    /**
	 * 	Resets the t-function and copies data from the specified source.
	 * 	@param src - Source TFunction.
	 * 	@param t0 - Initial time, if none specified will be assumed to be the min time of the source.
	 * 	@param t1 - Final time, if none specified will be assumed to the the max time of the source.
	 * 	@returns A TFunction or `null` if the specified time range could not be resolved.
	 * 	!copyFrom (src: TFunction, t0: number, t1: number) : TFunction;
	 */ copyFrom: function(src, t0, t1) {
        this.t = [];
        this.y = [];
        this.f = [];
        if (t0 == null && t1 == null) {
            for(let i = 0; i < src.t.length; i++){
                this.t.push(src.t[i]);
                this.y.push(src.y[i]);
                this.f.push(src.f[i]);
            }
            return this;
        }
        if (t0 == null) t0 = src.t[0];
        if (t1 == null) t1 = src.t[src.t.length - 1];
        if (t0 < src.t[0]) t0 = src.t[0];
        let i0 = src.find(t0);
        let i1 = src.find(t1);
        if (i0 == null) return null;
        if (i1 == null) return null;
        if (src.t[i0] != t0) {
            this.set(t0, src.getAt(t0), src.f[i0]);
            i0++;
        }
        for(let i = i0; i <= i1; i++)this.set(src.t[i], src.y[i], src.f[i]);
        if (src.t[i1] != t1) {
            let dt = (t1 - src.t[i1]) / Math.ceil(Math.log(t1 - src.t[i1]));
            let t = this.t[this.t.length - 1];
            if (dt <= 0) dt = 1;
            dt = t1 - t; // Force just one step.
            while(t != t1){
                if (t + dt > t1) dt = t1 - t;
                t += dt;
                this.set(float4(t), src.getAt(t), src.f[i1]);
            }
        }
        return this;
    },
    /**
	 * 	Creates a new t-function with the same values as the current one.
	 * 	@param t0 - Initial time, if none specified will be assumed to be the min time of the source.
	 * 	@param t1 - Final time, if none specified will be assumed to the the max time of the source.
	 * 	!clone (t0: number, t1: number) : TFunction;
	 */ clone: function(t0, t1) {
        return new $414af195437ed39f$var$TFunction().copyFrom(this, t0, t1);
    },
    /**
	 * 	Returns the maximum time value in the t-function plus the given delta.
	 * 	@param delta - Delta value to add to the result.
	 * 	!endTime (delta?: number) : number;
	 */ endTime: function(delta = 0) {
        return this.t[this.t.length - 1] + delta;
    },
    /**
	 * 	Returns the start time of the t-function plus the given delta.
	 * 	@param delta - Delta value to add to the result.
	 * 	!startTime (delta?: number) : number;
	 */ startTime: function(delta = 0) {
        return this.t[0] + delta;
    },
    /**
	 * 	Finds the index of a sampling point whose sampling range contains the given time.
	 * 	@param time - Time value to search.
	 * 	@returns Index of the sampling point or `null` if not within range.
	 * 	!find (time: number) : number|null;
	 */ find: function(time) {
        if (time < this.t[0]) return null;
        const n = this.t.length;
        for(let i = 1; i < n; i++){
            if (time < this.t[i]) return i - 1;
        }
        return n - 1;
    },
    /**
	 * 	Sets a sampling point (t,y).
	 * 	@param t - Time value of the sampling point.
	 * 	@param y - Y-value for the given t.
	 * 	@param f - Easing function.
	 * 	!set (t: number, y: number, f?: (t: number) => number) : TFunction;
	 */ set: function(t, y, f = null) {
        let i = this.find(t);
        if (i == null) return false;
        if (this.t[i] == t) {
            this.y[i] = y;
            if (f != null) this.f[i] = f;
        } else {
            i++;
            this.t.splice(i, 0, t);
            this.y.splice(i, 0, y);
            this.f.splice(i, 0, f);
        }
        return true;
    },
    /**
	 * 	Returns the last Y-value in the t-function.
	 *	!get() : number;
	 */ get: function() {
        return this.y[this.y.length - 1];
    },
    /**
	 * 	Returns the Y-value in the t-function corresponding to some point in time (t).
	 * 	@param t - Time (t) value.
	 * 	!getAt (t: number) : number;
	 */ getAt: function(t) {
        let i0 = this.find(t);
        if (i0 == null) return 0;
        let i1 = i0 + 1;
        if (this.t[i0] == t || i1 >= this.t.length || this.y[i0] == this.y[i1] || this.f[i0] == null) return this.y[i0];
        if (this.f[i0] == null) return this.y[i0];
        let x = t;
        let x0 = this.t[i0];
        let x1 = this.t[i1];
        let y0 = this.y[i0];
        let y1 = this.y[i1];
        t = (x - x0) / (x1 - x0);
        t = this.f[i0](t);
        return t * y1 + (1 - t) * y0;
    },
    /**
	 * 	Returns the approximate definite integral of the t-function for the given time range.
	 * 	@param t0 - Initial time value, defaults to minimum time of the t-function.
	 * 	@param t1 - Final time value, defaults to the maximum time of the t-function.
	 * 	@param c0 - Constant of integration, defaults to 0.
	 * 	@returns Definite integral of t-function from t0 to t1.
	 * 	!integral (t0?: number, t1?: number, c0?: number) : number;
	 */ integral: function(t0 = null, t1 = null, c0 = 0) {
        if (t0 == null) t0 = this.t[0];
        if (t1 == null) t1 = this.t[this.t.length - 1];
        if (t0 < this.t[0]) t0 = this.t[0];
        let sign = 1;
        if (t0 > t1) {
            let tmp;
            tmp = t0;
            t0 = t1;
            t1 = tmp;
            sign = -1;
        }
        let accum = c0;
        for(let time = t0; time < t1;){
            let i0 = this.find(time);
            if (i0 == null) return 0;
            let i1 = i0 + 1;
            let x0 = Math.max(this.t[i0], time);
            let x1 = Math.min(i1 < this.t.length ? this.t[i1] : t1, t1);
            let y0 = this.getAt(x0);
            let y1 = this.getAt(x1);
            let dx = x1 - x0;
            let dy = y1 - y0;
            if (this.f[i0] == null) accum += y0 * dx;
            else accum += 0.5 * dy * (x1 + x0) - x0 * dy + y0 * dx;
            time += dx;
        }
        return sign * accum;
    },
    /**
	 * 	Returns the approximate definite second integral of the t-function for the given time range.
	 * 	@param t0 - Initial time value, defaults to minimum time of the t-function.
	 * 	@param t1 - Final time value, defaults to the maximum time of the t-function.
	 * 	@param c0 - Constant of integration, defaults to 0.
	 * 	@returns Definite second integral of t-function from t0 to t1.
	 * 	!integral (t0?: number, t1?: number, c0?: number) : number;
	 */ second_integral: function(t0 = null, t1 = null, c0 = 0) {
        if (t0 == null) t0 = this.t[0];
        if (t1 == null) t1 = this.t[this.t.length - 1];
        let a0 = $414af195437ed39f$var$TFunction.Temp1.copyFrom(this, this.t[0], t0).integrate(c0).integral();
        let a1 = $414af195437ed39f$var$TFunction.Temp2.copyFrom(this, this.t[0], t1).integrate(c0).integral();
        return a1 - a0;
    },
    /**
	 * 	Transforms the t-function to its integral. For every sampling range in the t-function their Y-value will be set to the integral
	 * 	of the sampling range plus any previous integrals.
	 *
	 * 	@param c0 - Constant of integration. Defaults to 0.
	 * 	!integrate (c0?: number) : TFunction;
	 */ integrate: function(c0 = 0) {
        let y = [];
        y.push(c0);
        for(let i = 1; i < this.t.length; i++)y.push(y[i - 1] + this.integral(this.t[i - 1], this.t[i]));
        this.y = y;
        return this;
    },
    /**
	 * 	Transforms the t-function Y-values to the accumulated sum of each Y-value plus the given c0.
	 * 	@param c0 - Initial value (defaults to 0).
	 * 	!accumulate(c0?: number) : TFunction;
	 */ accumulate: function(c0 = 0) {
        this.y[0] += c0;
        for(let i = 1; i < this.t.length; i++)this.y[i] += this.y[i - 1];
        return this;
    },
    /**
	 * 	Removes all sampling-points located before the given index.
	 *	!chopLeft (i: number) : TFunction;
	 */ chopLeft: function(i) {
        this.t.splice(0, i);
        this.f.splice(0, i);
        this.y.splice(0, i);
        return this;
    },
    /**
	 * 	Removes all sampling-points located after the given index.
	 * 	!chopRight (i: number) : TFunction;
	 */ chopRight: function(i) {
        this.t.splice(i + 1, this.t.length - i - 1);
        this.f.splice(i + 1, this.f.length - i - 1);
        this.y.splice(i + 1, this.y.length - i - 1);
        return this;
    },
    /**
	 * 	Maps the Y-value to other Y-values using the specified mapping function.
	 * 	@param fn - Receives parameters `y` (y-value), `t` (t-value), and `i` (index).
	 * 	!map (fn: (y: number, t: number, i: number) => number) : TFunction;
	 */ map: function(fn) {
        for(let i = 0; i < this.y.length; i++)this.y[i] = fn(this.y[i], this.t[i], i);
        return this;
    },
    /**
	 * 	Returns a string representation of the variable state.
	 * 	!toString (c0?: number) : string;
	 */ toString: function(c0 = 0) {
        let s = '';
        let n1 = 10;
        const pad = function(value, n, char) {
            value = value.toString();
            if (char == null) char = ' ';
            char = char[0];
            while(value.length < n)value += char;
            return value;
        };
        s += '\n';
        s += pad(' Time', n1) + ' ' + pad(' Value', n1) + ' ' + pad(' Integral', n1) + '\n';
        s += pad('', n1, '-') + ' ' + pad('', n1, '-') + ' ' + pad('', n1, '-') + '\n';
        for(let i = 0; i < this.t.length; i++)s += pad(' ' + float4(this.t[i]), n1) + ' ' + pad(' ' + float4(this.y[i]), n1) + ' ' + pad(' ' + float4(this.integral(this.t[0], this.t[i], c0)), n1) + '\n';
        return s;
    }
});
$414af195437ed39f$var$TFunction.Temp1 = new $414af195437ed39f$var$TFunction();
$414af195437ed39f$var$TFunction.Temp2 = new $414af195437ed39f$var$TFunction();
var $414af195437ed39f$export$2e2bcd8739ae039 = $414af195437ed39f$var$TFunction;



var $hNLgQ = parcelRequire("hNLgQ");


var $hNLgQ = parcelRequire("hNLgQ");

//![import "../utils/recycler"]
//![import "./vec2"]
//:/**
//: * 	Representation of a point in 2D space. The coordinate values are upscaled by a fixed number of bits to allow
//: * 	sub-pixel translations (internally), but the public values will always be integers.
//: */
//!class Point2
const $ba17a79a5d342faa$var$Point2 = $hNLgQ.Class.extend({
    className: 'Point2',
    /**
	 * 	Upscaled coordinates of the point.
	 * 	!readonly ux: number;
	 * 	!readonly uy: number;
	 */ ux: 0,
    uy: 0,
    /**
	 * 	Coordinates of the point.
	 * 	!readonly x: number;
	 * 	!readonly y: number;
	 */ x: 0,
    y: 0,
    /**
	 *	Constructs the Point2 instance from another Point2.
	 * 	!constructor (value: Point2);
	 */ /**
	 *	Constructs the Point2 instance from a Vec2.
	 * 	!constructor (value: Vec2);
	 */ /**
	 *	Constructs the Point2 instance with the specified coordinates.
	 * 	!constructor (x?: number, y?: number);
	 */ __ctor: function(x = null, y = null) {
        return this.set(x, y);
    },
    /**
	 *	Populates the downscaled coordinates.
	 */ downscale: function() {
        this.x = downscale(this.ux);
        this.y = downscale(this.uy);
        return this;
    },
    /**
	 * 	Clones the point coordinates into a new Point2 object.
	 * 	!clone() : Point2;
	 */ clone: function() {
        return $ba17a79a5d342faa$var$Point2.Pool.alloc(this);
    },
    /**
	 *	Sets the coordinates of the point from another Point2.
	 *	!set (value: Point2) : Point2;
	 */ /**
	 *	Sets the coordinates of the point from a Vec2 object.
	 *	!set (value: Vec2) : Point2;
	 */ /**
	 *	Sets the coordinates of the point.
	 *	@param upscaled - When `true` the specified values are assumed to have already been upscaled.
	 *
	 *	!set (x: number, y: number, upscaled?: boolean) : Point2;
	 */ set: function(x, y = null, upscaled = false) {
        if (x === null) {
            x = 0;
            y = 0;
        } else if (y === null) {
            if ($ba17a79a5d342faa$var$Point2.isInstance(x)) {
                y = x.uy;
                x = x.ux;
            } else {
                y = upscale(x.y);
                x = upscale(x.x);
            }
        } else if (!upscaled) {
            x = upscale(x);
            y = upscale(y);
        }
        this.ux = x;
        this.uy = y;
        return this.downscale(this);
    },
    /**
	 * 	Sets the X-coordinate of the point.
	 * 	!setX (x: number) : Point2;
	 */ setX: function(x) {
        this.ux = upscale(x);
        return this.downscale(this);
    },
    /**
	 * 	Sets the Y-coordinate of the point.
	 * 	!setY (y: number) : Point2;
	 */ setY: function(y) {
        this.uy = upscale(y);
        return this.downscale(this);
    },
    /**
	 * 	Sets the coordinates of the point to zero.
	 * 	!zero() : Point2;
	 */ zero: function() {
        return this.set(0, 0);
    },
    /**
	 * 	Returns true if the point coordinates are both zero.
	 * 	!isZero() : boolean;
	 */ isZero: function() {
        return this.x == 0 && this.y == 0;
    },
    /**
	 *	Returns true if the coordinates of the point have the same values as the given Point2.
	 *	!equals (value: Point2) : boolean;
	 */ /**
	 *	Returns true if the coordinates of the point have the same values as the given Vec2.
	 *	!equals (value: Vec2) : boolean;
	 */ /**
	 *	Returns true if the coordinates of the point have the same values as the given ones.
	 *	!equals (x: number, y: number) : boolean;
	 */ equals: function(x, y = null) {
        if (y === null) {
            if ($ba17a79a5d342faa$var$Point2.isInstance(x)) {
                y = x.y;
                x = x.x;
            } else {
                y = int(x.y);
                x = int(x.x);
            }
        } else {
            x = int(x);
            y = int(y);
        }
        return this.x == x && this.y == y;
    },
    /**
	 *	Adds the coordinates of the given Point2 to the point.
	 *	!add (value: Point2) : Point2;
	 */ /**
	 *	Adds the coordinates of the given Vec2 to the point.
	 *	!add (value: Vec2) : Point2;
	 */ /**
	 *	Adds the given delta values to the point.
	 *	@param upscaled - When `true` the specified values are assumed to have already been upscaled.
	 *	!add (dx: number, dy: number, upscaled?: boolean) : Point2;
	 */ add: function(dx, dy = null, upscaled = false) {
        if (dy === null) {
            if ($ba17a79a5d342faa$var$Point2.isInstance(dx)) {
                dy = dx.uy;
                dx = dx.ux;
            } else {
                dy = upscale(dx.y);
                dx = upscale(dx.x);
            }
        } else if (!upscaled) {
            dx = upscale(dx);
            dy = upscale(dy);
        }
        this.ux += dx, this.uy += dy;
        return this.downscale();
    },
    /**
	 *	Subtracts the coordinates of the given Point2 from the point.
	 *	!sub (value: Point2) : Point2;
	 */ /**
	 *	Subtracts the coordinates of the given Vec2 from the point.
	 *	!sub (value: Vec2) : Point2;
	 */ /**
	 *	Subtracts the given delta values from the point.
	 *	@param upscaled - When `true` the specified values are assumed to have already been upscaled.
	 *	!sub (dx: number, dy: number, upscaled?: boolean) : Point2;
	 */ sub: function(dx, dy, upscaled = false) {
        if (dy === null) {
            if ($ba17a79a5d342faa$var$Point2.isInstance(dx)) {
                dy = dx.uy;
                dx = dx.ux;
            } else {
                dy = upscale(dx.y);
                dx = upscale(dx.x);
            }
        } else if (!upscaled) {
            dx = upscale(dx);
            dy = upscale(dy);
        }
        this.ux -= dx, this.uy -= dy;
        return this.downscale();
    },
    /**
	 * 	Returns the string representation of the coordinates of the point.
	 * 	toString() : string;
	 */ toString: function() {
        return `(${this.x}, ${this.y})`;
    }
});
//!/class
//!namespace Point2
//!namespace Pool
/**
 *	Allocates a Point2 instance from another Point2.
 * 	!function alloc (value: Point2) : Point2;
 */ /**
 *	Allocates a Point2 instance from a Vec2.
 * 	!function alloc (value: Vec2) : Point2;
 */ /**
 *	Allocates a Point2 instance with the specified coordinates.
 * 	!function alloc (x?: number, y?: number) : Point2;
 */ $1fea8365818f3b22$export$2e2bcd8739ae039.createPool($ba17a79a5d342faa$var$Point2, 2048, 1024);
var $ba17a79a5d342faa$export$2e2bcd8739ae039 = $ba17a79a5d342faa$var$Point2;



//![import "../utils/recycler"]
//![import "./point2"]
//![import "./rect"]
//:/**
//: * 	Representation of a bounding box in 2D space. The component values are upscaled by a fixed number of bits to allow sub-pixel
//: * 	translations (internally), but the public values will always be integers.
//: */
//!class Bounds2
const $6c1a77cc22998ccc$var$Bounds2 = $hNLgQ.Class.extend({
    className: 'Bounds2',
    /**
	 * 	Coordinates of the bounds (cx and cy are for the center). Note that this fields are read only and should be
	 * 	modified through methods only.
	 */ /**
	 * 	!readonly cx: number;
	 */ cx: 0,
    /**
	 * 	!readonly cy: number;
	 */ cy: 0,
    /**
	 * 	!readonly x1: number;
	 */ x1: 0,
    /**
	 * 	!readonly y1: number;
	 */ y1: 0,
    /**
	 * 	!readonly x2: number;
	 */ x2: 0,
    /**
	 * 	!readonly y2: number;
	 */ y2: 0,
    /**
	 * 	Upscaled coordinates.
	 */ ucx: 0,
    ucy: 0,
    ux1: 0,
    uy1: 0,
    ux2: 0,
    uy2: 0,
    /**
	 * !constructor ();
	 */ /**
	 * !constructor (bounds: Bounds2);
	 */ /**
	 * !constructor (rect: Rect);
	 */ /**
	 * !constructor (width: number, height: number);
	 */ /**
	 * !constructor (x1: number, y1: number, x2: number, y2: number, upscaled?: boolean|false);
	 */ __ctor: function(x1 = null, y1 = null, x2 = null, y2 = null, upscaled = false) {
        if (x1 === null) {
            this.ux1 = this.uy1 = this.ux2 = this.uy2 = this.ucx = this.ucy = 0;
            return this.downscale();
        }
        if (y1 !== null && x2 === null) return this.set(0, 0, 0, 0).resize(x1, y1);
        return this.set(x1, y1, x2, y2, upscaled);
    },
    /**
	 * Populates the downscaled components.
	 */ downscale: function() {
        this.x1 = downscale(this.ux1);
        this.y1 = downscale(this.uy1);
        this.x2 = downscale(this.ux2);
        this.y2 = downscale(this.uy2);
        this.cx = downscale(this.ucx);
        this.cy = downscale(this.ucy);
        return this;
    },
    /**
	 * Truncates the components to remove fractional parts.
	 * !trunc() : Bounds2;
	 */ trunc: function() {
        this.ux1 = upscale(this.x1);
        this.uy1 = upscale(this.y1);
        this.ux2 = upscale(this.x2);
        this.uy2 = upscale(this.y2);
        this.ucx = upscale(this.cx);
        this.ucy = upscale(this.cy);
        return this;
    },
    /**
	 * Clones the bounds and returns a new object.
	 * !clone() : Bounds2;
	 */ clone: function() {
        return $6c1a77cc22998ccc$var$Bounds2.Pool.alloc(this.ux1, this.uy1, this.ux2, this.uy2, true);
    },
    /**
	 * Sets the components to zero.
	 * !zero() : Bounds2;
	 */ zero: function() {
        this.ux1 = 0;
        this.uy1 = 0;
        this.ux2 = 0;
        this.uy2 = 0;
        this.ucx = 0;
        this.ucy = 0;
        return this.downscale();
    },
    /**
	 * Resets the component values to `null` for subsequent use with `setAsUnion`.
	 * !reset() : Bounds2;
	 */ reset: function() {
        this.ux1 = null;
        this.uy1 = null;
        this.ux2 = null;
        this.uy2 = null;
        this.ucx = null;
        this.ucy = null;
        this.x1 = null;
        this.y1 = null;
        this.x2 = null;
        this.y2 = null;
        this.cx = null;
        this.cy = null;
        return this;
    },
    /**
	 * Translates the bounds by the given deltas.
	 * !translate (point: Point2) : Bounds2;
	 */ /**
	 * Translates the bounds by the given deltas.
	 * !translate (vec: Vec2) : Bounds2;
	 */ /**
	 * Translates the bounds by the given deltas.
	 * !translate (dx: number, dy: number, upscaled?: boolean) : Bounds2;
	 */ translate: function(dx, dy = null, upscaled = false) {
        if (dy === null) {
            if ($ba17a79a5d342faa$export$2e2bcd8739ae039.isInstance(dx)) {
                dy = dx.uy;
                dx = dx.ux;
            } else {
                dy = upscale(dx.y);
                dx = upscale(dx.x);
            }
        } else if (!upscaled) {
            dx = upscale(dx);
            dy = upscale(dy);
        }
        this.ux1 += dx;
        this.uy1 += dy;
        this.ux2 += dx;
        this.uy2 += dy;
        this.ucx += dx;
        this.ucy += dy;
        return this.downscale();
    },
    /*
	**	Sets the coordinates of the bounds.
	**
	**	Bounds2 set (Bounds2 b)
	**	Bounds2 set (Rect r)
	**	Bounds2 set (float x1, float y1, float x2, float y2, bool upscaled=false)
	*/ set: function(x1, y1 = null, x2 = null, y2 = null, upscaled = false) {
        if (y1 === null) {
            if ($6c1a77cc22998ccc$var$Bounds2.isInstance(x1)) {
                y2 = x1.uy2;
                x2 = x1.ux2;
                y1 = x1.uy1;
                x1 = x1.ux1;
            } else {
                y2 = upscale(x1.y2);
                x2 = upscale(x1.x2);
                y1 = upscale(x1.y1);
                x1 = upscale(x1.x1);
            }
        } else if (!upscaled) {
            x1 = upscale(x1);
            y1 = upscale(y1);
            x2 = upscale(x2);
            y2 = upscale(y2);
        }
        this.ux1 = x1;
        this.uy1 = y1;
        this.ux2 = x2;
        this.uy2 = y2;
        this.ucx = x1 + x2 >> 1;
        this.ucy = y1 + y2 >> 1;
        return this.downscale();
    },
    /*
	**	Adds the specified coordinates to the current ones.
	**
	**	Bounds2 add (Bounds2 b)
	**	Bounds2 add (Rect r)
	**	Bounds2 add (float x1, float y1, float x2, float y2, bool upscaled=false)
	*/ add: function(x1, y1 = null, x2 = null, y2 = null, upscaled = false) {
        if (y1 === null) {
            if ($6c1a77cc22998ccc$var$Bounds2.isInstance(x1)) {
                y2 = x1.uy2;
                x2 = x1.ux2;
                y1 = x1.uy1;
                x1 = x1.ux1;
            } else {
                y2 = upscale(x1.y2);
                x2 = upscale(x1.x2);
                y1 = upscale(x1.y1);
                x1 = upscale(x1.x1);
            }
        } else if (!upscaled) {
            x1 = upscale(x1);
            y1 = upscale(y1);
            x2 = upscale(x2);
            y2 = upscale(y2);
        }
        this.ux1 += x1;
        this.uy1 += y1;
        this.ux2 += x2;
        this.uy2 += y2;
        this.ucx += x1 + x2 >> 1;
        this.ucy += y1 + y2 >> 1;
        return this.downscale();
    },
    /*
	**	Returns true if the integer coordinates have the same values as the given argument.
	**
	**	bool equals (Bounds2 b)
	**	bool equals (Rect r)
	**	bool equals (float x1, float y1, float x2, float y2)
	*/ equals: function(x1, y1 = null, x2 = null, y2 = null) {
        if (y1 === null) {
            if ($6c1a77cc22998ccc$var$Bounds2.isInstance(x1)) {
                y2 = x1.y2;
                x2 = x1.x2;
                y1 = x1.y1;
                x1 = x1.x1;
            } else {
                y2 = int(x1.y2);
                x2 = int(x1.x2);
                y1 = int(x1.y1);
                x1 = int(x1.x1);
            }
        } else {
            x1 = int(x1);
            y1 = int(y1);
            x2 = int(x2);
            y2 = int(y2);
        }
        return x1 == this.x1 && x2 == this.x2 && y1 == this.y1 && y2 == this.y2;
    },
    /*
	**	Returns a bool indicating if the specified bounds are contained by the current bounds.
	**
	**	bool contains (Bounds2 b)
	**	bool contains (Rect r)
	**	bool contains (float x1, float y1, float x2, float y2)
	*/ contains: function(x1, y1 = null, x2 = null, y2 = null) {
        if (y1 === null) {
            if ($6c1a77cc22998ccc$var$Bounds2.isInstance(x1)) {
                y2 = x1.y2;
                x2 = x1.x2;
                y1 = x1.y1;
                x1 = x1.x1;
            } else {
                y2 = int(x1.y2);
                x2 = int(x1.x2);
                y1 = int(x1.y1);
                x1 = int(x1.x1);
            }
        } else {
            x1 = int(x1);
            y1 = int(y1);
            x2 = int(x2);
            y2 = int(y2);
        }
        return x1 == Math.max(this.x1, x1) && y1 == Math.max(this.y1, y1) && x2 == Math.min(this.x2, x2) && y2 == Math.min(this.y2, y2);
    },
    /*
	**	Extends the coordinates to ensure the specified argument is contained.
	**
	**	Bounds2 setAsUnion (Bounds2 b)
	**	Bounds2 setAsUnion (Rect r)
	**	Bounds2 setAsUnion (Point2 p)
	**	Bounds2 setAsUnion (Vec2 v)
	**	Bounds2 setAsUnion (float x, float y)
	**	Bounds2 setAsUnion (float x1, float y1, float x2, float y2)
	*/ setAsUnion: function(x1, y1 = null, x2 = null, y2 = null) {
        if (y1 === null) {
            if ($6c1a77cc22998ccc$var$Bounds2.isInstance(x1)) {
                this.setAsUnion(x1.ux1, x1.uy1, true);
                this.setAsUnion(x1.ux2, x1.uy2, true);
                return this;
            } else if ($a894a9381ffd6f0a$export$2e2bcd8739ae039.isInstance(x1)) {
                this.setAsUnion(x1.x1, x1.y1);
                this.setAsUnion(x1.x2, x1.y2);
                return this;
            } else if ($ba17a79a5d342faa$export$2e2bcd8739ae039.isInstance(x1)) {
                y1 = x1.uy;
                x1 = x1.ux;
            } else {
                y1 = upscale(x1.y);
                x1 = upscale(x1.x);
            }
        } else {
            if (y2 !== null) {
                this.setAsUnion(x1, y1);
                this.setAsUnion(x2, y2);
                return this;
            } else if (x2 !== true) {
                x1 = upscale(x1);
                y1 = upscale(y1);
            }
        }
        if (this.ux1 === null || x1 < this.ux1) this.ux1 = x1;
        if (this.uy1 === null || y1 < this.uy1) this.uy1 = y1;
        if (this.ux2 === null || x1 > this.ux2) this.ux2 = x1;
        if (this.uy2 === null || y1 > this.uy2) this.uy2 = y1;
        this.ucx = this.ux1 + this.ux2 >> 1;
        this.ucy = this.uy1 + this.uy2 >> 1;
        return this.downscale();
    },
    /*
	**	Returns a bool indicating if the integer components of the bounds intersect with the specified argument.
	**
	**	bool intersects (Bounds2 b)
	**	bool intersects (Rect r)
	**	bool intersects (float x1, float y1, float x2, float y2)
	*/ intersects: function(x1, y1 = null, x2 = null, y2 = null) {
        if (y1 === null) {
            if ($6c1a77cc22998ccc$var$Bounds2.isInstance(x1)) {
                y2 = x1.y2;
                x2 = x1.x2;
                y1 = x1.y1;
                x1 = x1.x1;
            } else {
                y2 = int(x1.y2);
                x2 = int(x1.x2);
                y1 = int(x1.y1);
                x1 = int(x1.x1);
            }
        } else {
            x1 = int(x1);
            y1 = int(y1);
            x2 = int(x2);
            y2 = int(y2);
        }
        let _x1 = Math.max(this.x1, x1);
        let _y1 = Math.max(this.y1, y1);
        let _x2 = Math.min(this.x2, x2);
        let _y2 = Math.min(this.y2, y2);
        return Math.max(0, _y2 - _y1) * Math.max(0, _x2 - _x1) > 0;
    },
    /*
	**	Sets the bounds to the intersection formed by the current bounds and the given argument.
	**
	**	Bounds2 setAsIntersection (Bounds2 b)
	**	Bounds2 setAsIntersection (Rect r)
	**	Bounds2 setAsIntersection (float x1, float y1, float x2, float y2)
	*/ setAsIntersection: function(x1, y1 = null, x2 = null, y2 = null) {
        if (y1 === null) {
            if ($6c1a77cc22998ccc$var$Bounds2.isInstance(x1)) {
                y2 = x1.y2;
                x2 = x1.x2;
                y1 = x1.y1;
                x1 = x1.x1;
            } else {
                y2 = int(x1.y2);
                x2 = int(x1.x2);
                y1 = int(x1.y1);
                x1 = int(x1.x1);
            }
        } else {
            x1 = int(x1);
            y1 = int(y1);
            x2 = int(x2);
            y2 = int(y2);
        }
        this.ux1 = upscale(Math.max(this.x1, x1));
        this.uy1 = upscale(Math.max(this.y1, y1));
        this.ux2 = upscale(Math.min(this.x2, x2));
        this.uy2 = upscale(Math.min(this.y2, y2));
        this.ucx = this.ux1 + this.ux2 >> 1;
        this.ucy = this.uy1 + this.uy2 >> 1;
        this.downscale();
        return Math.max(0, this.uy2 - this.uy1) * Math.max(0, this.ux2 - this.ux1) > 0;
    },
    /**
	 * Resizes the bounds to the given size using center or top-left as reference.	 
	 * @param {boolean} topLeftRelative (default `false`)
	 * !resize (width: number|boolean|null, height: number|boolean|null, topLeftRelative?: boolean) : Bounds2;
	 */ resize: function(width, height, topLeftRelative = false) {
        width = width !== null ? width !== true ? upscale(width) : true : this.ux2 - this.ux1;
        height = height !== null ? height !== true ? upscale(height) : true : this.uy2 - this.uy1;
        if (width === true) width = height * this.ratio();
        else if (height === true) height = width / this.ratio();
        if (topLeftRelative === true) {
            this.ux2 = this.ux1 + width;
            this.uy2 = this.uy1 + height;
            this.ucx = this.ux1 + this.ux2 >> 1;
            this.ucy = this.uy1 + this.uy2 >> 1;
        } else {
            width >>= 1;
            height >>= 1;
            this.ux1 = this.ucx - width;
            this.uy1 = this.ucy - height;
            this.ux2 = this.ucx + width;
            this.uy2 = this.ucy + height;
        }
        return this.downscale();
    },
    /**
	 * Resizes the bounds using the specified deltas (using the center or top-left corner as reference).
	 * !resizeBy (dWidth: number|boolean, dHeight: number|boolean, topLeftRelative?: boolean) : Bounds2;
	 */ resizeBy: function(dWidth, dHeight, topLeftRelative = false) {
        dWidth = dWidth !== true ? upscale(dWidth) : true;
        dHeight = dHeight !== true ? upscale(dHeight) : true;
        if (dWidth === true) dWidth = dHeight * this.ratio();
        else if (dHeight === true) dHeight = dWidth / this.ratio();
        if (topLeftRelative === true) {
            this.ux2 += dWidth;
            this.uy2 += dHeight;
            this.ucx = this.ux1 + this.ux2 >> 1;
            this.ucy = this.uy1 + this.uy2 >> 1;
        } else {
            dWidth >>= 1;
            dHeight >>= 1;
            this.ux1 -= dWidth;
            this.uy1 -= dHeight;
            this.ux2 += dWidth;
            this.uy2 += dHeight;
        }
        return this.downscale();
    },
    /**
	 * Returns the width of the bounds.
	 * !width(): number
	 */ width: function() {
        return this.x2 - this.x1;
    },
    /**
	 * Returns the height of the bounds.
	 * !height(): number
	 */ height: function() {
        return this.y2 - this.y1;
    },
    /**
	 * Returns the aspect ratio (width divided by height).
	 * !ratio(): number
	 */ ratio: function() {
        return (this.x2 - this.x1) / (this.y2 - this.y1);
    },
    /**
	 * Returns true if the bounds are in forward position (x1 < x2 and y1 < y2).
	 * !isForward() : boolean;
	 */ isForward: function() {
        return this.ux1 <= this.ux2 && this.uy1 <= this.uy2;
    },
    /**
	 * Returns true if the specified point is within the bounds. The `tol` parameter is used to specify a tolerance value.
	 * !containsPoint (x: number, y: number, tol?: number) : boolean;
	 */ containsPoint: function(x, y, tol = 0) {
        x = upscale(x);
        y = upscale(y);
        tol = upscale(tol);
        return this.ux1 - tol <= x && x <= this.ux2 + tol && this.uy1 - tol <= y && y <= this.uy2 + tol;
    },
    /**
	 * Returns the area of the bounds. When strict is true, the area will be returned only if the bounds are forward.
	 * !area (strict?: boolean|false) : number;
	 */ area: function(strict = false) {
        return strict ? this.isForward() ? (this.y2 - this.y1) * (this.x2 - this.x1) : 0 : (this.y2 - this.y1) * (this.x2 - this.x1);
    },
    /**
	 * Returns the string representation of the rect coordinates.
	 * !toString() : string;
	 */ toString: function() {
        return '(' + this.x1 + ', ' + this.y1 + ', ' + this.x2 + ', ' + this.y2 + ')';
    },
    /**
	 * Flattens the contents of the bounds.
	 * !flatten() : \[number,number,number,number\];
	 */ flatten: function() {
        return [
            this.ux1,
            this.uy1,
            this.ux2,
            this.uy2
        ];
    },
    /**
	 * Unflattens the given array into the bounds object.
	 * !unflatten (data: \[number,number,number,number\]) : Bounds2;
	 */ unflatten: function(x) {
        this.ux1 = x[0];
        this.uy1 = x[1];
        this.ux2 = x[2];
        this.uy2 = x[3];
        this.ucx = this.ux1 + this.ux2 >> 1;
        this.ucy = this.uy1 + this.uy2 >> 1;
        return this.downscale();
    }
});
//!/class
//!namespace Rect
//!namespace Pool
/**
	 * 	Allocates a new object of zero size.
	 * 	!function alloc() : Bounds2;
	 */ $1fea8365818f3b22$export$2e2bcd8739ae039.createPool($6c1a77cc22998ccc$var$Bounds2, 8192, 3072);
var $6c1a77cc22998ccc$export$2e2bcd8739ae039 = $6c1a77cc22998ccc$var$Bounds2;



/*
**	froxel/anim/easing.js
**
**	Copyright (c) 2016-2021, RedStar Technologies, All rights reserved.
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
*/ /**
**	Collection of useful easing functions.
*/ //!namespace Easing
const $29c330dfef39fb24$var$Easing = {
    /* ******************************************** */ //!namespace Linear
    Linear: {
        /**
		 * 	!function IN (t: number) : number;
		 */ IN: function(t) {
            return t;
        },
        /**
		 * 	!function OUT (t: number) : number;
		 */ OUT: function(t) {
            return t;
        },
        /**
		 * 	!function IN_OUT (t: number) : number;
		 */ IN_OUT: function(t) {
            return t;
        }
    },
    //!/namespace
    /* ******************************************** */ //!namespace Back
    Back: {
        k: 1.70158,
        /**
		 * 	!function IN (t: number, k?: number) : number;
		 */ IN: function(t, k = null) {
            if (k === null) k = $29c330dfef39fb24$var$Easing.Back.k;
            return t * t * ((k + 1) * t - k);
        },
        /**
		 * 	!function OUT (t: number, k?: number) : number;
		 */ OUT: function(t, k = null) {
            return 1 - $29c330dfef39fb24$var$Easing.Back.IN(1 - t, k);
        },
        /**
		 * 	!function IN_OUT (t: number, k?: number) : number;
		 */ IN_OUT: function(t, k = null) {
            if (t < 0.5) return $29c330dfef39fb24$var$Easing.Back.IN(t * 2, k) / 2;
            else return $29c330dfef39fb24$var$Easing.Back.OUT((t - 0.5) * 2, k) / 2 + 0.5;
        }
    },
    //!/namespace
    /* ******************************************** */ //!namespace Bounce
    Bounce: {
        getConst: function(t) {
            if (t < 1.0 / 2.75) return 7.5625 * t * t;
            else if (t < 2.0 / 2.75) return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
            else if (t < 2.5 / 2.75) return 7.5625 * (t -= 2.250 / 2.75) * t + 0.9375;
            return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
        },
        /**
		 * 	!function IN (t: number) : number;
		 */ IN: function(t) {
            return 1 - $29c330dfef39fb24$var$Easing.Bounce.getConst(1 - t);
        },
        /**
		 * 	!function OUT (t: number) : number;
		 */ OUT: function(t) {
            return $29c330dfef39fb24$var$Easing.Bounce.getConst(t);
        },
        /**
		 * 	!function IN_OUT (t: number) : number;
		 */ IN_OUT: function(t) {
            if (t < 0.5) return (1 - $29c330dfef39fb24$var$Easing.Bounce.getConst(1 - 2 * t)) / 2;
            else return $29c330dfef39fb24$var$Easing.Bounce.getConst((t - 0.5) * 2) / 2 + 0.5;
        }
    },
    //!/namespace
    /* ******************************************** */ //!namespace Circ
    Circ: {
        /**
		 * 	!function IN (t: number) : number;
		 */ IN: function(t) {
            return 1 - Math.sqrt(1 - t * t);
        },
        /**
		 * 	!function OUT (t: number) : number;
		 */ OUT: function(t) {
            return 1 - $29c330dfef39fb24$var$Easing.Circ.IN(1 - t);
        },
        /**
		 * 	!function IN_OUT (t: number) : number;
		 */ IN_OUT: function(t) {
            if (t < 0.5) return $29c330dfef39fb24$var$Easing.Circ.IN(t * 2) / 2;
            else return $29c330dfef39fb24$var$Easing.Circ.OUT((t - 0.5) * 2) / 2 + 0.5;
        }
    },
    //!/namespace
    /* ******************************************** */ //!namespace Cubic
    Cubic: {
        /**
		 * 	!function IN (t: number) : number;
		 */ IN: function(t) {
            return t * t * t;
        },
        /**
		 * 	!function OUT (t: number) : number;
		 */ OUT: function(t) {
            return 1 - $29c330dfef39fb24$var$Easing.Cubic.IN(1 - t);
        },
        /**
		 * 	!function IN_OUT (t: number) : number;
		 */ IN_OUT: function(t) {
            if (t < 0.5) return $29c330dfef39fb24$var$Easing.Cubic.IN(t * 2) / 2;
            else return $29c330dfef39fb24$var$Easing.Cubic.OUT((t - 0.5) * 2) / 2 + 0.5;
        }
    },
    //!/namespace
    /* ******************************************** */ //!namespace Expo
    Expo: {
        /**
		 * 	!function IN (t: number) : number;
		 */ IN: function(t) {
            return Math.pow(2, 12 * (t - 1));
        },
        /**
		 * 	!function OUT (t: number) : number;
		 */ OUT: function(t) {
            return -Math.pow(2, -12 * t) + 1;
        },
        /**
		 * 	!function IN_OUT (t: number) : number;
		 */ IN_OUT: function(t) {
            if ((t *= 2) < 1) return Math.pow(2, 12 * (t - 1)) / 2;
            else return (-Math.pow(2, -12 * (t - 1)) + 2) / 2;
        }
    },
    //!/namespace
    /* ******************************************** */ //!namespace Power
    Power: {
        /**
		 * 	!function IN (t: number, p?: number) : number;
		 */ IN: function(t, p = 12) {
            return Math.pow(t, p);
        },
        /**
		 * 	!function OUT (t: number, p?: number) : number;
		 */ OUT: function(t, p = 12) {
            return 1 - $29c330dfef39fb24$var$Easing.Power.IN(1 - t, p);
        },
        /**
		 * 	!function IN_OUT (t: number, p?: number) : number;
		 */ IN_OUT: function(t, p = 12) {
            if (t < 0.5) return $29c330dfef39fb24$var$Easing.Power.IN(t * 2, p) / 2;
            else return $29c330dfef39fb24$var$Easing.Power.OUT((t - 0.5) * 2, p) / 2 + 0.5;
        }
    },
    //!/namespace
    /* ******************************************** */ //!namespace Quad
    Quad: {
        /**
		 * 	!function IN (t: number) : number;
		 */ IN: function(t) {
            return t * t;
        },
        /**
		 * 	!function OUT (t: number) : number;
		 */ OUT: function(t) {
            return 1 - $29c330dfef39fb24$var$Easing.Quad.IN(1 - t);
        },
        /**
		 * 	!function IN_OUT (t: number) : number;
		 */ IN_OUT: function(t) {
            if (t < 0.5) return $29c330dfef39fb24$var$Easing.Quad.IN(t * 2) / 2;
            else return $29c330dfef39fb24$var$Easing.Quad.OUT((t - 0.5) * 2) / 2 + 0.5;
        }
    },
    //!/namespace
    /* ******************************************** */ //!namespace Quartic
    Quartic: {
        /**
		 * 	!function IN (t: number) : number;
		 */ IN: function(t) {
            return t * t * t * t;
        },
        /**
		 * 	!function OUT (t: number) : number;
		 */ OUT: function(t) {
            return 1 - $29c330dfef39fb24$var$Easing.Quartic.IN(1 - t);
        },
        /**
		 * 	!function IN_OUT (t: number) : number;
		 */ IN_OUT: function(t) {
            if (t < 0.5) return $29c330dfef39fb24$var$Easing.Quartic.IN(t * 2) / 2;
            else return $29c330dfef39fb24$var$Easing.Quartic.OUT((t - 0.5) * 2) / 2 + 0.5;
        }
    },
    //!/namespace
    /* ******************************************** */ //!namespace Quintic
    Quintic: {
        /**
		 * 	!function IN (t: number) : number;
		 */ IN: function(t) {
            return t * t * t * t * t;
        },
        /**
		 * 	!function OUT (t: number) : number;
		 */ OUT: function(t) {
            return 1 - $29c330dfef39fb24$var$Easing.Quintic.IN(1 - t);
        },
        /**
		 * 	!function IN_OUT (t: number) : number;
		 */ IN_OUT: function(t) {
            if (t < 0.5) return $29c330dfef39fb24$var$Easing.Quintic.IN(t * 2) / 2;
            else return $29c330dfef39fb24$var$Easing.Quintic.OUT((t - 0.5) * 2) / 2 + 0.5;
        }
    },
    //!/namespace
    /* ******************************************** */ //!namespace Sine
    Sine: {
        /**
		 * 	!function IN (t: number) : number;
		 */ IN: function(t) {
            return 1 - Math.sin(1.5708 * (1 - t));
        },
        /**
		 * 	!function OUT (t: number) : number;
		 */ OUT: function(t) {
            return Math.sin(1.5708 * t);
        },
        /**
		 * 	!function IN_OUT (t: number) : number;
		 */ IN_OUT: function(t) {
            return (Math.cos(3.1416 * t) - 1) / -2;
        }
    },
    //!/namespace
    /* ******************************************** */ //!namespace Step
    Step: {
        /**
		 * 	!function IN (t: number) : number;
		 */ IN: function(t) {
            return t != 1.0 ? 0 : 1.0;
        },
        /**
		 * 	!function OUT (t: number) : number;
		 */ OUT: function(t) {
            return t != 1.0 ? 0 : 1.0;
        },
        /**
		 * 	!function IN_OUT (t: number) : number;
		 */ IN_OUT: function(t) {
            return t != 1.0 ? 0 : 1.0;
        }
    }
};
var $29c330dfef39fb24$export$2e2bcd8739ae039 = $29c330dfef39fb24$var$Easing;



var $hNLgQ = parcelRequire("hNLgQ");





var $hNLgQ = parcelRequire("hNLgQ");

//![import "../utils/priority-queue"]
//!class Boot
const $8dbe83b0cc8b3c36$var$Boot = {
    modules: new $6cb3980136ee15d8$export$2e2bcd8739ae039(),
    /**
	 * 	Registers a new boot module.
	 * 	!static register (module: Boot.Module) : Boot.Module;
	 */ register: function(module) {
        return this.modules.add(module);
    },
    /**
	 * 	Removes a boot module.
	 * 	!static unregister (module: Boot.Module) : void;
	 */ unregister: function(module) {
        this.modules.remove(module);
        this.modules.cleanup();
    },
    /**
	 * 	Executes the startup sequence.
	 * 	!static startup (finishedCallback?: () => void) : void;
	 */ startup: function(finishedCallback = null) {
        this.modules.forEachAsync((m, r)=>{
            if (m.onStartup(r) !== false) r();
        }, finishedCallback);
    },
    /**
	 * 	Executes the shutdown sequence.
	 * 	!static shutdown (finishedCallback?: () => void) : void;
	 */ shutdown: function(finishedCallback = null) {
        this.modules.forEachAsyncRev((m, r)=>{
            if (m.onShutdown(r) !== false) r();
        }, finishedCallback);
    }
};
//!/class
//!namespace Boot
//!interface Module
$8dbe83b0cc8b3c36$var$Boot.Module = $hNLgQ.Class.extend({
    className: "Module",
    /**
	 * 	Priority of the module (from 0 to 100), lower number means higher priority.
	 * 	!priority: number;
	 */ priority: 5,
    __ctor: function() {
        $8dbe83b0cc8b3c36$var$Boot.register(this);
    },
    __dtor: function() {
        $8dbe83b0cc8b3c36$var$Boot.unregister(this);
    },
    /**
	 * 	Should return `false` if the method is async. When async ensure to call `next` once the operation is complete.
	 * 	!onStartup (next: () => void) : boolean;
	 */ onStartup: function(next) {},
    /**
	 * 	Should return `false` if the method is async. When async ensure to call `next` once the operation is complete.
	 * 	!onShutdown (next: () => void) : boolean;
	 */ onShutdown: function(next) {}
});
var //!/interface
//!/namespace
$8dbe83b0cc8b3c36$export$2e2bcd8739ae039 = $8dbe83b0cc8b3c36$var$Boot;



//!class sys
const $ec90764150f3694e$var$system = {
    /**
	 * Indicates if the system module has already been initialized.
	 */ initialized: false,
    /**
	 * Screen width (available after calling `init`).
	 * !static readonly screenWidth: number;
	 */ screenWidth: 0,
    /**
	 * Screen height (available after calling `init`).
	 * !static readonly screenHeight: number;
	 */ screenHeight: 0,
    /**
	 * Primary renderer (available after calling `init`).
	 * !static readonly renderer: Canvas;
	 */ renderer: null,
    /**
	 * Logical system time (mirrors the value of System.frameTime).
	 * !static readonly time: Number;
	 */ time: 0,
    /**
	 * Logical system delta time (mirrors the value of System.frameDelta).
	 * !static readonly dt: Number;
	 */ dt: 0,
    /**
	 * Timeout update handler.
	 */ _timeout: null,
    /**
	 * Interval update handler.
	 */ _interval: null,
    /**
	 * Time span update handler.
	 */ _span: null,
    /**
	 * Update handler executed on every frame start.
	 * !static readonly update: Handler;
	 */ update: null,
    /**
	 * Draw handler executed on every frame start.
	 * !static readonly draw: Handler;
	 */ draw: null,
    /**
	 * Executed when the system is paused.
	 * !static onPaused: (fromExternalEvent: boolean) => void;
	 */ onPaused: null,
    /**
	 * Executed when the system is resumed.
	 * !static onResumed: (fromExternalEvent: boolean) => void;
	 */ onResumed: null,
    /**
	 * System initialization options.
	 */ options: {
        /**
		 * 	Tells the system to enable WebGL support.
		 */ gl: true,
        /**
		 * 	Indicates if on-screen logging should be enabled.
		 */ log: false,
        /**
		 * 	Enables or disables antialised canvas. Set to `false` when pixel-perfect is desired.
		 */ antialias: false,
        /**
		 * 	Background of the system canvas.
		 */ background: '#000000',
        /**
		 * 	Desired orientaton of the display.
		 */ orientation: 'automatic',
        /**
		 * 	Desired display width. When not specified (null) the maximum screen width to maintain the aspect ratio will be used.
		 */ screenWidth: null,
        /**
		 * 	Desired display height. When not specified (null) the maximum screen height to maintain the aspect ratio will be used.
		 */ screenHeight: null,
        /**
		 * 	Target frames per second (FPS). Used to determine delay between frames.
		 */ fps: 144,
        /**
		 * 	Minimum allowed frames per second (FPS). If system FPS drops below this value, the `frameDelta` property of System will be truncated to 1/minFps.
		 */ minFps: 24,
        /**
		 * 	Indicates if recycler pool preallocation should be automatically executed. Additionally if this value is a number, it will be used as
		 * 	maximum preallocation parameter for the recycler.
		 */ preallocate: false
    },
    /**
	 * Initializes the system with the specified options.
	 * !static init (options: System.Options) : Promise<void>;
	 */ /**
	 * Initializes the system using the default options.
	 * !static init () : Promise<void>;
	 */ init: function(options) {
        return new Promise((resolve, reject)=>{
            if (this.initialized) return resolve();
            Object.assign(this.options, options);
            $0150c0894dfca188$export$2e2bcd8739ae039.config({
                pixelated: !this.options.antialias,
                filter: this.options.antialias ? 'LINEAR' : 'NEAREST'
            });
            $c5f44d8482fd28c9$export$2e2bcd8739ae039.init(this.options);
            $c5f44d8482fd28c9$export$2e2bcd8739ae039.updateQueueAdd({
                update: function(dt) {
                    $ec90764150f3694e$var$system.time = $c5f44d8482fd28c9$export$2e2bcd8739ae039.frameTime;
                    $ec90764150f3694e$var$system.dt = dt;
                    $ec90764150f3694e$var$system._timeout.exec(dt);
                    $ec90764150f3694e$var$system._interval.exec(dt);
                    $ec90764150f3694e$var$system._span.exec(dt);
                    $ec90764150f3694e$var$system.update.exec(dt);
                }
            });
            $c5f44d8482fd28c9$export$2e2bcd8739ae039.drawQueueAdd({
                draw: function(g) {
                    $ec90764150f3694e$var$system.draw.exec(g);
                }
            });
            $8dbe83b0cc8b3c36$export$2e2bcd8739ae039.startup(function() {
                $c5f44d8482fd28c9$export$2e2bcd8739ae039.start();
                $ec90764150f3694e$var$system.screenWidth = $c5f44d8482fd28c9$export$2e2bcd8739ae039.screenWidth;
                $ec90764150f3694e$var$system.screenHeight = $c5f44d8482fd28c9$export$2e2bcd8739ae039.screenHeight;
                $ec90764150f3694e$var$system.renderer = $c5f44d8482fd28c9$export$2e2bcd8739ae039.renderer;
                $ec90764150f3694e$var$system._timeout = $628f585857a65401$export$2e2bcd8739ae039.Pool.alloc();
                $ec90764150f3694e$var$system._interval = $628f585857a65401$export$2e2bcd8739ae039.Pool.alloc();
                $ec90764150f3694e$var$system._span = $628f585857a65401$export$2e2bcd8739ae039.Pool.alloc();
                $ec90764150f3694e$var$system.update = $628f585857a65401$export$2e2bcd8739ae039.Pool.alloc();
                $ec90764150f3694e$var$system.draw = $628f585857a65401$export$2e2bcd8739ae039.Pool.alloc();
                window.onblur = function() {
                    $ec90764150f3694e$var$system.pause(true);
                };
                window.onfocus = function() {
                    $ec90764150f3694e$var$system.resume(true);
                };
                $ec90764150f3694e$var$system.initialized = true;
                resolve();
            });
        });
    },
    /**
	 * Pauses the system.
	 * !static pause (fromExternalEvent?: boolean|false) : void;
	 */ pause: function(fromExternalEvent = false) {
        if ($ec90764150f3694e$var$system.onPaused !== null) $ec90764150f3694e$var$system.onPaused(fromExternalEvent);
    },
    /**
	 * Resumes the system.
	 * !static resume (fromExternalEvent?: boolean|false) : void;
	 */ resume: function(fromExternalEvent = false) {
        if ($ec90764150f3694e$var$system.onResumed !== null) $ec90764150f3694e$var$system.onResumed(fromExternalEvent);
    },
    /**
	 * Creates a timeout callback.
	 * !static timeout (duration: number, callback: Function, arg0?: any, arg1?: any, arg2?: any, arg3?: any) : void;
	 */ timeout: function(duration, callback, arg0 = null, arg1 = null, arg2 = null, arg3 = null) {
        this._timeout.add(this._updateTimeout, duration, callback, arg0, arg1, arg2, arg3);
    },
    _updateTimeout: function(dt, _, callback, arg0, arg1, arg2, arg3) {
        this.arg0 -= dt;
        if (this.arg0 > 0) return true;
        callback(arg0, arg1, arg2, arg3);
        return false;
    },
    /**
	 * Creates an interval callback.
	 * !static interval (period: number, callback: Function, arg0?: any, arg1?: any, arg2?: any) : void;
	 */ interval: function(period, callback, arg0 = null, arg1 = null, arg2 = null) {
        this._interval.add(this._updateInterval, 0, period, callback, arg0, arg1, arg2);
    },
    _updateInterval: function(dt, _0, _1, callback, arg0, arg1, arg2) {
        this.arg0 += dt;
        if (this.arg0 < this.arg1) return true;
        this.arg0 -= this.arg1;
        return callback(arg0, arg1, arg2);
    },
    /**
	 * Creates a a time-span callback.
	 * !static span (period: number, callback: (t:number, dt:number, ...args:any) => boolean, arg0?: any, arg1?: any, arg2?: any) : void;
	 */ span: function(duration, callback, arg0 = null, arg1 = null, arg2 = null) {
        this._span.add(this._updateSpan, 0, duration, callback, arg0, arg1, arg2);
    },
    _updateSpan: function(dt, _0, _1, callback, arg0, arg1, arg2) {
        this.arg0 += dt;
        if (this.arg0 > this.arg1) {
            dt -= this.arg0 - this.arg1;
            this.arg0 = this.arg1;
        }
        if (callback(this.arg0 / this.arg1, dt, arg0, arg1, arg2) === false) return false;
        return this.arg0 !== this.arg1;
    }
};
var $ec90764150f3694e$export$2e2bcd8739ae039 = $ec90764150f3694e$var$system;



var $hNLgQ = parcelRequire("hNLgQ");


//!class Block
const $d237e2e481aff2df$var$Block = $hNLgQ.Class.extend({
    className: 'Anim:Block',
    commands: null,
    first: true,
    current: false,
    time: 0,
    /**
	 * 	Initializes the block to its initial state.
	 * 	!init() : Block;
	 */ init: function() {
        this.commands = $f6bd4ab8b6c953de$export$2e2bcd8739ae039.Pool.alloc();
        this.reset(0);
        return this;
    },
    __dtor: function() {
        this.clear();
        this.commands.free();
    },
    /**
	 * 	Adds a command to the block.
	 * 	!add (cmd: Command) : Command;
	 */ add: function(cmd) {
        this.commands.push(cmd);
        return cmd;
    },
    /**
	 * 	Clones the block.
	 * 	!clone() : Block;
	 */ clone: function() {
        let block = $d237e2e481aff2df$var$Block.alloc();
        for(let node = this.commands.top; node !== null; node = node.next)block.commands.push(node.value.clone());
        return block;
    },
    /**
	 * 	Clears the block by removing all commands and resetting it to initial state.
	 * 	!clear() : Block;
	 */ clear: function() {
        this.commands.clear();
        this.reset(0);
        return this;
    },
    /**
	 * 	Resets the block to its initial state. Does not remove commands.
	 * 	!reset (time: number) : Block;
	 */ reset: function(time = 0) {
        this.first = true;
        this.current = null;
        this.time = time;
        return this;
    },
    /**
	 * 	Sets the block to use the first command in the next call to `update`.
	 * 	!restart() : Block;
	 */ restart: function() {
        this.first = true;
        return this;
    },
    /**
	 * 	Returns `true` if all commands in the block have been executed to completion.
	 * 	!isFinished() : boolean;
	 */ isFinished: function() {
        if (this.first === true) {
            this.current = this.commands.top;
            this.first = false;
        }
        return this.current === null;
    },
    /**
	 * 	Executes the next command in the block. Returns `true` when block execution is complete.
	 * 	!update (anim: Anim) : boolean;
	 */ update: function(anim) {
        while(!this.isFinished()){
            let r = this.current.value.update(anim, this);
            if (r !== true) return r;
            this.current = this.current.next;
        }
        return true;
    }
});
/**
 * 	Allocates a new block.
 * 	!static alloc () : Block;
 */ /**
 * 	Allocates a new block and initializes it.
 * 	!static calloc () : Block;
 */ $1fea8365818f3b22$export$2e2bcd8739ae039.attachTo($d237e2e481aff2df$var$Block, 8192);
var $d237e2e481aff2df$export$2e2bcd8739ae039 = $d237e2e481aff2df$var$Block;



var $hNLgQ = parcelRequire("hNLgQ");


//!class Command
const $38533842ba91c8a4$var$Command = $hNLgQ.Class.extend({
    className: 'Anim:Command',
    /**
	 * 	Object having the code of the operation to execute.
	 */ op: null,
    /**
	 * 	Indicates if execution of the command has started.
	 */ started: false,
    /**
	 * 	Field related to the command.
	 */ field: null,
    /**
	 * 	Value related to the field of the command.
	 */ value: null,
    /**
	 * 	Duration of the command.
	 */ duration: 0,
    _duration: 0,
    /**
	 * 	Number of cicles of the command.
	 */ count: 0,
    _count: 0,
    /**
	 * 	Initial value for the command's field.
	 */ startValue: 0,
    _startValue: 0,
    /**
	 * 	Final value for the command's field.
	 */ endValue: 0,
    _endValue: 0,
    /**
	 * 	Easing function to use to interpolate values of the command's field.
	 */ easing: null,
    _cur: null,
    _last: null,
    /**
	 * 	Block where the command is stored.
	 */ block: null,
    /* Block */ /**
	 * 	Blocks to execute (for commands having multiple blocks).
	 */ blocks: null,
    /* List<Block> */ /**
	 * 	Table with values.
	 */ table: null,
    /**
	 * 	Sound resource.
	 */ snd: null,
    /**
	 * 	Function to execute.
	 */ fn: null,
    /**
	 * 	Initializes the command.
	 * 	!init (op: object) : Command;
	 */ init: function(op, autoInit) {
        this.op = op;
        this.started = false;
        this.block = null;
        this.blocks = null;
        this.table = null;
        this.snd = null;
        this.fn = null;
        if (autoInit !== false) op.init(this, false);
        return this;
    },
    __dtor: function() {
        if (this.block !== null) this.block.clear().free();
        if (this.blocks !== null) this.blocks.clear().free();
    },
    clone: function() {
        let cmd = $38533842ba91c8a4$var$Command.alloc(this.op, false);
        cmd.field = this.field;
        cmd.value = this.value;
        cmd.duration = this.duration;
        cmd.count = this.count;
        cmd.startValue = this.startValue;
        cmd.endValue = this.endValue;
        cmd.easing = this.easing;
        cmd.table = this.table;
        cmd.snd = this.snd;
        cmd.fn = this.fn;
        if (this.block !== null) cmd.block = this.block.clone();
        if (this.blocks !== null) {
            cmd.blocks = $f6bd4ab8b6c953de$export$2e2bcd8739ae039.Pool.alloc();
            for(let node = this.blocks.top; node !== null; node = node.next)cmd.blocks.push(node.value.clone());
        }
        return cmd;
    },
    /**
	 * 	Executed when the command properties are ready, to initialize the operation code.
	 * 	!ready() : void;
	 */ ready: function() {
        this.op.init(this, true);
    },
    /**
	 * 	Updates the command execution.
	 * 	!update (anim: Anim, block: Block) : boolean;
	 */ update: function(anim, block) {
        return this.op.update(anim, block, this);
    }
});
/**
 * 	Allocates a new command.
 * 	!static alloc () : Command;
 */ /**
 * 	Allocates a new command and initializes it.
 * 	!static calloc () : Command;
 */ $1fea8365818f3b22$export$2e2bcd8739ae039.attachTo($38533842ba91c8a4$var$Command);
var $38533842ba91c8a4$export$2e2bcd8739ae039 = $38533842ba91c8a4$var$Command;




var $a6af2a760f9b0f92$export$2e2bcd8739ae039 = {
    init: function(cmd, postinit = false) {
        if (!postinit) {
            cmd.block = $d237e2e481aff2df$export$2e2bcd8739ae039.alloc();
            cmd.blocks = $f6bd4ab8b6c953de$export$2e2bcd8739ae039.Pool.alloc();
            return;
        }
        let i;
        while((i = cmd.block.commands.shift()) != null){
            let block = $d237e2e481aff2df$export$2e2bcd8739ae039.alloc();
            block.add(i);
            cmd.blocks.push(block);
        }
        cmd.block.free();
        cmd.block = null;
    },
    update: function(anim, block, cmd) {
        if (cmd.started === false) {
            for(let i = cmd.blocks.top; i !== null; i = i.next)i.value.reset(block.time);
            cmd.started = true;
        }
        let time = block.time;
        let n = 0, m = 0;
        for(let i = cmd.blocks.top; i !== null; i = i.next){
            let r = i.value.update(anim);
            if (r === true) n++;
            else if (r === null) m++;
            if (i.value.time > time) time = i.value.time;
        }
        if (n + m != cmd.blocks.length) return false;
        cmd.started = false;
        block.time = time;
        return true;
    }
};



var $d6e3dfc4a92caee2$export$2e2bcd8739ae039 = {
    init: function(cmd, postinit = false) {
        if (!postinit) cmd.block = $d237e2e481aff2df$export$2e2bcd8739ae039.alloc();
    },
    update: function(anim, block, cmd) {
        if (cmd.started === false) {
            cmd.block.reset(block.time);
            cmd.started = true;
        }
        let r = cmd.block.update(anim);
        if (r !== true) return r;
        cmd.started = false;
        block.time = cmd.block.time;
        return true;
    }
};



var $8dcba418f73a0144$export$2e2bcd8739ae039 = {
    init: function(cmd, postinit = false) {
        if (!postinit) cmd.block = $d237e2e481aff2df$export$2e2bcd8739ae039.alloc();
    },
    update: function(anim, block, cmd) {
        if (cmd.started === false) {
            cmd.block.reset(block.time);
            cmd._count = cmd.count;
            cmd.started = true;
        }
        let r = cmd.block.update(anim);
        if (r !== true) return r;
        if (cmd._count <= 1) {
            cmd.started = false;
            block.time = cmd.block.time;
            return true;
        }
        cmd.block.restart();
        cmd._count--;
        return false;
    }
};


var /*
**	froxel/anim/set.js
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
*/ $e04753046c99e53d$export$2e2bcd8739ae039 = {
    init: function(cmd, postinit = false) {},
    update: function(anim, block, cmd) {
        anim.setValue(cmd.field, anim.getValue(cmd.field, cmd.value));
        return true;
    }
};


var /*
**	froxel/anim/restart.js
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
*/ $dc1c06f5a98962b2$export$2e2bcd8739ae039 = {
    init: function(cmd, postinit = false) {},
    update: function(anim, block, cmd) {
        block.restart();
        return true;
    }
};



var $hNLgQ = parcelRequire("hNLgQ");
var $d5de86427adfe7e8$export$2e2bcd8739ae039 = {
    init: function(cmd, postinit = false) {},
    update: function(anim, block, cmd) {
        if (cmd.started === false) {
            cmd._duration = $hNLgQ.Rinn.typeOf(cmd.duration) === 'string' ? anim.getValue(cmd.duration) : cmd.duration;
            cmd.started = true;
        }
        if (anim.time < block.time + cmd._duration) return false;
        cmd.started = false;
        block.time += cmd._duration;
        return true;
    }
};



var $hNLgQ = parcelRequire("hNLgQ");
var $ac04918810ed6eb8$export$2e2bcd8739ae039 = {
    init: function(cmd, postinit = false) {},
    update: function(anim, block, cmd) {
        if (cmd.started === false) {
            cmd._startValue = anim.getValue(cmd.field, cmd.startValue);
            cmd._duration = $hNLgQ.Rinn.typeOf(cmd.duration) === 'string' ? anim.getValue(cmd.duration) : cmd.duration;
            cmd.started = true;
        }
        cmd._endValue = anim.getValue(cmd.field, cmd.endValue, cmd._startValue);
        let t = 1.0;
        if (anim.time < block.time + cmd._duration) t = (anim.time - block.time) / cmd._duration;
        if (cmd.easing && t != 1.0) anim.setValue(cmd.field, cmd.easing(t) * (cmd._endValue - cmd._startValue) + cmd._startValue);
        else anim.setValue(cmd.field, t * (cmd._endValue - cmd._startValue) + cmd._startValue);
        if (t != 1.0) return false;
        cmd.started = false;
        block.time += cmd._duration;
        return true;
    }
};



var $hNLgQ = parcelRequire("hNLgQ");
var $461857bd43c617a1$export$2e2bcd8739ae039 = {
    init: function(cmd, postinit = false) {},
    update: function(anim, block, cmd) {
        if (cmd.started === false) {
            cmd._duration = $hNLgQ.Rinn.typeOf(cmd.duration) === 'string' ? anim.getValue(cmd.duration) : cmd.duration;
            cmd._last = null;
            cmd.started = true;
        }
        let t = 1.0;
        if (anim.time < block.time + cmd._duration) t = (anim.time - block.time) / cmd._duration;
        if (cmd.easing && t != 1.0) cmd._cur = int(cmd.easing(t) * cmd.count);
        else cmd._cur = int(t * cmd.count);
        if (cmd._cur != cmd._last) {
            let val = anim.getValue(cmd.field);
            while(true){
                let i = int(Math.random() * (cmd.endValue - cmd.startValue + 1)) + cmd.startValue;
                if (i != val) break;
            }
            anim.setValue(cmd.field, i);
            cmd._last = cmd._cur;
        }
        if (t != 1.0) return false;
        cmd.started = false;
        block.time += cmd._duration;
        return true;
    }
};



var $hNLgQ = parcelRequire("hNLgQ");
var $95098de2b84f5272$export$2e2bcd8739ae039 = {
    init: function(cmd, postinit = false) {
        if (!postinit) return;
        let table = [];
        for(let i = 0; i < cmd.count; i++)table.push(i % (cmd.endValue - cmd.startValue + 1) + cmd.startValue);
        for(let i1 = cmd.count >> 2; i1 > 0; i1--){
            let a = int(Math.random() * cmd.count);
            let b = int(Math.random() * cmd.count);
            let c = table[b];
            table[b] = table[a];
            table[a] = c;
        }
        cmd.table = table;
    },
    update: function(anim, block, cmd) {
        if (cmd.started === false) {
            cmd._duration = $hNLgQ.Rinn.typeOf(cmd.duration) === 'string' ? anim.getValue(cmd.duration) : cmd.duration;
            cmd.started = true;
        }
        let t = 1.0;
        let i;
        if (anim.time < block.time + cmd._duration) t = (anim.time - block.time) / cmd._duration;
        if (cmd.easing && t != 1.0) i = cmd.easing(t) * (cmd.count - 1);
        else i = t * (cmd.count - 1);
        anim.setValue(cmd.field, cmd.table[int((i + cmd.count) % cmd.count)]);
        if (t != 1.0) return false;
        cmd.started = false;
        block.time += cmd._duration;
        return true;
    }
};


//:/**
//: * 	Class to animate properties using commands.
//: */
//!class Anim
const $58ff74473450dfff$var$Anim = $hNLgQ.Class.extend({
    className: 'Anim',
    initialData: null,
    data: null,
    blockStack: null,
    cmdStack: null,
    timeScale: 1,
    block: null,
    time: 0,
    paused: false,
    finished: false,
    running: false,
    finishedCallback: null,
    finishedCallbackHandler: null,
    finishedCallbackContext: null,
    autoDispose: false,
    __ctor: function() {
        // VIOLET: Possibly optimize this { } objects.
        this.initialData = {};
        this.data = {};
        this.block = $d237e2e481aff2df$export$2e2bcd8739ae039.alloc();
        this.blockStack = $f6bd4ab8b6c953de$export$2e2bcd8739ae039.Pool.alloc();
        this.cmdStack = $f6bd4ab8b6c953de$export$2e2bcd8739ae039.Pool.alloc();
        this.running = false;
        this.autoDispose = false;
        this.finishedCallback = null;
        this.finishedCallbackHandler = null;
        this.finishedCallbackContext = null;
        return this.reset();
    },
    __dtor: function() {
        this.block.free();
        this.blockStack.clear().free();
        this.cmdStack.clear().free();
        if (this.finishedCallbackHandler !== null) {
            this.finishedCallbackHandler.free();
            this.finishedCallbackHandler = null;
        }
        if (this.finishedCallbackContext !== null) {
            this.finishedCallbackContext.free();
            this.finishedCallbackContext = null;
        }
    },
    copyTo: function(target) {
        target.clear();
        dispose(target.block);
        target.block = this.block.clone();
        target.initialData = this.initialData;
        return target.reset();
    },
    clone: function(autoDispose = false) {
        let anim = new $58ff74473450dfff$var$Anim();
        anim.autoDispose = autoDispose;
        this.copyTo(anim);
        return anim;
    },
    onFinished: function(callback) {
        this.finishedCallback = callback;
        return this;
    },
    then: function(callback, context = null) {
        if (!callback) return this;
        if (this.finishedCallback !== this.thenCallback) {
            this.finishedCallback = this.thenCallback;
            if (this.finishedCallbackHandler === null) {
                this.finishedCallbackHandler = $f6bd4ab8b6c953de$export$2e2bcd8739ae039.Pool.alloc();
                this.finishedCallbackContext = $f6bd4ab8b6c953de$export$2e2bcd8739ae039.Pool.alloc();
            } else {
                this.finishedCallbackHandler.reset();
                this.finishedCallbackContext.reset();
            }
        }
        this.finishedCallbackHandler.push(callback);
        this.finishedCallbackContext.push(context);
        return this;
    },
    thenCallback: function() {
        if (!this.finishedCallbackHandler.length) return false;
        let context = this.finishedCallbackContext.shift();
        this.finishedCallbackHandler.shift()(this, context);
    },
    /*
	**	Clears the object, removes all commands and callbacks. The `initialData` and `data` objects aren't changed.
	*/ clear: function() {
        this.blockStack.clear();
        this.cmdStack.clear();
        this.block.clear();
        this.paused = false;
        this.finished = false;
        this.time = 0;
        this.timeScale = 1;
        if (this.finishedCallbackHandler !== null) {
            this.finishedCallbackHandler.free();
            this.finishedCallbackHandler = null;
        }
        if (this.finishedCallbackContext !== null) {
            this.finishedCallbackContext.free();
            this.finishedCallbackContext = null;
        }
        this.finishedCallback = null;
        return this;
    },
    /*
	**	Resets the animation to its initial state.
	*/ reset: function() {
        this.blockStack.clear();
        this.cmdStack.clear();
        this.block.reset();
        this.paused = false;
        this.finished = false;
        this.time = 0;
        this.timeScale = 1;
        Object.assign(this.data, this.initialData);
        return this;
    },
    /*
	**	Sets the initial data.
	*/ initial: function(data = null) {
        if (data !== null) this.initialData = data;
        Object.assign(this.data, this.initialData);
        return this;
    },
    /*
	**	Sets the time scale (animation speed).
	*/ speed: function(value) {
        this.timeScale = value > 0.0 ? value : 1.0;
        return this;
    },
    /*
	**	Sets the output data object.
	*/ output: function(data) {
        this.data = data;
        return this;
    },
    /*
	**	Pauses the animation.
	*/ pause: function() {
        if (!this.paused) this.paused = true;
        return this;
    },
    /*
	**	Resumes the animation.
	*/ resume: function() {
        this.finished = false;
        this.paused = false;
        if (!this.running) this.run(false);
        return this;
    },
    /*
	**	Begins execution of the animation.
	*/ run: function(reset = true) {
        if (this.running) return this;
        if (reset == true) this.reset();
        $ec90764150f3694e$export$2e2bcd8739ae039.update.add(this.update, this);
        this.running = true;
        return this;
    },
    /*
	**	Sets the value of a field.
	*/ setValue: function(fieldName, value) {
        let curr = this.data;
        if (typeof fieldName !== 'string') {
            if (typeof fieldName === 'function') fieldName(this, value);
            else {
                let i = 0;
                while(curr !== null && i < fieldName.length - 1)curr = curr[fieldName[i++]];
                curr[fieldName[i]] = value;
            }
        } else curr[fieldName] = value;
    },
    /*
	**	Returns the value of a field. Performs special transforms to the value if certain prefix is found.
	*/ getValue: function(fieldName, value = null, initialValue = null) {
        let curr = this.data;
        if (typeof fieldName !== 'string') {
            if (typeof fieldName === 'function') curr = fieldName(this, null);
            else {
                let i = 0;
                while(curr !== null && i < fieldName.length)curr = curr[fieldName[i++]];
            }
        } else curr = curr[fieldName];
        if (value === null) value = curr;
        if (initialValue === null) initialValue = curr;
        if (typeof value === 'string') switch(value[0]){
            case '+':
                value = initialValue + Number(value.substr(1));
                break;
            case '-':
                value = initialValue - Number(value.substr(1));
                break;
            default:
                value = Number(value);
                break;
        }
        else if (typeof value === 'function') value = value(curr, initialValue, this);
        return value;
    },
    /**
	 * Updates the animation by the specified delta, which must be in the same unit as the duration of the commands.
	 * Returns false when the animation has been completed.
	 *
	 * @param {number} dt
	 * @returns {boolean}
	 */ update: function(dt, self = null) {
        if (self === null) self = this;
        if (self.paused || self.block.isFinished()) {
            self.running = false;
            return false;
        }
        self.time += dt * self.timeScale * $58ff74473450dfff$var$Anim.timeScale;
        if (self.block.update(self) !== true) return true;
        let finished = self.finished;
        let count = self.block.length;
        let block = self.block;
        self.finished = true;
        if (!finished && self.finishedCallback !== null) {
            if (self.finishedCallback(self.data, self) === false) self.finishedCallback = null;
            if (self.block !== block || self.block.length != count) {
                self.resume();
                return true;
            }
        }
        self.running = false;
        if (self.autoDispose) dispose(self);
        return false;
    },
    /*
	**	Ensures that the field name is correct for subsequent rules.
	*/ prepareFieldName: function(value) {
        if (typeof value === 'function') return value;
        return value.indexOf('.') != -1 ? value.split('.') : value;
    },
    /* ****************************************************************************************** */ /*
	**	Runs the subsequent commands in parallel. Should end the parallel block by calling end().
	*/ parallel: function() {
        let cmd = this.block.add($38533842ba91c8a4$export$2e2bcd8739ae039.alloc($a6af2a760f9b0f92$export$2e2bcd8739ae039));
        this.blockStack.push(this.block);
        this.cmdStack.push(cmd);
        this.block = cmd.block;
        return this;
    },
    /*
	**	Runs the subsequent commands in series. Should end the serial block by calling end().
	*/ serial: function() {
        let cmd = this.block.add($38533842ba91c8a4$export$2e2bcd8739ae039.alloc($d6e3dfc4a92caee2$export$2e2bcd8739ae039));
        this.blockStack.push(this.block);
        this.cmdStack.push(cmd);
        this.block = cmd.block;
        return this;
    },
    /*
	**	Repeats a block the specified number of times.
	*/ repeat: function(count) {
        let cmd = this.block.add($38533842ba91c8a4$export$2e2bcd8739ae039.alloc($8dcba418f73a0144$export$2e2bcd8739ae039));
        cmd.count = count;
        this.blockStack.push(this.block);
        this.cmdStack.push(cmd);
        this.block = cmd.block;
        return this;
    },
    /*
	**	Ends a parallel(), serial() or repeat() block.
	*/ end: function() {
        this.cmdStack.pop().ready();
        this.block = this.blockStack.pop();
        return this;
    },
    /*
	**	Sets the value of a variable.
	*/ set: function(field, value) {
        let cmd = this.block.add($38533842ba91c8a4$export$2e2bcd8739ae039.alloc($e04753046c99e53d$export$2e2bcd8739ae039));
        cmd.field = this.prepareFieldName(field);
        cmd.value = value;
        return this;
    },
    /*
	**	Restarts the current block.
	*/ restart: function() {
        this.block.add($38533842ba91c8a4$export$2e2bcd8739ae039.alloc($dc1c06f5a98962b2$export$2e2bcd8739ae039));
        return this;
    },
    /*
	**	Waits for the specified duration.
	*/ wait: function(duration) {
        let cmd = this.block.add($38533842ba91c8a4$export$2e2bcd8739ae039.alloc($d5de86427adfe7e8$export$2e2bcd8739ae039));
        cmd.duration = duration;
        return this;
    },
    /*
	**	Sets the range of a variable.
	*/ range: function(field, duration, startValue, endValue, easing = null) {
        let cmd = this.block.add($38533842ba91c8a4$export$2e2bcd8739ae039.alloc($ac04918810ed6eb8$export$2e2bcd8739ae039));
        cmd.field = this.prepareFieldName(field);
        cmd.duration = duration;
        cmd.startValue = startValue;
        cmd.endValue = endValue;
        cmd.easing = easing;
        return this;
    },
    /*
	**	Sets the range of a variable, using the current value as startValue.
	*/ rangeTo: function(field, duration, endValue, easing = null) {
        let cmd = this.block.add($38533842ba91c8a4$export$2e2bcd8739ae039.alloc($ac04918810ed6eb8$export$2e2bcd8739ae039));
        cmd.field = this.prepareFieldName(field);
        cmd.duration = duration;
        cmd.startValue = null;
        cmd.endValue = endValue;
        cmd.easing = easing;
        return this;
    },
    /*
	**	Generates a certain amount of random numbers in the given range (inclusive).
	*/ rand: function(field, duration, count, startValue, endValue, easing = null) {
        let cmd = this.block.add($38533842ba91c8a4$export$2e2bcd8739ae039.alloc($461857bd43c617a1$export$2e2bcd8739ae039));
        cmd.field = this.prepareFieldName(field);
        cmd.duration = duration;
        cmd.count = count;
        cmd.startValue = startValue;
        cmd.endValue = endValue;
        cmd.easing = easing;
        return this;
    },
    /*
	**	Generates a certain amount of random numbers in the given range (inclusive). This uses a static random table to determine the next values.
	*/ randt: function(field, duration, count, startValue, endValue, easing) {
        let cmd = this.block.add($38533842ba91c8a4$export$2e2bcd8739ae039.alloc($95098de2b84f5272$export$2e2bcd8739ae039));
        cmd.field = this.prepareFieldName(field);
        cmd.duration = duration;
        cmd.count = count;
        cmd.startValue = startValue;
        cmd.endValue = endValue;
        cmd.easing = easing;
        cmd.ready();
        return this;
    },
    /*
	**	Plays a sound.
	*/ play: function(snd) {
        let cmd = this.block.add($38533842ba91c8a4$export$2e2bcd8739ae039.alloc(PLAY));
        cmd.snd = snd;
        return this;
    },
    /*
	**	Executes a function.
	*/ exec: function(fn) {
        let cmd = this.block.add($38533842ba91c8a4$export$2e2bcd8739ae039.alloc(EXEC));
        cmd.fn = fn;
        return this;
    },
    /* ********************************************************** */ _bounds_x1: function(anim, value) {
        if (value === null) return anim.data.bounds.x1;
        anim.data.translate(int(value) - anim.data.bounds.x1, 0);
    },
    _bounds_y1: function(anim, value) {
        if (value === null) return anim.data.bounds.y1;
        anim.data.translate(0, int(value) - anim.data.bounds.y1);
    },
    /*
	**	Sets X coordinate.
	*/ setX: function(value) {
        return this.set(this._bounds_x1, value);
    },
    /*
	**	Sets Y coordinate.
	*/ setY: function(value) {
        return this.set(this._bounds_y1, value);
    },
    /*
	**	Sets X and Y coordinates.
	*/ position: function(x, y) {
        return this.set(this._bounds_x1, x).set(this._bounds_y1, y);
    },
    /*
	**	Translates the X coordinate.
	*/ translateX: function(duration, deltaValue, easing) {
        return this.range(this._bounds_x1, duration, null, (deltaValue < 0 ? '-' : '+') + Math.abs(deltaValue), easing);
    },
    /*
	**	Translates the Y coordinate.
	*/ translateY: function(duration, deltaValue, easing) {
        return this.range(this._bounds_y1, duration, null, (deltaValue < 0 ? '-' : '+') + Math.abs(deltaValue), easing);
    },
    /*
	**	Translates the X and Y coordinates.
	*/ translate: function(duration, deltaValueX, deltaValueY, easingX, easingY = null) {
        return this.parallel().range(this._bounds_x1, duration, null, (deltaValueX < 0 ? '-' : '+') + Math.abs(deltaValueX), easingX).range(this._bounds_y1, duration, null, (deltaValueY < 0 ? '-' : '+') + Math.abs(deltaValueY), easingY ? easingY : easingX).end();
    },
    /*
	**	Sets the X and Y coordinates to the specified values.
	*/ moveTo: function(duration, endValueX, endValueY, easingX, easingY = null) {
        return this.parallel().range(this._bounds_x1, duration, null, endValueX, easingX).range(this._bounds_y1, duration, null, endValueY, easingY ? easingY : easingX).end();
    },
    /*
	**	Sets the X coordinate to the specified value.
	*/ moveX: function(duration, endValue, easing = null) {
        return this.range(this._bounds_x1, duration, null, endValue, easing);
    },
    /*
	**	Sets the Y coordinate to the specified value.
	*/ moveY: function(duration, endValue, easing = null) {
        return this.range(this._bounds_y1, duration, null, endValue, easing);
    },
    /*
	**	Scales the X coordinate.
	*/ scaleX: function(duration, endValue, easing) {
        return this.range('sx', duration, null, endValue, easing);
    },
    /*
	**	Scales the Y coordinate.
	*/ scaleY: function(duration, endValue, easing) {
        return this.range('sy', duration, null, endValue, easing);
    },
    /*
	**	Scales the X and Y coordinates.
	*/ scale: function(duration, endValueX, endValueY, easingX, easingY = null) {
        return this.parallel().range('sx', duration, null, endValueX, easingX).range('sy', duration, null, endValueY, easingY ? easingY : easingX).end();
    },
    /*
	**	Rotates a certain number of radians.
	*/ rotate: function(duration, deltaValue, easing) {
        return this.range('angle', duration, null, (deltaValue < 0 ? '-' : '+') + Math.abs(deltaValue), easing);
    }
});
/*
**	Global time scale.
*/ $58ff74473450dfff$var$Anim.timeScale = 1.0;
/*
**	Sets the global time scale (animation speed).
*/ $58ff74473450dfff$var$Anim.speed = function(value) {
    $58ff74473450dfff$var$Anim.timeScale = value > 0.0 ? value : 1.0;
};
$1fea8365818f3b22$export$2e2bcd8739ae039.createPool($58ff74473450dfff$var$Anim, 8192);
var $58ff74473450dfff$export$2e2bcd8739ae039 = $58ff74473450dfff$var$Anim;




var $hNLgQ = parcelRequire("hNLgQ");


//![import "../math/bounds2"]
//![import "../utils/handler"]
//:/**
//: * 	Describes an element that can be added to a grid.
//: */
//!class GridElement
const $9e0453cff9bc3880$var$GridElement = $hNLgQ.Class.extend({
    /*
	**	Name of the class (for inheritance purposes).
	*/ className: 'GridElement',
    /**
	 * 	Identifier of the element (string).
	 * 	!id: string;
	 */ id: null,
    /**
	 * 	Bounds of the element.
	 * 	!bounds: Bounds2;
	 */ bounds: null,
    /**
	 * 	Flags of the element (see constants of this class).
	 * 	!flags: number;
	 */ flags: 0,
    /**
	 * 	Generic data of the element, used to store some value or object.
	 * 	!data: object;
	 */ data: null,
    /**
	 * 	Extension object of the element, can be used to implement specific functionality.
	 * 	!ext: object;
	 */ ext: null,
    /**
	 * 	The container where the element is stored.
	 */ container: null,
    /**
	 * 	Removal callback node added by Grid.
	 */ _grid_remove_node: null,
    /**
	 * 	Remover runs when the `remove` method of the element is called or when the element is destroyed.
	 */ remover: null,
    /**
	 * 	Constructs the instance at the specified position and with the specified size.
	 * 	!constructor (x: number, y: number, width: number, height: number);
	 */ __ctor: function(x, y, width, height) {
        this.bounds = $6c1a77cc22998ccc$export$2e2bcd8739ae039.Pool.alloc();
        this.bounds.translate(x, y);
        this.bounds.resize(width, height, true);
        this.flags = $9e0453cff9bc3880$var$GridElement.ALIVE | $9e0453cff9bc3880$var$GridElement.VISIBLE | $9e0453cff9bc3880$var$GridElement.DIRTY | $9e0453cff9bc3880$var$GridElement.DEPTH_FLAG;
        this.data = null;
        this.ext = null;
        this.remover = $628f585857a65401$export$2e2bcd8739ae039.Pool.alloc(this);
    },
    /**
	 * 	Removes the element from its container and destroys it.
	 */ __dtor: function() {
        this.alive(false);
        if (this.data !== null) {
            dispose(this.data);
            this.data = null;
        }
        this.remover.exec();
        this.remover.free();
        this.bounds.free();
    },
    /**
	 * 	Sets the identifier of the element.
	 * 	!setId (value: string) : GridElement;
	 */ setId: function(value) {
        this.id = value;
        return this;
    },
    /**
	 * 	Sets bits of the element flags.
	 * 	!setFlags (value: number) : GridElement;
	 */ setFlags: function(value) {
        this.flags |= value;
        return this;
    },
    /**
	 * 	Clears bits from the element flags.
	 * 	!clearFlags (value: number) : GridElement;
	 */ clearFlags: function(value) {
        this.flags &= ~value;
        return this;
    },
    /**
	 * 	Returns true if masking (bitwise AND) the flags by the specified flag bits results in the given value.
	 * 	!getFlags (andMask: number, value?: number) : boolean;
	 */ getFlags: function(andMask, value = null) {
        if (value === null) return (this.flags & andMask) === andMask;
        return (this.flags & andMask) === value;
    },
    /**
	 * 	Sets the generic data of the element. Will be disposed when the element is destroyed.
	 * 	!setData (data: object) : GridElement;
	 */ setData: function(data) {
        this.data = data;
        return this;
    },
    /**
	 * 	Returns the generic data of the element.
	 * 	!getData() : object;
	 */ getData: function() {
        return this.data;
    },
    /**
	 * 	Sets the extension object of the element. Calls to functions of this object should be done using the `exec` method.
	 * 	!setExt (extensionObject: object) : GridElement;
	 */ setExt: function(extensionObject) {
        this.ext = extensionObject;
        return this;
    },
    /**
	 * 	Returns the extension object of the element.
	 * 	!getExt() : object;
	 */ getExt: function() {
        return this.ext;
    },
    /**
	 * Executes a function of the extension object.
	 * @param {string} name
	 * !exec (name: string, ...args: any) : any;
	 */ exec: function(name, arg0 = null, arg1 = null, arg2 = null, arg3 = null, arg4 = null, arg5 = null, arg6 = null, arg7 = null, arg8 = null, arg9 = null) {
        if (this.ext === null || !this.ext.hasOwnProperty(name)) return false;
        return this.ext[name](this, arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9);
    },
    /**
	 * Sets the visible flag.
	 * @param {boolean} value - New visibility value.
	 * @param {boolean} forced - When `true` forces to ignore the VISIBLE_LOCK flag.
	 * !visible (value: boolean, forced?: boolean|false) : GridElement;
	 */ /**
	 * Returns the visible flag.
	 * !visible() : boolean;
	 */ visible: function(value = null, forced = false) {
        if (value === null) return !!(this.flags & $9e0453cff9bc3880$var$GridElement.VISIBLE);
        if (!forced && this.flags & $9e0453cff9bc3880$var$GridElement.VISIBLE_LOCK) return this;
        this.flags &= ~$9e0453cff9bc3880$var$GridElement.VISIBLE;
        if (value) this.flags |= $9e0453cff9bc3880$var$GridElement.VISIBLE;
        return this;
    },
    /**
	 * 	Sets the visible-lock flag.
	 * 	!visibleLock (value: boolean) : GridElement;
	 */ /**
	 * 	Returns the visible-lock flag.
	 * 	!visibleLock() : boolean;
	 */ visibleLock: function(value = null) {
        if (value === null) return !!(this.flags & $9e0453cff9bc3880$var$GridElement.VISIBLE_LOCK);
        this.flags &= ~$9e0453cff9bc3880$var$GridElement.VISIBLE_LOCK;
        if (value) this.flags |= $9e0453cff9bc3880$var$GridElement.VISIBLE_LOCK;
        return this;
    },
    /**
	 * 	Sets the alive flag.
	 * 	!alive (value: boolean) : GridElement;
	 */ /**
	 * 	Returns the alive flag.
	 * 	!alive() : boolean;
	 */ alive: function(value = null) {
        if (value === null) return !!(this.flags & $9e0453cff9bc3880$var$GridElement.ALIVE);
        this.flags &= ~$9e0453cff9bc3880$var$GridElement.ALIVE;
        if (value) this.flags |= $9e0453cff9bc3880$var$GridElement.ALIVE;
        return this;
    },
    /**
	 * 	Sets the dirty flag.
	 * 	!alive (value: boolean) : GridElement;
	 */ /**
	 * 	Returns the dirty flag.
	 * 	!alive() : boolean;
	 */ dirty: function(value = null) {
        if (value === null) return !!(this.flags & $9e0453cff9bc3880$var$GridElement.DIRTY);
        this.flags &= ~$9e0453cff9bc3880$var$GridElement.DIRTY;
        if (value) this.flags |= $9e0453cff9bc3880$var$GridElement.DIRTY;
        return this;
    },
    /**
	 * 	Sets the depth-flag-enabled flag.
	 * 	!depthFlagEnabled (value: boolean) : GridElement;
	 */ /**
	 * 	Returns the depth-flag-enabled flag.
	 * 	!depthFlagEnabled() : boolean;
	 */ depthFlagEnabled: function(value = null) {
        if (value === null) return !!(this.flags & $9e0453cff9bc3880$var$GridElement.DEPTH_FLAG_ENABLED);
        this.flags &= ~$9e0453cff9bc3880$var$GridElement.DEPTH_FLAG_ENABLED;
        if (value) this.flags |= $9e0453cff9bc3880$var$GridElement.DEPTH_FLAG_ENABLED;
        return this;
    },
    /**
	 * 	Sets the depth-flag flag. To actually use the depth-test, you have to enable the depth-flag using `depthFlagEnabled`.
	 * 	!depthFlagEnabled (value: boolean) : GridElement;
	 */ /**
	 * 	Returns the depth-flag flag.
	 * 	!depthFlagEnabled() : boolean;
	 */ depthFlag: function(value = null) {
        if (value === null) return !!(this.flags & $9e0453cff9bc3880$var$GridElement.DEPTH_FLAG);
        this.flags &= ~$9e0453cff9bc3880$var$GridElement.DEPTH_FLAG;
        if (value) this.flags |= $9e0453cff9bc3880$var$GridElement.DEPTH_FLAG;
        return this;
    },
    /**
	 * 	Removes the element from the container and returns itself.
	 * 	!remove() : GridElement;
	 */ remove: function() {
        this.remover.exec();
        return this;
    },
    /**
	 * 	Syncs the actual location of the specified element with its storage location (if alive and dirty).
	 * 	!sync() : GridElement;
	 */ sync: function() {
        if (this.container === null || !this.getFlags($9e0453cff9bc3880$var$GridElement.ALIVE | $9e0453cff9bc3880$var$GridElement.DIRTY)) return this;
        this.container.sync(this);
        return this;
    },
    /**
	 * 	Sets the width and height of the element.
	 * 	!resize (width: number|boolean|null, height: number|boolean|null) : GridElement;
	 */ resize: function(width, height) {
        this.flags |= $9e0453cff9bc3880$var$GridElement.DIRTY;
        this.bounds.resize(width, height, true);
        return this;
    },
    /**
	 * 	Resizes the element by the specified deltas.
	 * 	!resizeBy (deltaWidth: number|boolean, deltaHeight: number|boolean) : GridElement;
	 */ resizeBy: function(dWidth, dHeight) {
        this.flags |= $9e0453cff9bc3880$var$GridElement.DIRTY;
        this.bounds.resizeBy(dWidth, dHeight, true);
        return this;
    },
    /**
	 * 	Moves the element by the specified deltas.
	 * 	@param upscaled - When `true` the `dx` and `dy` parameters are assumed to be upscaled.
	 * 	!translate (dx: number, dy: number, upscaled?: boolean) : GridElement;
	 */ translate: function(dx, dy, upscaled = false) {
        this.flags |= $9e0453cff9bc3880$var$GridElement.DIRTY;
        this.bounds.translate(dx, dy, upscaled);
        return this;
    },
    /**
	 * 	Sets the position of the element. Any parameter set to `null` will cause it not to be changed.
	 * 	!setPosition (x: number, y: number) : GridElement;
	 */ /**
	 * 	Sets the position of the element. Any parameter set to `null` will cause it not to be changed.
	 * 	!setPosition (pointer: {x:number, y:number}) : GridElement;
	 */ setPosition: function(x, y = false) {
        if (y === false) {
            y = x.y;
            x = x.x;
        }
        return this.translate(x !== null ? upscale(x) - this.bounds.ux1 : 0, y !== null ? upscale(y) - this.bounds.uy1 : 0, true);
    }
});
/*
**	Grid element flags.
*/ $9e0453cff9bc3880$var$GridElement.ALIVE = 0x0001;
$9e0453cff9bc3880$var$GridElement.VISIBLE = 0x0002;
$9e0453cff9bc3880$var$GridElement.VISIBLE_LOCK = 0x0004;
$9e0453cff9bc3880$var$GridElement.DIRTY = 0x0008;
$9e0453cff9bc3880$var$GridElement.DEPTH_FLAG_ENABLED = 0x0010;
$9e0453cff9bc3880$var$GridElement.DEPTH_FLAG = 0x0020;
$9e0453cff9bc3880$var$GridElement.WRAP_EXTENTS = 0x0040;
$9e0453cff9bc3880$var$GridElement.USERDEF = 0x0100; /* Bits 8 to 30 : 23 flags  */ 
$9e0453cff9bc3880$var$GridElement.LAST_FLAG = 0x0080;
/**
 * 	Class-level function to allocate a new flag.
 * 	!static allocFlag() : number;
 */ $9e0453cff9bc3880$var$GridElement.allocFlag = function() {
    let flag = $9e0453cff9bc3880$var$GridElement.LAST_FLAG;
    if (flag === 0x4000_0000) throw new Error('allocFlag: out of bit space to allocate another flag');
    flag <<= 1;
    $9e0453cff9bc3880$var$GridElement.LAST_FLAG = flag;
    return flag;
};
var $9e0453cff9bc3880$export$2e2bcd8739ae039 = $9e0453cff9bc3880$var$GridElement;



var $hNLgQ = parcelRequire("hNLgQ");


//![import "./grid-element"]
//![import "../utils/list"]
//:/**
//: * 	Describes an optimized data structure to store 2D spatially indexed elements.
//: */
//!class Grid
const $e7931fc5aea618d9$var$Grid = $hNLgQ.Class.extend({
    /**
	 * 	Name of the class (for inheritance purposes).
	 */ className: 'Grid',
    /**
	 * 	Actual grid of data, stored linearly. Contains several entries each of which can be either null or a List containing grid elements.
	 */ grid: null,
    /**
	 * 	Number of elements active in the grid.
	 * 	!readonly count: number;
	 */ count: 0,
    /**
	 * 	The X and Y offsets to be added to all input coordinates. Used to ensure that a negative coordinate always ends up positive, calculated
	 * 	using the width and height of the grid.
	 */ offsx: 0,
    offsy: 0,
    /**
	 * 	Divisors for the X and Y coordinates respectively. All input coordinates (after offseting) will be divided by these values to map them
	 * 	to a grid entry (list) where the element can be added.
	 */ kx: 0,
    ky: 0,
    /**
	 * 	Stride to calculate an index with a Y-coordinate.
	 */ stride: 0,
    /**
	 * 	Indicates if the grid should match regions with exact precision by comparing region to element bounds intersection.
	 * 	!verifyIntersection: boolean;
	 */ verifyIntersection: true,
    /**
	 * 	Constructs a grid with the specified maximum width and height. The final effective coordinate range will be -(width/2) to (width/2)for X,
	 * 	and -(height/2) to (height/2) for Y.
	 * 
	 * 	Note that the width, height and divisors kx and ky will be converted to their closest base-2 value. This is done to ensure shifts can be used
	 * 	to quickly divide the input coordinates.
	 * 
	 * 	!constructor (width: number, height: number, kx: number, ky?: number);
	 */ __ctor: function(width, height, kx, ky = null) {
        width = 1 << Math.ceil(Math.log2(width));
        height = 1 << Math.ceil(Math.log2(height));
        this.offsx = width >> 1;
        this.offsy = height >> 1;
        if (ky === null) ky = kx;
        kx = Math.floor(Math.log2(kx));
        ky = Math.floor(Math.log2(ky));
        this.kx = kx;
        this.ky = ky;
        let w = width >> kx;
        let h = height >> ky;
        if (!w) {
            kx = Math.log2(width);
            w = 1;
        }
        if (!h) {
            ky = Math.log2(height);
            h = 1;
        }
        this.grid = new Array(w * h).fill(null);
        this.stride = w;
    },
    /**
	 * 	Destroys all lists and elements in the grid.
	 */ __dtor: function() {
        this.clear();
        this.grid = null;
    },
    /**
	 * 	Destroys all lists and elements in the grid.
	 * 	!clear() : void;
	 */ clear: function() {
        for(let i = 0; i < this.grid.length; i++){
            if (this.grid[i] === null) continue;
            let j;
            while((j = this.grid[i].shift()) !== null){
                j.remover.remove(this._remove, this);
                j.container = null;
                dispose(j);
            }
            this.grid[i].free();
            this.grid[i] = null;
        }
        this.count = 0;
    },
    /**
	 * 	Destroys all lists in the grid. Elements will not be destroyed.
	 * 	!reset() : void;
	 */ reset: function() {
        for(let i = 0; i < this.grid.length; i++){
            if (this.grid[i] === null) continue;
            let j;
            while((j = this.grid[i].shift()) !== null){
                j.remover.remove(this._remove, this);
                j.container = null;
            }
            this.grid[i].free();
            this.grid[i] = null;
        }
        this.count = 0;
    },
    /**
	 * 	Adds an element to the grid. Returns `true` if successful, or `false` if the element is outside of the grid bounds.
	 * 	!add (elem: GridElement) : boolean;
	 */ add: function(elem) {
        if (!$9e0453cff9bc3880$export$2e2bcd8739ae039.isInstance(elem)) throw new Error('argument must be a GridElement');
        let i = int(elem.bounds.y1 + this.offsy >> this.ky) * this.stride + int(elem.bounds.x1 + this.offsx >> this.kx);
        if (i < 0 || i >= this.grid.length) return false;
        if (this.grid[i] === null) this.grid[i] = $f6bd4ab8b6c953de$export$2e2bcd8739ae039.Pool.alloc();
        this.grid[i].push(elem);
        this.count++;
        elem.container = this;
        elem._grid_remove_node = elem.remover.add(this._remove, this, i, this.grid[i].bottom);
        return true;
    },
    /**
	 * 	Callback to remove an element from the grid (called by Handler).
	 */ _remove: function(elem, self, index, node) {
        self.grid[index].remove(node);
        self.count--;
        elem.container = null;
        return false;
    },
    /**
	 * 	Removes the element from the grid and returns it.
	 * 	!remove (elem: GridElement) : GridElement;
	 */ remove: function(elem) {
        elem.remover.execc(this._grid_remove_node);
        return elem;
    },
    /**
	 * 	Updates the storage location of the specified element. Returns `true` if successful, or `false` if the element is outside of the grid bounds (in
	 * 	which case the element will be removed), or if the element does not belong to this grid.
	 * 	!sync (elem: GridElement) : boolean;
	 */ sync: function(elem) {
        elem.clearFlags($9e0453cff9bc3880$export$2e2bcd8739ae039.DIRTY);
        let node = elem._grid_remove_node;
        let i = int(elem.bounds.y1 + this.offsy >> this.ky) * this.stride + int(elem.bounds.x1 + this.offsx >> this.kx);
        if (i < 0 || i >= this.grid.length) {
            elem.remover.execc(node);
            return false;
        }
        if (node.arg1 === i) return true;
        this.grid[node.arg1].remove(node.arg2);
        if (this.grid[i] === null) this.grid[i] = $f6bd4ab8b6c953de$export$2e2bcd8739ae039.Pool.alloc();
        this.grid[i].push(elem);
        node.arg1 = i;
        node.arg2 = this.grid[i].bottom;
        return true;
    },
    /**
	 * 	Executes the specified callback function for each element that intersects the given bounds and has the specified flags set. The process is immediately
	 * 	stopped if the callback returns `false`.
	 * 	!forEachInRegion (bounds: Bounds2|Rect, flagsAndMask: number, flagsValue: number, callback: (elem: GridElement, context?: object) => boolean, context?: object) : void;
	 */ forEachInRegion: function(bounds, flagsAndMask, flagsValue, callback, context) {
        let j0 = (bounds.y1 + this.offsy - (1 << this.ky - 1) >> this.ky) * this.stride;
        let j1 = (bounds.y2 + this.offsy + (1 << this.ky - 1) >> this.ky) * this.stride;
        let i0 = bounds.x1 + this.offsx - (1 << this.kx - 1) >> this.kx;
        let i1 = bounds.x2 + this.offsx + (1 << this.kx - 1) >> this.kx;
        let n = this.grid.length - 1;
        if (j0 < 0) j0 = 0;
        if (j1 < 0) j1 = 0;
        if (i0 < 0) i0 = 0;
        if (i1 < 0) i1 = 0;
        if (j0 > n) j0 = n;
        if (j1 > n) j1 = n;
        if (i0 > n) i0 = n;
        if (i1 > n) i1 = n;
        for(let j = j0; j <= j1; j += this.stride)for(let i = i0; i <= i1; i++){
            let k = j + i;
            if (k > n || this.grid[k] === null) continue;
            for(let e = this.grid[k].top; e; e = e.next){
                // First check the element flags.
                if (!e.value.getFlags(flagsAndMask, flagsValue)) continue;
                // Verify exact intersection only on elements located on the edges of the indexed-based approximated rectangle.
                if (this.verifyIntersection && (j <= j0 + 1 || i <= i0 + 1 || j >= j1 - 1 || i >= i1 - 1) && !e.value.bounds.intersects(bounds)) continue;
                if (callback(e.value, context) === false) return;
            }
        }
    },
    /**
	 * 	Collects all elements that intersect the given bounds and have the specified flags set. Returns a new List, remember to call `free` after using it.
	 * 	!selectInRegion (bounds: Bounds2|Rect, flagsAndMask: number, flagsValue: number) : List;
	 */ selectInRegion: function(bounds, flagsAndMask, flagsValue) {
        let j0 = (bounds.y1 + this.offsy - (1 << this.ky - 1) >> this.ky) * this.stride;
        let j1 = (bounds.y2 + this.offsy + (1 << this.ky - 1) >> this.ky) * this.stride;
        let i0 = bounds.x1 + this.offsx - (1 << this.kx - 1) >> this.kx;
        let i1 = bounds.x2 + this.offsx + (1 << this.kx - 1) >> this.kx;
        let n = this.grid.length - 1;
        if (j0 < 0) j0 = 0;
        if (j1 < 0) j1 = 0;
        if (i0 < 0) i0 = 0;
        if (i1 < 0) i1 = 0;
        if (j0 > n) j0 = n;
        if (j1 > n) j1 = n;
        if (i0 > n) i0 = n;
        if (i1 > n) i1 = n;
        let list = $f6bd4ab8b6c953de$export$2e2bcd8739ae039.Pool.alloc();
        for(let j = j0; j <= j1; j += this.stride)for(let i = i0; i <= i1; i++){
            let k = j + i;
            if (k > n || this.grid[k] === null) continue;
            for(let e = this.grid[k].top; e; e = e.next){
                // First check the element flags.
                if (!e.value.getFlags(flagsAndMask, flagsValue)) continue;
                // Verify exact intersection only on elements located on the edges of the indexed-based approximated rectangle.
                if (this.verifyIntersection && (j <= j0 + 1 || i <= i0 + 1 || j >= j1 - 1 || i >= i1 - 1) && !e.value.bounds.intersects(bounds)) continue;
                list.push(e.value);
            }
        }
        return list;
    },
    /**
	 * 	Counts all elements that intersect the given bounds and have the specified flags set.
	 * 	!countInRegion (bounds: Bounds2|Rect, flagsAndMask: number, flagsValue: number) : number;
	 */ countInRegion: function(bounds, flagsAndMask, flagsValue) {
        let j0 = (bounds.y1 + this.offsy - (1 << this.ky - 1) >> this.ky) * this.stride;
        let j1 = (bounds.y2 + this.offsy + (1 << this.ky - 1) >> this.ky) * this.stride;
        let i0 = bounds.x1 + this.offsx - (1 << this.kx - 1) >> this.kx;
        let i1 = bounds.x2 + this.offsx + (1 << this.kx - 1) >> this.kx;
        let n = this.grid.length - 1;
        if (j0 < 0) j0 = 0;
        if (j1 < 0) j1 = 0;
        if (i0 < 0) i0 = 0;
        if (i1 < 0) i1 = 0;
        if (j0 > n) j0 = n;
        if (j1 > n) j1 = n;
        if (i0 > n) i0 = n;
        if (i1 > n) i1 = n;
        let m = 0;
        for(let j = j0; j <= j1; j += this.stride)for(let i = i0; i <= i1; i++){
            let k = j + i;
            if (k > n || this.grid[k] === null) continue;
            for(let e = this.grid[k].top; e; e = e.next){
                // First check the element flags.
                if (!e.value.getFlags(flagsAndMask, flagsValue)) continue;
                // Verify exact intersection only on elements located on the edges of the indexed-based approximated rectangle.
                if (this.verifyIntersection && (j <= j0 + 1 || i <= i0 + 1 || j >= j1 - 1 || i >= i1 - 1) && !e.value.bounds.intersects(bounds)) continue;
                m++;
            }
        }
        return m;
    },
    /**
	 * 	Returns the first element that intersect the given bounds and have the specified flags set.
	 * 	!selectFirst (bounds: Bounds2|Rect, flagsAndMask: number, flagsValue: number) : GridElement;
	 */ selectFirst: function(bounds, flagsAndMask, flagsValue) {
        let j0 = (bounds.y1 + this.offsy - (1 << this.ky - 1) >> this.ky) * this.stride;
        let j1 = (bounds.y2 + this.offsy + (1 << this.ky - 1) >> this.ky) * this.stride;
        let i0 = bounds.x1 + this.offsx - (1 << this.kx - 1) >> this.kx;
        let i1 = bounds.x2 + this.offsx + (1 << this.kx - 1) >> this.kx;
        let n = this.grid.length - 1;
        if (j0 < 0) j0 = 0;
        if (j1 < 0) j1 = 0;
        if (i0 < 0) i0 = 0;
        if (i1 < 0) i1 = 0;
        if (j0 > n) j0 = n;
        if (j1 > n) j1 = n;
        if (i0 > n) i0 = n;
        if (i1 > n) i1 = n;
        for(let j = j0; j <= j1; j += this.stride)for(let i = i0; i <= i1; i++){
            let k = j + i;
            if (k > n || this.grid[k] === null) continue;
            for(let e = this.grid[k].top; e; e = e.next){
                // First check the element flags.
                if (!e.value.getFlags(flagsAndMask, flagsValue)) continue;
                // Verify exact intersection only on elements located on the edges of the indexed-based approximated rectangle.
                if (this.verifyIntersection && (j <= j0 + 1 || i <= i0 + 1 || j >= j1 - 1 || i >= i1 - 1) && !e.value.bounds.intersects(bounds)) continue;
                return e.value;
            }
        }
        return null;
    }
});
var $e7931fc5aea618d9$export$2e2bcd8739ae039 = $e7931fc5aea618d9$var$Grid;



var $hNLgQ = parcelRequire("hNLgQ");

var $hNLgQ = parcelRequire("hNLgQ");

//:/**
//: * 	A container is responsible to store elements for their subsequent rendering. The actual storage mechanism used can vary and must be implemented by derived
//: * 	classes (see `GridContainer` and `SimpleContainer`).
//: */
//!class Container
const $56aaa5487c41abd4$var$Container = $hNLgQ.Class.extend({
    className: 'Container',
    /**
	 * Viewport bounds currently active. Set by the Scene class before calling `draw`.
	 * !viewportBounds: Bounds2;
	 */ viewportBounds: null,
    /**
	 * Width of the container.
	 * !width: number;
	 */ width: 0,
    /**
	 * Height of the container.
	 * !height: number;
	 */ height: 0,
    /**
	 * Depth (z-value) of the container, calculated by the scene.
	 * !zvalue: number;
	 */ zvalue: 0,
    /**
	 * Scene object to which this container belongs.
	 * !scene: Scene;
	 */ scene: null,
    /**
	 * Flags of the object (see constants at the bottom of this file).
	 * !flags: number;
	 */ flags: 0,
    /**
	 * Currently active display buffer for rendering operations (used by drawElement).
	 * !g: Canvas;
	 */ g: null,
    /**
	 * Total number of elements in the container.
	 * !readonly elementCount: number;
	 */ elementCount: 0,
    /**
	 * Total number of elements drawn on the last draw operation.
	 * !readonly drawCount: number;
	 */ drawCount: 0,
    /**
	 * Draw handler executed after the scene is drawn.
	 * !readonly ldraw: Handler;
	 */ ldraw: null,
    /**
	 * Constructs the container with the default size (32768 x 32768).
	 * !constructor ();
	 */ /**
	 * Constructs the container with the specified size.
	 * !constructor (width: number, height: number);
	 */ __ctor: function(width = 32768, height = 32768) {
        this.width = width;
        this.height = height;
        this.flags = $56aaa5487c41abd4$var$Container.VISIBLE | $56aaa5487c41abd4$var$Container.DEPTH_FLAG;
        this.ldraw = $628f585857a65401$export$2e2bcd8739ae039.Pool.alloc(this);
    },
    /**
	 * Destroys the container.
	 */ __dtor: function() {
        this.ldraw.free();
    },
    /**
	 * Returns the value of the `visible` flag.
	 * !visible() : boolean;
	 */ /**
	 * Sets the value of the `visible` flag.
	 * !visible(value: boolean) : Container;
	 */ visible: function(value = null) {
        if (value === null) return !!(this.flags & $56aaa5487c41abd4$var$Container.VISIBLE);
        this.flags &= ~$56aaa5487c41abd4$var$Container.VISIBLE;
        if (value) this.flags |= $56aaa5487c41abd4$var$Container.VISIBLE;
        return this;
    },
    /**
	 * Returns the value of the `depthFlag` flag.
	 * !depthFlag() : boolean;
	 */ /**
	 * Sets the value of the `depthFlag` flag.
	 * !depthFlag(value: boolean) : Container;
	 */ depthFlag: function(value = null) {
        if (value === null) return !!(this.flags & $56aaa5487c41abd4$var$Container.DEPTH_FLAG);
        this.flags &= ~$56aaa5487c41abd4$var$Container.DEPTH_FLAG;
        if (value) this.flags |= $56aaa5487c41abd4$var$Container.DEPTH_FLAG;
        return this;
    },
    /**
	 * Sets the active viewport bounds.
	 * !setViewportBounds (bounds: Bounds2) : Container;
	 */ setViewportBounds: function(bounds) {
        this.viewportBounds = bounds;
        return this;
    },
    /**
	 * Draws the specified element.
	 * !drawElement (elem: Element, self: Container) : boolean;
	 */ drawElement: function(elem, self) {
        self.drawCount++;
        return elem.draw(self.g);
    },
    /**
	 * Updates the Z-value of the specified element. Should be called after adding an element and after/before every sync.
	 * !syncZ (elem: Element) : void;
	 */ syncZ: function(elem) {
        elem.__zvalue = this.zvalue + (elem._zvalue + elem.bounds.y2 & 262143);
    //elem.__zvalue = this.zvalue + (1 << 18) - ((elem._zvalue + elem.bounds.y2 + (1 << 18)) & ((1 << 18) - 1));
    },
    /**
	 * Syncs the actual location of the specified element with its storage location. Returns true if successful.
	 * !sync (elem: Element) : boolean;
	 */ sync: function(elem) {
        throw new Error('Container::sync not implemented');
    },
    /**
	 * Clears the container to empty. All contained elements will be destroyed.
	 * !clear() : void;
	 */ clear: function() /* @override */ {
        throw new Error('Container::clear not implemented');
    },
    /**
	 * Resets the container to empty. Contained elements are not destroyed. Use `clear` if that is your intention.
	 * !reset() : void;
	 */ reset: function() /* @override */ {
        throw new Error('Container::reset not implemented');
    },
    /**
	 * Adds an element to the container. Returns boolean indicating if successful.
	 * !add (elem: Element) : boolean;
	 */ add: function(elem) /* @override */ {
        throw new Error('Container::add not implemented');
    },
    /**
	 * Removes an element from the container and returns it.
	 * !remove (elem: Element) : Element;
	 */ remove: function(elem) /* @override */ {
        throw new Error('Container::remove not implemented');
    },
    /**
	 * Prepares the canvas with depth flag configuration and Z-value to draw the contained elements.
	 * !draw (g: Canvas) : void;
	 */ draw: function(g) {
        if (!this.visible()) return;
        let depthFlagChanged = g.pushDepthFlag(this.flags & $56aaa5487c41abd4$var$Container.DEPTH_FLAG);
        g.zvalue = this.zvalue;
        this.drawCount = 0;
        this.g = g;
        this.render();
        this.ldraw.exec(g);
        if (depthFlagChanged) g.popDepthFlag();
    },
    /**
	 * Actually draws the contained elements.
	 * !render() : void;
	 */ render: function() {
        throw new Error('Container::render not implemented');
    }
});
/*
**	Constants.
*/ $56aaa5487c41abd4$var$Container.VISIBLE = 0x001;
$56aaa5487c41abd4$var$Container.DEPTH_FLAG = 0x002;
var $56aaa5487c41abd4$export$2e2bcd8739ae039 = $56aaa5487c41abd4$var$Container;



var $hNLgQ = parcelRequire("hNLgQ");


//![import "../math/point2"]
//![import "../math/bounds2"]
//![import "../math/rect"]
//![import "../system/canvas"]
//:/**
//: * 	Viewport class controls the current visible rectangle of a container.
//: */
//!class Viewport
const $f3e0869e47faa7b4$var$Viewport = $hNLgQ.Class.extend({
    className: 'Viewport',
    /**
	 * 	Dimensions of the viewport.
	 *
	 * 	!readonly width: number;
	 * 	!readonly height: number;
	 */ width: 0,
    initialWidth: 0,
    height: 0,
    initialHeight: 0,
    /**
	 * 	Position of the top-left corner of the viewport in screen space.
	 */ sx: 0,
    sy: 0,
    /**
	 * 	Position of the center of the viewport in the container.
	 */ x: 0,
    y: 0,
    /**
	 * 	Ratio for the viewport's center (value from -1 to 1), used when focusing to use a different focus point instead of the exact center.
	 */ centerRatioX: 0,
    centerRatioY: 0,
    /**
	 * 	Position offset, used to move the viewport around without affecting the focus point.
	 */ offset: null,
    /**
	 * 	Boundaries of the container, set by `setContainerBounds`.
	 *
	 * 	!readonly container: Bounds2;
	 */ container: null,
    /**
	 * 	The focus factor determines the ratio of a smaller viewport on which the current focus point must  be contained. If the focus point is not inside the
	 * 	smaller viewport scrolling will be performed.
	 */ focusFactorX: 0,
    focusFactorY: 0,
    /**
	 * 	Focus target rectangle and its offsets. When the viewport is updated it will automatically focus on this rect.
	 */ focusRect: null,
    focusOffsX: 0,
    focusOffsY: 0,
    /**
	 * 	Enabled focus axes. Used by the `update` method to figure which axis to update.
	 */ focusAxisX: true,
    focusAxisY: true,
    /**
	 * 	Flags of the viewport.
	 */ flags: 0,
    /**
	 * 	Viewport scale.
	 */ scale: 1,
    /**
	 * 	Global scale, used to scale the entire canvas including the viewport. Useful for debugging viewport bounds.
	 */ globalScale: 1,
    /**
	 * 	Bounds of the viewport in world space. Used to determine which elements lie inside the viewport.
	 *
	 * 	!readonly bounds: Bounds2;
	 */ bounds: null,
    /**
	 * 	Extra padding for the viewport bounds. Used to extend the viewport bounds without altering the original viewport size nor the world bounds.
	 */ padding: null,
    /**
	 * 	Bounds of the focus area of the viewport in world space. When the `focusRect` moves outside this area the viewport will be panned to keep it inside these bounds.
	 * 
	 * 	!readonly focusBounds: Bounds2;
	 */ focusBounds: null,
    /**
	 * 	Bounds of the viewport in screen space, used as target rendering area.
	 *
	 *	!readonly screenBounds: Bounds2;
	 */ screenBounds: null,
    /**
	 * 	Temporal Point2 object used as temporary result for `toWorldSpace` and `toScreenSpace`.
	 */ tmpPoint: null,
    /**
	 * 	Constructs the viewport with the specified size and container dimensions.
	 *
	 * 	@param sx - Screen position X.
	 * 	@param sy - Screen position Y.
	 * 	@param width - Viewport width.
	 * 	@param height - Viewport height.
	 * 	@param containerWidth - Container width.
	 * 	@param containerHeight - Container height.
	 *
	 * 	!constructor (sx: number, sy: number, width: number, height: number, containerWidth: number, containerHeight: number);
	 */ __ctor: function(sx, sy, width, height, containerWidth, containerHeight) {
        this.focusFactorX = 0.4;
        this.focusFactorY = 0.4;
        this.focusRect = null;
        this.sx = sx;
        this.sy = sy;
        this.width = this.initialWidth = width;
        this.height = this.initialHeight = height;
        this.x = 0;
        this.y = 0;
        this.bounds = $6c1a77cc22998ccc$export$2e2bcd8739ae039.Pool.alloc();
        this.padding = null;
        this.focusBounds = $6c1a77cc22998ccc$export$2e2bcd8739ae039.Pool.alloc();
        this.screenBounds = $6c1a77cc22998ccc$export$2e2bcd8739ae039.Pool.alloc();
        this.container = $6c1a77cc22998ccc$export$2e2bcd8739ae039.Pool.alloc();
        this.offset = $ba17a79a5d342faa$export$2e2bcd8739ae039.Pool.alloc();
        this.flags = $f3e0869e47faa7b4$var$Viewport.ENABLED;
        this.tmpPoint = $ba17a79a5d342faa$export$2e2bcd8739ae039.Pool.alloc();
        this.setContainerBounds(-containerWidth >> 1, -containerHeight >> 1, containerWidth >> 1, containerHeight >> 1);
        this.updateScreenBounds();
        this.updateBounds();
    },
    /**
	 * 	Destructs the viewport.
	 */ __dtor: function() {
        this.bounds.free();
        this.focusBounds.free();
        this.screenBounds.free();
        this.container.free();
        this.tmpPoint.free();
        if (this.padding !== null) this.padding.free();
    },
    /**
	 * 	Returns the value of the `enabled` flag.
	 *
	 * 	!enabled() : boolean;
	 */ /**
	 * 	Sets the `enabled` flag.
	 *
	 * 	!enabled (value: boolean) : Viewport;
	 */ enabled: function(value = null) {
        if (value === null) return !!(this.flags & $f3e0869e47faa7b4$var$Viewport.ENABLED);
        this.flags &= ~$f3e0869e47faa7b4$var$Viewport.ENABLED;
        if (value) this.flags |= $f3e0869e47faa7b4$var$Viewport.ENABLED;
        return this;
    },
    /**
	 * 	Returns the value of the `topLeft` flag.
	 * 	!topLeft() : boolean;
	 */ /**
	 * 	Sets the `topLeft` flag.
	 * 	!topLeft (value: boolean) : Viewport;
	 */ topLeft: function(value = null) {
        if (value === null) return !!(this.flags & $f3e0869e47faa7b4$var$Viewport.TOP_LEFT);
        this.flags &= ~$f3e0869e47faa7b4$var$Viewport.TOP_LEFT;
        if (value) this.flags |= $f3e0869e47faa7b4$var$Viewport.TOP_LEFT;
        return this;
    },
    /**
	 * 	Sets the container bounds. Used to ensure the viewport bounds are never outside these limits.
	 *
	 * 	!setContainerBounds (x1: number, y1: number, x2: number, y2: number) : Viewport;
	 */ /**
	 * 	Sets the container bounds. Used to ensure the viewport bounds are never outside these limits.
	 *
	 * 	!setContainerBounds (v: Bounds2|Rect) : Viewport;
	 */ setContainerBounds: function(x1, y1 = null, x2 = null, y2 = null) {
        if (y1 === null) {
            y2 = x1.y2;
            x2 = x1.x2;
            y1 = x1.y1;
            x1 = x1.x1;
        }
        this.width = this.initialWidth;
        this.height = this.initialHeight;
        if (this.width > x2 - x1) this.width = x2 - x1;
        if (this.height > y2 - y1) this.height = y2 - y1;
        this.container.set(x1, y1, x2, y2);
        return this;
    },
    /**
	 * 	Sets the viewport padding.
	 *
	 * 	!setPadding (value: number) : Viewport;
	 */ /**
	 * 	Sets the padding of each side of the viewport (left, top, right and bottom).
	 *
	 * 	!setPadding (x1: number, y1: number, x2: number, y2: number) : Viewport;
	 */ setPadding: function(x1, y1 = null, x2 = null, y2 = null) {
        if (this.padding === null) this.padding = $6c1a77cc22998ccc$export$2e2bcd8739ae039.Pool.alloc();
        if (y1 === null) {
            x2 = y2 = x1;
            x1 = y1 = -x1;
        }
        this.padding.set(x1, y1, x2, y2);
        return this;
    },
    /**
	 * 	Updates the bound rect of the viewport.
	 */ updateBounds: function(truncateToContainer = false) {
        let w, h, ws, hs;
        let x1, y1, x2, y2;
        w = this.width >> 1;
        h = this.height >> 1;
        ws = w / this.scale;
        hs = h / this.scale;
        x1 = this.x - ws + this.offset.x;
        y1 = this.y - hs + this.offset.y;
        x2 = this.x + ws + this.offset.x;
        y2 = this.y + hs + this.offset.y;
        if (truncateToContainer) {
            if (x1 < this.container.x1) this.offset.setX(this.container.x1 - this.x + ws);
            else if (x2 > this.container.x2) this.offset.setX(this.container.x2 - this.x - ws);
            if (y1 < this.container.y1) this.offset.setY(this.container.y1 - this.y + hs);
            else if (y2 > this.container.y2) this.offset.setY(this.container.y2 - this.y - hs);
            x1 = this.x - ws + this.offset.x;
            y1 = this.y - hs + this.offset.y;
            x2 = this.x + ws + this.offset.x;
            y2 = this.y + hs + this.offset.y;
        }
        this.bounds.set(x1, y1, x2, y2);
        if (this.padding !== null) this.bounds.add(this.padding);
        this.focusBounds.set(this.x - (this.focusFactorX * w + this.centerRatioX * w) / this.scale, this.y - (this.focusFactorY * h + this.centerRatioY * h) / this.scale, this.x + (this.focusFactorX * w + this.centerRatioX * w) / this.scale, this.y + (this.focusFactorY * h + this.centerRatioY * h) / this.scale);
    },
    /**
	 * 	Updates the screen bound rect of the viewport.
	 */ updateScreenBounds: function() {
        this.screenBounds.set(this.sx, this.sy, this.sx + this.width, this.sy + this.height);
    },
    /**
	 * 	Resizes the viewport to the specified size.
	 *
	 * 	!resize (width: number|null, height: number|null) : Viewport;
	 */ resize: function(width, height) {
        this.width = this.initialWidth = width !== null && width !== void 0 ? width : this.width;
        this.height = this.initialHeight = height !== null && height !== void 0 ? height : this.height;
        this.updateScreenBounds();
        this.updateBounds();
        return this;
    },
    /**
	 * 	Resizes the viewport by the specified deltas.
	 *
	 * 	!resizeBy (dWidth: number, dHeight: number) : Viewport;
	 */ resizeBy: function(dWidth, dHeight) {
        this.width += dWidth;
        this.height += dHeight;
        this.initialWidth = this.width;
        this.initialHeight = this.height;
        this.updateScreenBounds();
        this.updateBounds();
        return this;
    },
    /**
	 * Sets the position of the viewport's center within the world and resets the relative offset to zero.
	 * Setting any parameter to `null` will cause it not to be changed.
	 * 
	 * !setPosition (x: number|null, y: number|null) : Viewport;
	 */ setPosition: function(x, y) {
        this.x = x !== null && x !== void 0 ? x : this.x;
        this.y = y !== null && y !== void 0 ? y : this.y;
        this.offset.set(0, 0);
        this.updateBounds();
        return this;
    },
    /**
	 * 	Sets the position of the viewport relative to the current focus point.
	 * 
	 * 	!setOffsets (dx: number, dy: number) : Viewport;
	 */ setOffsets: function(dx, dy) {
        this.offset.set(dx, dy);
        this.updateBounds();
        return this;
    },
    /**
	 * 	Sets the scale of the viewport.
	 * 
	 * 	!setScale (value: number) : Viewport;
	 */ setScale: function(value) {
        this.scale = value;
        this.updateBounds();
        return this;
    },
    /**
	 * 	Returns the scale of the viewport.
	 * 
	 * 	!getScale () : number;
	 */ getScale: function() {
        return this.scale;
    },
    /**
	 * 	Sets the global scale of the viewport.
	 * 
	 * 	!setGlobalScale (value: number) : Viewport;
	 */ setGlobalScale: function(value) {
        this.globalScale = value;
        return this;
    },
    /**
	 * 	Returns the global scale of the viewport.
	 * 
	 * 	!getGlobalScale () : number;
	 */ getGlobalScale: function() {
        return this.globalScale;
    },
    /**
	 * 	Sets the center ratio of the viewport (values from -1 to 1, default is 0). Used to focus on a different point instead of the exact center.
	 * 
	 * 	!setCenter (rx: number, ry: number) : Viewport;
	 */ setCenter: function(rx, ry) {
        this.centerRatioX = rx;
        this.centerRatioY = ry;
        return this;
    },
    /**
	 * 	Moves the viewport within the world. Values are relative to the current focus point.
	 *	@param truncateToContainer - When `true` the final viewport bounds will be ensured to not lie outside the container bounds.
	 *
	 * 	!translate (dx: number, dy: number, truncateToContainer?: boolean) : Viewport;
	 */ translate: function(dx, dy, truncateToContainer = false) {
        this.offset.add(dx, dy);
        this.updateBounds(truncateToContainer);
        return this;
    },
    /**
	 * 	Sets the screen position of the viewport.
	 * 
	 * 	!setScreenPosition (sx: number, sy: number) : number;
	 */ setScreenPosition: function(sx, sy) {
        this.sx = sx;
        this.sy = sy;
        this.updateScreenBounds();
        return this;
    },
    /**
	 * 	Returns the X coordinate of the viewport's focus point inside the world.
	 * 	@param absolute - When `true`, the focus point X (without offset) will be returned.
	 * 	
	 * 	!getX (absolute?: boolean) : number;
	 */ getX: function(absolute = false) {
        return this.x + (absolute ? 0 : this.offset.x);
    },
    /**
	 * 	Returns the Y coordinate of the viewport's focus point inside the world.
	 * 	@param absolute - When `true`, the focus point Y (without offset) will be returned.
	 * 	
	 * 	!getY (absolute?: boolean) : number;
	 */ getY: function(absolute = false) {
        return this.y + (absolute ? 0 : this.offset.y);
    },
    /**
	 * 	Returns the X position of the viewport inside the world relative to the current focus point.
	 * 
	 * 	!getOffsetX() : void;
	 */ getOffsetX: function() {
        return this.offset.x;
    },
    /**
	 * 	Returns the Y position of the viewport inside the world relative to the current focus point.
	 * 
	 * 	!getOffsetY() : void;
	 */ getOffsetY: function() {
        return this.offset.y;
    },
    /**
	 * 	Returns the width of the viewport.
	 * 
	 * 	!getWidth() : number;
	 */ getWidth: function() {
        return this.width;
    },
    /**
	 * 	Returns the height of the viewport.
	 * 
	 * 	!getHeight() : number;
	 */ getHeight: function() {
        return this.height;
    },
    /**
	 * 	Moves the viewport X coordinate to focus on the specified line or coordinate. Method `updateBounds` should be called afterwards.
	 * 
	 * 	!focusX (x0: number, x1?: number, factor?: number) : Viewport;
	 */ focusX: function(i0, i1 = null, kx = null) {
        if (kx === null) kx = this.focusFactorX;
        if (i1 === null) i1 = i0;
        let w = this.width >> 1;
        let x1 = this.x - int((kx * w + this.centerRatioX * w) / this.scale);
        let x2 = this.x + int((kx * w + this.centerRatioX * w) / this.scale);
        if (x1 == x2) i0 = i1 = i0 + i1 >> 1;
        let nx = this.x;
        if (i0 < x1) nx += i0 - x1;
        else if (i1 > x2) nx += i1 - x2;
        x1 = nx - w;
        x2 = nx + w;
        if (x1 < this.container.x1) nx = this.container.x1 + w;
        if (x2 > this.container.x2) nx = this.container.x2 - w;
        this.x = nx;
        return this;
    },
    /**
	 * 	Moves the viewport Y coordinate to focus on the specified line or coordinate. Method `updateBounds` should be called afterwards.
	 * 
	 * 	!focusY (y0: number, y1?: number, factor?: number) : Viewport;
	 */ focusY: function(j0, j1 = null, ky = null) {
        if (ky === null) ky = this.focusFactorY;
        if (j1 === null) j1 = j0;
        let h = this.height >> 1;
        let y1 = this.y - int((ky * h + this.centerRatioY * h) / this.scale);
        let y2 = this.y + int((ky * h + this.centerRatioY * h) / this.scale);
        if (y1 == y2) j0 = j1 = j0 + j1 >> 1;
        let ny = this.y;
        if (j0 < y1) ny += j0 - y1;
        else if (j1 > y2) ny += j1 - y2;
        y1 = ny - h;
        y2 = ny + h;
        if (y1 < this.container.y1) ny = this.container.y1 + h;
        if (y2 > this.container.y2) ny = this.container.y2 - h;
        this.y = ny;
        return this;
    },
    /**
	 * 	Updates the viewport to focus on the focusRect. Takes into account enabled axes.
	 *
	 * 	!update (dt?: number) : void;
	 */ update: function(dt = 0) {
        if (this.focusRect === null) return;
        if (this.focusAxisX) this.focusX(this.focusRect.x1 + this.focusOffsX, this.focusRect.x2 + this.focusOffsX);
        if (this.focusAxisY) this.focusY(this.focusRect.y1 + this.focusOffsY, this.focusRect.y2 + this.focusOffsY);
        this.updateBounds();
    },
    /**
	 * 	Updates the viewport to focus on the focusRect ignoring the enabled axes.
	 *
	 * 	!updateForced (dt?: number) : void;
	 */ updateForced: function(dt = 0) {
        if (this.focusRect === null) return;
        this.focusX(this.focusRect.x1 + this.focusOffsX, this.focusRect.x2 + this.focusOffsX);
        this.focusY(this.focusRect.y1 + this.focusOffsY, this.focusRect.y2 + this.focusOffsY);
        this.updateBounds();
    },
    /**
	 * 	Tracks a specified rectangle by maintaining focus on it (a call to `update` must be made on every frame update).
	 * 
	 * 	!setFocusRect (rect: Rect|Bounds2, offsX?: number, offsY? :number) : Viewport;
	 */ setFocusRect: function(rect, offsX = 0, offsY = 0) {
        this.focusRect = rect;
        this.focusOffsX = offsX;
        this.focusOffsY = offsY;
        this.update(0);
        return this;
    },
    /**
	 * 	Sets the focus offsets of the viewport. Used to translate the viewport without altering the focus point.
	 *
	 * 	!setFocusOffsets (offsX: number, offsY: number) : Viewport;
	 */ setFocusOffsets: function(offsX, offsY) {
        this.focusOffsX = offsX;
        this.focusOffsY = offsY;
        return this;
    },
    /**
	 * 	Sets the enabled flag of the focus axes. Only enabled axes will be updated when calling `update`.
	 * 
	 * 	!setFocusAxes (enabledX: boolean, enabledY: boolean) : Viewport;
	 */ setFocusAxes: function(enabledX, enabledY) {
        this.focusAxisX = enabledX;
        this.focusAxisY = enabledY;
        return this;
    },
    /**
	 * 	Sets the focus factor of the viewport (value from 0 to 1), that is, the ratio of the smaller focus viewport.
	 * 
	 * 	!setFocusFactor (valueX: number, valueY: number) : Viewport;
	 */ setFocusFactor: function(valueX, valueY) {
        this.focusFactorX = valueX;
        this.focusFactorY = valueY === undefined ? valueX : valueY;
        return this;
    },
    /**
	 * 	Applies the viewport clipping area to the specified canvas.
	 * 
	 * 	!applyClip (g: Canvas) : void;
	 */ applyClip: function(g) {
        g.clip(this.screenBounds.x1, this.screenBounds.y1, this.screenBounds.width(), this.screenBounds.height());
    },
    /**
	 * 	Applies the viewport transform to the specified canvas.
	 * 
	 * 	!applyTransform (g: Canvas) : void;
	 */ applyTransform: function(g) {
        if (!(this.flags & $f3e0869e47faa7b4$var$Viewport.TOP_LEFT)) g.translate(this.screenBounds.cx, this.screenBounds.cy);
        else g.translate(this.screenBounds.x1, this.screenBounds.y1);
        if (this.scale != 1.0) g.scale(this.scale, this.scale);
        if (this.globalScale != 1.0) g.scale(this.globalScale, this.globalScale);
        if (!(this.flags & $f3e0869e47faa7b4$var$Viewport.TOP_LEFT)) g.translate(-this.bounds.cx, -this.bounds.cy);
        else g.translate(-this.bounds.x1, -this.bounds.y1);
        g.updateTransform();
    },
    /**
	 * 	Converts a point from screen-space to world-space.
	 * 	@returns Temporal Point2 object.
	 *
	 * 	!toWorldSpace (input: Point2|Vec2|{x:number,y:number}, floor?: boolean) : Point2;
	 */ /**
	 * 	Converts a point from screen-space to world-space.
	 * 	@returns Temporal Point2 object.
	 *
	 * 	!toWorldSpace (x: number, y: number, floor?: boolean) : Point2;
	 */ toWorldSpace: function(x, y = null, floor = false) {
        if (y === null || y === true) {
            floor = y === true;
            y = x.y;
            x = x.x;
        }
        let refX, refY;
        if (!(this.flags & $f3e0869e47faa7b4$var$Viewport.TOP_LEFT)) {
            refX = this.screenBounds.cx;
            refY = this.screenBounds.cy;
            if (floor) {
                x = (x - int(refX)) / this.scale + int(this.bounds.cx);
                y = (y - int(refY)) / this.scale + int(this.bounds.cy);
            } else {
                x = (x - refX) / this.scale + this.bounds.cx;
                y = (y - refY) / this.scale + this.bounds.cy;
            }
        } else {
            refX = this.screenBounds.x1;
            refY = this.screenBounds.y1;
            if (floor) {
                x = (x - int(refX)) / this.scale + int(this.bounds.x1);
                y = (y - int(refY)) / this.scale + int(this.bounds.y1);
            } else {
                x = (x - refX) / this.scale + this.bounds.x1;
                y = (y - refY) / this.scale + this.bounds.y1;
            }
        }
        return this.tmpPoint.set(x, y);
    },
    /**
	 * 	Converts a point from world-space to screen-space.
	 * 	@returns Temporal Point2 object.
	 *
	 * 	!toScreenSpace (input: Point2|Vec2|{x:number,y:number}, floor?: boolean) : Point2;
	 */ /**
	 * 	Converts a point from world-space to screen-space.
	 * 	@returns Temporal Point2 object.
	 *
	 * 	!toScreenSpace (x: number, y: number, floor?: boolean) : Point2;
	 */ toScreenSpace: function(x, y = null, floor = false) {
        if (y === null || y === true) {
            floor = y === true;
            y = x.y;
            x = x.x;
        }
        let refX, refY;
        if (!(this.flags & $f3e0869e47faa7b4$var$Viewport.TOP_LEFT)) {
            refX = this.screenBounds.cx;
            refY = this.screenBounds.cy;
            if (floor) {
                x = (x - int(this.bounds.cx)) * this.scale + int(refX);
                y = (y - int(this.bounds.cy)) * this.scale + int(refY);
            } else {
                x = (x - this.bounds.cx) * this.scale + refX;
                y = (y - this.bounds.cy) * this.scale + refY;
            }
        } else {
            refX = this.screenBounds.x1;
            refY = this.screenBounds.y1;
            if (floor) {
                x = (x - int(this.bounds.x1)) * this.scale + int(refX);
                y = (y - int(this.bounds.y1)) * this.scale + int(refY);
            } else {
                x = (x - this.bounds.x1) * this.scale + refX;
                y = (y - this.bounds.y1) * this.scale + refY;
            }
        }
        return this.tmpPoint.set(x, y);
    }
});
/*
**	Constants.
*/ $f3e0869e47faa7b4$var$Viewport.ENABLED = 0x001;
$f3e0869e47faa7b4$var$Viewport.TOP_LEFT = 0x002;
var $f3e0869e47faa7b4$export$2e2bcd8739ae039 = $f3e0869e47faa7b4$var$Viewport;








//![import "./grid-element"]
//![import "../system/globals"]
//![import "../utils/recycler"]
//![import "../system/system"]
//![import "../system/canvas"]
//![import "../system/shader-program"]
//:/**
//: * Describes an element that can be rendered to the screen.
//: */
//!class Element extends GridElement
const $09f047381ad3e737$var$Element = $9e0453cff9bc3880$export$2e2bcd8739ae039.extend({
    className: 'Element',
    /**
	 * Parent group to whom this element is related.
	 * !group: Group;
	 */ group: null,
    /**
	 * Drawable object to render to the display.
	 * !img: Drawable;
	 */ img: null,
    /**
	 * Indicates if the bounds of the element should be drawn (for debugging purposes). You can set it to a boolean or to a number from 1 to 7 to
	 * draw the bounds with a different predefined color.
	 * !debugBounds: boolean|number;
	 */ debugBounds: false,
    /**
	 * Basic depth (z-value) of the element (used for depth micro-adjustments).
	 */ _zvalue: 0,
    /**
	 * Actual depth (z-value) of the element, calculated by the container.
	 */ __zvalue: 0,
    /**
	 * Alpha value of the element.
	 */ _alpha: 1.0,
    /**
	 * Element shader program.
	 */ _shaderProgram: null,
    /**
	 * Function used to set the uniforms of the shader.
	 */ _uniformSetter: null,
    /**
	 * Function used to render the element. Called by `draw` after rendering configuration has been set.
	 * @type {(g:Canvas, elem:Element, img:Drawable) => void}
	 */ render: null,
    /**
	 * Constructs a drawable element at the specified position with the given drawable.
	 * !constructor (x: number, y: number, width: number, height: number, img?: Drawable);
	 */ /**
	 * Constructs a drawable element at the specified position with the given drawable.
	 * !constructor (x: number, y: number, img?: Drawable);
	 */ __ctor: function(x, y, width = null, height = null, img = null) {
        if (width === null) width = height = 0;
        if (height === null) {
            img = width;
            width = img.width;
            height = img.height;
        }
        this._super.GridElement.__ctor(x, y, width, height);
        this.img = img !== null ? img.getDrawable() : img;
        this.group = null;
        this.debugBounds = false;
        this._zvalue = 0;
        this.__zvalue = 0;
        this._alpha = 1.0;
        this._shaderProgram = null;
        this._uniformSetter = null;
        this.render = null;
    },
    /**
	 * Destroys the element.
	 */ __dtor: function() {
        if (this.img !== null) {
            dispose(this.img);
            this.img = null;
        }
        this._super.GridElement.__dtor();
    },
    /**
	 * Destroys the element later by adding it to the scene's destruction queue. If the element has no container, it will be destroyed immediately.
	 * !destroyLater() : void;
	 */ destroyLater: function() {
        if (!this.alive()) return;
        if (this.container !== null) this.container.scene.disposeLater(this);
        else dispose(this);
    },
    /**
	 * Returns the `debugBounds` of the element.
	 * @returns {number}
	 * !debug () : number;
	 */ /**
	 * Sets the `debugBounds` of the element.
	 * @param {boolean|number} value
	 * @returns {Element}
	 * !debug (value: number) : Element;
	 */ debug: function(value = null) {
        if (value === null) return this.debugBounds;
        this.debugBounds = value === 0 ? true : value;
        return this;
    },
    /**
	 * Returns the alpha value of the element.
	 * @returns {number}
	 * !alpha () : number;
	 */ /**
	 * Sets the alpha value of the element.
	 * @param {number} value
	 * @returns {Element}
	 * !alpha (value: number) : Element;
	 */ alpha: function(value = null) {
        if (value === null) return this._alpha;
        this._alpha = value;
        return this;
    },
    /**
	 * Returns the zvalue of the element.
	 * @returns {number}
	 * !zvalue () : number;
	 */ /**
	 * Sets the zvalue of the element.
	 * @param {number} value
	 * @returns {Element}
	 * !zvalue (value: number) : Element;
	 */ zvalue: function(value = null) {
        if (value === null) return this._zvalue;
        this._zvalue = value;
        return this;
    },
    /**
	 * Returns the shader program of the element.
	 * @returns {ShaderProgram}
	 * !shaderProgram () : ShaderProgram;
	 */ /**
	 * Sets the shader program of the element.
	 * @param {ShaderProgram} shaderProgram
	 * @returns {Element}
	 * !shaderProgram (shaderProgram: ShaderProgram|string) : Element;
	 */ shaderProgram: function(shaderProgram = false) {
        if (shaderProgram === false) return this._shaderProgram;
        if (typeof shaderProgram === 'string') shaderProgram = $427f4d3ec70ccf6e$export$2e2bcd8739ae039.get(shaderProgram);
        this._shaderProgram = shaderProgram;
        return this;
    },
    /**
	 * Sets the uniform setter function.
	 * @param { (pgm:ShaderProgram, elem:Element, gl:WebGLRenderingContext) => void } uniformSetter
	 * @returns {Element}
	 * !uniformSetter (uniformSetter: (pgm:ShaderProgram, elem:Element, gl:WebGLRenderingContext) => void) : Element;
	 */ uniformSetter: function(uniformSetter) {
        this._uniformSetter = uniformSetter;
        return this;
    },
    /**
	 * Draws the element on the specified canvas.
	 * @param {Canvas} g
	 */ draw: function(g) {
        if (this.img !== null || this.render !== null) {
            let shaderChanged = this._shaderProgram !== null ? g.pushShaderProgram(this._shaderProgram) : false;
            let depthFlagChanged = this.depthFlagEnabled() ? g.pushDepthFlag(this.depthFlag()) : false;
            if (this._shaderProgram !== null && this._uniformSetter !== null && g.gl !== null) this._uniformSetter(g.getShaderProgram(), this, g.gl);
            g.zvalue = this.__zvalue;
            if (this._alpha != 1.0) {
                g.pushAlpha();
                g.alpha(this._alpha);
            }
            if (this.render !== null) this.render(g, this, this.img);
            else this.img.render(g, this);
            if (depthFlagChanged) g.popDepthFlag();
            if (shaderChanged) g.popShaderProgram();
            if (this._alpha != 1.0) g.popAlpha();
        }
        /* *********** */ if ($fdb3e373096c6ca3$export$2e2bcd8739ae039.debugBounds || this.debugBounds) {
            let m = g.getMatrix();
            g = $c5f44d8482fd28c9$export$2e2bcd8739ae039.displayBuffer2;
            g.pushMatrix();
            g.loadMatrix(m);
            g.fillStyle($09f047381ad3e737$var$Element.getDebugColor(this.debugBounds));
            g.fillRect(this.bounds.x1, this.bounds.y1, this.bounds.width(), this.bounds.height());
            g.popMatrix();
        }
    },
    /**
	 * Changes the function used to render the element.
	 * @param { (g:Canvas, elem:Element, img:Drawable) => void } renderFunction
	 * @returns {Element}
	 */ renderWith: function(renderFunction) {
        this.render = renderFunction !== null && renderFunction !== void 0 ? renderFunction : null;
        return this;
    }
});
/**
 * Colors for the bounds debugging.
 * !static debugColors : Array<string>;
 */ $09f047381ad3e737$var$Element.debugColors = [
    'rgba(0,255,255,0.35)',
    'rgba(255,255,0,0.35)',
    'rgba(255,0,255,0.35)',
    'rgba(255,255,255,0.35)',
    'rgba(255,0,0,0.35)',
    'rgba(0,255,0,0.35)',
    'rgba(0,0,255,0.35)',
    'rgba(128,128,128,0.35)' // Gray
];
/**
 * Returns an RGBA color for the given `debugBounds` value.
 * !static getDebugColor (debugBounds: boolean|number) : string;
 */ $09f047381ad3e737$var$Element.getDebugColor = function(debugBounds) {
    if (debugBounds === true || debugBounds === false) debugBounds = 0;
    return $09f047381ad3e737$var$Element.debugColors[~~debugBounds & 7];
};
//!/class
//!namespace Element
//!namespace Pool
/**
	 * Allocates a drawable element at the specified position with the given drawable.
	 * !function alloc (x: number, y: number, width: number, height: number, img?: Drawable) : Element;
	 */ /**
	 * Allocates a drawable element at the specified position with the given drawable.
	 * !function alloc (x: number, y: number, img?: Drawable) : Element;
	 */ $1fea8365818f3b22$export$2e2bcd8739ae039.createPool($09f047381ad3e737$var$Element);
var $09f047381ad3e737$export$2e2bcd8739ae039 = $09f047381ad3e737$var$Element;






//![import "./element"]
//![import "../utils/list"]
//![import "../math/point2"]
//![import "../utils/recycler"]
const $db57198fb17fd645$var$tempPoint = $ba17a79a5d342faa$export$2e2bcd8739ae039.Pool.alloc();
//:/**
//: * 	Groups one or more elements into a single one.
//: */
//!class Group extends Element
const $db57198fb17fd645$var$Group = $09f047381ad3e737$export$2e2bcd8739ae039.extend({
    className: 'Group',
    /**
	 * List of elements in the group.
	 * !readonly children: List;
	 */ children: null,
    /**
	 * 	Virtual zero reference point.
	 * 	!readonly ref: Point2;
	 */ ref: null,
    /**
	 * 	Constructs an empty Group element.
	 * 	!constructor (id?: string);
	 */ __ctor: function(id = null) {
        this._super.Element.__ctor(0, 0, 0, 0);
        this.children = $f6bd4ab8b6c953de$export$2e2bcd8739ae039.Pool.alloc();
        this.bounds.reset();
        this.ref = $ba17a79a5d342faa$export$2e2bcd8739ae039.Pool.alloc();
        this.setId(id);
    },
    /**
	 * 	Destroys the group and all children.
	 */ __dtor: function() {
        this.clear();
        this.children.free();
        this.ref.free();
        this._super.Element.__dtor();
    },
    /**
	 * 	Adds the group itself and all children to the scene's destruction queue. If any element has no container, it will be destroyed immediately.
	 * 	!destroyLater() : void;
	 */ destroyLater: function() {
        if (!this.alive()) return;
        let i;
        while((i = this.children.shift()) != null){
            i.remover.remove(this._remove, this);
            i.group = null;
            i.destroyLater();
        }
        this._super.Element.destroyLater();
    },
    /**
	 * 	Removes and destroys all child elements.
	 * 	!clear() : Group;
	 */ clear: function() {
        let i;
        while((i = this.children.shift()) != null){
            i.remover.remove(this._remove, this);
            i.group = null;
            dispose(i);
        }
        return this;
    },
    /**
	 * 	Removes all child elements but does not destroy them.
	 * 	!reset() : Group;
	 */ reset: function() {
        let i;
        while((i = this.children.shift()) != null){
            i.remover.remove(this._remove, this);
            i.group = null;
        }
        return this;
    },
    /**
	 * Returns the wrapExtents flag of the group.
	 * @returns {boolean}
	 * !wrapExtents () : boolean;
	 */ /**
	 * Sets the wrapExtents flag of the group.
	 * @param {boolean} value
	 * @returns {Group}
	 * !wrapExtents (value: boolean) : Group;
	 */ wrapExtents: function(value = null) {
        if (value === null) return !!(this.flags & $9e0453cff9bc3880$export$2e2bcd8739ae039.WRAP_EXTENTS);
        this.flags &= ~$9e0453cff9bc3880$export$2e2bcd8739ae039.WRAP_EXTENTS;
        if (value) this.flags |= $9e0453cff9bc3880$export$2e2bcd8739ae039.WRAP_EXTENTS;
        return this;
    },
    /**
	 * 	Adds a child element to the group. If the element has its `id` property set, it will be added to the group as a
	 * 	property, which can be accessed directly using the element identifier or using the `getChild` method.
	 * 	!addChild (elem: Element) : Element;
	 */ addChild: function(elem, relative = false) {
        if (!elem) return elem;
        let initial = this.bounds.x1 === null;
        if (initial || this.flags & $9e0453cff9bc3880$export$2e2bcd8739ae039.WRAP_EXTENTS) {
            if (initial || elem.bounds.x1 < this.bounds.x1) this.ltranslate(elem.bounds.x1 - this.bounds.x1, 0);
            if (initial || elem.bounds.y1 < this.bounds.y1) this.ltranslate(0, elem.bounds.y1 - this.bounds.y1);
            if (initial || elem.bounds.x2 > this.bounds.x2) this.resizeBy(elem.bounds.x2 - this.bounds.x2, 0);
            if (initial || elem.bounds.y2 > this.bounds.y2) this.resizeBy(0, elem.bounds.y2 - this.bounds.y2);
        }
        this.children.push(elem);
        if (elem.id !== null) this[elem.id] = elem;
        if (relative === true) elem.translate(this.bounds.x1, this.bounds.y1);
        elem.group = this;
        elem.remover.add(this._remove, this, this.children.bottom);
        return elem;
    },
    /**
	 * 	Return the child element matching the specified identifier.
	 * 	!child (id: string) : Element;
	 */ getChild: function(id) {
        return this[id] || null;
    },
    /**
	 * 	Callback to remove an element from the container (called by Handler).
	 */ _remove: function(elem, self, node) {
        self.children.remove(node);
        elem.group = null;
        if (elem.id !== null) self[elem.id] = null;
        return false;
    },
    /**
	 * 	Removes an element from the container and returns it.
	 * 	!removeChild (elem: Element) : Element;
	 */ removeChild: function(elem) {
        if (!elem || elem.group !== this) return elem;
        elem.remover.execf(this._remove, this);
        return elem;
    },
    /**
	 * 	Syncs the actual location of the specified element with its storage location. Returns `true` if successful.
	 */ sync: function() {
        for(let i = this.children.top; i; i = i.next)i.value.sync();
        return this._super.Element.sync();
    },
    /**
	 * 	Local group translation, moves only the group by the specified deltas. Child elements remain in position.
	 * 	@param upscaled - When `true` the `dx` and `dy` parameters are assumed to be upscaled.
	 * 	!ltranslate (dx: number, dy: number, upscaled?: boolean) : Group;
	 */ ltranslate: function(dx, dy, upscaled = false) {
        return this._super.Element.translate(dx, dy, upscaled);
    },
    /**
	 * 	Moves the group and all children by the specified deltas.
	 * 	@param upscaled - When `true` the `dx` and `dy` parameters are assumed to be upscaled.
	 * 	!ltranslate (dx: number, dy: number, upscaled?: boolean) : Group;
	 */ translate: function(dx, dy, upscaled = false) {
        let _dx = this.bounds.x1;
        let _dy = this.bounds.y1;
        this._super.Element.translate(dx, dy, upscaled);
        this.ref.add(dx, dy, upscaled);
        _dx = this.bounds.x1 - _dx;
        _dy = this.bounds.y1 - _dy;
        for(let i = this.children.top; i; i = i.next)i.value.translate(_dx, _dy);
        return this;
    },
    /**
	 * 	Returns a temporal Point2, describing the extra offset introduced by the group when translating a child element by the specified deltas.
	 * 	@param upscaled - When `true` the `dx` and `dy` parameters are assumed to be upscaled.
	 * 	!getOffsets (dx: number, dy: number, upscaled?: boolean) : Point2;
	 */ getOffsets: function(dx, dy, upscaled = false) {
        $db57198fb17fd645$var$tempPoint.set(this.bounds.ux1, this.bounds.uy1, true);
        let _dx = $db57198fb17fd645$var$tempPoint.x;
        let _dy = $db57198fb17fd645$var$tempPoint.y;
        $db57198fb17fd645$var$tempPoint.add(dx, dy, upscaled);
        _dx = $db57198fb17fd645$var$tempPoint.x - _dx;
        _dy = $db57198fb17fd645$var$tempPoint.y - _dy;
        $db57198fb17fd645$var$tempPoint.set(_dx, _dy);
        $db57198fb17fd645$var$tempPoint.x -= dx;
        $db57198fb17fd645$var$tempPoint.y -= dy;
        return $db57198fb17fd645$var$tempPoint;
    },
    /**
	 * 	Sets bits of the element flags in the group and all children.
	 * 	!setFlags (value: number) : Group;
	 */ setFlags: function(value) {
        for(let i = this.children.top; i; i = i.next)i.value.setFlags(value);
        return this._super.Element.setFlags(value);
    },
    /**
	 * 	Clears bits from the group and all children flags.
	 * 	!clearFlags (value: number) : Group;
	 */ clearFlags: function(value) {
        for(let i = this.children.top; i; i = i.next)i.value.clearFlags(value);
        return this._super.Element.clearFlags(value);
    },
    /**
	 * Sets the visible flag of the group and all children.
	 * @param {boolean} value - New visibility value.
	 * @param {boolean} forced - When `true` forces to ignore the VISIBLE_LOCK flag.
	 * !visible (value: boolean, forced?: boolean|false) : GridElement;
	 */ /**
	 * Returns the visible flag.
	 * !visible() : boolean;
	 */ visible: function(value = null, forced = false) {
        if (value === null) return this._super.Element.visible();
        for(let i = this.children.top; i; i = i.next)i.value.visible(value, forced);
        return this._super.Element.visible(value, forced);
    },
    /**
	 * Returns the alpha value of the group.
	 * @returns {number}
	 * !alpha () : number;
	 */ /**
	 * Sets the alpha value of the group and all children.
	 * @param {number} value
	 * @returns {Element}
	 * !alpha (value: number) : Element;
	 */ alpha: function(value = null) {
        if (value === null) return this._super.Element.alpha();
        for(let i = this.children.top; i; i = i.next)i.value.alpha(value);
        return this._super.Element.alpha(value);
    }
});
//!/class
//!namespace Group
//!namespace Pool
/**
	 * 	Allocates an empty Group element.
	 * 	!function alloc (id?: string) : Group;
	 */ $1fea8365818f3b22$export$2e2bcd8739ae039.createPool($db57198fb17fd645$var$Group);
var $db57198fb17fd645$export$2e2bcd8739ae039 = $db57198fb17fd645$var$Group;







//![import "./container"]
//![import "./viewport"]
//![import "./group"]
//![import "../math/bounds2"]
//![import "../utils/list"]
//![import "../utils/handler"]
//![import "../system/globals"]
//:/**
//: * 	A scene is a set of containers, viewports and groups. Rendering is done in their specific index-based order.
//: */
//!class Scene
const $1e3a2ce488585bd2$var$Scene = $hNLgQ.Class.extend({
    className: 'Scene',
    /**
	 * Minimum dimensions of the scene (smallest container size).
	 * !readonly minWidth: number;
	 * !readonly minHeight: number;
	 */ minWidth: null,
    minHeight: null,
    /**
	 * Maximum dimensions of the scene (largest container size).
	 * !readonly maxWidth: number;
	 * !readonly maxHeight: number;
	 */ maxWidth: null,
    maxHeight: null,
    /**
	 * List of containers.
	 */ containers: null,
    /**
	 * List of viewports.
	 */ viewports: null,
    /**
	 * Active viewport bounds, used to select items in a visible region.
	 * !readonly viewportBounds: Bounds2;
	 */ viewportBounds: null,
    /**
	 * List of Group elements.
	 */ groupList: null,
    /**
	 * Named Group elements.
	 */ groups: null,
    /**
	 * Disposal queue.
	 */ disposalQueue: null,
    /**
	 * First updater. Runs before any other update calls.
	 * !readonly fupdater: Handler;
	 */ fupdater: null,
    /**
	 * General updater. Runs after the first updater and before synchronizer.
	 * !readonly updater: Handler;
	 */ updater: null,
    /**
	 * Synchronizer. Run after general updater, and before viewport synchronization.
	 * !readonly synchronizer: Handler;
	 */ synchronizer: null,
    /**
	 * Last updater. Runs after all other update calls.
	 * !readonly lupdater: Handler;
	 */ lupdater: null,
    /**
	 * Destroyer runs when the scene is destroyed.
	 * !readonly destroyer: Handler;
	 */ destroyer: null,
    /**
	 * Current delta time. Set upon entering the `update` method. Reflects the same value as System.frameDelta.
	 * !readonly dt: number;
	 */ dt: 0,
    /**
	 * Flags of the object (see constants at the bottom of this file).
	 */ flags: 0,
    /**
	 * Total number of elements drawn on the last draw operation.
	 * !readonly drawCount: number;
	 */ drawCount: 0,
    /**
	 * Scene object pointing to itself.
	 */ scene: null,
    /**
	 * Base depth (z-value) of the scene.
	 * !readonly zvalue: number;
	 */ zvalue: null,
    /**
	 * Name of the layer.
	 * !readonly name: string;
	 */ name: null,
    /**
	 * Constructs an empty scene with the specified index.
	 * @param index - Index for the scene. Used to calculate the base z-value of the scene. Valid range is from 0 to 3.
	 * @param name - Name of the scene, used for debugging purposes. If none provided SCENE_X will be used where X is the scene's index.
	 * !constructor (index: number, name?: string);
	 */ __ctor: function(index, name = null) {
        this.containers = [];
        /**
		 * 	Z-value is a 24-bit value constructed as:
		 *		2-bits: Scene Index
		 *		4-bits: Container Index
		 *		18-bits: Element z-value
		 */ this.zvalue = (index & 3) << 22;
        this.name = name !== null ? name : "SCENE_" + index;
        this.viewports = [];
        this.viewportBounds = $6c1a77cc22998ccc$export$2e2bcd8739ae039.Pool.alloc();
        this.groupList = $f6bd4ab8b6c953de$export$2e2bcd8739ae039.Pool.alloc();
        this.groups = {};
        this.disposalQueue = $f6bd4ab8b6c953de$export$2e2bcd8739ae039.Pool.alloc();
        this.fupdater = $628f585857a65401$export$2e2bcd8739ae039.Pool.alloc(this);
        this.updater = $628f585857a65401$export$2e2bcd8739ae039.Pool.alloc(this);
        this.synchronizer = $628f585857a65401$export$2e2bcd8739ae039.Pool.alloc(this);
        this.lupdater = $628f585857a65401$export$2e2bcd8739ae039.Pool.alloc(this);
        this.destroyer = $628f585857a65401$export$2e2bcd8739ae039.Pool.alloc(this);
        this.flags = $1e3a2ce488585bd2$var$Scene.VISIBLE;
        this.scene = this;
    },
    /**
	 * Destroys the instance along with all containers, viewports and groups.
	 */ __dtor: function() {
        this.disposeQueued();
        this.disposalQueue.free();
        this.destroyer.exec();
        this.destroyer.free();
        this.fupdater.free();
        this.updater.free();
        this.synchronizer.free();
        this.lupdater.free();
        let i;
        while((i = this.groupList.shift()) !== null){
            i.remover.remove(this._remove, this);
            i.container = null;
            dispose(i);
        }
        for(i = 0; i < this.containers.length; i++){
            if (!this.containers[i]) continue;
            this.containers[i].scene = null;
            dispose(this.containers[i]);
            this.containers[i] = null;
        }
        for(i = 0; i < this.viewports.length; i++){
            if (!this.viewports[i]) continue;
            dispose(this.viewports[i]);
            this.viewports[i] = null;
        }
        this.viewportBounds.free();
        this.groupList.free();
    },
    /**
	 * Clears the scene leaving only viewports.
	 * !clear() : void;
	 */ clear: function() {
        this.disposeQueued();
        let i;
        while((i = this.groupList.shift()) !== null){
            i.remover.remove(this._remove, this);
            i.container = null;
            dispose(i);
        }
        for(i = 0; i < this.containers.length; i++)if (this.containers[i]) this.containers[i].clear();
    },
    /**
	 * Returns the value of the `visible` flag.
	 * !visible() : boolean;
	 */ /**
	 * Sets the value of the `visible` flag.
	 * !visible(value: boolean) : Container;
	 */ visible: function(value = null) {
        if (value === null) return !!(this.flags & $1e3a2ce488585bd2$var$Scene.VISIBLE);
        this.flags &= ~$1e3a2ce488585bd2$var$Scene.VISIBLE;
        if (value) this.flags |= $1e3a2ce488585bd2$var$Scene.VISIBLE;
        return this;
    },
    /**
	 * Sets a container at the specified index.
	 * @param index - Index of the container, valid range is from 0 to 15.
	 * !setContainer (index: number, container: Container) : Scene;
	 */ setContainer: function(index, container) {
        if (index < 0) return this;
        index &= 15;
        if (container === null) {
            this.containers[index].scene = null;
            this.containers[index] = null;
            return this;
        }
        if (!$56aaa5487c41abd4$export$2e2bcd8739ae039.isInstance(container)) throw new Error('Scene: Unable to set container at index ' + index + ': argument is not a Container');
        if (this.minWidth === null || container.width < this.minWidth) this.minWidth = container.width;
        if (this.minHeight === null || container.height < this.minHeight) this.minHeight = container.height;
        if (this.maxWidth === null || container.width > this.maxWidth) this.maxWidth = container.width;
        if (this.maxHeight === null || container.height > this.maxHeight) this.maxHeight = container.height;
        container.scene = this;
        container.zvalue = this.zvalue + (index << 18);
        this.containers[index] = container;
        return this;
    },
    /**
	 * Returns the container at the specified index.
	 * !getContainer (index: number) : Container;
	 */ getContainer: function(index) {
        return index < 0 || index >= this.containers.length ? null : this.containers[index];
    },
    /**
	 * Sets a viewport at the specified index.
	 * !setViewport (index: number, viewport: Viewport) : Scene;
	 */ setViewport: function(index, viewport) {
        if (index < 0) return this;
        if (viewport !== null && !$f3e0869e47faa7b4$export$2e2bcd8739ae039.isInstance(viewport)) throw new Error('Scene: Unable to set viewport at index ' + index + ': argument is not a Viewport.');
        this.viewports[index] = viewport;
        return this;
    },
    /**
	 * Returns the viewport at the specified index.
	 * !getViewport (index: number) : Viewport;
	 */ getViewport: function(index) {
        return index < 0 || index >= this.viewports.length ? null : this.viewports[index];
    },
    /**
	 * Adds the given element to the disposal queue. To be destroyed on the next call to `disposeQueued`.
	 * !disposeLater (elem: Element) : void;
	 */ disposeLater: function(elem) {
        if (!elem.alive()) return;
        this.disposalQueue.push(elem);
        elem.alive(false);
    },
    /**
	 * Disposes all elements in the disposal queue.
	 * !disposeQueued() : void;
	 */ disposeQueued: function() {
        let elem;
        while((elem = this.disposalQueue.shift()) !== null)dispose(elem);
    },
    /**
	 * Adds a group to the scene.
	 * !addGroup (group: Group) : boolean;
	 */ addGroup: function(group) {
        if (!$db57198fb17fd645$export$2e2bcd8739ae039.isInstance(group)) throw new Error('argument must be a Group');
        this.groupList.push(group);
        if (group.id !== null) this.groups[group.id] = group;
        group.container = this;
        group.remover.add(this._removeGroup, this, this.groupList.bottom);
        return true;
    },
    /**
	 * Callback to remove a group from the scene (called by Handler).
	 */ _removeGroup: function(group, self, node) {
        group.container = null;
        self.groupList.remove(node);
        if (group.id !== null) self.groups[group.id] = null;
        return false;
    },
    /**
	 * Removes a group from the scene.
	 * !removeGroup (group: Group) : Group;
	 */ removeGroup: function(group) {
        group.remover.execf(this._remove, this);
        return group;
    },
    /**
	 * Syncs the actual location of the specified element with its storage location. Returns `true` if successful.
	 * !sync (group: Group) : boolean;
	 */ sync: function(group) {
        return true;
    },
    /**
	 * Draws the scene, by executing the `draw` method on each container. The entire scene will be drawn once for each viewport, and
	 * the visible region rules of each viewport will be applied.
	 * !draw (g: Canvas) : void;
	 */ draw: function(g) {
        if (!this.visible()) return;
        this.drawCount = 0;
        if (this.viewports.length) for(let viewportIndex = 0; viewportIndex < this.viewports.length; viewportIndex++){
            let viewport = this.viewports[viewportIndex];
            if (!viewport || !viewport.enabled()) continue;
            $fdb3e373096c6ca3$export$2e2bcd8739ae039.viewport = viewport;
            g.pushClip();
            g.pushMatrix();
            viewport.applyClip(g);
            viewport.applyTransform(g);
            this.viewportBounds.set(viewport.bounds); //.resizeBy(2, 2);
            this.drawContainers(g, this.viewportBounds);
            g.popMatrix();
            g.popClip();
        }
        else this.drawContainers(g, null);
        if ($d0de706be9d545de$export$2e2bcd8739ae039.enabled) $d0de706be9d545de$export$2e2bcd8739ae039.vars[this.name] = this.drawCount;
    },
    /**
	 * Draws the scene containers and passes the specified viewport bounds to the container.
	 * !drawContainers (g: Canvas, viewportBounds: Bounds2) : void;
	 */ drawContainers: function(g, viewportBounds) {
        try {
            for(let i = 0; i < this.containers.length; i++){
                if (!this.containers[i]) continue;
                this.containers[i].setViewportBounds(viewportBounds);
                this.containers[i].draw(g);
                this.drawCount += this.containers[i].drawCount;
            }
        } catch (e) {
            if (e.message !== 'FRAME_END') throw e;
        }
    },
    /**
	 * Updates the scene viewports.
	 */ updateViewports: function() {
        for(let i = 0; i < this.viewports.length; i++){
            if (!this.viewports[i]) continue;
            this.viewports[i].update(this.dt);
        }
    },
    /**
	 * Runs a scene update cycle.
	 * !update (dt: number) : void;
	 */ update: function(dt) {
        this.dt = dt;
        this.fupdater.exec();
        this.updater.exec();
        this.disposeQueued();
        this.synchronizer.exec();
        this.updateViewports();
        this.lupdater.exec();
    }
});
/**
 * 	Constants.
 */ $1e3a2ce488585bd2$var$Scene.VISIBLE = 0x001;
var $1e3a2ce488585bd2$export$2e2bcd8739ae039 = $1e3a2ce488585bd2$var$Scene;




var $hNLgQ = parcelRequire("hNLgQ");


//![import "../utils/list"]
//![import "./element"]
//:/**
//: * 	An updater is used to update one or more elements and synchronize their position with their container.
//: */
//!class Updater
const $f90accd4e9a34560$var$Updater = $hNLgQ.Class.extend({
    className: 'Updater',
    /**
	 * 	Scene where the updater is attached.
	 * 	!readonly scene: Scene;
	 */ scene: null,
    /**
	 * 	List of elements.
	 */ list: null,
    /**
	 * 	Callback passed when constructing the updater.
	 */ __update: null,
    __context: null,
    /**
	 * 	Pre-update and post-update callbacks. Set using the `preupdate` and `postupdate` methods.
	 */ __preupdate: null,
    __postupdate: null,
    /**
	 * 	Constructs the updater linked to the specified scene.
	 * 	!constructor (scene: Scene, update: (elem: Element, dt: number, context: object) => boolean, context?: object);
	 */ __ctor: function(scene, update = null, context = null) {
        this.list = $f6bd4ab8b6c953de$export$2e2bcd8739ae039.Pool.alloc();
        this.scene = scene;
        this.__update = update;
        this.__context = context;
        this.__preupdate = null;
        this.__postupdate = null;
        this.scene.updater.add(this._update, this);
        this.scene.synchronizer.add(this._sync, this);
        this.scene.destroyer.add(this._destroy, this);
    },
    /**
	 * 	Destroys the instance. All elements will just be removed.
	 */ __dtor: function() {
        let i;
        this.scene.updater.remove(this._update, this);
        this.scene.synchronizer.remove(this._sync, this);
        this.scene.destroyer.remove(this._destroy, this);
        while((i = this.list.shift()) !== null)i.remover.remove(this._remove, this);
        this.list.free();
    },
    /**
	 * 	Destroyer callback.
	 */ _destroy: function(scene, self) {
        dispose(self);
    },
    /**
	 * 	Resets the updater by removing all elements.
	 * 	!reset () : Updater;
	 */ reset: function() {
        while((i = this.list.shift()) !== null)i.remover.remove(this._remove, this);
        return this;
    },
    /**
	 * 	Clears the updater by destroying all elements.
	 * 	!clear () : Updater;
	 */ clear: function() {
        while((i = this.list.shift()) !== null){
            i.remover.remove(this._remove, this);
            dispose(i);
        }
        return this;
    },
    /**
	 * 	Sets the pre-update callback.
	 * 	!preupdate (callback: (list: List, dt: number, updater: Updater) => Updater) : Updater;
	 */ preUpdate: function(callback) {
        this.__preupdate = callback;
        return this;
    },
    /**
	 * 	Sets the post-update callback.
	 * 	!postupdate (callback: (list: List, dt: number, updater: Updater) => Updater) : Updater;
	 */ postUpdate: function(callback) {
        this.__postupdate = callback;
        return this;
    },
    /**
	 * 	Adds an element to the updater.
	 * 	!add (elem: Element) : Element;
	 */ add: function(elem) {
        if (!$09f047381ad3e737$export$2e2bcd8739ae039.isInstance(elem)) throw new Error('argument must be of type: Element');
        this.list.push(elem);
        elem.remover.add(this._remove, this, this.list.bottom);
        return elem;
    },
    /**
	 * 	Callback to remove an element from the updater (called by Handler).
	 */ _remove: function(elem, self, node) {
        self.list.remove(node);
        return false;
    },
    /**
	 * 	Removes an element from the updater.
	 * 	!remove (elem: Element) : Element;
	 */ remove: function(elem) {
        elem.remover.execf(this._remove, this);
        return elem;
    },
    /**
	 * 	Callback for the synchronizer.
	 */ _sync: function(scene, self) {
        for(let i = self.list.top; i; i = i.next)i.value.sync();
    },
    /**
	 * 	Callback for the updater.
	 */ _update: function(scene, self) {
        self.update(scene.dt);
    },
    /**
	 * 	Runs an update cycle.
	 * 	!update (dt: number) : void;
	 */ update: function(dt) {
        if (this.__preupdate !== null) this.__preupdate(this.list, dt, this.__context);
        if (this.__update !== null) {
            let next = null;
            for(let i = this.list.top; i; i = next){
                next = i.next;
                if (this.__update(i.value, dt, this.__context) === false) this.remove(i.value);
            }
        }
        if (this.__postupdate !== null) this.__postupdate(this.list, dt, this.__context);
    }
});
var $f90accd4e9a34560$export$2e2bcd8739ae039 = $f90accd4e9a34560$var$Updater;







var //![import "./container"]
//![import "./grid-element"]
//![import "./element"]
//![import "../utils/list"]
//:/**
//: * 	A simple container is a container that uses a linked-list to storage the elements.
//: */
//!class SimpleContainer extends Container
$b5f569186864ae7e$export$2e2bcd8739ae039 = $56aaa5487c41abd4$export$2e2bcd8739ae039.extend({
    className: 'SimpleContainer',
    /**
	 * List containing the elements.
	 * !readonly list: List;
	 */ list: null,
    /**
	 * Constructs the container with the specified size.
	 * !constructor (width: number, height: number);
	 */ __ctor: function(width, height) {
        this._super.Container.__ctor(width, height);
        this.list = $f6bd4ab8b6c953de$export$2e2bcd8739ae039.Pool.alloc();
        this.depthFlag(false);
    },
    /**
	 * Destroys the container and all contained elements.
	 */ __dtor: function() {
        this.clear();
        this.list.free();
        this._super.Container.__dtor();
    },
    /**
	 * Syncs the actual location of the specified element with its storage location. Returns true if successful.
	 * !override sync (elem: Element) : boolean;
	 */ sync: function(elem) {
        this.syncZ(elem);
        return true;
    },
    /**
	 * Clears the container to empty. All contained elements will be destroyed.
	 * !override clear() : void;
	 */ clear: function() {
        let i;
        while((i = this.list.shift()) !== null){
            i.remover.remove(this._remove, this);
            i.container = null;
            dispose(i);
        }
        this.elementCount = 0;
    },
    /**
	 * Resets the container to empty. Contained elements are not destroyed. Use `clear` if that is your intention.
	 * !override reset() : void;
	 */ reset: function() {
        let i;
        while((i = this.list.shift()) !== null){
            i.remover.remove(this._remove, this);
            i.container = null;
        }
        this.elementCount = 0;
    },
    /**
	 * Adds an element to the container. Returns boolean indicating if successful.
	 * !override add (elem: Element) : boolean;
	 */ add: function(elem) {
        if (!$09f047381ad3e737$export$2e2bcd8739ae039.isInstance(elem)) throw new Error('argument must be an Element');
        this.list.push(elem);
        this.elementCount++;
        elem.container = this;
        elem.remover.add(this._remove, this, this.list.bottom);
        this.syncZ(elem);
        return true;
    },
    /**
	 * Callback to remove an element from the container (called by Handler).
	 */ _remove: function(elem, self, node) {
        self.list.remove(node);
        self.elementCount--;
        elem.container = null;
        return false;
    },
    /**
	 * Removes an element from the container and returns it.
	 * !override remove (elem: Element) : Element;
	 */ remove: function(elem) {
        elem.remover.execf(this._remove, this);
        return elem;
    },
    /**
	 * Actually draws the contained elements. Does not take the active viewport into account (hence simple container).
	 * !override render() : void;
	 */ render: function() {
        let flags = $9e0453cff9bc3880$export$2e2bcd8739ae039.ALIVE | $9e0453cff9bc3880$export$2e2bcd8739ae039.VISIBLE;
        for(let i = this.list.top; i; i = i.next){
            if (!i.value.getFlags(flags)) continue;
            if (this.drawElement(i.value, this) === false) break;
        }
    }
});








var //![import "./container"]
//![import "./grid"]
//![import "./grid-element"]
//![import "./element"]
//![import "../system/globals"]
//![import "../system/system"]
//:/**
//: * 	A grid container is a container that uses an optimized spatial grid structure to store the elements.
//: */
//!class GridContainer extends Container
$6f74f6f50e98e7ac$export$2e2bcd8739ae039 = $56aaa5487c41abd4$export$2e2bcd8739ae039.extend({
    className: 'GridContainer',
    /**
	 * 	Grid containing the elements.
	 * 	!readonly grid: Grid;
	 */ grid: null,
    /**
	 * 	Indicates if the container bound should be drawn.
	 * 	!debugBounds: boolean;
	 */ debugBounds: false,
    /**
	 * 	Constructs the grid container with the default size (32768x32768) and divisor (64).
	 * 	!constructor ();
	 */ /**
	 * 	Constructs the grid container with the specified size and divisor.
	 * 	!constructor (width: number, height: number, divisorX: number, divisorY?: number);
	 */ __ctor: function(width = 32768, height = 32768, divisorX = 64, divisorY = null) {
        this._super.Container.__ctor(width, height);
        this.grid = new $e7931fc5aea618d9$export$2e2bcd8739ae039(width, height, divisorX, divisorY);
    },
    /**
	 * 	Destroys the container and all contained elements.
	 */ __dtor: function() {
        this.clear();
        this._super.Container.__dtor();
    },
    /**
	 * 	Syncs the actual location of the specified element with its storage location. Returns true if successful.
	 * 	!override sync (elem: Element) : boolean;
	 */ sync: function(elem) {
        this.syncZ(elem);
        return this.grid.sync(elem);
    },
    /**
	 * 	Clears the container to empty. All contained elements will be destroyed.
	 * 	!override clear() : void;
	 */ clear: function() {
        this.grid.clear();
    },
    /**
	 * 	Resets the container to empty. Contained elements are not destroyed. Use `clear` if that is your intention.
	 * 	!override reset() : void;
	 */ reset: function() {
        this.grid.reset();
    },
    /**
	 * 	Adds an element to the container. Returns boolean indicating if successful.
	 * 	!override add (elem: Element) : boolean;
	 */ add: function(elem) {
        if (!$09f047381ad3e737$export$2e2bcd8739ae039.isInstance(elem)) throw new Error('argument must be an Element');
        if (!this.grid.add(elem)) return false;
        elem.container = this;
        this.elementCount = this.grid.count;
        this.syncZ(elem);
        return true;
    },
    /**
	 * 	Removes an element from the container and returns it.
	 * 	!override remove (elem: Element) : Element;
	 */ remove: function(elem) {
        this.grid.remove(elem);
        this.elementCount = this.grid.count;
        return elem;
    },
    /**
	 * 	Actually draws the contained elements.
	 * 	!override render() : void;
	 */ render: function() {
        this.grid.forEachInRegion(this.viewportBounds, $9e0453cff9bc3880$export$2e2bcd8739ae039.ALIVE | $9e0453cff9bc3880$export$2e2bcd8739ae039.VISIBLE, $9e0453cff9bc3880$export$2e2bcd8739ae039.ALIVE | $9e0453cff9bc3880$export$2e2bcd8739ae039.VISIBLE, this.drawElement, this);
        if (!this.debugBounds || this.viewportBounds === null) return;
        let g = $c5f44d8482fd28c9$export$2e2bcd8739ae039.displayBuffer2;
        g.pushMatrix();
        g.loadMatrix(this.g.getMatrix());
        let y0 = (this.viewportBounds.y1 + this.grid.offsy - (1 << this.grid.ky - 1) >> this.grid.ky) * this.grid.stride;
        let y1 = (this.viewportBounds.y2 + this.grid.offsy + (1 << this.grid.ky - 1) >> this.grid.ky) * this.grid.stride;
        let x0 = this.viewportBounds.x1 + this.grid.offsx - (1 << this.grid.kx - 1) >> this.grid.kx;
        let x1 = this.viewportBounds.x2 + this.grid.offsx + (1 << this.grid.kx - 1) >> this.grid.kx;
        y0 = (int(y0 / this.grid.stride) << this.grid.ky) - this.grid.offsy;
        y1 = (int(y1 / this.grid.stride) << this.grid.ky) - this.grid.offsy + (1 << this.grid.ky);
        x0 = (x0 << this.grid.kx) - this.grid.offsx;
        x1 = (x1 << this.grid.kx) - this.grid.offsx + (1 << this.grid.kx);
        g.fillStyle('rgba(255,0,0,0.2)');
        g.fillRect(x0, y0, x1 - x0 + 1, y1 - y0 + 1);
        y0 = this.viewportBounds.y1;
        y1 = this.viewportBounds.y2;
        x0 = this.viewportBounds.x1;
        x1 = this.viewportBounds.x2;
        g.lineWidth(1 / $c5f44d8482fd28c9$export$2e2bcd8739ae039.canvasScaleFactor);
        g.strokeStyle('#fff');
        g.strokeRect(x0, y0, x1 - x0 + 1, y1 - y0 + 1);
        g.lineWidth(1 / $c5f44d8482fd28c9$export$2e2bcd8739ae039.canvasScaleFactor);
        g.strokeStyle('#008');
        for(let y = $fdb3e373096c6ca3$export$2e2bcd8739ae039.viewport.container.y1 + this.grid.offsy; y < $fdb3e373096c6ca3$export$2e2bcd8739ae039.viewport.container.y2 + this.grid.offsy; y += 1 << this.grid.ky)for(let x = $fdb3e373096c6ca3$export$2e2bcd8739ae039.viewport.container.x1 + this.grid.offsx; x < $fdb3e373096c6ca3$export$2e2bcd8739ae039.viewport.container.x2 + this.grid.offsx; x += 1 << this.grid.kx)g.strokeRect(x - this.grid.offsx, y - this.grid.offsy, 1 << this.grid.kx, 1 << this.grid.ky);
        g.popMatrix();
    },
    /**
	 * 	Executes the specified callback for each element that intersects the given bounds and has the specified flags set. The process is
	 * 	immediately stopped if the callback returns `false`.
	 * 	!forEachInRegion (bounds: Bounds2|Rect, flagsAndMask: number, flagsValue: number, callback: (elem: Element, context?: object) => boolean, context?: object) : void;
	 */ forEachInRegion: function(bounds, flagsAndMask, flagsValue, callback, context) {
        this.grid.forEachInRegion(bounds, flagsAndMask, flagsValue, callback, context);
    },
    /**
	 * 	Collects all elements that intersect the given bounds and have the specified flags set. Returns a new List, remember to call `free` after using it.
	 * 	!selectInRegion (bounds: Bounds2|Rect, flagsAndMask: number, flagsValue: number) : List;
	 */ selectInRegion: function(bounds, flagsAndMask, flagsValue) {
        return this.grid.selectInRegion(bounds, flagsAndMask, flagsValue);
    },
    /**
	 * 	Counts all elements that intersect the given bounds and have the specified flags set.
	 * 	!countInRegion (bounds: Bounds2|Rect, flagsAndMask: number, flagsValue: number) : number;
	 */ countInRegion: function(bounds, flagsAndMask, flagsValue) {
        return this.grid.countInRegion(bounds, flagsAndMask, flagsValue);
    },
    /**
	 * 	Returns the first element that intersect the given bounds and have the specified flags set.
	 * 	!selectFirst (bounds: Bounds2|Rect, flagsAndMask: number, flagsValue: number) : Element;
	 */ selectFirst: function(bounds, flagsAndMask, flagsValue) {
        return this.grid.selectFirst(bounds, flagsAndMask, flagsValue);
    }
});









//![import "./element"]
//![import "../system/system"]
//![import "../utils/recycler"]
//:/**
//: * 	Describes an element mask. Used for collision detection.
//: */
//!class Mask extends Element
const $99fbe93690d879a1$var$Mask = $09f047381ad3e737$export$2e2bcd8739ae039.extend({
    className: 'Mask',
    /**
	 * 	Type of the mask (user defined).
	 * 	!type: number;
	 */ type: 0,
    /**
	 * 	Constructs the Mask element.
	 * 	!constructor (type: number, x: number, y: number, width: number, height: number);
	 */ __ctor: function(type, x, y, width, height) {
        this._super.Element.__ctor(x, y, width, height);
        this.type = type;
    },
    /**
	 * 	Draws the element on the specified canvas.
	 * 	!draw (g: Canvas) : void;
	 */ draw: function(g) {
        if (!$fdb3e373096c6ca3$export$2e2bcd8739ae039.debugMasks && !this.debugBounds) return;
        let m = g.getMatrix();
        g = $c5f44d8482fd28c9$export$2e2bcd8739ae039.displayBuffer2;
        g.pushMatrix();
        g.loadMatrix(m);
        g.fillStyle($09f047381ad3e737$export$2e2bcd8739ae039.getDebugColor(this.debugBounds));
        g.fillRect(this.bounds.x1, this.bounds.y1, this.bounds.width(), this.bounds.height());
        g.popMatrix();
    }
});
//!/class
//!namespace Mask
//!namespace Pool
/**
	 * 	Allocates a new Mask element.
	 * 	!function alloc (type: number, x: number, y: number, width: number, height: number) : Mask;
	 */ $1fea8365818f3b22$export$2e2bcd8739ae039.createPool($99fbe93690d879a1$var$Mask);
var $99fbe93690d879a1$export$2e2bcd8739ae039 = $99fbe93690d879a1$var$Mask;




//![import "./element"]
//![import "../utils/recycler"]
//:/**
//: * 	Describes an element that can be rendered to the screen.
//: */
//!class Label extends Element
const $e7f26224e1e585fc$var$Label = $09f047381ad3e737$export$2e2bcd8739ae039.extend({
    className: 'Label',
    /**
	 * 	Text to render.
	 * 	!readonly text: string;
	 */ text: null,
    /**
	 * 	Spritefont resource.
	 * 	!readonly font: Spritefont;
	 */ font: null,
    /**
	 * 	Indicates if the `text` property changed.
	 */ _dirty: false,
    /**
	 * Current text width.
	 * !readonly textWidth: number;
	 */ textWidth: null,
    /**
	 * Current text height.
	 * !readonly textHeight: number;
	 */ textHeight: null,
    /**
	 * 	Alignment properties of the label.
	 */ _align: -1,
    /* -1=LEFT, 0=CENTER, 1=RIGHT */ _valign: -1,
    /* -1=TOP, 0=MIDDLE, 1=BOTTOM */ /**	
	 * Position offset for the text. Calculated based on alignment properties.
	 */ textOffsetX: null,
    textOffsetY: null,
    /**
	 * 	Constructs a label element at the specified position with the given text.
	 * 	!constructor (x: number, y: number, font: object, text: string);
	 */ __ctor: function(x, y, font, text) {
        this._super.Element.__ctor(x, y, 4, 4);
        this.text = text;
        this.font = font;
        this._align = -1;
        this._valign = -1;
        this.renderWith(this.renderText);
        this._dirty = true;
    },
    /**
	 * 	Sets the horizontal alignment value of the label.
	 * 	@param value - Use -1 for LEFT, 0 for CENTER, and 1 for RIGHT.
	 * 	!align (value: number) : Label;
	 */ align: function(value) {
        if (this._align === value) return this;
        this._align = value;
        this.textOffsetX = null;
        return this;
    },
    /**
	 * 	Sets the vertical alignment value of the label.
	 * 	@param value - Use -1 for TOP, 0 for MIDDLE, and 1 for BOTTOM.
	 * 	!valign (value: number) : Label;
	 */ valign: function(value) {
        if (this._valign === value) return this;
        this._valign = value;
        this.textOffsetY = null;
        return this;
    },
    /**
	 * 	Sets the text value of the label.
	 * 	!setText (value: string) : Label;
	 */ setText: function(value) {
        if (this.text === value) return this;
        this.text = value;
        this._dirty = true;
        return this;
    },
    /**
	 * 	Sets the font resource to use.
	 * 	!setFont (font: Spritefont) : Label;
	 */ setFont: function(font) {
        if (this.font === font) return this;
        this.font = font;
        this._dirty = true;
        return this;
    },
    /**
	 * Updates the text related properties (textWidth, textHeight, textOffsetX and textOffsetY). Automatically
	 * called before the label is drawn. Recalculates only if text changed since last call.
	 */ update: function() {
        if (this._dirty) {
            this.textWidth = this.font.measureWidth(this.text);
            this.textHeight = this.font.measureHeight(this.text);
            this.textOffsetX = null;
            this.textOffsetY = null;
            this._dirty = false;
        }
        if (this.textOffsetX === null) {
            if (this._align < 0) this.textOffsetX = 0;
            else if (this._align === 0) this.textOffsetX = -this.textWidth >> 1;
            else this.textOffsetX = -this.textWidth;
        }
        if (this.textOffsetY === null) {
            if (this._valign < 0) this.textOffsetY = 0;
            else if (this._valign === 0) this.textOffsetY = -this.textHeight >> 1;
            else this.textOffsetY = -this.textHeight;
        }
    },
    /**
	 * 	Renders the element to the graphics surface.
	 */ renderText: function(g, elem, img) {
        elem.update();
        elem.font.drawText(g, elem.bounds.x1 + elem.textOffsetX, elem.bounds.y1 + elem.textOffsetY, elem.text);
    }
});
//!/class
//!namespace Label
//!namespace Pool
/**
	 * 	Allocates a label element at the specified position with the given text.
	 * 	!function alloc (x: number, y: number, font: object, text: string) : Label;
	 */ $1fea8365818f3b22$export$2e2bcd8739ae039.createPool($e7f26224e1e585fc$var$Label);
var $e7f26224e1e585fc$export$2e2bcd8739ae039 = $e7f26224e1e585fc$var$Label;





var //![import "../utils/priority-queue"]
//![import "./boot"]
//![import "../system/system"]
//!namespace KeyboardHandler
//!interface EventHandler
/**
		 * 	Handler for keyboard events.
		 * 	!onKeyboardEvent (action: System.KeyboardEventType, keyCode: number, keyState: object) : boolean;
		 */ //!/interface
//!/namespace
//:/**
//: * 	Used to attach keyboard event handlers to the system.
//: */
//!class KeyboardHandler
$66e20ed84322251f$export$2e2bcd8739ae039 = $8dbe83b0cc8b3c36$export$2e2bcd8739ae039.Module.create({
    handlers: null,
    __ctor: function() {
        const self = this;
        this._super.Module.__ctor();
        this.handlers = new $6cb3980136ee15d8$export$2e2bcd8739ae039();
        this._callOnKeyboardEvent = function(handler) {
            return self.callOnKeyboardEvent(handler);
        };
    },
    /**
	 * 	Registers a new keyboard event handler.
	 * 	!static register (handler: KeyboardHandler.EventHandler) : KeyboardHandler.EventHandler;
	 */ register: function(handler) {
        try {
            this.handlers.add(handler);
            if ('init' in handler) handler.init();
        } catch (e) {
            throw new Error("KeyboardHandler (register): " + e.message);
        }
        return handler;
    },
    /**
	 * 	Removes a keyboard event handler.
	 * 	!static unregister (handler: KeyboardHandler.EventHandler) : void;
	 */ unregister: function(handler) {
        try {
            this.handlers.remove(handler);
            this.handlers.cleanup();
        } catch (e) {
            throw new Error("KeyboardHandler (unregister): " + e.message);
        }
    },
    callOnKeyboardEvent: function(handler) {
        return handler.onKeyboardEvent(this._action, this._keyCode, this._keyState);
    },
    onStartup: function() {
        $c5f44d8482fd28c9$export$2e2bcd8739ae039.onKeyboardEvent = (action, keyCode, keyState)=>{
            this._action = action;
            this._keyCode = keyCode;
            this._keyState = keyState;
            this.handlers.forEach(this._callOnKeyboardEvent);
        };
    },
    onShutdown: function() {
        $c5f44d8482fd28c9$export$2e2bcd8739ae039.onKeyboardEvent = null;
    }
});





var //![import "../utils/priority-queue"]
//![import "./boot"]
//![import "../system/system"]
//!namespace PointerHandler
//!interface EventHandler
/**
		 * 	Handler for pointer events.
		 * 	!onPointerEvent (action: System.PointerEventType, pointer: object, pointers: object) : boolean;
		 */ //!/interface
//!/namespace
//:/**
//: * 	Used to attach pointer event handlers to the system.
//: */
//!class PointerHandler
$d1380cb64b9fa053$export$2e2bcd8739ae039 = $8dbe83b0cc8b3c36$export$2e2bcd8739ae039.Module.create({
    handlers: null,
    __ctor: function() {
        const self = this;
        this._super.Module.__ctor();
        this.handlers = new $6cb3980136ee15d8$export$2e2bcd8739ae039();
        this._callOnPointerEvent = function(handler) {
            return self.callOnPointerEvent(handler);
        };
    },
    /**
	 * 	Registers a new pointer event handler.
	 * 	!static register (handler: PointerHandler.EventHandler) : PointerHandler.EventHandler;
	 */ register: function(handler) {
        try {
            this.handlers.add(handler);
            if ('init' in handler) handler.init();
        } catch (e) {
            throw new Error("PointerHandler (register): " + e.message);
        }
        return handler;
    },
    /**
	 * 	Removes a pointer event handler.
	 * 	!static unregister (handler: PointerHandler.EventHandler) : void;
	 */ unregister: function(handler) {
        try {
            this.handlers.remove(handler);
            this.handlers.cleanup();
        } catch (e) {
            throw new Error("PointerHandler (unregister): " + e.message);
        }
    },
    callOnPointerEvent: function(handler) {
        return handler.onPointerEvent(this._action, this._p, this._pointers);
    },
    onStartup: function() {
        $c5f44d8482fd28c9$export$2e2bcd8739ae039.onPointerEvent = (action, p, pointers)=>{
            this._action = action;
            this._p = p;
            this._pointers = pointers;
            this.handlers.forEach(this._callOnPointerEvent);
        };
    },
    onShutdown: function() {
        $c5f44d8482fd28c9$export$2e2bcd8739ae039.onPointerEvent = null;
    }
});





//![import "./keyboard-handler"]
//![import "./pointer-handler"]
//![import "../system/system"]
/**
**
*/ const $878e437585fe2934$var$ScreenControls = {
    priority: 5,
    list: [],
    dummy: {},
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
	*/ add: function(c) {
        if (this.zindexEnabled && !('zindex' in c)) c.zindex = 0;
        if (this.list.indexOf(c) === -1) this.list.push(c);
    },
    remove: function(c) {
        var i = this.list.indexOf(c);
        if (i !== -1) this.list.splice(i, 1);
    },
    setHoverEnabled: function(value) {
        this.hoverEnabled = value;
    },
    setZIndexEnabled: function(value) {
        this.zindexEnabled = value;
    },
    findTarget: function(x, y, filter) {
        if (this.zindexEnabled && this.lastFrame != $c5f44d8482fd28c9$export$2e2bcd8739ae039.frameNumber) {
            let zindex = this.list[0].zindex;
            for (let item of this.list){
                if (item.zindex > zindex) {
                    this.list = this.list.sort((a, b)=>b.zindex - a.zindex
                    );
                    break;
                }
                zindex = item.zindex;
            }
            this.lastFrame = $c5f44d8482fd28c9$export$2e2bcd8739ae039.frameNumber;
        }
        for(let i = 0; i < this.list.length; i++){
            if (!this.list[i]) continue;
            if (filter != null && filter(this.list[i]) === false) continue;
            if (this.list[i].containsPoint(x, y)) return this.list[i];
        }
        return null;
    },
    filterHover: function(i) {
        return 'hover' in i;
    },
    onPointerEvent: function(action, p, pointers) {
        let _continue = true;
        let tmp = null;
        switch(action){
            case $c5f44d8482fd28c9$export$2e2bcd8739ae039.PointerEventType.POINTER_DOWN:
                if (p._ref != null) {
                    tmp = p._ref;
                    p._ref = null;
                    tmp.pointerDeactivate(p);
                }
                tmp = this.findTarget(p.x, p.y);
                if (tmp != null) {
                    (p._ref = tmp).pointerActivate(p);
                    _continue = false;
                }
                break;
            case $c5f44d8482fd28c9$export$2e2bcd8739ae039.PointerEventType.POINTER_DRAG_START:
                if (p._ref != null) _continue = false;
                break;
            case $c5f44d8482fd28c9$export$2e2bcd8739ae039.PointerEventType.POINTER_DRAG_MOVE:
                if (this.hoverEnabled) {
                    if (p._refh != null) {
                        if (p._refh.containsPoint(p.x, p.y)) ;
                        else {
                            tmp = p._refh;
                            p._refh = null;
                            tmp.hover(false, p);
                            tmp = this.findTarget(p.x, p.y, this.filterHover);
                            if (tmp != null) (p._refh = tmp).hover(true, p);
                        }
                    } else {
                        tmp = this.findTarget(p.x, p.y, this.filterHover);
                        if (tmp != null) (p._refh = tmp).hover(true, p);
                    }
                }
                if (p._ref != null) {
                    if (p._ref.containsPoint(p.x, p.y) || p._ref.focusLock == true) {
                        p._ref.pointerUpdate(p.x, p.y, p);
                        _continue = false;
                    } else {
                        tmp = p._ref;
                        p._ref = null;
                        tmp.pointerDeactivate(p);
                        tmp = this.findTarget(p.x, p.y);
                        if (tmp != null) {
                            (p._ref = tmp).pointerActivate(p);
                            _continue = false;
                        }
                    }
                } else {
                    tmp = this.findTarget(p.x, p.y);
                    if (tmp != null) {
                        (p._ref = tmp).pointerActivate(p);
                        _continue = false;
                    }
                }
                break;
            case $c5f44d8482fd28c9$export$2e2bcd8739ae039.PointerEventType.POINTER_MOVE:
                if (this.hoverEnabled) {
                    if (p._refh != null) {
                        if (p._refh.containsPoint(p.x, p.y)) ;
                        else {
                            tmp = p._refh;
                            p._refh = null;
                            tmp.hover(false, p);
                            tmp = this.findTarget(p.x, p.y, this.filterHover);
                            if (tmp != null) (p._refh = tmp).hover(true, p);
                        }
                    } else {
                        tmp = this.findTarget(p.x, p.y, this.filterHover);
                        if (tmp != null) (p._refh = tmp).hover(true, p);
                    }
                }
                if (p._ref == null) break;
                if (p._ref.containsPoint(p.x, p.y) || p._ref.focusLock == true) {
                    p._ref.pointerUpdate(p.x, p.y, p);
                    _continue = false;
                } else {
                    tmp = p._ref;
                    p._ref = null;
                    tmp.pointerDeactivate(p);
                }
                break;
            case $c5f44d8482fd28c9$export$2e2bcd8739ae039.PointerEventType.POINTER_DRAG_STOP:
                if (p._ref != null) _continue = false;
                break;
            case $c5f44d8482fd28c9$export$2e2bcd8739ae039.PointerEventType.POINTER_UP:
                if (p._ref != null) {
                    tmp = p._ref;
                    p._ref = null;
                    tmp.pointerDeactivate(p);
                    _continue = false;
                }
                break;
        }
        return _continue;
    },
    onKeyboardEvent: function(action, keyCode, keyArgs) {
        switch(action){
            case $c5f44d8482fd28c9$export$2e2bcd8739ae039.KeyboardEventType.KEY_DOWN:
                for(let i = 0; i < this.list.length; i++){
                    if (!this.list[i] || !this.list[i].keyboardEvents) continue;
                    if (this.list[i].keyDown(keyCode, keyArgs) === false) break;
                }
                break;
            case $c5f44d8482fd28c9$export$2e2bcd8739ae039.KeyboardEventType.KEY_UP:
                for(let i1 = 0; i1 < this.list.length; i1++){
                    if (!this.list[i1] || !this.list[i1].keyboardEvents) continue;
                    if (this.list[i1].keyUp(keyCode, keyArgs) === false) break;
                }
                break;
        }
    }
};
$d1380cb64b9fa053$export$2e2bcd8739ae039.register($878e437585fe2934$var$ScreenControls);
$66e20ed84322251f$export$2e2bcd8739ae039.register($878e437585fe2934$var$ScreenControls);
var $878e437585fe2934$export$2e2bcd8739ae039 = $878e437585fe2934$var$ScreenControls;





var //![import "./group.js"]
//![import "./mask.js"]
//![import "./screen-controls.js"]
/**
 * 	Button class provides an easy way to add push-button support to the world.
 */ //!class Button extends Group
$13eb70d37a7efcb1$export$2e2bcd8739ae039 = $db57198fb17fd645$export$2e2bcd8739ae039.extend({
    /**
	 * 	Indicates if once focus is obtained it is locked until the user releases it.
	 * 	@default false
	 *	!focusLock: boolean;
	 */ focusLock: false,
    /**
	 * 	Indicates if keyboard events are enabled on this object.
	 * 	@default true
	 *	!keyboardEvents: boolean;
	 */ keyboardEvents: true,
    /**
	 * 	Current pressed status of the button.
	 *	!isPressed: boolean;
	 */ isPressed: false,
    /**
	 * 	Previous pressed status of the button.
	 *	!wasPressed: boolean;
	 */ wasPressed: false,
    /**
	 * 	Image to draw when the button is unpressed.
	 *	!unpressedImg: Drawable;
	 */ unpressedImg: null,
    /**
	 * 	Image to draw when the button is pressed.
	 *	!pressedImg: Drawable;
	 */ pressedImg: null,
    /**
	 * 	Key code related to the button. Used only if not `null`.
	 * 	@default null
	 *	!keyCode: KeyCode;
	 */ keyCode: null,
    /**
	 * 	Hitbox element.
	 * 	!readonly hitbox: Mask;
	 */ hitbox: null,
    /**
	 * 	Handlers for the button events.
	 */ _onButtonDown: null,
    _onButtonUp: null,
    _onTap: null,
    _onChange: null,
    /**
	 * 	Creates the button with the specified parameters. Automatically adds it to the screen controls.
	 * 	!constructor (container: Container, x: number, y: number, unpressedImg?: Drawable, pressedImg?: Drawable);
	 */ __ctor: function(container, x, y, unpressedImg = null, pressedImg = null) {
        this._super.Group.__ctor();
        this.unpressedImg = unpressedImg;
        this.pressedImg = pressedImg !== null && pressedImg !== void 0 ? pressedImg : unpressedImg;
        this.hitbox = null;
        let hitbox = $99fbe93690d879a1$export$2e2bcd8739ae039.Pool.alloc(0, x, y, this.unpressedImg ? this.unpressedImg.width : 16, this.unpressedImg ? this.unpressedImg.height : 16).visible(false).visibleLock(true).debug(2);
        this.addChild(hitbox);
        container.add(hitbox);
        container.add(this);
        this.hitbox = hitbox;
        this._onButtonDown = null;
        this._onButtonUp = null;
        this._onTap = null;
        this._onChange = this._default_onChange;
        this.reset();
        $878e437585fe2934$export$2e2bcd8739ae039.add(this);
    },
    /**
	 * 	Removes the button from the screen controls and destroys it.
	 */ __dtor: function() {
        this._super.Group.__dtor();
        $878e437585fe2934$export$2e2bcd8739ae039.remove(this);
    },
    /**
	 * 	Sets the width and height of the button and the hitbox.
	 * 	!resize (width: number, height: number) : GridElement;
	 */ resize: function(width, height) {
        this._super.Group.resize(width, height);
        if (this.hitbox !== null) this.hitbox.resize(width, height);
        return this;
    },
    /**
	 * 	Resizes the button and hitbox by the specified deltas.
	 * 	!resizeBy (deltaWidth: number, deltaHeight: number) : GridElement;
	 */ resizeBy: function(dWidth, dHeight) {
        this._super.Group.resizeBy(dWidth, dHeight);
        if (this.hitbox !== null) this.hitbox.resizeBy(dWidth, dHeight);
        return this;
    },
    /**
	 * 	Changes the pressed/unpressed images of the button.
	 * 	!setImage (unpressedImg: Drawable, pressedImg?: Drawable) : Button;
	 */ setImage: function(unpressedImg, pressedImg = null) {
        this.unpressedImg = unpressedImg;
        this.pressedImg = pressedImg || unpressedImg;
        this.reset();
        return this;
    },
    /**
	 * 	Changes the key code of the button.
	 * 	!setKeyCode (value: KeyCode) : Button;
	 */ setKeyCode: function(value) {
        this.keyCode = value;
        return this;
    },
    /**
	 * 	Resets the button to its initial state.
	 * 	!reset() : void;
	 */ reset: function() {
        this.img = this.unpressedImg;
        this._onChange(this.isPressed = false, this.wasPressed = false, this);
    },
    /**
	 * 	Button pointer update event. Not required for the button control.
	 * 	!pointerUpdate (pointerX: number, pointerY: number, pointer: object) : void;
	 */ pointerUpdate: function(pointerX, pointerY, pointer) {},
    /**
	 * 	Sets the pressed state of the button.
	 * 	!setStatus (value: boolean) : Button;
	 */ setStatus: function(value) {
        if (this.isPressed === value) return this;
        this.updateStatus(value);
        this.img = this.isPressed ? this.pressedImg : this.unpressedImg;
        this._onChange(this.isPressed, this.wasPressed, this);
        return this;
    },
    /**
	 * 	Moves the `isPressed` value of the button to `wasPressed`, and updates `isPressed` with the given value. If none provided, `isPressed` is unchanged.
	 *	!updateStatus (value?: boolean) : Button;
	 */ updateStatus: function(value = null) {
        this.wasPressed = this.isPressed;
        this.isPressed = value === null ? this.isPressed : value;
        return this;
    },
    /**
	 * 	Called when the PointerEventType.POINTER_DOWN event starts within the bounding box of the button.
	 * 	!pointerActivate (pointer: object) : void;
	 */ pointerActivate: function(pointer) {
        this.setStatus(true);
    },
    /**
	 * 	Called when the PointerEventType.POINTER_UP event is fired with the "_ref" attribute pointing to this object.
	 *	!pointerDeactivate (pointer: object) : void;
	 */ pointerDeactivate: function(pointer) {
        this.setStatus(false);
    },
    /**
	 * 	Returns `true` if the button contains the specified point.
	 * 	!containsPoint (x: number, y: number) : boolean;
	 */ containsPoint: function(x, y) {
        if (!this.visible()) return false;
        return this.hitbox.bounds.containsPoint(x, y);
    },
    /**
	 * 	Executed after any change in the status of the button. Be careful when overriding this, because when so, the `onTap`, `onButtonDown` and `onButtonUp` methods will not work.
	 * 	!onChange (isPressed: boolean, wasPressed: boolean, button: Button) : void;
	 */ _default_onChange: function(isPressed, wasPressed, button) {
        if (isPressed !== wasPressed) {
            if (isPressed && this._onButtonDown) this._onButtonDown();
            else if (!isPressed && this._onButtonUp) this._onButtonUp();
        }
        if (!isPressed && wasPressed && this._onTap) this._onTap();
    },
    /**
	 * 	Key down event, handles the keys that control the button.
	 * 	!keyDown (keyCode: KeyCode, keyArgs: object) : boolean|null;
	 */ keyDown: function(keyCode, keyArgs) {
        if (keyCode === this.keyCode) {
            this.pointerActivate();
            return false;
        }
    },
    /**
	 * 	Key up event, handles the keys that control the button.
	 * 	!keyUp (keyCode: KeyCode, keyArgs: object) : boolean|null;
	 */ keyUp: function(keyCode, keyArgs) {
        if (keyCode === this.keyCode) {
            this.pointerDeactivate();
            return false;
        }
    },
    /**
	 * 	Sets the handler for the on-change event. Executed when the button state changes. Setting this callback will cause onButtonDown,
	 * 	onButtonUp and onTap to no longer work. Set the callback to `null` to return it to the default state.
	 * 
	 * 	!onChange (callback: (isPressed: boolean, wasPressed: boolean, buttons: Button) => void) : Button;
	 */ onChange: function(callback) {
        this._onChange = callback === null ? this._default_onChange : callback;
        return this;
    },
    /**
	 * Sets the handler for the button-down event. Executed when the button is pressed. Fired only if the `onChange` method was not overriden.
	 * !onButtonDown (callback: () => void) : Button;
	 */ /**
	 * Executes the onButtonDown handler.
	 * !onButtonDown() : void;
	 */ onButtonDown: function(callback = true) {
        if (callback === true) {
            if (this._onButtonDown) this._onButtonDown();
            return;
        }
        this._onButtonDown = callback;
        return this;
    },
    /**
	 * 	Sets the handler for the button-up event. Executed when the button is released. Fired only if the `onChange` method was not overriden.
	 * 	!onButtonUp (callback: () => void) : Button;
	 */ /**
	 * Executes the onButtonUp handler.
	 * !onButtonUp() : void;
	 */ onButtonUp: function(callback = true) {
        if (callback === true) {
            if (this._onButtonUp) this._onButtonUp();
            return;
        }
        this._onButtonUp = callback;
        return this;
    },
    /**
	 * 	Sets the handler for the on-tap event. Executed when the button is tapped (pressed and then released). Fired only if the `onChange` method was not overriden.
	 * 	!onTap (callback: () => void) : Button;
	 */ /**
	 * Executes the onTap handler.
	 * !onTap() : void;
	 */ onTap: function(callback = true) {
        if (callback === true) {
            if (this._onTap) this._onTap();
            return;
        }
        this._onTap = callback;
        return this;
    }
});






var //![import "./group"]
//![import "./mask"]
//![import "./screen-controls"]
//![import "../system/keycode"]
/**
 * 	Stick class provides an easy way to add directional control sticks to the world.
 */ //!class Stick extends Group
$f79394a78c5df7c6$export$2e2bcd8739ae039 = $db57198fb17fd645$export$2e2bcd8739ae039.extend({
    /**
	 * 	Indicates if once focus is obtained it is locked until the user releases it.
	 * 	@default true
	 *	!focusLock: boolean;
	 */ focusLock: true,
    /**
	 * 	Indicates if keyboard events are enabled on this object.
	 * 	@default true
	 *	!keyboardEvents: boolean;
	 */ keyboardEvents: true,
    /**
	 * 	Current pressed status of the stick.
	 *	!isPressed: boolean;
	 */ isPressed: false,
    /**
	 * 	Previous pressed status of the stick.
	 *	!wasPressed: boolean;
	 */ wasPressed: false,
    /**
		 * 	Image to draw when the stick is unpressed (outer circle).
		 *	!unpressedImg: Drawable;
		 */ unpressedImg: null,
    /**
		 * 	Image to draw when the stick is pressed (outer circle).
		 *	!pressedImg: Drawable;
		 */ pressedImg: null,
    /**
	 * 	Image to draw when the stick is unpressed (inner circle).
	 *	!unpressedImgInner: Drawable;
	 */ unpressedImgInner: null,
    /**
	 * 	Image to draw when the stick is pressed (inner circle).
	 *	!pressedImgInner: Drawable;
	 */ pressedImgInner: null,
    /**
		 * 	Number of steps for the angle. Used to snap the stick movement to discrete steps.
		 * 	!angleSteps: number;
		 */ angleSteps: 0,
    /**
		 * 	Number of steps for the radius of the stick. Used to snap the stick movement to discrete steps.
		 * 	!radiusSteps: number;
		 */ radiusSteps: 0,
    /**
	 * Center reference coordinates. Set when the pointer is activated.
	 */ refX: null,
    refY: null,
    /*
	**	Direction (X and Y), magnitude and angle of the stick vector. The dirx and diry are normalized.
	*/ rdirx: 0,
    rdiry: 0,
    dirx: 0,
    diry: 0,
    magnitude: 0,
    angle: 0,
    /*
	**	Frozen stick state. Set by calling `freezeState`.
	*/ frdirx: 0,
    frdiry: 0,
    fdirx: 0,
    fdiry: 0,
    fmagnitude: 0,
    fangle: 0,
    /*
	**	Indicates the displacement in X and Y directions of the inner stick. This is calculated when the update() method is called.
	*/ dispx: 0,
    dispy: 0,
    /*
	**	Current radius of the inner stick (how far it moved). And maximum radius that the inner stick can move.
	*/ radius: 0,
    maxRadius: 0,
    /*
	**	Dead zone values for each axis.
	*/ deadZoneX: 0,
    deadZoneY: 0,
    /*
	**	Hitbox element.
	*/ hitbox: 0,
    /**
	 * 	Handlers for the stick events.
	 */ _onChange: null,
    /**
	 * 	Creates the stick with the specified parameters. Automatically adds it to the screen controls.
	 * 	!constructor (container: Container, x: number, y: number, maxRadius: number, unpressedImg: Drawable, unpressedImgInner: Drawable, pressedImg?: Drawable, pressedImgInner?: Drawable);
	 */ __ctor: function(container, x, y, maxRadius, unpressedImg, unpressedImgInner, pressedImg = null, pressedImgInner = null) {
        this._super.Group.__ctor();
        this.unpressedImg = unpressedImg;
        this.pressedImg = pressedImg || unpressedImg;
        this.unpressedImgInner = unpressedImgInner;
        this.pressedImgInner = pressedImgInner || unpressedImgInner;
        this.maxRadius = maxRadius;
        this.deadZoneX = 0;
        this.deadZoneY = 0;
        var _unpressedImg, _unpressedImg1;
        this.hitbox = $99fbe93690d879a1$export$2e2bcd8739ae039.Pool.alloc(0, x, y, ((_unpressedImg = this.unpressedImg) !== null && _unpressedImg !== void 0 ? _unpressedImg : this.unpressedImgInner).width, ((_unpressedImg1 = this.unpressedImg) !== null && _unpressedImg1 !== void 0 ? _unpressedImg1 : this.unpressedImgInner).height).visible(false).visibleLock(true).debug(2);
        this.addChild(this.hitbox);
        container.add(this.hitbox);
        container.add(this);
        this._onChange = null;
        this.renderWith(this.renderStick);
        $878e437585fe2934$export$2e2bcd8739ae039.add(this);
    },
    /**
	 * 	Removes the button from the screen controls and destroys it.
	 */ __dtor: function() {
        this._super.Group.__dtor();
        $878e437585fe2934$export$2e2bcd8739ae039.remove(this);
    },
    /**
	 * 	Changes the pressed/unpressed images of the outer stick.
	 * 	!setImage (unpressedImg: Drawable, pressedImg?: Drawable) : Stick;
	 */ setImage: function(unpressedImg, pressedImg = null) {
        this.unpressedImg = unpressedImg;
        this.pressedImg = pressedImg || unpressedImg;
        return this;
    },
    /**
	 * 	Changes the pressed/unpressed images of the inner stick.
	 * 	!setImageInner (unpressedImg: Drawable, pressedImg?: Drawable) : Stick;
	 */ setImageInner: function(unpressedImg, pressedImg = null) {
        this.unpressedImgInner = unpressedImg;
        this.pressedImgInner = pressedImg || unpressedImg;
        return this;
    },
    /**
	 * 	Sets the number of angle-steps for the stick.
	 * 	!setAngleSteps (n: number) : Stick;
	 */ setAngleSteps: function(n) {
        this.angleSteps = n;
        return this;
    },
    /**
	 * 	Sets the number of radius-steps for the stick.
	 * 	!setRadiusSteps (n: number) : Stick;
	 */ setRadiusSteps: function(n) {
        this.radiusSteps = n;
        return this;
    },
    /**
	 * 	Sets the dead zone values (normalized).
	 * 	!setDeadZone (deadZoneX: number, deadZoneY: number) : Stick;
	 */ setDeadZone: function(deadZoneX, deadZoneY) {
        this.deadZoneX = deadZoneX;
        this.deadZoneY = deadZoneY;
        return this;
    },
    /**
	 * 	Resets the button to its initial state.
	 * 	!reset() : void;
	 */ reset: function() {
        this.dispx = 0;
        this.dispy = 0;
        this.rdirx = 0;
        this.rdiry = 0;
        this.dirx = 0;
        this.diry = 0;
        this.magnitude = 0;
        if (this._onChange) this._onChange(this.dirx, this.diry, this.magnitude, this.angle, this);
    },
    /**
	 * 	Renders the stick in the canvas.
	 * 	!renderStick (g: Canvas) : void;
	 */ renderStick: function(g, elem, img) {
        if (elem.isPressed) {
            if (elem.pressedImg) elem.pressedImg.draw(g, elem.bounds.x1, elem.bounds.y1);
            if (elem.pressedImgInner) elem.pressedImgInner.draw(g, elem.bounds.x1 + elem.dispx, elem.bounds.y1 + elem.dispy);
        } else {
            if (elem.unpressedImg) elem.unpressedImg.draw(g, elem.bounds.x1, elem.bounds.y1);
            if (elem.unpressedImgInner) elem.unpressedImgInner.draw(g, elem.bounds.x1, elem.bounds.y1);
        }
    },
    /**
	 * 	Button pointer update event. Not required for the button control.
	 * 	!pointerUpdate (pointerX: number, pointerY: number, pointer: object) : void;
	 */ pointerUpdate: function(pointerX, pointerY) {
        let dx, dy;
        dx = pointerX - this.refX;
        dy = pointerY - this.refY;
        this.angle = Math.atan2(-dy, dx);
        this.radius = Math.sqrt(dx * dx + dy * dy);
        if (this.radius > this.maxRadius) this.radius = this.maxRadius;
        if (this.angleSteps) {
            let fs = 2 * Math.PI / this.angleSteps;
            this.angle = int((this.angle + Math.PI + fs / 2) / fs) * fs - Math.PI;
        }
        if (this.radiusSteps) {
            let fs = this.maxRadius / this.radiusSteps;
            this.radius = int((this.radius + fs / 2) / fs) * fs;
        }
        this.rdirx = Math.min(1, Math.max(dx / this.maxRadius, -1));
        this.rdiry = Math.min(1, Math.max(dy / this.maxRadius, -1));
        this.dispx = this.radius * Math.cos(this.angle);
        this.dispy = this.radius * -Math.sin(this.angle);
        if (this.radius > 0) {
            this.dirx = this.dispx / this.radius;
            this.diry = this.dispy / this.radius;
            this.magnitude = this.radius / this.maxRadius;
        } else {
            this.dirx = 0;
            this.diry = 0;
            this.magnitude = 0;
        }
        if (Math.abs(this.rdirx) < this.deadZoneX) {
            this.rdirx = 0;
            this.dirx = 0;
        }
        if (Math.abs(this.rdiry) < this.deadZoneY) {
            this.rdiry = 0;
            this.diry = 0;
        }
        if (this._onChange) this._onChange(this.dirx, this.diry, this.magnitude, this.angle, this);
    },
    /**
	 * 	Called when the PointerEventType.POINTER_DOWN event starts within the bounding box of the stick.
	 * 	!pointerActivate (pointer: object) : void;
	 */ pointerActivate: function(pointer) {
        this.wasPressed = this.isPressed;
        this.isPressed = 1;
        this.refX = pointer.x;
        this.refY = pointer.y;
        this.pointerUpdate(pointer.x, pointer.y);
    },
    /**
	 * 	Called when the PointerEventType.POINTER_UP event is fired with the "_ref" attribute pointing to this object.
	 *	!pointerDeactivate (pointer: object) : void;
	 */ pointerDeactivate: function(pointer) {
        this.wasPressed = this.isPressed;
        this.isPressed = 0;
        this.reset();
    },
    /**
	 * 	Returns `true` if the stick contains the specified point.
	 * 	!containsPoint (x: number, y: number) : boolean;
	 */ containsPoint: function(x, y) {
        if (!this.visible()) return false;
        return this.hitbox.bounds.containsPoint(x, y);
    },
    /**
	 * 	Sets the direction of the stick, the provided deltas should be normalized in the \[-1, 1\] range.
	 * 	!setDirection (dx: number, dy: number, deadZoneX?: number, deadZoneY?: number) : boolean;
	 */ setDirection: function(dx, dy, deadZoneX = 0.10, deadZoneY = 0.10) {
        if (Math.abs(dx) < deadZoneX) dx = 0;
        if (Math.abs(dy) < deadZoneY) dy = 0;
        this.wasPressed = this.isPressed;
        this.isPressed = dx == 0 && dy == 0 ? 0 : 1;
        this.pointerUpdate(this.bounds.cx + dx * this.maxRadius, this.bounds.cy + dy * this.maxRadius);
        return false;
    },
    /**
	 * 	Saves the current state of the stick in the f* variables (fdirx, fdiry, etc). When the `lastValid` parameter is true, the values will
	 * 	be saved on each field only if the current value is not zero.
	 * 	!freezeState (lastValid?: boolean) : Stick;
	 */ freezeState: function(lastValid = false) {
        this.frdirx = lastValid ? this.rdirx != 0 ? this.rdirx : this.frdirx : this.rdirx;
        this.frdiry = lastValid ? this.rdiry != 0 ? this.rdiry : this.frdiry : this.rdiry;
        this.fdirx = lastValid ? this.dirx != 0 ? this.dirx : this.fdirx : this.dirx;
        this.fdiry = lastValid ? this.diry != 0 ? this.diry : this.fdiry : this.diry;
        this.fmagnitude = lastValid ? this.magnitude != 0 ? this.magnitude : this.fmagnitude : this.magnitude;
        this.fangle = lastValid ? this.angle != 0 ? this.angle : this.fangle : this.angle;
        return this;
    },
    /**
	 * 	Key down event, handles the keys that control the direction of the stick.
	 * 	!keyDown (keyCode: KeyCode, keyArgs: object) : boolean|null;
	 */ keyDown: function(keyCode, keyArgs) {
        let dx = 0;
        let dy = 0;
        if (keyArgs[$315d91d8694d77f0$export$2e2bcd8739ae039.UP] === true) dy = -this.maxRadius;
        if (keyArgs[$315d91d8694d77f0$export$2e2bcd8739ae039.LEFT] === true) dx = -this.maxRadius;
        if (keyArgs[$315d91d8694d77f0$export$2e2bcd8739ae039.DOWN] === true) dy = this.maxRadius;
        if (keyArgs[$315d91d8694d77f0$export$2e2bcd8739ae039.RIGHT] === true) dx = this.maxRadius;
        if (keyCode === $315d91d8694d77f0$export$2e2bcd8739ae039.UP || keyCode === $315d91d8694d77f0$export$2e2bcd8739ae039.LEFT || keyCode === $315d91d8694d77f0$export$2e2bcd8739ae039.DOWN || keyCode === $315d91d8694d77f0$export$2e2bcd8739ae039.RIGHT) {
            dx = this.bounds.cx + dx;
            dy = this.bounds.cy + dy;
            this.wasPressed = this.isPressed;
            this.isPressed = 1;
            this.pointerUpdate(dx, dy);
            return false;
        }
    },
    /**
	 * 	Key up event, handles the keys that control the direction of the stick.
	 * 	!keyUp (keyCode: KeyCode, keyArgs: object) : boolean|null;
	 */ keyUp: function(keyCode, keyArgs) {
        let dx = 0;
        let dy = 0;
        if (keyArgs[$315d91d8694d77f0$export$2e2bcd8739ae039.UP] === true) dy = -this.maxRadius;
        if (keyArgs[$315d91d8694d77f0$export$2e2bcd8739ae039.LEFT] === true) dx = -this.maxRadius;
        if (keyArgs[$315d91d8694d77f0$export$2e2bcd8739ae039.DOWN] === true) dy = this.maxRadius;
        if (keyArgs[$315d91d8694d77f0$export$2e2bcd8739ae039.RIGHT] === true) dx = this.maxRadius;
        if (keyCode === $315d91d8694d77f0$export$2e2bcd8739ae039.UP || keyCode === $315d91d8694d77f0$export$2e2bcd8739ae039.LEFT || keyCode === $315d91d8694d77f0$export$2e2bcd8739ae039.DOWN || keyCode === $315d91d8694d77f0$export$2e2bcd8739ae039.RIGHT) {
            this.pointerUpdate(this.bounds.cx + dx, this.bounds.cy + dy);
            if (dx === 0 && dy === 0) {
                this.wasPressed = this.isPressed;
                this.isPressed = 0;
            }
            return false;
        }
    },
    /**
	 * 	Sets the handler for the on-change event. Executed after any change in the direction of the stick.
	 * 	!onChange (callback: (dirx: number, diry: number, magnitude: number, angle: number, stick: Stick) => void) : Stick;
	 */ onChange: function(callback) {
        this._onChange = callback;
        return this;
    }
});


var $2130f57e49561321$exports = {};

$parcel$export($2130f57e49561321$exports, "sys", function () { return $2130f57e49561321$export$773cc7fa6f8304c3; });
$parcel$export($2130f57e49561321$exports, "world", function () { return $2130f57e49561321$export$f965ae91e38a1274; });
$parcel$export($2130f57e49561321$exports, "r", function () { return $2130f57e49561321$export$43caf9889c228507; });
$parcel$export($2130f57e49561321$exports, "res", function () { return $2130f57e49561321$export$a79e2b3ea5d10ee0; });
$parcel$export($2130f57e49561321$exports, "input", function () { return $2130f57e49561321$export$b7e3ae3d7c15e42e; });
$parcel$export($2130f57e49561321$exports, "collider", function () { return $2130f57e49561321$export$5fa227701309b621; });














//!/**
//! * 	World system allows to manage scenes, containers, viewports and display elements.
//! */
//!class world
const $fa8537e16ab1f06a$var$world = {
    /**
	 * World scene constants.
	 *
	 * !static readonly SCENE_MAIN: number;
	 * !static readonly SCENE_HUD: number;
	 */ SCENE_MAIN: 0,
    SCENE_HUD: 1,
    /**
	 * Default layers for the SCENE_MAIN scene.
	 *
	 * !static readonly LAYER_BG0: number;
	 * !static readonly LAYER_BG1: number;
	 * !static readonly LAYER_BG2: number;
	 * !static readonly LAYER_BG3: number;
	 * !static readonly LAYER_BG4: number;
	 * !static readonly LAYER_MAIN: number;
	 * !static readonly LAYER_FG0: number;
	 * !static readonly LAYER_FG1: number;
	 * !static readonly LAYER_FG2: number;
	 * !static readonly LAYER_FG3: number;
	 * !static readonly LAYER_FG4: number;
	 * !static readonly LAYER_MASK: number;
	 */ LAYER_BG0: 0,
    LAYER_BG1: 1,
    LAYER_BG2: 2,
    LAYER_BG3: 3,
    LAYER_BG4: 4,
    LAYER_MAIN: 5,
    LAYER_FG0: 6,
    LAYER_FG1: 7,
    LAYER_FG2: 8,
    LAYER_FG3: 9,
    LAYER_FG4: 10,
    LAYER_MASK: 11,
    /**
	 * Default layers for the SCENE_HUD scene.
	 *
	 * !static readonly LAYER_HUD_BG0: number;
	 * !static readonly LAYER_HUD_BG1: number;
	 * !static readonly LAYER_HUD_BG2: number;
	 * !static readonly LAYER_HUD_MAIN: number;
	 * !static readonly LAYER_HUD_FG0: number;
	 * !static readonly LAYER_HUD_FG1: number;
	 * !static readonly LAYER_HUD_FG2: number;
	 */ LAYER_HUD_BG0: 0,
    LAYER_HUD_BG1: 1,
    LAYER_HUD_BG2: 2,
    LAYER_HUD_MAIN: 3,
    LAYER_HUD_FG0: 4,
    LAYER_HUD_FG1: 5,
    LAYER_HUD_FG2: 6,
    /**
	 *	Registered scenes.
	 */ _scenes: [],
    /**
	 * Active scene set by `selectScene`.
	 * !static activeScene: Scene;
	 */ activeScene: null,
    /**
	 *	Registered viewports.
	 */ _viewports: [],
    /**
	 * Active viewport set by `selectViewport`.
	 * !static activeViewport: Viewport;
	 */ activeViewport: null,
    /**
	 * Active container set by `selectContainer`.
	 * !static activeContainer: Container;
	 */ activeContainer: null,
    /**
	 * Currently active group (set by `createGroup`).
	 * !static activeGroup: Group;
	 */ activeGroup: null,
    /**
	 * Last used group (set by `endGroup`).
	 * !static lastGroup: Group;
	 */ lastGroup: null,
    /**
	 * Last element created by `createElement`, or `createLabel`.
	 * !static lastElement: Element;
	 */ lastElement: null,
    /**
	 * Dimensions of the world.
	 * !static readonly bounds: Bounds2;
	 */ bounds: $6c1a77cc22998ccc$export$2e2bcd8739ae039.Pool.alloc(),
    /**
	 * Initializes the world with the default scenes, viewports and layers.
	 * !static init (worldWidth?: number, worldHeight?: number, divisorX?: number, divisorY?: number) : void;
	 */ init: function(worldWidth = 32768, worldHeight = 32768, divisorX = null, divisorY = null) {
        if (divisorX === null) divisorX = Math.max(worldWidth, worldHeight) / 512;
        if (divisorX < 16) divisorX = 16;
        if (divisorY !== null && divisorY < 16) divisorY = 16;
        this.bounds.zero().resize(worldWidth, worldHeight);
        this.createScene($fa8537e16ab1f06a$var$world.SCENE_MAIN, 'SCENE_MAIN');
        this.setContainer($fa8537e16ab1f06a$var$world.LAYER_BG0, new $6f74f6f50e98e7ac$export$2e2bcd8739ae039(worldWidth, worldHeight, divisorX, divisorY));
        this.setContainer($fa8537e16ab1f06a$var$world.LAYER_BG1, new $6f74f6f50e98e7ac$export$2e2bcd8739ae039(worldWidth, worldHeight, divisorX, divisorY));
        this.setContainer($fa8537e16ab1f06a$var$world.LAYER_BG2, new $6f74f6f50e98e7ac$export$2e2bcd8739ae039(worldWidth, worldHeight, divisorX, divisorY));
        this.setContainer($fa8537e16ab1f06a$var$world.LAYER_BG3, new $6f74f6f50e98e7ac$export$2e2bcd8739ae039(worldWidth, worldHeight, divisorX, divisorY));
        this.setContainer($fa8537e16ab1f06a$var$world.LAYER_BG4, new $6f74f6f50e98e7ac$export$2e2bcd8739ae039(worldWidth, worldHeight, divisorX, divisorY));
        this.setContainer($fa8537e16ab1f06a$var$world.LAYER_MAIN, new $6f74f6f50e98e7ac$export$2e2bcd8739ae039(worldWidth, worldHeight, divisorX, divisorY));
        this.setContainer($fa8537e16ab1f06a$var$world.LAYER_FG0, new $6f74f6f50e98e7ac$export$2e2bcd8739ae039(worldWidth, worldHeight, divisorX, divisorY));
        this.setContainer($fa8537e16ab1f06a$var$world.LAYER_FG1, new $6f74f6f50e98e7ac$export$2e2bcd8739ae039(worldWidth, worldHeight, divisorX, divisorY));
        this.setContainer($fa8537e16ab1f06a$var$world.LAYER_FG2, new $6f74f6f50e98e7ac$export$2e2bcd8739ae039(worldWidth, worldHeight, divisorX, divisorY));
        this.setContainer($fa8537e16ab1f06a$var$world.LAYER_FG3, new $6f74f6f50e98e7ac$export$2e2bcd8739ae039(worldWidth, worldHeight, divisorX, divisorY));
        this.setContainer($fa8537e16ab1f06a$var$world.LAYER_FG4, new $6f74f6f50e98e7ac$export$2e2bcd8739ae039(worldWidth, worldHeight, divisorX, divisorY));
        this.setContainer($fa8537e16ab1f06a$var$world.LAYER_MASK, new $6f74f6f50e98e7ac$export$2e2bcd8739ae039(worldWidth, worldHeight, divisorX, divisorY));
        this.getContainer($fa8537e16ab1f06a$var$world.LAYER_MASK).visible(false);
        this.createViewport(0);
        this.createScene($fa8537e16ab1f06a$var$world.SCENE_HUD, 'SCENE_HUD');
        this.setContainer($fa8537e16ab1f06a$var$world.LAYER_HUD_BG0, new $b5f569186864ae7e$export$2e2bcd8739ae039($ec90764150f3694e$export$2e2bcd8739ae039.screenWidth, $ec90764150f3694e$export$2e2bcd8739ae039.screenHeight));
        this.setContainer($fa8537e16ab1f06a$var$world.LAYER_HUD_BG1, new $b5f569186864ae7e$export$2e2bcd8739ae039($ec90764150f3694e$export$2e2bcd8739ae039.screenWidth, $ec90764150f3694e$export$2e2bcd8739ae039.screenHeight));
        this.setContainer($fa8537e16ab1f06a$var$world.LAYER_HUD_BG2, new $b5f569186864ae7e$export$2e2bcd8739ae039($ec90764150f3694e$export$2e2bcd8739ae039.screenWidth, $ec90764150f3694e$export$2e2bcd8739ae039.screenHeight));
        this.setContainer($fa8537e16ab1f06a$var$world.LAYER_HUD_MAIN, new $b5f569186864ae7e$export$2e2bcd8739ae039($ec90764150f3694e$export$2e2bcd8739ae039.screenWidth, $ec90764150f3694e$export$2e2bcd8739ae039.screenHeight));
        this.setContainer($fa8537e16ab1f06a$var$world.LAYER_HUD_FG0, new $b5f569186864ae7e$export$2e2bcd8739ae039($ec90764150f3694e$export$2e2bcd8739ae039.screenWidth, $ec90764150f3694e$export$2e2bcd8739ae039.screenHeight));
        this.setContainer($fa8537e16ab1f06a$var$world.LAYER_HUD_FG1, new $b5f569186864ae7e$export$2e2bcd8739ae039($ec90764150f3694e$export$2e2bcd8739ae039.screenWidth, $ec90764150f3694e$export$2e2bcd8739ae039.screenHeight));
        this.setContainer($fa8537e16ab1f06a$var$world.LAYER_HUD_FG2, new $b5f569186864ae7e$export$2e2bcd8739ae039($ec90764150f3694e$export$2e2bcd8739ae039.screenWidth, $ec90764150f3694e$export$2e2bcd8739ae039.screenHeight));
    },
    /**
	 * Creates a scene at the specified index and automatically selects it.
	 * !static createScene (index: number, name?: string) : void;
	 */ createScene: function(index, name = null) {
        if (this._scenes[index]) {
            $c5f44d8482fd28c9$export$2e2bcd8739ae039.queueRemove(this._scenes[index]);
            $parcel$global.dispose(this._scenes[index]);
        }
        this._scenes[index] = new $1e3a2ce488585bd2$export$2e2bcd8739ae039(index, name);
        $c5f44d8482fd28c9$export$2e2bcd8739ae039.queueAdd(this._scenes[index]);
        this.selectScene(index);
    },
    /**
	 * Returns the scene at the specified index (or the active scene if no index provided).
	 * !static getScene (index?: number) : Scene;
	 */ getScene: function(index = null) {
        if (index === null) return this.activeScene;
        if (index < 0 || index >= this._scenes.length) return null;
        return this._scenes[index];
    },
    /**
	 * Selects the active scene for subsequence scene-level operations.
	 * !static selectScene (index: number) : boolean;
	 */ selectScene: function(index) {
        if (index < 0 || index >= this._scenes.length || !this._scenes[index]) return false;
        this.activeScene = this._scenes[index];
        this.activeContainer = null;
        return true;
    },
    /**
	 * Creates a viewport at the specified index, attaches it to the active scene and selects it. Use this only after attaching all
	 * containers to the scene or the `maxWidth` and `maxHeight` properties of the scene will not be properly set yet.
	 *
	 * !static createViewport (index: number) : void;
	 */ createViewport: function(index) {
        if (this.activeScene === null) throw new Error('createViewport: use `selectScene` first to select the active scene.');
        if (this._viewports[index]) {
            $parcel$global.dispose(this._viewports[index]);
            this.activeScene.setViewport(index, null);
        }
        this._viewports[index] = new $f3e0869e47faa7b4$export$2e2bcd8739ae039(0, 0, $ec90764150f3694e$export$2e2bcd8739ae039.screenWidth, $ec90764150f3694e$export$2e2bcd8739ae039.screenHeight, this.activeScene.maxWidth, this.activeScene.maxHeight);
        this.activeScene.setViewport(index, this._viewports[index]);
        this.selectViewport(index);
    },
    /**
	 * Returns a viewport given its index (or the active viewport if no index provided).
	 * !static getViewport (index?: number) : Viewport;
	 */ getViewport: function(index = null) {
        if (index === null) return this.activeViewport;
        if (index < 0 || index >= this._viewports.length) return null;
        return this._viewports[index];
    },
    /**
	 * Selects the active viewport.
	 * !static selectViewport (index: number) : boolean;
	 */ selectViewport: function(index) {
        if (index < 0 || index >= this._viewports.length || !this._viewports[index]) return false;
        this.activeViewport = this._viewports[index];
        return true;
    },
    /**
	 * Sets a container in the active scene at the specified index and returns it.
	 * !static setContainer (index: number, container: Container) : Container;
	 */ setContainer: function(index, container) {
        if (this.activeScene === null) throw new Error('setContainer: use `selectScene` first to select the active scene.');
        this.activeScene.setContainer(index, container);
        return container;
    },
    /**
	 * Returns the container at the specified index in the active scene (or the active container if no index provided).
	 * !static getContainer (index?: number) : Container;
	 */ getContainer: function(index = null, throwErrors = false) {
        if (index === null) {
            if (this.activeContainer === null && throwErrors) throw new Error('getContainer: container index not specified and default container not set.');
            return this.activeContainer;
        }
        if (this.activeScene === null) throw new Error('getContainer: use `selectScene` first to select the active scene.');
        let container = this.activeScene.getContainer(index);
        if (container === null && throwErrors) throw new Error('getContainer: container index out of bounds.');
        return container;
    },
    /**
	 * Selects the active container.
	 * !static selectContainer (index: number) : boolean;
	 */ selectContainer: function(index) {
        this.activeContainer = this.getContainer(index, true);
        return this.activeContainer !== null;
    },
    /**
	 * Changes the visibility of the LAYER_MASK to enable (or disable) mask bounds rendering.
	 * @param {boolean} value
	 * @param {boolean} allMasks If set to `false` only masks having `debugBounds` to non-false will be drawn.
	 * !static showMasks (value: boolean, allMasks?: boolean) : void;
	 */ showMasks: function(value, allMasks = true) {
        $fa8537e16ab1f06a$var$world.getScene($fa8537e16ab1f06a$var$world.SCENE_MAIN).getContainer($fa8537e16ab1f06a$var$world.LAYER_MASK).visible(value);
        $fdb3e373096c6ca3$export$2e2bcd8739ae039.debugMasks = allMasks;
    },
    /**
	 * Creates a group in the active scene and selects it as the active group.
	 * !static createGroup (id?: string) : Group;
	 */ createGroup: function(id = null) {
        if (this.activeScene === null) throw new Error('createGroup: use selectScene first to select the active scene.');
        this.activeGroup = $db57198fb17fd645$export$2e2bcd8739ae039.Pool.alloc(id);
        this.activeScene.addGroup(this.activeGroup);
        return this.activeGroup;
    },
    /**
	 * If coordinates are provided the group will be translated to the specified position. It will then set `lastGroup`, and nullify `activeGroup`.
	 * !static endGroup (x?: number, y?: number) : Group;
	 */ endGroup: function(x = null, y = null) {
        if (x !== null && y !== null) this.activeGroup.translate(x, y);
        this.lastGroup = this.activeGroup;
        this.activeGroup = null;
        return this.lastGroup.sync();
    },
    /**
	 * Creates a named Element and adds it to the specified container (or the active one) in the active scene.
	 * If a group is active, the element will be attached to the group.
	 * 
	 * !static createElement (id: string, x: number, y: number, img?: Drawable, containerIndex?: number) : Element;
	 */ /**
	 * Creates an Element and adds it to the specified container (or the active one) in the active scene.
	 * If a group is active, the element will be attached to the group.
	 * 
	 * !static createElement (x: number, y: number, img?: Drawable, containerIndex?: number) : Element;
	 */ createElement: function(id, x, y, img = null, containerIndex = null) {
        if (typeof id !== 'string') {
            containerIndex = img;
            img = y;
            y = x;
            x = id;
            id = null;
        }
        let container = this.getContainer(containerIndex);
        let elem = $09f047381ad3e737$export$2e2bcd8739ae039.Pool.alloc(x, y, img);
        container.add(elem.setId(id));
        if (this.activeGroup !== null) this.activeGroup.addChild(elem);
        this.lastElement = elem;
        return elem;
    },
    /**
	 * Creates a named mask and adds it to the specified container or LAYER_MASK if none provided.
	 * If a group is active, the mask will be attached to the group.
	 * 
	 * !static createMask (id: string, type: number, x?: number, y?: number, width?: number, height?: number, containerIndex?: number) : Mask;
	 */ createMask: function(id, type, x = null, y = null, width = null, height = null, containerIndex = null) {
        let container = this.getContainer(containerIndex || $fa8537e16ab1f06a$var$world.LAYER_MASK);
        if (x === null) {
            if (this.activeGroup === null) throw new Error('createMask: create a group first to use default masks.');
            x = this.activeGroup.bounds.x1;
            y = this.activeGroup.bounds.y1;
            width = this.activeGroup.bounds.width();
            height = this.activeGroup.bounds.height();
        }
        let mask = $99fbe93690d879a1$export$2e2bcd8739ae039.Pool.alloc(type, x, y, width, height);
        container.add(mask.setId(id));
        if (this.activeGroup !== null) this.activeGroup.addChild(mask);
        return mask;
    },
    /**
	 * Creates a named label element and adds it to the specified container (or the active one) in the active scene.
	 * If a group is active, the label element will be attached to the group.
	 * 
	 * !static createLabel (id: string, x: number, y: number, font: object, text: string, containerIndex?: number) : Label;
	 */ /**
	 * Creates a label element and adds it to the specified container (or the active one) in the active scene.
	 * If a group is active, the label element will be attached to the group.
	 * 
	 * !static createLabel (x: number, y: number, font: object, text: string, containerIndex?: number) : Label;
	 */ createLabel: function(id, x, y, font, text, containerIndex = null) {
        if (typeof id !== 'string') {
            containerIndex = text;
            text = font;
            font = y;
            y = x;
            x = id;
            id = null;
        }
        let container = this.getContainer(containerIndex);
        let elem = $e7f26224e1e585fc$export$2e2bcd8739ae039.Pool.alloc(x, y, font, text);
        container.add(elem.setId(id));
        if (this.activeGroup !== null) this.activeGroup.addChild(elem);
        this.lastElement = elem;
        return elem;
    },
    /**
	 * Creates a new updater, attaches it to the active scene and returns it.
	 * !static createUpdater (update?: (elem: Element, dt: number, context: object) => boolean, context?: object) : Updater;
	 */ createUpdater: function(update = null, context = null) {
        if (this.activeScene === null) throw new Error('createUpdater: use selectScene first to select the active scene.');
        return new $f90accd4e9a34560$export$2e2bcd8739ae039(this.activeScene, update, context);
    }
};
var //!/class
$fa8537e16ab1f06a$export$2e2bcd8739ae039 = $fa8537e16ab1f06a$var$world;


//!/**
//! * Registered resources. Initially these are resource descriptors, but after a call to `res.load` these will be fully loaded resources.
//! */
//:const r : { \[key: string\]: any };
const $b3cd4fa82fedc426$var$r = {};
var $b3cd4fa82fedc426$export$2e2bcd8739ae039 = $b3cd4fa82fedc426$var$r;




/**
 * 	Resource manager allows to specify resource descriptors to load them.
 */ //!class res
const $6824d8eb87dd654f$var$res = {
    /**
	 * Configures the resources object with the specified options.
	 * !static config (options: Resources.ConfigOptions) : void;
	 */ config: function(opts) {
        $0150c0894dfca188$export$2e2bcd8739ae039.config(opts);
    },
    /**
	 * 	Loads all registered resources that have not been loaded yet.
	 * 	!static load (progressCallback?: (t: number, name: string) => void) : Promise<void>;
	 */ load: function(progressCallback = null) {
        return new Promise(function(resolve, reject) {
            $0150c0894dfca188$export$2e2bcd8739ae039.load($b3cd4fa82fedc426$export$2e2bcd8739ae039, function(index, total, value, name) {
                if (progressCallback) progressCallback(value, name);
            }, function() {
                resolve();
            });
        });
    },
    /**
	 * 	Returns a resource given its identifier.
	 * 	@param id - Resource identifier.
	 * 	!static get (id: string) : object;
	 */ get: function(id) {
        return $b3cd4fa82fedc426$export$2e2bcd8739ae039[id];
    },
    /**
	 * 	Checks if the ID exists in the fxl `r` map, throws an error if it does.
	 */ __resIdMustNotExist: function(id) {
        if (id in $b3cd4fa82fedc426$export$2e2bcd8739ae039) throw new Error('Resource identifier `' + id + '` is already in use');
    },
    /**
	 * 	Registers a solid-color resource.
	 * 	@param id - Resource identifier.
	 * 
	 * 	!static color (id: string, color: string, width: number, height: number) : object;
	 */ color: function(id, color, width, height) {
        this.__resIdMustNotExist(id);
        return $b3cd4fa82fedc426$export$2e2bcd8739ae039[id] = {
            type: 'object',
            wrapper: 'Custom',
            color: color,
            width: width,
            height: height
        };
    },
    /**
	 * 	Registers a custom drawable resource.
	 * 	@param id - Resource identifier.
	 * 
	 * 	!static custom (id: string, width: number, height: number, drawFunction: (g: Canvas) => void) : object;
	 */ custom: function(id, width, height, drawFunction, opts = null) {
        this.__resIdMustNotExist(id);
        return $b3cd4fa82fedc426$export$2e2bcd8739ae039[id] = {
            type: 'object',
            wrapper: 'Custom',
            width: width,
            height: height,
            draw: drawFunction,
            ...opts
        };
    },
    /**
	 * 	Registers an image resource.
	 * 	@param id - Resource identifier.
	 * 
	 * 	!static image (id: string, path: string, opts?: object) : object;
	 */ image: function(id, path, opts = null) {
        this.__resIdMustNotExist(id);
        return $b3cd4fa82fedc426$export$2e2bcd8739ae039[id] = {
            type: 'image',
            wrapper: 'Drawable',
            src: path,
            ...opts
        };
    },
    /**
	 * 	Registers a multi image resource.
	 * 	@param id - Resource identifier.
	 * 	@param path - Path to the source file. Ensure to add the "#" marks to replace the file index (i.e. "image-##.png").
	 * 	@param count - Number of images to load (from 0 to count-1).
	 * 
	 * 	!static images (id: string, path: string, count: number, frameWidth?: number, frameHeight?: number, optsA?: object, optsB?: object) : object;
	 */ images: function(id, path, count, frameWidth = null, frameHeight = null, optsA = null, optsB = null) {
        this.__resIdMustNotExist(id);
        return $b3cd4fa82fedc426$export$2e2bcd8739ae039[id] = {
            type: 'images',
            wrapper: 'Spritesheet',
            src: path,
            count: count,
            width: frameWidth,
            height: frameHeight,
            config: {
                frameWidth: frameWidth,
                frameHeight: frameHeight,
                ...optsA
            },
            ...optsB
        };
    },
    /**
	 * 	Registers an spritesheet resource.
	 * 	@param id - Resource identifier.
	 * 	@param path - Path to the source file.
	 * 
	 * 	!static spritesheet (id: string, path: string, frameWidth: number, frameHeight: number, numFrames?: number, optsA?: object, optsB?: object) : object;
	 */ spritesheet: function(id, path, frameWidth, frameHeight, numFrames = 0, optsA = null, optsB = null) {
        this.__resIdMustNotExist(id);
        return $b3cd4fa82fedc426$export$2e2bcd8739ae039[id] = {
            type: 'image',
            wrapper: 'Spritesheet',
            src: path,
            config: {
                frameWidth: frameWidth,
                frameHeight: frameHeight,
                numFrames: numFrames,
                ...optsA
            },
            ...optsB
        };
    },
    /**
	 * 	Registers a spritesheet animation resource.
	 * 	@param id - Resource identifier.
	 * 	@param path - Path to the source file.
	 * 
	 * 	!static animation (id: string, path: string, frameWidth: number, frameHeight: number, numFrames?: number, configOptions?: object, resOptions?: object) : object;
	 */ animation: function(id1, path, frameWidth, frameHeight, numFrames = null, configOptions = null, resOptions = null) {
        this.__resIdMustNotExist(id1);
        return $b3cd4fa82fedc426$export$2e2bcd8739ae039[id1] = {
            type: 'image',
            wrapper: 'SpritesheetAnimation',
            src: path,
            config: {
                frameWidth: frameWidth,
                frameHeight: frameHeight,
                numFrames: numFrames,
                ...configOptions
            },
            anim: {
                def: null,
                fps: 15,
                seq: {},
                trans: {}
            },
            ...resOptions,
            fps: function(value) {
                this.anim.fps = value;
                return this;
            },
            seq: function(id, loop, group, fps = null) {
                this.anim.seq[id] = {
                    loop: loop,
                    group: group
                };
                if (fps !== null) this.anim.seq[id].fps = fps;
                return this;
            },
            trans: function(srcSeq, dstSeq, group) {
                if (!(srcSeq in this.anim.trans)) this.anim.trans[srcSeq] = {};
                this.anim.trans[srcSeq][dstSeq] = group;
                return this;
            },
            def: function(value) {
                this.anim.def = value;
                return this;
            }
        };
    },
    /**
	 * 	Registers a spritefont animation resource.
	 * 	@param id - Resource identifier.
	 * 	@param path - Path to the source file.
	 * 
	 * 	!static spritefont (id: string, path: string, charWidth: number, charHeight: number, charset: string, optsA?: object, optsB?: object) : object;
	 */ spritefont: function(id, path, charWidth, charHeight, charset, optsA = null, optsB = null) {
        this.__resIdMustNotExist(id);
        return $b3cd4fa82fedc426$export$2e2bcd8739ae039[id] = {
            type: 'image',
            wrapper: 'SpriteFont',
            src: path,
            font: {
                charWidth: charWidth,
                charHeight: charHeight,
                charset: charset,
                ...optsA
            },
            ...optsB
        };
    },
    /**
	 * 	Registers a JSON data resource.
	 * 	@param id - Resource identifier.
	 * 	@param path - Path to the source file.
	 * 
	 * 	!static json (id: string, path: string, opts?: object) : object;
	 */ json: function(id, path, opts = null) {
        this.__resIdMustNotExist(id);
        return $b3cd4fa82fedc426$export$2e2bcd8739ae039[id] = {
            type: 'json',
            src: path,
            ...opts
        };
    },
    /**
	 * 	Registers a binary data resource.
	 * 	@param id - Resource identifier.
	 * 	@param path - Path to the source file.
	 * 
	 * 	!static data (id: string, path: string, opts?: object) : object;
	 */ data: function(id, path, opts = null) {
        this.__resIdMustNotExist(id);
        return $b3cd4fa82fedc426$export$2e2bcd8739ae039[id] = {
            type: 'data',
            src: path,
            ...opts
        };
    },
    /**
	 * 	Registers a text data resource.
	 * 	@param id - Resource identifier.
	 * 	@param path - Path to the source file.
	 * 
	 * 	!static text (id: string, path: string, opts?: object) : object;
	 */ text: function(id, path, opts = null) {
        this.__resIdMustNotExist(id);
        return $b3cd4fa82fedc426$export$2e2bcd8739ae039[id] = {
            type: 'text',
            src: path,
            ...opts
        };
    },
    /**
	 * 	Registers a sound effect audio resource.
	 * 	@param id - Resource identifier.
	 * 	@param path - Path to the source file.
	 * 
	 * 	!static sfx (id: string, path: string, opts?: object) : object;
	 */ sfx: function(id, path, opts = null) {
        this.__resIdMustNotExist(id);
        return $b3cd4fa82fedc426$export$2e2bcd8739ae039[id] = {
            type: 'audio',
            wrapper: 'Sound',
            src: path,
            track: 'sfx',
            ...opts
        };
    },
    /**
	 * 	Registers a multi sound effect audio resource.
	 * 	@param id - Resource identifier.
	 * 	@param path - Path to the source file. Ensure to add the "#" marks to replace the file index (i.e. "sound-##.ogg").
	 * 	@param count - Number of sounds to load (from 0 to count-1).
	 * 	@param mode - Playback mode, can be `sequential` (default) or `random`.
	 * 
	 * 	!static sfxm (id: string, path: string, count: number, mode?: string) : object;
	 */ sfxm: function(id, path, count, mode = 'sequential') {
        this.__resIdMustNotExist(id);
        return $b3cd4fa82fedc426$export$2e2bcd8739ae039[id] = {
            type: 'audios',
            wrapper: 'SoundArray',
            src: path,
            count: count,
            track: 'sfx',
            mode: mode
        };
    },
    /**
	 * 	Registers an music audio resource.
	 * 	@param id - Resource identifier.
	 * 	@param path - Path to the source file.
	 * 
	 * 	!static music (id: string, path: string) : object;
	 */ music: function(id, path) {
        this.__resIdMustNotExist(id);
        return $b3cd4fa82fedc426$export$2e2bcd8739ae039[id] = {
            type: 'audio',
            wrapper: 'Sound',
            src: path,
            track: 'music'
        };
    }
};
var $6824d8eb87dd654f$export$2e2bcd8739ae039 = $6824d8eb87dd654f$var$res;






var $hNLgQ = parcelRequire("hNLgQ");


//![import '../flow/stick.js']
//![import '../flow/button.js']
/**
 * Gamepads are input objects that allow sticks and buttons to be added to it.
 */ //!class Gamepad
const $b9346b8e76e443ea$var$Gamepad = $hNLgQ.Class.extend({
    /**
	 * Contains the sticks of the gamepad.
	 * !readonly sticks: { \[key:string\]: Stick };
	 */ sticks: null,
    /**
	 * Contains the buttons of the gamepad.
	 * !readonly buttons: { \[key:string\]: Button };
	 */ buttons: null,
    /**
	 * World scene where the container is defined.
	 */ scene: null,
    /**
	 * Container where the gamepad controls will be created.
	 */ container: null,
    /**
	 * Indicates the visible state of the gamepad.
	 */ _visible: true,
    /**
	 * Constructs a new gamepad object.
	 * !constructor (scene: Scene, containerIndex: number);
	 */ __ctor: function(scene, containerIndex) {
        this.sticks = {};
        this.buttons = {};
        this.scene = scene;
        this.layer = scene.getContainer(containerIndex);
    },
    /**
	 * Creates a new stick control and adds it to the gamepad.
	 * !addStick (id: string, x: number, y: number, outerDrawable: Drawable, innerDrawable: Drawable, maxRadius?: number|0) : Stick;
	 */ addStick: function(id, x, y, outerDrawable, innerDrawable, maxRadius = 0) {
        if (maxRadius == 0) maxRadius = outerDrawable.width - innerDrawable.width;
        let stick = new $f79394a78c5df7c6$export$2e2bcd8739ae039(this.layer, x, y, maxRadius, outerDrawable, innerDrawable);
        this.sticks[id] = stick;
        this[id] = stick;
        return stick;
    },
    /**
	 * Creates a new button control and adds it to the gamepad.
	 * !addButton (id: string, x: number, y: number, unpressedDrawable?: Drawable|null, pressedDrawable?: Drawable|null) : Button;
	 */ addButton: function(id, x, y, unpressedDrawable = null, pressedDrawable = null) {
        let button = new $13eb70d37a7efcb1$export$2e2bcd8739ae039(this.layer, x, y, unpressedDrawable, pressedDrawable);
        this.buttons[id] = button;
        this[id] = button;
        return button;
    },
    /**
	 * Returns the `visible` property of the gamepad.
	 * !visible() : boolean;
	 */ /**
	 * Sets the `visible` property of the gamepad.
	 * !visible (value: boolean) : Gamepad;
	 */ visible: function(value = null) {
        if (value === null) return this._visible;
        this._visible = value;
        for(let i in this.sticks)this.sticks[i].visible(value);
        for(let i1 in this.buttons)this.buttons[i1].visible(value);
        return this;
    },
    /**
	 * Sets the `visible` property of all masks to the specified value.
	 * !showMasks (value: boolean) : Gamepad;
	 */ showMasks: function(value) {
        for(let i in this.sticks)this.sticks[i].hitbox.visible(value, true);
        for(let i2 in this.buttons)this.buttons[i2].hitbox.visible(value, true);
        return this;
    }
});
var //!/class
$b9346b8e76e443ea$export$2e2bcd8739ae039 = $b9346b8e76e443ea$var$Gamepad;


//!namespace input
//:[import './gamepad.js']
//!/namespace
//!class input
/**
 *	Input system allows to create gamepads and manage the system cursor.
 */ const $86072fb964c02d68$var$input = {
    /**
	 * Registered gamepads.
	 */ _gamepads: [],
    /**
	 * Currently active gamepad.
	 * !static activeGamepad: input.Gamepad;
	 */ activeGamepad: null,
    /**
	 * Last created button.
	 * !static lastButton: Button;
	 */ lastButton: null,
    /**
	 * Last created stick.
	 * !static lastStick: Stick;
	 */ lastStick: null,
    /**
	 * Cursor object, used to control the state of the single-cursor input.
	 */ cursor: {
        /**
		 * Indicates if the single-cursor input has been enabled.
		 */ _enabled: null,
        /**
		 * Handler callback for cursor events.
		 */ _handler: null,
        /**
		 * Cursor element used when the single-cursor input is enabled.
		 */ _element: null,
        /**
		 * Pointer state related to the cursor when single-cursor input is enabled.
		 */ pointer: null,
        /**
		 * Returns the element used for single-cursor input.
		 */ element: function(elem = false) {
            if (elem === false) return this._element;
            this._element = elem;
            return this;
        },
        /**
		 * Hides or shows the native cursor.
		 */ native: function(value) {
            if (!value && $ec90764150f3694e$export$2e2bcd8739ae039.renderer.elem.style.cursor !== 'none') $ec90764150f3694e$export$2e2bcd8739ae039.renderer.elem.style.cursor = 'none';
            else if (value && $ec90764150f3694e$export$2e2bcd8739ae039.renderer.elem.style.cursor === 'none') $ec90764150f3694e$export$2e2bcd8739ae039.renderer.elem.style.removeProperty('cursor');
        },
        /**
		 * Enables or disables the single-cursor input.
		 */ enabled: function(value = null) {
            if (value === null) return this._enabled;
            if (this._enabled === value) return this;
            this._enabled = value;
            if (value === true) {
                if (this._element !== null) $ec90764150f3694e$export$2e2bcd8739ae039.renderer.elem.style.cursor = 'none';
                $d1380cb64b9fa053$export$2e2bcd8739ae039.register(this.pointerHandler);
            } else {
                $ec90764150f3694e$export$2e2bcd8739ae039.renderer.elem.style.removeProperty('cursor');
                $d1380cb64b9fa053$export$2e2bcd8739ae039.unregister(this.pointerHandler);
            }
            return this;
        },
        /**
		 * Sets the callback to execute when a cursor event happens.
		 * @param { (action:number, pointer:object) => void } callback
		 */ handler: function(callback) {
            this._handler = callback;
            return this;
        },
        /**
		 * Pointer event handler for single-cursor input.
		 */ pointerHandler: {
            priority: 50,
            onPointerEvent: function(action, pointer, pointers) {
                if (!$86072fb964c02d68$var$input.cursor._enabled) return;
                $86072fb964c02d68$var$input.cursor.pointer = pointer;
                if ($86072fb964c02d68$var$input.cursor._element !== null) $86072fb964c02d68$var$input.cursor._element.setPosition(pointer.x, pointer.y);
                if ($86072fb964c02d68$var$input.cursor._handler !== null) $86072fb964c02d68$var$input.cursor._handler(action, pointer);
            }
        }
    },
    /**
	 * Creates a gamepad object and attaches it to the SCENE_HUD in the specified layer (defaults to LAYER_HUD_MAIN).
	 * !static createGamepad (index: number, layerIndex?: number) : input.Gamepad;
	 */ createGamepad: function(index, layerIndex = null) {
        layerIndex = layerIndex !== null ? layerIndex : $fa8537e16ab1f06a$export$2e2bcd8739ae039.LAYER_HUD_MAIN;
        $fa8537e16ab1f06a$export$2e2bcd8739ae039.selectScene($fa8537e16ab1f06a$export$2e2bcd8739ae039.SCENE_HUD);
        $fa8537e16ab1f06a$export$2e2bcd8739ae039.selectContainer(layerIndex);
        this._gamepads[index] = new $b9346b8e76e443ea$export$2e2bcd8739ae039($fa8537e16ab1f06a$export$2e2bcd8739ae039.activeScene, layerIndex);
        this.selectGamepad(index);
        return this.activeGamepad;
    },
    /**
	 * Returns a gamepad given its index.
	 * !static getGamepad (index: number) : input.Gamepad;
	 */ getGamepad: function(index) {
        if (index < 0 || index >= this._gamepads.length) return null;
        return this._gamepads[index] || null;
    },
    /**
	 * Selects the active gamepad for subsequent gamepad-level operations.
	 * !static selectGamepad (index: number) : boolean;
	 */ selectGamepad: function(index) {
        this.activeGamepad = this.getGamepad(index);
        return true;
    },
    /**
	 * Sets the value of `debugBounds` on the specified gamepad. If index is `null`, all gamepads will be selected.
	 * !static debugGamepad (index: number, value: boolean) : void;
	 */ debugGamepad: function(index, value) {
        if (index === null) {
            for(let i = 0; i < this._gamepads.length; i++){
                if (!this._gamepads[i]) continue;
                this.debugGamepad(i, value);
            }
            return;
        }
        this._gamepads[index].debug(value);
    },
    /**
	 * Adds an stick control to the active gamepad.
	 * !static stick (id: string, x: number, y: number, outerDrawable: Drawable, innerDrawable: Drawable, maxRadius?: number|0) : Stick;
	 */ stick: function(id, x, y, outerDrawable, innerDrawable, maxRadius = 0) {
        if (this.activeGamepad === null) throw new Error('input.addStick: use input.selectGamepad first to select the active gamepad.');
        return this.lastStick = this.activeGamepad.addStick(id, x, y, outerDrawable, innerDrawable, maxRadius);
    },
    /**
	 * Adds a button control to the active gamepad.
	 * !static button (id: string, x: number, y: number, unpressedDrawable?: Drawable|null, pressedDrawable?: Drawable|null) : Button;
	 */ button: function(id, x, y, unpressedDrawable = null, pressedDrawable = null) {
        if (this.activeGamepad === null) throw new Error('input.addButton: use input.selectGamepad first to select the active gamepad.');
        return this.lastButton = this.activeGamepad.addButton(id, x, y, unpressedDrawable, pressedDrawable);
    }
};
var //!/class
$86072fb964c02d68$export$2e2bcd8739ae039 = $86072fb964c02d68$var$input;






/**
 * 	Mask used to isolate the super-type of a type.
 */ const $0627407290d788ba$var$SUPER_TYPE_MASK = 0xFFFFF000;
/**
 * 	The collider system is responsible of detecting collisions and performing the respective actions.
 */ //!class collider
const $0627407290d788ba$var$collider = {
    /**
	 * 	Flag used to exclude from collision checks.
	 *	!static readonly FLAG_EXCLUDE: number;
	 */ FLAG_EXCLUDE: $9e0453cff9bc3880$export$2e2bcd8739ae039.allocFlag(),
    /**
	 * 	Contact rules, define what to do when certain types of elements are in contact.
	 */ contactRules: {},
    /**
	 * 	Truncation rules, indicate which type of elements are not allowed to penetrate each other.
	 */ truncationRules: {},
    /**
	 *	Scene where the mask layer is contained.
	 */ scene: null,
    /**
	 *	Layer containing the element masks.
	 */ maskLayer: null,
    /**
	 *	First updater.
	 *	!static fupdater: Handler;
	 */ fupdater: null,
    /**
	 *	Last updater.
	 *	!static lupdater: Handler;
	 */ lupdater: null,
    /**
	 *	Flags used to filter elements.
	 *	!static flagsAnd: number;
	 *	!static flagsValue: number;
	 */ flagsAnd: 0,
    flagsValue: 0,
    /**
	 *	Current collider state fields.
	 *	!static state: {
	 */ state: {
        /**
		 * 	Contact area.
		 *	!contact: Bounds2;
		 */ contact: $6c1a77cc22998ccc$export$2e2bcd8739ae039.Pool.alloc(),
        /**
		 * 	Contact flags.
		 * 	!flags: collider.Contact;
		 */ flags: 0,
        /**
		 * 	Final delta value for X-coordinate calculated by `translate`.
		 *	!dx: number;
		 */ dx: 0,
        /**
		 * 	Final delta value for Y-coordinate calculated by `translate`.
		 *	!dy: number;
		 */ dy: 0,
        bounds: $6c1a77cc22998ccc$export$2e2bcd8739ae039.Pool.alloc(),
        x: new Array(32).fill(0),
        y: new Array(32).fill(0),
        v0x: new Array(32).fill(0),
        v0y: new Array(32).fill(0),
        v1x: new Array(32).fill(0),
        v1y: new Array(32).fill(0),
        v2x: new Array(32).fill(0),
        v2y: new Array(32).fill(0),
        count: 0,
        target: 0,
        v0: 0,
        w0: 0,
        delta0: 0,
        v1: 0,
        w1: 0,
        delta1: 0,
        w2: 0,
        t_dx: 0,
        t_dy: 0
    },
    //:}
    /**
	 *	Enables the collider system on the specified scene and layer.
	 * 	@param sceneIndex - Scene to attach the collider updater methods. Uses world.SCENE_MAIN if none specified.
	 * 	@param layerIndex - Index within the scene of the layer where element masks are stored. Uses world.LAYER_MASK if none specified.
	 * 	!static enable (sceneIndex?: number, layerIndex?: number) : void;
	 */ enable: function(sceneIndex = null, layerIndex = null) {
        this.scene = $fa8537e16ab1f06a$export$2e2bcd8739ae039.getScene(sceneIndex || $fa8537e16ab1f06a$export$2e2bcd8739ae039.SCENE_MAIN);
        this.maskLayer = this.scene.getContainer(layerIndex || $fa8537e16ab1f06a$export$2e2bcd8739ae039.LAYER_MASK);
        this.flagsAnd = $9e0453cff9bc3880$export$2e2bcd8739ae039.ALIVE | $9e0453cff9bc3880$export$2e2bcd8739ae039.VISIBLE | $0627407290d788ba$var$collider.FLAG_EXCLUDE;
        this.flagsValue = $9e0453cff9bc3880$export$2e2bcd8739ae039.ALIVE | $9e0453cff9bc3880$export$2e2bcd8739ae039.VISIBLE;
        this.scene.fupdater.add(this.firstUpdate, this);
        this.scene.lupdater.add(this.lastUpdate, this);
        this.fupdater = $628f585857a65401$export$2e2bcd8739ae039.Pool.alloc(this);
        this.lupdater = $628f585857a65401$export$2e2bcd8739ae039.Pool.alloc(this);
    },
    /**
	 *	Disables the collider system.
	 *	!static disable() : void;
	 */ disable: function() {
        this.scene.fupdater.remove(this.update, this);
        this.maskLayer = null;
        this.fupdater.free();
        this.lupdater.free();
    },
    /**
	 * 	Runs a first update cycle `fupdater` will be executed.
	 */ firstUpdate: function(scene, self) {
        self.fupdater.exec();
    },
    /**
	 * 	Runs a last update cycle `lupdater` will be executed.
	 */ lastUpdate: function(scene, self) {
        self.lupdater.exec();
    },
    /**
	 * 	Utility object containing actions that are executed later on the next update cycle.
	 * 	!static later: {
	 */ later: {
        /**
		 *	Runs the specified callback.
		 *	!run (elem: Element, callback: Function, arg1?: any, arg2?: any, arg3?: any) : void;
		 */ run: function(elem, callback, arg1, arg2, arg3) {
            $0627407290d788ba$var$collider.fupdater.add(this._run, elem, callback, arg1, arg2, arg3);
        },
        /**
		 *	Sets the element's visibility flag.
		 * 	!setVisible (elem: Element, value: boolean) : void;
		 */ setVisible: function(elem, value) {
            $0627407290d788ba$var$collider.fupdater.add(this._setVisible, elem, value);
        },
        /**
		 *	Sets an attribute of an object to a given value.
		 * 	!setValue (obj: Object, name: string, value: any) : void;
		 */ setValue: function(obj, name, value) {
            $0627407290d788ba$var$collider.fupdater.add(this._setValue, obj, name, value);
        },
        /**
		 *	Sets the element's flags.
		 *	!setFlags (elem: Element, value: number) : void;
		 */ setFlags: function(elem, value) {
            $0627407290d788ba$var$collider.fupdater.add(this._setFlags, elem, value);
        },
        /**
		 *	Clears the element's flags.
		 * 	!clearFlags (elem: Element, value: number) : void;
		 */ clearFlags: function(elem, value) {
            $0627407290d788ba$var$collider.fupdater.add(this._clearFlags, elem, value);
        },
        /* ******* */ _run: function(host, elem, callback, arg1, arg2, arg3) {
            callback(host, elem, arg1, arg2, arg3);
            return false;
        },
        _setVisible: function(host, elem, value) {
            elem.visible(value);
            return false;
        },
        _setValue: function(host, obj, name, value) {
            obj[name] = value;
            return false;
        },
        _setFlags: function(host, elem, value) {
            elem.setFlags(value);
            return false;
        },
        _clearFlags: function(host, elem, value) {
            elem.clearFlags(value);
            return false;
        }
    },
    //!}
    /**
	 * 	Adds a contact rule.
	 * 	@param primaryType - Type of the primary element.
	 * 	@param secondaryType - Type of the secondary element.
	 * 	@param callback - Callback to execute when contact is detected.
	 * 	@param context - Optional value passed as last parameter to the callback.
	 * 	!static contact (primaryType: number, secondaryType: number, callback: (primary: Mask, secondary: Mask, context?: any) => void, context?: any) : collider;
	 */ contact: function(primaryType, secondaryType, callback, context = null) {
        if (!(primaryType in this.contactRules)) this.contactRules[primaryType] = {};
        this.contactRules[primaryType][secondaryType] = {
            callback: callback,
            context: context
        };
        return this;
    },
    /**
	 * 	Adds a truncation rule.
	 * 	@param primaryType - Type or super-type of the primary element.
	 * 	@param secondaryType - Type or super-type of the secondary element.
	 * 	@param callback - Returns boolean indicating if the truncation rule should be applied.
	 * 	@param context - Optional value passed as last parameter to the callback.
	 * 	:static truncate (primaryType: number, secondaryType: number, callback?: (primary: Mask, secondary: Mask, context?: any) => void, context?: any) : collider;
	 */ /**
	 * 	Adds a truncation rule.
	 * 	@param primaryType - Type or super-type of the primary element.
	 * 	@param secondaryType - Type or super-type of the secondary element.
	 * 	@param value - Indicates the status of the truncation rule.
	 * 	!static truncate (primaryType: number, secondaryType: number, value: boolean) : collider;
	 */ truncate: function(primaryType, secondaryType, callback = null, context = null) {
        if (!(primaryType in this.truncationRules)) this.truncationRules[primaryType] = {};
        this.truncationRules[primaryType][secondaryType] = {
            callback: callback,
            context: context
        };
        return this;
    },
    /**
	 * 	Loads the contact flags in the collider state.
	 *	!static getContactFlags (boundsA: Bounds2, boundsB: Bounds2) : number;
	 */ getContactFlags: function(boundsA, boundsB) {
        this.state.contact.set(boundsA).setAsIntersection(boundsB);
        let contact = this.state.contact;
        this.state.flags = 0;
        this.state.numFlags = 0;
        if (contact.x1 == boundsB.x1) {
            this.state.flags |= $0627407290d788ba$var$collider.Contact.LEFT; // LEFT
            this.state.numFlags++;
        }
        if (contact.x2 == boundsB.x2) {
            this.state.flags |= $0627407290d788ba$var$collider.Contact.RIGHT; // RIGHT
            this.state.numFlags++;
        }
        if (contact.y1 == boundsB.y1) {
            this.state.flags |= $0627407290d788ba$var$collider.Contact.TOP; // TOP
            this.state.numFlags++;
        }
        if (contact.y2 == boundsB.y2) {
            this.state.flags |= $0627407290d788ba$var$collider.Contact.BOTTOM; // BOTTOM
            this.state.numFlags++;
        }
        return this.state.flags;
    },
    calc: function(store0, sign, a, v0a, v1a, v1b) {
        let n = this.state.count;
        let delta = null;
        let v = 0;
        if (sign > 0) for(let i = 0; i < n; i++){
            if (!v0a[i] || !v1a[i] || a[i] < 0) continue;
            if (delta === null || a[i] > delta) delta = a[i];
            v1a[i] = v1b[i] = 0;
            v += v0a[i];
        }
        else for(let i1 = 0; i1 < n; i1++){
            if (!v0a[i1] || !v1a[i1] || a[i1] > 0) continue;
            if (delta === null || a[i1] < delta) delta = a[i1];
            v1a[i1] = v1b[i1] = 0;
            v += v0a[i1];
        }
        if (delta === null) delta = 0;
        if (store0) {
            this.state.v0 = v;
            this.state.w0 = Math.abs(delta);
            this.state.delta0 = delta;
        } else {
            this.state.v1 = v;
            this.state.w1 = Math.abs(delta);
            this.state.delta1 = delta;
        }
    },
    attemptSelect: function(swapped) {
        if (this.state.v1 + this.state.v0 === this.state.target) {
            if (this.state.w2 === null || this.state.w1 + this.state.w0 < this.state.w2) {
                this.state.w2 = this.state.w1 + this.state.w0;
                if (!swapped) {
                    this.state.t_dx = this.state.delta1;
                    this.state.t_dy = this.state.delta0;
                } else {
                    this.state.t_dx = this.state.delta0;
                    this.state.t_dy = this.state.delta1;
                }
            }
        }
    },
    load0: function() {
        let n = this.state.count;
        for(let i = 0; i < n; i++){
            this.state.v1x[i] = this.state.v0x[i];
            this.state.v1y[i] = this.state.v0y[i];
        }
    },
    save1: function() {
        let n = this.state.count;
        for(let i = 0; i < n; i++){
            this.state.v2x[i] = this.state.v1x[i];
            this.state.v2y[i] = this.state.v1y[i];
        }
    },
    load1: function() {
        let n = this.state.count;
        for(let i = 0; i < n; i++){
            this.state.v1x[i] = this.state.v2x[i];
            this.state.v1y[i] = this.state.v2y[i];
        }
    },
    resolveXpos: function(single = false) {
        this.calc(single, 1, this.state.x, this.state.v0x, this.state.v1x, this.state.v1y);
        if (single) return true;
        this.save1();
        if (this.resolveYpos(true)) this.attemptSelect(false);
        this.load1();
        if (this.resolveYneg(true)) this.attemptSelect(false);
        this.load0();
    },
    resolveXneg: function(single = false) {
        this.calc(single, -1, this.state.x, this.state.v0x, this.state.v1x, this.state.v1y);
        if (single) return true;
        this.save1();
        if (this.resolveYpos(true)) this.attemptSelect(false);
        this.load1();
        if (this.resolveYneg(true)) this.attemptSelect(false);
        this.load0();
    },
    resolveYpos: function(single = false) {
        this.calc(single, 1, this.state.y, this.state.v0y, this.state.v1y, this.state.v1x);
        if (single) return true;
        this.save1();
        if (this.resolveXpos(true)) this.attemptSelect(true);
        this.load1();
        if (this.resolveXneg(true)) this.attemptSelect(true);
        this.load0();
    },
    resolveYneg: function(single = false) {
        this.calc(single, -1, this.state.y, this.state.v0y, this.state.v1y, this.state.v1x);
        if (single) return true;
        this.save1();
        if (this.resolveXpos(true)) this.attemptSelect(true);
        this.load1();
        if (this.resolveXneg(true)) this.attemptSelect(true);
        this.load0();
    },
    /**
	 * 	Completes the translation on the current group.
	 */ commit: function() {
        if (!this.state.group.alive()) return;
        this.state.group.translate(this.state.dx, this.state.dy);
        this.state.group.clearFlags($0627407290d788ba$var$collider.FLAG_EXCLUDE);
    },
    /**
	 * 	Attempts to move the specified group by the given deltas. Any collisions detected on the mask will trigger the respective actions.
	 * 	@param mask - Mask element.
	 * 	@param dx - X delta value.
	 * 	@param dy - Y delta value.
	 * 	!static translate (mask: Mask, dx: number, dy: number) : void;
	 */ /**
	 * 	Attempts to move the specified group by the given deltas. Any collisions detected on the mask will trigger the respective actions.
	 * 	@param mask - Mask element.
	 * 	@param group - Group where the mask is stored.
	 * 	@param dx - X delta value.
	 * 	@param dy - Y delta value.
	 * 	!static translate (mask: Mask, group: Group, dx: number, dy: number) : void;
	 */ translate: function(mask, group = null, dx = 0, dy = 0) {
        if (typeof group === 'number') {
            dy = dx;
            dx = group;
            group = null;
        }
        if (!mask) return;
        if (!group) group = mask.group;
        if (!group.alive() || !mask.alive()) return;
        this.state.mask = mask;
        this.state.group = group;
        this.state.dx = downscalef(upscale(dx));
        this.state.dy = downscalef(upscale(dy));
        if (!this.maskLayer || !mask.visible()) return this.commit();
        let truncationRules = this.truncationRules[mask.type];
        if (!truncationRules) {
            truncationRules = this.truncationRules[mask.type & $0627407290d788ba$var$SUPER_TYPE_MASK];
            if (!truncationRules) {
                this.commit();
                return this.scan(mask, group);
            }
        }
        this.state.offs = group.getOffsets(this.state.dx, this.state.dy);
        this.state.bounds.set(mask.bounds).translate(this.state.offs.x + this.state.dx, this.state.offs.y + this.state.dy);
        group.setFlags($0627407290d788ba$var$collider.FLAG_EXCLUDE);
        let collisionItems = this.maskLayer.selectInRegion(this.state.bounds, this.flagsAnd, this.flagsValue);
        if (collisionItems.length === 0) {
            collisionItems.free();
            return this.commit();
        }
        let n = 0;
        let v = 0;
        while(true){
            let item = collisionItems.shift();
            if (item === null) break;
            let allowsTruncation = truncationRules[item.type];
            if (!allowsTruncation) {
                allowsTruncation = truncationRules[item.type & $0627407290d788ba$var$SUPER_TYPE_MASK];
                if (!allowsTruncation) continue;
            }
            if (allowsTruncation.callback === false || allowsTruncation.callback !== null && allowsTruncation.callback !== true && !allowsTruncation.callback(mask, item, allowsTruncation.context)) continue;
            let width = Math.min(this.state.bounds.x2, item.bounds.x2) - Math.max(this.state.bounds.x1, item.bounds.x1);
            let height = Math.min(this.state.bounds.y2, item.bounds.y2) - Math.max(this.state.bounds.y1, item.bounds.y1);
            this.state.v0x[n] = 0;
            this.state.v0y[n] = 0;
            if (Math.min(this.state.bounds.width(), item.bounds.width()) != width) {
                this.state.x[n] = absmin(this.state.bounds.x2 - item.bounds.x1, this.state.bounds.x1 - item.bounds.x2);
                this.state.v0x[n] = 1;
            }
            if (Math.min(this.state.bounds.height(), item.bounds.height()) != height) {
                this.state.y[n] = absmin(this.state.bounds.y2 - item.bounds.y1, this.state.bounds.y1 - item.bounds.y2);
                this.state.v0y[n] = 1;
            }
            let sv = this.state.v0x[n] + this.state.v0y[n];
            v += sv;
            if (sv > 1) {
                this.state.v0x[n] = sv;
                this.state.v0y[n] = sv;
            }
            this.state.v1x[n] = this.state.v0x[n];
            this.state.v1y[n] = this.state.v0y[n];
            n++;
        }
        collisionItems.free();
        if (v == 0) {
            this.commit();
            return this.scan(mask, group);
        }
        this.state.target = v;
        this.state.count = n;
        this.state.w2 = null;
        this.resolveXpos();
        this.resolveXneg();
        this.resolveYpos();
        this.resolveYneg();
        if (this.state.w2 !== null) {
            let contactRules = this.contactRules[mask.type];
            if (!contactRules) contactRules = this.contactRules[mask.type & $0627407290d788ba$var$SUPER_TYPE_MASK];
            if (contactRules) {
                this.state.bounds.set(mask.bounds).translate(this.state.offs.x + this.state.dx - this.state.t_dx * 0.5, this.state.offs.y + this.state.dy - this.state.t_dy * 0.5);
                collisionItems = this.maskLayer.selectInRegion(this.state.bounds, this.flagsAnd, this.flagsValue);
                while(mask.alive()){
                    let item = collisionItems.shift();
                    if (item === null) break;
                    if (!item.alive()) continue;
                    let contact = contactRules[item.type];
                    if (!contact) {
                        contact = contactRules[item.type & $0627407290d788ba$var$SUPER_TYPE_MASK];
                        if (!contact) continue;
                    }
                    contact.callback(mask, item, contact.context);
                }
                collisionItems.free();
            }
            this.state.dx -= this.state.t_dx;
            this.state.dy -= this.state.t_dy;
        }
        this.commit();
    },
    /**
	 *	Scans for collisions against the specified mask.
	 * 	@param mask - Mask element.
	 * 	!static scan (mask: Mask) : void;
	 */ /**
	 *	Scans for collisions against the specified mask.
	 * 	@param mask - Mask element.
	 * 	@param group - Group where the mask is stored.
	 * 	!static scan (mask: Mask, group: Group) : void;
	 */ scan: function(mask, group = null) {
        if (!group) group = mask.group;
        if (!group || !group.alive() || !mask.alive()) return;
        this.state.mask = mask;
        this.state.group = group;
        if (!this.maskLayer || !mask.visible()) return;
        let contactRules = this.contactRules[mask.type];
        if (!contactRules) contactRules = this.contactRules[mask.type & $0627407290d788ba$var$SUPER_TYPE_MASK];
        if (!contactRules) return;
        group.setFlags($0627407290d788ba$var$collider.FLAG_EXCLUDE);
        let collisionItems = this.maskLayer.selectInRegion(mask.bounds, this.flagsAnd, this.flagsValue);
        group.clearFlags($0627407290d788ba$var$collider.FLAG_EXCLUDE);
        while(mask.alive()){
            let item = collisionItems.shift();
            if (item === null) break;
            if (!item.alive()) continue;
            let contact = contactRules[item.type];
            if (!contact) {
                contact = contactRules[item.type & $0627407290d788ba$var$SUPER_TYPE_MASK];
                if (!contact) continue;
            }
            contact.callback(mask, item, contact.context);
        }
        collisionItems.free();
    }
};
/**
 * 	Contact flag bits.
 */ //!/class
//!namespace collider
//!enum Contact
$0627407290d788ba$var$collider.Contact = {
    //!LEFT
    LEFT: 1,
    //!RIGHT
    RIGHT: 2,
    //!HORIZONTAL
    HORIZONTAL: 3,
    //!TOP
    TOP: 4,
    //!BOTTOM
    BOTTOM: 8,
    //!VERTICAL
    VERTICAL: 12
};
var //!/enum
//!/namespace
$0627407290d788ba$export$2e2bcd8739ae039 = $0627407290d788ba$var$collider;


const $2130f57e49561321$export$773cc7fa6f8304c3 = $ec90764150f3694e$export$2e2bcd8739ae039;
const $2130f57e49561321$export$f965ae91e38a1274 = $fa8537e16ab1f06a$export$2e2bcd8739ae039;
const $2130f57e49561321$export$43caf9889c228507 = $b3cd4fa82fedc426$export$2e2bcd8739ae039;
const $2130f57e49561321$export$a79e2b3ea5d10ee0 = $6824d8eb87dd654f$export$2e2bcd8739ae039;
const $2130f57e49561321$export$b7e3ae3d7c15e42e = $86072fb964c02d68$export$2e2bcd8739ae039;
const $2130f57e49561321$export$5fa227701309b621 = $0627407290d788ba$export$2e2bcd8739ae039; //!/namespace


const $b3f6a35f5870a960$export$4c85e640eb41c31b = $hNLgQ.Class;
const $b3f6a35f5870a960$export$19342e026b58ebb7 = $hNLgQ.Schema;
const $b3f6a35f5870a960$export$14416b8d99d47caa = $hNLgQ.Template;
const $b3f6a35f5870a960$export$816be348776d53c1 = $fdb3e373096c6ca3$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$7c09191825db112d = $0e3762fc4cbc2c8f$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$c1b1a45ed915aad9 = $0bab618843c5cc55$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$e1dae5660003ffa7 = $c5f44d8482fd28c9$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$c57e9b2d8b9e4de = $f1d765b3e2b341ba$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$a92776769f460054 = $70dacaf824eda432$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$e9e0d96f49f57c33 = $315d91d8694d77f0$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$8d01c972ee8b14a9 = $f7388fefeedc4aac$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$7c4f444dab5ed59 = $fd8633c77128ce2f$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$ce30dbb46644d06c = $d0de706be9d545de$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$462bb059fed9d9e5 = $9a9389f93d34564b$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$cb01d642ebc0a347 = $427f4d3ec70ccf6e$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$eff95f126aa67cfb = $c046478fd7ecfb31$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$573ab5fe783d8aac = $f6d10e9657762025$exports;
const $b3f6a35f5870a960$export$e9a269813a6315a4 = $0150c0894dfca188$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$85990f0f98a390bb = $3172a43632fd2a5e$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$fe264c04f294fd15 = $1fea8365818f3b22$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$1034c64782e66715 = $33942535e15f5720$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$54c2e3dc7acea9f5 = $f6bd4ab8b6c953de$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$8fbd1ac8e83536df = $6cb3980136ee15d8$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$a428cd33b25d5283 = $628f585857a65401$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$5b12bf1653c0dd85 = $0bee0760636b614a$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$c79fc6492f3af13d = $a894a9381ffd6f0a$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$ac4bca90992eed1 = $43205fbc94829382$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$c9b44e90c5031de0 = $414af195437ed39f$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$3dc3622b48e72adc = $6c1a77cc22998ccc$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$79f93ddd76e66d40 = $ba17a79a5d342faa$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$cea96571ebbff9dd = $29c330dfef39fb24$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$deefd61317ad2797 = $58ff74473450dfff$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$5a2130c936f86fb8 = $8dbe83b0cc8b3c36$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$cfb3877ce19bb838 = $9e0453cff9bc3880$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$ef2184bd89960b14 = $e7931fc5aea618d9$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$38af1803e3442a7f = $1e3a2ce488585bd2$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$d5c6c08dc2d3ca7 = $f3e0869e47faa7b4$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$3386beb5bc3bfa = $f90accd4e9a34560$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$42a852a2b6b56249 = $56aaa5487c41abd4$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$eeaa45a7d92663a6 = $b5f569186864ae7e$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$cc55614734af2d87 = $6f74f6f50e98e7ac$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$eb2fcfdbd7ba97d4 = $db57198fb17fd645$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$f35845279390eafd = $f2a87ce0e4ca782b$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$db77ccec0bb4ccac = $09f047381ad3e737$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$991dcf7284de63d = $99fbe93690d879a1$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$b04be29aa201d4f5 = $e7f26224e1e585fc$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$474b8119f9aaf6a9 = $66e20ed84322251f$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$63d5558963a08ef6 = $d1380cb64b9fa053$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$f9b7ad1c9b000a93 = $878e437585fe2934$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$353f5b6fc5456de1 = $13eb70d37a7efcb1$export$2e2bcd8739ae039;
const $b3f6a35f5870a960$export$85a6520672683043 = $f79394a78c5df7c6$export$2e2bcd8739ae039;
var $b3f6a35f5870a960$export$2e2bcd8739ae039 //!export default fxl;
 = $2130f57e49561321$exports;


export {$b3f6a35f5870a960$export$4c85e640eb41c31b as Class, $b3f6a35f5870a960$export$19342e026b58ebb7 as Schema, $b3f6a35f5870a960$export$14416b8d99d47caa as Template, $b3f6a35f5870a960$export$816be348776d53c1 as globals, $b3f6a35f5870a960$export$7c09191825db112d as glx, $b3f6a35f5870a960$export$c1b1a45ed915aad9 as glsl, $b3f6a35f5870a960$export$e1dae5660003ffa7 as System, $b3f6a35f5870a960$export$c57e9b2d8b9e4de as Timer, $b3f6a35f5870a960$export$a92776769f460054 as Random, $b3f6a35f5870a960$export$e9e0d96f49f57c33 as KeyCode, $b3f6a35f5870a960$export$8d01c972ee8b14a9 as Canvas, $b3f6a35f5870a960$export$7c4f444dab5ed59 as Perf, $b3f6a35f5870a960$export$ce30dbb46644d06c as Log, $b3f6a35f5870a960$export$462bb059fed9d9e5 as Shader, $b3f6a35f5870a960$export$cb01d642ebc0a347 as ShaderProgram, $b3f6a35f5870a960$export$eff95f126aa67cfb as Framebuffer, $b3f6a35f5870a960$export$573ab5fe783d8aac as Wrappers, $b3f6a35f5870a960$export$e9a269813a6315a4 as Resources, $b3f6a35f5870a960$export$85990f0f98a390bb as Sound, $b3f6a35f5870a960$export$fe264c04f294fd15 as Recycler, $b3f6a35f5870a960$export$1034c64782e66715 as Linkable, $b3f6a35f5870a960$export$54c2e3dc7acea9f5 as List, $b3f6a35f5870a960$export$8fbd1ac8e83536df as PriorityQueue, $b3f6a35f5870a960$export$a428cd33b25d5283 as Handler, $b3f6a35f5870a960$export$5b12bf1653c0dd85 as Matrix, $b3f6a35f5870a960$export$c79fc6492f3af13d as Rect, $b3f6a35f5870a960$export$ac4bca90992eed1 as Vec2, $b3f6a35f5870a960$export$c9b44e90c5031de0 as TFunction, $b3f6a35f5870a960$export$3dc3622b48e72adc as Bounds2, $b3f6a35f5870a960$export$79f93ddd76e66d40 as Point2, $b3f6a35f5870a960$export$cea96571ebbff9dd as Easing, $b3f6a35f5870a960$export$deefd61317ad2797 as Anim, $b3f6a35f5870a960$export$5a2130c936f86fb8 as Boot, $b3f6a35f5870a960$export$cfb3877ce19bb838 as GridElement, $b3f6a35f5870a960$export$ef2184bd89960b14 as Grid, $b3f6a35f5870a960$export$38af1803e3442a7f as Scene, $b3f6a35f5870a960$export$d5c6c08dc2d3ca7 as Viewport, $b3f6a35f5870a960$export$3386beb5bc3bfa as Updater, $b3f6a35f5870a960$export$42a852a2b6b56249 as Container, $b3f6a35f5870a960$export$eeaa45a7d92663a6 as SimpleContainer, $b3f6a35f5870a960$export$cc55614734af2d87 as GridContainer, $b3f6a35f5870a960$export$eb2fcfdbd7ba97d4 as Group, $b3f6a35f5870a960$export$f35845279390eafd as Drawable, $b3f6a35f5870a960$export$db77ccec0bb4ccac as Element, $b3f6a35f5870a960$export$991dcf7284de63d as Mask, $b3f6a35f5870a960$export$b04be29aa201d4f5 as Label, $b3f6a35f5870a960$export$474b8119f9aaf6a9 as KeyboardHandler, $b3f6a35f5870a960$export$63d5558963a08ef6 as PointerHandler, $b3f6a35f5870a960$export$f9b7ad1c9b000a93 as ScreenControls, $b3f6a35f5870a960$export$353f5b6fc5456de1 as Button, $b3f6a35f5870a960$export$85a6520672683043 as Stick, $b3f6a35f5870a960$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=froxel.js.map
