"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonthFieldRenderer = exports.TimeFieldRenderer = exports.DateTimeFieldRenderer = exports.DateFieldRenderer = exports.DateField = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var factory_1 = require("../factory");
var moment_1 = tslib_1.__importDefault(require("moment"));
var DateField = /** @class */ (function (_super) {
    tslib_1.__extends(DateField, _super);
    function DateField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 动态显示相对时间时，用来触发视图更新
        _this.state = {
            random: 0
        };
        return _this;
    }
    DateField.prototype.componentDidMount = function () {
        var _this = this;
        var _a = this.props, fromNow = _a.fromNow, updateFrequency = _a.updateFrequency;
        if (fromNow && updateFrequency) {
            this.refreshInterval = setInterval(function () {
                _this.setState({
                    random: Math.random()
                });
            }, updateFrequency);
        }
    };
    DateField.prototype.componentWillUnmount = function () {
        clearInterval(this.refreshInterval);
    };
    DateField.prototype.render = function () {
        var _a = this.props, value = _a.value, valueFormat = _a.valueFormat, format = _a.format, placeholder = _a.placeholder, fromNow = _a.fromNow, className = _a.className, cx = _a.classnames, __ = _a.translate;
        var viewValue = (react_1.default.createElement("span", { className: "text-muted" }, placeholder));
        if (value) {
            var ISODate = moment_1.default(value, moment_1.default.ISO_8601);
            var NormalDate = moment_1.default(value, valueFormat);
            viewValue = ISODate.isValid()
                ? ISODate.format(format)
                : NormalDate.isValid()
                    ? NormalDate.format(format)
                    : false;
        }
        if (fromNow) {
            viewValue = moment_1.default(viewValue).fromNow();
        }
        viewValue = !viewValue ? (react_1.default.createElement("span", { className: "text-danger" }, __('Date.invalid'))) : (viewValue);
        return react_1.default.createElement("span", { className: cx('DateField', className) }, viewValue);
    };
    DateField.defaultProps = {
        placeholder: '-',
        format: 'YYYY-MM-DD',
        valueFormat: 'X',
        fromNow: false,
        updateFrequency: 60000
    };
    return DateField;
}(react_1.default.Component));
exports.DateField = DateField;
var DateFieldRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(DateFieldRenderer, _super);
    function DateFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateFieldRenderer.defaultProps = tslib_1.__assign(tslib_1.__assign({}, DateField.defaultProps), { format: 'YYYY-MM-DD' });
    DateFieldRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)date$/,
            name: 'date-field'
        })
    ], DateFieldRenderer);
    return DateFieldRenderer;
}(DateField));
exports.DateFieldRenderer = DateFieldRenderer;
var DateTimeFieldRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(DateTimeFieldRenderer, _super);
    function DateTimeFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateTimeFieldRenderer.defaultProps = tslib_1.__assign(tslib_1.__assign({}, DateField.defaultProps), { format: 'YYYY-MM-DD HH:mm:ss' });
    DateTimeFieldRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)datetime$/,
            name: 'datetime-field'
        })
    ], DateTimeFieldRenderer);
    return DateTimeFieldRenderer;
}(DateField));
exports.DateTimeFieldRenderer = DateTimeFieldRenderer;
var TimeFieldRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(TimeFieldRenderer, _super);
    function TimeFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimeFieldRenderer.defaultProps = tslib_1.__assign(tslib_1.__assign({}, DateField.defaultProps), { format: 'HH:mm' });
    TimeFieldRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)time$/,
            name: 'time-field'
        })
    ], TimeFieldRenderer);
    return TimeFieldRenderer;
}(DateField));
exports.TimeFieldRenderer = TimeFieldRenderer;
var MonthFieldRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(MonthFieldRenderer, _super);
    function MonthFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MonthFieldRenderer.defaultProps = tslib_1.__assign(tslib_1.__assign({}, DateField.defaultProps), { format: 'YYYY-MM' });
    MonthFieldRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)month$/,
            name: 'month-field'
        })
    ], MonthFieldRenderer);
    return MonthFieldRenderer;
}(DateField));
exports.MonthFieldRenderer = MonthFieldRenderer;
//# sourceMappingURL=./renderers/Date.js.map
