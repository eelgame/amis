"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomDaysView = void 0;
var tslib_1 = require("tslib");
// @ts-ignore
var DaysView_1 = tslib_1.__importDefault(require("react-datetime/src/DaysView"));
var react_1 = tslib_1.__importDefault(require("react"));
var locale_1 = require("../../locale");
var CustomDaysView = /** @class */ (function (_super) {
    tslib_1.__extends(CustomDaysView, _super);
    function CustomDaysView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.updateSelectedDate = function (event) {
            // need confirm
            if (_this.props.requiredConfirm) {
                var viewDate = _this.props.viewDate.clone();
                var currentDate = _this.props.selectedDate || viewDate;
                var target = event.target;
                var modifier = 0;
                if (~target.className.indexOf('rdtNew')) {
                    modifier = 1;
                }
                if (~target.className.indexOf('rdtOld')) {
                    modifier = -1;
                }
                viewDate
                    .month(viewDate.month() + modifier)
                    .date(parseInt(target.getAttribute('data-value'), 10))
                    .hours(currentDate.hours())
                    .minutes(currentDate.minutes())
                    .seconds(currentDate.seconds())
                    .milliseconds(currentDate.milliseconds());
                _this.props.setDateTimeState({
                    viewDate: viewDate,
                    selectedDate: viewDate.clone()
                });
                return;
            }
            _this.props.updateSelectedDate(event, true);
        };
        _this.setTime = function (type, value) {
            var date = (_this.props.selectedDate || _this.props.viewDate).clone();
            date[type](value);
            _this.props.setDateTimeState({
                viewDate: date.clone(),
                selectedDate: date.clone()
            });
            if (!_this.props.requiredConfirm) {
                _this.props.onChange(date);
            }
        };
        _this.confirm = function () {
            var date = (_this.props.selectedDate || _this.props.viewDate).clone();
            _this.props.setDateTimeState({
                selectedDate: date
            });
            _this.props.onChange(date);
            _this.props.onClose && _this.props.onClose();
        };
        _this.cancel = function () {
            _this.props.onClose && _this.props.onClose();
        };
        _this.renderDay = function (props, currentDate) {
            return react_1.default.createElement("td", tslib_1.__assign({}, props), currentDate.date());
        };
        _this.renderTimes = function () {
            var _a = _this.props, timeFormat = _a.timeFormat, selectedDate = _a.selectedDate, viewDate = _a.viewDate, isEndDate = _a.isEndDate, cx = _a.classnames;
            var date = selectedDate || (isEndDate ? viewDate.endOf('day') : viewDate);
            var inputs = [];
            timeFormat.split(':').forEach(function (format, i) {
                var type = /h/i.test(format)
                    ? 'hours'
                    : /m/i.test(format)
                        ? 'minutes'
                        : 'seconds';
                var min = 0;
                var max = type === 'hours' ? 23 : 59;
                inputs.push(react_1.default.createElement("input", { key: i + 'input', type: "text", value: date.format(format), className: cx('CalendarInput'), min: min, max: max, onChange: function (e) {
                        return _this.setTime(type, Math.max(min, Math.min(parseInt(e.currentTarget.value.replace(/\D/g, ''), 10) || 0, max)));
                    } }));
                inputs.push(react_1.default.createElement("span", { key: i + 'divider' }, ":"));
            });
            inputs.length && inputs.pop();
            return react_1.default.createElement("div", null, inputs);
        };
        _this.renderFooter = function () {
            if (!_this.props.timeFormat && !_this.props.requiredConfirm) {
                return null;
            }
            var __ = _this.props.translate;
            return (react_1.default.createElement("tfoot", { key: "tf" },
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("td", { colSpan: 7 },
                        _this.props.timeFormat ? _this.renderTimes() : null,
                        _this.props.requiredConfirm ? (react_1.default.createElement("div", { key: "button", className: "rdtActions" },
                            react_1.default.createElement("a", { className: "rdtBtn rdtBtnConfirm", onClick: _this.confirm }, __('confirm')),
                            react_1.default.createElement("a", { className: "rdtBtn rdtBtnCancel", onClick: _this.cancel }, __('cancle')))) : null))));
        };
        return _this;
    }
    CustomDaysView.prototype.render = function () {
        var footer = this.renderFooter();
        var date = this.props.viewDate;
        var locale = date.localeData();
        var __ = this.props.translate;
        var tableChildren = [
            react_1.default.createElement("thead", { key: "th" },
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", { colSpan: 7 },
                        react_1.default.createElement("div", { className: "rdtHeader" },
                            react_1.default.createElement("a", { className: "rdtPrev", onClick: this.props.subtractTime(1, 'years') }, "\u00AB"),
                            react_1.default.createElement("a", { className: "rdtPrev", onClick: this.props.subtractTime(1, 'months') }, "\u2039"),
                            react_1.default.createElement("div", { className: "rdtCenter" },
                                react_1.default.createElement("a", { className: "rdtSwitch", onClick: this.props.showView('years') }, date.format(__('dateformat.year'))),
                                react_1.default.createElement("a", { className: "rdtSwitch", onClick: this.props.showView('months') }, date.format(__('MMM')))),
                            react_1.default.createElement("a", { className: "rdtNext", onClick: this.props.addTime(1, 'months') }, "\u203A"),
                            react_1.default.createElement("a", { className: "rdtNext", onClick: this.props.addTime(1, 'years') }, "\u00BB")))),
                react_1.default.createElement("tr", null, this.getDaysOfWeek(locale).map(function (day, index) { return (react_1.default.createElement("th", { key: day + index, className: "dow" }, day)); }))),
            react_1.default.createElement("tbody", { key: "tb" }, this.renderDays())
        ];
        footer && tableChildren.push(footer);
        return (react_1.default.createElement("div", { className: "rdtDays" },
            react_1.default.createElement("table", null, tableChildren)));
    };
    return CustomDaysView;
}(DaysView_1.default));
exports.CustomDaysView = CustomDaysView;
exports.default = locale_1.localeable(CustomDaysView);
//# sourceMappingURL=./components/calendar/DaysView.js.map
