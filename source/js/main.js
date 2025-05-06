import { renderUserPictures } from './render-posts.js';
import { getData } from './api.js';
import './upload-picture.js';
import './slider.js';
import './validate-form.js';
import { setFilterData } from './filters-img.js';


getData((posts) => {
  renderUserPictures(posts);
  setFilterData(posts);
});
