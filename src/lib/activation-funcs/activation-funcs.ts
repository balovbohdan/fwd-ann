import { Matrix } from 'matrix-calculus';
import { funcs } from 'math-funcs-calculus';

import { ActivationFunction } from './types';

export const Areasinus:ActivationFunction = {
    func: funcs.Areasinus,
    calc: funcs.Areasinus.calc,

    calcComplexDerivative: (matrix:Matrix):Matrix => {
        const mutator = n => funcs.Areasinus.calcDerivative(n);

        return matrix.mutate(mutator);
    },
};

export const BinaryStep:ActivationFunction = {
    func: funcs.BinaryStep,
    calc: funcs.BinaryStep.calc,
    calcComplexDerivative: (matrix:Matrix):Matrix => matrix.mutate(funcs.BinaryStep.calcDerivative),
};

export const ReLU:ActivationFunction = {
    func: funcs.ReLU,
    calc: funcs.ReLU.calc,
    calcComplexDerivative: (matrix:Matrix):Matrix => matrix.mutate(funcs.ReLU.calcDerivative),
};

export const Logistic:ActivationFunction = {
    func: funcs.Logistic,
    calc: funcs.Logistic.calc,

    calcComplexDerivative: (matrix:Matrix):Matrix => {
        const right = matrix.inverseSigns().sum(1);

        return matrix.multiplyTermByTerm(right);
    },
};

export const HyperbolicTangent:ActivationFunction = {
    func: funcs.HyperbolicTangent,
    calc: funcs.HyperbolicTangent.calc,

    calcComplexDerivative: (matrix:Matrix):Matrix => {
        const left = matrix.sum(1);
        const right = matrix.inverseSigns().sum(1);

        return left.multiplyTermByTerm(right);
    },
};

export const UnitLinear:ActivationFunction = {
    func: funcs.UnitLinear,
    calc: funcs.UnitLinear.calc,
    calcComplexDerivative: (matrix:Matrix):Matrix => matrix,
};

export const ZeroLinear:ActivationFunction = {
    func: funcs.ZeroLinear,
    calc: funcs.ZeroLinear.calc,
    calcComplexDerivative: (matrix:Matrix):Matrix => matrix,
};

export const RationalSigmoid:ActivationFunction = {
    func: funcs.RationalSigmoid,
    calc: funcs.RationalSigmoid.calc,
    calcComplexDerivative: (matrix:Matrix):Matrix => matrix,
};
