import '../scss/main.scss';

import '../audio/correct.wav';
import '../audio/wrong.wav';

import config from '../config.json';

import * as Item from './model/items';
import * as connect from './model/connect';
import * as Timer from './model/timer';
import * as UI from './view/UI';
import * as Popup from './view/popup';
import * as TimerUI from './view/timer';

UI.answersClickHandler(async function () {
  const result = Item.select(this.childNodes[0].innerHTML);

  if (result) {
    Item.setFinish(true);
    await UI.update(this, result, Item.getQuestion());
    Item.setFinish(false);
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
