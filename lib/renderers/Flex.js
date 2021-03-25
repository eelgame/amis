"use strict";
/**
 * @file 简化版 Flex 布局，主要用于不熟悉 CSS 的开发者
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlexRenderer = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var factory_1 = require("../factory");
var Flex = /** @class */ (function (_super) {
    tslib_1.__extends(Flex, _super);
    function Flex(props) {
        return _super.call(this, props) || this;
    }
    Flex.prototype.render = function () {
        var _a = this.props, items = _a.items, direction = _a.direction, justify = _a.justify, alignItems = _a.alignItems, alignContent = _a.alignContent, style = _a.style, render = _a.render, className = _a.className;
        var flexStyle = tslib_1.__assign({ display: 'flex', flexDirection: direction, justifyContent: justify, alignItems: alignItems,
            alignContent: alignContent }, style);
        return (react_1.default.createElement("div", { style: flexStyle, className: className }, items.map(function (item, key) { return render("flexItem/" + key, item); })));
    };
    Flex.defaultProps = {
        direction: 'row',
        justify: 'center',
        alignItems: 'center',
        alignContent: 'center'
    };
    return Flex;
}(react_1.default.Component));
exports.default = Flex;
var FlexRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(FlexRenderer, _super);
    function FlexRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FlexRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)flex$/,
            name: 'flex'
        })
    ], FlexRenderer);
    return FlexRenderer;
}(Flex));
exports.FlexRenderer = FlexRenderer;
//# sourceMappingURL=./renderers/Flex.js.map
