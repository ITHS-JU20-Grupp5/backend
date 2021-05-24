const CategoryController = require.main.require('./controllers/category.controller');

module.exports = (app) => {
  app.get('/categories', (req, res) => {
    CategoryController.findAll()
      .then((categories) => {
        res.json(categories);
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
