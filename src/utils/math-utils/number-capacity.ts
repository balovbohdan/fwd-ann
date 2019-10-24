export const getCapacity = (n:number):number =>
    sign(n) * Math.abs(Math.floor(n)).toString().length;

export const getCapacityBase = (capacity:number):number =>
    capacity === 1
        ? 1
        : Math.pow(10, capacity);

export const getNumberByCapacity = (capacity:number):number =>
    Math.pow(10, capacity);

export const getBaseCapacityNumber = (n:number):number =>
    getNumberByCapacity(getCapacity(n));

export const sign = (n:number):number =>
    n === 0 || isNaN(n)
        ? n
        : n > 0 ? 1 : -1;
