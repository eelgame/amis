"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrapperRenderer = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var factory_1 = require("../factory");
var Wrapper = /** @class */ (function (_super) {
    tslib_1.__extends(Wrapper, _super);
    function Wrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Wrapper.prototype.renderBody = function () {
        var _a = this.props, children = _a.children, body = _a.body, render = _a.render;
        return children
            ? typeof children === 'function'
                ? children(this.props)
                : children
            : body
                ? render('body', body)
                : null;
    };
    Wrapper.prototype.render = function () {
        var _a = this.props, className = _a.className, size = _a.size, cx = _a.classnames, style = _a.style;
        return (react_1.default.createElement("div", { className: cx('Wrapper', size ? "Wrapper--" + size : '', className), style: style }, this.renderBody()));
    };
    Wrapper.propsList = ['body', 'className', 'children', 'size'];
    Wrapper.defaultProps = {
        className: ''
    };
    return Wrapper;
}(react_1.default.Component));
exports.default = Wrapper;
var WrapperRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(WrapperRenderer, _super);
    function WrapperRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WrapperRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)wrapper$/,
            name: 'wrapper'
        })
    ], WrapperRenderer);
    return WrapperRenderer;
}(Wrapper));
exports.WrapperRenderer = WrapperRenderer;
//# sourceMappingURL=./renderers/Wrapper.js.map
