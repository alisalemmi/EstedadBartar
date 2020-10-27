let time = 0;
let updater;

const DOM = {
  score: document.querySelector('.score').firstChild
};
export const getScore = () => Math.round(time / 100);

const reset = () => {
  time = 0;
  DOM.score.innerHTML = 0;
  clearInterval(updater);
};

const update = () => {
  time += 100;

  DOM.score.innerHTML = getScore();
};

export const start = () => {
  reset();
  updater = setInterval(update, 100);
};

export const stop = () => {
  clearInterval(updater);
};
