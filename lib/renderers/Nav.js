"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationRenderer = exports.Navigation = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var factory_1 = require("../factory");
var filter_schema_1 = tslib_1.__importDefault(require("../utils/filter-schema"));
var tpl_1 = require("../utils/tpl");
var helper_1 = require("../utils/helper");
var helper_2 = require("../utils/helper");
var tpl_builtin_1 = require("../utils/tpl-builtin");
var api_1 = require("../utils/api");
var Scoped_1 = require("../Scoped");
var theme_1 = require("../theme");
var icons_1 = require("../components/icons");
var icon_1 = require("../utils/icon");
var Navigation = /** @class */ (function (_super) {
    tslib_1.__extends(Navigation, _super);
    function Navigation(props) {
        var _this = _super.call(this, props) || this;
        _this.mounted = true;
        _this.renderItem = _this.renderItem.bind(_this);
        _this.state = {
            links: _this.syncLinks(props, (props.source &&
                typeof props.source === 'string' &&
                tpl_builtin_1.isPureVariable(props.source) &&
                tpl_builtin_1.resolveVariable(props.source, props.data)) ||
                props.links)
        };
        return _this;
    }
    Navigation.prototype.componentDidMount = function () {
        var source = this.props.source;
        if (source && !tpl_builtin_1.isPureVariable(source)) {
            this.reload();
        }
    };
    Navigation.prototype.componentWillReceiveProps = function (nextProps) {
        var props = this.props;
        if (nextProps.source && tpl_builtin_1.isPureVariable(nextProps.source)) {
            if (nextProps.source !== props.source) {
                this.setState({
                    links: this.syncLinks(nextProps)
                });
            }
            else {
                var links = tpl_builtin_1.resolveVariable(nextProps.source, nextProps.data);
                var prevLinks = tpl_builtin_1.resolveVariable(props.source, props.data);
                if (links !== prevLinks) {
                    this.setState({
                        links: this.syncLinks(nextProps, links)
                    });
                }
            }
        }
        else if (props.links !== nextProps.links) {
            this.setState({
                links: this.syncLinks(nextProps)
            });
        }
        else if (nextProps.location && props.location !== nextProps.location) {
            this.setState({
                links: this.syncLinks(nextProps, this.state.links, true)
            });
        }
    };
    Navigation.prototype.componentDidUpdate = function (prevProps) {
        var props = this.props;
        if (props.source && !tpl_builtin_1.isPureVariable(props.source)) {
            api_1.isApiOutdated(prevProps.source, props.source, prevProps.data, props.data) && this.reload();
        }
    };
    Navigation.prototype.componentWillUnmount = function () {
        this.mounted = false;
    };
    Navigation.prototype.reload = function (target, query, values) {
        var _this = this;
        if (query) {
            return this.receive(query);
        }
        var _a = this.props, data = _a.data, env = _a.env, source = _a.source, __ = _a.translate;
        var finalData = values ? helper_2.createObject(data, values) : data;
        if (!api_1.isEffectiveApi(source, data)) {
            return;
        }
        env
            .fetcher(source, finalData)
            .then(function (payload) {
            if (!_this.mounted) {
                return;
            }
            if (!payload.ok) {
                _this.setState({
                    error: payload.msg || __('Nav.sourceError')
                });
            }
            else {
                var links = Array.isArray(payload.data)
                    ? payload.data
                    : payload.data.links ||
                        payload.data.options ||
                        payload.data.items ||
                        payload.data.rows;
                if (!Array.isArray(links)) {
                    throw new Error('payload.data.options is not array.');
                }
                _this.setState({
                    links: _this.syncLinks(_this.props, links)
                }, function () {
                    if (payload.data &&
                        payload.data.value &&
                        !helper_2.someTree(_this.state.links, function (item) { return item.active; })) {
                        env.jumpTo(tpl_1.filter(payload.data.value, data));
                    }
                });
            }
        })
            .catch(function (e) {
            return _this.mounted &&
                _this.setState({
                    error: e.message
                });
        });
    };
    Navigation.prototype.receive = function (values) {
        var _a = this.props, store = _a.store, initApi = _a.initApi;
        this.reload(undefined, undefined, values);
    };
    Navigation.prototype.syncLinks = function (props, links, clearActive) {
        if (links === void 0) { links = props.links; }
        var data = props.data, env = props.env;
        if (!Array.isArray(links) || !links.length) {
            return [];
        }
        return helper_2.mapTree(links, function (link) {
            return tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, link), filter_schema_1.default(link, data)), { active: (!clearActive && link.active) ||
                    (link.activeOn
                        ? helper_1.evalExpression(link.activeOn, data)
                        : !!(link.hasOwnProperty('to') &&
                            env &&
                            env.isCurrentUrl(tpl_1.filter(link.to, data)))), unfolded: link.unfolded ||
                    (link.children && link.children.some(function (link) { return !!link.active; })) });
        }, 1, true);
    };
    Navigation.prototype.handleClick = function (link) {
        var _a = this.props, env = _a.env, data = _a.data, onSelect = _a.onSelect;
        if (onSelect && onSelect(link) === false) {
            return;
        }
        if (!link.to) {
            link.children && link.children.length && this.toggleLink(link);
            return;
        }
        env && env.jumpTo(tpl_1.filter(link.to, data), link);
    };
    Navigation.prototype.toggleLink = function (target) {
        this.setState({
            links: helper_2.mapTree(this.state.links, function (link) {
                return target === link
                    ? tslib_1.__assign(tslib_1.__assign({}, link), { unfolded: !link.unfolded }) : link;
            })
        });
    };
    Navigation.prototype.renderItem = function (link, index) {
        var _this = this;
        if (link.hidden === true || link.visible === false) {
            return null;
        }
        var isActive = !!link.active;
        var _a = this.props, disabled = _a.disabled, togglerClassName = _a.togglerClassName, cx = _a.classnames;
        return (react_1.default.createElement("li", { key: index, className: cx('Nav-item', link.className, {
                'is-disabled': disabled || link.disabled,
                'is-active': isActive,
                'is-unfolded': link.unfolded
            }) },
            react_1.default.createElement("a", { onClick: this.handleClick.bind(this, link) },
                icon_1.generateIcon(cx, link.icon, 'Nav-itemIcon'),
                link.label),
            link.children && link.children.length ? (react_1.default.createElement("span", { onClick: function () { return _this.toggleLink(link); }, className: cx('Nav-itemToggler', togglerClassName) },
                react_1.default.createElement(icons_1.Icon, { icon: "caret", className: "icon" }))) : null,
            link.children && link.children.length ? (react_1.default.createElement("ul", { className: cx('Nav-subItems') }, link.children.map(function (link, index) { return _this.renderItem(link, index); }))) : null));
    };
    Navigation.prototype.render = function () {
        var _a = this.props, className = _a.className, stacked = _a.stacked, cx = _a.classnames;
        var links = this.state.links;
        return (react_1.default.createElement("ul", { className: cx('Nav', className, stacked ? 'Nav--stacked' : 'Nav--tabs') }, links.map(this.renderItem)));
    };
    Navigation.defaultProps = {};
    return Navigation;
}(react_1.default.Component));
exports.Navigation = Navigation;
exports.default = theme_1.themeable(Navigation);
var NavigationRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(NavigationRenderer, _super);
    function NavigationRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NavigationRenderer.prototype.componentWillMount = function () {
        var scoped = this.context;
        scoped.registerComponent(this);
    };
    NavigationRenderer.prototype.componentWillUnmount = function () {
        var scoped = this.context;
        scoped.unRegisterComponent(this);
        _super.prototype.componentWillUnmount.call(this);
    };
    NavigationRenderer.contextType = Scoped_1.ScopedContext;
    NavigationRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)(?:nav|navigation)$/,
            name: 'nav'
        })
    ], NavigationRenderer);
    return NavigationRenderer;
}(Navigation));
exports.NavigationRenderer = NavigationRenderer;
//# sourceMappingURL=./renderers/Nav.js.map
