import { Matrix } from 'matrix-calculus';
import { T } from '../../layers';
import { Signals, SignalsErrors } from '../../signals';
declare type Data = {
    output: Signals;
    errors: SignalsErrors;
    layersPair: T.LayersPair;
};
declare const calcDelta: ({ output, errors, layersPair }: Data) => Matrix;
export default calcDelta;
