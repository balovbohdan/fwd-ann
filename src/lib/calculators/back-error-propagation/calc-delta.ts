// https://docs.google.com/document/d/1DSlzdK0LM1GqxDPES9GFLvuniNYoJNe5kEUfMS4FWsM

import { Matrix } from 'matrix-calculus';

import { T } from '../../layers';
import calcTheta from './calc-theta';
import { Signals, SignalsErrors } from '../../signals';

type Data = {
    output:Signals;
    errors:SignalsErrors;
    layersPair:T.LayersPair;
};

const calcDelta = ({ output, errors, layersPair }:Data) => {
    const errorsMatrix:Matrix = errors.getMatrix();
    const theta:Matrix = calcTheta({ output, layersPair });

    return theta.multiplyTermByTerm(errorsMatrix).multiply(-2);
};

export default calcDelta;
