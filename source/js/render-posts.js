import { renderPicture, closeKeyBigPictureHandler, closeBigPictureHandler } from './utils.js';

const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureImgContainer = bigPictureContainer.querySelector('.big-picture__img');
const bigPictureImg = bigPictureImgContainer.querySelector('img');

const userPicturesContainer = document.querySelector('.pictures');

const commentsLoaderButton = bigPictureContainer.querySelector('.comments-loader');


const VIEW_CURRENT_COMMENT_COUNT = 5;

function deleteCurrentPictures() {
  const viewedPictures = userPicturesContainer.querySelectorAll('.picture');
  if (viewedPictures) {
    viewedPictures.forEach((picture) => {
      picture.remove();
    });
  }
}

function renderUserPictures(userPictures) {

  const userPicturesCopy = userPictures.slice();

  deleteCurrentPictures();

  userPicturesCopy.forEach((picture) => {
    renderPicture(picture);
  });

  function getCurrentArray(array, src) {
    const currentArray = array.filter((item) => src.includes(item.url));
    return currentArray;
  }

  //*** Отрисовывает комментарии на странице ***//

  function viewBigPhotoSocialComments(comments, commentCountViewed) {
    const commentsContainer = bigPictureContainer.querySelector('.social__comments');
    commentsContainer.innerHTML = '';

    const currentCommentCount = comments.length;

    if (currentCommentCount > commentCountViewed) {
      bigPictureContainer.querySelector('.social__comment-count').textContent =
        `${commentCountViewed} из ${currentCommentCount} комментариев`;
    } else {
      commentCountViewed = currentCommentCount;
      bigPictureContainer.querySelector('.social__comment-count').textContent =
        `${currentCommentCount} из ${currentCommentCount} комментариев`;
      commentsLoaderButton.classList.add('comments-loader--disabled');
    }

    const commentsRender = comments.slice(0, commentCountViewed);

    const commentsString = commentsRender.map(({ avatar, message, name }) =>
      `<li class="social__comment">
          <img class="social__picture" src=${avatar} alt=${name} width="35" height="35">
          <p class="social__text">${message}</p>
      </li>`).join('');

    commentsContainer.insertAdjacentHTML('beforeend', commentsString);
  }

  function viewBigPhotoContent({ comments, description, likes }) {
    bigPictureContainer.querySelector('.social__caption').textContent = description;
    bigPictureContainer.querySelector('.likes-count').textContent = likes;

    if (commentsLoaderButton.classList.contains('comments-loader--disabled')) {
      commentsLoaderButton.classList.remove('comments-loader--disabled');
    }

    let count = VIEW_CURRENT_COMMENT_COUNT;

    viewBigPhotoSocialComments(comments, count);

    function loadMoreCommentsHandler() {
      count += VIEW_CURRENT_COMMENT_COUNT;
      viewBigPhotoSocialComments(comments, count);
      if (count >= comments.length) {
        count = VIEW_CURRENT_COMMENT_COUNT;
        commentsLoaderButton.removeEventListener('click', loadMoreCommentsHandler);
      }
    }
    commentsLoaderButton.addEventListener('click', loadMoreCommentsHandler);
  }

  // Находим отрисованные фото

  const viewedPictures = document.querySelectorAll('.picture');

  viewedPictures.forEach((picture) => {
    // Open big Photo
    picture.addEventListener('click', (evt) => {
      const buttonClosePicture = document.querySelector('.big-picture__cancel');

      bigPictureContainer.classList.remove('hidden');
      document.querySelector('body').classList.add('modal-open');

      bigPictureImg.src = evt.target.src;

      buttonClosePicture.addEventListener('click', closeBigPictureHandler);
      document.querySelector('body').addEventListener('keydown', closeKeyBigPictureHandler);

      const currentBigPhotoData = getCurrentArray(userPicturesCopy, evt.target.src);
      viewBigPhotoContent(currentBigPhotoData[0]);
    });
  });

}

export { renderUserPictures };
