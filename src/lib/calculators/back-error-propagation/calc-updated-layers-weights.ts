import { ANN, T as TANN } from '../../ann';
import { Signals, SignalsErrors } from '../../signals';
import calcUpdatedWeights from './calc-updated-weights';
import { LayersWeights, T as TLayersWeights } from '../../weights/layers-pairs-weights';
import calcLayersOutputErrors, { Res as LayersErrors } from './calc-layers-output-errors';

type Data = {
    ann:ANN;
    input:Signals;
    errors:SignalsErrors|null;
};

type Res = LayersWeights;
type LayersOutputs = Array<Signals>;

const getLayersPairErrors = (layersErrors:LayersErrors, layersPairIndex:number):SignalsErrors|never => {
    const errors = layersErrors
        ? layersErrors[layersPairIndex + 1]
        : null;

    if (errors)
        return errors;

    throw new UpdatedLayersWeightsError('Got invalid ANN layers pair output errors.');
};

const getLayersPairOutputs = (layersOutputs:LayersOutputs, layersPairIndex:number):Array<Signals>|never => {
    if (!layersOutputs)
        throw new UpdatedLayersWeightsError('Got invalid ANN layers outputs.');

    const left = layersOutputs[layersPairIndex];
    const right = layersOutputs[layersPairIndex + 1];

    if (!left)
        throw new UpdatedLayersWeightsError('Got invalid ANN layers pair left output.');

    if (!right)
        throw new UpdatedLayersWeightsError('Got invalid ANN layers pair right output.');

    return [left, right];
};

const calcLayersPairs = async (layersErrors:LayersErrors, layersOutputs:LayersOutputs, ann:ANN)
    :Promise<TLayersWeights.Data> => {

    let promise:any = Promise.resolve();
    const updatedLayersWeightsData:TLayersWeights.Data = [];

    ann.getLayers().forEachPair(layersPair => {
        return promise = promise
            .then(async () => {
                const updatedWeights = await calcUpdatedWeights({
                    ann,
                    layersPair,
                    errors: getLayersPairErrors(layersErrors, layersPair.index),
                    layersOutputs: getLayersPairOutputs(layersOutputs, layersPair.index || 0),
                });

                updatedLayersWeightsData.push(updatedWeights);
            });
    });

    await promise;

    return updatedLayersWeightsData;
};

const calcUpdatedLayersWeights = async ({ ann, input, errors }:Data):Promise<Res> => {
    if (!input)
        throw new UpdatedLayersWeightsError('Got invalid ANN input.');

    if (!errors)
        return ann.getLayersWeights();

    const complexOutput:TANN.ComplexOutput = await ann.calcComplexOutput(input);

    const layersErrors:LayersErrors = await calcLayersOutputErrors({
        ann,
        outputErrors: errors,
    });

    const layersWeightsData = await calcLayersPairs(layersErrors, complexOutput.layersOutputs, ann);

    return new LayersWeights(layersWeightsData);
};

class UpdatedLayersWeightsError extends Error {
    constructor(message:string) {
        super(message);

        Object.setPrototypeOf(this, UpdatedLayersWeightsError.prototype);
    }
}

export default calcUpdatedLayersWeights;
