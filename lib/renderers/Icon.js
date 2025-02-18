"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TplRenderer = exports.Icon = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var factory_1 = require("../factory");
var Icon = /** @class */ (function (_super) {
    tslib_1.__extends(Icon, _super);
    function Icon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Icon.prototype.render = function () {
        var _a = this.props, icon = _a.icon, vendor = _a.vendor, cx = _a.classnames, className = _a.className;
        var isURLIcon = (icon === null || icon === void 0 ? void 0 : icon.indexOf('.')) !== -1;
        return isURLIcon ? (react_1.default.createElement("img", { className: cx('Icon'), src: icon })) : (react_1.default.createElement("i", { className: cx(vendor === 'iconfont'
                ? "iconfont icon-" + icon
                : vendor + " " + vendor + "-" + icon, className) }));
    };
    Icon.defaultProps = {
        icon: '',
        vendor: 'fa'
    };
    return Icon;
}(react_1.default.Component));
exports.Icon = Icon;
var TplRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(TplRenderer, _super);
    function TplRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TplRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)icon$/,
            name: 'icon'
        })
    ], TplRenderer);
    return TplRenderer;
}(Icon));
exports.TplRenderer = TplRenderer;
//# sourceMappingURL=./renderers/Icon.js.map
