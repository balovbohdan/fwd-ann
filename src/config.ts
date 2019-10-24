import { freezeDeep } from './utils/object-utils';
import { rationalSigmoid } from './lib/signals/mutators';

const config = freezeDeep({
    ann: {
        defParams: {
            learningSpeed: 1,
            inputSignals: {
                offset: .1,
                needOffset: true,
                needNormalize: true,
                normalizer: rationalSigmoid,
            },
        },
    },
    teacher: {
        defParams: {
            epoches: 10000,
        },
    },
});

export default config;
