"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var object_utils_1 = require("../object-utils");
exports.encode = function (numbers) {
    var numbersPrepared = object_utils_1.clone(numbers)
        .filter(function (n) { return n > 0; })
        .sort();
    var maxNumber = Math.max.apply(Math, numbersPrepared);
    var cipherArray = (new Array(maxNumber)).fill(0);
    numbersPrepared.forEach(function (number) { return cipherArray[number - 1] = 1; });
    var cipher = cipherArray.reverse().join('');
    return parseInt(cipher, 2);
};
exports.decode = function (cipher) {
    var binary = Math.round(cipher).toString(2);
    return binary.split('')
        .reverse()
        .map(function (n, i) { return +n ? i + 1 : 0; })
        .filter(function (n) { return n; });
};
