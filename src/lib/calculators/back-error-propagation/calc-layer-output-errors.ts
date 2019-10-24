import { Matrix } from 'matrix-calculus';

import { ANN } from '../../ann';
import { Units } from '../../units';
import { SignalsErrors } from '../../signals';
import { Weights } from '../../weights/layers-pair-weights';

type Data = {
    ann:ANN;
    aimLayer:Units;
    layersPairIndex:number|null;
    nextLayerOutputErrors:SignalsErrors;
};

const getWeightsShareOfParticipation = (weights:Weights|null):Matrix|null => {
    if (weights === null)
        return null;

    const weightsMatrix:Matrix = weights.getMatrix();
    const weightsMatrixColsSums:Array<number> = weightsMatrix.reduceCols((prev, unit) => prev + unit, 0);

    return weightsMatrix.mutate((unit:number, row?:number, col?:number) =>
        unit / weightsMatrixColsSums[col || 0]
    );
};

const calcLayerOutputErrors = (data:Data):SignalsErrors|never|null => {
    const { ann, aimLayer, layersPairIndex, nextLayerOutputErrors } = data;
    const weights = ann.getLayersWeights().get(layersPairIndex);

    if (aimLayer.isInput())
        return null;

    if (aimLayer.isOutput())
        return nextLayerOutputErrors;

    const weightsShareOfParticipation:Matrix|null = getWeightsShareOfParticipation(weights);

    const errors:Matrix|null = nextLayerOutputErrors && weightsShareOfParticipation
        ? weightsShareOfParticipation.multiply(nextLayerOutputErrors.getMatrix())
        : null;

    return errors
        ? new SignalsErrors(errors)
        : null;
};

export default calcLayerOutputErrors;
