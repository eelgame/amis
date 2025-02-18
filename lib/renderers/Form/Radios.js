"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadiosControlRenderer = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var Radios_1 = tslib_1.__importDefault(require("../../components/Radios"));
var Options_1 = require("./Options");
var helper_1 = require("../../utils/helper");
var RadiosControl = /** @class */ (function (_super) {
    tslib_1.__extends(RadiosControl, _super);
    function RadiosControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RadiosControl.prototype.handleChange = function (option) {
        var _a = this.props, joinValues = _a.joinValues, extractValue = _a.extractValue, valueField = _a.valueField, onChange = _a.onChange;
        if (option && (joinValues || extractValue)) {
            option = option[valueField || 'value'];
        }
        onChange && onChange(option);
    };
    RadiosControl.prototype.reload = function () {
        var reload = this.props.reloadOptions;
        reload && reload();
    };
    RadiosControl.prototype.render = function () {
        var _a = this.props, className = _a.className, ns = _a.classPrefix, value = _a.value, onChange = _a.onChange, disabled = _a.disabled, joinValues = _a.joinValues, extractValue = _a.extractValue, delimiter = _a.delimiter, placeholder = _a.placeholder, options = _a.options, inline = _a.inline, formMode = _a.formMode, columnsCount = _a.columnsCount, classPrefix = _a.classPrefix, itemClassName = _a.itemClassName, labelClassName = _a.labelClassName, labelField = _a.labelField, valueField = _a.valueField, __ = _a.translate;
        return (react_1.default.createElement(Radios_1.default, { inline: inline || formMode === 'inline', className: classnames_1.default(ns + "RadiosControl", className), value: typeof value === 'undefined' || value === null ? '' : value, disabled: disabled, onChange: this.handleChange, joinValues: joinValues, extractValue: extractValue, delimiter: delimiter, labelClassName: labelClassName, labelField: labelField, valueField: valueField, placeholder: __(placeholder), options: options, columnsCount: columnsCount, classPrefix: classPrefix, itemClassName: itemClassName }));
    };
    var _a;
    RadiosControl.defaultProps = {
        columnsCount: 1
    };
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof Options_1.Option !== "undefined" && Options_1.Option) === "function" ? _a : Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], RadiosControl.prototype, "handleChange", null);
    return RadiosControl;
}(react_1.default.Component));
exports.default = RadiosControl;
var RadiosControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(RadiosControlRenderer, _super);
    function RadiosControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RadiosControlRenderer.defaultProps = {
        multiple: false
    };
    RadiosControlRenderer = tslib_1.__decorate([
        Options_1.OptionsControl({
            type: 'radios',
            sizeMutable: false
        })
    ], RadiosControlRenderer);
    return RadiosControlRenderer;
}(RadiosControl));
exports.RadiosControlRenderer = RadiosControlRenderer;
//# sourceMappingURL=./renderers/Form/Radios.js.map
