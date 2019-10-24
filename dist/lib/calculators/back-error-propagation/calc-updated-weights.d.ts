import { ANN } from '../../ann';
import { LayersPair } from '../../layers/types';
import { Signals, SignalsErrors } from '../../signals';
import { Weights } from '../../weights/layers-pair-weights';
declare type Data = {
    ann: ANN;
    errors: SignalsErrors;
    layersPair: LayersPair;
    layersOutputs: Array<Signals>;
};
declare const calcUpdatedWeights: (data: Data) => Promise<Weights>;
export default calcUpdatedWeights;
