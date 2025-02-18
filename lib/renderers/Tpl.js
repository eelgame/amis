"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TplRenderer = exports.Tpl = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var factory_1 = require("../factory");
var tpl_1 = require("../utils/tpl");
var helper_1 = require("../utils/helper");
var tpl_builtin_1 = require("../utils/tpl-builtin");
var Tpl = /** @class */ (function (_super) {
    tslib_1.__extends(Tpl, _super);
    function Tpl(props) {
        var _this = _super.call(this, props) || this;
        _this.htmlRef = _this.htmlRef.bind(_this);
        return _this;
    }
    Tpl.prototype.componentDidUpdate = function (prevProps) {
        if (helper_1.anyChanged(['data', 'tpl', 'html', 'text', 'raw', 'value'], this.props, prevProps)) {
            this._render();
        }
    };
    Tpl.prototype.htmlRef = function (dom) {
        this.dom = dom;
        this._render();
    };
    Tpl.prototype.getContent = function () {
        var _a = this.props, tpl = _a.tpl, html = _a.html, text = _a.text, raw = _a.raw, value = _a.value, data = _a.data, placeholder = _a.placeholder;
        if (raw) {
            return raw;
        }
        else if (html) {
            return tpl_1.filter(html, data);
        }
        else if (tpl) {
            return tpl_1.filter(tpl, data);
        }
        else if (text) {
            return tpl_builtin_1.escapeHtml(tpl_1.filter(text, data));
        }
        else {
            return value == null || value === ''
                ? "<span class=\"text-muted\">" + placeholder + "</span>"
                : typeof value === 'string'
                    ? value
                    : JSON.stringify(value);
        }
    };
    Tpl.prototype._render = function () {
        if (!this.dom) {
            return;
        }
        this.dom.firstChild.innerHTML = this.getContent();
    };
    Tpl.prototype.render = function () {
        var _a = this.props, className = _a.className, wrapperComponent = _a.wrapperComponent, inline = _a.inline, cx = _a.classnames, style = _a.style;
        var Component = wrapperComponent || (inline ? 'span' : 'div');
        return (react_1.default.createElement(Component, { ref: this.htmlRef, className: cx('TplField', className), style: style },
            react_1.default.createElement("span", null, this.getContent())));
    };
    Tpl.defaultProps = {
        inline: true,
        placeholder: '',
        value: ''
    };
    return Tpl;
}(react_1.default.Component));
exports.Tpl = Tpl;
var TplRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(TplRenderer, _super);
    function TplRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TplRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)(?:tpl|html)$/,
            name: 'tpl'
        })
    ], TplRenderer);
    return TplRenderer;
}(Tpl));
exports.TplRenderer = TplRenderer;
//# sourceMappingURL=./renderers/Tpl.js.map
