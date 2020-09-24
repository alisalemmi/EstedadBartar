/**
 * made page fullscreen. **NOT** supported in *safari* :(
 *
 * return `true` if it was successfull.
 */
const fullscreen = () => {
  try {
    document.querySelector('html').requestFullscreen();
  } catch {
    return false;
  }
  return true;
};

/**
 * lock screen orientation to portrait.
 *
 * return `true` if it was successfull.
 */
const lockScreen = () => {
  try {
    // eslint-disable-next-line no-restricted-globals
    screen.orientation.lock('portrait-primary');
  } catch {
    try {
      ScreenOrientation.lock('portrait-primary');
    } catch {
      return false;
    }
    return true;
  }
};

/**
 * call `exitHandler` when page exit from fullscreen.
 * @param {Function} exitHandler what to do on exit fullscreen
 */
const onExit = exitHandler => {
  document.addEventListener('fullscreenchange', () => {
    if (
      document.fullscreenElement == null &&
      document.mozFullScreenElement == null &&
      document.webkitFullscreenElement == null
    ) {
      exitHandler();
    }
  });
};

/**
 * - go to fullscreen.
 * - lock screen orientation.
 * - call `exitHandler` when page exit from fullscreen
 *
 * return `true` if it was successfull.
 * @param {Function} exitHandler what to do on exit fullscreen
 */
export const request = exitHandler => {
  const supportFulscreen = fullscreen();
  const supportLockscreen = lockScreen();

  if (supportFulscreen) onExit(exitHandler);

  return supportFulscreen && supportLockscreen;
};
