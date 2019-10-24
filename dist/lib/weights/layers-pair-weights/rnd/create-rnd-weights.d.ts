import { Weights } from '../Weights';
import { Params as RndWeightParams } from './create-rnd-weight';
export declare type Params = {
    leftUnitsQty: number;
    rightUnitsQty: number;
    rndWeightParams?: RndWeightParams;
};
declare const createRndWeights: (params: Params) => Weights | null;
export default createRndWeights;
