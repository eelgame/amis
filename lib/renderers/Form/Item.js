"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormItem = exports.registerFormItem = exports.asFormItem = exports.detectProps = exports.FormItemWrap = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var hoist_non_react_statics_1 = tslib_1.__importDefault(require("hoist-non-react-statics"));
var mobx_1 = require("mobx");
var factory_1 = require("../../factory");
var helper_1 = require("../../utils/helper");
var mobx_react_1 = require("mobx-react");
var types_1 = require("../../types");
var tpl_1 = require("../../utils/tpl");
var WithStore_1 = require("../../WithStore");
var FormItemWrap = /** @class */ (function (_super) {
    tslib_1.__extends(FormItemWrap, _super);
    function FormItemWrap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormItemWrap.prototype.componentWillMount = function () {
        var _this = this;
        var model = this.props.formItem;
        if (model) {
            this.reaction = mobx_1.reaction(function () { return "" + model.errors.join('') + model.isFocused + model.dialogOpen; }, function () { return _this.forceUpdate(); });
        }
    };
    FormItemWrap.prototype.componentWillUnmount = function () {
        this.reaction && this.reaction();
    };
    FormItemWrap.prototype.handleFocus = function (e) {
        var model = this.props.formItem;
        model && model.focus();
        this.props.onFocus && this.props.onFocus(e);
    };
    FormItemWrap.prototype.handleBlur = function (e) {
        var model = this.props.formItem;
        model && model.blur();
        this.props.onBlur && this.props.onBlur(e);
    };
    FormItemWrap.prototype.handleOpenDialog = function (schema, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var model;
            return tslib_1.__generator(this, function (_a) {
                model = this.props.formItem;
                if (!model) {
                    return [2 /*return*/];
                }
                return [2 /*return*/, new Promise(function (resolve) {
                        return model.openDialog(schema, data, function (result) { return resolve(result); });
                    })];
            });
        });
    };
    FormItemWrap.prototype.handleDialogConfirm = function (_a) {
        var values = _a[0];
        var model = this.props.formItem;
        if (!model) {
            return;
        }
        model.closeDialog(values);
    };
    FormItemWrap.prototype.handleDialogClose = function () {
        var model = this.props.formItem;
        if (!model) {
            return;
        }
        model.closeDialog();
    };
    FormItemWrap.prototype.renderControl = function () {
        var _a;
        var _b = this.props, inputClassName = _b.inputClassName, model = _b.formItem, cx = _b.classnames, children = _b.children, type = _b.type, renderControl = _b.renderControl, formItemConfig = _b.formItemConfig, sizeMutable = _b.sizeMutable, size = _b.size, defaultSize = _b.defaultSize, rest = tslib_1.__rest(_b, ["inputClassName", "formItem", "classnames", "children", "type", "renderControl", "formItemConfig", "sizeMutable", "size", "defaultSize"]);
        if (renderControl) {
            var controlSize = size || defaultSize;
            return renderControl(tslib_1.__assign(tslib_1.__assign({}, rest), { onOpenDialog: this.handleOpenDialog, type: type, classnames: cx, formItem: model, className: cx("Form-control", (_a = {
                        'is-inline': !!rest.inline,
                        'is-error': model && !model.valid
                    },
                    _a["Form-control--withSize Form-control--size" + helper_1.ucFirst(controlSize)] = sizeMutable !== false &&
                        typeof controlSize === 'string' &&
                        !!controlSize &&
                        controlSize !== 'full',
                    _a), inputClassName) }));
        }
        return null;
    };
    FormItemWrap.prototype.renderHorizontal = function () {
        var _a, _b, _c;
        var _d = this.props, className = _d.className, cx = _d.classnames, description = _d.description, descriptionClassName = _d.descriptionClassName, captionClassName = _d.captionClassName, desc = _d.desc, label = _d.label, labelClassName = _d.labelClassName, render = _d.render, required = _d.required, caption = _d.caption, remark = _d.remark, labelRemark = _d.labelRemark, env = _d.env, model = _d.formItem, renderLabel = _d.renderLabel, renderDescription = _d.renderDescription, hint = _d.hint, data = _d.data, showErrorMsg = _d.showErrorMsg;
        // 强制不渲染 label 的话
        if (renderLabel === false) {
            label = label === false ? false : '';
        }
        description = description || desc;
        var horizontal = this.props.horizontal || this.props.formHorizontal;
        var left = helper_1.getWidthRate(horizontal.left);
        var right = helper_1.getWidthRate(horizontal.right);
        return (react_1.default.createElement("div", { "data-role": "form-item", className: cx("Form-item Form-item--horizontal", className, (_a = {},
                _a["is-error"] = model && !model.valid,
                _a["is-required"] = required,
                _a)) },
            label !== false ? (react_1.default.createElement("label", { className: cx("Form-label", (_b = {},
                    _b["Form-itemColumn--" + (typeof horizontal.leftFixed === 'string'
                        ? horizontal.leftFixed
                        : 'normal')] = horizontal.leftFixed,
                    _b["Form-itemColumn--" + left] = !horizontal.leftFixed,
                    _b), labelClassName) },
                react_1.default.createElement("span", null,
                    label ? render('label', tpl_1.filter(label, data)) : null,
                    required && (label || labelRemark) ? (react_1.default.createElement("span", { className: cx("Form-star") }, "*")) : null,
                    labelRemark
                        ? render('label-remark', {
                            type: 'remark',
                            icon: labelRemark.icon || 'warning-mark',
                            tooltip: labelRemark,
                            className: cx("Form-labelRemark"),
                            container: env && env.getModalContainer
                                ? env.getModalContainer
                                : undefined
                        })
                        : null))) : null,
            react_1.default.createElement("div", { className: cx("Form-value", (_c = {},
                    // [`Form-itemColumn--offset${getWidthRate(horizontal.offset)}`]: !label && label !== false,
                    _c["Form-itemColumn--" + right] = !!right && right !== 12 - left,
                    _c)) },
                this.renderControl(),
                caption
                    ? render('caption', caption, {
                        className: cx("Form-caption", captionClassName)
                    })
                    : null,
                remark
                    ? render('remark', {
                        type: 'remark',
                        icon: remark.icon || 'warning-mark',
                        tooltip: remark,
                        className: cx("Form-remark"),
                        container: env && env.getModalContainer
                            ? env.getModalContainer
                            : undefined
                    })
                    : null,
                hint && model && model.isFocused
                    ? render('hint', hint, {
                        className: cx("Form-hint")
                    })
                    : null,
                model &&
                    !model.valid &&
                    showErrorMsg !== false &&
                    Array.isArray(model.errors) ? (react_1.default.createElement("ul", { className: cx("Form-feedback") }, model.errors.map(function (msg, key) { return (react_1.default.createElement("li", { key: key }, msg)); }))) : null,
                renderDescription !== false && description
                    ? render('description', description, {
                        className: cx("Form-description", descriptionClassName)
                    })
                    : null)));
    };
    FormItemWrap.prototype.renderNormal = function () {
        var _a;
        var _b = this.props, className = _b.className, cx = _b.classnames, desc = _b.desc, description = _b.description, label = _b.label, labelClassName = _b.labelClassName, render = _b.render, required = _b.required, caption = _b.caption, remark = _b.remark, labelRemark = _b.labelRemark, env = _b.env, descriptionClassName = _b.descriptionClassName, captionClassName = _b.captionClassName, model = _b.formItem, renderLabel = _b.renderLabel, renderDescription = _b.renderDescription, hint = _b.hint, formMode = _b.formMode, data = _b.data, showErrorMsg = _b.showErrorMsg;
        description = description || desc;
        return (react_1.default.createElement("div", { "data-role": "form-item", className: cx("Form-item Form-item--" + formMode, className, (_a = {
                    'is-error': model && !model.valid
                },
                _a["is-required"] = required,
                _a)) },
            label && renderLabel !== false ? (react_1.default.createElement("label", { className: cx("Form-label", labelClassName) },
                react_1.default.createElement("span", null,
                    label ? render('label', tpl_1.filter(label, data)) : null,
                    required && (label || labelRemark) ? (react_1.default.createElement("span", { className: cx("Form-star") }, "*")) : null,
                    labelRemark
                        ? render('label-remark', {
                            type: 'remark',
                            icon: labelRemark.icon || 'warning-mark',
                            tooltip: labelRemark,
                            className: cx("Form-lableRemark"),
                            container: env && env.getModalContainer
                                ? env.getModalContainer
                                : undefined
                        })
                        : null))) : null,
            this.renderControl(),
            caption
                ? render('caption', caption, {
                    className: cx("Form-caption", captionClassName)
                })
                : null,
            remark
                ? render('remark', {
                    type: 'remark',
                    icon: remark.icon || 'warning-mark',
                    className: cx("Form-remark"),
                    tooltip: remark,
                    container: env && env.getModalContainer ? env.getModalContainer : undefined
                })
                : null,
            hint && model && model.isFocused
                ? render('hint', hint, {
                    className: cx("Form-hint")
                })
                : null,
            model &&
                !model.valid &&
                showErrorMsg !== false &&
                Array.isArray(model.errors) ? (react_1.default.createElement("ul", { className: cx("Form-feedback") }, model.errors.map(function (msg, key) { return (react_1.default.createElement("li", { key: key }, msg)); }))) : null,
            renderDescription !== false && description
                ? render('description', description, {
                    className: cx("Form-description", descriptionClassName)
                })
                : null));
    };
    FormItemWrap.prototype.renderInline = function () {
        var _a;
        var _b = this.props, className = _b.className, cx = _b.classnames, desc = _b.desc, description = _b.description, label = _b.label, labelClassName = _b.labelClassName, render = _b.render, required = _b.required, caption = _b.caption, descriptionClassName = _b.descriptionClassName, captionClassName = _b.captionClassName, model = _b.formItem, remark = _b.remark, labelRemark = _b.labelRemark, env = _b.env, hint = _b.hint, renderLabel = _b.renderLabel, renderDescription = _b.renderDescription, data = _b.data, showErrorMsg = _b.showErrorMsg;
        description = description || desc;
        return (react_1.default.createElement("div", { "data-role": "form-item", className: cx("Form-item Form-item--inline", className, (_a = {
                    'is-error': model && !model.valid
                },
                _a["is-required"] = required,
                _a)) },
            label && renderLabel !== false ? (react_1.default.createElement("label", { className: cx("Form-label", labelClassName) },
                react_1.default.createElement("span", null,
                    label ? render('label', tpl_1.filter(label, data)) : label,
                    required && (label || labelRemark) ? (react_1.default.createElement("span", { className: cx("Form-star") }, "*")) : null,
                    labelRemark
                        ? render('label-remark', {
                            type: 'remark',
                            icon: labelRemark.icon || 'warning-mark',
                            tooltip: labelRemark,
                            className: cx("Form-lableRemark"),
                            container: env && env.getModalContainer
                                ? env.getModalContainer
                                : undefined
                        })
                        : null))) : null,
            react_1.default.createElement("div", { className: cx("Form-value") },
                this.renderControl(),
                caption
                    ? render('caption', caption, {
                        className: cx("Form-caption", captionClassName)
                    })
                    : null,
                remark
                    ? render('remark', {
                        type: 'remark',
                        icon: remark.icon || 'warning-mark',
                        className: cx("Form-remark"),
                        tooltip: remark,
                        container: env && env.getModalContainer
                            ? env.getModalContainer
                            : undefined
                    })
                    : null,
                hint && model && model.isFocused
                    ? render('hint', hint, {
                        className: cx("Form-hint")
                    })
                    : null,
                model &&
                    !model.valid &&
                    showErrorMsg !== false &&
                    Array.isArray(model.errors) ? (react_1.default.createElement("ul", { className: cx("Form-feedback") }, model.errors.map(function (msg, key) { return (react_1.default.createElement("li", { key: key }, msg)); }))) : null,
                renderDescription !== false && description
                    ? render('description', description, {
                        className: cx("Form-description", descriptionClassName)
                    })
                    : null)));
    };
    FormItemWrap.prototype.renderRow = function () {
        var _a;
        var _b = this.props, className = _b.className, cx = _b.classnames, desc = _b.desc, description = _b.description, label = _b.label, labelClassName = _b.labelClassName, render = _b.render, required = _b.required, caption = _b.caption, remark = _b.remark, labelRemark = _b.labelRemark, env = _b.env, descriptionClassName = _b.descriptionClassName, captionClassName = _b.captionClassName, model = _b.formItem, renderLabel = _b.renderLabel, renderDescription = _b.renderDescription, hint = _b.hint, formMode = _b.formMode, data = _b.data, showErrorMsg = _b.showErrorMsg;
        description = description || desc;
        return (react_1.default.createElement("div", { "data-role": "form-item", className: cx("Form-item Form-item--" + formMode, className, (_a = {
                    'is-error': model && !model.valid
                },
                _a["is-required"] = required,
                _a)) },
            react_1.default.createElement("div", { className: cx('Form-rowInner') },
                label && renderLabel !== false ? (react_1.default.createElement("label", { className: cx("Form-label", labelClassName) },
                    react_1.default.createElement("span", null,
                        render('label', tpl_1.filter(label, data)),
                        required && (label || labelRemark) ? (react_1.default.createElement("span", { className: cx("Form-star") }, "*")) : null,
                        labelRemark
                            ? render('label-remark', {
                                type: 'remark',
                                icon: labelRemark.icon || 'warning-mark',
                                tooltip: labelRemark,
                                className: cx("Form-lableRemark"),
                                container: env && env.getModalContainer
                                    ? env.getModalContainer
                                    : undefined
                            })
                            : null))) : null,
                this.renderControl(),
                caption
                    ? render('caption', caption, {
                        className: cx("Form-caption", captionClassName)
                    })
                    : null,
                remark
                    ? render('remark', {
                        type: 'remark',
                        icon: remark.icon || 'warning-mark',
                        className: cx("Form-remark"),
                        tooltip: remark,
                        container: env && env.getModalContainer
                            ? env.getModalContainer
                            : undefined
                    })
                    : null),
            hint && model && model.isFocused
                ? render('hint', hint, {
                    className: cx("Form-hint")
                })
                : null,
            model &&
                !model.valid &&
                showErrorMsg !== false &&
                Array.isArray(model.errors) ? (react_1.default.createElement("ul", { className: cx('Form-feedback') }, model.errors.map(function (msg, key) { return (react_1.default.createElement("li", { key: key }, msg)); }))) : null,
            description && renderDescription !== false
                ? render('description', description, {
                    className: cx("Form-description", descriptionClassName)
                })
                : null));
    };
    FormItemWrap.prototype.render = function () {
        var _a = this.props, formMode = _a.formMode, inputOnly = _a.inputOnly, wrap = _a.wrap, render = _a.render, model = _a.formItem;
        if (wrap === false || inputOnly) {
            return this.renderControl();
        }
        return (react_1.default.createElement(react_1.default.Fragment, null,
            formMode === 'inline'
                ? this.renderInline()
                : formMode === 'horizontal'
                    ? this.renderHorizontal()
                    : formMode === 'row'
                        ? this.renderRow()
                        : this.renderNormal(),
            model
                ? render('modal', tslib_1.__assign({ type: 'dialog' }, model.dialogSchema), {
                    show: model.dialogOpen,
                    onClose: this.handleDialogClose,
                    onConfirm: this.handleDialogConfirm,
                    data: model.dialogData
                })
                : null));
    };
    var _a, _b;
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], FormItemWrap.prototype, "handleFocus", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], FormItemWrap.prototype, "handleBlur", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof types_1.Schema !== "undefined" && types_1.Schema) === "function" ? _a : Object, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], FormItemWrap.prototype, "handleOpenDialog", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof Array !== "undefined" && Array) === "function" ? _b : Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], FormItemWrap.prototype, "handleDialogConfirm", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], FormItemWrap.prototype, "handleDialogClose", null);
    return FormItemWrap;
}(react_1.default.Component));
exports.FormItemWrap = FormItemWrap;
// 白名单形式，只有这些属性发生变化，才会往下更新。
// 除非配置  strictMode
exports.detectProps = [
    'formPristine',
    'formInited',
    'addable',
    'addButtonClassName',
    'addButtonText',
    'addOn',
    'btnClassName',
    'btnLabel',
    'btnDisabled',
    'className',
    'clearable',
    'columns',
    'columnsCount',
    'controls',
    'desc',
    'description',
    'disabled',
    'draggable',
    'editable',
    'editButtonClassName',
    'formHorizontal',
    'formMode',
    'hideRoot',
    'horizontal',
    'icon',
    'inline',
    'inputClassName',
    'label',
    'labelClassName',
    'labelField',
    'language',
    'level',
    'max',
    'maxRows',
    'min',
    'minRows',
    'multiLine',
    'multiple',
    'option',
    'placeholder',
    'removable',
    'required',
    'remark',
    'hint',
    'rows',
    'searchable',
    'showCompressOptions',
    'size',
    'step',
    'showInput',
    'unit',
    'value',
    'diffValue'
];
function asFormItem(config) {
    return function (Control) {
        var _a;
        var isSFC = !(Control.prototype instanceof react_1.default.Component);
        // 兼容老的 FormItem 用法。
        if (config.validate && !Control.prototype.validate) {
            var fn_1 = config.validate;
            Control.prototype.validate = function () {
                var host = {
                    input: this
                };
                return fn_1.apply(host, arguments);
            };
        }
        else if (config.validate) {
            console.error('FormItem配置中的 validate 将不起作用，因为类的成员函数中已经定义了 validate 方法，将优先使用类里面的实现。');
        }
        if (config.storeType) {
            Control = WithStore_1.HocStoreFactory({
                storeType: config.storeType,
                extendsData: config.extendsData
            })(mobx_react_1.observer(Control));
            delete config.storeType;
        }
        return hoist_non_react_statics_1.default((_a = /** @class */ (function (_super) {
                tslib_1.__extends(class_1, _super);
                function class_1(props) {
                    var _this = _super.call(this, props) || this;
                    _this.refFn = _this.refFn.bind(_this);
                    return _this;
                }
                class_1.prototype.componentWillMount = function () {
                    var _a = this.props, validations = _a.validations, model = _a.formItem;
                    // 组件注册的时候可能默认指定验证器类型
                    if (model && !validations && config.validations) {
                        model.config({
                            rules: config.validations
                        });
                    }
                    _super.prototype.componentWillMount.call(this);
                };
                class_1.prototype.shouldComponentUpdate = function (nextProps) {
                    if (nextProps.strictMode === false || config.strictMode === false) {
                        return true;
                    }
                    // 把可能会影响视图的白名单弄出来，减少重新渲染次数。
                    if (helper_1.anyChanged(exports.detectProps, this.props, nextProps)) {
                        return true;
                    }
                    return false;
                };
                class_1.prototype.getWrappedInstance = function () {
                    return this.ref;
                };
                class_1.prototype.refFn = function (ref) {
                    this.ref = ref;
                };
                class_1.prototype.renderControl = function () {
                    var _a;
                    var _b = this.props, inputClassName = _b.inputClassName, model = _b.formItem, cx = _b.classnames, children = _b.children, type = _b.type, size = _b.size, defaultSize = _b.defaultSize, rest = tslib_1.__rest(_b, ["inputClassName", "formItem", "classnames", "children", "type", "size", "defaultSize"]);
                    var controlSize = size || defaultSize;
                    return (react_1.default.createElement(Control, tslib_1.__assign({}, rest, { onOpenDialog: this.handleOpenDialog, size: config.sizeMutable !== false ? undefined : size, onFocus: this.handleFocus, onBlur: this.handleBlur, type: type, classnames: cx, ref: isSFC ? undefined : this.refFn, forwardedRef: isSFC ? this.refFn : undefined, formItem: model, className: cx("Form-control", (_a = {
                                'is-inline': !!rest.inline,
                                'is-error': model && !model.valid
                            },
                            _a["Form-control--withSize Form-control--size" + helper_1.ucFirst(controlSize)] = config.sizeMutable !== false &&
                                typeof controlSize === 'string' &&
                                !!controlSize &&
                                controlSize !== 'full',
                            _a), inputClassName) })));
                };
                return class_1;
            }(FormItemWrap)),
            _a.defaultProps = tslib_1.__assign({ className: '', renderLabel: config.renderLabel, renderDescription: config.renderDescription, sizeMutable: config.sizeMutable, wrap: config.wrap, showErrorMsg: config.showErrorMsg }, Control.defaultProps),
            _a.propsList = tslib_1.__spreadArrays([
                'value',
                'defaultValue',
                'onChange',
                'setPrinstineValue',
                'readOnly',
                'strictMode'
            ], (Control.propsList || [])),
            _a.displayName = "FormItem" + (config.type ? "(" + config.type + ")" : ''),
            _a.ComposedComponent = Control,
            _a), Control);
    };
}
exports.asFormItem = asFormItem;
function registerFormItem(config) {
    var Control = asFormItem(config)(config.component);
    return factory_1.registerRenderer(tslib_1.__assign(tslib_1.__assign({}, config), { name: config.name || config.type + "-control", weight: typeof config.weight !== 'undefined' ? config.weight : -100, test: config.test ||
            new RegExp("(^|/)form(?:/.+)?/control/(?:d+/)?" + config.type + "$", 'i'), component: Control, isFormItem: true }));
}
exports.registerFormItem = registerFormItem;
function FormItem(config) {
    return function (component) {
        var renderer = registerFormItem(tslib_1.__assign(tslib_1.__assign({}, config), { component: component }));
        return renderer.component;
    };
}
exports.FormItem = FormItem;
exports.default = FormItem;
//# sourceMappingURL=./renderers/Form/Item.js.map
