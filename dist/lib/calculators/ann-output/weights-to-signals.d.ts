import { Signals } from '../../signals';
import { Weights } from '../../weights/layers-pair-weights';
declare type Data = {
    weights: Weights;
    signals: Signals;
};
declare const weightsToSignals: (data: Data) => Signals;
export default weightsToSignals;
