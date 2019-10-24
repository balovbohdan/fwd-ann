import { Params as RandomWeightParam } from '../../layers-pair-weights/rnd/create-rnd-weight';
import { LayersRawData } from '../../../layers/types';
export declare type Data = {
    layersData: LayersRawData;
    randomWeightParams?: Array<RandomWeightParam>;
};
declare const createParams: (data: Data) => import("../../layers-pair-weights/rnd/create-rnd-weights").Params[];
export default createParams;
