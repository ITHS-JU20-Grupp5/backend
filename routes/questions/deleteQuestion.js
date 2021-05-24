const QuestionController = require.main.require('./controllers/question.controller');
const { verifyAdmin } = require.main.require('./utils/utilities');

module.exports = (app) => {
  app.delete('/questions/:id', verifyAdmin, (req, res) => {
    QuestionController.delete({
      where: {
        id: req.params.id,
      },
    })
      .then((id) => {
        res.json({
          id,
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
