import { Params as Res } from './create-rnd-weights';
import { Data as LayerData } from '../../../units/create';
import { assignDeep } from '../../../../utils/object-utils';
import { Params as RndWeightParams } from './create-rnd-weight';

type Data = {
    leftLayerData:LayerData;
    rightLayerData:LayerData;
    randomWeightParams?:RndWeightParams;
};

const calcUnitsQty = (data:LayerData):number =>
    data.unitsData.reduce((sum, item) => sum + item.num, 0);

const prepareRndWeightParams = (leftUnitsQty, params:RndWeightParams = {}):RndWeightParams =>
    assignDeep(params, { leftUnitsQty });

const createWeightsParams = (data:Data):Res => ({
    leftUnitsQty: calcUnitsQty(data.leftLayerData),
    rightUnitsQty: calcUnitsQty(data.rightLayerData),
    rndWeightParams: prepareRndWeightParams(data.randomWeightParams),
});

export default createWeightsParams;
