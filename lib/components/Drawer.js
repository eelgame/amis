"use strict";
/**
 * @file Drawer
 * @description
 * @author fex
 */
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Drawer = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var Transition_1 = tslib_1.__importStar(require("react-transition-group/Transition"));
var react_overlays_1 = require("react-overlays");
var icons_1 = require("./icons");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var ModalManager_1 = require("./ModalManager");
var theme_1 = require("../theme");
var helper_1 = require("../utils/helper");
var fadeStyles = (_a = {},
    _a[Transition_1.ENTERING] = 'in',
    _a[Transition_1.ENTERED] = 'in',
    _a);
var Drawer = /** @class */ (function (_super) {
    tslib_1.__extends(Drawer, _super);
    function Drawer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isRootClosed = false;
        _this.contentRef = function (ref) { return (_this.contentDom = ref); };
        _this.handleEnter = function () {
            document.body.classList.add("is-modalOpened");
            if (document.body.scrollHeight > window.innerHeight) {
                document.body.classList.add("has-scrollbar");
            }
        };
        _this.handleEntered = function () {
            var onEntered = _this.props.onEntered;
            onEntered && onEntered();
        };
        _this.handleExited = function () {
            var _a, _b;
            var onExited = _this.props.onExited;
            document.activeElement && ((_b = (_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.blur) === null || _b === void 0 ? void 0 : _b.call(_a));
            onExited && onExited();
            setTimeout(function () {
                if (!document.querySelector('.amis-dialog-widget')) {
                    document.body.classList.remove("is-modalOpened");
                    document.body.classList.remove("has-scrollbar");
                }
            }, 200);
        };
        _this.modalRef = function (ref) {
            _this.modalDom = ref;
            if (ref) {
                ModalManager_1.addModal(_this);
                ref.classList.add(_this.props.classPrefix + "Modal--" + ModalManager_1.current() + "th");
            }
            else {
                ModalManager_1.removeModal();
            }
        };
        return _this;
    }
    Drawer.prototype.componentDidMount = function () {
        if (this.props.show) {
            this.handleEntered();
        }
        document.body.addEventListener('click', this.handleRootClickCapture, true);
        document.body.addEventListener('click', this.handleRootClick);
    };
    Drawer.prototype.componentWillUnmount = function () {
        if (this.props.show) {
            this.handleExited();
        }
        document.body.removeEventListener('click', this.handleRootClick);
        document.body.removeEventListener('click', this.handleRootClickCapture, true);
    };
    Drawer.prototype.handleRootClickCapture = function (e) {
        var target = e.target;
        var _a = this.props, closeOnOutside = _a.closeOnOutside, ns = _a.classPrefix;
        var isLeftButton = (e.button === 1 && window.event !== null) || e.button === 0;
        this.isRootClosed = !!(isLeftButton &&
            closeOnOutside &&
            target &&
            this.modalDom &&
            ((!this.modalDom.contains(target) && !target.closest('[role=dialog]')) ||
                (target.matches("." + ns + "Drawer-overlay") &&
                    target.parentElement === this.modalDom))); // 干脆过滤掉来自弹框里面的点击
    };
    Drawer.prototype.handleRootClick = function (e) {
        var onHide = this.props.onHide;
        this.isRootClosed && !e.defaultPrevented && onHide(e);
    };
    Drawer.prototype.render = function () {
        var _this = this;
        var _a = this.props, ns = _a.classPrefix, className = _a.className, children = _a.children, container = _a.container, show = _a.show, position = _a.position, size = _a.size, onHide = _a.onHide, disabled = _a.disabled, overlay = _a.overlay, bodyClassName = _a.bodyClassName;
        return (react_1.default.createElement(react_overlays_1.Portal, { container: container },
            react_1.default.createElement(Transition_1.default, { mountOnEnter: true, unmountOnExit: true, in: show, timeout: 500, onEnter: this.handleEnter, onExited: this.handleExited, onEntered: this.handleEntered }, function (status) {
                var _a;
                if (status === Transition_1.ENTERING) {
                    // force reflow
                    // 由于从 mount 进来到加上 in 这个 class 估计是时间太短，上次的样式还没应用进去，所以这里强制reflow一把。
                    // 否则看不到动画。
                    _this.contentDom.offsetWidth;
                }
                return (react_1.default.createElement("div", { ref: _this.modalRef, role: "dialog", className: classnames_1.default("amis-dialog-widget " + ns + "Drawer", (_a = {},
                        _a[ns + "Drawer--" + position] = position,
                        _a[ns + "Drawer--" + size] = size,
                        _a[ns + "Drawer--noOverlay"] = !overlay,
                        _a), className) },
                    overlay ? (react_1.default.createElement("div", { className: classnames_1.default(ns + "Drawer-overlay", fadeStyles[status]) })) : null,
                    react_1.default.createElement("div", { ref: _this.contentRef, className: classnames_1.default(ns + "Drawer-content", bodyClassName, fadeStyles[status]) },
                        react_1.default.createElement("a", { onClick: disabled ? undefined : onHide, className: ns + "Drawer-close" },
                            react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" })),
                        children)));
            })));
    };
    var _b, _c;
    Drawer.defaultProps = {
        container: document.body,
        position: 'left',
        size: 'md',
        overlay: true
    };
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof MouseEvent !== "undefined" && MouseEvent) === "function" ? _b : Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], Drawer.prototype, "handleRootClickCapture", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof MouseEvent !== "undefined" && MouseEvent) === "function" ? _c : Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], Drawer.prototype, "handleRootClick", null);
    return Drawer;
}(react_1.default.Component));
exports.Drawer = Drawer;
exports.default = theme_1.themeable(Drawer);
//# sourceMappingURL=./components/Drawer.js.map
