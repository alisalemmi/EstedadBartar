export const setCircleDashArray = (timer, remain, total, fullOnZero) => {
  const ring = timer.firstChild.firstChild.childNodes[1];
  const svg = timer.firstChild;

  const absRemain = Math.abs(remain);
  ring.setAttribute(
    'stroke-dasharray',
    `${(((absRemain - 1 + absRemain / total) / total) * 283).toFixed(0)} 283`
  );

  if (remain) {
    svg.style.transform = `scaleX(${Math.sign(-remain)})`;
    ring.style.visibility = 'visible';
  } else if (!fullOnZero) ring.style.visibility = 'hidden';
};

export const setRemainingPathColor = (timer, timeRemainPercent) => {
  const ring = timer.firstChild.firstChild.childNodes[1];

  if (timeRemainPercent <= 0.2) {
    ring.classList.remove('timer__color__warn', 'timer__color__remain');
    ring.classList.add('timer__color__alert');
  } else if (timeRemainPercent <= 0.4) {
    ring.classList.remove('timer__color__remain', 'timer__color__alert');
    ring.classList.add('timer__color__warn');
  } else {
    ring.classList.remove('timer__color__warn', 'timer__color__alert');
    ring.classList.add('timer__color__remain');
  }
};
