import '../scss/main.scss';

import '../../modules/intro/intro';
import * as Result from '../../modules/popup/result/popupResult';
import * as Play from '../../modules/button/play';
import * as Fullscreen from './view/fullscreen';
import * as Buble from './view/buble';
import * as Ball from './view/ball';
import * as Range from './view/range';
import * as Score from './view/score';

let running = true;
let startTime = -1;
let previousTime = -1;

const finish = () => {
  if (running === false) return;

  running = false;
  startTime = -1;

  Buble.stop();
  Ball.stop();
  Score.stop();

  Result.showScore({
    score: Score.getScore(),
    correct: 1,
    wrong: 0,
    maxScore: 100,
    rankScore: 100
  });
};

const animate = time => {
  if (startTime === -1) {
    startTime = time;
    previousTime = time;
  }

  Ball.animate(time - startTime, time - previousTime);
  Range.animate(time - startTime, time - previousTime);

  if (!Buble.bubleInRange() || !Ball.fingerInBall()) finish();

  previousTime = time;
  if (running) requestAnimationFrame(animate);
};

const start = () => {
  running = true;
  Buble.start();
  Ball.start();
  Range.start();
  Score.start();

  requestAnimationFrame(animate);
};

Play.playButtonHandler(() => {
  Fullscreen.request(finish); // TODO biuld a real exit handler
  Buble.init();
});

Ball.init(start, finish);

// remove correct and wrong from result page
document.querySelector('.result__correct').style.display = 'none';
document.querySelector('.result__wrong').style.display = 'none';
