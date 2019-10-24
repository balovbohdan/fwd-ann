// https://docs.google.com/document/d/1DSlzdK0LM1GqxDPES9GFLvuniNYoJNe5kEUfMS4FWsM

import { Matrix } from 'matrix-calculus';

import { Signals } from '../../signals';
import { LayersPair } from '../../layers/types';

type Data = {
    output:Signals;
    layersPair:LayersPair;
};

const calcTheta = ({ output, layersPair }:Data):Matrix => {
    const ActivationFunc = layersPair.right.getActivationFunction();

    if (!ActivationFunc)
        throw new ThetaError('Got invalid activation function.');

    const matrix = output.getMatrix();

    return ActivationFunc.calcComplexDerivative(matrix);
};

class ThetaError extends Error {
    constructor(message:string) {
        super(message);

        Object.setPrototypeOf(this, ThetaError.prototype);
    }
}

export default calcTheta;
