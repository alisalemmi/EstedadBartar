import '../scss/main.scss';

import '../../modules/intro/intro';
import * as Result from '../../modules/popup/result/popupResult';
import * as Play from '../../modules/button/play';
import * as Connect from '../../modules/connect/connect';
import * as Fullscreen from './view/fullscreen';
import * as Buble from './view/buble';
import * as Ball from './view/ball';
import * as Range from './view/range';
import * as Score from './view/score';

let running = false;
let startTime = -1;
let previousTime = -1;

Connect.init('balance');
Result.showRankHandler(Connect.getRank);

const finish = async () => {
  startTime = -1;

  if (running === false) return;
  running = false;

  Buble.stop();
  Range.start();
  Ball.stop();
  Score.stop();

  const res = await Connect.sendResult({
    score: Score.getScore(),
    correct: 1,
    wrong: 0
  });

  Result.showScore(res);
};

const animate = time => {
  if (running === false) return;

  if (startTime === -1) {
    startTime = time;
    previousTime = time;
  }

  const et = Math.max(time - previousTime, 20);
  Ball.animate(time - startTime, et);
  Range.animate(time - startTime, et);
  Buble.animate(et);

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
  const menu = document.getElementById('check__menu');
  const score = document.getElementById('check__score');

  Fullscreen.request(() => {
    if (running) finish();
    else if (score.checked !== true) menu.checked = true;
  });

  Buble.init();
  Ball.showHelp();
});

Ball.init(start, finish);

// remove correct and wrong from result page
document.querySelector('.result__correct').style.display = 'none';
document.querySelector('.result__wrong').style.display = 'none';

// remove close button from popup
document.querySelectorAll('.popup__close').forEach(el => {
  el.style.display = 'none';
});
