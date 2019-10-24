// https://docs.google.com/document/d/1DSlzdK0LM1GqxDPES9GFLvuniNYoJNe5kEUfMS4FWsM

import { Matrix } from 'matrix-calculus';

import { ANN } from '../../ann';
import calcDelta from './calc-delta';
import { LayersPair } from '../../layers/types';
import { Signals, SignalsErrors } from '../../signals';

type Data = {
    ann:ANN;
    layersPair:LayersPair;
    errors:SignalsErrors|null;
    layersOutputs:Array<Signals>;
};

const calcDeltaWeights = (data:Data):Matrix|null => {
    const errors = data.errors || null;
    const { layersPair, layersOutputs } = data;

    if (!errors)
        return null;

    const delta:Matrix = calcDelta({
        errors,
        layersPair,
        output: data.layersOutputs[1],
    });

    const inputLayerOutputTransposed:Matrix = layersOutputs[0]
        .getMatrix()
        .transpose();

    const learningSpeed:number = data.ann.getLearningSpeed();

    return delta
        .multiply(inputLayerOutputTransposed)
        .multiply(-learningSpeed)
        .transpose();
};

export default calcDeltaWeights;
