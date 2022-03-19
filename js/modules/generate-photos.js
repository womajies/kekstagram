import { openPicturePopup } from './full-size-picture.js';

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
  });

  return photoElement;
};

const comparePhotos = (photoA, photoB) => {
  const filterRandom = document.querySelector('#filter-random');
  const filterDiscussed = document.querySelector('#filter-discussed');

  if (filterRandom.classList.contains('img-filters__button--active')) {
    return 0.5 - Math.random();
  } else if (filterDiscussed.classList.contains('img-filters__button--active')) {
    return photoB.comments.length - photoA.comments.length;
  } else {
    return 0;
  }
};

const generatePhotos = (array) => {
  const fragment = document.createDocumentFragment();

  array
    .slice()
    .sort(comparePhotos)
    .forEach((el) => {
      fragment.appendChild(generatePhoto(el));
    });

  const pictures = document.querySelector('.pictures');
  pictures.querySelectorAll('.picture').forEach((el) => el.remove());
  pictures.appendChild(fragment);
};

export { generatePhoto, generatePhotos };
