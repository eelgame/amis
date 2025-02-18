"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageFieldRenderer = exports.ImageField = exports.imagePlaceholder = exports.ImageThumb = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var factory_1 = require("../factory");
var tpl_1 = require("../utils/tpl");
var theme_1 = require("../theme");
var helper_1 = require("../utils/helper");
var icons_1 = require("../components/icons");
var locale_1 = require("../locale");
var ImageThumb = /** @class */ (function (_super) {
    tslib_1.__extends(ImageThumb, _super);
    function ImageThumb() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImageThumb.prototype.handleEnlarge = function () {
        var _a = this.props, onEnlarge = _a.onEnlarge, rest = tslib_1.__rest(_a, ["onEnlarge"]);
        onEnlarge && onEnlarge(rest);
    };
    ImageThumb.prototype.render = function () {
        var _a = this.props, cx = _a.classnames, className = _a.className, imageClassName = _a.imageClassName, thumbClassName = _a.thumbClassName, thumbMode = _a.thumbMode, thumbRatio = _a.thumbRatio, height = _a.height, width = _a.width, src = _a.src, alt = _a.alt, title = _a.title, caption = _a.caption, onLoad = _a.onLoad, enlargeAble = _a.enlargeAble, __ = _a.translate;
        return (react_1.default.createElement("div", { className: cx('Image', className) },
            react_1.default.createElement("div", { className: cx('Image-thumb', thumbClassName, thumbMode ? "Image-thumb--" + thumbMode : '', thumbRatio ? "Image-thumb--" + thumbRatio.replace(/:/g, '-') : ''), style: { height: height, width: width } },
                react_1.default.createElement("img", { onLoad: onLoad, className: cx(imageClassName), src: src, alt: alt }),
                enlargeAble ? (react_1.default.createElement("div", { key: "overlay", className: cx('Image-overlay') },
                    react_1.default.createElement("a", { "data-tooltip": __('Image.zoomIn'), "data-position": "bottom", target: "_blank", onClick: this.handleEnlarge },
                        react_1.default.createElement(icons_1.Icon, { icon: "view", className: "icon" })))) : null),
            title || caption ? (react_1.default.createElement("div", { key: "caption", className: cx('Image-info') },
                title ? react_1.default.createElement("div", { className: cx('Image-title') }, title) : null,
                caption ? (react_1.default.createElement("div", { className: cx('Image-caption') }, caption)) : null)) : null));
    };
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], ImageThumb.prototype, "handleEnlarge", null);
    return ImageThumb;
}(react_1.default.Component));
exports.ImageThumb = ImageThumb;
var ThemedImageThumb = theme_1.themeable(locale_1.localeable(ImageThumb));
exports.default = ThemedImageThumb;
exports.imagePlaceholder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAC0CAMAAAAKE/YAAAAAP1BMVEXp7vG6vsHo7fC3ur7s8fXr8PO1uLy8wMO5vcDL0NLN0dXl6u3T19vHy86+wsXO0tbQ1djc4eTh5ejBxcjZ3eD/ULOKAAACiklEQVR42u3a2YrjMBCF4arSVrYTL3Le/1lHXqbdPTZDWheRDOcLAZGrnyLgRSIAAAAAAAAAAAAAAAAAAAAAAAAAAAD4IrmoGBHKVSxbyFEm56hMtRBN7TNPO1GRaiFpvDd5vG+lQLUQNT6EwDlCYD+4AtF2Ug4mkzKb+PFqITf6oP3wyDEEZTPaz0dT63s/2DxPw6YtFT2S7Lr0eZtrSkYP64pShrXWyZsVhaNHt6xScjdNUSy9lyG2fLTYbpyZw/NFJDeJFhdnb4wab1ohuUc0dbPnwMxB/WhFbhFtR8+boBwvSkSktmiS2fDu8oohzoqQ1BQtLgY9oht3HutrXKvrjX4SyekexTys1DVp6vojeimRf5t1ra5p0lvBTvVlz83MW3VV0TF1bfwsJOfmv9UVRYt9eN2a++gumo/qeqJJ3Ks3i+dl81FNUk90ipDX0I4TfW+WvflndT3R6WsTJ/9r3qvriSb569x8VPNaXU/0149y0XxU+4cjqSpaZK8+mq+rK4pOofE5WZFT86m6omjbzT4s1UfzZXVFf4+1uTc82aWZTeArGkzoXC3R25w1LNX2lZqVr2lfPnpZHc3MqTpOejSfmAqiHcn35kRDCk8qnnSKPpo3qqx1R6fV3swHrX/SazP/UHl0Wrml+VbRTmhpvlu0i6o3jA6IPlQTHWqJZqNv4ypumFJ0z+FtPc8VRJNI9zvln1wytrhrenLZ3GGjqHWW3O/tm5+Ftpm5Gdrht9qh2V6CCH2Y2KgmsM9imFWj+3w00eiVQx5eN8Lo44RkVJOLR5IyR2tcHJs8Y7SlDjGJtS6PteWOi53d4WQe3a8YAAAAAAAAAAAAAAAAAAAAAAAAAACgNn8AGA09DkR51CoAAAAASUVORK5CYII=';
var ImageField = /** @class */ (function (_super) {
    tslib_1.__extends(ImageField, _super);
    function ImageField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImageField.prototype.handleEnlarge = function (_a) {
        var src = _a.src, originalSrc = _a.originalSrc, title = _a.title, caption = _a.caption, thumbMode = _a.thumbMode, thumbRatio = _a.thumbRatio;
        var _b = this.props, onImageEnlarge = _b.onImageEnlarge, enlargeTitle = _b.enlargeTitle, enlargeCaption = _b.enlargeCaption;
        onImageEnlarge &&
            onImageEnlarge({
                src: src,
                originalSrc: originalSrc || src,
                title: enlargeTitle || title,
                caption: enlargeCaption || caption,
                thumbMode: thumbMode,
                thumbRatio: thumbRatio
            }, this.props);
    };
    ImageField.prototype.render = function () {
        var _a = this.props, className = _a.className, defaultImage = _a.defaultImage, imageCaption = _a.imageCaption, title = _a.title, data = _a.data, imageClassName = _a.imageClassName, thumbClassName = _a.thumbClassName, height = _a.height, width = _a.width, cx = _a.classnames, src = _a.src, thumbMode = _a.thumbMode, thumbRatio = _a.thumbRatio, placeholder = _a.placeholder, originalSrc = _a.originalSrc, enlargeAble = _a.enlargeAble, showDimensions = _a.showDimensions;
        var finnalSrc = src ? tpl_1.filter(src, data, '| raw') : '';
        var value = finnalSrc || this.props.value || defaultImage;
        return (react_1.default.createElement("div", { className: cx('ImageField', className) }, value ? (react_1.default.createElement(ThemedImageThumb, { imageClassName: imageClassName, thumbClassName: thumbClassName, height: height, width: width, src: value, title: tpl_1.filter(title, data), caption: tpl_1.filter(imageCaption, data), thumbMode: thumbMode, thumbRatio: thumbRatio, originalSrc: tpl_1.filter(originalSrc, data, '| raw'), enlargeAble: enlargeAble && value !== defaultImage, onEnlarge: this.handleEnlarge, showDimensions: showDimensions })) : (react_1.default.createElement("span", { className: "text-muted" }, placeholder))));
    };
    ImageField.defaultProps = {
        defaultImage: exports.imagePlaceholder,
        thumbMode: 'contain',
        thumbRatio: '1:1',
        placeholder: '-'
    };
    tslib_1.__decorate([
        helper_1.autobind,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ImageField.prototype, "handleEnlarge", null);
    return ImageField;
}(react_1.default.Component));
exports.ImageField = ImageField;
var ImageFieldRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(ImageFieldRenderer, _super);
    function ImageFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImageFieldRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)image$/,
            name: 'image'
        })
    ], ImageFieldRenderer);
    return ImageFieldRenderer;
}(ImageField));
exports.ImageFieldRenderer = ImageFieldRenderer;
//# sourceMappingURL=./renderers/Image.js.map
