import { Matrix } from 'matrix-calculus';

import { DirtyData } from './types';
import { LayersWeights } from './LayersWeights';
import { Weights } from '../layers-pair-weights';

const create = (data:DirtyData):LayersWeights => {
    const weights = createWeights(data);

    return new LayersWeights(weights);
};

const createWeights = (data:DirtyData):Array<Weights> =>
    data.map(item => new Weights(new Matrix(item)));

export default create;
