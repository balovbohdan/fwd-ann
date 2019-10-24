import { ANN } from '../ann';
import { Signals } from '../signals';
export declare type Result = {
    ann: ANN;
    log: Log;
};
export declare type Log = Array<{
    epoch: number;
    cycle: number;
    RootMSE: number;
}>;
export declare type PreparedParams = {
    epoches: number;
};
export declare type Params = {
    epoches?: number;
};
export declare type Data = {
    ann: ANN;
    sets: Sets;
};
export declare type CycleData = {
    set: Set;
    epoch: number;
    cycle: number;
};
export declare type Sets = Array<Set>;
export declare type Set = {
    task: Signals;
    idealOutput: Signals;
};
