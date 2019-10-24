import * as T from './types';
import { Weights } from '../layers-pair-weights';

export class LayersWeights {
    constructor(layersWeights:T.Data) {
        this.weights = layersWeights;
    }

    get(layersPairIndex:number|null):Weights|null {
        return layersPairIndex === null
            ? null
            : this.weights[layersPairIndex] || null;
    }

    getAllDirty():T.DirtyData {
        return this.weights.map(weights => weights.getMatrix().getData());
    }

    getAll():Array<Weights> {
        return this.weights;
    }

    private readonly weights:T.Data;
}
