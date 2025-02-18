"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberInput = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
// @ts-ignore
var rc_input_number_1 = tslib_1.__importDefault(require("rc-input-number"));
var theme_1 = require("../theme");
var NumberInput = /** @class */ (function (_super) {
    tslib_1.__extends(NumberInput, _super);
    function NumberInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NumberInput.prototype.render = function () {
        var _a = this.props, className = _a.className, ns = _a.classPrefix, cx = _a.classnames, value = _a.value, step = _a.step, precision = _a.precision, max = _a.max, min = _a.min, disabled = _a.disabled, placeholder = _a.placeholder, onChange = _a.onChange, showSteps = _a.showSteps;
        var precisionProps = {};
        if (typeof precision === 'number') {
            precisionProps.precision = precision;
        }
        return (react_1.default.createElement(rc_input_number_1.default, tslib_1.__assign({ className: cx(className, showSteps === false ? 'no-steps' : ''), prefixCls: ns + "Number", value: value, step: step, max: max, min: min, onChange: onChange, disabled: disabled, placeholder: placeholder }, precisionProps)));
    };
    NumberInput.defaultProps = {
        step: 1
    };
    return NumberInput;
}(react_1.default.Component));
exports.NumberInput = NumberInput;
exports.default = theme_1.themeable(NumberInput);
//# sourceMappingURL=./components/NumberInput.js.map
