"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var create_params_1 = require("./create-params");
var create_rnd_layers_weights_1 = require("./create-rnd-layers-weights");
var create = function (data) {
    var params = create_params_1.default(data);
    return create_rnd_layers_weights_1.default(params);
};
exports.default = create;
