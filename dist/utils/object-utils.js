"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clone = function (obj) {
    return JSON.parse(JSON.stringify(obj));
};
exports.assignDeep = function (target, source, concatArrays) {
    if (concatArrays === void 0) { concatArrays = false; }
    var res = {};
    var isObject = function (obj) { return obj && typeof obj === 'object'; };
    if (!isObject(target) || !isObject(source))
        return source;
    var keys = Object.keys(source).concat(Object.keys(target))
        .filter(function (value, index, self) { return self.indexOf(value) === index; });
    keys.forEach(function (key) {
        var targetValue = target[key];
        var sourceValue = source[key];
        if (!targetValue || !sourceValue)
            res[key] = targetValue || sourceValue;
        else if (Array.isArray(targetValue) && Array.isArray(sourceValue))
            res[key] = concatArrays ? targetValue.concat(sourceValue) : Array.from(sourceValue);
        else if (isObject(targetValue) && isObject(sourceValue))
            res[key] = exports.assignDeep(Object.assign({}, targetValue), sourceValue);
        else
            res[key] = sourceValue;
    });
    return res;
};
exports.freezeDeep = function (obj) {
    var propNames = Object.getOwnPropertyNames(obj);
    propNames.forEach(function (name) {
        var prop = obj[name];
        if (typeof prop == 'object' && prop !== null)
            exports.freezeDeep(prop);
    });
    return Object.freeze(obj);
};
