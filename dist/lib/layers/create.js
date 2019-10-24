"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Layers_1 = require("./Layers");
var create_1 = require("../units/create");
var create = function (data) {
    var layersRawData = makeData(data);
    return new Layers_1.Layers(layersRawData);
};
var makeData = function (data) {
    var layersData = [];
    data.forEach(function (layerData) { return layersData.push(create_1.default(layerData)); });
    return layersData;
};
exports.default = create;
