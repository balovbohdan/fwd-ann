import { ANN } from '../../ann';
import { Units } from '../../units';
import { SignalsErrors } from '../../signals';
declare type Data = {
    ann: ANN;
    aimLayer: Units;
    layersPairIndex: number | null;
    nextLayerOutputErrors: SignalsErrors;
};
declare const calcLayerOutputErrors: (data: Data) => SignalsErrors | null;
export default calcLayerOutputErrors;
