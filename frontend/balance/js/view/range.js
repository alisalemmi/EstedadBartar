const DOM = {
  range: document.querySelector('.range'),
  puzzle: document.querySelector('.puzzle')
};

let v = 0.05;
let p = 0;
let w = 0;

const updateInfo = (time, elapsedTime) => {
  if (p + v * elapsedTime >= w || p + v * elapsedTime <= -w) v *= -0.9;

  // update position
  p += v * elapsedTime;

  // update speed
};

const draw = () => {
  DOM.range.style.transform = `translateX(${p}px)`;
};

const clear = () => {
  v = 0.05;
  p = 0;
  w = (DOM.puzzle.offsetWidth - DOM.range.offsetWidth) / 2;

  draw();
};

export const animate = (time, elapsedTime) => {
  updateInfo(time, elapsedTime);
  draw();
};

export const start = () => {
  clear();
};
