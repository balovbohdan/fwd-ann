import { T as TLayers } from '../../../layers';
import { LayersWeights } from '../LayersWeights';
import { calcUnitsQtyInRawLayerData } from '../../../units/utils';
import createRndLayersWeights, { Params as BaseParams } from './create-rnd-layers-weights';
import { Params as RndWeightsParams } from '../../layers-pair-weights/rnd/create-rnd-weight';

type Params = {
    layersData:TLayers.LayersRawData;
    rndWeightParams?:RndWeightsParams;
};

const createBaseParams = ({ layersData, rndWeightParams }:Params):BaseParams => {
    const res:BaseParams = [];

    for (let i = 0; i < layersData.length; i++) {
        const leftLayerData = layersData[i];
        const rightLayerData = layersData[i + 1];

        if (!leftLayerData || !rightLayerData)
            continue;

        res.push({
            rndWeightParams,
            leftUnitsQty: calcUnitsQtyInRawLayerData(leftLayerData),
            rightUnitsQty: calcUnitsQtyInRawLayerData(rightLayerData),
        });
    }

    return res;
};

const createRndLayersWeightsFromLayersRawData = (params:Params):LayersWeights => {
    const baseParams = createBaseParams(params);

    return createRndLayersWeights(baseParams);
};

export default createRndLayersWeightsFromLayersRawData;
