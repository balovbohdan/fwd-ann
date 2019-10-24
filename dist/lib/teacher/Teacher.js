"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var math_funcs_calculus_1 = require("math-funcs-calculus");
var config_1 = require("../../config");
var object_utils_1 = require("../../utils/object-utils");
var calc_errors_with_teacher_1 = require("../calculators/output-errors/calc-errors-with-teacher");
var calc_updated_layers_weights_1 = require("../calculators/back-error-propagation/calc-updated-layers-weights");
var Teacher = (function () {
    function Teacher(data, params) {
        this.log = [];
        this.ann = data.ann;
        this.teachingDatasets = data.sets;
        this.params = Teacher.prepareParams(params);
    }
    Teacher.teach = function (data, params) {
        var teacher = new Teacher(data, params);
        return teacher.teach();
    };
    Teacher.prototype.teach = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.doTeach()];
                    case 1:
                        _a.sent();
                        return [2, {
                                ann: this.ann,
                                log: this.log,
                            }];
                }
            });
        });
    };
    Teacher.prototype.doTeach = function () {
        var _this = this;
        var epoches = this.params.epoches;
        var cycles = this.teachingDatasets.length;
        var promise = Promise.resolve(this);
        var _loop_1 = function (epoch) {
            var _loop_2 = function (cycle) {
                promise = promise.then(function () { return _this.startCycle({
                    set: _this.teachingDatasets[cycle],
                    epoch: epoch,
                    cycle: cycle,
                }); });
            };
            for (var cycle = 0; cycle < cycles; cycle++) {
                _loop_2(cycle);
            }
        };
        for (var epoch = 0; epoch < epoches; epoch++) {
            _loop_1(epoch);
        }
        return promise;
    };
    Teacher.prototype.startCycle = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var input, output, outputErrorsData, updatedLayersWeights;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        input = data.set.task;
                        return [4, this.ann.calcOutput(input)];
                    case 1:
                        output = _a.sent();
                        return [4, calc_errors_with_teacher_1.default({
                                output: output,
                                idealOutput: data.set.idealOutput,
                            })];
                    case 2:
                        outputErrorsData = _a.sent();
                        return [4, calc_updated_layers_weights_1.default({
                                input: input,
                                ann: this.ann,
                                errors: outputErrorsData.errors,
                            })];
                    case 3:
                        updatedLayersWeights = _a.sent();
                        if (!updatedLayersWeights)
                            throw new TeacherError('Got invalid updated ANN layers weights.');
                        this.log.push({
                            epoch: data.epoch,
                            cycle: data.cycle,
                            RootMSE: math_funcs_calculus_1.errors.RootMSE.calc(data.set.idealOutput.getMatrix().getPlainData(), output.getMatrix().getPlainData()),
                        });
                        this.ann.setLayersWeights(updatedLayersWeights);
                        return [2, this];
                }
            });
        });
    };
    Teacher.prepareParams = function (params) {
        if (params === void 0) { params = {}; }
        var mergedParams = object_utils_1.assignDeep(config_1.default.teacher.defParams, params);
        if (mergedParams.epoches <= 0)
            throw new TeacherError('Got invalid epoches qty.');
        return mergedParams;
    };
    return Teacher;
}());
exports.Teacher = Teacher;
var TeacherError = (function (_super) {
    __extends(TeacherError, _super);
    function TeacherError(message) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, TeacherError.prototype);
        return _this;
    }
    return TeacherError;
}(Error));
