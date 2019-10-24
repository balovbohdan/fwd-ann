import { Data as LayerDataRaw } from './create';

export const calcUnitsQtyInRawLayerData = ({ unitsData }:LayerDataRaw):number =>
    unitsData.reduce((totalQty, { qty }) => totalQty + qty, 0);
