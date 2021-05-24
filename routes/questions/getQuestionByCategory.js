const CategoryController = require.main.require('./controllers/category.controller');

module.exports = (app) => {
  app.get('/categories/:id/questions', (req, res) => {
    CategoryController.findById(req.params.id)
      .then((category) => {
        res.json({
          questions: category.getQuestions(),
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
