import '../pristine/pristine.min.js';
import { closeClickUploadImgHandler } from './upload-picture.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const hashTagInput = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

const MAX_LENGTH_DESCRIPTION = 140;

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__text-item',
  errorClass: 'img-upload__text--invalid',
  successClass: 'img-upload__text--valid',
  errorTextParent: 'img-upload__text-item',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__text-error'
}, true);

function viewSuccessMessage() {
  const successTemplate = document.querySelector('#success').content;
  const successMessage = successTemplate.cloneNode(true);
  const successButton = successMessage.querySelector('.success__button');
  document.querySelector('body').append(successMessage);
  successButton.addEventListener('click', () => {
    const successSection = document.querySelector('.success');
    document.querySelector('body').removeChild(successSection);
  });
}

function validateHashtag() {
  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  if (hashTagInput.value.length > 0) {
    return re.test(hashTagInput.value);
  }
  return true;
}

pristine.addValidator(
  hashTagInput,
  validateHashtag,
  'hastag must be start at "#" & should be no more than 20 characters long'
);

function validateTextDescription() {
  return textDescription.value.length <= MAX_LENGTH_DESCRIPTION;
}

pristine.addValidator(
  textDescription,
  validateTextDescription,
  'the text should be no more than 140 characters long'
);

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    const formData = new FormData(evt.target);

    fetch(
      'https://25.javascript.htmlacademy.pro/kekstagram',
      {
        method: 'POST',
        body: formData
      },
    )
      .then((response) => {
        if (response.ok) {
          closeClickUploadImgHandler();
          viewSuccessMessage();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
});

