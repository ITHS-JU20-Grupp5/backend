const { verifyAdmin } = require.main.require('./utils/utilities');
const QuestionController = require.main.require('./controllers/question.controller');

module.exports = (app) => {
  app.patch('/questions/:id', verifyAdmin, (req, res) => {
    QuestionController.update({ id: req.params.id, question: req.body.question })
      .then(([, updatedQuestion]) => {
        res.json(updatedQuestion);
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
