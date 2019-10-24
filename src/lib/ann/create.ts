import { ANN } from './ANN';
import * as T from './types';
import createLayers, { T as TLayers } from '../layers';
import createLayersPairsWeights from '../weights/layers-pairs-weights';
import { T as TLayersPairsWeights } from '../weights/layers-pairs-weights';
import { Params as RndWeightParams } from '../weights/layers-pair-weights/rnd/create-rnd-weight';
import createRndLayersWeightsFromLayersRawData from '../weights/layers-pairs-weights/rnd/create-rnd-layers-weights-from-layers-raw-data';

type Data = {
    id?:string|null;
    layersData:TLayers.LayersRawData;
    rndWeightParams?:RndWeightParams;
    layersWeightsData?:TLayersPairsWeights.DirtyData;
};

const create = (data:Data, params?:T.Params):ANN => {
    const { id, layersData, rndWeightParams, layersWeightsData } = data;
    const layers = createLayers(layersData);

    const layersWeights = layersWeightsData
        ? createLayersPairsWeights(layersWeightsData)
        : createRndLayersWeightsFromLayersRawData({ layersData, rndWeightParams });

    return new ANN({ id, layers, layersWeights }, params);
};

export default create;
