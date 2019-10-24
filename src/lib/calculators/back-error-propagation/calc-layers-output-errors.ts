import { ANN } from '../../ann';
import { SignalsErrors } from '../../signals';
import calcLayerOutputErrors from './calc-layer-output-errors';

export type Res = Array<SignalsErrors>|null;

type Data = {
    ann:ANN;
    outputErrors:SignalsErrors|null;
};

const calcLayersOutputErrors = async ({ ann, outputErrors }:Data):Promise<Res> => {
    if (!outputErrors)
        return null;

    const layers = ann.getLayers().getAll();
    const layersQty = layers.length;
    const layersErrors:Array<SignalsErrors> = (new Array(layersQty)).fill(null);

    for (let i = layersQty - 1; i >= 0; i--) {
        const layer = layers[i];
        const nextItemIndex = i + 1;
        const isOutputLayer = layer.isOutput();

        const layerErrors = calcLayerOutputErrors({
            ann,
            aimLayer: layer,
            layersPairIndex: isOutputLayer ? null : i,
            nextLayerOutputErrors: isOutputLayer
                ? outputErrors
                : layersErrors[nextItemIndex],
        });

        if (layerErrors)
            layersErrors[i] = layerErrors;
    }

    return layersErrors;
};

export default calcLayersOutputErrors;
