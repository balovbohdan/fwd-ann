"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mutators_1 = require("./mutators");
var normalize = function (signals, mutator) {
    if (mutator === void 0) { mutator = mutators_1.rationalSigmoid; }
    return (mutator || mutators_1.rationalSigmoid)(signals);
};
exports.default = normalize;
