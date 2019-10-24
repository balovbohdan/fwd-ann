import { Signals } from './Signals';
import { funcs } from 'math-funcs-calculus';

export type Mutator = (signals:Signals, Func?:Func)=>Signals;

type Func = {
    calc:Function;
};

const { Logistic, RationalSigmoid } = funcs;

export const mutator:Mutator = (signals:Signals, Func:Func = RationalSigmoid):Signals => {
    const signalsData = signals
        .getMatrix()
        .mutate(Func.calc.bind(Func));

    return new Signals(signalsData);
};

export const logistic = (signals:Signals):Signals =>
    mutator(signals, Logistic);

export const rationalSigmoid = (signals:Signals):Signals =>
    mutator(signals, RationalSigmoid);
