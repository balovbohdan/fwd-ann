import { Unit } from './Unit';
import { LayerType } from '../layers';

export type UnitsData = Array<Unit>;

export type UnitsRaw = {
    name?:string;
    type:LayerType;
    units:UnitsData;
};
