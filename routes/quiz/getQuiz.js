const CategoryController = require.main.require('./controllers/category.controller');

function createQuiz(quizRes, answersAmount, res) {
  const questions = [];
  quizRes.questions.forEach((question) => {
    const answers = [];
    const questionObj = { id: question.id, question: question.question };
    const correctAnswer = question.answers.find((answer) => answer.correct === true);
    answers.push({ answer: correctAnswer.answer, correct: correctAnswer.correct });
    const incorrect = question.answers.filter((answer) => answer.correct === false);
    let incorrectAmount = 0;
    const addedAnswers = [];
    while (incorrectAmount < answersAmount - 1) {
      const incorrectIndex = Math.floor(Math.random() * incorrect.length);
      // Ensure that the same answer doesn't get added twice
      if (!addedAnswers.includes(incorrect[incorrectIndex].answer)) {
        const tempAnswer = incorrect[incorrectIndex];
        const answerObj = {
          id: tempAnswer.id,
          answer: tempAnswer.answer,
          correct: tempAnswer.correct,
        };
        answers.push(answerObj);
        addedAnswers.push(answerObj.answer);
        incorrectAmount++;
      }
    }
    const shuffledAnswers = answers
      .map((a) => ({
        sort: Math.random(),
        value: a,
      }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
    questionObj.answers = shuffledAnswers;
    questions.push(questionObj);
  });

  const quiz = {
    category: quizRes.category,
    questions,
  };

  res.json(quiz);
}

module.exports = (app) => {
  app.post('/quiz', async (req, res) => {
    const options = {
      category: req.body.category || 'RANDOM',
      // Keep for later
      // In case we decide on things later on down the long long oregon trail
      // questions: req.body.questions || 5,
      // easy = 2 answers
      // normal = 4 answers
      // hard = 6 answers
      difficulty: req.body.difficulty || 'easy',
    };
    let answersAmount;
    switch (options.difficulty.toUpperCase()) {
      case 'NORMAL':
        answersAmount = 4;
        break;
      case 'HARD':
        answersAmount = 6;
        break;
      default:
        answersAmount = 2;
        break;
    }

    if (options.category === 'RANDOM') {
      CategoryController.findRandomForQuiz()
        .then((quizRes) => {
          createQuiz(quizRes, answersAmount, res);
        })
        .catch((err) => {
          if (err) {
            res.status(400).json({
              error: err.message,
            });
          }
        });
    } else {
      CategoryController.findForQuiz(options.category)
        .then((quizRes) => {
          createQuiz(quizRes, answersAmount, res);
        })
        .catch((err) => {
          if (err) {
            res.status(400).json({
              error: err.message,
            });
          }
        });
    }
  });
};
