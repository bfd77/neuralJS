const theta = (t1, t2) => { // Функция, проверяющая равенство значений
  return t1 = t2 ? 1 : 0;
}

const hebbian = (weights, inputVector, outputValues, tau1, tau2, l) => { // Правило обучения Хебба
  const updateArray = (arr, indexOfNeuron) => { // Функция обновления весов одного нейрона
    return arr.map((valueOfWeight, index) => {
      let newValueOfWeight = valueOfWeight + tau1 *
        inputVector[indexOfNeuron][index] * theta(outputValues[indexOfNeuron], tau1); // Обновление текущего веса
      if (newValueOfWeight > l) { // Проверка вхождения в заданный диапазон
        newValueOfWeight = l;
      }
      if (newValueOfWeight < -l) {
        newValueOfWeight = -l;
      }
      return newValueOfWeight;
    })
  }
  return weights.map((array, indexOfNeuron) => updateArray(array, indexOfNeuron)); // Функция обновления всех нейронов и возвращение результата
}

const antiHebbian = (weights, inputVector, outputValues, tau1, tau2, l) => { // Анти-правило Хебба
  const updateArray = (arr, indexOfNeuron) => { // Функция обновления весов одного нейрона
    return arr.map((valueOfWeight, index) => {
      let newValueOfWeight = valueOfWeight - tau1 *
        inputVector[indexOfNeuron][index] * theta(outputValues[indexOfNeuron], tau1); // Обновление текущего веса
      if (newValueOfWeight > l) { // Проверка вхождения в заданный диапазон
        newValueOfWeight = l;
      }
      if (newValueOfWeight < -l) {
        newValueOfWeight = -l;
      }
      return newValueOfWeight;
    })
  }
  return weights.map((array, indexOfNeuron) => updateArray(array, indexOfNeuron)); // Функция обновления всех нейронов и возвращение результата
}

const randomWalk = (weights, inputVector, outputValues, tau1, tau2, l) => { // Правило случайного блуждания
  const updateArray = (arr, indexOfNeuron) => { // Функция обновления весов одного нейрона
    return arr.map((valueOfWeight, index) => {
      let newValueOfWeight = valueOfWeight -
        inputVector[indexOfNeuron][index] * theta(outputValues[indexOfNeuron], tau1); // Обновление текущего веса
      if (newValueOfWeight > l) { // Проверка вхождения в заданный диапазон
        newValueOfWeight = l;
      }
      if (newValueOfWeight < -l) {
        newValueOfWeight = -l;
      }
      return newValueOfWeight;
    })
  }
  return weights.map((array, indexOfNeuron) => updateArray(array, indexOfNeuron)); // Функция обновления всех нейронов и возвращение результата
}
module.exports.hebbian = hebbian;
module.exports.antiHebbian = antiHebbian;
module.exports.randomWalk = randomWalk;
