import { Matrix } from 'matrix-calculus';
export declare type ActivationFunction = {
    func: Func;
    calc: (n: number) => number;
    calcComplexDerivative: (matrix: Matrix) => Matrix;
};
declare type Func = {
    calc: (n: number) => number;
};
export {};
