export const clone = <T extends object>(obj:T):T =>
    JSON.parse(JSON.stringify(obj));

export const assignDeep = <T extends object>(target:object, source:object, concatArrays:boolean = false):T => {
    const res = {};
    const isObject = obj => obj && typeof obj === 'object';

    if (!isObject(target) || !isObject(source))
        return <T>source;

    const keys = Object.keys(source).concat(Object.keys(target))
        .filter((value, index, self) => self.indexOf(value) === index);

    keys.forEach(key => {
        const targetValue = target[key];
        const sourceValue = source[key];

        if (!targetValue || !sourceValue)
            res[key] = targetValue || sourceValue;
        else if (Array.isArray(targetValue) && Array.isArray(sourceValue))
            res[key] = concatArrays ? targetValue.concat(sourceValue) : Array.from(sourceValue);
        else if (isObject(targetValue) && isObject(sourceValue))
            res[key] = assignDeep(Object.assign({}, targetValue), sourceValue);
        else
            res[key] = sourceValue;
    });

    return <T>res;
};

export const freezeDeep = <T extends Object>(obj:{[key:string]:any}&T):Readonly<T> => {
    const propNames = Object.getOwnPropertyNames(obj);

    propNames.forEach(name => {
        const prop:any = obj[name];

        if (typeof prop == 'object' && prop !== null)
            freezeDeep(prop);
    });

    return Object.freeze(obj);
};
