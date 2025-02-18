"use strict";
/**
 * @file Modal
 * @description
 * @author fex
 */
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modal = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var Transition_1 = tslib_1.__importStar(require("react-transition-group/Transition"));
var react_overlays_1 = require("react-overlays");
var ModalManager_1 = require("./ModalManager");
var theme_1 = require("../theme");
var icons_1 = require("./icons");
var locale_1 = require("../locale");
var fadeStyles = (_a = {},
    _a[Transition_1.ENTERING] = 'in',
    _a[Transition_1.ENTERED] = 'in',
    _a[Transition_1.EXITING] = 'out',
    _a);
var Modal = /** @class */ (function (_super) {
    tslib_1.__extends(Modal, _super);
    function Modal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
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
            var onExited = _this.props.onExited;
            onExited && onExited();
            setTimeout(function () {
                if (!document.querySelector('.amis-dialog-widget')) {
                    document.body.classList.remove("is-modalOpened");
                    document.body.classList.remove("has-scrollbar");
                }
            }, 200);
        };
        _this.modalRef = function (ref) {
            var ns = _this.props.classPrefix;
            if (ref) {
                ModalManager_1.addModal(_this);
                ref.classList.add(ns + "Modal--" + ModalManager_1.current() + "th");
            }
            else {
                ModalManager_1.removeModal();
            }
        };
        return _this;
    }
    Modal.prototype.componentDidMount = function () {
        if (this.props.show) {
            this.handleEnter();
            this.handleEntered();
        }
    };
    Modal.prototype.componentWillUnmount = function () {
        if (this.props.show) {
            this.handleExited();
        }
    };
    Modal.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, contentClassName = _a.contentClassName, children = _a.children, container = _a.container, show = _a.show, size = _a.size, overlay = _a.overlay, cx = _a.classnames;
        return (react_1.default.createElement(Transition_1.default, { mountOnEnter: true, unmountOnExit: true, in: show, timeout: 500, onEnter: this.handleEnter, onExited: this.handleExited, onEntered: this.handleEntered }, function (status) {
            var _a;
            return (react_1.default.createElement(react_overlays_1.Portal, { container: container },
                react_1.default.createElement("div", { ref: _this.modalRef, role: "dialog", className: cx("amis-dialog-widget Modal", (_a = {},
                        _a["Modal--" + size] = size,
                        _a), className) },
                    overlay ? (react_1.default.createElement("div", { className: cx("Modal-overlay", fadeStyles[status]) })) : null,
                    react_1.default.createElement("div", { className: cx("Modal-content", contentClassName, fadeStyles[status]) }, children))));
        }));
    };
    Modal.defaultProps = {
        container: document.body,
        size: '',
        overlay: true
    };
    Modal.Header = theme_1.themeable(locale_1.localeable(function (_a) {
        var cx = _a.classnames, className = _a.className, showCloseButton = _a.showCloseButton, onClose = _a.onClose, children = _a.children, classPrefix = _a.classPrefix, __ = _a.translate, rest = tslib_1.__rest(_a, ["classnames", "className", "showCloseButton", "onClose", "children", "classPrefix", "translate"]);
        return (react_1.default.createElement("div", tslib_1.__assign({}, rest, { className: cx('Modal-header', className) }),
            showCloseButton !== false ? (react_1.default.createElement("a", { "data-tooltip": __('Dialog.close'), "data-position": "left", onClick: onClose, className: cx('Modal-close') },
                react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))) : null,
            children));
    }));
    Modal.Title = theme_1.themeable(function (_a) {
        var cx = _a.classnames, className = _a.className, children = _a.children, classPrefix = _a.classPrefix, rest = tslib_1.__rest(_a, ["classnames", "className", "children", "classPrefix"]);
        return (react_1.default.createElement("div", tslib_1.__assign({}, rest, { className: cx('Modal-title', className) }), children));
    });
    Modal.Body = theme_1.themeable(function (_a) {
        var cx = _a.classnames, className = _a.className, children = _a.children, classPrefix = _a.classPrefix, rest = tslib_1.__rest(_a, ["classnames", "className", "children", "classPrefix"]);
        return (react_1.default.createElement("div", tslib_1.__assign({}, rest, { className: cx('Modal-body', className) }), children));
    });
    Modal.Footer = theme_1.themeable(function (_a) {
        var cx = _a.classnames, className = _a.className, children = _a.children, classPrefix = _a.classPrefix, rest = tslib_1.__rest(_a, ["classnames", "className", "children", "classPrefix"]);
        return (react_1.default.createElement("div", tslib_1.__assign({}, rest, { className: cx('Modal-footer', className) }), children));
    });
    return Modal;
}(react_1.default.Component));
exports.Modal = Modal;
var FinalModal = theme_1.themeable(locale_1.localeable(Modal));
exports.default = FinalModal;
//# sourceMappingURL=./components/Modal.js.map
