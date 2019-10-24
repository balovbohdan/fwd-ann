import * as T from './types';
import { Weights } from '../layers-pair-weights';
export declare class LayersWeights {
    constructor(layersWeights: T.Data);
    get(layersPairIndex: number | null): Weights | null;
    getAllDirty(): T.DirtyData;
    getAll(): Array<Weights>;
    private readonly weights;
}
