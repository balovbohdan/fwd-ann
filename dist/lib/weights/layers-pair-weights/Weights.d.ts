import { Matrix } from 'matrix-calculus';
export declare class Weights {
    constructor(weights: Matrix);
    getMatrix(): Matrix;
    private readonly weights;
}
