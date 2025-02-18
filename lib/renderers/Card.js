"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardItemFieldRenderer = exports.CardRenderer = exports.Card = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_dom_1 = require("react-dom");
var factory_1 = require("../factory");
var tpl_1 = require("../utils/tpl");
var helper_1 = require("../utils/helper");
var Checkbox_1 = tslib_1.__importDefault(require("../components/Checkbox"));
var helper_2 = require("../utils/helper");
var tpl_builtin_1 = require("../utils/tpl-builtin");
var QuickEdit_1 = tslib_1.__importDefault(require("./QuickEdit"));
var PopOver_1 = tslib_1.__importDefault(require("./PopOver"));
var Table_1 = require("./Table");
var Copyable_1 = tslib_1.__importDefault(require("./Copyable"));
var icons_1 = require("../components/icons");
var Card = /** @class */ (function (_super) {
    tslib_1.__extends(Card, _super);
    function Card(props) {
        var _this = _super.call(this, props) || this;
        _this.getPopOverContainer = _this.getPopOverContainer.bind(_this);
        _this.itemRender = _this.itemRender.bind(_this);
        _this.handleAction = _this.handleAction.bind(_this);
        _this.handleQuickChange = _this.handleQuickChange.bind(_this);
        _this.handleClick = _this.handleClick.bind(_this);
        _this.handleCheck = _this.handleCheck.bind(_this);
        return _this;
    }
    Card.prototype.handleClick = function (e) {
        var target = e.target;
        var ns = this.props.classPrefix;
        var formItem;
        if (!e.currentTarget.contains(target) ||
            ~['INPUT', 'TEXTAREA'].indexOf(target.tagName) ||
            ((formItem = target.closest("button, a, ." + ns + "Form-item")) &&
                e.currentTarget.contains(formItem))) {
            return;
        }
        var item = this.props.item;
        this.props.onCheck && this.props.onCheck(item);
    };
    Card.prototype.handleCheck = function () {
        var item = this.props.item;
        this.props.onCheck && this.props.onCheck(item);
    };
    Card.prototype.handleAction = function (e, action, ctx) {
        var _a = this.props, onAction = _a.onAction, item = _a.item;
        onAction && onAction(e, action, ctx || item.data);
    };
    Card.prototype.handleQuickChange = function (values, saveImmediately, savePristine, resetOnFailed) {
        var _a = this.props, onQuickChange = _a.onQuickChange, item = _a.item;
        onQuickChange &&
            onQuickChange(item, values, saveImmediately, savePristine, resetOnFailed);
    };
    Card.prototype.getPopOverContainer = function () {
        return react_dom_1.findDOMNode(this);
    };
    Card.prototype.renderToolbar = function () {
        var _a = this.props, dragging = _a.dragging, selectable = _a.selectable, checkable = _a.checkable, selected = _a.selected, onSelect = _a.onSelect, checkOnItemClick = _a.checkOnItemClick, multiple = _a.multiple, hideCheckToggler = _a.hideCheckToggler, cx = _a.classnames, ns = _a.classPrefix;
        if (dragging) {
            return (react_1.default.createElement("div", { className: cx('Card-dragBtn') },
                react_1.default.createElement(icons_1.Icon, { icon: "drag-bar", className: "icon" })));
        }
        else if (selectable && !hideCheckToggler) {
            return (react_1.default.createElement("div", { className: cx('Card-checkBtn') },
                react_1.default.createElement(Checkbox_1.default, { classPrefix: ns, type: multiple ? 'checkbox' : 'radio', disabled: !checkable, checked: selected, onChange: checkOnItemClick ? helper_2.noop : this.handleCheck })));
        }
        return null;
    };
    Card.prototype.renderActions = function () {
        var _this = this;
        var _a = this.props, actions = _a.actions, render = _a.render, dragging = _a.dragging, actionsCount = _a.actionsCount, data = _a.data, cx = _a.classnames;
        if (Array.isArray(actions)) {
            var group = helper_2.padArr(actions.filter(function (item) { return helper_2.isVisible(item, data); }), actionsCount);
            return group.map(function (actions, groupIndex) { return (react_1.default.createElement("div", { key: groupIndex, className: cx('Card-actions') }, actions.map(function (action, index) {
                var size = action.size || 'sm';
                return render("action/" + index, tslib_1.__assign(tslib_1.__assign({ level: 'link', type: 'button' }, action), { size: size }), {
                    isMenuItem: true,
                    key: index,
                    index: index,
                    disabled: dragging || helper_2.isDisabled(action, data),
                    className: cx('Card-action', action.className || "" + (size ? "Card-action--" + size : '')),
                    componentClass: 'a',
                    onAction: _this.handleAction
                });
            }))); });
        }
        return null;
    };
    Card.prototype.renderChild = function (node, region, key) {
        if (region === void 0) { region = 'body'; }
        if (key === void 0) { key = 0; }
        var render = this.props.render;
        if (typeof node === 'string' || typeof node === 'number') {
            return render(region, node, { key: key });
        }
        var childNode = node;
        if (childNode.type === 'hbox' || childNode.type === 'grid') {
            return render(region, node, {
                key: key,
                itemRender: this.itemRender
            });
        }
        return this.renderFeild(region, childNode, key, this.props);
    };
    Card.prototype.itemRender = function (field, index, props) {
        return this.renderFeild("column/" + index, field, index, props);
    };
    Card.prototype.renderFeild = function (region, field, key, props) {
        var render = props.render, cx = props.classnames, itemIndex = props.itemIndex;
        var data = this.props.data;
        if (!helper_2.isVisible(field, data)) {
            return;
        }
        var $$id = field.$$id ? field.$$id + "-field" : '';
        return (react_1.default.createElement("div", { className: cx('Card-field'), key: key },
            field && field.label ? (react_1.default.createElement("label", { className: cx('Card-fieldLabel', field.labelClassName) }, field.label)) : null,
            render(region, tslib_1.__assign(tslib_1.__assign({}, field), { field: field, $$id: $$id, type: 'card-item-field' }), {
                className: cx('Card-fieldValue', field.className),
                rowIndex: itemIndex,
                colIndex: key,
                value: field.name ? tpl_builtin_1.resolveVariable(field.name, data) : undefined,
                popOverContainer: this.getPopOverContainer,
                onAction: this.handleAction,
                onQuickChange: this.handleQuickChange
            })));
    };
    Card.prototype.renderBody = function () {
        var _this = this;
        var body = this.props.body;
        if (!body) {
            return null;
        }
        if (Array.isArray(body)) {
            return body.map(function (child, index) {
                return _this.renderChild(child, "body/" + index, index);
            });
        }
        return this.renderChild(body, 'body');
    };
    Card.prototype.render = function () {
        var _a = this.props, className = _a.className, data = _a.data, header = _a.header, render = _a.render, bodyClassName = _a.bodyClassName, highlightClassName = _a.highlightClassName, titleClassName = _a.titleClassName, subTitleClassName = _a.subTitleClassName, descClassName = _a.descClassName, checkOnItemClick = _a.checkOnItemClick, avatarClassName = _a.avatarClassName, checkable = _a.checkable, cx = _a.classnames, ns = _a.classPrefix, imageClassName = _a.imageClassName, avatarTextClassName = _a.avatarTextClassName;
        var heading = null;
        if (header) {
            var highlightTpl = header.highlight, avatarTpl = header.avatar, avatarTextTpl = header.avatarText, titleTpl = header.title, subTitleTpl = header.subTitle, subTitlePlaceholder = header.subTitlePlaceholder, descTpl = header.desc;
            var descPlaceholder = header.descriptionPlaceholder || header.descPlaceholder;
            var highlight = !!helper_1.evalExpression(highlightTpl, data);
            var avatar = tpl_1.filter(avatarTpl, data, '| raw');
            var avatarText = tpl_1.filter(avatarTextTpl, data);
            var title = tpl_1.filter(titleTpl, data);
            var subTitle = tpl_1.filter(subTitleTpl, data);
            var desc = tpl_1.filter(header.description || descTpl, data);
            heading = (react_1.default.createElement("div", { className: cx('Card-heading', header.className) },
                avatar ? (react_1.default.createElement("span", { className: cx('Card-avtar', header.avatarClassName || avatarClassName) },
                    react_1.default.createElement("img", { className: cx('Card-img', header.imageClassName || imageClassName), src: avatar }))) : avatarText ? (react_1.default.createElement("span", { className: cx('Card-avtarText', header.avatarTextClassName || avatarTextClassName) }, avatarText)) : null,
                react_1.default.createElement("div", { className: cx('Card-meta') },
                    highlight ? (react_1.default.createElement("i", { className: cx('Card-highlight', header.highlightClassName || highlightClassName) })) : null,
                    title ? (react_1.default.createElement("div", { className: cx('Card-title', header.titleClassName || titleClassName) }, render('title', title))) : null,
                    subTitle || subTitlePlaceholder ? (react_1.default.createElement("div", { className: cx('Card-subTitle', header.subTitleClassName || subTitleClassName) }, render('sub-title', subTitle || subTitlePlaceholder, {
                        className: cx(!subTitle ? 'Card-placeholder' : undefined)
                    }))) : null,
                    desc || descPlaceholder ? (react_1.default.createElement("div", { className: cx('Card-desc', header.descriptionClassName ||
                            header.descClassName ||
                            descClassName) }, render('desc', desc || descPlaceholder, {
                        className: !desc ? 'text-muted' : undefined
                    }))) : null)));
        }
        var body = this.renderBody();
        return (react_1.default.createElement("div", { onClick: checkOnItemClick && checkable ? this.handleClick : undefined, className: cx('Card', className) },
            this.renderToolbar(),
            heading,
            body ? (react_1.default.createElement("div", { className: cx('Card-body', bodyClassName) }, body)) : null,
            this.renderActions()));
    };
    Card.defaultProps = {
        className: '',
        avatarClassName: '',
        bodyClassName: '',
        actionsCount: 4,
        titleClassName: '',
        highlightClassName: '',
        subTitleClassName: '',
        descClassName: ''
    };
    Card.propsList = [
        'avatarClassName',
        'bodyClassName',
        'actionsCount',
        'titleClassName',
        'highlightClassName',
        'subTitleClassName',
        'descClassName',
        'hideCheckToggler'
    ];
    return Card;
}(react_1.default.Component));
exports.Card = Card;
var CardRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(CardRenderer, _super);
    function CardRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CardRenderer.propsList = tslib_1.__spreadArrays(['multiple'], Card.propsList);
    CardRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)card$/,
            name: 'card'
        })
    ], CardRenderer);
    return CardRenderer;
}(Card));
exports.CardRenderer = CardRenderer;
var CardItemFieldRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(CardItemFieldRenderer, _super);
    function CardItemFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CardItemFieldRenderer.prototype.render = function () {
        var _a = this.props, type = _a.type, className = _a.className, render = _a.render, style = _a.style, Component = _a.wrapperComponent, labelClassName = _a.labelClassName, value = _a.value, data = _a.data, children = _a.children, width = _a.width, innerClassName = _a.innerClassName, label = _a.label, tabIndex = _a.tabIndex, onKeyUp = _a.onKeyUp, field = _a.field, rest = tslib_1.__rest(_a, ["type", "className", "render", "style", "wrapperComponent", "labelClassName", "value", "data", "children", "width", "innerClassName", "label", "tabIndex", "onKeyUp", "field"]);
        var schema = tslib_1.__assign(tslib_1.__assign({}, field), { className: innerClassName, type: (field && field.type) || 'plain' });
        var body = children
            ? children
            : render('field', schema, tslib_1.__assign(tslib_1.__assign({}, rest), { value: value,
                data: data }));
        if (width) {
            style = style || {};
            style.width = style.width || width;
            body = (react_1.default.createElement("div", { style: { width: !/%/.test(String(width)) ? width : '' } }, body));
        }
        if (!Component) {
            return body;
        }
        return (react_1.default.createElement(Component, { style: style, className: className, tabIndex: tabIndex, onKeyUp: onKeyUp }, body));
    };
    CardItemFieldRenderer.defaultProps = tslib_1.__assign(tslib_1.__assign({}, Table_1.TableCell.defaultProps), { wrapperComponent: 'div' });
    CardItemFieldRenderer.propsList = tslib_1.__spreadArrays([
        'quickEdit',
        'quickEditEnabledOn',
        'popOver',
        'copyable',
        'inline'
    ], Table_1.TableCell.propsList);
    CardItemFieldRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)card-item-field$/,
            name: 'card-item'
        }),
        QuickEdit_1.default(),
        PopOver_1.default(),
        Copyable_1.default()
    ], CardItemFieldRenderer);
    return CardItemFieldRenderer;
}(Table_1.TableCell));
exports.CardItemFieldRenderer = CardItemFieldRenderer;
//# sourceMappingURL=./renderers/Card.js.map
