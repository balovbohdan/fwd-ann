import { matrixFactories, Matrix } from 'matrix-calculus';

import normalize from './normalize';
import { Mutator } from './mutators';
import { clone } from '../../utils/object-utils';

const { SingleColMatrixFactory } = matrixFactories;

export class Signals {
    static makeInst(signals:Array<number>, names:Array<string> = []) {
        const signalsMatrix = SingleColMatrixFactory.create(signals);

        return new Signals(signalsMatrix, names);
    }

    constructor(signals:Matrix, names:Array<string> = []) {
        this.signals = signals;
        this.names = names || [];
    }

    getNames():Array<string> {
        return clone(this.names);
    }

    setNames(names:Array<string>) {
        if (names.length !== this.getQty())
            throw new SignalsError('Names and units quantity mismatch.');

        this.names = names;
    }

    get(i:number):number {
        return this.getMatrix().get(i, 0);
    }

    getMatrix():Matrix {
        return this.signals.getClone();
    }

    getQty():number {
        return this.getMatrix().getUnitsQty();
    }

    normalize(mutator?:Mutator|null):Signals {
        return normalize(this, mutator);
    }

    /**
     * Adds offset to the signals.
     * It is needed to prevent zero signals.
     * Zero signals 'kills' ability of the ANN to learn.
     */
    offset(offset:number = .1):Signals {
        const signals = this.getMatrix().sum(offset);

        return new Signals(signals);
    }

    hasTheSameSizeStrict(signals:Signals):Signals|never {
        if (this.hasTheSameSize(signals))
            return this;

        throw new SignalsError('ANN signals have different sizes.');
    }

    hasTheSameSize(signals:Signals):boolean {
        const matrix = signals.getMatrix();

        return this.getMatrix().hasTheSameDimensions(matrix);
    }

    sortByNames():Signals|never {
        const namedSignals:{[key:string]:number} = this.getNamedSignalsData();
        const namesSorted:Array<string> = this.getNames().sort();

        const sortedSignalsData:Array<number> = namesSorted
            .map(name => +namedSignals[name] || 0);

        const sortedSignalsMatrix:Matrix = SingleColMatrixFactory.create(sortedSignalsData);

        return new Signals(sortedSignalsMatrix, namesSorted);
    }

    private getNamedSignalsData():{[key:string]:number}|never {
        if (!this.names || this.names.length <= 0)
            throw new SignalsError('Got invalid signals names.');

        const names:Array<string> = this.getNames();
        const namedSignals:{[key:string]:number} = {};
        const signals:Array<number> = this.getMatrix().getPlainData();

        names.forEach((name, i) => namedSignals[name] = signals[i]);

        return namedSignals;
    }

    private names:Array<string>;

    private readonly signals:Matrix;
}

class SignalsError extends Error {
    constructor(message:string) {
        super(message);

        Object.setPrototypeOf(this, Signals.prototype);
    }
}
