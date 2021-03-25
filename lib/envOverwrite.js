"use strict";
/**
 * @file 用于在移动端或不同语言环境下使用不同配置
 */
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.envOverwrite = void 0;
var helper_1 = require("./utils/helper");
var isMobile = ((_b = (_a = window).matchMedia) === null || _b === void 0 ? void 0 : _b.call(_a, '(max-width: 768px)').matches) ? true
    : false;
exports.envOverwrite = function (schema, locale) {
    if (schema.mobile && isMobile) {
        Object.assign(schema, schema.mobile);
        delete schema.mobile;
    }
    if (locale) {
        var schemaNodes = helper_1.findObjectsWithKey(schema, locale);
        for (var _i = 0, schemaNodes_1 = schemaNodes; _i < schemaNodes_1.length; _i++) {
            var schemaNode = schemaNodes_1[_i];
            Object.assign(schemaNode, schemaNode[locale]);
            delete schemaNode[locale];
        }
    }
    if (isMobile) {
        var schemaNodes = helper_1.findObjectsWithKey(schema, 'mobile');
        for (var _a = 0, schemaNodes_2 = schemaNodes; _a < schemaNodes_2.length; _a++) {
            var schemaNode = schemaNodes_2[_a];
            Object.assign(schemaNode, schemaNode['mobile']);
            delete schemaNode['mobile'];
        }
    }
};
//# sourceMappingURL=./envOverwrite.js.map
