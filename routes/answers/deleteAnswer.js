const { verifyAdmin } = require.main.require('./utils/utilities');
const AnswerController = require.main.require('./controllers/answer.controller');

module.exports = (app) => {
  app.delete('/questions/:questionId/answers/:answerId', verifyAdmin, (req, res) => {
    AnswerController.delete({
      where: {
        id: req.params.answerId,
      },
    })
      .then((id) => {
        res.json({ id });
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
