import config from '../../directedSquare/config.json';

const DOM = {
  frontPages: document.querySelectorAll('.check--front'),
  backPages: document.querySelectorAll('.check--back'),
  close: document.querySelectorAll('.popup__close')
};

/**
 * do something after closeing popup. so user doesn't see what happen
 * @param {Function} func
 */
export const onClose = func => {
  setTimeout(() => {
    func();
  }, config.popupCloseDuration);
};

/**
 * go to front page at each popup.
 */
export const goToFront = () => {
  DOM.backPages.forEach(page => {
    page.checked = false;
  });
};

/**
 * close all popups. it also go to front page.
 */
export const close = () => {
  DOM.frontPages.forEach(page => {
    page.checked = false;
  });

  onClose(goToFront);
};

/**
 * visible popups' close buttons
 */
export const enableClose = () => {
  DOM.close.forEach(el => {
    el.style.visibility = 'visible';
    el.addEventListener('click', () => onClose(goToFront));
  });
};

/**
 * close popup when clicked on backdrop
 */
export const backdropHandler = () => {
  DOM.backdrop.forEach(el =>
    el.addEventListener('click', function (e) {
      if (e.target === this) {
        close();
      }
    })
  );
};
