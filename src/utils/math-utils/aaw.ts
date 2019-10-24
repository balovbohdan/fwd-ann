// 'Arithmetic Average Weighted' calculator.

import { clone } from '../object-utils';

type Data = {
    values:Array<number>;
    weights:Array<number>;
};

const calc = (weights:Array<number>, values:Array<number>) => {
    const { weights: w, values: v } = prepareData(weights, values);

    if (w.length === 0)
        throw new AAWError('Got invalid weights.', v, w);

    if (v.length === 0)
        throw new AAWError('Got invalid values.', v, w);

    const divider = w.reduce((sum, w) => sum + w, 0);
    const dividend = v.reduce((sum, v, i) => sum + v * w[i], 0);

    const aaw = dividend / divider;

    if (!Number.isFinite(aaw))
        throw new AAWError('Failed to calc "Arithmetic Average Weighted".', v, w);

    return aaw;
};

const prepareData = (weights:Array<number>, values:Array<number>):Data => {
    const valuesClone = clone(values);
    const weightsClone = clone(weights);

    return {
        values: valuesClone,
        weights: valuesClone.map((value, i) => Number.isFinite(weightsClone[i]) ? weightsClone[i] : 1),
    };
};

class AAWError extends Error {
    constructor(message:string, weights:Array<number>, values:Array<number>) {
        super(message);

        this.message = message;
        this.weights = weights;
        this.values = values;
        this.stack = (new Error()).stack;
    }

    readonly message:string;
    readonly values:Array<number>;
    readonly weights:Array<number>;
    readonly stack:string|undefined;
}

export default calc;
