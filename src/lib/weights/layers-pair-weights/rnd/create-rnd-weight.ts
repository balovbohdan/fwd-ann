import { assignDeep } from '../../../../utils/object-utils';
import { floating } from '../../../../utils/math-utils/random-number';

export type Params = {
    min?:number;
    max?:number;
    leftUnitsQty?:number;
    rightUnitsQty?:number;
    exclude?:Array<number>;
};

type ParamsPrepared = {
    min:number;
    max:number;
    exclude?:Array<number>;
};

const defParams:Params = {
    min: -1,
    max: 1,
    exclude: [0],
    leftUnitsQty: 0,
    rightUnitsQty: 0,
};

const prepareParams = (params:Params = {}):ParamsPrepared => {
    params = assignDeep(defParams, params);

    if (params.leftUnitsQty) {
        const limit:number = 1 / Math.sqrt(params.leftUnitsQty);

        params.max = limit;
        params.min = -limit;
    }

    const preparedParams:{min:number, max:number, exclude?:Array<number>} = {
        min: params.min || 0,
        max: params.max || 0,
    };

    if (params.exclude)
        preparedParams.exclude = params.exclude;

    return preparedParams;
};

const createRndWeight = (params:Params) => {
    const paramsPrepared = prepareParams(params);

    return floating(paramsPrepared);
};

export default createRndWeight;
