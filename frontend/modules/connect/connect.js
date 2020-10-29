import Axios from 'axios';

const info = {
  gameName: '',
  name: '',
  username: '',
  rankScore: 0,
  maxScore: 0,
  score: 0,
  tops: []
};

/**
 * initial
 * @param {string} gameName name of the game
 */
export const init = async gameName => {
  info.gameName = gameName;

  const url = new URLSearchParams(window.location.search);
  info.name = `${url.get('name')} ${url.get('lastname')}`;
  info.username = url.get('username');

  const res = await Axios.get(`/api/init/${info.username}/${info.name}`);
  info.maxScore = res.data[info.gameName] || 0;
};

export const getRank = async () => {
  try {
    const res = await Axios.get(`/api/rank/${info.gameName}/${info.name}`);

    if (res.data.rank !== undefined) {
      info.myRank = res.data.rank.rank;
      info.maxScore = res.data.rank.score;
    } else {
      info.myRank = undefined;
      info.maxScore = undefined;
    }

    if (res.data.tops !== undefined && res.data.tops[0] !== undefined) {
      info.rankScore = res.data.tops[0].score;
      info.tops = res.data.tops;
    }
  } catch (err) {
    console.log(err);
  }

  return info;
};

/**
 * send result to server
 * @param {{correct: number, wrong: number, score: number}} score
 */
export const sendResult = async score => {
  try {
    info.score = score.score;

    const res = await Axios.post(
      `/api/setScore/${info.gameName}/${info.username}`,
      score
    );

    info.myRank = res.data.rank.rank;
    info.maxScore = res.data.rank.score;
    info.rankScore = res.data.tops[0].score;
    info.tops = res.data.tops;
  } catch {
    info.maxScore = Math.max(info.maxScore, score.score);
    info.rankScore = Math.max(info.rankScore, score.score);
  }

  return info;
};
