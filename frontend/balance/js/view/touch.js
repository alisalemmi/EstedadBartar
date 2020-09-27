const DOM = {
  circle: document.querySelector('.circle'),
  puzzle: document.querySelector('.puzzle')
};

let circleInterval;

const fingerInCircle = (x, y) => {
  const circlePos = DOM.circle.getBoundingClientRect();

  return (
    Math.sqrt(
      (x - (circlePos.left + circlePos.right) / 2) ** 2 +
        (y - (circlePos.top + circlePos.bottom) / 2) ** 2
    ) <=
    DOM.circle.offsetWidth / 2
  );
};

const moveCircle = () => {
  // TODO should be better
  const x = Math.random() * 2 - 1;
  const y = Math.random() * 2 - 1;

  DOM.circle.style.transform = `translate(${
    (x * (DOM.puzzle.offsetWidth - DOM.circle.offsetWidth)) / 2
  }px, ${(y * (DOM.puzzle.offsetHeight - DOM.circle.offsetWidth)) / 2}px)`;
};

export const start = startHandler => {
  DOM.circle.addEventListener('touchstart', e => {
    startHandler(e);
    circleInterval = setInterval(moveCircle, 2000);
  });
};

export const stop = () => {
  clearInterval(circleInterval);
};

/**
 *
 * @param {(e: TouchEvent) => void} checkHandler
 */
const move = checkHandler => {
  DOM.circle.addEventListener('touchmove', checkHandler);
};

const end = endHandler => {
  DOM.circle.addEventListener('touchcancle', endHandler);
  DOM.circle.addEventListener('touchend', endHandler);
};

export const validate = finish => {
  move(e => {
    if (!fingerInCircle(e.touches[0].pageX, e.touches[0].pageY)) finish();
  });

  end(finish);
};
