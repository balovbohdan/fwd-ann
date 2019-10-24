"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var ann_1 = require("../lib/ann");
var signals_1 = require("../lib/signals");
var teacher_1 = require("../lib/teacher");
var layers_1 = require("../lib/layers");
var activation_funcs_1 = require("../lib/activation-funcs");
var ReLU = activation_funcs_1.activationFuncs.ReLU;
var config = {
    ann: {
        params: {
            learningSpeed: .1,
        },
        data: {
            id: 'ExampleANN',
            layersData: [
                {
                    type: layers_1.LayerType.INPUT,
                    unitsData: [{
                            num: 6,
                            ActivationFunction: ReLU,
                        }],
                },
                {
                    type: layers_1.LayerType.HIDDEN,
                    unitsData: [{
                            num: 7,
                            ActivationFunction: ReLU,
                        }],
                },
                {
                    type: layers_1.LayerType.OUTPUT,
                    unitsData: [{
                            num: 1,
                            ActivationFunction: ReLU,
                        }],
                },
            ],
        },
    },
    teacher: {
        params: {
            epoches: 200,
        },
        testSet: [
            [0, 0, 0, 0, 0, 0, 0],
            [.1, 1, 1, 0, 0, 0, 0],
            [.2, 0, 0, 1, 1, 0, 0],
            [.3, 0, 0, 0, 0, 1, 1],
        ],
        data: {
            sets: [
                {
                    task: signals_1.Signals.create([0, 0, 0, 0, 0, 0]),
                    idealOutput: signals_1.Signals.create([0]),
                },
                {
                    task: signals_1.Signals.create([1, 1, 0, 0, 0, 0]),
                    idealOutput: signals_1.Signals.create([.1]),
                },
                {
                    task: signals_1.Signals.create([0, 0, 1, 1, 0, 0]),
                    idealOutput: signals_1.Signals.create([.2]),
                },
                {
                    task: signals_1.Signals.create([0, 0, 0, 0, 1, 1]),
                    idealOutput: signals_1.Signals.create([.3]),
                },
            ],
        },
    },
};
var ann = ann_1.default(config.ann.data, config.ann.params);
teacher_1.Teacher.teach(__assign({ ann: ann }, config.teacher.data), config.teacher.params)
    .then(function (_a) {
    var ann = _a.ann;
    var _loop_1 = function (units) {
        var expectedOutput = units[0];
        var input = signals_1.Signals.create(units.slice(1));
        ann.calcOutput(input)
            .then(function (signals) {
            var output = Math.round(signals.getMatrix().get(0, 0) * 100) / 100;
            console.log(units + " -> output: " + output + "; expected: " + expectedOutput);
        });
    };
    for (var _i = 0, _b = config.teacher.testSet; _i < _b.length; _i++) {
        var units = _b[_i];
        _loop_1(units);
    }
});
