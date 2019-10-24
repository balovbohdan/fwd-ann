"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SignalsErrors = (function () {
    function SignalsErrors(errors) {
        this.errors = errors;
    }
    SignalsErrors.prototype.getMatrix = function () {
        return this.errors;
    };
    SignalsErrors.prototype.getSum = function () {
        return this.errors.getUnitsSum();
    };
    return SignalsErrors;
}());
exports.SignalsErrors = SignalsErrors;
