import config from '../../config.json';

const state = {
  answer: 0,
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
  state.score.correct = 0;
  state.score.wrong = 0;
  state.finish = false;
};

/**
 * shuffle input array and return it
 * @param {number[]} array
 */
const shuffle = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const getQuestion = () => {
  const colors = [...config.colors];
  const colorNames = [...config.colorNames];

  // type
  const isColorMatter = Math.random() > 0.5;

  // create question
  const name = Math.floor(Math.random() * colorNames.length);
  const color = Math.floor(Math.random() * colors.length);

  const question = {
    name: colorNames[name],
    color: colors[color]
  };

  // create correct answer
  const tmp = Math.floor(Math.random() * colors.length);
  const answers = isColorMatter
    ? [
        {
          name: colorNames.splice(color, 1)[0],
          color: colors[tmp]
        }
      ]
    : [
        {
          name: colorNames[tmp],
          color: colors.splice(name, 1)[0]
        }
      ];

  // update state
  const [correct] = answers;

  // maybe create deception answer
  if (Math.random() < config.deciptionAnswerProbablity) {
    if (isColorMatter) {
      answers.push({
        name: colorNames.splice(
          Math.floor(Math.random() * colorNames.length),
          1
        )[0],
        color: colors.splice(name, 1)[0]
      });
    } else {
      answers.push({
        name: colorNames.splice(color, 1)[0],
        color: colors.splice(
          Math.floor(Math.random() * colorNames.length),
          1
        )[0]
      });
    }
  }

  // remove random selected in correct answer
  if (isColorMatter) colors.splice(tmp, 1);
  else colorNames.splice(tmp, 1);

  // create other answers
  while (answers.length < 4)
    answers.push({
      name: colorNames.splice(
        Math.floor(Math.random() * colorNames.length),
        1
      )[0],
      color: colors.splice(Math.floor(Math.random() * colors.length), 1)[0]
    });

  // shuffle answer and find correct number
  shuffle(answers);
  state.answer = answers.indexOf(correct);

  return {
    isColorMatter,
    question,
    answers
  };
};

const getScore = () =>
  Math.floor((state.score.correct - state.score.wrong / 3) * 64);

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

/**
 * @param {number} answer
 */
export const select = answer => {
  if (state.finish) return;

  // eslint-disable-next-line eqeqeq
  const isCorrect = answer == state.answer;

  if (isCorrect) state.score.correct++;
  else state.score.wrong++;

  return {
    isCorrect,
    correct: state.score.correct,
    wrong: state.score.wrong,
    score: getScore()
  };
};
