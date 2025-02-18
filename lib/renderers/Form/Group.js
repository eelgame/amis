"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlGroupRenderer = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var factory_1 = require("../../factory");
var helper_1 = require("../../utils/helper");
var Item_1 = require("./Item");
var filter_schema_1 = tslib_1.__importDefault(require("../../utils/filter-schema"));
var ControlGroupRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(ControlGroupRenderer, _super);
    function ControlGroupRenderer(props) {
        var _this = _super.call(this, props) || this;
        _this.renderInput = _this.renderInput.bind(_this);
        return _this;
    }
    ControlGroupRenderer.prototype.renderControl = function (control, index, otherProps) {
        var _a = this.props, render = _a.render, disabled = _a.disabled, data = _a.data;
        if (!control) {
            return null;
        }
        var subSchema = control && control.type === 'control'
            ? control
            : {
                type: 'control',
                control: control
            };
        if (subSchema.control) {
            var control_1 = subSchema.control;
            control_1 = subSchema.control = tslib_1.__assign(tslib_1.__assign({}, control_1), filter_schema_1.default(control_1, data));
            control_1.hiddenOn && (subSchema.hiddenOn = control_1.hiddenOn);
            control_1.visibleOn && (subSchema.visibleOn = control_1.visibleOn);
        }
        return render("" + index, subSchema, tslib_1.__assign(tslib_1.__assign({}, otherProps), { disabled: disabled }));
    };
    ControlGroupRenderer.prototype.renderVertical = function (props) {
        var _this = this;
        if (props === void 0) { props = this.props; }
        var controls = props.controls, className = props.className, cx = props.classnames, mode = props.mode, formMode = props.formMode, data = props.data;
        formMode = mode || formMode;
        return (react_1.default.createElement("div", { className: cx("Form-group Form-group--ver Form-group--" + formMode, className) }, controls.map(function (control, index) {
            if (!helper_1.isVisible(control, data)) {
                return null;
            }
            var controlMode = (control && control.mode) || formMode;
            return _this.renderControl(control, index, {
                key: index,
                formMode: controlMode
            });
        })));
    };
    ControlGroupRenderer.prototype.renderHorizontal = function (props) {
        var _this = this;
        if (props === void 0) { props = this.props; }
        var controls = props.controls, className = props.className, ns = props.classPrefix, cx = props.classnames, mode = props.mode, horizontal = props.horizontal, formMode = props.formMode, formHorizontal = props.formHorizontal, data = props.data, gap = props.gap;
        if (!Array.isArray(controls)) {
            return null;
        }
        formMode = mode || formMode;
        var horizontalDeeper = horizontal ||
            helper_1.makeHorizontalDeeper(formHorizontal, controls.filter(function (item) { return item.mode !== 'inline' && helper_1.isVisible(item, data); })
                .length);
        return (react_1.default.createElement("div", { className: cx("Form-group Form-group--hor Form-group--" + formMode, gap ? "Form-group--" + gap : '', className) }, controls.map(function (control, index) {
            if (!helper_1.isVisible(control, data)) {
                return null;
            }
            var controlMode = (control && control.mode) || formMode;
            if (controlMode === 'inline' ||
                (control && control.type === 'formula')) {
                return _this.renderControl(control, index, {
                    formMode: 'inline',
                    key: index,
                    className: cx(control.className, control.columnClassName)
                });
            }
            var columnWidth = control.columnRatio ||
                helper_1.getWidthRate(control && control.columnClassName, true);
            return (react_1.default.createElement("div", { key: index, className: cx(ns + "Form-groupColumn", columnWidth ? ns + "Form-groupColumn--" + columnWidth : '', control && control.columnClassName) }, _this.renderControl(control, index, {
                formHorizontal: horizontalDeeper,
                formMode: controlMode
            })));
        })));
    };
    ControlGroupRenderer.prototype.renderInput = function (props) {
        if (props === void 0) { props = this.props; }
        var direction = props.direction;
        return direction === 'vertical'
            ? this.renderVertical(props)
            : this.renderHorizontal(props);
    };
    ControlGroupRenderer.prototype.render = function () {
        var _a = this.props, label = _a.label, rest = tslib_1.__rest(_a, ["label"]);
        if (label) {
            return (react_1.default.createElement(Item_1.FormItemWrap, tslib_1.__assign({}, rest, { sizeMutable: false, label: label, renderControl: this.renderInput })));
        }
        return this.renderInput();
    };
    ControlGroupRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)form(?:\/.+)?\/control\/(?:\d+\/)?group$/,
            name: 'group-control'
        }),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], ControlGroupRenderer);
    return ControlGroupRenderer;
}(react_1.default.Component));
exports.ControlGroupRenderer = ControlGroupRenderer;
//# sourceMappingURL=./renderers/Form/Group.js.map
