import { Matrix } from 'matrix-calculus';

import { Signals } from '../../signals';
import { Weights } from '../../weights/layers-pair-weights';

type Data = {
    weights:Weights;
    signals:Signals;
};

const weightsToSignals = (data:Data):Signals => {
    const signals:Matrix = data.signals.getMatrix();
    const transposedWeights:Matrix = data.weights.getMatrix().transpose();

    return new Signals(transposedWeights.multiply(signals));
};

export default weightsToSignals;
