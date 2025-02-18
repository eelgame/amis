"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputGroup = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var helper_1 = require("../../utils/helper");
var filter_schema_1 = tslib_1.__importDefault(require("../../utils/filter-schema"));
var Item_1 = require("./Item");
var InputGroup = /** @class */ (function (_super) {
    tslib_1.__extends(InputGroup, _super);
    function InputGroup(props) {
        var _this = _super.call(this, props) || this;
        _this.handleFocus = _this.handleFocus.bind(_this);
        _this.handleBlur = _this.handleBlur.bind(_this);
        _this.state = {
            isFocused: false
        };
        return _this;
    }
    InputGroup.prototype.handleFocus = function () {
        this.setState({
            isFocused: true
        });
    };
    InputGroup.prototype.handleBlur = function () {
        this.setState({
            isFocused: false
        });
    };
    InputGroup.prototype.renderControl = function (control, index, otherProps) {
        var _a = this.props, render = _a.render, onChange = _a.onChange;
        if (!control) {
            return null;
        }
        var subSchema = control && control.type === 'control'
            ? control
            : {
                type: 'control',
                control: control
            };
        if (subSchema.control) {
            var control_1 = subSchema.control;
            control_1.hiddenOn && (subSchema.hiddenOn = control_1.hiddenOn);
            control_1.visibleOn && (subSchema.visibleOn = control_1.visibleOn);
        }
        return render("" + index, subSchema, tslib_1.__assign({ onChange: onChange }, otherProps));
    };
    InputGroup.prototype.validate = function () {
        var formItem = this.props.formItem;
        var errors = [];
        formItem === null || formItem === void 0 ? void 0 : formItem.subFormItems.forEach(function (item) {
            if (item.errors.length) {
                errors.push.apply(errors, item.errors);
            }
        });
        return errors.length ? errors : '';
    };
    InputGroup.prototype.render = function () {
        var _this = this;
        var _a = this.props, controls = _a.controls, className = _a.className, mode = _a.mode, horizontal = _a.horizontal, formMode = _a.formMode, formHorizontal = _a.formHorizontal, data = _a.data, cx = _a.classnames;
        formMode = mode || formMode;
        controls = controls.filter(function (item) {
            if (item && (item.hidden || item.visible === false)) {
                return false;
            }
            var exprProps = filter_schema_1.default(item || {}, data);
            if (exprProps.hidden || exprProps.visible === false) {
                return false;
            }
            return true;
        });
        var horizontalDeeper = horizontal ||
            helper_1.makeHorizontalDeeper(formHorizontal, controls.length);
        return (react_1.default.createElement("div", { className: cx("InputGroup", className, {
                'is-focused': this.state.isFocused
            }) }, controls.map(function (control, index) {
            var isAddOn = ~[
                'icon',
                'plain',
                'tpl',
                'button',
                'submit',
                'reset'
            ].indexOf(control && control.type);
            var dom = _this.renderControl(control, index, {
                formHorizontal: horizontalDeeper,
                formMode: 'normal',
                inputOnly: true,
                key: index,
                onFocus: _this.handleFocus,
                onBlur: _this.handleBlur
            });
            return isAddOn ? (react_1.default.createElement("span", { key: index, className: cx(control.addOnclassName, ~['button', 'submit', 'reset'].indexOf(control && control.type)
                    ? 'InputGroup-btn'
                    : 'InputGroup-addOn') }, dom)) : (dom);
        })));
    };
    return InputGroup;
}(react_1.default.Component));
exports.InputGroup = InputGroup;
var InputGroupRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(InputGroupRenderer, _super);
    function InputGroupRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InputGroupRenderer = tslib_1.__decorate([
        Item_1.FormItem({
            type: 'input-group',
            strictMode: false
        })
    ], InputGroupRenderer);
    return InputGroupRenderer;
}(InputGroup));
exports.default = InputGroupRenderer;
//# sourceMappingURL=./renderers/Form/InputGroup.js.map
