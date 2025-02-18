"use strict";
/**
 * @file Tree
 * @description 树形组件
 * @author fex
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeSelector = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var helper_1 = require("../utils/helper");
var Select_1 = require("./Select");
var theme_1 = require("../theme");
var Options_1 = require("../renderers/Form/Options");
var icons_1 = require("./icons");
var Checkbox_1 = tslib_1.__importDefault(require("./Checkbox"));
var locale_1 = require("../locale");
var TreeSelector = /** @class */ (function (_super) {
    tslib_1.__extends(TreeSelector, _super);
    function TreeSelector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TreeSelector.prototype.componentWillMount = function () {
        var props = this.props;
        this.setState({
            value: Select_1.value2array(props.value, {
                multiple: props.multiple,
                delimiter: props.delimiter,
                valueField: props.valueField,
                options: props.options
            }),
            unfolded: this.syncUnFolded(props),
            inputValue: '',
            addingParent: null,
            isAdding: false,
            isEditing: false,
            editingItem: null
        });
    };
    TreeSelector.prototype.componentWillReceiveProps = function (nextProps) {
        var toUpdate = {};
        if (this.props.value !== nextProps.value ||
            this.props.options !== nextProps.options) {
            toUpdate.value = Select_1.value2array(nextProps.value, {
                multiple: nextProps.multiple,
                delimiter: nextProps.delimiter,
                valueField: nextProps.valueField,
                options: nextProps.options
            });
        }
        if (this.props.options !== nextProps.options) {
            toUpdate.unfolded = this.syncUnFolded(nextProps);
        }
        this.setState(toUpdate);
    };
    TreeSelector.prototype.syncUnFolded = function (props) {
        // 初始化树节点的展开状态
        var unfolded = {};
        var _a = this.props, foldedField = _a.foldedField, unfoldedField = _a.unfoldedField;
        helper_1.eachTree(props.options, function (node, index, level) {
            if (node.children && node.children.length) {
                var ret = true;
                if (unfoldedField && typeof node[unfoldedField] !== 'undefined') {
                    ret = !!node[unfoldedField];
                }
                else if (foldedField && typeof node[foldedField] !== 'undefined') {
                    ret = !node[foldedField];
                }
                else {
                    ret = !!props.initiallyOpen;
                    if (!ret && level <= props.unfoldedLevel) {
                        ret = true;
                    }
                }
                unfolded[node[props.valueField]] = ret;
            }
        });
        return unfolded;
    };
    TreeSelector.prototype.toggleUnfolded = function (node) {
        var _a;
        this.setState({
            unfolded: tslib_1.__assign(tslib_1.__assign({}, this.state.unfolded), (_a = {}, _a[node[this.props.valueField]] = !this.state.unfolded[node[this.props.valueField]], _a))
        });
    };
    TreeSelector.prototype.clearSelect = function () {
        var _this = this;
        this.setState({
            value: []
        }, function () {
            var _a = _this.props, joinValues = _a.joinValues, rootValue = _a.rootValue, onChange = _a.onChange;
            onChange(joinValues ? rootValue : []);
        });
    };
    TreeSelector.prototype.handleSelect = function (node, value) {
        var _this = this;
        this.setState({
            value: [node]
        }, function () {
            var _a = _this.props, joinValues = _a.joinValues, valueField = _a.valueField, onChange = _a.onChange;
            onChange(joinValues ? node[valueField] : node);
        });
    };
    TreeSelector.prototype.handleCheck = function (item, checked) {
        var props = this.props;
        var value = this.state.value.concat();
        var idx = value.indexOf(item);
        var onlyChildren = props.onlyChildren;
        if (checked) {
            ~idx || value.push(item);
            // cascade 为 true 表示父节点跟子节点没有级联关系。
            if (!props.cascade) {
                var children = item.children ? item.children.concat([]) : [];
                if (onlyChildren) {
                    // 父级选中的时候，子节点也都选中，但是自己不选中
                    !~idx && children.length && value.pop();
                    while (children.length) {
                        var child = children.shift();
                        var index = value.indexOf(child);
                        if (child.children) {
                            children.push.apply(children, child.children);
                        }
                        else if (!~index && child.value !== 'undefined') {
                            value.push(child);
                        }
                    }
                }
                else {
                    // 只要父节点选择了,子节点就不需要了,全部去掉勾选.  withChildren时相反
                    while (children.length) {
                        var child = children.shift();
                        var index = value.indexOf(child);
                        if (~index) {
                            value.splice(index, 1);
                        }
                        if (props.withChildren) {
                            value.push(child);
                        }
                        if (child.children && child.children.length) {
                            children.push.apply(children, child.children);
                        }
                    }
                    var toCheck = item;
                    while (true) {
                        var parent = helper_1.getTreeParent(props.options, toCheck);
                        if (parent === null || parent === void 0 ? void 0 : parent.value) {
                            // 如果所有孩子节点都勾选了，应该自动勾选父级。
                            if (parent.children.every(function (child) { return ~value.indexOf(child); })) {
                                if (!props.withChildren) {
                                    parent.children.forEach(function (child) {
                                        var index = value.indexOf(child);
                                        if (~index) {
                                            value.splice(index, 1);
                                        }
                                    });
                                }
                                value.push(parent);
                                toCheck = parent;
                                continue;
                            }
                        }
                        break;
                    }
                }
            }
        }
        else {
            ~idx && value.splice(idx, 1);
            if (!props.cascade && (props.withChildren || onlyChildren)) {
                var children = item.children ? item.children.concat([]) : [];
                while (children.length) {
                    var child = children.shift();
                    var index = value.indexOf(child);
                    if (~index) {
                        value.splice(index, 1);
                    }
                    if (child.children && child.children.length) {
                        children.push.apply(children, child.children);
                    }
                }
            }
        }
        this.setState({
            value: value
        }, function () {
            var joinValues = props.joinValues, extractValue = props.extractValue, valueField = props.valueField, delimiter = props.delimiter, onChange = props.onChange;
            onChange(joinValues
                ? value.map(function (item) { return item[valueField]; }).join(delimiter)
                : extractValue
                    ? value.map(function (item) { return item[valueField]; })
                    : value);
        });
    };
    TreeSelector.prototype.handleAdd = function (parent) {
        if (parent === void 0) { parent = null; }
        var _a = this.props, bultinCUD = _a.bultinCUD, onAdd = _a.onAdd, options = _a.options;
        if (!bultinCUD) {
            var idxes = helper_1.findTreeIndex(options, function (item) { return item === parent; }) || [];
            return onAdd && onAdd(idxes.concat(0));
        }
        else {
            this.setState({
                isEditing: false,
                isAdding: true,
                addingParent: parent
            });
        }
    };
    TreeSelector.prototype.handleEdit = function (item) {
        var _a = this.props, bultinCUD = _a.bultinCUD, onEdit = _a.onEdit, labelField = _a.labelField, options = _a.options;
        if (!bultinCUD) {
            onEdit === null || onEdit === void 0 ? void 0 : onEdit(item);
        }
        else {
            this.setState({
                isEditing: true,
                isAdding: false,
                editingItem: item,
                inputValue: item[labelField]
            });
        }
    };
    TreeSelector.prototype.handleRemove = function (item) {
        var onDelete = this.props.onDelete;
        onDelete && onDelete(item);
    };
    TreeSelector.prototype.handleInputChange = function (e) {
        this.setState({
            inputValue: e.currentTarget.value
        });
    };
    TreeSelector.prototype.handleConfirm = function () {
        var _a = this.state, value = _a.inputValue, isAdding = _a.isAdding, addingParent = _a.addingParent, editingItem = _a.editingItem, isEditing = _a.isEditing;
        if (!value) {
            return;
        }
        var _b = this.props, labelField = _b.labelField, onAdd = _b.onAdd, options = _b.options, onEdit = _b.onEdit;
        this.setState({
            inputValue: '',
            isAdding: false,
            isEditing: false
        }, function () {
            var _a, _b;
            if (isAdding && onAdd) {
                var idxes = (addingParent &&
                    helper_1.findTreeIndex(options, function (item) { return item === addingParent; })) ||
                    [];
                onAdd(idxes.concat(0), (_a = {}, _a[labelField] = value, _a), true);
            }
            else if (isEditing && onEdit) {
                onEdit(tslib_1.__assign(tslib_1.__assign({}, editingItem), (_b = {}, _b[labelField] = value, _b)), editingItem, true);
            }
        });
    };
    TreeSelector.prototype.handleCancel = function () {
        this.setState({
            inputValue: '',
            isAdding: false,
            isEditing: false
        });
    };
    TreeSelector.prototype.renderInput = function (prfix) {
        if (prfix === void 0) { prfix = null; }
        var _a = this.props, cx = _a.classnames, __ = _a.translate;
        var inputValue = this.state.inputValue;
        return (react_1.default.createElement("div", { className: cx('Tree-itemLabel') },
            react_1.default.createElement("div", { className: cx('Tree-itemInput') },
                prfix,
                react_1.default.createElement("input", { onChange: this.handleInputChange, value: inputValue, placeholder: __('placeholder.enter') }),
                react_1.default.createElement("a", { "data-tooltip": __('cancle'), onClick: this.handleCancel },
                    react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" })),
                react_1.default.createElement("a", { "data-tooltip": __('confirm'), onClick: this.handleConfirm },
                    react_1.default.createElement(icons_1.Icon, { icon: "check", className: "icon" })))));
    };
    TreeSelector.prototype.renderList = function (list, value, uncheckable) {
        var _this = this;
        var _a = this.props, itemClassName = _a.itemClassName, showIcon = _a.showIcon, showRadio = _a.showRadio, multiple = _a.multiple, disabled = _a.disabled, labelField = _a.labelField, valueField = _a.valueField, iconField = _a.iconField, disabledField = _a.disabledField, cascade = _a.cascade, selfDisabledAffectChildren = _a.selfDisabledAffectChildren, onlyChildren = _a.onlyChildren, cx = _a.classnames, highlightTxt = _a.highlightTxt, options = _a.options, maxLength = _a.maxLength, minLength = _a.minLength, creatable = _a.creatable, editable = _a.editable, removable = _a.removable, createTip = _a.createTip, editTip = _a.editTip, removeTip = _a.removeTip, __ = _a.translate;
        var _b = this.state, unfolded = _b.unfolded, stateValue = _b.value, isAdding = _b.isAdding, addingParent = _b.addingParent, editingItem = _b.editingItem, isEditing = _b.isEditing;
        var childrenChecked = 0;
        var ret = list.map(function (item, key) {
            if (!helper_1.isVisible(item, options)) {
                return null;
            }
            var checked = !!~value.indexOf(item);
            var selfDisabled = item[disabledField];
            var selfChecked = !!uncheckable || checked;
            var childrenItems = null;
            var selfChildrenChecked = false;
            if (item.children && item.children.length) {
                childrenItems = _this.renderList(item.children, value, cascade
                    ? false
                    : uncheckable ||
                        (selfDisabledAffectChildren ? selfDisabled : false) ||
                        (multiple && checked));
                selfChildrenChecked = !!childrenItems.childrenChecked;
                if (!selfChecked &&
                    onlyChildren &&
                    item.children.length === childrenItems.childrenChecked) {
                    selfChecked = true;
                }
                childrenItems = childrenItems.dom;
            }
            if ((onlyChildren ? selfChecked : selfChildrenChecked) || checked) {
                childrenChecked++;
            }
            var nodeDisabled = !!uncheckable || !!disabled || selfDisabled;
            if (!nodeDisabled &&
                ((maxLength && !selfChecked && stateValue.length >= maxLength) ||
                    (minLength && selfChecked && stateValue.length <= minLength))) {
                nodeDisabled = true;
            }
            var checkbox = multiple ? (react_1.default.createElement(Checkbox_1.default, { size: "sm", disabled: nodeDisabled, checked: selfChecked || (!cascade && selfChildrenChecked), partial: !selfChecked, onChange: _this.handleCheck.bind(_this, item, !selfChecked) })) : showRadio ? (react_1.default.createElement(Checkbox_1.default, { size: "sm", disabled: nodeDisabled, checked: checked, onChange: _this.handleSelect.bind(_this, item) })) : null;
            var isLeaf = (!item.children || !item.children.length) && !item.placeholder;
            return (react_1.default.createElement("li", { key: key, className: cx("Tree-item " + (itemClassName || ''), {
                    'Tree-item--isLeaf': isLeaf
                }) },
                isEditing && editingItem === item ? (_this.renderInput(checkbox)) : (react_1.default.createElement("div", { className: cx('Tree-itemLabel', {
                        'is-children-checked': multiple && !cascade && selfChildrenChecked && !nodeDisabled,
                        'is-checked': checked,
                        'is-disabled': nodeDisabled
                    }) },
                    !isLeaf ? (react_1.default.createElement("div", { onClick: function () { return _this.toggleUnfolded(item); }, className: cx('Tree-itemArrow', {
                            'is-folded': !unfolded[item[valueField]]
                        }) },
                        react_1.default.createElement(icons_1.Icon, { icon: "right-arrow-bold", className: "icon" }))) : (react_1.default.createElement("span", { className: cx('Tree-itemArrowPlaceholder') })),
                    checkbox,
                    showIcon ? (react_1.default.createElement("i", { className: cx("Tree-itemIcon " + (item[iconField] ||
                            (childrenItems ? 'Tree-folderIcon' : 'Tree-leafIcon'))), onClick: function () {
                            return !nodeDisabled &&
                                (multiple
                                    ? _this.handleCheck(item, !selfChecked)
                                    : _this.handleSelect(item));
                        } },
                        react_1.default.createElement(icons_1.Icon, { icon: childrenItems ? 'folder' : 'file', className: "icon" }))) : null,
                    react_1.default.createElement("span", { className: cx('Tree-itemText'), onClick: function () {
                            return !nodeDisabled &&
                                (multiple
                                    ? _this.handleCheck(item, !selfChecked)
                                    : _this.handleSelect(item));
                        } }, highlightTxt
                        ? Options_1.highlight("" + item[labelField], highlightTxt)
                        : "" + item[labelField]),
                    !nodeDisabled && !isAdding && !isEditing ? (react_1.default.createElement("div", { className: cx('Tree-item-icons') },
                        creatable && helper_1.hasAbility(item, 'creatable') ? (react_1.default.createElement("a", { onClick: _this.handleAdd.bind(_this, item), "data-tooltip": __(createTip), "data-position": "left" },
                            react_1.default.createElement(icons_1.Icon, { icon: "plus", className: "icon" }))) : null,
                        removable && helper_1.hasAbility(item, 'removable') ? (react_1.default.createElement("a", { onClick: _this.handleRemove.bind(_this, item), "data-tooltip": __(removeTip), "data-position": "left" },
                            react_1.default.createElement(icons_1.Icon, { icon: "minus", className: "icon" }))) : null,
                        editable && helper_1.hasAbility(item, 'editable') ? (react_1.default.createElement("a", { onClick: _this.handleEdit.bind(_this, item), "data-tooltip": __(editTip), "data-position": "left" },
                            react_1.default.createElement(icons_1.Icon, { icon: "pencil", className: "icon" }))) : null)) : null)),
                (childrenItems && unfolded[item[valueField]]) ||
                    (isAdding && addingParent === item) ? (react_1.default.createElement("ul", { className: cx('Tree-sublist') },
                    isAdding && addingParent === item ? (react_1.default.createElement("li", { className: cx('Tree-item') }, _this.renderInput(checkbox
                        ? react_1.default.cloneElement(checkbox, {
                            checked: false,
                            disabled: true
                        })
                        : null))) : null,
                    childrenItems)) : !childrenItems &&
                    item.placeholder &&
                    unfolded[item[valueField]] ? (react_1.default.createElement("ul", { className: cx('Tree-sublist') },
                    react_1.default.createElement("li", { className: cx('Tree-item') },
                        react_1.default.createElement("div", { className: cx('Tree-placeholder') }, item.placeholder)))) : null));
        });
        return {
            dom: ret,
            childrenChecked: childrenChecked
        };
    };
    TreeSelector.prototype.render = function () {
        var _a = this.props, className = _a.className, placeholder = _a.placeholder, hideRoot = _a.hideRoot, rootLabel = _a.rootLabel, showIcon = _a.showIcon, cx = _a.classnames, creatable = _a.creatable, rootCreatable = _a.rootCreatable, rootCreateTip = _a.rootCreateTip, disabled = _a.disabled, __ = _a.translate;
        var options = this.props.options;
        var _b = this.state, value = _b.value, isAdding = _b.isAdding, addingParent = _b.addingParent, isEditing = _b.isEditing, inputValue = _b.inputValue;
        var addBtn = null;
        if (creatable && rootCreatable !== false && hideRoot) {
            addBtn = (react_1.default.createElement("a", { className: cx('Tree-addTopBtn', {
                    'is-disabled': isAdding || isEditing
                }), onClick: this.handleAdd.bind(this, null) },
                react_1.default.createElement(icons_1.Icon, { icon: "plus", className: "icon" }),
                react_1.default.createElement("span", null, __(rootCreateTip))));
        }
        return (react_1.default.createElement("div", { className: cx("Tree " + (className || '')) }, (options && options.length) || addBtn || hideRoot === false ? (react_1.default.createElement("ul", { className: cx('Tree-list') }, hideRoot ? (react_1.default.createElement(react_1.default.Fragment, null,
            addBtn,
            isAdding && !addingParent ? (react_1.default.createElement("li", { className: cx('Tree-item') }, this.renderInput())) : null,
            this.renderList(options, value, false).dom)) : (react_1.default.createElement("li", { className: cx('Tree-rootItem', {
                'is-checked': !value || !value.length
            }) },
            react_1.default.createElement("div", { className: cx('Tree-itemLabel') },
                react_1.default.createElement("span", { className: cx('Tree-itemText'), onClick: this.clearSelect },
                    showIcon ? (react_1.default.createElement("i", { className: cx('Tree-itemIcon Tree-rootIcon') },
                        react_1.default.createElement(icons_1.Icon, { icon: "home", className: "icon" }))) : null,
                    rootLabel),
                !disabled &&
                    creatable &&
                    rootCreatable !== false &&
                    !isAdding &&
                    !isEditing ? (react_1.default.createElement("div", { className: cx('Tree-item-icons') }, creatable ? (react_1.default.createElement("a", { onClick: this.handleAdd.bind(this, null), "data-tooltip": rootCreateTip, "data-position": "left" },
                    react_1.default.createElement(icons_1.Icon, { icon: "plus", className: "icon" }))) : null)) : null),
            react_1.default.createElement("ul", { className: cx('Tree-sublist') },
                isAdding && !addingParent ? (react_1.default.createElement("li", { className: cx('Tree-item') }, this.renderInput())) : null,
                this.renderList(options, value, false).dom))))) : (react_1.default.createElement("div", { className: cx('Tree-placeholder') }, placeholder))));
    };
    var _a, _b, _c, _d, _e;
    TreeSelector.defaultProps = {
        showIcon: true,
        initiallyOpen: true,
        unfoldedLevel: 0,
        showRadio: false,
        multiple: false,
        disabled: false,
        withChildren: false,
        onlyChildren: false,
        labelField: 'label',
        valueField: 'value',
        iconField: 'icon',
        unfoldedField: 'unfolded',
        foldedField: 'foled',
        disabledField: 'disabled',
        joinValues: true,
        extractValue: false,
        delimiter: ',',
        hideRoot: true,
        rootLabel: 'Tree.root',
        rootValue: 0,
        cascade: false,
        selfDisabledAffectChildren: true,
        rootCreateTip: 'Tree.addRoot',
        createTip: 'Tree.addChild',
        editTip: 'Tree.editNode',
        removeTip: 'Tree.removeNode'
    };
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TreeSelector.prototype, "toggleUnfolded", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], TreeSelector.prototype, "clearSelect", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TreeSelector.prototype, "handleSelect", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Boolean]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TreeSelector.prototype, "handleCheck", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof Select_1.Option !== "undefined" && Select_1.Option) === "function" ? _a : Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TreeSelector.prototype, "handleAdd", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof Select_1.Option !== "undefined" && Select_1.Option) === "function" ? _b : Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TreeSelector.prototype, "handleEdit", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof Select_1.Option !== "undefined" && Select_1.Option) === "function" ? _c : Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TreeSelector.prototype, "handleRemove", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof react_1.default !== "undefined" && react_1.default.ChangeEvent) === "function" ? _d : Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], TreeSelector.prototype, "handleInputChange", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], TreeSelector.prototype, "handleConfirm", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], TreeSelector.prototype, "handleCancel", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof Select_1.Options !== "undefined" && Select_1.Options) === "function" ? _e : Object, Array, Boolean]),
        tslib_1.__metadata("design:returntype", Object)
    ], TreeSelector.prototype, "renderList", null);
    return TreeSelector;
}(react_1.default.Component));
exports.TreeSelector = TreeSelector;
exports.default = theme_1.themeable(locale_1.localeable(TreeSelector));
//# sourceMappingURL=./components/Tree.js.map
