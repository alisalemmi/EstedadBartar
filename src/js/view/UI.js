import config from '../../config.json';

const DOM = {
  correct: document.querySelector('.scoreboard__correct__number'),
  wrong: document.querySelector('.scoreboard__wrong__number'),
  total: document.querySelector('.scoreboard__total__number'),
  mute: document.querySelector('.mute')
};

let mute = false;

export const reset = () => {
  DOM.correct.innerHTML = '0';
  DOM.wrong.innerHTML = '0';
  DOM.total.innerHTML = '0';
};

/**
 * update score & play audio
 * @param {Element} target
 * @param {{isCorrect, correct, wrong, score, newItem}} result
 */
export const update = (target, result) => {
  target.parentElement.classList.remove(
    'puzzle__item__box--correct',
    'puzzle__item__box--wrong'
  );

  target.style.transform = 'scale(0)';

  target.parentElement.classList.add(
    `puzzle__item__box${result.isCorrect ? '--correct' : '--wrong'}`,
    'puzzle__item__box--select'
  );

  setTimeout(() => {
    target.setAttribute('src', `./img/${result.newItem}.png`);
    target.setAttribute('alt', `Sample${result.newItem}`);
  }, config.puzzleItemChangeTime);

  setTimeout(() => {
    target.style.transform = 'scale(1)';
  }, config.puzzleItemChangeTime + 20);

  setTimeout(() => {
    target.parentElement.classList.remove('puzzle__item__box--select');
  }, config.puzzleItemSelectAnimation);

  DOM.correct.innerHTML = result.correct;
  DOM.wrong.innerHTML = result.wrong;
  DOM.total.innerHTML = result.score;

  if (!mute) {
    new Audio(
      result.isCorrect ? './audio/correct.wav' : './audio/wrong.wav'
    ).play();
  }
};

DOM.mute.addEventListener('click', () => {
  if (mute) {
    DOM.mute.innerHTML =
      '<svg class="icon"><use xlink:href="./img/sprite.svg#speaker"/></svg>';
    mute = false;
  } else {
    DOM.mute.innerHTML =
      '<svg class="icon"><use xlink:href="./img/sprite.svg#speaker-1"/></svg>';
    mute = true;
  }
});
