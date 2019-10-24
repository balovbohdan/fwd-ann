import { Layers } from '../layers';
import { Mutator } from '../signals';
import { LayersWeights } from '../weights/layers-pairs-weights';
import { Res as AnnOutputCalculatorRes } from '../calculators/ann-output/calc-ann-output';

export type ComplexOutput = AnnOutputCalculatorRes;

export type Params = {
    learningSpeed?:number;
    inputSignals?:{
        offset?:number;
        needOffset?:boolean;
        needNormalize?:boolean;
        normalizer?:Mutator|null;
    };
};

export type ParamsPrepared = Params & {
    learningSpeed:number;
    inputSignals: {
        offset:number;
        needOffset:boolean;
        needNormalize:boolean;
        normalizer:Mutator|null;
    };
};

export type Data = {
    name?:string;
    layers:Layers;
    id?:string|null;
    layersWeights:LayersWeights;
};

export type DataPrepared = Data & {
    name:string;
    id:string|null;
};
