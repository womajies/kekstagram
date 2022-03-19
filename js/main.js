import { generatePhotos } from './modules/generate-photos.js';
import { getData } from './modules/api.js';
import { debounce } from './utils/debounce.js';
import { showAlert } from './utils/util.js';
import './modules/form.js';
import { setDefaultClick, setRandomClick, setDiscussedClick } from './modules/filter.js';
import './modules/select-file.js';

const RERENDER_DELAY = 500;

getData(
  (data) => {
    setDefaultClick(debounce(
      () => {
        generatePhotos(data);
      }, RERENDER_DELAY,
    ));
    setRandomClick(debounce(
      () => {
        generatePhotos(data);
      }, RERENDER_DELAY,
    ));
    setDiscussedClick(debounce(
      () => {
        generatePhotos(data);
      }, RERENDER_DELAY,
    ));
    generatePhotos(data);
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  },
  () => {
    showAlert('Не удалось получить данные. Попробуйте ещё раз');
  },
);
