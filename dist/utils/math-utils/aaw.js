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
var object_utils_1 = require("../object-utils");
var calc = function (weights, values) {
    var _a = prepareData(weights, values), w = _a.weights, v = _a.values;
    if (w.length === 0)
        throw new AAWError('Got invalid weights.', v, w);
    if (v.length === 0)
        throw new AAWError('Got invalid values.', v, w);
    var divider = w.reduce(function (sum, w) { return sum + w; }, 0);
    var dividend = v.reduce(function (sum, v, i) { return sum + v * w[i]; }, 0);
    var aaw = dividend / divider;
    if (!Number.isFinite(aaw))
        throw new AAWError('Failed to calc "Arithmetic Average Weighted".', v, w);
    return aaw;
};
var prepareData = function (weights, values) {
    var valuesClone = object_utils_1.clone(values);
    var weightsClone = object_utils_1.clone(weights);
    return {
        values: valuesClone,
        weights: valuesClone.map(function (value, i) { return Number.isFinite(weightsClone[i]) ? weightsClone[i] : 1; }),
    };
};
var AAWError = (function (_super) {
    __extends(AAWError, _super);
    function AAWError(message, weights, values) {
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.weights = weights;
        _this.values = values;
        _this.stack = (new Error()).stack;
        return _this;
    }
    return AAWError;
}(Error));
exports.default = calc;
