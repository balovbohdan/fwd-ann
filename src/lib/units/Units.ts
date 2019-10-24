import * as T from './types';
import { Unit } from './Unit';
import { Signals } from '../signals';
import { LayerType } from '../layers';
import { ActivationFunction } from '../activation-funcs';
import { decimal } from '../../utils/math-utils/random-number';

export class Units {
    constructor(data:T.UnitsRaw) {
        this.units = data.units;
        this.type = data.type;
        this.name = data.name || 'Units-' + decimal();
    }

    getNames():Array<string> {
        return this.map(unit => unit.getName());
    }

    /**
     * DO NOTICE!
     * This method returns activation function class of the first unit!
     * It you need more detailed information you have to inspect every unit.
     */
    getActivationFunction():ActivationFunction|null {
        try {
            return this.units[0].getActivationFunction() || null;
        } catch (e) {
            console.warn('Failed to get activation function of ANN unit.', e);
            
            return null;
        }
    }

    map(f:(unit:Unit, i?:number, units?:T.UnitsData)=>any):Array<any> {
        return this.units.map(f);
    }

    forEach(f:(unit:Unit, i?:number, units?:T.UnitsData)=>void) {
        this.units.forEach(f);
    }

    get(i:number):Unit {
        return this.units[i] || null;
    }

    getQty():number {
        return this.units.length;
    }

    getType():LayerType {
        return this.type;
    }

    activateSignals(signals:Signals):Signals {
        const activatedSignalsData = signals
            .getMatrix()
            .mutate(this.activateSignal);
        
        return new Signals(
            activatedSignalsData,
            signals.getNames()
        );
    }

    isInput():boolean {
        return this.getType() === LayerType.INPUT;
    }

    isOutput():boolean {
        return this.getType() === LayerType.OUTPUT;
    }

    isHidden():boolean {
        return this.getType() === LayerType.HIDDEN;
    }

    calcOutput(input:Signals):Signals {
        if (this.getQty() !== input.getQty())
            throw new UnitsError('Units number and input signals number mismatch.');

        const outputSignals:Array<number> = this.map((unit, i) =>
            unit.getActivationFunction()
                .calc(input.get(i || 0))
        );

        return Signals.makeInst(outputSignals);
    }

    private activateSignal = (signal:number, row:number):number => {
        try {
            return this.get(row)
                .getActivationFunction()
                .calc(signal);
        } catch (e) {
            console.warn('Failed to mutate ANN signal.', e);

            return 0;
        }
    };

    private readonly name:string;
    private readonly type:LayerType;
    private readonly units:T.UnitsData;
}

class UnitsError extends Error {
    constructor(message:string) {
        super(message);

        Object.setPrototypeOf(this, UnitsError.prototype);
    }
}
