var myLib = require("./additionalLibrary"); // Импорт дополнительной библиотеки
var updateRules = require("./updateRules"); // Импорт правил обучения

class Machine {
  constructor(k, n, l) {
    this.k = k; /* количество скрытых нейронов*/
    this.n = n; /* количество входных нейронов в один скрытый нейрон*/
    this.l = l; /* диапазон значений весов */
    this.weights = myLib.createRandomVector(this.k, this.n, this.l) /* начальные веса */
  }

  getOutput(X) { // Метод расчета выходного значения ДМЧ

    this.inputVector = X; // случайный входной вектор

    const calculatedWeights = myLib.multiply(this.inputVector, this.weights); // Умножение весов на входной вектор
    const inputValues = myLib.sum(calculatedWeights); // Сумма произведений
    const outputValues = inputValues.map(value => myLib.sgn(value)); // Массив значений скрытых нейронов
    this.outputValues = outputValues;
    const tau = myLib.prod(outputValues); // Произведение всех скрытых нейронов

    this.tau = tau; // выходное значение TPM

    return tau;
  }

  update(tau2, rule = "hebbian") { // Метод обновления весовых коэффициентов
    if (rule === "hebbian") {
      this.weights = updateRules.hebbian(this.weights, this.inputVector,
        this.outputValues, this.tau, tau2, this.l);
    }
    if (rule === "antiHebbian") {
      this.weights = updateRules.antiHebbian(this.weights, this.inputVector,
        this.outputValues, this.tau, tau2, this.l);
    }
    if (rule === "randomWalk") {
      this.weights = updateRules.hebbian(this.weights, this.inputVector,
        this.outputValues, this.tau, tau2, this.l);
    }
  }
}

module.exports.TPM = Machine; // Экспорт класса
