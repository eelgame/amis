"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonGroupControlRenderer = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var Options_1 = require("./Options");
var helper_1 = require("../../utils/helper");
var ButtonGroupControl = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonGroupControl, _super);
    function ButtonGroupControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonGroupControl.prototype.handleToggle = function (option) {
        var _a = this.props, onToggle = _a.onToggle, multiple = _a.multiple, autoFill = _a.autoFill, onBulkChange = _a.onBulkChange;
        onToggle(option);
    };
    ButtonGroupControl.prototype.reload = function () {
        var reload = this.props.reloadOptions;
        reload && reload();
    };
    ButtonGroupControl.prototype.render = function (props) {
        var _a;
        var _this = this;
        if (props === void 0) { props = this.props; }
        var render = props.render, ns = props.classPrefix, cx = props.classnames, className = props.className, disabled = props.disabled, options = props.options, value = props.value, labelField = props.labelField, placeholder = props.placeholder, btnClassName = props.btnClassName, btnActiveClassName = props.btnActiveClassName, selectedOptions = props.selectedOptions, buttons = props.buttons, size = props.size, block = props.block, vertical = props.vertical;
        var body = [];
        var btnLevel = props.btnLevel;
        var btnActiveLevel = props.btnActiveLevel;
        btnClassName && (btnLevel = helper_1.getLevelFromClassName(btnClassName));
        btnActiveClassName &&
            (btnActiveLevel = helper_1.getLevelFromClassName(btnActiveClassName));
        if (options && options.length) {
            body = options.map(function (option, key) {
                var active = !!~selectedOptions.indexOf(option);
                return render("option/" + key, {
                    label: option[labelField || 'label'],
                    icon: option.icon,
                    size: option.size || size,
                    type: 'button',
                    block: block
                }, {
                    key: key,
                    active: active,
                    level: (active ? btnActiveLevel : '') || option.level || btnLevel,
                    className: cx(option.className, btnClassName),
                    disabled: option.disabled || disabled,
                    onClick: function (e) {
                        _this.handleToggle(option);
                        e.preventDefault(); // 禁止 onAction 触发
                    }
                });
            });
        }
        else if (Array.isArray(buttons)) {
            body = buttons.map(function (button, key) {
                return render("button/" + key, tslib_1.__assign({ size: size, block: block, activeLevel: btnActiveLevel }, button), {
                    key: key,
                    className: cx(button.className, btnClassName)
                });
            });
        }
        return (react_1.default.createElement("div", { className: cx("ButtonGroup", (_a = {
                    'ButtonGroup--block': block,
                    'ButtonGroup--vertical': vertical
                },
                _a["ButtonGroup--" + size] = size,
                _a), className) }, body.length ? (body) : (react_1.default.createElement("span", { className: ns + "ButtonGroup-placeholder" }, placeholder))));
    };
    var _a;
    ButtonGroupControl.defaultProps = {
        btnLevel: 'default',
        btnActiveLevel: 'primary',
        clearable: false,
        vertical: false
    };
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof Options_1.Option !== "undefined" && Options_1.Option) === "function" ? _a : Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ButtonGroupControl.prototype, "handleToggle", null);
    return ButtonGroupControl;
}(react_1.default.Component));
exports.default = ButtonGroupControl;
var ButtonGroupControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonGroupControlRenderer, _super);
    function ButtonGroupControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonGroupControlRenderer.prototype.render = function () {
        var _a = this.props, className = _a.className, cx = _a.classnames, rest = tslib_1.__rest(_a, ["className", "classnames"]);
        var body = _super.prototype.render.call(this, tslib_1.__assign(tslib_1.__assign({}, rest), { classnames: cx }));
        return react_1.default.createElement("div", { className: cx('ButtonGroupControl', className) }, body);
    };
    ButtonGroupControlRenderer = tslib_1.__decorate([
        Options_1.OptionsControl({
            type: 'button-group',
            sizeMutable: false,
            strictMode: false
        })
    ], ButtonGroupControlRenderer);
    return ButtonGroupControlRenderer;
}(ButtonGroupControl));
exports.ButtonGroupControlRenderer = ButtonGroupControlRenderer;
//# sourceMappingURL=./renderers/Form/ButtonGroup.js.map
