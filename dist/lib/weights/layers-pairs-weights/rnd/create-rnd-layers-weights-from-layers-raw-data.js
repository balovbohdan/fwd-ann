"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../../units/utils");
var create_rnd_layers_weights_1 = require("./create-rnd-layers-weights");
var createBaseParams = function (_a) {
    var layersData = _a.layersData, rndWeightParams = _a.rndWeightParams;
    var res = [];
    for (var i = 0; i < layersData.length; i++) {
        var leftLayerData = layersData[i];
        var rightLayerData = layersData[i + 1];
        if (!leftLayerData || !rightLayerData)
            continue;
        res.push({
            rndWeightParams: rndWeightParams,
            leftUnitsQty: utils_1.calcUnitsQtyInRawLayerData(leftLayerData),
            rightUnitsQty: utils_1.calcUnitsQtyInRawLayerData(rightLayerData),
        });
    }
    return res;
};
var createRndLayersWeightsFromLayersRawData = function (params) {
    var baseParams = createBaseParams(params);
    return create_rnd_layers_weights_1.default(baseParams);
};
exports.default = createRndLayersWeightsFromLayersRawData;
