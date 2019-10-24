"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var signals_1 = require("../../signals");
var weightsToSignals = function (data) {
    var signals = data.signals.getMatrix();
    var transposedWeights = data.weights.getMatrix().transpose();
    return new signals_1.Signals(transposedWeights.multiply(signals));
};
exports.default = weightsToSignals;
