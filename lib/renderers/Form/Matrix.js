"use strict";
/**
 * @file filter
 * @author fex
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatrixRenderer = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var Item_1 = require("./Item");
var api_1 = require("../../utils/api");
var components_1 = require("../../components");
var helper_1 = require("../../utils/helper");
var MatrixCheckbox = /** @class */ (function (_super) {
    tslib_1.__extends(MatrixCheckbox, _super);
    function MatrixCheckbox(props) {
        var _this = _super.call(this, props) || this;
        _this.sourceInvalid = false;
        _this.mounted = false;
        _this.state = {
            columns: props.columns || [],
            rows: props.rows || [],
            loading: false
        };
        _this.toggleItem = _this.toggleItem.bind(_this);
        _this.reload = _this.reload.bind(_this);
        _this.initOptions = _this.initOptions.bind(_this);
        return _this;
    }
    MatrixCheckbox.prototype.componentWillMount = function () {
        this.mounted = true;
    };
    MatrixCheckbox.prototype.componentDidMount = function () {
        var _a = this.props, formInited = _a.formInited, addHook = _a.addHook;
        formInited ? this.reload() : addHook(this.initOptions, 'init');
    };
    MatrixCheckbox.prototype.componentWillReceiveProps = function (nextProps) {
        var props = this.props;
        if (props.columns !== nextProps.columns || props.rows !== nextProps.rows) {
            this.setState({
                columns: nextProps.columns || [],
                rows: nextProps.rows || []
            });
        }
        else if (nextProps.formInited &&
            (nextProps.source !== props.source || props.data !== nextProps.data)) {
            var prevApi = api_1.buildApi(props.source, props.data, {
                ignoreData: true
            });
            var nextApi = api_1.buildApi(nextProps.source, nextProps.data, { ignoreData: true });
            if (prevApi.url !== nextApi.url && api_1.isValidApi(nextApi.url)) {
                this.sourceInvalid = true;
            }
        }
    };
    MatrixCheckbox.prototype.componentDidUpdate = function () {
        if (this.sourceInvalid) {
            this.sourceInvalid = false;
            this.reload();
        }
    };
    MatrixCheckbox.prototype.componentWillUnmount = function () {
        this.mounted = false;
        var removeHook = this.props.removeHook;
        removeHook(this.initOptions, 'init');
    };
    MatrixCheckbox.prototype.initOptions = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, formItem, name;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.reload()];
                    case 1:
                        _b.sent();
                        _a = this.props, formItem = _a.formItem, name = _a.name;
                        if (!formItem) {
                            return [2 /*return*/];
                        }
                        if (formItem.value) {
                            helper_1.setVariable(data, name, formItem.value);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MatrixCheckbox.prototype.reload = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, source, data, env, onChange, __;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, source = _a.source, data = _a.data, env = _a.env, onChange = _a.onChange, __ = _a.translate;
                        if (!api_1.isEffectiveApi(source, data) || this.state.loading) {
                            return [2 /*return*/];
                        }
                        if (!env || !env.fetcher) {
                            throw new Error('fetcher is required');
                        }
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                if (!_this.mounted) {
                                    return resolve();
                                }
                                _this.setState({
                                    loading: true
                                }, function () {
                                    if (!_this.mounted) {
                                        return resolve();
                                    }
                                    env
                                        .fetcher(source, data)
                                        .then(function (ret) {
                                        if (!ret.ok) {
                                            throw new Error(ret.msg || __('fetchFailed'));
                                        }
                                        if (!_this.mounted) {
                                            return resolve();
                                        }
                                        _this.setState({
                                            loading: false,
                                            rows: ret.data.rows || [],
                                            columns: ret.data.columns || []
                                        }, function () {
                                            var replace = source && source.replaceData;
                                            var value = ret.data.value;
                                            if (value) {
                                                value = source.replaceData
                                                    ? value
                                                    : mergeValue(value, _this.state.columns, _this.state.rows);
                                                onChange(value);
                                            }
                                            resolve();
                                        });
                                    })
                                        .catch(function (reason) {
                                        return _this.setState({
                                            error: reason,
                                            loading: false
                                        }, function () { return resolve(); });
                                    });
                                });
                            })];
                    case 1: 
                    // todo 优化这块
                    return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    MatrixCheckbox.prototype.toggleItem = function (checked, x, y) {
        var _a = this.state, columns = _a.columns, rows = _a.rows;
        var _b = this.props, multiple = _b.multiple, singleSelectMode = _b.singleSelectMode;
        var value = this.props.value || buildDefaultValue(columns, rows);
        if (multiple) {
            value[x][y] = tslib_1.__assign(tslib_1.__assign({}, value[x][y]), { checked: checked });
        }
        else if (singleSelectMode === 'row') {
            for (var x2 = 0, len = columns.length; x2 < len; x2++) {
                value[x2][y] = tslib_1.__assign(tslib_1.__assign({}, value[x2][y]), { checked: x === x2 ? checked : !checked });
            }
        }
        else if (singleSelectMode === 'column') {
            for (var y2 = 0, len = rows.length; y2 < len; y2++) {
                value[x][y2] = tslib_1.__assign(tslib_1.__assign({}, value[x][y2]), { checked: y === y2 ? checked : !checked });
            }
        }
        else {
            // 只剩下 cell 了
            for (var y2 = 0, len = rows.length; y2 < len; y2++) {
                for (var x2 = 0, len2 = columns.length; x2 < len2; x2++) {
                    value[x2][y2] = tslib_1.__assign(tslib_1.__assign({}, value[x2][y2]), { checked: x === x2 && y === y2 ? checked : !checked });
                }
            }
        }
        this.props.onChange(value.concat());
    };
    MatrixCheckbox.prototype.renderInput = function () {
        var _this = this;
        var _a = this.state, columns = _a.columns, rows = _a.rows;
        var _b = this.props, rowLabel = _b.rowLabel, className = _b.className, cx = _b.classnames, multiple = _b.multiple;
        var value = this.props.value || buildDefaultValue(columns, rows);
        return (react_1.default.createElement("div", { className: cx('Table m-b-none') },
            react_1.default.createElement("div", { className: cx('Table-content') },
                react_1.default.createElement("table", { className: cx('Table-table') },
                    react_1.default.createElement("thead", null,
                        react_1.default.createElement("tr", null,
                            react_1.default.createElement("th", null, rowLabel),
                            columns.map(function (column, x) { return (react_1.default.createElement("th", { key: x, className: "text-center" }, column.label)); }))),
                    react_1.default.createElement("tbody", null, rows.map(function (row, y) { return (react_1.default.createElement("tr", { key: y },
                        react_1.default.createElement("td", null,
                            row.label,
                            row.description || row.desc ? (react_1.default.createElement("span", { className: "m-l-xs text-muted text-xs" }, row.description || row.desc)) : null),
                        columns.map(function (column, x) { return (react_1.default.createElement("td", { key: x, className: "text-center" },
                            react_1.default.createElement(components_1.Checkbox, { type: multiple ? 'checkbox' : 'radio', checked: !!(value[x] && value[x][y] && value[x][y].checked), onChange: function (checked) {
                                    return _this.toggleItem(checked, x, y);
                                } }))); }))); }))))));
    };
    MatrixCheckbox.prototype.render = function () {
        var _a = this.props, className = _a.className, render = _a.render, cx = _a.classnames;
        var _b = this.state, error = _b.error, loading = _b.loading;
        return (react_1.default.createElement("div", { key: "input", className: cx('MatrixControl', className || '') },
            error ? (react_1.default.createElement("div", { className: cx('MatrixControl-error Alert Alert--danger') }, String(error))) : (this.renderInput()),
            react_1.default.createElement(components_1.Spinner, { size: "lg", overlay: true, key: "info", show: loading })));
    };
    MatrixCheckbox.defaultProps = {
        columns: [],
        rows: [],
        multiple: true,
        singleSelectMode: 'column' // multiple 为 false 时有效。
    };
    return MatrixCheckbox;
}(react_1.default.Component));
exports.default = MatrixCheckbox;
function buildDefaultValue(columns, rows) {
    if (!Array.isArray(columns)) {
        columns = [];
    }
    if (!Array.isArray(rows)) {
        rows = [];
    }
    return columns.map(function (column) {
        return rows.map(function (row) { return (tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, row), column), { checked: false })); });
    });
}
function mergeValue(value, columns, rows) {
    return value.map(function (column, x) {
        return column.map(function (item, y) { return (tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, columns[x]), rows[y]), item)); });
    });
}
var MatrixRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(MatrixRenderer, _super);
    function MatrixRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatrixRenderer = tslib_1.__decorate([
        Item_1.FormItem({
            type: 'matrix',
            strictMode: false,
            sizeMutable: false
        })
    ], MatrixRenderer);
    return MatrixRenderer;
}(MatrixCheckbox));
exports.MatrixRenderer = MatrixRenderer;
//# sourceMappingURL=./renderers/Form/Matrix.js.map
