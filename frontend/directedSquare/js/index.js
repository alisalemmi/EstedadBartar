import '../scss/main.scss';

import '../img/1.png';
import '../img/2.png';
import '../img/3.png';
import '../img/4.png';
import '../img/5.png';
import '../img/6.png';
import '../img/7.png';
import '../img/8.png';

import '../../assets/audio/correct.wav';
import '../../assets/audio/wrong.wav';

import config from '../config.json';

import * as Item from './model/items';
import * as connect from '../../modules/connect/connect';
import * as Timer from '../../modules/timer/timerLogic';
import * as UI from './view/UI';
import * as Menu from '../../modules/popup/menu/popupMenu';
import * as Result from '../../modules/popup/result/popupResult';
import * as Play from '../../modules/button/play';
import * as Restart from '../../modules/restartTimer/restartTimer';
import * as TimerUI from '../../modules/timer/timerUI';

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
  Result.showScore(score);
};
//-----------------------------
//            fill
//-----------------------------
Play.playButtonHandler(() => {
  // show 3 2 1
  Restart.showRestart(
    document.querySelector('.restart-timer'),
    document.querySelector('.container'),
    () => Timer.start(config.time)
  );

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
  TimerUI.update(
    document.querySelector('.scoreboard > .timer'),
    e.detail.remain,
    e.detail.total
  );
});

document.addEventListener('timeUp', finish);

//-----------------------------
//            other
//-----------------------------
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelector('#check__menu').checked = true;
  }, config.introDuration + config.introDelay);
});

Menu.helpHandler(Item.getFinish);
