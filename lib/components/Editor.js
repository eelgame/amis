"use strict";
/**
 * @file Editor
 * @description
 * @author fex
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Editor = exports.monacoFactory = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var theme_1 = require("../theme");
// 用于发布 sdk 版本的时候替换，因为不确定 sdk 版本怎么部署，而 worker 地址路径不可知。
// 所以会被 fis3 替换成取相对的代码。
function filterUrl(url) {
    return url;
}
window.MonacoEnvironment = {
    getWorkerUrl: function (moduleId, label) {
        var url = '/pkg/editor.worker.js';
        if (label === 'json') {
            url = '/pkg/json.worker.js';
        }
        else if (label === 'css') {
            url = '/pkg/css.worker.js';
        }
        else if (label === 'html') {
            url = '/pkg/html.worker.js';
        }
        else if (label === 'typescript' || label === 'javascript') {
            url = '/pkg/ts.worker.js';
        }
        url = filterUrl(url);
        // url 有可能会插件替换成 cdn 地址，比如：fis3-prepackager-stand-alone-pack
        if (/^https?/.test(url)) {
            return "data:text/javascript;charset=utf-8," + encodeURIComponent("\n        importScripts('" + url + "');") + "\n      ";
        }
        return url;
    }
};
function monacoFactory(containerElement, monaco, options) {
    return monaco.editor.create(containerElement, tslib_1.__assign({ autoIndent: true, formatOnType: true, formatOnPaste: true, selectOnLineNumbers: true, scrollBeyondLastLine: false, folding: true, minimap: {
            enabled: false
        }, scrollbar: {
            alwaysConsumeMouseWheel: false
        } }, options));
}
exports.monacoFactory = monacoFactory;
var Editor = /** @class */ (function (_super) {
    tslib_1.__extends(Editor, _super);
    function Editor(props) {
        var _this = _super.call(this, props) || this;
        _this.disposes = [];
        _this.wrapperRef = _this.wrapperRef.bind(_this);
        _this.currentValue = props.value;
        return _this;
    }
    Editor.prototype.componentDidUpdate = function (prevProps) {
        var _a, _b;
        if (this.props.value !== this.currentValue && this.editor) {
            var value = String(this.props.value);
            if (this.props.language === 'json') {
                try {
                    value = JSON.stringify(JSON.parse(value), null, 2);
                }
                catch (e) { }
            }
            this.preventTriggerChangeEvent = true;
            var eidtor = this.editor.getModifiedEditor
                ? this.editor.getModifiedEditor()
                : this.editor;
            var model = eidtor.getModel();
            eidtor.pushUndoStop();
            // pushEditOperations says it expects a cursorComputer, but doesn't seem to need one.
            model.pushEditOperations([], [
                {
                    range: model.getFullModelRange(),
                    text: value
                }
            ]);
            eidtor.pushUndoStop();
            this.preventTriggerChangeEvent = false;
        }
        if (this.props.options.readOnly !== prevProps.options.readOnly &&
            this.editor) {
            (_b = (_a = this.editor).updateOptions) === null || _b === void 0 ? void 0 : _b.call(_a, this.props.options);
        }
    };
    Editor.prototype.componentWillUnmount = function () {
        var _a;
        if (this.editor) {
            var context = this.props.context || window;
            var monaco = context.monaco || window.monaco;
            var editorWillUnmount = this.props.editorWillUnmount;
            editorWillUnmount && editorWillUnmount(this.editor, monaco);
        }
        this.disposes.forEach(function (_a) {
            var dispose = _a.dispose;
            return dispose();
        });
        this.disposes = [];
        (_a = this.editor) === null || _a === void 0 ? void 0 : _a.dispose();
    };
    Editor.prototype.wrapperRef = function (ref) {
        this.container = ref;
        if (ref) {
            this.loadMonaco();
        }
        else {
            try {
                this.disposes.forEach(function (_a) {
                    var dispose = _a.dispose;
                    return dispose();
                });
                this.disposes = [];
                if (this.editor) {
                    this.editor.getModel().dispose();
                    this.editor.dispose();
                }
                this.editor = null;
            }
            catch (e) {
                // ignore
            }
        }
    };
    Editor.prototype.loadMonaco = function () {
        var _this = this;
        Promise.resolve().then(function () { return new Promise(function(resolve){require(['monaco-editor'], function(ret) {resolve(tslib_1.__importStar(ret));})}); }).then(function (monaco) { return _this.initMonaco(monaco); });
    };
    Editor.prototype.initMonaco = function (monaco) {
        var _a, _b;
        var value = this.props.value !== null ? this.props.value : this.props.defaultValue;
        var _c = this.props, language = _c.language, editorTheme = _c.editorTheme, options = _c.options, editorFactory = _c.editorFactory;
        var containerElement = this.container;
        if (!containerElement) {
            return;
        }
        // Before initializing monaco editor
        this.editorWillMount(monaco);
        if (this.props.language === 'json') {
            try {
                value = JSON.stringify(typeof value === 'string' ? JSON.parse(value) : value, null, 2);
            }
            catch (e) {
                // ignore
            }
        }
        var factory = editorFactory || monacoFactory;
        this.editor = factory(containerElement, monaco, tslib_1.__assign(tslib_1.__assign({}, options), { automaticLayout: true, value: value,
            language: language,
            editorTheme: editorTheme, theme: editorTheme }));
        // json 默认开启验证。
        (_a = monaco.languages.json) === null || _a === void 0 ? void 0 : _a.jsonDefaults.setDiagnosticsOptions(tslib_1.__assign({ enableSchemaRequest: true, validate: true, allowComments: true }, (_b = monaco.languages.json) === null || _b === void 0 ? void 0 : _b.jsonDefaults.diagnosticsOptions));
        // After initializing monaco editor
        this.editorDidMount(this.editor, monaco);
    };
    Editor.prototype.editorWillMount = function (monaco) {
        var editorWillMount = this.props.editorWillMount;
        editorWillMount && editorWillMount(monaco);
    };
    Editor.prototype.editorDidMount = function (editor, monaco) {
        var _this = this;
        var _a = this.props, editorDidMount = _a.editorDidMount, onChange = _a.onChange, onFocus = _a.onFocus, onBlur = _a.onBlur;
        editorDidMount && editorDidMount(editor, monaco);
        editor.onDidChangeModelContent &&
            this.disposes.push(editor.onDidChangeModelContent(function (event) {
                var value = editor.getValue();
                // Always refer to the latest value
                _this.currentValue = value;
                // Only invoking when user input changed
                if (!_this.preventTriggerChangeEvent && onChange) {
                    onChange(value, event);
                }
            }));
        onFocus &&
            editor.onDidFocusEditorWidget &&
            this.disposes.push(editor.onDidFocusEditorWidget(onFocus));
        onBlur &&
            editor.onDidBlurEditorWidget &&
            this.disposes.push(editor.onDidBlurEditorWidget(onBlur));
    };
    Editor.prototype.render = function () {
        var _a = this.props, className = _a.className, ns = _a.classPrefix, width = _a.width, height = _a.height;
        var style = this.props.style || {};
        style.width = width;
        style.height = height;
        return (react_1.default.createElement("div", { className: classnames_1.default(ns + "MonacoEditor", className), style: style, ref: this.wrapperRef }));
    };
    Editor.defaultProps = {
        language: 'javascript',
        editorTheme: 'vs',
        width: '100%',
        height: '100%',
        options: {}
    };
    return Editor;
}(react_1.default.Component));
exports.Editor = Editor;
exports.default = theme_1.themeable(Editor);
//# sourceMappingURL=./components/Editor.js.map
