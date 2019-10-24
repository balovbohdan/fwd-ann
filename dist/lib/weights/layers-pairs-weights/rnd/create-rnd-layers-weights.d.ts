import { LayersWeights } from '../LayersWeights';
import { Params as RndWeightsParams } from '../../layers-pair-weights/rnd/create-rnd-weights';
export declare type Params = Array<RndWeightsParams>;
declare const createRndLayersWeights: (params: RndWeightsParams[]) => LayersWeights;
export default createRndLayersWeights;
