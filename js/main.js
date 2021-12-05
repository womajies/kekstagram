import {generatePhotos} from './modules/generate-photos.js';
import {createPhotos} from './modules/data.js';
import './modules/form.js';

const similarPhotos = createPhotos();
const pictures = document.querySelector('.pictures');
pictures.appendChild(generatePhotos(similarPhotos));
