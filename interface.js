var encrypt = require("./encrypt");
var Machine = require("./TPM");
var synchronize = require("./synchronize");

const k = 20, n = 10, l = 15; // Выбор параметров древовидной машины четности
const sendersMachine = new Machine.TPM(k, n, l); // Создание ДМЧ получателя
const recieversMachine = new Machine.TPM(k, n, l); // Созднание ДМЧ отправителя

let plainText = "Введите текст"; // Ввод открытого текста
console.log("Введенный открытый текст:\n\n", plainText); // Вывод открытого текста в консоль

encrypt.encrypt(sendersMachine, recieversMachine, plainText); // Запуск процедуры шифрования
// synchronize.runSync(sendersMachine, recieversMachine)
