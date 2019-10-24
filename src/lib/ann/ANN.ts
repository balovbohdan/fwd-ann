import * as T from './types';
import {Layers} from '../layers';
import config from '../../config';
import { Signals } from '../signals';
import { assignDeep } from '../../utils/object-utils';
import { decimal } from '../../utils/math-utils/random-number';
import { LayersWeights } from '../weights/layers-pairs-weights';
import calcAnnOutput from '../calculators/ann-output/calc-ann-output';
import * as layersWeightsUtils from '../weights/layers-pairs-weights/utils';

export class ANN {
    constructor(data:T.Data, params:T.Params = {}) {
        const { id, name, layers, layersWeights }:T.DataPrepared = ANN.prepareData(data);

        this.id = id;
        this.name = name;
        this.layers = layers;
        this.layersWeights = layersWeights;
        this.params = assignDeep(config.ann.defParams, params);
    }

    getId():string|null {
        return this.id;
    }

    setId(id:string) {
        this.id = id;
    }

    getLayers():Layers {
        return this.layers;
    }

    getLayersWeights():LayersWeights {
        return this.layersWeights;
    }

    setLayersWeights(layersWeights:LayersWeights):ANN {
        layersWeightsUtils.hasTheSameSizeStrict(this.layersWeights, layersWeights);

        this.layersWeights = layersWeights;

        return this;
    }

    getLearningSpeed():number {
        return this.params.learningSpeed;
    }

    async calcOutput(input:Signals):Promise<Signals> {
        const data = await this.calcComplexOutput(input);

        return data.output;
    }

    /**
     * Response consists of calculating process meta data.
     * It is needed to analyze calculating process and start
     * other calculation processes based on this meta data.
     */
    calcComplexOutput(input:Signals):Promise<T.ComplexOutput> {
        return calcAnnOutput({
            ann: this,
            signals: this.prepareInputSignals(input),
        });
    }

    private prepareInputSignals(input:Signals):Signals {
        const params = this.params.inputSignals;

        if (params.needNormalize)
            input = input.normalize(params.normalizer);

        if (params.needOffset)
            input = input.offset(params.offset);

        return input;
    }

    private static prepareData(data:T.Data):T.DataPrepared {
        data.name = data.name || 'ANN-' + decimal();

        data.id = typeof data.id === 'string'
            ? data.id
            : null;

        return <T.DataPrepared>data;
    }

    private id:string|null = null;
    private layersWeights:LayersWeights;

    private readonly name:string;
    private readonly layers:Layers;
    private readonly params:T.ParamsPrepared;
}
