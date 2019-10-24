import { OutputErrors } from './types';
import { Signals } from '../../signals';
declare type Data = {
    output: Signals;
    idealOutput: Signals;
};
declare const calcErrorsWithTeacher: ({ output, idealOutput }: Data) => Promise<OutputErrors>;
export default calcErrorsWithTeacher;
