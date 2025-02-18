"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DividerRenderer = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var factory_1 = require("../factory");
var Divider = /** @class */ (function (_super) {
    tslib_1.__extends(Divider, _super);
    function Divider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Divider.prototype.render = function () {
        var _a = this.props, cx = _a.classnames, className = _a.className, lineStyle = _a.lineStyle;
        return (react_1.default.createElement("div", { className: cx('Divider', lineStyle ? "Divider--" + lineStyle : '', className) }));
    };
    Divider.defaultProps = {
        className: '',
        lineStyle: 'dashed'
    };
    return Divider;
}(react_1.default.Component));
exports.default = Divider;
var DividerRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(DividerRenderer, _super);
    function DividerRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DividerRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)(?:divider|hr)$/,
            name: 'divider'
        })
    ], DividerRenderer);
    return DividerRenderer;
}(Divider));
exports.DividerRenderer = DividerRenderer;
//# sourceMappingURL=./renderers/Divider.js.map
