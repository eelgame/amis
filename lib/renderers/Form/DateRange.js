"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimeRangeControlRenderer = exports.DateRangeControlRenderer = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var Item_1 = require("./Item");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var tpl_builtin_1 = require("../../utils/tpl-builtin");
require("moment/locale/zh-cn");
var DateRangePicker_1 = tslib_1.__importStar(require("../../components/DateRangePicker"));
var DateRangeControl = /** @class */ (function (_super) {
    tslib_1.__extends(DateRangeControl, _super);
    function DateRangeControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateRangeControl.prototype.componentWillMount = function () {
        var _a = this.props, defaultValue = _a.defaultValue, setPrinstineValue = _a.setPrinstineValue, delimiter = _a.delimiter, format = _a.format, data = _a.data, value = _a.value, joinValues = _a.joinValues, utc = _a.utc;
        if (defaultValue && value === defaultValue) {
            var arr = typeof defaultValue === 'string'
                ? defaultValue.split(delimiter)
                : defaultValue;
            setPrinstineValue(DateRangePicker_1.DateRangePicker.formatValue({
                startDate: tpl_builtin_1.filterDate(arr[0], data, format),
                endDate: tpl_builtin_1.filterDate(arr[1], data, format)
            }, format, joinValues, delimiter, utc));
        }
    };
    DateRangeControl.prototype.componentDidUpdate = function (prevProps) {
        var _a = this.props, defaultValue = _a.defaultValue, delimiter = _a.delimiter, joinValues = _a.joinValues, setPrinstineValue = _a.setPrinstineValue, data = _a.data, utc = _a.utc, format = _a.format;
        if (prevProps.defaultValue !== defaultValue) {
            var arr = typeof defaultValue === 'string'
                ? defaultValue.split(delimiter)
                : defaultValue;
            setPrinstineValue(arr
                ? DateRangePicker_1.DateRangePicker.formatValue({
                    startDate: tpl_builtin_1.filterDate(arr[0], data, format),
                    endDate: tpl_builtin_1.filterDate(arr[1], data, format)
                }, format, joinValues, delimiter, utc)
                : undefined);
        }
    };
    DateRangeControl.prototype.render = function () {
        var _a = this.props, className = _a.className, ns = _a.classPrefix, defaultValue = _a.defaultValue, defaultData = _a.defaultData, minDate = _a.minDate, maxDate = _a.maxDate, minDuration = _a.minDuration, maxDuration = _a.maxDuration, data = _a.data, format = _a.format, rest = tslib_1.__rest(_a, ["className", "classPrefix", "defaultValue", "defaultData", "minDate", "maxDate", "minDuration", "maxDuration", "data", "format"]);
        return (react_1.default.createElement("div", { className: classnames_1.default(ns + "DateRangeControl", className) },
            react_1.default.createElement(DateRangePicker_1.default, tslib_1.__assign({}, rest, { classPrefix: ns, data: data, format: format, minDate: minDate ? tpl_builtin_1.filterDate(minDate, data, format) : undefined, maxDate: maxDate ? tpl_builtin_1.filterDate(maxDate, data, format) : undefined, minDuration: minDuration ? tpl_builtin_1.parseDuration(minDuration) : undefined, maxDuration: maxDuration ? tpl_builtin_1.parseDuration(maxDuration) : undefined }))));
    };
    DateRangeControl.defaultProps = {
        format: 'X',
        joinValues: true,
        delimiter: ','
    };
    return DateRangeControl;
}(react_1.default.Component));
exports.default = DateRangeControl;
var DateRangeControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(DateRangeControlRenderer, _super);
    function DateRangeControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateRangeControlRenderer.defaultProps = tslib_1.__assign(tslib_1.__assign({}, DateRangeControl.defaultProps), { timeFormat: '' });
    DateRangeControlRenderer = tslib_1.__decorate([
        Item_1.FormItem({
            type: 'date-range'
        })
    ], DateRangeControlRenderer);
    return DateRangeControlRenderer;
}(DateRangeControl));
exports.DateRangeControlRenderer = DateRangeControlRenderer;
var DateTimeRangeControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(DateTimeRangeControlRenderer, _super);
    function DateTimeRangeControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateTimeRangeControlRenderer.defaultProps = tslib_1.__assign(tslib_1.__assign({}, DateRangeControl.defaultProps), { timeFormat: 'HH:mm', inputFormat: 'YYYY-MM-DD HH:mm' });
    DateTimeRangeControlRenderer = tslib_1.__decorate([
        Item_1.FormItem({
            type: 'datetime-range',
            sizeMutable: false
        })
    ], DateTimeRangeControlRenderer);
    return DateTimeRangeControlRenderer;
}(DateRangeControl));
exports.DateTimeRangeControlRenderer = DateTimeRangeControlRenderer;
//# sourceMappingURL=./renderers/Form/DateRange.js.map
