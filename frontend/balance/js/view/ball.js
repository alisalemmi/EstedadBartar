const DOM = {
  puzzle: document.querySelector('.puzzle'),
  ball: document.querySelector('.ball')
};

let raf = 0;

const v = [0, 0];
const p = [0, 0];
let r;
let w;
let h;

const clear = () => {
  cancelAnimationFrame(raf);

  v[0] = Math.random() * 2 - 1 || 0.5;
  v[1] = Math.random() * 2 - 1 || -0.5;

  r = DOM.ball.offsetWidth / 2;
  w = DOM.puzzle.offsetWidth / 2;
  h = DOM.puzzle.offsetHeight / 2;
};

const updateInfo = () => {
  // prevent goiong out
  if (p[0] + v[0] + r > w || p[0] + v[0] - r < -w) v[0] *= -0.9;
  if (p[1] + v[1] + r > h || p[1] + v[1] - r < -h) v[1] *= -0.9;

  // prevent accident

  // update position
  p[0] += v[0];
  p[1] += v[1];

  // update speed
};

const draw = () => {
  DOM.ball.style.transform = `translate(${p[0] + v[0]}px, ${p[1] + v[1]}px)`;
};

const call = () => {
  draw();
  updateInfo();
  raf = requestAnimationFrame(call);
};
export const start = () => {
  clear();
  raf = requestAnimationFrame(call);
};

export const stop = () => {
  cancelAnimationFrame(raf);
};
