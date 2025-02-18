"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckboxesControlRenderer = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var Options_1 = require("./Options");
var Checkbox_1 = tslib_1.__importDefault(require("../../components/Checkbox"));
var chunk_1 = tslib_1.__importDefault(require("lodash/chunk"));
var icons_1 = require("../../components/icons");
var helper_1 = require("../../utils/helper");
var CheckboxesControl = /** @class */ (function (_super) {
    tslib_1.__extends(CheckboxesControl, _super);
    function CheckboxesControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CheckboxesControl.prototype.componentDidMount = function () {
        var _a = this.props, defaultCheckAll = _a.defaultCheckAll, onToggleAll = _a.onToggleAll;
        defaultCheckAll && onToggleAll();
    };
    CheckboxesControl.prototype.componentDidUpdate = function (prevProps) {
        var _a = this.props, currOptions = _a.options, onToggleAll = _a.onToggleAll, defaultCheckAll = _a.defaultCheckAll;
        var prevOptions = prevProps.options;
        if (defaultCheckAll && prevOptions != currOptions) {
            onToggleAll();
        }
    };
    CheckboxesControl.prototype.reload = function () {
        var reload = this.props.reloadOptions;
        reload && reload();
    };
    CheckboxesControl.prototype.handleAddClick = function () {
        var onAdd = this.props.onAdd;
        onAdd && onAdd();
    };
    CheckboxesControl.prototype.handleEditClick = function (e, item) {
        var onEdit = this.props.onEdit;
        e.preventDefault();
        e.stopPropagation();
        onEdit && onEdit(item);
    };
    CheckboxesControl.prototype.handleDeleteClick = function (e, item) {
        var onDelete = this.props.onDelete;
        e.preventDefault();
        e.stopPropagation();
        onDelete && onDelete(item);
    };
    CheckboxesControl.prototype.renderGroup = function (option, index) {
        var _this = this;
        var _a = this.props, cx = _a.classnames, labelField = _a.labelField;
        return (react_1.default.createElement("div", { key: index, className: cx('CheckboxesControl-group', option.className) },
            react_1.default.createElement("label", { className: cx('CheckboxesControl-groupLabel', option.labelClassName) }, option[labelField || 'label']),
            option.children && option.children.length
                ? option.children.map(function (option, index) {
                    return _this.renderItem(option, index);
                })
                : null));
    };
    CheckboxesControl.prototype.renderItem = function (option, index) {
        var _this = this;
        if (option.children) {
            return this.renderGroup(option, index);
        }
        var _a = this.props, itemClassName = _a.itemClassName, onToggle = _a.onToggle, selectedOptions = _a.selectedOptions, disabled = _a.disabled, inline = _a.inline, labelClassName = _a.labelClassName, labelField = _a.labelField, removable = _a.removable, editable = _a.editable, __ = _a.translate;
        return (react_1.default.createElement(Checkbox_1.default, { className: itemClassName, key: index, onChange: function () { return onToggle(option); }, checked: !!~selectedOptions.indexOf(option), disabled: disabled || option.disabled, inline: inline, labelClassName: labelClassName, description: option.description },
            String(option[labelField || 'label']),
            removable ? (react_1.default.createElement("a", { "data-tooltip": __('Select.clear'), "data-position": "left" },
                react_1.default.createElement(icons_1.Icon, { icon: "minus", className: "icon", onClick: function (e) { return _this.handleDeleteClick(e, option); } }))) : null,
            editable ? (react_1.default.createElement("a", { "data-tooltip": "\u7F16\u8F91", "data-position": "left" },
                react_1.default.createElement(icons_1.Icon, { icon: "pencil", className: "icon", onClick: function (e) { return _this.handleEditClick(e, option); } }))) : null));
    };
    CheckboxesControl.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, disabled = _a.disabled, placeholder = _a.placeholder, options = _a.options, inline = _a.inline, columnsCount = _a.columnsCount, selectedOptions = _a.selectedOptions, onToggle = _a.onToggle, onToggleAll = _a.onToggleAll, checkAll = _a.checkAll, cx = _a.classnames, itemClassName = _a.itemClassName, labelClassName = _a.labelClassName, creatable = _a.creatable, addApi = _a.addApi, createBtnLabel = _a.createBtnLabel, __ = _a.translate;
        var body = [];
        if (options && options.length) {
            body = options.map(function (option, key) { return _this.renderItem(option, key); });
        }
        if (checkAll && body.length) {
            body.unshift(react_1.default.createElement(Checkbox_1.default, { key: "checkall", className: itemClassName, onChange: onToggleAll, checked: !!selectedOptions.length, partial: !!(selectedOptions.length &&
                    selectedOptions.length !== options.length), disabled: disabled, inline: inline, labelClassName: labelClassName }, "\u5168\u9009/\u4E0D\u9009"));
        }
        if (!inline && columnsCount > 1) {
            var weight = 12 / columnsCount;
            var cellClassName_1 = "Grid-col--sm" + (weight === Math.round(weight) ? weight : '');
            body = chunk_1.default(body, columnsCount).map(function (group, groupIndex) { return (react_1.default.createElement("div", { className: cx('Grid'), key: groupIndex }, Array.from({ length: columnsCount }).map(function (_, index) { return (react_1.default.createElement("div", { key: index, className: cx(cellClassName_1) }, group[index])); }))); });
        }
        return (react_1.default.createElement("div", { className: cx("CheckboxesControl", className) },
            body && body.length ? (body) : (react_1.default.createElement("span", { className: "Form-placeholder" }, __(placeholder))),
            (creatable || addApi) && !disabled ? (react_1.default.createElement("a", { className: cx('Checkboxes-addBtn'), onClick: this.handleAddClick },
                react_1.default.createElement(icons_1.Icon, { icon: "plus", className: "icon" }),
                __(createBtnLabel))) : null));
    };
    var _a, _b;
    CheckboxesControl.defaultProps = {
        columnsCount: 1,
        multiple: true,
        placeholder: 'placeholder.noOption',
        creatable: false,
        createBtnLabel: 'Select.createLabel'
    };
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], CheckboxesControl.prototype, "handleAddClick", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof Event !== "undefined" && Event) === "function" ? _a : Object, Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], CheckboxesControl.prototype, "handleEditClick", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof Event !== "undefined" && Event) === "function" ? _b : Object, Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], CheckboxesControl.prototype, "handleDeleteClick", null);
    return CheckboxesControl;
}(react_1.default.Component));
exports.default = CheckboxesControl;
var CheckboxesControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(CheckboxesControlRenderer, _super);
    function CheckboxesControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CheckboxesControlRenderer = tslib_1.__decorate([
        Options_1.OptionsControl({
            type: 'checkboxes',
            sizeMutable: false
        })
    ], CheckboxesControlRenderer);
    return CheckboxesControlRenderer;
}(CheckboxesControl));
exports.CheckboxesControlRenderer = CheckboxesControlRenderer;
//# sourceMappingURL=./renderers/Form/Checkboxes.js.map
