"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var object_utils_1 = require("../../../../utils/object-utils");
var random_number_1 = require("../../../../utils/math-utils/random-number");
var defParams = {
    min: -1,
    max: 1,
    exclude: [0],
    leftUnitsQty: 0,
    rightUnitsQty: 0,
};
var prepareParams = function (params) {
    if (params === void 0) { params = {}; }
    params = object_utils_1.assignDeep(defParams, params);
    if (params.leftUnitsQty) {
        var limit = 1 / Math.sqrt(params.leftUnitsQty);
        params.max = limit;
        params.min = -limit;
    }
    var preparedParams = {
        min: params.min || 0,
        max: params.max || 0,
    };
    if (params.exclude)
        preparedParams.exclude = params.exclude;
    return preparedParams;
};
var createRndWeight = function (params) {
    var paramsPrepared = prepareParams(params);
    return random_number_1.floating(paramsPrepared);
};
exports.default = createRndWeight;
