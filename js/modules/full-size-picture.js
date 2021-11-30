const bigPicture = document.querySelector('.big-picture');

const createComments = (picture) => {
  const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
  const fragment = document.createDocumentFragment();
  const socialList = document.querySelector('.social__comments');
  socialList.innerHTML = '';
  for (let index = 0; index < picture.comments.length; index++) {
    const commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = picture.comments[index].avatar;
    commentElement.querySelector('.social__picture').alt = picture.comments[index].name;
    commentElement.querySelector('.social__text').textContent = picture.comments[index].message;
    fragment.appendChild(commentElement);
  }
  socialList.appendChild(fragment);
};

const fullSizePicture = (picture) => {
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = picture.description;

  createComments(picture);
};

const closePicturePopup = () => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onPopupEscKeydown);
};

function onPopupEscKeydown (evt) {
  if (evt.key === 'Escape' && !evt.target.matches('.social__footer-text')) {
    evt.preventDefault();
    closePicturePopup();
  }
}

const openPicturePopup = (picture) => {
  bigPicture.classList.remove('hidden');
  fullSizePicture(picture);

  document.querySelector('body').classList.add('modal-open');
  document.querySelector('#picture-cancel').addEventListener('click', closePicturePopup);
  document.addEventListener('keydown', onPopupEscKeydown);
};

const hiddenCommentCount = () => {
  document.querySelector('.social__comment-count').classList.add('hidden');
};

const hiddenCommentsLoader = () => {
  document.querySelector('.social__comments-loader').classList.add('hidden');
};

export {fullSizePicture, openPicturePopup, closePicturePopup, hiddenCommentCount, hiddenCommentsLoader};
