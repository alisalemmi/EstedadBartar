import * as circle from './circle';

// ----------------------------
//            config
// ----------------------------
const popupCloseDuration = 500;
// ----------------------------

const resetCircleDashArray = ring => {
  ring.style.transitionDelay = '0s';
  ring.style.transitionDuration = '0s';
  ring.setAttribute('stroke-dasharray', '0 283');
};

export const animate = (timer, value, total) => {
  const ring = timer.firstChild.firstChild.childNodes[1];

  // reset
  resetCircleDashArray(ring);

  timer.childNodes[1].innerHTML = value;
  circle.setRemainingPathColor(timer, value / total);

  // animate to score
  setTimeout(() => {
    ring.style.transitionDelay = `${popupCloseDuration}ms`;
    ring.style.transitionDuration = '0.5s';
    circle.setCircleDashArray(timer, value, total, false);
  }, 10);
};
