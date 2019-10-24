"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcUnitsQtyInRawLayerData = function (_a) {
    var unitsData = _a.unitsData;
    return unitsData.reduce(function (totalQty, _a) {
        var num = _a.num;
        return totalQty + num;
    }, 0);
};
