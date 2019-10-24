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
var Layers = (function () {
    function Layers(layers) {
        this.layers = layers;
    }
    Layers.prototype.getOutputLayer = function () {
        var num = this.getQty();
        var lastIndex = num - 1;
        var layer = this.layers[lastIndex];
        if (!layer.isOutput())
            throw new LayersError('Failed to look for ANN output layer.');
        return layer;
    };
    Layers.prototype.getQty = function () {
        return this.layers.length;
    };
    Layers.prototype.getAll = function () {
        return this.layers;
    };
    Layers.prototype.getPairs = function () {
        var layersQty = this.getQty();
        if (layersQty < 2)
            return [];
        var pairs = [];
        for (var i = 1; i < layersQty; i++) {
            var layersPairIndex = i - 1;
            pairs.push({
                right: this.layers[i],
                index: layersPairIndex,
                left: this.layers[layersPairIndex],
            });
        }
        return pairs;
    };
    Layers.prototype.forEach = function (f) {
        this.layers.forEach(f);
    };
    Layers.prototype.forEachPair = function (f) {
        return this.getPairs().forEach(f);
    };
    Layers.prototype.map = function (f) {
        return this.layers.map(f);
    };
    Layers.prototype.mapPairs = function (f) {
        return this.getPairs().map(f);
    };
    return Layers;
}());
exports.Layers = Layers;
var LayersError = (function (_super) {
    __extends(LayersError, _super);
    function LayersError(message) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, LayersError.prototype);
        return _this;
    }
    return LayersError;
}(Error));
