import { Units } from '../units';
import { Data as LayerData } from '../units/create';
export declare type LayersPair = {
    left: Units;
    right: Units;
    index: number;
};
export declare type LayersData = Array<Units>;
export declare type LayersRawData = Readonly<ReadonlyArray<LayerData>>;
