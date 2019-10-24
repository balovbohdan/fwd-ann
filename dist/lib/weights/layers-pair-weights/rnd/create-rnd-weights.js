"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var matrix_calculus_1 = require("matrix-calculus");
var Weights_1 = require("../Weights");
var create_rnd_weight_1 = require("./create-rnd-weight");
var createRndWeights = function (params) {
    try {
        var weights = createWeightsMatrix(params);
        return new Weights_1.Weights(weights);
    }
    catch (e) {
        console.warn(e);
        return null;
    }
};
var createWeightsMatrix = function (_a) {
    var leftUnitsQty = _a.leftUnitsQty, rightUnitsQty = _a.rightUnitsQty, _b = _a.rndWeightParams, rndWeightParams = _b === void 0 ? {} : _b;
    var rowsQty = leftUnitsQty;
    var colsQty = rightUnitsQty;
    var matrixData = [];
    if (rowsQty <= 0 || colsQty <= 0)
        return new matrix_calculus_1.Matrix([]);
    for (var row = 0; row < rowsQty; row++) {
        matrixData[row] = [];
        for (var col = 0; col < colsQty; col++)
            matrixData[row][col] = create_rnd_weight_1.default(rndWeightParams);
    }
    return new matrix_calculus_1.Matrix(matrixData);
};
exports.default = createRndWeights;
