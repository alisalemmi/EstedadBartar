import Axios from 'axios';
import config from '../../config.json';

const init = async () => {
  const url = new URLSearchParams(window.location.search);
  config.name = `${url.get('name')} ${url.get('lastname')}`;
  config.username = url.get('username');

  const res = await Axios.get(`/api/init/${config.username}/${config.name}`);
  config.maxScore = res.data.colorful || 0;
};

init();

export const getRank = async () => {
  try {
    const res = await Axios.get(`/api/rank/colorful/${config.name}`);

    if (res.data.rank !== undefined) {
      config.myRank = res.data.rank.rank;
      config.maxScore = res.data.rank.score;
    } else {
      config.myRank = undefined;
      config.maxScore = undefined;
    }

    if (res.data.tops !== undefined && res.data.tops[0] !== undefined) {
      config.rankScore = res.data.tops[0].score;
      config.tops = res.data.tops;
    }
  } catch (err) {
    console.log(err);
  }
};

/**
 * send result to server
 * @param {{correct: number, wrong: number, score: number}} score
 */
export const sendResult = async score => {
  try {
    const res = await Axios.post(
      `/api/setScore/colorful/${config.username}`,
      score
    );

    config.myRank = res.data.rank.rank;
    config.maxScore = res.data.rank.score;
    config.rankScore = res.data.tops[0].score;
    config.tops = res.data.tops;
  } catch {
    config.maxScore = Math.max(config.maxScore, score.score);
    config.rankScore = Math.max(config.rankScore, score.score);
  }
};
