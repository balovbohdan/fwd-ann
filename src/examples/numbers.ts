import createANN from '../lib/ann';
import { Signals } from '../lib/signals';
import { Teacher } from '../lib/teacher';
import { LayerType } from '../lib/layers';
import { activationFuncs } from '../lib/activation-funcs';

const { ReLU } = activationFuncs;

const config = {
    ann: {
        params: {
            learningSpeed: .1,
        },
        data: {
            id: 'ExampleANN',
            layersData: [
                {
                    type: LayerType.INPUT,
                    unitsData: [{
                        num: 6,
                        ActivationFunction: ReLU,
                    }],
                },
                {
                    type: LayerType.HIDDEN,
                    unitsData: [{
                        num: 7,
                        ActivationFunction: ReLU,
                    }],
                },
                {
                    type: LayerType.OUTPUT,
                    unitsData: [{
                        num: 1,
                        ActivationFunction: ReLU,
                    }],
                },
            ],
        },
    },
    teacher: {
        params: {
            epoches: 200,
        },
        testSet: [
            [0, 0, 0, 0, 0, 0, 0],
            [.1, 1, 1, 0, 0, 0, 0],
            [.2, 0, 0, 1, 1, 0, 0],
            [.3, 0, 0, 0, 0, 1, 1],
        ],
        data: {
            sets: [
                {
                    task: Signals.create([0, 0, 0, 0, 0, 0]),
                    idealOutput: Signals.create([0]),
                },
                {
                    task: Signals.create([1, 1, 0, 0, 0, 0]),
                    idealOutput: Signals.create([.1]),
                },
                {
                    task: Signals.create([0, 0, 1, 1, 0, 0]),
                    idealOutput: Signals.create([.2]),
                },
                {
                    task: Signals.create([0, 0, 0, 0, 1, 1]),
                    idealOutput: Signals.create([.3]),
                },
            ],
        },
    },
};

const ann = createANN(config.ann.data, config.ann.params);

Teacher.teach({ ann, ...config.teacher.data }, config.teacher.params)
    .then(({ ann }) => {
        for (let units of config.teacher.testSet) {
            const expectedOutput = units[0];
            const input = Signals.create(units.slice(1));

            ann.calcOutput(input)
                .then(signals => {
                    const output = Math.round(signals.getMatrix().get(0, 0) * 100) / 100;

                    console.log(`${units} -> output: ${output}; expected: ${expectedOutput}`);
                });
        }
    });
