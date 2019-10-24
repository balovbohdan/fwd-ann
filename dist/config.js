"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var object_utils_1 = require("./utils/object-utils");
var mutators_1 = require("./lib/signals/mutators");
var config = object_utils_1.freezeDeep({
    ann: {
        defParams: {
            learningSpeed: 1,
            inputSignals: {
                offset: .1,
                needOffset: true,
                needNormalize: true,
                normalizer: mutators_1.rationalSigmoid,
            },
        },
    },
    teacher: {
        defParams: {
            epoches: 10000,
        },
    },
});
exports.default = config;
