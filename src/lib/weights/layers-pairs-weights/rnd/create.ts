import { LayersWeights } from '../LayersWeights';
import createParams, { Data } from './create-params';
import createRndLayersWeights from './create-rnd-layers-weights';

const create = (data:Data):LayersWeights => {
    const params = createParams(data);

    return createRndLayersWeights(params);
};

export default create;
