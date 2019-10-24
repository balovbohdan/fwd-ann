"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Unit_1 = require("./Unit");
var Units_1 = require("./Units");
var createSingleData = function (data) {
    var units = [];
    var names = data.names || [];
    for (var i = 0; i < data.num; i++) {
        units.push(new Unit_1.Unit({
            name: names[i],
            ActivationFunction: data.ActivationFunction,
        }));
    }
    return units;
};
var createData = function (_a) {
    var type = _a.type, name = _a.name, unitsData = _a.unitsData;
    var resultData = {
        name: name,
        type: type,
        units: [],
    };
    unitsData.forEach(function (singleData) {
        var _a;
        return (_a = resultData.units).push.apply(_a, createSingleData(singleData));
    });
    return resultData;
};
var create = function (data) {
    var unitsData = createData(data);
    return new Units_1.Units(unitsData);
};
exports.default = create;
