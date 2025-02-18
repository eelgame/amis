"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearApiCache = exports.setApiCache = exports.getApiCache = exports.isSameApi = exports.isEffectiveApi = exports.isValidApi = exports.isApiOutdated = exports.wrapAdaptor = exports.wrapFetcher = exports.responseAdaptor = exports.buildApi = exports.normalizeApi = void 0;
var tslib_1 = require("tslib");
var tpl_builtin_1 = require("./tpl-builtin");
var qs_1 = tslib_1.__importDefault(require("qs"));
var tpl_1 = require("./tpl");
var helper_1 = require("./helper");
var rSchema = /(?:^|raw\:)(get|post|put|delete|patch|options|head):/i;
var apiCaches = [];
function normalizeApi(api, defaultMethod) {
    if (typeof api === 'string') {
        var method = rSchema.test(api) ? RegExp.$1 : '';
        method && (api = api.replace(method + ':', ''));
        api = {
            method: (method || defaultMethod),
            url: api
        };
    }
    else {
        api = tslib_1.__assign({}, api);
    }
    return api;
}
exports.normalizeApi = normalizeApi;
function buildApi(api, data, options) {
    if (options === void 0) { options = {}; }
    api = normalizeApi(api, options.method);
    var autoAppend = options.autoAppend, ignoreData = options.ignoreData, rest = tslib_1.__rest(options, ["autoAppend", "ignoreData"]);
    api.config = tslib_1.__assign({}, rest);
    api.method = (api.method || options.method || 'get').toLowerCase();
    if (!data) {
        return api;
    }
    else if (data instanceof FormData ||
        data instanceof Blob ||
        data instanceof ArrayBuffer) {
        api.data = data;
        return api;
    }
    var raw = (api.url = api.url || '');
    var idx = api.url.indexOf('?');
    if (~idx) {
        var hashIdx = api.url.indexOf('#');
        var params = qs_1.default.parse(api.url.substring(idx + 1, ~hashIdx ? hashIdx : undefined));
        api.url =
            tpl_builtin_1.tokenize(api.url.substring(0, idx + 1), data, '| url_encode') +
                helper_1.qsstringify((api.query = tpl_builtin_1.dataMapping(params, data))) +
                (~hashIdx ? api.url.substring(hashIdx) : '');
    }
    else {
        api.url = tpl_builtin_1.tokenize(api.url, data, '| url_encode');
    }
    if (ignoreData) {
        return api;
    }
    if (api.data) {
        api.body = api.data = tpl_builtin_1.dataMapping(api.data, data);
    }
    else if (api.method === 'post' || api.method === 'put') {
        api.body = api.data = helper_1.cloneObject(data);
    }
    // get 类请求，把 data 附带到 url 上。
    if (api.method === 'get') {
        if (!~raw.indexOf('$') && !api.data && autoAppend) {
            api.query = api.data = data;
        }
        else if (api.attachDataToQuery === false &&
            api.data &&
            !~raw.indexOf('$') &&
            autoAppend) {
            var idx_1 = api.url.indexOf('?');
            if (~idx_1) {
                var params = (api.query = tslib_1.__assign(tslib_1.__assign({}, qs_1.default.parse(api.url.substring(idx_1 + 1))), data));
                api.url = api.url.substring(0, idx_1) + '?' + helper_1.qsstringify(params);
            }
            else {
                api.query = data;
                api.url += '?' + helper_1.qsstringify(data);
            }
        }
        if (api.data && api.attachDataToQuery !== false) {
            var idx_2 = api.url.indexOf('?');
            if (~idx_2) {
                var params = (api.query = tslib_1.__assign(tslib_1.__assign({}, qs_1.default.parse(api.url.substring(idx_2 + 1))), api.data));
                api.url = api.url.substring(0, idx_2) + '?' + helper_1.qsstringify(params);
            }
            else {
                api.query = api.data;
                api.url += '?' + helper_1.qsstringify(api.data);
            }
            delete api.data;
        }
    }
    if (api.headers) {
        api.headers = tpl_builtin_1.dataMapping(api.headers, data);
    }
    if (api.requestAdaptor && typeof api.requestAdaptor === 'string') {
        api.requestAdaptor = str2function(api.requestAdaptor, 'api');
    }
    if (api.adaptor && typeof api.adaptor === 'string') {
        api.adaptor = str2function(api.adaptor, 'payload', 'response', 'api');
    }
    return api;
}
exports.buildApi = buildApi;
function str2function(contents) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    try {
        var fn = new (Function.bind.apply(Function, tslib_1.__spreadArrays([void 0], args, [contents])))();
        return fn;
    }
    catch (e) {
        console.warn(e);
        return null;
    }
}
function responseAdaptor(ret, api) {
    var data = ret.data;
    var hasStatusField = true;
    if (!data) {
        throw new Error('Response is empty!');
    }
    else if (!data.hasOwnProperty('status')) {
        hasStatusField = false;
    }
    var payload = {
        ok: hasStatusField === false || data.status == 0,
        status: hasStatusField === false ? 0 : data.status,
        msg: data.msg,
        msgTimeout: data.msgTimeout,
        data: !data.data && !hasStatusField ? data : data.data // 兼容直接返回数据的情况
    };
    if (payload.status == 422) {
        payload.errors = data.errors;
    }
    if (payload.ok && api.responseData) {
        payload.data = tpl_builtin_1.dataMapping(api.responseData, helper_1.createObject({ api: api }, (Array.isArray(payload.data)
            ? {
                items: payload.data
            }
            : payload.data) || {}));
    }
    return payload;
}
exports.responseAdaptor = responseAdaptor;
function wrapFetcher(fn) {
    return function (api, data, options) {
        api = buildApi(api, data, options);
        api.requestAdaptor && (api = api.requestAdaptor(api) || api);
        if (api.data && (helper_1.hasFile(api.data) || api.dataType === 'form-data')) {
            api.data = helper_1.object2formData(api.data, api.qsOptions);
        }
        else if (api.data &&
            typeof api.data !== 'string' &&
            api.dataType === 'form') {
            api.data = helper_1.qsstringify(api.data, api.qsOptions);
            api.headers = api.headers || (api.headers = {});
            api.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }
        else if (api.data &&
            typeof api.data !== 'string' &&
            api.dataType === 'json') {
            api.data = JSON.stringify(api.data);
            api.headers = api.headers || (api.headers = {});
            api.headers['Content-Type'] = 'application/json';
        }
        if (typeof api.cache === 'number' && api.cache > 0) {
            var apiCache = getApiCache(api);
            return wrapAdaptor(apiCache
                ? apiCache.cachedPromise
                : setApiCache(api, fn(api)), api);
        }
        return wrapAdaptor(fn(api), api);
    };
}
exports.wrapFetcher = wrapFetcher;
function wrapAdaptor(promise, api) {
    var _this = this;
    var adaptor = api.adaptor;
    return adaptor
        ? promise
            .then(function (response) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = adaptor(response.data, response, api);
                        if (!(result === null || result === void 0 ? void 0 : result.then)) return [3 /*break*/, 2];
                        return [4 /*yield*/, result];
                    case 1:
                        result = _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, tslib_1.__assign(tslib_1.__assign({}, response), { data: result })];
                }
            });
        }); })
            .then(function (ret) { return responseAdaptor(ret, api); })
        : promise.then(function (ret) { return responseAdaptor(ret, api); });
}
exports.wrapAdaptor = wrapAdaptor;
function isApiOutdated(prevApi, nextApi, prevData, nextData) {
    var url = (nextApi && nextApi.url) || nextApi;
    if (nextApi && nextApi.autoRefresh === false) {
        return false;
    }
    if (url && typeof url === 'string' && ~url.indexOf('$')) {
        prevApi = buildApi(prevApi, prevData, { ignoreData: true });
        nextApi = buildApi(nextApi, nextData, { ignoreData: true });
        return !!(prevApi.url !== nextApi.url &&
            isValidApi(nextApi.url) &&
            (!nextApi.sendOn || tpl_1.evalExpression(nextApi.sendOn, nextData)));
    }
    return false;
}
exports.isApiOutdated = isApiOutdated;
function isValidApi(api) {
    return (api &&
        /^(?:(https?|wss?|taf):\/\/[^\/]+)?(\/?[^\s\/\?]*){1,}(\?.*)?$/.test(api));
}
exports.isValidApi = isValidApi;
function isEffectiveApi(api, data, initFetch, initFetchOn) {
    if (!api) {
        return false;
    }
    if (initFetch === false) {
        return false;
    }
    if (initFetchOn && data && !tpl_1.evalExpression(initFetchOn, data)) {
        return false;
    }
    if (typeof api === 'string' && api.length) {
        return true;
    }
    else if (helper_1.isObject(api) && api.url) {
        if (api.sendOn &&
            data &&
            !tpl_1.evalExpression(api.sendOn, data)) {
            return false;
        }
        return true;
    }
    return false;
}
exports.isEffectiveApi = isEffectiveApi;
function isSameApi(apiA, apiB) {
    return (apiA.method === apiB.method &&
        apiA.url === apiB.url &&
        !helper_1.isObjectShallowModified(apiA.data, apiB.data, false));
}
exports.isSameApi = isSameApi;
function getApiCache(api) {
    // 清理过期cache
    var now = Date.now();
    var result;
    for (var idx = 0, len = apiCaches.length; idx < len; idx++) {
        var apiCache = apiCaches[idx];
        if (now - apiCache.requestTime > apiCache.cache) {
            apiCaches.splice(idx, 1);
            len--;
            idx--;
            continue;
        }
        if (isSameApi(api, apiCache)) {
            result = apiCache;
            break;
        }
    }
    return result;
}
exports.getApiCache = getApiCache;
function setApiCache(api, promise) {
    apiCaches.push(tslib_1.__assign(tslib_1.__assign({}, api), { cachedPromise: promise, requestTime: Date.now() }));
    return promise;
}
exports.setApiCache = setApiCache;
function clearApiCache() {
    apiCaches.splice(0, apiCaches.length);
}
exports.clearApiCache = clearApiCache;
// window.apiCaches = apiCaches;
//# sourceMappingURL=./utils/api.js.map
