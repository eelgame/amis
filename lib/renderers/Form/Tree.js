"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeControlRenderer = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var Tree_1 = tslib_1.__importDefault(require("../../components/Tree"));
var Options_1 = require("./Options");
var components_1 = require("../../components");
var TreeControl = /** @class */ (function (_super) {
    tslib_1.__extends(TreeControl, _super);
    function TreeControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TreeControl.prototype.reload = function () {
        var reload = this.props.reloadOptions;
        reload && reload();
    };
    TreeControl.prototype.render = function () {
        var _a = this.props, className = _a.className, ns = _a.classPrefix, value = _a.value, onChange = _a.onChange, disabled = _a.disabled, joinValues = _a.joinValues, extractValue = _a.extractValue, delimiter = _a.delimiter, placeholder = _a.placeholder, options = _a.options, multiple = _a.multiple, valueField = _a.valueField, initiallyOpen = _a.initiallyOpen, unfoldedLevel = _a.unfoldedLevel, withChildren = _a.withChildren, onlyChildren = _a.onlyChildren, loading = _a.loading, hideRoot = _a.hideRoot, rootLabel = _a.rootLabel, cascade = _a.cascade, rootValue = _a.rootValue, showIcon = _a.showIcon, showRadio = _a.showRadio, onAdd = _a.onAdd, creatable = _a.creatable, createTip = _a.createTip, addControls = _a.addControls, onEdit = _a.onEdit, editable = _a.editable, editTip = _a.editTip, editControls = _a.editControls, removable = _a.removable, removeTip = _a.removeTip, onDelete = _a.onDelete, rootCreatable = _a.rootCreatable, rootCreateTip = _a.rootCreateTip, labelField = _a.labelField, __ = _a.translate;
        return (react_1.default.createElement("div", { className: classnames_1.default(ns + "TreeControl", className) },
            react_1.default.createElement(components_1.Spinner, { size: "sm", key: "info", show: loading }),
            loading ? null : (react_1.default.createElement(Tree_1.default, { classPrefix: ns, labelField: labelField, valueField: valueField, disabled: disabled, onChange: onChange, joinValues: joinValues, extractValue: extractValue, delimiter: delimiter, placeholder: __(placeholder), options: options, multiple: multiple, initiallyOpen: initiallyOpen, unfoldedLevel: unfoldedLevel, withChildren: withChildren, onlyChildren: onlyChildren, hideRoot: hideRoot, rootLabel: __(rootLabel), rootValue: rootValue, showIcon: showIcon, showRadio: showRadio, cascade: cascade, foldedField: "collapsed", value: value || '', selfDisabledAffectChildren: false, onAdd: onAdd, creatable: creatable, createTip: createTip, rootCreatable: rootCreatable, rootCreateTip: rootCreateTip, onEdit: onEdit, editable: editable, editTip: editTip, removable: removable, removeTip: removeTip, onDelete: onDelete, bultinCUD: !addControls && !editControls }))));
    };
    TreeControl.defaultProps = {
        placeholder: 'loading',
        multiple: false,
        rootLabel: '顶级',
        rootValue: '',
        showIcon: true
    };
    return TreeControl;
}(react_1.default.Component));
exports.default = TreeControl;
var TreeControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(TreeControlRenderer, _super);
    function TreeControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TreeControlRenderer = tslib_1.__decorate([
        Options_1.OptionsControl({
            type: 'tree'
        })
    ], TreeControlRenderer);
    return TreeControlRenderer;
}(TreeControl));
exports.TreeControlRenderer = TreeControlRenderer;
//# sourceMappingURL=./renderers/Form/Tree.js.map
