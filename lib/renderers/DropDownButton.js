"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropDownButtonRenderer = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var factory_1 = require("../factory");
var react_overlays_1 = require("react-overlays");
var Overlay_1 = tslib_1.__importDefault(require("../components/Overlay"));
var PopOver_1 = tslib_1.__importDefault(require("../components/PopOver"));
var TooltipWrapper_1 = tslib_1.__importDefault(require("../components/TooltipWrapper"));
var helper_1 = require("../utils/helper");
var tpl_1 = require("../utils/tpl");
var icons_1 = require("../components/icons");
var DropDownButton = /** @class */ (function (_super) {
    tslib_1.__extends(DropDownButton, _super);
    function DropDownButton(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isOpened: false
        };
        _this.open = _this.open.bind(_this);
        _this.close = _this.close.bind(_this);
        _this.toogle = _this.toogle.bind(_this);
        _this.domRef = _this.domRef.bind(_this);
        return _this;
    }
    DropDownButton.prototype.componentDidMount = function () {
        if (this.props.defaultIsOpened) {
            this.setState({
                isOpened: true
            });
        }
    };
    DropDownButton.prototype.domRef = function (ref) {
        this.target = ref;
    };
    DropDownButton.prototype.toogle = function (e) {
        e.preventDefault();
        this.setState({
            isOpened: !this.state.isOpened
        });
    };
    DropDownButton.prototype.open = function () {
        this.setState({
            isOpened: true
        });
    };
    DropDownButton.prototype.close = function () {
        this.setState({
            isOpened: false
        });
    };
    DropDownButton.prototype.renderOuter = function () {
        var _this = this;
        var _a;
        var _b = this.props, render = _b.render, buttons = _b.buttons, data = _b.data, popOverContainer = _b.popOverContainer, cx = _b.classnames, ns = _b.classPrefix, children = _b.children, align = _b.align, closeOnClick = _b.closeOnClick, closeOnOutside = _b.closeOnOutside;
        var body = (react_1.default.createElement(react_overlays_1.RootCloseWrapper, { disabled: !this.state.isOpened, onRootClose: closeOnOutside !== false ? this.close : helper_1.noop },
            react_1.default.createElement("ul", { className: cx('DropDown-menu'), onClick: closeOnClick ? this.close : helper_1.noop }, children
                ? children
                : Array.isArray(buttons)
                    ? buttons.map(function (button, index) {
                        if (typeof button !== 'string' && !helper_1.isVisible(button, data)) {
                            return null;
                        }
                        else if (button === 'divider' || button.type === 'divider') {
                            return react_1.default.createElement("li", { key: index, className: cx('DropDown-divider') });
                        }
                        return (react_1.default.createElement("li", { key: index, className: helper_1.isDisabled(button, data) ? 'is-disabled' : '' }, render("button/" + index, tslib_1.__assign(tslib_1.__assign({ type: 'button' }, button), { isMenuItem: true }))));
                    })
                    : null)));
        if (popOverContainer) {
            return (react_1.default.createElement(Overlay_1.default, { container: popOverContainer, target: function () { return _this.target; }, show: true },
                react_1.default.createElement(PopOver_1.default, { overlay: true, onHide: this.close, classPrefix: ns, className: cx('DropDown-popover'), style: { minWidth: (_a = this.target) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect().width } }, body)));
        }
        return body;
    };
    DropDownButton.prototype.render = function () {
        var _a = this.props, tooltip = _a.tooltip, placement = _a.placement, tooltipContainer = _a.tooltipContainer, tooltipTrigger = _a.tooltipTrigger, tooltipRootClose = _a.tooltipRootClose, disabledTip = _a.disabledTip, block = _a.block, disabled = _a.disabled, btnDisabled = _a.btnDisabled, size = _a.size, label = _a.label, level = _a.level, primary = _a.primary, className = _a.className, cx = _a.classnames, align = _a.align, iconOnly = _a.iconOnly, icon = _a.icon, data = _a.data;
        return (react_1.default.createElement("div", { className: cx('DropDown ', {
                'DropDown--block': block,
                'DropDown--alignRight': align === 'right',
                'is-opened': this.state.isOpened
            }), ref: this.domRef },
            react_1.default.createElement(TooltipWrapper_1.default, { placement: placement, tooltip: disabled ? disabledTip : tooltip, container: tooltipContainer, trigger: tooltipTrigger, rootClose: tooltipRootClose },
                react_1.default.createElement("button", { onClick: this.toogle, disabled: disabled || btnDisabled, className: cx('Button', className, typeof level === 'undefined'
                        ? 'Button--default'
                        : level
                            ? "Button--" + level
                            : '', {
                        'Button--block': block,
                        'Button--primary': primary,
                        'Button--iconOnly': iconOnly
                    }, size ? "Button--" + size : '') },
                    icon ? (typeof icon === 'string' ? (react_1.default.createElement("i", { className: cx(icon, 'm-r-xs') })) : (icon)) : null,
                    typeof label === 'string' ? tpl_1.filter(label, data) : label,
                    react_1.default.createElement("span", { className: cx('DropDown-caret') },
                        react_1.default.createElement(icons_1.Icon, { icon: "caret", className: "icon" })))),
            this.state.isOpened ? this.renderOuter() : null));
    };
    DropDownButton.defaultProps = {
        placement: 'top',
        tooltipTrigger: ['hover', 'focus'],
        tooltipRootClose: false
    };
    return DropDownButton;
}(react_1.default.Component));
exports.default = DropDownButton;
var DropDownButtonRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(DropDownButtonRenderer, _super);
    function DropDownButtonRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DropDownButtonRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)dropdown-button$/,
            name: 'dropdown-button'
        })
    ], DropDownButtonRenderer);
    return DropDownButtonRenderer;
}(DropDownButton));
exports.DropDownButtonRenderer = DropDownButtonRenderer;
//# sourceMappingURL=./renderers/DropDownButton.js.map
