import { Params as Res } from './create-rnd-weights';
import { Data as LayerData } from '../../../units/create';
import { Params as RndWeightParams } from './create-rnd-weight';
declare type Data = {
    leftLayerData: LayerData;
    rightLayerData: LayerData;
    randomWeightParams?: RndWeightParams;
};
declare const createWeightsParams: (data: Data) => Res;
export default createWeightsParams;
