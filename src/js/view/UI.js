import config from '../../config.json';

const DOM = {
  question: document.querySelector('.question'),
  answers: document.querySelectorAll('.answer'),
  correct: document.querySelector('.scoreboard__correct__number'),
  wrong: document.querySelector('.scoreboard__wrong__number'),
  total: document.querySelector('.scoreboard__total__number'),
  mute: document.querySelector('.mute')
};

let mute = false;

const sleep = time => {
  return new Promise(r =>
    setTimeout(() => {
      r();
    }, time)
  );
};

export const reset = () => {
  DOM.correct.innerHTML = '0';
  DOM.wrong.innerHTML = '0';
  DOM.total.innerHTML = '0';
};

const goOut = () => {
  DOM.question.classList.remove('puzzle--in--0');
  DOM.question.classList.add('puzzle--out--0');

  for (let i = 0; i < DOM.answers.length; i++) {
    DOM.answers[i].classList.remove(`puzzle--in--${i}`);
    DOM.answers[i].classList.add(`puzzle--out--${i}`);
  }
};

const comeIn = () => {
  DOM.question.classList.remove('puzzle--out--0');
  DOM.question.classList.add('puzzle--in--0');

  for (let i = 0; i < DOM.answers.length; i++) {
    DOM.answers[i].classList.remove(`puzzle--out--${i}`);
    DOM.answers[i].classList.add(`puzzle--in--${i}`);
  }
};

/**
 *
 * @param {{isColorMatter: boolean, question: {name: number, color: number}, answers: {name: number, color: number}[]}} question
 */
export const showQuestion = question => {
  // change question
  DOM.question.style.color = question.question.color;
  DOM.question.childNodes[0].innerHTML = question.question.name;
  DOM.question.childNodes[1].innerHTML = question.isColorMatter
    ? '<use xlink:href="../img/sprite.svg#ink"/>'
    : '<use xlink:href="../img/sprite.svg#pencil"/>';

  // change answer
  for (let i = 0; i < DOM.answers.length; i++) {
    DOM.answers[i].childNodes[1].innerHTML = question.answers[i].name;
    DOM.answers[i].childNodes[1].style.color = question.answers[i].color;

    DOM.answers[i].childNodes[2].innerHTML = '';
  }
};

/**
 * update score & play audio
 * @param {Element} target
 * @param {{isCorrect, correct, wrong, score}} result
 */
export const update = async (target, result, newQuestion) => {
  DOM.correct.innerHTML = result.correct;
  DOM.wrong.innerHTML = result.wrong;
  DOM.total.innerHTML = result.score;

  if (!mute) {
    new Audio(
      result.isCorrect ? './audio/correct.wav' : './audio/wrong.wav'
    ).play();
  }

  target.childNodes[2].innerHTML = result.isCorrect
    ? '<polyline class="check" fill="none" stroke="#4caf50" stroke-width="10" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>'
    : '<line class="cross--1" fill="none" stroke="#e91e63" stroke-width="10" stroke-linecap="round" stroke-miterlimit="10" x1="34.4" y1="37.9" x2="95.8" y2="92.3"/> <line class="cross--2" fill="none" stroke="#e91e63" stroke-width="10" stroke-linecap="round" stroke-miterlimit="10" x1="95.8" y1="38" x2="34.4" y2="92.2"/>';

  await sleep(config.questionShowSolution);
  goOut();

  await sleep(config.questionInOutDuration);
  showQuestion(newQuestion);

  await sleep(config.questionShowSolution);
  comeIn();
};

export const answersClickHandler = handler => {
  DOM.answers.forEach(el => el.addEventListener('click', handler));
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
