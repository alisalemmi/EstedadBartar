import * as circle from './circle';

const formatTime = time => {
  const minutes = Math.floor(time / 60);
  const seconds = `${time % 60}`.padStart(2, '0');

  return `${minutes}:${seconds}`;
};

export const update = (timer, remain, total) => {
  timer.childNodes[1].innerHTML = formatTime(remain);
  circle.setCircleDashArray(timer, remain, total, true);
  circle.setRemainingPathColor(timer, remain / total);
};
