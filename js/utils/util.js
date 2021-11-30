const inputError = (input) => {
  input.style.border = '2px solid red';
  input.style.outline = '1px solid white';
};

const inputErrorReset = (input) => {
  input.style.border = '2px solid black';
  input.style.outline = '1px solid white';
};

// Функция для проверки одинаковых хештегов в массиве
const checkSimilarHashTag = (array, item) => {
  const index = array.indexOf(item);
  const restOfArray = array.slice(index + 1, array.length);
  return restOfArray.includes(item);
};

export {inputError, inputErrorReset, checkSimilarHashTag};
