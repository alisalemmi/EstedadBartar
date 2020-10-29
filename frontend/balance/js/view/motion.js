/**
 * prepare motion handler to be called.
 * @param {(degree: Number) => void} callback motion handler. called with degree of the `x` axis
 * @param {(isNotSupported: boolean) => void } reject call when can't add listener.
 * either by not supported device (call with `true`)
 * or by permission denied (call with `false`)
 */
const accelerationToDegree = (callback, reject) => {
  return e => {
    if (e.accelerationIncludingGravity.x === null) reject(true);

    const deg = Math.round((e.accelerationIncludingGravity.x / 9.81) * 90);
    const limitedDeg = Math.max(Math.min(deg, 90), -90);
    callback(limitedDeg);
  };
};

/**
 * add handler for `devicemotion` event
 * @param {(degree: Number) => void} handler handle device motion.
 * it should to have only one argument that is degree of the `x` axis.
 * @param {(isNotSupported: boolean) => void } reject call when can't add listener.
 * either by not supported device (call with `true`)
 * or by permission denied (call with `false`)
 */
const addMotionListener = (handler, reject) => {
  window.addEventListener(
    'devicemotion',
    accelerationToDegree(handler, reject)
  );
};

/**
 * handle device motion
 * @param {(degree: Number) => void} handler handle device motion.
 * it should have only one argument that is the degree of the `x` axis.
 * @param {(isNotSupported: boolean) => void } reject call when can't add listener.
 * either by not supported device (call with `true`)
 * or by permission denied (call with `false`)
 */
export const addHandler = (handler, reject) => {
  // 1. check support
  if (window.DeviceMotionEvent) {
    // 2. permission for ios
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      DeviceMotionEvent.requestPermission()
        .then(result => {
          if (result === 'granted') addMotionListener(handler, reject);
          else reject(false);
        })
        .catch(() => reject(false));
    } else {
      // 3. other device
      addMotionListener(handler, reject);
    }
  } else {
    // motion NOT supported :(
    reject(true);
  }
};
