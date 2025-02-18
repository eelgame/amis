"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiSelectControlRenderer = exports.SelectControlRenderer = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var Options_1 = require("./Options");
var Select_1 = tslib_1.__importDefault(require("../../components/Select"));
var find_1 = tslib_1.__importDefault(require("lodash/find"));
var debounce_1 = tslib_1.__importDefault(require("lodash/debounce"));
var api_1 = require("../../utils/api");
var helper_1 = require("../../utils/helper");
var SelectControl = /** @class */ (function (_super) {
    tslib_1.__extends(SelectControl, _super);
    function SelectControl(props) {
        var _this = _super.call(this, props) || this;
        _this.changeValue = _this.changeValue.bind(_this);
        _this.lazyloadRemote = debounce_1.default(_this.loadRemote.bind(_this), 250, {
            trailing: true,
            leading: false
        });
        _this.inputRef = _this.inputRef.bind(_this);
        return _this;
    }
    SelectControl.prototype.componentWillUnmount = function () {
        this.unHook && this.unHook();
    };
    SelectControl.prototype.inputRef = function (ref) {
        this.input = ref;
    };
    SelectControl.prototype.foucs = function () {
        this.input && this.input.focus();
    };
    SelectControl.prototype.changeValue = function (value) {
        var _a = this.props, joinValues = _a.joinValues, extractValue = _a.extractValue, delimiter = _a.delimiter, multiple = _a.multiple, type = _a.type, valueField = _a.valueField, onChange = _a.onChange, setOptions = _a.setOptions, options = _a.options;
        var newValue = value;
        var additonalOptions = [];
        (Array.isArray(value) ? value : value ? [value] : []).forEach(function (option) {
            var resolved = find_1.default(options, function (item) {
                return item[valueField || 'value'] == option[valueField || 'value'];
            });
            resolved || additonalOptions.push(option);
        });
        if (joinValues) {
            if (multiple) {
                newValue = Array.isArray(value)
                    ? value
                        .map(function (item) { return item[valueField || 'value']; })
                        .join(delimiter)
                    : value
                        ? value[valueField || 'value']
                        : '';
            }
            else {
                newValue = newValue ? newValue[valueField || 'value'] : '';
            }
        }
        else if (extractValue) {
            if (multiple) {
                newValue = Array.isArray(value)
                    ? value.map(function (item) { return item[valueField || 'value']; })
                    : value
                        ? [value[valueField || 'value']]
                        : [''];
            }
            else {
                newValue = newValue ? newValue[valueField || 'value'] : '';
            }
        }
        // 不设置没法回显
        additonalOptions.length && setOptions(options.concat(additonalOptions));
        onChange(newValue);
    };
    SelectControl.prototype.loadRemote = function (input) {
        var _this = this;
        var _a = this.props, autoComplete = _a.autoComplete, env = _a.env, data = _a.data, setOptions = _a.setOptions, setLoading = _a.setLoading, formInited = _a.formInited, addHook = _a.addHook;
        if (!env || !env.fetcher) {
            throw new Error('fetcher is required');
        }
        if (!formInited) {
            this.unHook && this.unHook();
            return (this.unHook = addHook(this.loadRemote.bind(this, input), 'init'));
        }
        var ctx = helper_1.createObject(data, {
            term: input,
            value: input
        });
        if (!api_1.isEffectiveApi(autoComplete, ctx)) {
            return Promise.resolve({
                options: []
            });
        }
        setLoading(true);
        return env
            .fetcher(autoComplete, ctx)
            .then(function (ret) {
            var options = (ret.data && ret.data.options) || ret.data || [];
            var combinedOptions = _this.mergeOptions(options);
            setOptions(combinedOptions);
            return {
                options: combinedOptions
            };
        })
            .finally(function () { return setLoading(false); });
    };
    SelectControl.prototype.mergeOptions = function (options) {
        var selectedOptions = this.props.selectedOptions;
        var combinedOptions = options.concat();
        if (Array.isArray(selectedOptions) && selectedOptions.length) {
            selectedOptions.forEach(function (option) {
                if (!find_1.default(combinedOptions, function (item) { return item.value == option.value; })) {
                    combinedOptions.push(tslib_1.__assign(tslib_1.__assign({}, option), { hidden: true }));
                }
            });
        }
        return combinedOptions;
    };
    SelectControl.prototype.renderMenu = function (option, state) {
        var _a = this.props, menuTpl = _a.menuTpl, render = _a.render, data = _a.data;
        return render("menu/" + state.index, menuTpl, {
            data: helper_1.createObject(helper_1.createObject(data, state), option)
        });
    };
    SelectControl.prototype.reload = function () {
        var reload = this.props.reloadOptions;
        reload && reload();
    };
    SelectControl.prototype.render = function () {
        var _a = this.props, autoComplete = _a.autoComplete, searchable = _a.searchable, options = _a.options, className = _a.className, loading = _a.loading, value = _a.value, selectedOptions = _a.selectedOptions, multi = _a.multi, multiple = _a.multiple, placeholder = _a.placeholder, id = _a.id, classPrefix = _a.classPrefix, classnames = _a.classnames, creatable = _a.creatable, inline = _a.inline, noResultsText = _a.noResultsText, render = _a.render, menuTpl = _a.menuTpl, rest = tslib_1.__rest(_a, ["autoComplete", "searchable", "options", "className", "loading", "value", "selectedOptions", "multi", "multiple", "placeholder", "id", "classPrefix", "classnames", "creatable", "inline", "noResultsText", "render", "menuTpl"]);
        if (noResultsText && /<\w+/.test(noResultsText)) {
            noResultsText = render('noResultText', noResultsText);
        }
        return (react_1.default.createElement("div", { className: classnames_1.default(classPrefix + "SelectControl", className) },
            react_1.default.createElement(Select_1.default, tslib_1.__assign({}, rest, { placeholder: placeholder, multiple: multiple || multi, ref: this.inputRef, value: selectedOptions, options: options, loadOptions: api_1.isEffectiveApi(autoComplete) ? this.lazyloadRemote : undefined, creatable: creatable, searchable: searchable || !!autoComplete, onChange: this.changeValue, loading: loading, noResultsText: noResultsText, renderMenu: menuTpl ? this.renderMenu : undefined }))));
    };
    var _a;
    SelectControl.defaultProps = {
        clearable: false,
        searchable: false,
        multiple: false
    };
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof Options_1.Option !== "undefined" && Options_1.Option) === "function" ? _a : Object, Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], SelectControl.prototype, "renderMenu", null);
    return SelectControl;
}(react_1.default.Component));
exports.default = SelectControl;
var SelectControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(SelectControlRenderer, _super);
    function SelectControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectControlRenderer = tslib_1.__decorate([
        Options_1.OptionsControl({
            type: 'select'
        })
    ], SelectControlRenderer);
    return SelectControlRenderer;
}(SelectControl));
exports.SelectControlRenderer = SelectControlRenderer;
var MultiSelectControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(MultiSelectControlRenderer, _super);
    function MultiSelectControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MultiSelectControlRenderer.defaultProps = {
        multiple: true
    };
    MultiSelectControlRenderer = tslib_1.__decorate([
        Options_1.OptionsControl({
            type: 'multi-select'
        })
    ], MultiSelectControlRenderer);
    return MultiSelectControlRenderer;
}(SelectControl));
exports.MultiSelectControlRenderer = MultiSelectControlRenderer;
//# sourceMappingURL=./renderers/Form/Select.js.map
