# About
`fwd-ann` is a Feedforward Artificial Neural Network Library developed with TypeScript.
This project was started as experiment to explore TypeScript abilities to be used in
data processing tasks. You can use this library for experimental data processing on Node.js
server or in a browser. Very early version of this library was successfully used in **AMAKids**
company as core for building browser games results analyzer platform.

# Installation
```bash
npm i --save fwd-ann
```

# Examples
Go to the `src/examples` to explore examples. To run example run `ts-node <example-name>`
your console. Better way to understand how this library works is to explore these examples.
Another good way to understand this library — explore `src` library and create
small projects. Feel free to create anything you want using this library!


# API

## LayerType
This `enum` represents possible types of ANN's layers. There are three possible types:
* INPUT
* HIDDEN
* OUTPUT
These types are used to create ANN's instance with aim architecture.

## activationFuncs
Activation function determines how signals will be modified in `neurons`. There are lots of
available activation functions:
* Logistic
* UnitLinear
* BinaryStep
* Areasinus
* ...and so on

## Signals
`Signals` class represents numbers vector that can be used as input for
ANN (Artificial Neural Network). To create `Signals` you simply should pass numbers array
to the `Signals.create` static method:
```typescript
import { Signals } from 'fwd-ann';

const signals = new Signals([1, 0, 0, 1]);
```
You can also create `Signals` by passing `Matrix` to `Signal`'s class constructor. `Matrix` is a
special class that you can import from
[`matrix-calculus`](https://www.npmjs.com/package/matrix-calculus) library.
```typescript
import { Signals } from 'fwd-ann';
import { SingleColMatrixFactory } from 'matrix-calculus/factories';

const signalsMatrix = SingleColMatrixFactory.create([1, 0, 0, 1]);
const signals = new Signals(signalsMatrix);
```
You can pass second (optional) parameter to the `Signals.create` or `Signals`'s constructor that
represents names for every passed signal. In some cases it is useful to have signals' names.

## ANN, createANN
To create `ANN` object you can use `ANN` class or `createANN` utility. Prefer second one.
`ANN` instance represents Artificial Neural Network that can be taught by `Teacher`
and used to process some input `Signals` and respond with some output `Signals`.
```typescript
import createANN, { LayerType, activationFuncs } from 'fwd-ann';

const { ReLU } = activationFuncs;

const ann = createANN(
    {
        id: 'ExampleANN',
        layersData: [
            {
                type: LayerType.INPUT,
                unitsData: [{
                    qty: 6,
                    ActivationFunction: ReLU,
                }],
            },
            {
                type: LayerType.HIDDEN,
                unitsData: [{
                    qty: 7,
                    ActivationFunction: ReLU,
                }],
            },
            {
                type: LayerType.OUTPUT,
                unitsData: [{
                    qty: 1,
                    ActivationFunction: ReLU,
                }],
            },
        ],
    },
    {
        learningSpeed: .01,
    },
);
```
First parameter represents `data` of the Neural Network. Second parameter (optional) represents
parameters such as `learningSpeed`.

## Teacher
The `Teacher` is that core thing that teaches your Neural Network to perform
some actions you need. `Teacher`'s API is vary simple and allows you concentrate on
data and behavior but not on the teaching process implementation.
```typescript
import createANN, { Teacher } from 'fwd-ann';

const ann = createANN({
    id: 'ExampleANN',
    layersData: [/*...*/],
});

Teacher.teach({
    ann,
    sets: [/*...*/],
}).then(({ ann, log }) => {/*...*/});
```
**Do notice!** `Teacher` mutates your `ann` instance.

# GitHub repository
https://github.com/balovbohdan/fwd-ann

# Contributing
Pull requests are welcome. You can use this code freely for
your own projects and/or experiments. If you have some questions or proposals
feel free to message me.

# License
[MIT](https://choosealicense.com/licenses/mit/)
