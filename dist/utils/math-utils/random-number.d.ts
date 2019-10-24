declare type FloatingParams = {
    min?: number;
    max?: number;
    exclude?: Array<number>;
};
declare type DecimalParameterizedParams = {
    min?: number;
    max?: number;
    exclude?: Array<number>;
};
export declare const decimal: () => number;
export declare const sign: () => 1 | -1;
export declare const decimalWithParams: (params?: DecimalParameterizedParams) => number;
export declare const floating: (params?: FloatingParams | undefined) => number;
export {};
