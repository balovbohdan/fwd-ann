"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var weights_to_signals_1 = require("./weights-to-signals");
var calcLayersPair = function (_a) {
    var ann = _a.ann, signals = _a.signals, layersPair = _a.layersPair;
    var weights = ann.getLayersWeights().get(layersPair.index);
    var activatedInput = layersPair.left.activateSignals(signals);
    if (!weights)
        throw new LayersPairCalculatorError('Got invalid ANN layers weights.');
    var layersPairDirtyOutput = weights_to_signals_1.default({
        weights: weights,
        signals: activatedInput,
    });
    var activatedOutput = layersPair.right.activateSignals(layersPairDirtyOutput);
    return {
        dirtyOutput: layersPairDirtyOutput,
        layersInputs: [signals, layersPairDirtyOutput],
        layersOutputs: [activatedInput, activatedOutput],
    };
};
var LayersPairCalculatorError = (function (_super) {
    __extends(LayersPairCalculatorError, _super);
    function LayersPairCalculatorError(message) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, LayersPairCalculatorError.prototype);
        return _this;
    }
    return LayersPairCalculatorError;
}(Error));
exports.default = calcLayersPair;
