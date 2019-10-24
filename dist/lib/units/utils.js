"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcUnitsQtyInRawLayerData = function (_a) {
    var unitsData = _a.unitsData;
    return unitsData.reduce(function (totalQty, _a) {
        var qty = _a.qty;
        return totalQty + qty;
    }, 0);
};
