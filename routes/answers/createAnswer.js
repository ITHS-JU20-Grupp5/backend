const { verifyAdmin } = require.main.require('./utils/utilities');
const AnswerController = require.main.require('./controllers/answer.controller');
const QuestionController = require.main.require('./controller/question.controller');

module.exports = (app) => {
  app.post('/questions/:id/answers', verifyAdmin, (req, res) => {
    // !! converts const to a boolean value
    const correct = !!req.body.correct;
    AnswerController.create({ answer: req.body.answer, correct })
      .then((newAnswer) => {
        QuestionController.addAnswer(req.params.id, newAnswer.id)
          .then(() => {
            res.status(201).json(newAnswer);
          })
          .catch((err) => {
            if (err) {
              res.status(400).json({
                error: err.message,
              });
            }
          });
      })
      .catch((err) => {
        if (err) {
          res.status(400).json({
            error: err.message,
          });
        }
      });
  });
};
