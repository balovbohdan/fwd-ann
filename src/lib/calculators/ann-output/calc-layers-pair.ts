import { ANN } from '../../ann';
import { Signals } from '../../signals';
import { LayersPair } from '../../layers/types';
import weightsToSignals from './weights-to-signals';

type Data = {
    ann:ANN;
    signals:Signals;
    layersPair:LayersPair;
};

type Res = {
    dirtyOutput:Signals;
    layersInputs:Array<Signals>;
    layersOutputs:Array<Signals>;
};

const calcLayersPair = ({ ann, signals, layersPair }:Data):Res => {
    const weights = ann.getLayersWeights().get(layersPair.index);
    const activatedInput:Signals = layersPair.left.activateSignals(<Signals>signals);

    if (!weights)
        throw new LayersPairCalculatorError('Got invalid ANN layers weights.');

    const layersPairDirtyOutput = weightsToSignals({
        weights,
        signals: activatedInput,
    });

    const activatedOutput:Signals = layersPair.right.activateSignals(layersPairDirtyOutput);

    return {
        dirtyOutput: layersPairDirtyOutput,
        layersInputs: [signals, layersPairDirtyOutput],
        layersOutputs: [activatedInput, activatedOutput],
    };
};

class LayersPairCalculatorError extends Error {
    constructor(message:string) {
        super(message);

        Object.setPrototypeOf(this, LayersPairCalculatorError.prototype);
    }
}

export default calcLayersPair;
