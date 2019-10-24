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
Object.defineProperty(exports, "__esModule", { value: true });
var matrix_calculus_1 = require("matrix-calculus");
var normalize_1 = require("./normalize");
var object_utils_1 = require("../../utils/object-utils");
var SingleColMatrixFactory = matrix_calculus_1.matrixFactories.SingleColMatrixFactory;
var Signals = (function () {
    function Signals(signals, names) {
        if (names === void 0) { names = []; }
        this.signals = signals;
        this.names = names || [];
    }
    Signals.makeInst = function (signals, names) {
        if (names === void 0) { names = []; }
        var signalsMatrix = SingleColMatrixFactory.create(signals);
        return new Signals(signalsMatrix, names);
    };
    Signals.prototype.getNames = function () {
        return object_utils_1.clone(this.names);
    };
    Signals.prototype.setNames = function (names) {
        if (names.length !== this.getQty())
            throw new SignalsError('Names and units quantity mismatch.');
        this.names = names;
    };
    Signals.prototype.get = function (i) {
        return this.getMatrix().get(i, 0);
    };
    Signals.prototype.getMatrix = function () {
        return this.signals.getClone();
    };
    Signals.prototype.getQty = function () {
        return this.getMatrix().getUnitsQty();
    };
    Signals.prototype.normalize = function (mutator) {
        return normalize_1.default(this, mutator);
    };
    Signals.prototype.offset = function (offset) {
        if (offset === void 0) { offset = .1; }
        var signals = this.getMatrix().sum(offset);
        return new Signals(signals);
    };
    Signals.prototype.hasTheSameSizeStrict = function (signals) {
        if (this.hasTheSameSize(signals))
            return this;
        throw new SignalsError('ANN signals have different sizes.');
    };
    Signals.prototype.hasTheSameSize = function (signals) {
        var matrix = signals.getMatrix();
        return this.getMatrix().hasTheSameDimensions(matrix);
    };
    Signals.prototype.sortByNames = function () {
        var namedSignals = this.getNamedSignalsData();
        var namesSorted = this.getNames().sort();
        var sortedSignalsData = namesSorted
            .map(function (name) { return +namedSignals[name] || 0; });
        var sortedSignalsMatrix = SingleColMatrixFactory.create(sortedSignalsData);
        return new Signals(sortedSignalsMatrix, namesSorted);
    };
    Signals.prototype.getNamedSignalsData = function () {
        if (!this.names || this.names.length <= 0)
            throw new SignalsError('Got invalid signals names.');
        var names = this.getNames();
        var namedSignals = {};
        var signals = this.getMatrix().getPlainData();
        names.forEach(function (name, i) { return namedSignals[name] = signals[i]; });
        return namedSignals;
    };
    return Signals;
}());
exports.Signals = Signals;
var SignalsError = (function (_super) {
    __extends(SignalsError, _super);
    function SignalsError(message) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, Signals.prototype);
        return _this;
    }
    return SignalsError;
}(Error));
