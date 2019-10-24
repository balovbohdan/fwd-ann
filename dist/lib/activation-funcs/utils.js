"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var activationFuncs = require("./activation-funcs");
exports.getByName = function (name) {
    return activationFuncs[name] || null;
};
