const DOM = {
  ball: document.querySelector('.ball'),
  puzzle: document.querySelector('.puzzle')
};

const fingerInBall = (x, y) => {
  const ballPos = DOM.ball.getBoundingClientRect();

  return (
    Math.sqrt(
      (x - (ballPos.left + ballPos.right) / 2) ** 2 +
        (y - (ballPos.top + ballPos.bottom) / 2) ** 2
    ) <=
    DOM.ball.offsetWidth / 2
  );
};

export const start = startHandler => {
  DOM.ball.addEventListener('touchstart', e => {
    startHandler(e);
  });
};

/**
 *
 * @param {(e: TouchEvent) => void} checkHandler
 */
const move = checkHandler => {
  DOM.ball.addEventListener('touchmove', checkHandler);
};

const end = endHandler => {
  DOM.ball.addEventListener('touchcancle', endHandler);
  DOM.ball.addEventListener('touchend', endHandler);
};

export const validate = finish => {
  move(e => {
    if (!fingerInBall(e.touches[0].pageX, e.touches[0].pageY)) finish();
  });

  end(finish);
};
