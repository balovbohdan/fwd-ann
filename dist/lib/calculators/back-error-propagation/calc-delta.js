"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var calc_theta_1 = require("./calc-theta");
var calcDelta = function (_a) {
    var output = _a.output, errors = _a.errors, layersPair = _a.layersPair;
    var errorsMatrix = errors.getMatrix();
    var theta = calc_theta_1.default({ output: output, layersPair: layersPair });
    return theta.multiplyTermByTerm(errorsMatrix).multiply(-2);
};
exports.default = calcDelta;
