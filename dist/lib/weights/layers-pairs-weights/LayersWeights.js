"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LayersWeights = (function () {
    function LayersWeights(layersWeights) {
        this.weights = layersWeights;
    }
    LayersWeights.prototype.get = function (layersPairIndex) {
        return layersPairIndex === null
            ? null
            : this.weights[layersPairIndex] || null;
    };
    LayersWeights.prototype.getAllDirty = function () {
        return this.weights.map(function (weights) { return weights.getMatrix().getData(); });
    };
    LayersWeights.prototype.getAll = function () {
        return this.weights;
    };
    return LayersWeights;
}());
exports.LayersWeights = LayersWeights;
