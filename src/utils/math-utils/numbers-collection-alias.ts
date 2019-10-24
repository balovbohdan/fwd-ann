// Encodes/decodes collection of positive numbers (n > 0) to integer alias.

import { clone } from '../object-utils';

export const encode = (numbers:Array<number>):number => {
    const numbersPrepared = clone(numbers)
        .filter(n => n > 0)
        .sort();

    const maxNumber:number = Math.max.apply(Math, numbersPrepared);
    const cipherArray:Array<number> = (new Array(maxNumber)).fill(0);

    numbersPrepared.forEach(number => cipherArray[number - 1] = 1);

    const cipher:string = cipherArray.reverse().join('');

    return parseInt(cipher, 2);
};

export const decode = (cipher:number):Array<number> => {
    const binary:string = Math.round(cipher).toString(2);

    return binary.split('')
        .reverse()
        .map((n, i) => +n ? i + 1 : 0)
        .filter(n => n);
};
