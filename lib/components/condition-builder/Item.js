"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionItem = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var types_1 = require("./types");
var theme_1 = require("../../theme");
var icons_1 = require("../icons");
var helper_1 = require("../../utils/helper");
var Expression_1 = tslib_1.__importDefault(require("./Expression"));
var config_1 = require("./config");
var PopOverContainer_1 = tslib_1.__importDefault(require("../PopOverContainer"));
var ListRadios_1 = tslib_1.__importDefault(require("../ListRadios"));
var ResultBox_1 = tslib_1.__importDefault(require("../ResultBox"));
var option2value = function (item) { return item.value; };
var ConditionItem = /** @class */ (function (_super) {
    tslib_1.__extends(ConditionItem, _super);
    function ConditionItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConditionItem.prototype.handleLeftFieldSelect = function (field) {
        var value = tslib_1.__assign({}, this.props.value);
        var onChange = this.props.onChange;
        value.left = field;
        onChange(value, this.props.index);
    };
    ConditionItem.prototype.handleLeftInputTypeChange = function (type) {
        var value = tslib_1.__assign({}, this.props.value);
        var onChange = this.props.onChange;
        if (type === 'func') {
            value.left = { type: 'func' };
        }
        else {
            value.left = '';
        }
        onChange(value, this.props.index);
    };
    ConditionItem.prototype.handleLeftChange = function (leftValue) {
        var value = tslib_1.__assign(tslib_1.__assign({}, this.props.value), { left: leftValue, op: undefined, right: undefined });
        var onChange = this.props.onChange;
        onChange(value, this.props.index);
    };
    ConditionItem.prototype.handleOperatorChange = function (op) {
        var value = tslib_1.__assign(tslib_1.__assign({}, this.props.value), { op: op, right: undefined });
        this.props.onChange(value, this.props.index);
    };
    ConditionItem.prototype.handleRightChange = function (rightValue) {
        var value = tslib_1.__assign(tslib_1.__assign({}, this.props.value), { right: rightValue });
        var onChange = this.props.onChange;
        onChange(value, this.props.index);
    };
    ConditionItem.prototype.handleRightSubChange = function (index, rightValue) {
        var _a;
        var origin = Array.isArray((_a = this.props.value) === null || _a === void 0 ? void 0 : _a.right)
            ? this.props.value.right.concat()
            : [];
        origin[index] = rightValue;
        var value = tslib_1.__assign(tslib_1.__assign({}, this.props.value), { right: origin });
        var onChange = this.props.onChange;
        onChange(value, this.props.index);
    };
    ConditionItem.prototype.renderLeft = function () {
        var _a = this.props, value = _a.value, fields = _a.fields, funcs = _a.funcs, config = _a.config;
        return (react_1.default.createElement(Expression_1.default, { config: config, funcs: funcs, value: value.left, onChange: this.handleLeftChange, fields: fields, allowedTypes: ['field', 'func'].filter(function (type) { return type === 'field' || type === 'func'; }) }));
    };
    ConditionItem.prototype.renderOperator = function () {
        var _this = this;
        var _a, _b, _c, _d;
        var _e = this.props, funcs = _e.funcs, config = _e.config, fields = _e.fields, value = _e.value, cx = _e.classnames;
        var left = value === null || value === void 0 ? void 0 : value.left;
        var operators = [];
        if (((_a = left) === null || _a === void 0 ? void 0 : _a.type) === 'func') {
            var func = helper_1.findTree(funcs, function (i) { return i.type === left.func; });
            if (func) {
                operators = (_b = config.types[func.returnType]) === null || _b === void 0 ? void 0 : _b.operators;
            }
        }
        else if (((_c = left) === null || _c === void 0 ? void 0 : _c.type) === 'field') {
            var field = helper_1.findTree(fields, function (i) { return i.name === left.field; });
            if (field) {
                operators = field.operators || ((_d = config.types[field.type]) === null || _d === void 0 ? void 0 : _d.operators);
            }
        }
        if (Array.isArray(operators) && operators.length) {
            return (react_1.default.createElement(PopOverContainer_1.default, { popOverRender: function (_a) {
                    var onClose = _a.onClose;
                    return (react_1.default.createElement(ListRadios_1.default, { onClick: onClose, option2value: option2value, onChange: _this.handleOperatorChange, options: operators.map(function (operator) { return ({
                            label: config_1.OperationMap[operator],
                            value: operator
                        }); }), value: value.op, showRadio: false }));
                } }, function (_a) {
                var onClick = _a.onClick, isOpened = _a.isOpened, ref = _a.ref;
                return (react_1.default.createElement("div", { className: cx('CBGroup-operator') },
                    react_1.default.createElement(ResultBox_1.default, { className: cx('CBGroup-operatorInput', isOpened ? 'is-active' : ''), ref: ref, allowInput: false, result: config_1.OperationMap[value === null || value === void 0 ? void 0 : value.op], onResultChange: helper_1.noop, onResultClick: onClick, placeholder: "\u8BF7\u9009\u62E9\u64CD\u4F5C" },
                        react_1.default.createElement("span", { className: cx('CBGroup-operatorCaret') },
                            react_1.default.createElement(icons_1.Icon, { icon: "caret", className: "icon" })))));
            }));
        }
        return null;
    };
    ConditionItem.prototype.renderRight = function () {
        var _a, _b;
        var _c = this.props, value = _c.value, funcs = _c.funcs, fields = _c.fields;
        if (!(value === null || value === void 0 ? void 0 : value.op)) {
            return null;
        }
        var left = value === null || value === void 0 ? void 0 : value.left;
        var leftType = '';
        if (((_a = left) === null || _a === void 0 ? void 0 : _a.type) === 'func') {
            var func = helper_1.findTree(funcs, function (i) { return i.type === left.func; });
            if (func) {
                leftType = func.returnType;
            }
        }
        else if (((_b = left) === null || _b === void 0 ? void 0 : _b.type) === 'field') {
            var field = helper_1.findTree(fields, function (i) { return i.name === left.field; });
            if (field) {
                leftType = field.type;
            }
        }
        if (leftType) {
            return this.renderRightWidgets(leftType, value.op);
        }
        return null;
    };
    ConditionItem.prototype.renderRightWidgets = function (type, op) {
        var _a, _b, _c;
        var _d = this.props, funcs = _d.funcs, value = _d.value, data = _d.data, fields = _d.fields, config = _d.config, cx = _d.classnames;
        var field = tslib_1.__assign(tslib_1.__assign({}, config.types[type]), { type: type });
        if (((_a = value === null || value === void 0 ? void 0 : value.left) === null || _a === void 0 ? void 0 : _a.type) === 'field') {
            var leftField = helper_1.findTree(fields, function (i) { return i.name === (value === null || value === void 0 ? void 0 : value.left).field; });
            if (leftField) {
                field = tslib_1.__assign(tslib_1.__assign({}, field), leftField);
            }
        }
        if (op === 'is_empty' || op === 'is_not_empty') {
            return null;
        }
        else if (op === 'between' || op === 'not_between') {
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(Expression_1.default, { config: config, funcs: funcs, valueField: field, value: (_b = value.right) === null || _b === void 0 ? void 0 : _b[0], data: data, onChange: this.handleRightSubChange.bind(this, 0), fields: fields, allowedTypes: (field === null || field === void 0 ? void 0 : field.valueTypes) ||
                        config.valueTypes || ['value', 'field', 'func', 'formula'] }),
                react_1.default.createElement("span", { className: cx('CBSeprator') }, "~"),
                react_1.default.createElement(Expression_1.default, { config: config, funcs: funcs, valueField: field, value: (_c = value.right) === null || _c === void 0 ? void 0 : _c[1], data: data, onChange: this.handleRightSubChange.bind(this, 1), fields: fields, allowedTypes: (field === null || field === void 0 ? void 0 : field.valueTypes) ||
                        config.valueTypes || ['value', 'field', 'func', 'formula'] })));
        }
        return (react_1.default.createElement(Expression_1.default, { config: config, op: op, funcs: funcs, valueField: field, value: value.right, data: data, onChange: this.handleRightChange, fields: fields, allowedTypes: (field === null || field === void 0 ? void 0 : field.valueTypes) ||
                config.valueTypes || ['value', 'field', 'func', 'formula'] }));
    };
    ConditionItem.prototype.render = function () {
        var cx = this.props.classnames;
        return (react_1.default.createElement("div", { className: cx('CBItem') },
            this.renderLeft(),
            this.renderOperator(),
            this.renderRight()));
    };
    var _a;
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ConditionItem.prototype, "handleLeftFieldSelect", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ConditionItem.prototype, "handleLeftInputTypeChange", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ConditionItem.prototype, "handleLeftChange", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof types_1.OperatorType !== "undefined" && types_1.OperatorType) === "function" ? _a : Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ConditionItem.prototype, "handleOperatorChange", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ConditionItem.prototype, "handleRightChange", null);
    return ConditionItem;
}(react_1.default.Component));
exports.ConditionItem = ConditionItem;
exports.default = theme_1.themeable(ConditionItem);
//# sourceMappingURL=./components/condition-builder/Item.js.map
