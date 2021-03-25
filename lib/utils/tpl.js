"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evalJS = exports.setCustomEvalJs = exports.filter = exports.registerTplEnginer = void 0;
var tslib_1 = require("tslib");
var tpl_builtin_1 = require("./tpl-builtin");
var tpl_lodash_1 = require("./tpl-lodash");
var enginers = {};
function registerTplEnginer(name, enginer) {
    enginers[name] = enginer;
}
exports.registerTplEnginer = registerTplEnginer;
function filter(tpl, data) {
    if (data === void 0) { data = {}; }
    var rest = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        rest[_i - 2] = arguments[_i];
    }
    if (!tpl || typeof tpl !== 'string') {
        return '';
    }
    var keys = Object.keys(enginers);
    for (var i = 0, len = keys.length; i < len; i++) {
        var enginer = enginers[keys[i]];
        if (enginer.test(tpl)) {
            return enginer.compile.apply(enginer, tslib_1.__spreadArrays([tpl, data], rest));
        }
    }
    return tpl;
}
exports.filter = filter;
var customEvalJsFn;
function setCustomEvalJs(fn) {
    customEvalJsFn = fn;
}
exports.setCustomEvalJs = setCustomEvalJs;
// 这个主要用在 formula 里面，用来动态的改变某个值。也很粗暴，建议自己实现。
// 如果想自己实现，请通过 setCustomEvalJs 来替换。
function evalJS(js, data) {
    if (typeof customEvalJsFn === 'function') {
        return customEvalJsFn(js, data);
    }
    /* jshint evil:true */
    try {
        var fn = new Function('data', 'utils', "with(data) {" + (/^\s*return\b/.test(js) ? '' : 'return ') + js + ";}");
        data = data || {};
        return fn.call(data, data, tpl_builtin_1.getFilters());
    }
    catch (e) {
        console.warn(js, e);
        return null;
    }
}
exports.evalJS = evalJS;
[tpl_builtin_1.register, tpl_lodash_1.register].forEach(function (fn) {
    var info = fn();
    registerTplEnginer(info.name, {
        test: info.test,
        compile: info.compile
    });
});
//# sourceMappingURL=./utils/tpl.js.map
