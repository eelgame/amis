"use strict";
/**
 * @file 用来创建一个域，在这个域里面会把里面的运行时实例注册进来，方便组件之间的通信。
 * @author fex
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HocScoped = exports.ScopedContext = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var find_1 = tslib_1.__importDefault(require("lodash/find"));
var hoist_non_react_statics_1 = tslib_1.__importDefault(require("hoist-non-react-statics"));
var qs_1 = tslib_1.__importDefault(require("qs"));
var tpl_builtin_1 = require("./utils/tpl-builtin");
var helper_1 = require("./utils/helper");
exports.ScopedContext = react_1.default.createContext(createScopedTools(''));
function createScopedTools(path, parent, env) {
    var components = [];
    return {
        parent: parent,
        registerComponent: function (component) {
            // 不要把自己注册在自己的 Scoped 上，自己的 Scoped 是给子节点们注册的。
            if (component.props.$path === path && parent) {
                return parent.registerComponent(component);
            }
            if (!~components.indexOf(component)) {
                components.push(component);
            }
        },
        unRegisterComponent: function (component) {
            // 自己本身实际上注册在父级 Scoped 上。
            if (component.props.$path === path && parent) {
                return parent.unRegisterComponent(component);
            }
            var idx = components.indexOf(component);
            if (~idx) {
                components.splice(idx, 1);
            }
        },
        getComponentByName: function (name) {
            if (~name.indexOf('.')) {
                var paths = name.split('.');
                var len_1 = paths.length;
                return paths.reduce(function (scope, name, idx) {
                    if (scope && scope.getComponentByName) {
                        var result = scope.getComponentByName(name);
                        return result && idx < len_1 - 1 ? result.context : result;
                    }
                    return null;
                }, this);
            }
            var resolved = find_1.default(components, function (component) {
                return component.props.name === name || component.props.id === name;
            });
            return resolved || (parent && parent.getComponentByName(name));
        },
        getComponents: function () {
            return components.concat();
        },
        reload: function (target, ctx) {
            var scoped = this;
            var targets = typeof target === 'string' ? target.split(/\s*,\s*/) : target;
            targets.forEach(function (name) {
                var idx2 = name.indexOf('?');
                var query = null;
                if (~idx2) {
                    query = tpl_builtin_1.dataMapping(qs_1.default.parse(name.substring(idx2 + 1)), ctx);
                    name = name.substring(0, idx2);
                }
                var idx = name.indexOf('.');
                var subPath = '';
                if (~idx) {
                    subPath = name.substring(1 + idx);
                    name = name.substring(0, idx);
                }
                if (name === 'window') {
                    if (query) {
                        var link = location.pathname + '?' + helper_1.qsstringify(query);
                        env ? env.updateLocation(link, true) : location.replace(link);
                    }
                    else {
                        location.reload();
                    }
                }
                else {
                    var component = scoped.getComponentByName(name);
                    component &&
                        component.reload &&
                        component.reload(subPath, query, ctx);
                }
            });
        },
        send: function (receive, values) {
            var scoped = this;
            var receives = typeof receive === 'string' ? receive.split(/\s*,\s*/) : receive;
            // todo 没找到做提示！
            receives.forEach(function (name) {
                var idx = name.indexOf('.');
                var subPath = '';
                if (~idx) {
                    subPath = name.substring(1 + idx);
                    name = name.substring(0, idx);
                }
                var component = scoped.getComponentByName(name);
                if (component && component.receive) {
                    component.receive(values, subPath);
                }
                else if (name === 'window' && env && env.updateLocation) {
                    var query = tslib_1.__assign(tslib_1.__assign({}, (location.search ? qs_1.default.parse(location.search.substring(1)) : {})), values);
                    var link = location.pathname + '?' + helper_1.qsstringify(query);
                    env.updateLocation(link, true);
                }
            });
        },
        /**
         * 主要是用来关闭指定弹框的
         *
         * @param target 目标 name
         */
        close: function (target) {
            var scoped = this;
            if (typeof target === 'string') {
                // 过滤已经关掉的，当用户 close 配置多个弹框 name 时会出现这种情况
                target
                    .split(/\s*,\s*/)
                    .map(function (name) { return scoped.getComponentByName(name); })
                    .filter(function (component) { return component && component.props.show; })
                    .forEach(closeDialog);
            }
        }
    };
}
function closeDialog(component) {
    component.context
        .getComponents()
        .filter(function (item) {
        return item &&
            (item.props.type === 'dialog' || item.props.type === 'drawer') &&
            item.props.show;
    })
        .forEach(closeDialog);
    component.props.onClose && component.props.onClose();
}
function HocScoped(ComposedComponent) {
    var ScopedComponent = /** @class */ (function (_super) {
        tslib_1.__extends(ScopedComponent, _super);
        function ScopedComponent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.scoped = createScopedTools(_this.props.$path, _this.context, _this.props.env);
            return _this;
        }
        ScopedComponent.prototype.getWrappedInstance = function () {
            return this.ref;
        };
        ScopedComponent.prototype.childRef = function (ref) {
            while (ref && ref.getWrappedInstance) {
                ref = ref.getWrappedInstance();
            }
            this.ref = ref;
        };
        ScopedComponent.prototype.componentWillMount = function () {
            var scopeRef = this.props.scopeRef;
            scopeRef && scopeRef(this.scoped);
        };
        ScopedComponent.prototype.componentWillUnmount = function () {
            var scopeRef = this.props.scopeRef;
            scopeRef && scopeRef(null);
        };
        ScopedComponent.prototype.render = function () {
            var _a = this.props, scopeRef = _a.scopeRef, rest = tslib_1.__rest(_a, ["scopeRef"]);
            return (react_1.default.createElement(exports.ScopedContext.Provider, { value: this.scoped },
                react_1.default.createElement(ComposedComponent, tslib_1.__assign({}, rest /* todo */, { ref: this.childRef }))));
        };
        ScopedComponent.displayName = "Scoped(" + (ComposedComponent.displayName || ComposedComponent.name) + ")";
        ScopedComponent.contextType = exports.ScopedContext;
        ScopedComponent.ComposedComponent = ComposedComponent;
        tslib_1.__decorate([
            helper_1.autobind,
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", [Object]),
            tslib_1.__metadata("design:returntype", void 0)
        ], ScopedComponent.prototype, "childRef", null);
        return ScopedComponent;
    }(react_1.default.Component));
    hoist_non_react_statics_1.default(ScopedComponent, ComposedComponent);
    return ScopedComponent;
}
exports.HocScoped = HocScoped;
exports.default = HocScoped;
//# sourceMappingURL=./Scoped.js.map
