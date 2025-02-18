"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YearControlRenderer = exports.QuarterControlRenderer = exports.MonthControlRenderer = exports.TimeControlRenderer = exports.DatetimeControlRenderer = exports.DateControlRenderer = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var Item_1 = require("./Item");
var tpl_builtin_1 = require("../../utils/tpl-builtin");
var moment_1 = tslib_1.__importDefault(require("moment"));
require("moment/locale/zh-cn");
var DatePicker_1 = tslib_1.__importDefault(require("../../components/DatePicker"));
var DateControl = /** @class */ (function (_super) {
    tslib_1.__extends(DateControl, _super);
    function DateControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateControl.prototype.componentWillMount = function () {
        var _a = this.props, minDate = _a.minDate, maxDate = _a.maxDate, value = _a.value, defaultValue = _a.defaultValue, setPrinstineValue = _a.setPrinstineValue, data = _a.data, format = _a.format, utc = _a.utc;
        if (defaultValue && value === defaultValue) {
            var date = tpl_builtin_1.filterDate(defaultValue, data, format);
            setPrinstineValue((utc ? moment_1.default.utc(date) : date).format(format));
        }
        this.setState({
            minDate: minDate ? tpl_builtin_1.filterDate(minDate, data, format) : undefined,
            maxDate: maxDate ? tpl_builtin_1.filterDate(maxDate, data, format) : undefined
        });
    };
    DateControl.prototype.componentWillReceiveProps = function (nextProps) {
        var props = this.props;
        if (props.defaultValue !== nextProps.defaultValue) {
            var date = tpl_builtin_1.filterDate(nextProps.defaultValue, nextProps.data, nextProps.format);
            nextProps.setPrinstineValue((nextProps.utc ? moment_1.default.utc(date) : date).format(nextProps.format));
        }
        if (props.minDate !== nextProps.minDate ||
            props.maxDate !== nextProps.maxDate ||
            props.data !== nextProps.data) {
            this.setState({
                minDate: nextProps.minDate
                    ? tpl_builtin_1.filterDate(nextProps.minDate, nextProps.data, this.props.format)
                    : undefined,
                maxDate: nextProps.maxDate
                    ? tpl_builtin_1.filterDate(nextProps.maxDate, nextProps.data, this.props.format)
                    : undefined
            });
        }
    };
    DateControl.prototype.render = function () {
        var _a = this.props, className = _a.className, defaultValue = _a.defaultValue, defaultData = _a.defaultData, cx = _a.classnames, minDate = _a.minDate, maxDate = _a.maxDate, type = _a.type, format = _a.format, timeFormat = _a.timeFormat, rest = tslib_1.__rest(_a, ["className", "defaultValue", "defaultData", "classnames", "minDate", "maxDate", "type", "format", "timeFormat"]);
        if (type === 'time' && timeFormat) {
            format = timeFormat;
        }
        return (react_1.default.createElement("div", { className: cx("DateControl", className) },
            react_1.default.createElement(DatePicker_1.default, tslib_1.__assign({}, rest, { timeFormat: timeFormat, format: format }, this.state, { classnames: cx }))));
    };
    DateControl.defaultProps = {
        format: 'X',
        viewMode: 'days',
        inputFormat: 'YYYY-MM-DD',
        timeConstraints: {
            minutes: {
                step: 1
            }
        },
        clearable: true
    };
    return DateControl;
}(react_1.default.PureComponent));
exports.default = DateControl;
var DateControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(DateControlRenderer, _super);
    function DateControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateControlRenderer.defaultProps = tslib_1.__assign(tslib_1.__assign({}, DateControl.defaultProps), { placeholder: 'Date.placeholder', dateFormat: 'YYYY-MM-DD', timeFormat: '', strictMode: false });
    DateControlRenderer = tslib_1.__decorate([
        Item_1.FormItem({
            type: 'date',
            weight: -150
        })
    ], DateControlRenderer);
    return DateControlRenderer;
}(DateControl));
exports.DateControlRenderer = DateControlRenderer;
var DatetimeControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(DatetimeControlRenderer, _super);
    function DatetimeControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DatetimeControlRenderer.defaultProps = tslib_1.__assign(tslib_1.__assign({}, DateControl.defaultProps), { placeholder: 'DateTime.placeholder', inputFormat: 'YYYY-MM-DD HH:mm:ss', dateFormat: 'LL', timeFormat: 'HH:mm:ss', closeOnSelect: false, strictMode: false });
    DatetimeControlRenderer = tslib_1.__decorate([
        Item_1.FormItem({
            type: 'datetime'
        })
    ], DatetimeControlRenderer);
    return DatetimeControlRenderer;
}(DateControl));
exports.DatetimeControlRenderer = DatetimeControlRenderer;
var TimeControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(TimeControlRenderer, _super);
    function TimeControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimeControlRenderer.defaultProps = tslib_1.__assign(tslib_1.__assign({}, DateControl.defaultProps), { placeholder: 'Time.placeholder', inputFormat: 'HH:mm', dateFormat: '', timeFormat: 'HH:mm', viewMode: 'time', closeOnSelect: false });
    TimeControlRenderer = tslib_1.__decorate([
        Item_1.FormItem({
            type: 'time'
        })
    ], TimeControlRenderer);
    return TimeControlRenderer;
}(DateControl));
exports.TimeControlRenderer = TimeControlRenderer;
var MonthControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(MonthControlRenderer, _super);
    function MonthControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MonthControlRenderer.defaultProps = tslib_1.__assign(tslib_1.__assign({}, DateControl.defaultProps), { placeholder: 'Month.placeholder', inputFormat: 'YYYY-MM', dateFormat: 'MM', timeFormat: '', viewMode: 'months', closeOnSelect: true });
    MonthControlRenderer = tslib_1.__decorate([
        Item_1.FormItem({
            type: 'month'
        })
    ], MonthControlRenderer);
    return MonthControlRenderer;
}(DateControl));
exports.MonthControlRenderer = MonthControlRenderer;
var QuarterControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(QuarterControlRenderer, _super);
    function QuarterControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QuarterControlRenderer.defaultProps = tslib_1.__assign(tslib_1.__assign({}, DateControl.defaultProps), { placeholder: 'Quarter.placeholder', inputFormat: 'YYYY [Q]Q', dateFormat: 'YYYY [Q]Q', timeFormat: '', viewMode: 'quarters', closeOnSelect: true });
    QuarterControlRenderer = tslib_1.__decorate([
        Item_1.FormItem({
            type: 'quarter'
        })
    ], QuarterControlRenderer);
    return QuarterControlRenderer;
}(DateControl));
exports.QuarterControlRenderer = QuarterControlRenderer;
var YearControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(YearControlRenderer, _super);
    function YearControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    YearControlRenderer.defaultProps = tslib_1.__assign(tslib_1.__assign({}, DateControl.defaultProps), { placeholder: 'Year.placeholder', inputFormat: 'YYYY', dateFormat: 'YYYY', timeFormat: '', viewMode: 'years', closeOnSelect: true });
    YearControlRenderer = tslib_1.__decorate([
        Item_1.FormItem({
            type: 'year'
        })
    ], YearControlRenderer);
    return YearControlRenderer;
}(DateControl));
exports.YearControlRenderer = YearControlRenderer;
//# sourceMappingURL=./renderers/Form/Date.js.map
