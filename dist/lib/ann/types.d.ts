import { Layers } from '../layers';
import { Mutator } from '../signals';
import { LayersWeights } from '../weights/layers-pairs-weights';
import { Res as AnnOutputCalculatorRes } from '../calculators/ann-output/calc-ann-output';
export declare type ComplexOutput = AnnOutputCalculatorRes;
export declare type Params = {
    learningSpeed?: number;
    inputSignals?: {
        offset?: number;
        needOffset?: boolean;
        needNormalize?: boolean;
        normalizer?: Mutator | null;
    };
};
export declare type ParamsPrepared = Params & {
    learningSpeed: number;
    inputSignals: {
        offset: number;
        needOffset: boolean;
        needNormalize: boolean;
        normalizer: Mutator | null;
    };
};
export declare type Data = {
    name?: string;
    layers: Layers;
    id?: string | null;
    layersWeights: LayersWeights;
};
export declare type DataPrepared = Data & {
    name: string;
    id: string | null;
};
