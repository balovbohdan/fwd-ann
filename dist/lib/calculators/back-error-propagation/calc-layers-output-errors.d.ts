import { ANN } from '../../ann';
import { SignalsErrors } from '../../signals';
export declare type Res = Array<SignalsErrors> | null;
declare type Data = {
    ann: ANN;
    outputErrors: SignalsErrors | null;
};
declare const calcLayersOutputErrors: ({ ann, outputErrors }: Data) => Promise<Res>;
export default calcLayersOutputErrors;
