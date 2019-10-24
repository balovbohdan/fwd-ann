export declare type Params = {
    min?: number;
    max?: number;
    leftUnitsQty?: number;
    rightUnitsQty?: number;
    exclude?: Array<number>;
};
declare const createRndWeight: (params: Params) => number;
export default createRndWeight;
