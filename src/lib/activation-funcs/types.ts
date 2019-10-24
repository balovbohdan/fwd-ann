import { Matrix } from 'matrix-calculus';

export type ActivationFunction = {
    func:Func;
    calc:(n:number)=>number;
    calcComplexDerivative:(matrix:Matrix)=>Matrix;
};

type Func = {
    calc: (n:number)=>number;
};
