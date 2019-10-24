import { Matrix } from 'matrix-calculus';

export class Weights {
    constructor(weights:Matrix) {
        this.weights = weights;
    }

    getMatrix():Matrix {
        return this.weights;
    }

    private readonly weights:Matrix;
}
