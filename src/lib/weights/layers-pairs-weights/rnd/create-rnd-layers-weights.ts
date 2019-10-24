import { LayersWeights } from '../LayersWeights';
import { Weights } from '../../layers-pair-weights';
import createRndWeights, { Params as RndWeightsParams } from '../../layers-pair-weights/rnd/create-rnd-weights';

export type Params = Array<RndWeightsParams>;

const createRndLayersWeightsData = (params:Params):Array<Weights> => {
    const weightsCollection:Array<Weights> = [];

    for (let paramsPart of params) {
        const weights:Weights|null = createRndWeights(paramsPart);

        if (weights === null) continue;

        weightsCollection.push(weights);
    }

    return weightsCollection;
};

const createRndLayersWeights = (params:Params) => {
    const data = createRndLayersWeightsData(params);

    return new LayersWeights(data);
};

export default createRndLayersWeights;
