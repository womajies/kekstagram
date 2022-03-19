import {getRandomPositiveInteger} from '../utils/get-random-positive-integer.js';


const SIMILAR_PHOTO_COUNT = 25;
const COMMENTS_MAX_COUNT = 20;

const DESCRIPTION = ['Ленивое описание №1', 'Ленивое описание №2', 'Ленивое описание №3', 'Ленивое описание №4', 'Ленивое описание №5', 'Ленивое описание №6'];

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

const CreateComment = function() {
  this.id = getRandomPositiveInteger(0, 2000);
  this.avatar = `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`;
  this.message = getRandomArrayElement(MESSAGES);
  this.name = getRandomArrayElement(NAMES);
};

const CreatePhoto = function(){
  this.id = getRandomPositiveInteger(1, SIMILAR_PHOTO_COUNT);
  this.url = `photos/${getRandomPositiveInteger(1, SIMILAR_PHOTO_COUNT)}.jpg`;
  this.description = getRandomArrayElement(DESCRIPTION);
  this.likes = getRandomPositiveInteger(15, 200);
  this.comments = new Array(getRandomPositiveInteger(0, COMMENTS_MAX_COUNT)).fill(null).map(() => new CreateComment());
};

const createPhotos = () => new Array(SIMILAR_PHOTO_COUNT).fill(null).map(() => new CreatePhoto());

export {createPhotos, COMMENTS_MAX_COUNT};
