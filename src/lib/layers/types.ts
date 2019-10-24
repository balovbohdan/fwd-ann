import { Units } from '../units';
import { Data as LayerData } from '../units/create';

export type LayersPair = {
    left:Units;
    right:Units;
    index:number;
};

export type LayersData = Array<Units>;
export type LayersRawData = Readonly<ReadonlyArray<LayerData>>;
