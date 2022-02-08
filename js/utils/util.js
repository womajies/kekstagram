import {closeUploadPopup} from '../modules/form.js';

const ALERT_SHOW_TIME = 5000;

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

const destroyFilter = () => {
  const slider = document.querySelector('.effect-level__slider');
  const uploadImage = document.querySelector('.img-upload__preview img');

  if (slider.noUiSlider) {
    slider.noUiSlider.destroy();
  }
  uploadImage.style.filter = 'none';
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const onSuccessMsgClick = (evt) => {
  if (evt.target.closest('.success__inner') === null) {
    // eslint-disable-next-line no-use-before-define
    closeSuccessMsg();
  }
};

const onSuccessMsgEscKeydown = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    // eslint-disable-next-line no-use-before-define
    closeSuccessMsg();
  }
};


function closeSuccessMsg () {
  document.body.querySelector('.success').remove();
  document.removeEventListener('click', onSuccessMsgClick);
  document.removeEventListener('keydown', onSuccessMsgEscKeydown);
}

const openSuccessMsg = () => {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const successElement = successTemplate.cloneNode(true);
  document.body.appendChild(successElement);

  document.addEventListener('keydown', onSuccessMsgEscKeydown);

  successElement.querySelector('.success__button').addEventListener('click', closeSuccessMsg);

  document.addEventListener('click', onSuccessMsgClick);

  closeUploadPopup();
};

const onErrorMsgClick = (evt) => {
  if (evt.target.closest('.error__inner') === null) {
    // eslint-disable-next-line no-use-before-define
    closeErrorMsg();
  }
};

const onErrorMsgEscKeydown = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    // eslint-disable-next-line no-use-before-define
    closeErrorMsg();
  }
};

const closeErrorMsg = () => {
  document.body.querySelector('.error').remove();
  document.removeEventListener('click', onErrorMsgClick);
  document.removeEventListener('keydown', onErrorMsgEscKeydown);
};

const openErrorMsg = () => {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorElement = errorTemplate.cloneNode(true);
  document.body.appendChild(errorElement);

  document.addEventListener('keydown', onErrorMsgEscKeydown);

  errorElement.querySelector('.error__button').addEventListener('click', closeErrorMsg);

  document.addEventListener('click', onErrorMsgClick);

  closeUploadPopup();
};

export {inputError, inputErrorReset, checkSimilarHashTag, showAlert, destroyFilter, openSuccessMsg, openErrorMsg};
