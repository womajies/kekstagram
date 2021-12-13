import {inputError, inputErrorReset, checkSimilarHashTag} from '../utils/util.js';

const fileUpload = document.querySelector('#upload-file');
const fileUploadOverlay = document.querySelector('.img-upload__overlay');
const hashTagsInput = fileUploadOverlay.querySelector('.text__hashtags');
const textDescription = fileUploadOverlay.querySelector('.text__description');
const effectsForm = document.querySelector('.effects');
const uploadImage = document.querySelector('.img-upload__preview img');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const MIN_SCALE_VALUE = 0;
const MAX_SCALE_VALUE = 100;
const re = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;
const MAX_HASHTAG_LENGTH = 20;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LETTER = 140;

const scaleSmaller = () => {
  const scaleControlValueNumber = Number(scaleControlValue.value.slice(0, -1));

  if (scaleControlValueNumber > MIN_SCALE_VALUE) {
    scaleControlValue.value = `${scaleControlValueNumber - 25}%`;
    uploadImage.style.transform = `scale(${(scaleControlValueNumber - 25) / MAX_SCALE_VALUE})`;
  }
};

const scaleBigger = () => {
  const scaleControlValueNumber = Number(scaleControlValue.value.slice(0, -1));

  if (scaleControlValueNumber < MAX_SCALE_VALUE) {
    scaleControlValue.value = `${scaleControlValueNumber + 25}%`;
    uploadImage.style.transform = `scale(${(scaleControlValueNumber + 25) / MAX_SCALE_VALUE})`;
  }
};

const effectsHandler = (evt) => {
  const slider = document.querySelector('.effect-level__slider');
  const sliderValue = document.querySelector('.effect-level__value');

  uploadImage.removeAttribute('class');

  if (!slider.noUiSlider) {
    noUiSlider.create(slider, {
      start: 1,
      connect: 'lower',
      range: {
        'min': 0,
        'max': 1,
      },
      step: 0.1,
    });
    slider.noUiSlider.on('update', (values, handle, unencoded) => {
      sliderValue.value = `${unencoded[handle]}`;

      if (uploadImage.classList.contains('effects__preview--chrome')) {
        uploadImage.style.filter = `grayscale(${unencoded[handle]})`;
      } else if (uploadImage.classList.contains('effects__preview--sepia')) {
        uploadImage.style.filter = `sepia(${unencoded[handle]})`;
      } else if (uploadImage.classList.contains('effects__preview--marvin')) {
        uploadImage.style.filter = `invert(${unencoded[handle]}%)`;
      } else if (uploadImage.classList.contains('effects__preview--phobos')) {
        uploadImage.style.filter = `blur(${unencoded[handle]}px)`;
      } else if (uploadImage.classList.contains('effects__preview--heat')) {
        uploadImage.style.filter = `brightness(${unencoded[handle]})`;
      }
    });
  }
  if (evt.target.value !== 'none') {
    uploadImage.classList.add(`effects__preview--${evt.target.value}`);

    switch (evt.target.value) {
      case 'chrome':
      case 'sepia':
        slider.noUiSlider.updateOptions({
          start: 1,
          step: 0.1,
          range: {
            'min': 0,
            'max': 1,
          },
        });
        break;
      case 'marvin':
        slider.noUiSlider.updateOptions({
          start: 100,
          step: 1,
          range: {
            'min': 0,
            'max': 100,
          },
        });
        break;
      case 'phobos':
        slider.noUiSlider.updateOptions({
          start: 3,
          step: 1,
          range: {
            'min': 0,
            'max': 3,
          },
        });
        break;
      case 'heat':
        slider.noUiSlider.updateOptions({
          start: 3,
          step: 0.1,
          range: {
            'min': 1,
            'max': 3,
          },
        });
        break;
    }
  } else {
    slider.noUiSlider.destroy();
    uploadImage.style.filter = 'none';
  }
};

const hashTagsHandler = () => {
  const inputHashTagArray = hashTagsInput.value.trim().replace(/\s+/g, ' ').toLowerCase().split(' ');

  const checkHashTagsInput = () => {
    inputHashTagArray.forEach((el) => {
      if (!re.test(el) && hashTagsInput.value.length > 0) {
        inputError(hashTagsInput);
      } else {
        inputErrorReset(hashTagsInput);
      }
      if (checkSimilarHashTag(inputHashTagArray, el)) {
        hashTagsInput.setCustomValidity('Один и тот же хэштег не может быть использован дважды');
        inputError(hashTagsInput);
      } else if (el.match(/^#$/) && el.length < MIN_HASHTAG_LENGTH) {
        hashTagsInput.setCustomValidity('Хэштег не может состоять только из одной решётки');
      } else if (el.length > MAX_HASHTAG_LENGTH) {
        hashTagsInput.setCustomValidity(
          `Превышена максимальная длина хэштега. 
          Удалите ${el.length - MAX_HASHTAG_LENGTH} символ(-ов).`);
      } else if (el.substr(1, el.length).includes('#')) {
        hashTagsInput.setCustomValidity('Символ "#" (решётка) может быть только первым по счету в хэштеге');
      } else if (el[0] !== '#' && el.length > 0) {
        hashTagsInput.setCustomValidity('Хэштег должен начинаться с символа # (решётка)');
      } else if(!el.match(re) && hashTagsInput.value.length > 0) {
        hashTagsInput.setCustomValidity('Хэштег должен состоять из решётки, букв и чисел');
      } else {
        hashTagsInput.setCustomValidity('');
      }
    });
  };

  if (inputHashTagArray.length > MAX_HASHTAG_COUNT) {
    hashTagsInput.setCustomValidity(`Нельзя указать больше  ${MAX_HASHTAG_COUNT} хэштегов`);
  } else {
    checkHashTagsInput();
  }

  hashTagsInput.reportValidity();
};

const commentHandler = () => {
  if (textDescription.value.length > MAX_COMMENT_LETTER) {
    textDescription.setCustomValidity(
      `Превышена максимальная длина комментария. 
      Удалите ${textDescription.value.length - MAX_COMMENT_LETTER} символ(-ов).`);
    inputError(textDescription);
  } else {
    textDescription.setCustomValidity('');
    inputErrorReset(textDescription);
  }

  textDescription.reportValidity();
};

const closeUploadPopup = () => {
  fileUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onUploadEscKeydown);
  scaleControlSmaller.removeEventListener('click', scaleSmaller);
  scaleControlBigger.removeEventListener('click', scaleBigger);
  effectsForm.removeEventListener('change', effectsHandler);
  hashTagsInput.removeEventListener('input', hashTagsHandler);
  textDescription.removeEventListener('input', commentHandler);
  uploadImage.removeAttribute('class');
  uploadImage.style.filter = 'none';
  fileUpload.value = null;
  hashTagsInput.value = null;
  textDescription.value = null;
  fileUploadOverlay.querySelector('#effect-none').checked = true;
  inputErrorReset(hashTagsInput);
  inputErrorReset(textDescription);
};

function onUploadEscKeydown (evt) {
  if (evt.key === 'Escape' && !evt.target.matches('input[class="text__hashtags"]') && !evt.target.matches('textarea')) {
    evt.preventDefault();
    closeUploadPopup();
  }
}

const openUploadPopup = () => {
  fileUploadOverlay.classList.remove('hidden');

  document.body.classList.add('modal-open');
  document.querySelector('#upload-cancel').addEventListener('click', closeUploadPopup);
  document.addEventListener('keydown', onUploadEscKeydown);

  scaleControlSmaller.addEventListener('click', scaleSmaller);
  scaleControlBigger.addEventListener('click', scaleBigger);
  effectsForm.addEventListener('change', effectsHandler);
  hashTagsInput.addEventListener('input', hashTagsHandler);
  textDescription.addEventListener('input', commentHandler);
};

fileUpload.addEventListener('change', openUploadPopup);
