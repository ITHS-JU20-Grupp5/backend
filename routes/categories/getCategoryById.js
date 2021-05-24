const CategoryController = require.main.require('./controllers/category.controller');

module.exports = (app) => {
  app.get('/categories/:id', (req, res) => {
    CategoryController.findById(req.params.id)
      .then((categories) => {
        res.json(categories);
      })
      .catch((err) => {
        if (err) res.status(400).json({ error: err.message });
      });
  });
};
