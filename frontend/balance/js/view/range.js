const DOM = {
  range: document.querySelector('.range'),
  puzzle: document.querySelector('.puzzle')
};

let v = 0.005;
let p = 0;
let w = 0;

let nextStep = 1000;

const getRandomSpeed = time => {
  const domain = 0.01 * Math.log10(time + 1) + 0.005;
  const s = Math.random() * domain - domain / 2;

  if (Math.abs(s) < 0.01) return Math.sign(s || 1) * 0.01;
  return s;
};

const getNextStep = time => {
  const min = 3500 - 100 * Math.log10(time + 1);
  const domain = 40 * Math.sqrt(time / 80);

  return Math.random() * domain + min;
};

const updateInfo = (time, elapsedTime) => {
  if (p + v * elapsedTime >= w || p + v * elapsedTime <= -w) v *= -0.9;

  // update position
  p += v * elapsedTime;

  // update speed
  if (time > nextStep) {
    nextStep += getNextStep(time);

    v = getRandomSpeed(time);
  }
};

const draw = () => {
  DOM.range.style.transform = `translateX(${p}px)`;
};

const clear = () => {
  v = getRandomSpeed(0);
  p = 0;
  w = (DOM.puzzle.offsetWidth - DOM.range.offsetWidth) / 2;

  nextStep = 1000;

  draw();
};

export const animate = (time, elapsedTime) => {
  updateInfo(time, elapsedTime);
  draw();
};

export const start = () => {
  clear();
};
