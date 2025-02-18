"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RichTextControlRenderer = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var Item_1 = require("./Item");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var LazyComponent_1 = tslib_1.__importDefault(require("../../components/LazyComponent"));
function loadRichText(type) {
    if (type === void 0) { type = 'froala'; }
    return function () {
        return type === 'tinymce'
            ? Promise.resolve().then(function () { return new Promise(function(resolve){require(['../../components/Tinymce'], function(ret) {resolve(tslib_1.__importStar(ret));})}); }).then(function (item) { return item.default; })
            : Promise.resolve().then(function () { return new Promise(function(resolve){require(['../../components/RichText'], function(ret) {resolve(tslib_1.__importStar(ret));})}); }).then(function (item) { return item.default; });
    };
}
var RichTextControl = /** @class */ (function (_super) {
    tslib_1.__extends(RichTextControl, _super);
    function RichTextControl(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            focused: false
        };
        _this.config = null;
        var finnalVendor = props.vendor || (props.env.richTextToken ? 'froala' : 'tinymce');
        _this.handleFocus = _this.handleFocus.bind(_this);
        _this.handleBlur = _this.handleBlur.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        if (finnalVendor === 'froala') {
            _this.config = tslib_1.__assign(tslib_1.__assign({ imageAllowedTypes: ['jpeg', 'jpg', 'png', 'gif'], imageDefaultAlign: 'left', imageEditButtons: props.imageEditable
                    ? [
                        'imageReplace',
                        'imageAlign',
                        'imageRemove',
                        '|',
                        'imageLink',
                        'linkOpen',
                        'linkEdit',
                        'linkRemove',
                        '-',
                        'imageDisplay',
                        'imageStyle',
                        'imageAlt',
                        'imageSize'
                    ]
                    : [], key: props.env.richTextToken }, props.options), { editorClass: props.editorClass, placeholderText: props.translate(props.placeholder), imageUploadURL: props.receiver, imageUploadParams: {
                    from: 'rich-text'
                }, videoUploadURL: props.videoReceiver, videoUploadParams: {
                    from: 'rich-text'
                }, events: tslib_1.__assign(tslib_1.__assign({}, (props.options && props.options.events)), { 'froalaEditor.focus': _this.handleFocus, 'froalaEditor.blur': _this.handleBlur }), language: !_this.props.locale || _this.props.locale === 'zh-CN' ? 'zh_cn' : '' });
            if (props.buttons) {
                _this.config.toolbarButtonsSM = props.buttons;
                _this.config.toolbarButtonsMD = props.buttons;
                _this.config.toolbarButtonsXS = props.buttons;
                _this.config.toolbarButtons = props.buttons;
            }
        }
        else {
            var fetcher_1 = props.env.fetcher;
            _this.config = tslib_1.__assign(tslib_1.__assign({}, props.options), { images_upload_url: props.receiver, images_upload_handler: function (blobInfo, ok, fail) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var formData, response, e_1;
                    var _a, _b, _c;
                    return tslib_1.__generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                formData = new FormData();
                                formData.append('file', blobInfo.blob(), blobInfo.filename());
                                _d.label = 1;
                            case 1:
                                _d.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, fetcher_1(props.receiver, formData, {
                                        method: 'post'
                                    })];
                            case 2:
                                response = _d.sent();
                                if (response.ok) {
                                    ok(((_a = response.data) === null || _a === void 0 ? void 0 : _a.link) || ((_b = response.data) === null || _b === void 0 ? void 0 : _b.url) || ((_c = response.data) === null || _c === void 0 ? void 0 : _c.value) ||
                                        response.link);
                                }
                                return [3 /*break*/, 4];
                            case 3:
                                e_1 = _d.sent();
                                fail(e_1);
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); } });
        }
        return _this;
    }
    RichTextControl.prototype.handleFocus = function () {
        this.setState({
            focused: true
        });
    };
    RichTextControl.prototype.handleBlur = function () {
        this.setState({
            focused: false
        });
    };
    RichTextControl.prototype.handleChange = function (value, submitOnChange, changeImmediately) {
        var _a = this.props, onChange = _a.onChange, disabled = _a.disabled;
        if (disabled) {
            return;
        }
        onChange === null || onChange === void 0 ? void 0 : onChange(value, submitOnChange, changeImmediately);
    };
    RichTextControl.prototype.render = function () {
        var _a = this.props, className = _a.className, ns = _a.classPrefix, value = _a.value, onChange = _a.onChange, disabled = _a.disabled, size = _a.size, vendor = _a.vendor, env = _a.env, locale = _a.locale, translate = _a.translate;
        var finnalVendor = vendor || (env.richTextToken ? 'froala' : 'tinymce');
        return (react_1.default.createElement("div", { className: classnames_1.default(ns + "RichTextControl", className, {
                'is-focused': this.state.focused,
                'is-disabled': disabled
            }) },
            react_1.default.createElement(LazyComponent_1.default, { getComponent: loadRichText(finnalVendor), model: value, onModelChange: this.handleChange, onFocus: this.handleFocus, onBlur: this.handleBlur, config: this.config, disabled: disabled, locale: locale, translate: translate })));
    };
    RichTextControl.defaultProps = {
        imageEditable: true,
        receiver: '/api/upload/image',
        videoReceiver: '/api/upload/video',
        placeholder: 'placeholder.enter',
        options: {
            toolbarButtonsSM: [
                'paragraphFormat',
                'quote',
                'color',
                '|',
                'bold',
                'italic',
                'underline',
                'strikeThrough',
                '|',
                'formatOL',
                'formatUL',
                'align',
                '|',
                'insertLink',
                'insertImage',
                'insertEmotion',
                'insertTable',
                '|',
                'undo',
                'redo',
                'html'
            ],
            toolbarButtonsMD: [
                'paragraphFormat',
                'quote',
                'color',
                '|',
                'bold',
                'italic',
                'underline',
                'strikeThrough',
                '|',
                'formatOL',
                'formatUL',
                'align',
                '|',
                'insertLink',
                'insertImage',
                'insertEmotion',
                'insertTable',
                '|',
                'undo',
                'redo',
                'html'
            ],
            toolbarButtons: [
                'paragraphFormat',
                'quote',
                'color',
                '|',
                'bold',
                'italic',
                'underline',
                'strikeThrough',
                '|',
                'formatOL',
                'formatUL',
                'align',
                '|',
                'insertLink',
                'insertImage',
                'insertEmotion',
                'insertTable',
                '|',
                'undo',
                'redo',
                'html'
            ]
        }
    };
    return RichTextControl;
}(react_1.default.Component));
exports.default = RichTextControl;
var RichTextControlRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(RichTextControlRenderer, _super);
    function RichTextControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RichTextControlRenderer = tslib_1.__decorate([
        Item_1.FormItem({
            type: 'rich-text',
            sizeMutable: false
        })
    ], RichTextControlRenderer);
    return RichTextControlRenderer;
}(RichTextControl));
exports.RichTextControlRenderer = RichTextControlRenderer;
//# sourceMappingURL=./renderers/Form/RichText.js.map
