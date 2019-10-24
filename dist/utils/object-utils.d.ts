export declare const clone: <T extends object>(obj: T) => T;
export declare const assignDeep: <T extends object>(target: object, source: object, concatArrays?: boolean) => T;
export declare const freezeDeep: <T extends Object>(obj: {
    [key: string]: any;
} & T) => Readonly<T>;
