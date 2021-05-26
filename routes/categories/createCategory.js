const { verifyAdmin } = require.main.require('./utils/utilities');
const CategoryController = require.main.require('./controllers/category.controller');

module.exports = (app) => {
  app.post('/categories', verifyAdmin, (req, res) => {
    CategoryController.findOrCreate({ category: req.body.category }).then(([category, created]) => {
      if (!created) {
        res.status(409).json({
          message: 'That category already exists',
        });
        return;
      }
      res.status(201).json(category);
    });
  });
};
