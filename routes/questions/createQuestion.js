const { verifyAdmin } = require.main.require('./utils/utilities');
const QuestionController = require.main.require('./controllers/question.controller');
const CategoryController = require.main.require('./controllers/category.controller');

module.exports = (app) => {
  app.post('/categories/:id/questions', verifyAdmin, (req, res) => {
    const { question } = req.body;
    QuestionController.findOrCreate({ question }).then(([newQuestion, created]) => {
      if (!created) {
        res.status(409).json({
          message: 'That question already exists',
        });
        return;
      }
      CategoryController.addQuestion(req.params.id, newQuestion.id).then(async (newCategory) => {
        if (!newCategory) {
          res.status(404).json({
            error: 'Category or Question not found',
          });
          return;
        }
        res.json(newQuestion);
      });
    });
  });
};
