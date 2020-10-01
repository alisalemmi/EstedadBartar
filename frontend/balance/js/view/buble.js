import * as Motion from './motion';

const DOM = {
  orient: document.querySelector('.orient'),
  range: document.querySelector('.range'),
  buble: document.querySelector('.buble')
};

let running = false;

/**
 * return `true` if buble is in range
 */
export const bubleInRange = () => {
  const b = DOM.buble.getBoundingClientRect();
  const r = DOM.range.getBoundingClientRect();

  return b.left >= r.left && b.right <= r.right;
};

/**
 * move buble in the screen.
 * @param {Number} deg degree of the `x` axis
 */
const moveBuble = deg => {
  if (!running) return;

  const limit = 50;
  const limitedDeg = Math.max(Math.min(deg, limit), -limit);

  DOM.buble.style.transform = `translateX(${
    ((-limitedDeg / limit) * (DOM.orient.offsetWidth - DOM.buble.offsetWidth)) /
    2
  }px)`;
};

export const start = () => {
  running = true;
  Motion.addHandler(moveBuble);
};

export const stop = () => {
  running = false;

  DOM.range.style.transform = '';
  DOM.buble.style.transform = '';
};
