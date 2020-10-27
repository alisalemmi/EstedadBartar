import * as Popup from '../popup/popup';

const DOM = {
  playButtons: document.querySelectorAll('.button__play')
};

/**
 * when start, change start to restart
 */
const turnPlayToReset = () => {
  DOM.playButtons.forEach(el => {
    el.lastChild.innerHTML = 'شروع مجدد';
  });

  DOM.playButtons.forEach(el => {
    el.firstChild.innerHTML = '<use xlink:href="img/sprite.svg#refresh"/>';
  });
};

/**
 * handler for play buttons
 * @param {Function} callback
 */
export const playButtonHandler = callback => {
  DOM.playButtons.forEach(el => {
    el.addEventListener('click', () => {
      callback();

      Popup.onClose(() => {
        Popup.goToFront();
        turnPlayToReset();
        Popup.enableClose();
        Popup.backdropHandler();
      });
    });
  });
};
