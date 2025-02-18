"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SparkLineRenderer = void 0;
var tslib_1 = require("tslib");
var SparkLine_1 = tslib_1.__importDefault(require("../components/SparkLine"));
var factory_1 = require("../factory");
var react_1 = tslib_1.__importDefault(require("react"));
var tpl_builtin_1 = require("../utils/tpl-builtin");
var helper_1 = require("../utils/helper");
var SparkLineRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(SparkLineRenderer, _super);
    function SparkLineRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SparkLineRenderer.prototype.handleClick = function (e, ctx) {
        var _a = this.props, disabled = _a.disabled, onAction = _a.onAction, clickAction = _a.clickAction, data = _a.data;
        if (e.defaultPrevented || !clickAction || disabled) {
            return;
        }
        onAction === null || onAction === void 0 ? void 0 : onAction(null, clickAction, ctx ? helper_1.createObject(data, ctx) : data);
    };
    SparkLineRenderer.prototype.render = function () {
        var _a = this.props, value = _a.value, name = _a.name, data = _a.data, clickAction = _a.clickAction;
        var finalValue = value !== null && value !== void 0 ? value : (name ? tpl_builtin_1.resolveVariableAndFilter(name, data) : [1, 1]);
        return (react_1.default.createElement(SparkLine_1.default, tslib_1.__assign({ onClick: clickAction ? this.handleClick : undefined }, this.props, { value: finalValue })));
    };
    var _a;
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof react_1.default !== "undefined" && react_1.default.MouseEvent) === "function" ? _a : Object, Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], SparkLineRenderer.prototype, "handleClick", null);
    SparkLineRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)sparkline$/,
            name: 'sparkline'
        })
    ], SparkLineRenderer);
    return SparkLineRenderer;
}(react_1.default.Component));
exports.SparkLineRenderer = SparkLineRenderer;
//# sourceMappingURL=./renderers/SparkLine.js.map
