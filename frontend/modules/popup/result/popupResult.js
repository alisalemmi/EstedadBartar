import * as resultMonitor from '../../timer/resultMonitor';
import * as Table from '../../table/table';
import { close, onClose } from '../popup';

const DOM = {
  checkMenu: document.querySelector('#check__menu'),
  checkScore: document.querySelector('#check__score'),
  checkRank: document.querySelector('#check__rank'),
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

let lastFromMenu = true;

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

  const max = Math.max(score.rankScore * 1.2, score.minRankScore);
  // score
  resultMonitor.animate(DOM.result.score, score.score, max);

  // max score
  resultMonitor.animate(DOM.result.max, score.maxScore, max);

  // rank
  resultMonitor.animate(DOM.result.rank, score.rankScore, max);

  // correct
  DOM.result.correct.innerHTML = score.correct;

  // wrong
  DOM.result.wrong.innerHTML = score.wrong;

  // ranking
  DOM.rankTable.innerHTML = Table.render(score.tops, {
    username: score.username,
    name: score.name,
    score: score.maxScore,
    rank: score.myRank
  });

  close();
  DOM.checkScore.checked = true;
  lastFromMenu = false;
};

export const showRankHandler = api => {
  // show rank
  document
    .querySelector('.button__rank')
    .addEventListener('click', async () => {
      lastFromMenu = true;
      const res = await api();

      DOM.rankTable.innerHTML = Table.render(res.tops, {
        username: res.username,
        name: res.name,
        score: res.maxScore,
        rank: res.myRank
      });

      DOM.checkRank.checked = true;
      onClose(() => {
        DOM.checkScore.checked = true;
      });
    });

  // go back handler
  document
    .querySelector('.popup--back .button--secondary[for="check__rank"]')
    .addEventListener('click', () => {
      if (lastFromMenu) {
        DOM.checkScore.checked = false;
        setTimeout(() => {
          DOM.checkRank.checked = true;
        }, 10);

        onClose(() => {
          DOM.checkMenu.checked = true;
          DOM.checkRank.checked = false;
        });
      }
    });
};
