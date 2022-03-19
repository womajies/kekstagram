const bigPicture = document.querySelector('.big-picture');
const COMMENTS_MAX_VIEWS = 5;


const hiddenCommentCount = () => {
  document.querySelector('.social__comment-count').classList.add('hidden');
};

const hiddenCommentsLoader = () => {
  document.querySelector('.social__comments-loader').classList.add('hidden');
};

const showCommentCount = () => {
  document.querySelector('.social__comment-count').classList.remove('hidden');
};

const showCommentsLoader = () => {
  document.querySelector('.social__comments-loader').classList.remove('hidden');
};

const loadComments = () => {
  const socialList = document.querySelector('.social__comments');
  let hiddenSocialComments = socialList.querySelectorAll('.social__comment.hidden');

  hiddenSocialComments.forEach((comment, index) => {
    if (hiddenSocialComments.length < COMMENTS_MAX_VIEWS) {
      comment.classList.remove('hidden');
    } else if (index < COMMENTS_MAX_VIEWS) {
      comment.classList.remove('hidden');
    }
  });

  const socialComments = socialList.querySelectorAll('.social__comment');
  hiddenSocialComments = socialList.querySelectorAll('.social__comment.hidden');
  if (hiddenSocialComments.length === 0) {
    hiddenCommentsLoader();
  }
  document.querySelector('.social__comment-count').innerHTML = `${socialComments.length - hiddenSocialComments.length} из <span class="comments-count">${socialComments.length}</span> комментариев`;
};

const createComments = (picture) => {
  const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
  const fragment = document.createDocumentFragment();
  const socialList = document.querySelector('.social__comments');
  const commentsLoader = document.querySelector('.comments-loader');
  socialList.innerHTML = '';
  for (let index = 0; index < picture.comments.length; index++) {
    const commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = picture.comments[index].avatar;
    commentElement.querySelector('.social__picture').alt = picture.comments[index].name;
    commentElement.querySelector('.social__text').textContent = picture.comments[index].message;
    fragment.appendChild(commentElement);
  }
  socialList.appendChild(fragment);

  const socialComments = socialList.querySelectorAll('.social__comment');

  if (socialComments.length <= COMMENTS_MAX_VIEWS) {
    hiddenCommentCount();
    hiddenCommentsLoader();
  } else {
    showCommentCount();
    showCommentsLoader();
    socialComments.forEach((comment, index) => {
      if (index >= COMMENTS_MAX_VIEWS) {
        comment.classList.add('hidden');
      }
    });

    commentsLoader.addEventListener('click', loadComments);
  }
};

const fullSizePicture = (picture) => {
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__comment-count').innerHTML = `${COMMENTS_MAX_VIEWS} из <span class="comments-count">${picture.comments.length}</span> комментариев`;
  bigPicture.querySelector('.social__caption').textContent = picture.description;

  createComments(picture);
};

const closePicturePopup = () => {
  bigPicture.classList.add('hidden');
  document.querySelector('.comments-loader').removeEventListener('click', loadComments);
  document.querySelector('body').classList.remove('modal-open');
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onPopupEscKeydown);
};

const onPopupEscKeydown = (evt) => {
  if (evt.key === 'Escape' && !evt.target.matches('.social__footer-text')) {
    evt.preventDefault();
    closePicturePopup();
  }
};

const openPicturePopup = (picture) => {
  bigPicture.classList.remove('hidden');
  fullSizePicture(picture);

  document.querySelector('body').classList.add('modal-open');
  document.querySelector('#picture-cancel').addEventListener('click', closePicturePopup);
  document.addEventListener('keydown', onPopupEscKeydown);
};

export { fullSizePicture, openPicturePopup, closePicturePopup, hiddenCommentCount, hiddenCommentsLoader };
