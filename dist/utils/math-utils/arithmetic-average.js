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
exports.simple = function (values) {
    var len = values.length;
    if (len <= 0)
        throw new ArithmeticAverageError('Failed to calc "Simple Arithmetic Average" value. Got empty numbers array.');
    try {
        return values.reduce(function (sum, n) { return (sum + +n); }, 0) / len;
    }
    catch (e) {
        throw new ArithmeticAverageError(e.message);
    }
};
exports.crossed = function (left, right, calc) {
    if (left.length !== right.length)
        throw new ArithmeticAverageError('Numbers qty mismatch.');
    var doCalc = calc || exports.simple;
    try {
        return left.map(function (n, i) { return doCalc([+n, +right[i]]); });
    }
    catch (e) {
        throw new ArithmeticAverageError(e.message);
    }
};
var ArithmeticAverageError = (function (_super) {
    __extends(ArithmeticAverageError, _super);
    function ArithmeticAverageError(message) {
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.stack = (new Error()).stack;
        return _this;
    }
    return ArithmeticAverageError;
}(Error));
