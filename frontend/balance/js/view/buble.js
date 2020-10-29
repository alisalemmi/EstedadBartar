import * as Motion from './motion';

import '../../../assets/img/emoji_very_sad.gif';
import '../../../assets/img/emoji_confuse.gif';

const DOM = {
  orient: document.querySelector('.orient'),
  range: document.querySelector('.range'),
  buble: document.querySelector('.buble')
};

let p = 0;
let v = 0;

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
  const limit = 50;
  const limitedDeg = Math.max(Math.min(deg, limit), -limit);
  const p2 =
    ((-limitedDeg / limit) * (DOM.orient.offsetWidth - DOM.buble.offsetWidth)) /
    2;

  v = (p2 - p) / 300;
};

export const animate = elapsedTime => {
  p += v * elapsedTime;
  DOM.buble.style.transform = `translateX(${p}px)`;
};

export const init = () => {
  Motion.addHandler(moveBuble, isNotSupported => {
    const err = document.querySelector('.error');
    err.style.visibility = 'visible';

    if (isNotSupported) {
      err.firstChild.src = 'img/emoji_very_sad.gif';
      err.lastChild.innerHTML =
        'برای انجام این بازی به حسگر حرکتی نیاز هست. ظاهرا دستگاه شما از این حسگر پشتیبانی نمی کند.';
    } else {
      err.firstChild.src = 'img/emoji_confuse.gif';
      err.lastChild.innerHTML =
        'برای انجام این بازی به حسگر حرکتی نیاز هست. لطفا اجازه دسترسی به این حسگر را بدهید.';
    }
  });
};

export const start = () => {
  v = 0;
  p = 0;
};

export const stop = () => {
  DOM.buble.style.transform = 'translateX(0px)';
};
