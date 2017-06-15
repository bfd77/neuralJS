var Machine = require("./TPM");
var updateRules = require("./updateRules");
var myLib = require("./additionalLibrary");


const sync = (sendersMachine, recieversMachine) => {
  const maxNumberOfIterations = Math.pow(sendersMachine.l, 4) * // макисмальное количество итераций синхронизации
                                sendersMachine.k * sendersMachine.n;
  let syncStatus = false; // статус синхронизации
  let counter = 0; // счетчик подсчитывающий количество синхронизаций
  console.log("\nЗапущена процедура синхронизации\n", "Статус синхронизации:", syncStatus)
  for (let i = 0; i < maxNumberOfIterations; i++) {

      if (syncStatus) { // проверка статуса синхронизации
        console.log("Синхронизация прошла успешно\n", "Статус синхронизации:", syncStatus);
        console.log("Количество выполненных шагов синхронизации", counter);
        // console.log("Веса отправителя\n", sendersMachine.weights);
        // console.log("Веса получателя\n", recieversMachine.weights);

        return sendersMachine.weights;
      }
      let x = myLib.creareRandomBitVector(sendersMachine.k, sendersMachine.n); // инициализация случайного входного вектора
      let aliceOutput = sendersMachine.getOutput(x); // вычисление значения выходного нейрона отправителя
      let bobOutput = recieversMachine.getOutput(x); // вычисление значения выходного нейрона получателя
      if (aliceOutput === bobOutput) { // проеверка равенства значений выходных нейронов
        sendersMachine.update(); // обновление весов отправителя
        recieversMachine.update(); // обновление весов получателя
      }
      if (myLib.areEqual(sendersMachine.weights, recieversMachine.weights)) { // проверка равенства весов получателя и отправителя
        syncStatus = true;
      }
      counter++; // обновление счетчика
    }
}

module.exports.runSync = sync;
