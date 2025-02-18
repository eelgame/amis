"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PickerControlRenderer = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var Options_1 = require("./Options");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var types_1 = require("../../types");
var find_1 = tslib_1.__importDefault(require("lodash/find"));
var helper_1 = require("../../utils/helper");
var findIndex_1 = tslib_1.__importDefault(require("lodash/findIndex"));
var Html_1 = tslib_1.__importDefault(require("../../components/Html"));
var tpl_1 = require("../../utils/tpl");
var icons_1 = require("../../components/icons");
var api_1 = require("../../utils/api");
var PickerControl = /** @class */ (function (_super) {
    tslib_1.__extends(PickerControl, _super);
    function PickerControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isOpened: false,
            schema: _this.buildSchema(_this.props),
            isFocused: false
        };
        _this.input = react_1.default.createRef();
        return _this;
    }
    PickerControl.prototype.componentDidMount = function () {
        this.fetchOptions();
    };
    PickerControl.prototype.componentWillReceiveProps = function (nextProps) {
        var props = this.props;
        if (helper_1.anyChanged(['pickerSchema', 'multiple', 'source'], props, nextProps)) {
            this.setState({
                schema: this.buildSchema(nextProps)
            });
        }
    };
    PickerControl.prototype.componentDidUpdate = function (prevProps) {
        var props = this.props;
        if (JSON.stringify(props.value) !== JSON.stringify(prevProps.value)) {
            this.fetchOptions();
        }
        else if (api_1.isApiOutdated(prevProps.source, props.source, prevProps.data, props.data)) {
            this.fetchOptions();
        }
    };
    PickerControl.prototype.fetchOptions = function () {
        var _a = this.props, value = _a.value, formItem = _a.formItem, valueField = _a.valueField, labelField = _a.labelField, source = _a.source, data = _a.data;
        var selectedOptions;
        if (!source ||
            !formItem ||
            (valueField || 'value') === (labelField || 'label') ||
            ((selectedOptions = formItem.getSelectedOptions(value)) &&
                (!selectedOptions.length ||
                    selectedOptions[0][valueField || 'value'] !==
                        selectedOptions[0][labelField || 'label']))) {
            return;
        }
        var ctx = helper_1.createObject(data, {
            value: value,
            op: 'loadOptions'
        });
        api_1.isEffectiveApi(source, ctx) &&
            formItem.loadOptions(source, ctx, {
                autoAppend: true
            });
    };
    PickerControl.prototype.buildSchema = function (props) {
        var _a, _b;
        return tslib_1.__assign(tslib_1.__assign({ checkOnItemClick: true }, props.pickerSchema), { labelTpl: (_b = (_a = props.pickerSchema) === null || _a === void 0 ? void 0 : _a.labelTpl) !== null && _b !== void 0 ? _b : props.labelTpl, type: 'crud', pickerMode: true, syncLocation: false, api: props.source, keepItemSelectionOnPageChange: true, valueField: props.valueField, labelField: props.labelField, 
            // 不支持批量操作，会乱套
            bulkActions: props.multiple
                ? props.pickerSchema.bulkActions
                : [] });
    };
    PickerControl.prototype.crudRef = function (ref) {
        while (ref && ref.getWrappedInstance) {
            ref = ref.getWrappedInstance();
        }
        this.crud = ref;
    };
    PickerControl.prototype.reload = function () {
        if (this.crud) {
            this.crud.search();
        }
        else {
            var reload = this.props.reloadOptions;
            reload && reload();
        }
    };
    PickerControl.prototype.open = function () {
        this.setState({
            isOpened: true
        });
    };
    PickerControl.prototype.close = function () {
        this.setState({
            isOpened: false
        });
    };
    PickerControl.prototype.handleModalConfirm = function (values, action, ctx, components) {
        var idx = findIndex_1.default(components, function (item) { return item.props.type === 'crud'; });
        this.handleChange(values[idx].items);
        this.close();
    };
    PickerControl.prototype.handleChange = function (items) {
        var _a = this.props, joinValues = _a.joinValues, valueField = _a.valueField, delimiter = _a.delimiter, extractValue = _a.extractValue, multiple = _a.multiple, options = _a.options, setOptions = _a.setOptions, onChange = _a.onChange;
        var value = items;
        if (joinValues) {
            value = items
                .map(function (item) { return item[valueField || 'value']; })
                .join(delimiter || ',');
        }
        else if (extractValue) {
            value = multiple
                ? items.map(function (item) { return item[valueField || 'value']; })
                : (items[0] && items[0][valueField || 'value']) || '';
        }
        else {
            value = multiple ? items : items[0];
        }
        var additionalOptions = [];
        items.forEach(function (item) {
            if (!find_1.default(options, function (option) { return item[valueField || 'value'] == option[valueField || 'value']; })) {
                additionalOptions.push(item);
            }
        });
        additionalOptions.length && setOptions(options.concat(additionalOptions));
        onChange(value);
    };
    PickerControl.prototype.removeItem = function (index) {
        var _a = this.props, selectedOptions = _a.selectedOptions, joinValues = _a.joinValues, extractValue = _a.extractValue, delimiter = _a.delimiter, valueField = _a.valueField, onChange = _a.onChange, multiple = _a.multiple;
        var items = selectedOptions.concat();
        items.splice(index, 1);
        var value = items;
        if (joinValues) {
            value = items
                .map(function (item) { return item[valueField || 'value']; })
                .join(delimiter || ',');
        }
        else if (extractValue) {
            value = multiple
                ? items.map(function (item) { return item[valueField || 'value']; })
                : (items[0] && items[0][valueField || 'value']) || '';
        }
        else {
            value = multiple ? items : items[0];
        }
        onChange(value);
    };
    PickerControl.prototype.handleKeyDown = function (e) {
        var selectedOptions = this.props.selectedOptions;
        if (e.key === ' ') {
            this.open();
            e.preventDefault();
        }
        else if (selectedOptions.length && e.key == 'Backspace') {
            this.removeItem(selectedOptions.length - 1);
        }
    };
    PickerControl.prototype.handleFocus = function () {
        this.setState({
            isFocused: true
        });
    };
    PickerControl.prototype.handleBlur = function () {
        this.setState({
            isFocused: false
        });
    };
    PickerControl.prototype.handleClick = function () {
        this.input.current && this.input.current.focus();
    };
    PickerControl.prototype.clearValue = function () {
        var _a = this.props, onChange = _a.onChange, resetValue = _a.resetValue;
        onChange(resetValue !== void 0 ? resetValue : '');
    };
    PickerControl.prototype.renderValues = function () {
        var _this = this;
        var _a = this.props, ns = _a.classPrefix, selectedOptions = _a.selectedOptions, labelField = _a.labelField, labelTpl = _a.labelTpl, disabled = _a.disabled;
        return (react_1.default.createElement("div", { className: ns + "Picker-values" }, selectedOptions.map(function (item, index) { return (react_1.default.createElement("div", { key: index, className: classnames_1.default(ns + "Picker-value", {
                'is-disabled': disabled
            }) },
            react_1.default.createElement("span", { "data-tooltip": "\u5220\u9664", "data-position": "bottom", className: ns + "Picker-valueIcon", onClick: _this.removeItem.bind(_this, index) }, "\u00D7"),
            react_1.default.createElement("span", { className: ns + "Picker-valueLabel" }, labelTpl ? (react_1.default.createElement(Html_1.default, { html: tpl_1.filter(labelTpl, item) })) : ("" + (helper_1.getVariable(item, labelField || 'label') ||
                helper_1.getVariable(item, 'id')))))); })));
    };
    PickerControl.prototype.renderBody = function (_a) {
        var popOverContainer = (_a === void 0 ? {} : _a).popOverContainer;
        var _b = this.props, render = _b.render, selectedOptions = _b.selectedOptions, options = _b.options, multiple = _b.multiple, valueField = _b.valueField, embed = _b.embed;
        return render('modal-body', this.state.schema, {
            value: selectedOptions,
            valueField: valueField,
            primaryField: valueField,
            options: options,
            multiple: multiple,
            onSelect: embed ? this.handleChange : undefined,
            ref: this.crudRef,
            popOverContainer: popOverContainer
        });
    };
    PickerControl.prototype.render = function () {
        var _a = this.props, className = _a.className, cx = _a.classnames, disabled = _a.disabled, render = _a.render, modalMode = _a.modalMode, source = _a.source, size = _a.size, env = _a.env, clearable = _a.clearable, multiple = _a.multiple, placeholder = _a.placeholder, embed = _a.embed, value = _a.value, selectedOptions = _a.selectedOptions, __ = _a.translate, popOverContainer = _a.popOverContainer;
        return (react_1.default.createElement("div", { className: cx("PickerControl", className) }, embed ? (react_1.default.createElement("div", { className: cx('Picker') }, this.renderBody({ popOverContainer: popOverContainer }))) : (react_1.default.createElement("div", { className: cx("Picker", {
                'Picker--single': !multiple,
                'Picker--multi': multiple,
                'is-focused': this.state.isFocused,
                'is-disabled': disabled
            }) },
            react_1.default.createElement("div", { onClick: this.handleClick, className: cx('Picker-input') },
                !selectedOptions.length && placeholder ? (react_1.default.createElement("div", { className: cx('Picker-placeholder') }, __(placeholder))) : null,
                react_1.default.createElement("div", { className: cx('Picker-valueWrap') },
                    this.renderValues(),
                    react_1.default.createElement("input", { onChange: helper_1.noop, value: '', ref: this.input, onKeyDown: this.handleKeyDown, onFocus: this.handleFocus, onBlur: this.handleBlur })),
                clearable && !disabled && selectedOptions.length ? (react_1.default.createElement("a", { onClick: this.clearValue, className: cx('Picker-clear') },
                    react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))) : null,
                react_1.default.createElement("span", { onClick: this.open, className: cx('Picker-btn') },
                    react_1.default.createElement(icons_1.Icon, { icon: "window-restore", className: "icon" }))),
            render('modal', {
                title: __('Select.placeholder'),
                size: size,
                type: modalMode,
                body: {
                    children: this.renderBody
                }
            }, {
                key: 'modal',
                lazyRender: !!source,
                onConfirm: this.handleModalConfirm,
                onClose: this.close,
                show: this.state.isOpened
            }))
        // <div className={`${ns}Picker`}>
        //         {this.renderValues()}
        //         <Button
        //             classPrefix={ns}
        //             className={`${ns}Picker-pickBtn`}
        //             tooltip="点击选择"
        //             tooltipContainer={env && env.getModalContainer ? env.getModalContainer : undefined}
        //             level="info"
        //             size="sm"
        //             disabled={disabled}
        //             onClick={this.open}
        //             iconOnly
        //         >
        //         选定
        //         </Button>
        //         {render('modal', {
        //             title: '请选择',
        //             size: size,
        //             type: modalMode,
        //             body: {
        //                 children: this.renderBody
        //             }
        //         }, {
        //             key: 'modal',
        //             lazyRender: !!source,
        //             onConfirm: this.handleModalConfirm,
        //             onClose: this.close,
        //             show: this.state.isOpened
        //         })}
        //     </div>
        )));
    };
    var _a, _b, _c, _d, _e;
    PickerControl.propsList = [
        'modalMode',
        'pickerSchema',
        'labelField',
        'onChange',
        'options',
        'value',
        'inline',
        'multiple',
        'embed',
        'resetValue',
        'placeholder',
        'onQuery' // 防止 Form 的 onQuery 事件透传下去，不然会导致 table 先后触发 Form 和 Crud 的 onQuery
    ];
    PickerControl.defaultProps = {
        modalMode: 'dialog',
        multiple: false,
        placeholder: '请点击右侧的图标',
        labelField: 'label',
        valueField: 'value',
        pickerSchema: {
            mode: 'list',
            listItem: {
                title: '${label|raw}'
            }
        },
        embed: false
    };
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], PickerControl.prototype, "crudRef", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], PickerControl.prototype, "open", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], PickerControl.prototype, "close", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof Array !== "undefined" && Array) === "function" ? _a : Object, typeof (_b = typeof types_1.Action !== "undefined" && types_1.Action) === "function" ? _b : Object, Object, typeof (_c = typeof Array !== "undefined" && Array) === "function" ? _c : Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], PickerControl.prototype, "handleModalConfirm", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof Array !== "undefined" && Array) === "function" ? _d : Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], PickerControl.prototype, "handleChange", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof react_1.default !== "undefined" && react_1.default.KeyboardEvent) === "function" ? _e : Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], PickerControl.prototype, "handleKeyDown", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], PickerControl.prototype, "handleFocus", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], PickerControl.prototype, "handleBlur", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], PickerControl.prototype, "handleClick", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], PickerControl.prototype, "clearValue", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], PickerControl.prototype, "renderBody", null);
    return PickerControl;
}(react_1.default.PureComponent));
exports.default = PickerControl;
var PickerControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(PickerControlRenderer, _super);
    function PickerControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PickerControlRenderer = tslib_1.__decorate([
        Options_1.OptionsControl({
            type: 'picker',
            autoLoadOptionsFromSource: false,
            sizeMutable: false
        })
    ], PickerControlRenderer);
    return PickerControlRenderer;
}(PickerControl));
exports.PickerControlRenderer = PickerControlRenderer;
//# sourceMappingURL=./renderers/Form/Picker.js.map
