"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withRootStore = exports.RootStoreContext = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var hoist_non_react_statics_1 = tslib_1.__importDefault(require("hoist-non-react-statics"));
exports.RootStoreContext = react_1.default.createContext(undefined);
function withRootStore(ComposedComponent) {
    var _a;
    var result = hoist_non_react_statics_1.default((_a = /** @class */ (function (_super) {
            tslib_1.__extends(class_1, _super);
            function class_1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_1.prototype.render = function () {
                var rootStore = this.context;
                var injectedProps = {
                    rootStore: rootStore
                };
                return (react_1.default.createElement(ComposedComponent, tslib_1.__assign({}, this.props, injectedProps)));
            };
            return class_1;
        }(react_1.default.Component)),
        _a.displayName = "WithRootStore(" + (ComposedComponent.displayName || ComposedComponent.name) + ")",
        _a.contextType = exports.RootStoreContext,
        _a.ComposedComponent = ComposedComponent,
        _a), ComposedComponent);
    return result;
}
exports.withRootStore = withRootStore;
//# sourceMappingURL=./WithRootStore.js.map
