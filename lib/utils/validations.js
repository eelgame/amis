"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.str2rules = exports.validateObject = exports.validate = exports.validateMessages = exports.addRule = exports.validations = void 0;
var tslib_1 = require("tslib");
var tpl_1 = require("./tpl");
var tpl_builtin_1 = require("./tpl-builtin");
var isExisty = function (value) { return value !== null && value !== undefined; };
var isEmpty = function (value) { return value === ''; };
var makeRegexp = function (reg) {
    if (reg instanceof RegExp) {
        return reg;
    }
    else if (/^(?:matchRegexp\:)?\/(.+)\/([gimuy]*)$/.test(reg)) {
        return new RegExp(RegExp.$1, RegExp.$2 || '');
    }
    else if (typeof reg === 'string') {
        return new RegExp(reg);
    }
    return /^$/;
};
exports.validations = {
    isRequired: function (values, value) {
        return (value !== undefined &&
            value !== '' &&
            value !== null &&
            (!Array.isArray(value) || !!value.length));
    },
    isExisty: function (values, value) {
        return isExisty(value);
    },
    matchRegexp: function (values, value, regexp) {
        return !isExisty(value) || isEmpty(value) || makeRegexp(regexp).test(value);
    },
    isUndefined: function (values, value) {
        return value === undefined;
    },
    isEmptyString: function (values, value) {
        return isEmpty(value);
    },
    isEmail: function (values, value) {
        return exports.validations.matchRegexp(values, value, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i);
    },
    isUrl: function (values, value) {
        return exports.validations.matchRegexp(values, value, /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i);
    },
    isTrue: function (values, value) {
        return value === true;
    },
    isFalse: function (values, value) {
        return value === false;
    },
    isNumeric: function (values, value) {
        if (typeof value === 'number') {
            return true;
        }
        return exports.validations.matchRegexp(values, value, /^[-+]?(?:\d*[.])?\d+$/);
    },
    isAlpha: function (values, value) {
        return exports.validations.matchRegexp(values, value, /^[A-Z]+$/i);
    },
    isAlphanumeric: function (values, value) {
        return exports.validations.matchRegexp(values, value, /^[0-9A-Z]+$/i);
    },
    isInt: function (values, value) {
        return exports.validations.matchRegexp(values, value, /^(?:[-+]?(?:0|[1-9]\d*))$/);
    },
    isFloat: function (values, value) {
        return exports.validations.matchRegexp(values, value, /^(?:[-+]?(?:\d+))?(?:\.\d*)?(?:[eE][\+\-]?(?:\d+))?$/);
    },
    isWords: function (values, value) {
        return exports.validations.matchRegexp(values, value, /^[A-Z\s]+$/i);
    },
    isSpecialWords: function (values, value) {
        return exports.validations.matchRegexp(values, value, /^[A-Z\s\u00C0-\u017F]+$/i);
    },
    isLength: function (values, value, length) {
        return !isExisty(value) || isEmpty(value) || value.length === length;
    },
    equals: function (values, value, eql) {
        return !isExisty(value) || isEmpty(value) || value == eql;
    },
    equalsField: function (values, value, field) {
        return value == values[field];
    },
    maxLength: function (values, value, length) {
        return !isExisty(value) || value.length <= length;
    },
    minLength: function (values, value, length) {
        return !isExisty(value) || isEmpty(value) || value.length >= length;
    },
    isUrlPath: function (values, value, regexp) {
        return !isExisty(value) || isEmpty(value) || /^[a-z0-9_\\-]+$/i.test(value);
    },
    maximum: function (values, value, maximum) {
        return (!isExisty(value) ||
            isEmpty(value) ||
            (parseFloat(value) || 0) <= (parseFloat(maximum) || 0));
    },
    lt: function (values, value, maximum) {
        return (!isExisty(value) ||
            isEmpty(value) ||
            (parseFloat(value) || 0) < (parseFloat(maximum) || 0));
    },
    minimum: function (values, value, minimum) {
        return (!isExisty(value) ||
            isEmpty(value) ||
            (parseFloat(value) || 0) >= (parseFloat(minimum) || 0));
    },
    gt: function (values, value, minimum) {
        return (!isExisty(value) ||
            isEmpty(value) ||
            (parseFloat(value) || 0) > (parseFloat(minimum) || 0));
    },
    isJson: function (values, value, minimum) {
        if (isExisty(value) && !isEmpty(value) && typeof value === 'string') {
            try {
                JSON.parse(value);
            }
            catch (e) {
                return false;
            }
        }
        return true;
    },
    isPhoneNumber: function (values, value) {
        return (!isExisty(value) || isEmpty(value) || /^[1]([3-9])[0-9]{9}$/.test(value));
    },
    isTelNumber: function (values, value) {
        return (!isExisty(value) ||
            isEmpty(value) ||
            /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(value));
    },
    isZipcode: function (values, value) {
        return (!isExisty(value) || isEmpty(value) || /^[1-9]{1}(\d+){5}$/.test(value));
    },
    isId: function (values, value) {
        return (!isExisty(value) ||
            isEmpty(value) ||
            /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/.test(value));
    },
    notEmptyString: function (values, value) {
        return !isExisty(value) || !(String(value) && String(value).trim() === '');
    },
    matchRegexp1: function (values, value, regexp) {
        return exports.validations.matchRegexp(values, value, regexp);
    },
    matchRegexp2: function (values, value, regexp) {
        return exports.validations.matchRegexp(values, value, regexp);
    },
    matchRegexp3: function (values, value, regexp) {
        return exports.validations.matchRegexp(values, value, regexp);
    },
    matchRegexp4: function (values, value, regexp) {
        return exports.validations.matchRegexp(values, value, regexp);
    },
    matchRegexp5: function (values, value, regexp) {
        return exports.validations.matchRegexp(values, value, regexp);
    },
    matchRegexp6: function (values, value, regexp) {
        return exports.validations.matchRegexp(values, value, regexp);
    },
    matchRegexp7: function (values, value, regexp) {
        return exports.validations.matchRegexp(values, value, regexp);
    },
    matchRegexp8: function (values, value, regexp) {
        return exports.validations.matchRegexp(values, value, regexp);
    },
    matchRegexp9: function (values, value, regexp) {
        return exports.validations.matchRegexp(values, value, regexp);
    }
};
function addRule(ruleName, fn, message) {
    if (message === void 0) { message = ''; }
    exports.validations[ruleName] = fn;
    exports.validateMessages[ruleName] = message;
}
exports.addRule = addRule;
exports.validateMessages = {
    isEmail: 'validate.isEmail',
    isRequired: 'validate.isRequired',
    isUrl: 'validate.isUrl',
    isInt: 'validate.isInt',
    isAlpha: 'validate.isAlpha',
    isNumeric: 'validate.isNumeric',
    isAlphanumeric: 'validate.isAlphanumeric',
    isFloat: 'validate.isFloat',
    isWords: 'validate.isWords',
    isUrlPath: 'validate.isUrlPath',
    matchRegexp: 'validate.matchRegexp',
    minLength: 'validate.minLength',
    maxLength: 'validate.maxLength',
    maximum: 'validate.maximum',
    lt: 'validate.lt',
    minimum: 'validate.minimum',
    gt: 'validate.gt',
    isJson: 'validate.isJson',
    isLength: 'validate.isLength',
    notEmptyString: 'validate.notEmptyString',
    equalsField: 'validate.equalsField',
    equals: 'validate.equals',
    isPhoneNumber: 'validate.isPhoneNumber',
    isTelNumber: 'validate.isTelNumber',
    isZipcode: 'validate.isZipcode',
    isId: 'validate.isId'
};
function validate(value, values, rules, messages, __) {
    if (__ === void 0) { __ = function (str) { return str; }; }
    var errors = [];
    rules &&
        Object.keys(rules).forEach(function (ruleName) {
            if (!rules[ruleName] && rules[ruleName] !== 0) {
                return;
            }
            else if (typeof exports.validations[ruleName] !== 'function') {
                throw new Error('Validation `' + ruleName + '` not exists!');
            }
            var fn = exports.validations[ruleName];
            var args = (Array.isArray(rules[ruleName])
                ? rules[ruleName]
                : [rules[ruleName]]).map(function (item) {
                if (typeof item === 'string' && tpl_builtin_1.isPureVariable(item)) {
                    return tpl_builtin_1.resolveVariableAndFilter(item, values, '|raw');
                }
                return item;
            });
            if (!fn.apply(void 0, tslib_1.__spreadArrays([values, value], args))) {
                errors.push(tpl_1.filter(__((messages && messages[ruleName]) || exports.validateMessages[ruleName]), tslib_1.__assign({}, [''].concat(args))));
            }
        });
    return errors;
}
exports.validate = validate;
function validateObject(values, rules, messages, __) {
    if (__ === void 0) { __ = function (str) { return str; }; }
    var ret = {};
    Object.keys(rules).forEach(function (key) {
        var msgs = validate(values[key], values, rules[key] === true
            ? {
                isRequired: true
            }
            : rules[key], messages, __);
        if (msgs.length) {
            ret[key] = msgs;
        }
    });
    return ret;
}
exports.validateObject = validateObject;
var splitValidations = function (str) {
    var i = 0;
    var placeholder = {};
    return str
        .replace(/matchRegexp\d*\s*\:\s*\/.*?\/[igm]*/g, function (raw) {
        placeholder["__" + i] = raw;
        return "__" + i++;
    })
        .split(/,(?![^{\[]*[}\]])/g)
        .map(function (str) { return (/^__\d+$/.test(str) ? placeholder[str] : str.trim()); });
};
function str2rules(validations) {
    if (typeof validations === 'string') {
        return validations
            ? splitValidations(validations).reduce(function (validations, validation) {
                var idx = validation.indexOf(':');
                var validateMethod = validation;
                var args = [];
                if (~idx) {
                    validateMethod = validation.substring(0, idx);
                    args = /^matchRegexp/.test(validateMethod)
                        ? [validation.substring(idx + 1).trim()]
                        : validation
                            .substring(idx + 1)
                            .split(',')
                            .map(function (arg) {
                            try {
                                return JSON.parse(arg);
                            }
                            catch (e) {
                                return arg;
                            }
                        });
                }
                validations[validateMethod] = args.length ? args : true;
                return validations;
            }, {})
            : {};
    }
    return validations || {};
}
exports.str2rules = str2rules;
//# sourceMappingURL=./utils/validations.js.map
