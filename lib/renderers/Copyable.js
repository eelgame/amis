"use strict";
/**
 * @file scoped.jsx.
 * @author fex
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HocCopyable = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var hoist_non_react_statics_1 = tslib_1.__importDefault(require("hoist-non-react-statics"));
var tpl_1 = require("../utils/tpl");
var icons_1 = require("../components/icons");
exports.HocCopyable = function () { return function (Component) {
    var QuickEditComponent = /** @class */ (function (_super) {
        tslib_1.__extends(QuickEditComponent, _super);
        function QuickEditComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        QuickEditComponent.prototype.handleClick = function (content) {
            var env = this.props.env;
            env.copy && env.copy(content);
        };
        QuickEditComponent.prototype.render = function () {
            var _a = this.props, copyable = _a.copyable, name = _a.name, className = _a.className, data = _a.data, noHoc = _a.noHoc, cx = _a.classnames, __ = _a.translate;
            if (copyable && !noHoc) {
                var content = tpl_1.filter(copyable.content ||
                    '${' + name + ' | raw }', data);
                if (content) {
                    return (react_1.default.createElement(Component, tslib_1.__assign({}, this.props, { className: cx("Field--copyable", className) }),
                        react_1.default.createElement(Component, tslib_1.__assign({}, this.props, { wrapperComponent: '', noHoc: true })),
                        react_1.default.createElement("a", { key: "edit-btn", "data-tooltip": __('Copyable.tip'), className: cx('Field-copyBtn'), onClick: this.handleClick.bind(this, content) },
                            react_1.default.createElement(icons_1.Icon, { icon: "copy", className: "icon" }))));
                }
            }
            return react_1.default.createElement(Component, tslib_1.__assign({}, this.props));
        };
        QuickEditComponent.ComposedComponent = Component;
        return QuickEditComponent;
    }(react_1.default.PureComponent));
    hoist_non_react_statics_1.default(QuickEditComponent, Component);
    return QuickEditComponent;
}; };
exports.default = exports.HocCopyable;
//# sourceMappingURL=./renderers/Copyable.js.map
