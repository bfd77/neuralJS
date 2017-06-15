const createRandomVector = (k, n, l = 1) => { // Функция генерации весовых коэффициентов
  let emptyArr = [];
  for (let i = 0; i < k; i++) { // k скрытых нейронов
    emptyArr[i] = [];
    for (let j = 0; j < n; j++) { // n входных нейронов для каждого k
      emptyArr[i][j] = Math.round(Math.random() * (2 * l)) - l;
    }
  }
  return emptyArr;
}

const creareRandomBitVector = (k, n) => { // Функция генерации значений входных нейронов
  const randVect = createRandomVector(k, n);
  return randVect.map(array => array.map(valueOfInput => sgn(valueOfInput)));
}

const multiplyOneDimArray = (arr1, arr2) => { // Функия поэлементного умножения одномерных массивов
  return arr1.map((element, index) => element * arr2[index]);
}
const multiplyTwoDimArray = (arr1, arr2) => { // Функия поэлементного умножения двумерных массивов
  return arr1.map((array, index) => multiplyOneDimArray(array, arr2[index]));
}

const sum = (arr) => { // Функция нахождения суммы произведений входного значения и весового коэффициента
  return arr.reduce((acc, array, index) => {
    const sumOfElements = array.reduce((acc, value) => acc + value, 0); // сумма элементов массива
    acc[index] = sumOfElements;
    return acc;
  }, []);
}

const sgn = (element) => { // Функция возвращающая знак числа
  return  element > 0 ? 1 : -1;
}

const prod = (arr) => { // Функция возращающая результат перемножения всех элементов массива
  return arr.reduce((acc, element) => acc * element, 1);
}

const areEqual = (arr1, arr2) => { // Функция нахождения разности соотвествующих элементов двумерных массивов
  const diffBetweenElements = (arr1, arr2) => {
    return arr1.map((value, index) => Math.abs(value - arr2[index]));
  }
  const totalDiff = arr1.map((array, indexOfArray) => diffBetweenElements(array, arr2[indexOfArray]));
  return sum(totalDiff).reduce((acc, value) => acc + value, 0) ===  0;
}

const flatArr = (arr) => { // Функция выпрямления двумерного массива
  return arr.reduce((acc, array) => {
    array.forEach(value => acc.push(value));
    return acc;
  }, [])
}

const encodeText = (text) => { // Функция кодирования текста
  return text.split('').map(char => char.charCodeAt());
}

const decodeText = (text) => { // Функция декодирования текста
  return text.map(encodedChar => String.fromCharCode(encodedChar)).join('');
}

module.exports.createRandomVector = createRandomVector;
module.exports.creareRandomBitVector = creareRandomBitVector;
module.exports.multiply = multiplyTwoDimArray;
module.exports.sum = sum;
module.exports.sgn = sgn;
module.exports.prod = prod;
module.exports.areEqual = areEqual;
module.exports.flatArr = flatArr;
module.exports.encodeText = encodeText;
module.exports.decodeText = decodeText;
