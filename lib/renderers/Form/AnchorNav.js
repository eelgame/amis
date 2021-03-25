"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnchorNavRenderer = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var factory_1 = require("../../factory");
var AnchorNav_1 = tslib_1.__importDefault(require("../AnchorNav"));
var AnchorNavRenderer = /** @class */ (function (_super) {
    tslib_1.__extends(AnchorNavRenderer, _super);
    function AnchorNavRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderSection = function (section, props, key) {
            var _a = _this.props, renderFormItems = _a.renderFormItems, formMode = _a.formMode, formHorizontal = _a.formHorizontal, $path = _a.$path, render = _a.render, cx = _a.classnames;
            debugger;
            if (renderFormItems && !section.type && section.controls) {
                return (react_1.default.createElement("div", { className: cx("Form--" + (formMode || 'normal')) }, renderFormItems(section, $path.replace(/^.*form\//, '') + "/" + key, {
                    mode: formMode,
                    horizontal: formHorizontal
                })));
            }
            return render("section/" + key, section.body || section);
        };
        return _this;
    }
    AnchorNavRenderer.defaultProps = {
        mountOnEnter: false // form 中的不按需渲染
    };
    AnchorNavRenderer.propsList = ['onChange', 'links'];
    AnchorNavRenderer = tslib_1.__decorate([
        factory_1.Renderer({
            test: /(^|\/)form(?:.+)?\/control\/anchor-nav$/i,
            weight: -100,
            name: 'anchor-nav-control'
        })
    ], AnchorNavRenderer);
    return AnchorNavRenderer;
}(AnchorNav_1.default));
exports.AnchorNavRenderer = AnchorNavRenderer;
//# sourceMappingURL=./renderers/Form/AnchorNav.js.map
