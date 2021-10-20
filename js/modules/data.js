import {getRandomPositiveInteger} from '../utils/get-random-positive-integer.js';
import {checkStringLength} from '../utils/check-string-length.js';

checkStringLength('ahaha', 3);

const SIMILAR_PHOTO_COUNT = 25;
const COMMENTS_MAX_COUNT = 5;

const DESCRIPTION = ['Ленивое описание помещения №1', 'Ленивое описание помещения №2', 'Ленивое описание помещения №3', 'Ленивое описание помещения №4', 'Ленивое описание помещения №5', 'Ленивое описание помещения №6', 'Ленивое описание помещения №7', 'Ленивое описание помещения №8', 'Ленивое описание помещения №9', 'Ленивое описание помещения №10', 'Ленивое описание помещения №11', 'Ленивое описание помещения №12', 'Ленивое описание помещения №13', 'Ленивое описание помещения №14', 'Ленивое описание помещения №15', 'Ленивое описание помещения №16', 'Ленивое описание помещения №17', 'Ленивое описание помещения №18', 'Ленивое описание помещения №19', 'Ленивое описание помещения №20', 'Ленивое описание помещения №21', 'Ленивое описание помещения №22', 'Ленивое описание помещения №23', 'Ленивое описание помещения №24', 'Ленивое описание помещения №25'];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Артем',
  'Кирилл',
  'Александр',
  'Константин',
  'Дмитрий',
  'Алексей',
];

const getRandomArrayElement = (array) => array[getRandomPositiveInteger(0, array.length - 1)];

const createComment = () => {
  return ({
    id: getRandomPositiveInteger(0, 2000),
    avatar: `img/avatar-${getRandomPositiveInteger(0, 6)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  });
};

const createPhoto = () => ({
  id: getRandomPositiveInteger(1, SIMILAR_PHOTO_COUNT),
  url: `photos/${getRandomPositiveInteger(1, SIMILAR_PHOTO_COUNT)}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomPositiveInteger(15, 200),
  comments: new Array(getRandomPositiveInteger(0, COMMENTS_MAX_COUNT)).fill(null).map(() => createComment()),
});

const createPhotos = () => {
  return new Array(SIMILAR_PHOTO_COUNT).fill(null).map(() => createPhoto());
}

export {createPhotos};
