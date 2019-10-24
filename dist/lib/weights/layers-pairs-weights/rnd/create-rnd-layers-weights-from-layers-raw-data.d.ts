import { T as TLayers } from '../../../layers';
import { LayersWeights } from '../LayersWeights';
import { Params as RndWeightsParams } from '../../layers-pair-weights/rnd/create-rnd-weight';
declare type Params = {
    layersData: TLayers.LayersRawData;
    rndWeightParams?: RndWeightsParams;
};
declare const createRndLayersWeightsFromLayersRawData: (params: Params) => LayersWeights;
export default createRndLayersWeightsFromLayersRawData;
