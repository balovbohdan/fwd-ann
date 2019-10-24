"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ANN_1 = require("./ANN");
var layers_1 = require("../layers");
var layers_pairs_weights_1 = require("../weights/layers-pairs-weights");
var create_rnd_layers_weights_from_layers_raw_data_1 = require("../weights/layers-pairs-weights/rnd/create-rnd-layers-weights-from-layers-raw-data");
var create = function (data, params) {
    var id = data.id, layersData = data.layersData, rndWeightParams = data.rndWeightParams, layersWeightsData = data.layersWeightsData;
    var layers = layers_1.default(layersData);
    var layersWeights = layersWeightsData
        ? layers_pairs_weights_1.default(layersWeightsData)
        : create_rnd_layers_weights_from_layers_raw_data_1.default({ layersData: layersData, rndWeightParams: rndWeightParams });
    return new ANN_1.ANN({ id: id, layers: layers, layersWeights: layersWeights }, params);
};
exports.default = create;
