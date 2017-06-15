var Machine = require("./TPM");
var updateRules = require("./updateRules");
var myLib = require("./myLib");
var synchronize = require("./synchronize");
const k = 15, n = 5, l = 15;


// let weights = myLib.createRandomVector(k, n, l);
// let x = myLib.creareRandomBitVector(k, n);
//
// console.log(weights);
// console.log(x);
//
// let multiplied = myLib.multiply(weights, x);
// console.log(multiplied)
//
// let calculatedInputOfHiddenNeurons = myLib.sum(multiplied);
// console.log(calculatedInputOfHiddenNeurons)
//
// let outputValues = calculatedInputOfHiddenNeurons.map(value => myLib.sgn(value));
// console.log(outputValues)
//
// let outOfTPM = myLib.prod(outputValues);
// console.log(outOfTPM)
//
const Alice = new Machine.TPM(k, n, l);
const Bob = new Machine.TPM(k, n, l);
synchronize.runSync(Alice, Bob);
//
// console.log(myLib.areEqual(Alice.weights, Alice.weights))
