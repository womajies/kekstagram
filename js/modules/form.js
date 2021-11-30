import {inputError, inputErrorReset, checkSimilarHashTag} from '../utils/util.js';

const fileUpload = document.querySelector('#upload-file');
const fileUploadOverlay = document.querySelector('.img-upload__overlay');
const hashTagsInput = fileUploadOverlay.querySelector('.text__hashtags');
const textDescription = fileUploadOverlay.querySelector('.text__description');
const re = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;
const MAX_HASHTAG_LENGTH = 20;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LETTER = 140;

const editImage = () => {

};

const closeUploadPopup = () => {
  fileUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onUploadEscKeydown);
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

const openUploadPopup = (picture) => {
  fileUploadOverlay.classList.remove('hidden');
  editImage(picture);

  document.body.classList.add('modal-open');
  document.querySelector('#upload-cancel').addEventListener('click', closeUploadPopup);
  document.addEventListener('keydown', onUploadEscKeydown);
};

fileUpload.addEventListener('change', () => {
  openUploadPopup();
});

hashTagsInput.addEventListener('input', () => {
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
});

textDescription.addEventListener('input', () => {
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
});
