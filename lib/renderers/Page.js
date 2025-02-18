"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageRenderer = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var factory_1 = require("../factory");
var service_1 = require("../store/service");
var tpl_1 = require("../utils/tpl");
var helper_1 = require("../utils/helper");
var helper_2 = require("../utils/helper");
var Scoped_1 = require("../Scoped");
var Alert2_1 = tslib_1.__importDefault(require("../components/Alert2"));
var api_1 = require("../utils/api");
var components_1 = require("../components");
var Page = /** @class */ (function (_super) {
    tslib_1.__extends(Page, _super);
    function Page() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Page.prototype.componentWillMount = function () {
        var _a = this.props, store = _a.store, location = _a.location;
        // autobind 会让继承里面的 super 指向有问题，所以先这样！
        helper_2.bulkBindFunctions(this, [
            'handleAction',
            'handleQuery',
            'handleDialogConfirm',
            'handleDialogClose',
            'handleDrawerConfirm',
            'handleDrawerClose',
            'handleClick',
            'reload',
            'silentReload',
            'initInterval'
        ]);
    };
    Page.prototype.componentDidMount = function () {
        var _a = this.props, initApi = _a.initApi, initFetch = _a.initFetch, initFetchOn = _a.initFetchOn, store = _a.store, messages = _a.messages;
        this.mounted = true;
        if (api_1.isEffectiveApi(initApi, store.data, initFetch, initFetchOn)) {
            store
                .fetchInitData(initApi, store.data, {
                successMessage: messages && messages.fetchSuccess,
                errorMessage: messages && messages.fetchFailed
            })
                .then(this.initInterval);
        }
    };
    Page.prototype.componentDidUpdate = function (prevProps) {
        var props = this.props;
        var store = props.store;
        var initApi = props.initApi;
        if (
        // 前一次不构成条件，这次更新构成了条件，则需要重新拉取
        (props.initFetchOn && props.initFetch && !prevProps.initFetch) ||
            // 构成了条件，同时 url 里面有变量，且上次和这次还不一样，则需要重新拉取。
            (props.initFetch !== false &&
                api_1.isApiOutdated(prevProps.initApi, initApi, prevProps.data, props.data))) {
            var messages = props.messages;
            api_1.isEffectiveApi(initApi, store.data) &&
                store
                    .fetchData(initApi, store.data, {
                    successMessage: messages && messages.fetchSuccess,
                    errorMessage: messages && messages.fetchFailed
                })
                    .then(this.initInterval);
        }
    };
    Page.prototype.componentWillUnmount = function () {
        this.mounted = false;
        clearTimeout(this.timer);
    };
    Page.prototype.reloadTarget = function (target, data) {
        // 会被覆写
    };
    Page.prototype.handleAction = function (e, action, ctx, throwErrors, delegate) {
        var _this = this;
        if (throwErrors === void 0) { throwErrors = false; }
        var _a = this.props, env = _a.env, store = _a.store, messages = _a.messages, onAction = _a.onAction;
        if (action.actionType === 'dialog') {
            store.setCurrentAction(action);
            store.openDialog(ctx);
        }
        else if (action.actionType === 'drawer') {
            store.setCurrentAction(action);
            store.openDrawer(ctx);
        }
        else if (action.actionType === 'ajax') {
            store.setCurrentAction(action);
            store
                .saveRemote(action.api, ctx, {
                successMessage: (action.messages && action.messages.success) ||
                    (messages && messages.saveSuccess),
                errorMessage: (action.messages && action.messages.failed) ||
                    (messages && messages.saveSuccess)
            })
                .then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var redirect;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(action.feedback && helper_2.isVisible(action.feedback, store.data))) return [3 /*break*/, 2];
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
            onAction(e, action, ctx, throwErrors, delegate || this.context);
        }
    };
    Page.prototype.handleQuery = function (query) {
        this.receive(query);
    };
    Page.prototype.handleDialogConfirm = function (values, action) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var store = this.props.store;
        if (action.mergeData && values.length === 1 && values[0]) {
            store.updateData(values[0]);
        }
        var dialog = store.action.dialog;
        if (dialog &&
            dialog.onConfirm &&
            dialog.onConfirm.apply(dialog, tslib_1.__spreadArrays([values, action], args)) === false) {
            return;
        }
        store.closeDialog();
    };
    Page.prototype.handleDialogClose = function () {
        var store = this.props.store;
        store.closeDialog();
    };
    Page.prototype.handleDrawerConfirm = function (values, action) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var store = this.props.store;
        if (action.mergeData && values.length === 1 && values[0]) {
            store.updateData(values[0]);
        }
        var dialog = store.action.dialog;
        if (dialog &&
            dialog.onConfirm &&
            dialog.onConfirm.apply(dialog, tslib_1.__spreadArrays([values, action], args)) === false) {
            return;
        }
        store.closeDrawer();
    };
    Page.prototype.handleDrawerClose = function () {
        var store = this.props.store;
        store.closeDrawer();
    };
    Page.prototype.handleClick = function (e) {
        var target = e.target;
        var env = this.props.env;
        if (env && target.tagName === 'A' && target.hasAttribute('data-link')) {
            env.jumpTo(target.getAttribute('data-link'));
            e.preventDefault();
        }
    };
    Page.prototype.openFeedback = function (dialog, ctx) {
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
    Page.prototype.reload = function (subpath, query, ctx, silent) {
        if (query) {
            return this.receive(query);
        }
        var _a = this.props, store = _a.store, initApi = _a.initApi;
        clearTimeout(this.timer);
        api_1.isEffectiveApi(initApi, store.data) &&
            store
                .fetchData(initApi, store.data, {
                silent: silent
            })
                .then(this.initInterval);
    };
    Page.prototype.receive = function (values) {
        var store = this.props.store;
        store.updateData(values);
        this.reload();
    };
    Page.prototype.silentReload = function (target, query) {
        this.reload(query, undefined, undefined, true);
    };
    Page.prototype.initInterval = function (value) {
        var _a = this.props, interval = _a.interval, silentPolling = _a.silentPolling, stopAutoRefreshWhen = _a.stopAutoRefreshWhen, data = _a.data;
        interval &&
            this.mounted &&
            (!stopAutoRefreshWhen || !helper_1.evalExpression(stopAutoRefreshWhen, data)) &&
            (this.timer = setTimeout(silentPolling ? this.silentReload : this.reload, Math.max(interval, 1000)));
        return value;
    };
    Page.prototype.renderHeader = function () {
        var _a = this.props, title = _a.title, subTitle = _a.subTitle, remark = _a.remark, remarkPlacement = _a.remarkPlacement, headerClassName = _a.headerClassName, toolbarClassName = _a.toolbarClassName, toolbar = _a.toolbar, render = _a.render, store = _a.store, initApi = _a.initApi, env = _a.env, cx = _a.classnames;
        var subProps = {
            onAction: this.handleAction,
            onQuery: initApi ? this.handleQuery : undefined
        };
        var header, right;
        if (title || subTitle) {
            header = (react_1.default.createElement("div", { className: cx("Page-header", headerClassName) },
                title ? (react_1.default.createElement("h2", { className: cx('Page-title') },
                    render('title', title, subProps),
                    remark
                        ? render('remark', {
                            type: 'remark',
                            tooltip: remark,
                            placement: remarkPlacement || 'bottom',
                            container: env && env.getModalContainer
                                ? env.getModalContainer
                                : undefined
                        })
                        : null)) : null,
                subTitle && (react_1.default.createElement("small", { className: cx('Page-subTitle') }, render('subTitle', subTitle, subProps)))));
        }
        if (toolbar) {
            right = (react_1.default.createElement("div", { className: cx("Page-toolbar", toolbarClassName) }, render('toolbar', toolbar, subProps)));
        }
        if (header && right) {
            return (react_1.default.createElement("div", { className: cx('Page-headerRow') },
                header,
                right));
        }
        return header || right;
    };
    Page.prototype.render = function () {
        var _a = this.props, className = _a.className, store = _a.store, body = _a.body, bodyClassName = _a.bodyClassName, cssVars = _a.cssVars, render = _a.render, aside = _a.aside, asideClassName = _a.asideClassName, cx = _a.classnames, header = _a.header, showErrorMsg = _a.showErrorMsg, initApi = _a.initApi;
        var subProps = {
            onAction: this.handleAction,
            onQuery: initApi ? this.handleQuery : undefined,
            loading: store.loading
        };
        var hasAside = aside && (!Array.isArray(aside) || aside.length);
        var cssVarsContent = '';
        if (cssVars) {
            for (var key in cssVars) {
                if (key.startsWith('--')) {
                    if (key.indexOf(':') !== -1) {
                        continue;
                    }
                    var value = cssVars[key];
                    // 这是为了防止 xss，可能还有别的
                    if (typeof value === 'string' &&
                        (value.indexOf('expression(') !== -1 || value.indexOf(';') !== -1)) {
                        continue;
                    }
                    cssVarsContent += key + ": " + value + "; \n";
                }
            }
        }
        return (react_1.default.createElement("div", { className: cx("Page", hasAside ? "Page--withSidebar" : '', className), onClick: this.handleClick },
            cssVarsContent ? (react_1.default.createElement("style", { 
                // 似乎无法用 style 属性的方式来实现，所以目前先这样做
                dangerouslySetInnerHTML: {
                    __html: "\n          :root {\n            " + cssVarsContent + "\n          }\n        "
                } })) : null,
            hasAside ? (react_1.default.createElement("div", { className: cx("Page-aside", asideClassName) }, render('aside', aside, tslib_1.__assign(tslib_1.__assign({}, subProps), (typeof aside === 'string'
                ? {
                    inline: false,
                    className: "Page-asideTplWrapper"
                }
                : null))))) : null,
            react_1.default.createElement("div", { className: cx('Page-content') },
                header ? render('header', header, subProps) : null,
                react_1.default.createElement("div", { className: cx('Page-main') },
                    this.renderHeader(),
                    react_1.default.createElement("div", { className: cx("Page-body", bodyClassName) },
                        react_1.default.createElement(components_1.Spinner, { size: "lg", overlay: true, key: "info", show: store.loading }),
                        store.error && showErrorMsg !== false ? (react_1.default.createElement(Alert2_1.default, { level: "danger", showCloseButton: true, onClose: store.clearMessage }, store.msg)) : null,
                        body ? render('body', body, subProps) : null))),
            render('dialog', tslib_1.__assign(tslib_1.__assign({}, (store.action &&
                store.action.dialog)), { type: 'dialog' }), {
                key: 'dialog',
                data: store.dialogData,
                onConfirm: this.handleDialogConfirm,
                onClose: this.handleDialogClose,
                show: store.dialogOpen,
                onAction: this.handleAction,
                onQuery: initApi ? this.handleQuery : undefined
            }),
            render('drawer', tslib_1.__assign(tslib_1.__assign({}, (store.action &&
                store.action.drawer)), { type: 'drawer' }), {
                key: 'drawer',
                data: store.drawerData,
                onConfirm: this.handleDrawerConfirm,
                onClose: this.handleDrawerClose,
                show: store.drawerOpen,
                onAction: this.handleAction,
                onQuery: initApi ? this.handleQuery : undefined
            })));
    };
    Page.defaultProps = {
        asideClassName: '',
        bodyClassName: '',
        headerClassName: '',
        initFetch: true,
        // primaryField: 'id',
        toolbarClassName: '',
        messages: {}
    };
    Page.propsList = [
        'title',
        'subTitle',
        'initApi',
        'initFetchOn',
        'initFetch',
        'headerClassName',
        'bodyClassName',
        'asideClassName',
        'toolbarClassName',
        'toolbar',
        'body',
        'aside',
        'messages',
        'style',
        'showErrorMsg'
    ];
    return Page;
}(react_1.default.Component));
exports.default = Page;
var PageRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(PageRenderer, _super);
    function PageRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PageRenderer.prototype.componentWillMount = function () {
        _super.prototype.componentWillMount.call(this);
        var scoped = this.context;
        scoped.registerComponent(this);
    };
    PageRenderer.prototype.componentWillUnmount = function () {
        var scoped = this.context;
        scoped.unRegisterComponent(this);
        _super.prototype.componentWillUnmount.call(this);
    };
    PageRenderer.prototype.reloadTarget = function (target, data) {
        var scoped = this.context;
        scoped.reload(target, data);
    };
    PageRenderer.prototype.handleAction = function (e, action, ctx, throwErrors, delegate) {
        if (throwErrors === void 0) { throwErrors = false; }
        var scoped = this.context;
        if (action.actionType === 'reload') {
            action.target && scoped.reload(action.target, ctx);
        }
        else if (action.target) {
            action.target.split(',').forEach(function (name) {
                var target = scoped.getComponentByName(name);
                target &&
                    target.doAction &&
                    target.doAction(tslib_1.__assign(tslib_1.__assign({}, action), { target: undefined }), ctx);
            });
        }
        else {
            _super.prototype.handleAction.call(this, e, action, ctx, throwErrors, delegate);
            if (action.reload &&
                ~['url', 'link', 'jump'].indexOf(action.actionType)) {
                var scoped_1 = delegate || this.context;
                scoped_1.reload(action.reload, ctx);
            }
        }
    };
    PageRenderer.prototype.handleDialogConfirm = function (values, action) {
        var rest = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            rest[_i - 2] = arguments[_i];
        }
        _super.prototype.handleDialogConfirm.apply(this, tslib_1.__spreadArrays([values, action], rest));
        var scoped = this.context;
        var store = this.props.store;
        var dialogAction = store.action;
        if (dialogAction.reload) {
            scoped.reload(dialogAction.reload, store.data);
        }
        else {
            // 没有设置，则自动让页面中 crud 刷新。
            scoped
                .getComponents()
                .filter(function (item) { return item.props.type === 'crud'; })
                .forEach(function (item) { return item.reload && item.reload(); });
        }
    };
    PageRenderer.prototype.handleDrawerConfirm = function (values, action) {
        var rest = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            rest[_i - 2] = arguments[_i];
        }
        _super.prototype.handleDrawerConfirm.call(this, values, action);
        var scoped = this.context;
        var store = this.props.store;
        var drawerAction = store.action;
        // 稍等会，等动画结束。
        setTimeout(function () {
            if (drawerAction.reload) {
                scoped.reload(drawerAction.reload, store.data);
            }
            else {
                // 没有设置，则自动让页面中 crud 刷新。
                scoped
                    .getComponents()
                    .filter(function (item) { return item.props.type === 'crud'; })
                    .forEach(function (item) { return item.reload && item.reload(); });
            }
        }, 300);
    };
    PageRenderer.contextType = Scoped_1.ScopedContext;
    PageRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(?:^|\/)page$/,
            name: 'page',
            storeType: service_1.ServiceStore.name,
            isolateScope: true
        })
    ], PageRenderer);
    return PageRenderer;
}(Page));
exports.PageRenderer = PageRenderer;
//# sourceMappingURL=./renderers/Page.js.map
