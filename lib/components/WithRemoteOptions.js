"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withRemoteOptions = exports.Store = void 0;
var tslib_1 = require("tslib");
/**
 * 让选项类的组件支持远程加载选项。
 *
 * 目前这个逻辑其实在 renderer/form/options 中有
 * 但是那个里面耦合较多，没办法简单的在组件之间相互调用，
 * 所以先单独弄个 hoc 出来，后续再想个更加合理的方案。
 */
var react_1 = tslib_1.__importDefault(require("react"));
var hoist_non_react_statics_1 = tslib_1.__importDefault(require("hoist-non-react-statics"));
var WithStore_1 = require("./WithStore");
var env_1 = require("../env");
var mobx_state_tree_1 = require("mobx-state-tree");
var api_1 = require("../utils/api");
var tpl_builtin_1 = require("../utils/tpl-builtin");
var Select_1 = require("./Select");
var mobx_1 = require("mobx");
exports.Store = mobx_state_tree_1.types
    .model('OptionsStore')
    .props({
    fetching: false,
    errorMsg: '',
    options: mobx_state_tree_1.types.frozen([]),
    data: mobx_state_tree_1.types.frozen({})
})
    .actions(function (self) {
    var load = mobx_state_tree_1.flow(function (env, api, data) {
        var ret, data_1, options, e_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    self.fetching = true;
                    return [4 /*yield*/, env.fetcher(api, data)];
                case 1:
                    ret = _a.sent();
                    if (ret.ok) {
                        data_1 = ret.data || {};
                        options = data_1.options || data_1.items || data_1.rows || data_1;
                        self.setOptions(options);
                    }
                    else {
                        throw new Error(ret.msg || 'fetch error');
                    }
                    return [3 /*break*/, 4];
                case 2:
                    e_1 = _a.sent();
                    self.errorMsg = e_1.message;
                    return [3 /*break*/, 4];
                case 3:
                    self.fetching = false;
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    });
    return {
        load: load,
        setData: function (data) {
            self.data = data || {};
        },
        setOptions: function (options) {
            options = Select_1.normalizeOptions(options);
            if (Array.isArray(options)) {
                self.options = options.concat();
            }
        }
    };
});
function withRemoteOptions(ComposedComponent) {
    var _a;
    var result = hoist_non_react_statics_1.default(WithStore_1.withStore(function () { return exports.Store.create(); })((_a = /** @class */ (function (_super) {
            tslib_1.__extends(class_1, _super);
            function class_1() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.toDispose = [];
                return _this;
            }
            class_1.prototype.componentDidMount = function () {
                var _this = this;
                var env = this.props.env || this.context;
                var _a = this.props, store = _a.store, source = _a.source, data = _a.data, options = _a.options;
                store.setData(data);
                options && store.setOptions(options);
                if (tpl_builtin_1.isPureVariable(source)) {
                    this.syncOptions();
                    this.toDispose.push(mobx_1.reaction(function () {
                        return tpl_builtin_1.resolveVariableAndFilter(source, store.data, '| raw');
                    }, function () { return _this.syncOptions(); }));
                }
                else if (env && api_1.isEffectiveApi(source, data)) {
                    this.loadOptions();
                    this.toDispose.push(mobx_1.reaction(function () {
                        return api_1.buildApi(source, store.data, {
                            ignoreData: true
                        }).url;
                    }, function () { return _this.loadOptions(); }));
                }
            };
            class_1.prototype.componentDidUpdate = function (prevProps) {
                var props = this.props;
                if (props.data !== prevProps.data) {
                    props.store.setData(props.data);
                }
            };
            class_1.prototype.componentWillUnmount = function () {
                this.toDispose.forEach(function (fn) { return fn(); });
                this.toDispose = [];
            };
            class_1.prototype.loadOptions = function () {
                var env = this.props.env || this.context;
                var _a = this.props, store = _a.store, source = _a.source, data = _a.data, options = _a.options;
                if (env && api_1.isEffectiveApi(source, data)) {
                    store.load(env, source, data);
                }
            };
            class_1.prototype.syncOptions = function () {
                var _a = this.props, store = _a.store, source = _a.source, data = _a.data;
                if (tpl_builtin_1.isPureVariable(source)) {
                    store.setOptions(tpl_builtin_1.resolveVariableAndFilter(source, data, '| raw') || []);
                }
            };
            class_1.prototype.render = function () {
                var store = this.props.store;
                var injectedProps = {
                    options: store.options,
                    loading: store.fetching
                };
                return (react_1.default.createElement(ComposedComponent, tslib_1.__assign({}, this.props, injectedProps)));
            };
            return class_1;
        }(react_1.default.Component)),
        _a.displayName = "WithRemoteOptions(" + (ComposedComponent.displayName || ComposedComponent.name) + ")",
        _a.ComposedComponent = ComposedComponent,
        _a.contextType = env_1.EnvContext,
        _a)), ComposedComponent);
    return result;
}
exports.withRemoteOptions = withRemoteOptions;
//# sourceMappingURL=./components/WithRemoteOptions.js.map
