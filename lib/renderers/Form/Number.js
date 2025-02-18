"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberControlRenderer = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var Item_1 = require("./Item");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var tpl_1 = require("../../utils/tpl");
var NumberInput_1 = tslib_1.__importDefault(require("../../components/NumberInput"));
var NumberControl = /** @class */ (function (_super) {
    tslib_1.__extends(NumberControl, _super);
    function NumberControl(props) {
        var _this = _super.call(this, props) || this;
        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }
    NumberControl.prototype.handleChange = function (inputValue) {
        var _a = this.props, ns = _a.classPrefix, onChange = _a.onChange, resetValue = _a.resetValue;
        if (inputValue && typeof inputValue !== 'number') {
            return;
        }
        onChange(inputValue === null ? resetValue !== null && resetValue !== void 0 ? resetValue : null : inputValue);
    };
    NumberControl.prototype.filterNum = function (value) {
        if (typeof value !== 'number') {
            value = tpl_1.filter(value, this.props.data);
            value = /^[-]?\d+/.test(value) ? parseInt(value, 10) : undefined;
        }
        return value;
    };
    NumberControl.prototype.render = function () {
        var _a = this.props, className = _a.className, ns = _a.classPrefix, value = _a.value, step = _a.step, precision = _a.precision, max = _a.max, min = _a.min, disabled = _a.disabled, placeholder = _a.placeholder, showSteps = _a.showSteps;
        var precisionProps = {};
        var finalPrecision = this.filterNum(precision);
        if (typeof finalPrecision === 'number') {
            precisionProps.precision = finalPrecision;
        }
        return (react_1.default.createElement("div", { className: classnames_1.default(ns + "NumberControl", className) },
            react_1.default.createElement(NumberInput_1.default, { value: value, step: step, max: this.filterNum(max), min: this.filterNum(min), onChange: this.handleChange, disabled: disabled, placeholder: placeholder, precision: finalPrecision, showSteps: showSteps })));
    };
    NumberControl.defaultProps = {
        step: 1,
        resetValue: ''
    };
    return NumberControl;
}(react_1.default.Component));
exports.default = NumberControl;
var NumberControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(NumberControlRenderer, _super);
    function NumberControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NumberControlRenderer.defaultProps = {
        validations: 'isNumeric'
    };
    NumberControlRenderer = tslib_1.__decorate([
        Item_1.FormItem({
            type: 'number'
        })
    ], NumberControlRenderer);
    return NumberControlRenderer;
}(NumberControl));
exports.NumberControlRenderer = NumberControlRenderer;
//# sourceMappingURL=./renderers/Form/Number.js.map
