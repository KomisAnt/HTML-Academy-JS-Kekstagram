import { renderUserPictures } from './render-posts.js';
import { debounce } from './utils.js';

const imgFilters = document.querySelector('.img-filters');

const imgFiltersForm = document.querySelector('.img-filters__form');

const imgfilterButtons = imgFiltersForm.querySelectorAll('.img-filters__button');

window.addEventListener('load', () => {
  imgFilters.classList.remove('img-filters--inactive');
});

function getRandomArray(array) {
  const arrayCopy = array.slice();

  const randomArray = [];

  for (let i = 1; i <= array.length; i++) {
    const randomNumber = Math.round(Math.random() * (arrayCopy.length - 1));
    randomArray.push(arrayCopy[randomNumber]);
    arrayCopy.splice(randomNumber, 1);
  }

  return randomArray.slice(0, 10);
}

function compareCommetsCount(postA, postB) {
  const commentsCountA = postA.comments.length;
  const commentsCountB = postB.comments.length;

  return commentsCountB - commentsCountA;
}

function removeActiveClass(buttons) {
  buttons.forEach((element) => {
    if (element.classList.contains('img-filters__button--active')) {
      element.classList.remove('img-filters__button--active');
    }
  });
}

function setFilterData(posts) {

  const FILTER_DATA_DELAY = 500;

  function handleFilterPictures(evt) {
    removeActiveClass(imgfilterButtons);

    const targetFilterButton = evt.target;
    targetFilterButton.classList.add('img-filters__button--active');

    const filterRandomArray = getRandomArray(posts);

    const discussedArray = posts.slice().sort(compareCommetsCount);

    switch (targetFilterButton.id) {
      case 'filter-random': renderUserPictures(filterRandomArray);
        break;
      case 'filter-default': renderUserPictures(posts);

        break;
      case 'filter-discussed': renderUserPictures(discussedArray);
    }
  }

  const debounceHandleFilterPictures = debounce(handleFilterPictures, FILTER_DATA_DELAY);

  imgFiltersForm.addEventListener('click', debounceHandleFilterPictures);

}

export { setFilterData };
