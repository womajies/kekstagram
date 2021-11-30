import {openPicturePopup, hiddenCommentCount, hiddenCommentsLoader} from './full-size-picture.js';

const templateFragment = document.querySelector('#picture').content;
const template = templateFragment.querySelector('.picture');

const generatePhoto = (picture) => {
  const photoElement = template.cloneNode(true);
  photoElement.href = picture.url;
  photoElement.querySelector('.picture__img').src = picture.url;
  photoElement.querySelector('.picture__likes').textContent = picture.likes;
  photoElement.querySelector('.picture__comments').innerHTML = picture.comments.length;
  photoElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    openPicturePopup(picture);
    hiddenCommentCount();
    hiddenCommentsLoader();
  });

  return photoElement;
};

const generatePhotos = (array) => {
  const fragment = document.createDocumentFragment();

  array.forEach((el) => {
    fragment.appendChild(generatePhoto(el));
  });

  return fragment;
};

export {generatePhoto, generatePhotos};
