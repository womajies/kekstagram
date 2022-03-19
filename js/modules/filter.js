const filterItems = document.querySelectorAll('.img-filters__button');
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');

const resetActiveFilterItems = () => {
  filterItems.forEach((item) => item.classList.remove('img-filters__button--active'));
};

const setDefaultClick = (cb) => {
  filterDefault.addEventListener('click', (evt) => {
    resetActiveFilterItems();
    evt.target.classList.add('img-filters__button--active');

    cb();
  });
};

const setRandomClick = (cb) => {
  filterRandom.addEventListener('click', (evt) => {
    resetActiveFilterItems();
    evt.target.classList.add('img-filters__button--active');

    cb();
  });
};

const setDiscussedClick = (cb) => {
  filterDiscussed.addEventListener('click', (evt) => {
    resetActiveFilterItems();
    evt.target.classList.add('img-filters__button--active');

    cb();
  });
};

export { setDefaultClick, setRandomClick, setDiscussedClick };
