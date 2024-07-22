import { changeEffectLevel } from './slider.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];

const fileChooser = document.querySelector('.img-upload__start input[type="file"]');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');

const effectsItems = document.querySelectorAll('.effects__item');

const imgUploadCancelButton = document.querySelector('.img-upload__cancel');

function closeClickUploadImgHandler() {
  imgUploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
}

function closeKeyUploadImgHandler(evt) {
  if (evt.key === 'Escape') {
    imgUploadOverlay.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.querySelector('body').removeEventListener('keydown', closeClickUploadImgHandler);
    evt.target.value = '';
  }
}

//*** Изменение масштаба загружаемого изображения ***//

const imgUploadScale = document.querySelector('.img-upload__scale');
const scaleControl = document.querySelector('.scale__control--value');
let scaleControlNumber = scaleControl.value.slice(0, -1);

const MIN_SCALE = 25;
const MAX_SCALE = 100;
const STEP_SCALE = 5;

function changeScaleUploadImgHandler(evt) {
  if (evt.target.classList.contains('scale__control--smaller') && scaleControlNumber >= (MIN_SCALE + STEP_SCALE)) {
    scaleControlNumber -= STEP_SCALE;
  } else if (evt.target.classList.contains('scale__control--bigger') && scaleControlNumber <= (MAX_SCALE - STEP_SCALE)) {
    scaleControlNumber += STEP_SCALE;
  }
  scaleControl.value = `${scaleControlNumber}%`;
  imgUploadPreview.style.transform = `scale(${scaleControlNumber / 100})`;
}

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((elem) => fileName.endsWith(elem));

  if (matches) {
    imgUploadPreview.src = URL.createObjectURL(file);

    imgUploadOverlay.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');

    document.querySelector('.img-upload__effect-level').style.display = 'none';
    imgUploadPreview.classList = '';
    imgUploadPreview.style = null;
    imgUploadPreview.classList.add('effects__preview--none');

    effectsItems.forEach((item) => {

      const itemPreview = item.querySelector('.effects__preview');

      itemPreview.style.backgroundImage = `url('${imgUploadPreview.src}')`;

      item.addEventListener('change', (evt) => {
        imgUploadPreview.classList = '';
        const effect = evt.target.value;
        imgUploadPreview.classList.add(`effects__preview--${effect}`);

        if (effect === 'none') {
          document.querySelector('.img-upload__effect-level').style.display = 'none';
          imgUploadPreview.style.filter = null;
        } else {
          document.querySelector('.img-upload__effect-level').style.display = 'block';
          changeEffectLevel(effect);
        }
      });
    });

    imgUploadScale.addEventListener('click', changeScaleUploadImgHandler);
  }

});

imgUploadCancelButton.addEventListener('click', closeClickUploadImgHandler);
document.querySelector('body').addEventListener('keydown', closeKeyUploadImgHandler);

export { closeClickUploadImgHandler };
