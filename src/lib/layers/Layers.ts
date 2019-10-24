import * as T from './types';
import { Units } from '../units';

export class Layers {
    constructor(layers:T.LayersData) {
        this.layers = layers;
    }

    getOutputLayer():Units|never {
        const num = this.getQty();
        const lastIndex = num - 1;
        const layer = this.layers[lastIndex];

        if (!layer.isOutput())
            throw new LayersError('Failed to look for ANN output layer.');

        return layer;
    }

    getQty():number {
        return this.layers.length;
    }

    getAll():T.LayersData {
        return this.layers;
    }

    getPairs():Array<T.LayersPair> {
        const layersQty = this.getQty();

        if (layersQty < 2) return [];

        const pairs:Array<{left:Units, right:Units, index:number}> = [];

        for (let i = 1; i < layersQty; i++) {
            const layersPairIndex:number = i - 1;

            pairs.push({
                right: this.layers[i],
                index: layersPairIndex,
                left: this.layers[layersPairIndex],
            });
        }

        return pairs;
    }

    forEach(f:(layer:Units, i?:number, arr?:T.LayersData)=>void):void {
        this.layers.forEach(f);
    }

    forEachPair(f:(layersPair:T.LayersPair)=>void):void {
        return this.getPairs().forEach(f);
    }

    map(f:(layer:Units, i?:number, arr?:T.LayersData)=>any):Array<any> {
        return this.layers.map(f);
    }

    mapPairs(f:(layersPair:T.LayersPair)=>any):Array<any> {
        return this.getPairs().map(f);
    }

    private readonly layers:T.LayersData;
}

class LayersError extends Error {
    constructor(message:string) {
        super(message);

        Object.setPrototypeOf(this, LayersError.prototype);
    }
}
