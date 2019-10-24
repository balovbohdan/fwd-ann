import { Matrix } from 'matrix-calculus';

import { ANN } from '../../ann';
import { LayersPair } from '../../layers/types';
import calcDeltaWeights from './calc-delta-weights';
import { Signals, SignalsErrors } from '../../signals';
import { Weights } from '../../weights/layers-pair-weights';

type Data = {
    ann:ANN;
    errors:SignalsErrors;
    layersPair:LayersPair;
    layersOutputs:Array<Signals>;
};

const calcUpdatedWeightsData = ({ ann, errors, layersPair, layersOutputs }:Data):Matrix => {
    const layersPairWeights = ann.getLayersWeights().get(layersPair.index);

    if (!layersPairWeights)
        throw new UpdatedWeightsError('Got invalid ANN layers pair weights.');

    const deltaWeights:Matrix|null = calcDeltaWeights({
        ann,
        errors,
        layersPair,
        layersOutputs,
    });

    const oldWeights:Matrix = layersPairWeights.getMatrix();

    return deltaWeights
        ? oldWeights.sum(deltaWeights)
        : oldWeights;
};

const calcUpdatedWeights = async (data:Data):Promise<Weights> => {
   const weightsData = calcUpdatedWeightsData(data);

    return new Weights(weightsData);
};

class UpdatedWeightsError extends Error {
    constructor(message:string) {
        super(message);

        Object.setPrototypeOf(this, UpdatedWeightsError.prototype);
    }
}

export default calcUpdatedWeights;
