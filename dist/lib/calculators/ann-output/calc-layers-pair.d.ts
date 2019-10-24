import { ANN } from '../../ann';
import { Signals } from '../../signals';
import { LayersPair } from '../../layers/types';
declare type Data = {
    ann: ANN;
    signals: Signals;
    layersPair: LayersPair;
};
declare type Res = {
    dirtyOutput: Signals;
    layersInputs: Array<Signals>;
    layersOutputs: Array<Signals>;
};
declare const calcLayersPair: ({ ann, signals, layersPair }: Data) => Res;
export default calcLayersPair;
