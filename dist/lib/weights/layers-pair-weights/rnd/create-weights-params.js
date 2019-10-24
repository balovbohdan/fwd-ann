"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var object_utils_1 = require("../../../../utils/object-utils");
var calcUnitsQty = function (data) {
    return data.unitsData.reduce(function (sum, item) { return sum + item.num; }, 0);
};
var prepareRndWeightParams = function (leftUnitsQty, params) {
    if (params === void 0) { params = {}; }
    return object_utils_1.assignDeep(params, { leftUnitsQty: leftUnitsQty });
};
var createWeightsParams = function (data) { return ({
    leftUnitsQty: calcUnitsQty(data.leftLayerData),
    rightUnitsQty: calcUnitsQty(data.rightLayerData),
    rndWeightParams: prepareRndWeightParams(data.randomWeightParams),
}); };
exports.default = createWeightsParams;
