import { Matrix } from 'matrix-calculus';

export class SignalsErrors {
    constructor(errors:Matrix) {
        this.errors = errors;
    }

    getMatrix():Matrix {
        return this.errors;
    }

    getSum():number {
        return this.errors.getUnitsSum();
    }

    private readonly errors:Matrix;
}
