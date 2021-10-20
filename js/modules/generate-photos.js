import {createPhotos} from './data.js';

const generatePhotos = () => {
  const templateFragment = document.querySelector('#picture').content;
  const template = templateFragment.querySelector('.picture');
  const fragment = document.createDocumentFragment();
  const pictures = document.querySelector('.pictures');

  const similarPhotos = createPhotos();

  similarPhotos.forEach(({url, likes, comments}) => {
    const photoElement = template.cloneNode(true);
    photoElement.href = url;
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').innerHTML = comments.length;
    fragment.appendChild(photoElement);
  });

  pictures.appendChild(fragment);
  return pictures;
};

export {generatePhotos};
