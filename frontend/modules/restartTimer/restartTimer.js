import { onClose } from '../popup/popup';

export const showRestart = (restartTimer, container, calback) => {
  onClose(() => {
    restartTimer.classList.add('restart-timer--show');
    container.style.opacity = 0;
  });

  let t = 4;
  const inter = setInterval(() => {
    if (t > 1) restartTimer.firstChild.innerHTML = t - 1;
    else if (t === 1) {
      restartTimer.firstChild.innerHTML = '';
      container.style.opacity = 1;
    } else if (t === 0) {
      restartTimer.classList.remove('restart-timer--show');

      calback();
      clearInterval(inter);
    }
    t--;
  }, 1000);
};
