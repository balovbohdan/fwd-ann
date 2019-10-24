import { ANN } from '../../ann';
import { Signals } from '../../signals';
import calcLayersPair from './calc-layers-pair';

export type Res = {
    output:Signals;
    layersInputs:Array<Signals>;
    layersOutputs:Array<Signals>;
};

type Data = {
    ann:ANN;
    signals:Signals;
};

const prepareAnnOutput = (ann:ANN, output:Signals):Signals => {
    const outputLayer = ann.getLayers().getOutputLayer();
    const unitsNames:Array<string> = outputLayer.getNames();

    output.setNames(unitsNames);

    return output;
};

const calcAnnOutput = async ({ ann, signals }:Data):Promise<Res> => {
    const layersInputs:Array<Signals> = [];
    const layersOutputs:Array<Signals> = [];
    let layersPairDirtyOutput:Signals|null = null;

    ann.getLayers().forEachPair(layersPair => {
        const inputSignals = layersPairDirtyOutput || signals;

        const result = calcLayersPair({
            ann,
            signals: inputSignals,
            layersPair: layersPair,
        });

        if (layersPair.left.isInput())
            layersOutputs.push(result.layersOutputs[0]);

        layersPairDirtyOutput = result.dirtyOutput;

        layersInputs.push(inputSignals);
        layersOutputs.push(result.layersOutputs[1]);

        if (layersPair.right.isOutput())
            layersInputs.push(result.layersInputs[1]);
    });

    const layersQty = ann.getLayers().getQty();
    const output = prepareAnnOutput(ann, layersOutputs[layersQty - 1]);

    return {
        output,
        layersInputs,
        layersOutputs,
    };
};

export default calcAnnOutput;
