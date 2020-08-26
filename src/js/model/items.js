const state = {
  answer: 0,
  total: 0,
  score: {
    correct: 0,
    wrong: 0
  },
  finish: true
};

export const getFinish = () => state.finish;
export const setFinish = isFinish => {
  state.finish = isFinish;
};

export const reset = () => {
  state.answer = 0;
  state.total = 0;
  state.score.correct = 0;
  state.score.wrong = 0;
  state.finish = false;
};

const getScore = () =>
  Math.floor(((state.score.correct - state.score.wrong) / state.total) * 1000);

/**
 * calculate final score and return it.
 */
export const calcScore = () => {
  return {
    score: getScore(),
    correct: state.score.correct,
    wrong: state.score.wrong
  };
};
