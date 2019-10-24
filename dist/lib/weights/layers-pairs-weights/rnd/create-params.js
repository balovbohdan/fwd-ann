"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var create_weights_params_1 = require("../../layers-pair-weights/rnd/create-weights-params");
var createParams = function (data) {
    var response = [];
    var layersData = data.layersData;
    var layersQty = layersData.length;
    var randomWeightParams = data.randomWeightParams || [];
    for (var i = 1; i < layersQty; i++) {
        var layersSequenceIndex = i - 1;
        response.push(create_weights_params_1.default({
            rightLayerData: layersData[i],
            leftLayerData: layersData[layersSequenceIndex],
            randomWeightParams: randomWeightParams[layersSequenceIndex] || null,
        }));
    }
    return response;
};
exports.default = createParams;
