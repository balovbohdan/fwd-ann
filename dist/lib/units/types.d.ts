import { Unit } from './Unit';
import { LayerType } from '../layers';
export declare type UnitsData = Array<Unit>;
export declare type UnitsRaw = {
    name?: string;
    type: LayerType;
    units: UnitsData;
};
