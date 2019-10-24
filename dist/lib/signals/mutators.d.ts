import { Signals } from './Signals';
export declare type Mutator = (signals: Signals, Func?: Func) => Signals;
declare type Func = {
    calc: Function;
};
export declare const mutator: Mutator;
export declare const logistic: (signals: Signals) => Signals;
export declare const rationalSigmoid: (signals: Signals) => Signals;
export {};
