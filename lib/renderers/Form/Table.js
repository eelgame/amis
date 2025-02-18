"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableControlRenderer = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var Item_1 = require("./Item");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var Button_1 = tslib_1.__importDefault(require("../../components/Button"));
var helper_1 = require("../../utils/helper");
var api_1 = require("../../utils/api");
var tpl_1 = require("../../utils/tpl");
var omit_1 = tslib_1.__importDefault(require("lodash/omit"));
var tpl_builtin_1 = require("../../utils/tpl-builtin");
var findIndex_1 = tslib_1.__importDefault(require("lodash/findIndex"));
var memoize_1 = tslib_1.__importDefault(require("lodash/memoize"));
var SimpleMap_1 = require("../../utils/SimpleMap");
var icons_1 = require("../../components/icons");
var FormTable = /** @class */ (function (_super) {
    tslib_1.__extends(FormTable, _super);
    function FormTable(props) {
        var _this = _super.call(this, props) || this;
        _this.entityId = 1;
        _this.subForms = {};
        _this.editting = {};
        _this.buildItems = memoize_1.default(function (value, editIndex) {
            return value.map(function (value, index) {
                return index === editIndex ? _this.state.editting : value;
            });
        }, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return JSON.stringify(args);
        });
        _this.state = {
            columns: _this.buildColumns(props),
            editIndex: -1,
            buildItemProps: _this.buildItemProps.bind(_this)
        };
        _this.entries = new SimpleMap_1.SimpleMap();
        _this.buildItemProps = _this.buildItemProps.bind(_this);
        _this.confirmEdit = _this.confirmEdit.bind(_this);
        _this.cancelEdit = _this.cancelEdit.bind(_this);
        _this.handleSaveTableOrder = _this.handleSaveTableOrder.bind(_this);
        _this.handleTableSave = _this.handleTableSave.bind(_this);
        _this.getEntryId = _this.getEntryId.bind(_this);
        _this.subFormRef = _this.subFormRef.bind(_this);
        return _this;
    }
    FormTable.prototype.componentDidUpdate = function (nextProps) {
        var props = this.props;
        if (props.columns !== nextProps.columns) {
            this.setState({
                columns: this.buildColumns(props)
            });
        }
    };
    FormTable.prototype.componentWillUnmount = function () {
        var _a, _b;
        this.entries.dispose();
        (_b = (_a = this.buildItems.cache).clear) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    FormTable.prototype.subFormRef = function (form, x, y) {
        this.subForms[x + "-" + y] = form;
    };
    FormTable.prototype.validate = function () {
        var _this = this;
        var _a = this.props, value = _a.value, minLength = _a.minLength, maxLength = _a.maxLength, __ = _a.translate;
        // todo: 如果当前正在编辑中，表单提交了，应该先让正在编辑的东西提交然后再做验证。
        if (~this.state.editIndex) {
            return __('Table.editing');
        }
        if (minLength && (!Array.isArray(value) || value.length < minLength)) {
            return __('Combo.minLength', { minLength: minLength });
        }
        else if (maxLength && Array.isArray(value) && value.length > maxLength) {
            return __('Combo.maxLength', { maxLength: maxLength });
        }
        else {
            var subForms_1 = [];
            Object.keys(this.subForms).forEach(function (key) { return _this.subForms[key] && subForms_1.push(_this.subForms[key]); });
            if (subForms_1.length) {
                return Promise.all(subForms_1.map(function (item) { return item.validate(); })).then(function (values) {
                    if (~values.indexOf(false)) {
                        return __('Form.validateFailed');
                    }
                    return;
                });
            }
        }
    };
    FormTable.prototype.doAction = function (action, ctx) {
        var rest = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            rest[_i - 2] = arguments[_i];
        }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, onAction, value, valueField, env, onChange, editable, addApi, __, rows_1, toAdd, payload, rows_2, toRemove;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, onAction = _a.onAction, value = _a.value, valueField = _a.valueField, env = _a.env, onChange = _a.onChange, editable = _a.editable, addApi = _a.addApi, __ = _a.translate;
                        if (!(action.actionType === 'add')) return [3 /*break*/, 6];
                        rows_1 = Array.isArray(value) ? value.concat() : [];
                        if (!(addApi || action.payload)) return [3 /*break*/, 4];
                        toAdd = null;
                        if (!api_1.isEffectiveApi(addApi, ctx)) return [3 /*break*/, 2];
                        return [4 /*yield*/, env.fetcher(addApi, ctx)];
                    case 1:
                        payload = _b.sent();
                        if (payload && !payload.ok) {
                            env.notify('error', payload.msg || __('fetchFailed'));
                            return [2 /*return*/];
                        }
                        else if (payload && payload.ok) {
                            toAdd = payload.data;
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        toAdd = tpl_builtin_1.dataMapping(action.payload, ctx);
                        _b.label = 3;
                    case 3:
                        toAdd = Array.isArray(toAdd) ? toAdd : [toAdd];
                        toAdd.forEach(function (toAdd) {
                            var idx = findIndex_1.default(rows_1, function (item) { return item[valueField] == toAdd[valueField]; });
                            // 应该只有配置了 valueField 的时候，才去删重复项
                            if (~idx && valueField) {
                                rows_1.splice(idx, 1);
                            }
                            rows_1.push(toAdd);
                        });
                        onChange(rows_1);
                        if (editable) {
                            this.startEdit(rows_1.length - 1, rows_1[rows_1.length - 1], true);
                        }
                        return [2 /*return*/];
                    case 4: return [2 /*return*/, this.addItem(rows_1.length - 1)];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        if (action.actionType === 'remove' ||
                            action.actionType === 'delete') {
                            if (!valueField) {
                                return [2 /*return*/, env.alert(__('Table.valueField'))];
                            }
                            else if (!action.payload) {
                                return [2 /*return*/, env.alert(__('Table.playload'))];
                            }
                            rows_2 = Array.isArray(value) ? value.concat() : [];
                            toRemove = tpl_builtin_1.dataMapping(action.payload, ctx);
                            toRemove = Array.isArray(toRemove) ? toRemove : [toRemove];
                            toRemove.forEach(function (toRemove) {
                                var idx = findIndex_1.default(rows_2, function (item) { return item[valueField] == toRemove[valueField]; });
                                if (~idx) {
                                    rows_2.splice(idx, 1);
                                }
                            });
                            onChange(rows_2);
                            // todo 如果配置删除 Api 怎么办？
                            return [2 /*return*/];
                        }
                        _b.label = 7;
                    case 7: return [2 /*return*/, onAction && onAction.apply(void 0, tslib_1.__spreadArrays([action, ctx], rest))];
                }
            });
        });
    };
    FormTable.prototype.addItem = function (index, payload) {
        if (payload === void 0) { payload = this.props.scaffold; }
        var _a = this.props, value = _a.value, onChange = _a.onChange, needConfirm = _a.needConfirm;
        var newValue = Array.isArray(value) ? value.concat() : [];
        newValue.splice(index + 1, 0, tslib_1.__assign({}, payload));
        onChange(newValue);
        index = Math.min(index + 1, newValue.length - 1);
        if (needConfirm === false) {
            onChange(newValue);
        }
        else {
            this.startEdit(index, newValue[index], true);
        }
    };
    FormTable.prototype.startEdit = function (index, editting, isCreate) {
        if (isCreate === void 0) { isCreate = false; }
        var value = this.props.value;
        var scaffold = this.props.scaffold;
        this.setState({
            editIndex: index,
            buildItemProps: this.buildItemProps.bind(this),
            editting: (this.editting =
                editting || (value && value[index]) || scaffold || {}),
            isCreateMode: isCreate,
            columns: this.state.isCreateMode === isCreate
                ? this.state.columns.concat()
                : this.buildColumns(this.props, isCreate)
        });
    };
    FormTable.prototype.confirmEdit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, value, onChange, scaffold, addApi, updateApi, data, env, __, subForms, newValue, item, origin, isNew, remote;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, value = _a.value, onChange = _a.onChange, scaffold = _a.scaffold, addApi = _a.addApi, updateApi = _a.updateApi, data = _a.data, env = _a.env, __ = _a.translate;
                        subForms = [];
                        Object.keys(this.subForms).forEach(function (key) { return _this.subForms[key] && subForms.push(_this.subForms[key]); });
                        subForms.forEach(function (form) { return form.flush(); });
                        newValue = Array.isArray(value) ? value.concat() : [];
                        item = tslib_1.__assign({}, this.editting);
                        origin = newValue[this.state.editIndex];
                        isNew = !helper_1.isObjectShallowModified(scaffold, origin, false);
                        remote = null;
                        if (!(isNew && api_1.isEffectiveApi(addApi, helper_1.createObject(data, item)))) return [3 /*break*/, 2];
                        return [4 /*yield*/, env.fetcher(addApi, helper_1.createObject(data, item))];
                    case 1:
                        remote = _b.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        if (!api_1.isEffectiveApi(updateApi, helper_1.createObject(data, item))) return [3 /*break*/, 4];
                        return [4 /*yield*/, env.fetcher(updateApi, helper_1.createObject(data, item))];
                    case 3:
                        remote = _b.sent();
                        _b.label = 4;
                    case 4:
                        if (remote && !remote.ok) {
                            env.notify('error', remote.msg || __('saveFailed'));
                            return [2 /*return*/];
                        }
                        else if (remote && remote.ok) {
                            item = tslib_1.__assign(tslib_1.__assign({}, ((isNew ? addApi : updateApi).replaceData
                                ? {}
                                : item)), remote.data);
                        }
                        newValue.splice(this.state.editIndex, 1, item);
                        this.setState({
                            editIndex: -1,
                            columns: this.state.columns.concat(),
                            buildItemProps: this.buildItemProps.bind(this),
                            editting: null
                        });
                        onChange(newValue);
                        return [2 /*return*/];
                }
            });
        });
    };
    FormTable.prototype.cancelEdit = function () {
        var _a = this.props, value = _a.value, onChange = _a.onChange;
        if (this.state.isCreateMode) {
            var newValue = Array.isArray(value) ? value.concat() : [];
            newValue.splice(this.state.editIndex, 1);
            onChange(newValue);
        }
        this.setState({
            editIndex: -1,
            columns: this.state.columns.concat(),
            buildItemProps: this.buildItemProps.bind(this)
        });
    };
    FormTable.prototype.removeItem = function (index) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, value, onChange, deleteApi, deleteConfirmText, env, data, __, newValue, item, ctx, confirmed, result;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, value = _a.value, onChange = _a.onChange, deleteApi = _a.deleteApi, deleteConfirmText = _a.deleteConfirmText, env = _a.env, data = _a.data, __ = _a.translate;
                        newValue = Array.isArray(value) ? value.concat() : [];
                        item = newValue[index];
                        if (!item) {
                            return [2 /*return*/];
                        }
                        ctx = helper_1.createObject(data, item);
                        if (!api_1.isEffectiveApi(deleteApi, ctx)) return [3 /*break*/, 3];
                        return [4 /*yield*/, env.confirm(deleteConfirmText ? tpl_1.filter(deleteConfirmText, ctx) : __('deleteConfirm'))];
                    case 1:
                        confirmed = _b.sent();
                        if (!confirmed) {
                            // 如果不确认，则跳过！
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, env.fetcher(deleteApi, ctx)];
                    case 2:
                        result = _b.sent();
                        if (!result.ok) {
                            env.notify('error', __('deleteFailed'));
                            return [2 /*return*/];
                        }
                        _b.label = 3;
                    case 3:
                        this.removeEntry(item);
                        newValue.splice(index, 1);
                        onChange(newValue);
                        return [2 /*return*/];
                }
            });
        });
    };
    FormTable.prototype.buildItemProps = function (item, index) {
        if (!this.props.editable) {
            return null;
        }
        return {
            quickEditEnabled: this.state.editIndex === index
        };
    };
    FormTable.prototype.buildColumns = function (props, isCreateMode) {
        var _this = this;
        if (isCreateMode === void 0) { isCreateMode = false; }
        var env = this.props.env;
        var columns = Array.isArray(props.columns)
            ? props.columns.concat()
            : [];
        var ns = this.props.classPrefix;
        var __ = this.props.translate;
        var needConfirm = this.props.needConfirm;
        var btns = [];
        if (props.addable && props.showAddBtn !== false) {
            btns.push({
                children: function (_a) {
                    var key = _a.key, rowIndex = _a.rowIndex;
                    return ~_this.state.editIndex && needConfirm !== false ? null : (react_1.default.createElement(Button_1.default, { classPrefix: ns, size: "sm", key: key, level: "link", tooltip: __('Table.addRow'), tooltipContainer: env && env.getModalContainer ? env.getModalContainer : undefined, onClick: _this.addItem.bind(_this, rowIndex, undefined) },
                        props.addBtnLabel ? react_1.default.createElement("span", null, props.addBtnLabel) : null,
                        props.addBtnIcon ? (react_1.default.createElement(icons_1.Icon, { icon: props.addBtnIcon, className: "icon" })) : null));
                }
            });
        }
        if (props.needConfirm === false) {
            columns = columns.map(function (column) {
                var quickEdit = column.quickEdit;
                return quickEdit === false
                    ? omit_1.default(column, ['quickEdit'])
                    : tslib_1.__assign(tslib_1.__assign({}, column), { quickEdit: tslib_1.__assign(tslib_1.__assign({ type: 'text' }, quickEdit), { saveImmediately: true, mode: 'inline' }) });
            });
        }
        else if (props.editable) {
            columns = columns.map(function (column) {
                var quickEdit = !isCreateMode && column.hasOwnProperty('quickEditOnUpdate')
                    ? column.quickEditOnUpdate
                    : column.quickEdit;
                return quickEdit === false
                    ? omit_1.default(column, ['quickEdit'])
                    : tslib_1.__assign(tslib_1.__assign({}, column), { quickEdit: tslib_1.__assign(tslib_1.__assign({ type: 'text' }, quickEdit), { saveImmediately: true, mode: 'inline' }) });
            });
            btns.push({
                children: function (_a) {
                    var key = _a.key, rowIndex = _a.rowIndex, data = _a.data;
                    return ~_this.state.editIndex || (data && data.__isPlaceholder) ? null : (react_1.default.createElement(Button_1.default, { classPrefix: ns, size: "sm", key: key, level: "link", tooltip: __('Table.editRow'), tooltipContainer: env && env.getModalContainer ? env.getModalContainer : undefined, onClick: function () { return _this.startEdit(rowIndex); } },
                        props.updateBtnLabel ? (react_1.default.createElement("span", null, props.updateBtnLabel)) : null,
                        props.updateBtnIcon ? (react_1.default.createElement(icons_1.Icon, { icon: props.updateBtnIcon, className: "icon" })) : null));
                }
            });
            btns.push({
                children: function (_a) {
                    var key = _a.key, rowIndex = _a.rowIndex;
                    return _this.state.editIndex === rowIndex ? (react_1.default.createElement(Button_1.default, { classPrefix: ns, size: "sm", key: key, level: "link", tooltip: __('save'), tooltipContainer: env && env.getModalContainer ? env.getModalContainer : undefined, onClick: _this.confirmEdit },
                        props.confirmBtnLabel ? (react_1.default.createElement("span", null, props.confirmBtnLabel)) : null,
                        props.confirmBtnIcon ? (react_1.default.createElement(icons_1.Icon, { icon: props.confirmBtnIcon, className: "icon" })) : null)) : null;
                }
            });
            btns.push({
                children: function (_a) {
                    var key = _a.key, rowIndex = _a.rowIndex;
                    return _this.state.editIndex === rowIndex ? (react_1.default.createElement(Button_1.default, { classPrefix: ns, size: "sm", key: key, level: "link", tooltip: __('cancle'), tooltipContainer: env && env.getModalContainer ? env.getModalContainer : undefined, onClick: _this.cancelEdit },
                        props.cancelBtnLabel ? (react_1.default.createElement("span", null, props.cancelBtnLabel)) : null,
                        props.cancelBtnIcon ? (react_1.default.createElement(icons_1.Icon, { icon: props.cancelBtnIcon, className: "icon" })) : null)) : null;
                }
            });
        }
        if (props.removable) {
            btns.push({
                children: function (_a) {
                    var key = _a.key, rowIndex = _a.rowIndex, data = _a.data;
                    return (~_this.state.editIndex || (data && data.__isPlaceholder)) &&
                        needConfirm !== false ? null : (react_1.default.createElement(Button_1.default, { classPrefix: ns, size: "sm", key: key, level: "link", tooltip: __('Table.deleteRow'), tooltipContainer: env && env.getModalContainer ? env.getModalContainer : undefined, onClick: _this.removeItem.bind(_this, rowIndex) },
                        props.deleteBtnLabel ? (react_1.default.createElement("span", null, props.deleteBtnLabel)) : null,
                        props.deleteBtnIcon ? (react_1.default.createElement(icons_1.Icon, { icon: props.deleteBtnIcon, className: "icon" })) : null));
                }
            });
        }
        if (btns.length) {
            columns.push({
                type: 'operation',
                buttons: btns,
                label: __('Table.operation'),
                className: 'v-middle nowrap',
                fixed: 'right',
                width: '1%',
                innerClassName: 'm-n'
            });
        }
        return columns;
    };
    FormTable.prototype.handleTableSave = function (rows, diff, rowIndexes) {
        var _a = this.props, onChange = _a.onChange, value = _a.value, needConfirm = _a.needConfirm;
        var newValue = Array.isArray(value) ? value.concat() : [];
        if (~this.state.editIndex) {
            this.setState({
                editting: (this.editting = tslib_1.__assign({}, rows))
            });
            return;
        }
        else if (Array.isArray(rows)) {
            rowIndexes.forEach(function (rowIndex, index) {
                var data = tslib_1.__assign(tslib_1.__assign({}, newValue.splice(rowIndex, 1)[0]), diff[index]);
                newValue.splice(rowIndex, 0, data);
            });
        }
        else {
            var idx = rowIndexes;
            var origin = newValue[idx];
            var data = tslib_1.__assign(tslib_1.__assign({}, newValue.splice(idx, 1)[0]), diff);
            newValue.splice(rowIndexes, 0, data);
            this.entries.set(data, this.entries.get(origin) || this.entityId++);
            // this.entries.delete(origin); // 反正最后都会清理的，先不删了吧。
        }
        onChange(newValue);
    };
    FormTable.prototype.handleSaveTableOrder = function (moved, rows) {
        var onChange = this.props.onChange;
        onChange(rows.map(function (item) { return (tslib_1.__assign({}, item)); }));
    };
    FormTable.prototype.removeEntry = function (entry) {
        if (this.entries.has(entry)) {
            this.entries.delete(entry);
        }
    };
    FormTable.prototype.getEntryId = function (entry) {
        if (entry === this.state.editting) {
            return 'editting';
        }
        else if (!this.entries.has(entry)) {
            this.entries.set(entry, this.entityId++);
        }
        return String(this.entries.get(entry));
    };
    FormTable.prototype.render = function () {
        var _a = this.props, className = _a.className, value = _a.value, showAddBtn = _a.showAddBtn, disabled = _a.disabled, render = _a.render, placeholder = _a.placeholder, draggable = _a.draggable, addable = _a.addable, columnsTogglable = _a.columnsTogglable, combineNum = _a.combineNum, __ = _a.translate, canAccessSuperData = _a.canAccessSuperData, affixRow = _a.affixRow, prefixRow = _a.prefixRow;
        return (react_1.default.createElement("div", { className: classnames_1.default('form-control-table', className) }, render('body', {
            type: 'table',
            placeholder: __(placeholder),
            columns: this.state.columns,
            affixHeader: false,
            prefixRow: prefixRow,
            affixRow: affixRow
        }, {
            value: undefined,
            saveImmediately: true,
            disabled: disabled,
            draggable: draggable && !~this.state.editIndex,
            items: this.buildItems(Array.isArray(value) && value.length
                ? value
                : addable && showAddBtn !== false
                    ? [{ __isPlaceholder: true }]
                    : [], this.state.editIndex),
            getEntryId: this.getEntryId,
            onSave: this.handleTableSave,
            onSaveOrder: this.handleSaveTableOrder,
            buildItemProps: this.state.buildItemProps,
            quickEditFormRef: this.subFormRef,
            columnsTogglable: columnsTogglable,
            combineNum: combineNum,
            canAccessSuperData: canAccessSuperData
        })));
    };
    FormTable.defaultProps = {
        placeholder: '空',
        scaffold: {},
        addBtnIcon: 'plus',
        updateBtnIcon: 'pencil',
        deleteBtnIcon: 'minus',
        confirmBtnIcon: 'check',
        cancelBtnIcon: 'close',
        valueField: ''
    };
    FormTable.propsList = [
        'onChange',
        'name',
        'columns',
        'label',
        'scaffold',
        'showAddBtn',
        'addable',
        'removable',
        'editable',
        'addApi',
        'updateApi',
        'deleteApi',
        'needConfirm',
        'canAccessSuperData'
    ];
    return FormTable;
}(react_1.default.Component));
exports.default = FormTable;
var TableControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(TableControlRenderer, _super);
    function TableControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TableControlRenderer = tslib_1.__decorate([
        Item_1.FormItem({
            test: /(^|\/)form(?:\/.+)?\/control\/table$/,
            name: 'table-control'
        })
    ], TableControlRenderer);
    return TableControlRenderer;
}(FormTable));
exports.TableControlRenderer = TableControlRenderer;
//# sourceMappingURL=./renderers/Form/Table.js.map
