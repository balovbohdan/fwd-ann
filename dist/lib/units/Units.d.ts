import * as T from './types';
import { Unit } from './Unit';
import { Signals } from '../signals';
import { LayerType } from '../layers';
import { ActivationFunction } from '../activation-funcs';
export declare class Units {
    constructor(data: T.UnitsRaw);
    getNames(): Array<string>;
    getActivationFunction(): ActivationFunction | null;
    map(f: (unit: Unit, i?: number, units?: T.UnitsData) => any): Array<any>;
    forEach(f: (unit: Unit, i?: number, units?: T.UnitsData) => void): void;
    get(i: number): Unit;
    getQty(): number;
    getType(): LayerType;
    activateSignals(signals: Signals): Signals;
    isInput(): boolean;
    isOutput(): boolean;
    isHidden(): boolean;
    calcOutput(input: Signals): Signals;
    private activateSignal;
    private readonly name;
    private readonly type;
    private readonly units;
}
