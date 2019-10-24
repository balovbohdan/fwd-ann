"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var signals_1 = require("../../signals");
var getWeightsShareOfParticipation = function (weights) {
    if (weights === null)
        return null;
    var weightsMatrix = weights.getMatrix();
    var weightsMatrixColsSums = weightsMatrix.reduceCols(function (prev, unit) { return prev + unit; }, 0);
    return weightsMatrix.mutate(function (unit, row, col) {
        return unit / weightsMatrixColsSums[col || 0];
    });
};
var calcLayerOutputErrors = function (data) {
    var ann = data.ann, aimLayer = data.aimLayer, layersPairIndex = data.layersPairIndex, nextLayerOutputErrors = data.nextLayerOutputErrors;
    var weights = ann.getLayersWeights().get(layersPairIndex);
    if (aimLayer.isInput())
        return null;
    if (aimLayer.isOutput())
        return nextLayerOutputErrors;
    var weightsShareOfParticipation = getWeightsShareOfParticipation(weights);
    var errors = nextLayerOutputErrors && weightsShareOfParticipation
        ? weightsShareOfParticipation.multiply(nextLayerOutputErrors.getMatrix())
        : null;
    return errors
        ? new signals_1.SignalsErrors(errors)
        : null;
};
exports.default = calcLayerOutputErrors;
