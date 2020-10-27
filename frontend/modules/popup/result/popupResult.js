import * as resultMonitor from '../../timer/resultMonitor';
import * as Table from '../../table/table';
import { close } from '../popup';
import config from '../../../directedSquare/config.json';

const DOM = {
  checkMenu: document.querySelector('#check__menu'),
  checkScore: document.querySelector('#check__score'),
  rankTable: document.querySelector('.table'),
  result: {
    icon: document.querySelector('#popup__score .popup__icon'),
    title: document.querySelector('#popup__score .popup__title'),
    score: document.querySelector('.result__score').firstChild,
    max: document.querySelector('.result__max').firstChild,
    rank: document.querySelector('.result__rank').firstChild,
    correct: document.querySelector('.result__correct__number'),
    wrong: document.querySelector('.result__wrong__number')
  }
};

/**
 * show popup score
 * @param {{score: number, correct: number, wrong: number, maxScore: number, rankScore: number}} score
 */
export const showScore = score => {
  // title
  if (score.wrong < score.correct / 2) {
    DOM.result.title.innerHTML = 'کارِت خوب بود';
    DOM.result.icon.innerHTML = '<use xlink:href="img/sprite.svg#check"/>';
  } else {
    DOM.result.title.innerHTML = 'بیشتر تلاش کن';
    DOM.result.icon.innerHTML = '<use xlink:href="img/sprite.svg#close"/>';
  }

  const max = Math.max(config.rankScore * 1.2, config.minRankScore);
  // score
  resultMonitor.animate(DOM.result.score, score.score, max);

  // max score
  resultMonitor.animate(DOM.result.max, config.maxScore, max);

  // rank
  resultMonitor.animate(DOM.result.rank, config.rankScore, max);

  // correct
  DOM.result.correct.innerHTML = score.correct;

  // wrong
  DOM.result.wrong.innerHTML = score.wrong;

  // ranking
  DOM.rankTable.innerHTML = Table.render(config.tops, {
    username: config.username,
    name: config.name,
    score: config.maxScore,
    rank: config.myRank
  });

  close();
  DOM.checkScore.checked = true;
};
