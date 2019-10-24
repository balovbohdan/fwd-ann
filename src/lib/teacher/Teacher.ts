import { errors } from 'math-funcs-calculus';

import { ANN } from '../ann';
import * as T from './types';
import config from '../../config';
import { assignDeep } from '../../utils/object-utils';
import calcErrorsWithTeacher from '../calculators/output-errors/calc-errors-with-teacher';
import calcUpdatedLayersWeights from '../calculators/back-error-propagation/calc-updated-layers-weights';

export class Teacher {
    static teach(data:T.Data, params?:T.Params):Promise<T.Result> {
        const teacher = new Teacher(data, params);

        return teacher.teach();
    }

    private constructor(data:T.Data, params?:T.Params) {
        this.ann = data.ann;
        this.teachingDatasets = data.sets;
        this.params = Teacher.prepareParams(params);
    }

    private async teach():Promise<T.Result> {
        await this.doTeach();

        return {
            ann: this.ann,
            log: this.log,
        };
    }

    private doTeach() {
        const { epoches } = this.params;
        const cycles:number = this.teachingDatasets.length;
        let promise:Promise<Teacher> = Promise.resolve(this);

        for (let epoch = 0; epoch < epoches; epoch++) {
            for (let cycle = 0; cycle < cycles; cycle++) {
                promise = promise.then(
                    () => this.startCycle({
                        set: this.teachingDatasets[cycle],
                        epoch,
                        cycle,
                    })
                );
            }
        }

        return promise;
    }

    private async startCycle(data:T.CycleData):Promise<Teacher> {
        const input = data.set.task;
        const output = await this.ann.calcOutput(input);

        const outputErrorsData = await calcErrorsWithTeacher({
            output,
            idealOutput: data.set.idealOutput,
        });

        const updatedLayersWeights = await calcUpdatedLayersWeights({
            input,
            ann: this.ann,
            errors: outputErrorsData.errors,
        });

        if (!updatedLayersWeights)
            throw new TeacherError('Got invalid updated ANN layers weights.');

        this.log.push({
            epoch: data.epoch,
            cycle: data.cycle,
            RootMSE: errors.RootMSE.calc(
                data.set.idealOutput.getMatrix().getPlainData(),
                output.getMatrix().getPlainData()
            ),
        });

        this.ann.setLayersWeights(updatedLayersWeights);

        return this;
    }

    private static prepareParams(params:T.Params = {}):T.PreparedParams|never {
        const mergedParams:T.PreparedParams = assignDeep(config.teacher.defParams, params);

        if (mergedParams.epoches <= 0)
            throw new TeacherError('Got invalid epoches qty.');

        return mergedParams;
    }

    private log:T.Log = [];
    private readonly ann:ANN;
    private readonly teachingDatasets:T.Sets;
    private readonly params:T.PreparedParams;
}

class TeacherError extends Error {
    constructor(message:string) {
        super(message);

        Object.setPrototypeOf(this, TeacherError.prototype);
    }
}
