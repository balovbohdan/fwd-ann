import { Matrix } from 'matrix-calculus';
import { Signals } from '../../signals';
import { LayersPair } from '../../layers/types';
declare type Data = {
    output: Signals;
    layersPair: LayersPair;
};
declare const calcTheta: ({ output, layersPair }: Data) => Matrix;
export default calcTheta;
