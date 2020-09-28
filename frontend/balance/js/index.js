import '../scss/main.scss';

import '../../modules/intro/intro';
import * as Play from '../../modules/button/play';
import * as Fullscreen from './view/fullscreen';
import * as Motion from './view/motion';
import * as Buble from './view/buble';
import * as Touch from './view/touch';
import * as Ball from './view/ball';
import * as Score from './view/score';

let rfa = 0;
let startTime = -1;
let previousTime = -1;

const finish = () => {
  cancelAnimationFrame(rfa);
  startTime = -1;

  Buble.stop();
  Ball.stop();
  Score.stop();

  document.querySelector('#check__score').checked = true;
};

const animate = time => {
  if (startTime === -1) {
    startTime = time;
    previousTime = time;
  }

  Ball.animate(time - startTime, time - previousTime);
  previousTime = time;
  rfa = requestAnimationFrame(animate);
};

const start = () => {
  Buble.start();
  Ball.start();
  Score.start();

  // 2. motion
  Motion.addHandler(e => {
    Buble.moveBuble(e); // TODO handle reject
    // Buble.validate(finish);
  });

  rfa = requestAnimationFrame(animate);
};

Play.playButtonHandler(() => {
  Fullscreen.request(finish); // TODO biuld a real exit handler
});

Touch.start(start);

// Touch.validate(finish);
