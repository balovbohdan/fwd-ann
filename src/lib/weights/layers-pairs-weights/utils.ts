import { Matrix } from 'matrix-calculus';

import { LayersWeights } from './LayersWeights';
import { Weights } from '../layers-pair-weights';

export const isIdentical = async (left:LayersWeights, right:LayersWeights):Promise<boolean> => {
    const leftStr = JSON.stringify(left.getAllDirty());
    const rightStr = JSON.stringify(right.getAllDirty());

    return leftStr === rightStr;
};

export const hasTheSameSizeStrict = (left:LayersWeights, right:LayersWeights):boolean|never => {
    if (hasTheSameSize(left, right))
        return true;

    throw new LayersWeightsError('ANN layers weights datasets has different sizes.');
};

export const hasTheSameSize = (left:LayersWeights, right:LayersWeights) => {
    const leftWeights:Array<Weights> = left.getAll();
    const rightWeights:Array<Weights> = right.getAll();

    const leftWeightsQty:number = leftWeights.length;

    if (leftWeightsQty !== rightWeights.length)
        return false;

    for (let i = 0; i < leftWeightsQty; i++) {
        const matrix:Matrix = leftWeights[i].getMatrix();
        const rightMatrix:Matrix = rightWeights[i].getMatrix();

        if (!matrix.hasTheSameDimensions(rightMatrix))
            return false;
    }

    return true;
};

class LayersWeightsError extends Error {
    constructor(message:string) {
        super(message);

        Object.setPrototypeOf(this, LayersWeightsError.prototype);
    }
}
