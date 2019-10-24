import { Signals } from './Signals';
import { rationalSigmoid, Mutator } from './mutators';

const normalize = (signals:Signals, mutator:Mutator|null = rationalSigmoid):Signals =>
    (mutator || rationalSigmoid)(signals);

export default normalize;
