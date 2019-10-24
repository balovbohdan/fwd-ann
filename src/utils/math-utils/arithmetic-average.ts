type Calculator = (numbers:Array<number>)=>number;

export const simple = (values:Array<number>):number => {
    const len = values.length;

    if (len <= 0)
        throw new ArithmeticAverageError('Failed to calc "Simple Arithmetic Average" value. Got empty numbers array.');

    try {
        return values.reduce((sum, n) => (sum + +n), 0) / len;
    } catch (e) {
        throw new ArithmeticAverageError(e.message);
    }
};

export const crossed = (left:Array<number>, right:Array<number>, calc?:Calculator):Array<number> => {
    if (left.length !== right.length)
        throw new ArithmeticAverageError('Numbers qty mismatch.');

    const doCalc:Calculator = calc || simple;

    try {
        return left.map((n, i) => doCalc([+n, +right[i]]));
    } catch (e) {
        throw new ArithmeticAverageError(e.message);
    }
};

class ArithmeticAverageError extends Error {
    constructor(message:string) {
        super(message);

        this.message = message;
        this.stack = (new Error()).stack;
    }

    readonly message:string;
    readonly stack:string|undefined;
}
