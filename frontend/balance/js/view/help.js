const DOM = {
  help: document.querySelector('.help'),
  ball: document.querySelector('.ball'),
  puzzle: document.querySelector('.puzzle')
};

const getBallPos = () => {
  const trf = getComputedStyle(DOM.ball).transform;
  return trf
    .slice(trf.indexOf('(') + 1, trf.indexOf(')'))
    .split(',')
    .slice(-2)
    .map(a => parseFloat(a));
};

export const show = () => {
  const w = DOM.puzzle.offsetWidth / 2;
  const h = DOM.puzzle.offsetHeight / 2;
  const ballPos = getBallPos();
  const r = DOM.ball.offsetHeight / 2;
  const helpHeight = DOM.help.offsetHeight;
  const helpWidth = DOM.help.offsetWidth;

  let x = ballPos[0];
  if (x + helpWidth / 2 > w) x = w - helpWidth / 2 - 16;
  else if (x - helpWidth / 2 < -w) x = helpWidth / 2 - w + 16;

  DOM.help.firstChild.style.left = `calc(50% - 1rem + ${ballPos[0] - x}px)`;
  if (ballPos[1] + helpHeight < h * 0.8) {
    DOM.help.style.transform = `translate(${x}px, ${ballPos[1] + r + 16}px)`;
    DOM.help.firstChild.classList.add('help__arrow--up');
    DOM.help.firstChild.classList.remove('help__arrow--down');
  } else {
    DOM.help.style.transform = `translate(${ballPos[0]}px, ${
      ballPos[1] - helpHeight - r - 16
    }px)`;
    DOM.help.firstChild.classList.add('help__arrow--down');
    DOM.help.firstChild.classList.remove('help__arrow--up');
  }
};
