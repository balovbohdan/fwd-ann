import { ActivationFunction } from '../activation-funcs';
declare type Params = {
    name?: string;
    ActivationFunction: ActivationFunction;
};
export declare class Unit {
    constructor(params: Params);
    getName(): string;
    getActivationFunction(): ActivationFunction;
    private readonly name;
    private readonly ActivationFunction;
}
export {};
