"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormItemStore = void 0;
var tslib_1 = require("tslib");
var mobx_state_tree_1 = require("mobx-state-tree");
var validations_1 = require("../utils/validations");
var combo_1 = require("./combo");
var tpl_1 = require("../utils/tpl");
var findIndex_1 = tslib_1.__importDefault(require("lodash/findIndex"));
var helper_1 = require("../utils/helper");
var helper_2 = require("../utils/helper");
var Select_1 = require("../components/Select");
var find_1 = tslib_1.__importDefault(require("lodash/find"));
var SimpleMap_1 = require("../utils/SimpleMap");
var node_1 = require("./node");
var tpl_builtin_1 = require("../utils/tpl-builtin");
var manager_1 = require("./manager");
var ErrorDetail = mobx_state_tree_1.types.model('ErrorDetail', {
    msg: '',
    tag: ''
});
exports.FormItemStore = node_1.StoreNode.named('FormItemStore')
    .props({
    isFocused: false,
    type: '',
    unique: false,
    loading: false,
    required: false,
    tmpValue: mobx_state_tree_1.types.frozen(),
    rules: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.frozen(), {}),
    messages: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.frozen(), {}),
    errorData: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(ErrorDetail), []),
    name: mobx_state_tree_1.types.string,
    itemId: '',
    unsetValueOnInvisible: false,
    itemsRef: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(mobx_state_tree_1.types.string), []),
    validated: false,
    validating: false,
    multiple: false,
    delimiter: ',',
    valueField: 'value',
    labelField: 'label',
    joinValues: true,
    extractValue: false,
    options: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(mobx_state_tree_1.types.frozen()), []),
    expressionsInOptions: false,
    selectFirst: false,
    autoFill: mobx_state_tree_1.types.frozen(),
    clearValueOnHidden: false,
    selectedOptions: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.frozen(), []),
    filteredOptions: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.frozen(), []),
    dialogSchema: mobx_state_tree_1.types.frozen(),
    dialogOpen: false,
    dialogData: mobx_state_tree_1.types.frozen(),
    resetValue: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.frozen(), '')
})
    .views(function (self) {
    function getForm() {
        return self.parentStore;
    }
    function getValue() {
        var _a;
        return (_a = getForm()) === null || _a === void 0 ? void 0 : _a.getValueByName(self.name);
    }
    function getLastOptionValue() {
        if (self.selectedOptions.length) {
            return self.selectedOptions[self.selectedOptions.length - 1].value;
        }
        return '';
    }
    function getErrors() {
        return self.errorData.map(function (item) { return item.msg; });
    }
    return {
        get subFormItems() {
            return self.itemsRef.map(function (item) { return manager_1.getStoreById(item); });
        },
        get form() {
            return getForm();
        },
        get value() {
            return getValue();
        },
        get prinstine() {
            return getForm().getPristineValueByName(self.name);
        },
        get errors() {
            return getErrors();
        },
        get valid() {
            var errors = getErrors();
            return !!(!errors || !errors.length);
        },
        get lastSelectValue() {
            return getLastOptionValue();
        },
        getSelectedOptions: function (value) {
            if (value === void 0) { value = getValue(); }
            if (typeof value === 'undefined') {
                return [];
            }
            var valueArray = Array.isArray(value)
                ? value
                : typeof value === 'string'
                    ? value.split(self.delimiter || ',')
                    : [value];
            var selected = valueArray.map(function (item) {
                return item && item.hasOwnProperty(self.valueField || 'value')
                    ? item[self.valueField || 'value']
                    : item;
            });
            var selectedOptions = [];
            selected.forEach(function (item, index) {
                var _a, _b;
                var matched = helper_1.findTree(self.filteredOptions, Select_1.optionValueCompare(item, self.valueField || 'value'));
                if (matched) {
                    selectedOptions.push(matched);
                }
                else {
                    var unMatched = (valueArray && valueArray[index]) || item;
                    if (unMatched &&
                        (typeof unMatched === 'string' || typeof unMatched === 'number')) {
                        unMatched = (_a = {},
                            _a[self.valueField || 'value'] = item,
                            _a[self.labelField || 'label'] = item,
                            _a.__unmatched = true,
                            _a);
                    }
                    else if (unMatched && self.extractValue) {
                        unMatched = (_b = {},
                            _b[self.valueField || 'value'] = item,
                            _b[self.labelField || 'label'] = 'UnKnown',
                            _b.__unmatched = true,
                            _b);
                    }
                    unMatched && selectedOptions.push(unMatched);
                }
            });
            return selectedOptions;
        }
    };
})
    .actions(function (self) {
    var form = self.form;
    var dialogCallbacks = new SimpleMap_1.SimpleMap();
    function config(_a) {
        var required = _a.required, unique = _a.unique, value = _a.value, rules = _a.rules, messages = _a.messages, delimiter = _a.delimiter, multiple = _a.multiple, valueField = _a.valueField, labelField = _a.labelField, joinValues = _a.joinValues, extractValue = _a.extractValue, type = _a.type, id = _a.id, selectFirst = _a.selectFirst, autoFill = _a.autoFill, clearValueOnHidden = _a.clearValueOnHidden;
        if (typeof rules === 'string') {
            rules = validations_1.str2rules(rules);
        }
        typeof type !== 'undefined' && (self.type = type);
        typeof id !== 'undefined' && (self.itemId = id);
        typeof messages !== 'undefined' && (self.messages = messages);
        typeof required !== 'undefined' && (self.required = !!required);
        typeof unique !== 'undefined' && (self.unique = !!unique);
        typeof multiple !== 'undefined' && (self.multiple = !!multiple);
        typeof selectFirst !== 'undefined' && (self.selectFirst = !!selectFirst);
        typeof autoFill !== 'undefined' && (self.autoFill = autoFill);
        typeof joinValues !== 'undefined' && (self.joinValues = !!joinValues);
        typeof extractValue !== 'undefined' &&
            (self.extractValue = !!extractValue);
        typeof delimiter !== 'undefined' &&
            (self.delimiter = delimiter || ',');
        typeof valueField !== 'undefined' &&
            (self.valueField = valueField || 'value');
        typeof labelField !== 'undefined' &&
            (self.labelField = labelField || 'label');
        typeof clearValueOnHidden !== 'undefined' &&
            (self.clearValueOnHidden = !!clearValueOnHidden);
        rules = rules || {};
        rules = tslib_1.__assign(tslib_1.__assign({}, rules), { isRequired: self.required });
        if (helper_1.isObjectShallowModified(rules, self.rules)) {
            self.rules = rules;
            clearError('bultin');
            self.validated = false;
        }
        if (value !== void 0 && self.value === void 0) {
            form.setValueByName(self.name, value, true);
            syncAutoFill(value, true);
        }
    }
    function focus() {
        self.isFocused = true;
    }
    function blur() {
        self.isFocused = false;
    }
    function changeValue(value, isPrintine) {
        if (isPrintine === void 0) { isPrintine = false; }
        if (typeof value === 'undefined' || value === '__undefined') {
            self.form.deleteValueByName(self.name);
        }
        else {
            self.form.setValueByName(self.name, value, isPrintine);
        }
        syncAutoFill(value, isPrintine);
    }
    var validate = mobx_state_tree_1.flow(function validate(hook) {
        var combo, group;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (self.validating) {
                        return [2 /*return*/, self.valid];
                    }
                    self.validating = true;
                    clearError();
                    if (!hook) return [3 /*break*/, 2];
                    return [4 /*yield*/, hook()];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    addError(validations_1.validate(self.value, self.form.data, self.rules, self.messages, self.__));
                    self.validated = true;
                    if (self.unique &&
                        self.form.parentStore &&
                        self.form.parentStore.storeType === 'ComboStore') {
                        combo = self.form.parentStore;
                        group = combo.uniques.get(self.name);
                        if (group.items.some(function (item) { return item !== self && self.value && item.value === self.value; })) {
                            addError(self.__('`当前值不唯一`'));
                        }
                    }
                    self.validating = false;
                    return [2 /*return*/, self.valid];
            }
        });
    });
    function setError(msg, tag) {
        if (tag === void 0) { tag = 'bultin'; }
        clearError();
        addError(msg, tag);
    }
    function addError(msg, tag) {
        if (tag === void 0) { tag = 'bultin'; }
        var msgs = Array.isArray(msg) ? msg : [msg];
        msgs.forEach(function (item) {
            return self.errorData.push({
                msg: item,
                tag: tag
            });
        });
    }
    function clearError(tag) {
        if (tag) {
            var filtered = self.errorData.filter(function (item) { return item.tag !== tag; });
            self.errorData.replace(filtered);
        }
        else {
            self.errorData.clear();
        }
    }
    function getFirstAvaibleOption(options) {
        if (!Array.isArray(options)) {
            return;
        }
        for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
            var option = options_1[_i];
            if (Array.isArray(option.children)) {
                var childFirst = getFirstAvaibleOption(option.children);
                if (childFirst !== undefined) {
                    return childFirst;
                }
            }
            else if (option[self.valueField || 'value'] && !option.disabled) {
                return option;
            }
        }
    }
    function setOptions(options, onChange) {
        if (!Array.isArray(options)) {
            return;
        }
        options = options.filter(function (item) { return item; });
        var originOptions = self.options.concat();
        options.length ? self.options.replace(options) : self.options.clear();
        syncOptions(originOptions);
        var selectedOptions;
        if (self.selectFirst &&
            self.filteredOptions.length &&
            (selectedOptions = self.getSelectedOptions(self.value)) &&
            !selectedOptions.filter(function (item) { return !item.__unmatched; }).length) {
            var fistOption = getFirstAvaibleOption(self.filteredOptions);
            if (!fistOption) {
                return;
            }
            var list = [fistOption].map(function (item) {
                if (self.extractValue || self.joinValues) {
                    return item[self.valueField || 'value'];
                }
                return item;
            });
            var value = self.joinValues && self.multiple
                ? list.join(self.delimiter)
                : self.multiple
                    ? list
                    : list[0];
            if (form.inited && onChange) {
                onChange(value);
            }
            else {
                changeValue(value, !form.inited);
            }
        }
        syncAutoFill(self.value, !form.inited);
    }
    var loadCancel = null;
    var fetchOptions = mobx_state_tree_1.flow(function getInitData(api, data, config, setErrorFlag) {
        var json, result, e_1, env;
        var _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    if (loadCancel) {
                        loadCancel();
                        loadCancel = null;
                        self.loading = false;
                    }
                    self.loading = true;
                    return [4 /*yield*/, mobx_state_tree_1.getEnv(self).fetcher(api, data, tslib_1.__assign({ autoAppend: false, cancelExecutor: function (executor) { return (loadCancel = executor); } }, config))];
                case 1:
                    json = _b.sent();
                    loadCancel = null;
                    result = null;
                    if (!json.ok) {
                        setErrorFlag !== false &&
                            setError(self.__('Form.loadOptionsFailed', {
                                reason: (_a = json.msg) !== null && _a !== void 0 ? _a : (config && config.errorMessage)
                            }));
                        mobx_state_tree_1.getEnv(self).notify('error', self.errors.join(''), json.msgTimeout !== undefined
                            ? {
                                closeButton: true,
                                timeout: json.msgTimeout
                            }
                            : undefined);
                    }
                    else {
                        result = json;
                    }
                    self.loading = false;
                    return [2 /*return*/, result];
                case 2:
                    e_1 = _b.sent();
                    env = mobx_state_tree_1.getEnv(self);
                    if (!mobx_state_tree_1.isAlive(self) || self.disposed) {
                        return [2 /*return*/];
                    }
                    self.loading = false;
                    if (env.isCancel(e_1)) {
                        return [2 /*return*/];
                    }
                    console.error(e_1.stack);
                    env.notify('error', e_1.message);
                    return [2 /*return*/];
                case 3: return [2 /*return*/];
            }
        });
    });
    var loadOptions = mobx_state_tree_1.flow(function getInitData(api, data, config, clearValue, onChange, setErrorFlag) {
        var json, options;
        var _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, fetchOptions(api, data, config, setErrorFlag)];
                case 1:
                    json = _b.sent();
                    if (!json) {
                        return [2 /*return*/];
                    }
                    clearError();
                    self.validated = false; // 拉完数据应该需要再校验一下
                    options = ((_a = json.data) === null || _a === void 0 ? void 0 : _a.options) ||
                        json.data.items ||
                        json.data.rows ||
                        json.data ||
                        [];
                    options = Select_1.normalizeOptions(options);
                    setOptions(options, onChange);
                    if (json.data && typeof json.data.value !== 'undefined') {
                        onChange && onChange(json.data.value, false, true);
                    }
                    else if (clearValue && !self.selectFirst) {
                        self.selectedOptions.some(function (item) { return item.__unmatched; }) &&
                            onChange &&
                            onChange('', false, true);
                    }
                    return [2 /*return*/, json];
            }
        });
    });
    var deferLoadOptions = mobx_state_tree_1.flow(function getInitData(option, api, data, config) {
        var indexes, json, options;
        var _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    indexes = helper_1.findTreeIndex(self.options, function (item) { return item === option; });
                    if (!indexes) {
                        return [2 /*return*/];
                    }
                    setOptions(helper_1.spliceTree(self.options, indexes, 1, tslib_1.__assign(tslib_1.__assign({}, option), { loading: true })));
                    return [4 /*yield*/, fetchOptions(api, data, config, false)];
                case 1:
                    json = _b.sent();
                    if (!json) {
                        setOptions(helper_1.spliceTree(self.options, indexes, 1, tslib_1.__assign(tslib_1.__assign({}, option), { loading: false, error: true })));
                        return [2 /*return*/];
                    }
                    options = ((_a = json.data) === null || _a === void 0 ? void 0 : _a.options) ||
                        json.data.items ||
                        json.data.rows ||
                        json.data ||
                        [];
                    setOptions(helper_1.spliceTree(self.options, indexes, 1, tslib_1.__assign(tslib_1.__assign({}, option), { loading: false, loaded: true, children: options })));
                    return [2 /*return*/, json];
            }
        });
    });
    function syncOptions(originOptions) {
        var _a;
        if (!self.options.length && typeof self.value === 'undefined') {
            self.selectedOptions = [];
            self.filteredOptions = [];
            return;
        }
        var form = self.form;
        var value = self.value;
        // 有可能销毁了
        if (!form) {
            return;
        }
        var selected = Array.isArray(value)
            ? value.map(function (item) {
                return item && item.hasOwnProperty(self.valueField || 'value')
                    ? item[self.valueField || 'value']
                    : item;
            })
            : typeof value === 'string'
                ? value.split(self.delimiter || ',')
                : value === void 0
                    ? []
                    : [
                        value && value.hasOwnProperty(self.valueField || 'value')
                            ? value[self.valueField || 'value']
                            : value
                    ];
        if (value && value.hasOwnProperty(self.labelField || 'label')) {
            selected[0] = (_a = {},
                _a[self.labelField || 'label'] = value[self.labelField || 'label'],
                _a[self.valueField || 'value'] = value[self.valueField || 'value'],
                _a);
        }
        var expressionsInOptions = false;
        var filteredOptions = self.options
            .filter(function (item) {
            if (!expressionsInOptions && (item.visibleOn || item.hiddenOn)) {
                expressionsInOptions = true;
            }
            return item.visibleOn
                ? tpl_1.evalExpression(item.visibleOn, form.data) !== false
                : item.hiddenOn
                    ? tpl_1.evalExpression(item.hiddenOn, form.data) !== true
                    : item.visible !== false || item.hidden !== true;
        })
            .map(function (item, index) {
            var disabled = tpl_1.evalExpression(item.disabledOn, form.data);
            var newItem = item.disabledOn
                ? self.filteredOptions.length > index &&
                    self.filteredOptions[index].disabled === disabled
                    ? self.filteredOptions[index]
                    : tslib_1.__assign(tslib_1.__assign({}, item), { disabled: disabled })
                : item;
            return newItem;
        });
        self.expressionsInOptions = expressionsInOptions;
        var flattened = helper_2.flattenTree(filteredOptions);
        var selectedOptions = [];
        selected.forEach(function (item, index) {
            var _a, _b;
            var idx = findIndex_1.default(flattened, Select_1.optionValueCompare(item, self.valueField || 'value'));
            if (~idx) {
                selectedOptions.push(flattened[idx]);
            }
            else {
                var unMatched = (value && value[index]) || item;
                if (unMatched &&
                    (typeof unMatched === 'string' || typeof unMatched === 'number')) {
                    unMatched = (_a = {},
                        _a[self.valueField || 'value'] = item,
                        _a[self.labelField || 'label'] = item,
                        _a.__unmatched = true,
                        _a);
                    var orgin = originOptions &&
                        find_1.default(originOptions, Select_1.optionValueCompare(item, self.valueField || 'value'));
                    if (orgin) {
                        unMatched[self.labelField || 'label'] =
                            orgin[self.labelField || 'label'];
                    }
                }
                else if (unMatched && self.extractValue) {
                    unMatched = (_b = {},
                        _b[self.valueField || 'value'] = item,
                        _b[self.labelField || 'label'] = 'UnKnown',
                        _b.__unmatched = true,
                        _b);
                }
                unMatched && selectedOptions.push(unMatched);
            }
        });
        var parentStore = form.parentStore;
        if (parentStore && parentStore.storeType === combo_1.ComboStore.name) {
            var combo = parentStore;
            var group = combo.uniques.get(self.name);
            var options_2 = [];
            group &&
                group.items.forEach(function (item) {
                    if (self !== item) {
                        options_2.push.apply(options_2, item.selectedOptions.map(function (item) { return item && item.value; }));
                    }
                });
            if (filteredOptions.length) {
                filteredOptions = filteredOptions.filter(function (option) { return !~options_2.indexOf(option.value); });
            }
        }
        helper_1.isArrayChildrenModified(self.selectedOptions, selectedOptions) &&
            (self.selectedOptions = selectedOptions);
        helper_1.isArrayChildrenModified(self.filteredOptions, filteredOptions) &&
            (self.filteredOptions = filteredOptions);
    }
    function setLoading(value) {
        self.loading = value;
    }
    var subStore;
    function getSubStore() {
        return subStore;
    }
    function setSubStore(store) {
        subStore = store;
    }
    function reset() {
        self.validated = false;
        if (subStore && subStore.storeType === 'ComboStore') {
            var combo = subStore;
            combo.forms.forEach(function (form) { return form.reset(); });
        }
        clearError();
    }
    function openDialog(schema, data, callback) {
        if (data === void 0) { data = form.data; }
        self.dialogSchema = schema;
        self.dialogData = data;
        self.dialogOpen = true;
        callback && dialogCallbacks.set(self.dialogData, callback);
    }
    function closeDialog(result) {
        var callback = dialogCallbacks.get(self.dialogData);
        self.dialogOpen = false;
        if (callback) {
            dialogCallbacks.delete(self.dialogData);
            setTimeout(function () { return callback(result); }, 200);
        }
    }
    function syncAutoFill(value, isPrintine) {
        if (value === void 0) { value = self.value; }
        if (isPrintine === void 0) { isPrintine = false; }
        if (!self.multiple &&
            self.autoFill &&
            !helper_1.isEmpty(self.autoFill) &&
            self.options.length) {
            var selectedOptions = self.getSelectedOptions(value);
            if (selectedOptions.length !== 1) {
                return;
            }
            var toSync_1 = tpl_builtin_1.dataMapping(self.autoFill, helper_1.createObject({
                ancestors: helper_1.getTreeAncestors(self.filteredOptions, selectedOptions[0], true)
            }, selectedOptions[0]));
            Object.keys(toSync_1).forEach(function (key) {
                var value = toSync_1[key];
                if (typeof value === 'undefined' || value === '__undefined') {
                    self.form.deleteValueByName(key);
                }
                else {
                    self.form.setValueByName(key, value, isPrintine);
                }
            });
        }
    }
    function changeTmpValue(value) {
        self.tmpValue = value;
    }
    function addSubFormItem(item) {
        self.itemsRef.push(item.id);
    }
    function removeSubFormItem(item) {
        var idx = self.itemsRef.findIndex(function (a) { return a === item.id; });
        if (~idx) {
            self.itemsRef.splice(idx, 1);
        }
    }
    return {
        focus: focus,
        blur: blur,
        config: config,
        changeValue: changeValue,
        validate: validate,
        setError: setError,
        addError: addError,
        clearError: clearError,
        setOptions: setOptions,
        loadOptions: loadOptions,
        deferLoadOptions: deferLoadOptions,
        syncOptions: syncOptions,
        setLoading: setLoading,
        setSubStore: setSubStore,
        getSubStore: getSubStore,
        reset: reset,
        openDialog: openDialog,
        closeDialog: closeDialog,
        syncAutoFill: syncAutoFill,
        changeTmpValue: changeTmpValue,
        addSubFormItem: addSubFormItem,
        removeSubFormItem: removeSubFormItem
    };
});
//# sourceMappingURL=./store/formItem.js.map
