import * as T from './types';
import { Units } from '../units';
export declare class Layers {
    constructor(layers: T.LayersData);
    getOutputLayer(): Units | never;
    getQty(): number;
    getAll(): T.LayersData;
    getPairs(): Array<T.LayersPair>;
    forEach(f: (layer: Units, i?: number, arr?: T.LayersData) => void): void;
    forEachPair(f: (layersPair: T.LayersPair) => void): void;
    map(f: (layer: Units, i?: number, arr?: T.LayersData) => any): Array<any>;
    mapPairs(f: (layersPair: T.LayersPair) => any): Array<any>;
    private readonly layers;
}
