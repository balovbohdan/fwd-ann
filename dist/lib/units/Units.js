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
var signals_1 = require("../signals");
var layers_1 = require("../layers");
var random_number_1 = require("../../utils/math-utils/random-number");
var Units = (function () {
    function Units(data) {
        var _this = this;
        this.activateSignal = function (signal, row) {
            try {
                return _this.get(row)
                    .getActivationFunction()
                    .calc(signal);
            }
            catch (e) {
                console.warn('Failed to mutate ANN signal.', e);
                return 0;
            }
        };
        this.units = data.units;
        this.type = data.type;
        this.name = data.name || 'Units-' + random_number_1.decimal();
    }
    Units.prototype.getNames = function () {
        return this.map(function (unit) { return unit.getName(); });
    };
    Units.prototype.getActivationFunction = function () {
        try {
            return this.units[0].getActivationFunction() || null;
        }
        catch (e) {
            console.warn('Failed to get activation function of ANN unit.', e);
            return null;
        }
    };
    Units.prototype.map = function (f) {
        return this.units.map(f);
    };
    Units.prototype.forEach = function (f) {
        this.units.forEach(f);
    };
    Units.prototype.get = function (i) {
        return this.units[i] || null;
    };
    Units.prototype.getQty = function () {
        return this.units.length;
    };
    Units.prototype.getType = function () {
        return this.type;
    };
    Units.prototype.activateSignals = function (signals) {
        var activatedSignalsData = signals
            .getMatrix()
            .mutate(this.activateSignal);
        return new signals_1.Signals(activatedSignalsData, signals.getNames());
    };
    Units.prototype.isInput = function () {
        return this.getType() === layers_1.LayerType.INPUT;
    };
    Units.prototype.isOutput = function () {
        return this.getType() === layers_1.LayerType.OUTPUT;
    };
    Units.prototype.isHidden = function () {
        return this.getType() === layers_1.LayerType.HIDDEN;
    };
    Units.prototype.calcOutput = function (input) {
        if (this.getQty() !== input.getQty())
            throw new UnitsError('Units number and input signals number mismatch.');
        var outputSignals = this.map(function (unit, i) {
            return unit.getActivationFunction()
                .calc(input.get(i || 0));
        });
        return signals_1.Signals.makeInst(outputSignals);
    };
    return Units;
}());
exports.Units = Units;
var UnitsError = (function (_super) {
    __extends(UnitsError, _super);
    function UnitsError(message) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, UnitsError.prototype);
        return _this;
    }
    return UnitsError;
}(Error));
