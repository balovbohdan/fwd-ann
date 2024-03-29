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
var calcTheta = function (_a) {
    var output = _a.output, layersPair = _a.layersPair;
    var ActivationFunc = layersPair.right.getActivationFunction();
    if (!ActivationFunc)
        throw new ThetaError('Got invalid activation function.');
    var matrix = output.getMatrix();
    return ActivationFunc.calcComplexDerivative(matrix);
};
var ThetaError = (function (_super) {
    __extends(ThetaError, _super);
    function ThetaError(message) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, ThetaError.prototype);
        return _this;
    }
    return ThetaError;
}(Error));
exports.default = calcTheta;
