import { ANN } from '../../ann';
import { Signals, SignalsErrors } from '../../signals';
import { LayersWeights } from '../../weights/layers-pairs-weights';
declare type Data = {
    ann: ANN;
    input: Signals;
    errors: SignalsErrors | null;
};
declare const calcUpdatedLayersWeights: ({ ann, input, errors }: Data) => Promise<LayersWeights>;
export default calcUpdatedLayersWeights;
