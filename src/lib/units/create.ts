import * as T from './types';
import { Unit } from './Unit';
import { Units } from './Units';

import {LayerType} from '../layers';
import { ActivationFunction } from '../activation-funcs';

export type SingleData = {
    qty:number;
    names?:Array<string>;
    ActivationFunction:ActivationFunction;
};

export type Data = {
    name?:string;
    type:LayerType;
    unitsData:Array<SingleData>;
};

const createSingleData = (data:SingleData):T.UnitsData => {
    const units:Array<Unit> = [];
    const names = data.names || [];

    for (let i = 0; i < data.qty; i++) {
        units.push(
            new Unit({
                name: names[i],
                ActivationFunction: data.ActivationFunction,
            })
        );
    }

    return units;
};

const createData = ({ type, name, unitsData }:Data):T.UnitsRaw => {
    const resultData:T.UnitsRaw = {
        name,
        type,
        units: [],
    };

    unitsData.forEach(singleData =>
        resultData.units.push(...createSingleData(singleData))
    );

    return resultData;
};

const create = (data:Data):Units => {
    const unitsData = createData(data);

    return new Units(unitsData);
};

export default create;
