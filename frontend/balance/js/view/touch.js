const DOM = {
  ball: document.querySelector('.ball')
};

let x;
let y;
let touchId;

export const fingerInBall = () => {
  const ballPos = DOM.ball.getBoundingClientRect();

  return (
    Math.sqrt(
      (x - (ballPos.left + ballPos.right) / 2) ** 2 +
        (y - (ballPos.top + ballPos.bottom) / 2) ** 2
    ) <=
    DOM.ball.offsetWidth / 2
  );
};

const getCorrectTouch = changedTouches => {
  let t;
  for (let i = 0; i < changedTouches.length; i++) {
    t = changedTouches.item(i);
    if (t.identifier === touchId) return t;
  }
};

const start = startHandler => {
  DOM.ball.addEventListener('touchstart', e => {
    touchId = e.changedTouches[0].identifier;
    x = e.changedTouches[0].pageX;
    y = e.changedTouches[0].pageY;
    startHandler(e);
  });
};

/**
 *
 * @param {(e: TouchEvent) => void} checkHandler
 */
const move = () => {
  DOM.ball.addEventListener('touchmove', e => {
    const touch = getCorrectTouch(e.changedTouches);

    if (touch) {
      x = touch.pageX;
      y = touch.pageY;
    }
  });
};

const end = endHandler => {
  const finish = e => {
    if (getCorrectTouch(e.changedTouches)) endHandler();
  };

  DOM.ball.addEventListener('touchcancle', finish);
  DOM.ball.addEventListener('touchend', finish);
};

export const init = (startHandler, endHandler) => {
  start(startHandler);
  move();
  end(endHandler);
};
