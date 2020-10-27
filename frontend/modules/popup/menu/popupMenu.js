const DOM = {
  checkMenu: document.querySelector('#check__menu'),
  checkScore: document.querySelector('#check__score')
};

/**
 * if game finished, open result else open menu.
 * @param {Function} isFinish
 */
export const helpHandler = isFinish => {
  document.querySelector('.menu').addEventListener('click', () => {
    DOM.checkMenu.checked = !isFinish();
    DOM.checkScore.checked = isFinish();
  });
};
