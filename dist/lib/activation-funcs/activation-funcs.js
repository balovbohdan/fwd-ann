"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var math_funcs_calculus_1 = require("math-funcs-calculus");
exports.Areasinus = {
    func: math_funcs_calculus_1.funcs.Areasinus,
    calc: math_funcs_calculus_1.funcs.Areasinus.calc,
    calcComplexDerivative: function (matrix) {
        var mutator = function (n) { return math_funcs_calculus_1.funcs.Areasinus.calcDerivative(n); };
        return matrix.mutate(mutator);
    },
};
exports.BinaryStep = {
    func: math_funcs_calculus_1.funcs.BinaryStep,
    calc: math_funcs_calculus_1.funcs.BinaryStep.calc,
    calcComplexDerivative: function (matrix) { return matrix.mutate(math_funcs_calculus_1.funcs.BinaryStep.calcDerivative); },
};
exports.ReLU = {
    func: math_funcs_calculus_1.funcs.ReLU,
    calc: math_funcs_calculus_1.funcs.ReLU.calc,
    calcComplexDerivative: function (matrix) { return matrix.mutate(math_funcs_calculus_1.funcs.ReLU.calcDerivative); },
};
exports.Logistic = {
    func: math_funcs_calculus_1.funcs.Logistic,
    calc: math_funcs_calculus_1.funcs.Logistic.calc,
    calcComplexDerivative: function (matrix) {
        var right = matrix.inverseSigns().sum(1);
        return matrix.multiplyTermByTerm(right);
    },
};
exports.HyperbolicTangent = {
    func: math_funcs_calculus_1.funcs.HyperbolicTangent,
    calc: math_funcs_calculus_1.funcs.HyperbolicTangent.calc,
    calcComplexDerivative: function (matrix) {
        var left = matrix.sum(1);
        var right = matrix.inverseSigns().sum(1);
        return left.multiplyTermByTerm(right);
    },
};
exports.UnitLinear = {
    func: math_funcs_calculus_1.funcs.UnitLinear,
    calc: math_funcs_calculus_1.funcs.UnitLinear.calc,
    calcComplexDerivative: function (matrix) { return matrix; },
};
exports.ZeroLinear = {
    func: math_funcs_calculus_1.funcs.ZeroLinear,
    calc: math_funcs_calculus_1.funcs.ZeroLinear.calc,
    calcComplexDerivative: function (matrix) { return matrix; },
};
exports.RationalSigmoid = {
    func: math_funcs_calculus_1.funcs.RationalSigmoid,
    calc: math_funcs_calculus_1.funcs.RationalSigmoid.calc,
    calcComplexDerivative: function (matrix) { return matrix; },
};
