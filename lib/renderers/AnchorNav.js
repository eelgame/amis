"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnchorNavRenderer = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var factory_1 = require("../factory");
var AnchorNav_1 = require("../components/AnchorNav");
var helper_1 = require("../utils/helper");
var tpl_1 = require("../utils/tpl");
var lodash_1 = require("lodash");
var AnchorNav = /** @class */ (function (_super) {
    tslib_1.__extends(AnchorNav, _super);
    function AnchorNav(props) {
        var _this = _super.call(this, props) || this;
        // 设置默认激活项
        var links = props.links;
        var active = 0;
        if (typeof props.active !== 'undefined') {
            active = props.active;
        }
        else {
            var section = lodash_1.find(links, function (section) { return section.href === props.active; });
            active =
                section && section.href
                    ? section.href
                    : (links[0] && links[0].href) || 0;
        }
        _this.state = {
            active: active
        };
        return _this;
    }
    AnchorNav.prototype.handleSelect = function (key) {
        this.setState({
            active: key
        });
    };
    AnchorNav.prototype.locateTo = function (index) {
        var links = this.props.links;
        Array.isArray(links) &&
            links[index] &&
            this.setState({
                active: links[index].href || index
            });
    };
    AnchorNav.prototype.render = function () {
        var _this = this;
        var _a = this.props, cx = _a.classnames, ns = _a.classPrefix, className = _a.className, linkClassName = _a.linkClassName, sectionClassName = _a.sectionClassName, sectionRender = _a.sectionRender, render = _a.render, data = _a.data;
        var links = this.props.links;
        if (!links) {
            return null;
        }
        links = Array.isArray(links) ? links : [links];
        var children = [];
        children = links.map(function (section, index) {
            return helper_1.isVisible(section, data) ? (react_1.default.createElement(AnchorNav_1.AnchorNavSection, tslib_1.__assign({}, section, { title: tpl_1.filter(section.title, data), key: index, name: section.href || index }), _this.renderSection
                ? _this.renderSection(section, _this.props, index)
                : sectionRender
                    ? sectionRender(section, _this.props, index)
                    : render("section/" + index, section.body || ''))) : null;
        });
        return (react_1.default.createElement(AnchorNav_1.AnchorNav, { classPrefix: ns, classnames: cx, className: className, linkClassName: linkClassName, sectionClassName: sectionClassName, onSelect: this.handleSelect, active: this.state.active }, children));
    };
    AnchorNav.defaultProps = {
        className: '',
        linkClassName: '',
        sectionClassName: ''
    };
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], AnchorNav.prototype, "handleSelect", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number]),
        tslib_1.__metadata("design:returntype", void 0)
    ], AnchorNav.prototype, "locateTo", null);
    return AnchorNav;
}(react_1.default.Component));
exports.default = AnchorNav;
var AnchorNavRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(AnchorNavRenderer, _super);
    function AnchorNavRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnchorNavRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)anchor-nav$/,
            name: 'anchor-nav'
        })
    ], AnchorNavRenderer);
    return AnchorNavRenderer;
}(AnchorNav));
exports.AnchorNavRenderer = AnchorNavRenderer;
//# sourceMappingURL=./renderers/AnchorNav.js.map
