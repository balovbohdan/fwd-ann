import { Matrix } from 'matrix-calculus';
export declare class SignalsErrors {
    constructor(errors: Matrix);
    getMatrix(): Matrix;
    getSum(): number;
    private readonly errors;
}
