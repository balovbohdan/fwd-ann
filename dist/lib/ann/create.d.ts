import { ANN } from './ANN';
import * as T from './types';
import { T as TLayers } from '../layers';
import { T as TLayersPairsWeights } from '../weights/layers-pairs-weights';
import { Params as RndWeightParams } from '../weights/layers-pair-weights/rnd/create-rnd-weight';
declare type Data = {
    id?: string | null;
    layersData: TLayers.LayersRawData;
    rndWeightParams?: RndWeightParams;
    layersWeightsData?: TLayersPairsWeights.DirtyData;
};
declare const create: (data: Data, params?: T.Params | undefined) => ANN;
export default create;
