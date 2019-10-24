"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var generate = function (length) {
    if (length === void 0) { length = 10; }
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var txt = '';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
};
exports.default = generate;
