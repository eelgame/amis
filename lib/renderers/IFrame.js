"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IFrameRenderer = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var factory_1 = require("../factory");
var helper_1 = require("../utils/helper");
var Scoped_1 = require("../Scoped");
var api_1 = require("../utils/api");
var IFrame = /** @class */ (function (_super) {
    tslib_1.__extends(IFrame, _super);
    function IFrame() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.IFrameRef = react_1.default.createRef();
        _this.state = {
            width: _this.props.width || '100%',
            height: _this.props.height || '100%'
        };
        return _this;
    }
    IFrame.prototype.componentDidMount = function () {
        window.addEventListener('message', this.onMessage);
    };
    IFrame.prototype.componentDidUpdate = function (prevProps) {
        var data = this.props.data;
        if (data !== prevProps.data) {
            this.postMessage('update', data);
        }
        else if (this.props.width !== prevProps.width ||
            this.props.height !== prevProps.height) {
            this.setState({
                width: this.props.width || '100%',
                height: this.props.height || '100%'
            });
        }
    };
    IFrame.prototype.componentWillUnmount = function () {
        window.removeEventListener('message', this.onMessage);
    };
    IFrame.prototype.onMessage = function (e) {
        var _a;
        var _b = this.props, events = _b.events, onAction = _b.onAction, data = _b.data;
        if (typeof ((_a = e === null || e === void 0 ? void 0 : e.data) === null || _a === void 0 ? void 0 : _a.type) !== 'string' || !events) {
            return;
        }
        var _c = e.data.type.split(':'), prefix = _c[0], type = _c[1];
        if (prefix !== 'amis' || !type) {
            return;
        }
        if (type === 'resize' && e.data.data) {
            this.setState({
                width: e.data.data.width || '100%',
                height: e.data.data.height || '100%'
            });
        }
        else {
            var action = events[type];
            action && onAction(e, action, helper_1.createObject(data, e.data.data));
        }
    };
    IFrame.prototype.onLoad = function () {
        var _a = this.props, src = _a.src, data = _a.data;
        src && this.postMessage('init', data);
    };
    // 当别的组件通知 iframe reload 的时候执行。
    IFrame.prototype.reload = function (subpath, query) {
        if (query) {
            return this.receive(query);
        }
        var _a = this.props, src = _a.src, data = _a.data;
        if (src) {
            this.IFrameRef.current.src = api_1.buildApi(src, data).url;
        }
    };
    // 当别的组件把数据发给 iframe 里面的时候执行。
    IFrame.prototype.receive = function (values) {
        var _a = this.props, src = _a.src, data = _a.data;
        var newData = helper_1.createObject(data, values);
        this.postMessage('receive', newData);
        if (api_1.isApiOutdated(src, src, data, newData)) {
            this.IFrameRef.current.src = api_1.buildApi(src, newData).url;
        }
    };
    IFrame.prototype.postMessage = function (type, data) {
        var _a, _b;
        (_b = (_a = this.IFrameRef.current) === null || _a === void 0 ? void 0 : _a.contentWindow) === null || _b === void 0 ? void 0 : _b.postMessage({
            type: "amis:" + type,
            data: data
        }, '*');
    };
    IFrame.prototype.render = function () {
        var _a = this.state, width = _a.width, height = _a.height;
        var _b = this.props, className = _b.className, src = _b.src, frameBorder = _b.frameBorder, data = _b.data, style = _b.style;
        var tempStyle = {};
        width !== void 0 && (tempStyle.width = width);
        height !== void 0 && (tempStyle.height = height);
        style = tslib_1.__assign(tslib_1.__assign({}, tempStyle), style);
        var finalSrc = src ? api_1.buildApi(src, data).url : undefined;
        if (typeof finalSrc === 'string' &&
            finalSrc &&
            !/^(\.\/|\.\.\/|\/|https?\:\/\/|\/\/)/.test(finalSrc)) {
            return react_1.default.createElement("p", null, "\u8BF7\u586B\u5199\u5408\u6CD5\u7684 iframe \u5730\u5740");
        }
        return (react_1.default.createElement("iframe", { className: className, frameBorder: frameBorder, style: style, ref: this.IFrameRef, onLoad: this.onLoad, src: finalSrc }));
    };
    var _a;
    IFrame.propsList = ['src', 'className'];
    IFrame.defaultProps = {
        className: '',
        frameBorder: 0
    };
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof MessageEvent !== "undefined" && MessageEvent) === "function" ? _a : Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], IFrame.prototype, "onMessage", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], IFrame.prototype, "onLoad", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], IFrame.prototype, "reload", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], IFrame.prototype, "receive", null);
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String, Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], IFrame.prototype, "postMessage", null);
    return IFrame;
}(react_1.default.Component));
exports.default = IFrame;
var IFrameRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(IFrameRenderer, _super);
    function IFrameRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IFrameRenderer.prototype.componentWillMount = function () {
        var scoped = this.context;
        scoped.registerComponent(this);
    };
    IFrameRenderer.prototype.componentWillUnmount = function () {
        var scoped = this.context;
        scoped.unRegisterComponent(this);
    };
    IFrameRenderer.contextType = Scoped_1.ScopedContext;
    IFrameRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)iframe$/,
            name: 'iframe'
        })
    ], IFrameRenderer);
    return IFrameRenderer;
}(IFrame));
exports.IFrameRenderer = IFrameRenderer;
//# sourceMappingURL=./renderers/IFrame.js.map
