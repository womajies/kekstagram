import {generatePhotos} from './modules/generate-photos.js';
import {getData} from './modules/api.js';
import {showAlert} from './utils/util.js';
import './modules/form.js';

getData(
  (data) => {
    const pictures = document.querySelector('.pictures');
    pictures.appendChild(generatePhotos(data));
  },
  () => {
    showAlert('Не удалось получить данные. Попробуйте ещё раз');
  },
);
