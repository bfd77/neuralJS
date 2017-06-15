var Machine = require("./TPM");
var updateRules = require("./updateRules");
var myLib = require("./additionalLibrary");
var synchronize = require("./synchronize");


const encrypt = (sendersMachine, recieversMachine, plainText) => { // Функция шифрования текстовой информации

  const encodedPlainText = myLib.encodeText(plainText); // Кодирование открытого текста
  console.log("\nЗакодированный открытый текст:\n\n", encodedPlainText)
  const preKey = synchronize.runSync(sendersMachine, recieversMachine); // Выработка ключа шифрования
  console.log("\nКлюч шифрования:\n\n", preKey)
  const key = myLib.flatArr(preKey); // Конвертация ключа шифрования в двоичное представление
  const cipherText = encodedPlainText.map((encodedChar, index) => encodedChar ^ key[index]); // Шифртекст
  console.log("\nЗашифрованная информация в кодовом представлении:\n\n", cipherText)
  console.log("\nЗашифрованная информация в символьном представлении:\n\n", myLib.decodeText(cipherText))
  const decryptedText = cipherText.map((encryptedChar, index) => encryptedChar ^ key[index]); // Расшифрованный текст
  console.log("\nРасшифрованный закодированный открытый текст:\n\n", decryptedText)
  const decodedText = myLib.decodeText(decryptedText); // Декодированный расшифрованных текст
  console.log("\nРасшифрованный открытый текст:\n\n", decodedText, '\n')
  return;

}

module.exports.encrypt = encrypt;
