import { Params as Res } from './create-rnd-layers-weights';
import createWeightsParams from '../../layers-pair-weights/rnd/create-weights-params';
import { Params as RandomWeightParam } from '../../layers-pair-weights/rnd/create-rnd-weight';

import { LayersRawData } from '../../../layers/types';

export type Data = {
    layersData:LayersRawData;
    randomWeightParams?:Array<RandomWeightParam>;
};

const createParams = (data:Data):Res => {
    const response:Res = [];
    const { layersData } = data;
    const layersQty = layersData.length;
    const randomWeightParams = data.randomWeightParams || [];

    for (let i = 1; i < layersQty; i++) {
        const layersSequenceIndex = i - 1;

        response.push(
            createWeightsParams({
                rightLayerData: layersData[i],
                leftLayerData: layersData[layersSequenceIndex],
                randomWeightParams: randomWeightParams[layersSequenceIndex] || null,
            })
        );
    }

    return response;
};

export default createParams;
