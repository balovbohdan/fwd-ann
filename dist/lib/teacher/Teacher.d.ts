import * as T from './types';
export declare class Teacher {
    static teach(data: T.Data, params?: T.Params): Promise<T.Result>;
    private constructor();
    private teach;
    private doTeach;
    private startCycle;
    private static prepareParams;
    private log;
    private readonly ann;
    private readonly teachingDatasets;
    private readonly params;
}
