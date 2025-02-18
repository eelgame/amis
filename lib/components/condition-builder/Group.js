"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionGroup = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var theme_1 = require("../../theme");
var Button_1 = tslib_1.__importDefault(require("../Button"));
var GroupOrItem_1 = tslib_1.__importDefault(require("./GroupOrItem"));
var helper_1 = require("../../utils/helper");
var icons_1 = require("../icons");
var ConditionGroup = /** @class */ (function (_super) {
    tslib_1.__extends(ConditionGroup, _super);
    function ConditionGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConditionGroup.prototype.getValue = function () {
        return tslib_1.__assign({ id: helper_1.guid(), conjunction: 'and' }, this.props.value);
    };
    ConditionGroup.prototype.handleNotClick = function () {
        var onChange = this.props.onChange;
        var value = this.getValue();
        value.not = !value.not;
        onChange(value);
    };
    ConditionGroup.prototype.handleConjunctionClick = function () {
        var onChange = this.props.onChange;
        var value = this.getValue();
        value.conjunction = value.conjunction === 'and' ? 'or' : 'and';
        onChange(value);
    };
    ConditionGroup.prototype.handleAdd = function () {
        var onChange = this.props.onChange;
        var value = this.getValue();
        value.children = Array.isArray(value.children)
            ? value.children.concat()
            : [];
        value.children.push({
            id: helper_1.guid()
        });
        onChange(value);
    };
    ConditionGroup.prototype.handleAddGroup = function () {
        var onChange = this.props.onChange;
        var value = this.getValue();
        value.children = Array.isArray(value.children)
            ? value.children.concat()
            : [];
        value.children.push({
            id: helper_1.guid(),
            conjunction: 'and',
            children: [
                {
                    id: helper_1.guid()
                }
            ]
        });
        onChange(value);
    };
    ConditionGroup.prototype.handleItemChange = function (item, index) {
        var onChange = this.props.onChange;
        var value = this.getValue();
        value.children = Array.isArray(value.children)
            ? value.children.concat()
            : [];
        value.children.splice(index, 1, item);
        onChange(value);
    };
    ConditionGroup.prototype.handleItemRemove = function (index) {
        var onChange = this.props.onChange;
        var value = this.getValue();
        value.children = Array.isArray(value.children)
            ? value.children.concat()
            : [];
        value.children.splice(index, 1);
        onChange(value);
    };
    ConditionGroup.prototype.render = function () {
        var _this = this;
        var _a = this.props, cx = _a.classnames, value = _a.value, data = _a.data, fields = _a.fields, funcs = _a.funcs, config = _a.config, removeable = _a.removeable, onRemove = _a.onRemove, onDragStart = _a.onDragStart, showNot = _a.showNot;
        return (react_1.default.createElement("div", { className: cx('CBGroup'), "data-group-id": value === null || value === void 0 ? void 0 : value.id },
            react_1.default.createElement("div", { className: cx('CBGroup-toolbar') },
                react_1.default.createElement("div", { className: cx('CBGroup-toolbarCondition') },
                    showNot ? (react_1.default.createElement(Button_1.default, { onClick: this.handleNotClick, className: "m-r-xs", size: "xs", active: value === null || value === void 0 ? void 0 : value.not, level: (value === null || value === void 0 ? void 0 : value.not) ? 'info' : 'default' }, "\u975E")) : null,
                    react_1.default.createElement("div", { className: cx('ButtonGroup') },
                        react_1.default.createElement(Button_1.default, { size: "xs", onClick: this.handleConjunctionClick, active: (value === null || value === void 0 ? void 0 : value.conjunction) !== 'or', level: (value === null || value === void 0 ? void 0 : value.conjunction) !== 'or' ? 'info' : 'default' }, "\u5E76\u4E14"),
                        react_1.default.createElement(Button_1.default, { size: "xs", onClick: this.handleConjunctionClick, active: (value === null || value === void 0 ? void 0 : value.conjunction) === 'or', level: (value === null || value === void 0 ? void 0 : value.conjunction) === 'or' ? 'info' : 'default' }, "\u6216\u8005"))),
                react_1.default.createElement("div", { className: cx('CBGroup-toolbarConditionAdd') },
                    react_1.default.createElement("div", { className: cx('ButtonGroup') },
                        react_1.default.createElement(Button_1.default, { onClick: this.handleAdd, size: "xs" },
                            react_1.default.createElement(icons_1.Icon, { icon: "plus", className: "icon" }),
                            "\u6DFB\u52A0\u6761\u4EF6"),
                        react_1.default.createElement(Button_1.default, { onClick: this.handleAddGroup, size: "xs" },
                            react_1.default.createElement(icons_1.Icon, { icon: "plus-cicle", className: "icon" }),
                            "\u6DFB\u52A0\u6761\u4EF6\u7EC4"))),
                removeable ? (react_1.default.createElement("a", { className: cx('CBDelete'), onClick: onRemove },
                    react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))) : null),
            react_1.default.createElement("div", { className: cx('CBGroup-body') }, Array.isArray(value === null || value === void 0 ? void 0 : value.children) && value.children.length ? (value.children.map(function (item, index) { return (react_1.default.createElement(GroupOrItem_1.default, { draggable: value.children.length > 1, onDragStart: onDragStart, config: config, key: item.id, fields: fields, value: item, index: index, onChange: _this.handleItemChange, funcs: funcs, onRemove: _this.handleItemRemove, data: data })); })) : (react_1.default.createElement("div", { className: cx('CBGroup-placeholder') }, "\u7A7A")))));
    };
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], ConditionGroup.prototype, "handleNotClick", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], ConditionGroup.prototype, "handleConjunctionClick", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], ConditionGroup.prototype, "handleAdd", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], ConditionGroup.prototype, "handleAddGroup", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Number]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ConditionGroup.prototype, "handleItemChange", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ConditionGroup.prototype, "handleItemRemove", null);
    return ConditionGroup;
}(react_1.default.Component));
exports.ConditionGroup = ConditionGroup;
exports.default = theme_1.themeable(ConditionGroup);
//# sourceMappingURL=./components/condition-builder/Group.js.map
