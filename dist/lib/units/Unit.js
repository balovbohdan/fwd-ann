"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var random_number_1 = require("../../utils/math-utils/random-number");
var Unit = (function () {
    function Unit(params) {
        this.name = params.name || ('Unit-' + random_number_1.decimal());
        this.ActivationFunction = params.ActivationFunction;
    }
    Unit.prototype.getName = function () {
        return this.name;
    };
    Unit.prototype.getActivationFunction = function () {
        return this.ActivationFunction;
    };
    return Unit;
}());
exports.Unit = Unit;
