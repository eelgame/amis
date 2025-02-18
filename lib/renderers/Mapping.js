"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MappingFieldRenderer = exports.MappingField = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var factory_1 = require("../factory");
var MappingField = /** @class */ (function (_super) {
    tslib_1.__extends(MappingField, _super);
    function MappingField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MappingField.prototype.render = function () {
        var _a, _b;
        var _c = this.props, className = _c.className, placeholder = _c.placeholder, map = _c.map, render = _c.render, cx = _c.classnames;
        var key = this.props.value;
        var viewValue = (react_1.default.createElement("span", { className: "text-muted" }, placeholder));
        key =
            typeof key === 'string'
                ? key.trim()
                : key === true
                    ? '1'
                    : key === false
                        ? '0'
                        : key; // trim 一下，干掉一些空白字符。
        if (typeof key !== 'undefined' && map && ((_a = map[key]) !== null && _a !== void 0 ? _a : map['*'])) {
            viewValue = render('tpl', (_b = map[key]) !== null && _b !== void 0 ? _b : map['*'] // 兼容平台旧用法：即 value 为 true 时映射 1 ，为 false 时映射 0
            );
        }
        return react_1.default.createElement("span", { className: cx('MappingField', className) }, viewValue);
    };
    MappingField.defaultProps = {
        placeholder: '-',
        map: {
            '*': '通配值'
        }
    };
    return MappingField;
}(react_1.default.Component));
exports.MappingField = MappingField;
var MappingFieldRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(MappingFieldRenderer, _super);
    function MappingFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MappingFieldRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)(?:map|mapping)$/,
            name: 'mapping'
        })
    ], MappingFieldRenderer);
    return MappingFieldRenderer;
}(MappingField));
exports.MappingFieldRenderer = MappingFieldRenderer;
//# sourceMappingURL=./renderers/Mapping.js.map
