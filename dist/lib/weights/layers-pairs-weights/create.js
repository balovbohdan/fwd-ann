"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var matrix_calculus_1 = require("matrix-calculus");
var LayersWeights_1 = require("./LayersWeights");
var layers_pair_weights_1 = require("../layers-pair-weights");
var create = function (data) {
    var weights = createWeights(data);
    return new LayersWeights_1.LayersWeights(weights);
};
var createWeights = function (data) {
    return data.map(function (item) { return new layers_pair_weights_1.Weights(new matrix_calculus_1.Matrix(item)); });
};
exports.default = create;
