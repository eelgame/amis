"use strict";
/**
 * @file MonthRangePicker
 * @description 月份范围选择器
 * @author fex
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonthRangePicker = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var moment_1 = tslib_1.__importDefault(require("moment"));
var react_dom_1 = require("react-dom");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var icons_1 = require("./icons");
var Overlay_1 = tslib_1.__importDefault(require("./Overlay"));
var Calendar_1 = tslib_1.__importDefault(require("./calendar/Calendar"));
var PopOver_1 = tslib_1.__importDefault(require("./PopOver"));
var theme_1 = require("../theme");
var locale_1 = require("../locale");
var DateRangePicker_1 = require("./DateRangePicker");
var capitalize_1 = tslib_1.__importDefault(require("lodash/capitalize"));
var MonthRangePicker = /** @class */ (function (_super) {
    tslib_1.__extends(MonthRangePicker, _super);
    function MonthRangePicker(props) {
        var _this = _super.call(this, props) || this;
        _this.nextMonth = moment_1.default().add(1, 'year').startOf('month');
        _this.open = _this.open.bind(_this);
        _this.close = _this.close.bind(_this);
        _this.handleStartChange = _this.handleStartChange.bind(_this);
        _this.handleEndChange = _this.handleEndChange.bind(_this);
        _this.handleFocus = _this.handleFocus.bind(_this);
        _this.handleBlur = _this.handleBlur.bind(_this);
        _this.checkStartIsValidDate = _this.checkStartIsValidDate.bind(_this);
        _this.checkEndIsValidDate = _this.checkEndIsValidDate.bind(_this);
        _this.confirm = _this.confirm.bind(_this);
        _this.clearValue = _this.clearValue.bind(_this);
        _this.dom = react_1.default.createRef();
        _this.handleClick = _this.handleClick.bind(_this);
        _this.handleKeyPress = _this.handleKeyPress.bind(_this);
        _this.handlePopOverClick = _this.handlePopOverClick.bind(_this);
        _this.renderMonth = _this.renderMonth.bind(_this);
        var _a = _this.props, format = _a.format, joinValues = _a.joinValues, delimiter = _a.delimiter, value = _a.value;
        _this.state = tslib_1.__assign({ isOpened: false, isFocused: false }, DateRangePicker_1.DateRangePicker.unFormatValue(value, format, joinValues, delimiter));
        return _this;
    }
    MonthRangePicker.prototype.componentWillReceiveProps = function (nextProps) {
        var props = this.props;
        var value = nextProps.value, format = nextProps.format, joinValues = nextProps.joinValues, delimiter = nextProps.delimiter;
        if (props.value !== value) {
            this.setState(tslib_1.__assign({}, DateRangePicker_1.DateRangePicker.unFormatValue(value, format, joinValues, delimiter)));
        }
    };
    MonthRangePicker.prototype.focus = function () {
        if (!this.dom.current || this.props.disabled) {
            return;
        }
        this.dom.current.focus();
    };
    MonthRangePicker.prototype.blur = function () {
        if (!this.dom.current || this.props.disabled) {
            return;
        }
        this.dom.current.blur();
    };
    MonthRangePicker.prototype.handleFocus = function () {
        this.setState({
            isFocused: true
        });
    };
    MonthRangePicker.prototype.handleBlur = function () {
        this.setState({
            isFocused: false
        });
    };
    MonthRangePicker.prototype.open = function () {
        if (this.props.disabled) {
            return;
        }
        this.setState({
            isOpened: true
        });
    };
    MonthRangePicker.prototype.close = function () {
        this.setState({
            isOpened: false
        }, this.blur);
    };
    MonthRangePicker.prototype.handleClick = function () {
        this.state.isOpened ? this.close() : this.open();
    };
    MonthRangePicker.prototype.handlePopOverClick = function (e) {
        e.stopPropagation();
        e.preventDefault();
    };
    MonthRangePicker.prototype.handleKeyPress = function (e) {
        if (e.key === ' ') {
            this.handleClick();
            e.preventDefault();
        }
    };
    MonthRangePicker.prototype.confirm = function () {
        if (!this.state.startDate || !this.state.endDate) {
            return;
        }
        else if (this.state.startDate.isAfter(this.state.endDate)) {
            return;
        }
        this.props.onChange(DateRangePicker_1.DateRangePicker.formatValue({
            startDate: this.state.startDate,
            endDate: this.state.endDate
        }, this.props.format, this.props.joinValues, this.props.delimiter, this.props.utc));
        this.close();
    };
    MonthRangePicker.prototype.filterDate = function (date, originValue, timeFormat, type) {
        if (type === void 0) { type = 'start'; }
        var value = date.clone();
        value = value[type === 'start' ? 'startOf' : 'endOf']('month');
        return value;
    };
    MonthRangePicker.prototype.handleStartChange = function (newValue) {
        var _this = this;
        var _a = this.props, embed = _a.embed, minDuration = _a.minDuration, maxDuration = _a.maxDuration;
        var _b = this.state, startDate = _b.startDate, endDate = _b.endDate;
        if (startDate &&
            !endDate &&
            newValue.isSameOrAfter(startDate) &&
            (!minDuration || newValue.isAfter(startDate.clone().add(minDuration))) &&
            (!maxDuration || newValue.isBefore(startDate.clone().add(maxDuration)))) {
            return this.setState({
                endDate: this.filterDate(newValue, endDate, '', 'end')
            }, function () {
                embed && _this.confirm();
            });
        }
        this.setState({
            startDate: this.filterDate(newValue, startDate, '', 'start')
        }, function () {
            embed && _this.confirm();
        });
    };
    MonthRangePicker.prototype.handleEndChange = function (newValue) {
        var _this = this;
        var _a = this.props, embed = _a.embed, minDuration = _a.minDuration, maxDuration = _a.maxDuration;
        var _b = this.state, startDate = _b.startDate, endDate = _b.endDate;
        if (endDate &&
            !startDate &&
            newValue.isSameOrBefore(endDate) &&
            (!minDuration ||
                newValue.isBefore(endDate.clone().subtract(minDuration))) &&
            (!maxDuration || newValue.isAfter(endDate.clone().subtract(maxDuration)))) {
            return this.setState({
                startDate: this.filterDate(newValue, startDate, '', 'start')
            }, function () {
                embed && _this.confirm();
            });
        }
        this.setState({
            endDate: this.filterDate(newValue, endDate, '', 'end')
        }, function () {
            embed && _this.confirm();
        });
    };
    MonthRangePicker.prototype.clearValue = function (e) {
        e.preventDefault();
        e.stopPropagation();
        var _a = this.props, resetValue = _a.resetValue, onChange = _a.onChange;
        onChange(resetValue);
    };
    MonthRangePicker.prototype.checkStartIsValidDate = function (currentDate) {
        var _a = this.state, endDate = _a.endDate, startDate = _a.startDate;
        var _b = this.props, minDate = _b.minDate, maxDate = _b.maxDate, minDuration = _b.minDuration, maxDuration = _b.maxDuration;
        maxDate =
            maxDate && endDate
                ? maxDate.isBefore(endDate)
                    ? maxDate
                    : endDate
                : maxDate || endDate;
        if (minDate && currentDate.isBefore(minDate, 'day')) {
            return false;
        }
        else if (maxDate && currentDate.isAfter(maxDate, 'day')) {
            return false;
        }
        else if (
        // 如果配置了 minDuration 那么 EndDate - minDuration 之后的天数也不能选
        endDate &&
            minDuration &&
            currentDate.isAfter(endDate.clone().subtract(minDuration))) {
            return false;
        }
        else if (endDate &&
            maxDuration &&
            currentDate.isBefore(endDate.clone().subtract(maxDuration))) {
            return false;
        }
        return true;
    };
    MonthRangePicker.prototype.checkEndIsValidDate = function (currentDate) {
        var startDate = this.state.startDate;
        var _a = this.props, minDate = _a.minDate, maxDate = _a.maxDate, minDuration = _a.minDuration, maxDuration = _a.maxDuration;
        minDate =
            minDate && startDate
                ? minDate.isAfter(startDate)
                    ? minDate
                    : startDate
                : minDate || startDate;
        if (minDate && currentDate.isBefore(minDate, 'day')) {
            return false;
        }
        else if (maxDate && currentDate.isAfter(maxDate, 'day')) {
            return false;
        }
        else if (startDate &&
            minDuration &&
            currentDate.isBefore(startDate.clone().add(minDuration))) {
            return false;
        }
        else if (startDate &&
            maxDuration &&
            currentDate.isAfter(startDate.clone().add(maxDuration))) {
            return false;
        }
        return true;
    };
    MonthRangePicker.prototype.renderMonth = function (props, month, year) {
        var currentDate = moment_1.default().year(year).month(month);
        var monthStr = currentDate
            .localeData()
            .monthsShort(currentDate.month(month));
        var strLength = 3;
        var monthStrFixedLength = monthStr.substring(0, strLength);
        var _a = this.state, startDate = _a.startDate, endDate = _a.endDate;
        if (startDate &&
            endDate &&
            currentDate.isBetween(startDate, endDate, 'month', '[]')) {
            props.className += ' rdtBetween';
        }
        return (react_1.default.createElement("td", tslib_1.__assign({}, props),
            react_1.default.createElement("span", null, capitalize_1.default(monthStrFixedLength))));
    };
    MonthRangePicker.prototype.renderCalendar = function () {
        var _a = this.props, ns = _a.classPrefix, locale = _a.locale, embed = _a.embed;
        var __ = this.props.translate;
        var viewMode = 'months';
        var dateFormat = 'YYYY-MM';
        var _b = this.state, startDate = _b.startDate, endDate = _b.endDate;
        return (react_1.default.createElement("div", { className: ns + "DateRangePicker-wrap" },
            react_1.default.createElement(Calendar_1.default, { className: ns + "DateRangePicker-start", value: startDate, onChange: this.handleStartChange, requiredConfirm: false, dateFormat: dateFormat, isValidDate: this.checkStartIsValidDate, viewMode: viewMode, input: false, onClose: this.close, renderMonth: this.renderMonth, locale: locale }),
            react_1.default.createElement(Calendar_1.default, { className: ns + "DateRangePicker-end", value: 
                // 因为如果最后一天，切换月份的时候会切不了,有的月份有 31 号，有的没有。
                endDate === null || 
                // 因为如果最后一天，切换月份的时候会切不了,有的月份有 31 号，有的没有。
                endDate === void 0 ? void 0 : 
                // 因为如果最后一天，切换月份的时候会切不了,有的月份有 31 号，有的没有。
                endDate.clone().startOf('month'), onChange: this.handleEndChange, requiredConfirm: false, dateFormat: dateFormat, viewDate: this.nextMonth, isEndDate: true, isValidDate: this.checkEndIsValidDate, viewMode: viewMode, input: false, onClose: this.close, renderMonth: this.renderMonth, locale: locale }),
            embed ? null : (react_1.default.createElement("div", { key: "button", className: ns + "DateRangePicker-actions" },
                react_1.default.createElement("a", { className: classnames_1.default('rdtBtn rdtBtnConfirm', {
                        'is-disabled': !this.state.startDate || !this.state.endDate
                    }), onClick: this.confirm }, __('confirm')),
                react_1.default.createElement("a", { className: "rdtBtn rdtBtnCancel", onClick: this.close }, __('cancle'))))));
    };
    MonthRangePicker.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, ns = _a.classPrefix, value = _a.value, placeholder = _a.placeholder, popOverContainer = _a.popOverContainer, inputFormat = _a.inputFormat, format = _a.format, joinValues = _a.joinValues, delimiter = _a.delimiter, clearable = _a.clearable, disabled = _a.disabled, embed = _a.embed, overlayPlacement = _a.overlayPlacement;
        var _b = this.state, isOpened = _b.isOpened, isFocused = _b.isFocused;
        var selectedDate = DateRangePicker_1.DateRangePicker.unFormatValue(value, format, joinValues, delimiter);
        var startViewValue = selectedDate.startDate
            ? selectedDate.startDate.format(inputFormat)
            : '';
        var endViewValue = selectedDate.endDate
            ? selectedDate.endDate.format(inputFormat)
            : '';
        var arr = [];
        startViewValue && arr.push(startViewValue);
        endViewValue && arr.push(endViewValue);
        var __ = this.props.translate;
        if (embed) {
            return (react_1.default.createElement("div", { className: classnames_1.default(ns + "DateRangeCalendar", {
                    'is-disabled': disabled
                }, className) }, this.renderCalendar()));
        }
        return (react_1.default.createElement("div", { tabIndex: 0, onKeyPress: this.handleKeyPress, onFocus: this.handleFocus, onBlur: this.handleBlur, className: classnames_1.default(ns + "DateRangePicker", {
                'is-disabled': disabled,
                'is-focused': isFocused
            }, className), ref: this.dom, onClick: this.handleClick },
            arr.length ? (react_1.default.createElement("span", { className: ns + "DateRangePicker-value" }, arr.join(__('DateRange.valueConcat')))) : (react_1.default.createElement("span", { className: ns + "DateRangePicker-placeholder" }, __(placeholder))),
            clearable && !disabled && value ? (react_1.default.createElement("a", { className: ns + "DateRangePicker-clear", onClick: this.clearValue },
                react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))) : null,
            react_1.default.createElement("a", { className: ns + "DateRangePicker-toggler" },
                react_1.default.createElement(icons_1.Icon, { icon: "calendar", className: "icon" })),
            isOpened ? (react_1.default.createElement(Overlay_1.default, { target: function () { return _this.dom.current; }, onHide: this.close, container: popOverContainer || (function () { return react_dom_1.findDOMNode(_this); }), rootClose: false, placement: overlayPlacement, show: true },
                react_1.default.createElement(PopOver_1.default, { classPrefix: ns, className: ns + "DateRangePicker-popover", onHide: this.close, onClick: this.handlePopOverClick, overlay: true }, this.renderCalendar()))) : null));
    };
    MonthRangePicker.defaultProps = {
        placeholder: 'MonthRange.placeholder',
        format: 'YYYY-MM',
        inputFormat: 'YYYY-MM',
        joinValues: true,
        clearable: true,
        delimiter: ',',
        resetValue: '',
        closeOnSelect: true,
        overlayPlacement: 'auto'
    };
    return MonthRangePicker;
}(react_1.default.Component));
exports.MonthRangePicker = MonthRangePicker;
exports.default = theme_1.themeable(locale_1.localeable(MonthRangePicker));
//# sourceMappingURL=./components/MonthRangePicker.js.map
