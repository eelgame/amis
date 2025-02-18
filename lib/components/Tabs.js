"use strict";
/**
 * @file Tabs
 * @description 选项卡
 * @author fex
 */
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tabs = exports.Tab = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var Transition_1 = tslib_1.__importStar(require("react-transition-group/Transition"));
var theme_1 = require("../theme");
var uncontrollable_1 = require("uncontrollable");
var icon_1 = require("../utils/icon");
var transitionStyles = (_a = {},
    _a[Transition_1.ENTERING] = 'in',
    _a[Transition_1.ENTERED] = 'in',
    _a);
var TabComponent = /** @class */ (function (_super) {
    tslib_1.__extends(TabComponent, _super);
    function TabComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.contentRef = function (ref) { return (_this.contentDom = ref); };
        return _this;
    }
    TabComponent.prototype.render = function () {
        var _this = this;
        var _a = this.props, cx = _a.classnames, mountOnEnter = _a.mountOnEnter, reload = _a.reload, unmountOnExit = _a.unmountOnExit, eventKey = _a.eventKey, activeKey = _a.activeKey, children = _a.children, className = _a.className;
        return (react_1.default.createElement(Transition_1.default, { in: activeKey === eventKey, mountOnEnter: mountOnEnter, unmountOnExit: typeof reload === 'boolean' ? reload : unmountOnExit, timeout: 500 }, function (status) {
            if (status === Transition_1.ENTERING) {
                _this.contentDom.offsetWidth;
            }
            return (react_1.default.createElement("div", { ref: _this.contentRef, className: cx(transitionStyles[status], activeKey === eventKey ? 'is-active' : '', 'Tabs-pane', className) }, children));
        }));
    };
    return TabComponent;
}(react_1.default.PureComponent));
exports.Tab = theme_1.themeable(TabComponent);
var Tabs = /** @class */ (function (_super) {
    tslib_1.__extends(Tabs, _super);
    function Tabs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tabs.prototype.handleSelect = function (key) {
        var onSelect = this.props.onSelect;
        onSelect && onSelect(key);
    };
    Tabs.prototype.renderNav = function (child, index) {
        var _this = this;
        if (!child) {
            return;
        }
        var _a = this.props, cx = _a.classnames, activeKeyProp = _a.activeKey, mode = _a.mode;
        var _b = child.props, eventKey = _b.eventKey, disabled = _b.disabled, icon = _b.icon, iconPosition = _b.iconPosition, title = _b.title, toolbar = _b.toolbar;
        var activeKey = activeKeyProp === undefined && index === 0 ? eventKey : activeKeyProp;
        var iconElement = icon_1.generateIcon(cx, icon, 'Icon');
        return (react_1.default.createElement("li", { className: cx('Tabs-link', activeKey === eventKey ? 'is-active' : '', disabled ? 'is-disabled' : ''), key: index, onClick: function () { return (disabled ? '' : _this.handleSelect(eventKey)); } },
            react_1.default.createElement("a", null,
                icon ? (iconPosition === 'right' ? (react_1.default.createElement(react_1.default.Fragment, null,
                    title,
                    " ",
                    iconElement)) : (react_1.default.createElement(react_1.default.Fragment, null,
                    iconElement,
                    " ",
                    title))) : (title),
                react_1.default.isValidElement(toolbar) ? toolbar : null),
            mode === 'chrome' ? (react_1.default.createElement("div", { className: "chrome-tab-background" },
                react_1.default.createElement("svg", { version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
                    react_1.default.createElement("defs", null,
                        react_1.default.createElement("symbol", { id: "chrome-tab-geometry-left", viewBox: "0 0 214 36" },
                            react_1.default.createElement("path", { d: "M17 0h197v36H0v-2c4.5 0 9-3.5 9-8V8c0-4.5 3.5-8 8-8z" })),
                        react_1.default.createElement("symbol", { id: "chrome-tab-geometry-right", viewBox: "0 0 214 36" },
                            react_1.default.createElement("use", { href: "#chrome-tab-geometry-left" })),
                        react_1.default.createElement("clipPath", { id: "crop" },
                            react_1.default.createElement("rect", { className: "mask", width: "100%", height: "100%", x: "0" }))),
                    react_1.default.createElement("svg", { width: "52%", height: "100%" },
                        react_1.default.createElement("use", { href: "#chrome-tab-geometry-left", width: "214", height: "36", className: "chrome-tab-geometry" })),
                    react_1.default.createElement("g", { transform: "scale(-1, 1)" },
                        react_1.default.createElement("svg", { width: "52%", height: "100%", x: "-100%", y: "0" },
                            react_1.default.createElement("use", { href: "#chrome-tab-geometry-right", width: "214", height: "36", className: "chrome-tab-geometry" })))))) : null));
    };
    Tabs.prototype.renderTab = function (child, index) {
        if (!child) {
            return;
        }
        var _a = this.props, activeKeyProp = _a.activeKey, classnames = _a.classnames;
        var eventKey = child.props.eventKey;
        var activeKey = activeKeyProp === undefined && index === 0 ? eventKey : activeKeyProp;
        return react_1.default.cloneElement(child, tslib_1.__assign(tslib_1.__assign({}, child.props), { key: index, classnames: classnames, activeKey: activeKey }));
    };
    Tabs.prototype.render = function () {
        var _a;
        var _this = this;
        var _b = this.props, cx = _b.classnames, contentClassName = _b.contentClassName, className = _b.className, dMode = _b.mode, tabsMode = _b.tabsMode, children = _b.children, additionBtns = _b.additionBtns, toolbar = _b.toolbar;
        if (!Array.isArray(children)) {
            return null;
        }
        var mode = tabsMode || dMode;
        return (react_1.default.createElement("div", { className: cx("Tabs", (_a = {},
                _a["Tabs--" + mode] = mode,
                _a), className) },
            react_1.default.createElement("ul", { className: cx('Tabs-links'), role: "tablist" },
                children.map(function (tab, index) { return _this.renderNav(tab, index); }),
                additionBtns,
                toolbar),
            react_1.default.createElement("div", { className: cx('Tabs-content', contentClassName) }, children.map(function (child, index) {
                return _this.renderTab(child, index);
            }))));
    };
    Tabs.defaultProps = {
        mode: '',
        contentClassName: ''
    };
    Tabs.Tab = exports.Tab;
    return Tabs;
}(react_1.default.Component));
exports.Tabs = Tabs;
var ThemedTabs = theme_1.themeable(uncontrollable_1.uncontrollable(Tabs, {
    activeKey: 'onSelect'
}));
exports.default = ThemedTabs;
//# sourceMappingURL=./components/Tabs.js.map
