import { Matrix } from 'matrix-calculus';
import { Mutator } from './mutators';
export declare class Signals {
    static makeInst(signals: Array<number>, names?: Array<string>): Signals;
    constructor(signals: Matrix, names?: Array<string>);
    getNames(): Array<string>;
    setNames(names: Array<string>): void;
    get(i: number): number;
    getMatrix(): Matrix;
    getQty(): number;
    normalize(mutator?: Mutator | null): Signals;
    offset(offset?: number): Signals;
    hasTheSameSizeStrict(signals: Signals): Signals | never;
    hasTheSameSize(signals: Signals): boolean;
    sortByNames(): Signals | never;
    private getNamedSignalsData;
    private names;
    private readonly signals;
}
