"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCapacity = function (n) {
    return exports.sign(n) * Math.abs(Math.floor(n)).toString().length;
};
exports.getCapacityBase = function (capacity) {
    return capacity === 1
        ? 1
        : Math.pow(10, capacity);
};
exports.getNumberByCapacity = function (capacity) {
    return Math.pow(10, capacity);
};
exports.getBaseCapacityNumber = function (n) {
    return exports.getNumberByCapacity(exports.getCapacity(n));
};
exports.sign = function (n) {
    return n === 0 || isNaN(n)
        ? n
        : n > 0 ? 1 : -1;
};
