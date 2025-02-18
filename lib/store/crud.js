"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRUDStore = void 0;
var tslib_1 = require("tslib");
var file_saver_1 = require("file-saver");
var mobx_state_tree_1 = require("mobx-state-tree");
var service_1 = require("./service");
var helper_1 = require("../utils/helper");
var pick_1 = tslib_1.__importDefault(require("lodash/pick"));
var tpl_builtin_1 = require("../utils/tpl-builtin");
var ServerError = /** @class */ (function (_super) {
    tslib_1.__extends(ServerError, _super);
    function ServerError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'ServerError';
        return _this;
    }
    return ServerError;
}(Error));
exports.CRUDStore = service_1.ServiceStore.named('CRUDStore')
    .props({
    pristineQuery: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.frozen(), {}),
    query: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.frozen(), {}),
    prevPage: 1,
    page: 1,
    perPage: 10,
    total: 0,
    mode: 'normal',
    hasNext: false,
    selectedAction: mobx_state_tree_1.types.frozen(),
    items: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(mobx_state_tree_1.types.frozen()), []),
    selectedItems: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(mobx_state_tree_1.types.frozen()), []),
    unSelectedItems: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(mobx_state_tree_1.types.frozen()), []),
    filterTogggable: false,
    filterVisible: true,
    hasInnerModalOpen: false
})
    .views(function (self) { return ({
    get lastPage() {
        return Math.max(Math.ceil(self.total / (self.perPage < 1 ? 10 : self.perPage)), 1);
    },
    get filterData() {
        return helper_1.createObject(self.data, tslib_1.__assign({}, self.query));
    },
    get mergedData() {
        return helper_1.extendObject(self.data, tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, self.query), self.data), { selectedItems: self.selectedItems, unSelectedItems: self.unSelectedItems }));
    },
    get hasModalOpened() {
        return self.dialogOpen || self.drawerOpen || self.hasInnerModalOpen;
    },
    get selectedItemsAsArray() {
        return self.selectedItems.concat();
    }
}); })
    .actions(function (self) {
    var fetchCancel = null;
    function setPristineQuery() {
        self.pristineQuery = self.query;
    }
    function updateQuery(values, updater, pageField, perPageField, replace) {
        if (pageField === void 0) { pageField = 'page'; }
        if (perPageField === void 0) { perPageField = 'perPage'; }
        if (replace === void 0) { replace = false; }
        var originQuery = self.query;
        self.query = replace
            ? tslib_1.__assign({}, values) : tslib_1.__assign(tslib_1.__assign({}, self.query), values);
        if (self.query[pageField || 'page']) {
            self.page = parseInt(self.query[pageField || 'page'], 10);
        }
        if (self.query[perPageField || 'perPage']) {
            self.perPage = parseInt(self.query[perPageField || 'perPage'], 10);
        }
        updater &&
            helper_1.isObjectShallowModified(originQuery, self.query, false) &&
            setTimeout(updater.bind(null, "?" + helper_1.qsstringify(self.query)), 4);
    }
    var fetchInitData = mobx_state_tree_1.flow(function getInitData(api, data, options) {
        var items, dir, data_1, ctx, json, result, total, count, page, hasNext, oItems, oRows, rest, items, rowsData, data_2, dir, e_1, env;
        var _a;
        var _b, _c, _d, _e, _f;
        if (options === void 0) { options = {}; }
        return tslib_1.__generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    _g.trys.push([0, 2, , 3]);
                    if (!options.forceReload && options.loadDataOnce && self.total) {
                        items = options.source
                            ? tpl_builtin_1.resolveVariableAndFilter(options.source, helper_1.createObject(self.mergedData, {
                                items: self.data.itemsRaw,
                                rows: self.data.itemsRaw
                            }), '| raw')
                            : self.items.concat();
                        if (self.query.orderBy) {
                            dir = /desc/i.test(self.query.orderDir) ? -1 : 1;
                            items = helper_1.sortArray(items, self.query.orderBy, dir);
                        }
                        data_1 = tslib_1.__assign(tslib_1.__assign({}, self.data), { total: items.length, items: items.slice((self.page - 1) * self.perPage, self.page * self.perPage) });
                        self.total = parseInt((_b = data_1.total) !== null && _b !== void 0 ? _b : data_1.count, 10) || 0;
                        self.reInitData(data_1);
                        return [2 /*return*/];
                    }
                    if (fetchCancel) {
                        fetchCancel();
                        fetchCancel = null;
                        self.fetching = false;
                    }
                    options.silent || self.markFetching(true);
                    ctx = helper_1.createObject(self.data, tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, self.query), (_a = {}, _a[options.pageField || 'page'] = self.page, _a[options.perPageField || 'perPage'] = self.perPage, _a)), data));
                    // 一次性加载不要发送 perPage 属性
                    if (options.loadDataOnce) {
                        delete ctx[options.perPageField || 'perPage'];
                    }
                    return [4 /*yield*/, mobx_state_tree_1.getEnv(self).fetcher(api, ctx, tslib_1.__assign(tslib_1.__assign({}, options), { cancelExecutor: function (executor) { return (fetchCancel = executor); } }))];
                case 1:
                    json = _g.sent();
                    fetchCancel = null;
                    if (!json.ok) {
                        self.updateMessage((_d = (_c = json.msg) !== null && _c !== void 0 ? _c : options.errorMessage) !== null && _d !== void 0 ? _d : self.__('CRUD.fetchFailed'), true);
                        mobx_state_tree_1.getEnv(self).notify('error', json.msg, json.msgTimeout !== undefined
                            ? {
                                closeButton: true,
                                timeout: json.msgTimeout
                            }
                            : undefined);
                    }
                    else {
                        if (!json.data) {
                            throw new Error(self.__('CRUD.invalidData'));
                        }
                        self.updatedAt = Date.now();
                        result = json.data;
                        if (Array.isArray(result)) {
                            result = {
                                items: result
                            };
                        }
                        total = result.total, count = result.count, page = result.page, hasNext = result.hasNext, oItems = result.items, oRows = result.rows, rest = tslib_1.__rest(result, ["total", "count", "page", "hasNext", "items", "rows"]);
                        items = void 0;
                        if (options.source) {
                            items = tpl_builtin_1.resolveVariableAndFilter(options.source, helper_1.createObject(self.filterData, result), '| raw');
                        }
                        else {
                            items = result.items || result.rows;
                        }
                        if (!Array.isArray(items)) {
                            throw new Error(self.__('CRUD.invalidArray'));
                        }
                        else {
                            // 确保成员是对象。
                            items.map(function (item) {
                                return typeof item === 'string' ? { text: item } : item;
                            });
                        }
                        rowsData = [];
                        if (options.loadDataMode && Array.isArray(self.data.items)) {
                            rowsData = self.data.items.concat(items);
                        }
                        else {
                            // 第一次的时候就是直接加载请求的数据
                            rowsData = items;
                        }
                        data_2 = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, (api.replaceData ? {} : self.pristine)), { items: rowsData, count: count, total: total }), rest);
                        if (options.loadDataOnce) {
                            // 记录原始集合，后续可能基于原始数据做排序查找。
                            data_2.itemsRaw = oItems || oRows;
                            if (self.query.orderBy) {
                                dir = /desc/i.test(self.query.orderDir) ? -1 : 1;
                                rowsData = helper_1.sortArray(rowsData, self.query.orderBy, dir);
                            }
                            data_2.items = rowsData.slice((self.page - 1) * self.perPage, self.page * self.perPage);
                            data_2.count = data_2.total = rowsData.length;
                        }
                        self.items.replace(rowsData);
                        self.reInitData(data_2, !!api.replaceData);
                        options.syncResponse2Query !== false &&
                            updateQuery(pick_1.default(rest, Object.keys(self.query)), undefined, options.pageField || 'page', options.perPageField || 'perPage');
                        self.total = parseInt((_e = data_2.total) !== null && _e !== void 0 ? _e : data_2.count, 10) || 0;
                        typeof page !== 'undefined' && (self.page = parseInt(page, 10));
                        // 分页情况不清楚，只能知道有没有下一页。
                        if (typeof hasNext !== 'undefined') {
                            self.mode = 'simple';
                            self.total = 0;
                            self.hasNext = !!hasNext;
                        }
                        self.updateMessage((_f = json.msg) !== null && _f !== void 0 ? _f : options.successMessage);
                        // 配置了获取成功提示后提示，默认是空不会提示。
                        options &&
                            options.successMessage &&
                            mobx_state_tree_1.getEnv(self).notify('success', self.msg);
                    }
                    self.markFetching(false);
                    return [2 /*return*/, json];
                case 2:
                    e_1 = _g.sent();
                    env = mobx_state_tree_1.getEnv(self);
                    if (!mobx_state_tree_1.isAlive(self) || self.disposed) {
                        return [2 /*return*/];
                    }
                    self.markFetching(false);
                    if (env.isCancel(e_1)) {
                        return [2 /*return*/];
                    }
                    console.error(e_1.stack);
                    env.notify('error', e_1.message);
                    return [2 /*return*/];
                case 3: return [2 /*return*/];
            }
        });
    });
    function changePage(page, perPage) {
        self.page = page;
        perPage && (self.perPage = perPage);
    }
    function selectAction(action) {
        self.selectedAction = action;
    }
    var saveRemote = mobx_state_tree_1.flow(function saveRemote(api, data, options) {
        var json, e_2;
        var _a, _b, _c;
        if (options === void 0) { options = {}; }
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 2, , 3]);
                    options = tslib_1.__assign({ method: 'post' }, options);
                    self.markSaving(true);
                    return [4 /*yield*/, mobx_state_tree_1.getEnv(self).fetcher(api, data, options)];
                case 1:
                    json = _d.sent();
                    self.markSaving(false);
                    if (!helper_1.isEmpty(json.data) || json.ok) {
                        self.updateData(json.data, {
                            __saved: Date.now()
                        }, !!api && api.replaceData);
                        self.updatedAt = Date.now();
                    }
                    if (!json.ok) {
                        self.updateMessage((_b = (_a = json.msg) !== null && _a !== void 0 ? _a : options.errorMessage) !== null && _b !== void 0 ? _b : self.__('saveFailed'), true);
                        mobx_state_tree_1.getEnv(self).notify('error', self.msg, json.msgTimeout !== undefined
                            ? {
                                closeButton: true,
                                timeout: json.msgTimeout
                            }
                            : undefined);
                        throw new ServerError(self.msg);
                    }
                    else {
                        self.updateMessage((_c = json.msg) !== null && _c !== void 0 ? _c : options.successMessage);
                        self.msg &&
                            mobx_state_tree_1.getEnv(self).notify('success', self.msg, json.msgTimeout !== undefined
                                ? {
                                    closeButton: true,
                                    timeout: json.msgTimeout
                                }
                                : undefined);
                    }
                    return [2 /*return*/, json.data];
                case 2:
                    e_2 = _d.sent();
                    self.markSaving(false);
                    if (!mobx_state_tree_1.isAlive(self) || self.disposed) {
                        return [2 /*return*/];
                    }
                    e_2.type !== 'ServerError' && mobx_state_tree_1.getEnv(self).notify('error', e_2.message);
                    throw e_2;
                case 3: return [2 /*return*/];
            }
        });
    });
    var setFilterTogglable = function (toggable, filterVisible) {
        self.filterTogggable = toggable;
        filterVisible !== void 0 && (self.filterVisible = filterVisible);
    };
    var setFilterVisible = function (visible) {
        self.filterVisible = visible;
    };
    var setSelectedItems = function (items) {
        self.selectedItems.replace(items);
    };
    var setUnSelectedItems = function (items) {
        self.unSelectedItems.replace(items);
    };
    var setInnerModalOpened = function (value) {
        self.hasInnerModalOpen = value;
    };
    var initFromScope = function (scope, source) {
        var rowsData = tpl_builtin_1.resolveVariableAndFilter(source, scope, '| raw');
        if (!Array.isArray(rowsData)) {
            return;
        }
        var data = tslib_1.__assign(tslib_1.__assign({}, self.pristine), { items: rowsData, count: 0, total: 0 });
        self.items.replace(rowsData);
        self.reInitData(data);
    };
    return {
        setPristineQuery: setPristineQuery,
        updateQuery: updateQuery,
        fetchInitData: fetchInitData,
        changePage: changePage,
        selectAction: selectAction,
        saveRemote: saveRemote,
        setFilterTogglable: setFilterTogglable,
        setFilterVisible: setFilterVisible,
        setSelectedItems: setSelectedItems,
        setUnSelectedItems: setUnSelectedItems,
        setInnerModalOpened: setInnerModalOpened,
        initFromScope: initFromScope,
        exportAsCSV: function (options) {
            if (options === void 0) { options = {}; }
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var items, json;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            items = options.loadDataOnce ? self.data.itemsRaw : self.data.items;
                            if (!(!options.loadDataOnce && options.api)) return [3 /*break*/, 2];
                            return [4 /*yield*/, self.fetchData(options.api, tslib_1.__assign(tslib_1.__assign({}, self.query), { page: undefined, perPage: undefined, op: 'export-csv' }), {
                                    autoAppend: true
                                })];
                        case 1:
                            json = _a.sent();
                            if (json.ok &&
                                (Array.isArray(json.data.items) || Array.isArray(json.data.rows))) {
                                items = json.data.items || json.data.rows;
                            }
                            _a.label = 2;
                        case 2:
                            Promise.resolve().then(function () { return new Promise(function(resolve){require(['papaparse'], function(ret) {resolve(tslib_1.__importStar(ret));})}); }).then(function (papaparse) {
                                var csvText = papaparse.unparse(items);
                                if (csvText) {
                                    var blob = new Blob([csvText], {
                                        type: 'text/plain;charset=utf-8'
                                    });
                                    file_saver_1.saveAs(blob, 'data.csv');
                                }
                            });
                            return [2 /*return*/];
                    }
                });
            });
        }
    };
});
//# sourceMappingURL=./store/crud.js.map
