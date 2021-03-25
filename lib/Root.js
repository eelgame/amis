"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderChild = exports.renderChildren = exports.Root = void 0;
var tslib_1 = require("tslib");
var isPlainObject_1 = tslib_1.__importDefault(require("lodash/isPlainObject"));
var react_1 = tslib_1.__importDefault(require("react"));
var ImageGallery_1 = tslib_1.__importDefault(require("./components/ImageGallery"));
var envOverwrite_1 = require("./envOverwrite");
var locale_1 = require("./locale");
var RootRenderer_1 = require("./RootRenderer");
var SchemaRenderer_1 = require("./SchemaRenderer");
var Scoped_1 = tslib_1.__importDefault(require("./Scoped"));
var theme_1 = require("./theme");
var filter_schema_1 = tslib_1.__importDefault(require("./utils/filter-schema"));
var helper_1 = require("./utils/helper");
var WithRootStore_1 = require("./WithRootStore");
var Root = /** @class */ (function (_super) {
    tslib_1.__extends(Root, _super);
    function Root() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Root.prototype.resolveDefinitions = function (name) {
        var definitions = this.props.schema.definitions;
        if (!name || helper_1.isEmpty(definitions)) {
            return {};
        }
        return definitions && definitions[name];
    };
    Root.prototype.render = function () {
        var _a = this.props, schema = _a.schema, rootStore = _a.rootStore, env = _a.env, pathPrefix = _a.pathPrefix, location = _a.location, data = _a.data, locale = _a.locale, translate = _a.translate, rest = tslib_1.__rest(_a, ["schema", "rootStore", "env", "pathPrefix", "location", "data", "locale", "translate"]);
        var theme = env.theme;
        // 根据环境覆盖 schema，这个要在最前面做，不然就无法覆盖 validations
        envOverwrite_1.envOverwrite(schema, locale);
        return (react_1.default.createElement(WithRootStore_1.RootStoreContext.Provider, { value: rootStore },
            react_1.default.createElement(theme_1.ThemeContext.Provider, { value: this.props.theme || 'default' },
                react_1.default.createElement(locale_1.LocaleContext.Provider, { value: this.props.locale },
                    react_1.default.createElement(ImageGallery_1.default, { modalContainer: env.getModalContainer },
                        react_1.default.createElement(RootRenderer_1.RootRenderer, tslib_1.__assign({ pathPrefix: pathPrefix || '', schema: isPlainObject_1.default(schema)
                                ? tslib_1.__assign({ type: 'page' }, schema) : schema }, rest, { rootStore: rootStore, resolveDefinitions: this.resolveDefinitions, location: location, data: data, env: env, classnames: theme.classnames, classPrefix: theme.classPrefix, locale: locale, translate: translate })))))));
    };
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], Root.prototype, "resolveDefinitions", null);
    return Root;
}(react_1.default.Component));
exports.Root = Root;
function renderChildren(prefix, node, props) {
    if (Array.isArray(node)) {
        return node.map(function (node, index) {
            return renderChild(prefix + "/" + index, node, tslib_1.__assign(tslib_1.__assign({}, props), { key: "" + (props.key ? props.key + "-" : '') + index }));
        });
    }
    return renderChild(prefix, node, props);
}
exports.renderChildren = renderChildren;
function renderChild(prefix, node, props) {
    if (Array.isArray(node)) {
        return renderChildren(prefix, node, props);
    }
    var typeofnode = typeof node;
    var schema = typeofnode === 'string' || typeofnode === 'number'
        ? { type: 'tpl', tpl: String(node) }
        : node;
    var detectData = schema &&
        (schema.detectField === '&' ? props : props[schema.detectField || 'data']);
    var exprProps = detectData
        ? filter_schema_1.default(schema, detectData, undefined, props)
        : null;
    if (exprProps &&
        (exprProps.hidden ||
            exprProps.visible === false ||
            schema.hidden ||
            schema.visible === false ||
            props.hidden ||
            props.visible === false)) {
        return null;
    }
    var transform = props.propsTransform;
    if (transform) {
        // @ts-ignore
        delete props.propsTransform;
        props = transform(props);
    }
    return (react_1.default.createElement(SchemaRenderer_1.SchemaRenderer, tslib_1.__assign({}, props, exprProps, { schema: schema, "$path": "" + (prefix ? prefix + "/" : '') + ((schema && schema.type) || '') })));
}
exports.renderChild = renderChild;
exports.default = Scoped_1.default(Root);
//# sourceMappingURL=./Root.js.map
