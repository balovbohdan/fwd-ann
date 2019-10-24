"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Signals_1 = require("./Signals");
var math_funcs_calculus_1 = require("math-funcs-calculus");
var Logistic = math_funcs_calculus_1.funcs.Logistic, RationalSigmoid = math_funcs_calculus_1.funcs.RationalSigmoid;
exports.mutator = function (signals, Func) {
    if (Func === void 0) { Func = RationalSigmoid; }
    var signalsData = signals
        .getMatrix()
        .mutate(Func.calc.bind(Func));
    return new Signals_1.Signals(signalsData);
};
exports.logistic = function (signals) {
    return exports.mutator(signals, Logistic);
};
exports.rationalSigmoid = function (signals) {
    return exports.mutator(signals, RationalSigmoid);
};
