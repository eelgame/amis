"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormControlRenderer = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var debounce_1 = tslib_1.__importDefault(require("lodash/debounce"));
var factory_1 = require("../../factory");
var combo_1 = require("../../store/combo");
var helper_1 = require("../../utils/helper");
var Scoped_1 = require("../../Scoped");
var mobx_1 = require("mobx");
var formItem_1 = require("../../store/formItem");
var mobx_state_tree_1 = require("mobx-state-tree");
var mobx_react_1 = require("mobx-react");
var WithRootStore_1 = require("../../WithRootStore");
var FormControl = /** @class */ (function (_super) {
    tslib_1.__extends(FormControl, _super);
    function FormControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.value = undefined;
        _this.lazyValidate = debounce_1.default(_this.validate.bind(_this), 250, {
            trailing: true,
            leading: false
        });
        _this.lazyEmitChange = debounce_1.default(_this.emitChange.bind(_this), 250, {
            trailing: true,
            leading: false
        });
        return _this;
    }
    FormControl.prototype.componentWillMount = function () {
        var _this = this;
        var _a;
        var _b = this.props, form = _b.formStore, formItem = _b.formItem, rootStore = _b.rootStore, _c = _b.control, name = _c.name, id = _c.id, type = _c.type, required = _c.required, validations = _c.validations, validationErrors = _c.validationErrors, unique = _c.unique, value = _c.value, multiple = _c.multiple, delimiter = _c.delimiter, valueField = _c.valueField, labelField = _c.labelField, joinValues = _c.joinValues, extractValue = _c.extractValue, selectFirst = _c.selectFirst, autoFill = _c.autoFill, clearValueOnHidden = _c.clearValueOnHidden, validateOnChange = _c.validateOnChange;
        this.getValue = this.getValue.bind(this);
        this.setValue = this.setValue.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBulkChange = this.handleBulkChange.bind(this);
        this.setPrinstineValue = this.setPrinstineValue.bind(this);
        this.controlRef = this.controlRef.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        if (!name) {
            return;
        }
        var model = rootStore.addStore({
            id: helper_1.guid(),
            path: this.props.$path,
            storeType: formItem_1.FormItemStore.name,
            parentId: form.id,
            name: name
        });
        this.model = model;
        form.addFormItem(model);
        formItem === null || formItem === void 0 ? void 0 : formItem.addSubFormItem(model);
        model.config({
            id: id,
            type: type,
            required: required,
            unique: unique,
            value: value,
            rules: validations,
            messages: validationErrors,
            multiple: multiple,
            delimiter: delimiter,
            valueField: valueField,
            labelField: labelField,
            joinValues: joinValues,
            extractValue: extractValue,
            selectFirst: selectFirst,
            autoFill: autoFill,
            clearValueOnHidden: clearValueOnHidden
        });
        if (this.model.unique && ((_a = form.parentStore) === null || _a === void 0 ? void 0 : _a.storeType) === combo_1.ComboStore.name) {
            var combo = form.parentStore;
            combo.bindUniuqueItem(model);
        }
        // 同步 value
        model.changeTmpValue(model.value);
        this.reaction = mobx_1.reaction(function () { return model.value; }, function (value) {
            if (value !== model.tmpValue) {
                model.changeTmpValue(value);
            }
            if (validateOnChange === true ||
                (validateOnChange !== false &&
                    (form.submited || (mobx_state_tree_1.isAlive(model) && model.validated)))) {
                _this.lazyValidate();
            }
            else if (validateOnChange === false) {
                model.reset();
            }
        });
    };
    FormControl.prototype.componentDidMount = function () {
        var _this = this;
        var _a = this.props, store = _a.store, form = _a.formStore, _b = _a.control, name = _b.name, validate = _b.validate, addHook = _a.addHook;
        // 提交前先把之前的 lazyEmit 执行一下。
        this.hook3 = function () {
            _this.lazyEmitChange.flush();
            _this.lazyValidate.flush();
        };
        addHook(this.hook3, 'flush');
        var formItem = this.model;
        if (formItem && validate) {
            var finalValidate_1 = helper_1.promisify(validate.bind(formItem));
            this.hook2 = function () {
                formItem.clearError('control:valdiate');
                return finalValidate_1(form.data, formItem.value, formItem.name).then(function (ret) {
                    if ((typeof ret === 'string' || Array.isArray(ret)) && ret) {
                        formItem.addError(ret, 'control:valdiate');
                    }
                });
            };
            addHook(this.hook2);
        }
    };
    FormControl.prototype.componentWillReceiveProps = function (nextProps) {
        var props = this.props;
        var form = nextProps.formStore;
        // if (!nextProps.control.name) {
        //   // 把 name 删了, 对 model 做清理
        //   this.model && this.disposeModel();
        //   this.reaction && this.reaction();
        //   this.model = undefined;
        //   return;
        // } else if (nextProps.control.name !== props.control.name || !this.model) {
        //   // 对 model 做清理
        //   this.model && this.disposeModel();
        //   this.reaction && this.reaction();
        //   // name 是后面才有的，比如编辑模式下就会出现。
        //   const model = (this.model = form.registryItem(nextProps.control.name, {
        //     id: nextProps.control.id,
        //     type: nextProps.control.type,
        //     required: nextProps.control.required,
        //     unique: nextProps.control.unique,
        //     value: nextProps.control.value,
        //     rules: nextProps.control.validations,
        //     multiple: nextProps.control.multiple,
        //     delimiter: nextProps.control.delimiter,
        //     valueField: nextProps.control.valueField,
        //     labelField: nextProps.control.labelField,
        //     joinValues: nextProps.control.joinValues,
        //     extractValue: nextProps.control.extractValue,
        //     messages: nextProps.control.validationErrors
        //   }));
        //   // this.forceUpdate();
        //   this.setState({
        //     value: model.value
        //   });
        //   this.reaction = reaction(
        //     () => model.value,
        //     value => this.setState({value})
        //   );
        // }
        if (this.model &&
            helper_1.anyChanged([
                'id',
                'validations',
                'validationErrors',
                'value',
                'required',
                'unique',
                'multiple',
                'delimiter',
                'valueField',
                'labelField',
                'joinValues',
                'extractValue',
                'selectFirst',
                'autoFill',
                'clearValueOnHidden'
            ], props.control, nextProps.control)) {
            this.model.config({
                required: nextProps.control.required,
                id: nextProps.control.id,
                unique: nextProps.control.unique,
                value: nextProps.control.value,
                rules: nextProps.control.validations,
                multiple: nextProps.control.multiple,
                delimiter: nextProps.control.delimiter,
                valueField: nextProps.control.valueField,
                labelField: nextProps.control.labelField,
                joinValues: nextProps.control.joinValues,
                extractValue: nextProps.control.extractValue,
                messages: nextProps.control.validationErrors,
                selectFirst: nextProps.control.selectFirst,
                autoFill: nextProps.control.autoFill,
                clearValueOnHidden: nextProps.control.clearValueOnHidden
            });
        }
    };
    FormControl.prototype.componentWillUnmount = function () {
        this.hook && this.props.removeHook(this.hook);
        this.hook2 && this.props.removeHook(this.hook2);
        this.hook3 && this.props.removeHook(this.hook3, 'flush');
        this.lazyValidate.cancel();
        // this.lazyEmitChange.flush();
        this.lazyEmitChange.cancel();
        this.reaction && this.reaction();
        this.disposeModel();
    };
    FormControl.prototype.disposeModel = function () {
        var _a = this.props, form = _a.formStore, formItem = _a.formItem;
        if (this.model &&
            this.model.unique &&
            form.parentStore &&
            form.parentStore.storeType === combo_1.ComboStore.name) {
            var combo = form.parentStore;
            combo.unBindUniuqueItem(this.model);
        }
        this.model &&
            formItem &&
            mobx_state_tree_1.isAlive(formItem) &&
            formItem.removeSubFormItem(this.model);
        this.model && form.removeFormItem(this.model);
    };
    FormControl.prototype.controlRef = function (control) {
        var _a = this.props, addHook = _a.addHook, removeHook = _a.removeHook, form = _a.formStore;
        // 因为 control 有可能被 n 层 hoc 包裹。
        while (control && control.getWrappedInstance) {
            control = control.getWrappedInstance();
        }
        if (control && control.validate && this.model) {
            var formItem_2 = this.model;
            var validate_1 = helper_1.promisify(control.validate.bind(control));
            this.hook = function () {
                formItem_2.clearError('component:valdiate');
                return validate_1(form.data, formItem_2.value, formItem_2.name).then(function (ret) {
                    if ((typeof ret === 'string' || Array.isArray(ret)) && ret) {
                        formItem_2.setError(ret, 'component:valdiate');
                    }
                });
            };
            addHook(this.hook);
        }
        else if (!control && this.hook) {
            removeHook(this.hook);
            this.hook = undefined;
        }
        this.control = control;
    };
    FormControl.prototype.validate = function () {
        var _this = this;
        var form = this.props.formStore;
        if (this.model) {
            if (this.model.unique &&
                form.parentStore &&
                form.parentStore.storeType === combo_1.ComboStore.name) {
                var combo = form.parentStore;
                var group = combo.uniques.get(this.model.name);
                group.items.forEach(function (item) { return item.validate(); });
            }
            else {
                this.model.validate(this.hook);
                form
                    .getItemsByName(this.model.name)
                    .forEach(function (item) { return item !== _this.model && item.validate(); });
            }
        }
    };
    FormControl.prototype.handleChange = function (value, submitOnChange, changeImmediately) {
        if (submitOnChange === void 0) { submitOnChange = this.props.control.submitOnChange; }
        if (changeImmediately === void 0) { changeImmediately = false; }
        var _a = this.props, form = _a.formStore, onChange = _a.onChange, _b = _a.control, type = _b.type, pipeOut = _b.pipeOut, conrolChangeImmediately = _b.changeImmediately, formInited = _a.formInited;
        if (!this.model ||
            // todo 以后想办法不要強耦合类型。
            ~['service', 'group', 'hbox', 'panel', 'grid'].indexOf(type)) {
            onChange && onChange.apply(null, arguments);
            return;
        }
        if (pipeOut) {
            var oldValue = this.model.value;
            value = pipeOut(value, oldValue, form.data);
        }
        this.model.changeTmpValue(value);
        if (changeImmediately || conrolChangeImmediately || !formInited) {
            this.emitChange(submitOnChange);
        }
        else {
            // this.props.onTmpValueChange?.(value, this.model.name);
            this.lazyEmitChange(submitOnChange);
        }
    };
    FormControl.prototype.emitChange = function (submitOnChange) {
        if (submitOnChange === void 0) { submitOnChange = this.props.control.submitOnChange; }
        var _a = this.props, form = _a.formStore, onChange = _a.onChange, _b = _a.control, validateOnChange = _b.validateOnChange, name = _b.name, onFormItemChange = _b.onChange;
        if (!this.model) {
            return;
        }
        var value = this.model.tmpValue;
        var oldValue = this.model.value;
        if (oldValue === value) {
            return;
        }
        this.model.changeValue(value);
        onFormItemChange && onFormItemChange(value, oldValue, this.model, form);
        onChange && onChange(value, name, submitOnChange === true);
    };
    FormControl.prototype.handleBlur = function (e) {
        var _a = this.props, onBlur = _a.onBlur, validateOnBlur = _a.control.validateOnBlur;
        if (validateOnBlur && this.model) {
            this.validate();
        }
        onBlur && onBlur(e);
    };
    FormControl.prototype.handleBulkChange = function (values, submitOnChange) {
        if (submitOnChange === void 0) { submitOnChange = this.props.control.submitOnChange; }
        var _a = this.props, form = _a.formStore, onChange = _a.onChange, _b = _a.control, validateOnChange = _b.validateOnChange, type = _b.type, onBulkChange = _a.onBulkChange;
        if (!helper_1.isObject(values)) {
            return;
        }
        else if (!this.model ||
            // todo 以后想办法不要強耦合类型。
            ~['service', 'group', 'hbox', 'panel', 'grid'].indexOf(type)) {
            onBulkChange && onBulkChange(values);
            return;
        }
        var lastKey = '';
        var lastValue;
        Object.keys(values).forEach(function (key) {
            var value = values[key];
            lastKey = key;
            lastValue = value;
        });
        // is empty
        if (!lastKey) {
            return;
        }
        form.setValues(values);
        if (validateOnChange !== false && (form.submited || this.model.validated)) {
            this.lazyValidate();
        }
        onChange && onChange(lastValue, lastKey, submitOnChange === true);
    };
    FormControl.prototype.setPrinstineValue = function (value) {
        if (!this.model) {
            return;
        }
        var _a = this.props, form = _a.formStore, pipeOut = _a.control.pipeOut;
        if (pipeOut) {
            var oldValue = this.model.value;
            value = pipeOut(value, oldValue, form.data);
        }
        this.model.changeValue(value, true);
    };
    FormControl.prototype.getValue = function () {
        var _a = this.props, form = _a.formStore, control = _a.control;
        var value = this.model ? this.model.tmpValue : control.value;
        if (control.pipeIn) {
            value = control.pipeIn(value, form.data);
        }
        return value;
    };
    // 兼容老版本用法，新版本直接用 onChange 就可以。
    FormControl.prototype.setValue = function (value, key) {
        var _a;
        var name = this.props.control.name;
        if (!key || key === name) {
            this.handleChange(value);
        }
        else {
            this.handleBulkChange((_a = {},
                _a[key] = value,
                _a));
        }
    };
    FormControl.prototype.render = function () {
        var _a = this.props, render = _a.render, _b = _a.control, pipeIn = _b.pipeIn, pipeOut = _b.pipeOut, onChange = _b.onChange, control = tslib_1.__rest(_b, ["pipeIn", "pipeOut", "onChange"]), formMode = _a.formMode, controlWidth = _a.controlWidth, type = _a.type, store = _a.store, data = _a.data, disabled = _a.disabled, superOnChange = _a.onChange, rest = tslib_1.__rest(_a, ["render", "control", "formMode", "controlWidth", "type", "store", "data", "disabled", "onChange"]);
        var model = this.model;
        var value = this.getValue();
        return render('', control, tslib_1.__assign(tslib_1.__assign({}, rest), { defaultSize: controlWidth, disabled: disabled || control.disabled, formItem: model, formMode: control.mode || formMode, ref: this.controlRef, defaultValue: control.value, data: store ? store.data : data, value: value, formItemValue: value, onChange: control.type === 'input-group' ? superOnChange : this.handleChange, onBlur: this.handleBlur, setValue: this.setValue, getValue: this.getValue, onBulkChange: this.handleBulkChange, prinstine: model ? model.prinstine : undefined, setPrinstineValue: this.setPrinstineValue }));
    };
    FormControl.propsList = ['control'];
    FormControl.defaultProps = {};
    FormControl = tslib_1.__decorate([
        mobx_react_1.observer
    ], FormControl);
    return FormControl;
}(react_1.default.PureComponent));
exports.default = FormControl;
var FormControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(FormControlRenderer, _super);
    function FormControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormControlRenderer.prototype.controlRef = function (ref) {
        var originRef = this.control;
        _super.prototype.controlRef.call(this, ref);
        var scoped = this.context;
        if (!this.control) {
            return;
        }
        if (ref) {
            scoped.registerComponent(this.control);
        }
        else {
            scoped.unRegisterComponent(originRef);
        }
    };
    FormControlRenderer.displayName = 'Control';
    FormControlRenderer.contextType = Scoped_1.ScopedContext;
    FormControlRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: function (path) {
                return /(^|\/)form(?:\/.*)?\/control$/i.test(path) &&
                    !/\/control\/control$/i.test(path);
            },
            name: 'control'
        })
        // @ts-ignore
        ,
        WithRootStore_1.withRootStore
    ], FormControlRenderer);
    return FormControlRenderer;
}(FormControl));
exports.FormControlRenderer = FormControlRenderer;
//# sourceMappingURL=./renderers/Form/Control.js.map
