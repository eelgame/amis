"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localeable = exports.LocaleContext = exports.setDefaultLocale = exports.getDefaultLocale = exports.makeTranslator = exports.register = void 0;
var tslib_1 = require("tslib");
// 多语言支持
var react_1 = tslib_1.__importDefault(require("react"));
var hoist_non_react_statics_1 = tslib_1.__importDefault(require("hoist-non-react-statics"));
var tpl_builtin_1 = require("./utils/tpl-builtin");
var defaultLocale = 'zh-CN';
var locales = {};
function register(name, config) {
    locales[name] = config;
}
exports.register = register;
var fns = {};
function format(str, data) {
    return str.replace(/(\\)?\{\{([\s\S]+?)\}\}/g, function (_, escape, key) {
        if (escape) {
            return _.substring(1);
        }
        return tpl_builtin_1.resolveVariable(key, data || {});
    });
}
function makeTranslator(locale) {
    if (locale && fns[locale]) {
        return fns[locale];
    }
    var fn = function (str) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!str || typeof str !== 'string') {
            return str;
        }
        var dict = locales[locale] || locales[defaultLocale];
        return format.apply(void 0, tslib_1.__spreadArrays([(dict === null || dict === void 0 ? void 0 : dict[str]) || str], args));
    };
    locale && (fns[locale] = fn);
    return fn;
}
exports.makeTranslator = makeTranslator;
function getDefaultLocale() {
    return defaultLocale;
}
exports.getDefaultLocale = getDefaultLocale;
function setDefaultLocale(loacle) {
    defaultLocale = loacle;
}
exports.setDefaultLocale = setDefaultLocale;
exports.LocaleContext = react_1.default.createContext('');
function localeable(ComposedComponent) {
    var _a;
    var result = hoist_non_react_statics_1.default((_a = /** @class */ (function (_super) {
            tslib_1.__extends(class_1, _super);
            function class_1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_1.prototype.render = function () {
                var locale = this.props.locale || this.context || defaultLocale;
                var translate = this.props.translate || makeTranslator(locale);
                var injectedProps = {
                    locale: locale,
                    translate: translate
                };
                return (react_1.default.createElement(exports.LocaleContext.Provider, { value: locale },
                    react_1.default.createElement(ComposedComponent, tslib_1.__assign({}, this.props, injectedProps))));
            };
            return class_1;
        }(react_1.default.Component)),
        _a.displayName = "I18N(" + (ComposedComponent.displayName || ComposedComponent.name) + ")",
        _a.contextType = exports.LocaleContext,
        _a.ComposedComponent = ComposedComponent,
        _a), ComposedComponent);
    return result;
}
exports.localeable = localeable;
//# sourceMappingURL=./locale.js.map
