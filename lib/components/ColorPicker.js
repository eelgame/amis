"use strict";
/**
 * @file ColorPicker
 * @description 颜色选择器组件
 * @author fex
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorControl = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_dom_1 = require("react-dom");
var react_color_1 = require("react-color");
var icons_1 = require("./icons");
var Overlay_1 = tslib_1.__importDefault(require("./Overlay"));
var uncontrollable_1 = require("uncontrollable");
var PopOver_1 = tslib_1.__importDefault(require("./PopOver"));
var theme_1 = require("../theme");
var helper_1 = require("../utils/helper");
var locale_1 = require("../locale");
var ColorControl = /** @class */ (function (_super) {
    tslib_1.__extends(ColorControl, _super);
    function ColorControl(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isOpened: false,
            isFocused: false,
            inputValue: _this.props.value || ''
        };
        _this.open = _this.open.bind(_this);
        _this.close = _this.close.bind(_this);
        _this.focus = _this.focus.bind(_this);
        _this.blur = _this.blur.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleFocus = _this.handleFocus.bind(_this);
        _this.handleBlur = _this.handleBlur.bind(_this);
        _this.clearValue = _this.clearValue.bind(_this);
        _this.handleInputChange = _this.handleInputChange.bind(_this);
        _this.handleClick = _this.handleClick.bind(_this);
        _this.preview = react_1.default.createRef();
        _this.input = react_1.default.createRef();
        return _this;
    }
    ColorControl.prototype.componentWillReceiveProps = function (nextProps) {
        var props = this.props;
        if (props.value !== nextProps.value) {
            this.setState({
                inputValue: nextProps.value || ''
            });
        }
    };
    ColorControl.prototype.handleFocus = function () {
        this.setState({
            isFocused: true
        });
    };
    ColorControl.prototype.handleBlur = function () {
        this.setState({
            isFocused: false,
            inputValue: this.props.value
        });
    };
    ColorControl.prototype.focus = function () {
        this.input.current && this.input.current.focus();
    };
    ColorControl.prototype.blur = function () {
        this.input.current && this.input.current.blur();
    };
    ColorControl.prototype.open = function (fn) {
        if (this.props.disabled) {
            return;
        }
        this.setState({
            isOpened: true
        }, fn);
    };
    ColorControl.prototype.close = function () {
        this.setState({
            isOpened: false
        });
    };
    ColorControl.prototype.clearValue = function () {
        var _a = this.props, onChange = _a.onChange, resetValue = _a.resetValue;
        onChange(resetValue || '');
    };
    ColorControl.prototype.handleClick = function () {
        this.state.isOpened ? this.close() : this.open(this.focus);
    };
    ColorControl.prototype.handleInputChange = function (e) {
        var _this = this;
        if (!this.props.allowCustomColor) {
            return;
        }
        var onChange = this.props.onChange;
        this.setState({
            inputValue: e.currentTarget.value
        }, function () {
            var isValidated = _this.validateColor(_this.state.inputValue);
            if (isValidated) {
                onChange(_this.state.inputValue);
            }
        });
    };
    ColorControl.prototype.validateColor = function (value) {
        if (value === '') {
            return false;
        }
        if (value === 'inherit') {
            return false;
        }
        if (value === 'transparent') {
            return false;
        }
        var image = document.createElement('img');
        image.style.color = 'rgb(0, 0, 0)';
        image.style.color = value;
        if (image.style.color !== 'rgb(0, 0, 0)') {
            return true;
        }
        image.style.color = 'rgb(255, 255, 255)';
        image.style.color = value;
        return image.style.color !== 'rgb(255, 255, 255)';
    };
    ColorControl.prototype.handleChange = function (color) {
        var _a = this.props, onChange = _a.onChange, format = _a.format
        // closeOnSelect
        ;
        if (format === 'rgba') {
            onChange("rgba(" + color.rgb.r + ", " + color.rgb.g + ", " + color.rgb.b + ", " + color.rgb.a + ")");
        }
        else if (format === 'rgb') {
            onChange("rgb(" + color.rgb.r + ", " + color.rgb.g + ", " + color.rgb.b + ")");
        }
        else if (format === 'hsl') {
            onChange("hsl(" + Math.round(color.hsl.h) + ", " + Math.round(color.hsl.s * 100) + "%, " + Math.round(color.hsl.l * 100) + "%)");
        }
        else {
            onChange(color.hex);
        }
        // closeOnSelect && this.close();
    };
    ColorControl.prototype.render = function () {
        var _this = this;
        var _a = this.props, ns = _a.classPrefix, className = _a.className, value = _a.value, placeholder = _a.placeholder, disabled = _a.disabled, popOverContainer = _a.popOverContainer, format = _a.format, clearable = _a.clearable, placement = _a.placement, cx = _a.classnames, presetColors = _a.presetColors, allowCustomColor = _a.allowCustomColor;
        var __ = this.props.translate;
        var isOpened = this.state.isOpened;
        var isFocused = this.state.isFocused;
        return (react_1.default.createElement("div", { className: cx("ColorPicker", {
                'is-disabled': disabled,
                'is-focused': isFocused
            }, className) },
            react_1.default.createElement("input", { ref: this.input, type: "text", autoComplete: "off", size: 10, className: cx('ColorPicker-input'), value: this.state.inputValue || '', placeholder: __(placeholder), disabled: disabled, onChange: this.handleInputChange, onFocus: this.handleFocus, onBlur: this.handleBlur, onClick: this.handleClick }),
            clearable && !disabled && value ? (react_1.default.createElement("a", { onClick: this.clearValue, className: cx('ColorPicker-clear') },
                react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))) : null,
            react_1.default.createElement("span", { onClick: this.handleClick, className: cx('ColorPicker-preview') },
                react_1.default.createElement("i", { ref: this.preview, className: ns + "ColorPicker-previewIcon", style: { background: this.state.inputValue || '#ccc' } })),
            isOpened ? (react_1.default.createElement(Overlay_1.default, { placement: placement || 'auto', target: function () { return react_dom_1.findDOMNode(_this); }, onHide: this.close, container: popOverContainer || (function () { return react_dom_1.findDOMNode(_this); }), rootClose: false, show: true },
                react_1.default.createElement(PopOver_1.default, { classPrefix: ns, className: cx('ColorPicker-popover'), onHide: this.close, overlay: true }, allowCustomColor ? (react_1.default.createElement(react_color_1.SketchPicker, { disableAlpha: !!~['rgb', 'hex'].indexOf(format), color: value, presetColors: presetColors, onChangeComplete: this.handleChange })) : (react_1.default.createElement(react_color_1.GithubPicker, { color: value, colors: presetColors, onChangeComplete: this.handleChange }))))) : null));
    };
    ColorControl.defaultProps = {
        format: 'hex',
        clearable: true,
        placeholder: 'ColorPicker.placeholder',
        allowCustomColor: true
        // closeOnSelect: true
    };
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ColorControl.prototype, "validateColor", null);
    return ColorControl;
}(react_1.default.PureComponent));
exports.ColorControl = ColorControl;
exports.default = theme_1.themeable(locale_1.localeable(uncontrollable_1.uncontrollable(ColorControl, {
    value: 'onChange'
})));
//# sourceMappingURL=./components/ColorPicker.js.map
