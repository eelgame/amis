"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogRenderer = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var Scoped_1 = require("../Scoped");
var factory_1 = require("../factory");
var tpl_1 = require("../utils/tpl");
var Modal_1 = tslib_1.__importDefault(require("../components/Modal"));
var findLast_1 = tslib_1.__importDefault(require("lodash/findLast"));
var helper_1 = require("../utils/helper");
var mobx_1 = require("mobx");
var icons_1 = require("../components/icons");
var modal_1 = require("../store/modal");
var react_dom_1 = require("react-dom");
var components_1 = require("../components");
var mobx_state_tree_1 = require("mobx-state-tree");
var Dialog = /** @class */ (function (_super) {
    tslib_1.__extends(Dialog, _super);
    function Dialog(props) {
        var _this = _super.call(this, props) || this;
        _this.isDead = false;
        _this.$$id = helper_1.guid();
        _this.state = {
            entered: !!_this.props.show
        };
        _this.handleSelfClose = _this.handleSelfClose.bind(_this);
        _this.handleAction = _this.handleAction.bind(_this);
        _this.handleDialogConfirm = _this.handleDialogConfirm.bind(_this);
        _this.handleDialogClose = _this.handleDialogClose.bind(_this);
        _this.handleDrawerConfirm = _this.handleDrawerConfirm.bind(_this);
        _this.handleDrawerClose = _this.handleDrawerClose.bind(_this);
        _this.handleEntered = _this.handleEntered.bind(_this);
        _this.handleExited = _this.handleExited.bind(_this);
        _this.handleFormInit = _this.handleFormInit.bind(_this);
        _this.handleFormSaved = _this.handleFormSaved.bind(_this);
        _this.handleFormChange = _this.handleFormChange.bind(_this);
        _this.handleChildFinished = _this.handleChildFinished.bind(_this);
        return _this;
    }
    Dialog.prototype.componentWillMount = function () {
        var _this = this;
        var store = this.props.store;
        this.reaction = mobx_1.reaction(function () { return "" + store.loading + store.error; }, function () { return _this.forceUpdate(); });
    };
    // shouldComponentUpdate(nextProps:DialogProps, nextState:DialogState) {
    //     const props = this.props;
    //     if (this.state.entered !== nextState.entered) {
    //         return true;
    //     } else if (props.show === nextProps.show && !nextProps.show) {
    //         return false;
    //     }
    //     return isObjectShallowModified(this.props, nextProps);
    // }
    Dialog.prototype.componentWillUnmount = function () {
        this.reaction && this.reaction();
        this.isDead = true;
    };
    Dialog.prototype.buildActions = function () {
        var _a = this.props, actions = _a.actions, confirm = _a.confirm, __ = _a.translate;
        if (typeof actions !== 'undefined') {
            return actions;
        }
        var ret = [];
        ret.push({
            type: 'button',
            actionType: 'cancel',
            label: __('cancle')
        });
        if (confirm) {
            ret.push({
                type: 'button',
                actionType: 'confirm',
                label: __('confirm'),
                primary: true
            });
        }
        return ret;
    };
    Dialog.prototype.handleSelfClose = function () {
        var _a = this.props, onClose = _a.onClose, store = _a.store;
        // clear error
        store.updateMessage();
        onClose();
    };
    Dialog.prototype.handleAction = function (e, action, data) {
        var _a = this.props, store = _a.store, onAction = _a.onAction;
        if (action.type === 'reset') {
            store.reset();
        }
        else if (action.actionType === 'cancel') {
            this.handleSelfClose();
        }
        else if (onAction) {
            onAction(e, action, data);
        }
    };
    Dialog.prototype.handleDialogConfirm = function (values, action) {
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
    Dialog.prototype.handleDialogClose = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var store = this.props.store;
        var action = store.action;
        var dialog = action.dialog;
        if (dialog.onClose && dialog.onClose.apply(dialog, args) === false) {
            return;
        }
        store.closeDialog();
    };
    Dialog.prototype.handleDrawerConfirm = function (values, action) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var store = this.props.store;
        if (action.mergeData && values.length === 1 && values[0]) {
            store.updateData(values[0]);
        }
        var drawer = store.action.drawer;
        if (drawer &&
            drawer.onConfirm &&
            drawer.onConfirm.apply(drawer, tslib_1.__spreadArrays([values, action], args)) === false) {
            return;
        }
        store.closeDrawer();
    };
    Dialog.prototype.handleDrawerClose = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var store = this.props.store;
        var action = store.action;
        var drawer = action.drawer;
        if (drawer.onClose && drawer.onClose.apply(drawer, args) === false) {
            return;
        }
        store.closeDrawer();
    };
    Dialog.prototype.handleEntered = function () {
        this.state.entered ||
            this.setState({
                entered: true
            });
        var activeElem = document.activeElement;
        if (activeElem) {
            var dom = react_dom_1.findDOMNode(this);
            dom && !dom.contains(activeElem) && activeElem.blur();
        }
    };
    Dialog.prototype.handleExited = function () {
        var store = this.props.store;
        mobx_state_tree_1.isAlive(store) && store.setFormData({});
        this.state.entered &&
            this.setState({
                entered: false
            });
    };
    Dialog.prototype.handleFormInit = function (data) {
        var store = this.props.store;
        store.setFormData(data);
    };
    Dialog.prototype.handleFormChange = function (data) {
        var store = this.props.store;
        store.setFormData(data);
    };
    Dialog.prototype.handleFormSaved = function (data, response) {
        var store = this.props.store;
        store.setFormData(tslib_1.__assign(tslib_1.__assign({}, data), response));
    };
    Dialog.prototype.handleChildFinished = function (value, action) {
        // 下面会覆盖
    };
    Dialog.prototype.openFeedback = function (dialog, ctx) {
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
    Dialog.prototype.getPopOverContainer = function () {
        return react_dom_1.findDOMNode(this).querySelector("." + this.props.classPrefix + "Modal-content");
    };
    Dialog.prototype.renderBody = function (body, key) {
        var _this = this;
        var _a = this.props, render = _a.render, store = _a.store;
        if (Array.isArray(body)) {
            return body.map(function (body, key) { return _this.renderBody(body, key); });
        }
        var subProps = {
            key: key,
            disabled: (body && body.disabled) || store.loading,
            onAction: this.handleAction,
            onFinished: this.handleChildFinished,
            popOverContainer: this.getPopOverContainer,
            affixOffsetTop: 0,
            onChange: this.handleFormChange,
            onInit: this.handleFormInit,
            onSaved: this.handleFormSaved
        };
        if (!body.type) {
            return render("body" + (key ? "/" + key : ''), body, subProps);
        }
        var schema = body;
        if (schema.type === 'form') {
            schema = tslib_1.__assign({ mode: 'horizontal', wrapWithPanel: false, submitText: null }, schema);
        }
        return render("body" + (key ? "/" + key : ''), schema, subProps);
    };
    Dialog.prototype.renderFooter = function () {
        var _this = this;
        var actions = this.buildActions();
        if (!actions || !actions.length) {
            return null;
        }
        var _a = this.props, store = _a.store, render = _a.render, cx = _a.classnames, showErrorMsg = _a.showErrorMsg;
        return (react_1.default.createElement("div", { className: cx('Modal-footer') },
            store.loading || store.error ? (react_1.default.createElement("div", { className: cx('Dialog-info'), key: "info" },
                react_1.default.createElement(components_1.Spinner, { size: "sm", key: "info", show: store.loading }),
                store.error && showErrorMsg !== false ? (react_1.default.createElement("span", { className: cx('Dialog-error') }, store.msg)) : null)) : null,
            actions.map(function (action, key) {
                return render("action/" + key, action, {
                    data: store.formData,
                    onAction: _this.handleAction,
                    key: key,
                    disabled: action.disabled || store.loading
                });
            })));
    };
    Dialog.prototype.render = function () {
        var _a = this.props, className = _a.className, size = _a.size, closeOnEsc = _a.closeOnEsc, title = _a.title, store = _a.store, render = _a.render, header = _a.header, body = _a.body, bodyClassName = _a.bodyClassName, headerClassName = _a.headerClassName, show = _a.show, lazyRender = _a.lazyRender, wrapperComponent = _a.wrapperComponent, showCloseButton = _a.showCloseButton, env = _a.env, cx = _a.classnames, classPrefix = _a.classPrefix, __ = _a.translate;
        // console.log('Render Dialog');
        var Wrapper = wrapperComponent || Modal_1.default;
        return (react_1.default.createElement(Wrapper, { classPrefix: classPrefix, className: cx(className), size: size, backdrop: "static", onHide: this.handleSelfClose, keyboard: closeOnEsc && !store.loading, closeOnEsc: closeOnEsc, show: show, onEntered: this.handleEntered, onExited: this.handleExited, container: env && env.getModalContainer ? env.getModalContainer : undefined, enforceFocus: false, disabled: store.loading },
            title && typeof title === 'string' ? (react_1.default.createElement("div", { className: cx('Modal-header', headerClassName) },
                showCloseButton !== false && !store.loading ? (react_1.default.createElement("a", { "data-tooltip": __('Dialog.close'), "data-position": "left", onClick: this.handleSelfClose, className: cx('Modal-close') },
                    react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))) : null,
                react_1.default.createElement("div", { className: cx('Modal-title') }, tpl_1.filter(__(title), store.formData)))) : title ? (react_1.default.createElement("div", { className: cx('Modal-header', headerClassName) },
                showCloseButton !== false && !store.loading ? (react_1.default.createElement("a", { "data-tooltip": __('Dialog.close'), onClick: this.handleSelfClose, className: cx('Modal-close') },
                    react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))) : null,
                render('title', title, {
                    data: store.formData
                }))) : showCloseButton !== false && !store.loading ? (react_1.default.createElement("a", { "data-tooltip": __('Dialog.close'), onClick: this.handleSelfClose, className: cx('Modal-close') },
                react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))) : null,
            header
                ? render('header', header, {
                    data: store.formData
                })
                : null,
            !this.state.entered && lazyRender ? (react_1.default.createElement("div", { className: cx('Modal-body', bodyClassName) },
                react_1.default.createElement(components_1.Spinner, { overlay: true, show: true, size: "lg" }))) : body ? (react_1.default.createElement("div", { className: cx('Modal-body', bodyClassName) }, this.renderBody(body, 'body'))) : null,
            this.renderFooter(),
            body
                ? render('drawer', tslib_1.__assign(tslib_1.__assign({}, (store.action &&
                    store.action.drawer)), { type: 'drawer' }), {
                    key: 'drawer',
                    data: store.drawerData,
                    onConfirm: this.handleDrawerConfirm,
                    onClose: this.handleDrawerClose,
                    show: store.drawerOpen,
                    onAction: this.handleAction
                })
                : null,
            body
                ? render('dialog', tslib_1.__assign(tslib_1.__assign({}, (store.action &&
                    store.action.dialog)), { type: 'dialog' }), {
                    key: 'dialog',
                    data: store.dialogData,
                    onConfirm: this.handleDialogConfirm,
                    onClose: this.handleDialogClose,
                    show: store.dialogOpen,
                    onAction: this.handleAction
                })
                : null));
    };
    Dialog.propsList = [
        'title',
        'size',
        'closeOnEsc',
        'children',
        'bodyClassName',
        'headerClassName',
        'confirm',
        'onClose',
        'onConfirm',
        'show',
        'body',
        'showCloseButton',
        'showErrorMsg',
        'actions',
        'popOverContainer'
    ];
    Dialog.defaultProps = {
        title: '弹框',
        bodyClassName: '',
        confirm: true,
        show: true,
        lazyRender: false,
        showCloseButton: true,
        wrapperComponent: Modal_1.default,
        closeOnEsc: false,
        showErrorMsg: true
    };
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], Dialog.prototype, "getPopOverContainer", null);
    return Dialog;
}(react_1.default.Component));
exports.default = Dialog;
var DialogRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(DialogRenderer, _super);
    function DialogRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DialogRenderer.prototype.componentWillMount = function () {
        var scoped = this.context;
        scoped.registerComponent(this);
        _super.prototype.componentWillMount.call(this);
    };
    DialogRenderer.prototype.componentWillUnmount = function () {
        var scoped = this.context;
        scoped.unRegisterComponent(this);
        _super.prototype.componentWillUnmount.call(this);
    };
    DialogRenderer.prototype.tryChildrenToHandle = function (action, ctx, rawAction) {
        var _this = this;
        var scoped = this.context;
        if (action.fromDialog) {
            return false;
        }
        var components = scoped.getComponents();
        var targets = [];
        var _a = this.props, onConfirm = _a.onConfirm, store = _a.store;
        if (action.target) {
            targets.push.apply(targets, action.target
                .split(',')
                .map(function (name) { return scoped.getComponentByName(name); })
                .filter(function (item) { return item && item.doAction; }));
        }
        if (!targets.length) {
            var page = findLast_1.default(components, function (component) { return component.props.type === 'page'; });
            if (page) {
                components.push.apply(components, page.context.getComponents());
            }
            var form = findLast_1.default(components, function (component) { return component.props.type === 'form'; });
            form && targets.push(form);
            var crud = findLast_1.default(components, function (component) { return component.props.type === 'crud'; });
            crud && targets.push(crud);
        }
        if (targets.length) {
            store.markBusying(true);
            store.updateMessage();
            Promise.all(targets.map(function (target) {
                return target.doAction(tslib_1.__assign(tslib_1.__assign({}, action), { from: _this.$$id }), ctx, true);
            }))
                .then(function (values) {
                if ((action.type === 'submit' ||
                    action.actionType === 'submit' ||
                    action.actionType === 'confirm') &&
                    action.close !== false) {
                    onConfirm && onConfirm(values, rawAction || action, ctx, targets);
                }
                else if (action.close) {
                    action.close === true
                        ? _this.handleSelfClose()
                        : _this.closeTarget(action.close);
                }
                store.markBusying(false);
            })
                .catch(function (reason) {
                if (_this.isDead) {
                    return;
                }
                store.updateMessage(reason.message, true);
                store.markBusying(false);
            });
            return true;
        }
        return false;
    };
    DialogRenderer.prototype.handleAction = function (e, action, data, throwErrors, delegate) {
        var _this = this;
        if (throwErrors === void 0) { throwErrors = false; }
        var _a = this.props, onAction = _a.onAction, store = _a.store, onConfirm = _a.onConfirm, env = _a.env;
        if (action.from === this.$$id) {
            return onAction
                ? onAction(e, action, data, throwErrors, delegate || this.context)
                : false;
        }
        var scoped = this.context;
        if (action.type === 'reset') {
            store.setCurrentAction(action);
            store.reset();
        }
        else if (action.actionType === 'close' ||
            action.actionType === 'cancel') {
            store.setCurrentAction(action);
            this.handleSelfClose();
            action.close && this.closeTarget(action.close);
        }
        else if (action.actionType === 'confirm') {
            store.setCurrentAction(action);
            this.tryChildrenToHandle(tslib_1.__assign(tslib_1.__assign({}, action), { actionType: 'submit' }), data, action) || this.handleSelfClose();
        }
        else if (action.actionType === 'next' || action.actionType === 'prev') {
            store.setCurrentAction(action);
            if (action.type === 'submit') {
                this.tryChildrenToHandle(tslib_1.__assign(tslib_1.__assign({}, action), { actionType: 'submit', close: true }), data, action) || this.handleSelfClose();
            }
            else {
                onConfirm([data], action, data, []);
            }
        }
        else if (action.actionType === 'dialog') {
            store.setCurrentAction(action);
            store.openDialog(data);
        }
        else if (action.actionType === 'drawer') {
            store.setCurrentAction(action);
            store.openDrawer(data);
        }
        else if (action.actionType === 'reload') {
            store.setCurrentAction(action);
            action.target && scoped.reload(action.target, data);
            if (action.close) {
                this.handleSelfClose();
                this.closeTarget(action.close);
            }
        }
        else if (this.tryChildrenToHandle(action, data)) {
            // do nothing
        }
        else if (action.actionType === 'ajax') {
            store.setCurrentAction(action);
            store
                .saveRemote(action.api, data, {
                successMessage: action.messages && action.messages.success,
                errorMessage: action.messages && action.messages.failed
            })
                .then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var reidrect;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(action.feedback && helper_1.isVisible(action.feedback, store.data))) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.openFeedback(action.feedback, store.data)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            reidrect = action.redirect && tpl_1.filter(action.redirect, store.data);
                            reidrect && env.jumpTo(reidrect, action);
                            action.reload && this.reloadTarget(action.reload, store.data);
                            if (action.close) {
                                this.handleSelfClose();
                                this.closeTarget(action.close);
                            }
                            return [2 /*return*/];
                    }
                });
            }); })
                .catch(function () { });
        }
        else if (onAction) {
            var ret = onAction(e, tslib_1.__assign(tslib_1.__assign({}, action), { close: false }), data, throwErrors, delegate || this.context);
            action.close &&
                (ret && ret.then
                    ? ret.then(this.handleSelfClose)
                    : setTimeout(this.handleSelfClose, 200));
        }
    };
    DialogRenderer.prototype.handleChildFinished = function (value, action) {
        if ((action && action.from === this.$$id) || action.close === false) {
            return;
        }
        var scoped = this.context;
        var components = scoped
            .getComponents()
            .filter(function (item) { return !~['drawer', 'dialog'].indexOf(item.props.type); });
        var onConfirm = this.props.onConfirm;
        var onClose = this.props.onClose;
        if (components.length === 1 &&
            (components[0].props.type === 'form' ||
                components[0].props.type === 'wizard') &&
            (action.close === true ||
                components[0].props.closeDialogOnSubmit !== false)) {
            onConfirm && onConfirm([value], action, {}, components);
        }
        else if (action.close === true) {
            onClose();
        }
    };
    DialogRenderer.prototype.handleDialogConfirm = function (values, action) {
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
        else if (action.reload) {
            scoped.reload(action.reload, store.data);
        }
        else {
            // 没有设置，则自动让页面中 crud 刷新。
            scoped
                .getComponents()
                .filter(function (item) { return item.props.type === 'crud'; })
                .forEach(function (item) { return item.reload && item.reload(); });
        }
    };
    DialogRenderer.prototype.handleDrawerConfirm = function (values, action) {
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
            else if (action.reload) {
                scoped.reload(action.reload, store.data);
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
    DialogRenderer.prototype.reloadTarget = function (target, data) {
        var scoped = this.context;
        scoped.reload(target, data);
    };
    DialogRenderer.prototype.closeTarget = function (target) {
        var scoped = this.context;
        scoped.close(target);
    };
    DialogRenderer.contextType = Scoped_1.ScopedContext;
    DialogRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)dialog$/,
            storeType: modal_1.ModalStore.name,
            storeExtendsData: false,
            name: 'dialog',
            isolateScope: true,
            shouldSyncSuperStore: function (store, props) {
                return store.dialogOpen || props.show;
            }
        })
    ], DialogRenderer);
    return DialogRenderer;
}(Dialog));
exports.DialogRenderer = DialogRenderer;
//# sourceMappingURL=./renderers/Dialog.js.map
