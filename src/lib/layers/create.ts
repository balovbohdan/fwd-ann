import * as T from './types';
import { Layers } from './Layers';
import createUnits from '../units/create';

const create = (data:T.LayersRawData):Layers => {
    const layersRawData = makeData(data);

    return new Layers(layersRawData);
};

const makeData = (data:T.LayersRawData):T.LayersData => {
    const layersData:T.LayersData = [];

    data.forEach(layerData => layersData.push(createUnits(layerData)));

    return layersData;
};

export default create;
