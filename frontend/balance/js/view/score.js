let time = 0;
let updater;

const DOM = {
  score: document.querySelector('.score').firstChild
};
export const getScore = () => Math.round(time / 100);

const update = () => {
  time += 100;

  DOM.score.innerHTML = getScore();
};

export const start = () => {
  time = 0;
  DOM.score.innerHTML = 0;
  updater = setInterval(update, 100);
};

export const stop = () => {
  time = 0;
  clearInterval(updater);
};
