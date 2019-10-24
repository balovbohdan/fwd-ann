import { Units } from './Units';
import { LayerType } from '../layers';
import { ActivationFunction } from '../activation-funcs';
export declare type SingleData = {
    num: number;
    names?: Array<string>;
    ActivationFunction: ActivationFunction;
};
export declare type Data = {
    name?: string;
    type: LayerType;
    unitsData: Array<SingleData>;
};
declare const create: (data: Data) => Units;
export default create;
