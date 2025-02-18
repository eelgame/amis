"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRenderer = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var factory_1 = require("../factory");
var service_1 = require("../store/service");
var tpl_1 = require("../utils/tpl");
var Scoped_1 = require("../Scoped");
var api_1 = require("../utils/api");
var components_1 = require("../components");
var helper_1 = require("../utils/helper");
var Service = /** @class */ (function (_super) {
    tslib_1.__extends(Service, _super);
    function Service(props) {
        var _this = _super.call(this, props) || this;
        _this.handleQuery = _this.handleQuery.bind(_this);
        _this.handleAction = _this.handleAction.bind(_this);
        _this.reload = _this.reload.bind(_this);
        _this.silentReload = _this.silentReload.bind(_this);
        _this.initInterval = _this.initInterval.bind(_this);
        _this.afterDataFetch = _this.afterDataFetch.bind(_this);
        _this.afterSchemaFetch = _this.afterSchemaFetch.bind(_this);
        return _this;
    }
    Service.prototype.componentDidMount = function () {
        this.mounted = true;
        this.initFetch();
    };
    Service.prototype.componentDidUpdate = function (prevProps) {
        var props = this.props;
        var store = props.store;
        var _a = props.messages, fetchSuccess = _a.fetchSuccess, fetchFailed = _a.fetchFailed;
        api_1.isApiOutdated(prevProps.api, props.api, prevProps.data, props.data) &&
            store
                .fetchData(props.api, store.data, {
                successMessage: fetchSuccess,
                errorMessage: fetchFailed
            })
                .then(this.afterDataFetch);
        api_1.isApiOutdated(prevProps.schemaApi, props.schemaApi, prevProps.data, props.data) &&
            store
                .fetchSchema(props.schemaApi, store.data, {
                successMessage: fetchSuccess,
                errorMessage: fetchFailed
            })
                .then(this.afterSchemaFetch);
        if (props.ws && prevProps.ws !== props.ws) {
            if (this.socket) {
                this.socket.close();
            }
            this.socket = store.fetchWSData(props.ws, this.afterDataFetch);
        }
    };
    Service.prototype.componentWillUnmount = function () {
        this.mounted = false;
        clearTimeout(this.timer);
        if (this.socket && this.socket.close) {
            this.socket.close();
        }
    };
    Service.prototype.initFetch = function () {
        var _a = this.props, schemaApi = _a.schemaApi, initFetchSchema = _a.initFetchSchema, api = _a.api, ws = _a.ws, initFetch = _a.initFetch, initFetchOn = _a.initFetchOn, store = _a.store, _b = _a.messages, fetchSuccess = _b.fetchSuccess, fetchFailed = _b.fetchFailed;
        if (api_1.isEffectiveApi(schemaApi, store.data, initFetchSchema)) {
            store
                .fetchSchema(schemaApi, store.data, {
                successMessage: fetchSuccess,
                errorMessage: fetchFailed
            })
                .then(this.afterSchemaFetch);
        }
        if (api_1.isEffectiveApi(api, store.data, initFetch, initFetchOn)) {
            store
                .fetchInitData(api, store.data, {
                successMessage: fetchSuccess,
                errorMessage: fetchFailed
            })
                .then(this.afterDataFetch);
        }
        if (ws) {
            this.socket = store.fetchWSData(ws, this.afterDataFetch);
        }
    };
    Service.prototype.afterDataFetch = function (data) {
        this.initInterval(data);
    };
    Service.prototype.afterSchemaFetch = function (schema) {
        this.initInterval(schema);
    };
    Service.prototype.initInterval = function (value) {
        var _a = this.props, interval = _a.interval, silentPolling = _a.silentPolling, stopAutoRefreshWhen = _a.stopAutoRefreshWhen, data = _a.data;
        clearTimeout(this.timer);
        interval &&
            this.mounted &&
            (!stopAutoRefreshWhen || !helper_1.evalExpression(stopAutoRefreshWhen, data)) &&
            (this.timer = setTimeout(silentPolling ? this.silentReload : this.reload, Math.max(interval, 1000)));
        return value;
    };
    Service.prototype.reload = function (subpath, query, ctx, silent) {
        if (query) {
            return this.receive(query);
        }
        var _a = this.props, schemaApi = _a.schemaApi, initFetchSchema = _a.initFetchSchema, api = _a.api, initFetch = _a.initFetch, initFetchOn = _a.initFetchOn, store = _a.store, _b = _a.messages, fetchSuccess = _b.fetchSuccess, fetchFailed = _b.fetchFailed;
        clearTimeout(this.timer);
        if (api_1.isEffectiveApi(schemaApi, store.data)) {
            store
                .fetchSchema(schemaApi, store.data, {
                successMessage: fetchSuccess,
                errorMessage: fetchFailed
            })
                .then(this.afterSchemaFetch);
        }
        if (api_1.isEffectiveApi(api, store.data)) {
            store
                .fetchData(api, store.data, {
                silent: silent,
                successMessage: fetchSuccess,
                errorMessage: fetchFailed
            })
                .then(this.afterDataFetch);
        }
    };
    Service.prototype.silentReload = function (target, query) {
        this.reload(target, query, undefined, true);
    };
    Service.prototype.receive = function (values) {
        var store = this.props.store;
        store.updateData(values);
        this.reload();
    };
    Service.prototype.handleQuery = function (query) {
        var _a, _b;
        if (this.props.api || this.props.schemaApi) {
            this.receive(query);
        }
        else {
            (_b = (_a = this.props).onQuery) === null || _b === void 0 ? void 0 : _b.call(_a, query);
        }
    };
    Service.prototype.reloadTarget = function (target, data) {
        // 会被覆写
    };
    Service.prototype.openFeedback = function (dialog, ctx) {
        var _this = this;
        return new Promise(function (resolve) {
            var store = _this.props.store;
            var parentStore = store.parentStore;
            // 暂时自己不支持弹出 dialog
            if (parentStore && parentStore.openDialog) {
                store.setCurrentAction({
                    type: 'button',
                    actionType: 'dialog',
                    dialog: dialog
                });
                store.openDialog(ctx, undefined, function (confirmed) {
                    resolve(confirmed);
                });
            }
        });
    };
    Service.prototype.handleAction = function (e, action, data, throwErrors, delegate) {
        var _this = this;
        if (throwErrors === void 0) { throwErrors = false; }
        var _a = this.props, onAction = _a.onAction, store = _a.store, env = _a.env, api = _a.api, __ = _a.translate;
        if (api && action.actionType === 'ajax') {
            store.setCurrentAction(action);
            store
                .saveRemote(action.api, data, {
                successMessage: __(action.messages && action.messages.success),
                errorMessage: __(action.messages && action.messages.failed)
            })
                .then(function (payload) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var redirect;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.afterDataFetch(payload);
                            if (!(action.feedback && helper_1.isVisible(action.feedback, store.data))) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.openFeedback(action.feedback, store.data)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            redirect = action.redirect && tpl_1.filter(action.redirect, store.data);
                            redirect && env.jumpTo(redirect, action);
                            action.reload && this.reloadTarget(action.reload, store.data);
                            return [2 /*return*/];
                    }
                });
            }); })
                .catch(function () { });
        }
        else {
            onAction(e, action, data, throwErrors, delegate || this.context);
        }
    };
    Service.prototype.renderBody = function () {
        var _a = this.props, render = _a.render, store = _a.store, schema = _a.body, cx = _a.classnames;
        return (react_1.default.createElement("div", { className: cx('Service-body') }, render('body', store.schema || schema, {
            key: store.schemaKey || 'body',
            onQuery: this.handleQuery,
            onAction: this.handleAction
        })));
    };
    Service.prototype.render = function () {
        var _a = this.props, className = _a.className, store = _a.store, render = _a.render, ns = _a.classPrefix, cx = _a.classnames;
        return (react_1.default.createElement("div", { className: cx(ns + "Service", className) },
            store.error ? (react_1.default.createElement("div", { className: cx("Alert Alert--danger") },
                react_1.default.createElement("button", { className: cx('Alert-close'), onClick: function () { return store.updateMessage(''); }, type: "button" },
                    react_1.default.createElement("span", null, "\u00D7")),
                store.msg)) : null,
            this.renderBody(),
            react_1.default.createElement(components_1.Spinner, { size: "lg", overlay: true, key: "info", show: store.loading })));
    };
    Service.defaultProps = {
        messages: {
            fetchFailed: 'fetchFailed'
        }
    };
    Service.propsList = [];
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], Service.prototype, "initFetch", null);
    return Service;
}(react_1.default.Component));
exports.default = Service;
var ServiceRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(ServiceRenderer, _super);
    function ServiceRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ServiceRenderer.prototype.componentWillMount = function () {
        // super.componentWillMount();
        var scoped = this.context;
        scoped.registerComponent(this);
    };
    ServiceRenderer.prototype.componentWillUnmount = function () {
        _super.prototype.componentWillUnmount.call(this);
        var scoped = this.context;
        scoped.unRegisterComponent(this);
    };
    ServiceRenderer.prototype.reloadTarget = function (target, data) {
        var scoped = this.context;
        scoped.reload(target, data);
    };
    ServiceRenderer.contextType = Scoped_1.ScopedContext;
    ServiceRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)service$/,
            storeType: service_1.ServiceStore.name,
            name: 'service'
        })
    ], ServiceRenderer);
    return ServiceRenderer;
}(Service));
exports.ServiceRenderer = ServiceRenderer;
//# sourceMappingURL=./renderers/Service.js.map
