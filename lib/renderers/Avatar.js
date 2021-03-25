"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarFieldRenderer = exports.AvatarField = void 0;
var tslib_1 = require("tslib");
/**
 * @file 用来展示用户头像
 */
var react_1 = tslib_1.__importDefault(require("react"));
var factory_1 = require("../factory");
var tpl_builtin_1 = require("../utils/tpl-builtin");
var AvatarField = /** @class */ (function (_super) {
    tslib_1.__extends(AvatarField, _super);
    function AvatarField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AvatarField.prototype.render = function () {
        var _a = this.props, className = _a.className, icon = _a.icon, text = _a.text, src = _a.src, fit = _a.fit, data = _a.data, shape = _a.shape, size = _a.size, style = _a.style, cx = _a.classnames, props = _a.props;
        var sizeStyle = {
            height: size,
            width: size,
            lineHeight: size + 'px'
        };
        var avatar = react_1.default.createElement("i", { className: icon });
        if (typeof text === 'string' && text[0] === '$') {
            text = tpl_builtin_1.resolveVariable(text, data);
        }
        if (typeof src === 'string' && src[0] === '$') {
            src = tpl_builtin_1.resolveVariable(src, data);
        }
        if (text) {
            if (text.length > 2) {
                text = text.substring(0, 2).toUpperCase();
            }
            avatar = react_1.default.createElement("span", null, text);
        }
        if (src) {
            avatar = react_1.default.createElement("img", { src: src, style: { objectFit: fit } });
        }
        return (react_1.default.createElement("div", tslib_1.__assign({ className: cx('Avatar', className, "Avatar--" + shape), style: tslib_1.__assign(tslib_1.__assign({}, sizeStyle), style) }, props), avatar));
    };
    AvatarField.defaultProps = {
        size: 40,
        shape: 'circle',
        fit: 'cover',
        icon: 'fa fa-user'
    };
    return AvatarField;
}(react_1.default.Component));
exports.AvatarField = AvatarField;
var AvatarFieldRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(AvatarFieldRenderer, _super);
    function AvatarFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AvatarFieldRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)avatar$/,
            name: 'avatar'
        })
    ], AvatarFieldRenderer);
    return AvatarFieldRenderer;
}(AvatarField));
exports.AvatarFieldRenderer = AvatarFieldRenderer;
//# sourceMappingURL=./renderers/Avatar.js.map
