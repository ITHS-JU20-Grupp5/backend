const QuestionController = require.main.require('./controllers/question.controller');

module.exports = (app) => {
  app.get('/questions/:id/answers', (req, res) => {
    QuestionController.findById(req.params.id)
      .then((question) => {
        res.json({
          answers: question.answers,
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
