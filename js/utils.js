//*** Close big picture ***//

function closeBigPictureHandler() {
  const bigPictureContainer = document.querySelector('.big-picture');
  const buttonClosePicture = document.querySelector('.big-picture__cancel');
  bigPictureContainer.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  buttonClosePicture.removeEventListener('click', closeBigPictureHandler);
}

function closeKeyBigPictureHandler(evt) {
  const bigPictureContainer = document.querySelector('.big-picture');
  if (evt.key === 'Escape') {
    bigPictureContainer.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.querySelector('body').removeEventListener('keydown', closeKeyBigPictureHandler);
  }
}

//*** Render user photos in main window ***//

const userPicturesContainer = document.querySelector('.pictures');

function renderPicture({ url, description, comments, likes }) {
  const postTemplate = document.querySelector('#picture').content;
  const post = postTemplate.cloneNode(true);
  post.querySelector('.picture__img').src = url;
  post.querySelector('.picture__img').alt = description;
  post.querySelector('.picture__comments').textContent = comments.length;
  post.querySelector('.picture__likes').textContent = likes;

  userPicturesContainer.append(post);
}

//*** Debounce ***/

function debounce(callback, timeoutDelay) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {
  closeBigPictureHandler,
  renderPicture,
  closeKeyBigPictureHandler,
  debounce
};
