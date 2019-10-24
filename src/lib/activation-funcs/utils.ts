import { ActivationFunction } from './types';
import * as activationFuncs from './activation-funcs';

export const getByName = (name:string):ActivationFunction|null =>
    activationFuncs[name] || null;
