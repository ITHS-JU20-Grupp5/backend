const QuestionController = require.main.require('./controllers/question.controller');

module.exports = (app) => {
  app.get('/questions', (req, res) => {
    QuestionController.findAll()
      .then((questions) => {
        res.json(questions);
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
