import {Matrix} from 'matrix-calculus';

import { OutputErrors } from './types';
import { Signals, SignalsErrors } from '../../signals';

type Data = {
    output:Signals;
    idealOutput:Signals;
};

const calcErrorsMatrix = ({ output, idealOutput }:Data):Matrix => {
    const outputMatrix:Matrix = output.getMatrix();

    return idealOutput
        .getMatrix()
        .mutate((unit, row, col) => unit - outputMatrix.get(row || 0, col || 0));
};

const calcErrorsWithTeacher = async ({ output, idealOutput }:Data):Promise<OutputErrors> => {
    output.hasTheSameSizeStrict(idealOutput);

    const errorsMatrix = calcErrorsMatrix({ output, idealOutput });
    const errors = new SignalsErrors(errorsMatrix);

    return { errors };
};

export default calcErrorsWithTeacher;
