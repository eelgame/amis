"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRUDRenderer = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var factory_1 = require("../factory");
var crud_1 = require("../store/crud");
var helper_1 = require("../utils/helper");
var Scoped_1 = require("../Scoped");
var Button_1 = tslib_1.__importDefault(require("../components/Button"));
var Select_1 = tslib_1.__importDefault(require("../components/Select"));
var filter_schema_1 = tslib_1.__importDefault(require("../utils/filter-schema"));
var pick_1 = tslib_1.__importDefault(require("lodash/pick"));
var qs_1 = tslib_1.__importDefault(require("qs"));
var react_dom_1 = require("react-dom");
var tpl_1 = require("../utils/tpl");
var helper_2 = require("../utils/helper");
var api_1 = require("../utils/api");
var omit_1 = tslib_1.__importDefault(require("lodash/omit"));
var find_1 = tslib_1.__importDefault(require("lodash/find"));
var findIndex_1 = tslib_1.__importDefault(require("lodash/findIndex"));
var Html_1 = tslib_1.__importDefault(require("../components/Html"));
var components_1 = require("../components");
var icons_1 = require("../components/icons");
var CRUD = /** @class */ (function (_super) {
    tslib_1.__extends(CRUD, _super);
    function CRUD(props) {
        var _this = _super.call(this, props) || this;
        _this.dataInvalid = false;
        _this.controlRef = _this.controlRef.bind(_this);
        _this.handleFilterReset = _this.handleFilterReset.bind(_this);
        _this.handleFilterSubmit = _this.handleFilterSubmit.bind(_this);
        _this.handleFilterInit = _this.handleFilterInit.bind(_this);
        _this.handleAction = _this.handleAction.bind(_this);
        _this.handleBulkAction = _this.handleBulkAction.bind(_this);
        _this.handleChangePage = _this.handleChangePage.bind(_this);
        _this.handleBulkGo = _this.handleBulkGo.bind(_this);
        _this.handleDialogConfirm = _this.handleDialogConfirm.bind(_this);
        _this.handleDialogClose = _this.handleDialogClose.bind(_this);
        _this.handleSave = _this.handleSave.bind(_this);
        _this.handleSaveOrder = _this.handleSaveOrder.bind(_this);
        _this.handleSelect = _this.handleSelect.bind(_this);
        _this.handleChildPopOverOpen = _this.handleChildPopOverOpen.bind(_this);
        _this.handleChildPopOverClose = _this.handleChildPopOverClose.bind(_this);
        _this.search = _this.search.bind(_this);
        _this.silentSearch = _this.silentSearch.bind(_this);
        _this.handleQuery = _this.handleQuery.bind(_this);
        _this.renderHeaderToolbar = _this.renderHeaderToolbar.bind(_this);
        _this.renderFooterToolbar = _this.renderFooterToolbar.bind(_this);
        _this.clearSelection = _this.clearSelection.bind(_this);
        return _this;
    }
    CRUD.prototype.componentWillMount = function () {
        var _a = this.props, location = _a.location, store = _a.store, pageField = _a.pageField, perPageField = _a.perPageField, syncLocation = _a.syncLocation, loadDataOnce = _a.loadDataOnce;
        this.mounted = true;
        if (syncLocation && location && (location.query || location.search)) {
            store.updateQuery(qs_1.default.parse(location.search.substring(1)), undefined, pageField, perPageField);
        }
        else if (syncLocation && !location && window.location.search) {
            store.updateQuery(qs_1.default.parse(window.location.search.substring(1)), undefined, pageField, perPageField);
        }
        this.props.store.setFilterTogglable(!!this.props.filterTogglable, this.props.filterDefaultVisible);
    };
    CRUD.prototype.componentDidMount = function () {
        var store = this.props.store;
        if (this.props.perPage) {
            store.changePage(store.page, this.props.perPage);
        }
        if (!this.props.filter || (store.filterTogggable && !store.filterVisible)) {
            this.handleFilterInit({});
        }
        if (this.props.pickerMode && this.props.value) {
            store.setSelectedItems(this.props.value);
        }
    };
    CRUD.prototype.componentWillReceiveProps = function (nextProps) {
        var props = this.props;
        var store = props.store;
        if (helper_1.anyChanged(['toolbar', 'headerToolbar', 'footerToolbar', 'bulkActions'], props, nextProps)) {
            // 来点参数变化。
            this.renderHeaderToolbar = this.renderHeaderToolbar.bind(this);
            this.renderFooterToolbar = this.renderFooterToolbar.bind(this);
        }
        if (this.props.pickerMode && this.props.value !== nextProps.value) {
            store.setSelectedItems(nextProps.value);
        }
        if (this.props.filterTogglable !== nextProps.filterTogglable) {
            store.setFilterTogglable(!!nextProps.filterTogglable, nextProps.filterDefaultVisible);
        }
        if (props.syncLocation &&
            props.location &&
            props.location.search !== nextProps.location.search) {
            // 同步地址栏，那么直接检测 query 是否变了，变了就重新拉数据
            store.updateQuery(qs_1.default.parse(nextProps.location.search.substring(1)), undefined, nextProps.pageField, nextProps.perPageField);
            this.dataInvalid = helper_1.isObjectShallowModified(store.query, this.lastQuery, false);
        }
        else if (props.api &&
            nextProps.api &&
            api_1.isApiOutdated(props.api, nextProps.api, props.data, nextProps.data)) {
            this.dataInvalid = true;
        }
    };
    CRUD.prototype.componentDidUpdate = function () {
        if (this.dataInvalid) {
            this.dataInvalid = false;
            this.search();
        }
    };
    CRUD.prototype.componentWillUnmount = function () {
        this.mounted = false;
        clearTimeout(this.timer);
    };
    CRUD.prototype.controlRef = function (control) {
        // 因为 control 有可能被 n 层 hoc 包裹。
        while (control && control.getWrappedInstance) {
            control = control.getWrappedInstance();
        }
        this.control = control;
    };
    CRUD.prototype.handleAction = function (e, action, ctx, throwErrors, delegate) {
        var _this = this;
        if (throwErrors === void 0) { throwErrors = false; }
        var _a = this.props, onAction = _a.onAction, store = _a.store, messages = _a.messages, pickerMode = _a.pickerMode, env = _a.env, pageField = _a.pageField, stopAutoRefreshWhenModalIsOpen = _a.stopAutoRefreshWhenModalIsOpen;
        if (action.actionType === 'dialog') {
            store.setCurrentAction(action);
            var idx = ctx.index;
            var length = store.items.length;
            stopAutoRefreshWhenModalIsOpen && clearTimeout(this.timer);
            store.openDialog(ctx, {
                hasNext: idx < length - 1,
                nextIndex: idx + 1,
                hasPrev: idx > 0,
                prevIndex: idx - 1,
                index: idx
            });
        }
        else if (action.actionType === 'ajax') {
            store.setCurrentAction(action);
            var data = ctx;
            // 由于 ajax 一段时间后再弹出，肯定被浏览器给阻止掉的，所以提前弹。
            var redirect = action.redirect && tpl_1.filter(action.redirect, data);
            redirect && action.blank && env.jumpTo(redirect, action);
            return store
                .saveRemote(action.api, data, {
                successMessage: (action.messages && action.messages.success) ||
                    (messages && messages.saveSuccess),
                errorMessage: (action.messages && action.messages.failed) ||
                    (messages && messages.saveFailed)
            })
                .then(function (payload) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var data, redirect;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            data = helper_1.createObject(ctx, payload);
                            if (!(action.feedback && helper_1.isVisible(action.feedback, data))) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.openFeedback(action.feedback, data)];
                        case 1:
                            _a.sent();
                            stopAutoRefreshWhenModalIsOpen && clearTimeout(this.timer);
                            _a.label = 2;
                        case 2:
                            redirect = action.redirect && tpl_1.filter(action.redirect, data);
                            redirect && !action.blank && env.jumpTo(redirect, action);
                            action.reload
                                ? this.reloadTarget(action.reload, data)
                                : redirect
                                    ? null
                                    : this.search(undefined, undefined, true, true);
                            action.close && this.closeTarget(action.close);
                            return [2 /*return*/];
                    }
                });
            }); })
                .catch(function () { });
        }
        else if (pickerMode &&
            (action.actionType === 'confirm' || action.actionType === 'submit')) {
            store.setCurrentAction(action);
            return Promise.resolve({
                items: store.selectedItems.concat()
            });
        }
        else {
            onAction(e, action, ctx, throwErrors, delegate || this.context);
        }
    };
    CRUD.prototype.handleBulkAction = function (selectedItems, unSelectedItems, e, action) {
        var _this = this;
        var _a = this.props, store = _a.store, primaryField = _a.primaryField, onAction = _a.onAction, messages = _a.messages, pageField = _a.pageField, stopAutoRefreshWhenModalIsOpen = _a.stopAutoRefreshWhenModalIsOpen, env = _a.env;
        if (!selectedItems.length && action.requireSelected !== false) {
            return;
        }
        var ids = selectedItems
            .map(function (item) {
            return item.hasOwnProperty(primaryField) ? item[primaryField] : null;
        })
            .filter(function (item) { return item; })
            .join(',');
        var ctx = helper_1.createObject(store.mergedData, tslib_1.__assign(tslib_1.__assign({}, selectedItems[0]), { rows: selectedItems, items: selectedItems, unSelectedItems: unSelectedItems, ids: ids }));
        var fn = function () {
            if (action.actionType === 'dialog') {
                return _this.handleAction(e, tslib_1.__assign(tslib_1.__assign({}, action), { __from: 'bulkAction' }), ctx);
            }
            else if (action.actionType === 'ajax') {
                api_1.isEffectiveApi(action.api, ctx) &&
                    store
                        .saveRemote(action.api, ctx, {
                        successMessage: (action.messages && action.messages.success) ||
                            (messages && messages.saveSuccess),
                        errorMessage: (action.messages && action.messages.failed) ||
                            (messages && messages.saveFailed)
                    })
                        .then(function (payload) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var data, redirect;
                        var _a;
                        return tslib_1.__generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    data = helper_1.createObject(ctx, payload);
                                    if (!(action.feedback && helper_1.isVisible(action.feedback, data))) return [3 /*break*/, 2];
                                    return [4 /*yield*/, this.openFeedback(action.feedback, data)];
                                case 1:
                                    _b.sent();
                                    stopAutoRefreshWhenModalIsOpen && clearTimeout(this.timer);
                                    _b.label = 2;
                                case 2:
                                    action.reload
                                        ? this.reloadTarget(action.reload, data)
                                        : this.search((_a = {}, _a[pageField || 'page'] = 1, _a), undefined, true, true);
                                    action.close && this.closeTarget(action.close);
                                    redirect = action.redirect && tpl_1.filter(action.redirect, data);
                                    redirect && env.jumpTo(redirect, action);
                                    return [2 /*return*/];
                            }
                        });
                    }); })
                        .catch(function () { return null; });
            }
            else if (onAction) {
                onAction(e, action, ctx, false, _this.context);
            }
        };
        if (action.confirmText && env.confirm) {
            env
                .confirm(tpl_1.filter(action.confirmText, ctx))
                .then(function (confirmed) { return confirmed && fn(); });
        }
        else {
            fn();
        }
    };
    CRUD.prototype.handleItemAction = function (action, ctx) {
        this.doAction(action, ctx);
    };
    CRUD.prototype.handleFilterInit = function (values) {
        var _a = this.props, defaultParams = _a.defaultParams, data = _a.data, store = _a.store;
        this.handleFilterSubmit(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, defaultParams), values), store.query), false, true, this.props.initFetch !== false);
        store.setPristineQuery();
        var _b = this.props, pickerMode = _b.pickerMode, options = _b.options;
        pickerMode &&
            store.updateData({
                items: options || []
            });
    };
    CRUD.prototype.handleFilterReset = function (values) {
        var _a = this.props, store = _a.store, syncLocation = _a.syncLocation, env = _a.env, pageField = _a.pageField, perPageField = _a.perPageField;
        store.updateQuery(store.pristineQuery, syncLocation && env && env.updateLocation
            ? function (location) { return env.updateLocation(location); }
            : undefined, pageField, perPageField, true);
        this.lastQuery = store.query;
        this.search();
    };
    CRUD.prototype.handleFilterSubmit = function (values, jumpToFirstPage, replaceLocation, search) {
        var _a;
        if (jumpToFirstPage === void 0) { jumpToFirstPage = true; }
        if (replaceLocation === void 0) { replaceLocation = false; }
        if (search === void 0) { search = true; }
        var _b = this.props, store = _b.store, syncLocation = _b.syncLocation, env = _b.env, pageField = _b.pageField, perPageField = _b.perPageField, loadDataOnceFetchOnFilter = _b.loadDataOnceFetchOnFilter;
        values = syncLocation ? qs_1.default.parse(helper_1.qsstringify(values)) : values;
        store.updateQuery(tslib_1.__assign(tslib_1.__assign({}, values), (_a = {}, _a[pageField || 'page'] = jumpToFirstPage ? 1 : store.page, _a)), syncLocation && env && env.updateLocation
            ? function (location) { return env.updateLocation(location, replaceLocation); }
            : undefined, pageField, perPageField);
        this.lastQuery = store.query;
        search &&
            this.search(undefined, undefined, undefined, loadDataOnceFetchOnFilter);
    };
    CRUD.prototype.handleBulkGo = function (selectedItems, unSelectedItems, e) {
        var _this = this;
        var action = this.props.store.selectedAction;
        var env = this.props.env;
        if (action.confirmText) {
            return env
                .confirm(action.confirmText)
                .then(function (confirmed) {
                return confirmed &&
                    _this.handleBulkAction(selectedItems, unSelectedItems, e, action);
            });
        }
        return this.handleBulkAction(selectedItems, unSelectedItems, e, action);
    };
    CRUD.prototype.handleDialogConfirm = function (values, action, ctx, components) {
        var _a;
        var _b = this.props, store = _b.store, pageField = _b.pageField, stopAutoRefreshWhenModalIsOpen = _b.stopAutoRefreshWhenModalIsOpen, interval = _b.interval, silentPolling = _b.silentPolling, env = _b.env;
        store.closeDialog();
        var dialogAction = store.action;
        if (stopAutoRefreshWhenModalIsOpen && interval) {
            this.timer = setTimeout(silentPolling ? this.silentSearch : this.search, Math.max(interval, 1000));
        }
        if (action.actionType === 'next' &&
            typeof ctx.nextIndex === 'number' &&
            store.data.items[ctx.nextIndex]) {
            return this.handleAction(undefined, tslib_1.__assign({}, dialogAction), helper_1.createObject(helper_1.createObject(store.data, {
                index: ctx.nextIndex
            }), store.data.items[ctx.nextIndex]));
        }
        else if (action.actionType === 'prev' &&
            typeof ctx.prevIndex === 'number' &&
            store.data.items[ctx.prevIndex]) {
            return this.handleAction(undefined, tslib_1.__assign({}, dialogAction), helper_1.createObject(helper_1.createObject(store.data, {
                index: ctx.prevIndex
            }), store.data.items[ctx.prevIndex]));
        }
        else if (values.length) {
            var value = values[0];
            ctx = helper_1.createObject(ctx, value);
            var component = components[0];
            // 提交来自 form
            if (component && component.props.type === 'form') {
                // 数据保存了，说明列表数据已经无效了，重新刷新。
                if (value && value.__saved) {
                    // 配置了 reload 则跳过自动更新。
                    dialogAction.reload ||
                        this.search(dialogAction.__from ? (_a = {}, _a[pageField || 'page'] = 1, _a) : undefined, undefined, true, true);
                }
                else if (value &&
                    ((value.hasOwnProperty('items') && value.items) ||
                        value.hasOwnProperty('ids')) &&
                    this.control.bulkUpdate) {
                    this.control.bulkUpdate(value, value.items);
                }
            }
        }
        if (dialogAction.reload) {
            this.reloadTarget(dialogAction.reload, ctx);
        }
        var redirect = dialogAction.redirect && tpl_1.filter(action.redirect, ctx);
        redirect && env.jumpTo(redirect, dialogAction);
    };
    CRUD.prototype.handleDialogClose = function () {
        var _a = this.props, store = _a.store, stopAutoRefreshWhenModalIsOpen = _a.stopAutoRefreshWhenModalIsOpen, silentPolling = _a.silentPolling, interval = _a.interval;
        store.closeDialog();
        if (stopAutoRefreshWhenModalIsOpen && interval) {
            this.timer = setTimeout(silentPolling ? this.silentSearch : this.search, Math.max(interval, 1000));
        }
    };
    CRUD.prototype.openFeedback = function (dialog, ctx) {
        var _this = this;
        return new Promise(function (resolve) {
            var store = _this.props.store;
            store.setCurrentAction({
                type: 'button',
                actionType: 'dialog',
                dialog: dialog
            });
            store.openDialog(ctx, undefined, function (confirmed) {
                resolve(confirmed);
            });
        });
    };
    CRUD.prototype.search = function (values, silent, clearSelection, forceReload) {
        var _this = this;
        if (forceReload === void 0) { forceReload = false; }
        var _a = this.props, store = _a.store, api = _a.api, messages = _a.messages, pageField = _a.pageField, perPageField = _a.perPageField, interval = _a.interval, stopAutoRefreshWhen = _a.stopAutoRefreshWhen, stopAutoRefreshWhenModalIsOpen = _a.stopAutoRefreshWhenModalIsOpen, silentPolling = _a.silentPolling, syncLocation = _a.syncLocation, syncResponse2Query = _a.syncResponse2Query, keepItemSelectionOnPageChange = _a.keepItemSelectionOnPageChange, pickerMode = _a.pickerMode, env = _a.env, loadDataOnce = _a.loadDataOnce, loadDataOnceFetchOnFilter = _a.loadDataOnceFetchOnFilter, source = _a.source;
        // reload 需要清空用户选择。
        if (keepItemSelectionOnPageChange && clearSelection && !pickerMode) {
            store.setSelectedItems([]);
            store.setUnSelectedItems([]);
        }
        var loadDataMode = '';
        if (values && typeof values.loadDataMode === 'string') {
            loadDataMode = 'load-more';
            delete values.loadDataMode;
        }
        clearTimeout(this.timer);
        values &&
            store.updateQuery(values, !loadDataMode && syncLocation && env && env.updateLocation
                ? env.updateLocation
                : undefined, pageField, perPageField);
        this.lastQuery = store.query;
        var data = helper_1.createObject(store.data, store.query);
        api_1.isEffectiveApi(api, data)
            ? store
                .fetchInitData(api, data, {
                successMessage: messages && messages.fetchSuccess,
                errorMessage: messages && messages.fetchFailed,
                autoAppend: true,
                forceReload: forceReload,
                loadDataOnce: loadDataOnce,
                loadDataOnceFetchOnFilter: loadDataOnceFetchOnFilter,
                source: source,
                silent: silent,
                pageField: pageField,
                perPageField: perPageField,
                loadDataMode: loadDataMode,
                syncResponse2Query: syncResponse2Query
            })
                .then(function (value) {
                interval &&
                    _this.mounted &&
                    (!stopAutoRefreshWhen ||
                        !((stopAutoRefreshWhenModalIsOpen && store.hasModalOpened) ||
                            helper_2.evalExpression(stopAutoRefreshWhen, data))) &&
                    (_this.timer = setTimeout(silentPolling
                        ? _this.silentSearch.bind(_this, undefined, undefined, true)
                        : _this.search.bind(_this, undefined, undefined, undefined, true), Math.max(interval, 1000)));
                return value;
            })
            : source && store.initFromScope(data, source);
    };
    CRUD.prototype.silentSearch = function (values, clearSelection, forceReload) {
        if (forceReload === void 0) { forceReload = false; }
        return this.search(values, true, clearSelection, forceReload);
    };
    CRUD.prototype.handleChangePage = function (page, perPage) {
        var _a;
        var _b;
        var _c = this.props, store = _c.store, syncLocation = _c.syncLocation, env = _c.env, pageField = _c.pageField, perPageField = _c.perPageField, autoJumpToTopOnPagerChange = _c.autoJumpToTopOnPagerChange, affixOffsetTop = _c.affixOffsetTop;
        var query = (_a = {},
            _a[pageField || 'page'] = page,
            _a);
        if (perPage) {
            query[perPageField || 'perPage'] = perPage;
        }
        store.updateQuery(query, syncLocation && (env === null || env === void 0 ? void 0 : env.updateLocation) ? env.updateLocation : undefined, pageField, perPageField);
        this.search(undefined, undefined, undefined);
        if (autoJumpToTopOnPagerChange && this.control) {
            react_dom_1.findDOMNode(this.control).scrollIntoView();
            var scrolledY = window.scrollY;
            var offsetTop = (_b = affixOffsetTop !== null && affixOffsetTop !== void 0 ? affixOffsetTop : env === null || env === void 0 ? void 0 : env.affixOffsetTop) !== null && _b !== void 0 ? _b : 50;
            scrolledY && window.scroll(0, scrolledY - offsetTop);
        }
    };
    CRUD.prototype.handleSave = function (rows, diff, indexes, unModifiedItems, rowsOrigin, resetOnFailed) {
        var _this = this;
        var _a = this.props, store = _a.store, quickSaveApi = _a.quickSaveApi, quickSaveItemApi = _a.quickSaveItemApi, primaryField = _a.primaryField, env = _a.env, messages = _a.messages, reload = _a.reload;
        if (Array.isArray(rows)) {
            if (!api_1.isEffectiveApi(quickSaveApi)) {
                env && env.alert('CRUD quickSaveApi is required');
                return;
            }
            var data_1 = helper_1.createObject(store.data, {
                rows: rows,
                rowsDiff: diff,
                indexes: indexes,
                rowsOrigin: rowsOrigin
            });
            if (rows.length && rows[0].hasOwnProperty(primaryField || 'id')) {
                data_1.ids = rows
                    .map(function (item) { return item[primaryField || 'id']; })
                    .join(',');
            }
            if (unModifiedItems) {
                data_1.unModifiedItems = unModifiedItems;
            }
            store
                .saveRemote(quickSaveApi, data_1, {
                successMessage: messages && messages.saveFailed,
                errorMessage: messages && messages.saveSuccess
            })
                .then(function () {
                reload && _this.reloadTarget(reload, data_1);
                _this.search(undefined, undefined, true, true);
            })
                .catch(function () { });
        }
        else {
            if (!api_1.isEffectiveApi(quickSaveItemApi)) {
                env && env.alert('CRUD quickSaveItemApi is required!');
                return;
            }
            var data_2 = helper_1.createObject(store.data, {
                item: rows,
                modified: diff,
                origin: rowsOrigin
            });
            var sendData = helper_1.createObject(data_2, rows);
            store
                .saveRemote(quickSaveItemApi, sendData)
                .then(function () {
                reload && _this.reloadTarget(reload, data_2);
                _this.search(undefined, undefined, true, true);
            })
                .catch(function () {
                resetOnFailed && _this.control.reset();
            });
        }
    };
    CRUD.prototype.handleSaveOrder = function (moved, rows) {
        var _this = this;
        var _a = this.props, store = _a.store, saveOrderApi = _a.saveOrderApi, orderField = _a.orderField, primaryField = _a.primaryField, env = _a.env, reload = _a.reload;
        if (!saveOrderApi) {
            env && env.alert('CRUD saveOrderApi is required!');
            return;
        }
        var model = helper_1.createObject(store.data);
        var insertAfter;
        var insertBefore;
        var holding = [];
        var hasIdField = primaryField &&
            rows[0] &&
            rows[0].hasOwnProperty(primaryField);
        hasIdField || (model.idMap = {});
        model.insertAfter = {};
        rows.forEach(function (item) {
            if (~moved.indexOf(item)) {
                if (insertAfter) {
                    var insertAfterId = hasIdField
                        ? insertAfter[primaryField]
                        : rows.indexOf(insertAfter);
                    model.insertAfter[insertAfterId] =
                        model.insertAfter[insertAfterId] || [];
                    hasIdField || (model.idMap[insertAfterId] = insertAfter);
                    model.insertAfter[insertAfterId].push(hasIdField ? item[primaryField] : item);
                }
                else {
                    holding.push(item);
                }
            }
            else {
                insertAfter = item;
                insertBefore = insertBefore || item;
            }
        });
        if (insertBefore && holding.length) {
            var insertBeforeId = hasIdField
                ? insertBefore[primaryField]
                : rows.indexOf(insertBefore);
            hasIdField || (model.idMap[insertBeforeId] = insertBefore);
            model.insertBefore = {};
            model.insertBefore[insertBeforeId] = holding.map(function (item) {
                return hasIdField ? item[primaryField] : item;
            });
        }
        else if (holding.length) {
            var first = holding[0];
            var firstId = hasIdField
                ? first[primaryField]
                : rows.indexOf(first);
            hasIdField || (model.idMap[firstId] = first);
            model.insertAfter[firstId] = holding
                .slice(1)
                .map(function (item) { return (hasIdField ? item[primaryField] : item); });
        }
        if (orderField) {
            var start_1 = (store.page - 1) * store.perPage || 0;
            rows = rows.map(function (item, key) {
                var _a;
                return helper_1.extendObject(item, (_a = {},
                    _a[orderField] = start_1 + key + 1,
                    _a));
            });
        }
        model.rows = rows.concat();
        hasIdField &&
            (model.ids = rows
                .map(function (item) { return item[primaryField]; })
                .join(','));
        hasIdField &&
            orderField &&
            (model.order = rows.map(function (item) {
                return pick_1.default(item, [primaryField, orderField]);
            }));
        api_1.isEffectiveApi(saveOrderApi, model) &&
            store
                .saveRemote(saveOrderApi, model)
                .then(function () {
                reload && _this.reloadTarget(reload, model);
                _this.search(undefined, undefined, true, true);
            })
                .catch(function () { });
    };
    CRUD.prototype.handleSelect = function (items, unSelectedItems) {
        var _a = this.props, store = _a.store, keepItemSelectionOnPageChange = _a.keepItemSelectionOnPageChange, primaryField = _a.primaryField, multiple = _a.multiple, pickerMode = _a.pickerMode, onSelect = _a.onSelect;
        var newItems = items;
        var newUnSelectedItems = unSelectedItems;
        if (keepItemSelectionOnPageChange && store.selectedItems.length) {
            var oldItems_1 = store.selectedItems.concat();
            var oldUnselectedItems_1 = store.unSelectedItems.concat();
            items.forEach(function (item) {
                var idx = findIndex_1.default(oldItems_1, function (a) {
                    return a === item ||
                        (a[primaryField || 'id'] &&
                            a[primaryField || 'id'] == item[primaryField || 'id']);
                });
                if (~idx) {
                    oldItems_1[idx] = item;
                }
                else {
                    oldItems_1.push(item);
                }
                var idx2 = findIndex_1.default(oldUnselectedItems_1, function (a) {
                    return a === item ||
                        (a[primaryField || 'id'] &&
                            a[primaryField || 'id'] == item[primaryField || 'id']);
                });
                if (~idx2) {
                    oldUnselectedItems_1.splice(idx2, 1);
                }
            });
            unSelectedItems.forEach(function (item) {
                var idx = findIndex_1.default(oldUnselectedItems_1, function (a) {
                    return a === item ||
                        (a[primaryField || 'id'] &&
                            a[primaryField || 'id'] == item[primaryField || 'id']);
                });
                var idx2 = findIndex_1.default(oldItems_1, function (a) {
                    return a === item ||
                        (a[primaryField || 'id'] &&
                            a[primaryField || 'id'] == item[primaryField || 'id']);
                });
                if (~idx) {
                    oldUnselectedItems_1[idx] = item;
                }
                else {
                    oldUnselectedItems_1.push(item);
                }
                ~idx2 && oldItems_1.splice(idx2, 1);
            });
            newItems = oldItems_1;
            newUnSelectedItems = oldUnselectedItems_1;
            // const thisBatch = items.concat(unSelectedItems);
            // let notInThisBatch = (item: any) =>
            //   !find(
            //     thisBatch,
            //     a => a[primaryField || 'id'] == item[primaryField || 'id']
            //   );
            // newItems = store.selectedItems.filter(notInThisBatch);
            // newUnSelectedItems = store.unSelectedItems.filter(notInThisBatch);
            // newItems.push(...items);
            // newUnSelectedItems.push(...unSelectedItems);
        }
        if (pickerMode && multiple === false && newItems.length > 1) {
            newUnSelectedItems.push.apply(newUnSelectedItems, newItems.splice(0, newItems.length - 1));
        }
        store.setSelectedItems(newItems);
        store.setUnSelectedItems(newUnSelectedItems);
        onSelect && onSelect(newItems);
    };
    CRUD.prototype.handleChildPopOverOpen = function (popOver) {
        if (this.props.interval &&
            popOver &&
            ~['dialog', 'drawer'].indexOf(popOver.mode)) {
            this.props.stopAutoRefreshWhenModalIsOpen && clearTimeout(this.timer);
            this.props.store.setInnerModalOpened(true);
        }
    };
    CRUD.prototype.handleChildPopOverClose = function (popOver) {
        var _a = this.props, stopAutoRefreshWhenModalIsOpen = _a.stopAutoRefreshWhenModalIsOpen, silentPolling = _a.silentPolling, interval = _a.interval;
        if (popOver && ~['dialog', 'drawer'].indexOf(popOver.mode)) {
            this.props.store.setInnerModalOpened(false);
            if (stopAutoRefreshWhenModalIsOpen && interval) {
                this.timer = setTimeout(silentPolling ? this.silentSearch : this.search, Math.max(interval, 1000));
            }
        }
    };
    CRUD.prototype.handleQuery = function (values, forceReload) {
        var _a;
        if (forceReload === void 0) { forceReload = false; }
        var _b = this.props, store = _b.store, syncLocation = _b.syncLocation, env = _b.env, pageField = _b.pageField, perPageField = _b.perPageField;
        store.updateQuery(tslib_1.__assign(tslib_1.__assign({}, values), (_a = {}, _a[pageField || 'page'] = 1, _a)), syncLocation && env && env.updateLocation
            ? env.updateLocation
            : undefined, pageField, perPageField);
        this.search(undefined, undefined, undefined, forceReload);
    };
    CRUD.prototype.reload = function (subpath, query) {
        if (query) {
            return this.receive(query);
        }
        else {
            this.search(undefined, undefined, true, true);
        }
    };
    CRUD.prototype.receive = function (values) {
        this.handleQuery(values, true);
    };
    CRUD.prototype.reloadTarget = function (target, data) {
        // implement this.
    };
    CRUD.prototype.closeTarget = function (target) {
        // implement this.
    };
    CRUD.prototype.doAction = function (action, data, throwErrors) {
        if (throwErrors === void 0) { throwErrors = false; }
        return this.handleAction(undefined, action, data, throwErrors);
    };
    CRUD.prototype.unSelectItem = function (item, index) {
        var store = this.props.store;
        var selected = store.selectedItems.concat();
        var unSelected = store.unSelectedItems.concat();
        var idx = selected.indexOf(item);
        ~idx && unSelected.push.apply(unSelected, selected.splice(idx, 1));
        store.setSelectedItems(selected);
        store.setUnSelectedItems(unSelected);
    };
    CRUD.prototype.clearSelection = function () {
        var store = this.props.store;
        var selected = store.selectedItems.concat();
        var unSelected = store.unSelectedItems.concat();
        store.setSelectedItems([]);
        store.setUnSelectedItems(unSelected.concat(selected));
    };
    CRUD.prototype.hasBulkActionsToolbar = function () {
        var _a = this.props, headerToolbar = _a.headerToolbar, footerToolbar = _a.footerToolbar;
        var isBulkActions = function (item) {
            return ~['bulkActions', 'bulk-actions'].indexOf(item.type || item);
        };
        return ((Array.isArray(headerToolbar) && find_1.default(headerToolbar, isBulkActions)) ||
            (Array.isArray(footerToolbar) && find_1.default(footerToolbar, isBulkActions)));
    };
    CRUD.prototype.hasBulkActions = function () {
        var _a = this.props, bulkActions = _a.bulkActions, itemActions = _a.itemActions, store = _a.store;
        if ((!bulkActions || !bulkActions.length) &&
            (!itemActions || !itemActions.length)) {
            return false;
        }
        var bulkBtns = [];
        var itemBtns = [];
        var ctx = store.mergedData;
        if (bulkActions && bulkActions.length) {
            bulkBtns = bulkActions
                .map(function (item) { return (tslib_1.__assign(tslib_1.__assign({}, item), filter_schema_1.default(item, ctx))); })
                .filter(function (item) { return !item.hidden && item.visible !== false; });
        }
        var itemData = helper_1.createObject(store.data, store.selectedItems.length ? store.selectedItems[0] : {});
        if (itemActions && itemActions.length) {
            itemBtns = itemActions
                .map(function (item) { return (tslib_1.__assign(tslib_1.__assign({}, item), filter_schema_1.default(item, itemData))); })
                .filter(function (item) { return !item.hidden && item.visible !== false; });
        }
        return bulkBtns.length || itemBtns.length;
    };
    CRUD.prototype.renderBulkActions = function (childProps) {
        var _this = this;
        var _a = this.props, bulkActions = _a.bulkActions, itemActions = _a.itemActions, store = _a.store, render = _a.render, cx = _a.classnames;
        var items = childProps.items;
        if (!items.length ||
            ((!bulkActions || !bulkActions.length) &&
                (!itemActions || !itemActions.length))) {
            return null;
        }
        var selectedItems = store.selectedItems;
        var unSelectedItems = store.unSelectedItems;
        var bulkBtns = [];
        var itemBtns = [];
        var ctx = store.mergedData;
        // const ctx = createObject(store.data, {
        //     ...store.query,
        //     items: childProps.items,
        //     selectedItems: childProps.selectedItems,
        //     unSelectedItems: childProps.unSelectedItems
        // });
        if (bulkActions &&
            bulkActions.length &&
            (!itemActions || !itemActions.length || selectedItems.length > 1)) {
            bulkBtns = bulkActions
                .map(function (item) { return (tslib_1.__assign(tslib_1.__assign({}, item), filter_schema_1.default(item, ctx))); })
                .filter(function (item) { return !item.hidden && item.visible !== false; });
        }
        var itemData = helper_1.createObject(store.data, selectedItems.length ? selectedItems[0] : {});
        if (itemActions && selectedItems.length === 1) {
            itemBtns = itemActions
                .map(function (item) { return (tslib_1.__assign(tslib_1.__assign({}, item), filter_schema_1.default(item, itemData))); })
                .filter(function (item) { return !item.hidden && item.visible !== false; });
        }
        return bulkBtns.length || itemBtns.length ? (react_1.default.createElement("div", { className: cx('Crud-actions') },
            bulkBtns.map(function (btn, index) {
                return render("bulk-action/" + index, tslib_1.__assign(tslib_1.__assign({ size: 'sm' }, omit_1.default(btn, ['visibleOn', 'hiddenOn', 'disabledOn'])), { type: 'button', ignoreConfirm: true }), {
                    key: "bulk-" + index,
                    data: ctx,
                    disabled: btn.disabled ||
                        (btn.requireSelected !== false ? !selectedItems.length : false),
                    onAction: _this.handleBulkAction.bind(_this, selectedItems.concat(), unSelectedItems.concat())
                });
            }),
            itemBtns.map(function (btn, index) {
                return render("bulk-action/" + index, tslib_1.__assign(tslib_1.__assign({ size: 'sm' }, omit_1.default(btn, ['visibleOn', 'hiddenOn', 'disabledOn'])), { type: 'button' }), {
                    key: "item-" + index,
                    data: itemData,
                    disabled: btn.disabled,
                    onAction: _this.handleItemAction.bind(_this, btn, itemData)
                });
            }))) : null;
    };
    CRUD.prototype.renderPagination = function (toolbar) {
        var _a = this.props, store = _a.store, render = _a.render, cx = _a.classnames, alwaysShowPagination = _a.alwaysShowPagination;
        var page = store.page, lastPage = store.lastPage;
        if (store.mode !== 'simple' &&
            store.lastPage < 2 &&
            !alwaysShowPagination) {
            return null;
        }
        var extraProps = {};
        if (typeof toolbar !== 'string') {
            extraProps.showPageInput = toolbar.showPageInput;
            extraProps.maxButtons = toolbar.maxButtons;
        }
        return (react_1.default.createElement("div", { className: cx('Crud-pager') }, render('pagination', {
            type: 'pagination'
        }, tslib_1.__assign(tslib_1.__assign({}, extraProps), { activePage: page, lastPage: lastPage, hasNext: store.hasNext, mode: store.mode, onPageChange: this.handleChangePage }))));
    };
    CRUD.prototype.renderStatistics = function () {
        var _a = this.props, store = _a.store, cx = _a.classnames, __ = _a.translate, alwaysShowPagination = _a.alwaysShowPagination;
        if (store.lastPage <= 1 && !alwaysShowPagination) {
            return null;
        }
        return (react_1.default.createElement("div", { className: cx('Crud-statistics') }, __('CRUD.stat', {
            page: store.page,
            lastPage: store.lastPage,
            total: store.total
        })));
    };
    CRUD.prototype.renderSwitchPerPage = function (childProps) {
        var _this = this;
        var _a = this.props, store = _a.store, perPageAvailable = _a.perPageAvailable, cx = _a.classnames, ns = _a.classPrefix, __ = _a.translate;
        var items = childProps.items;
        if (!items.length) {
            return null;
        }
        var perPages = (perPageAvailable || [5, 10, 20, 50, 100]).map(function (item) { return ({
            label: item,
            value: item + ''
        }); });
        return (react_1.default.createElement("div", { className: cx('Crud-pageSwitch') },
            __('CRUD.perPage'),
            react_1.default.createElement(Select_1.default, { classPrefix: ns, searchable: false, placeholder: __('Select.placeholder'), options: perPages, value: store.perPage + '', onChange: function (value) { return _this.handleChangePage(1, value.value); }, clearable: false })));
    };
    CRUD.prototype.renderLoadMore = function () {
        var _this = this;
        var _a = this.props, store = _a.store, ns = _a.classPrefix, cx = _a.classnames, __ = _a.translate;
        var page = store.page, lastPage = store.lastPage;
        return page < lastPage ? (react_1.default.createElement("div", { className: cx('Crud-loadMore') },
            react_1.default.createElement(Button_1.default, { classPrefix: ns, onClick: function () {
                    return _this.search({ page: page + 1, loadDataMode: 'load-more' });
                }, size: "sm" }, __('CRUD.loadMore')))) : ('');
    };
    CRUD.prototype.renderFilterToggler = function () {
        var _a = this.props, store = _a.store, cx = _a.classnames, __ = _a.translate;
        if (!store.filterTogggable) {
            return null;
        }
        return (react_1.default.createElement("button", { onClick: function () { return store.setFilterVisible(!store.filterVisible); }, className: cx('Button Button--sm Button--default', {
                'is-active': store.filterVisible
            }) },
            react_1.default.createElement(icons_1.Icon, { icon: "filter", className: "icon m-r-xs" }),
            __('CRUD.filter')));
    };
    CRUD.prototype.renderExportCSV = function () {
        var _a = this.props, store = _a.store, ns = _a.classPrefix, cx = _a.classnames, __ = _a.translate, loadDataOnce = _a.loadDataOnce, api = _a.api;
        return (react_1.default.createElement(Button_1.default, { classPrefix: ns, onClick: function () {
                return store.exportAsCSV({
                    loadDataOnce: loadDataOnce,
                    api: api
                });
            }, size: "sm" }, __('CRUD.exportCSV')));
    };
    CRUD.prototype.renderToolbar = function (toolbar, index, childProps, toolbarRenderer) {
        var _this = this;
        if (index === void 0) { index = 0; }
        if (childProps === void 0) { childProps = {}; }
        if (!toolbar) {
            return null;
        }
        var type = toolbar.type || toolbar;
        if (type === 'bulkActions' || type === 'bulk-actions') {
            return this.renderBulkActions(childProps);
        }
        else if (type === 'pagination') {
            return this.renderPagination(toolbar);
        }
        else if (type === 'statistics') {
            return this.renderStatistics();
        }
        else if (type === 'switch-per-page') {
            return this.renderSwitchPerPage(childProps);
        }
        else if (type === 'load-more') {
            return this.renderLoadMore();
        }
        else if (type === 'filter-toggler') {
            return this.renderFilterToggler();
        }
        else if (type === 'export-csv') {
            return this.renderExportCSV();
        }
        else if (Array.isArray(toolbar)) {
            var children = toolbar
                .map(function (toolbar, index) { return ({
                dom: _this.renderToolbar(toolbar, index, childProps, toolbarRenderer),
                toolbar: toolbar
            }); })
                .filter(function (item) { return item.dom; });
            var len_1 = children.length;
            var cx_1 = this.props.classnames;
            if (len_1) {
                return (react_1.default.createElement("div", { className: cx_1('Crud-toolbar'), key: index }, children.map(function (_a, index) {
                    var toolbar = _a.toolbar, child = _a.dom;
                    var type = toolbar.type || toolbar;
                    var align = toolbar.align ||
                        (type === 'pagination' || (index === len_1 - 1 && index > 0)
                            ? 'right'
                            : index < len_1 - 1
                                ? 'left'
                                : '');
                    return (react_1.default.createElement("div", { key: index, className: cx_1('Crud-toolbar-item', align ? "Crud-toolbar-item--" + align : '', toolbar.className) }, child));
                })));
            }
            return null;
        }
        var result = toolbarRenderer
            ? toolbarRenderer(toolbar, index)
            : undefined;
        if (result !== void 0) {
            return result;
        }
        var _a = this.props, render = _a.render, store = _a.store;
        var $$editable = childProps.$$editable;
        return render("toolbar/" + index, toolbar, {
            // 包两层，主要是为了处理以下 case
            // 里面放了个 form，form 提交过来的时候不希望把 items 这些发送过来。
            // 因为会把数据呈现在地址栏上。
            data: helper_1.createObject(helper_1.createObject(store.filterData, {
                items: childProps.items,
                selectedItems: childProps.selectedItems,
                unSelectedItems: childProps.unSelectedItems
            }), {}),
            page: store.page,
            lastPage: store.lastPage,
            perPage: store.perPage,
            total: store.total,
            onQuery: this.handleQuery,
            onAction: this.handleAction,
            onChangePage: this.handleChangePage,
            onBulkAction: this.handleBulkAction,
            $$editable: $$editable
        });
    };
    CRUD.prototype.renderHeaderToolbar = function (childProps, toolbarRenderer) {
        var _a = this.props, toolbar = _a.toolbar, toolbarInline = _a.toolbarInline, headerToolbar = _a.headerToolbar;
        if (toolbar) {
            if (Array.isArray(headerToolbar)) {
                headerToolbar = toolbarInline
                    ? headerToolbar.concat(toolbar)
                    : [headerToolbar, toolbar];
            }
            else if (headerToolbar) {
                headerToolbar = [headerToolbar, toolbar];
            }
            else {
                headerToolbar = toolbar;
            }
        }
        return this.renderToolbar(headerToolbar || [], 0, childProps, toolbarRenderer);
    };
    CRUD.prototype.renderFooterToolbar = function (childProps, toolbarRenderer) {
        var _a = this.props, toolbar = _a.toolbar, toolbarInline = _a.toolbarInline, footerToolbar = _a.footerToolbar;
        if (toolbar) {
            if (Array.isArray(footerToolbar)) {
                footerToolbar = toolbarInline
                    ? footerToolbar.concat(toolbar)
                    : [footerToolbar, toolbar];
            }
            else if (footerToolbar) {
                footerToolbar = [footerToolbar, toolbar];
            }
            else {
                footerToolbar = toolbar;
            }
        }
        return this.renderToolbar(footerToolbar, 0, childProps, toolbarRenderer);
    };
    CRUD.prototype.renderSelection = function () {
        var _this = this;
        var _a = this.props, store = _a.store, cx = _a.classnames, labelField = _a.labelField, labelTpl = _a.labelTpl, primaryField = _a.primaryField, __ = _a.translate;
        if (!store.selectedItems.length) {
            return null;
        }
        return (react_1.default.createElement("div", { className: cx('Crud-selection') },
            react_1.default.createElement("div", { className: cx('Crud-selectionLabel') }, __('CRUD.selected')),
            store.selectedItems.map(function (item, index) { return (react_1.default.createElement("div", { key: index, className: cx("Crud-value") },
                react_1.default.createElement("span", { "data-tooltip": __('delete'), "data-position": "bottom", className: cx('Crud-valueIcon'), onClick: _this.unSelectItem.bind(_this, item, index) }, "\u00D7"),
                react_1.default.createElement("span", { className: cx('Crud-valueLabel') }, labelTpl ? (react_1.default.createElement(Html_1.default, { html: tpl_1.filter(labelTpl, item) })) : (helper_1.getVariable(item, labelField || 'label') ||
                    helper_1.getVariable(item, primaryField || 'id'))))); }),
            react_1.default.createElement("a", { onClick: this.clearSelection, className: cx('Crud-selectionClear') }, __('clear'))));
    };
    CRUD.prototype.render = function () {
        var _a = this.props, className = _a.className, bodyClassName = _a.bodyClassName, filter = _a.filter, render = _a.render, store = _a.store, mode = _a.mode, syncLocation = _a.syncLocation, children = _a.children, bulkActions = _a.bulkActions, pickerMode = _a.pickerMode, multiple = _a.multiple, valueField = _a.valueField, primaryField = _a.primaryField, value = _a.value, hideQuickSaveBtn = _a.hideQuickSaveBtn, itemActions = _a.itemActions, cx = _a.classnames, keepItemSelectionOnPageChange = _a.keepItemSelectionOnPageChange, maxKeepItemSelectionLength = _a.maxKeepItemSelectionLength, onAction = _a.onAction, popOverContainer = _a.popOverContainer, __ = _a.translate, onQuery = _a.onQuery, rest = tslib_1.__rest(_a, ["className", "bodyClassName", "filter", "render", "store", "mode", "syncLocation", "children", "bulkActions", "pickerMode", "multiple", "valueField", "primaryField", "value", "hideQuickSaveBtn", "itemActions", "classnames", "keepItemSelectionOnPageChange", "maxKeepItemSelectionLength", "onAction", "popOverContainer", "translate", "onQuery"]);
        return (react_1.default.createElement("div", { className: cx('Crud', className, {
                'is-loading': store.loading
            }) },
            filter && (!store.filterTogggable || store.filterVisible)
                ? render('filter', tslib_1.__assign(tslib_1.__assign({ title: __('CRUD.filter'), mode: 'inline', submitText: __('search') }, filter), { type: 'form', api: null }), {
                    key: 'filter',
                    data: store.filterData,
                    onReset: this.handleFilterReset,
                    onSubmit: this.handleFilterSubmit,
                    onInit: this.handleFilterInit
                })
                : null,
            keepItemSelectionOnPageChange && multiple !== false
                ? this.renderSelection()
                : null,
            render('body', tslib_1.__assign(tslib_1.__assign({}, rest), { type: mode || 'table' }), {
                key: 'body',
                className: cx('Crud-body', bodyClassName),
                ref: this.controlRef,
                selectable: !!((this.hasBulkActionsToolbar() && this.hasBulkActions()) ||
                    pickerMode),
                itemActions: itemActions,
                multiple: multiple === void 0
                    ? bulkActions && bulkActions.length > 0
                        ? true
                        : false
                    : multiple,
                selected: pickerMode || keepItemSelectionOnPageChange
                    ? store.selectedItemsAsArray
                    : undefined,
                keepItemSelectionOnPageChange: keepItemSelectionOnPageChange,
                maxKeepItemSelectionLength: maxKeepItemSelectionLength,
                valueField: valueField || primaryField,
                primaryField: primaryField,
                hideQuickSaveBtn: hideQuickSaveBtn,
                items: store.data.items,
                query: store.query,
                orderBy: store.query.orderBy,
                orderDir: store.query.orderDir,
                popOverContainer: popOverContainer,
                onAction: this.handleAction,
                onSave: this.handleSave,
                onSaveOrder: this.handleSaveOrder,
                onQuery: this.handleQuery,
                onSelect: this.handleSelect,
                onPopOverOpened: this.handleChildPopOverOpen,
                onPopOverClosed: this.handleChildPopOverClose,
                headerToolbarRender: this.renderHeaderToolbar,
                footerToolbarRender: this.renderFooterToolbar,
                data: store.mergedData
            }),
            react_1.default.createElement(components_1.Spinner, { overlay: true, size: "lg", key: "info", show: store.loading }),
            render('dialog', tslib_1.__assign(tslib_1.__assign({}, (store.action &&
                store.action.dialog)), { type: 'dialog' }), {
                key: 'dialog',
                data: store.dialogData,
                onConfirm: this.handleDialogConfirm,
                onClose: this.handleDialogClose,
                show: store.dialogOpen
            })));
    };
    CRUD.propsList = [
        'bulkActions',
        'itemActions',
        'mode',
        'orderField',
        'syncLocation',
        'toolbar',
        'toolbarInline',
        'messages',
        'value',
        'options',
        'multiple',
        'valueField',
        'defaultParams',
        'bodyClassName',
        'perPageAvailable',
        'pageField',
        'perPageField',
        'hideQuickSaveBtn',
        'autoJumpToTopOnPagerChange',
        'interval',
        'silentPolling',
        'stopAutoRefreshWhen',
        'stopAutoRefreshWhenModalIsOpen',
        'api',
        'affixHeader',
        'columnsTogglable',
        'placeholder',
        'tableClassName',
        'headerClassName',
        'footerClassName',
        // 'toolbarClassName',
        'headerToolbar',
        'footerToolbar',
        'filterTogglable',
        'filterDefaultVisible',
        'syncResponse2Query',
        'keepItemSelectionOnPageChange',
        'labelTpl',
        'labelField',
        'loadDataOnce',
        'loadDataOnceFetchOnFilter',
        'source',
        'header',
        'columns',
        'size',
        'onChange',
        'onInit',
        'onSaved',
        'onQuery'
    ];
    CRUD.defaultProps = {
        toolbarInline: true,
        headerToolbar: ['bulkActions', 'pagination'],
        footerToolbar: ['statistics', 'pagination'],
        primaryField: 'id',
        syncLocation: true,
        pageField: 'page',
        perPageField: 'perPage',
        hideQuickSaveBtn: false,
        autoJumpToTopOnPagerChange: true,
        silentPolling: false,
        filterTogglable: false,
        filterDefaultVisible: true,
        loadDataOnce: false,
        loadDataOnceFetchOnFilter: true
    };
    return CRUD;
}(react_1.default.Component));
exports.default = CRUD;
var CRUDRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(CRUDRenderer, _super);
    function CRUDRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CRUDRenderer.prototype.componentWillMount = function () {
        _super.prototype.componentWillMount.call(this);
        var scoped = this.context;
        scoped.registerComponent(this);
    };
    CRUDRenderer.prototype.componentWillUnmount = function () {
        _super.prototype.componentWillUnmount.call(this);
        var scoped = this.context;
        scoped.unRegisterComponent(this);
    };
    CRUDRenderer.prototype.reloadTarget = function (target, data) {
        var scoped = this.context;
        scoped.reload(target, data);
    };
    CRUDRenderer.prototype.closeTarget = function (target) {
        var scoped = this.context;
        scoped.close(target);
    };
    CRUDRenderer.contextType = Scoped_1.ScopedContext;
    CRUDRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)crud$/,
            storeType: crud_1.CRUDStore.name,
            name: 'crud'
        })
    ], CRUDRenderer);
    return CRUDRenderer;
}(CRUD));
exports.CRUDRenderer = CRUDRenderer;
//# sourceMappingURL=./renderers/CRUD.js.map
