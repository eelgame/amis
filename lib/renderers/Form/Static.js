"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticFieldRenderer = exports.StaticControlRenderer = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var Item_1 = require("./Item");
var Table_1 = require("../Table");
var PopOver_1 = tslib_1.__importDefault(require("../PopOver"));
var QuickEdit_1 = tslib_1.__importDefault(require("../QuickEdit"));
var factory_1 = require("../../factory");
var Copyable_1 = tslib_1.__importDefault(require("../Copyable"));
var helper_1 = require("../../utils/helper");
var StaticControl = /** @class */ (function (_super) {
    tslib_1.__extends(StaticControl, _super);
    function StaticControl(props) {
        var _this = _super.call(this, props) || this;
        _this.handleQuickChange = _this.handleQuickChange.bind(_this);
        return _this;
    }
    StaticControl.prototype.handleQuickChange = function (values, saveImmediately) {
        var _a = this.props, onBulkChange = _a.onBulkChange, onAction = _a.onAction, data = _a.data;
        onBulkChange(values, saveImmediately === true);
        if (saveImmediately && saveImmediately.api) {
            onAction(null, {
                actionType: 'ajax',
                api: saveImmediately.api
            }, helper_1.extendObject(data, values));
        }
    };
    StaticControl.prototype.render = function () {
        var _a = this.props, className = _a.className, value = _a.value, label = _a.label, type = _a.type, render = _a.render, children = _a.children, data = _a.data, cx = _a.classnames, name = _a.name, rest = tslib_1.__rest(_a, ["className", "value", "label", "type", "render", "children", "data", "classnames", "name"]);
        var subType = /^static/.test(type)
            ? type.substring(7) || (rest.tpl ? 'tpl' : 'plain')
            : type;
        var field = tslib_1.__assign(tslib_1.__assign({ label: label,
            name: name }, rest), { type: subType });
        return (react_1.default.createElement("div", { className: cx('Form-static') }, render('field', tslib_1.__assign(tslib_1.__assign({}, field), { type: 'static-field', field: field }), {
            value: value,
            className: className,
            onQuickChange: this.handleQuickChange
        })));
    };
    StaticControl.defaultProps = {
        placeholder: '-'
    };
    return StaticControl;
}(react_1.default.Component));
exports.default = StaticControl;
var StaticControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(StaticControlRenderer, _super);
    function StaticControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StaticControlRenderer = tslib_1.__decorate([
        Item_1.FormItem({
            test: function (path, schema, resolveRenderer) {
                if (/(^|\/)form(?:\/.+)?\/control\/static(\-[^\/]+)?$/.test(path)) {
                    return true;
                }
                else if (/(^|\/)form(?:\/.+)?\/control\/[^\/]+$/.test(path) &&
                    schema &&
                    schema.type &&
                    (schema.name || schema.label) &&
                    resolveRenderer &&
                    resolveRenderer(path + "/static-field/" + schema.type)) {
                    // 不一定
                    return true;
                }
                return false;
            },
            weight: -90,
            strictMode: false,
            sizeMutable: false,
            name: 'static-control'
        })
    ], StaticControlRenderer);
    return StaticControlRenderer;
}(StaticControl));
exports.StaticControlRenderer = StaticControlRenderer;
var StaticFieldRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(StaticFieldRenderer, _super);
    function StaticFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StaticFieldRenderer.prototype.render = function () {
        var _a = this.props, type = _a.type, className = _a.className, render = _a.render, style = _a.style, Component = _a.wrapperComponent, labelClassName = _a.labelClassName, value = _a.value, data = _a.data, children = _a.children, width = _a.width, inputClassName = _a.inputClassName, label = _a.label, tabIndex = _a.tabIndex, onKeyUp = _a.onKeyUp, field = _a.field, rest = tslib_1.__rest(_a, ["type", "className", "render", "style", "wrapperComponent", "labelClassName", "value", "data", "children", "width", "inputClassName", "label", "tabIndex", "onKeyUp", "field"]);
        var schema = tslib_1.__assign(tslib_1.__assign({}, field), { className: inputClassName, type: (field && field.type) || 'plain' });
        var body = children
            ? children
            : render('field', schema, tslib_1.__assign(tslib_1.__assign({}, rest), { value: value,
                data: data }));
        if (width) {
            style = style || {};
            style.width = style.width || width;
        }
        if (!Component) {
            return body;
        }
        return (react_1.default.createElement(Component, { style: style, className: className, tabIndex: tabIndex, onKeyUp: onKeyUp }, body));
    };
    StaticFieldRenderer.defaultProps = tslib_1.__assign(tslib_1.__assign({}, Table_1.TableCell.defaultProps), { wrapperComponent: 'div' });
    StaticFieldRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)static\-field$/
        }),
        QuickEdit_1.default(),
        PopOver_1.default(),
        Copyable_1.default()
    ], StaticFieldRenderer);
    return StaticFieldRenderer;
}(Table_1.TableCell));
exports.StaticFieldRenderer = StaticFieldRenderer;
//# sourceMappingURL=./renderers/Form/Static.js.map
