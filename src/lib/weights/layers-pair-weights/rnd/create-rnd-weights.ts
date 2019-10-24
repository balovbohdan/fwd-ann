import { Matrix, Data as MatrixData } from 'matrix-calculus';

import { Weights } from '../Weights';
import createRndWeight, { Params as RndWeightParams } from './create-rnd-weight';

export type Params = {
    leftUnitsQty:number;
    rightUnitsQty:number;
    rndWeightParams?:RndWeightParams;
};

const createRndWeights = (params:Params):Weights|null => {
    try {
        const weights = createWeightsMatrix(params);

        return new Weights(weights);
    } catch (e) {
        console.warn(e);

        return null;
    }
};

const createWeightsMatrix = ({ leftUnitsQty, rightUnitsQty, rndWeightParams = {} }:Params):Matrix => {
    const rowsQty = leftUnitsQty;
    const colsQty = rightUnitsQty;
    const matrixData:MatrixData = [];

    if (rowsQty <= 0 || colsQty <= 0)
        return new Matrix([]);

    for (let row = 0; row < rowsQty; row++) {
        matrixData[row] = [];

        for (let col = 0; col < colsQty; col++)
            matrixData[row][col] = createRndWeight(rndWeightParams);
    }

    return new Matrix(matrixData);
};

export default createRndWeights;
