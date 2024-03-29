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
var calc_updated_weights_1 = require("./calc-updated-weights");
var layers_pairs_weights_1 = require("../../weights/layers-pairs-weights");
var calc_layers_output_errors_1 = require("./calc-layers-output-errors");
var getLayersPairErrors = function (layersErrors, layersPairIndex) {
    var errors = layersErrors
        ? layersErrors[layersPairIndex + 1]
        : null;
    if (errors)
        return errors;
    throw new UpdatedLayersWeightsError('Got invalid ANN layers pair output errors.');
};
var getLayersPairOutputs = function (layersOutputs, layersPairIndex) {
    if (!layersOutputs)
        throw new UpdatedLayersWeightsError('Got invalid ANN layers outputs.');
    var left = layersOutputs[layersPairIndex];
    var right = layersOutputs[layersPairIndex + 1];
    if (!left)
        throw new UpdatedLayersWeightsError('Got invalid ANN layers pair left output.');
    if (!right)
        throw new UpdatedLayersWeightsError('Got invalid ANN layers pair right output.');
    return [left, right];
};
var calcLayersPairs = function (layersErrors, layersOutputs, ann) { return __awaiter(void 0, void 0, void 0, function () {
    var promise, updatedLayersWeightsData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                promise = Promise.resolve();
                updatedLayersWeightsData = [];
                ann.getLayers().forEachPair(function (layersPair) {
                    return promise = promise
                        .then(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var updatedWeights;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, calc_updated_weights_1.default({
                                        ann: ann,
                                        layersPair: layersPair,
                                        errors: getLayersPairErrors(layersErrors, layersPair.index),
                                        layersOutputs: getLayersPairOutputs(layersOutputs, layersPair.index || 0),
                                    })];
                                case 1:
                                    updatedWeights = _a.sent();
                                    updatedLayersWeightsData.push(updatedWeights);
                                    return [2];
                            }
                        });
                    }); });
                });
                return [4, promise];
            case 1:
                _a.sent();
                return [2, updatedLayersWeightsData];
        }
    });
}); };
var calcUpdatedLayersWeights = function (_a) {
    var ann = _a.ann, input = _a.input, errors = _a.errors;
    return __awaiter(void 0, void 0, void 0, function () {
        var complexOutput, layersErrors, layersWeightsData;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!input)
                        throw new UpdatedLayersWeightsError('Got invalid ANN input.');
                    if (!errors)
                        return [2, ann.getLayersWeights()];
                    return [4, ann.calcComplexOutput(input)];
                case 1:
                    complexOutput = _b.sent();
                    return [4, calc_layers_output_errors_1.default({
                            ann: ann,
                            outputErrors: errors,
                        })];
                case 2:
                    layersErrors = _b.sent();
                    return [4, calcLayersPairs(layersErrors, complexOutput.layersOutputs, ann)];
                case 3:
                    layersWeightsData = _b.sent();
                    return [2, new layers_pairs_weights_1.LayersWeights(layersWeightsData)];
            }
        });
    });
};
var UpdatedLayersWeightsError = (function (_super) {
    __extends(UpdatedLayersWeightsError, _super);
    function UpdatedLayersWeightsError(message) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, UpdatedLayersWeightsError.prototype);
        return _this;
    }
    return UpdatedLayersWeightsError;
}(Error));
exports.default = calcUpdatedLayersWeights;
