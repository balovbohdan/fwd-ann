"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var calc_delta_1 = require("./calc-delta");
var calcDeltaWeights = function (data) {
    var errors = data.errors || null;
    var layersPair = data.layersPair, layersOutputs = data.layersOutputs;
    if (!errors)
        return null;
    var delta = calc_delta_1.default({
        errors: errors,
        layersPair: layersPair,
        output: data.layersOutputs[1],
    });
    var inputLayerOutputTransposed = layersOutputs[0]
        .getMatrix()
        .transpose();
    var learningSpeed = data.ann.getLearningSpeed();
    return delta
        .multiply(inputLayerOutputTransposed)
        .multiply(-learningSpeed)
        .transpose();
};
exports.default = calcDeltaWeights;
