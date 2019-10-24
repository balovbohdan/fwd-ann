"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LayersWeights_1 = require("../LayersWeights");
var create_rnd_weights_1 = require("../../layers-pair-weights/rnd/create-rnd-weights");
var createRndLayersWeightsData = function (params) {
    var weightsCollection = [];
    for (var _i = 0, params_1 = params; _i < params_1.length; _i++) {
        var paramsPart = params_1[_i];
        var weights = create_rnd_weights_1.default(paramsPart);
        if (weights === null)
            continue;
        weightsCollection.push(weights);
    }
    return weightsCollection;
};
var createRndLayersWeights = function (params) {
    var data = createRndLayersWeightsData(params);
    return new LayersWeights_1.LayersWeights(data);
};
exports.default = createRndLayersWeights;
