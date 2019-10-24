import { Matrix } from 'matrix-calculus';
import { ANN } from '../../ann';
import { LayersPair } from '../../layers/types';
import { Signals, SignalsErrors } from '../../signals';
declare type Data = {
    ann: ANN;
    layersPair: LayersPair;
    errors: SignalsErrors | null;
    layersOutputs: Array<Signals>;
};
declare const calcDeltaWeights: (data: Data) => Matrix | null;
export default calcDeltaWeights;
