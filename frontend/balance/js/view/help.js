const DOM = {
  helpBall: document.querySelector('.help--ball'),
  helpBuble: document.querySelector('.help--buble'),
  ball: document.querySelector('.ball'),
  score: document.querySelector('.score'),
  puzzle: document.querySelector('.puzzle')
};

let w = 0;
let h = 0;

const p = [0, 0, 0, 0]; // [xBall, yBall, xScore, yScore]
const r = [0, 0]; // [rBall, rScore]

const helpBall = [0, 0, 0]; // [w, h, edge]
const helpBuble = [0, 0, 0]; // [w, h, edge]

/**
 * get position of an element. element should positioned with `translate`.
 * @param {Element} el
 */
const getPos = el => {
  const trf = getComputedStyle(el).transform;
  return trf
    .slice(trf.indexOf('(') + 1, trf.indexOf(')'))
    .split(',')
    .slice(-2)
    .map(a => parseFloat(a));
};

/**
 * update global variable. should call before other function.
 */
const updateInfo = () => {
  w = DOM.puzzle.offsetWidth / 2;
  h = DOM.puzzle.offsetHeight / 2;

  [p[0], p[1]] = getPos(DOM.ball);
  [p[2], p[3]] = getPos(DOM.score);
  r[0] = DOM.ball.offsetHeight / 2;
  r[1] = DOM.score.offsetHeight / 2;

  helpBall[0] = DOM.helpBall.offsetWidth;
  helpBall[1] = DOM.helpBall.offsetHeight;
  helpBall[2] =
    parseFloat(
      window.getComputedStyle(DOM.helpBall).getPropertyValue('padding')
    ) + 8;

  helpBuble[0] = DOM.helpBuble.offsetWidth;
  helpBuble[1] = DOM.helpBuble.offsetHeight;
  helpBuble[2] =
    parseFloat(
      window.getComputedStyle(DOM.helpBuble).getPropertyValue('padding')
    ) + 8;
};

/**
 * find best place for ball and buble help.ball
 */
const helpState = () => {
  const bd = [h + p[1], w - p[0], h - p[1], w + p[0]]; // ball distance
  let distance = [
    [bd[0] - r[0], bd[1], bd[3], 't', 0, 0], // [t, r, l, offset help ball, offset help bubble] from top
    [bd[1] - r[0], bd[0], bd[2], 'r', 0, 0], // [r, t, d, offset help ball, offset help bubble] from right
    [bd[2] - r[0], bd[1], bd[3], 'd', 0, 0], // [d, r, l, offset help ball, offset help bubble] from down
    [bd[3] - r[0], bd[0], bd[2], 'l', 0, 0] // [l, t, d, offset help ball, offset help bubble] from left
  ];

  // remove small edge that help ball cant fit in there
  for (let i = 0; i < 4; i++)
    if (
      distance[i][0] < helpBall[(i + 1) % 2] + 16 ||
      distance[i][1] < helpBall[2] ||
      distance[i][2] < helpBall[2]
    )
      distance[i][3] = '';

  distance = distance.filter(d => d[3] !== '');

  // calc distance including help buble
  const distBuble = [...distance];

  const hd = 0.75 * helpBall[0] + helpBuble[0] / 2;
  for (const d of distBuble) {
    // top | down
    if (
      ((d[3] === 't' && p[1] + r[0] + 16 > h - helpBuble[1]) ||
        (d[3] === 'd' && p[1] + r[0] + helpBall[1] + 32 > h - helpBuble[1])) &&
      Math.abs(p[0]) < hd
    ) {
      // help ball offset
      d[4] = ((p[0] > 0 ? hd : -hd) - p[0]) * 2.5;

      const m = Math.max(
        // todo
        Math.min(helpBall[0] / 2 - helpBall[2], w - helpBall[0] / 2 - p[0] - 8),
        helpBall[0] / 2 + p[0] + 8 - w
      );
      if (Math.abs(d[4]) > m) d[4] = Math.sign(d[4]) * m;

      // help buble offset
      d[5] = (p[0] > 0 ? -hd : hd) + p[0] + d[4];

      // left | right
    } else if (d[3] === 'r' || d[3] === 'l') {
      // help buble offset
      if (p[1] + r[0] + 16 > h - helpBuble[1]) {
        if (d[3] === 'l')
          d[5] =
            p[0] > 0
              ? p[0] - helpBuble[0] / 2 - r[0] - 16
              : p[0] + helpBuble[0] / 2 + r[0] + helpBall[0] + 32;
        else if (d[3] === 'r')
          d[5] =
            p[0] > 0
              ? p[0] + helpBuble[0] / 2 + r[0] + 16
              : p[0] - helpBuble[0] / 2 - r[0] - helpBall[0] - 32;
      } else if (p[1] + helpBall[1] / 2 + 16 > h - helpBuble[1]) {
        // help ball offset
        d[4] = h - helpBuble[1] - p[0] - helpBall[1] / 2 - 16;

        if (d[4] < helpBall[2] - helpBall[1]) d[4] = helpBall[2] - helpBall[1];
      }
    }

    if (Math.abs(d[5]) > w - helpBuble[0] / 2 - 8)
      d[5] = Math.sign(d[5]) * (w - helpBuble[0] / 2 - 8);
  }

  // sort
  distBuble.sort((a, b) => b[0] * (b[1] + b[2]) - a[0] * (a[1] + a[2]));

  return distBuble.length > 0 ? distBuble[0] : distance[0];
};

/**
 * place help ball in the position that are computed by `helpState()`
 * @param {string} dir position of help ball. possible values: t, r, d, l;
 * @param {number} offset help ball offset
 */
const placeBall = (dir, offset) => {
  DOM.helpBall.firstChild.classList.remove(
    'help__arrow--up',
    'help__arrow--down',
    'help__arrow--right',
    'help__arrow--left'
  );

  let x;
  let y;

  if (dir === 't') {
    x = p[0] + offset;
    y = p[1] - r[0] - helpBall[1] - 16;

    DOM.helpBall.firstChild.classList.add('help__arrow--down');
    DOM.helpBall.firstChild.style.transform = `translateX(${-offset}px)`;
  } else if (dir === 'd') {
    x = p[0] + offset;
    y = p[1] + r[0] + 16;

    DOM.helpBall.firstChild.classList.add('help__arrow--up');
    DOM.helpBall.firstChild.style.transform = `translateX(${-offset}px)`;
  } else if (dir === 'r') {
    x = p[0] + r[0] + helpBall[0] / 2 + 16;
    y = p[1] + offset - helpBall[1] / 2;

    DOM.helpBall.firstChild.classList.add('help__arrow--left');
    DOM.helpBall.firstChild.style.transform = `translateY(${-offset}px)`;
  } else if (dir === 'l') {
    x = p[0] - r[0] - helpBall[0] / 2 - 16;
    y = p[1] + offset - helpBall[1] / 2;

    DOM.helpBall.firstChild.classList.add('help__arrow--right');
    DOM.helpBall.firstChild.style.transform = `translateY(${-offset}px)`;
  }

  DOM.helpBall.style.transform = `translate(${x}px, ${y}px)`;
};

/**
 * place help buble in the position that are computed by `helpState()`
 * @param {number} offset help buble offset
 */
const placeBuble = offset => {
  DOM.helpBuble.style.transform = `translateX(${offset}px)`;

  DOM.helpBuble.firstChild.style.transform = `translateX(${
    -Math.sign(offset) *
    Math.min(Math.abs(offset), helpBuble[0] / 2 - helpBuble[2])
  }px)`;
};

/**
 * place ball and buble help in the best position. to see helps use `show()`.
 */
export const place = () => {
  updateInfo();

  const d = helpState();
  placeBall(d[3], d[4]);
  placeBuble(d[5]);
};

/**
 * show ball and buble help. by setting `opacity` to 1.
 */
export const show = () => {
  DOM.helpBall.style.opacity = 1;
  DOM.helpBuble.style.opacity = 1;
};

/**
 * hide ball and buble help. by setting `opacity` to 0.
 */
export const hide = () => {
  DOM.helpBall.style.opacity = 0;
  DOM.helpBuble.style.opacity = 0;
};
