import '../scss/main.scss';

// import '../img/logo2-min.png';

import '../audio/correct.wav';
import '../audio/wrong.wav';

import config from '../config.json';

import * as Item from './model/items';
import * as connect from './model/connect';
import * as Timer from './model/timer';
import * as UI from './view/UI';
import * as Popup from './view/popup';
import * as TimerUI from './view/timer';

//-----------------------------
//            click
//-----------------------------
const clickHandler = e => {
  const index = parseInt(e.target.getAttribute('data-num'));

  const result = Item.select(index);

  if (result) UI.update(e.target, result);
};

const finish = async () => {
  Item.setFinish(true);

  const score = Item.calcScore();
  await connect.sendResult(score);
  Popup.showScore(score);
};
//-----------------------------
//            fill
//-----------------------------
Popup.playButtonHandler(() => {
  // show 3 2 1
  Popup.showRestart(() => Timer.start(config.time));

  // reset
  UI.reset();
  Item.reset();

  // add items
  UI.addSamples(Item.selectSample());
  UI.addItem(Item.selectItem());

  // handle click
  UI.setItemsClick(clickHandler);
});

//-----------------------------
//            timer
//-----------------------------
document.addEventListener('tick', e => {
  TimerUI.update(e.detail.remain, e.detail.total);

  // if (e.detail.remain == 3) connect.getInfo();
});

document.addEventListener('timeUp', finish);

//-----------------------------
//            other
//-----------------------------
setTimeout(() => {
  document.querySelector('#check__menu').checked = true;
}, config.introDuration + config.introDelay);

Popup.helpHandler(Item.getFinish);
