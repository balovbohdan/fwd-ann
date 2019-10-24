"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Weights = (function () {
    function Weights(weights) {
        this.weights = weights;
    }
    Weights.prototype.getMatrix = function () {
        return this.weights;
    };
    return Weights;
}());
exports.Weights = Weights;
