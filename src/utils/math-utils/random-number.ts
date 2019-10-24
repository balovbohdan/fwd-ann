import { assignDeep } from '../object-utils';
import * as capacityUtils from './number-capacity';

type ValidParams = {
    exclude?:Array<number>;
};

type FloatingParams = {
    min?:number;
    max?:number;
    exclude?:Array<number>;
};

type DecimalParameterizedParams = {
    min?:number;
    max?:number;
    exclude?:Array<number>;
};

type GetMaxSafeIntegerParams = {
    min:number;
    max:number;
};

export const decimal = ():number =>
    Math.abs(Math.random() * Date.now() >> 0);

export const sign = () =>
    Math.random() < .5 ? -1 : 1;

// https://learn.javascript.ru/task/random-int-min-max
export const decimalWithParams = (params:DecimalParameterizedParams = {}):number => {
    const {min, max, exclude} = assignDeep({ min: 0, max: 1 }, params);

    const n = Math.floor(min + Math.random() * (max + 1 - min));

    return valid(n, { exclude })
        ? n
        : floating(params);
};

export const floating = (params?:FloatingParams):number => {
    const {min, max, exclude} = assignDeep({ min: .001, max: 1 }, params || {});

    const base = getMaxSafeInteger({ min, max });
    let n = decimalWithParams({ min: min * base, max: max * base }) / base;

    return valid(n, { exclude })
        ? n
        : floating(params);
};

const valid = (n:number, params?:ValidParams):boolean =>
    params
        ? !(params.exclude && params.exclude.includes(n))
        : true;

const getMaxSafeInteger = (params:GetMaxSafeIntegerParams):number =>
    Math.min(
        Number.MAX_SAFE_INTEGER - capacityUtils.getBaseCapacityNumber(params.min),
        Number.MAX_SAFE_INTEGER - capacityUtils.getBaseCapacityNumber(params.max)
    );
