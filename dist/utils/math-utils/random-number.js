"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var object_utils_1 = require("../object-utils");
var capacityUtils = require("./number-capacity");
exports.decimal = function () {
    return Math.abs(Math.random() * Date.now() >> 0);
};
exports.sign = function () {
    return Math.random() < .5 ? -1 : 1;
};
exports.decimalWithParams = function (params) {
    if (params === void 0) { params = {}; }
    var _a = object_utils_1.assignDeep({ min: 0, max: 1 }, params), min = _a.min, max = _a.max, exclude = _a.exclude;
    var n = Math.floor(min + Math.random() * (max + 1 - min));
    return valid(n, { exclude: exclude })
        ? n
        : exports.floating(params);
};
exports.floating = function (params) {
    var _a = object_utils_1.assignDeep({ min: .001, max: 1 }, params || {}), min = _a.min, max = _a.max, exclude = _a.exclude;
    var base = getMaxSafeInteger({ min: min, max: max });
    var n = exports.decimalWithParams({ min: min * base, max: max * base }) / base;
    return valid(n, { exclude: exclude })
        ? n
        : exports.floating(params);
};
var valid = function (n, params) {
    return params
        ? !(params.exclude && params.exclude.includes(n))
        : true;
};
var getMaxSafeInteger = function (params) {
    return Math.min(Number.MAX_SAFE_INTEGER - capacityUtils.getBaseCapacityNumber(params.min), Number.MAX_SAFE_INTEGER - capacityUtils.getBaseCapacityNumber(params.max));
};
