import '../nouislider/nouislider.js';

const effectLevelSlider = document.querySelector('.effect-level__slider');

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

function changeEffectLevel(effect) {

  const effectFilter = document.querySelector(`.effects__preview--${effect}`);

  switch (effect) {
    case 'chrome':
    case 'sepia': {
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1
        },
        step: 0.1,
        start: 1
      });
    }
      break;
    case 'marvin': {
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100
        },
        step: 1,
        start: 100
      });
    }
      break;
    case 'phobos': {
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3
        },
        step: 0.1,
        start: 3
      });
    }
      break;
    case 'heat': {
      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3
        },
        step: 0.1,
        start: 3
      });
    }
      break;
  }

  effectLevelSlider.noUiSlider.on('update', () => {
    const filterValue = effectLevelSlider.noUiSlider.get();
    switch (effect) {
      case 'chrome': effectFilter.style.filter = `grayscale(${filterValue})`;
        break;
      case 'sepia': effectFilter.style.filter = `sepia(${filterValue})`;
        break;
      case 'marvin': effectFilter.style.filter = `invert(${filterValue}%)`;
        break;
      case 'phobos': effectFilter.style.filter = `blur(${filterValue}px)`;
        break;
      case 'heat': effectFilter.style.filter = `brightness(${filterValue})`;
        break;
    }
  });
}

export { changeEffectLevel };
