"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextAreaControlRenderer = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var Item_1 = require("./Item");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var Textarea_1 = tslib_1.__importDefault(require("../../components/Textarea"));
var react_dom_1 = require("react-dom");
var helper_1 = require("../../utils/helper");
var TextAreaControl = /** @class */ (function (_super) {
    tslib_1.__extends(TextAreaControl, _super);
    function TextAreaControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputRef = function (ref) { return (_this.input = react_dom_1.findDOMNode(ref)); };
        return _this;
    }
    TextAreaControl.prototype.focus = function () {
        if (!this.input) {
            return;
        }
        this.input.focus();
        // 光标放到最后
        var len = this.input.value.length;
        len && this.input.setSelectionRange(len, len);
    };
    TextAreaControl.prototype.handleChange = function (e) {
        var onChange = this.props.onChange;
        var value = e.currentTarget.value;
        onChange(value);
    };
    TextAreaControl.prototype.handleFocus = function (e) {
        var onFocus = this.props.onFocus;
        onFocus && onFocus(e);
    };
    TextAreaControl.prototype.handleBlur = function (e) {
        var _a = this.props, onBlur = _a.onBlur, trimContents = _a.trimContents, value = _a.value, onChange = _a.onChange;
        if (trimContents && value && typeof value === 'string') {
            onChange(value.trim());
        }
        onBlur && onBlur(e);
    };
    TextAreaControl.prototype.render = function () {
        var _a = this.props, className = _a.className, ns = _a.classPrefix, value = _a.value, type = _a.type, placeholder = _a.placeholder, disabled = _a.disabled, minRows = _a.minRows, maxRows = _a.maxRows, readOnly = _a.readOnly, name = _a.name;
        return (react_1.default.createElement(Textarea_1.default, { autoComplete: "off", ref: this.inputRef, name: name, disabled: disabled, type: type, className: classnames_1.default(ns + "TextareaControl", className), value: typeof value === 'undefined' || value === null
                ? ''
                : typeof value === 'string'
                    ? value
                    : JSON.stringify(value), placeholder: placeholder, autoCorrect: "off", spellCheck: "false", readOnly: readOnly, minRows: minRows, maxRows: maxRows, onChange: this.handleChange, onFocus: this.handleFocus, onBlur: this.handleBlur }));
    };
    var _a, _b, _c;
    TextAreaControl.defaultProps = {
        minRows: 3,
        maxRows: 20
    };
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof react_1.default !== "undefined" && react_1.default.ChangeEvent) === "function" ? _a : Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TextAreaControl.prototype, "handleChange", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof react_1.default !== "undefined" && react_1.default.FocusEvent) === "function" ? _b : Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TextAreaControl.prototype, "handleFocus", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof react_1.default !== "undefined" && react_1.default.FocusEvent) === "function" ? _c : Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TextAreaControl.prototype, "handleBlur", null);
    return TextAreaControl;
}(react_1.default.Component));
exports.default = TextAreaControl;
var TextAreaControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(TextAreaControlRenderer, _super);
    function TextAreaControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextAreaControlRenderer = tslib_1.__decorate([
        Item_1.FormItem({
            type: 'textarea'
        })
    ], TextAreaControlRenderer);
    return TextAreaControlRenderer;
}(TextAreaControl));
exports.TextAreaControlRenderer = TextAreaControlRenderer;
//# sourceMappingURL=./renderers/Form/Textarea.js.map
