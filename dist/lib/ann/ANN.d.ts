import * as T from './types';
import { Layers } from '../layers';
import { Signals } from '../signals';
import { LayersWeights } from '../weights/layers-pairs-weights';
export declare class ANN {
    constructor(data: T.Data, params?: T.Params);
    getId(): string | null;
    setId(id: string): void;
    getLayers(): Layers;
    getLayersWeights(): LayersWeights;
    setLayersWeights(layersWeights: LayersWeights): ANN;
    getLearningSpeed(): number;
    calcOutput(input: Signals): Promise<Signals>;
    calcComplexOutput(input: Signals): Promise<T.ComplexOutput>;
    private prepareInputSignals;
    private static prepareData;
    private id;
    private layersWeights;
    private readonly name;
    private readonly layers;
    private readonly params;
}
