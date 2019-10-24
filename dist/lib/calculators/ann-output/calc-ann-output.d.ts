import { ANN } from '../../ann';
import { Signals } from '../../signals';
export declare type Res = {
    output: Signals;
    layersInputs: Array<Signals>;
    layersOutputs: Array<Signals>;
};
declare type Data = {
    ann: ANN;
    signals: Signals;
};
declare const calcAnnOutput: ({ ann, signals }: Data) => Promise<Res>;
export default calcAnnOutput;
