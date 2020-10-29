import '../scss/main.scss';

import '../../assets/audio/correct.wav';
import '../../assets/audio/wrong.wav';

import config from '../config.json';

import '../../modules/intro/intro';

import * as Item from './model/items';
import * as connect from '../../modules/connect/connect';
import * as Timer from '../../modules/timer/timerLogic';
import * as UI from './view/UI';
import * as Popup from './view/popup';
import * as TimerUI from '../../modules/timer/timerUI';

let lockClick = false;

UI.answersClickHandler(async function () {
  if (lockClick) return;

  const result = Item.select(this.getAttribute('data-n'));

  if (result) {
    lockClick = true;
    await UI.update(this, result, Item.getQuestion());
    lockClick = false;
  }
});

Popup.playButtonHandler(async () => {
  // show 3 2 1
  await Popup.showRestart(() => {
    // reset
    UI.reset();
    Item.reset();

    UI.showQuestion(Item.getQuestion());
  });

  Timer.start(config.time);
});

Popup.showRankHandler(connect.getRank);

//-----------------------------
//            timer
//-----------------------------
document.addEventListener('tick', e => {
  TimerUI.update(e.detail.remain, e.detail.total);
});

document.addEventListener('timeUp', async () => {
  Item.setFinish(true);

  const score = Item.calcScore();
  await connect.sendResult(score);
  Popup.showScore(score);
});

//-----------------------------
//            other
//-----------------------------
setTimeout(() => {
  document.querySelector('#check__menu').checked = true;
}, config.introDuration + config.introDelay);

Popup.homeHandler(Item.getFinish);
Popup.rankBackHandler(Item.getFinish);
