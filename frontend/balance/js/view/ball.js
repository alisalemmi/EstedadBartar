import * as Help from './help';

export * from './touch';

const DOM = {
  puzzle: document.querySelector('.puzzle'),
  ball: document.querySelector('.ball'),
  score: document.querySelector('.score')
};

const v = [0, 0, 0, 0];
const p = [0, 0, 0, 0];
const r = [80, 48];
let w;
let h;

const minSpeed = 0.001;
let nextStepBall = 1000;
let nextStepScore = 2000;

const getRandomSpeed = time => {
  const domain = 0.007 * Math.log10(time + 1) + 0.005;
  const s = Math.random() * domain - domain / 2;

  if (Math.abs(s) < minSpeed) return Math.sign(s || 1) * minSpeed;
  return s;
};

const getNextStep = time => {
  const min = 4000 - 300 * Math.log10(time + 1);
  const domain = 40 * Math.sqrt(time / 80);

  return Math.random() * domain + min;
};

const preventGoOut = (n, elapsedTime) => {
  const bound = n % 2 ? h : w;
  const rt = n / 2 >= 1 ? r[1] : r[0];

  if (p[n] + v[n] * elapsedTime + rt >= bound)
    v[n] = -Math.max(Math.abs(v[n]) * 0.99, minSpeed);
  else if (p[n] + v[n] * elapsedTime - rt <= -bound)
    v[n] = Math.max(Math.abs(v[n]) * 0.99, minSpeed);
};

const updateInfo = (time, elapsedTime) => {
  // 1. prevent go out
  preventGoOut(0, elapsedTime); // ball - X axis
  preventGoOut(1, elapsedTime); // ball - Y axis

  preventGoOut(2, elapsedTime); // score - X axis
  preventGoOut(3, elapsedTime); // score - Y axis

  // 2. prevent accident
  const m = [r[0] ** 2, r[1] ** 2];

  if (
    (p[0] + v[0] * elapsedTime - (p[2] + v[2] * elapsedTime)) ** 2 +
      (p[1] + v[1] * elapsedTime - (p[3] + v[3] * elapsedTime)) ** 2 <=
    (r[0] + r[1]) ** 2
  ) {
    v[0] = ((m[0] - m[1]) * v[0] + 2 * m[1] * v[2]) / (m[0] + m[1]);
    v[1] = ((m[0] - m[1]) * v[1] + 2 * m[1] * v[3]) / (m[0] + m[1]);

    v[2] = ((m[1] - m[0]) * v[2] + 2 * m[0] * v[0]) / (m[0] + m[1]);
    v[3] = ((m[1] - m[0]) * v[3] + 2 * m[0] * v[1]) / (m[0] + m[1]);
  }

  // 3. update position
  p[0] += v[0] * elapsedTime;
  p[1] += v[1] * elapsedTime;
  p[2] += v[2] * elapsedTime;
  p[3] += v[3] * elapsedTime;

  // 4. update speed
  if (time > nextStepBall) {
    nextStepBall += getNextStep(time);

    v[0] = getRandomSpeed(time);
    v[1] = getRandomSpeed(time);
  }

  if (time > nextStepScore) {
    nextStepScore += getNextStep(time) * 5;

    v[2] = getRandomSpeed(time);
    v[3] = getRandomSpeed(time);
  }
};

const draw = () => {
  DOM.ball.style.transform = `translate(${p[0]}px, ${p[1]}px)`;
  DOM.score.style.transform = `translate(${p[2]}px, ${p[3]}px)`;
};

export const animate = (totalTime, elapsedTime) => {
  updateInfo(totalTime, elapsedTime);
  draw();
};

const clear = () => {
  r[0] = DOM.ball.offsetWidth / 2;
  r[1] = DOM.score.offsetWidth / 2;
  w = DOM.puzzle.offsetWidth / 2;
  h = DOM.puzzle.offsetHeight / 2;

  v[0] = getRandomSpeed(0);
  v[1] = getRandomSpeed(0);
  v[2] = getRandomSpeed(0);
  v[3] = getRandomSpeed(0);

  nextStepBall = 1000;
  nextStepScore = 2000;

  draw();
};

window.addEventListener('load', () => {
  r[0] = DOM.ball.offsetWidth / 2;
  r[1] = DOM.score.offsetWidth / 2;
  w = DOM.puzzle.offsetWidth / 2;
  h = DOM.puzzle.offsetHeight / 2;

  p[0] = (Math.random() * 2 - 1) * (w * 0.8 - r[0]);
  p[1] = (Math.random() * 2 - 1) * (h * 0.8 - r[0]);
  p[2] = 0;

  const scorePos = getComputedStyle(DOM.score).transform;
  p[3] = parseFloat(
    scorePos
      .slice(scorePos.lastIndexOf(',') + 1, scorePos.lastIndexOf(')'))
      .trim()
  );

  draw();
  Help.show();
});

export const start = () => {
  clear();
};

export { show as stop } from './help';
