import { ActivationFunction } from '../activation-funcs';
import { decimal } from '../../utils/math-utils/random-number';

type Params = {
    name?:string;
    ActivationFunction:ActivationFunction;
};

export class Unit {
    constructor(params:Params) {
        this.name = params.name || ('Unit-' + decimal());
        this.ActivationFunction = params.ActivationFunction;
    }

    getName():string {
        return this.name;
    }

    getActivationFunction():ActivationFunction {
        return this.ActivationFunction;
    }

    private readonly name:string;
    private readonly ActivationFunction:ActivationFunction;
}
