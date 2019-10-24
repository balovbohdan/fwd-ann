import { ANN } from '../ann';
import { Signals } from '../signals';

export type Result = {
    ann:ANN;
    log:Log;
};

export type Log = Array<{epoch:number, cycle:number, RootMSE:number}>;

export type PreparedParams = {
    epoches:number;
};

export type Params = {
    epoches?:number;
};

export type Data = {
    ann:ANN;
    sets:Sets;
};

export type CycleData = {
    set:Set;
    epoch:number;
    cycle:number;
};

export type Sets = Array<Set>;

export type Set = {
    task:Signals;
    idealOutput:Signals;
};
