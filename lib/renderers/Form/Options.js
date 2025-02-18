"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.highlight = exports.OptionsControl = exports.registerOptionsControl = exports.detectProps = exports.Option = void 0;
var tslib_1 = require("tslib");
var api_1 = require("../../utils/api");
var mobx_state_tree_1 = require("mobx-state-tree");
var helper_1 = require("../../utils/helper");
var mobx_1 = require("mobx");
var Item_1 = require("./Item");
var react_1 = tslib_1.__importDefault(require("react"));
var tpl_builtin_1 = require("../../utils/tpl-builtin");
var Select_1 = require("../../components/Select");
Object.defineProperty(exports, "Option", { enumerable: true, get: function () { return Select_1.Option; } });
var tpl_1 = require("../../utils/tpl");
var findIndex_1 = tslib_1.__importDefault(require("lodash/findIndex"));
exports.detectProps = Item_1.detectProps.concat([
    'options',
    'size',
    'buttons',
    'columnsCount',
    'multiple',
    'hideRoot',
    'checkAll',
    'showIcon',
    'showRadio',
    'btnDisabled',
    'joinValues',
    'extractValue'
]);
function registerOptionsControl(config) {
    var Control = config.component;
    var FormOptionsItem = /** @class */ (function (_super) {
        tslib_1.__extends(FormOptionsItem, _super);
        function FormOptionsItem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FormOptionsItem.prototype.componentWillMount = function () {
            var _this = this;
            var _a = this.props, initFetch = _a.initFetch, formItem = _a.formItem, source = _a.source, data = _a.data, setPrinstineValue = _a.setPrinstineValue, defaultValue = _a.defaultValue, multiple = _a.multiple, joinValues = _a.joinValues, extractValue = _a.extractValue, addHook = _a.addHook, formInited = _a.formInited, valueField = _a.valueField, options = _a.options, value = _a.value, onChange = _a.onChange;
            if (formItem) {
                formItem.setOptions(Select_1.normalizeOptions(options), onChange);
                this.reaction = mobx_1.reaction(function () { return JSON.stringify([formItem.loading, formItem.filteredOptions]); }, function () { return _this.forceUpdate(); });
            }
            var loadOptions = initFetch !== false;
            if (formItem && joinValues === false && defaultValue) {
                var selectedOptions = extractValue
                    ? formItem
                        .getSelectedOptions(value)
                        .map(function (selectedOption) {
                        return selectedOption[valueField || 'value'];
                    })
                    : formItem.getSelectedOptions(value);
                setPrinstineValue(multiple ? selectedOptions.concat() : selectedOptions[0]);
            }
            loadOptions &&
                config.autoLoadOptionsFromSource !== false &&
                (formInited
                    ? this.reload()
                    : addHook && addHook(this.initOptions, 'init'));
        };
        FormOptionsItem.prototype.componentDidMount = function () {
            this.normalizeValue();
        };
        FormOptionsItem.prototype.shouldComponentUpdate = function (nextProps) {
            if (config.strictMode === false || nextProps.strictMode === false) {
                return true;
            }
            else if (nextProps.source || nextProps.autoComplete) {
                return true;
            }
            if (helper_1.anyChanged(exports.detectProps, this.props, nextProps)) {
                return true;
            }
            return false;
        };
        FormOptionsItem.prototype.componentDidUpdate = function (prevProps) {
            var _this = this;
            var props = this.props;
            var formItem = props.formItem;
            if (!formItem || !props.formInited) {
                return;
            }
            else if (!prevProps.formItem) {
                // todo 优化 name 变化情况。
            }
            if (prevProps.value !== props.value || formItem.expressionsInOptions) {
                formItem.syncOptions();
            }
            if (prevProps.options !== props.options && formItem) {
                formItem.setOptions(Select_1.normalizeOptions(props.options || []), props.onChange);
                this.normalizeValue();
            }
            else if (config.autoLoadOptionsFromSource !== false &&
                props.source &&
                formItem &&
                (prevProps.source !== props.source || prevProps.data !== props.data)) {
                if (tpl_builtin_1.isPureVariable(props.source)) {
                    var prevOptions = tpl_builtin_1.resolveVariableAndFilter(prevProps.source, prevProps.data, '| raw');
                    var options = tpl_builtin_1.resolveVariableAndFilter(props.source, props.data, '| raw');
                    if (prevOptions !== options) {
                        formItem.setOptions(Select_1.normalizeOptions(options || []), props.onChange);
                        this.normalizeValue();
                    }
                }
                else if (api_1.isEffectiveApi(props.source, props.data) &&
                    api_1.isApiOutdated(prevProps.source, props.source, prevProps.data, props.data)) {
                    formItem
                        .loadOptions(props.source, props.data, undefined, true, props.onChange)
                        .then(function () { return _this.normalizeValue(); });
                }
            }
        };
        FormOptionsItem.prototype.componentWillUnmount = function () {
            this.props.removeHook && this.props.removeHook(this.reload, 'init');
            this.reaction && this.reaction();
        };
        FormOptionsItem.prototype.normalizeValue = function () {
            var _a = this.props, joinValues = _a.joinValues, extractValue = _a.extractValue, value = _a.value, multiple = _a.multiple, formItem = _a.formItem, valueField = _a.valueField;
            if (!formItem || joinValues !== false || !formItem.options.length) {
                return;
            }
            if (extractValue === false &&
                (typeof value === 'string' || typeof value === 'number')) {
                var selectedOptions = formItem.getSelectedOptions(value);
                formItem.changeValue(multiple ? selectedOptions.concat() : selectedOptions[0]);
            }
            else if (extractValue === true &&
                value &&
                !((Array.isArray(value) &&
                    value.every(function (val) { return typeof val === 'string' || typeof val === 'number'; })) ||
                    typeof value === 'string' ||
                    typeof value === 'number')) {
                var selectedOptions = formItem
                    .getSelectedOptions(value)
                    .map(function (selectedOption) { return selectedOption[valueField || 'value']; });
                formItem.changeValue(multiple ? selectedOptions.concat() : selectedOptions[0]);
            }
        };
        FormOptionsItem.prototype.getWrappedInstance = function () {
            return this.input;
        };
        FormOptionsItem.prototype.inputRef = function (ref) {
            this.input = ref;
        };
        FormOptionsItem.prototype.handleToggle = function (option, submitOnChange, changeImmediately) {
            var _a = this.props, onChange = _a.onChange, formItem = _a.formItem, value = _a.value;
            if (!formItem) {
                return;
            }
            var newValue = this.toggleValue(option, value);
            onChange && onChange(newValue, submitOnChange, changeImmediately);
        };
        FormOptionsItem.prototype.handleToggleAll = function () {
            var _a = this.props, value = _a.value, onChange = _a.onChange, joinValues = _a.joinValues, extractValue = _a.extractValue, valueField = _a.valueField, delimiter = _a.delimiter, resetValue = _a.resetValue, multiple = _a.multiple, formItem = _a.formItem;
            if (!formItem) {
                return;
            }
            var selectedOptions = formItem.getSelectedOptions(value);
            var valueArray = selectedOptions.length === formItem.filteredOptions.length
                ? []
                : formItem.filteredOptions.concat();
            var newValue = '';
            if (multiple) {
                newValue = valueArray;
                if (joinValues) {
                    newValue = newValue
                        .map(function (item) { return item[valueField || 'value']; })
                        .join(delimiter);
                }
                else if (extractValue) {
                    newValue = newValue.map(function (item) { return item[valueField || 'value']; });
                }
            }
            else {
                newValue = valueArray[0] || resetValue;
                if (joinValues && newValue) {
                    newValue = newValue[valueField || 'value'];
                }
            }
            onChange && onChange(newValue);
        };
        FormOptionsItem.prototype.toggleValue = function (option, originValue) {
            var _a = this.props, joinValues = _a.joinValues, extractValue = _a.extractValue, valueField = _a.valueField, delimiter = _a.delimiter, clearable = _a.clearable, resetValue = _a.resetValue, multiple = _a.multiple, formItem = _a.formItem;
            var valueArray = originValue !== undefined
                ? formItem.getSelectedOptions(originValue).concat()
                : [];
            var idx = findIndex_1.default(valueArray, Select_1.optionValueCompare(option[valueField || 'value'], valueField || 'value'));
            var newValue = '';
            if (multiple) {
                if (~idx) {
                    valueArray.splice(idx, 1);
                }
                else {
                    valueArray.push(option);
                }
                newValue = valueArray;
                if (joinValues) {
                    newValue = newValue
                        .map(function (item) { return item[valueField || 'value']; })
                        .join(delimiter);
                }
                else if (extractValue) {
                    newValue = newValue.map(function (item) { return item[valueField || 'value']; });
                }
            }
            else {
                if (~idx && clearable) {
                    valueArray.splice(idx, 1);
                }
                else {
                    valueArray = [option];
                }
                newValue = valueArray[0] || resetValue;
                if ((joinValues || extractValue) && newValue) {
                    newValue = newValue[valueField || 'value'];
                }
            }
            return newValue;
        };
        // 当有 action 触发，如果指定了 reload 目标组件，有可能会来到这里面来
        FormOptionsItem.prototype.reload = function () {
            return this.reloadOptions();
        };
        FormOptionsItem.prototype.reloadOptions = function (setError, isInit) {
            if (isInit === void 0) { isInit = false; }
            var _a = this.props, source = _a.source, formItem = _a.formItem, data = _a.data, onChange = _a.onChange, setPrinstineValue = _a.setPrinstineValue, selectFirst = _a.selectFirst;
            if (formItem && tpl_builtin_1.isPureVariable(source)) {
                formItem.setOptions(Select_1.normalizeOptions(tpl_builtin_1.resolveVariableAndFilter(source, data, '| raw') || []), onChange);
                return;
            }
            else if (!formItem || !api_1.isEffectiveApi(source, data)) {
                return;
            }
            return formItem.loadOptions(source, data, undefined, false, isInit ? setPrinstineValue : onChange, setError);
        };
        FormOptionsItem.prototype.deferLoad = function (option) {
            var _a = this.props, deferApi = _a.deferApi, source = _a.source, env = _a.env, formItem = _a.formItem, data = _a.data;
            if (option.loaded) {
                return;
            }
            var api = option.deferApi || deferApi || source;
            if (!api) {
                env.notify('error', '请在选项中设置 `deferApi` 或者表单项中设置 `deferApi`，用来加载子选项。');
                return;
            }
            formItem === null || formItem === void 0 ? void 0 : formItem.deferLoadOptions(option, api, helper_1.createObject(data, option));
        };
        FormOptionsItem.prototype.initOptions = function (data) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, formItem, name;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.reloadOptions(false, true)];
                        case 1:
                            _b.sent();
                            _a = this.props, formItem = _a.formItem, name = _a.name;
                            if (!formItem) {
                                return [2 /*return*/];
                            }
                            if (mobx_state_tree_1.isAlive(formItem) && formItem.value) {
                                helper_1.setVariable(data, name, formItem.value);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        FormOptionsItem.prototype.focus = function () {
            this.input && this.input.focus && this.input.focus();
        };
        FormOptionsItem.prototype.setOptions = function (options, skipNormalize) {
            if (skipNormalize === void 0) { skipNormalize = false; }
            var formItem = this.props.formItem;
            formItem &&
                formItem.setOptions(skipNormalize ? options : Select_1.normalizeOptions(options || []), this.props.onChange);
        };
        FormOptionsItem.prototype.syncOptions = function () {
            var formItem = this.props.formItem;
            formItem && formItem.syncOptions();
        };
        FormOptionsItem.prototype.setLoading = function (value) {
            var formItem = this.props.formItem;
            formItem && formItem.setLoading(value);
        };
        FormOptionsItem.prototype.handleOptionAdd = function (idx, value, skipForm) {
            if (idx === void 0) { idx = -1; }
            if (skipForm === void 0) { skipForm = false; }
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, addControls, disabled, labelField, onOpenDialog, optionLabel, addApi, source, data, valueField, model, createBtnLabel, env, __, ctx, result, _b, payload, e_1, options;
                var _c;
                return tslib_1.__generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _a = this.props, addControls = _a.addControls, disabled = _a.disabled, labelField = _a.labelField, onOpenDialog = _a.onOpenDialog, optionLabel = _a.optionLabel, addApi = _a.addApi, source = _a.source, data = _a.data, valueField = _a.valueField, model = _a.formItem, createBtnLabel = _a.createBtnLabel, env = _a.env, __ = _a.translate;
                            // 禁用或者没有配置 name
                            if (disabled || !model) {
                                return [2 /*return*/];
                            }
                            // 用户没有配置表单项，则自动创建一个 label 输入
                            if (!skipForm && (!Array.isArray(addControls) || !addControls.length)) {
                                addControls = [
                                    {
                                        type: 'text',
                                        name: labelField || 'label',
                                        label: false,
                                        placeholder: __('Options.addPlaceholder')
                                    }
                                ];
                            }
                            ctx = helper_1.createObject(data, Array.isArray(idx)
                                ? tslib_1.__assign({ parent: helper_1.getTree(model.options, idx.slice(0, -1)) }, value) : value);
                            if (!skipForm) return [3 /*break*/, 1];
                            _b = ctx;
                            return [3 /*break*/, 3];
                        case 1: return [4 /*yield*/, onOpenDialog({
                                type: 'dialog',
                                title: createBtnLabel || "\u65B0\u589E" + (optionLabel || '选项'),
                                body: {
                                    type: 'form',
                                    api: addApi,
                                    controls: addControls
                                }
                            }, ctx)];
                        case 2:
                            _b = _d.sent();
                            _d.label = 3;
                        case 3:
                            result = _b;
                            if (!(skipForm && addApi)) return [3 /*break*/, 7];
                            _d.label = 4;
                        case 4:
                            _d.trys.push([4, 6, , 7]);
                            return [4 /*yield*/, env.fetcher(addApi, result, {
                                    method: 'post'
                                })];
                        case 5:
                            payload = _d.sent();
                            if (!payload.ok) {
                                env.notify('error', payload.msg || '新增失败，请仔细检查');
                                result = null;
                            }
                            else {
                                result = payload.data || result;
                            }
                            return [3 /*break*/, 7];
                        case 6:
                            e_1 = _d.sent();
                            result = null;
                            console.error(e_1);
                            env.notify('error', e_1.message);
                            return [3 /*break*/, 7];
                        case 7:
                            // 有 result 说明弹框点了确认。否则就是取消了。
                            if (!result) {
                                return [2 /*return*/];
                            }
                            // 没走服务端的。
                            if (!result.hasOwnProperty(valueField || 'value')) {
                                result = tslib_1.__assign(tslib_1.__assign({}, result), (_c = {}, _c[valueField || 'value'] = result[labelField || 'label'], _c));
                            }
                            // 如果配置了 source 且配置了 addApi 直接重新拉取接口就够了
                            // 不能不判断 addApi 就刷新，因为有些场景就是临时添加的。
                            if (source && addApi) {
                                this.reload();
                            }
                            else {
                                options = model.options.concat();
                                if (Array.isArray(idx)) {
                                    options = helper_1.spliceTree(options, idx, 0, tslib_1.__assign({}, result));
                                }
                                else {
                                    ~idx
                                        ? options.splice(idx, 0, tslib_1.__assign({}, result))
                                        : options.push(tslib_1.__assign({}, result));
                                }
                                model.setOptions(options, this.props.onChange);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        FormOptionsItem.prototype.handleOptionEdit = function (value, origin, skipForm) {
            if (origin === void 0) { origin = value; }
            if (skipForm === void 0) { skipForm = false; }
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, editControls, disabled, labelField, onOpenDialog, editApi, env, source, data, model, optionLabel, __, result, _b, payload, e_2, indexes;
                return tslib_1.__generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.props, editControls = _a.editControls, disabled = _a.disabled, labelField = _a.labelField, onOpenDialog = _a.onOpenDialog, editApi = _a.editApi, env = _a.env, source = _a.source, data = _a.data, model = _a.formItem, optionLabel = _a.optionLabel, __ = _a.translate;
                            if (disabled || !model) {
                                return [2 /*return*/];
                            }
                            if (!skipForm && (!Array.isArray(editControls) || !editControls.length)) {
                                editControls = [
                                    {
                                        type: 'text',
                                        name: labelField || 'label',
                                        label: false,
                                        placeholder: __('Options.addPlaceholder')
                                    }
                                ];
                            }
                            if (!skipForm) return [3 /*break*/, 1];
                            _b = value;
                            return [3 /*break*/, 3];
                        case 1: return [4 /*yield*/, onOpenDialog({
                                type: 'dialog',
                                title: __('Options.editLabel', {
                                    label: optionLabel || __('Options.label')
                                }),
                                body: {
                                    type: 'form',
                                    api: editApi,
                                    controls: editControls
                                }
                            }, helper_1.createObject(data, value))];
                        case 2:
                            _b = _c.sent();
                            _c.label = 3;
                        case 3:
                            result = _b;
                            if (!(skipForm && editApi)) return [3 /*break*/, 7];
                            _c.label = 4;
                        case 4:
                            _c.trys.push([4, 6, , 7]);
                            return [4 /*yield*/, env.fetcher(editApi, helper_1.createObject(data, result), {
                                    method: 'post'
                                })];
                        case 5:
                            payload = _c.sent();
                            if (!payload.ok) {
                                env.notify('error', payload.msg || __('saveFailed'));
                                result = null;
                            }
                            else {
                                result = payload.data || result;
                            }
                            return [3 /*break*/, 7];
                        case 6:
                            e_2 = _c.sent();
                            result = null;
                            console.error(e_2);
                            env.notify('error', e_2.message);
                            return [3 /*break*/, 7];
                        case 7:
                            // 没有结果，说明取消了。
                            if (!result) {
                                return [2 /*return*/];
                            }
                            if (source && !editApi) {
                                this.reload();
                            }
                            else {
                                indexes = helper_1.findTreeIndex(model.options, function (item) { return item === origin; });
                                if (indexes) {
                                    model.setOptions(helper_1.spliceTree(model.options, indexes, 1, tslib_1.__assign(tslib_1.__assign({}, origin), result)), this.props.onChange);
                                }
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        FormOptionsItem.prototype.handleOptionDelete = function (value) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, deleteConfirmText, disabled, data, deleteApi, env, model, source, valueField, __, ctx, confirmed, _b, result, options, idx, e_3;
                return tslib_1.__generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.props, deleteConfirmText = _a.deleteConfirmText, disabled = _a.disabled, data = _a.data, deleteApi = _a.deleteApi, env = _a.env, model = _a.formItem, source = _a.source, valueField = _a.valueField, __ = _a.translate;
                            if (disabled || !model) {
                                return [2 /*return*/];
                            }
                            ctx = helper_1.createObject(data, value);
                            if (!deleteConfirmText) return [3 /*break*/, 2];
                            return [4 /*yield*/, env.confirm(tpl_1.filter(deleteConfirmText, ctx))];
                        case 1:
                            _b = _c.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            _b = true;
                            _c.label = 3;
                        case 3:
                            confirmed = _b;
                            if (!confirmed) {
                                return [2 /*return*/];
                            }
                            _c.label = 4;
                        case 4:
                            _c.trys.push([4, 6, , 7]);
                            if (!deleteApi) {
                                throw new Error(__('Options.deleteAPI'));
                            }
                            return [4 /*yield*/, env.fetcher(deleteApi, ctx, {
                                    method: 'delete'
                                })];
                        case 5:
                            result = _c.sent();
                            if (!result.ok) {
                                env.notify('error', result.msg || __('deleteFailed'));
                            }
                            else if (source) {
                                this.reload();
                            }
                            else {
                                options = model.options.concat();
                                idx = findIndex_1.default(options, function (item) { return item[valueField || 'value'] == value[valueField || 'value']; });
                                if (~idx) {
                                    options.splice(idx, 1);
                                    model.setOptions(options, this.props.onChange);
                                }
                            }
                            return [3 /*break*/, 7];
                        case 6:
                            e_3 = _c.sent();
                            console.error(e_3);
                            env.notify('error', e_3.message);
                            return [3 /*break*/, 7];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        FormOptionsItem.prototype.render = function () {
            var _a = this.props, value = _a.value, formItem = _a.formItem, addApi = _a.addApi, editApi = _a.editApi, deleteApi = _a.deleteApi, creatable = _a.creatable, editable = _a.editable, removable = _a.removable;
            return (react_1.default.createElement(Control, tslib_1.__assign({}, this.props, { ref: this.inputRef, options: formItem ? formItem.filteredOptions : [], onToggle: this.handleToggle, onToggleAll: this.handleToggleAll, selectedOptions: formItem ? formItem.getSelectedOptions(value) : [], loading: formItem ? formItem.loading : false, setLoading: this.setLoading, setOptions: this.setOptions, syncOptions: this.syncOptions, reloadOptions: this.reload, deferLoad: this.deferLoad, creatable: creatable || (creatable !== false && api_1.isEffectiveApi(addApi)), editable: editable || (editable !== false && api_1.isEffectiveApi(editApi)), removable: removable || (removable !== false && api_1.isEffectiveApi(deleteApi)), onAdd: this.handleOptionAdd, onEdit: this.handleOptionEdit, onDelete: this.handleOptionDelete })));
        };
        var _a, _b, _c, _d;
        FormOptionsItem.displayName = "OptionsControl(" + config.type + ")";
        FormOptionsItem.defaultProps = tslib_1.__assign({ delimiter: ',', labelField: 'label', valueField: 'value', joinValues: true, extractValue: false, multiple: false, placeholder: 'Select.placeholder', resetValue: '', deleteConfirmText: '确定要删除？' }, Control.defaultProps);
        FormOptionsItem.propsList = Control.propsList
            ? tslib_1.__spreadArrays(Control.propsList) : [];
        FormOptionsItem.ComposedComponent = Control;
        tslib_1.__decorate([
            helper_1.autobind,
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", [Object]),
            tslib_1.__metadata("design:returntype", void 0)
        ], FormOptionsItem.prototype, "inputRef", null);
        tslib_1.__decorate([
            helper_1.autobind,
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof Select_1.Option !== "undefined" && Select_1.Option) === "function" ? _a : Object, Boolean, Boolean]),
            tslib_1.__metadata("design:returntype", void 0)
        ], FormOptionsItem.prototype, "handleToggle", null);
        tslib_1.__decorate([
            helper_1.autobind,
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], FormOptionsItem.prototype, "handleToggleAll", null);
        tslib_1.__decorate([
            helper_1.autobind,
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], FormOptionsItem.prototype, "reload", null);
        tslib_1.__decorate([
            helper_1.autobind,
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", [Boolean, Object]),
            tslib_1.__metadata("design:returntype", void 0)
        ], FormOptionsItem.prototype, "reloadOptions", null);
        tslib_1.__decorate([
            helper_1.autobind,
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof Select_1.Option !== "undefined" && Select_1.Option) === "function" ? _b : Object]),
            tslib_1.__metadata("design:returntype", void 0)
        ], FormOptionsItem.prototype, "deferLoad", null);
        tslib_1.__decorate([
            helper_1.autobind,
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", [Object]),
            tslib_1.__metadata("design:returntype", Promise)
        ], FormOptionsItem.prototype, "initOptions", null);
        tslib_1.__decorate([
            helper_1.autobind,
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof Array !== "undefined" && Array) === "function" ? _c : Object, Object]),
            tslib_1.__metadata("design:returntype", void 0)
        ], FormOptionsItem.prototype, "setOptions", null);
        tslib_1.__decorate([
            helper_1.autobind,
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", []),
            tslib_1.__metadata("design:returntype", void 0)
        ], FormOptionsItem.prototype, "syncOptions", null);
        tslib_1.__decorate([
            helper_1.autobind,
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", [Boolean]),
            tslib_1.__metadata("design:returntype", void 0)
        ], FormOptionsItem.prototype, "setLoading", null);
        tslib_1.__decorate([
            helper_1.autobind,
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", [Object, Object, Boolean]),
            tslib_1.__metadata("design:returntype", Promise)
        ], FormOptionsItem.prototype, "handleOptionAdd", null);
        tslib_1.__decorate([
            helper_1.autobind,
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", [Object, Object, Boolean]),
            tslib_1.__metadata("design:returntype", Promise)
        ], FormOptionsItem.prototype, "handleOptionEdit", null);
        tslib_1.__decorate([
            helper_1.autobind,
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", [Object]),
            tslib_1.__metadata("design:returntype", Promise)
        ], FormOptionsItem.prototype, "handleOptionDelete", null);
        return FormOptionsItem;
    }(react_1.default.Component));
    return Item_1.registerFormItem(tslib_1.__assign(tslib_1.__assign({}, config), { strictMode: false, component: FormOptionsItem }));
}
exports.registerOptionsControl = registerOptionsControl;
function OptionsControl(config) {
    return function (component) {
        var renderer = registerOptionsControl(tslib_1.__assign(tslib_1.__assign({}, config), { component: component }));
        return renderer.component;
    };
}
exports.OptionsControl = OptionsControl;
function highlight(text, input, hlClassName) {
    if (hlClassName === void 0) { hlClassName = 'is-matched'; }
    if (!input) {
        return text;
    }
    text = String(text);
    var reg = new RegExp(input.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&'), 'i');
    if (!reg.test(text)) {
        return text;
    }
    var parts = text.split(reg);
    var dom = [];
    parts.forEach(function (text, index) {
        text && dom.push(react_1.default.createElement("span", { key: index }, text));
        dom.push(react_1.default.createElement("span", { className: hlClassName, key: index + "-hl" }, input));
    });
    dom.pop();
    return dom;
}
exports.highlight = highlight;
//# sourceMappingURL=./renderers/Form/Options.js.map
